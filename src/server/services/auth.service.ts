/**
 * Flawless Institution™ - Authentication & Identity Service
 * Fourways, Johannesburg, South Africa
 *
 * Implements PBKDF2 Password Hashing (100,000 iterations),
 * JWT Generation, and POPIA-Compliant Consent Tracking.
 */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User, AuthCredential, JwtUserPayload, UserRole } from '../types/domain.types';
import { dbStore } from '../storage/supabaseStore';
import { communicationsService } from './communications.service';

const JWT_SECRET = process.env.JWT_SECRET || 'flawless_secret_key_prod_fourways_2026';
const JWT_EXPIRES_IN = '24h';
const PBKDF2_ITERATIONS = 100000;
const PBKDF2_KEYLEN = 64;
const PBKDF2_DIGEST = 'sha512';

export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  role?: UserRole;
  popiaConsent: boolean;
  ipAddress?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResult {
  token: string;
  user: User;
  expiresIn: string;
}

interface PreconfiguredAccount {
  user: User;
  password: string;
}

const PRECONFIGURED_ACCOUNTS: PreconfiguredAccount[] = [
  {
    user: {
      id: 'admin_teldah_root',
      email: 'director@flawlessinstitution.co.za',
      fullName: 'Teldah Siyawamwaya (Founder & Executive Director)',
      phone: '+27 65 944 9409',
      role: 'super_admin',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      popiaConsent: { agreed: true, agreedAt: '2026-01-01T00:00:00.000Z', version: '2026-v1.0' },
    },
    password: 'Director@2026!',
  },
  {
    user: {
      id: 'admin_teldah_alt',
      email: 'teldah@flawlessinstitution.co.za',
      fullName: 'Teldah Siyawamwaya (Founder & Executive Director)',
      phone: '+27 65 944 9409',
      role: 'super_admin',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      popiaConsent: { agreed: true, agreedAt: '2026-01-01T00:00:00.000Z', version: '2026-v1.0' },
    },
    password: 'Director@2026!',
  },
  {
    user: {
      id: 'faculty_advisor_01',
      email: 'faculty@flawlessinstitution.co.za',
      fullName: 'Faculty Advisor',
      phone: '+27 11 000 0001',
      role: 'faculty',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      popiaConsent: { agreed: true, agreedAt: '2026-01-01T00:00:00.000Z', version: '2026-v1.0' },
    },
    password: 'Faculty@2026!',
  },
  {
    user: {
      id: 'employer_motsepe_01',
      email: 'employer@family-trust.co.za',
      fullName: 'Dr. Kagiso Motsepe Family Trust',
      phone: '+27 11 000 0002',
      role: 'employer',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      popiaConsent: { agreed: true, agreedAt: '2026-01-01T00:00:00.000Z', version: '2026-v1.0' },
    },
    password: 'Employer@2026!',
  },
  {
    user: {
      id: 'student_nomvula_01',
      email: 'student@alumni.flawlessinstitution.co.za',
      fullName: 'Nomvula Dlamini',
      phone: '+27 82 555 0192',
      role: 'student',
      status: 'active',
      createdAt: '2026-01-01T00:00:00.000Z',
      popiaConsent: { agreed: true, agreedAt: '2026-01-01T00:00:00.000Z', version: '2026-v1.0' },
    },
    password: 'Student@2026!',
  },
];

class AuthService {
  /**
   * Hashes a plaintext password using crypto.pbkdf2Sync
   */
  private hashPassword(password: string, salt: string): string {
    return crypto
      .pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST)
      .toString('hex');
  }

  /**
   * Generates a random cryptographic salt
   */
  private generateSalt(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Issues a signed HS256 JWT
   */
  public generateToken(user: User): string {
    const payload: JwtUserPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  /**
   * Verifies and decodes a signed JWT
   */
  public verifyToken(token: string): JwtUserPayload {
    return jwt.verify(token, JWT_SECRET) as JwtUserPayload;
  }

  /**
   * Registers a new student or platform user with POPIA compliance
   */
  public async register(dto: RegisterDTO): Promise<AuthResult> {
    const cleanEmail = dto.email.toLowerCase().trim();

    // Check email uniqueness
    const existing = await dbStore.getUserByEmail(cleanEmail);
    if (existing) {
      throw new Error(`An account is already registered with email: ${cleanEmail}`);
    }

    if (!dto.popiaConsent) {
      throw new Error('POPIA consent is legally required to register with Flawless Institution.');
    }

    if (!dto.password || dto.password.length < 8) {
      throw new Error('Password must be at least 8 characters in length.');
    }

    const salt = this.generateSalt();
    const passwordHash = this.hashPassword(dto.password, salt);
    const userId = crypto.randomUUID();
    const now = new Date().toISOString();

    const newUser: User = {
      id: userId,
      email: cleanEmail,
      fullName: dto.fullName.trim(),
      phone: dto.phone.trim(),
      role: dto.role || 'student',
      status: 'active',
      createdAt: now,
      popiaConsent: {
        agreed: true,
        agreedAt: now,
        ipAddress: dto.ipAddress,
        version: '2026-v1.0',
      },
    };

    const savedUser = await dbStore.createUser(newUser);

    const credential: AuthCredential = {
      userId: savedUser.id,
      email: cleanEmail,
      passwordHash,
      salt,
      updatedAt: now,
    };

    await dbStore.saveCredential(credential);

    const token = this.generateToken(savedUser);

    // Dispatch welcome notification asynchronously
    try {
      await communicationsService.sendWelcomeNotification(savedUser);
    } catch (commErr) {
      console.warn('[AuthService] Welcome communication skipped:', commErr);
    }

    return {
      token,
      user: savedUser,
      expiresIn: JWT_EXPIRES_IN,
    };
  }

  /**
   * Authenticates a user and returns a fresh JWT
   */
  public async login(dto: LoginDTO): Promise<AuthResult> {
    const cleanEmail = dto.email.toLowerCase().trim();

    // 1. Check preconfigured institutional accounts first (instant, fail-safe)
    const preconfigured = PRECONFIGURED_ACCOUNTS.find(
      (acc) => acc.user.email.toLowerCase() === cleanEmail
    );
    if (preconfigured) {
      if (dto.password === preconfigured.password) {
        const token = this.generateToken(preconfigured.user);
        return {
          token,
          user: preconfigured.user,
          expiresIn: JWT_EXPIRES_IN,
        };
      }
      throw new Error('Invalid email or password provided.');
    }

    // 2. Fall back to database lookup
    let user: User | undefined;
    let credential: AuthCredential | undefined;
    try {
      user = await dbStore.getUserByEmail(cleanEmail);
      credential = await dbStore.getCredentialByEmail(cleanEmail);
    } catch (dbErr) {
      console.warn('[AuthService] DB login lookup failure:', dbErr);
    }

    if (!user || !credential) {
      throw new Error('Invalid email or password provided.');
    }

    if (user.status === 'suspended') {
      throw new Error('Your account has been suspended. Please contact the Registrar at Fourways.');
    }

    const testHash = this.hashPassword(dto.password, credential.salt);
    const match = crypto.timingSafeEqual(
      Buffer.from(testHash, 'hex'),
      Buffer.from(credential.passwordHash, 'hex')
    );

    if (!match) {
      throw new Error('Invalid email or password provided.');
    }

    // Update last login timestamp
    const now = new Date().toISOString();
    try {
      await dbStore.updateUser(user.id, { lastLoginAt: now });
    } catch {
      // non-blocking
    }
    user.lastLoginAt = now;

    const token = this.generateToken(user);

    return {
      token,
      user,
      expiresIn: JWT_EXPIRES_IN,
    };
  }

  /**
   * Retrieves profile by user ID
   */
  public async getProfile(userId: string): Promise<User> {
    const pre = PRECONFIGURED_ACCOUNTS.find((acc) => acc.user.id === userId);
    if (pre) {
      return pre.user;
    }

    try {
      const user = await dbStore.getUserById(userId);
      if (user) return user;
    } catch (err) {
      console.warn('[AuthService] DB profile lookup failure:', err);
    }
    throw new Error('User account not found.');
  }

  /**
   * Creates or retrieves a designated Demo session by role (super_admin, faculty, employer, student)
   */
  public async getOrCreateDemoSessionByRole(role: string = 'student'): Promise<AuthResult> {
    const targetRole = role === 'admin' ? 'super_admin' : role;
    const acc = PRECONFIGURED_ACCOUNTS.find(
      (a) => a.user.role === targetRole
    ) || PRECONFIGURED_ACCOUNTS[0];

    const token = this.generateToken(acc.user);
    return {
      token,
      user: acc.user,
      expiresIn: JWT_EXPIRES_IN,
    };
  }

  /**
   * Creates or retrieves a designated Demo Student session for seamless previewing
   */
  public async getOrCreateDemoStudentSession(): Promise<AuthResult> {
    const defaultStudent = PRECONFIGURED_ACCOUNTS.find((acc) => acc.user.role === 'student');
    if (defaultStudent) {
      const token = this.generateToken(defaultStudent.user);
      return {
        token,
        user: defaultStudent.user,
        expiresIn: JWT_EXPIRES_IN,
      };
    }

    const demoEmail = 'student.demo@flawlessinstitution.co.za';
    let user: User | undefined;
    try {
      user = await dbStore.getUserByEmail(demoEmail);
    } catch {
      // fallback
    }

    if (!user) {
      try {
        const demoResult = await this.register({
          email: demoEmail,
          fullName: 'Thabo Mokoena (Demo Scholar)',
          phone: '+27 82 555 0192',
          password: 'DemoPassword2026!',
          role: 'student',
          popiaConsent: true,
        });
        return demoResult;
      } catch {
        const fallbackUser: User = {
          id: 'demo_scholar_fallback',
          email: demoEmail,
          fullName: 'Thabo Mokoena (Demo Scholar)',
          phone: '+27 82 555 0192',
          role: 'student',
          status: 'active',
          createdAt: new Date().toISOString(),
          popiaConsent: { agreed: true, agreedAt: new Date().toISOString(), version: '2026-v1.0' },
        };
        return {
          token: this.generateToken(fallbackUser),
          user: fallbackUser,
          expiresIn: JWT_EXPIRES_IN,
        };
      }
    }

    const token = this.generateToken(user);
    return {
      token,
      user,
      expiresIn: JWT_EXPIRES_IN,
    };
  }
}

export const authService = new AuthService();
