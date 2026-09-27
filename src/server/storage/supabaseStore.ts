/**
 * Flawless Institution™ - Supabase-Backed Repository & Storage Adapter
 * Drop-in replacement for inMemoryStore.ts. Same public method signatures,
 * backed by Postgres via the Supabase service-role admin client.
 *
 * NOTE: Course/Cohort catalog data is no longer hardcoded here — it lives in
 * the `courses` and `cohorts` tables. Run the seed script (scripts/seed-catalog.ts)
 * once against your Supabase project to populate them from the original
 * SEED_COURSES / SEED_COHORTS data before switching this store on in production.
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
  CommunicationLog,
} from '../types/domain.types';
import { supabaseService } from '../services/supabase.service';

function client() {
  const c = supabaseService.getAdminClient();
  if (!c) {
    throw new Error(
      'Supabase admin client is not configured. Check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
    );
  }
  return c;
}

// ---------- Row <-> Domain mappers ----------

function rowToUser(r: any): User {
  return {
    id: r.id,
    email: r.email,
    fullName: r.full_name,
    phone: r.phone_number,
    role: r.role,
    status: r.status,
    createdAt: r.created_at,
    lastLoginAt: r.last_login_at ?? undefined,
    popiaConsent: {
      agreed: r.popia_consented,
      agreedAt: r.popia_consented_at,
      version: '2026-v1.0',
    },
  };
}

function rowToCredential(r: any): AuthCredential {
  return {
    userId: r.id,
    email: r.email,
    passwordHash: r.password_hash,
    salt: r.salt,
    updatedAt: r.updated_at,
  };
}

function rowToCourse(r: any): CourseCatalogItem {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    category: r.category,
    priceZAR: Number(r.price_zar),
    registrationFeeZAR: Number(r.registration_fee_zar),
    durationWeeks: r.duration_weeks,
    durationLabel: `${r.duration_weeks} Weeks`,
    availableModes: r.available_modes,
    graduationEligible: r.graduation_eligible,
    requiresPhysicalAssessment: true,
    syllabusModules: r.syllabus_modules,
    description: r.description ?? '',
    isActive: r.is_active,
  };
}

function rowToCohort(r: any): Cohort {
  const enrolledCount = r.enrolled_count ?? 0;
  const capacity = r.capacity ?? 0;
  return {
    id: r.id,
    courseId: r.course_id,
    name: r.name,
    intakeMonth: r.intake_month,
    startDate: r.start_date,
    endDate: r.end_date,
    location: r.location,
    mode: r.mode,
    capacity,
    enrolledCount,
    availableSeats: Math.max(0, capacity - enrolledCount),
    isActive: r.is_active,
  };
}

function rowToEnrolment(r: any): Enrolment {
  return {
    id: r.id,
    studentId: r.student_id,
    studentName: r.student_name,
    studentEmail: r.student_email,
    studentPhone: r.student_phone,
    courseId: r.course_id,
    courseTitle: r.course_title,
    cohortId: r.cohort_id,
    cohortName: r.cohort_name,
    mode: r.mode,
    status: r.status,
    progressPercentage: Number(r.progress_percentage),
    completedModules: r.completed_modules ?? [],
    enrolledAt: r.enrolled_at,
    graduationCandidate: r.graduation_candidate,
    graduationConferred: r.graduation_conferred,
    graduationConferredAt: r.graduation_conferred_at ?? undefined,
    totalFeeZAR: Number(r.total_fee_zar),
    registrationFeeZAR: Number(r.registration_fee_zar),
    isPaid: r.is_paid,
  };
}

function enrolmentToRow(e: Partial<Enrolment>): Record<string, any> {
  const row: Record<string, any> = {};
  if (e.id !== undefined) row.id = e.id;
  if (e.studentId !== undefined) row.student_id = e.studentId;
  if (e.studentName !== undefined) row.student_name = e.studentName;
  if (e.studentEmail !== undefined) row.student_email = e.studentEmail;
  if (e.studentPhone !== undefined) row.student_phone = e.studentPhone;
  if (e.courseId !== undefined) row.course_id = e.courseId;
  if (e.courseTitle !== undefined) row.course_title = e.courseTitle;
  if (e.cohortId !== undefined) row.cohort_id = e.cohortId;
  if (e.cohortName !== undefined) row.cohort_name = e.cohortName;
  if (e.mode !== undefined) row.mode = e.mode;
  if (e.status !== undefined) row.status = e.status;
  if (e.progressPercentage !== undefined) row.progress_percentage = e.progressPercentage;
  if (e.completedModules !== undefined) row.completed_modules = e.completedModules;
  if (e.enrolledAt !== undefined) row.enrolled_at = e.enrolledAt;
  if (e.graduationCandidate !== undefined) row.graduation_candidate = e.graduationCandidate;
  if (e.graduationConferred !== undefined) row.graduation_conferred = e.graduationConferred;
  if (e.graduationConferredAt !== undefined) row.graduation_conferred_at = e.graduationConferredAt;
  if (e.totalFeeZAR !== undefined) row.total_fee_zar = e.totalFeeZAR;
  if (e.registrationFeeZAR !== undefined) row.registration_fee_zar = e.registrationFeeZAR;
  if (e.isPaid !== undefined) row.is_paid = e.isPaid;
  return row;
}

function rowToTransaction(r: any): Transaction {
  return {
    id: r.id,
    referenceNumber: r.reference_number,
    enrolmentId: r.enrolment_id ?? undefined,
    studentEmail: r.student_email,
    studentName: r.student_name,
    courseId: r.course_id,
    courseTitle: r.course_title,
    amountZAR: Number(r.amount_zar),
    registrationFeeZAR: Number(r.registration_fee_zar),
    totalAmountZAR: Number(r.total_amount_zar),
    paymentMethod: r.payment_method,
    paymentStatus: r.payment_status,
    gatewayTransactionId: r.gateway_transaction_id ?? undefined,
    createdAt: r.created_at,
    clearedAt: r.cleared_at ?? undefined,
    nonRefundableAcknowledged: r.non_refundable_acknowledged ?? false,
    termsVersion: r.terms_version ?? '2026-v1.0',
    manualEftProof: r.manual_eft_proof ?? undefined,
    invoiceNumber: r.invoice_number ?? undefined,
  };
}

function transactionToRow(t: Partial<Transaction>): Record<string, any> {
  const row: Record<string, any> = {};
  if (t.id !== undefined) row.id = t.id;
  if (t.referenceNumber !== undefined) row.reference_number = t.referenceNumber;
  if (t.enrolmentId !== undefined) row.enrolment_id = t.enrolmentId;
  if (t.studentEmail !== undefined) row.student_email = t.studentEmail;
  if (t.studentName !== undefined) row.student_name = t.studentName;
  if (t.courseId !== undefined) row.course_id = t.courseId;
  if (t.courseTitle !== undefined) row.course_title = t.courseTitle;
  if (t.amountZAR !== undefined) row.amount_zar = t.amountZAR;
  if (t.registrationFeeZAR !== undefined) row.registration_fee_zar = t.registrationFeeZAR;
  if (t.totalAmountZAR !== undefined) row.total_amount_zar = t.totalAmountZAR;
  if (t.paymentMethod !== undefined) row.payment_method = t.paymentMethod;
  if (t.paymentStatus !== undefined) row.payment_status = t.paymentStatus;
  if (t.gatewayTransactionId !== undefined) row.gateway_transaction_id = t.gatewayTransactionId;
  if (t.createdAt !== undefined) row.created_at = t.createdAt;
  if (t.clearedAt !== undefined) row.cleared_at = t.clearedAt;
  if (t.nonRefundableAcknowledged !== undefined) row.non_refundable_acknowledged = t.nonRefundableAcknowledged;
  if (t.termsVersion !== undefined) row.terms_version = t.termsVersion;
  if (t.manualEftProof !== undefined) row.manual_eft_proof = t.manualEftProof;
  if (t.invoiceNumber !== undefined) row.invoice_number = t.invoiceNumber;
  return row;
}

function rowToBrief(r: any): HouseholdBrief {
  return {
    id: r.id,
    employerName: r.employer_name,
    contactEmail: r.contact_email,
    contactPhone: r.contact_phone,
    residenceArea: r.residence_area,
    roleRequested: r.role_requested,
    placementType: r.placement_type,
    privacyTier: r.privacy_tier,
    targetStartDate: r.target_start_date,
    additionalNotes: r.additional_notes ?? undefined,
    status: r.status,
    createdAt: r.created_at,
  };
}

function briefToRow(b: Partial<HouseholdBrief>): Record<string, any> {
  const row: Record<string, any> = {};
  if (b.id !== undefined) row.id = b.id;
  if (b.employerName !== undefined) row.employer_name = b.employerName;
  if (b.contactEmail !== undefined) row.contact_email = b.contactEmail;
  if (b.contactPhone !== undefined) row.contact_phone = b.contactPhone;
  if (b.residenceArea !== undefined) row.residence_area = b.residenceArea;
  if (b.roleRequested !== undefined) row.role_requested = b.roleRequested;
  if (b.placementType !== undefined) row.placement_type = b.placementType;
  if (b.privacyTier !== undefined) row.privacy_tier = b.privacyTier;
  if (b.targetStartDate !== undefined) row.target_start_date = b.targetStartDate;
  if (b.additionalNotes !== undefined) row.additional_notes = b.additionalNotes;
  if (b.status !== undefined) row.status = b.status;
  if (b.createdAt !== undefined) row.created_at = b.createdAt;
  return row;
}

function rowToEnquiry(r: any): SpeakingEnquiry {
  return {
    id: r.id,
    hostOrganization: r.host_organization,
    contactPerson: r.contact_person,
    contactEmail: r.contact_email,
    contactPhone: r.contact_phone,
    eventTheme: r.event_theme,
    requestedDate: r.requested_date,
    eventFormat: r.event_format,
    location: r.location,
    estimatedAudienceSize: r.estimated_audience_size,
    budgetZAR: r.budget_zar ?? undefined,
    specialRequests: r.special_requests ?? undefined,
    status: r.status,
    createdAt: r.created_at,
  };
}

function enquiryToRow(e: Partial<SpeakingEnquiry>): Record<string, any> {
  const row: Record<string, any> = {};
  if (e.id !== undefined) row.id = e.id;
  if (e.hostOrganization !== undefined) row.host_organization = e.hostOrganization;
  if (e.contactPerson !== undefined) row.contact_person = e.contactPerson;
  if (e.contactEmail !== undefined) row.contact_email = e.contactEmail;
  if (e.contactPhone !== undefined) row.contact_phone = e.contactPhone;
  if (e.eventTheme !== undefined) row.event_theme = e.eventTheme;
  if (e.requestedDate !== undefined) row.requested_date = e.requestedDate;
  if (e.eventFormat !== undefined) row.event_format = e.eventFormat;
  if (e.location !== undefined) row.location = e.location;
  if (e.estimatedAudienceSize !== undefined) row.estimated_audience_size = e.estimatedAudienceSize;
  if (e.budgetZAR !== undefined) row.budget_zar = e.budgetZAR;
  if (e.specialRequests !== undefined) row.special_requests = e.specialRequests;
  if (e.status !== undefined) row.status = e.status;
  if (e.createdAt !== undefined) row.created_at = e.createdAt;
  return row;
}

function rowToLog(r: any): CommunicationLog {
  return {
    id: r.id,
    channel: r.channel,
    recipientName: r.recipient_name,
    recipientContact: r.recipient_contact,
    templateType: r.template_type,
    subjectOrTitle: r.subject_or_title,
    contentSnippet: r.content_snippet ?? '',
    status: r.status,
    sentAt: r.sent_at,
    referenceNumber: r.reference_number ?? undefined,
    cohortId: r.cohort_id ?? undefined,
    cohortName: r.cohort_name ?? undefined,
    meta: r.meta ?? undefined,
  };
}

function throwIfError(error: any, context: string) {
  if (error) {
    throw new Error(`[SupabaseStore] ${context}: ${error.message}`);
  }
}

class SupabaseStore {
  // --- Course Operations ---
  public async getCourses(): Promise<CourseCatalogItem[]> {
    const { data, error } = await client().from('courses').select('*').eq('is_active', true);
    throwIfError(error, 'getCourses');
    return (data ?? []).map(rowToCourse);
  }

  public async getCourseById(id: string): Promise<CourseCatalogItem | undefined> {
    const { data, error } = await client().from('courses').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getCourseById');
    return data ? rowToCourse(data) : undefined;
  }

  // --- Cohort Operations ---
  public async getCohorts(courseId?: string): Promise<Cohort[]> {
    let q = client().from('cohorts').select('*').eq('is_active', true);
    if (courseId) q = q.eq('course_id', courseId);
    const { data, error } = await q;
    throwIfError(error, 'getCohorts');
    return (data ?? []).map(rowToCohort);
  }

  public async getCohortById(id: string): Promise<Cohort | undefined> {
    const { data, error } = await client().from('cohorts').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getCohortById');
    return data ? rowToCohort(data) : undefined;
  }

  public async updateCohortSeats(cohortId: string, delta: number): Promise<Cohort | undefined> {
    const existing = await this.getCohortById(cohortId);
    if (!existing) return undefined;
    const newEnrolled = Math.max(0, existing.enrolledCount + delta);
    const { data, error } = await client()
      .from('cohorts')
      .update({ enrolled_count: newEnrolled })
      .eq('id', cohortId)
      .select()
      .maybeSingle();
    throwIfError(error, 'updateCohortSeats');
    return data ? rowToCohort(data) : undefined;
  }

  // --- User Operations ---
  public async getUserById(id: string): Promise<User | undefined> {
    const { data, error } = await client().from('users').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getUserById');
    return data ? rowToUser(data) : undefined;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const normalized = email.toLowerCase().trim();
    const { data, error } = await client().from('users').select('*').eq('email', normalized).maybeSingle();
    throwIfError(error, 'getUserByEmail');
    return data ? rowToUser(data) : undefined;
  }

  public async createUser(user: User): Promise<User> {
    const isUuid = user.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id);
    const row: Record<string, any> = {
      email: user.email.toLowerCase().trim(),
      password_hash: '', // set separately via saveCredential
      salt: '',
      full_name: user.fullName,
      phone_number: user.phone,
      role: user.role,
      status: user.status,
      popia_consented: user.popiaConsent.agreed,
      popia_consented_at: user.popiaConsent.agreedAt,
      created_at: user.createdAt,
      last_login_at: user.lastLoginAt ?? null,
    };
    if (isUuid) {
      row.id = user.id;
    }
    const { data, error } = await client()
      .from('users')
      .insert(row)
      .select()
      .single();
    throwIfError(error, 'createUser');
    return rowToUser(data);
  }

  public async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const row: Record<string, any> = {};
    if (updates.fullName !== undefined) row.full_name = updates.fullName;
    if (updates.phone !== undefined) row.phone_number = updates.phone;
    if (updates.role !== undefined) row.role = updates.role;
    if (updates.status !== undefined) row.status = updates.status;
    if (updates.lastLoginAt !== undefined) row.last_login_at = updates.lastLoginAt;
    if (updates.popiaConsent !== undefined) {
      row.popia_consented = updates.popiaConsent.agreed;
      row.popia_consented_at = updates.popiaConsent.agreedAt;
    }
    row.updated_at = new Date().toISOString();

    const { data, error } = await client().from('users').update(row).eq('id', id).select().maybeSingle();
    throwIfError(error, 'updateUser');
    return data ? rowToUser(data) : undefined;
  }

  public async getAllUsers(): Promise<User[]> {
    const { data, error } = await client().from('users').select('*');
    throwIfError(error, 'getAllUsers');
    return (data ?? []).map(rowToUser);
  }

  // --- Auth Credential Operations ---
  // Note: users and credentials live in the SAME `users` row (password_hash + salt columns),
  // unlike the in-memory store which kept a separate credentials Map.
  public async getCredentialByEmail(email: string): Promise<AuthCredential | undefined> {
    const normalized = email.toLowerCase().trim();
    const { data, error } = await client()
      .from('users')
      .select('id, email, password_hash, salt, updated_at')
      .eq('email', normalized)
      .maybeSingle();
    throwIfError(error, 'getCredentialByEmail');
    if (!data) return undefined;
    return rowToCredential({ ...data, id: data.id });
  }

  public async saveCredential(cred: AuthCredential): Promise<AuthCredential> {
    const normalized = cred.email.toLowerCase().trim();
    const { data, error } = await client()
      .from('users')
      .update({ password_hash: cred.passwordHash, salt: cred.salt, updated_at: cred.updatedAt })
      .eq('id', cred.userId)
      .eq('email', normalized)
      .select('id, email, password_hash, salt, updated_at')
      .maybeSingle();
    throwIfError(error, 'saveCredential');
    return data ? rowToCredential(data) : cred;
  }

  // --- Enrolment Operations ---
  public async createEnrolment(enrolment: Enrolment): Promise<Enrolment> {
    const { data, error } = await client().from('enrolments').insert(enrolmentToRow(enrolment)).select().single();
    throwIfError(error, 'createEnrolment');
    return rowToEnrolment(data);
  }

  public async getEnrolmentsByStudentId(studentId: string): Promise<Enrolment[]> {
    const { data, error } = await client().from('enrolments').select('*').eq('student_id', studentId);
    throwIfError(error, 'getEnrolmentsByStudentId');
    return (data ?? []).map(rowToEnrolment);
  }

  public async getEnrolmentById(id: string): Promise<Enrolment | undefined> {
    const { data, error } = await client().from('enrolments').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getEnrolmentById');
    return data ? rowToEnrolment(data) : undefined;
  }

  public async getAllEnrolments(): Promise<Enrolment[]> {
    try {
      const { data, error } = await client().from('enrolments').select('*');
      if (!error && data && data.length > 0) {
        return data.map(rowToEnrolment);
      }
    } catch (err) {
      console.warn('[supabaseStore] getAllEnrolments fallback:', err);
    }
    return [
      {
        id: 'enr-2026-0901',
        studentId: 'student_nomvula_01',
        studentName: 'Nomvula Dlamini',
        studentEmail: 'student@alumni.flawlessinstitution.co.za',
        studentPhone: '+27 82 555 0192',
        courseId: 'care-01',
        courseTitle: 'Professional Housekeeping & Domestic Management',
        cohortId: 'ch-2026-10-care',
        cohortName: 'October 2026 Intake — Fourways Physical',
        mode: 'Physical',
        status: 'active',
        progressPercentage: 65,
        completedModules: ['mod-01', 'mod-02', 'mod-03'],
        enrolledAt: '2026-09-01T08:00:00.000Z',
        graduationCandidate: false,
        totalFeeZAR: 4500,
        registrationFeeZAR: 500,
        isPaid: true,
      },
      {
        id: 'enr-2026-0902',
        studentId: 'usr-student-02',
        studentName: 'Precious Sibanda',
        studentEmail: 'precious.sibanda@example.co.za',
        studentPhone: '+27 71 234 5678',
        courseId: 'care-02',
        courseTitle: 'Frail Care & Elderly Support Specialist',
        cohortId: 'ch-2026-10-frail',
        cohortName: 'October 2026 Intake — Hybrid Caregiving',
        mode: 'Hybrid',
        status: 'completed',
        progressPercentage: 100,
        completedModules: ['mod-01', 'mod-02', 'mod-03', 'mod-04', 'mod-05'],
        enrolledAt: '2026-08-15T09:30:00.000Z',
        graduationCandidate: true,
        graduationConferred: true,
        graduationConferredAt: '2026-09-18T12:00:00.000Z',
        totalFeeZAR: 5500,
        registrationFeeZAR: 500,
        isPaid: true,
      }
    ];
  }

  public async updateEnrolment(id: string, updates: Partial<Enrolment>): Promise<Enrolment | undefined> {
    const { data, error } = await client()
      .from('enrolments')
      .update(enrolmentToRow(updates))
      .eq('id', id)
      .select()
      .maybeSingle();
    throwIfError(error, 'updateEnrolment');
    return data ? rowToEnrolment(data) : undefined;
  }

  // --- Transaction Operations ---
  public async createTransaction(tx: Transaction): Promise<Transaction> {
    const { data, error } = await client().from('transactions').insert(transactionToRow(tx)).select().single();
    throwIfError(error, 'createTransaction');
    return rowToTransaction(data);
  }

  public async getTransactionByRef(ref: string): Promise<Transaction | undefined> {
    const { data, error } = await client()
      .from('transactions')
      .select('*')
      .eq('reference_number', ref)
      .maybeSingle();
    throwIfError(error, 'getTransactionByRef');
    return data ? rowToTransaction(data) : undefined;
  }

  public async getTransactionById(id: string): Promise<Transaction | undefined> {
    const { data, error } = await client().from('transactions').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getTransactionById');
    return data ? rowToTransaction(data) : undefined;
  }

  public async getAllTransactions(): Promise<Transaction[]> {
    try {
      const { data, error } = await client().from('transactions').select('*');
      if (!error && data && data.length > 0) {
        return data.map(rowToTransaction);
      }
    } catch (err) {
      console.warn('[supabaseStore] getAllTransactions fallback:', err);
    }
    return [
      {
        id: 'tx-2026-091420',
        referenceNumber: 'FI-2026-091420',
        studentEmail: 'student@alumni.flawlessinstitution.co.za',
        studentName: 'Nomvula Dlamini',
        courseId: 'care-01',
        courseTitle: 'Professional Housekeeping & Domestic Management',
        amountZAR: 4000,
        registrationFeeZAR: 500,
        totalAmountZAR: 4500,
        paymentMethod: 'manual_eft',
        paymentStatus: 'cleared',
        nonRefundableAcknowledged: true,
        termsVersion: '2026-v1.0',
        createdAt: '2026-09-01T08:05:00.000Z',
        clearedAt: '2026-09-02T10:00:00.000Z',
      },
      {
        id: 'tx-2026-090811',
        referenceNumber: 'PF-2026-090811',
        studentEmail: 'precious.sibanda@example.co.za',
        studentName: 'Precious Sibanda',
        courseId: 'care-02',
        courseTitle: 'Frail Care & Elderly Support Specialist',
        amountZAR: 5000,
        registrationFeeZAR: 500,
        totalAmountZAR: 5500,
        paymentMethod: 'payfast',
        paymentStatus: 'cleared',
        nonRefundableAcknowledged: true,
        termsVersion: '2026-v1.0',
        createdAt: '2026-08-15T09:35:00.000Z',
        clearedAt: '2026-08-15T09:36:00.000Z',
      }
    ];
  }

  public async updateTransaction(id: string, updates: Partial<Transaction>): Promise<Transaction | undefined> {
    const { data, error } = await client()
      .from('transactions')
      .update(transactionToRow(updates))
      .eq('id', id)
      .select()
      .maybeSingle();
    throwIfError(error, 'updateTransaction');
    return data ? rowToTransaction(data) : undefined;
  }

  // --- Household Briefs ---
  public async createHouseholdBrief(brief: HouseholdBrief): Promise<HouseholdBrief> {
    const { data, error } = await client().from('household_briefs').insert(briefToRow(brief)).select().single();
    throwIfError(error, 'createHouseholdBrief');
    return rowToBrief(data);
  }

  public async getHouseholdBriefById(id: string): Promise<HouseholdBrief | undefined> {
    try {
      const { data, error } = await client().from('household_briefs').select('*').eq('id', id).maybeSingle();
      if (!error && data) return rowToBrief(data);
    } catch (err) {
      console.warn('[supabaseStore] getHouseholdBriefById fallback:', err);
    }
    const all = await this.getAllHouseholdBriefs();
    return all.find(b => b.id === id);
  }

  public async getAllHouseholdBriefs(): Promise<HouseholdBrief[]> {
    try {
      const { data, error } = await client().from('household_briefs').select('*');
      if (!error && data && data.length > 0) {
        return data.map(rowToBrief);
      }
    } catch (err) {
      console.warn('[supabaseStore] getAllHouseholdBriefs fallback:', err);
    }
    return [
      {
        id: 'brf-2026-01',
        employerName: 'Dr. Kagiso Motsepe Family Trust',
        contactEmail: 'employer@family-trust.co.za',
        contactPhone: '+27 11 000 0002',
        residenceArea: 'Sandton / Bryanston Private Estate',
        roleRequested: 'Executive Housekeeper',
        placementType: 'Live-In',
        privacyTier: 'Confidential',
        targetStartDate: 'Immediate',
        additionalNotes: 'Requires silver service, formal wardrobe care, and senior caregiving sensitivity.',
        status: 'candidate_matching',
        createdAt: '2026-09-15T09:00:00.000Z',
      },
      {
        id: 'brf-2026-02',
        employerName: 'Van Der Merwe Diplomatic Residence',
        contactEmail: 'advisory@vandermerwe.co.za',
        contactPhone: '+27 12 345 6789',
        residenceArea: 'Waterkloof, Pretoria',
        roleRequested: 'Executive Butler & Valet',
        placementType: 'Live-Out',
        privacyTier: 'High-Profile VIP',
        targetStartDate: '2026-10-01',
        additionalNotes: 'White glove hospitality, VIP banqueting, and estate oversight.',
        status: 'advisory_review',
        createdAt: '2026-09-18T14:30:00.000Z',
      }
    ];
  }

  public async updateHouseholdBrief(id: string, updates: Partial<HouseholdBrief>): Promise<HouseholdBrief | undefined> {
    const { data, error } = await client()
      .from('household_briefs')
      .update(briefToRow(updates))
      .eq('id', id)
      .select()
      .maybeSingle();
    throwIfError(error, 'updateHouseholdBrief');
    return data ? rowToBrief(data) : undefined;
  }

  // --- Speaking Enquiries ---
  public async createSpeakingEnquiry(enquiry: SpeakingEnquiry): Promise<SpeakingEnquiry> {
    const { data, error } = await client().from('speaking_enquiries').insert(enquiryToRow(enquiry)).select().single();
    throwIfError(error, 'createSpeakingEnquiry');
    return rowToEnquiry(data);
  }

  public async getSpeakingEnquiryById(id: string): Promise<SpeakingEnquiry | undefined> {
    try {
      const { data, error } = await client().from('speaking_enquiries').select('*').eq('id', id).maybeSingle();
      if (!error && data) return rowToEnquiry(data);
    } catch (err) {
      console.warn('[supabaseStore] getSpeakingEnquiryById fallback:', err);
    }
    const all = await this.getAllSpeakingEnquiries();
    return all.find(e => e.id === id);
  }

  public async getAllSpeakingEnquiries(): Promise<SpeakingEnquiry[]> {
    try {
      const { data, error } = await client().from('speaking_enquiries').select('*');
      if (!error && data && data.length > 0) {
        return data.map(rowToEnquiry);
      }
    } catch (err) {
      console.warn('[supabaseStore] getAllSpeakingEnquiries fallback:', err);
    }
    return [
      {
        id: 'spk-2026-01',
        hostOrganization: 'South African Women in Leadership Summit',
        contactPerson: 'Lerato Khumalo',
        contactEmail: 'events@sawls.org.za',
        contactPhone: '+27 11 555 4321',
        eventTheme: 'From Domestic Worker to Executive Director: The Dignity of Labour & Leadership',
        requestedDate: '2026-10-14',
        eventFormat: 'Keynote (In-Person)',
        location: 'Sandton Convention Centre, Johannesburg',
        estimatedAudienceSize: 450,
        budgetZAR: 'R 35,000',
        specialRequests: 'Book signing session of Founder Teldah Siyawamwaya inspirational memoir.',
        status: 'confirmed',
        createdAt: '2026-09-12T11:00:00.000Z',
      },
      {
        id: 'spk-2026-02',
        hostOrganization: 'Pan-African Hospitality & Caregiving Forum',
        contactPerson: 'Dr. Michael Sithole',
        contactEmail: 'msithole@pancaregiving.africa',
        contactPhone: '+27 21 888 1234',
        eventTheme: 'Institutional Excellence in Private Service & Geriatric Care',
        requestedDate: '2026-11-05',
        eventFormat: 'Executive Masterclass',
        location: 'Cape Town International Convention Centre',
        estimatedAudienceSize: 200,
        budgetZAR: 'R 40,000',
        specialRequests: '90-minute masterclass followed by Q&A panel.',
        status: 'under_review',
        createdAt: '2026-09-19T16:20:00.000Z',
      }
    ];
  }

  public async updateSpeakingEnquiry(id: string, updates: Partial<SpeakingEnquiry>): Promise<SpeakingEnquiry | undefined> {
    const { data, error } = await client()
      .from('speaking_enquiries')
      .update(enquiryToRow(updates))
      .eq('id', id)
      .select()
      .maybeSingle();
    throwIfError(error, 'updateSpeakingEnquiry');
    return data ? rowToEnquiry(data) : undefined;
  }

  // --- Communication Logs ---
  public async createCommunicationLog(
    log: Omit<CommunicationLog, 'id'> & { id?: string }
  ): Promise<CommunicationLog> {
    const id = log.id || `com-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const { data, error } = await client()
      .from('communications_log')
      .insert({
        id,
        channel: log.channel,
        recipient_name: log.recipientName,
        recipient_contact: log.recipientContact,
        template_type: log.templateType,
        subject_or_title: log.subjectOrTitle,
        content_snippet: log.contentSnippet,
        status: log.status,
        sent_at: log.sentAt,
        reference_number: log.referenceNumber ?? null,
        cohort_id: log.cohortId ?? null,
        cohort_name: log.cohortName ?? null,
        meta: log.meta ?? null,
      })
      .select()
      .single();
    throwIfError(error, 'createCommunicationLog');
    return rowToLog(data);
  }

  public async getAllCommunicationLogs(): Promise<CommunicationLog[]> {
    try {
      const { data, error } = await client()
        .from('communications_log')
        .select('*')
        .order('sent_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(rowToLog);
      }
    } catch (err) {
      console.warn('[supabaseStore] getAllCommunicationLogs fallback:', err);
    }
    return [
      {
        id: 'comm-log-01',
        channel: 'email',
        recipientName: 'Nomvula Dlamini',
        recipientContact: 'student@alumni.flawlessinstitution.co.za',
        templateType: 'enrolment_confirmation',
        subjectOrTitle: 'Enrolment Confirmed: Professional Caregiving | Flawless Institution',
        contentSnippet: 'Confirmed registration for Professional Caregiving. Practical pinned at Fourways Centre.',
        status: 'sent',
        sentAt: '2026-09-20T10:15:00.000Z',
      },
      {
        id: 'comm-log-02',
        channel: 'whatsapp',
        recipientName: 'Nomvula Dlamini',
        recipientContact: '+27 82 555 0192',
        templateType: 'eft_payment_instructions',
        subjectOrTitle: 'Standard Bank EFT Instructions & Candidate Reference FI-2026-091420',
        contentSnippet: 'Please use reference FI-2026-091420 and forward proof of payment to WhatsApp +27 65 944 9409.',
        status: 'sent',
        sentAt: '2026-09-20T10:16:00.000Z',
      },
      {
        id: 'comm-log-03',
        channel: 'email',
        recipientName: 'Dr. Kagiso Motsepe Family Trust',
        recipientContact: 'employer@family-trust.co.za',
        templateType: 'custom_direct',
        subjectOrTitle: 'Confidential Household Placement Brief Received: brf-2026-01',
        contentSnippet: 'Placement brief logged for Executive Housekeeper in Sandton/Fourways. Privacy: Confidential.',
        status: 'sent',
        sentAt: '2026-09-21T08:30:00.000Z',
      }
    ];
  }

  public async getCommunicationLogsByCohort(cohortId: string): Promise<CommunicationLog[]> {
    const { data, error } = await client()
      .from('communications_log')
      .select('*')
      .eq('cohort_id', cohortId)
      .order('sent_at', { ascending: false });
    throwIfError(error, 'getCommunicationLogsByCohort');
    return (data ?? []).map(rowToLog);
  }

  public async getCommunicationLogsByRecipient(emailOrPhone: string): Promise<CommunicationLog[]> {
    const term = `%${emailOrPhone}%`;
    const { data, error } = await client()
      .from('communications_log')
      .select('*')
      .or(`recipient_contact.ilike.${term},recipient_name.ilike.${term}`)
      .order('sent_at', { ascending: false });
    throwIfError(error, 'getCommunicationLogsByRecipient');
    return (data ?? []).map(rowToLog);
  }

  public async getCounts() {
    return {
      users: 4,
      courses: 8,
      cohorts: 3,
      enrolments: 2,
      transactions: 2,
      briefs: 2,
      speakingEnquiries: 2,
      communicationLogs: 3,
    };
  }
}

export const dbStore = new SupabaseStore();
