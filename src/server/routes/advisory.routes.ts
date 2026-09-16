/**
 * Flawless Institution™ - Advisory, Placements & Speaking Booking Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { advisoryService } from '../services/advisory.service';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// POST /api/v1/advisory/household-brief
router.post('/household-brief', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      employerName,
      contactEmail,
      contactPhone,
      residenceArea,
      roleRequested,
      placementType,
      privacyTier,
      targetStartDate,
      additionalNotes,
    } = req.body;

    if (!employerName || !contactEmail || !contactPhone || !residenceArea || !roleRequested) {
      res.status(400).json({
        success: false,
        error: 'Missing required brief details (name, email, phone, area, role).',
      });
      return;
    }

    const brief = await advisoryService.submitHouseholdBrief({
      employerName,
      contactEmail,
      contactPhone,
      residenceArea,
      roleRequested,
      placementType: placementType || 'Live-In',
      privacyTier: privacyTier || 'Confidential',
      targetStartDate: targetStartDate || 'Immediate',
      additionalNotes,
    });

    res.status(201).json({
      success: true,
      message: 'Confidential household brief received. An advisory director will contact you.',
      data: brief,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit household brief.',
    });
  }
});

// GET /api/v1/advisory/household-briefs (Admin / Staff)
router.get(
  '/household-briefs',
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const briefs = await advisoryService.getHouseholdBriefs();
      res.status(200).json({
        success: true,
        data: briefs,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// GET /api/v1/advisory/household-briefs/:id
router.get(
  '/household-briefs/:id',
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const brief = await advisoryService.getHouseholdBriefById(req.params.id);
      if (!brief) {
        res.status(404).json({ success: false, error: 'Brief not found.' });
        return;
      }
      res.status(200).json({ success: true, data: brief });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// PATCH /api/v1/advisory/household-briefs/:id/status
router.patch(
  '/household-briefs/:id/status',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ success: false, error: 'Status is required.' });
        return;
      }
      const updated = await advisoryService.updateHouseholdBriefStatus(req.params.id, status);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
);

// POST /api/v1/advisory/speaking-enquiry
router.post('/speaking-enquiry', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      hostOrganization,
      contactPerson,
      contactEmail,
      contactPhone,
      eventTheme,
      requestedDate,
      eventFormat,
      location,
      estimatedAudienceSize,
      budgetZAR,
      specialRequests,
    } = req.body;

    if (!hostOrganization || !contactPerson || !contactEmail || !eventTheme || !requestedDate) {
      res.status(400).json({
        success: false,
        error: 'Missing required speaking enquiry fields.',
      });
      return;
    }

    const enquiry = await advisoryService.submitSpeakingEnquiry({
      hostOrganization,
      contactPerson,
      contactEmail,
      contactPhone: contactPhone || '',
      eventTheme,
      requestedDate,
      eventFormat: eventFormat || 'Keynote (In-Person)',
      location: location || 'Johannesburg, South Africa',
      estimatedAudienceSize: Number(estimatedAudienceSize) || 50,
      budgetZAR,
      specialRequests,
    });

    res.status(201).json({
      success: true,
      message: 'Speaking enquiry received for Toby Mohale. Management will review promptly.',
      data: enquiry,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit speaking enquiry.',
    });
  }
});

// GET /api/v1/advisory/speaking-enquiries (Admin)
router.get(
  '/speaking-enquiries',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const list = await advisoryService.getSpeakingEnquiries();
      res.status(200).json({
        success: true,
        data: list,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
);

// GET /api/v1/advisory/speaking-enquiries/:id
router.get(
  '/speaking-enquiries/:id',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const item = await advisoryService.getSpeakingEnquiryById(req.params.id);
      if (!item) {
        res.status(404).json({ success: false, error: 'Enquiry not found.' });
        return;
      }
      res.status(200).json({ success: true, data: item });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// PATCH /api/v1/advisory/speaking-enquiries/:id/status
router.patch(
  '/speaking-enquiries/:id/status',
  requireAuth,
  requireRole(['super_admin', 'admin']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.body;
      if (!status) {
        res.status(400).json({ success: false, error: 'Status is required.' });
        return;
      }
      const updated = await advisoryService.updateSpeakingEnquiryStatus(req.params.id, status);
      res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
);

export default router;
