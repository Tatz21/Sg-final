import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { repository } from '@/lib/db';
import { Globe2, Building2, ArrowRight, MapPin, Compass, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Global Sovereign Real Estate Discovery | SG Properties',
  description:
    'Select a sovereign destination territory to discover premier residential towers, beachfront estates, and luxury penthouses across the Philippines, UAE, India, and emerging global markets.',
};

export default function RealEstateHubPage() {
  const countries = repository.getCountries();
  const publishedCountries = countries.filter((c) => c.isPublished);
  const upcomingCountries = countries.filter((c) => !c.isPublished);

  return (
    <div className="min-h-screen flex flex-col bg-stone-25">
      <Navbar />

      <main className="flex-grow">
        {/* Editorial Real Estate Hero */}
        <section className="bg-navy-950 text-white py-24 border-b border-gold-500/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy-900 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest-xl font-bold backdrop-blur-md shadow-luxury">
                <Globe2 className="w-3.5 h-3.5 text-gold-400" />
                <span>Sovereign Portfolio Hub</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white leading-[1.1]">
                Country-First Discovery
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light">
                Explore curated residential portfolios across sovereign territories. Direct developer allocations in the Philippines, UAE, India, and verified international destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Active Territories Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-stone-200">
            <div>
              <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
                Active Sovereign Hubs
              </span>
              <h2 className="text-3xl font-bold font-serif text-navy-950 mt-1">
                Select Your Destination Territory
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 text-xs text-stone-500 flex items-center space-x-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full developer registrations verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedCountries.map((country) => (
              <Link
                key={country.id}
                href={`/real-estate/${country.slug}`}
                className="group relative rounded-sm overflow-hidden h-[460px] shadow-sm hover:shadow-luxury-gold transition-all duration-700 flex flex-col justify-end p-7 border border-stone-200/90"
              >
                <Image
                  src={country.heroImage}
                  alt={country.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />

                <div className="relative z-10 text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-400 bg-navy-950/90 border border-gold-500/30 px-2.5 py-0.5 rounded backdrop-blur-md">
                      {country.iso2}
                    </span>
                    <span className="text-xs text-stone-300 font-semibold">
                      {country.propertyCount} Published Developments
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold font-serif group-hover:text-gold-200 transition-colors">
                    {country.name}
                  </h3>

                  <p className="text-xs text-stone-300 line-clamp-3 leading-relaxed font-light">
                    {country.summary}
                  </p>

                  <div className="pt-2 flex items-center space-x-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                    <span>Inspect Country Listings</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Upcoming Markets Expansion */}
          {upcomingCountries.length > 0 && (
            <div className="mt-20 pt-12 border-t border-stone-200">
              <div className="mb-8">
                <span className="text-[10px] tracking-widest-xl uppercase font-bold text-stone-400 block">
                  Expansion Roadmap
                </span>
                <h3 className="text-2xl font-bold font-serif text-navy-950 mt-1">
                  Upcoming Sovereign Portfolios Under Legal Audit
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {upcomingCountries.map((c) => (
                  <div
                    key={c.id}
                    className="p-7 bg-white rounded-sm border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold font-serif text-navy-950">{c.name}</h4>
                        <span className="text-[10px] px-2.5 py-1 rounded bg-stone-100 text-stone-700 font-bold uppercase tracking-wider border border-stone-200">
                          Legal Review
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed font-light">{c.summary}</p>
                    </div>
                    <div className="text-[11px] text-stone-400 italic">
                      Developer verification in progress. Enquire directly for priority pre-launch briefs.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
