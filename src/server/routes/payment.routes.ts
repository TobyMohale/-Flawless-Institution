/**
 * Flawless Institution™ - South African Payments Engine Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { paymentService } from '../services/payment.service';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// POST /api/v1/payments/initiate
router.post('/initiate', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      studentEmail,
      studentName,
      courseId,
      cohortId,
      enrolmentId,
      paymentMethod,
      nonRefundableAcknowledged,
    } = req.body;

    if (!studentEmail || !studentName || !courseId || !paymentMethod) {
      res.status(400).json({
        success: false,
        error: 'Missing required payment initiation parameters.',
      });
      return;
    }

    if (!nonRefundableAcknowledged) {
      res.status(400).json({
        success: false,
        error: 'Acknowledgment of the non-refundable registration fee is mandatory under institutional policy.',
      });
      return;
    }

    const result = await paymentService.initiatePayment({
      studentEmail,
      studentName,
      courseId,
      cohortId,
      enrolmentId,
      paymentMethod,
      nonRefundableAcknowledged: Boolean(nonRefundableAcknowledged),
    });

    res.status(200).json({
      success: true,
      message: 'Payment initiation successful.',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Payment initiation failed.',
    });
  }
});

// POST /api/v1/payments/payfast-notify (PayFast Webhook ITN)
router.post('/payfast-notify', async (req: Request, res: Response): Promise<void> => {
  try {
    const itnData = req.body;
    const handled = await paymentService.handlePayFastNotification(itnData);
    res.status(200).send(`ITN Processed: ${handled.reference} - ${handled.status}`);
  } catch (error: any) {
    console.error('[PayFast ITN Error]:', error);
    res.status(400).send(`ITN Error: ${error.message}`);
  }
});

// POST /api/v1/payments/submit-manual-eft
router.post('/submit-manual-eft', async (req: Request, res: Response): Promise<void> => {
  try {
    const { transactionId, bankName, accountHolder, referenceUsed, depositDate, popNotes } = req.body;

    if (!transactionId || !referenceUsed || !depositDate) {
      res.status(400).json({
        success: false,
        error: 'Missing manual EFT deposit information.',
      });
      return;
    }

    const updated = await paymentService.submitManualEftProof({
      transactionId,
      bankName: bankName || 'Standard Bank',
      accountHolder,
      referenceUsed,
      depositDate,
      popNotes,
    });

    res.status(200).json({
      success: true,
      message: 'Proof of Payment logged. Accounts team will verify against Standard Bank corporate feed.',
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit EFT proof.',
    });
  }
});

// POST /api/v1/payments/admin/verify-eft (Finance & Admin only)
router.post(
  '/admin/verify-eft',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { transactionId, notes } = req.body;
      if (!transactionId) {
        res.status(400).json({ success: false, error: 'transactionId is required.' });
        return;
      }

      const verified = await paymentService.verifyManualEftPayment(
        transactionId,
        req.user!.fullName,
        notes
      );

      res.status(200).json({
        success: true,
        message: 'Payment marked CLEARED. Tax invoice generated and seat confirmed.',
        data: verified,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// GET /api/v1/payments/verify/:reference
router.get('/verify/:reference', async (req: Request, res: Response): Promise<void> => {
  try {
    const tx = await paymentService.getTransactionByRef(req.params.reference);
    if (!tx) {
      res.status(404).json({ success: false, error: 'Transaction reference not found.' });
      return;
    }
    res.status(200).json({
      success: true,
      data: tx,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/v1/payments/admin/all-transactions (Finance Admin only)
router.get(
  '/admin/all-transactions',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const all = await paymentService.getAllTransactions();
      res.status(200).json({
        success: true,
        data: all,
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
