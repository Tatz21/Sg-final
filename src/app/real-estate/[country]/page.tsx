import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CountryPropertyList from '@/components/real-estate/CountryPropertyList';
import { repository } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Globe2, MapPin, ShieldCheck, ArrowLeft, Building2 } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { country: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = repository.getCountryBySlug(params.country);
  if (!country) return { title: 'Country Properties | SG Properties' };
  return {
    title: `Luxury Real Estate & Developments in ${country.name} | SG Properties`,
    description: country.summary,
  };
}

export default function CountryPage({ params }: Props) {
  const country = repository.getCountryBySlug(params.country);

  if (!country) {
    notFound();
  }

  const properties = repository.getProperties({
    countrySlug: country.slug,
    status: 'PUBLISHED',
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-25">
      <Navbar />

      <main className="flex-grow">
        {/* Country Hero Header */}
        <section className="relative bg-navy-950 text-white py-24 overflow-hidden border-b border-gold-500/20">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={country.heroImage}
              alt={country.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <Link
                href="/real-estate"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Sovereign Portfolios</span>
              </Link>

              <div className="flex items-center space-x-3 pt-2">
                <span className="px-3 py-1 rounded bg-gold-500/20 text-gold-300 border border-gold-400/30 text-xs font-bold uppercase tracking-widest-xl backdrop-blur-md">
                  ISO: {country.iso2}
                </span>
                <span className="text-xs text-stone-300 font-medium">
                  Trading Currency: {country.currencyCode}
                </span>
                <span className="text-stone-500">•</span>
                <span className="text-xs text-stone-300 font-medium">
                  Dial Code: {country.phoneCode}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white leading-[1.1]">
                {country.name} Residences
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light">
                {country.summary}
              </p>
            </div>
          </div>
        </section>

        {/* Territory Content & Listings */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CountryPropertyList country={country} initialProperties={properties} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
