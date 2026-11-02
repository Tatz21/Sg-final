'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  Building2,
  Globe2,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isReitActive = pathname.startsWith('/reits');
  const isRealEstateActive = pathname.startsWith('/real-estate');

  return (
    <>
      {/* Top Sovereign Market Ribbon */}
      <div className="bg-navy-950 text-stone-400 text-[10px] tracking-widest-xl uppercase py-1.5 px-4 border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-gold-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">Active Advisory Desks</span>
            </span>
            <span className="text-stone-400">UAE (Ras Al Khaimah & Dubai)</span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-400">Philippines (Pasig & Cebu)</span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-400">India (Mumbai & Goa)</span>
          </div>
          <div className="flex items-center space-x-4 text-stone-400">
            <Link href="/disclosures" className="hover:text-gold-300 transition-colors">
              Fiduciary Disclosures
            </Link>
            <span className="text-stone-600">|</span>
            <Link href="/admin/login" className="hover:text-gold-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-950/95 backdrop-blur-xl border-b border-gold-500/20 shadow-luxury py-3'
            : 'bg-navy-950/90 backdrop-blur-md border-b border-white/10 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Architectural Brand Crest */}
            <Link href="/" className="flex items-center space-x-3.5 group">
              <div className="relative w-11 h-11 rounded-sm bg-gradient-to-br from-navy-900 to-navy-950 border border-gold-400/40 flex items-center justify-center p-0.5 shadow-luxury group-hover:border-gold-300 transition-all duration-300">
                <div className="w-full h-full bg-navy-950 flex items-center justify-center border border-gold-500/20">
                  <span className="font-serif font-bold text-lg text-gold-300 tracking-tighter">
                    SG
                  </span>
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gold-400 rounded-full" />
              </div>

              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-[0.2em] uppercase text-white font-serif group-hover:text-gold-200 transition-colors">
                  SG Properties
                </span>
                <span className="text-[9px] tracking-widest-xl uppercase text-gold-400 font-semibold -mt-0.5">
                  Invest Beyond Borders
                </span>
              </div>
            </Link>

            {/* Core Dual Journey Segmented Control */}
            <nav className="hidden md:flex items-center p-1 bg-navy-900/90 rounded-full border border-gold-500/25 shadow-inner backdrop-blur-md">
              <Link
                href="/reits"
                className={`flex items-center space-x-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                  isReitActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-luxury-gold font-extrabold'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>REITs & Yield</span>
              </Link>

              <Link
                href="/real-estate"
                className={`flex items-center space-x-2 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-300 ${
                  isRealEstateActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 shadow-luxury-gold font-extrabold'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Global Real Estate</span>
              </Link>
            </nav>

            {/* Editorial Navigation Links & Concierge Button */}
            <div className="hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-wider uppercase">
              <Link
                href="/real-estate"
                className="text-stone-300 hover:text-gold-300 transition-colors flex items-center space-x-1"
              >
                <span>Territories</span>
                <ChevronDown className="w-3 h-3 text-gold-400" />
              </Link>
              <Link
                href="/about"
                className="text-stone-300 hover:text-gold-300 transition-colors"
              >
                Methodology
              </Link>
              <Link
                href="/contact"
                className="text-stone-300 hover:text-gold-300 transition-colors"
              >
                Desks
              </Link>

              <Link
                href="/contact"
                className="relative group overflow-hidden px-4 py-2.5 rounded-sm bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-navy-950 font-extrabold tracking-widest text-[11px] uppercase shadow-luxury-gold transition-all duration-300 hover:scale-[1.02] flex items-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-navy-950" />
                <span>Private Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden items-center space-x-3">
              <Link
                href="/contact"
                className="px-3 py-1.5 rounded-sm bg-gold-500 text-navy-950 font-bold text-[10px] uppercase tracking-wider"
              >
                Consult
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-stone-300 hover:text-white bg-white/5 border border-white/10"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-navy-950/98 backdrop-blur-2xl px-6 py-8 space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/reits"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-4 rounded-sm border text-center text-xs font-bold uppercase tracking-wider flex flex-col items-center space-y-2 ${
                  isReitActive
                    ? 'bg-gold-500 text-navy-950 border-gold-400 font-extrabold'
                    : 'bg-navy-900 text-stone-200 border-white/10'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>REIT Portfolios</span>
              </Link>
              <Link
                href="/real-estate"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-4 rounded-sm border text-center text-xs font-bold uppercase tracking-wider flex flex-col items-center space-y-2 ${
                  isRealEstateActive
                    ? 'bg-gold-500 text-navy-950 border-gold-400 font-extrabold'
                    : 'bg-navy-900 text-stone-200 border-white/10'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Real Estate</span>
              </Link>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs uppercase tracking-wider font-semibold text-stone-300">
              <Link
                href="/real-estate/philippines"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-gold-300 border-b border-white/5"
              >
                Philippines Residences
              </Link>
              <Link
                href="/real-estate/united-arab-emirates"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-gold-300 border-b border-white/5"
              >
                UAE Waterfront Estates
              </Link>
              <Link
                href="/real-estate/india"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-gold-300 border-b border-white/5"
              >
                India Prime Estates
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 hover:text-gold-300 border-b border-white/5"
              >
                Fiduciary Methodology
              </Link>
              <Link
                href="/disclosures"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gold-400 font-bold border-b border-white/5"
              >
                Risk & Regulatory Disclosures
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-center rounded-sm bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold uppercase text-xs"
              >
                Connect With Senior Advisor
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
