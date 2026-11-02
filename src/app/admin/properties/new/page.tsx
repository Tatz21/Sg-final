'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import type { UnitConfig } from '@/types';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    projectName: '',
    country: 'Philippines',
    countrySlug: 'philippines',
    city: '',
    developer: '',
    address: '',
    propertyType: 'Luxury Condominium',
    listingType: 'Sale',
    startingPrice: '',
    currencyCode: 'PHP',
    areaMin: '',
    areaMax: '',
    areaUnit: 'sqm',
    bedroomsMin: '1',
    bedroomsMax: '3',
    summary: '',
    description: '',
    status: 'DRAFT',
    imageUrl: '/images/properties/lepont-1.jpg',
    imageAlt: '',
  });

  const [units, setUnits] = useState<UnitConfig[]>([
    {
      id: 'unit-1',
      label: '1-Bedroom Suite',
      bedrooms: 1,
      bathrooms: 1,
      areaValue: 46,
      areaUnit: 'sqm',
      price: 14500000,
      currencyCode: 'PHP',
      availabilityStatus: 'Available',
      description: 'Balcony with city orientation',
    },
  ]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: slugify(val),
      projectName: prev.projectName || val,
    }));
  };

  const addUnit = () => {
    setUnits([
      ...units,
      {
        id: `unit-${Date.now()}`,
        label: 'New Unit Configuration',
        bedrooms: 2,
        bathrooms: 2,
        areaValue: 90,
        areaUnit: form.areaUnit,
        price: null,
        currencyCode: form.currencyCode,
        availabilityStatus: 'Available',
      },
    ]);
  };

  const removeUnit = (index: number) => {
    setUnits(units.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        projectName: form.projectName,
        country: form.country,
        countrySlug: form.countrySlug,
        city: form.city || undefined,
        developer: form.developer || undefined,
        address: form.address || undefined,
        propertyType: form.propertyType,
        listingType: form.listingType,
        startingPrice: form.startingPrice ? parseFloat(form.startingPrice) : null,
        currencyCode: form.currencyCode,
        areaMin: form.areaMin ? parseFloat(form.areaMin) : null,
        areaMax: form.areaMax ? parseFloat(form.areaMax) : null,
        areaUnit: form.areaUnit,
        bedroomsMin: form.bedroomsMin ? parseInt(form.bedroomsMin, 10) : null,
        bedroomsMax: form.bedroomsMax ? parseInt(form.bedroomsMax, 10) : null,
        summary: form.summary,
        description: form.description,
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
        units,
      };

      const res = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error?.message || 'Failed to save property');
      } else {
        router.push('/admin/properties');
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
            href="/admin/properties"
            className="text-xs text-stone-500 hover:text-navy-950 flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to properties</span>
          </Link>
          <h1 className="text-2xl font-bold font-serif text-navy-950">Add New Property</h1>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Overview */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 border-b border-stone-100 pb-2">
            1. Property Overview & Slug
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                Property Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. LePont Residences"
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
              <select
                value={form.country}
                onChange={(e) => {
                  const c = e.target.value;
                  const slug = c.toLowerCase().replace(/\s+/g, '-');
                  const curr = c === 'Philippines' ? 'PHP' : c === 'India' ? 'INR' : 'AED';
                  setForm({ ...form, country: c, countrySlug: slug, currencyCode: curr });
                }}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              >
                <option value="Philippines">Philippines</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="India">India</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">City / Region</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="e.g. Pasig City"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Developer</label>
              <input
                type="text"
                value={form.developer}
                onChange={(e) => setForm({ ...form, developer: e.target.value })}
                placeholder="e.g. RLC Residences"
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Short Summary</label>
            <input
              type="text"
              required
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              placeholder="High-level architectural summary..."
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Description</label>
            <textarea
              rows={4}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
            />
          </div>
        </div>

        {/* Pricing & Units */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 border-b border-stone-100 pb-2">
            2. Pricing, Dimensions & Units
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Starting Price</label>
              <input
                type="number"
                value={form.startingPrice}
                onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
                placeholder="e.g. 14500000"
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
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Area Unit</label>
              <select
                value={form.areaUnit}
                onChange={(e) => setForm({ ...form, areaUnit: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              >
                <option value="sqm">sqm</option>
                <option value="sq ft">sq ft</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">Min/Max Area</label>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={form.areaMin}
                  onChange={(e) => setForm({ ...form, areaMin: e.target.value })}
                  className="w-1/2 px-2 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={form.areaMax}
                  onChange={(e) => setForm({ ...form, areaMax: e.target.value })}
                  className="w-1/2 px-2 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
                />
              </div>
            </div>
          </div>

          {/* Unit Configurations Builder */}
          <div className="pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-navy-950">
                Unit Configurations Breakdown
              </span>
              <button
                type="button"
                onClick={addUnit}
                className="text-xs text-gold-600 hover:text-gold-700 font-bold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Unit Mix</span>
              </button>
            </div>

            <div className="space-y-3">
              {units.map((unit, idx) => (
                <div
                  key={unit.id}
                  className="p-3 bg-stone-50 border border-stone-200 rounded-sm grid grid-cols-1 sm:grid-cols-5 gap-3 items-center text-xs"
                >
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Unit Label (e.g. 2-Bedroom Executive)"
                      value={unit.label}
                      onChange={(e) => {
                        const copy = [...units];
                        copy[idx].label = e.target.value;
                        setUnits(copy);
                      }}
                      className="w-full px-2 py-1.5 border border-stone-300 rounded-sm bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder={`Area (${form.areaUnit})`}
                      value={unit.areaValue}
                      onChange={(e) => {
                        const copy = [...units];
                        copy[idx].areaValue = parseFloat(e.target.value) || 0;
                        setUnits(copy);
                      }}
                      className="w-full px-2 py-1.5 border border-stone-300 rounded-sm bg-white"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Price"
                      value={unit.price || ''}
                      onChange={(e) => {
                        const copy = [...units];
                        copy[idx].price = e.target.value ? parseFloat(e.target.value) : null;
                        setUnits(copy);
                      }}
                      className="w-full px-2 py-1.5 border border-stone-300 rounded-sm bg-white"
                    />
                  </div>
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => removeUnit(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media & Publication */}
        <div className="bg-white p-6 rounded-sm border border-stone-200 space-y-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-navy-950 border-b border-stone-100 pb-2">
            3. Media & Publication State
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                Featured Cover Image URL
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-navy-950 mb-1">
                Publication Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50 font-bold"
              >
                <option value="DRAFT">Save as Draft (Safe default)</option>
                <option value="PUBLISHED">Publish to Public Platform</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Property...' : 'Save Property Record'}</span>
        </button>
      </form>
    </div>
  );
}

