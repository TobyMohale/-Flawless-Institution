/**
 * Flawless Institution™ - Advisory CRM, Household Staff Placement & Keynote Speaking Service
 * Founder & Executive Director: Teldah Siyawamwaya
 * Headquarters: Fourways, Johannesburg, South Africa
 */
import { dbStore } from '../storage/inMemoryStore';
import { HouseholdBrief, SpeakingEnquiry, HouseholdStaffRole } from '../types/domain.types';
import { HouseholdBriefInput, SpeakingEnquiryInput } from '../models/schemas';
import { AppError } from '../middleware/errorHandler';

export class AdvisoryService {
  /**
   * 1. Submit Confidential Household Staffing Brief
   */
  public submitHouseholdBrief(input: HouseholdBriefInput) {
    const briefId = `FI-ADVISORY-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const brief: HouseholdBrief = {
      id: briefId,
      employerName: input.employerName.trim(),
      contactEmail: input.contactEmail.toLowerCase().trim(),
      contactPhone: input.contactPhone.trim(),
      residenceArea: input.residenceArea.trim(),
      roleRequested: input.roleRequested as HouseholdStaffRole,
      placementType: input.placementType,
      privacyTier: input.privacyTier || 'Confidential',
      targetStartDate: input.targetStartDate,
      additionalNotes: input.additionalNotes?.trim(),
      status: 'new',
      createdAt: now,
    };

    const created = dbStore.createHouseholdBrief(brief);

    return {
      success: true,
      message: 'Household staffing brief registered with Flawless Institution Advisory Office.',
      briefReference: created.id,
      privacyTier: created.privacyTier,
      advisoryProtocol: {
        sla: 'A senior institutional advisor will review and contact you within 24 business hours.',
        confidentiality: created.privacyTier === 'High-Profile VIP' 
          ? 'Strict VIP Non-Disclosure Agreement (NDA) & POPIA encryption protocols applied.'
          : 'Standard Private Household Advisory Confidentiality applied.',
        vettingAssurance: 'All proposed candidates are certified graduates of Flawless Institution Fourways practical training programs.',
      },
      data: created,
    };
  }

  /**
   * 2. Retrieve Placement Briefs with POPIA Confidentiality Protection
   * High-Profile VIP briefs redact employer contact details for non-super_admin users.
   */
  public getConfidentialBriefs(viewerRole: string, viewerEmail?: string) {
    const allBriefs = dbStore.getAllHouseholdBriefs();

    // If viewer is an employer, only return their own submitted briefs
    if (viewerRole === 'employer' && viewerEmail) {
      return allBriefs.filter(b => b.contactEmail.toLowerCase() === viewerEmail.toLowerCase());
    }

    // Faculty or Super Admin view
    return allBriefs.map(brief => {
      // Super Admin has full unredacted clearance
      if (viewerRole === 'super_admin') {
        return brief;
      }

      // Faculty view: if High-Profile VIP, mask sensitive personal identifying details
      if (brief.privacyTier === 'High-Profile VIP') {
        return {
          ...brief,
          employerName: 'Confidential Family Office / Estate (VIP Protected)',
          contactEmail: '[POPIA Protected - Director Clearance Required]',
          contactPhone: '[POPIA Protected - Director Clearance Required]',
          isRedacted: true,
        };
      }

      return brief;
    });
  }

  /**
   * 3. Candidate Matching Logic for Household Staffing Brief
   * Matches certified graduates based on role syllabus and completion status.
   */
  public matchCandidatesForBrief(briefId: string) {
    const brief = dbStore.getHouseholdBriefById(briefId);
    if (!brief) {
      throw new AppError(`Household brief with ID '${briefId}' not found`, 404, 'BRIEF_NOT_FOUND');
    }

    // Role-to-course mapping matrix
    const roleCourseMap: Record<HouseholdStaffRole, string[]> = {
      'Executive Butler & Valet': ['executive-butler-valet'],
      'Executive Housekeeper': ['executive-housekeeping'],
      'Caregiver & Elderly Care': ['caregiver-elderly-care'],
      'Professional Au Pair / Nanny': ['au-pair-nanny-training'],
      'Private Chef / Cook': ['executive-butler-valet', 'executive-housekeeping'],
      'Estate Household Manager': ['executive-butler-valet', 'executive-housekeeping'],
    };

    const targetCourseIds = roleCourseMap[brief.roleRequested] || [];
    const allEnrolments = dbStore.getAllEnrolments();

    // Query graduates with completed modules or graduation conferred
    const qualifiedCandidates = allEnrolments.filter(enr => {
      const courseMatch = targetCourseIds.includes(enr.courseId);
      const isQualified = enr.status === 'completed' || enr.graduationConferred === true || enr.progressPercentage >= 80;
      return courseMatch && isQualified;
    });

    const recommendations = qualifiedCandidates.map(candidate => {
      return {
        candidateId: candidate.studentId,
        enrolmentId: candidate.id,
        fullName: candidate.studentName,
        contactEmail: candidate.studentEmail,
        contactPhone: candidate.studentPhone,
        accreditedQualification: candidate.courseTitle,
        trainingMode: candidate.mode,
        completionStatus: candidate.status === 'completed' ? 'Certified Graduate' : `${candidate.progressPercentage}% Completed (Finishing)`,
        graduationConferred: candidate.graduationConferred,
        conferredAt: candidate.graduationConferredAt,
        syllabusModulesVerified: candidate.completedModules.length,
        institutionEndorsement: candidate.graduationConferred 
          ? 'Fully Endorsed & Vetted by Executive Director Teldah Siyawamwaya'
          : 'Pending Final Practical Assessment Sign-Off',
      };
    });

    return {
      briefReference: brief.id,
      roleRequested: brief.roleRequested,
      residenceArea: brief.residenceArea,
      placementType: brief.placementType,
      privacyTier: brief.privacyTier,
      totalMatched: recommendations.length,
      recommendations,
    };
  }

  /**
   * 4. Update Household Placement Brief Status
   */
  public updateBriefStatus(
    briefId: string, 
    status: 'new' | 'advisory_review' | 'candidate_matching' | 'interviewing' | 'placed' | 'closed',
    notes?: string
  ) {
    const brief = dbStore.getHouseholdBriefById(briefId);
    if (!brief) {
      throw new AppError(`Household brief '${briefId}' not found`, 404, 'BRIEF_NOT_FOUND');
    }

    const updated = dbStore.updateHouseholdBrief(briefId, {
      status,
      additionalNotes: notes ? `${brief.additionalNotes || ''}\n[Status Update: ${status}] ${notes}`.trim() : brief.additionalNotes,
    });

    return {
      success: true,
      message: `Brief ${briefId} status updated to ${status}`,
      data: updated,
    };
  }

  /**
   * 5. Submit Keynote Speaking Enquiry for Director Teldah Siyawamwaya
   */
  public submitSpeakingEnquiry(input: SpeakingEnquiryInput) {
    const enquiryId = `spk-teldah-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const enquiry: SpeakingEnquiry = {
      id: enquiryId,
      hostOrganization: input.hostOrganization.trim(),
      contactPerson: input.contactPerson.trim(),
      contactEmail: input.contactEmail.toLowerCase().trim(),
      contactPhone: input.contactPhone.trim(),
      eventTheme: input.eventTheme.trim(),
      requestedDate: input.requestedDate,
      eventFormat: input.eventFormat,
      location: input.location.trim(),
      estimatedAudienceSize: input.estimatedAudienceSize || 50,
      budgetZAR: input.budgetZAR?.trim(),
      specialRequests: input.specialRequests?.trim(),
      status: 'received',
      createdAt: now,
    };

    const created = dbStore.createSpeakingEnquiry(enquiry);

    return {
      success: true,
      message: 'Speaking engagement enquiry submitted to the Executive Office of Teldah Siyawamwaya.',
      enquiryId: created.id,
      protocol: {
        speaker: 'Teldah Siyawamwaya (Founder & Director, Flawless Institution)',
        reviewTimeline: 'The Director’s executive team will review your event details and budget and respond within 48 business hours.',
        keynoteThemes: [
          'Elevating African Household Standards & Luxury Service Etiquette',
          'Professionalizing Domestic Staffing & Women Empowerment',
          'Building Resilient Hospitality & Care Businesses in South Africa',
        ],
      },
      data: created,
    };
  }

  /**
   * 6. Retrieve All Speaking Enquiries (Director / Super Admin Access)
   */
  public getSpeakingEnquiries() {
    return dbStore.getAllSpeakingEnquiries().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * 7. Update Speaking Engagement Status
   */
  public updateSpeakingStatus(
    id: string, 
    status: 'received' | 'under_review' | 'confirmed' | 'declined',
    adminNotes?: string
  ) {
    const enquiry = dbStore.getSpeakingEnquiryById(id);
    if (!enquiry) {
      throw new AppError(`Speaking enquiry with ID '${id}' not found`, 404, 'ENQUIRY_NOT_FOUND');
    }

    const updated = dbStore.updateSpeakingEnquiry(id, {
      status,
      specialRequests: adminNotes 
        ? `${enquiry.specialRequests || ''}\n[Director Note: ${status.toUpperCase()}] ${adminNotes}`.trim()
        : enquiry.specialRequests,
    });

    return {
      success: true,
      message: `Speaking enquiry ${id} updated to status: ${status}`,
      data: updated,
    };
  }
}

export const advisoryService = new AdvisoryService();
