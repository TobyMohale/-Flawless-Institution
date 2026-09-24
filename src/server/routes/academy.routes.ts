/**
 * Flawless Institution™ - Academy & Academic Progress Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { academyService } from '../services/academy.service';
import { paymentService } from '../services/payment.service';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// POST /api/v1/academy/checkout (Public candidate enrollment checkout)
router.post('/checkout', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      courseId,
      mode,
      cohortId,
      studentName,
      studentEmail,
      studentPhone,
      paymentMethod,
      agreedToTerms,
    } = req.body;

    if (!courseId || !studentName || !studentEmail) {
      res.status(400).json({
        success: false,
        error: 'Missing required enrolment fields (courseId, studentName, studentEmail).',
      });
      return;
    }

    const payResult = await paymentService.initiatePayment({
      studentEmail,
      studentName,
      courseId,
      cohortId,
      paymentMethod: paymentMethod === 'bank-transfer' ? 'manual_eft' : (paymentMethod || 'manual_eft'),
      nonRefundableAcknowledged: agreedToTerms ?? true,
    });

    res.status(200).json({
      success: true,
      message: 'Enrolment checkout initiated successfully.',
      data: {
        referenceNumber: payResult.transaction.referenceNumber,
        transaction: payResult.transaction,
        eftInstructions: payResult.eftInstructions,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Checkout initiation failed.',
    });
  }
});

// POST /api/v1/academy/enrol
router.post('/enrol', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId, cohortId, mode, studentPhone } = req.body;

    if (!courseId || !cohortId || !mode) {
      res.status(400).json({
        success: false,
        error: 'Missing required enrolment fields (courseId, cohortId, mode).',
      });
      return;
    }

    const enrolment = await academyService.enrolStudent({
      studentId: req.user!.userId,
      studentName: req.user!.fullName,
      studentEmail: req.user!.email,
      studentPhone: studentPhone || '+27',
      courseId,
      cohortId,
      mode,
    });

    res.status(201).json({
      success: true,
      message: 'Enrolment created successfully. Please finalize tuition/registration payment.',
      data: enrolment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to complete enrolment.',
    });
  }
});

// GET /api/v1/academy/my-enrolments
router.get('/my-enrolments', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const enrolments = await academyService.getStudentEnrolments(req.user!.userId);
    res.status(200).json({
      success: true,
      data: enrolments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch your enrolments.',
    });
  }
});

// GET /api/v1/academy/enrolments/:id
router.get('/enrolments/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const enrolment = await academyService.getEnrolmentById(req.params.id);
    if (!enrolment) {
      res.status(404).json({ success: false, error: 'Enrolment record not found.' });
      return;
    }

    // Authorization check: student can only view own enrolment unless staff
    if (
      req.user!.role === 'student' &&
      enrolment.studentId !== req.user!.userId &&
      enrolment.studentEmail !== req.user!.email
    ) {
      res.status(403).json({ success: false, error: 'Access denied to this academic record.' });
      return;
    }

    res.status(200).json({
      success: true,
      data: enrolment,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/v1/academy/enrolments/:id/progress
router.post('/enrolments/:id/progress', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleIndex } = req.body;
    if (moduleIndex === undefined) {
      res.status(400).json({ success: false, error: 'moduleIndex is required.' });
      return;
    }

    const updated = await academyService.updateModuleProgress(req.params.id, Number(moduleIndex));
    res.status(200).json({
      success: true,
      message: 'Curriculum module progress updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/v1/academy/enrolments/:id/confer-graduation (Registrar / Admin only)
router.post(
  '/enrolments/:id/confer-graduation',
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const conferred = await academyService.conferGraduation(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Graduation credential conferred by the Registrar.',
        data: conferred,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// GET /api/v1/academy/enrolments/:id/verify-specimen
router.get('/enrolments/:id/verify-specimen', async (req: Request, res: Response): Promise<void> => {
  try {
    const verification = await academyService.verifyGraduationSpecimen(req.params.id);
    res.status(200).json({
      success: true,
      data: verification,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/v1/academy/admin/all-enrolments (Admin / Faculty)
router.get(
  '/admin/all-enrolments',
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const all = await academyService.getAllEnrolments();
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
