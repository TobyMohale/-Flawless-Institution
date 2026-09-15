/**
 * Flawless Institution™ - Course Catalog Routes
 * API Endpoint: /api/v1/catalog
 */
import { Router, Request, Response, NextFunction } from 'express';
import { catalogService } from '../services/catalog.service';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/v1/catalog - Complete catalog overview & intake schedule
router.get('/', (_req: Request, res: Response) => {
  const summary = catalogService.getCatalogSummary();
  res.status(200).json({
    success: true,
    data: summary,
  });
});

// GET /api/v1/catalog/courses - Detailed list of all active courses
router.get('/courses', (_req: Request, res: Response) => {
  const courses = catalogService.getAllCourses();
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// GET /api/v1/catalog/courses/:id - Single course with cohorts
router.get('/courses/:id', (req: Request, res: Response, next: NextFunction) => {
  const course = catalogService.getCourseById(req.params.id);
  if (!course) {
    return next(new AppError(`Course with ID '${req.params.id}' was not found`, 404, 'COURSE_NOT_FOUND'));
  }

  const cohorts = catalogService.getAvailableCohorts(req.params.id);

  res.status(200).json({
    success: true,
    data: {
      ...course,
      cohorts,
    },
  });
});

// GET /api/v1/catalog/cohorts - All available Fourways physical & online cohorts
router.get('/cohorts', (req: Request, res: Response) => {
  const courseId = typeof req.query.courseId === 'string' ? req.query.courseId : undefined;
  const cohorts = catalogService.getAvailableCohorts(courseId);

  res.status(200).json({
    success: true,
    count: cohorts.length,
    data: cohorts,
  });
});

export const catalogRoutes = router;
