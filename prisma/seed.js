const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting SG Properties database seeding...');

  // Create Countries
  const ph = await prisma.country.upsert({
    where: { slug: 'philippines' },
    update: {},
    create: {
      name: 'Philippines',
      iso2: 'PH',
      slug: 'philippines',
      currencyCode: 'PHP',
      phoneCode: '+63',
      heroImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=80',
      summary: 'A fast-growing Southeast Asian investment hub known for vibrant metropolitan towers, premier beachfront residences, and attractive rental yields.',
      isPublished: true,
      sortOrder: 1,
    },
  });

  const uae = await prisma.country.upsert({
    where: { slug: 'united-arab-emirates' },
    update: {},
    create: {
      name: 'United Arab Emirates',
      iso2: 'AE',
      slug: 'united-arab-emirates',
      currencyCode: 'AED',
      phoneCode: '+971',
      heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
      summary: 'Global capital for prime luxury real estate, 0% capital gains tax regimes, and premier waterfront developments across Dubai and Ras Al Khaimah.',
      isPublished: true,
      sortOrder: 2,
    },
  });

  const ind = await prisma.country.upsert({
    where: { slug: 'india' },
    update: {},
    create: {
      name: 'India',
      iso2: 'IN',
      slug: 'india',
      currencyCode: 'INR',
      phoneCode: '+91',
      heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
      summary: 'High-growth urban residential estates and coastal holiday homes across prime business districts and leisure retreats.',
      isPublished: true,
      sortOrder: 3,
    },
  });

  // Create Developer
  const rlc = await prisma.developer.upsert({
    where: { slug: 'rlc-residences' },
    update: {},
    create: {
      name: 'RLC Residences',
      slug: 'rlc-residences',
      description: 'The residential division of Robinsons Land Corporation, one of the Philippines premier real-estate conglomerates.',
      website: 'https://rlcresidences.com',
      countryId: ph.id,
    },
  });

  // Create Investment Offering: Azure by Lapis
  await prisma.investmentOffering.upsert({
    where: { slug: 'azure-by-lapis' },
    update: {},
    create: {
      title: 'Azure by Lapis',
      slug: 'azure-by-lapis',
      brand: 'Lapis Investments',
      projectName: 'Azure Waterfront',
      countryId: uae.id,
      locationText: 'RAK Central, Ras Al Khaimah, UAE',
      description: 'Azure by Lapis represents a premier waterfront investment opportunity positioned within the emerging master-plan of RAK Central. Designed with panoramic coastline views, resort-style private amenities, and strategic positioning near upcoming luxury tourism destinations.',
      minimumAmount: 225000,
      currencyCode: 'INR',
      assetType: 'Waterfront Commercial/Residential Unit',
      unitType: '1 BHK Waterfront',
      bedrooms: 1,
      areaValue: 800,
      areaUnit: 'sq ft',
      statedReturnValue: '8% Stated Annual Return',
      statedReturnPeriod: 'Annualized',
      statedReturnStartText: 'From Day One (Client-supplied claim)',
      capitalGainsTaxStatement: '0% Capital-Gains Tax (Subject to UAE federal tax guidelines)',
      projectedAppreciationText: '2.5–3x Projected Capital Appreciation (Client marketing projection)',
      handoverText: 'Q4 2028',
      riskDisclosure: 'IMPORTANT REGULATORY DISCLOSURE: All return rates, tax advantages, timelines, and projected capital gains are client-supplied statements. Returns are not guaranteed. Past performance or developer projections do not represent future returns. This offering does not constitute an officially regulated REIT or registered collective investment scheme until verified and confirmed by jurisdictional financial regulators.',
      legalStructure: 'Direct Fractional Real Estate Co-Ownership (Verification in progress)',
      regulatoryStatus: 'Under Legal Review',
      isVerified: false,
      status: 'PUBLISHED',
      featured: true,
      publishedAt: new Date(),
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding notice:', e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

