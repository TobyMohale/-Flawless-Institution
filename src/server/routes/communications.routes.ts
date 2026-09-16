/**
 * Flawless Institution™ - Multi-Channel Communications Audit & Dispatch Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { communicationsService } from '../services/communications.service';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// GET /api/v1/communications/logs (Admin / Registrar only)
router.get(
  '/logs',
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (_req: Request, res: Response): Promise<void> => {
    try {
      const logs = await communicationsService.getLogs();
      res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to retrieve communication audit logs.',
      });
    }
  }
);

// POST /api/v1/communications/send-direct (Admin / Staff direct message)
router.post(
  '/send-direct',
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { channel, recipientName, recipientContact, subjectOrTitle, message } = req.body;

      if (!channel || !recipientName || !recipientContact || !message) {
        res.status(400).json({
          success: false,
          error: 'Missing required dispatch parameters.',
        });
        return;
      }

      const log = await communicationsService.sendDirectMessage(
        channel,
        recipientName,
        recipientContact,
        subjectOrTitle || 'Official Notice from Flawless Institution',
        message
      );

      res.status(200).json({
        success: true,
        message: 'Message dispatched and logged to audit trail.',
        data: log,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// POST /api/v1/communications/cohort-broadcast (Admin only)
router.post(
  '/cohort-broadcast',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { cohortId, cohortName, subject, messageBody } = req.body;

      if (!cohortId || !cohortName || !subject || !messageBody) {
        res.status(400).json({
          success: false,
          error: 'cohortId, cohortName, subject, and messageBody are required.',
        });
        return;
      }

      const result = await communicationsService.sendCohortBroadcast(
        cohortId,
        cohortName,
        subject,
        messageBody
      );

      res.status(200).json({
        success: true,
        message: `Broadcast dispatched to ${result.dispatched} registered scholars.`,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

export default router;
