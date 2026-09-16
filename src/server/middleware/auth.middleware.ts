/**
 * Flawless Institution™ - Authentication & Role Verification Middleware
 * Fourways, Johannesburg, South Africa
 */
import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { JwtUserPayload, UserRole } from '../types/domain.types';

declare global {
  namespace Express {
    interface Request {
      user?: JwtUserPayload;
    }
  }
}

/**
 * Validates incoming Bearer JWT token
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      error: 'Access denied: Bearer authentication token is required.',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = authService.verifyToken(token);
    req.user = payload;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: 'Invalid, expired, or tampered session token. Please re-authenticate.',
    });
  }
}

/**
 * Enforces role-based access control (RBAC)
 */
export function requireRole(allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication is required before verifying authorizations.',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: `Institutional access restricted. Required role in [${allowedRoles.join(', ')}], user possesses [${req.user.role}].`,
      });
      return;
    }

    next();
  };
}
