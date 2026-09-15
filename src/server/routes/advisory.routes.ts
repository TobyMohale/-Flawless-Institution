/**
 * Flawless Institution™ - Advisory CRM & Household Staffing Routes
 * Mount: /api/v1/advisory (and aliased at /api/v1/staffing)
 */
import { Router, Request, Response, NextFunction } from 'express';
import { advisoryService } from '../services/advisory.service';
import { validateBody } from '../middleware/errorHandler';
import { requireAuth, requireRole } from '../middleware/auth.middleware';
import {
  HouseholdBriefSchema,
  SpeakingEnquirySchema,
  UpdateSpeakingStatusSchema,
  UpdateBriefStatusSchema,
} from '../models/schemas';

const router = Router();

/**
 * POST /api/v1/advisory/household-brief
 * Public Intake: Submit employer household staffing requirements.
 */
router.post(
  '/household-brief',
  validateBody(HouseholdBriefSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = advisoryService.submitHouseholdBrief(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/advisory/briefs
 * Access Control: super_admin (full unredacted), faculty (VIP masked), employer (own briefs only).
 */
router.get(
  '/briefs',
  requireAuth,
  requireRole('super_admin', 'faculty', 'employer'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const briefs = advisoryService.getConfidentialBriefs(req.user!.role, req.user!.email);
      res.status(200).json({
        success: true,
        count: briefs.length,
        viewerRole: req.user!.role,
        data: briefs,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/advisory/briefs/:id/matches
 * Vetted Candidate Matching: Super Admin & Faculty query matching certified graduates.
 */
router.get(
  '/briefs/:id/matches',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = advisoryService.matchCandidatesForBrief(req.params.id);
      res.status(200).json({
        success: true,
        data: matches,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/v1/advisory/briefs/:id/status
 * Update Placement Brief Pipeline Status
 */
router.patch(
  '/briefs/:id/status',
  requireAuth,
  requireRole('super_admin', 'faculty'),
  validateBody(UpdateBriefStatusSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = advisoryService.updateBriefStatus(
        req.params.id,
        req.body.status,
        req.body.notes
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/advisory/speaking
 * Public Intake: Keynote and Masterclass Booking for Director Teldah Siyawamwaya.
 */
router.post(
  '/speaking',
  validateBody(SpeakingEnquirySchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = advisoryService.submitSpeakingEnquiry(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/v1/advisory/speaking
 * Restricted to Director / Super Admin.
 */
router.get(
  '/speaking',
  requireAuth,
  requireRole('super_admin'),
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      const enquiries = advisoryService.getSpeakingEnquiries();
      res.status(200).json({
        success: true,
        count: enquiries.length,
        data: enquiries,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/v1/advisory/speaking/:id/status
 * Restricted to Director / Super Admin: Update speaking pipeline review.
 */
router.patch(
  '/speaking/:id/status',
  requireAuth,
  requireRole('super_admin'),
  validateBody(UpdateSpeakingStatusSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = advisoryService.updateSpeakingStatus(
        req.params.id,
        req.body.status,
        req.body.adminNotes
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

export const advisoryRoutes = router;
