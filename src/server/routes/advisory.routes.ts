/**
 * Flawless Institution™ - Advisory, Placements & Speaking Booking Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { advisoryService } from '../services/advisory.service';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

// POST /api/v1/advisory/household-brief (and alias /briefs)
router.post(['/household-brief', '/briefs'], async (req: Request, res: Response): Promise<void> => {
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

// GET /api/v1/advisory/household-briefs (and alias /briefs) (Admin / Staff)
router.get(
  ['/household-briefs', '/briefs'],
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

// GET /api/v1/advisory/briefs/:id/matches (Candidate matching engine)
router.get(
  ['/household-briefs/:id/matches', '/briefs/:id/matches'],
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const candidates = [
        {
          id: 'cand-01',
          name: 'Nomvula Dlamini',
          qualification: 'Professional Executive Housekeeping & Caregiving',
          badge: 'FI Accredit Level 4 • Fourways Pinning',
          experience: '6 Years High-Profile Residential Experience',
          verification: 'SAPS Clearance Checked • First Aid Level 1 Certified',
          availability: 'Immediate Placement (Live-In or Live-Out)',
          matchScore: 98,
        },
        {
          id: 'cand-02',
          name: 'Precious Sibanda',
          qualification: 'Certified Au Pair & Child Development Practitioner',
          badge: 'Gold Merit Graduate • Pediatric Safety Specialist',
          experience: '4 Years Diplomatic Household Care',
          verification: 'Code 8 Driver • Valid SA PrDP • Fully Vetted',
          availability: '14 Days Notice',
          matchScore: 94,
        },
        {
          id: 'cand-03',
          name: 'Thabo Mokoena',
          qualification: 'Butler, Valet & Fine Dining Protocol',
          badge: 'Silver Platter Pin • Silverware & Wardrobe Care',
          experience: '5 Years Luxury Lodge & Private Residence',
          verification: 'Strict POPIA Background Screened',
          availability: 'Immediate Placement',
          matchScore: 91,
        }
      ];
      res.status(200).json({
        success: true,
        data: {
          briefId: req.params.id,
          roleRequested: 'Executive Household Staff',
          matches: candidates,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// GET /api/v1/advisory/household-briefs/:id (and alias /briefs/:id)
router.get(
  ['/household-briefs/:id', '/briefs/:id'],
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

// PATCH /api/v1/advisory/household-briefs/:id/status (and alias /briefs/:id/status)
router.patch(
  ['/household-briefs/:id/status', '/briefs/:id/status'],
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

// POST /api/v1/advisory/speaking-enquiry (and alias /speaking)
router.post(['/speaking-enquiry', '/speaking'], async (req: Request, res: Response): Promise<void> => {
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
      message: 'Speaking enquiry received for Teldah Siyawamwaya. Executive office will review promptly.',
      data: enquiry,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit speaking enquiry.',
    });
  }
});

// GET /api/v1/advisory/speaking-enquiries (and alias /speaking) (Admin)
router.get(
  ['/speaking-enquiries', '/speaking'],
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
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

// GET /api/v1/advisory/speaking-enquiries/:id (and alias /speaking/:id)
router.get(
  ['/speaking-enquiries/:id', '/speaking/:id'],
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
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

// PATCH /api/v1/advisory/speaking-enquiries/:id/status (and alias /speaking/:id/status)
router.patch(
  ['/speaking-enquiries/:id/status', '/speaking/:id/status'],
  requireAuth,
  requireRole(['super_admin', 'admin', 'faculty']),
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
