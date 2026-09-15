/**
 * Flawless Institution™ - Zod Validation Schemas
 * Standardized Request & Entity Validators
 */
import { z } from 'zod';

export const UserRoleEnum = z.enum(['super_admin', 'admin', 'faculty', 'student', 'employer']);
export const UserStatusEnum = z.enum(['active', 'pending_verification', 'suspended']);
export const CourseModeEnum = z.enum(['Online', 'Physical', 'Hybrid']);
export const EnrolmentStatusEnum = z.enum(['pending_payment', 'active', 'in_progress', 'completed', 'suspended']);
export const PaymentMethodEnum = z.enum(['payfast', 'ozow', 'manual_eft', 'card']);
export const PaymentStatusEnum = z.enum(['pending', 'cleared', 'failed', 'cancelled']);

// POPIA Consent Schema
export const PopiaConsentSchema = z.object({
  agreed: z.literal(true, {
    message: 'POPIA and Terms & Conditions agreement is mandatory',
  }),
  agreedAt: z.string().datetime().optional(),
  ipAddress: z.string().optional(),
  version: z.string().default('2026-v1.0'),
});

// User Registration Schema
export const RegisterSchema = z.object({
  email: z.string().email('Valid email address is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(9, 'Valid telephone number is required'),
  role: UserRoleEnum.default('student'),
  agreedToPopia: z.literal(true, {
    message: 'Mandatory POPIA compliance and Terms & Conditions agreement is required',
  }),
});

// User Login Schema
export const LoginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

// Re-consent POPIA Schema
export const PopiaReconsentSchema = z.object({
  version: z.string().default('2026-v1.1'),
  agreed: z.literal(true, {
    message: 'Consent agreement must be true',
  }),
});

// Update Profile Schema
export const UpdateProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phone: z.string().min(9).optional(),
});

// Legacy User Creation Schema
export const CreateUserSchema = z.object({
  email: z.string().email('Valid email address is required'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(9, 'Valid telephone number is required'),
  role: UserRoleEnum.default('student'),
  popiaConsent: PopiaConsentSchema,
});

// Course Enrolment Checkout Schema
export const CourseCheckoutSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
  cohortId: z.string().optional(),
  mode: CourseModeEnum.default('Online'),
  studentName: z.string().min(2, 'Full student name is required'),
  studentEmail: z.string().email('Valid student email is required'),
  studentPhone: z.string().min(9, 'Valid student contact number is required'),
  paymentMethod: PaymentMethodEnum.default('payfast'),
  agreedToTerms: z.literal(true, {
    message: 'You must agree to Flawless Institution Terms, Privacy Policy & No-Refunds terms',
  }),
});

// Update Module Progress Schema
export const UpdateProgressSchema = z.object({
  moduleTitle: z.string().min(2, 'Module title is required'),
  completed: z.boolean().default(true),
});

// Confer Graduation Status Schema
export const ConferGraduationSchema = z.object({
  ceremonyDate: z.string().default('November 2026 Annual Graduation, Fourways, Johannesburg'),
  instructorSignoffNotes: z.string().min(5, 'Instructor validation notes are required'),
  honorsAwarded: z.boolean().default(false),
});

// Household Staffing Brief Schema
export const HouseholdBriefSchema = z.object({
  employerName: z.string().min(2, 'Employer or Representative name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(9, 'Valid contact phone number is required'),
  residenceArea: z.string().min(2, 'Location/Area in South Africa is required'),
  roleRequested: z.enum([
    'Executive Butler & Valet',
    'Executive Housekeeper',
    'Caregiver & Elderly Care',
    'Professional Au Pair / Nanny',
    'Private Chef / Cook',
    'Estate Household Manager',
  ]),
  placementType: z.enum(['Live-In', 'Live-Out']),
  privacyTier: z.enum(['Standard', 'Confidential', 'High-Profile VIP']).default('Confidential'),
  targetStartDate: z.string().min(4, 'Target start date is required'),
  additionalNotes: z.string().max(2000).optional(),
});

// Speaking Enquiry Schema
export const SpeakingEnquirySchema = z.object({
  hostOrganization: z.string().min(2, 'Host organization name is required'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactPhone: z.string().min(9, 'Contact phone number is required'),
  eventTheme: z.string().min(3, 'Event theme or topic is required'),
  requestedDate: z.string().min(4, 'Proposed event date is required'),
  eventFormat: z.enum([
    'Keynote (In-Person)',
    'Executive Masterclass',
    'Virtual Keynote',
    'Panelist',
  ]),
  location: z.string().min(2, 'Event location/city is required'),
  estimatedAudienceSize: z.number().int().positive().default(50),
  budgetZAR: z.string().optional(),
  specialRequests: z.string().max(1000).optional(),
});

// Payment Schemas
export const CreatePayFastPayloadSchema = z.object({
  referenceNumber: z.string().min(4, 'Reference number is required'),
  returnUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

export const ManualEftSubmitSchema = z.object({
  referenceNumber: z.string().min(4, 'Reference number is required'),
  bankName: z.string().min(2, 'Depositing bank name is required'),
  accountHolder: z.string().min(2, 'Account holder / depositor name is required'),
  depositDate: z.string().min(4, 'Date of EFT transfer is required'),
  popNotes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export const VerifyManualEftSchema = z.object({
  verifiedStatus: z.enum(['cleared', 'failed']),
  verificationNotes: z.string().min(5, 'Financial verification notes or Standard Bank audit trace is required'),
});

export const UpdateSpeakingStatusSchema = z.object({
  status: z.enum(['received', 'under_review', 'confirmed', 'declined']),
  adminNotes: z.string().max(1000).optional(),
});

export const UpdateBriefStatusSchema = z.object({
  status: z.enum(['new', 'advisory_review', 'candidate_matching', 'interviewing', 'placed', 'closed']),
  notes: z.string().max(1000).optional(),
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type CourseCheckoutInput = z.infer<typeof CourseCheckoutSchema>;
export type HouseholdBriefInput = z.infer<typeof HouseholdBriefSchema>;
export type SpeakingEnquiryInput = z.infer<typeof SpeakingEnquirySchema>;
