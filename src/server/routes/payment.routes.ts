/**
 * Flawless Institution™ - Payment & Financial Invoicing Routes
 * API Mount: /api/v1/payments
 */
import { Router, Request, Response, NextFunction } from 'express';
import { paymentService } from '../services/payment.service';
import { dbStore } from '../storage/inMemoryStore';
import { validateBody, AppError } from '../middleware/errorHandler';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import {
  CreatePayFastPayloadSchema,
  ManualEftSubmitSchema,
  VerifyManualEftSchema,
} from '../models/schemas';

const router = Router();

/**
 * POST /api/v1/payments/payfast/create
 * Generate signed PayFast payload and redirect URL parameters for an order reference.
 */
router.post(
  '/payfast/create',
  validateBody(CreatePayFastPayloadSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = paymentService.generatePayFastPayload(req.body);
      res.status(200).json({
        success: true,
        message: 'PayFast checkout parameters generated successfully',
        data: payload,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/payments/payfast/notify
 * Public Webhook: PayFast Instant Transaction Notification (ITN)
 */
router.post('/payfast/notify', (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = paymentService.processPayFastWebhook(req.body);
    // PayFast expects 200 OK
    res.status(200).json({
      success: true,
      message: 'PayFast ITN processed successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/payments/ozow/notify
 * Public Webhook: Ozow Instant EFT Notification
 */
router.post('/ozow/notify', (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = paymentService.processOzowWebhook(req.body);
    res.status(200).json({
      success: true,
      message: 'Ozow Instant EFT notification processed',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/payments/manual-eft/submit
 * Submit proof-of-payment details for Standard Bank manual EFT transfers.
 */
router.post(
  '/manual-eft/submit',
  validateBody(ManualEftSubmitSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = paymentService.submitManualEftProof(req.body);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/payments/manual-eft/:ref/verify
 * Administrative Verification: Super Admin / Faculty marks manual EFT as cleared or failed.
 */
router.post(
  '/manual-eft/:ref/verify',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  validateBody(VerifyManualEftSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = paymentService.verifyManualEftTransaction(
        req.params.ref,
        req.body.verifiedStatus,
        req.body.verificationNotes,
        { fullName: req.user!.fullName, role: req.user!.role }
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/payments/invoice/:ref
 * Retrieve formatted South African SARS Tax Invoice for a transaction.
 */
router.get('/invoice/:ref', (req: Request, res: Response, next: NextFunction) => {
  try {
    const invoice = paymentService.generateTaxInvoice(req.params.ref);
    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/payments/transactions
 * List all financial transactions for institutional auditing and reconciliation.
 */
router.get('/transactions', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const all = dbStore.getAllTransactions();
    res.status(200).json({
      success: true,
      count: all.length,
      data: all,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/payments/transaction/:ref
 * Lookup transaction by reference number.
 */
router.get('/transaction/:ref', (req: Request, res: Response, next: NextFunction) => {
  try {
    const tx = dbStore.getTransactionByRef(req.params.ref);
    if (!tx) {
      throw new AppError(`Transaction reference '${req.params.ref}' not found`, 404, 'TRANSACTION_NOT_FOUND');
    }
    res.status(200).json({
      success: true,
      data: tx,
    });
  } catch (err) {
    next(err);
  }
});

export const paymentRoutes = router;
