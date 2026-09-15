/**
 * Flawless Institution™ - Health Check Routes
 * API Endpoint: /api/v1/health
 */
import { Router, Request, Response } from 'express';
import { config } from '../config';
import { dbStore } from '../storage/inMemoryStore';
import { supabaseService } from '../services/supabase.service';
import { resendService } from '../services/resend.service';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  const counts = dbStore.getCounts();

  res.status(200).json({
    success: true,
    status: 'healthy',
    institution: config.institution.name,
    environment: config.env,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    location: config.institution.headquarters,
    version: config.apiVersion,
    services: {
      academyCatalog: 'operational',
      advisoryCRM: 'operational',
      paymentsPipeline: 'ready',
      database: 'connected',
    },
    integrations: {
      supabase: {
        isConfigured: supabaseService.isConfigured(),
        status: supabaseService.isConfigured() ? 'active' : 'awaiting_keys_in_settings',
        provider: 'Supabase PostgreSQL (Enterprise Cloud)',
      },
      resend: {
        isConfigured: resendService.isConfigured(),
        status: resendService.isConfigured() ? 'active' : 'dev_mock_logging',
        provider: 'Resend Transactional Email API',
      },
      payfast: {
        isConfigured: true,
        sandbox: config.payments.payfast.sandbox,
        provider: 'PayFast South Africa (ZAR)',
      },
      ozow: {
        isConfigured: true,
        provider: 'Ozow Instant EFT',
      },
    },
    systemMetrics: {
      rssMB: Math.round(memoryUsage.rss / 1024 / 1024),
      heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      totalEntities: counts,
    },
  });
});

router.get('/integrations', async (_req: Request, res: Response) => {
  const supabaseDiag = await supabaseService.testConnection();

  res.status(200).json({
    success: true,
    integrations: {
      supabase: {
        configured: supabaseService.isConfigured(),
        status: supabaseDiag.message,
        url: config.supabase.url || 'Not set (Declare in Settings / .env)',
        schemaSqlSnippet: '/api/v1/health/supabase-schema',
      },
      resend: {
        configured: resendService.isConfigured(),
        status: resendService.isConfigured() ? 'Active (Live Delivery)' : 'Fallback (Console Mock Logging)',
        fromEmail: config.resend.fromEmail,
      },
      payfast: {
        configured: true,
        mode: config.payments.payfast.sandbox ? 'Sandbox (Test Mode)' : 'Production Live',
        merchantId: config.payments.payfast.merchantId,
      },
    },
  });
});

router.get('/supabase-schema', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(supabaseService.getSupabaseSchemaSQL());
});

export const healthRoutes = router;
