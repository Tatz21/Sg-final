import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldAlert, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Investment Risk Disclosures & Content Governance | SG Properties',
  description:
    'Official risk disclosure policies, marketing claim verification status, and regulatory notices for SG Properties investment offerings and real estate discovery.',
};

export default function DisclosuresPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-3 border-b border-stone-200 pb-6">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-700 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Compliance & Content Governance Policy</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
              Investment Risk & Regulatory Disclosures
            </h1>
            <p className="text-xs text-stone-500">
              Last updated: February 2026 • Policy Version: 2026-01
            </p>
          </div>

          {/* Section 1: Client-Supplied Claims */}
          <div className="bg-white border border-stone-200 rounded-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-navy-950 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>1. Treatment of Financial, Tax, and Yield Statements</span>
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              All financial performance indicators, including but not limited to stated annual return percentages (such as the 8% annual return cited for Azure by Lapis), stated capital gains tax rates (such as 0% capital gains tax statements), handover schedules, and projected appreciation multiples (such as 2.5–3x capital appreciation projections) represent <strong>client-supplied marketing claims</strong>.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              These figures must be treated as illustrative developer projections under active independent verification and legal review. <strong>Projected returns or capital appreciation are never guaranteed.</strong> Past performance or developer historical track records do not guarantee future performance.
            </p>
          </div>

          {/* Section 2: Legal Classification of REITs */}
          <div className="bg-white border border-stone-200 rounded-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-navy-950 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gold-600" />
              <span>2. Legal Structure and Classification of Offerings</span>
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              SG Properties categorizes offerings under the commercial banner of REITs and yield assets for visitor navigation. However, no offering presented on this website shall be interpreted as an officially registered Real Estate Investment Trust (REIT) under the regulatory authority of the Securities and Exchange Board of India (SEBI), UAE Securities and Commodities Authority (SCA), or Philippine SEC unless specifically accompanied by an approved statutory prospectus and registration code.
            </p>
          </div>

          {/* Section 3: Currency & Area Integrity */}
          <div className="bg-white border border-stone-200 rounded-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold font-serif text-navy-950 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>3. Exact Measurement Units and Original Currencies</span>
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              In accordance with SG Properties engineering and content rules, all unit areas preserve their native developer units (square metres for Philippine condominiums such as LePont and The Mantawi Residences; square feet for UAE and Indian properties). Any price conversions displayed are indicative and calculated from prevailing reference rates. Buyers must execute transactions in the statutory currency required by the developer contract.
            </p>
          </div>

          {/* Section 4: Fiduciary Disclaimer */}
          <div className="bg-stone-100 border border-stone-200 rounded-sm p-6 text-xs text-stone-600 space-y-3">
            <h3 className="font-bold text-navy-950 uppercase tracking-wider">
              No Financial or Tax Advice
            </h3>
            <p className="leading-relaxed">
              Information provided on this platform is for discovery and educational purposes only and does not constitute investment, legal, tax, or accounting advice. Prospective buyers must consult their own independent legal counsel, chartered accountants, and financial advisors before entering into binding property purchase or co-ownership agreements.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

