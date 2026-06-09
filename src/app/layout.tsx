import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Providers } from '@/components/providers';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/schema';

const siteConfig = {
  name: 'Tramos',
  description:
    'Professional water heater manufacturer for global buyers. Electric, gas, solar, heat pump, and commercial hot water systems with OEM/ODM support.',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://tramos-site.vercel.app',
  keywords:
    'Tramos, water heater manufacturer, electric water heater, gas water heater, solar water heater, heat pump water heater, commercial hot water system, OEM ODM water heater',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Professional Water Heater Manufacturer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: [
      { url: '/images/logo/1.png', type: 'image/png' },
    ],
    shortcut: '/images/logo/1.png',
    apple: '/images/logo/1.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'zh_CN',
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Professional Water Heater Manufacturer`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: '/images/logo/3.png',
        width: 2048,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/images/logo/3.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdSchemas = [generateOrganizationSchema(), generateWebSiteSchema()];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas),
          }}
        />
        <Providers>
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
