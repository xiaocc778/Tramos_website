import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema";

const siteConfig = {
  name: 'HeatTech',
  nameZh: '热能科技',
  description: 'Professional water heater manufacturer. Premium water heaters, solar heaters, and boilers for global customers. B2B & B2C supported.',
  descriptionZh: '专业热水器制造商。高品质热水器、太阳能热水器和锅炉，服务全球客户。支持B2B和B2C。',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://heater-shop.vercel.app',
  keywords: 'water heater, solar water heater, gas heater, electric heater, heat pump, boiler, commercial heater, industrial heater',
  keywordsZh: '热水器, 太阳能热水器, 燃气热水器, 电热水器, 空气能热泵, 锅炉, 商用热水器, 工业锅炉',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.description.split('.')[0]}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.png'],
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

const jsonLdSchemas = [
  generateOrganizationSchema(),
  generateWebSiteSchema(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchemas),
          }}
        />
        <Providers>
          <Header />
          <main className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
