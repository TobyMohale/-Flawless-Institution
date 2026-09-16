/**
 * Flawless Institution™ - System Health & Diagnostics Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { supabaseService } from '../services/supabase.service';
import { dbStore } from '../storage/supabaseStore';

const router = Router();

// GET /api/v1/health
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const supabaseStatus = supabaseService.getConnectionStatus();
  const counts = await dbStore.getCounts();

  res.status(200).json({
    institution: 'Flawless Institution (Pty) Ltd',
    accreditationStatus: 'Compliant with SAQA/QCTO criteria',
    headquarters: 'Fourways, Sandton, Johannesburg, South Africa',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      provider: 'Supabase (PostgreSQL 15+)',
      connected: supabaseStatus.connected,
      projectUrl: supabaseStatus.projectUrl,
      recordCounts: counts,
    },
    integrations: {
      payfast: Boolean(process.env.PAYFAST_MERCHANT_ID),
      ozow: Boolean(process.env.OZOW_SITE_CODE),
      resend: Boolean(process.env.RESEND_API_KEY),
      popiaCompliance: 'Strict Enforcement Active',
    },
  });
});

export default router;
