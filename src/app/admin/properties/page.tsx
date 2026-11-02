'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { PropertyItem } from '@/types';
import {
  Building2,
  Plus,
  Search,
  CheckCircle,
  Clock,
  Archive,
  ExternalLink,
  Edit,
  Trash2,
} from 'lucide-react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await fetch('/api/admin/properties');
      const json = await res.json();
      if (json.data) {
        setProperties(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/properties', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchProperties();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = properties.filter((p) => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.country.toLowerCase().includes(q) ||
        (p.city && p.city.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-navy-950">
            Properties & Residential Inventory
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage international listings, unit configurations, and publishing statuses.
          </p>
        </div>

        <Link
          href="/admin/properties/new"
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Filter bar */}
      <div className="bg-white border border-stone-200 rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, country, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-stone-50"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50 focus:outline-none focus:ring-1 focus:ring-gold-500"
          >
            <option value="ALL">All Publication States</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Draft Only</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-navy-950 uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Property / Project</th>
                <th className="py-3 px-4">Territory</th>
                <th className="py-3 px-4">Starting Price</th>
                <th className="py-3 px-4">Units / Area</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filtered.map((property) => (
                <tr key={property.id} className="hover:bg-stone-50/75">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-navy-950 text-sm">{property.title}</div>
                    <div className="text-[11px] text-stone-500">
                      {property.developer ? `${property.developer} • ` : ''}
                      Slug: <code className="text-stone-600 bg-stone-100 px-1 py-0.2 rounded">{property.slug}</code>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy-950">
                    <div>{property.country}</div>
                    <div className="text-[11px] text-stone-500">{property.city}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-navy-950">
                    {formatPrice(property.startingPrice, property.currencyCode)}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    <div>{property.units.length} unit configuration(s)</div>
                    <div className="text-[10px] text-stone-500">
                      {property.areaMin} {property.areaUnit}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={property.status}
                      onChange={(e) => handleStatusChange(property.id, e.target.value)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded border focus:outline-none ${
                        property.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : property.status === 'DRAFT'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-stone-100 text-stone-600 border-stone-300'
                      }`}
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/real-estate/${property.countrySlug}/${property.slug}`}
                        target="_blank"
                        title="View Public Page"
                        className="p-1 text-stone-400 hover:text-navy-950"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

