/**
 * Flawless Institution™ - Authentication API Routes
 * Fourways, Johannesburg, South Africa
 */
import { Router, Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// POST /api/v1/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullName, phone, role, popiaConsent } = req.body;

    if (!email || !password || !fullName || !phone) {
      res.status(400).json({
        success: false,
        error: 'Missing mandatory registration fields (email, password, fullName, phone).',
      });
      return;
    }

    if (!popiaConsent) {
      res.status(400).json({
        success: false,
        error: 'POPIA consent is legally required under South African law to register.',
      });
      return;
    }

    const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;

    const authResult = await authService.register({
      email,
      password,
      fullName,
      phone,
      role: role || 'student',
      popiaConsent: Boolean(popiaConsent),
      ipAddress,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Welcome to Flawless Institution.',
      data: authResult,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Registration failed.',
    });
  }
});

// POST /api/v1/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: 'Please provide both email and password.',
      });
      return;
    }

    const authResult = await authService.login({ email, password });

    res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      data: authResult,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message || 'Invalid credentials.',
    });
  }
});

// GET /api/v1/auth/me
router.get('/me', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await authService.getProfile(req.user!.userId);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      error: error.message || 'User profile not found.',
    });
  }
});

// POST /api/v1/auth/demo-session
// HARD BLOCKED in production: rejects any invocation when NODE_ENV === 'production'
router.post('/demo-session', async (req: Request, res: Response): Promise<void> => {
  if (process.env.NODE_ENV === 'production') {
    res.status(403).json({
      success: false,
      error: 'Demo student sessions are strictly disabled in production.',
    });
    return;
  }
  try {
    const demoAuth = await authService.getOrCreateDemoStudentSession();
    res.status(200).json({
      success: true,
      message: 'Demo student session initialized.',
      data: demoAuth,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to initialize demo session.',
    });
  }
});

export default router;
