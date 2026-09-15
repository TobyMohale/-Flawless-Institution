/**
 * Flawless Institution™ - Authentication & Identity Routes
 * API Mount: /api/v1/auth
 */
import { Router, Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { dbStore } from '../storage/inMemoryStore';
import { validateBody } from '../middleware/errorHandler';
import { requireAuth } from '../middleware/auth.middleware';
import { 
  RegisterSchema, 
  LoginSchema, 
  PopiaReconsentSchema, 
  UpdateProfileSchema 
} from '../models/schemas';

const router = Router();

// Helper to extract client IP address for POPIA compliance audit logs
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || req.ip || '127.0.0.1';
}

/**
 * POST /api/v1/auth/register
 * Student or employer registration with verified POPIA consent.
 */
router.post(
  '/register',
  validateBody(RegisterSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ipAddress = getClientIp(req);
      const result = await authService.register({
        ...req.body,
        ipAddress,
      });

      res.status(201).json({
        success: true,
        message: 'Account registered successfully with verified POPIA consent',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/auth/login
 * Standard authentication issuing 7-day stateless JWT.
 */
router.post(
  '/login',
  validateBody(LoginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);

      res.status(200).json({
        success: true,
        message: 'Authentication successful',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/auth/demo-session
 * Development & Preview Switcher: Issue signed token for selected role.
 */
router.post('/demo-session', (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.body?.role || 'super_admin';
    const allUsers = dbStore.getAllUsers();
    let targetUser = allUsers.find(u => u.role === role);

    if (!targetUser) {
      if (role === 'super_admin') {
        targetUser = dbStore.getUserById('usr-teldah-founder');
      } else if (role === 'faculty') {
        targetUser = dbStore.getUserById('usr-faculty-precious');
      } else if (role === 'student') {
        targetUser = dbStore.getUserById('usr-student-thabo');
      } else {
        targetUser = dbStore.getUserById('usr-teldah-founder');
      }
    }

    if (!targetUser) {
      targetUser = dbStore.getAllUsers()[0];
    }

    const token = authService.generateToken(targetUser);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: targetUser.id,
          email: targetUser.email,
          fullName: targetUser.fullName,
          name: targetUser.fullName,
          role: targetUser.role,
        }
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/auth/me
 * Retrieves current authenticated user profile and permissions.
 */
router.get('/me', requireAuth, (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = authService.getUserProfile(req.user!.userId);

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        popiaConsent: user.popiaConsent,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/v1/auth/profile
 * Update profile contact details.
 */
router.patch(
  '/profile',
  requireAuth,
  validateBody(UpdateProfileSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const updated = authService.updateProfile(req.user!.userId, req.body);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: updated.id,
          email: updated.email,
          fullName: updated.fullName,
          phone: updated.phone,
          role: updated.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/v1/auth/popia-consent
 * Record updated POPIA consent for compliance audits.
 */
router.post(
  '/popia-consent',
  requireAuth,
  validateBody(PopiaReconsentSchema),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const ipAddress = getClientIp(req);
      const user = authService.recordPopiaConsent(req.user!.userId, req.body.version, ipAddress);

      res.status(200).json({
        success: true,
        message: 'POPIA compliance consent updated and audited successfully',
        data: {
          userId: user.id,
          popiaConsent: user.popiaConsent,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export const authRoutes = router;
