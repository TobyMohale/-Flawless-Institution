/**
 * Flawless Institution™ - In-Memory Repository & Storage Adapter
 * Provides high-speed state persistence with pre-seeded institutional entities.
 */
import { 
  User, 
  Cohort, 
  CourseCatalogItem, 
  Enrolment, 
  Transaction, 
  HouseholdBrief, 
  SpeakingEnquiry,
  AuthCredential,
  CommunicationLog
} from '../types/domain.types';
import { hashPassword } from '../utils/crypto';

// Pre-seeded Course Catalog matching Flawless Academy curriculum
const SEED_COURSES: CourseCatalogItem[] = [
  {
    id: 'caregiver-elderly-care',
    slug: 'caregiver-elderly-care',
    title: 'Caregiving & Elderly Care',
    category: 'Care & Support',
    priceZAR: 1500,
    originalPriceZAR: 2000,
    registrationFeeZAR: 300,
    durationWeeks: 6,
    durationLabel: '6 Weeks (Self-paced or 4-week Fourways intensive)',
    availableModes: ['Online', 'Physical'],
    graduationEligible: true,
    requiresPhysicalAssessment: true,
    syllabusModules: [
      'Role, Ethics & Professional Conduct in Caregiving',
      'Understanding the Ageing Process & Common Health Conditions',
      'Hygiene, Infection Control & Personal Care Protocols',
      'Nutrition, Hydration & Special Dietary Needs for the Elderly',
      'Safe Mobility, Transfer Techniques & Fall Prevention',
      'Vital Signs Monitoring & Medication Administration Assistance',
      'Dementia, Alzheimer\'s & Cognitive Decline Management',
      'End-of-Life Care, Emotional Support & Bedside Protocols'
    ],
    description: 'Foundational knowledge and practical skills for supporting elderly individuals with dignity, safety and clinical awareness.',
    isActive: true,
  },
  {
    id: 'executive-butler-valet',
    slug: 'executive-butler-valet',
    title: 'Executive Butler & Valet',
    category: 'Hospitality & Housekeeping',
    priceZAR: 2200,
    originalPriceZAR: 3000,
    registrationFeeZAR: 300,
    durationWeeks: 8,
    durationLabel: '8 Weeks',
    availableModes: ['Online', 'Physical'],
    graduationEligible: true,
    requiresPhysicalAssessment: true,
    syllabusModules: [
      'The Modern Butler: History, Standards & Protocol',
      'Wardrobe Curation, Fine Fabric Care & Valeting',
      'Table Setting, Formal Food Service & Wine Etiquette',
      'Luggage Packing, Unpacking & Travel Concierge',
      'Discretion, Confidentiality & Protocol in High-Net-Worth Homes',
      'Managing Household Staff & Inventory Thresholds'
    ],
    description: 'Premier training for modern estate butlers, valets, and front-of-house private household staff.',
    isActive: true,
  },
  {
    id: 'executive-housekeeping',
    slug: 'executive-housekeeping',
    title: 'Executive Housekeeper',
    category: 'Hospitality & Housekeeping',
    priceZAR: 1500,
    originalPriceZAR: 2000,
    registrationFeeZAR: 300,
    durationWeeks: 6,
    durationLabel: '6 Weeks',
    availableModes: ['Online', 'Physical'],
    graduationEligible: true,
    requiresPhysicalAssessment: true,
    syllabusModules: [
      'High-Level Housekeeping Standards & Cleaning Chemistry',
      'Surface Care: Marble, Granite, Fine Wood & Metals',
      'Bed-Making & Luxury Turndown Service Protocols',
      'Laundry Management, Stain Removal & Steaming',
      'Deep Cleaning Schedules & Preventative Maintenance'
    ],
    description: 'Master the rigorous operational standards required to manage luxury private homes and estates.',
    isActive: true,
  },
  {
    id: 'au-pair-nanny-training',
    slug: 'au-pair-nanny-training',
    title: 'Professional Au Pair & Childcare',
    category: 'Education & Development',
    priceZAR: 1500,
    originalPriceZAR: 2000,
    registrationFeeZAR: 300,
    durationWeeks: 6,
    durationLabel: '6 Weeks',
    availableModes: ['Online', 'Physical'],
    graduationEligible: true,
    requiresPhysicalAssessment: true,
    syllabusModules: [
      'Early Childhood Development (ECD) Foundations',
      'Pediatric Health, Hygiene & Infant Care',
      'Positive Behavioral Discipline & Communication',
      'Stimulating Play, Sensory Activities & Reading Hours',
      'Child Nutrition, Weaning & Allergy Safety Protocols'
    ],
    description: 'Elevate your childcare expertise from routine supervision into holistic early developmental support.',
    isActive: true,
  },
  {
    id: 'estate-household-management',
    slug: 'estate-household-management',
    title: 'Private Household & Estate Management',
    category: 'Business & Professional',
    priceZAR: 2500,
    originalPriceZAR: 3500,
    registrationFeeZAR: 300,
    durationWeeks: 8,
    durationLabel: '8 Weeks',
    availableModes: ['Online', 'Physical'],
    graduationEligible: true,
    requiresPhysicalAssessment: false,
    syllabusModules: [
      'Principles of Household Operations & Manuals',
      'Staff Rostering, Supervision & Conflict Mediation',
      'Vendor Procurement, Contractors & Asset Maintenance',
      'Financial Budgeting, Expense Receipts & Petty Cash'
    ],
    description: 'Executive stewardship training for estate managers, principals, and lead household coordinators.',
    isActive: true,
  }
];

// Pre-seeded Fourways Physical Cohorts
const SEED_COHORTS: Cohort[] = [
  {
    id: 'cohort-fourways-sept-2026',
    courseId: 'caregiver-elderly-care',
    name: 'September 2026 Fourways Practical Intake',
    intakeMonth: 'September 2026',
    startDate: '2026-09-15',
    endDate: '2026-10-24',
    location: 'Fourways Training Centre, Johannesburg',
    mode: 'Physical',
    capacity: 15,
    enrolledCount: 9,
    availableSeats: 6,
    isActive: true,
  },
  {
    id: 'cohort-fourways-butler-sept-2026',
    courseId: 'executive-butler-valet',
    name: 'September 2026 Butler Intensive Intake',
    intakeMonth: 'September 2026',
    startDate: '2026-09-22',
    endDate: '2026-11-10',
    location: 'Fourways Training Centre, Johannesburg',
    mode: 'Physical',
    capacity: 12,
    enrolledCount: 7,
    availableSeats: 5,
    isActive: true,
  },
  {
    id: 'cohort-online-rolling-2026',
    courseId: 'caregiver-elderly-care',
    name: 'Self-Paced Online Campus (Rolling)',
    intakeMonth: 'Immediate Access',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    location: 'Online Campus (Global)',
    mode: 'Online',
    capacity: 500,
    enrolledCount: 142,
    availableSeats: 358,
    isActive: true,
  }
];

// Initial Institutional Leadership & Student Accounts
const SEED_USERS: User[] = [
  {
    id: 'usr-teldah-founder',
    email: 'director@flawlessinstitution.co.za',
    fullName: 'Teldah Siyawamwaya',
    phone: '+27 11 000 0001',
    role: 'super_admin',
    status: 'active',
    createdAt: '2016-01-15T08:00:00.000Z',
    popiaConsent: {
      agreed: true,
      agreedAt: '2016-01-15T08:00:00.000Z',
      version: '2016-v1.0'
    }
  },
  {
    id: 'usr-faculty-precious',
    email: 'faculty@flawlessinstitution.co.za',
    fullName: 'Precious M. (Faculty Lead)',
    phone: '+27 11 000 0002',
    role: 'faculty',
    status: 'active',
    createdAt: '2024-03-10T08:00:00.000Z',
    popiaConsent: {
      agreed: true,
      agreedAt: '2024-03-10T08:00:00.000Z',
      version: '2024-v1.0'
    }
  },
  {
    id: 'usr-student-thabo',
    email: 'student@flawlessinstitution.co.za',
    fullName: 'Thabo Mokoena (Active Candidate)',
    phone: '+27 82 123 4567',
    role: 'student',
    status: 'active',
    createdAt: '2026-02-01T08:00:00.000Z',
    popiaConsent: {
      agreed: true,
      agreedAt: '2026-02-01T08:00:00.000Z',
      version: '2026-v1.0'
    }
  }
];

class InMemoryStore {
  private users: Map<string, User> = new Map();
  private credentials: Map<string, AuthCredential> = new Map();
  private courses: Map<string, CourseCatalogItem> = new Map();
  private cohorts: Map<string, Cohort> = new Map();
  private enrolments: Map<string, Enrolment> = new Map();
  private transactions: Map<string, Transaction> = new Map();
  private householdBriefs: Map<string, HouseholdBrief> = new Map();
  private speakingEnquiries: Map<string, SpeakingEnquiry> = new Map();
  private communicationLogs: Map<string, CommunicationLog> = new Map();

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData(): void {
    SEED_USERS.forEach(u => this.users.set(u.id, u));
    SEED_COURSES.forEach(c => this.courses.set(c.id, c));
    SEED_COHORTS.forEach(co => this.cohorts.set(co.id, co));

    // Seed default passwords:
    // Director@2026!
    const directorCred = hashPassword('Director@2026!');
    this.credentials.set('director@flawlessinstitution.co.za', {
      userId: 'usr-teldah-founder',
      email: 'director@flawlessinstitution.co.za',
      passwordHash: directorCred.hash,
      salt: directorCred.salt,
      updatedAt: new Date().toISOString(),
    });

    // Faculty@2026!
    const facultyCred = hashPassword('Faculty@2026!');
    this.credentials.set('faculty@flawlessinstitution.co.za', {
      userId: 'usr-faculty-precious',
      email: 'faculty@flawlessinstitution.co.za',
      passwordHash: facultyCred.hash,
      salt: facultyCred.salt,
      updatedAt: new Date().toISOString(),
    });

    // Student@2026!
    const studentCred = hashPassword('Student@2026!');
    this.credentials.set('student@flawlessinstitution.co.za', {
      userId: 'usr-student-thabo',
      email: 'student@flawlessinstitution.co.za',
      passwordHash: studentCred.hash,
      salt: studentCred.salt,
      updatedAt: new Date().toISOString(),
    });

    // Seed Active Enrolment for Thabo Mokoena (Caregiver & Elderly Care in Fourways)
    const seedEnrolmentId = 'enr-thabo-caregiver-2026';
    this.enrolments.set(seedEnrolmentId, {
      id: seedEnrolmentId,
      studentId: 'usr-student-thabo',
      studentName: 'Thabo Mokoena (Active Candidate)',
      studentEmail: 'student@flawlessinstitution.co.za',
      studentPhone: '+27 82 123 4567',
      courseId: 'caregiver-elderly-care',
      courseTitle: 'Caregiving & Elderly Care',
      cohortId: 'cohort-fourways-sept-2026',
      cohortName: 'September 2026 Fourways Practical Intake',
      mode: 'Physical',
      status: 'in_progress',
      progressPercentage: 62.5,
      completedModules: [
        'Role, Ethics & Professional Conduct in Caregiving',
        'Understanding the Ageing Process & Common Health Conditions',
        'Hygiene, Infection Control & Personal Care Protocols',
        'Nutrition, Hydration & Special Dietary Needs for the Elderly',
        'Safe Mobility, Transfer Techniques & Fall Prevention'
      ],
      enrolledAt: '2026-02-10T09:00:00.000Z',
      graduationCandidate: false,
      graduationCeremony: 'November 2026 Annual Graduation, Fourways',
      graduationConferred: false,
      certificateSpecimenPreviewOnly: true,
      totalFeeZAR: 1800,
      registrationFeeZAR: 300,
      isPaid: true,
    });

    // Seed Verified Institutional Graduates for Candidate Matching
    const grad1Id = 'enr-grad-nomsa-butler';
    this.enrolments.set(grad1Id, {
      id: grad1Id,
      studentId: 'usr-grad-nomsa',
      studentName: 'Nomsa Radebe',
      studentEmail: 'nomsa.radebe@alumni.flawlessinstitution.co.za',
      studentPhone: '+27 82 777 4321',
      courseId: 'executive-butler-valet',
      courseTitle: 'Executive Butler & Valet Training',
      cohortId: 'cohort-fourways-sept-2026',
      cohortName: 'Alumni Cohort 2025/2026',
      mode: 'Physical',
      status: 'completed',
      progressPercentage: 100,
      completedModules: [
        'The Modern Butler: Discretion, Protocol & Etiquette',
        'Formal Silver Service, Table Scaping & Wine Etiquette',
        'Wardrobe Management, Valet Services & Garment Care',
        'Household Tech, Security Protocols & VIP Privacy (POPIA)',
        'Event Management, Travel Logistics & Entertaining'
      ],
      enrolledAt: '2025-10-01T08:00:00.000Z',
      graduationCandidate: true,
      graduationCeremony: 'November 2025 Annual Graduation, Fourways',
      graduationConferred: true,
      graduationConferredAt: '2025-11-28T14:00:00.000Z',
      certificateSpecimenPreviewOnly: false,
      totalFeeZAR: 3500,
      registrationFeeZAR: 300,
      isPaid: true,
    });

    const grad2Id = 'enr-grad-bongiwe-housekeeper';
    this.enrolments.set(grad2Id, {
      id: grad2Id,
      studentId: 'usr-grad-bongiwe',
      studentName: 'Bongiwe Sithole',
      studentEmail: 'bongiwe.sithole@alumni.flawlessinstitution.co.za',
      studentPhone: '+27 71 888 1234',
      courseId: 'executive-housekeeping',
      courseTitle: 'Executive Housekeeper',
      cohortId: 'cohort-fourways-sept-2026',
      cohortName: 'Alumni Cohort 2025/2026',
      mode: 'Physical',
      status: 'completed',
      progressPercentage: 100,
      completedModules: [
        'High-Level Housekeeping Standards & Cleaning Chemistry',
        'Surface Care: Marble, Granite, Fine Wood & Metals',
        'Bed-Making & Luxury Turndown Service Protocols',
        'Laundry Management, Stain Removal & Steaming',
        'Deep Cleaning Schedules & Preventative Maintenance'
      ],
      enrolledAt: '2025-09-15T08:00:00.000Z',
      graduationCandidate: true,
      graduationCeremony: 'November 2025 Annual Graduation, Fourways',
      graduationConferred: true,
      graduationConferredAt: '2025-11-28T14:00:00.000Z',
      certificateSpecimenPreviewOnly: false,
      totalFeeZAR: 1800,
      registrationFeeZAR: 300,
      isPaid: true,
    });

    const grad3Id = 'enr-grad-lerato-aupair';
    this.enrolments.set(grad3Id, {
      id: grad3Id,
      studentId: 'usr-grad-lerato',
      studentName: 'Lerato Dlamini',
      studentEmail: 'lerato.dlamini@alumni.flawlessinstitution.co.za',
      studentPhone: '+27 83 999 4433',
      courseId: 'au-pair-nanny-training',
      courseTitle: 'Professional Au Pair & Childcare',
      cohortId: 'cohort-fourways-sept-2026',
      cohortName: 'Alumni Cohort 2025/2026',
      mode: 'Physical',
      status: 'completed',
      progressPercentage: 100,
      completedModules: [
        'Child Development Stages, Psychology & Positive Discipline',
        'Pediatric First Aid, CPR & Home Safety Protocols',
        'Healthy Child Nutrition, Meal Planning & Lunchbox Prep',
        'Educational Play, Homework Support & Routine Management',
        'Professional Boundaries & Employer Discretion'
      ],
      enrolledAt: '2025-08-10T08:00:00.000Z',
      graduationCandidate: true,
      graduationCeremony: 'November 2025 Annual Graduation, Fourways',
      graduationConferred: true,
      graduationConferredAt: '2025-11-28T14:00:00.000Z',
      certificateSpecimenPreviewOnly: false,
      totalFeeZAR: 1800,
      registrationFeeZAR: 300,
      isPaid: true,
    });

    // Seed Sample VIP Household Brief
    const sampleBriefId = 'brief-vip-sandton-01';
    this.householdBriefs.set(sampleBriefId, {
      id: sampleBriefId,
      employerName: 'The Oppenheim Private Estate Office',
      contactEmail: 'estate.manager@sandton-residence.co.za',
      contactPhone: '+27 83 999 0001',
      residenceArea: 'Sandhurst, Sandton, Johannesburg',
      roleRequested: 'Executive Butler & Valet',
      placementType: 'Live-In',
      privacyTier: 'High-Profile VIP',
      targetStartDate: '2026-10-01',
      additionalNotes: 'Private 6-bedroom primary residence. Demands impeccable silver service, valet wardrobe maintenance, and strict POPIA non-disclosure confidentiality. Candidate must be Flawless Institution certified.',
      status: 'candidate_matching',
      createdAt: '2026-09-01T10:00:00.000Z',
    });

    // Seed Sample Keynote Speaking Enquiry for Director Teldah Siyawamwaya
    const sampleSpeakingId = 'speaking-2026-01';
    this.speakingEnquiries.set(sampleSpeakingId, {
      id: sampleSpeakingId,
      hostOrganization: 'South African Luxury Real Estate & Hospitality Summit',
      contactPerson: 'Nandi Mthembu (Conference Chair)',
      contactEmail: 'nandi@luxurysummit.co.za',
      contactPhone: '+27 11 888 2211',
      eventTheme: 'Elevating African Estate Standards: The Future of Household Operations',
      requestedDate: '2026-10-18',
      eventFormat: 'Keynote (In-Person)',
      location: 'The Maslow Hotel, Sandton, Johannesburg',
      estimatedAudienceSize: 250,
      budgetZAR: 'R45,000',
      specialRequests: 'Opening address following the ministerial welcome. Discussion of professionalizing domestic and private household staffing in South Africa.',
      status: 'under_review',
      createdAt: '2026-09-02T11:30:00.000Z',
    });

    // Seed Financial Audit Ledger & SARS VAT Transactions
    const seedTransactions: Transaction[] = [
      {
        id: 'tx-seed-01',
        referenceNumber: 'FI-2026-8801',
        enrolmentId: seedEnrolmentId,
        studentEmail: 'student@flawlessinstitution.co.za',
        studentName: 'Thabo Mokoena',
        courseId: 'caregiver-elderly-care',
        courseTitle: 'Caregiving & Elderly Care (Fourways Practical)',
        amountZAR: 1500,
        registrationFeeZAR: 300,
        totalAmountZAR: 1800,
        paymentMethod: 'manual_eft',
        paymentStatus: 'cleared',
        invoiceNumber: 'INV-FI-2026-8801',
        createdAt: '2026-09-02T08:15:00.000Z',
        clearedAt: '2026-09-02T14:30:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
        manualEftProof: {
          bankName: 'Standard Bank',
          accountHolder: 'T. Mokoena',
          referenceUsed: 'FI-2026-8801',
          depositDate: '2026-09-02',
          submittedAt: '2026-09-02T08:30:00.000Z',
          verifiedBy: 'Precious M. (Faculty Lead)',
          verificationNotes: 'Standard Bank statement bank feed confirmed.',
        },
      },
      {
        id: 'tx-seed-02',
        referenceNumber: 'FI-2026-7102',
        enrolmentId: grad1Id,
        studentEmail: 'nomsa.radebe@alumni.flawlessinstitution.co.za',
        studentName: 'Nomsa Radebe',
        courseId: 'executive-butler-valet',
        courseTitle: 'Executive Butler & Valet Training',
        amountZAR: 3500,
        registrationFeeZAR: 300,
        totalAmountZAR: 3800,
        paymentMethod: 'payfast',
        paymentStatus: 'cleared',
        gatewayTransactionId: 'PF-9912048',
        invoiceNumber: 'INV-FI-2026-7102',
        createdAt: '2026-08-14T10:20:00.000Z',
        clearedAt: '2026-08-14T10:22:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
      },
      {
        id: 'tx-seed-03',
        referenceNumber: 'FI-2026-6540',
        enrolmentId: grad2Id,
        studentEmail: 'bongiwe.sithole@alumni.flawlessinstitution.co.za',
        studentName: 'Bongiwe Sithole',
        courseId: 'executive-housekeeping',
        courseTitle: 'Executive Housekeeper Practical',
        amountZAR: 1800,
        registrationFeeZAR: 300,
        totalAmountZAR: 2100,
        paymentMethod: 'manual_eft',
        paymentStatus: 'cleared',
        invoiceNumber: 'INV-FI-2026-6540',
        createdAt: '2026-07-28T09:00:00.000Z',
        clearedAt: '2026-07-28T16:00:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
        manualEftProof: {
          bankName: 'First National Bank (FNB EFT)',
          accountHolder: 'B. Sithole',
          referenceUsed: 'FI-2026-6540',
          depositDate: '2026-07-28',
          submittedAt: '2026-07-28T09:15:00.000Z',
          verifiedBy: 'Teldah Siyawamwaya (Director)',
          verificationNotes: 'Audited and cleared into Standard Bank main account.',
        },
      },
      {
        id: 'tx-seed-04',
        referenceNumber: 'FI-2026-5921',
        enrolmentId: grad3Id,
        studentEmail: 'lerato.dlamini@alumni.flawlessinstitution.co.za',
        studentName: 'Lerato Dlamini',
        courseId: 'au-pair-nanny-training',
        courseTitle: 'Professional Au Pair & Childcare',
        amountZAR: 1500,
        registrationFeeZAR: 300,
        totalAmountZAR: 1800,
        paymentMethod: 'payfast',
        paymentStatus: 'cleared',
        gatewayTransactionId: 'PF-8831920',
        invoiceNumber: 'INV-FI-2026-5921',
        createdAt: '2026-06-19T14:40:00.000Z',
        clearedAt: '2026-06-19T14:42:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
      },
      {
        id: 'tx-seed-05',
        referenceNumber: 'FI-2026-9214',
        studentEmail: 's.khumalo@steyncity.estate',
        studentName: 'Sipho Khumalo',
        courseId: 'estate-household-management',
        courseTitle: 'Private Household & Estate Management',
        amountZAR: 2500,
        registrationFeeZAR: 300,
        totalAmountZAR: 2800,
        paymentMethod: 'manual_eft',
        paymentStatus: 'cleared',
        invoiceNumber: 'INV-FI-2026-9214',
        createdAt: '2026-09-05T11:00:00.000Z',
        clearedAt: '2026-09-05T15:20:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
        manualEftProof: {
          bankName: 'Nedbank Corporate',
          accountHolder: 'Steyn City Estate Management',
          referenceUsed: 'FI-2026-9214',
          depositDate: '2026-09-05',
          submittedAt: '2026-09-05T11:15:00.000Z',
          verifiedBy: 'Teldah Siyawamwaya (Director)',
          verificationNotes: 'Employer corporate sponsorship confirmed.',
        },
      },
      {
        id: 'tx-seed-06',
        referenceNumber: 'FI-2026-9430',
        studentEmail: 'anelisa.ndlovu@gmail.com',
        studentName: 'Anelisa Ndlovu',
        courseId: 'executive-butler-valet',
        courseTitle: 'Executive Butler & Valet Training (September Intake)',
        amountZAR: 3500,
        registrationFeeZAR: 300,
        totalAmountZAR: 3800,
        paymentMethod: 'payfast',
        paymentStatus: 'cleared',
        gatewayTransactionId: 'PF-1049281',
        invoiceNumber: 'INV-FI-2026-9430',
        createdAt: '2026-09-07T16:10:00.000Z',
        clearedAt: '2026-09-07T16:12:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
      },
      {
        id: 'tx-seed-07',
        referenceNumber: 'FI-2026-9655',
        studentEmail: 'kgomotso.m@vodamail.co.za',
        studentName: 'Kgomotso Molefe',
        courseId: 'caregiver-elderly-care',
        courseTitle: 'Caregiving & Elderly Care (September Fourways)',
        amountZAR: 1500,
        registrationFeeZAR: 300,
        totalAmountZAR: 1800,
        paymentMethod: 'manual_eft',
        paymentStatus: 'pending',
        createdAt: '2026-09-08T09:30:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
        manualEftProof: {
          bankName: 'Capitec Bank',
          accountHolder: 'K. Molefe',
          referenceUsed: 'FI-2026-9655',
          depositDate: '2026-09-08',
          submittedAt: '2026-09-08T09:45:00.000Z',
          verificationNotes: 'Awaiting clearance on Standard Bank online business portal.',
        },
      },
      {
        id: 'tx-seed-08',
        referenceNumber: 'FI-2026-8104',
        studentEmail: 'zanele.m@outlook.com',
        studentName: 'Zanele Mthembu',
        courseId: 'executive-housekeeping',
        courseTitle: 'Executive Housekeeper Practical',
        amountZAR: 1800,
        registrationFeeZAR: 300,
        totalAmountZAR: 2100,
        paymentMethod: 'payfast',
        paymentStatus: 'cleared',
        gatewayTransactionId: 'PF-9821034',
        invoiceNumber: 'INV-FI-2026-8104',
        createdAt: '2026-08-22T13:00:00.000Z',
        clearedAt: '2026-08-22T13:05:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
      },
      {
        id: 'tx-seed-09',
        referenceNumber: 'FI-2026-7890',
        studentEmail: 'estate@winelands-haven.co.za',
        studentName: 'Cape Winelands Private Estate',
        courseId: 'executive-butler-valet',
        courseTitle: 'Executive Butler & Valet (Dual Candidate Sponsorship)',
        amountZAR: 7000,
        registrationFeeZAR: 600,
        totalAmountZAR: 7600,
        paymentMethod: 'manual_eft',
        paymentStatus: 'cleared',
        invoiceNumber: 'INV-FI-2026-7890',
        createdAt: '2026-08-04T10:00:00.000Z',
        clearedAt: '2026-08-04T15:30:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
        manualEftProof: {
          bankName: 'Investec Bank',
          accountHolder: 'Winelands Haven Holdings (Pty) Ltd',
          referenceUsed: 'FI-2026-7890',
          depositDate: '2026-08-04',
          submittedAt: '2026-08-04T10:15:00.000Z',
          verifiedBy: 'Teldah Siyawamwaya (Director)',
          verificationNotes: 'Direct RTGS electronic fund settlement verified.',
        },
      },
      {
        id: 'tx-seed-10',
        referenceNumber: 'FI-2026-9810',
        studentEmail: 'precious.sibanda@yahoo.com',
        studentName: 'Precious Sibanda',
        courseId: 'au-pair-nanny-training',
        courseTitle: 'Professional Au Pair & Childcare',
        amountZAR: 1500,
        registrationFeeZAR: 300,
        totalAmountZAR: 1800,
        paymentMethod: 'manual_eft',
        paymentStatus: 'pending',
        createdAt: '2026-09-09T12:15:00.000Z',
        nonRefundableAcknowledged: true,
        termsVersion: 'v2026.1',
        manualEftProof: {
          bankName: 'Standard Bank Mobile App',
          accountHolder: 'P. Sibanda',
          referenceUsed: 'FI-2026-9810',
          depositDate: '2026-09-09',
          submittedAt: '2026-09-09T12:20:00.000Z',
          verificationNotes: 'Proof of Payment uploaded via portal; awaiting bank reconciler verification.',
        },
      },
    ];

    seedTransactions.forEach(t => this.transactions.set(t.id, t));

    // Seed Initial Outgoing Communications Audit Trail (Stage 8)
    const seedLogs: CommunicationLog[] = [
      {
        id: 'log-seed-01',
        channel: 'email',
        recipientName: 'Thabo Mokoena',
        recipientContact: 'student@flawlessinstitution.co.za',
        templateType: 'enrolment_confirmation',
        subjectOrTitle: 'Enrolment Confirmation & Payment Reference [FI-2026-8801]',
        contentSnippet: 'Official enrolment in Caregiving & Elderly Care (Physical Intensive, Fourways). Quoting reference FI-2026-8801.',
        status: 'delivered',
        sentAt: '2026-02-01T08:05:00.000Z',
        referenceNumber: 'FI-2026-8801',
        cohortId: 'cohort-caregiver-sept-2026',
        cohortName: 'September 2026 Intensive (Physical Fourways)',
      },
      {
        id: 'log-seed-02',
        channel: 'email',
        recipientName: 'Thabo Mokoena',
        recipientContact: 'student@flawlessinstitution.co.za',
        templateType: 'standard_bank_eft_instructions',
        subjectOrTitle: 'Standard Bank Institutional Banking Details & Settlement Guide',
        contentSnippet: 'Beneficiary: Flawless Institution (Pty) Ltd, Standard Bank Acc: 022849103, Branch: 051001. Fourways seat reservation protocol.',
        status: 'delivered',
        sentAt: '2026-02-01T08:06:00.000Z',
        referenceNumber: 'FI-2026-8801',
      },
      {
        id: 'log-seed-03',
        channel: 'email',
        recipientName: 'Thabo Mokoena',
        recipientContact: 'student@flawlessinstitution.co.za',
        templateType: 'sars_tax_invoice',
        subjectOrTitle: 'Official SARS Tax Invoice [INV-FI-2026-8801] (VAT Reg 4790281944)',
        contentSnippet: 'Cleared Payment of R1,800.00 ZAR. Total Output VAT: R234.78. VAT compliance under Section 20(4) of VAT Act 89 of 1991.',
        status: 'delivered',
        sentAt: '2026-02-01T08:15:00.000Z',
        referenceNumber: 'FI-2026-8801',
      },
      {
        id: 'log-seed-04',
        channel: 'whatsapp',
        recipientName: 'Thabo Mokoena',
        recipientContact: '+27 82 123 4567',
        templateType: 'cohort_start_reminder',
        subjectOrTitle: 'Fourways Training Centre Arrival & Security Access Reminder',
        contentSnippet: 'Good day Thabo, your physical cohort commences at 08:30 at Fourways Design Quarter District. Gate access code: #FLA-2026.',
        status: 'delivered',
        sentAt: '2026-09-08T07:30:00.000Z',
        cohortId: 'cohort-caregiver-sept-2026',
        cohortName: 'September 2026 Intensive (Physical Fourways)',
      },
      {
        id: 'log-seed-05',
        channel: 'sms',
        recipientName: 'Anelisa Ndlovu',
        recipientContact: '+27 79 456 7890',
        templateType: 'cohort_start_reminder',
        subjectOrTitle: 'Fourways Physical Cohort Starts Monday',
        contentSnippet: 'FLAWLESS NOTICE: Executive Butler cohort begins Mon 08:30 at Fourways Training Centre. Bring black oxfords & ID. Queries: +27110000000',
        status: 'sent',
        sentAt: '2026-09-10T11:00:00.000Z',
        cohortId: 'cohort-butler-sept-2026',
        cohortName: 'September 2026 Intake (Physical Fourways)',
      },
      {
        id: 'log-seed-06',
        channel: 'whatsapp',
        recipientName: 'Precious Sibanda',
        recipientContact: '+27 71 334 9901',
        templateType: 'standard_bank_eft_instructions',
        subjectOrTitle: 'Standard Bank EFT Proof Acknowledged',
        contentSnippet: 'Hi Precious, we received your proof of payment for FI-2026-9810. Reconciling with Standard Bank. Seat temporarily reserved!',
        status: 'delivered',
        sentAt: '2026-09-09T13:00:00.000Z',
        referenceNumber: 'FI-2026-9810',
      },
    ];

    seedLogs.forEach(l => this.communicationLogs.set(l.id, l));
  }

  // --- Course Operations ---
  public getCourses(): CourseCatalogItem[] {
    return Array.from(this.courses.values()).filter(c => c.isActive);
  }

  public getCourseById(id: string): CourseCatalogItem | undefined {
    return this.courses.get(id);
  }

  // --- Cohort Operations ---
  public getCohorts(courseId?: string): Cohort[] {
    const list = Array.from(this.cohorts.values()).filter(c => c.isActive);
    if (courseId) {
      return list.filter(c => c.courseId === courseId);
    }
    return list;
  }

  public getCohortById(id: string): Cohort | undefined {
    return this.cohorts.get(id);
  }

  public updateCohortSeats(cohortId: string, delta: number): Cohort | undefined {
    const cohort = this.cohorts.get(cohortId);
    if (!cohort) return undefined;

    const newEnrolled = Math.max(0, cohort.enrolledCount + delta);
    const newAvailable = Math.max(0, cohort.capacity - newEnrolled);

    const updated: Cohort = {
      ...cohort,
      enrolledCount: newEnrolled,
      availableSeats: newAvailable,
    };
    this.cohorts.set(cohortId, updated);
    return updated;
  }

  // --- User Operations ---
  public getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  public getUserByEmail(email: string): User | undefined {
    const normalized = email.toLowerCase().trim();
    return Array.from(this.users.values()).find(u => u.email.toLowerCase() === normalized);
  }

  public createUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const existing = this.users.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  public getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // --- Auth Credential Operations ---
  public getCredentialByEmail(email: string): AuthCredential | undefined {
    const normalized = email.toLowerCase().trim();
    return this.credentials.get(normalized);
  }

  public saveCredential(cred: AuthCredential): AuthCredential {
    const normalized = cred.email.toLowerCase().trim();
    this.credentials.set(normalized, cred);
    return cred;
  }

  // --- Enrolment Operations ---
  public createEnrolment(enrolment: Enrolment): Enrolment {
    this.enrolments.set(enrolment.id, enrolment);
    return enrolment;
  }

  public getEnrolmentsByStudentId(studentId: string): Enrolment[] {
    return Array.from(this.enrolments.values()).filter(e => e.studentId === studentId);
  }

  public getEnrolmentById(id: string): Enrolment | undefined {
    return this.enrolments.get(id);
  }

  public getAllEnrolments(): Enrolment[] {
    return Array.from(this.enrolments.values());
  }

  public updateEnrolment(id: string, updates: Partial<Enrolment>): Enrolment | undefined {
    const existing = this.enrolments.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.enrolments.set(id, updated);
    return updated;
  }

  // --- Transaction Operations ---
  public createTransaction(tx: Transaction): Transaction {
    this.transactions.set(tx.id, tx);
    return tx;
  }

  public getTransactionByRef(ref: string): Transaction | undefined {
    return Array.from(this.transactions.values()).find(t => t.referenceNumber === ref);
  }

  public getTransactionById(id: string): Transaction | undefined {
    return this.transactions.get(id);
  }

  public getAllTransactions(): Transaction[] {
    return Array.from(this.transactions.values());
  }

  public updateTransaction(id: string, updates: Partial<Transaction>): Transaction | undefined {
    const existing = this.transactions.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.transactions.set(id, updated);
    return updated;
  }

  // --- Household Briefs & Speaking ---
  public createHouseholdBrief(brief: HouseholdBrief): HouseholdBrief {
    this.householdBriefs.set(brief.id, brief);
    return brief;
  }

  public getHouseholdBriefById(id: string): HouseholdBrief | undefined {
    return this.householdBriefs.get(id);
  }

  public getAllHouseholdBriefs(): HouseholdBrief[] {
    return Array.from(this.householdBriefs.values());
  }

  public updateHouseholdBrief(id: string, updates: Partial<HouseholdBrief>): HouseholdBrief | undefined {
    const existing = this.householdBriefs.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.householdBriefs.set(id, updated);
    return updated;
  }

  public createSpeakingEnquiry(enquiry: SpeakingEnquiry): SpeakingEnquiry {
    this.speakingEnquiries.set(enquiry.id, enquiry);
    return enquiry;
  }

  public getSpeakingEnquiryById(id: string): SpeakingEnquiry | undefined {
    return this.speakingEnquiries.get(id);
  }

  public getAllSpeakingEnquiries(): SpeakingEnquiry[] {
    return Array.from(this.speakingEnquiries.values());
  }

  public updateSpeakingEnquiry(id: string, updates: Partial<SpeakingEnquiry>): SpeakingEnquiry | undefined {
    const existing = this.speakingEnquiries.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.speakingEnquiries.set(id, updated);
    return updated;
  }

  // --- Communication Logs Operations (Stage 8) ---
  public createCommunicationLog(log: Omit<CommunicationLog, 'id'> & { id?: string }): CommunicationLog {
    const fullLog: CommunicationLog = {
      ...log,
      id: log.id || `com-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    };
    this.communicationLogs.set(fullLog.id, fullLog);
    return fullLog;
  }

  public getAllCommunicationLogs(): CommunicationLog[] {
    return Array.from(this.communicationLogs.values()).sort(
      (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
    );
  }

  public getCommunicationLogsByCohort(cohortId: string): CommunicationLog[] {
    return this.getAllCommunicationLogs().filter(l => l.cohortId === cohortId);
  }

  public getCommunicationLogsByRecipient(emailOrPhone: string): CommunicationLog[] {
    const term = emailOrPhone.toLowerCase();
    return this.getAllCommunicationLogs().filter(l => 
      l.recipientContact.toLowerCase().includes(term) ||
      l.recipientName.toLowerCase().includes(term)
    );
  }

  public getCounts() {
    return {
      users: this.users.size,
      courses: this.courses.size,
      cohorts: this.cohorts.size,
      enrolments: this.enrolments.size,
      transactions: this.transactions.size,
      briefs: this.householdBriefs.size,
      speakingEnquiries: this.speakingEnquiries.size,
      communicationLogs: this.communicationLogs.size,
    };
  }
}

export const dbStore = new InMemoryStore();
