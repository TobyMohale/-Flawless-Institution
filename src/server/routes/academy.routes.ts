/**
 * Flawless Institution™ - Academy & Enrolment Routes
 * API Mount: /api/v1/academy
 */
import { Router, Request, Response, NextFunction } from 'express';
import { academyService } from '../services/academy.service';
import { authService } from '../services/auth.service';
import { dbStore } from '../storage/inMemoryStore';
import { validateBody } from '../middleware/errorHandler';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import { 
  CourseCheckoutSchema, 
  UpdateProgressSchema, 
  ConferGraduationSchema 
} from '../models/schemas';

const router = Router();

/**
 * GET /api/v1/academy/cohorts
 * Public/Dashboard endpoint: list all active academic cohorts and capacity metrics.
 */
router.get('/cohorts', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cohorts = dbStore.getCohorts();
    res.status(200).json({
      success: true,
      count: cohorts.length,
      data: cohorts,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/academy/courses
 * Public/Dashboard endpoint: list all active academy courses.
 */
router.get('/courses', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = dbStore.getCourses();
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/academy/enrolments
 * Institutional registry endpoint: list all candidate enrolments across all cohorts.
 */
router.get('/enrolments', (_req: Request, res: Response, next: NextFunction) => {
  try {
    const enrolments = dbStore.getAllEnrolments();
    res.status(200).json({
      success: true,
      count: enrolments.length,
      data: enrolments,
    });
  } catch (err) {
    next(err);
  }
});

// Optional auth helper to check if a bearer token is present during guest checkout
function tryGetAuthenticatedUser(req: Request) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      return authService.verifyToken(token);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

/**
 * POST /api/v1/academy/checkout
 * Initiate enrolment for a course (Online or Fourways Physical Practical).
 */
router.post(
  '/checkout',
  validateBody(CourseCheckoutSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = tryGetAuthenticatedUser(req);
      const result = await academyService.createEnrolmentCheckout({
        ...req.body,
        authenticatedUserId: user?.userId,
      });

      res.status(201).json({
        success: true,
        message: 'Course enrolment order created successfully. Please complete payment.',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/academy/my-courses
 * Student Portal endpoint: retrieve all enrolled courses for the authenticated student.
 */
router.get('/my-courses', requireAuth, (req: Request, res: Response, next: NextFunction) => {
  try {
    const enrolments = academyService.getStudentEnrolments(req.user!.userId, req.user!.email);

    res.status(200).json({
      success: true,
      count: enrolments.length,
      data: enrolments,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/academy/enrolments/:id
 * Retrieve comprehensive syllabus modules, completion indicators, and academic standings.
 */
router.get('/enrolments/:id', requireAuth, (req: Request, res: Response, next: NextFunction) => {
  try {
    const isStaff = req.user!.role === 'super_admin' || req.user!.role === 'faculty';
    const details = academyService.getEnrolmentDetails(req.params.id, req.user!.userId, isStaff);

    res.status(200).json({
      success: true,
      data: details,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/academy/enrolments/:id/progress
 * Update completion status for a specific syllabus module.
 */
router.post(
  '/enrolments/:id/progress',
  requireAuth,
  validateBody(UpdateProgressSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const isStaff = req.user!.role === 'super_admin' || req.user!.role === 'faculty';
      const result = academyService.updateModuleProgress(
        req.params.id,
        req.body.moduleTitle,
        req.body.completed,
        req.user!.userId,
        isStaff
      );

      res.status(200).json({
        success: true,
        message: 'Academic module progress updated successfully',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/academy/graduation-roster
 * Institutional endpoint: retrieve candidates eligible for the Annual Fourways Graduation Ceremony.
 * Restricted to Faculty and Super Admin (Director).
 */
router.get(
  '/graduation-roster',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      const roster = academyService.getGraduationRoster();

      res.status(200).json({
        success: true,
        data: roster,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/academy/enrolments/:id/graduate
 * Institutional sign-off marking student as officially graduated.
 * Restricted to Faculty and Super Admin.
 */
router.post(
  '/enrolments/:id/graduate',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  validateBody(ConferGraduationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = academyService.conferGraduationStatus(
        req.params.id,
        req.body.instructorSignoffNotes,
        req.body.honorsAwarded,
        { fullName: req.user!.fullName, role: req.user!.role }
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export const academyRoutes = router;
