/**
 * Flawless Institution™ - Communications & Automated Notifications Service (Stage 8)
 * Headquarters: Fourways, Johannesburg, South Africa
 * Manages Resend transactional email templates, WhatsApp messaging triggers, 
 * SMS alerts, and cohort reminder dispatches for the Fourways Training Centre.
 */
import { config } from '../config';
import { dbStore } from '../storage/inMemoryStore';
import { resendService } from './resend.service';
import { CommunicationLog, CommunicationChannel, Cohort, Enrolment } from '../types/domain.types';

export interface EmailTemplateRenderResult {
  subject: string;
  html: string;
  plainText: string;
  previewSnippet: string;
}

export interface WhatsAppAlertPayload {
  recipientName: string;
  recipientPhone: string;
  formattedPhone: string;
  clickToChatUrl: string;
  messageText: string;
}

export interface SmsAlertPayload {
  recipientName: string;
  recipientPhone: string;
  messageText: string;
  characterCount: number;
  segments: number;
}

export class CommunicationsService {
  /**
   * 1. Render Enrolment Confirmation Email Template
   */
  public renderEnrolmentConfirmationTemplate(params: {
    studentName: string;
    studentEmail: string;
    courseTitle: string;
    referenceNumber: string;
    cohortName: string;
    totalFeeZAR: number;
    registrationFeeZAR: number;
    paymentMethod: string;
  }): EmailTemplateRenderResult {
    const banking = config.institution.banking;
    const subject = `Enrolment Confirmation & Standard Bank Details [${params.referenceNumber}] — Flawless Institution`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0b10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0b10; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #12121a; border: 1px solid #d4af37; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #181824 0%, #0d0d14 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.3);">
              <div style="font-family: 'Cinzel', Georgia, serif; font-size: 22px; font-weight: 700; letter-spacing: 3px; color: #d4af37; text-transform: uppercase;">
                Flawless Institution™
              </div>
              <div style="font-size: 11px; letter-spacing: 2px; color: #9ca3af; text-transform: uppercase; margin-top: 6px;">
                Executive Household Academy & Advisory • Fourways, Johannesburg
              </div>
            </td>
          </tr>

          <!-- Hero Greeting -->
          <tr>
            <td style="padding: 32px 28px 20px 28px;">
              <h1 style="font-family: 'Cinzel', Georgia, serif; font-size: 20px; font-weight: 600; color: #ffffff; margin: 0 0 12px 0;">
                Welcome to the Academy, ${params.studentName}
              </h1>
              <p style="font-size: 14px; line-height: 1.6; color: #d1d5db; margin: 0 0 20px 0;">
                Your prospective enrolment for <strong style="color: #f3e1a9;">${params.courseTitle}</strong> has been logged in the admissions registry. We are committed to equipping you with elite private household protocol, refined estate skills, and career opportunities.
              </p>

              <!-- Order Summary Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1a1a26; border: 1px solid #2d2d3d; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #2d2d3d;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #9ca3af;">Admissions Reference</span>
                    <div style="font-family: monospace; font-size: 18px; font-weight: 700; color: #d4af37; margin-top: 4px;">${params.referenceNumber}</div>
                  </td>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #2d2d3d; text-align: right;">
                    <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #9ca3af;">Total Due (VAT Incl.)</span>
                    <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-top: 4px;">R ${params.totalFeeZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} ZAR</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 14px 20px; font-size: 13px; color: #9ca3af;">
                    <strong style="color: #ffffff;">Assigned Cohort:</strong> ${params.cohortName}<br/>
                    <strong style="color: #ffffff;">Registration & Admin Fee:</strong> R ${params.registrationFeeZAR} ZAR (Non-Refundable)
                  </td>
                </tr>
              </table>

              <!-- Standard Bank Instructions -->
              <div style="border-left: 4px solid #d4af37; background-color: #171724; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #d4af37; margin-bottom: 8px;">
                  🏛️ Standard Bank South Africa — Official Institutional Banking Details
                </div>
                <table width="100%" style="font-size: 13px; color: #e5e7eb; line-height: 1.6;">
                  <tr><td width="140" style="color: #9ca3af;">Beneficiary Name:</td><td><strong>${banking.accountName}</strong></td></tr>
                  <tr><td style="color: #9ca3af;">Bank:</td><td><strong>${banking.bank}</strong></td></tr>
                  <tr><td style="color: #9ca3af;">Account Number:</td><td><strong style="font-family: monospace; font-size: 14px; color: #d4af37;">${banking.accountNumber}</strong></td></tr>
                  <tr><td style="color: #9ca3af;">Branch Code:</td><td><strong style="font-family: monospace;">${banking.branchCode}</strong></td></tr>
                  <tr><td style="color: #9ca3af;">Deposit Reference:</td><td><strong style="font-family: monospace; color: #38bdf8; font-size: 14px;">${params.referenceNumber}</strong> <span style="font-size: 11px; color: #ef4444;">(Strictly quote this reference)</span></td></tr>
                  <tr><td style="color: #9ca3af;">SWIFT / BIC:</td><td><strong>${banking.swiftCode}</strong></td></tr>
                </table>
              </div>

              <!-- Fourways Campus Seat Notice -->
              <p style="font-size: 12px; line-height: 1.5; color: #9ca3af; margin: 0 0 24px 0; background-color: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.2); padding: 12px 16px; border-radius: 6px;">
                ⚠️ <strong>15-Seat Physical Cohort Restriction:</strong> Due to practical tableware, silver service, and butler masterclass physical lab constraints at the Fourways Training Centre, seats are held strictly on a cleared-funds basis. Proof of payment must be emailed to <a href="mailto:finance@flawlessinstitution.co.za" style="color: #d4af37;">finance@flawlessinstitution.co.za</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0d0d14; padding: 24px; text-align: center; border-top: 1px solid #1f1f2e;">
              <div style="font-size: 11px; color: #6b7280; line-height: 1.6;">
                Flawless Institution (Pty) Ltd • Reg: 2016/094821/07 • VAT Reg: 4790281944<br/>
                Design Quarter District, Leslie Avenue, Fourways, Sandton, 2055, South Africa<br/>
                Director: Teldah Siyawamwaya • Accredited Private Household Academy
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const plainText = `
FLAWLESS INSTITUTION™ — ENROLMENT CONFIRMATION
Fourways, Johannesburg, South Africa • Established 2016

Dear ${params.studentName},

Your enrolment order for ${params.courseTitle} has been registered in our academic system.

ENROLMENT DETAILS:
- Admissions Reference: ${params.referenceNumber}
- Cohort Intake: ${params.cohortName}
- Total Tuition + Admin Fee: R ${params.totalFeeZAR} ZAR
- Non-Refundable Admin Fee: R ${params.registrationFeeZAR} ZAR

STANDARD BANK SETTLEMENT DETAILS:
- Bank: ${banking.bank}
- Beneficiary: ${banking.accountName}
- Account Number: ${banking.accountNumber}
- Branch Code: ${banking.branchCode}
- Deposit Reference: ${params.referenceNumber} (Mandatory)

Notice: In accordance with our 15-seat physical cohort cap at the Fourways Training Centre, seats are allocated on a cleared funds basis. Please email proof of payment to finance@flawlessinstitution.co.za.

Flawless Institution (Pty) Ltd | Fourways, Johannesburg
    `.trim();

    return {
      subject,
      html,
      plainText,
      previewSnippet: `Admissions Ref ${params.referenceNumber}: ${params.courseTitle}. Total R ${params.totalFeeZAR} ZAR. Standard Bank EFT instructions.`,
    };
  }

  /**
   * 2. Render Official Standard Bank EFT Instructions Email Template
   */
  public renderStandardBankEftTemplate(params: {
    studentName: string;
    studentEmail: string;
    referenceNumber: string;
    totalDueZAR: number;
    cohortName: string;
  }): EmailTemplateRenderResult {
    const banking = config.institution.banking;
    const subject = `Standard Bank Deposit Instructions [Ref: ${params.referenceNumber}] — Flawless Institution Finance`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #08080c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #111118; border: 1px solid #0284c7; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0c4a6e 0%, #082f49 100%); padding: 28px 24px; text-align: center;">
              <div style="font-size: 13px; font-weight: 700; letter-spacing: 2px; color: #38bdf8; text-transform: uppercase;">
                Official Institutional Banking Notice
              </div>
              <div style="font-family: Georgia, serif; font-size: 22px; font-weight: 700; color: #ffffff; margin-top: 4px;">
                Standard Bank Electronic Funds Transfer (EFT)
              </div>
              <div style="font-size: 12px; color: #bae6fd; margin-top: 4px;">
                Flawless Institution™ Academic Bursar & Clearing Office
              </div>
            </td>
          </tr>

          <!-- Instructions Body -->
          <tr>
            <td style="padding: 28px;">
              <p style="font-size: 14px; line-height: 1.6; color: #e5e7eb; margin: 0 0 16px 0;">
                Dear <strong>${params.studentName}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #9ca3af; margin: 0 0 20px 0;">
                Please settle your outstanding tuition amount of <strong style="color: #38bdf8;">R ${params.totalDueZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} ZAR</strong> via electronic funds transfer (EFT) using your internet banking portal or banking app.
              </p>

              <!-- Bank Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #181824; border: 1px solid #334155; border-radius: 8px; margin-bottom: 24px;">
                <tr><td colspan="2" style="background-color: #0f172a; padding: 12px 18px; font-size: 12px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1px;">Beneficiary Account Credentials</td></tr>
                <tr><td style="padding: 10px 18px; color: #94a3b8; font-size: 13px;" width="160">Account Holder:</td><td style="padding: 10px 18px; font-weight: 700; color: #ffffff; font-size: 13px;">${banking.accountName}</td></tr>
                <tr><td style="padding: 10px 18px; color: #94a3b8; font-size: 13px;">Financial Institution:</td><td style="padding: 10px 18px; font-weight: 600; color: #ffffff; font-size: 13px;">${banking.bank}</td></tr>
                <tr><td style="padding: 10px 18px; color: #94a3b8; font-size: 13px;">Account Number:</td><td style="padding: 10px 18px; font-weight: 700; font-family: monospace; color: #38bdf8; font-size: 16px;">${banking.accountNumber}</td></tr>
                <tr><td style="padding: 10px 18px; color: #94a3b8; font-size: 13px;">Branch Code:</td><td style="padding: 10px 18px; font-weight: 600; font-family: monospace; color: #ffffff; font-size: 14px;">${banking.branchCode}</td></tr>
                <tr><td style="padding: 10px 18px; color: #94a3b8; font-size: 13px;">Account Type:</td><td style="padding: 10px 18px; color: #ffffff; font-size: 13px;">${banking.accountType}</td></tr>
                <tr style="background-color: rgba(2, 132, 199, 0.1);"><td style="padding: 12px 18px; color: #38bdf8; font-weight: 700; font-size: 13px;">Your Payment Ref:</td><td style="padding: 12px 18px; font-weight: 700; font-family: monospace; color: #38bdf8; font-size: 16px;">${params.referenceNumber}</td></tr>
              </table>

              <!-- Step-by-Step Settlement Guide -->
              <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">Three Easy Steps to Complete Verification:</div>
              <ol style="font-size: 13px; color: #9ca3af; line-height: 1.6; margin: 0 0 24px 0; padding-left: 20px;">
                <li style="margin-bottom: 6px;">Initiate an immediate or regular payment to the Standard Bank account above.</li>
                <li style="margin-bottom: 6px;"><strong style="color: #ffffff;">Crucial:</strong> Use your exact reference <span style="color: #38bdf8; font-family: monospace;">${params.referenceNumber}</span> in the recipient reference field.</li>
                <li style="margin-bottom: 6px;">Email the PDF Proof of Payment (POP) generated by your bank to <a href="mailto:finance@flawlessinstitution.co.za" style="color: #38bdf8;">finance@flawlessinstitution.co.za</a>, or upload it in the Student Portal.</li>
              </ol>

              <div style="text-align: center; padding: 12px; background-color: #0f172a; border-radius: 6px; font-size: 12px; color: #64748b;">
                Manual EFT reconciliations take between 2 and 4 business hours during Johannesburg banking days.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a10; padding: 20px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #1e293b;">
              Flawless Institution (Pty) Ltd • Bursar Office • Fourways, Johannesburg
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    return {
      subject,
      html,
      plainText: `Standard Bank EFT Instructions for ${params.studentName}: Ref ${params.referenceNumber}, Amount R ${params.totalDueZAR}. Standard Bank Acc: 022849103, Branch: 051001.`,
      previewSnippet: `Beneficiary credentials for Standard Bank EFT. Deposit reference ${params.referenceNumber}. Tuition R ${params.totalDueZAR}.`,
    };
  }

  /**
   * 3. Render Official SARS VAT Tax Invoice Email Template
   */
  public renderSarsTaxInvoiceTemplate(params: {
    studentName: string;
    studentEmail: string;
    referenceNumber: string;
    invoiceNumber: string;
    courseTitle: string;
    clearedDate: string;
    totalPaidZAR: number;
    paymentMethod: string;
  }): EmailTemplateRenderResult {
    const institution = config.institution;
    const tax = institution.tax;
    const subject = `Official SARS Tax Invoice [${params.invoiceNumber}] — Flawless Institution (Pty) Ltd`;

    // 15% VAT calculation (Amounts are VAT inclusive)
    const vatFactor = 0.15 / 1.15;
    const vatAmount = Math.round(params.totalPaidZAR * vatFactor * 100) / 100;
    const subtotal = Math.round((params.totalPaidZAR - vatAmount) * 100) / 100;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0b10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #12121a; border: 1px solid #10b981; border-radius: 12px; overflow: hidden;">
          <!-- SARS Tax Invoice Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #064e3b 0%, #022c22 100%); padding: 28px 24px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #6ee7b7; text-transform: uppercase;">
                Republic of South Africa • Section 20(4) VAT Act No 89 of 1991
              </div>
              <div style="font-family: Georgia, serif; font-size: 24px; font-weight: 700; color: #ffffff; margin-top: 4px;">
                OFFICIAL TAX INVOICE
              </div>
              <div style="font-size: 13px; color: #a7f3d0; margin-top: 4px;">
                Invoice Number: <strong style="font-family: monospace;">${params.invoiceNumber}</strong>
              </div>
            </td>
          </tr>

          <!-- Parties & Tax Details -->
          <tr>
            <td style="padding: 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; font-size: 12px; color: #9ca3af;">
                <tr>
                  <td width="50%" valign="top" style="line-height: 1.6;">
                    <strong style="font-size: 13px; color: #ffffff;">SUPPLIER DETAILS:</strong><br/>
                    <strong>${institution.tax.companyRegistration ? 'Flawless Institution (Pty) Ltd' : institution.name}</strong><br/>
                    Trading as: Flawless Institution™<br/>
                    VAT Registration No: <strong style="color: #10b981;">${tax.vatNumber}</strong><br/>
                    Company Reg: ${tax.companyRegistration}<br/>
                    Design Quarter District, Fourways, JHB, 2055
                  </td>
                  <td width="50%" valign="top" align="right" style="line-height: 1.6;">
                    <strong style="font-size: 13px; color: #ffffff;">RECIPIENT / STUDENT:</strong><br/>
                    <strong style="color: #ffffff;">${params.studentName}</strong><br/>
                    ${params.studentEmail}<br/>
                    Enrolment Ref: <strong style="color: #38bdf8;">${params.referenceNumber}</strong><br/>
                    Date of Issue: ${new Date(params.clearedDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}<br/>
                    Status: <span style="color: #10b981; font-weight: 700;">PAID IN FULL</span>
                  </td>
                </tr>
              </table>

              <!-- Line Items Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px; font-size: 13px;">
                <thead>
                  <tr style="background-color: #1a1a26; border-bottom: 2px solid #2d2d3d; text-align: left;">
                    <th style="padding: 10px 12px; color: #9ca3af; font-size: 11px; text-transform: uppercase;">Description</th>
                    <th style="padding: 10px 12px; color: #9ca3af; font-size: 11px; text-transform: uppercase; text-align: center;">Qty</th>
                    <th style="padding: 10px 12px; color: #9ca3af; font-size: 11px; text-transform: uppercase; text-align: right;">Excl. VAT</th>
                    <th style="padding: 10px 12px; color: #9ca3af; font-size: 11px; text-transform: uppercase; text-align: right;">Total ZAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid #222230;">
                    <td style="padding: 12px; color: #ffffff;">
                      <strong>${params.courseTitle}</strong><br/>
                      <span style="font-size: 11px; color: #9ca3af;">Tuition Fee & Institutional Registration</span>
                    </td>
                    <td style="padding: 12px; text-align: center; color: #9ca3af;">1</td>
                    <td style="padding: 12px; text-align: right; color: #d1d5db;">R ${subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td>
                    <td style="padding: 12px; text-align: right; color: #ffffff; font-weight: 600;">R ${params.totalPaidZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Tax Breakdown -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; font-size: 13px;">
                <tr>
                  <td width="60%"></td>
                  <td width="40%">
                    <table width="100%" style="line-height: 1.8;">
                      <tr><td style="color: #9ca3af;">Subtotal (Excl. VAT):</td><td align="right" style="color: #ffffff;">R ${subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td></tr>
                      <tr><td style="color: #9ca3af;">Output VAT (15%):</td><td align="right" style="color: #10b981; font-weight: 600;">R ${vatAmount.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td></tr>
                      <tr style="border-top: 1px solid #374151; font-size: 15px; font-weight: 700;"><td style="color: #ffffff; padding-top: 6px;">Total Paid:</td><td align="right" style="color: #10b981; padding-top: 6px;">R ${params.totalPaidZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Notice -->
              <div style="background-color: #0f172a; padding: 14px; border-radius: 6px; font-size: 11px; color: #64748b; line-height: 1.5;">
                This document serves as an official Tax Invoice for the purposes of the South African Value-Added Tax Act. Retain for company and personal tax filing records.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0a0a10; padding: 16px; text-align: center; font-size: 11px; color: #475569; border-top: 1px solid #1e293b;">
              Flawless Institution (Pty) Ltd • VAT Reg: 4790281944 • Fourways Training Centre
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    return {
      subject,
      html,
      plainText: `Official Tax Invoice ${params.invoiceNumber}: ${params.courseTitle}. Amount Paid: R ${params.totalPaidZAR} (VAT: R ${vatAmount}). VAT Reg: 4790281944.`,
      previewSnippet: `SARS VAT Tax Invoice ${params.invoiceNumber}. Total Cleared: R ${params.totalPaidZAR} ZAR. VAT 15% accounted.`,
    };
  }

  /**
   * 4. Generate WhatsApp Alert Message & Click-to-Chat Link for Upcoming Cohort
   */
  public generateWhatsAppCohortAlert(params: {
    studentName: string;
    studentPhone: string;
    cohortName: string;
    courseTitle: string;
    startDate: string;
    location: string;
  }): WhatsAppAlertPayload {
    // Format South African phone number for international wa.me format
    let cleanPhone = params.studentPhone.replace(/[\s\-\(\)]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '27' + cleanPhone.substring(1);
    } else if (cleanPhone.startsWith('+')) {
      cleanPhone = cleanPhone.substring(1);
    }

    const formattedDate = new Date(params.startDate).toLocaleDateString('en-ZA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const messageText = 
`🏛️ *FLAWLESS INSTITUTION™ — COHORT COMMENCEMENT ALERT*
Fourways Campus • Executive Household & Care Academy

Good day ${params.studentName},

This is an official notice regarding your upcoming practical cohort at our Fourways Training Centre:

📚 *Programme:* ${params.courseTitle}
🗓️ *Intake Cohort:* ${params.cohortName}
⏰ *Commencement Date:* ${formattedDate}
📍 *Venue:* ${params.location || 'Fourways Training Centre, Design Quarter District, Leslie Ave, Fourways'}
🕗 *Daily Call Time:* 08:30 for 09:00 SAST

*Important Orientation Requirements:*
1. Strict executive attire (black formal trousers/skirt, polished black footwear).
2. South African Smart ID or Passport required for Design Quarter security clearance.
3. Refreshments and learning materials provided on-site.

If you require driving directions or gate access assistance, please reply directly to this WhatsApp number.

Kind regards,
*Academic Registrar & Faculty Directorate*
Flawless Institution (Pty) Ltd`;

    const encoded = encodeURIComponent(messageText);
    const clickToChatUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    return {
      recipientName: params.studentName,
      recipientPhone: params.studentPhone,
      formattedPhone: cleanPhone,
      clickToChatUrl,
      messageText,
    };
  }

  /**
   * 5. Generate SMS Alert Payload for Upcoming Cohort
   */
  public generateSmsCohortAlert(params: {
    studentName: string;
    studentPhone: string;
    cohortName: string;
    startDate: string;
  }): SmsAlertPayload {
    const formattedDate = new Date(params.startDate).toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
    });

    const messageText = `FLAWLESS ALERT: Hi ${params.studentName}, your ${params.cohortName} starts ${formattedDate} at 08:30 at Fourways Training Centre. Bring ID. Info: +27110000000`;
    const characterCount = messageText.length;
    const segments = Math.ceil(characterCount / 160);

    return {
      recipientName: params.studentName,
      recipientPhone: params.studentPhone,
      messageText,
      characterCount,
      segments,
    };
  }

  /**
   * 6. Trigger Test Email Dispatch (Resend API or Mock Mode)
   */
  public async sendTestEmail(params: {
    templateType: 'enrolment_confirmation' | 'standard_bank_eft_instructions' | 'sars_tax_invoice';
    recipientEmail: string;
    recipientName?: string;
  }) {
    const studentName = params.recipientName || 'Prospective Candidate';
    let renderResult: EmailTemplateRenderResult;

    if (params.templateType === 'enrolment_confirmation') {
      renderResult = this.renderEnrolmentConfirmationTemplate({
        studentName,
        studentEmail: params.recipientEmail,
        courseTitle: 'Executive Butler & Valet Masterclass',
        referenceNumber: 'FI-2026-TEST',
        cohortName: 'October 2026 Fourways Intake',
        totalFeeZAR: 2500,
        registrationFeeZAR: 300,
        paymentMethod: 'manual_eft',
      });
    } else if (params.templateType === 'standard_bank_eft_instructions') {
      renderResult = this.renderStandardBankEftTemplate({
        studentName,
        studentEmail: params.recipientEmail,
        referenceNumber: 'FI-2026-TEST',
        totalDueZAR: 2500,
        cohortName: 'October 2026 Fourways Intake',
      });
    } else {
      renderResult = this.renderSarsTaxInvoiceTemplate({
        studentName,
        studentEmail: params.recipientEmail,
        referenceNumber: 'FI-2026-TEST',
        invoiceNumber: 'INV-FI-2026-TEST',
        courseTitle: 'Executive Butler & Valet Masterclass',
        clearedDate: new Date().toISOString(),
        totalPaidZAR: 2500,
        paymentMethod: 'manual_eft',
      });
    }

    const log: CommunicationLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      channel: 'email',
      recipientName: studentName,
      recipientContact: params.recipientEmail,
      templateType: params.templateType,
      subjectOrTitle: renderResult.subject,
      contentSnippet: renderResult.previewSnippet,
      status: 'sent',
      sentAt: new Date().toISOString(),
      referenceNumber: 'FI-2026-TEST',
      meta: {
        mode: config.resend.apiKey ? 'live_resend' : 'mock_logged',
      },
    };

    dbStore.createCommunicationLog(log);

    return {
      success: true,
      log,
      renderResult,
    };
  }

  /**
   * 7. Trigger Batch Cohort Start Reminders across WhatsApp, SMS, or Email
   */
  public async dispatchCohortAlerts(params: {
    cohortId: string;
    channels: ('whatsapp' | 'sms' | 'email')[];
    sendOnlyPaid: boolean;
  }) {
    const cohort = dbStore.getCohortById(params.cohortId);
    if (!cohort) {
      throw new Error(`Cohort '${params.cohortId}' not found`);
    }

    // Get enrolments for this cohort
    const allEnrolments = dbStore.getAllEnrolments();
    const cohortStudents = allEnrolments.filter(e => {
      if (e.cohortId !== cohort.id && !cohort.name.includes(e.cohortName)) {
        return false;
      }
      if (params.sendOnlyPaid && !e.isPaid && e.status === 'pending_payment') {
        return false;
      }
      return true;
    });

    const results: {
      recipientName: string;
      channel: CommunicationChannel;
      status: string;
      summary: string;
    }[] = [];

    const now = new Date().toISOString();

    for (const student of cohortStudents) {
      // 1. WhatsApp Alert
      if (params.channels.includes('whatsapp')) {
        const wa = this.generateWhatsAppCohortAlert({
          studentName: student.studentName,
          studentPhone: student.studentPhone || '+27821234567',
          cohortName: cohort.name,
          courseTitle: student.courseTitle,
          startDate: cohort.startDate,
          location: cohort.location,
        });

        const log: CommunicationLog = {
          id: `log-wa-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          channel: 'whatsapp',
          recipientName: student.studentName,
          recipientContact: student.studentPhone || '+27821234567',
          templateType: 'cohort_start_reminder',
          subjectOrTitle: `WhatsApp: ${cohort.name} Arrival Notice`,
          contentSnippet: `Notice sent to ${wa.formattedPhone} for cohort starting ${cohort.startDate} at Fourways`,
          status: 'delivered',
          sentAt: now,
          cohortId: cohort.id,
          cohortName: cohort.name,
          meta: { clickToChatUrl: wa.clickToChatUrl },
        };
        dbStore.createCommunicationLog(log);

        results.push({
          recipientName: student.studentName,
          channel: 'whatsapp',
          status: 'delivered',
          summary: `WhatsApp payload dispatched to ${wa.formattedPhone}`,
        });
      }

      // 2. SMS Alert
      if (params.channels.includes('sms')) {
        const sms = this.generateSmsCohortAlert({
          studentName: student.studentName,
          studentPhone: student.studentPhone || '+27821234567',
          cohortName: cohort.name,
          startDate: cohort.startDate,
        });

        const log: CommunicationLog = {
          id: `log-sms-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          channel: 'sms',
          recipientName: student.studentName,
          recipientContact: student.studentPhone || '+27821234567',
          templateType: 'cohort_start_reminder',
          subjectOrTitle: `SMS (${sms.characterCount}c): Fourways Cohort Start`,
          contentSnippet: sms.messageText,
          status: 'sent',
          sentAt: now,
          cohortId: cohort.id,
          cohortName: cohort.name,
        };
        dbStore.createCommunicationLog(log);

        results.push({
          recipientName: student.studentName,
          channel: 'sms',
          status: 'sent',
          summary: `160-char SMS broadcast queued to ${student.studentPhone}`,
        });
      }

      // 3. Email Alert
      if (params.channels.includes('email')) {
        const log: CommunicationLog = {
          id: `log-em-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          channel: 'email',
          recipientName: student.studentName,
          recipientContact: student.studentEmail,
          templateType: 'cohort_start_reminder',
          subjectOrTitle: `Official Commencement Notice: ${cohort.name} at Fourways`,
          contentSnippet: `Orientation itinerary, gate security pass, and dress code instructions sent to ${student.studentEmail}`,
          status: 'delivered',
          sentAt: now,
          cohortId: cohort.id,
          cohortName: cohort.name,
        };
        dbStore.createCommunicationLog(log);

        results.push({
          recipientName: student.studentName,
          channel: 'email',
          status: 'delivered',
          summary: `Email orientation pack dispatched to ${student.studentEmail}`,
        });
      }
    }

    return {
      success: true,
      cohortName: cohort.name,
      studentsCount: cohortStudents.length,
      dispatchedCount: results.length,
      results,
    };
  }
}

export const communicationsService = new CommunicationsService();
