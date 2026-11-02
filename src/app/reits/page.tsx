import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { repository } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import {
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Percent,
  Calendar,
  Layers,
  BadgeAlert,
  FileCheck2,
} from 'lucide-react';

export const metadata = {
  title: 'REITs & Institutional Yield Portfolios | SG Properties',
  description:
    'Discover curated fractional real estate, commercial assets, and REIT offerings with transparent yields and capital appreciation targets across the UAE and global markets.',
};

export default function ReitsPage() {
  const investments = repository.getInvestments({ status: 'PUBLISHED' });

  return (
    <div className="min-h-screen flex flex-col bg-stone-25">
      <Navbar />

      <main className="flex-grow">
        {/* Editorial Investment Hero */}
        <section className="bg-navy-950 text-white py-24 border-b border-gold-500/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy-900 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest-xl font-bold backdrop-blur-md shadow-luxury">
                <TrendingUp className="w-3.5 h-3.5 text-gold-400" />
                <span>The Yield Vault</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white leading-[1.1]">
                REITs & Strategic Yield Assets
              </h1>
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light">
                Institutional commercial co-ownership and high-yield asset portfolios across premier global free zones, engineered for income generation, capital appreciation, and tax efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* Fiduciary Alert Strip */}
        <section className="bg-amber-500/10 border-b border-amber-500/20 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-950">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900">
                Fiduciary Compliance Notice:
              </span>
              <p className="leading-relaxed">
                In compliance with SG Properties governance standards, stated yields (8%), tax benefits (0% capital gains), and appreciation projections (2.5–3x) represent client-supplied claims currently undergoing independent legal audit. Returns are not guaranteed. Review statutory prospectus documents before committing capital.
              </p>
            </div>
          </div>
        </section>

        {/* Offerings Grid */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-stone-200">
            <div>
              <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
                Active Offerings
              </span>
              <h2 className="text-3xl font-bold font-serif text-navy-950 mt-1">
                Institutional Real Estate Portfolios
              </h2>
            </div>
            <div className="mt-4 sm:mt-0 text-xs text-stone-500 flex items-center space-x-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Full legal documentation room available on request</span>
            </div>
          </div>

          <div className="space-y-12">
            {investments.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-sm border border-stone-200 shadow-luxury hover:border-gold-500/50 transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Media Column */}
                <div className="relative h-80 lg:h-auto lg:col-span-5 bg-navy-950 overflow-hidden">
                  {inv.images[0] && (
                    <Image
                      src={inv.images[0].url}
                      alt={inv.images[0].altText}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded bg-navy-950/90 text-gold-300 text-xs font-bold uppercase tracking-wider border border-gold-400/30 backdrop-blur-md">
                      {inv.assetType}
                    </span>
                    {!inv.isVerified && (
                      <span className="px-3 py-1 rounded bg-amber-950/90 text-amber-300 text-xs font-medium border border-amber-500/30 backdrop-blur-md">
                        Under Legal Review
                      </span>
                    )}
                  </div>
                </div>

                {/* Information Column */}
                <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-widest font-bold text-gold-600">
                      {inv.locationText} {inv.brand && `• ${inv.brand}`}
                    </div>
                    <h3 className="text-3xl font-bold font-serif text-navy-950">
                      {inv.title}
                    </h3>
                    <p className="text-sm text-stone-600 leading-relaxed font-light">
                      {inv.description}
                    </p>
                  </div>

                  {/* Core Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-sm border border-stone-200 text-xs">
                    <div>
                      <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Starting Amount</div>
                      <div className="font-serif font-bold text-navy-950 text-base mt-0.5">
                        {formatPrice(inv.minimumAmount, inv.currencyCode)}
                      </div>
                      <div className="text-[10px] text-amber-700 font-semibold">*Client claim</div>
                    </div>

                    <div>
                      <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Stated Yield</div>
                      <div className="font-serif font-bold text-emerald-700 text-base mt-0.5">
                        {inv.statedReturnValue || '8% Stated'}
                      </div>
                      <div className="text-[10px] text-stone-500">{inv.statedReturnStartText || 'From day one'}</div>
                    </div>

                    <div>
                      <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Appreciation</div>
                      <div className="font-serif font-bold text-navy-950 text-base mt-0.5">
                        {inv.projectedAppreciationText?.split(' ')[0] || '2.5–3x'}
                      </div>
                      <div className="text-[10px] text-stone-500">Projected target</div>
                    </div>

                    <div>
                      <div className="text-stone-400 uppercase text-[9px] tracking-wider font-bold">Handover</div>
                      <div className="font-serif font-bold text-navy-950 text-base mt-0.5">
                        {inv.handoverText || 'Q4 2028'}
                      </div>
                      <div className="text-[10px] text-stone-500">Scheduled</div>
                    </div>
                  </div>

                  {/* Disclosures & Action */}
                  <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-[11px] text-stone-500 max-w-md">
                      <strong>Tax Note:</strong> {inv.capitalGainsTaxStatement || '0% capital-gains tax under UAE framework.'}
                    </div>

                    <Link
                      href={`/reits/${inv.slug}`}
                      className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-sm bg-navy-950 text-gold-400 hover:bg-navy-900 font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                    >
                      <span>Explore Prospectus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
