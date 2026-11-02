import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/enquiry/EnquiryForm';
import InteractiveGallery from '@/components/ui/InteractiveGallery';
import InvestmentCalculator from '@/components/reits/InvestmentCalculator';
import { repository } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatPrice, formatArea } from '@/lib/utils';
import {
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  MapPin,
  Clock,
  ArrowLeft,
  Info,
  BadgeAlert,
  FileCheck2,
  FileText,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const inv = repository.getInvestmentBySlug(params.slug);
  if (!inv) return { title: 'Investment Offering | SG Properties' };
  return {
    title: `${inv.title} — Institutional Real Estate Prospectus | SG Properties`,
    description: inv.description,
  };
}

export default function InvestmentDetailPage({ params }: Props) {
  const inv = repository.getInvestmentBySlug(params.slug);

  if (!inv) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-25">
      <Navbar />

      <main className="flex-grow">
        {/* Editorial Breadcrumbs */}
        <div className="bg-stone-50 border-b border-stone-200 py-3.5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <Link href="/" className="hover:text-navy-950">Home</Link>
            <span>/</span>
            <Link href="/reits" className="hover:text-navy-950">REITs & Investments</Link>
            <span>/</span>
            <span className="text-navy-950 font-bold">{inv.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-navy-950 text-white py-16 border-b border-gold-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded bg-navy-900 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-widest-xl">
                  {inv.assetType}
                </span>
                <span className="px-3 py-1 rounded bg-white/10 text-stone-200 text-xs flex items-center space-x-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{inv.locationText}</span>
                </span>
                {!inv.isVerified && (
                  <span className="px-3 py-1 rounded bg-amber-950/90 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center space-x-1">
                    <BadgeAlert className="w-3.5 h-3.5" />
                    <span>Claims Under Legal Review</span>
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white leading-[1.1]">
                {inv.title}
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light max-w-3xl">
                {inv.description}
              </p>
            </div>
          </div>
        </section>

        {/* Fiduciary Alert Banner */}
        <section className="bg-amber-500/10 border-b border-amber-500/20 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-950">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold uppercase tracking-wider text-[11px] text-amber-900">
                Fiduciary Compliance Notice (RULES.md Rule 6, 7 & 8):
              </div>
              <p className="leading-relaxed">
                Stated yields (8%), tax statements (0% capital gains), timelines (Q4 2028), and capital appreciation targets (2.5–3x) represent <strong>client-supplied marketing claims</strong> under active audit. Returns are never guaranteed. This vehicle does not constitute an officially regulated REIT until statutory filings are verified in operating jurisdictions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Interactive Luxury Gallery */}
              <InteractiveGallery images={inv.images} title={inv.title} />

              {/* Prospectus Fact Sheet */}
              <div className="bg-white rounded-sm border border-stone-200 p-8 space-y-8 shadow-sm">
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
                    Institutional Specification
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-navy-950 mt-1">
                    Offering Parameters & Co-Ownership Structure
                  </h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Project Asset</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">{inv.projectName}</div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Developer / Brand</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">{inv.brand || 'Lapis Investments'}</div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Starting Entry Amount</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">
                      {formatPrice(inv.minimumAmount, inv.currencyCode)}
                    </div>
                    <div className="text-[10px] text-amber-700 font-semibold">*Client claim</div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Unit Allocation</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">{inv.unitType}</div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Asset Area</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">
                      {formatArea(inv.areaValue, inv.areaUnit)}
                    </div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Scheduled Handover</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">{inv.handoverText || 'Q4 2028'}</div>
                  </div>
                </div>

                {/* Stated Financial Claims Panel */}
                <div className="bg-stone-50 border border-stone-200 rounded-sm p-6 space-y-4">
                  <div className="text-xs uppercase font-bold tracking-widest text-navy-950 flex items-center space-x-2">
                    <Info className="w-4 h-4 text-gold-600" />
                    <span>Client-Stated Financial Performance Indicators</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-sm border border-stone-200">
                      <div className="text-stone-400 uppercase text-[10px] font-bold">Stated Annual Return</div>
                      <div className="font-serif font-extrabold text-emerald-700 text-lg mt-0.5">8% Annually</div>
                      <div className="text-[10px] text-stone-500">{inv.statedReturnStartText || 'From day one'}</div>
                    </div>

                    <div className="bg-white p-4 rounded-sm border border-stone-200">
                      <div className="text-stone-400 uppercase text-[10px] font-bold">Capital Gains Tax</div>
                      <div className="font-serif font-extrabold text-navy-950 text-lg mt-0.5">0% Stated</div>
                      <div className="text-[10px] text-stone-500">Under UAE federal laws</div>
                    </div>

                    <div className="bg-white p-4 rounded-sm border border-stone-200">
                      <div className="text-stone-400 uppercase text-[10px] font-bold">Appreciation Multiple</div>
                      <div className="font-serif font-extrabold text-navy-950 text-lg mt-0.5">2.5–3x Multiple</div>
                      <div className="text-[10px] text-stone-500">Marketing target</div>
                    </div>
                  </div>
                </div>

                {/* Mandatory Legal Disclosure */}
                <div className="bg-stone-100 rounded-sm p-5 text-xs text-stone-700 leading-relaxed border-l-4 border-gold-600 space-y-1">
                  <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                    Risk Governance & Disclosures
                  </div>
                  <p className="font-light">{inv.riskDisclosure}</p>
                </div>
              </div>

              {/* Interactive Yield Calculator */}
              <InvestmentCalculator
                minimumAmount={inv.minimumAmount}
                currencyCode={inv.currencyCode}
                statedAnnualReturnPercent={8}
                appreciationMultiplierMin={2.5}
                appreciationMultiplierMax={3.0}
                handoverYear="2028"
              />
            </div>

            {/* Right Sticky Enquiry Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <EnquiryForm
                  investmentSlug={inv.slug}
                  investmentTitle={inv.title}
                  sourceContext={`/reits/${inv.slug}`}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
