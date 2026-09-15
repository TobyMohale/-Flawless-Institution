/**
 * Flawless Institution™ - Cryptographic Utilities
 * Provides PBKDF2 salt hashing, constant-time comparison, and token utilities.
 */
import crypto from 'crypto';

export interface HashResult {
  hash: string;
  salt: string;
}

/**
 * Hash a password using PBKDF2 with SHA-512 and 100,000 iterations.
 */
export function hashPassword(password: string, providedSalt?: string): HashResult {
  const salt = providedSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

/**
 * Verify a plaintext password against a stored PBKDF2 hash and salt in constant time.
 */
export function verifyPassword(password: string, storedHash: string, salt: string): boolean {
  const calculatedHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  const storedBuf = Buffer.from(storedHash, 'hex');
  const calculatedBuf = Buffer.from(calculatedHash, 'hex');

  if (storedBuf.length !== calculatedBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(storedBuf, calculatedBuf);
}
