import { NextResponse } from 'next/server';

/**
 * Superseded by `/sitemap.xml`. Kept as a permanent redirect, not removed.
 *
 * This route served its own list of 8 static URLs, each with
 * `lastModified: new Date().toISOString()` — a timestamp that said "changed
 * just now" on every fetch, for pages that had not changed. `/sitemap.xml`
 * (`app/sitemap.ts`) now carries **221** URLs including all 8 of these, with
 * dates that mean something, and `app/robots.ts` advertises that one and only
 * that one.
 *
 * Two sitemaps declaring the same URL with different `priority` and a
 * fabricated `lastmod` is worse than one: a crawler that remembers this path —
 * and Search Console remembers every sitemap ever submitted — keeps being told
 * a different story about the same pages.
 *
 * Verified before this became a redirect (2026-10-18, against the built
 * output): all 8 URLs here appear in `/sitemap.xml`, the homepage as
 * `https://www.neographanalytics.com/` rather than the bare host — the same
 * page, and the trailing-slash form is the one the app itself emits.
 *
 * A 308 rather than a 404 because the path may still be registered somewhere
 * we cannot see. The previous generator is in git history at `ab17fc0`.
 */
export async function GET(request: Request) {
  /* Host-relative: an absolute production URL here sends a preview deployment's
     crawler — and a local verification run — to the live site instead of the
     one being checked. Measured 2026-10-18: with the absolute form,
     `curl -L http://localhost:3102/sitemap-pages.xml` fetched production. */
  return NextResponse.redirect(new URL('/sitemap.xml', request.url), 308);
}
