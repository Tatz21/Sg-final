# Database Design — SG Properties

Use PostgreSQL with Prisma. Store money as integer minor units or `Decimal`, never floating-point. Store original currency and unit explicitly.

## Core entities

### User
- id, name, email (unique), password/provider identity reference
- role: SUPER_ADMIN | ADMIN | EDITOR | SALES
- isActive, lastLoginAt, createdAt, updatedAt

### Country
- id, name, ISO2 code (unique), slug (unique), currencyCode, phoneCode
- heroImage, summary, isPublished, sortOrder
- createdAt, updatedAt

### City
- id, countryId, name, slug, region/state
- latitude, longitude (optional)
- relation: Country 1—many City

### Developer
- id, name, slug, description, logo, website, countryId (optional)
- createdAt, updatedAt

### Property
- id, title, slug (unique), projectName, summary, description
- countryId, cityId, developerId (optional)
- address, latitude, longitude
- propertyType, listingType, status
- startingPrice (Decimal nullable), currencyCode
- bedroomsMin, bedroomsMax, bathrooms, areaMin, areaMax, areaUnit
- featured, publishedAt, createdAt, updatedAt
- SEO title, description, canonicalUrl, noIndex

### PropertyUnit
- id, propertyId, label, bedrooms, bathrooms
- areaValue, areaUnit, price (Decimal nullable), currencyCode
- availabilityStatus, description, sortOrder

### InvestmentOffering
- id, title, slug (unique), brand/developer, projectName
- countryId, cityId, locationText, description
- minimumAmount (Decimal), currencyCode
- assetType, unitType, bedrooms, areaValue, areaUnit
- statedReturnValue, statedReturnPeriod, statedReturnStartText
- capitalGainsTaxStatement (text; approved wording only)
- projectedAppreciationText (text; approved wording only)
- handoverText, riskDisclosure, legalStructure, regulatoryStatus
- status, featured, publishedAt, createdAt, updatedAt
- SEO fields

### MediaAsset
- id, storageKey, url/CDN path, mimeType, sizeBytes, width, height
- altText, caption, uploadedById, createdAt
- Never store private storage credentials in this table.

### PropertyMedia / InvestmentMedia
Join tables with mediaAssetId, parentId, sortOrder, isCover.

### Lead
- id, name, email, phone, countryOfResidence (optional)
- message, preferredContactMethod, consentAt, consentVersion
- sourcePath, campaignSource, campaignMedium, campaignName
- propertyId (nullable), investmentOfferingId (nullable)
- status, assignedToId (nullable), createdAt, updatedAt

### LeadNote
- id, leadId, authorId, body, createdAt
- Internal notes must never appear on public pages.

### SiteSetting
- key (unique), value (JSON), updatedById, updatedAt

### AuditLog
- id, actorId, action, entityType, entityId
- beforeData/afterData (sanitised JSON), ipHash (optional), createdAt

## Relationships
- Country has many Cities, Properties, and InvestmentOfferings.
- City belongs to Country and has many Properties and InvestmentOfferings.
- Property has many PropertyUnits and MediaAssets through join table.
- InvestmentOffering has many MediaAssets through join table.
- Lead may reference one Property or one InvestmentOffering; enforce that it does not reference both simultaneously unless a future multi-interest lead model is introduced.
- Lead may be assigned to a User.
- AuditLog records admin mutations.

## Indexes and constraints
- Unique: user email, country ISO2, country slug, city slug within country, property slug, investment slug.
- Index: property countryId/cityId/status, investment status, lead status/createdAt/assignedToId, property price, bedrooms, featured.
- Use database constraints for valid status values and required relationships.
- Slugs must be unique and stable; changing a published slug should create a redirect record.
- Add `deletedAt` or archive status for recoverable content; avoid hard deletion of records referenced by leads.

## Seed data
Seed Azure by Lapis and the named Philippines projects as **draft/unverified** records. Keep missing facts null rather than inventing them. The exact Boracay project name and details remain pending.
