/**
 * Flawless Institution™ - Client API Client
 * Connects frontend UI to Express REST API at /api/v1
 */

const API_BASE = '/api/v1';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'faculty' | 'student' | 'employer';
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export type User = AuthUser;

export const authStorage = {
  getDefaultSuperAdmin(): AuthUser {
    return {
      id: 'admin_teldah_root',
      name: 'Teldah Siyawamwaya (Founder & Director)',
      email: 'teldah@flawlessinstitution.co.za',
      role: 'super_admin'
    };
  },
  getToken(): string | null {
    try {
      return localStorage.getItem('fi_auth_token');
    } catch {
      return null;
    }
  },
  getUser(): AuthUser | null {
    try {
      const data = localStorage.getItem('fi_auth_user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setSession(session: AuthSession): void {
    try {
      localStorage.setItem('fi_auth_token', session.token);
      localStorage.setItem('fi_auth_user', JSON.stringify(session.user));
    } catch (e) {
      console.error(e);
    }
  },
  clearSession(): void {
    try {
      localStorage.removeItem('fi_auth_token');
      localStorage.removeItem('fi_auth_user');
    } catch (e) {
      console.error(e);
    }
  }
};

async function ensureSession(): Promise<string | null> {
  let token = authStorage.getToken();
  if (!token) {
    try {
      const res = await fetch(`${API_BASE}/auth/demo-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'super_admin' }),
      });
      const data = await res.json();
      if (data?.data?.token) {
        authStorage.setSession(data.data);
        return data.data.token;
      }
    } catch {
      // ignore
    }
  }
  return token;
}

async function apiRequest<T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  let token = authStorage.getToken();
  if (!token && endpoint !== '/auth/login' && endpoint !== '/auth/demo-session') {
    token = await ensureSession();
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      const errDetail = typeof body.error === 'object' ? (body.error.message || body.error.code) : body.error;
      return {
        success: false,
        error: errDetail || body.message || `HTTP ${res.status}: ${res.statusText}`,
      };
    }

    return body;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Network communication error',
    };
  }
}

export const api = {
  // Auth
  login: (email: string, password: string) => 
    apiRequest<AuthSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  switchDemoRole: async (role: string) => {
    const res = await apiRequest<AuthSession>('/auth/demo-session', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
    if (res.success && res.data) {
      authStorage.setSession(res.data);
    }
    return res;
  },

  getProfile: () => 
    apiRequest<{ user: AuthUser; permissions: string[] }>('/auth/me'),

  // Academy
  getCourses: () => 
    apiRequest<any[]>('/academy/courses'),

  getCohorts: () => 
    apiRequest<any[]>('/academy/cohorts'),

  getTestimonials: (category?: string) => {
    const query = category && category !== 'all' ? `?category=${encodeURIComponent(category)}` : '';
    return apiRequest<any[]>(`/catalog/testimonials${query}`);
  },

  getEnrolments: () => 
    apiRequest<any[]>('/academy/enrolments'),

  createCheckout: (payload: {
    courseId: string;
    mode: 'Online' | 'Physical';
    cohortId?: string;
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    paymentMethod: 'payfast' | 'ozow' | 'manual_eft';
    idOrPassport?: string;
    agreedToTerms: boolean;
  }) =>
    apiRequest<any>('/academy/checkout', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateModules: (enrolmentId: string, completedModules: string[]) =>
    apiRequest<any>(`/academy/enrolments/${enrolmentId}/modules`, {
      method: 'PATCH',
      body: JSON.stringify({ completedModules }),
    }),

  conferGraduation: (enrolmentId: string, notes?: string, honors?: boolean) =>
    apiRequest<any>(`/academy/enrolments/${enrolmentId}/graduate`, {
      method: 'POST',
      body: JSON.stringify({
        instructorSignoffNotes: notes || 'All curriculum standards satisfied. Conferred by Executive Faculty.',
        honorsAwarded: honors ?? false,
      }),
    }),

  // Payments & SARS VAT Invoices
  getInvoice: (referenceNumber: string) =>
    apiRequest<any>(`/payments/invoice/${referenceNumber}`),

  getTransaction: (referenceNumber: string) =>
    apiRequest<any>(`/payments/transaction/${referenceNumber}`),

  getAllTransactions: () =>
    apiRequest<any[]>('/payments/transactions'),

  verifyEft: (referenceNumber: string, verificationNotes: string) =>
    apiRequest<any>(`/payments/manual-eft/${referenceNumber}/verify`, {
      method: 'POST',
      body: JSON.stringify({ verifiedStatus: 'verified', verificationNotes }),
    }),

  simulatePayfastNotify: (m_payment_id: string, pf_payment_id: string, amount_gross: number, item_name: string) =>
    apiRequest<any>('/payments/payfast/notify', {
      method: 'POST',
      body: JSON.stringify({
        m_payment_id,
        pf_payment_id,
        payment_status: 'COMPLETE',
        item_name,
        amount_gross: amount_gross.toFixed(2),
      }),
    }),

  // Advisory & Staffing CRM
  submitHouseholdBrief: (brief: any) =>
    apiRequest<any>('/advisory/household-brief', {
      method: 'POST',
      body: JSON.stringify(brief),
    }),

  getHouseholdBriefs: () =>
    apiRequest<any[]>('/advisory/briefs'),

  getCandidateMatches: (briefId: string) =>
    apiRequest<any>(`/advisory/briefs/${briefId}/matches`),

  updateBriefStatus: (briefId: string, status: string, notes?: string) =>
    apiRequest<any>(`/advisory/briefs/${briefId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),

  submitSpeakingEnquiry: (enquiry: any) =>
    apiRequest<any>('/advisory/speaking', {
      method: 'POST',
      body: JSON.stringify(enquiry),
    }),

  getSpeakingEnquiries: () =>
    apiRequest<any[]>('/advisory/speaking'),

  updateSpeakingStatus: (id: string, status: string, adminNotes?: string) =>
    apiRequest<any>(`/advisory/speaking/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminNotes }),
    }),

  // Health & Integrations
  getIntegrations: () =>
    apiRequest<any>('/health/integrations'),

  // Communications & Notifications (Stage 8)
  getCommunicationLogs: (channel?: string, cohortId?: string, search?: string) => {
    const params = new URLSearchParams();
    if (channel && channel !== 'all') params.append('channel', channel);
    if (cohortId && cohortId !== 'all') params.append('cohortId', cohortId);
    if (search) params.append('search', search);
    return apiRequest<any[]>(`/communications/logs?${params.toString()}`);
  },

  getTemplatePreview: (template: string, name?: string, email?: string, ref?: string) => {
    const params = new URLSearchParams();
    params.append('template', template);
    if (name) params.append('name', name);
    if (email) params.append('email', email);
    if (ref) params.append('ref', ref);
    return apiRequest<any>(`/communications/template-preview?${params.toString()}`);
  },

  sendTestEmail: (payload: { templateType: string; recipientEmail: string; recipientName?: string }) =>
    apiRequest<any>('/communications/test-email', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  dispatchCohortAlerts: (payload: { cohortId: string; channels: string[]; sendOnlyPaid?: boolean }) =>
    apiRequest<any>('/communications/cohort-alerts', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getWhatsAppPreview: (payload: {
    studentName: string;
    studentPhone: string;
    cohortName: string;
    courseTitle: string;
    startDate: string;
    location?: string;
  }) =>
    apiRequest<any>('/communications/whatsapp-preview', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getSmsPreview: (payload: {
    studentName: string;
    studentPhone: string;
    cohortName: string;
    startDate: string;
  }) =>
    apiRequest<any>('/communications/sms-preview', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
