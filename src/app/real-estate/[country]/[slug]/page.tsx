import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/enquiry/EnquiryForm';
import InteractiveGallery from '@/components/ui/InteractiveGallery';
import UnitMatrixTabs from '@/components/real-estate/UnitMatrixTabs';
import { repository } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { formatPrice, formatArea } from '@/lib/utils';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Layers,
  ShieldAlert,
  ArrowLeft,
  BadgeAlert,
  Maximize2,
  BedDouble,
  Bath,
  Sparkles,
  Award,
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: { country: string; slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = repository.getPropertyBySlug(params.slug);
  if (!property) return { title: 'Property Details | SG Properties' };
  return {
    title: `${property.title} — ${property.city || property.country} | SG Properties`,
    description: property.summary,
  };
}

export default function PropertyDetailPage({ params }: Props) {
  const property = repository.getPropertyBySlug(params.slug);

  if (!property) {
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
            <Link href="/real-estate" className="hover:text-navy-950">Real Estate</Link>
            <span>/</span>
            <Link href={`/real-estate/${property.countrySlug}`} className="hover:text-navy-950">
              {property.country}
            </Link>
            <span>/</span>
            <span className="text-navy-950 font-bold">{property.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-navy-950 text-white py-16 border-b border-gold-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded bg-navy-900 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-widest-xl">
                  {property.propertyType}
                </span>
                <span className="px-3 py-1 rounded bg-white/10 text-stone-200 text-xs flex items-center space-x-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{property.address || property.city || property.country}</span>
                </span>
                {property.developer && (
                  <span className="px-3 py-1 rounded bg-white/10 text-stone-200 text-xs flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-gold-400" />
                    <span>Developer: {property.developer}</span>
                  </span>
                )}
                {property.isPendingVerification && (
                  <span className="px-3 py-1 rounded bg-amber-950/90 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center space-x-1">
                    <BadgeAlert className="w-3.5 h-3.5" />
                    <span>Under Internal Verification</span>
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif tracking-tight text-white leading-[1.1]">
                {property.title}
              </h1>

              <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-light max-w-3xl">
                {property.summary}
              </p>
            </div>
          </div>
        </section>

        {/* Pending Verification Notice (if Boracay or unverified) */}
        {property.isPendingVerification && (
          <section className="bg-amber-500/10 border-b border-amber-500/20 py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex items-start space-x-3 text-xs text-amber-950">
              <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">Pending Internal Verification:</strong> Developer allocation, floorplan mix, scheduled handover, and confirmed allocation pricing are currently undergoing legal review. Register via the advisory desk below for priority notification once formal release is approved.
              </div>
            </div>
          </section>
        )}

        {/* Main Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Interactive Luxury Gallery */}
              <InteractiveGallery images={property.images} title={property.title} />

              {/* Architectural Overview */}
              <div className="bg-white rounded-sm border border-stone-200 p-8 space-y-6 shadow-sm">
                <div className="border-b border-stone-200 pb-4">
                  <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
                    Architectural Narrative
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-navy-950 mt-1">
                    Masterplan & Residence Overview
                  </h2>
                </div>

                <div className="text-sm text-stone-600 leading-relaxed space-y-4 font-light">
                  <p>{property.description}</p>
                </div>

                {/* Quick Attributes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200 text-xs">
                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Starting Allocation</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">
                      {formatPrice(property.startingPrice, property.currencyCode)}
                    </div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Area Dimensions</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">
                      {property.areaMin
                        ? `${property.areaMin}${property.areaMax ? `–${property.areaMax}` : ''} ${property.areaUnit}`
                        : 'Contact Advisory'}
                    </div>
                  </div>

                  <div>
                    <div className="text-stone-400 uppercase tracking-wider font-bold">Configuration Mix</div>
                    <div className="font-serif font-bold text-navy-950 text-base mt-1">
                      {property.bedroomsMin
                        ? `${property.bedroomsMin}${property.bedroomsMax ? `–${property.bedroomsMax}` : ''} Bedrooms`
                        : 'Multiple Mixes'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Unit Matrix Tabs Component */}
              {property.units.length > 0 && (
                <UnitMatrixTabs
                  units={property.units}
                  currencyCode={property.currencyCode}
                />
              )}

              {/* Curated Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="bg-white rounded-sm border border-stone-200 p-8 space-y-6 shadow-sm">
                  <div className="border-b border-stone-200 pb-4">
                    <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
                      Curated Wellness & Leisure
                    </span>
                    <h2 className="text-2xl font-bold font-serif text-navy-950 mt-1">
                      Signature Building Amenities
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {property.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center space-x-2.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-sm border border-stone-200 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sticky Advisory Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <EnquiryForm
                  propertySlug={property.slug}
                  propertyTitle={property.title}
                  sourceContext={`/real-estate/${property.countrySlug}/${property.slug}`}
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
