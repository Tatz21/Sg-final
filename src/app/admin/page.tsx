import React from 'react';
import Link from 'next/link';
import { repository } from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import {
  Inbox,
  Building2,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Sparkles,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const leads = repository.getLeads();
  const properties = repository.getProperties();
  const investments = repository.getInvestments();
  const newLeads = leads.filter((l) => l.status === 'NEW');
  const publishedProps = properties.filter((p) => p.status === 'PUBLISHED');

  return (
    <div className="p-8 space-y-8 max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
            Advisory Command Center
          </span>
          <h1 className="text-3xl font-bold font-serif text-navy-950 mt-1">
            Global Portfolio & Inbound Desk
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-light">
            Real-time pipeline monitoring, verified inventory counts, and institutional asset governance.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/properties/new"
            className="px-4 py-2.5 bg-navy-950 hover:bg-navy-900 text-gold-400 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Property</span>
          </Link>
          <Link
            href="/admin/investments/new"
            className="px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-sm shadow-luxury-gold transition-colors flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Investment</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
            <span>New Enquiries</span>
            <div className="w-8 h-8 rounded-sm bg-amber-50 text-amber-700 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-navy-950 font-serif">
            {newLeads.length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Awaiting senior advisor follow-up</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
            <span>Total Leads</span>
            <div className="w-8 h-8 rounded-sm bg-navy-50 text-navy-950 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-navy-950 font-serif">
            {leads.length}
          </div>
          <div className="text-[11px] text-stone-500 font-light">
            Across UAE, Philippines, and India
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
            <span>Published Properties</span>
            <div className="w-8 h-8 rounded-sm bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-navy-950 font-serif">
            {publishedProps.length}
          </div>
          <div className="text-[11px] text-stone-500 font-light">
            {properties.length} total inventory records
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
            <span>REIT Portfolios</span>
            <div className="w-8 h-8 rounded-sm bg-gold-50 text-gold-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-navy-950 font-serif">
            {investments.length}
          </div>
          <div className="text-[11px] text-amber-700 font-semibold">
            1 Under Mandatory Legal Audit
          </div>
        </div>
      </div>

      {/* Content Verification & Fiduciary Governance Panel */}
      <div className="bg-white rounded-sm border border-stone-200 p-7 space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-gold-600" />
            <h2 className="text-lg font-bold font-serif text-navy-950">
              Content Integrity & Statutory Review Checklist
            </h2>
          </div>
          <span className="text-[10px] tracking-widest-xl uppercase font-bold text-navy-950 bg-stone-100 px-3 py-1 rounded">
            RULES.md Enforcement
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-sm space-y-2.5">
            <div className="flex items-center justify-between font-bold text-amber-950">
              <span className="text-sm font-serif">Azure by Lapis (RAK Central, UAE)</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                Client Marketing Claims
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed font-light">
              Entry amount ₹225,000, 8% stated return, 0% tax, and 2.5–3x appreciation are safely presented with prominent risk banners until developer prospectus filings are confirmed.
            </p>
          </div>

          <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-sm space-y-2.5">
            <div className="flex items-center justify-between font-bold text-amber-950">
              <span className="text-sm font-serif">Boracay Island Condominium Opportunity</span>
              <span className="px-2.5 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                Pending Verification
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed font-light">
              Developer registration, unit allocations, unit mix, handover schedules, and formal pricing remain marked as pending; public listing safely accepts pre-launch briefs only.
            </p>
          </div>
        </div>
      </div>

      {/* Inbound Enquiries Table */}
      <div className="bg-white rounded-sm border border-stone-200 shadow-sm p-7 space-y-5">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-navy-950">
              Recent Inbound Enquiries
            </h2>
            <p className="text-xs text-stone-500 mt-0.5 font-light">
              Visitor leads received across public property and REIT enquiry channels.
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-bold uppercase tracking-wider text-gold-600 hover:text-gold-700 flex items-center space-x-1"
          >
            <span>Open Lead Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-navy-950 uppercase tracking-wider text-[10px] border-y border-stone-200 font-bold">
              <tr>
                <th className="py-3.5 px-4">Client Contact</th>
                <th className="py-3.5 px-4">Target Asset</th>
                <th className="py-3.5 px-4">Channel</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4">Submitted</th>
                <th className="py-3.5 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {leads.slice(0, 5).map((lead) => (
                <tr key={lead.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-navy-950 text-sm font-serif">{lead.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      {lead.email} • {lead.phone}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-navy-950">
                    <div>{lead.investmentTitle || lead.propertyTitle || 'General Advisory Consultation'}</div>
                    {lead.countryOfResidence && (
                      <div className="text-[10px] text-stone-500 font-normal">
                        Residence: {lead.countryOfResidence}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded bg-stone-100 border border-stone-200 font-bold text-stone-700 text-[10px]">
                      {lead.preferredContactMethod}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        lead.status === 'NEW'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : lead.status === 'QUALIFIED'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-stone-100 text-stone-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-stone-500 text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href="/admin/leads"
                      className="text-gold-600 hover:text-gold-700 font-bold text-xs uppercase tracking-wider"
                    >
                      Inspect →
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
