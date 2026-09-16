/**
 * Flawless Institution™ - Academy Enrolment & Academic Progression Service
 * Fourways, Johannesburg, South Africa
 */
import { Enrolment, CourseMode, EnrolmentStatus } from '../types/domain.types';
import { dbStore } from '../storage/supabaseStore';
import { catalogService } from './catalog.service';
import { communicationsService } from './communications.service';

export interface EnrolStudentDTO {
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  cohortId: string;
  mode: CourseMode;
}

class AcademyService {
  /**
   * Enrols a verified student into an accredited cohort with strict capacity validation
   */
  public async enrolStudent(dto: EnrolStudentDTO): Promise<Enrolment> {
    const course = await catalogService.getCourseById(dto.courseId);
    if (!course) {
      throw new Error(`Accredited program not found for ID: ${dto.courseId}`);
    }

    const cohort = await catalogService.getCohortById(dto.cohortId);
    if (!cohort) {
      throw new Error(`Intake cohort not found for ID: ${dto.cohortId}`);
    }

    if (!cohort.isActive) {
      throw new Error('This intake cohort is closed for registration.');
    }

    if (cohort.availableSeats <= 0) {
      throw new Error(
        `Cohort "${cohort.name}" has reached its maximum physical/online capacity (${cohort.capacity} scholars). Please select an alternate intake date.`
      );
    }

    // Verify existing active enrolment
    const existingEnrolments = await dbStore.getEnrolmentsByStudentId(dto.studentId);
    const alreadyEnrolled = existingEnrolments.some(
      (e) => e.courseId === dto.courseId && e.cohortId === dto.cohortId && e.status !== 'suspended'
    );
    if (alreadyEnrolled) {
      throw new Error('You are already registered for this specific course and cohort.');
    }

    const enrolmentId = `enr-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    const now = new Date().toISOString();

    const newEnrolment: Enrolment = {
      id: enrolmentId,
      studentId: dto.studentId,
      studentName: dto.studentName,
      studentEmail: dto.studentEmail.toLowerCase().trim(),
      studentPhone: dto.studentPhone,
      courseId: course.id,
      courseTitle: course.title,
      cohortId: cohort.id,
      cohortName: cohort.name,
      mode: dto.mode,
      status: 'pending_payment',
      progressPercentage: 0,
      completedModules: [],
      enrolledAt: now,
      graduationCandidate: course.graduationEligible,
      graduationCeremony: 'Annual Graduation & Pinning Ceremony, Fourways (November 2026)',
      graduationConferred: false,
      totalFeeZAR: course.priceZAR,
      registrationFeeZAR: course.registrationFeeZAR,
      isPaid: false,
    };

    // Atomically reserve a seat in the cohort
    await dbStore.updateCohortSeats(cohort.id, +1);

    // Persist enrolment
    await dbStore.createEnrolment(newEnrolment);

    // Dispatch enrolment notice
    try {
      await communicationsService.sendEnrolmentNotice(newEnrolment);
    } catch (commErr) {
      console.warn('[AcademyService] Enrolment dispatch notice failed:', commErr);
    }

    return newEnrolment;
  }

  /**
   * Retrieves all enrolments for a specific student ID
   */
  public async getStudentEnrolments(studentId: string): Promise<Enrolment[]> {
    return await dbStore.getEnrolmentsByStudentId(studentId);
  }

  /**
   * Retrieves a single enrolment record by ID
   */
  public async getEnrolmentById(id: string): Promise<Enrolment | undefined> {
    return await dbStore.getEnrolmentById(id);
  }

  /**
   * Administrative view: lists all enrolments across the institution
   */
  public async getAllEnrolments(): Promise<Enrolment[]> {
    return await dbStore.getAllEnrolments();
  }

  /**
   * Updates student progression across accredited curriculum modules
   */
  public async updateModuleProgress(enrolmentId: string, completedModuleIndex: number): Promise<Enrolment> {
    const enrolment = await dbStore.getEnrolmentById(enrolmentId);
    if (!enrolment) {
      throw new Error(`Enrolment record not found: ${enrolmentId}`);
    }

    const course = await catalogService.getCourseById(enrolment.courseId);
    if (!course) {
      throw new Error('Course curriculum not found.');
    }

    const totalModules = course.syllabusModules.length;
    if (completedModuleIndex < 0 || completedModuleIndex >= totalModules) {
      throw new Error('Invalid module index.');
    }

    const targetModule = course.syllabusModules[completedModuleIndex];
    const completedSet = new Set(enrolment.completedModules);
    completedSet.add(targetModule);

    const completedList = Array.from(completedSet);
    const progress = Math.min(100, Math.round((completedList.length / totalModules) * 100));

    const status: EnrolmentStatus = progress === 100 ? 'completed' : 'in_progress';

    const updated = await dbStore.updateEnrolment(enrolmentId, {
      completedModules: completedList,
      progressPercentage: progress,
      status,
      graduationCandidate: progress === 100 && course.graduationEligible,
    });

    return updated!;
  }

  /**
   * Formal conferral of completion by the Academic Registrar (Fourways)
   */
  public async conferGraduation(enrolmentId: string): Promise<Enrolment> {
    const enrolment = await dbStore.getEnrolmentById(enrolmentId);
    if (!enrolment) {
      throw new Error(`Enrolment record not found: ${enrolmentId}`);
    }

    if (enrolment.progressPercentage < 100) {
      throw new Error('Cannot confer certification: Candidate has uncompleted modules.');
    }

    const now = new Date().toISOString();
    const updated = await dbStore.updateEnrolment(enrolmentId, {
      graduationConferred: true,
      graduationConferredAt: now,
      status: 'completed',
    });

    return updated!;
  }

  /**
   * Validates digital specimen certificate authenticity
   */
  public async verifyGraduationSpecimen(enrolmentId: string): Promise<{
    valid: boolean;
    studentName?: string;
    courseTitle?: string;
    ceremony?: string;
    conferredAt?: string;
    watermark: string;
    issuedBy: string;
  }> {
    const enrolment = await dbStore.getEnrolmentById(enrolmentId);
    if (!enrolment || !enrolment.graduationConferred) {
      return {
        valid: false,
        watermark: 'SPECIMEN ONLY - NOT CONFERRED',
        issuedBy: 'Flawless Institution Registrar, Fourways, Sandton',
      };
    }

    return {
      valid: true,
      studentName: enrolment.studentName,
      courseTitle: enrolment.courseTitle,
      ceremony: enrolment.graduationCeremony,
      conferredAt: enrolment.graduationConferredAt,
      watermark: 'OFFICIAL ACCREDITED CREDENTIAL',
      issuedBy: 'Flawless Institution Registrar, Fourways, Sandton',
    };
  }
}

export const academyService = new AcademyService();
