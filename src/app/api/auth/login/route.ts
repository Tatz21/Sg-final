import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { signSessionToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rate-limit';

// Standard demo credentials for bootstrapping SG Properties CMS
const ADMIN_CREDENTIALS = [
  {
    id: 'user-admin-1',
    email: 'admin@sgproperties.com',
    password: 'SGAdmin2026!',
    name: 'Super Admin',
    role: 'SUPER_ADMIN' as const,
  },
  {
    id: 'user-sales-1',
    email: 'sales@sgproperties.com',
    password: 'SGSales2026!',
    name: 'Sarah Jenkins',
    role: 'SALES' as const,
  },
];

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rate = checkRateLimit(`login_${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many login attempts. Try again in 1 minute.' } },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'INVALID_INPUT', message: 'Invalid email or password format.' } },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const user = ADMIN_CREDENTIALS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Invalid credentials. Please verify your email and password.' } },
        { status: 401 }
      );
    }

    const token = signSessionToken({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } },
      { status: 500 }
    );
  }
}

