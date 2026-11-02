import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CinematicDoorway from '@/components/doorway/CinematicDoorway';
import Link from 'next/link';
import Image from 'next/image';
import { repository } from '@/lib/db';
import { formatPrice, formatArea } from '@/lib/utils';
import {
  TrendingUp,
  Building2,
  ShieldAlert,
  ArrowRight,
  Globe2,
  CheckCircle2,
  FileText,
  BadgeAlert,
  Sparkles,
  Layers,
  Award,
  Lock,
  ArrowUpRight,
} from 'lucide-react';

export default function HomePage() {
  const featuredInvestments = repository.getInvestments({ featured: true, status: 'PUBLISHED' });
  const featuredProperties = repository.getProperties({ featured: true, status: 'PUBLISHED' });
  const countries = repository.getCountries().filter((c) => c.isPublished);

  return (
    <div className="min-h-screen flex flex-col bg-stone-25">
      <Navbar />

      <main className="flex-grow">
        {/* Signature Architectural Portal Entrance */}
        <section aria-label="Signature Architectural Doorway Portal">
          <CinematicDoorway />
        </section>

        {/* Brand Fiduciary Statement Strip */}
        <section className="bg-navy-950 text-white py-12 border-b border-white/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
              <div className="space-y-1">
                <div className="text-gold-400 font-serif text-2xl font-bold">100%</div>
                <div className="text-xs uppercase tracking-wider font-bold text-stone-200">
                  Verified Developer Facts
                </div>
                <div className="text-[11px] text-stone-400 font-light">
                  Zero fabricated classifieds or duplicate listings.
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-gold-400 font-serif text-2xl font-bold">8% Yield</div>
                <div className="text-xs uppercase tracking-wider font-bold text-stone-200">
                  Institutional Yield Offerings
                </div>
                <div className="text-[11px] text-stone-400 font-light">
                  Curated commercial co-ownership & REIT products.
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-gold-400 font-serif text-2xl font-bold">3 Sovereign Hubs</div>
                <div className="text-xs uppercase tracking-wider font-bold text-stone-200">
                  Global Market Access
                </div>
                <div className="text-[11px] text-stone-400 font-light">
                  Active advisory desks in UAE, Philippines, and India.
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-gold-400 font-serif text-2xl font-bold">Fiduciary Trust</div>
                <div className="text-xs uppercase tracking-wider font-bold text-stone-200">
                  Uncompromised Compliance
                </div>
                <div className="text-[11px] text-stone-400 font-light">
                  Clear governance disclaimers on all marketing claims.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Featured REIT & Investment Assets */}
        <section className="py-24 bg-stone-50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-gold-600 text-xs font-bold uppercase tracking-widest-xl">
                  <TrendingUp className="w-4 h-4" />
                  <span>The Yield Vault</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 font-serif tracking-tight">
                  Curated Investment Offerings
                </h2>
                <p className="text-stone-600 text-sm max-w-xl font-light">
                  High-yield commercial and fractional real estate assets structured for tax efficiency and long-term capital appreciation.
                </p>
              </div>

              <Link
                href="/reits"
                className="mt-6 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-navy-950 text-gold-400 hover:bg-navy-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>View Full Investment Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {featuredInvestments.map((inv) => (
                <article
                  key={inv.id}
                  className="lg:col-span-12 group bg-white rounded-sm border border-stone-200/90 overflow-hidden shadow-luxury hover:border-gold-500/50 transition-all duration-500 grid grid-cols-1 lg:grid-cols-12"
                >
                  {/* Photo Column */}
                  <div className="relative h-80 lg:h-auto lg:col-span-6 bg-navy-950 overflow-hidden">
                    {inv.images[0] && (
                      <Image
                        src={inv.images[0].url}
                        alt={inv.images[0].altText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded bg-navy-950/90 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30 backdrop-blur-md">
                        {inv.assetType}
                      </span>
                      {!inv.isVerified && (
                        <span className="px-3 py-1 rounded bg-amber-950/90 text-amber-300 text-xs font-medium border border-amber-500/30 flex items-center space-x-1 backdrop-blur-md">
                          <BadgeAlert className="w-3.5 h-3.5" />
                          <span>Claims Under Legal Review</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Fact Sheet Column */}
                  <div className="p-8 sm:p-10 lg:col-span-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <div className="text-xs uppercase tracking-widest font-bold text-gold-600">
                        {inv.locationText} {inv.brand && `• ${inv.brand}`}
                      </div>
                      <h3 className="text-3xl font-bold font-serif text-navy-950 group-hover:text-gold-700 transition-colors">
                        {inv.title}
                      </h3>
                      <p className="text-sm text-stone-600 leading-relaxed font-light">
                        {inv.description}
                      </p>
                    </div>

                    {/* Stated Metric Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-sm border border-stone-200 text-xs">
                      <div>
                        <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Entry Amount</div>
                        <div className="text-base font-extrabold text-navy-950 font-serif mt-0.5">
                          {formatPrice(inv.minimumAmount, inv.currencyCode)}
                        </div>
                        <div className="text-[10px] text-amber-700 font-semibold">*Client claim</div>
                      </div>

                      <div>
                        <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Stated Yield</div>
                        <div className="text-base font-extrabold text-emerald-700 font-serif mt-0.5">
                          {inv.statedReturnValue || '8% Annual'}
                        </div>
                        <div className="text-[10px] text-stone-500">From day one</div>
                      </div>

                      <div>
                        <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Tax Exposure</div>
                        <div className="text-base font-extrabold text-navy-950 font-serif mt-0.5">
                          0%
                        </div>
                        <div className="text-[10px] text-stone-500">Capital gains</div>
                      </div>

                      <div>
                        <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Handover</div>
                        <div className="text-base font-extrabold text-navy-950 font-serif mt-0.5">
                          {inv.handoverText || 'Q4 2028'}
                        </div>
                        <div className="text-[10px] text-stone-500">Scheduled</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-[11px] text-stone-500 max-w-sm flex items-start space-x-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span>Returns are not guaranteed. Independent jurisdictional audit in progress.</span>
                      </div>

                      <Link
                        href={`/reits/${inv.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-600 hover:text-gold-700 shrink-0"
                      >
                        <span>Inspect Offering Prospectus</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Sovereign Country Discovery Hubs */}
        <section className="py-24 bg-navy-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-widest-xl">
                  <Globe2 className="w-4 h-4" />
                  <span>Sovereign Portfolios</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight">
                  Country-First Real Estate Discovery
                </h2>
                <p className="text-stone-300 text-sm max-w-xl font-light">
                  Direct developer inventory across the Philippines, United Arab Emirates, and India.
                </p>
              </div>

              <Link
                href="/real-estate"
                className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>Browse All Territories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {countries.map((country) => (
                <Link
                  key={country.id}
                  href={`/real-estate/${country.slug}`}
                  className="group relative rounded-sm overflow-hidden h-[460px] shadow-luxury hover:shadow-luxury-gold transition-all duration-700 flex flex-col justify-end p-7 border border-white/10"
                >
                  <Image
                    src={country.heroImage}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-400 bg-navy-900/90 border border-gold-500/30 px-2.5 py-0.5 rounded backdrop-blur-md">
                        ISO: {country.iso2}
                      </span>
                      <span className="text-xs text-stone-300 font-semibold">
                        {country.propertyCount} Verified Developments
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold font-serif text-white group-hover:text-gold-300 transition-colors">
                      {country.name}
                    </h3>

                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed font-light">
                      {country.summary}
                    </p>

                    <div className="pt-2 flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                      <span>Explore Sovereign Inventory</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Signature Residential Inventory */}
        <section className="py-24 bg-stone-25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-widest-xl font-bold text-gold-600">
                Architectural Masterpieces
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 font-serif tracking-tight">
                Featured Global Residences
              </h2>
              <p className="text-stone-600 text-sm font-light">
                Spotlight on LePont Residences, The Mantawi Residences Cebu, and upcoming beachfront opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 3).map((property) => (
                <article
                  key={property.id}
                  className="group bg-white rounded-sm border border-stone-200 overflow-hidden shadow-sm hover:shadow-luxury hover:border-gold-500/50 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 w-full bg-navy-950 overflow-hidden">
                      {property.images[0] && (
                        <Image
                          src={property.images[0].url}
                          alt={property.images[0].altText}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded bg-navy-950/90 text-gold-300 text-[10px] font-bold uppercase tracking-wider border border-white/10 backdrop-blur-md">
                          {property.country}
                        </span>
                        {property.isPendingVerification && (
                          <span className="px-2.5 py-1 rounded bg-amber-950/90 text-amber-300 text-[10px] font-bold border border-amber-500/30 flex items-center space-x-1">
                            <BadgeAlert className="w-3 h-3" />
                            <span>Pending Verification</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-7 space-y-3">
                      <div className="text-[11px] text-stone-500 font-medium">
                        {property.city} {property.developer && `• ${property.developer}`}
                      </div>
                      <h3 className="text-2xl font-bold text-navy-950 font-serif group-hover:text-gold-700 transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-light">
                        {property.summary}
                      </p>

                      {/* Unit specs pill */}
                      <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-600 font-medium">
                        {property.areaMin && (
                          <span className="px-2 py-0.5 bg-stone-50 rounded border border-stone-200">
                            {property.areaMin}{property.areaMax && `–${property.areaMax}`} {property.areaUnit}
                          </span>
                        )}
                        {property.bedroomsMin && (
                          <span className="px-2 py-0.5 bg-stone-50 rounded border border-stone-200">
                            {property.bedroomsMin}{property.bedroomsMax && `–${property.bedroomsMax}`} Bedrooms
                          </span>
                        )}
                        {property.units.length > 0 && (
                          <span className="px-2 py-0.5 bg-stone-50 rounded border border-stone-200 text-stone-700 font-semibold">
                            {property.units.length} Unit Mixes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-7 pt-0 border-t border-stone-100 mt-4 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-stone-400 text-[10px] uppercase font-bold tracking-wider">Starting Price</div>
                      <div className="font-serif font-bold text-navy-950 text-base mt-0.5">
                        {formatPrice(property.startingPrice, property.currencyCode)}
                      </div>
                    </div>

                    <Link
                      href={`/real-estate/${property.countrySlug}/${property.slug}`}
                      className="inline-flex items-center space-x-1 font-bold text-xs uppercase tracking-wider text-gold-600 hover:text-gold-700 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Inspect Residence</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Fiduciary Distinction Matrix */}
        <section className="py-24 bg-stone-100 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs uppercase tracking-widest-xl font-bold text-gold-600">
                Fiduciary Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-serif tracking-tight">
                The SG Advisory Standard
              </h2>
              <p className="text-stone-600 text-sm font-light">
                Why discerning buyers and family offices choose SG Properties over generic listing portals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-sm bg-navy-950 text-gold-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 font-serif">Fact Verification Guarantee</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  We verify floor plans, exact square metre dimensions, handover milestones, and developer licences directly. Unverified marketing claims are explicitly identified.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-sm bg-navy-950 text-gold-400 flex items-center justify-center font-bold">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 font-serif">Fiduciary Client Privacy</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  We never distribute, auction, or sell client phone numbers or email addresses to third-party telemarketers or external broker syndicates.
                </p>
              </div>

              <div className="bg-white p-8 rounded-sm border border-stone-200/80 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-sm bg-navy-950 text-gold-400 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 font-serif">Dual-Journey Discipline</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  We strictly separate institutional yield instruments (REITs, commercial co-ownership) from physical luxury home acquisitions, preventing conflated expectations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
