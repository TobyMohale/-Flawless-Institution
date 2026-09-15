/**
 * Flawless Institution™ - Communications & Automated Notifications Routes (Stage 8)
 * API Mount: /api/v1/communications
 */
import { Router, Request, Response, NextFunction } from 'express';
import { communicationsService } from '../services/communications.service';
import { dbStore } from '../storage/inMemoryStore';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * GET /api/v1/communications/logs
 * Retrieve all notification dispatch logs with optional channel/cohort filters.
 */
router.get('/logs', (req: Request, res: Response) => {
  const { channel, cohortId, search } = req.query;

  let logs = dbStore.getAllCommunicationLogs();

  if (channel && typeof channel === 'string' && channel !== 'all') {
    logs = logs.filter(l => l.channel === channel);
  }

  if (cohortId && typeof cohortId === 'string' && cohortId !== 'all') {
    logs = logs.filter(l => l.cohortId === cohortId);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    logs = logs.filter(
      l =>
        l.recipientName.toLowerCase().includes(q) ||
        l.recipientContact.toLowerCase().includes(q) ||
        l.subjectOrTitle.toLowerCase().includes(q)
    );
  }

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs,
  });
});

/**
 * GET /api/v1/communications/template-preview
 * Render real-time HTML and plain text for an email template.
 */
router.get('/template-preview', (req: Request, res: Response) => {
  const templateType = (req.query.template as string) || 'enrolment_confirmation';
  const studentName = (req.query.name as string) || 'Thabo Mokoena';
  const studentEmail = (req.query.email as string) || 'student@flawlessinstitution.co.za';
  const ref = (req.query.ref as string) || 'FI-2026-8801';

  let result;
  if (templateType === 'standard_bank_eft_instructions') {
    result = communicationsService.renderStandardBankEftTemplate({
      studentName,
      studentEmail,
      referenceNumber: ref,
      totalDueZAR: 1800,
      cohortName: 'September 2026 Intensive (Physical Fourways)',
    });
  } else if (templateType === 'sars_tax_invoice') {
    result = communicationsService.renderSarsTaxInvoiceTemplate({
      studentName,
      studentEmail,
      referenceNumber: ref,
      invoiceNumber: `INV-FI-${ref.replace('FI-', '')}`,
      courseTitle: 'Caregiving & Elderly Care Intensive',
      clearedDate: new Date().toISOString(),
      totalPaidZAR: 1800,
      paymentMethod: 'manual_eft',
    });
  } else {
    result = communicationsService.renderEnrolmentConfirmationTemplate({
      studentName,
      studentEmail,
      courseTitle: 'Caregiving & Elderly Care Intensive',
      referenceNumber: ref,
      cohortName: 'September 2026 Intensive (Physical Fourways)',
      totalFeeZAR: 1800,
      registrationFeeZAR: 300,
      paymentMethod: 'manual_eft',
    });
  }

  res.status(200).json({
    success: true,
    templateType,
    data: result,
  });
});

/**
 * POST /api/v1/communications/whatsapp-preview
 * Generate formatted WhatsApp message & click-to-chat URL.
 */
router.post('/whatsapp-preview', (req: Request, res: Response) => {
  const { studentName, studentPhone, cohortName, courseTitle, startDate, location } = req.body;

  const payload = communicationsService.generateWhatsAppCohortAlert({
    studentName: studentName || 'Academy Student',
    studentPhone: studentPhone || '+27 82 123 4567',
    cohortName: cohortName || 'Executive Butler & Valet Intake',
    courseTitle: courseTitle || 'Executive Butler & Valet',
    startDate: startDate || '2026-10-01',
    location: location || 'Fourways Training Centre, Design Quarter District, Johannesburg',
  });

  res.status(200).json({
    success: true,
    data: payload,
  });
});

/**
 * POST /api/v1/communications/sms-preview
 * Generate GSM SMS text & segment breakdown.
 */
router.post('/sms-preview', (req: Request, res: Response) => {
  const { studentName, studentPhone, cohortName, startDate } = req.body;

  const payload = communicationsService.generateSmsCohortAlert({
    studentName: studentName || 'Student',
    studentPhone: studentPhone || '+27 82 123 4567',
    cohortName: cohortName || 'Executive Butler Intake',
    startDate: startDate || '2026-10-01',
  });

  res.status(200).json({
    success: true,
    data: payload,
  });
});

/**
 * POST /api/v1/communications/test-email
 * Dispatch test email to specified recipient.
 */
router.post(
  '/test-email',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { templateType, recipientEmail, recipientName } = req.body;
      if (!recipientEmail) {
        return res.status(400).json({ success: false, error: 'recipientEmail is required' });
      }

      const result = await communicationsService.sendTestEmail({
        templateType: templateType || 'enrolment_confirmation',
        recipientEmail,
        recipientName,
      });

      res.status(200).json({
        success: true,
        message: `Transactional template dispatched to ${recipientEmail}`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/communications/cohort-alerts
 * Dispatch batch WhatsApp / SMS / Email cohort start reminders.
 */
router.post(
  '/cohort-alerts',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cohortId, channels, sendOnlyPaid } = req.body;
      if (!cohortId) {
        return res.status(400).json({ success: false, error: 'cohortId is required' });
      }

      const result = await communicationsService.dispatchCohortAlerts({
        cohortId,
        channels: channels || ['whatsapp', 'sms'],
        sendOnlyPaid: sendOnlyPaid ?? false,
      });

      res.status(200).json({
        success: true,
        message: `Alerts dispatched for cohort ${result.cohortName}`,
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

export const communicationsRoutes = router;
