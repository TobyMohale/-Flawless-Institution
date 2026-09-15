/**
 * Flawless Institution™ - Request Tracing & Logger Middleware
 */
import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const requestId = Math.random().toString(36).substring(2, 10);
  
  res.setHeader('X-Request-Id', requestId);
  res.setHeader('X-Institution', 'Flawless-Institution-ZA');

  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms) [ID: ${requestId}]`);
    }
  });

  next();
};
