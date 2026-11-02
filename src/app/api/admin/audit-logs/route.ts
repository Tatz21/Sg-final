import { NextResponse } from 'next/server';
import { getCurrentSession, hasPermission } from '@/lib/auth';
import { repository } from '@/lib/db';

export async function GET() {
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, 'ADMIN')) {
    return NextResponse.json({ error: { code: 'FORBIDDEN' } }, { status: 403 });
  }

  const logs = repository.getAuditLogs();
  return NextResponse.json({ data: logs });
}

