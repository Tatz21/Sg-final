import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import type { Role, UserSession } from '@/types';

const AUTH_COOKIE = 'sg_admin_session';
const JWT_SECRET = process.env.AUTH_SECRET || 'sg-properties-internal-secret-token-key-2026';

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signSessionToken(session: UserSession): string {
  return jwt.sign(session, JWT_SECRET, { expiresIn: '7d' });
}

export function verifySessionToken(token: string): UserSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserSession;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<UserSession | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const hierarchy: Record<Role, number> = {
    SALES: 1,
    EDITOR: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
  };
  return hierarchy[userRole] >= hierarchy[requiredRole];
}

export const AUTH_COOKIE_NAME = AUTH_COOKIE;

