import { NextResponse } from 'next/server';
import { getCurrentSession, hasPermission } from '@/lib/auth';
import { repository } from '@/lib/db';
import { propertyInputSchema } from '@/lib/validation';
import type { PropertyItem } from '@/types';

export async function GET() {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED' } }, { status: 401 });
  }

  const properties = repository.getProperties();
  return NextResponse.json({ data: properties });
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, 'EDITOR')) {
    return NextResponse.json({ error: { code: 'FORBIDDEN', message: 'Insufficient permissions' } }, { status: 403 });
  }

  try {
    const body = await request.json();
    const result = propertyInputSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', fieldErrors: result.error.flatten().fieldErrors } },
        { status: 400 }
      );
    }

    const data = result.data;
    const newProperty: PropertyItem = {
      ...data,
      id: `prop-${Date.now()}`,
      images: body.images || [],
      units: body.units || [],
      amenities: body.amenities || [],
      publishedAt: data.status === 'PUBLISHED' ? new Date().toISOString() : null,
    };

    const saved = repository.addProperty(newProperty);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: { code: 'SERVER_ERROR', message: 'Failed to create property' } }, { status: 500 });
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
      return NextResponse.json({ error: { message: 'Property ID required' } }, { status: 400 });
    }

    const updated = repository.updateProperty(id, updates);
    if (!updated) {
      return NextResponse.json({ error: { message: 'Property not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: { message: 'Failed to update property' } }, { status: 500 });
  }
}

