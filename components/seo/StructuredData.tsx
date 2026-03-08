import { FC } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
}

/**
 * StructuredData component for adding JSON-LD structured data to pages
 *
 * @example
 * <StructuredData data={{
 *   "@context": "https://schema.org",
 *   "@type": "Article",
 *   "headline": "Article Title",
 *   ...
 * }} />
 */
export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

/**
 * Generate Organization schema for root layout
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Healthcare Foresights',
  url: 'https://www.healthcareforesights.com',
  logo: 'https://www.healthcareforesights.com/assets/images/logo.png',
  description: 'Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'support@healthcareforesights.com',
  },
  sameAs: [
    'https://twitter.com/HealthcareForesights',
    'https://www.linkedin.com/company/healthcare-foresights',
  ],
});

/**
 * Generate WebSite schema with search action
 */
export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Healthcare Foresights',
  url: 'https://www.healthcareforesights.com',
  description: 'Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.healthcareforesights.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

/**
 * Generate Article schema for reports, blogs, and press releases
 */
export const generateArticleSchema = (params: {
  type: 'Article' | 'Report' | 'NewsArticle';
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string | string[];
  image?: string;
  keywords?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': params.type,
  headline: params.title,
  description: params.description,
  url: params.url,
  datePublished: params.datePublished,
  dateModified: params.dateModified || params.datePublished,
  author: Array.isArray(params.author)
    ? params.author.map((name) => ({
        '@type': 'Person',
        name,
      }))
    : params.author
    ? {
        '@type': 'Person',
        name: params.author,
      }
    : {
        '@type': 'Organization',
        name: 'Healthcare Foresights',
      },
  publisher: {
    '@type': 'Organization',
    name: 'Healthcare Foresights',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.healthcareforesights.com/assets/images/logo.png',
    },
  },
  ...(params.image && {
    image: {
      '@type': 'ImageObject',
      url: params.image,
    },
  }),
  ...(params.keywords && params.keywords.length > 0 && {
    keywords: params.keywords.join(', '),
  }),
});

/**
 * Generate BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * Generate FAQPage schema
 */
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

/**
 * Generate Product schema for purchasable reports
 * Enables Product snippets and Merchant listings in Google Search
 */
export const generateProductSchema = (params: {
  name: string;
  description: string;
  url: string;
  price: string; // formatted string e.g. "$4,999.00"
  discountedPrice?: string;
  category?: string;
  reportCode?: string;
  keywords?: string[];
  datePublished?: string;
  image?: string;
}) => {
  const parsePrice = (priceStr: string) => parseFloat(priceStr.replace(/[$,]/g, ''));
  const effectivePrice = parsePrice(params.discountedPrice || params.price);

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: params.name,
    description: params.description,
    image: params.image || 'https://www.healthcareforesights.com/assets/images/logo.png',
    brand: {
      '@type': 'Brand',
      name: 'Healthcare Foresights',
    },
    category: params.category || 'Healthcare Market Research Report',
    ...(params.reportCode && { sku: params.reportCode }),
    ...(params.keywords && params.keywords.length > 0 && {
      keywords: params.keywords.join(', '),
    }),
    offers: {
      '@type': 'Offer',
      url: params.url,
      price: effectivePrice,
      priceCurrency: 'USD',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Healthcare Foresights',
        url: 'https://www.healthcareforesights.com',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 0,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '45',
      bestRating: '5',
      worstRating: '1',
    },
  };
};

/**
 * Generate Dataset schema for market research data
 * Enables Data sets rich results in Google Search
 */
export const generateDatasetSchema = (params: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  keywords?: string[];
  temporalCoverage?: string; // e.g. "2024/2032"
  variableMeasured?: string[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: params.name,
  description: params.description,
  url: params.url,
  publisher: {
    '@type': 'Organization',
    name: 'Healthcare Foresights',
    url: 'https://www.healthcareforesights.com',
  },
  creator: {
    '@type': 'Organization',
    name: 'Healthcare Foresights',
  },
  datePublished: params.datePublished,
  license: 'https://www.healthcareforesights.com/legal/terms-of-use',
  ...(params.keywords && params.keywords.length > 0 && {
    keywords: params.keywords.join(', '),
  }),
  ...(params.temporalCoverage && { temporalCoverage: params.temporalCoverage }),
  ...(params.variableMeasured && params.variableMeasured.length > 0 && {
    variableMeasured: params.variableMeasured.map((v) => ({
      '@type': 'PropertyValue',
      name: v,
    })),
  }),
});

/**
 * Generate LocalBusiness schema for the organization
 * Enables Local businesses rich results in Google Search
 */
export const generateLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Healthcare Foresights',
  url: 'https://www.healthcareforesights.com',
  email: 'support@healthcareforesights.com',
  telephone: '+17377342707',
  image: 'https://www.healthcareforesights.com/assets/images/logo.png',
  priceRange: '$$$$',
  description: 'Healthcare Foresights delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.',
  sameAs: [
    'https://twitter.com/HealthcareForesights',
    'https://www.linkedin.com/company/healthcare-foresights',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1333, 701 Tillery Street Unit 12',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    postalCode: '78702',
    addressCountry: 'US',
  },
});
