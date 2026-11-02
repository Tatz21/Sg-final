import { NextResponse } from 'next/server';
import { repository } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const countries = repository.getCountries();
  return NextResponse.json({
    data: countries,
    total: countries.length,
  });
}
