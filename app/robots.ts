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
        ],
      },
    ],
    sitemap: 'https://www.neographanalytics.com/sitemap.xml',
  };
}
