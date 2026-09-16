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
    const { data, error } = await client().from('enrolments').select('*');
    throwIfError(error, 'getAllEnrolments');
    return (data ?? []).map(rowToEnrolment);
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
    const { data, error } = await client().from('transactions').select('*');
    throwIfError(error, 'getAllTransactions');
    return (data ?? []).map(rowToTransaction);
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
    const { data, error } = await client().from('household_briefs').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getHouseholdBriefById');
    return data ? rowToBrief(data) : undefined;
  }

  public async getAllHouseholdBriefs(): Promise<HouseholdBrief[]> {
    const { data, error } = await client().from('household_briefs').select('*');
    throwIfError(error, 'getAllHouseholdBriefs');
    return (data ?? []).map(rowToBrief);
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
    const { data, error } = await client().from('speaking_enquiries').select('*').eq('id', id).maybeSingle();
    throwIfError(error, 'getSpeakingEnquiryById');
    return data ? rowToEnquiry(data) : undefined;
  }

  public async getAllSpeakingEnquiries(): Promise<SpeakingEnquiry[]> {
    const { data, error } = await client().from('speaking_enquiries').select('*');
    throwIfError(error, 'getAllSpeakingEnquiries');
    return (data ?? []).map(rowToEnquiry);
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
    const { data, error } = await client()
      .from('communications_log')
      .select('*')
      .order('sent_at', { ascending: false });
    throwIfError(error, 'getAllCommunicationLogs');
    return (data ?? []).map(rowToLog);
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
    const tables = [
      'users',
      'courses',
      'cohorts',
      'enrolments',
      'transactions',
      'household_briefs',
      'speaking_enquiries',
      'communications_log',
    ];
    const results = await Promise.all(
      tables.map((t) => client().from(t).select('*', { count: 'exact', head: true }))
    );
    return {
      users: results[0]?.count ?? 0,
      courses: results[1]?.count ?? 0,
      cohorts: results[2]?.count ?? 0,
      enrolments: results[3]?.count ?? 0,
      transactions: results[4]?.count ?? 0,
      briefs: results[5]?.count ?? 0,
      speakingEnquiries: results[6]?.count ?? 0,
      communicationLogs: results[7]?.count ?? 0,
    };
  }
}

export const dbStore = new SupabaseStore();
