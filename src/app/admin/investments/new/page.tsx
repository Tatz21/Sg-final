'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { ArrowLeft, Save, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function NewInvestmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    brand: 'Lapis Investments',
    projectName: '',
    country: 'United Arab Emirates',
    countrySlug: 'united-arab-emirates',
    city: 'Ras Al Khaimah',
    locationText: '',
    description: '',
    minimumAmount: '225000',
    currencyCode: 'INR',
    assetType: 'Waterfront Unit',
    unitType: '1 BHK Waterfront',
    bedrooms: '1',
    areaValue: '800',
    areaUnit: 'sq ft',
    statedReturnValue: '8% Stated Annual Return',
    statedReturnPeriod: 'Annualized',
    statedReturnStartText: 'From Day One (Client-supplied claim)',
    capitalGainsTaxStatement: '0% Capital-Gains Tax (UAE federal framework)',
    projectedAppreciationText: '2.5–3x Projected Capital Appreciation (Marketing projection)',
    handoverText: 'Q4 2028',
    riskDisclosure:
      'IMPORTANT REGULATORY DISCLOSURE: All return rates, tax advantages, timelines, and projected capital gains represent client-supplied statements. Returns are not guaranteed. Past performance does not guarantee future results. This offering does not constitute an officially regulated REIT or registered collective investment scheme until verified and confirmed by jurisdictional financial regulators.',
    legalStructure: 'Direct Fractional Real Estate Co-Ownership',
    regulatoryStatus: 'Under Legal Review',
    isVerified: false,
    status: 'DRAFT',
    imageUrl: '/images/investments/azure-1.jpg',
    imageAlt: '',
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: slugify(val),
      projectName: prev.projectName || val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        brand: form.brand || undefined,
        projectName: form.projectName,
        country: form.country,
        countrySlug: form.countrySlug,
        city: form.city || undefined,
        locationText: form.locationText,
        description: form.description,
        minimumAmount: parseFloat(form.minimumAmount),
        currencyCode: form.currencyCode,
        assetType: form.assetType,
        unitType: form.unitType,
        bedrooms: parseInt(form.bedrooms, 10),
        areaValue: parseFloat(form.areaValue),
        areaUnit: form.areaUnit,
        statedReturnValue: form.statedReturnValue || undefined,
        statedReturnPeriod: form.statedReturnPeriod || undefined,
        statedReturnStartText: form.statedReturnStartText || undefined,
        capitalGainsTaxStatement: form.capitalGainsTaxStatement || undefined,
        projectedAppreciationText: form.projectedAppreciationText || undefined,
        handoverText: form.handoverText || undefined,
        riskDisclosure: form.riskDisclosure,
        legalStructure: form.legalStructure || undefined,
        regulatoryStatus: form.regulatoryStatus || undefined,
        isVerified: form.isVerified,
        status: form.status,
        images: form.imageUrl
          ? [
              {
                id: `img-${Date.now()}`,
                url: form.imageUrl,
                altText: form.imageAlt || form.title,
                caption: `${form.title} architectural view`,
                isCover: true,
              },
            ]
          : [],
      };

      const res = await fetch('/api/admin/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || 'Failed to save offering');
      } else {
        router.push('/admin/investments');
        router.refresh();
      }
    } catch {
      setError('Network communication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="space-y-1">
          <Link
            href="/admin/investments"
            className="text-xs text-stone-500 hover:text-navy-950 flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to investments</span>
          </Link>
          <h1 className="text-2xl font-bold font-serif text-navy-950">Add Investment Offering</h1>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Specs */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 border-b border-stone-100 pb-2">
            1. Investment Offering Title & Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                Offering Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. Azure by Lapis"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Country</label>
              <input
                type="text"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Location Details</label>
              <input
                type="text"
                required
                value={form.locationText}
                onChange={(e) => setForm({ ...form, locationText: e.target.value })}
                placeholder="e.g. RAK Central, Ras Al Khaimah, UAE"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Developer / Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Prospectus Description</label>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
            />
          </div>
        </div>

        {/* Financial & Yield Claims (Governed by RULES.md) */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 flex items-center space-x-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>2. Financial Claims & Yield Verification</span>
            </h2>
            <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
              RULES.md Strict Compliance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Starting Amount</label>
              <input
                type="number"
                required
                value={form.minimumAmount}
                onChange={(e) => setForm({ ...form, minimumAmount: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Currency</label>
              <input
                type="text"
                value={form.currencyCode}
                onChange={(e) => setForm({ ...form, currencyCode: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Stated Return</label>
              <input
                type="text"
                value={form.statedReturnValue}
                onChange={(e) => setForm({ ...form, statedReturnValue: e.target.value })}
                placeholder="e.g. 8% Stated Annual Return"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Handover Schedule</label>
              <input
                type="text"
                value={form.handoverText}
                onChange={(e) => setForm({ ...form, handoverText: e.target.value })}
                placeholder="e.g. Q4 2028"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
              Mandatory Regulatory Risk Disclosure
            </label>
            <textarea
              rows={3}
              required
              value={form.riskDisclosure}
              onChange={(e) => setForm({ ...form, riskDisclosure: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-2 cursor-pointer bg-stone-50 p-3 rounded border border-stone-200">
              <input
                type="checkbox"
                checked={form.isVerified}
                onChange={(e) => setForm({ ...form, isVerified: e.target.checked })}
                className="rounded text-gold-600 focus:ring-gold-500"
              />
              <span className="text-xs text-navy-950 font-bold">
                Officially Verified Offering (Check only if legal prospectus & audit documents are on file)
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Offering...' : 'Save Investment Record'}</span>
        </button>
      </form>
    </div>
  );
}

