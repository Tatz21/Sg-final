import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowUpRight, Lock, Globe2, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-stone-300 border-t border-gold-500/20 mt-auto selection:bg-gold-500 selection:text-navy-950">
      {/* High-visibility regulatory disclaimer banner */}
      <div className="bg-navy-900/90 border-b border-white/5 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start space-x-3.5 text-xs leading-relaxed text-stone-400">
          <ShieldAlert className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
          <p className="font-light">
            <strong className="text-stone-200 font-semibold">Fiduciary Regulatory Notice:</strong> Real estate and cross-border investment discovery assets are subject to market cycles and macroeconomic risks. Stated annual returns, capital gains tax statements, scheduled handover dates, and projected appreciation targets displayed across this platform represent client-provided statements and developer marketing projections under verification. Nothing on this website constitutes financial, legal, or tax advice, nor a guaranteed financial return. Confirm legal classifications and statutory regulations in relevant operating jurisdictions prior to executing binding agreements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center font-bold text-navy-950 font-serif text-lg tracking-tighter shadow-luxury-gold">
                SG
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-[0.2em] uppercase text-white font-serif">
                  SG Properties
                </span>
                <span className="text-[10px] tracking-widest-xl uppercase text-gold-400 font-semibold -mt-0.5">
                  Invest Beyond Borders
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              An institutional cross-border property and REIT advisory desk. Connecting private wealth, family offices, and sovereign clients to verified real estate assets across the United Arab Emirates, the Philippines, India, and premier global capital markets.
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1 font-mono">
              <div>Global Concierge: <span className="text-stone-200 font-semibold">+971 4 000 0000 / +91 22 0000 0000</span></div>
              <div>Direct Fiduciary Desk: <span className="text-stone-200 font-semibold">advisory@sgproperties.com</span></div>
            </div>
          </div>

          {/* Column 2: REIT Vault */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest-xl text-gold-400">
              The Yield Vault
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <Link href="/reits" className="hover:text-white transition-colors">
                  Investment Desk Overview
                </Link>
              </li>
              <li>
                <Link href="/reits/azure-by-lapis" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Azure by Lapis (UAE)</span>
                  <span className="text-[9px] bg-gold-500/20 text-gold-300 px-1 py-0.2 rounded">8% Yield</span>
                </Link>
              </li>
              <li>
                <Link href="/disclosures" className="hover:text-white transition-colors">
                  Risk & Yield Governance
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Institutional Co-Ownership
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sovereign Collections */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest-xl text-gold-400">
              Sovereign Real Estate
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <Link href="/real-estate/philippines" className="hover:text-white transition-colors">
                  Philippines (LePont & Mantawi)
                </Link>
              </li>
              <li>
                <Link href="/real-estate/united-arab-emirates" className="hover:text-white transition-colors">
                  United Arab Emirates
                </Link>
              </li>
              <li>
                <Link href="/real-estate/india" className="hover:text-white transition-colors">
                  India Prime Collections
                </Link>
              </li>
              <li>
                <Link href="/real-estate" className="hover:text-white transition-colors">
                  All Destination Territories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Fiduciary Governance & Admin */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest-xl text-gold-400">
              Advisory Governance
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Fiduciary Heritage
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Client Privacy Protocol
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center space-x-1.5 text-xs text-stone-400 hover:text-gold-300 transition-colors pt-2 font-mono"
                >
                  <Lock className="w-3 h-3 text-gold-400" />
                  <span>Authorized Staff Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-4 sm:space-y-0 font-light">
          <div>
            © {new Date().getFullYear()} SG Properties Advisory FZ-LLC / SG Properties Private Wealth. All rights reserved.
          </div>
          <div className="flex space-x-8 text-[11px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/disclosures" className="hover:text-gold-300 transition-colors">Risk Disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
