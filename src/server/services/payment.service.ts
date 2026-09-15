/**
 * Flawless Institution™ - Payment & Financial Invoicing Service
 * Gateways: PayFast (South Africa), Ozow (Instant EFT), Manual Standard Bank EFT & SARS VAT Tax Invoicing.
 */
import crypto from 'crypto';
import { dbStore } from '../storage/inMemoryStore';
import { Transaction, PaymentStatus } from '../types/domain.types';
import { AppError } from '../middleware/errorHandler';
import { config } from '../config';
import { resendService } from './resend.service';

export interface PayFastPayloadOptions {
  referenceNumber: string;
  returnUrl?: string;
  cancelUrl?: string;
}

export interface ManualEftSubmissionInput {
  referenceNumber: string;
  bankName: string;
  accountHolder: string;
  depositDate: string;
  popNotes?: string;
}

export class PaymentService {
  /**
   * Helper: Generate PayFast MD5 signature compliant with PayFast South Africa specifications.
   */
  public generatePayFastSignature(data: Record<string, string | number>, passphrase?: string): string {
    // 1. Filter out signature field if present and empty values
    const keys = Object.keys(data).filter(k => k !== 'signature' && data[k] !== undefined && data[k] !== '');
    
    // 2. Build string of key=value pairs
    let pfOutput = '';
    keys.forEach((key, index) => {
      const val = String(data[key]).trim();
      pfOutput += `${key}=${encodeURIComponent(val).replace(/%20/g, '+')}`;
      if (index < keys.length - 1) {
        pfOutput += '&';
      }
    });

    // 3. Append passphrase if configured
    if (passphrase) {
      pfOutput += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, '+')}`;
    }

    return crypto.createHash('md5').update(pfOutput).digest('hex');
  }

  /**
   * Generate PayFast Checkout payload & redirect parameters for a transaction.
   */
  public generatePayFastPayload(options: PayFastPayloadOptions) {
    const transaction = dbStore.getTransactionByRef(options.referenceNumber);
    if (!transaction) {
      throw new AppError(`Transaction with reference '${options.referenceNumber}' not found`, 404, 'TRANSACTION_NOT_FOUND');
    }

    const pfConfig = config.payments.payfast;
    const appUrl = process.env.APP_URL || 'http://localhost:3000';

    const returnUrl = options.returnUrl || `${appUrl}/payment/success?ref=${transaction.referenceNumber}`;
    const cancelUrl = options.cancelUrl || `${appUrl}/payment/cancelled?ref=${transaction.referenceNumber}`;
    const notifyUrl = `${appUrl}/api/v1/payments/payfast/notify`;

    const nameParts = transaction.studentName.trim().split(' ');
    const firstName = nameParts[0] || 'Candidate';
    const lastName = nameParts.slice(1).join(' ') || 'Student';

    // Format amounts with two decimal places
    const amountStr = transaction.totalAmountZAR.toFixed(2);

    const payload: Record<string, string | number> = {
      merchant_id: pfConfig.merchantId,
      merchant_key: pfConfig.merchantKey,
      return_url: returnUrl,
      cancel_url: cancelUrl,
      notify_url: notifyUrl,
      name_first: firstName,
      name_last: lastName,
      email_address: transaction.studentEmail,
      m_payment_id: transaction.referenceNumber,
      amount: amountStr,
      item_name: `Flawless Institution - ${transaction.courseTitle}`,
      item_description: `Course Enrolment (R${transaction.amountZAR}) + Registration Fee (R${transaction.registrationFeeZAR})`,
      custom_str1: transaction.enrolmentId || '',
      custom_str2: 'Flawless Institution Fourways Campus',
    };

    // Generate MD5 signature
    const signature = this.generatePayFastSignature(payload, pfConfig.passphrase);
    payload.signature = signature;

    return {
      processUrl: pfConfig.processUrl,
      isSandbox: pfConfig.sandbox,
      referenceNumber: transaction.referenceNumber,
      totalAmountZAR: transaction.totalAmountZAR,
      currency: 'ZAR',
      signature,
      fields: payload,
    };
  }

  /**
   * Process PayFast Instant Transaction Notification (ITN) webhook.
   */
  public processPayFastWebhook(body: Record<string, any>) {
    const { m_payment_id, payment_status, pf_payment_id, signature } = body;

    if (!m_payment_id) {
      throw new AppError('Missing payment identifier (m_payment_id) in webhook payload', 400, 'INVALID_WEBHOOK_PAYLOAD');
    }

    const transaction = dbStore.getTransactionByRef(m_payment_id);
    if (!transaction) {
      throw new AppError(`Transaction for reference '${m_payment_id}' was not found in registry`, 404, 'TRANSACTION_NOT_FOUND');
    }

    // Verify signature
    const calculatedSignature = this.generatePayFastSignature(body, config.payments.payfast.passphrase);
    const signatureValid = signature && calculatedSignature === signature;

    // For sandbox testing or valid signatures
    if (!signatureValid && !config.payments.payfast.sandbox) {
      throw new AppError('PayFast signature verification failed. Untrusted webhook origin.', 401, 'INVALID_SIGNATURE');
    }

    const isComplete = payment_status === 'COMPLETE';
    const newStatus: PaymentStatus = isComplete ? 'cleared' : 'failed';
    const now = new Date().toISOString();

    // Update Transaction
    const updatedTx = dbStore.updateTransaction(transaction.id, {
      paymentStatus: newStatus,
      gatewayTransactionId: pf_payment_id || `pf-${Date.now()}`,
      clearedAt: isComplete ? now : undefined,
      invoiceNumber: isComplete ? `INV-FI-${m_payment_id.replace('FI-', '')}` : undefined,
    });

    // If payment cleared, update enrolment status to active and isPaid = true
    if (isComplete && transaction.enrolmentId) {
      dbStore.updateEnrolment(transaction.enrolmentId, {
        isPaid: true,
        status: 'in_progress',
      });

      // Dispatch Resend official Tax Invoice Receipt
      resendService.sendPaymentReceivedEmail({
        studentName: transaction.studentName,
        studentEmail: transaction.studentEmail,
        courseTitle: transaction.courseTitle,
        referenceNumber: m_payment_id,
        invoiceNumber: updatedTx?.invoiceNumber || `INV-FI-${m_payment_id.replace('FI-', '')}`,
        amountPaidZAR: transaction.totalAmountZAR,
        paymentMethod: 'payfast',
      }).catch(err => console.error('[Resend Payment Receipt Error]', err));
    }

    return {
      success: true,
      referenceNumber: m_payment_id,
      paymentStatus: newStatus,
      gatewayTransactionId: updatedTx?.gatewayTransactionId,
      clearedAt: updatedTx?.clearedAt,
    };
  }

  /**
   * Process Ozow Instant EFT notification.
   */
  public processOzowWebhook(body: Record<string, any>) {
    const { TransactionReference, Status, Amount, GatewayReference } = body;

    if (!TransactionReference) {
      throw new AppError('Missing TransactionReference in Ozow payload', 400, 'INVALID_OZOW_PAYLOAD');
    }

    const transaction = dbStore.getTransactionByRef(TransactionReference);
    if (!transaction) {
      throw new AppError(`Transaction '${TransactionReference}' not found`, 404, 'TRANSACTION_NOT_FOUND');
    }

    const isComplete = Status === 'Complete' || Status === 'Successful';
    const newStatus: PaymentStatus = isComplete ? 'cleared' : 'failed';
    const now = new Date().toISOString();

    const updatedTx = dbStore.updateTransaction(transaction.id, {
      paymentStatus: newStatus,
      gatewayTransactionId: GatewayReference || `ozow-${Date.now()}`,
      clearedAt: isComplete ? now : undefined,
      invoiceNumber: isComplete ? `INV-FI-${TransactionReference.replace('FI-', '')}` : undefined,
    });

    if (isComplete && transaction.enrolmentId) {
      dbStore.updateEnrolment(transaction.enrolmentId, {
        isPaid: true,
        status: 'in_progress',
      });

      resendService.sendPaymentReceivedEmail({
        studentName: transaction.studentName,
        studentEmail: transaction.studentEmail,
        courseTitle: transaction.courseTitle,
        referenceNumber: TransactionReference,
        invoiceNumber: updatedTx?.invoiceNumber || `INV-FI-${TransactionReference.replace('FI-', '')}`,
        amountPaidZAR: transaction.totalAmountZAR,
        paymentMethod: 'ozow',
      }).catch(err => console.error('[Resend Payment Receipt Error]', err));
    }

    return {
      success: true,
      referenceNumber: TransactionReference,
      status: newStatus,
      clearedAt: updatedTx?.clearedAt,
    };
  }

  /**
   * Submit Manual EFT Proof of Payment (Standard Bank EFT).
   */
  public submitManualEftProof(input: ManualEftSubmissionInput) {
    const transaction = dbStore.getTransactionByRef(input.referenceNumber);
    if (!transaction) {
      throw new AppError(`Transaction reference '${input.referenceNumber}' not found`, 404, 'TRANSACTION_NOT_FOUND');
    }

    const now = new Date().toISOString();

    const updatedTx = dbStore.updateTransaction(transaction.id, {
      paymentMethod: 'manual_eft',
      manualEftProof: {
        bankName: input.bankName.trim(),
        accountHolder: input.accountHolder.trim(),
        referenceUsed: input.referenceNumber,
        depositDate: input.depositDate,
        popNotes: input.popNotes?.trim(),
        submittedAt: now,
      },
    });

    return {
      success: true,
      message: 'Proof of payment submitted successfully. Our finance department in Fourways will reconcile and activate your course within 2-4 business hours.',
      referenceNumber: transaction.referenceNumber,
      totalAmountZAR: transaction.totalAmountZAR,
      submittedAt: now,
      manualEftProof: updatedTx?.manualEftProof,
    };
  }

  /**
   * Administrative Fund Verification for Manual EFT (Restricted to Faculty & Super Admin).
   */
  public verifyManualEftTransaction(
    referenceNumber: string,
    verifiedStatus: 'cleared' | 'failed',
    verificationNotes: string,
    verifier: { fullName: string; role: string }
  ) {
    const transaction = dbStore.getTransactionByRef(referenceNumber);
    if (!transaction) {
      throw new AppError(`Transaction reference '${referenceNumber}' was not found`, 404, 'TRANSACTION_NOT_FOUND');
    }

    const now = new Date().toISOString();
    const isCleared = verifiedStatus === 'cleared';
    const invoiceNumber = isCleared ? `INV-FI-${referenceNumber.replace('FI-', '')}` : undefined;

    const currentProof = transaction.manualEftProof || {
      bankName: 'Standard Bank EFT',
      referenceUsed: referenceNumber,
      depositDate: now,
      submittedAt: now,
    };

    const updatedProof = {
      ...currentProof,
      verifiedBy: `${verifier.fullName} (${verifier.role})`,
      verificationNotes,
    };

    const updatedTx = dbStore.updateTransaction(transaction.id, {
      paymentStatus: verifiedStatus,
      clearedAt: isCleared ? now : undefined,
      invoiceNumber,
      manualEftProof: updatedProof,
    });

    // Update associated Enrolment if cleared
    if (isCleared && transaction.enrolmentId) {
      dbStore.updateEnrolment(transaction.enrolmentId, {
        isPaid: true,
        status: 'in_progress',
      });

      const invNo = invoiceNumber || `INV-FI-${referenceNumber.replace('FI-', '')}`;
      resendService.sendPaymentReceivedEmail({
        studentName: transaction.studentName,
        studentEmail: transaction.studentEmail,
        courseTitle: transaction.courseTitle,
        referenceNumber,
        invoiceNumber: invNo,
        amountPaidZAR: transaction.totalAmountZAR,
        paymentMethod: 'manual_eft',
      }).catch(err => console.error('[Resend Payment Receipt Error]', err));

      // Stage 8: Log to central communications audit trail
      dbStore.createCommunicationLog({
        channel: 'email',
        templateType: 'sars_tax_invoice',
        recipientName: transaction.studentName,
        recipientContact: transaction.studentEmail,
        subjectOrTitle: `Official SARS VAT Tax Invoice #${invNo} - Flawless Institution`,
        contentSnippet: `Tax Invoice for ${transaction.courseTitle}, Total: R${transaction.totalAmountZAR.toLocaleString('en-ZA')}`,
        status: 'delivered',
        sentAt: now,
        referenceNumber,
      });
    }

    return {
      success: true,
      message: `Transaction ${referenceNumber} marked as ${verifiedStatus.toUpperCase()} by ${verifier.fullName}`,
      transaction: updatedTx,
    };
  }

  /**
   * Generate South African SARS VAT Tax Invoice.
   */
  public generateTaxInvoice(referenceNumber: string) {
    const transaction = dbStore.getTransactionByRef(referenceNumber);
    if (!transaction) {
      throw new AppError(`Transaction with reference '${referenceNumber}' not found`, 404, 'TRANSACTION_NOT_FOUND');
    }

    const institution = config.institution;
    const tax = institution.tax;
    const totalAmount = transaction.totalAmountZAR;
    const courseFee = transaction.amountZAR;
    const regFee = transaction.registrationFeeZAR;

    // South Africa 15% VAT calculation (Amounts are VAT inclusive)
    const vatFactor = 0.15 / 1.15;
    const totalVatZAR = Math.round(totalAmount * vatFactor * 100) / 100;
    const subtotalZAR = Math.round((totalAmount - totalVatZAR) * 100) / 100;

    const invoiceNumber = transaction.invoiceNumber || `INV-FI-${referenceNumber.replace('FI-', '')}`;

    return {
      documentType: 'TAX INVOICE',
      invoiceNumber,
      issueDate: transaction.clearedAt || transaction.createdAt,
      paymentStatus: transaction.paymentStatus,
      paymentMethod: transaction.paymentMethod,
      currency: 'ZAR',
      
      institutionDetails: {
        legalName: 'Flawless Institution (Pty) Ltd',
        tradingAs: institution.name,
        companyRegistration: tax.companyRegistration,
        vatNumber: tax.vatNumber,
        headquarters: institution.headquarters,
        physicalAddress: tax.address,
        contactEmail: institution.contactEmail,
        contactPhone: institution.phone,
      },

      customerDetails: {
        candidateName: transaction.studentName,
        email: transaction.studentEmail,
        referenceNumber: transaction.referenceNumber,
      },

      lineItems: [
        {
          description: `Academy Tuition: ${transaction.courseTitle}`,
          category: 'Accredited Curriculum',
          quantity: 1,
          unitPriceZAR: courseFee,
          vatRatePercentage: 15,
          totalZAR: courseFee,
        },
        {
          description: 'Institutional Intake Registration & Student File Processing (Non-refundable)',
          category: 'Administrative Enrollment Fee',
          quantity: 1,
          unitPriceZAR: regFee,
          vatRatePercentage: 15,
          totalZAR: regFee,
        },
      ],

      financialSummary: {
        subtotalZAR,
        vatRatePercentage: 15,
        vatAmountZAR: totalVatZAR,
        totalAmountDueZAR: totalAmount,
        amountPaidZAR: transaction.paymentStatus === 'cleared' ? totalAmount : 0,
        balanceDueZAR: transaction.paymentStatus === 'cleared' ? 0 : totalAmount,
      },

      regulatoryNotice: 'Prices are inclusive of 15% South African Value Added Tax (VAT). In accordance with the Consumer Protection Act (CPA) and institutional policy, the R300 registration fee is non-refundable upon reservation of intake physical classroom capacity.',
      
      bankingDetails: institution.banking,
    };
  }
}

export const paymentService = new PaymentService();
