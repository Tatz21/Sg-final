import { NextResponse } from 'next/server';
import { getCurrentSession, hasPermission } from '@/lib/auth';
import { repository } from '@/lib/db';
import type { LeadStatus } from '@/types';

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session) {
    return NextResponse.json({ error: { code: 'UNAUTHORIZED' } }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as LeadStatus | null;
  const search = searchParams.get('search') || undefined;

  const leads = repository.getLeads({
    status: status || undefined,
    search,
  });

  return NextResponse.json({ data: leads });
}

export async function PATCH(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, 'SALES')) {
    return NextResponse.json({ error: { code: 'FORBIDDEN' } }, { status: 403 });
  }

  try {
    const { id, status, assignedToName } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: { message: 'Lead ID and status required' } }, { status: 400 });
    }

    const updated = repository.updateLeadStatus(id, status as LeadStatus, assignedToName);
    if (!updated) {
      return NextResponse.json({ error: { message: 'Lead not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: { message: 'Failed to update lead status' } }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Add note to lead
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, 'SALES')) {
    return NextResponse.json({ error: { code: 'FORBIDDEN' } }, { status: 403 });
  }

  try {
    const { leadId, note } = await request.json();
    if (!leadId || !note || !note.trim()) {
      return NextResponse.json({ error: { message: 'leadId and note text are required' } }, { status: 400 });
    }

    const addedNote = repository.addLeadNote(leadId, session.name, note.trim());
    if (!addedNote) {
      return NextResponse.json({ error: { message: 'Lead not found' } }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: addedNote });
  } catch (error) {
    return NextResponse.json({ error: { message: 'Failed to add note' } }, { status: 500 });
  }
}

