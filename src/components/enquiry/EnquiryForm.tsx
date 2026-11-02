'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import type { ContactMethod } from '@/types';

interface EnquiryFormProps {
  propertySlug?: string;
  propertyTitle?: string;
  investmentSlug?: string;
  investmentTitle?: string;
  sourceContext?: string;
}

export default function EnquiryForm({
  propertySlug,
  propertyTitle,
  investmentSlug,
  investmentTitle,
  sourceContext,
}: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryOfResidence: '',
    preferredContactMethod: 'WHATSAPP' as ContactMethod,
    message: investmentTitle
      ? `I would like to receive the investment prospectus and verify the financial structure for ${investmentTitle}.`
      : propertyTitle
      ? `I am interested in exploring available unit configurations and payment schedules for ${propertyTitle}.`
      : 'I would like to speak with a senior SG Properties advisor regarding international opportunities.',
    consent: false,
    botCheck: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setGlobalError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        countryOfResidence: formData.countryOfResidence || undefined,
        preferredContactMethod: formData.preferredContactMethod,
        message: formData.message,
        consent: formData.consent,
        consentVersion: '2026-01',
        propertySlug: propertySlug || undefined,
        investmentSlug: investmentSlug || undefined,
        botCheck: formData.botCheck,
        sourcePath: sourceContext || (propertySlug ? `/real-estate/${propertySlug}` : '/reits'),
      };

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.fieldErrors) {
          setFieldErrors(data.error.fieldErrors);
        }
        setGlobalError(data.error?.message || 'Please review and correct the form fields.');
      } else {
        setSuccess(true);
        setSuccessMessage(data.message || 'Thank you for your enquiry. Our advisory desk will contact you.');
      }
    } catch {
      setGlobalError('Connection failure. Please try submitting again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-navy-950 text-white border border-gold-500/40 rounded-sm p-8 sm:p-10 text-center space-y-5 shadow-luxury">
        <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-400 border border-gold-400/40 flex items-center justify-center mx-auto shadow-luxury-gold">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-400 block">
            Advisory Dossier Dispatched
          </span>
          <h3 className="text-2xl font-bold font-serif text-white">
            Enquiry Confirmed
          </h3>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed max-w-sm mx-auto font-light">
          {successMessage}
        </p>
        <div className="pt-3 border-t border-white/10 text-[11px] text-stone-400 flex items-center justify-center space-x-1.5 font-light">
          <Lock className="w-3.5 h-3.5 text-gold-400" />
          <span>Fiduciary confidentiality secured under strict client privacy protocols.</span>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-200/90 rounded-sm p-7 sm:p-9 space-y-6 shadow-luxury"
    >
      <div className="border-b border-stone-200 pb-4">
        <span className="text-[10px] tracking-widest-xl uppercase font-bold text-gold-600 block">
          Confidential Consultation Desk
        </span>
        <h3 className="text-2xl font-bold text-navy-950 font-serif mt-0.5">
          {investmentTitle ? `Enquire on ${investmentTitle}` : propertyTitle ? `Request Details for ${propertyTitle}` : 'Connect with Advisory Desk'}
        </h3>
        <p className="text-xs text-stone-500 mt-1 font-light leading-relaxed">
          Receive confidential floorplans, developer allocation pricing, or verified REIT prospectus briefings.
        </p>
      </div>

      {globalError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-red-700 flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <input
        type="text"
        name="botCheck"
        value={formData.botCheck}
        onChange={(e) => setFormData({ ...formData, botCheck: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Name */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-950 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g. Vikram Malhotra"
          className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-stone-50/50"
        />
        {fieldErrors.name && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.name[0]}</p>
        )}
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-950 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="client@domain.com"
            className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-stone-50/50"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.email[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-950 mb-1.5">
            Mobile / Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 98200 12345 or +971 ..."
            className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-stone-50/50"
          />
          {fieldErrors.phone && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.phone[0]}</p>
          )}
        </div>
      </div>

      {/* Preferred Contact Method Pills */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-950 mb-2">
          Preferred Response Channel
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['WHATSAPP', 'EMAIL', 'PHONE'] as ContactMethod[]).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setFormData({ ...formData, preferredContactMethod: method })}
              className={`py-2 px-3 text-xs font-bold rounded-sm border uppercase tracking-wider transition-all ${
                formData.preferredContactMethod === method
                  ? 'bg-navy-950 text-gold-300 border-navy-950 shadow-sm'
                  : 'bg-stone-50 text-stone-600 border-stone-300 hover:bg-stone-100'
              }`}
            >
              {method === 'WHATSAPP' ? 'WhatsApp' : method === 'EMAIL' ? 'Email' : 'Direct Call'}
            </button>
          ))}
        </div>
      </div>

      {/* Country of Residence */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-950 mb-1.5">
          Country of Residence
        </label>
        <input
          type="text"
          value={formData.countryOfResidence}
          onChange={(e) => setFormData({ ...formData, countryOfResidence: e.target.value })}
          placeholder="e.g. India, UAE, Singapore, United Kingdom"
          className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-stone-50/50"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-navy-950 mb-1.5">
          Specific Investment or Layout Questions <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3.5 py-2.5 text-xs border border-stone-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 bg-stone-50/50"
        />
        {fieldErrors.message && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.message[0]}</p>
        )}
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start space-x-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            className="mt-0.5 rounded text-gold-600 focus:ring-gold-500"
          />
          <span className="text-[11px] text-stone-600 leading-relaxed font-light">
            I consent to SG Properties collecting my details to provide unit availability, verified financial structures, and developer updates per the{' '}
            <a href="/privacy" target="_blank" className="underline text-navy-950 font-medium">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p className="text-xs text-red-600 mt-1">{fieldErrors.consent[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-4 rounded-sm bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-extrabold uppercase text-xs tracking-widest-xl shadow-luxury-gold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{loading ? 'Transmitting Request...' : 'Submit Confidential Enquiry'}</span>
      </button>

      <div className="text-center text-[10px] text-stone-400 flex items-center justify-center space-x-1.5 font-light">
        <Lock className="w-3 h-3 text-gold-500" />
        <span>256-Bit Encrypted Advisory Channel • Zero Third-Party Brokers</span>
      </div>
    </form>
  );
}
