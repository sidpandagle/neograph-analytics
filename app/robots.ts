import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/checkout/',
          '/order-success',
          '/design-system',
          '/request-sample',
          '/admin',
        ],
      },
    ],
    sitemap: 'https://www.neographanalytics.com/sitemap.xml',
  };
}
