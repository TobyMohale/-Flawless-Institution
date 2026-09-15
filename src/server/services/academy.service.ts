/**
 * Flawless Institution™ - Academy & Enrolment Service
 * Handles Course Enrolment, Seat Capacity Locks, Syllabus Progression, and Annual Graduation Roster.
 */
import { dbStore } from '../storage/inMemoryStore';
import { 
  Enrolment, 
  CourseCatalogItem, 
  Cohort, 
  Transaction, 
  CourseMode,
  PaymentMethod 
} from '../types/domain.types';
import { AppError } from '../middleware/errorHandler';
import { config } from '../config';
import { resendService } from './resend.service';

export interface EnrolmentCheckoutInput {
  courseId: string;
  cohortId?: string;
  mode: CourseMode;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  paymentMethod: PaymentMethod;
  agreedToTerms: boolean;
  authenticatedUserId?: string;
}

export class AcademyService {
  /**
   * Initiate Course Enrolment Checkout with Fourways physical seat allocation & fee calculation.
   */
  public async createEnrolmentCheckout(input: EnrolmentCheckoutInput) {
    const course = dbStore.getCourseById(input.courseId);
    if (!course) {
      throw new AppError(`Course '${input.courseId}' does not exist in catalog`, 404, 'COURSE_NOT_FOUND');
    }

    let selectedCohort: Cohort | undefined;

    // Check physical seat capacity if enrolling for Fourways practical training
    if (input.mode === 'Physical') {
      if (input.cohortId) {
        selectedCohort = dbStore.getCohortById(input.cohortId);
      } else {
        const cohorts = dbStore.getCohorts(input.courseId).filter(c => c.mode === 'Physical');
        selectedCohort = cohorts.find(c => c.availableSeats > 0);
      }

      if (!selectedCohort) {
        throw new AppError(
          'No available Fourways physical cohorts found for this course. Please contact faculty or select Online mode.',
          409,
          'COHORT_UNAVAILABLE'
        );
      }

      if (selectedCohort.availableSeats <= 0) {
        throw new AppError(
          `The '${selectedCohort.name}' is fully booked (${selectedCohort.capacity}/${selectedCohort.capacity} seats). Please choose the next available cohort.`,
          409,
          'COHORT_SEATS_EXHAUSTED'
        );
      }

      // Reserve seat
      dbStore.updateCohortSeats(selectedCohort.id, 1);
    } else {
      // Default to online rolling cohort
      const onlineCohorts = dbStore.getCohorts(input.courseId).filter(c => c.mode === 'Online');
      selectedCohort = onlineCohorts[0] || dbStore.getCohorts()[0];
    }

    const enrolmentId = `enr-${Math.random().toString(36).substring(2, 11)}`;
    const referenceNumber = `FI-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const courseFeeZAR = course.priceZAR;
    const registrationFeeZAR = course.registrationFeeZAR;
    const totalAmountZAR = courseFeeZAR + registrationFeeZAR;

    // Create Enrolment record
    const enrolment: Enrolment = {
      id: enrolmentId,
      studentId: input.authenticatedUserId || `usr-guest-${Math.random().toString(36).substring(2, 8)}`,
      studentName: input.studentName.trim(),
      studentEmail: input.studentEmail.toLowerCase().trim(),
      studentPhone: input.studentPhone.trim(),
      courseId: course.id,
      courseTitle: course.title,
      cohortId: selectedCohort?.id || 'cohort-online-rolling-2026',
      cohortName: selectedCohort?.name || 'Online Campus (Immediate Access)',
      mode: input.mode,
      status: 'pending_payment',
      progressPercentage: 0,
      completedModules: [],
      enrolledAt: now,
      graduationCandidate: false,
      graduationCeremony: 'November 2026 Annual Graduation, Fourways',
      graduationConferred: false,
      certificateSpecimenPreviewOnly: true,
      totalFeeZAR: totalAmountZAR,
      registrationFeeZAR,
      isPaid: false,
    };

    dbStore.createEnrolment(enrolment);

    // Create Initial Transaction record
    const transaction: Transaction = {
      id: `tx-${Math.random().toString(36).substring(2, 11)}`,
      referenceNumber,
      enrolmentId: enrolment.id,
      studentEmail: enrolment.studentEmail,
      studentName: enrolment.studentName,
      courseId: course.id,
      courseTitle: course.title,
      amountZAR: courseFeeZAR,
      registrationFeeZAR,
      totalAmountZAR,
      paymentMethod: input.paymentMethod,
      paymentStatus: 'pending',
      createdAt: now,
      nonRefundableAcknowledged: input.agreedToTerms,
      termsVersion: '2026-v1.0',
    };

    dbStore.createTransaction(transaction);

    // Asynchronously dispatch Resend transactional enrolment notification
    resendService.sendEnrolmentConfirmation({
      studentName: enrolment.studentName,
      studentEmail: enrolment.studentEmail,
      courseTitle: enrolment.courseTitle,
      referenceNumber,
      cohortName: enrolment.cohortName,
      totalFeeZAR: totalAmountZAR,
      registrationFeeZAR,
      paymentMethod: input.paymentMethod,
    }).catch(err => console.error('[Resend Service Error]', err));

    return {
      enrolmentId: enrolment.id,
      referenceNumber,
      course: {
        id: course.id,
        title: course.title,
        mode: input.mode,
        duration: course.durationLabel,
      },
      cohort: selectedCohort ? {
        id: selectedCohort.id,
        name: selectedCohort.name,
        startDate: selectedCohort.startDate,
        location: selectedCohort.location,
        seatsRemaining: selectedCohort.availableSeats,
      } : null,
      financials: {
        currency: 'ZAR',
        courseFee: courseFeeZAR,
        registrationFee: registrationFeeZAR,
        totalDue: totalAmountZAR,
        isNonRefundable: true,
      },
      paymentInstructions: {
        method: input.paymentMethod,
        reference: referenceNumber,
        bankDetails: {
          bank: 'Standard Bank South Africa',
          accountName: 'Flawless Institution (Pty) Ltd',
          accountNumber: '022849103',
          branchCode: '051001',
          referenceFormat: referenceNumber,
        },
        notice: 'For manual EFT, please quote this reference number to ensure instant verification.',
      },
    };
  }

  /**
   * Retrieve all enrolments for the logged-in student.
   */
  public getStudentEnrolments(studentId: string, studentEmail?: string): Enrolment[] {
    let enrolments = dbStore.getEnrolmentsByStudentId(studentId);

    // Fallback search by email if guest enrolment occurred before account linking
    if (enrolments.length === 0 && studentEmail) {
      const all = dbStore.getAllEnrolments();
      enrolments = all.filter(e => e.studentEmail.toLowerCase() === studentEmail.toLowerCase());
    }

    return enrolments;
  }

  /**
   * Retrieve single enrolment details with syllabus breakdown and progress.
   */
  public getEnrolmentDetails(enrolmentId: string, studentId?: string, isStaff: boolean = false) {
    const enrolment = dbStore.getEnrolmentById(enrolmentId);
    if (!enrolment) {
      throw new AppError(`Enrolment with ID '${enrolmentId}' was not found`, 404, 'ENROLMENT_NOT_FOUND');
    }

    if (!isStaff && studentId && enrolment.studentId !== studentId) {
      throw new AppError('Forbidden. You do not have permission to access this academic record.', 403, 'FORBIDDEN');
    }

    const course = dbStore.getCourseById(enrolment.courseId);
    const cohort = dbStore.getCohortById(enrolment.cohortId);

    const modules = (course?.syllabusModules || []).map((modTitle, idx) => ({
      index: idx + 1,
      title: modTitle,
      isCompleted: enrolment.completedModules.includes(modTitle),
    }));

    return {
      enrolment,
      course,
      cohort,
      modules,
      academicStatus: {
        totalModules: modules.length,
        completedCount: enrolment.completedModules.length,
        remainingCount: modules.length - enrolment.completedModules.length,
        progressPercentage: enrolment.progressPercentage,
        graduationEligible: enrolment.graduationCandidate,
        graduationConferred: enrolment.graduationConferred,
      },
    };
  }

  /**
   * Update syllabus module completion and automatically recalculate graduation status.
   */
  public updateModuleProgress(
    enrolmentId: string,
    moduleTitle: string,
    completed: boolean,
    studentId?: string,
    isStaff: boolean = false
  ) {
    const enrolment = dbStore.getEnrolmentById(enrolmentId);
    if (!enrolment) {
      throw new AppError(`Enrolment '${enrolmentId}' not found`, 404, 'ENROLMENT_NOT_FOUND');
    }

    if (!isStaff && studentId && enrolment.studentId !== studentId) {
      throw new AppError('Unauthorized to update this academic record', 403, 'FORBIDDEN');
    }

    const course = dbStore.getCourseById(enrolment.courseId);
    if (!course) {
      throw new AppError('Associated course syllabus not found', 404, 'COURSE_NOT_FOUND');
    }

    if (!course.syllabusModules.includes(moduleTitle)) {
      throw new AppError(`Module '${moduleTitle}' does not exist in syllabus for ${course.title}`, 400, 'INVALID_MODULE');
    }

    let updatedCompletedModules = [...enrolment.completedModules];

    if (completed && !updatedCompletedModules.includes(moduleTitle)) {
      updatedCompletedModules.push(moduleTitle);
    } else if (!completed) {
      updatedCompletedModules = updatedCompletedModules.filter(m => m !== moduleTitle);
    }

    const totalModules = course.syllabusModules.length;
    const progressPercentage = Math.round((updatedCompletedModules.length / totalModules) * 100);
    const isGraduationCandidate = progressPercentage === 100 && course.graduationEligible;

    const updated = dbStore.updateEnrolment(enrolment.id, {
      completedModules: updatedCompletedModules,
      progressPercentage,
      graduationCandidate: isGraduationCandidate,
      status: progressPercentage === 100 ? 'completed' : 'in_progress',
    });

    return {
      enrolmentId: updated!.id,
      moduleTitle,
      completed,
      completedCount: updatedCompletedModules.length,
      totalModules,
      progressPercentage,
      graduationCandidate: isGraduationCandidate,
      graduationNotice: isGraduationCandidate
        ? `Congratulations! You have completed all required syllabus modules for ${course.title}. Your portfolio has been queued for faculty review and graduation conferral at the Annual Fourways Ceremony.`
        : null,
    };
  }

  /**
   * Retrieve graduation candidates for the Annual November Ceremony (Faculty / Super Admin only).
   */
  public getGraduationRoster() {
    const all = dbStore.getAllEnrolments();
    const candidates = all.filter(e => e.graduationCandidate || e.progressPercentage === 100);

    return {
      ceremony: config.institution.annualGraduation,
      totalCandidates: candidates.length,
      candidates: candidates.map(c => ({
        enrolmentId: c.id,
        studentId: c.studentId,
        studentName: c.studentName,
        studentEmail: c.studentEmail,
        studentPhone: c.studentPhone,
        courseTitle: c.courseTitle,
        cohortName: c.cohortName,
        mode: c.mode,
        progressPercentage: c.progressPercentage,
        graduationConferred: c.graduationConferred || false,
        graduationConferredAt: c.graduationConferredAt,
        status: c.graduationConferred ? 'Conferred' : 'Pending Ceremony Signoff',
      })),
    };
  }

  /**
   * Confe institutional graduation status (Restricted to Faculty / Director).
   */
  public conferGraduationStatus(
    enrolmentId: string,
    instructorSignoffNotes: string,
    honorsAwarded: boolean,
    staffUser: { fullName: string; role: string }
  ) {
    const enrolment = dbStore.getEnrolmentById(enrolmentId);
    if (!enrolment) {
      throw new AppError(`Enrolment with ID '${enrolmentId}' not found`, 404, 'ENROLMENT_NOT_FOUND');
    }

    if (enrolment.progressPercentage < 100) {
      throw new AppError(
        `Cannot confer graduation: Candidate has only completed ${enrolment.progressPercentage}% of the curriculum. 100% completion is strictly required.`,
        400,
        'INCOMPLETE_CURRICULUM'
      );
    }

    const now = new Date().toISOString();

    const updated = dbStore.updateEnrolment(enrolment.id, {
      graduationCandidate: true,
      graduationConferred: true,
      graduationConferredAt: now,
      certificateSpecimenPreviewOnly: true,
      status: 'completed',
    });

    // Dispatch Resend graduation notification
    resendService.sendGraduationConferralEmail({
      studentName: enrolment.studentName,
      studentEmail: enrolment.studentEmail,
      courseTitle: enrolment.courseTitle,
      ceremonyVenue: config.institution.annualGraduation.venue,
      ceremonyMonth: config.institution.annualGraduation.month,
      honorsAwarded,
    }).catch(err => console.error('[Resend Graduation Error]', err));

    return {
      success: true,
      message: `Graduation successfully conferred for ${enrolment.studentName}`,
      academicRecord: {
        enrolmentId: updated!.id,
        candidateName: updated!.studentName,
        courseTitle: updated!.courseTitle,
        conferredAt: now,
        conferredBy: `${staffUser.fullName} (${staffUser.role})`,
        instructorSignoffNotes,
        honorsAwarded,
        ceremonyDetails: {
          month: config.institution.annualGraduation.month,
          venue: config.institution.annualGraduation.venue,
          certificateIssuancePolicy: 'Official embossed physical certificate is awarded in-person during the Fourways ceremony. Direct client-side PDF downloading is disabled per institutional accreditation standards.',
        },
      },
    };
  }
}

export const academyService = new AcademyService();
