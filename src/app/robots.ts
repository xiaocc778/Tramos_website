import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tramos-site.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
