import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.neographanalytics.com',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap-reports-:page.xml',
          destination: '/api/sitemap-reports/:page',
        },
        {
          source: '/sitemap-blogs-:page.xml',
          destination: '/api/sitemap-blogs/:page',
        },
        {
          source: '/sitemap-press-releases-:page.xml',
          destination: '/api/sitemap-press-releases/:page',
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'neographanalytics.com',
          },
        ],
        destination: 'https://www.neographanalytics.com/:path*',
        permanent: true,
      },
      {
        // There is no /consulting page, only /consulting/[slug]. /services is
        // the hub that the navigation already points at, so send the bare
        // path there instead of leaving an advertised URL returning 404.
        source: '/consulting',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;