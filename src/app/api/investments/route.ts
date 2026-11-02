import { NextResponse } from 'next/server';
import { repository } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured');

  const investments = repository.getInvestments({
    status: 'PUBLISHED',
    featured: featured ? featured === 'true' : undefined,
  });

  return NextResponse.json({
    data: investments,
    total: investments.length,
  });
}
