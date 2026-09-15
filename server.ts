/**
 * Flawless Institution™ - Main Server Entry Point
 * Headquarters: Fourways, Johannesburg, South Africa
 * Full-Stack Express + Vite Integration
 */
import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { apiRouter } from './src/server/routes';
import { errorHandler } from './src/server/middleware/errorHandler';
import { requestLogger } from './src/server/middleware/logger';
import { config } from './src/server/config';

async function startServer() {
  const app = express();
  const PORT = config.port; // 3000
  const HOST = config.host; // '0.0.0.0'

  // Standard middleware
  app.use(cors({
    origin: true,
    credentials: true,
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(requestLogger);

  // Mount API Routes FIRST
  app.use('/api/v1', apiRouter);

  // Backward compatibility alias for /api
  app.use('/api', apiRouter);

  // Vite Middleware (Development) or Static Serving (Production)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Server] Initializing Vite middleware in development mode...');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log('[Server] Serving production static assets from dist/ folder...');
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Centralized Error Handling Middleware (must be after all routes)
  app.use(errorHandler);

  // Bind to 0.0.0.0 and PORT 3000
  app.listen(PORT, HOST, () => {
    console.log(`=======================================================`);
    console.log(`🏛️  ${config.institution.name} API & Application Server`);
    console.log(`📍  Headquarters: ${config.institution.headquarters}`);
    console.log(`🚀  Server running at http://${HOST}:${PORT}`);
    console.log(`🩺  Health Check: http://${HOST}:${PORT}/api/v1/health`);
    console.log(`📚  Course Catalog: http://${HOST}:${PORT}/api/v1/catalog`);
    console.log(`=======================================================`);
  });
}

startServer().catch((err) => {
  console.error('[Server Fatal Error] Failed to start server:', err);
  process.exit(1);
});
