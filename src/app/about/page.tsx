import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import { ShieldCheck, Globe2, Award, Landmark, TrendingUp, Users } from 'lucide-react';

export const metadata = {
  title: 'About SG Properties — Invest Beyond Borders',
  description:
    'Learn about SG Properties, our cross-border advisory heritage, and our strict factual standards for international real estate and institutional REIT discovery.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-navy-950 text-white py-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
                Heritage & Philosophy
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-stone-100">
                Invest Beyond Borders
              </h1>
              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light">
                SG Properties was established to liberate high-net-worth individuals, institutional investors, and global citizens from the friction of cross-border real estate discovery.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-serif text-navy-950">
                A Principled Departure from Conventional Portals
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Most property portals are noisy advertising classifieds overloaded with stale listings, unverified prices, and aggressive lead brokers. SG Properties operates as a curated private gallery and fiduciary advisory desk.
              </p>
              <p className="text-sm text-stone-600 leading-relaxed">
                Every property and investment offering featured in our portfolio undergoes rigorous legal, jurisdictional, and developer validation. If a detail is pending verification, we state it transparently. We never invent facts or promote unverified returns.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4 text-xs">
                <div className="bg-white p-4 rounded border border-stone-200">
                  <div className="font-bold text-navy-950 text-lg">Dual-Portal</div>
                  <div className="text-stone-500 mt-1">Strict separation between REIT yield vehicles and physical luxury homes.</div>
                </div>
                <div className="bg-white p-4 rounded border border-stone-200">
                  <div className="font-bold text-navy-950 text-lg">Direct Verification</div>
                  <div className="text-stone-500 mt-1">Direct relationships with top tier master developers (RLC Residences, Lapis, etc.).</div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-sm overflow-hidden bg-navy-900 shadow-lg">
              <Image
                src="/images/properties/lepont-1.jpg"
                alt="SG Properties architectural heritage"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Advisory Principles */}
        <section className="py-16 bg-stone-100 border-t border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-navy-950">
                Our Core Commitments
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                The institutional standard guiding every client engagement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-3">
                <ShieldCheck className="w-8 h-8 text-gold-600" />
                <h3 className="text-base font-bold text-navy-950 font-serif">Factual Integrity</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We never manipulate property areas, currencies, or developer timelines. All units reflect exact developer architectural sheets.
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-3">
                <Landmark className="w-8 h-8 text-gold-600" />
                <h3 className="text-base font-bold text-navy-950 font-serif">Cross-Border Jurisdictional Fluency</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Deep advisory knowledge navigating UAE freehold rules, Philippine condominium laws, and Indian overseas investment guidelines.
                </p>
              </div>

              <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-3">
                <Users className="w-8 h-8 text-gold-600" />
                <h3 className="text-base font-bold text-navy-950 font-serif">Discreet Private Concierge</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Senior advisors handle every enquiry directly with encrypted lead governance and zero third-party data distribution.
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

