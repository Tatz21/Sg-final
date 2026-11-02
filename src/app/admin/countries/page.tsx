'use client';

import React, { useState, useEffect } from 'react';
import type { CountryItem } from '@/types';
import { Globe2, Plus, CheckCircle, ShieldAlert, Edit } from 'lucide-react';

export default function AdminCountriesPage() {
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((json) => {
        if (json.data) setCountries(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-navy-950">
            Sovereign Territories & Country Hubs
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage global operational territories, published inventory counters, and expansion roadmaps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country) => (
          <div
            key={country.id}
            className="bg-white border border-stone-200 rounded-sm p-6 space-y-4 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy-950 px-2 py-0.5 bg-stone-100 rounded">
                  {country.iso2} • {country.phoneCode}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    country.isPublished
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {country.isPublished ? 'Active Territory' : 'Roadmap Expansion'}
                </span>
              </div>

              <h3 className="text-xl font-bold font-serif text-navy-950">{country.name}</h3>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {country.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div>
                Currency: <strong className="text-navy-950">{country.currencyCode}</strong>
              </div>
              <div>
                Listings: <strong className="text-navy-950">{country.propertyCount}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

