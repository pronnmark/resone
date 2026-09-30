import type { Metadata, Viewport } from 'next';
import { Tenor_Sans } from 'next/font/google';
import './globals.css';

// Tenor Sans ships one weight (400). Hierarchy is size, tracking, case, colour, never weight.
const tenor = Tenor_Sans({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-tenor' });

const title = "Résone — Artisanes du textile | Abidjan, Côte d'Ivoire";
const description =
  "Résone, entreprise de création et de conseil artistique. Artisanat textile, direction artistique, ingénierie créative et innovation scénographique.";

export const metadata: Metadata = {
  metadataBase: new URL('https://resone.hostbun.cc'),
  authors: [{ name: 'Résone' }],
  title,
  description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Résone',
    title,
    description,
    images: ['/img/oeuvres/ivresse-ecarlate.jpg'],
  },
};

export const viewport: Viewport = { themeColor: '#EAE9E5' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={tenor.variable}>
      <body>{children}</body>
    </html>
  );
}
