'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import type { UnitConfig } from '@/types';
import { BedDouble, Bath, Maximize2, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  units: UnitConfig[];
  currencyCode: string;
}

export default function UnitMatrixTabs({ units, currencyCode }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!units || units.length === 0) return null;

  const current = units[selectedIdx] || units[0];

  return (
    <div className="bg-white rounded-sm border border-stone-200 p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
            Exact Architectural Dimensions
          </span>
          <h2 className="text-2xl font-bold font-serif text-navy-950 mt-0.5">
            Unit Configurations & Pricing
          </h2>
        </div>
        <span className="text-xs text-stone-500 font-medium">
          {units.length} Layout Configurations Available
        </span>
      </div>

      {/* Segmented Unit Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-100 pb-4">
        {units.map((unit, idx) => (
          <button
            key={unit.id}
            onClick={() => setSelectedIdx(idx)}
            className={`px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              selectedIdx === idx
                ? 'bg-navy-950 text-gold-300 shadow-sm border border-gold-400/30'
                : 'bg-stone-50 text-stone-600 hover:text-navy-950 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {unit.label}
          </button>
        ))}
      </div>

      {/* Selected Unit Deep-Dive Card */}
      <div className="bg-stone-50 rounded-sm border border-stone-200 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="text-[11px] text-stone-500 uppercase tracking-wider font-semibold">
              Configuration Specification
            </div>
            <h3 className="text-2xl font-bold font-serif text-navy-950 mt-1">
              {current.label}
            </h3>
            {current.description && (
              <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-md font-light">
                {current.description}
              </p>
            )}
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">
              Allocation Price
            </div>
            <div className="text-2xl font-bold font-serif text-navy-950 mt-0.5">
              {formatPrice(current.price, current.currencyCode || currencyCode)}
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 mt-1">
              {current.availabilityStatus}
            </span>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200 text-center">
          <div className="bg-white p-3 rounded border border-stone-200">
            <div className="text-stone-400 text-[10px] uppercase font-bold flex items-center justify-center space-x-1">
              <Maximize2 className="w-3.5 h-3.5 text-gold-600" />
              <span>Floor Area</span>
            </div>
            <div className="font-serif font-extrabold text-navy-950 text-base mt-1">
              {current.areaValue} {current.areaUnit}
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-stone-200">
            <div className="text-stone-400 text-[10px] uppercase font-bold flex items-center justify-center space-x-1">
              <BedDouble className="w-3.5 h-3.5 text-gold-600" />
              <span>Bedrooms</span>
            </div>
            <div className="font-serif font-extrabold text-navy-950 text-base mt-1">
              {current.bedrooms} Bedroom{current.bedrooms > 1 ? 's' : ''}
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-stone-200">
            <div className="text-stone-400 text-[10px] uppercase font-bold flex items-center justify-center space-x-1">
              <Bath className="w-3.5 h-3.5 text-gold-600" />
              <span>Bathrooms</span>
            </div>
            <div className="font-serif font-extrabold text-navy-950 text-base mt-1">
              {current.bathrooms} Bathroom{current.bathrooms > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

