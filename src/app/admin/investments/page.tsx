'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import type { InvestmentOfferingItem } from '@/types';
import {
  TrendingUp,
  Plus,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Edit,
  BadgeAlert,
} from 'lucide-react';

export default function AdminInvestmentsPage() {
  const [investments, setInvestments] = useState<InvestmentOfferingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    try {
      const res = await fetch('/api/admin/investments');
      const json = await res.json();
      if (json.data) {
        setInvestments(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/investments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchInvestments();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif text-navy-950">
            REITs & Investment Offerings
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage institutional yield assets, return disclosures, and regulatory claim reviews.
          </p>
        </div>

        <Link
          href="/admin/investments/new"
          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Investment Offering</span>
        </Link>
      </div>

      {/* Offerings Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-navy-950 uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Offering / Project</th>
                <th className="py-3 px-4">Territory / Brand</th>
                <th className="py-3 px-4">Starting Amount</th>
                <th className="py-3 px-4">Stated Return & Tax Claim</th>
                <th className="py-3 px-4">Verification Audit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {investments.map((inv) => (
                <tr key={inv.id} className="hover:bg-stone-50/75">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-navy-950 text-sm">{inv.title}</div>
                    <div className="text-[11px] text-stone-500">
                      Slug: <code className="text-stone-600 bg-stone-100 px-1 py-0.2 rounded">{inv.slug}</code>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy-950">
                    <div>{inv.country}</div>
                    <div className="text-[11px] text-stone-500">{inv.brand || 'Direct Asset'}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-navy-950">
                    {formatPrice(inv.minimumAmount, inv.currencyCode)}
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    <div className="font-bold text-emerald-700">{inv.statedReturnValue || 'Pending'}</div>
                    <div className="text-[10px] text-stone-500">{inv.capitalGainsTaxStatement || 'Tax note pending'}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    {inv.isVerified ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center space-x-1 w-max">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300 flex items-center space-x-1 w-max">
                        <BadgeAlert className="w-3 h-3" />
                        <span>Client Claim (Audit Pending)</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={inv.status}
                      onChange={(e) => handleStatusChange(inv.id, e.target.value)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded border focus:outline-none ${
                        inv.status === 'PUBLISHED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="PUBLISHED">Published</option>
                      <option value="DRAFT">Draft</option>
                      <option value="ARCHIVED">Archived</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/reits/${inv.slug}`}
                      target="_blank"
                      title="Inspect Public Offering"
                      className="p-1 text-stone-400 hover:text-navy-950 inline-block"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
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

