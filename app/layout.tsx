import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aurum.clinic'),
  title: 'AURUM — The Art of the Perfect Smile',
  description:
    'AURUM is a private luxury dental clinic crafting world-class smiles for executives, performers, and those who expect perfection. Digital smile design, porcelain veneers, guided implants.',
  keywords: [
    'luxury dental clinic',
    'cosmetic dentistry',
    'smile design',
    'porcelain veneers',
    'dental implants',
    'private dentist',
  ],
  openGraph: {
    title: 'AURUM — The Art of the Perfect Smile',
    description:
      'A flagship luxury dental experience. Digital smile design, porcelain veneers, and guided implantology for those who expect perfection.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AURUM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURUM — The Art of the Perfect Smile',
    description: 'A flagship luxury dental experience.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
