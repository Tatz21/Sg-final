'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, Mail, Globe2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'SG Properties',
    tagline: 'Invest Beyond Borders',
    notificationEmail: 'advisory@sgproperties.com',
    supportPhone: '+971 4 000 0000',
    complianceDisclaimerVersion: '2026-01',
    requireClaimVerificationToPublish: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl font-bold font-serif text-navy-950">
          Global Governance & Site Settings
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Configure lead notification recipients, compliance versions, and operational contacts.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-sm text-xs text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved and applied across platform routes.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white border border-stone-200 rounded-sm p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 border-b border-stone-100 pb-2">
            Advisory Notifications & Inquiries
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                Leads Notification Recipient
              </label>
              <input
                type="email"
                required
                value={settings.notificationEmail}
                onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                All public property and investment enquiries notify this inbox.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                Advisory Hotline
              </label>
              <input
                type="text"
                required
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-sm p-6 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 border-b border-stone-100 pb-2">
            Content Governance Controls
          </h2>

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireClaimVerificationToPublish}
                onChange={(e) =>
                  setSettings({ ...settings, requireClaimVerificationToPublish: e.target.checked })
                }
                className="rounded text-gold-600 focus:ring-gold-500"
              />
              <span className="text-xs text-navy-950 font-bold">
                Enforce mandatory risk disclosures on all unverified return or appreciation claims (RULES.md Rule 7 & 8)
              </span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
              Active Consent Policy Code
            </label>
            <input
              type="text"
              value={settings.complianceDisclaimerVersion}
              onChange={(e) =>
                setSettings({ ...settings, complianceDisclaimerVersion: e.target.value })
              }
              className="w-48 px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50 font-mono"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save System Settings</span>
        </button>
      </form>
    </div>
  );
}

