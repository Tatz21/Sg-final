import { NextResponse } from 'next/server';
import { repository } from '@/lib/db';

export async function GET() {
  const countries = repository.getCountries();
  return NextResponse.json({
    data: countries,
    total: countries.length,
  });
}

