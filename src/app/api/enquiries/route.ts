import { NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';
import { repository } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`enquiry_${ip}`, 10, 60000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many enquiry requests. Please wait a moment before trying again.',
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Spam honeypot
    if (body.botCheck && body.botCheck.trim() !== '') {
      // Quietly return success to fool bots without saving spam
      return NextResponse.json({
        success: true,
        message: 'Your enquiry has been received.',
      });
    }

    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Please review and correct the form fields.',
            fieldErrors: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    let propertyTitle: string | undefined;
    let investmentTitle: string | undefined;

    if (data.propertySlug) {
      const prop = repository.getPropertyBySlug(data.propertySlug);
      propertyTitle = prop ? prop.title : data.propertySlug;
    }

    if (data.investmentSlug) {
      const inv = repository.getInvestmentBySlug(data.investmentSlug);
      investmentTitle = inv ? inv.title : data.investmentSlug;
    }

    const lead = repository.createLead({
      name: data.name,
      email: data.email,
      phone: data.phone,
      countryOfResidence: data.countryOfResidence,
      preferredContactMethod: data.preferredContactMethod,
      message: data.message,
      consentAt: new Date().toISOString(),
      consentVersion: data.consentVersion || '2026-01',
      sourcePath: body.sourcePath || (data.propertySlug ? `/real-estate/${data.propertySlug}` : '/reits'),
      propertyTitle,
      propertySlug: data.propertySlug,
      investmentTitle,
      investmentSlug: data.investmentSlug,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. An SG Properties senior advisor will contact you within 24 business hours.',
      leadId: lead.id,
    });
  } catch (error: unknown) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      {
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occurred while processing your enquiry. Please contact us directly.',
        },
      },
      { status: 500 }
    );
  }
}

