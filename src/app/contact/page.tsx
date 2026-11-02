import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryForm from '@/components/enquiry/EnquiryForm';
import { Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Contact & Advisory Concierge | SG Properties',
  description:
    'Connect directly with the SG Properties international advisory desks in the UAE and India for bespoke property consultations and investment prospectus briefings.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-navy-950 text-white py-16 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-400">
                Direct Client Desk
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-serif tracking-tight text-stone-100">
                Consult With Our Advisors
              </h1>
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
                Whether you are evaluating UAE tax-free yields, luxury condominiums in Pasig or Cebu, or prime residential estates in India, our senior advisory team is at your service.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Office Locations & Direct Contacts */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-sm border border-stone-200 p-6 space-y-6 shadow-sm">
                <h2 className="text-lg font-bold font-serif text-navy-950 border-b border-stone-200 pb-3">
                  International Advisory Hubs
                </h2>

                {/* UAE Office */}
                <div className="space-y-2 text-xs">
                  <div className="font-bold text-navy-950 text-sm flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>United Arab Emirates (Regional Desk)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-5">
                    Al Saqr Business Tower, Sheikh Zayed Road, Dubai, UAE / RAK Central Free Zone Office, Ras Al Khaimah
                  </p>
                  <div className="pl-5 text-stone-500">
                    Phone: <span className="text-navy-950 font-semibold">+971 4 000 0000</span>
                  </div>
                </div>

                {/* India Office */}
                <div className="space-y-2 text-xs pt-4 border-t border-stone-100">
                  <div className="font-bold text-navy-950 text-sm flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>India (Client Operations)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-5">
                    Bandra-Kurla Complex (BKC), Mumbai, Maharashtra 400051, India
                  </p>
                  <div className="pl-5 text-stone-500">
                    Phone: <span className="text-navy-950 font-semibold">+91 22 0000 0000</span>
                  </div>
                </div>

                {/* Philippines Liaison */}
                <div className="space-y-2 text-xs pt-4 border-t border-stone-100">
                  <div className="font-bold text-navy-950 text-sm flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>Philippines (Developer Liaison)</span>
                  </div>
                  <p className="text-stone-600 leading-relaxed pl-5">
                    Bridgetowne East & Ortigas Center Liaison Desk, Metro Manila, Philippines
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-stone-100 rounded-sm border border-stone-200 p-6 space-y-3 text-xs text-stone-600">
                <div className="flex items-center space-x-2 font-bold text-navy-950">
                  <Clock className="w-4 h-4 text-gold-600" />
                  <span>Advisory Concierge Hours</span>
                </div>
                <p>
                  Monday – Friday: 09:00 to 19:00 GST / IST<br />
                  Saturday: 10:00 to 15:00 (By appointment for private portfolio briefings)<br />
                  Sunday: Closed
                </p>
                <div className="pt-2 flex items-center space-x-1.5 text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Encrypted communication & NDAs available for institutional accounts.</span>
                </div>
              </div>
            </div>

            {/* General Enquiry Form */}
            <div className="lg:col-span-7">
              <EnquiryForm sourceContext="/contact" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

