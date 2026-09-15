/**
 * Flawless Institution™ - Catalog Service
 * Business logic for courses, physical intake cohorts, and pricing.
 */
import { dbStore } from '../storage/inMemoryStore';
import { CourseCatalogItem, Cohort } from '../types/domain.types';
import { config } from '../config';

export class CatalogService {
  public getAllCourses(): CourseCatalogItem[] {
    return dbStore.getCourses();
  }

  public getCourseById(id: string): CourseCatalogItem | undefined {
    return dbStore.getCourseById(id);
  }

  public getAvailableCohorts(courseId?: string): Cohort[] {
    return dbStore.getCohorts(courseId);
  }

  public getCatalogSummary() {
    const courses = this.getAllCourses();
    const cohorts = this.getAvailableCohorts();

    return {
      institution: config.institution.name,
      headquarters: config.institution.headquarters,
      currency: config.institution.currency,
      standardRegistrationFeeZAR: config.institution.registrationFeeZAR,
      totalActiveCourses: courses.length,
      upcomingIntakes: cohorts.map(c => ({
        cohortId: c.id,
        courseId: c.courseId,
        intakeMonth: c.intakeMonth,
        mode: c.mode,
        location: c.location,
        availableSeats: c.availableSeats,
        startDate: c.startDate,
      })),
      courses: courses.map(c => ({
        id: c.id,
        title: c.title,
        category: c.category,
        feeZAR: c.priceZAR,
        originalFeeZAR: c.originalPriceZAR,
        totalInitialCostZAR: c.priceZAR + c.registrationFeeZAR,
        duration: c.durationLabel,
        modes: c.availableModes,
        graduationEligible: c.graduationEligible,
      })),
    };
  }
}

export const catalogService = new CatalogService();
