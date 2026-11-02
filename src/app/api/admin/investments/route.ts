import { NextResponse } from 'next/server';
import { getCurrentSession, hasPermission } from '@/lib/auth';
import { repository } from '@/lib/db';
import { investmentInputSchema } from '@/lib/validation';
import type { InvestmentOfferingItem } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED' } }, { status: 401 });
  }

  const investments = repository.getInvestments();
  return NextResponse.json({ data: investments });
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, 'EDITOR')) {
    return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = investmentInputSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', fieldErrors: result.error.flatten().fieldErrors } },
        { status: 400 }
      );
    }

    const data = result.data;
    const newInvestment: InvestmentOfferingItem = {
      ...data,
      id: `inv-${Date.now()}`,
      images: body.images || [],
      publishedAt: data.status === 'PUBLISHED' ? new Date().toISOString() : null,
    };

    const saved = repository.addInvestment(newInvestment);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: { code: 'SERVER_ERROR', message: 'Failed to create investment offering' } }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, 'EDITOR')) {
    return NextResponse.json({ error: { code: 'FORBIDDEN' } }, { status: 403 });
  }

  try {
    const { id, ...updates } = await request.json();
    if (!id) {
      return NextResponse.json({ error: { message: 'Investment ID required' } }, { status: 400 });
    }

    const updated = repository.updateInvestment(id, updates);
    if (!updated) {
      return NextResponse.json({ error: { message: 'Investment not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: { message: 'Failed to update investment offering' } }, { status: 500 });
  }
}
