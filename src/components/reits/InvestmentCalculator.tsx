'use client';

import React, { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { Calculator, ShieldAlert, Sparkles, TrendingUp, Info } from 'lucide-react';

interface Props {
  minimumAmount: number;
  currencyCode: string;
  statedAnnualReturnPercent: number; // e.g. 8
  appreciationMultiplierMin: number; // e.g. 2.5
  appreciationMultiplierMax: number; // e.g. 3.0
  handoverYear: string;
}

export default function InvestmentCalculator({
  minimumAmount = 225000,
  currencyCode = 'INR',
  statedAnnualReturnPercent = 8,
  appreciationMultiplierMin = 2.5,
  appreciationMultiplierMax = 3.0,
  handoverYear = '2028',
}: Props) {
  const [amount, setAmount] = useState<number>(minimumAmount);

  // Computations
  const annualCashflow = (amount * statedAnnualReturnPercent) / 100;
  const monthlyCashflow = annualCashflow / 12;
  const projectedValueMin = amount * appreciationMultiplierMin;
  const projectedValueMax = amount * appreciationMultiplierMax;

  return (
    <div className="bg-navy-950 text-white rounded-sm border border-gold-500/30 p-6 sm:p-8 space-y-6 shadow-luxury">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-sm bg-gold-500/20 text-gold-400 border border-gold-400/30 flex items-center justify-center">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-white">
              Interactive Yield & Horizon Model
            </h3>
            <p className="text-[11px] text-stone-400">
              Model cashflow based on client-stated 8% annual return and 2.5–3x appreciation targets.
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-300 bg-amber-950/80 border border-amber-500/30 px-2.5 py-1 rounded w-max">
          Illustrative Simulation
        </span>
      </div>

      {/* Input Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-stone-300">
            Selected Investment Principal
          </span>
          <span className="font-serif font-extrabold text-gold-300 text-lg">
            {formatPrice(amount, currencyCode)}
          </span>
        </div>

        <input
          type="range"
          min={minimumAmount}
          max={minimumAmount * 20}
          step={25000}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-1.5 bg-navy-900 rounded-lg appearance-none cursor-pointer accent-gold-500"
        />

        <div className="flex justify-between text-[10px] text-stone-500 font-mono">
          <span>Min: {formatPrice(minimumAmount, currencyCode)}</span>
          <span>Max: {formatPrice(minimumAmount * 20, currencyCode)}</span>
        </div>
      </div>

      {/* Simulation Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="bg-navy-900/80 p-4 rounded-sm border border-white/10 space-y-1">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
            Stated Annual Cashflow (8%)
          </div>
          <div className="font-serif font-bold text-emerald-400 text-xl">
            {formatPrice(annualCashflow, currencyCode)}
          </div>
          <div className="text-[10px] text-stone-400">
            ~{formatPrice(monthlyCashflow, currencyCode)} / month
          </div>
        </div>

        <div className="bg-navy-900/80 p-4 rounded-sm border border-white/10 space-y-1">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
            Projected Appreciation Target
          </div>
          <div className="font-serif font-bold text-gold-300 text-xl">
            {appreciationMultiplierMin}x – {appreciationMultiplierMax}x
          </div>
          <div className="text-[10px] text-stone-400">
            At {handoverYear} maturity
          </div>
        </div>

        <div className="bg-navy-900/80 p-4 rounded-sm border border-white/10 space-y-1">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-semibold">
            Target Asset Realization
          </div>
          <div className="font-serif font-bold text-white text-xl">
            {formatPrice(projectedValueMin, currencyCode)}
          </div>
          <div className="text-[10px] text-stone-400">
            Up to {formatPrice(projectedValueMax, currencyCode)}
          </div>
        </div>
      </div>

      {/* Disclaimer Alert */}
      <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-sm text-[11px] text-amber-200/90 leading-relaxed flex items-start space-x-2">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p>
          <strong>Governance Notice:</strong> This projection is generated using client-supplied marketing targets. It does not represent a guaranteed financial return or statutory contractual promise. Past market behavior does not ensure future appreciation.
        </p>
      </div>
    </div>
  );
}

