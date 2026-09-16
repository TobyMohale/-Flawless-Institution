/**
 * Flawless Institution™ - Supabase Database & Auth Service
 * Provides lazy-initialized, resilient Supabase client integration.
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';

let supabaseClient: SupabaseClient | null = null;
let supabaseAdminClient: SupabaseClient | null = null;

export class SupabaseService {
  /**
   * Status check of Supabase credentials
   */
  public isConfigured(): boolean {
    return Boolean(config.supabase.url && (config.supabase.anonKey || config.supabase.serviceRoleKey));
  }

  /**
   * Quick connection status summary
   */
  public getConnectionStatus(): { connected: boolean; configured: boolean; projectUrl?: string } {
    return {
      connected: this.isConfigured(),
      configured: this.isConfigured(),
      projectUrl: config.supabase.url,
    };
  }

  /**
   * Lazy-initialized public client (using Anon Key)
   */
  public getClient(): SupabaseClient | null {
    if (!config.supabase.url || !config.supabase.anonKey) {
      return null;
    }
    if (!supabaseClient) {
      supabaseClient = createClient(config.supabase.url, config.supabase.anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    }
    return supabaseClient;
  }

  /**
   * Lazy-initialized service role admin client (bypasses Row-Level Security on backend)
   */
  public getAdminClient(): SupabaseClient | null {
    const key = config.supabase.serviceRoleKey || config.supabase.anonKey;
    if (!config.supabase.url || !key) {
      return null;
    }
    if (!supabaseAdminClient) {
      supabaseAdminClient = createClient(config.supabase.url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });
    }
    return supabaseAdminClient;
  }

  /**
   * Diagnostic connection and table ping test
   */
  public async testConnection(): Promise<{
    connected: boolean;
    configured: boolean;
    url?: string;
    message: string;
    details?: any;
  }> {
    if (!this.isConfigured()) {
      return {
        connected: false,
        configured: false,
        message: 'Supabase credentials (SUPABASE_URL and SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY) not yet configured. The platform is running on secure local persistence with Supabase ready to connect.',
      };
    }

    try {
      const client = this.getAdminClient() || this.getClient();
      if (!client) {
        throw new Error('Supabase client could not be initialized');
      }

      // Check connection by querying auth health or existing table
      const { data, error } = await client.from('enrolments').select('count', { count: 'exact', head: true });

      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        // 42P01 means table does not exist yet, which is normal before running SQL schema
        return {
          connected: false,
          configured: true,
          url: config.supabase.url,
          message: `Supabase returned: ${error.message}`,
          details: error,
        };
      }

      return {
        connected: true,
        configured: true,
        url: config.supabase.url,
        message: error?.code === '42P01' 
          ? 'Connected to Supabase project! Note: Tables have not been created yet; use the provided SQL schema script.'
          : 'Successfully connected and verified against Supabase database.',
      };
    } catch (err: any) {
      return {
        connected: false,
        configured: true,
        url: config.supabase.url,
        message: `Connection test failed: ${err.message}`,
      };
    }
  }

  /**
   * Recommended PostgreSQL DDL Schema for Supabase SQL Editor
   */
  public getSupabaseSchemaSQL(): string {
    return `
-- Flawless Institution™ - PostgreSQL Supabase Production Schema
-- Fourways, Johannesburg, South Africa

-- 1. Users & IAM (Compliant with POPIA)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'faculty', 'student', 'employer')),
  phone_number TEXT,
  popia_consented BOOLEAN DEFAULT FALSE,
  popia_consented_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Academy Courses & Accredited Modules
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  price_zar NUMERIC(10,2) NOT NULL,
  registration_fee_zar NUMERIC(10,2) DEFAULT 300.00,
  duration_weeks INT NOT NULL,
  available_modes JSONB DEFAULT '["Online", "Physical"]',
  syllabus_modules JSONB NOT NULL,
  graduation_eligible BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE
);

-- 3. Cohorts (Strict Fourways Capacity Locks)
CREATE TABLE IF NOT EXISTS public.cohorts (
  id TEXT PRIMARY KEY,
  course_id TEXT REFERENCES public.courses(id),
  name TEXT NOT NULL,
  intake_month TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location TEXT NOT NULL,
  mode TEXT NOT NULL,
  capacity INT NOT NULL DEFAULT 15,
  enrolled_count INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 4. Student Enrolments & Module Progression
CREATE TABLE IF NOT EXISTS public.enrolments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT,
  course_id TEXT REFERENCES public.courses(id),
  course_title TEXT NOT NULL,
  cohort_id TEXT REFERENCES public.cohorts(id),
  cohort_name TEXT NOT NULL,
  mode TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  progress_percentage NUMERIC(5,2) DEFAULT 0.00,
  completed_modules JSONB DEFAULT '[]',
  total_fee_zar NUMERIC(10,2) NOT NULL,
  registration_fee_zar NUMERIC(10,2) DEFAULT 300.00,
  is_paid BOOLEAN DEFAULT FALSE,
  graduation_candidate BOOLEAN DEFAULT FALSE,
  graduation_conferred BOOLEAN DEFAULT FALSE,
  graduation_conferred_at TIMESTAMPTZ,
  enrolled_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Financial Transactions & SARS Tax Invoicing
CREATE TABLE IF NOT EXISTS public.transactions (
  id TEXT PRIMARY KEY,
  reference_number TEXT UNIQUE NOT NULL,
  enrolment_id TEXT REFERENCES public.enrolments(id),
  student_email TEXT NOT NULL,
  student_name TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  amount_zar NUMERIC(10,2) NOT NULL,
  registration_fee_zar NUMERIC(10,2) DEFAULT 300.00,
  total_amount_zar NUMERIC(10,2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  gateway_transaction_id TEXT,
  invoice_number TEXT,
  manual_eft_proof JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  cleared_at TIMESTAMPTZ
);

-- 6. Confidential Household Staffing Briefs
CREATE TABLE IF NOT EXISTS public.household_briefs (
  id TEXT PRIMARY KEY,
  employer_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  residence_area TEXT NOT NULL,
  role_requested TEXT NOT NULL,
  placement_type TEXT NOT NULL,
  privacy_tier TEXT NOT NULL DEFAULT 'Confidential',
  target_start_date TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT DEFAULT 'intake_received',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Keynote Speaking & Executive Masterclass Enquiries
CREATE TABLE IF NOT EXISTS public.speaking_enquiries (
  id TEXT PRIMARY KEY,
  host_organization TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  event_theme TEXT NOT NULL,
  requested_date TEXT NOT NULL,
  event_format TEXT NOT NULL,
  location TEXT NOT NULL,
  estimated_audience_size INT DEFAULT 50,
  budget_zar TEXT,
  special_requests TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;
  }
}

export const supabaseService = new SupabaseService();
