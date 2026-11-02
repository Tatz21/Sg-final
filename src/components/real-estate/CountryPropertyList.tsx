'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatArea } from '@/lib/utils';
import type { PropertyItem, CountryItem } from '@/types';
import {
  Building2,
  Filter,
  ArrowRight,
  SlidersHorizontal,
  BadgeAlert,
  Search,
  RotateCcw,
  Maximize2,
  BedDouble,
  Compass,
} from 'lucide-react';

interface Props {
  country: CountryItem;
  initialProperties: PropertyItem[];
}

export default function CountryPropertyList({ country, initialProperties }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = useMemo(() => {
    const set = new Set<string>();
    initialProperties.forEach((p) => {
      if (p.city) set.add(p.city);
    });
    return Array.from(set);
  }, [initialProperties]);

  const propertyTypes = useMemo(() => {
    const set = new Set<string>();
    initialProperties.forEach((p) => {
      if (p.propertyType) set.add(p.propertyType);
    });
    return Array.from(set);
  }, [initialProperties]);

  const filtered = useMemo(() => {
    return initialProperties.filter((p) => {
      if (selectedCity !== 'ALL' && p.city !== selectedCity) return false;
      if (selectedType !== 'ALL' && p.propertyType !== selectedType) return false;
      if (selectedBedrooms !== 'ALL') {
        const beds = parseInt(selectedBedrooms, 10);
        if (p.bedroomsMin && p.bedroomsMax) {
          if (beds < p.bedroomsMin || beds > p.bedroomsMax) return false;
        } else if (p.bedroomsMin && p.bedroomsMin !== beds) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesProject = p.projectName.toLowerCase().includes(q);
        const matchesDeveloper = p.developer ? p.developer.toLowerCase().includes(q) : false;
        if (!matchesTitle && !matchesProject && !matchesDeveloper) return false;
      }
      return true;
    });
  }, [initialProperties, selectedCity, selectedType, selectedBedrooms, searchQuery]);

  const resetFilters = () => {
    setSelectedCity('ALL');
    setSelectedType('ALL');
    setSelectedBedrooms('ALL');
    setSearchQuery('');
  };

  return (
    <div className="space-y-10">
      {/* Luxury Filter Header Bar */}
      <div className="bg-white border border-stone-200 rounded-sm p-6 space-y-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search in ${country.name} by development or developer...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-stone-50/60"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* City Dropdown */}
            {cities.length > 0 && (
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3.5 py-2.5 text-xs font-semibold border border-stone-300 rounded-sm bg-stone-50 focus:outline-none focus:ring-1 focus:ring-gold-500 text-navy-950"
              >
                <option value="ALL">All Destinations in {country.name}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            )}

            {/* Type Dropdown */}
            {propertyTypes.length > 0 && (
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3.5 py-2.5 text-xs font-semibold border border-stone-300 rounded-sm bg-stone-50 focus:outline-none focus:ring-1 focus:ring-gold-500 text-navy-950"
              >
                <option value="ALL">All Residence Types</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            )}

            {/* Bedrooms Dropdown */}
            <select
              value={selectedBedrooms}
              onChange={(e) => setSelectedBedrooms(e.target.value)}
              className="px-3.5 py-2.5 text-xs font-semibold border border-stone-300 rounded-sm bg-stone-50 focus:outline-none focus:ring-1 focus:ring-gold-500 text-navy-950"
            >
              <option value="ALL">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>

            {(selectedCity !== 'ALL' || selectedType !== 'ALL' || selectedBedrooms !== 'ALL' || searchQuery) && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-navy-950 hover:bg-stone-100 rounded"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick city pills */}
        {cities.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-stone-100">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold mr-1">
              Popular Cities:
            </span>
            <button
              onClick={() => setSelectedCity('ALL')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                selectedCity === 'ALL'
                  ? 'bg-navy-950 text-gold-300'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All
            </button>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCity === city
                    ? 'bg-navy-950 text-gold-300'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Property Results Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
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
                      {property.propertyType}
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
                  <h3 className="text-2xl font-bold font-serif text-navy-950 group-hover:text-gold-700 transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed font-light">
                    {property.summary}
                  </p>

                  {/* Quick specs pill */}
                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-stone-600 font-medium">
                    {property.areaMin && (
                      <span className="px-2.5 py-0.5 bg-stone-50 rounded border border-stone-200">
                        {property.areaMin}{property.areaMax && `–${property.areaMax}`} {property.areaUnit}
                      </span>
                    )}
                    {property.bedroomsMin && (
                      <span className="px-2.5 py-0.5 bg-stone-50 rounded border border-stone-200">
                        {property.bedroomsMin}{property.bedroomsMax && `–${property.bedroomsMax}`} Bedrooms
                      </span>
                    )}
                    {property.units.length > 0 && (
                      <span className="px-2.5 py-0.5 bg-stone-50 rounded border border-stone-200 text-stone-700 font-semibold">
                        {property.units.length} Unit Layouts
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
                  href={`/real-estate/${country.slug}/${property.slug}`}
                  className="inline-flex items-center space-x-1 font-bold text-xs uppercase tracking-wider text-gold-600 hover:text-gold-700 group-hover:translate-x-1 transition-transform"
                >
                  <span>Inspect Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-stone-200 rounded-sm p-14 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-serif text-navy-950">
            No Active Developments Match These Filters
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed font-light">
            We currently do not have published inventory matching your selection in {country.name}. Reset your filters or submit a tailored request to our overseas desk.
          </p>
          <div className="pt-2">
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-navy-950 text-gold-400 rounded-sm hover:bg-navy-900 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
