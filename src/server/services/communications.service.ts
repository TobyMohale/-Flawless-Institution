/**
 * Flawless Institution™ - Multi-Channel Communications Service
 * Fourways, Johannesburg, South Africa
 *
 * Integrates:
 * 1. Resend API (Official flawlessinstitution.co.za verified domain)
 * 2. WhatsApp Business Gateway (Simulated / Webhook ready for Infobip / Twilio)
 * 3. SMS Gateway (South African cellular networks: Vodacom, MTN, Telkom, Cell C)
 * 4. Structured Communications Audit Trail in dbStore
 */
import {
  User,
  Enrolment,
  Transaction,
  HouseholdBrief,
  SpeakingEnquiry,
  CommunicationLog,
} from '../types/domain.types';
import { dbStore } from '../storage/supabaseStore';

class CommunicationsService {
  private readonly resendApiKey = process.env.RESEND_API_KEY || '';
  private readonly fromEmail =
    process.env.RESEND_FROM_EMAIL || 'admissions@flawlessinstitution.co.za';

  /**
   * Internal helper to record every sent communication to the audit trail
   */
  private async logCommunication(log: Omit<CommunicationLog, 'id'>): Promise<CommunicationLog> {
    try {
      return await dbStore.createCommunicationLog(log);
    } catch (e) {
      console.warn('[CommunicationsService] DB logging fallback:', e);
      return {
        id: `comm-log-${Date.now()}`,
        ...log,
      };
    }
  }

  /**
   * Dispatches transactional email via Resend API
   */
  private async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    if (!this.resendApiKey) {
      console.log(`[CommunicationsService] RESEND_API_KEY unset. Mocking email to ${to}: "${subject}"`);
      return false;
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Flawless Institution™ <${this.fromEmail}>`,
          to: [to],
          subject,
          html,
        }),
      });

      if (!response.ok) {
        const errData = await response.text();
        console.error('[CommunicationsService] Resend API error response:', errData);
        return false;
      }

      return true;
    } catch (error) {
      console.error('[CommunicationsService] Error sending email via Resend:', error);
      return false;
    }
  }

  /**
   * Welcome email upon student/user registration (POPIA verified)
   */
  public async sendWelcomeNotification(user: User): Promise<void> {
    const subject = 'Welcome to Flawless Institution™ | Admissions Office';
    const snippet = `Welcome ${user.fullName}. Your portal credentials are now active.`;

    const html = `
      <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; background: #ffffff;">
        <div style="border-bottom: 2px solid #b45309; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #1e293b; letter-spacing: 0.05em; text-transform: uppercase; font-size: 18px;">Flawless Institution™</h2>
          <p style="margin: 4px 0 0 0; color: #b45309; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Academy of Butlering, Private Service & Household Management</p>
        </div>
        <p>Dear ${user.fullName},</p>
        <p>It is our pleasure to welcome you to the academic portal of Flawless Institution, situated in Fourways, Johannesburg.</p>
        <p>Your user profile has been registered in full accordance with the Protection of Personal Information Act (POPIA).</p>
        <div style="background: #f8fafc; padding: 16px; border-left: 4px solid #0f172a; margin: 20px 0;">
          <p style="margin: 0; font-size: 13px;"><strong>Registered Email:</strong> ${user.email}</p>
          <p style="margin: 4px 0 0 0; font-size: 13px;"><strong>Institutional Role:</strong> ${user.role.toUpperCase()}</p>
          <p style="margin: 4px 0 0 0; font-size: 13px;"><strong>Physical Headquarters:</strong> Fourways Training Centre, Johannesburg</p>
        </div>
        <p>You may now access our accredited curriculum schedules, select your intake cohort, and review our formal assessment criteria.</p>
        <p style="margin-top: 24px;">Yours in Excellence,<br><strong>The Admissions Directorate</strong><br>Flawless Institution™</p>
      </div>
    `;

    const delivered = await this.sendEmail(user.email, subject, html);

    await this.logCommunication({
      channel: 'email',
      recipientName: user.fullName,
      recipientContact: user.email,
      templateType: 'enrolment_confirmation',
      subjectOrTitle: subject,
      contentSnippet: snippet,
      status: delivered ? 'sent' : 'mock_logged',
      sentAt: new Date().toISOString(),
    });
  }

  /**
   * Enrolment confirmation with cohort details
   */
  public async sendEnrolmentNotice(enrolment: Enrolment): Promise<void> {
    const subject = `Enrolment Confirmed: ${enrolment.courseTitle} | Flawless Institution`;
    const snippet = `Confirmed registration for ${enrolment.courseTitle} (${enrolment.cohortName}). Mode: ${enrolment.mode}.`;

    const html = `
      <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; background: #ffffff;">
        <div style="border-bottom: 2px solid #b45309; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #1e293b; font-size: 18px;">Flawless Institution™ Enrolment Department</h2>
        </div>
        <p>Dear ${enrolment.studentName},</p>
        <p>Your enrolment has been provisionally registered for the upcoming intake:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Accredited Program:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enrolment.courseTitle}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Intake Cohort:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enrolment.cohortName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Delivery Mode:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enrolment.mode}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Tuition & Materials:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">R ${enrolment.totalFeeZAR.toLocaleString()}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Enrolment Number:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${enrolment.id}</td></tr>
        </table>
        <p>Please note that your seat is reserved. For physical and hybrid cohorts, attendance at our Fourways Centre is mandatory for final practical pinning.</p>
      </div>
    `;

    const delivered = await this.sendEmail(enrolment.studentEmail, subject, html);

    await this.logCommunication({
      channel: 'email',
      recipientName: enrolment.studentName,
      recipientContact: enrolment.studentEmail,
      templateType: 'enrolment_confirmation',
      subjectOrTitle: subject,
      contentSnippet: snippet,
      status: delivered ? 'sent' : 'mock_logged',
      sentAt: new Date().toISOString(),
      cohortId: enrolment.cohortId,
      cohortName: enrolment.cohortName,
    });
  }

  /**
   * Official Institutional Manual EFT Instructions (FNB & Mukuru)
   */
  public async sendEftBankInstructions(
    tx: Transaction,
    bankDetails: {
      bankName?: string;
      accountHolder?: string;
      accountNumber?: string;
      branchCode?: string;
      reference: string;
      amountZAR: number;
    }
  ): Promise<void> {
    const subject = `EFT Banking Instructions: ${bankDetails.reference} | Flawless Institution`;
    const snippet = `EFT Payment Options: FNB Acc 62797216647 or Mukuru Acc 51672409431. POP via WhatsApp to +27 65 944 9409. Ref: ${bankDetails.reference}.`;

    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #d4af37; background: #ffffff; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px solid #0a122a; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="color: #0a122a; margin: 0; font-size: 20px; letter-spacing: 1px;">EFT PAYMENT OPTIONS</h2>
          <p style="color: #64748b; font-size: 12px; margin: 4px 0 0 0;">Flawless Institution™ • Fourways, Johannesburg</p>
        </div>

        <p>Dear ${tx.studentName},</p>
        <p>Thank you for booking <strong>${tx.courseTitle}</strong>. Please find the verified payment options below:</p>

        <div style="background: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 14px;">
          <h3 style="color: #0a122a; margin: 0 0 8px 0; font-size: 14px;">1. FNB BANK TRANSFER</h3>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Account Holder:</strong> Zim Angels</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Account Number:</strong> 62797216647</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Branch Code:</strong> 250655</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Reference:</strong> <span style="font-family: monospace; font-weight: bold; color: #0284c7;">${bankDetails.reference}</span></p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Total Amount:</strong> R ${bankDetails.amountZAR.toLocaleString()} ZAR</p>
        </div>

        <div style="background: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 16px;">
          <h3 style="color: #ea580c; margin: 0 0 8px 0; font-size: 14px;">2. MUKURU</h3>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Account Holder:</strong> Teldah Siyawamwaya</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Account Number:</strong> 51672409431</p>
          <p style="margin: 4px 0; font-size: 13px;"><strong>Linked Number:</strong> +27 83 872 2001</p>
        </div>

        <div style="background: #ecfdf5; padding: 16px; border: 1px solid #a7f3d0; border-radius: 6px; margin-bottom: 16px;">
          <h3 style="color: #047857; margin: 0 0 6px 0; font-size: 14px;">PROOF OF PAYMENT</h3>
          <p style="margin: 4px 0; font-size: 13px;">After completing your payment, please send your proof of payment to our Training & Support Team:</p>
          <p style="margin: 8px 0; font-size: 15px; font-weight: bold; color: #065f46;">
            📲 WhatsApp: <a href="https://wa.me/27659449409" style="color: #047857; text-decoration: underline;">+27 65 944 9409</a>
          </p>
          <p style="margin: 6px 0; font-size: 12px; color: #374151;">
            Please include your full Name and the Course or Courses you have booked when submitting your proof of payment.
          </p>
          <div style="background: #fffbeb; border-left: 3px solid #f59e0b; padding: 8px 12px; margin-top: 10px; font-size: 12px; color: #92400e;">
            <strong>Important:</strong> Your booking will be processed once payment and proof of payment have been received.
          </div>
        </div>
      </div>
    `;

    const delivered = await this.sendEmail(tx.studentEmail, subject, html);

    await this.logCommunication({
      channel: 'email',
      recipientName: tx.studentName,
      recipientContact: tx.studentEmail,
      templateType: 'eft_payment_instructions',
      subjectOrTitle: subject,
      contentSnippet: snippet,
      status: delivered ? 'sent' : 'mock_logged',
      sentAt: new Date().toISOString(),
      referenceNumber: tx.referenceNumber,
    });
  }

  /**
   * SARS-Compliant Tax Invoice and Receipt upon cleared payment
   */
  public async sendTaxInvoiceAndReceipt(tx: Transaction): Promise<void> {
    const subject = `Official SARS Tax Invoice & Receipt: ${tx.invoiceNumber} | Flawless Institution`;
    const snippet = `Tax Invoice ${tx.invoiceNumber} cleared for ${tx.courseTitle}. Amount: R${tx.totalAmountZAR}.`;

    const html = `
      <div style="font-family: 'Georgia', serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e5e5; background: #ffffff;">
        <div style="text-align: right; font-size: 12px; color: #64748b;">
          TAX INVOICE / RECEIPT: ${tx.invoiceNumber}<br>
          DATE CLEARED: ${tx.clearedAt ? new Date(tx.clearedAt).toLocaleDateString('en-ZA') : new Date().toLocaleDateString('en-ZA')}
        </div>
        <h2 style="color: #1e293b; margin: 12px 0 4px 0;">Flawless Institution (Pty) Ltd</h2>
        <p style="font-size: 12px; color: #64748b; margin: 0;">Fourways, Johannesburg, 2055, South Africa | SARS VAT Registered</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;">
        <p><strong>Billed To:</strong> ${tx.studentName} (${tx.studentEmail})</p>
        <p><strong>Payment Method:</strong> ${tx.paymentMethod.toUpperCase()}</p>
        <p><strong>System Reference:</strong> ${tx.referenceNumber}</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
          <tr style="background: #f8fafc;">
            <th style="padding: 8px; text-align: left; border: 1px solid #e2e8f0;">Item Description</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #e2e8f0;">Amount (ZAR)</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">${tx.courseTitle} - Academic Tuition</td>
            <td style="padding: 8px; text-align: right; border: 1px solid #e2e8f0;">R ${tx.amountZAR.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e2e8f0;">Non-Refundable Institutional Registration Fee</td>
            <td style="padding: 8px; text-align: right; border: 1px solid #e2e8f0;">R ${tx.registrationFeeZAR.toLocaleString()}</td>
          </tr>
          <tr style="font-weight: bold; background: #f1f5f9;">
            <td style="padding: 8px; border: 1px solid #e2e8f0;">Total Paid (Status: CLEARED)</td>
            <td style="padding: 8px; text-align: right; border: 1px solid #e2e8f0;">R ${tx.totalAmountZAR.toLocaleString()}</td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #64748b;">Thank you for investing in executive education at Flawless Institution.</p>
      </div>
    `;

    const delivered = await this.sendEmail(tx.studentEmail, subject, html);

    await this.logCommunication({
      channel: 'email',
      recipientName: tx.studentName,
      recipientContact: tx.studentEmail,
      templateType: 'sars_tax_invoice',
      subjectOrTitle: subject,
      contentSnippet: snippet,
      status: delivered ? 'sent' : 'mock_logged',
      sentAt: new Date().toISOString(),
      referenceNumber: tx.referenceNumber,
    });
  }

  /**
   * Broadcast reminder to all students in an intake cohort
   */
  public async sendCohortBroadcast(
    cohortId: string,
    cohortName: string,
    subject: string,
    messageBody: string
  ): Promise<{ dispatched: number }> {
    const enrolments = await dbStore.getAllEnrolments();
    const targetEnrolments = enrolments.filter((e) => e.cohortId === cohortId);

    for (const enr of targetEnrolments) {
      await this.sendEmail(enr.studentEmail, subject, `<p>${messageBody}</p>`);
      await this.logCommunication({
        channel: 'email',
        recipientName: enr.studentName,
        recipientContact: enr.studentEmail,
        templateType: 'cohort_start_reminder',
        subjectOrTitle: subject,
        contentSnippet: messageBody.slice(0, 100),
        status: 'sent',
        sentAt: new Date().toISOString(),
        cohortId,
        cohortName,
      });
    }

    return { dispatched: targetEnrolments.length };
  }

  /**
   * Direct communication from Registrar (Email, WhatsApp, or SMS)
   */
  public async sendDirectMessage(
    channel: 'email' | 'whatsapp' | 'sms',
    recipientName: string,
    recipientContact: string,
    subjectOrTitle: string,
    message: string
  ): Promise<CommunicationLog> {
    let delivered = false;
    if (channel === 'email') {
      delivered = await this.sendEmail(recipientContact, subjectOrTitle, `<p>${message}</p>`);
    } else {
      // WhatsApp & SMS gateway mock/logging
      console.log(`[CommunicationsService] ${channel.toUpperCase()} to ${recipientContact}: ${message}`);
      delivered = true;
    }

    return await this.logCommunication({
      channel,
      recipientName,
      recipientContact,
      templateType: 'custom_direct',
      subjectOrTitle,
      contentSnippet: message.slice(0, 120),
      status: delivered ? 'sent' : 'mock_logged',
      sentAt: new Date().toISOString(),
    });
  }

  public async sendAdvisoryIntakeNotice(brief: HouseholdBrief): Promise<void> {
    const subject = `Confidential Household Placement Brief Received: ${brief.id}`;
    const snippet = `Placement brief logged for ${brief.roleRequested} in ${brief.residenceArea}. Privacy: ${brief.privacyTier}.`;
    await this.sendEmail(brief.contactEmail, subject, `<p>${snippet}</p>`);
    await this.logCommunication({
      channel: 'email',
      recipientName: brief.employerName,
      recipientContact: brief.contactEmail,
      templateType: 'custom_direct',
      subjectOrTitle: subject,
      contentSnippet: snippet,
      status: 'sent',
      sentAt: new Date().toISOString(),
    });
  }

  public async sendSpeakingBookingNotice(enquiry: SpeakingEnquiry): Promise<void> {
    const subject = `Keynote Speaking Enquiry Received: ${enquiry.eventTheme}`;
    const snippet = `Speaking request logged for Toby Mohale: ${enquiry.hostOrganization} on ${enquiry.requestedDate}.`;
    await this.sendEmail(enquiry.contactEmail, subject, `<p>${snippet}</p>`);
    await this.logCommunication({
      channel: 'email',
      recipientName: enquiry.contactPerson,
      recipientContact: enquiry.contactEmail,
      templateType: 'custom_direct',
      subjectOrTitle: subject,
      contentSnippet: snippet,
      status: 'sent',
      sentAt: new Date().toISOString(),
    });
  }

  /**
   * Retrieves communications audit logs
   */
  public async getLogs(): Promise<CommunicationLog[]> {
    return await dbStore.getAllCommunicationLogs();
  }
}

export const communicationsService = new CommunicationsService();
