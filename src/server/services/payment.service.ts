/**
 * Flawless Institution™ - South African Payments Engine
 * Fourways, Johannesburg, South Africa
 *
 * Integrates:
 * 1. PayFast (Credit Cards, Debit Cards, Masterpass, Mobicred, Capitec Pay)
 * 2. Ozow Instant Secure EFT
 * 3. Manual Bank EFT (Standard Bank Main Operational Account, Fourways Branch)
 * 4. SARS-Compliant Tax Invoice Generation
 */
import crypto from 'crypto';
import {
  Transaction,
  PaymentMethod,
  PaymentStatus,
  ManualEftProof,
} from '../types/domain.types';
import { dbStore } from '../storage/supabaseStore';
import { catalogService } from './catalog.service';
import { communicationsService } from './communications.service';

export interface InitiatePaymentDTO {
  studentEmail: string;
  studentName: string;
  courseId: string;
  cohortId?: string;
  enrolmentId?: string;
  paymentMethod: PaymentMethod;
  nonRefundableAcknowledged: boolean;
}

export interface PaymentInitiationResult {
  transaction: Transaction;
  redirectUrl?: string;
  payfastPayload?: Record<string, string>;
  ozowPayload?: Record<string, any>;
  eftInstructions?: {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    branchCode: string;
    accountType: string;
    swiftCode: string;
    reference: string;
    amountZAR: number;
    notice: string;
  };
}

export interface SubmitManualEftDTO {
  transactionId: string;
  bankName: string;
  accountHolder?: string;
  referenceUsed: string;
  depositDate: string;
  popNotes?: string;
}

class PaymentService {
  private readonly payfastMerchantId = process.env.PAYFAST_MERCHANT_ID || '10000100';
  private readonly payfastMerchantKey = process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a';
  private readonly payfastPassphrase = process.env.PAYFAST_PASSPHRASE || 'flawless_secret_salt_2026';
  private readonly appUrl = process.env.APP_URL || 'https://flawlessinstitution.co.za';

  /**
   * Generates MD5 signature for PayFast integration form
   */
  private generatePayFastSignature(data: Record<string, string>, passphrase?: string): string {
    let pfOutput = '';
    for (const key of Object.keys(data).sort()) {
      if (key !== 'signature' && data[key] !== '') {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, '+')}&`;
      }
    }
    let getString = pfOutput.slice(0, -1);
    if (passphrase) {
      getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
    }
    return crypto.createHash('md5').update(getString).digest('hex');
  }

  /**
   * Initiates payment flow across PayFast, Ozow, or Standard Bank Manual EFT
   */
  public async initiatePayment(dto: InitiatePaymentDTO): Promise<PaymentInitiationResult> {
    if (!dto.nonRefundableAcknowledged) {
      throw new Error(
        'Registration fee non-refundable acknowledgment is mandatory under Flawless Institution enrolment policies.'
      );
    }

    const course = await catalogService.getCourseById(dto.courseId);
    if (!course) {
      throw new Error(`Course not found: ${dto.courseId}`);
    }

    const totalZAR = course.priceZAR;
    const regFeeZAR = course.registrationFeeZAR;
    const tuitionZAR = Math.max(0, totalZAR - regFeeZAR);

    const refNumber = `FI-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const txId = `tx-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const transaction: Transaction = {
      id: txId,
      referenceNumber: refNumber,
      enrolmentId: dto.enrolmentId,
      studentEmail: dto.studentEmail.toLowerCase().trim(),
      studentName: dto.studentName.trim(),
      courseId: course.id,
      courseTitle: course.title,
      amountZAR: tuitionZAR,
      registrationFeeZAR: regFeeZAR,
      totalAmountZAR: totalZAR,
      paymentMethod: dto.paymentMethod,
      paymentStatus: 'pending',
      invoiceNumber,
      createdAt: now,
      nonRefundableAcknowledged: true,
      termsVersion: '2026-v1.0',
    };

    await dbStore.createTransaction(transaction);

    // Standard Bank Manual EFT flow
    if (dto.paymentMethod === 'manual_eft') {
      const eftDetails = {
        bankName: 'Standard Bank of South Africa',
        accountHolder: 'Flawless Institution (Pty) Ltd',
        accountNumber: '082 918 2741',
        branchCode: '051001 (Fourways Branch)',
        accountType: 'Current / Cheque Account',
        swiftCode: 'SBZA ZA JJ',
        reference: refNumber,
        amountZAR: totalZAR,
        notice:
          'Payment cleared upon proof of payment submission and verification by accounts@flawlessinstitution.co.za.',
      };

      // Dispatch bank instructions asynchronously
      try {
        await communicationsService.sendEftBankInstructions(transaction, eftDetails);
      } catch (commErr) {
        console.warn('[PaymentService] EFT dispatch failed:', commErr);
      }

      return {
        transaction,
        eftInstructions: eftDetails,
      };
    }

    // PayFast Gateway Flow (Sandbox/Live)
    if (dto.paymentMethod === 'payfast' || dto.paymentMethod === 'card') {
      const isLive = process.env.NODE_ENV === 'production' && !this.payfastMerchantId.startsWith('100001');
      const gatewayEndpoint = isLive
        ? 'https://www.payfast.co.za/eng/process'
        : 'https://sandbox.payfast.co.za/eng/process';

      const pfData: Record<string, string> = {
        merchant_id: this.payfastMerchantId,
        merchant_key: this.payfastMerchantKey,
        return_url: `${this.appUrl}/payment-success?ref=${refNumber}`,
        cancel_url: `${this.appUrl}/academy?cancelled=true`,
        notify_url: `${this.appUrl}/api/v1/payments/payfast-notify`,
        name_first: dto.studentName.split(' ')[0] || 'Student',
        name_last: dto.studentName.split(' ').slice(1).join(' ') || 'Scholar',
        email_address: dto.studentEmail,
        m_payment_id: refNumber,
        amount: totalZAR.toFixed(2),
        item_name: `Flawless Institution: ${course.title} (Registration + Tuition)`,
        item_description: `Accredited program enrolment for ${dto.studentName}. Non-refundable reg fee R${regFeeZAR} included.`,
        custom_str1: dto.courseId,
        custom_str2: dto.enrolmentId || '',
        custom_str3: 'Flawless Fourways 2026',
      };

      const signature = this.generatePayFastSignature(pfData, this.payfastPassphrase);
      pfData.signature = signature;

      return {
        transaction,
        redirectUrl: gatewayEndpoint,
        payfastPayload: pfData,
      };
    }

    // Ozow Instant EFT Flow
    if (dto.paymentMethod === 'ozow') {
      return {
        transaction,
        ozowPayload: {
          siteCode: process.env.OZOW_SITE_CODE || 'FLAWLESS-FOURWAYS-001',
          countryCode: 'ZA',
          currencyCode: 'ZAR',
          amount: totalZAR.toFixed(2),
          transactionReference: refNumber,
          bankReference: refNumber,
          cancelUrl: `${this.appUrl}/academy?cancelled=true`,
          errorUrl: `${this.appUrl}/academy?error=true`,
          successUrl: `${this.appUrl}/payment-success?ref=${refNumber}`,
          notifyUrl: `${this.appUrl}/api/v1/payments/ozow-notify`,
          isTest: process.env.NODE_ENV !== 'production',
        },
      };
    }

    return { transaction };
  }

  /**
   * Processes PayFast Instant Transaction Notification (ITN) webhook
   */
  public async handlePayFastNotification(rawPayload: Record<string, string>): Promise<{ status: string; reference: string }> {
    const ref = rawPayload.m_payment_id;
    const paymentStatus = rawPayload.payment_status; // 'COMPLETE', 'FAILED', etc.

    if (!ref) {
      throw new Error('PayFast ITN missing m_payment_id.');
    }

    const transaction = await dbStore.getTransactionByRef(ref);
    if (!transaction) {
      throw new Error(`Transaction not found for reference: ${ref}`);
    }

    if (paymentStatus === 'COMPLETE') {
      const now = new Date().toISOString();
      await dbStore.updateTransaction(transaction.id, {
        paymentStatus: 'cleared',
        gatewayTransactionId: rawPayload.pf_payment_id,
        clearedAt: now,
      });

      // Update associated enrolment if present
      if (transaction.enrolmentId) {
        await dbStore.updateEnrolment(transaction.enrolmentId, {
          isPaid: true,
          status: 'in_progress',
        });
      }

      // Dispatch Tax Invoice & Confirmation
      try {
        await communicationsService.sendTaxInvoiceAndReceipt(transaction);
      } catch (commErr) {
        console.warn('[PaymentService] ITN email dispatch failed:', commErr);
      }

      return { status: 'cleared', reference: ref };
    } else {
      await dbStore.updateTransaction(transaction.id, {
        paymentStatus: 'failed',
      });
      return { status: 'failed', reference: ref };
    }
  }

  /**
   * Submits Proof of Payment for Manual Standard Bank EFT
   */
  public async submitManualEftProof(dto: SubmitManualEftDTO): Promise<Transaction> {
    const tx = await dbStore.getTransactionById(dto.transactionId);
    if (!tx) {
      throw new Error(`Transaction record not found: ${dto.transactionId}`);
    }

    const proof: ManualEftProof = {
      bankName: dto.bankName,
      accountHolder: dto.accountHolder,
      referenceUsed: dto.referenceUsed,
      depositDate: dto.depositDate,
      popNotes: dto.popNotes,
      submittedAt: new Date().toISOString(),
    };

    const updated = await dbStore.updateTransaction(tx.id, {
      manualEftProof: proof,
      paymentStatus: 'pending',
    });

    return updated!;
  }

  /**
   * Admin verification of Manual EFT proof
   */
  public async verifyManualEftPayment(
    transactionId: string,
    verifiedBy: string,
    notes?: string
  ): Promise<Transaction> {
    const tx = await dbStore.getTransactionById(transactionId);
    if (!tx) {
      throw new Error(`Transaction record not found: ${transactionId}`);
    }

    const now = new Date().toISOString();
    const updatedProof: ManualEftProof = {
      ...(tx.manualEftProof || {
        bankName: 'Standard Bank',
        referenceUsed: tx.referenceNumber,
        depositDate: now,
        submittedAt: now,
      }),
      verifiedBy,
      verificationNotes: notes || 'Verified against Standard Bank corporate statement.',
    };

    const updatedTx = await dbStore.updateTransaction(tx.id, {
      paymentStatus: 'cleared',
      clearedAt: now,
      manualEftProof: updatedProof,
    });

    // Mark enrolment as paid
    if (tx.enrolmentId) {
      await dbStore.updateEnrolment(tx.enrolmentId, {
        isPaid: true,
        status: 'in_progress',
      });
    }

    // Dispatch Tax Invoice
    try {
      await communicationsService.sendTaxInvoiceAndReceipt(updatedTx!);
    } catch (commErr) {
      console.warn('[PaymentService] Verification invoice dispatch skipped:', commErr);
    }

    return updatedTx!;
  }

  /**
   * Retrieves transaction by reference number
   */
  public async getTransactionByRef(ref: string): Promise<Transaction | undefined> {
    return await dbStore.getTransactionByRef(ref);
  }

  /**
   * Administrative view: lists all financial transactions
   */
  public async getAllTransactions(): Promise<Transaction[]> {
    return await dbStore.getAllTransactions();
  }
}

export const paymentService = new PaymentService();
