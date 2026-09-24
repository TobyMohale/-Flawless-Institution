/**
 * Flawless Institution™ - Resend Transactional Email Service
 * Handles admissions, enrolment confirmations, payment receipts, and graduation notifications.
 */
import { Resend } from 'resend';
import { config } from '../config';

let resendClient: Resend | null = null;

export interface SendEmailResult {
  sent: boolean;
  messageId?: string;
  recipient: string;
  subject: string;
  mode: 'live' | 'mock_logged';
}

export class ResendService {
  /**
   * Check if Resend API key is configured
   */
  public isConfigured(): boolean {
    return Boolean(config.resend.apiKey);
  }

  /**
   * Lazy initialization of Resend client
   */
  private getClient(): Resend | null {
    if (!config.resend.apiKey) {
      return null;
    }
    if (!resendClient) {
      resendClient = new Resend(config.resend.apiKey);
    }
    return resendClient;
  }

  /**
   * Universal sender with graceful fallback
   */
  private async sendMail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<SendEmailResult> {
    const client = this.getClient();

    if (!client) {
      console.log(`[Resend DEV Fallback] Transactional email queued for ${options.to}`);
      console.log(`[Resend DEV Fallback] Subject: "${options.subject}"`);
      return {
        sent: true,
        recipient: options.to,
        subject: options.subject,
        mode: 'mock_logged',
        messageId: `dev-msg-${Date.now()}`,
      };
    }

    try {
      const response = await client.emails.send({
        from: config.resend.fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      return {
        sent: true,
        recipient: options.to,
        subject: options.subject,
        mode: 'live',
        messageId: response.data?.id,
      };
    } catch (error: any) {
      console.error(`[Resend Error] Failed to send email to ${options.to}:`, error.message);
      return {
        sent: false,
        recipient: options.to,
        subject: options.subject,
        mode: 'live',
      };
    }
  }

  /**
   * 1. Send Course Enrolment Confirmation & Bank Payment Details
   */
  public async sendEnrolmentConfirmation(params: {
    studentName: string;
    studentEmail: string;
    courseTitle: string;
    referenceNumber: string;
    cohortName: string;
    totalFeeZAR: number;
    registrationFeeZAR: number;
    paymentMethod: string;
  }): Promise<SendEmailResult> {
    const institution = config.institution;
    const banking = institution.banking;

    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px;">FLAWLESS INSTITUTION™</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">Fourways, Johannesburg, South Africa • Established 2016</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #1e293b; font-size: 18px; margin-top: 0;">Dear ${params.studentName},</h2>
          <p style="color: #475569; line-height: 1.6;">Thank you for taking the defining step towards mastering high-level private household and care protocols. Your enrolment order for <strong>${params.courseTitle}</strong> has been registered in our academic system.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 18px; margin: 24px 0;">
            <table style="width: 100%; font-size: 14px; color: #334155; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Enrolment Reference:</td>
                <td style="padding: 6px 0; text-align: right; font-family: monospace; font-weight: 700; color: #0284c7;">${params.referenceNumber}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Cohort Intake:</td>
                <td style="padding: 6px 0; text-align: right;">${params.cohortName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Total Tuition + Registration:</td>
                <td style="padding: 6px 0; text-align: right; font-weight: 700;">R${params.totalFeeZAR} ZAR</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: 600;">Non-Refundable Admin Fee:</td>
                <td style="padding: 6px 0; text-align: right; color: #dc2626;">R${params.registrationFeeZAR} ZAR</td>
              </tr>
            </table>
          </div>

          <h3 style="color: #0f172a; font-size: 15px; margin-bottom: 8px;">EFT PAYMENT OPTIONS:</h3>
          <div style="background-color: #f1f5f9; padding: 14px; border-radius: 6px; font-size: 13px; color: #334155; line-height: 1.5; margin-bottom: 12px;">
            <strong style="color: #0a122a;">FNB BANK TRANSFER:</strong><br/>
            <strong>Account Holder:</strong> Zim Angels<br/>
            <strong>Account Number:</strong> 62797216647<br/>
            <strong>Branch Code:</strong> 250655<br/>
            <strong>Reference to Quote:</strong> <span style="font-family: monospace; font-weight: 700; color: #0369a1;">${params.referenceNumber}</span>
          </div>

          <div style="background-color: #f1f5f9; padding: 14px; border-radius: 6px; font-size: 13px; color: #334155; line-height: 1.5; margin-bottom: 12px;">
            <strong style="color: #ea580c;">MUKURU:</strong><br/>
            <strong>Account Holder:</strong> Teldah Siyawamwaya<br/>
            <strong>Account Number:</strong> 51672409431<br/>
            <strong>Linked Number:</strong> +27 83 872 2001
          </div>

          <div style="background-color: #ecfdf5; padding: 14px; border-radius: 6px; font-size: 13px; color: #065f46; line-height: 1.5;">
            <strong>PROOF OF PAYMENT:</strong><br/>
            After completing your payment, please send your proof of payment to our Training & Support Team:<br/>
            📲 <strong>WhatsApp:</strong> <a href="https://wa.me/27659449409" style="color: #047857;">+27 65 944 9409</a><br/>
            <em>Please include your full Name and the Course or Courses you have booked when submitting your proof of payment.</em><br/>
            <strong style="color: #b45309; display: block; margin-top: 6px;">Important: Your booking will be processed once payment and proof of payment have been received.</strong>
          </div>

          <p style="color: #64748b; font-size: 12px; margin-top: 24px; line-height: 1.5;">
            *Notice: In accordance with our terms and Fourways training center capacity restrictions (15 seats per cohort), physical seats are reserved only upon payment clearance.
          </p>
        </div>
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          Flawless Institution (Pty) Ltd • Design Quarter District, Fourways, Johannesburg
        </div>
      </div>
    `;

    return this.sendMail({
      to: params.studentEmail,
      subject: `Enrolment Confirmation & Payment Reference [${params.referenceNumber}] — Flawless Institution`,
      html,
    });
  }

  /**
   * 2. Send Payment Cleared & VAT Tax Invoice Receipt
   */
  public async sendPaymentReceivedEmail(params: {
    studentName: string;
    studentEmail: string;
    courseTitle: string;
    referenceNumber: string;
    invoiceNumber: string;
    amountPaidZAR: number;
    paymentMethod: string;
  }): Promise<SendEmailResult> {
    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px;">FLAWLESS INSTITUTION™</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #38bdf8;">Official SARS Tax Invoice & Clearance Confirmation</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #1e293b; font-size: 18px; margin-top: 0;">Payment Cleared: Welcome to the Academy</h2>
          <p style="color: #475569; line-height: 1.6;">Dear ${params.studentName}, your payment of <strong>R${params.amountPaidZAR} ZAR</strong> has been received and verified by Institutional Finance.</p>

          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <p style="margin: 0; color: #065f46; font-size: 14px;"><strong>Status:</strong> Active & Fully Cleared</p>
            <p style="margin: 6px 0 0 0; color: #065f46; font-size: 13px;"><strong>Tax Invoice Number:</strong> ${params.invoiceNumber}</p>
            <p style="margin: 4px 0 0 0; color: #065f46; font-size: 13px;"><strong>Method:</strong> ${params.paymentMethod.toUpperCase()}</p>
          </div>

          <p style="color: #475569; line-height: 1.6;">Your student dashboard is now active. You may begin reviewing syllabus modules and prepare for your intensive practical assessments at our Fourways Training Centre.</p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${process.env.APP_URL || 'http://localhost:3000'}/portal/courses" style="background-color: #0f172a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; display: inline-block;">Access Student Learning Portal</a>
          </div>
        </div>
        <div style="background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
          Flawless Institution (Pty) Ltd • VAT Reg: 4790281944 • Fourways, Johannesburg
        </div>
      </div>
    `;

    return this.sendMail({
      to: params.studentEmail,
      subject: `Official Payment Clearance & Tax Invoice [${params.invoiceNumber}] — Flawless Institution`,
      html,
    });
  }

  /**
   * 3. Send Graduation Ceremony Invitation & Official Conferral
   */
  public async sendGraduationConferralEmail(params: {
    studentName: string;
    studentEmail: string;
    courseTitle: string;
    ceremonyVenue: string;
    ceremonyMonth: string;
    honorsAwarded: boolean;
  }): Promise<SendEmailResult> {
    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #0f172a; padding: 28px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 2px;">CONGRATULATIONS GRADUATE</h1>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #fbbf24;">Flawless Institution™ Academic Faculty Endorsement</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #1e293b; font-size: 18px; margin-top: 0;">Dear ${params.studentName},</h2>
          <p style="color: #475569; line-height: 1.6;">It is with great pleasure that Executive Director Teldah Siyawamwaya and the faculty council confer your completion of <strong>${params.courseTitle}</strong>${params.honorsAwarded ? ' <em>with Honours Distinction</em>' : ''}.</p>
          
          <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 6px; padding: 18px; margin: 20px 0;">
            <p style="margin: 0; font-weight: 700; color: #854d0e; font-size: 15px;">Annual Graduation Ceremony</p>
            <p style="margin: 6px 0 0 0; color: #713f12; font-size: 13px;"><strong>Ceremony Month:</strong> ${params.ceremonyMonth}</p>
            <p style="margin: 4px 0 0 0; color: #713f12; font-size: 13px;"><strong>Venue:</strong> ${params.ceremonyVenue}</p>
            <p style="margin: 4px 0 0 0; color: #713f12; font-size: 13px;"><strong>Certificate Issuance:</strong> Physical, embossed institutional certificate awarded in-person.</p>
          </div>

          <p style="color: #475569; line-height: 1.6;">You have also been added to our private graduate roster for candidate matching with verified luxury households and private family offices across South Africa and abroad.</p>
        </div>
      </div>
    `;

    return this.sendMail({
      to: params.studentEmail,
      subject: `Academic Graduation Conferral Notice — Flawless Institution`,
      html,
    });
  }
}

export const resendService = new ResendService();
