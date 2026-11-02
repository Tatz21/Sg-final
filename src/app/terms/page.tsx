import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service | SG Properties',
  description: 'Terms of service and website usage rules for SG Properties.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="border-b border-stone-200 pb-6 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600 flex items-center space-x-1.5">
              <FileText className="w-4 h-4" />
              <span>Platform Terms</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
              Terms of Service
            </h1>
            <p className="text-xs text-stone-500">Effective Date: January 2026</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-sm p-8 space-y-6 text-xs text-stone-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please refrain from using the platform.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                2. Information Accuracy and Non-Reliance
              </h2>
              <p>
                SG Properties takes reasonable steps to verify developer facts, plans, and specifications. However, renderings, floor plans, dimensions, availability, and prices remain subject to change by respective developers without notice. No information on this website constitutes a binding offer or contract.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                3. Intellectual Property
              </h2>
              <p>
                All trademarks, logos, architectural visuals, and content on this website are the property of SG Properties or licensed by developer partners. Unauthorized reproduction or scraping is prohibited.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider">
                4. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the operating jurisdiction of SG Properties advisory contracts.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

