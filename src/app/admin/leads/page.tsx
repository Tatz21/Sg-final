'use client';

import React, { useState, useEffect } from 'react';
import type { LeadItem, LeadStatus } from '@/types';
import {
  Inbox,
  Search,
  Filter,
  Download,
  CheckCircle,
  Clock,
  MessageSquare,
  ShieldCheck,
  Send,
  X,
  User,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';

const STATUS_OPTIONS: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'SITE_VISIT',
  'NEGOTIATION',
  'WON',
  'LOST',
  'SPAM',
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [newNote, setNewNote] = useState<string>('');
  const [noteSubmitting, setNoteSubmitting] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const json = await res.json();
      if (json.data) {
        setLeads(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: LeadStatus) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchLeads();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newNote.trim()) return;

    setNoteSubmitting(true);
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: selectedLead.id, note: newNote }),
      });
      const data = await res.json();
      if (res.ok && data.data) {
        const updatedNotes = [...(selectedLead.internalNotes || []), data.data];
        setSelectedLead({ ...selectedLead, internalNotes: updatedNotes });
        setNewNote('');
        fetchLeads();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setNoteSubmitting(false);
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Channel', 'Subject', 'Status', 'Date'];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      l.preferredContactMethod,
      `"${l.investmentTitle || l.propertyTitle || 'General'}"`,
      l.status,
      new Date(l.createdAt).toLocaleDateString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sg_properties_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'ALL' && lead.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.propertyTitle && lead.propertyTitle.toLowerCase().includes(q)) ||
        (lead.investmentTitle && lead.investmentTitle.toLowerCase().includes(q))
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
            Client Inquiries & Lead Management
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Track inquiries, update pipeline stages, and manage confidential advisor notes.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-white border border-stone-300 hover:bg-stone-50 text-navy-950 font-bold text-xs uppercase tracking-wider rounded-sm shadow-sm transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border border-stone-200 rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, property..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 bg-stone-50"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-stone-300 rounded-sm bg-stone-50 focus:outline-none focus:ring-1 focus:ring-gold-500 font-semibold"
          >
            <option value="ALL">All Pipeline Stages</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-navy-950 uppercase tracking-wider text-[10px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4">Visitor / Contact</th>
                <th className="py-3 px-4">Subject Reference</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className="hover:bg-stone-50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-navy-950 text-sm">{lead.name}</div>
                    <div className="text-[11px] text-stone-500">
                      {lead.email} • {lead.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-navy-950">
                    <div>{lead.investmentTitle || lead.propertyTitle || 'General Enquiry'}</div>
                    {lead.countryOfResidence && (
                      <div className="text-[10px] text-stone-500">
                        Resident of {lead.countryOfResidence}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-semibold text-stone-700 text-[10px]">
                      {lead.preferredContactMethod}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                      <span>{lead.internalNotes?.length || 0}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusUpdate(lead.id, e.target.value as LeadStatus)}
                      className={`text-[11px] font-bold px-2 py-1 rounded border focus:outline-none ${
                        lead.status === 'NEW'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : lead.status === 'QUALIFIED'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="text-xs font-bold text-gold-600 hover:text-gold-700"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal / Slide-over */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xl bg-white h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-bold text-gold-600">
                    Inquiry Record: {selectedLead.id}
                  </span>
                  <h2 className="text-xl font-bold font-serif text-navy-950 mt-0.5">
                    {selectedLead.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 rounded text-stone-400 hover:text-navy-950"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contact Snapshot */}
              <div className="grid grid-cols-2 gap-4 bg-stone-50 p-4 rounded-sm border border-stone-200 text-xs">
                <div>
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Email</div>
                  <div className="font-semibold text-navy-950 mt-0.5">{selectedLead.email}</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Phone</div>
                  <div className="font-semibold text-navy-950 mt-0.5">{selectedLead.phone}</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Preferred Channel</div>
                  <div className="font-semibold text-navy-950 mt-0.5">{selectedLead.preferredContactMethod}</div>
                </div>
                <div>
                  <div className="text-stone-400 text-[10px] uppercase font-bold">Country of Residence</div>
                  <div className="font-semibold text-navy-950 mt-0.5">{selectedLead.countryOfResidence || 'Unspecified'}</div>
                </div>
              </div>

              {/* Subject & Message */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-navy-950">
                  Target Property / Investment:
                </div>
                <div className="text-sm font-semibold text-gold-600 bg-navy-950 px-3 py-2 rounded-sm text-stone-100 flex items-center justify-between">
                  <span>{selectedLead.investmentTitle || selectedLead.propertyTitle || 'General Consultation'}</span>
                  {selectedLead.sourcePath && (
                    <span className="text-[10px] text-stone-400">{selectedLead.sourcePath}</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-navy-950">Client Message:</div>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-sm text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;{selectedLead.message}&rdquo;
                </div>
              </div>

              {/* Internal Notes Section (RULES.md: Strictly confidential) */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase text-navy-950 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Confidential Internal Advisor Notes</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Never visible publicly</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedLead.internalNotes && selectedLead.internalNotes.length > 0 ? (
                    selectedLead.internalNotes.map((n) => (
                      <div key={n.id} className="p-3 bg-stone-100 rounded-sm text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-stone-500 font-bold">
                          <span>{n.authorName}</span>
                          <span>{new Date(n.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-stone-700 leading-relaxed">{n.body}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-stone-400 italic">No advisor notes recorded yet.</div>
                  )}
                </div>

                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    placeholder="Log client call outcome, investor qualification, or brochure dispatch..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500"
                  />
                  <button
                    type="submit"
                    disabled={noteSubmitting || !newNote.trim()}
                    className="px-3 py-1.5 bg-navy-950 text-gold-400 text-xs font-bold uppercase rounded-sm hover:bg-navy-900 disabled:opacity-50 flex items-center space-x-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Add Internal Note</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              <span className="text-[10px] text-stone-400">
                Consent recorded: {selectedLead.consentVersion}
              </span>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-stone-200 text-stone-700 text-xs font-bold uppercase rounded-sm hover:bg-stone-300"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

