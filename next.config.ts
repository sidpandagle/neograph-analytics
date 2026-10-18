import type { NextConfig } from "next";

/**
 * Build output directory.
 *
 * Why this is overridable: more than one agent session works this branch at a
 * time, and `next dev` rewrites `.next` continuously. A `next build` racing a
 * dev server over the same directory fails mid-export with
 * `PageNotFoundError: Cannot find module for page: /reports/[slug]/page` —
 * observed 2026-10-18 12:25 IST against a `next dev -p 3101` started at 12:22.
 * The failure looks like a defect in the page it names and is not one.
 *
 * `NEXT_DIST_DIR=.next-verify npm run build` gives a verification build its own
 * directory. Unset, the default `.next` is used, so production builds and
 * Vercel are untouched.
 *
 * One side effect to know about: `next build` rewrites `tsconfig.json`, adding
 * `<distDir>/types/**\/*.ts` to `include` and reformatting the whole file.
 * That edit is session-local and must not be committed — run
 * `git checkout -- tsconfig.json` after a verification build.
 */
const distDir = process.env.NEXT_DIST_DIR || '.next';

const nextConfig: NextConfig = {
  distDir,
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