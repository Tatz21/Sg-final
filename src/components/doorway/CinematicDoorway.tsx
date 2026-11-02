'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Building2,
  ArrowRight,
  ShieldCheck,
  Percent,
  Sparkles,
  Compass,
  ArrowUpRight,
} from 'lucide-react';

export default function CinematicDoorway() {
  const router = useRouter();
  const [hoveredSide, setHoveredSide] = useState<'reit' | 'realestate' | null>(null);
  const [selectedSide, setSelectedSide] = useState<'reit' | 'realestate' | null>(null);

  const handleSelect = (side: 'reit' | 'realestate') => {
    setSelectedSide(side);
    setTimeout(() => {
      router.push(side === 'reit' ? '/reits' : '/real-estate');
    }, 550);
  };

  return (
    <div className="relative w-full min-h-[90vh] lg:h-[calc(100vh-6rem)] bg-navy-950 overflow-hidden select-none flex flex-col justify-between border-b border-gold-500/20">
      {/* Central Architectural Monogram Seal & Title */}
      <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none px-4 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-navy-900/95 border border-gold-400/40 text-gold-300 text-[10px] tracking-widest-xl uppercase font-bold backdrop-blur-xl mb-3 shadow-luxury"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
          <span>Bespoke Cross-Border Discovery</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-serif drop-shadow-2xl"
        >
          Select Your Architectural Portal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xs sm:text-sm text-stone-300 tracking-wide mt-1.5 font-light max-w-lg mx-auto"
        >
          Enter institutional yield-producing REIT portfolios, or explore curated residential towers across sovereign territories.
        </motion.p>
      </div>

      {/* Accessible Fast Skip Controls */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4 text-xs font-semibold tracking-wider uppercase">
        <button
          onClick={() => router.push('/reits')}
          className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-white/10 text-stone-300 hover:text-gold-300 hover:border-gold-400/50 backdrop-blur-md transition-all focus:ring-1 focus:ring-gold-400"
        >
          Skip to REITs →
        </button>
        <span className="text-stone-600">•</span>
        <button
          onClick={() => router.push('/real-estate')}
          className="px-3 py-1.5 rounded-full bg-navy-900/80 border border-white/10 text-stone-300 hover:text-gold-300 hover:border-gold-400/50 backdrop-blur-md transition-all focus:ring-1 focus:ring-gold-400"
        >
          Skip to Real Estate →
        </button>
      </div>

      {/* Central Dividing Seam Medallion (Desktop only) */}
      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex-col items-center">
        <div className="w-px h-28 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
        <div className="w-12 h-12 rounded-full bg-navy-950 border-2 border-gold-400 shadow-luxury-gold flex items-center justify-center my-2 text-gold-300 font-serif font-bold text-xs tracking-tighter">
          SG
        </div>
        <div className="w-px h-28 bg-gradient-to-b from-transparent via-gold-400 to-transparent" />
      </div>

      {/* The Double Door Split Panels */}
      <div className="relative w-full h-full flex flex-col md:flex-row flex-grow">
        {/* Left Portal: REITs & Institutional Yield Assets */}
        <motion.div
          animate={
            selectedSide === 'realestate'
              ? { x: '-100%', opacity: 0 }
              : selectedSide === 'reit'
              ? { scale: 1.02, zIndex: 25 }
              : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredSide('reit')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelect('reit')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleSelect('reit');
          }}
          className={`group relative flex-1 min-h-[46vh] md:min-h-full cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-gold-500/20 transition-all duration-700 flex flex-col justify-end p-8 sm:p-12 lg:p-16 ${
            hoveredSide === 'reit' ? 'md:flex-[1.12]' : 'md:flex-1'
          }`}
        >
          {/* Atmospheric High-Res Architectural Photography */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{
              backgroundImage: 'url(/images/doorway/reits.jpg)',
            }}
          />
          {/* Deep Architectural Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40 group-hover:via-navy-950/65 transition-colors duration-500" />

          {/* Interactive Gold Border Glow on Hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/50 group-focus:border-gold-400 transition-colors pointer-events-none" />

          {/* Doorway Content */}
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-navy-900/90 border border-gold-400/30 text-gold-300 text-xs tracking-wider uppercase font-bold backdrop-blur-md">
              <TrendingUp className="w-4 h-4 text-gold-400" />
              <span>Investment Desk Portal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight group-hover:text-gold-200 transition-colors leading-[1.1]">
              REITs & Strategic Yield Assets
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              Participate in institutional commercial co-ownership, tax-advantaged free zone developments, and verified income-generating portfolios across UAE and emerging markets.
            </p>

            {/* Live Indicator Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
              <div className="px-3 py-1.5 rounded bg-navy-950/80 border border-gold-500/30 text-gold-300 font-semibold flex items-center space-x-1.5 backdrop-blur-md">
                <Percent className="w-3.5 h-3.5" />
                <span>Stated 8% Day-One Yields</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-navy-950/80 border border-white/10 text-stone-200 font-medium backdrop-blur-md">
                0% Capital Gains Regime
              </div>
              <div className="px-3 py-1.5 rounded bg-navy-950/80 border border-white/10 text-stone-200 font-medium backdrop-blur-md">
                Entry from ₹225,000
              </div>
            </div>

            {/* Tactical CTA Action Button */}
            <div className="pt-4 flex items-center space-x-3">
              <span className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-gold-500 text-navy-950 font-bold uppercase tracking-wider text-xs shadow-luxury-gold group-hover:bg-gold-400 transition-all">
                <span>Unlock REIT Vault</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs text-stone-400 font-light hidden sm:inline">
                Featuring Azure by Lapis (UAE)
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Portal: Real Estate & Sovereign Collections */}
        <motion.div
          animate={
            selectedSide === 'reit'
              ? { x: '100%', opacity: 0 }
              : selectedSide === 'realestate'
              ? { scale: 1.02, zIndex: 25 }
              : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setHoveredSide('realestate')}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelect('realestate')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleSelect('realestate');
          }}
          className={`group relative flex-1 min-h-[46vh] md:min-h-full cursor-pointer overflow-hidden transition-all duration-700 flex flex-col justify-end p-8 sm:p-12 lg:p-16 ${
            hoveredSide === 'realestate' ? 'md:flex-[1.12]' : 'md:flex-1'
          }`}
        >
          {/* Atmospheric High-Res Architectural Photography */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{
              backgroundImage: 'url(/images/doorway/real-estate.jpg)',
            }}
          />
          {/* Deep Architectural Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/40 group-hover:via-navy-950/65 transition-colors duration-500" />

          {/* Interactive Gold Border Glow on Hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-400/50 group-focus:border-gold-400 transition-colors pointer-events-none" />

          {/* Doorway Content */}
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-sm bg-navy-900/90 border border-gold-400/30 text-gold-300 text-xs tracking-wider uppercase font-bold backdrop-blur-md">
              <Building2 className="w-4 h-4 text-gold-400" />
              <span>Sovereign Portfolio Portal</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-serif tracking-tight group-hover:text-gold-200 transition-colors leading-[1.1]">
              Global Real Estate Collections
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              Explore premier residential high-rises, coastal villas, and sky estates across the Philippines, UAE, India, and verified international destinations.
            </p>

            {/* Live Indicator Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
              <div className="px-3 py-1.5 rounded bg-navy-950/80 border border-gold-500/30 text-gold-300 font-semibold flex items-center space-x-1.5 backdrop-blur-md">
                <Compass className="w-3.5 h-3.5" />
                <span>Philippines • Pasig & Cebu</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-navy-950/80 border border-white/10 text-stone-200 font-medium backdrop-blur-md">
                UAE Waterfront Estates
              </div>
              <div className="px-3 py-1.5 rounded bg-navy-950/80 border border-white/10 text-stone-200 font-medium backdrop-blur-md">
                India Ultra-Luxury
              </div>
            </div>

            {/* Tactical CTA Action Button */}
            <div className="pt-4 flex items-center space-x-3">
              <span className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm bg-gold-500 text-navy-950 font-bold uppercase tracking-wider text-xs shadow-luxury-gold group-hover:bg-gold-400 transition-all">
                <span>Explore Destinations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs text-stone-400 font-light hidden sm:inline">
                LePont, Mantawi & Boracay
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
