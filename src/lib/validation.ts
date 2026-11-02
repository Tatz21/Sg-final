import { z } from 'zod';

export const enquirySchema = z
  .object({
    name: z.string().min(2, 'Full name is required (at least 2 characters)'),
    email: z.string().email('Please enter a valid email address'),
    phone: z
      .string()
      .min(7, 'Please enter a valid phone number')
      .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Invalid phone format (include country code)'),
    countryOfResidence: z.string().optional(),
    preferredContactMethod: z.enum(['WHATSAPP', 'EMAIL', 'PHONE'], {
      required_error: 'Please select a preferred contact method',
    }),
    message: z.string().min(5, 'Please provide an enquiry message (at least 5 characters)'),
    propertySlug: z.string().optional(),
    investmentSlug: z.string().optional(),
    consent: z.literal(true, {
      errorMap: () => ({ message: 'You must consent to be contacted regarding this enquiry' }),
    }),
    consentVersion: z.string().default('2026-01'),
    botCheck: z.string().optional(), // Honeypot field
  })
  .refine(
    (data) => {
      // Must not reference both simultaneously
      if (data.propertySlug && data.investmentSlug) {
        return false;
      }
      return true;
    },
    {
      message: 'Enquiry cannot reference both a Property and an Investment Offering simultaneously',
      path: ['propertySlug'],
    }
  );

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const propertyInputSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(2),
  projectName: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20),
  country: z.string().min(2),
  countrySlug: z.string().min(2),
  city: z.string().optional(),
  developer: z.string().optional(),
  address: z.string().optional(),
  propertyType: z.string().default('Apartment'),
  listingType: z.string().default('Sale'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  startingPrice: z.number().nullable().optional(),
  currencyCode: z.string().default('USD'),
  bedroomsMin: z.number().nullable().optional(),
  bedroomsMax: z.number().nullable().optional(),
  bathrooms: z.number().nullable().optional(),
  areaMin: z.number().nullable().optional(),
  areaMax: z.number().nullable().optional(),
  areaUnit: z.string().default('sqm'),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const investmentInputSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(2),
  brand: z.string().optional(),
  projectName: z.string().min(2),
  country: z.string().min(2),
  countrySlug: z.string().min(2),
  city: z.string().optional(),
  locationText: z.string().min(3),
  description: z.string().min(20),
  minimumAmount: z.number().positive(),
  currencyCode: z.string().default('INR'),
  assetType: z.string().default('Waterfront Unit'),
  unitType: z.string().default('1 BHK'),
  bedrooms: z.number().default(1),
  areaValue: z.number().positive(),
  areaUnit: z.string().default('sq ft'),
  statedReturnValue: z.string().optional(),
  statedReturnPeriod: z.string().optional(),
  statedReturnStartText: z.string().optional(),
  capitalGainsTaxStatement: z.string().optional(),
  projectedAppreciationText: z.string().optional(),
  handoverText: z.string().optional(),
  riskDisclosure: z.string().min(20),
  legalStructure: z.string().optional(),
  regulatoryStatus: z.string().optional(),
  isVerified: z.boolean().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  featured: z.boolean().default(false),
});

