/**
 * Flawless Institution™ - Core Backend Domain Types
 * Headquarters: Fourways, Johannesburg, South Africa
 */

export type UserRole = 'super_admin' | 'admin' | 'faculty' | 'student' | 'employer';

export type UserStatus = 'active' | 'pending_verification' | 'suspended';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLoginAt?: string;
  popiaConsent: {
    agreed: boolean;
    agreedAt: string;
    ipAddress?: string;
    version: string;
  };
}

export interface AuthCredential {
  userId: string;
  email: string;
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

export interface JwtUserPayload {
  userId: string;
  email: string;
  role: UserRole;
  fullName: string;
}

export type CourseMode = 'Online' | 'Physical' | 'Hybrid';

export interface Cohort {
  id: string;
  courseId: string;
  name: string;
  intakeMonth: string; // e.g. "September 2026"
  startDate: string;
  endDate: string;
  location: string; // "Fourways Training Centre, Johannesburg" or "Online Campus"
  mode: CourseMode;
  capacity: number;
  enrolledCount: number;
  availableSeats: number;
  isActive: boolean;
}

export interface CourseCatalogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  priceZAR: number;
  originalPriceZAR?: number;
  registrationFeeZAR: number;
  durationWeeks: number;
  durationLabel: string;
  availableModes: CourseMode[];
  graduationEligible: boolean;
  requiresPhysicalAssessment: boolean;
  syllabusModules: string[];
  description: string;
  isActive: boolean;
}

export type EnrolmentStatus = 'pending_payment' | 'active' | 'in_progress' | 'completed' | 'suspended';

export interface Enrolment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  cohortId: string;
  cohortName: string;
  mode: CourseMode;
  status: EnrolmentStatus;
  progressPercentage: number;
  completedModules: string[];
  enrolledAt: string;
  graduationCandidate: boolean;
  graduationCeremony?: string; // e.g. "November 2026 Annual Graduation, Fourways"
  graduationConferred?: boolean;
  graduationConferredAt?: string;
  certificateSpecimenPreviewOnly?: boolean;
  totalFeeZAR: number;
  registrationFeeZAR: number;
  isPaid: boolean;
}

export type PaymentMethod = 'payfast' | 'ozow' | 'manual_eft' | 'card';

export type PaymentStatus = 'pending' | 'cleared' | 'failed' | 'cancelled';

export interface ManualEftProof {
  bankName: string;
  accountHolder?: string;
  referenceUsed: string;
  depositDate: string;
  popNotes?: string;
  submittedAt: string;
  verifiedBy?: string;
  verificationNotes?: string;
}

export interface Transaction {
  id: string;
  referenceNumber: string; // e.g. "FI-2026-9812"
  enrolmentId?: string;
  studentEmail: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  amountZAR: number;
  registrationFeeZAR: number;
  totalAmountZAR: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  gatewayTransactionId?: string;
  createdAt: string;
  clearedAt?: string;
  nonRefundableAcknowledged: boolean;
  termsVersion: string;
  manualEftProof?: ManualEftProof;
  invoiceNumber?: string;
}

export type HouseholdStaffRole = 
  | 'Executive Butler & Valet'
  | 'Executive Housekeeper'
  | 'Caregiver & Elderly Care'
  | 'Professional Au Pair / Nanny'
  | 'Private Chef / Cook'
  | 'Estate Household Manager';

export type PrivacyTier = 'Standard' | 'Confidential' | 'High-Profile VIP';

export interface HouseholdBrief {
  id: string;
  employerName: string;
  contactEmail: string;
  contactPhone: string;
  residenceArea: string; // e.g. "Bryanston, Sandton, Fourways"
  roleRequested: HouseholdStaffRole;
  placementType: 'Live-In' | 'Live-Out';
  privacyTier: PrivacyTier;
  targetStartDate: string;
  additionalNotes?: string;
  status: 'new' | 'advisory_review' | 'candidate_matching' | 'interviewing' | 'placed' | 'closed';
  createdAt: string;
}

export interface SpeakingEnquiry {
  id: string;
  hostOrganization: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  eventTheme: string;
  requestedDate: string;
  eventFormat: 'Keynote (In-Person)' | 'Executive Masterclass' | 'Virtual Keynote' | 'Panelist';
  location: string;
  estimatedAudienceSize: number;
  budgetZAR?: string;
  specialRequests?: string;
  status: 'received' | 'under_review' | 'confirmed' | 'declined';
  createdAt: string;
}

export type CommunicationChannel = 'email' | 'whatsapp' | 'sms';
export type CommunicationStatus = 'sent' | 'delivered' | 'failed' | 'queued' | 'mock_logged';

export interface CommunicationLog {
  id: string;
  channel: CommunicationChannel;
  recipientName: string;
  recipientContact: string; // email address or phone number
  templateType: 'enrolment_confirmation' | 'standard_bank_eft_instructions' | 'sars_tax_invoice' | 'cohort_start_reminder' | 'graduation_invitation' | 'custom_direct';
  subjectOrTitle: string;
  contentSnippet: string;
  status: CommunicationStatus;
  sentAt: string;
  referenceNumber?: string;
  cohortId?: string;
  cohortName?: string;
  meta?: Record<string, any>;
}
