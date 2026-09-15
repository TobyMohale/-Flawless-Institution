/**
 * Flawless Institution™ - Authentication & RBAC Middleware
 * Validates JWT bearer tokens, checks institutional role boundaries, and enforces POPIA compliance.
 */
import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { dbStore } from '../storage/inMemoryStore';
import { AppError } from './errorHandler';
import { JwtUserPayload, UserRole } from '../types/domain.types';

// Augment Express Request interface with authenticated user context
declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

/**
 * Require valid JWT Bearer authentication token on request.
 */
export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      new AppError(
        'Authentication required. Please provide a valid Bearer token in the Authorization header.',
        401,
        'UNAUTHORIZED'
      )
    );
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new AppError('Malformed authorization header', 401, 'MALFORMED_AUTH_HEADER'));
  }

  try {
    const payload = authService.verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Role-Based Access Control (RBAC) guard.
 * Allows access only to specified institutional roles (e.g. super_admin, admin, faculty).
 */
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required before checking role authorization', 401, 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Forbidden. Your current role ('${req.user.role}') lacks permission to perform this institutional operation. Required role(s): ${allowedRoles.join(', ')}`,
          403,
          'FORBIDDEN'
        )
      );
    }

    next();
  };
};

/**
 * Mandatory POPIA (Protection of Personal Information Act) guard.
 * Blocks requests if the user has not actively agreed to data governance terms.
 */
export const requirePopiaConsent = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
  }

  const user = dbStore.getUserById(req.user.userId);
  if (!user || !user.popiaConsent || !user.popiaConsent.agreed) {
    return next(
      new AppError(
        'Action restricted: Acceptance of the South African POPIA Data Consent agreement is required.',
        403,
        'POPIA_CONSENT_REQUIRED'
      )
    );
  }

  next();
};
