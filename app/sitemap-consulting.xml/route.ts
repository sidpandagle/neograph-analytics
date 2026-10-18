import { NextResponse } from 'next/server';

/**
 * Superseded by `/sitemap.xml`. Kept as a permanent redirect, not removed.
 *
 * This route served the 10 `/consulting/<slug>` URLs on their own. R-24 added
 * every one of them to `/sitemap.xml`, which `app/robots.ts` advertises as the
 * single sitemap; verified against the built output on 2026-10-18, **10 of 10**
 * of these URLs are in that file.
 *
 * Nothing is lost by redirecting, and leaving it in place meant two sitemaps
 * declaring the same ten URLs with their own `priority` and `lastmod`. The
 * previous generator is in git history at `ef27523`.
 */
export async function GET(request: Request) {
  /* Host-relative: an absolute production URL here sends a preview deployment's
     crawler — and a local verification run — to the live site instead of the
     one being checked. Measured 2026-10-18: with the absolute form,
     `curl -L http://localhost:3102/sitemap-pages.xml` fetched production. */
  return NextResponse.redirect(new URL('/sitemap.xml', request.url), 308);
}
