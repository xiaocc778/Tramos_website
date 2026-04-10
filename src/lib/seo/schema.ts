import type { Product, Article } from '@/types';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HeatTech Water Heaters',
    alternateName: '热能科技',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://heatertech.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://heatertech.com'}/logo.png`,
    description: 'Leading manufacturer of water heaters including gas, electric, solar, and heat pump systems.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'RongGui Street, Shunde District',
      addressLocality: 'Foshan',
      addressRegion: 'Guangdong',
      postalCode: '528300',
      addressCountry: 'CN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-400-888-8888',
      contactType: 'sales',
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: [
      'https://www.facebook.com/heatertech',
      'https://www.instagram.com/heatertech',
      'https://www.linkedin.com/company/heatertech',
    ],
  };
}

export function generateProductSchema(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://heatertech.com';

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
      name: 'HeatTech',
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stock_status === 'in_stock'
        ? 'https://schema.org/InStock'
        : product.stock_status === 'low_stock'
          ? 'https://schema.org/LowStock'
          : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'HeatTech Water Heaters',
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
    mainEntity: faqs.map(faq => ({
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
    name: 'HeatTech Water Heaters',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://heatertech.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_APP_URL || 'https://heatertech.com'}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
