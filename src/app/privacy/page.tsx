import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Lock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | SG Properties',
  description: 'SG Properties privacy policy, client data protection standards, and GDPR / DPDP compliance.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-stone-200 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600 flex items-center space-x-1.5">
              <Lock className="w-4 h-4" />
              <span>Data Protection Standard</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
              Privacy Policy
            </h1>
            <p className="text-xs text-stone-500">
              Effective Date: January 2026 • Policy Version: 2026-01
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-sm p-8 space-y-6 text-xs text-stone-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                1. Information We Collect
              </h2>
              <p>
                SG Properties collects personal information strictly when visitors submit an advisory enquiry through our web forms. This includes: full name, email address, international telephone/mobile number, country of residence, preferred contact method (WhatsApp, Email, Phone), and enquiry message context.
              </p>
              <p>
                We do not collect payment card information, passports, or private financial credentials through our public web forms.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                2. Use of Information
              </h2>
              <p>
                Your contact details are used solely by authorized SG Properties advisors to respond to your specific property inquiry, supply developer brochures, verify buyer qualification, and schedule private appointments. We never sell, lease, or monetize client contact data with third-party advertising brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                3. Lead Security & Internal Notes
              </h2>
              <p>
                Leads are stored in encrypted databases protected by role-based access control (RBAC). Internal advisory notes and follow-up records are strictly restricted to assigned personnel and are never exposed publicly.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                4. Data Subject Rights & Contact
              </h2>
              <p>
                Under applicable global data regulations, you have the right to request access to, correction of, or permanent deletion of your contact records. To exercise these rights, email our data governance officer at{' '}
                <a href="mailto:privacy@sgproperties.com" className="text-gold-600 font-bold underline">
                  privacy@sgproperties.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

