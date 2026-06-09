import type { Article, Product } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tramos-site.vercel.app';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tramos',
    alternateName: 'Tramos Water Heating',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'Manufacturer of electric, gas, solar, heat pump, and commercial hot water systems for global B2B buyers.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shunde District',
      addressLocality: 'Foshan',
      addressRegion: 'Guangdong',
      postalCode: '528300',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-400-888-8888',
      email: 'sales@tramos-heating.com',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
  };
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name_en,
    alternateName: product.name_zh,
    description: product.description_en,
    image: product.images,
    url: `${baseUrl}/products/${product.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Tramos',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability:
        product.stock_status === 'in_stock'
          ? 'https://schema.org/InStock'
          : product.stock_status === 'low_stock'
            ? 'https://schema.org/LowStock'
            : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Tramos',
      },
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Article[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.title_en,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.content_en,
      },
    })),
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tramos',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
