'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@sgproperties.com');
  const [password, setPassword] = useState('SGAdmin2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || 'Invalid credentials');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch {
      setError('Connection failure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 selection:bg-gold-500 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-gold-400 to-gold-700 flex items-center justify-center font-bold text-navy-950 text-2xl mx-auto shadow-gold">
            SG
          </div>
          <h1 className="text-2xl font-bold font-serif text-white tracking-wide">
            SG Properties Admin CMS
          </h1>
          <p className="text-xs text-stone-400">
            Secure workspace for authorized staff, editors, and advisory desk
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-navy-900 border border-white/10 rounded-sm p-8 shadow-2xl space-y-6 text-stone-200">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-sm text-xs text-red-400 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Authorized Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-navy-950 border border-white/10 rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1">
                Access Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-navy-950 border border-white/10 rounded-sm text-white focus:outline-none focus:ring-1 focus:ring-gold-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-sm bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-bold uppercase text-xs tracking-wider shadow-gold transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Seed credentials notice */}
          <div className="pt-4 border-t border-white/10 text-[11px] text-stone-400 space-y-1.5">
            <div className="font-semibold text-gold-400 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bootstrap Demo Credentials:</span>
            </div>
            <div>Admin: <code className="text-stone-300 bg-white/5 px-1 py-0.5 rounded">admin@sgproperties.com</code> / <code className="text-stone-300 bg-white/5 px-1 py-0.5 rounded">SGAdmin2026!</code></div>
            <div>Sales: <code className="text-stone-300 bg-white/5 px-1 py-0.5 rounded">sales@sgproperties.com</code> / <code className="text-stone-300 bg-white/5 px-1 py-0.5 rounded">SGSales2026!</code></div>
          </div>
        </div>

        <div className="text-center text-xs text-stone-500">
          <a href="/" className="hover:text-gold-400 transition-colors">
            ← Return to Public Discovery Platform
          </a>
        </div>
      </div>
    </div>
  );
}

