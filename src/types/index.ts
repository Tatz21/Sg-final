export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'SALES';

export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'SITE_VISIT'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'SPAM';

export type ContactMethod = 'WHATSAPP' | 'EMAIL' | 'PHONE';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface UnitConfig {
  id: string;
  label: string;
  bedrooms: number;
  bathrooms: number;
  areaValue: number;
  areaUnit: string;
  price?: number | null;
  currencyCode?: string;
  availabilityStatus: string;
  description?: string;
}

export interface MediaAssetItem {
  id: string;
  url: string;
  altText: string;
  caption?: string;
  isCover?: boolean;
}

export interface PropertyItem {
  id: string;
  title: string;
  slug: string;
  projectName: string;
  summary: string;
  description: string;
  country: string;
  countrySlug: string;
  city?: string;
  developer?: string;
  address?: string;
  propertyType: string;
  listingType: string;
  status: ContentStatus;
  startingPrice?: number | null;
  currencyCode: string;
  bedroomsMin?: number | null;
  bedroomsMax?: number | null;
  bathrooms?: number | null;
  areaMin?: number | null;
  areaMax?: number | null;
  areaUnit: string;
  featured: boolean;
  publishedAt?: string | null;
  images: MediaAssetItem[];
  units: UnitConfig[];
  amenities?: string[];
  isPendingVerification?: boolean;
}

export interface InvestmentOfferingItem {
  id: string;
  title: string;
  slug: string;
  brand?: string;
  projectName: string;
  country: string;
  countrySlug: string;
  city?: string;
  locationText: string;
  description: string;
  minimumAmount: number;
  currencyCode: string;
  assetType: string;
  unitType: string;
  bedrooms: number;
  areaValue: number;
  areaUnit: string;
  statedReturnValue?: string;
  statedReturnPeriod?: string;
  statedReturnStartText?: string;
  capitalGainsTaxStatement?: string;
  projectedAppreciationText?: string;
  handoverText?: string;
  riskDisclosure: string;
  legalStructure?: string;
  regulatoryStatus?: string;
  isVerified: boolean;
  status: ContentStatus;
  featured: boolean;
  publishedAt?: string | null;
  images: MediaAssetItem[];
}

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryOfResidence?: string;
  message: string;
  preferredContactMethod: ContactMethod;
  consentAt: string;
  consentVersion: string;
  sourcePath?: string;
  propertyTitle?: string;
  propertySlug?: string;
  investmentTitle?: string;
  investmentSlug?: string;
  status: LeadStatus;
  assignedToName?: string;
  createdAt: string;
  internalNotes?: Array<{
    id: string;
    authorName: string;
    body: string;
    createdAt: string;
  }>;
}

export interface CountryItem {
  id: string;
  name: string;
  iso2: string;
  slug: string;
  currencyCode: string;
  phoneCode: string;
  heroImage: string;
  summary: string;
  isPublished: boolean;
  propertyCount: number;
}

