import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SG Properties — Invest Beyond Borders | Curated REITs & Global Real Estate',
  description:
    'A premier architectural platform for high-yield REIT assets and luxury international property discovery across the UAE, Philippines, India, and global capital markets.',
  keywords: [
    'SG Properties',
    'international real estate investment',
    'luxury property discovery',
    'REITs UAE',
    'Azure by Lapis',
    'LePont RLC Residences',
    'Mantawi Residences Cebu',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sgproperties.com'),
  openGraph: {
    title: 'SG Properties — Invest Beyond Borders',
    description: 'Cinematic discovery for premier international properties and high-yield REITs.',
    siteName: 'SG Properties',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Nunito:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased text-navy-950 bg-stone-25 selection:bg-gold-500 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}
