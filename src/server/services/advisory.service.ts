/**
 * Flawless Institution™ - Advisory, Executive Staffing & Keynote Booking Service
 * Fourways, Johannesburg, South Africa
 */
import {
  HouseholdBrief,
  HouseholdStaffRole,
  PrivacyTier,
  SpeakingEnquiry,
} from '../types/domain.types';
import { dbStore } from '../storage/supabaseStore';
import { communicationsService } from './communications.service';

export interface HouseholdBriefDTO {
  employerName: string;
  contactEmail: string;
  contactPhone: string;
  residenceArea: string;
  roleRequested: HouseholdStaffRole;
  placementType: 'Live-In' | 'Live-Out';
  privacyTier: PrivacyTier;
  targetStartDate: string;
  additionalNotes?: string;
}

export interface SpeakingEnquiryDTO {
  hostOrganization: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  eventTheme: string;
  requestedDate: string;
  eventFormat: 'Keynote (In-Person)' | 'Executive Masterclass' | 'Virtual Keynote' | 'Panelist';
  location: string;
  estimatedAudienceSize?: number;
  budgetZAR?: string;
  specialRequests?: string;
}

class AdvisoryService {
  /**
   * Submits a confidential staffing intake brief for high-net-worth households
   */
  public async submitHouseholdBrief(dto: HouseholdBriefDTO): Promise<HouseholdBrief> {
    const briefId = `brf-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    const brief: HouseholdBrief = {
      id: briefId,
      employerName: dto.employerName.trim(),
      contactEmail: dto.contactEmail.toLowerCase().trim(),
      contactPhone: dto.contactPhone.trim(),
      residenceArea: dto.residenceArea.trim(),
      roleRequested: dto.roleRequested,
      placementType: dto.placementType,
      privacyTier: dto.privacyTier || 'Confidential',
      targetStartDate: dto.targetStartDate,
      additionalNotes: dto.additionalNotes,
      status: 'new',
      createdAt: now,
    };

    await dbStore.createHouseholdBrief(brief);

    // Dispatch confidential intake acknowledgment
    try {
      await communicationsService.sendAdvisoryIntakeNotice(brief);
    } catch (commErr) {
      console.warn('[AdvisoryService] Intake notice skipped:', commErr);
    }

    return brief;
  }

  /**
   * Retrieves all confidential household placement briefs (Admin/Advisory view)
   */
  public async getHouseholdBriefs(): Promise<HouseholdBrief[]> {
    return await dbStore.getAllHouseholdBriefs();
  }

  /**
   * Retrieves a single household brief by ID
   */
  public async getHouseholdBriefById(id: string): Promise<HouseholdBrief | undefined> {
    return await dbStore.getHouseholdBriefById(id);
  }

  /**
   * Updates pipeline status for household staffing brief
   */
  public async updateHouseholdBriefStatus(
    id: string,
    status: HouseholdBrief['status']
  ): Promise<HouseholdBrief> {
    const updated = await dbStore.updateHouseholdBrief(id, { status });
    if (!updated) {
      throw new Error(`Household brief not found: ${id}`);
    }
    return updated;
  }

  /**
   * Submits a keynote speaking or executive masterclass enquiry for Toby Mohale
   */
  public async submitSpeakingEnquiry(dto: SpeakingEnquiryDTO): Promise<SpeakingEnquiry> {
    const enquiryId = `spk-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    const enquiry: SpeakingEnquiry = {
      id: enquiryId,
      hostOrganization: dto.hostOrganization.trim(),
      contactPerson: dto.contactPerson.trim(),
      contactEmail: dto.contactEmail.toLowerCase().trim(),
      contactPhone: dto.contactPhone.trim(),
      eventTheme: dto.eventTheme.trim(),
      requestedDate: dto.requestedDate,
      eventFormat: dto.eventFormat,
      location: dto.location.trim(),
      estimatedAudienceSize: dto.estimatedAudienceSize || 50,
      budgetZAR: dto.budgetZAR,
      specialRequests: dto.specialRequests,
      status: 'received',
      createdAt: now,
    };

    await dbStore.createSpeakingEnquiry(enquiry);

    // Dispatch keynote booking notice
    try {
      await communicationsService.sendSpeakingBookingNotice(enquiry);
    } catch (commErr) {
      console.warn('[AdvisoryService] Speaking booking dispatch skipped:', commErr);
    }

    return enquiry;
  }

  /**
   * Retrieves all keynote speaking enquiries (Admin view)
   */
  public async getSpeakingEnquiries(): Promise<SpeakingEnquiry[]> {
    return await dbStore.getAllSpeakingEnquiries();
  }

  /**
   * Retrieves single keynote enquiry by ID
   */
  public async getSpeakingEnquiryById(id: string): Promise<SpeakingEnquiry | undefined> {
    return await dbStore.getSpeakingEnquiryById(id);
  }

  /**
   * Updates keynote enquiry status
   */
  public async updateSpeakingEnquiryStatus(
    id: string,
    status: SpeakingEnquiry['status']
  ): Promise<SpeakingEnquiry> {
    const updated = await dbStore.updateSpeakingEnquiry(id, { status });
    if (!updated) {
      throw new Error(`Speaking enquiry not found: ${id}`);
    }
    return updated;
  }
}

export const advisoryService = new AdvisoryService();
