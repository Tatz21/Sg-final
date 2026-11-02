import { NextResponse } from 'next/server';
import { repository } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const featured = searchParams.get('featured');

  const properties = repository.getProperties({
    countrySlug: country || undefined,
    status: 'PUBLISHED',
    featured: featured ? featured === 'true' : undefined,
  });

  return NextResponse.json({
    data: properties,
    total: properties.length,
  });
}
