/**
 * Flawless Institution™ - Central API v1 Router
 * Mounts all domain micro-routes
 */
import { Router } from 'express';
import { healthRoutes } from './health.routes';
import { catalogRoutes } from './catalog.routes';
import { authRoutes } from './auth.routes';
import { academyRoutes } from './academy.routes';
import { paymentRoutes } from './payment.routes';
import { advisoryRoutes } from './advisory.routes';
import { communicationsRoutes } from './communications.routes';

const apiRouter = Router();

// Mount foundational domain routes
apiRouter.use('/health', healthRoutes);
apiRouter.use('/catalog', catalogRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/academy', academyRoutes);
apiRouter.use('/payments', paymentRoutes);
apiRouter.use('/advisory', advisoryRoutes);
apiRouter.use('/staffing', advisoryRoutes);
apiRouter.use('/communications', communicationsRoutes);

// Meta route for API discovery
apiRouter.get('/', (_req, res) => {
  res.json({
    institution: 'Flawless Institution',
    tagline: 'Empowering People • Elevating Homes • Building Businesses',
    version: 'v1',
    endpoints: {
      health: '/api/v1/health',
      catalog: '/api/v1/catalog',
      courses: '/api/v1/catalog/courses',
      cohorts: '/api/v1/catalog/cohorts',
      auth: {
        register: 'POST /api/v1/auth/register',
        login: 'POST /api/v1/auth/login',
        me: 'GET /api/v1/auth/me',
        profile: 'PATCH /api/v1/auth/profile',
        popiaConsent: 'POST /api/v1/auth/popia-consent',
      },
      academy: {
        checkout: 'POST /api/v1/academy/checkout',
        myCourses: 'GET /api/v1/academy/my-courses',
        enrolmentDetails: 'GET /api/v1/academy/enrolments/:id',
        updateProgress: 'POST /api/v1/academy/enrolments/:id/progress',
        graduationRoster: 'GET /api/v1/academy/graduation-roster (Faculty/Admin)',
        conferGraduation: 'POST /api/v1/academy/enrolments/:id/graduate (Faculty/Admin)',
      },
      payments: {
        payfastCreate: 'POST /api/v1/payments/payfast/create',
        payfastNotify: 'POST /api/v1/payments/payfast/notify (Webhook)',
        ozowNotify: 'POST /api/v1/payments/ozow/notify (Webhook)',
        manualEftSubmit: 'POST /api/v1/payments/manual-eft/submit',
        manualEftVerify: 'POST /api/v1/payments/manual-eft/:ref/verify (Faculty/Admin)',
        taxInvoice: 'GET /api/v1/payments/invoice/:ref',
        transactionStatus: 'GET /api/v1/payments/transaction/:ref',
      },
      advisoryAndStaffing: {
        submitBrief: 'POST /api/v1/advisory/household-brief',
        getBriefs: 'GET /api/v1/advisory/briefs (Role-masked)',
        candidateMatches: 'GET /api/v1/advisory/briefs/:id/matches (Faculty/Admin)',
        updateBriefStatus: 'PATCH /api/v1/advisory/briefs/:id/status (Faculty/Admin)',
        submitSpeaking: 'POST /api/v1/advisory/speaking',
        getSpeaking: 'GET /api/v1/advisory/speaking (Director/Super Admin)',
        updateSpeakingStatus: 'PATCH /api/v1/advisory/speaking/:id/status (Director/Super Admin)',
      },
    },
  });
});

export { apiRouter };
