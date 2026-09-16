/**
 * Flawless Institution™ - Public Catalog & Schedules Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { catalogService } from '../services/catalog.service';

const router = Router();

// GET /api/v1/catalog/courses
router.get('/courses', async (_req: Request, res: Response): Promise<void> => {
  try {
    const courses = await catalogService.getAllCourses();
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to load courses.',
    });
  }
});

// GET /api/v1/catalog/courses/:id
router.get('/courses/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const course = await catalogService.getCourseById(req.params.id);
    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found.' });
      return;
    }
    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/v1/catalog/cohorts
router.get('/cohorts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.query;
    const cohorts = await catalogService.getCohorts(courseId as string | undefined);
    res.status(200).json({
      success: true,
      data: cohorts,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to load intake schedules.',
    });
  }
});

// GET /api/v1/catalog/cohorts/:id
router.get('/cohorts/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const cohort = await catalogService.getCohortById(req.params.id);
    if (!cohort) {
      res.status(404).json({ success: false, error: 'Cohort schedule not found.' });
      return;
    }
    res.status(200).json({
      success: true,
      data: cohort,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
