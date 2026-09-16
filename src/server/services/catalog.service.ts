/**
 * Flawless Institution™ - Course Catalog & Cohort Schedule Service
 * Fourways, Johannesburg, South Africa
 */
import { CourseCatalogItem, Cohort } from '../types/domain.types';
import { dbStore } from '../storage/supabaseStore';

class CatalogService {
  /**
   * Retrieves all accredited course programs
   */
  public async getAllCourses(): Promise<CourseCatalogItem[]> {
    return await dbStore.getCourses();
  }

  /**
   * Retrieves a single course by its ID
   */
  public async getCourseById(id: string): Promise<CourseCatalogItem | undefined> {
    return await dbStore.getCourseById(id);
  }

  /**
   * Retrieves active intake cohorts, optionally filtered by course ID
   */
  public async getCohorts(courseId?: string): Promise<Cohort[]> {
    return await dbStore.getCohorts(courseId);
  }

  /**
   * Retrieves a single intake cohort by ID
   */
  public async getCohortById(id: string): Promise<Cohort | undefined> {
    return await dbStore.getCohortById(id);
  }
}

export const catalogService = new CatalogService();
