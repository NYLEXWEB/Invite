import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cinzel, Montserrat, Outfit, Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

const greatVibes = Great_Vibes({
  variable: '--font-script',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Inviteo | Premium Digital Invitations',
  description: 'Create and share elegant, luxury digital invitations for weddings, birthdays, anniversaries, and more in minutes.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Inviteo | Premium Digital Invitations',
    description: 'Create beautiful digital invitations in minutes.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Inviteo',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${montserrat.variable} ${outfit.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-luxury-dark">
        {children}
      </body>
    </html>
  );
}
