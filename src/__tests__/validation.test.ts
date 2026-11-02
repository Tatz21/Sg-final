import { describe, it, expect } from 'vitest';
import { enquirySchema, loginSchema } from '@/lib/validation';

describe('Enquiry Validation Schema', () => {
  it('accepts valid property enquiry', () => {
    const input = {
      name: 'Vikram Malhotra',
      email: 'vikram@example.com',
      phone: '+919820011223',
      countryOfResidence: 'India',
      preferredContactMethod: 'WHATSAPP' as const,
      message: 'Please send brochures for LePont Residences.',
      propertySlug: 'le-pont-rlc-residences',
      consent: true as const,
      consentVersion: '2026-01',
    };

    const result = enquirySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('accepts valid investment enquiry', () => {
    const input = {
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      phone: '+971501234567',
      preferredContactMethod: 'EMAIL' as const,
      message: 'Requesting prospectus for Azure by Lapis.',
      investmentSlug: 'azure-by-lapis',
      consent: true as const,
      consentVersion: '2026-01',
    };

    const result = enquirySchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it('rejects enquiry referencing both property and investment simultaneously', () => {
    const input = {
      name: 'Test Visitor',
      email: 'test@example.com',
      phone: '+919820011223',
      preferredContactMethod: 'PHONE' as const,
      message: 'Interested in multiple options.',
      propertySlug: 'le-pont-rlc-residences',
      investmentSlug: 'azure-by-lapis',
      consent: true as const,
      consentVersion: '2026-01',
    };

    const result = enquirySchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('simultaneously');
    }
  });

  it('rejects enquiry without explicit consent', () => {
    const input = {
      name: 'Test Visitor',
      email: 'test@example.com',
      phone: '+919820011223',
      preferredContactMethod: 'EMAIL' as const,
      message: 'Valid message content.',
      propertySlug: 'le-pont-rlc-residences',
      consent: false,
    };

    const result = enquirySchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('rejects invalid email and malformed phone', () => {
    const input = {
      name: 'A',
      email: 'not-an-email',
      phone: '123',
      preferredContactMethod: 'EMAIL' as const,
      message: 'Hi',
      consent: true as const,
    };

    const result = enquirySchema.safeParse(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.name).toBeDefined();
      expect(fieldErrors.email).toBeDefined();
      expect(fieldErrors.phone).toBeDefined();
      expect(fieldErrors.message).toBeDefined();
    }
  });
});

describe('Login Validation Schema', () => {
  it('validates correct email and min length password', () => {
    const result = loginSchema.safeParse({
      email: 'admin@sgproperties.com',
      password: 'SGAdmin2026!',
    });
    expect(result.success).toBe(true);
  });

  it('rejects short passwords', () => {
    const result = loginSchema.safeParse({
      email: 'admin@sgproperties.com',
      password: '123',
    });
    expect(result.success).toBe(false);
  });
});

