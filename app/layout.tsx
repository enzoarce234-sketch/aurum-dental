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
  title: 'AURUM — El Arte de la Sonrisa Perfecta',
  description:
    'AURUM es una clínica dental privada de lujo que crea sonrisas de clase mundial para ejecutivos, artistas y quienes esperan la perfección. Diseño digital de sonrisa, carillas de porcelana e implantes guiados.',
  keywords: [
    'clínica dental de lujo',
    'odontología estética',
    'diseño de sonrisa',
    'carillas de porcelana',
    'implantes dentales',
    'dentista privado',
  ],
  openGraph: {
    title: 'AURUM — El Arte de la Sonrisa Perfecta',
    description:
      'Una experiencia dental de lujo insignia. Diseño digital de sonrisa, carillas de porcelana e implantología guiada para quienes esperan la perfección.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'AURUM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURUM — El Arte de la Sonrisa Perfecta',
    description: 'Una experiencia dental de lujo insignia.',
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
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
