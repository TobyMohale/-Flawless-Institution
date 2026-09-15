/**
 * Flawless Institution™ - Authentication & IAM Service
 * Handles user lifecycle, PBKDF2 credential verification, and POPIA consent tracking.
 */
import jwt from 'jsonwebtoken';
import { dbStore } from '../storage/inMemoryStore';
import { User, JwtUserPayload, UserRole } from '../types/domain.types';
import { hashPassword, verifyPassword } from '../utils/crypto';
import { AppError } from '../middleware/errorHandler';
import { config } from '../config';

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role?: UserRole;
  agreedToPopia: boolean;
  ipAddress?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    role: UserRole;
    status: string;
    createdAt: string;
    lastLoginAt?: string;
    popiaConsent: {
      agreed: boolean;
      agreedAt: string;
      version: string;
    };
  };
}

export class AuthService {
  /**
   * Issue signed stateless JWT for an authenticated user.
   */
  public generateToken(user: User): string {
    const payload: JwtUserPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    return jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: '7d',
      issuer: 'flawless-institution-fourways',
      audience: 'flawless-client',
    });
  }

  /**
   * Verify and decode a JWT.
   */
  public verifyToken(token: string): JwtUserPayload {
    try {
      const decoded = jwt.verify(token, config.security.jwtSecret, {
        issuer: 'flawless-institution-fourways',
        audience: 'flawless-client',
      }) as JwtUserPayload;
      return decoded;
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        throw new AppError('Authentication token has expired. Please sign in again.', 401, 'TOKEN_EXPIRED');
      }
      throw new AppError('Invalid or corrupted authentication token', 401, 'INVALID_TOKEN');
    }
  }

  /**
   * Register a new Student or Employer account with POPIA consent audit.
   */
  public async register(input: RegisterInput): Promise<AuthResponse> {
    const normalizedEmail = input.email.toLowerCase().trim();

    // 1. Check for duplicate account
    const existing = dbStore.getUserByEmail(normalizedEmail);
    if (existing) {
      throw new AppError('An account with this email address is already registered', 409, 'ACCOUNT_EXISTS');
    }

    // 2. Enforce South African POPIA compliance
    if (!input.agreedToPopia) {
      throw new AppError(
        'Registration cannot proceed without acceptance of the POPIA Policy and Institutional Terms.',
        400,
        'POPIA_CONSENT_REQUIRED'
      );
    }

    const userId = `usr-${Math.random().toString(36).substring(2, 11)}`;
    const now = new Date().toISOString();

    // 3. Create domain user
    const newUser: User = {
      id: userId,
      email: normalizedEmail,
      fullName: input.fullName.trim(),
      phone: input.phone.trim(),
      role: input.role || 'student',
      status: 'active',
      createdAt: now,
      lastLoginAt: now,
      popiaConsent: {
        agreed: true,
        agreedAt: now,
        ipAddress: input.ipAddress || 'unknown',
        version: '2026-v1.0',
      },
    };

    // 4. Hash password with PBKDF2 and dedicated salt
    const { hash, salt } = hashPassword(input.password);
    dbStore.saveCredential({
      userId,
      email: normalizedEmail,
      passwordHash: hash,
      salt,
      updatedAt: now,
    });

    dbStore.createUser(newUser);

    // 5. Generate session token
    const token = this.generateToken(newUser);

    return {
      token,
      expiresIn: config.security.jwtExpiresIn,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
        createdAt: newUser.createdAt,
        lastLoginAt: newUser.lastLoginAt,
        popiaConsent: {
          agreed: newUser.popiaConsent.agreed,
          agreedAt: newUser.popiaConsent.agreedAt,
          version: newUser.popiaConsent.version,
        },
      },
    };
  }

  /**
   * Authenticate user credentials and return session token.
   */
  public async login(input: LoginInput): Promise<AuthResponse> {
    const normalizedEmail = input.email.toLowerCase().trim();

    const user = dbStore.getUserByEmail(normalizedEmail);
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    if (user.status === 'suspended') {
      throw new AppError('This account has been suspended. Please contact institutional faculty.', 403, 'ACCOUNT_SUSPENDED');
    }

    const credential = dbStore.getCredentialByEmail(normalizedEmail);
    if (!credential) {
      throw new AppError('Authentication credentials not found for this account', 401, 'INVALID_CREDENTIALS');
    }

    const isValid = verifyPassword(input.password, credential.passwordHash, credential.salt);
    if (!isValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    // Update last login
    const updatedUser = dbStore.updateUser(user.id, {
      lastLoginAt: new Date().toISOString(),
    }) || user;

    const token = this.generateToken(updatedUser);

    return {
      token,
      expiresIn: config.security.jwtExpiresIn,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        phone: updatedUser.phone,
        role: updatedUser.role,
        status: updatedUser.status,
        createdAt: updatedUser.createdAt,
        lastLoginAt: updatedUser.lastLoginAt,
        popiaConsent: {
          agreed: updatedUser.popiaConsent.agreed,
          agreedAt: updatedUser.popiaConsent.agreedAt,
          version: updatedUser.popiaConsent.version,
        },
      },
    };
  }

  /**
   * Get user profile by user ID.
   */
  public getUserProfile(userId: string): User {
    const user = dbStore.getUserById(userId);
    if (!user) {
      throw new AppError('User account not found', 404, 'USER_NOT_FOUND');
    }
    return user;
  }

  /**
   * Update profile details.
   */
  public updateProfile(userId: string, updates: { fullName?: string; phone?: string }): User {
    const updated = dbStore.updateUser(userId, updates);
    if (!updated) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }
    return updated;
  }

  /**
   * Record updated POPIA consent.
   */
  public recordPopiaConsent(userId: string, version: string, ipAddress?: string): User {
    const user = dbStore.getUserById(userId);
    if (!user) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    const updated = dbStore.updateUser(userId, {
      popiaConsent: {
        agreed: true,
        agreedAt: new Date().toISOString(),
        ipAddress: ipAddress || 'unknown',
        version,
      },
    });

    return updated!;
  }
}

export const authService = new AuthService();
