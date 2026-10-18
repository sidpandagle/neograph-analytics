import Link from 'next/link';
import { marketName } from '@/lib/seo';

export interface DirectoryEntry {
  slug: string;
  title: string;
  category: string;
}

/**
 * Every report as a server-rendered link, grouped by vertical.
 *
 * Why this exists: `/reports` paginates client-side, so the delivered HTML
 * carried **12 of 182** report links (measured against the built
 * `reports.html`, 2026-10-18). Discovery itself is covered by `/sitemap.xml`,
 * which lists all 182 — the loss is internal-linking depth. A report reachable
 * only from a sitemap has exactly one inbound link on the whole site, and a
 * reader with JavaScript off sees a catalogue of twelve.
 *
 * This is a Server Component on purpose: no `"use client"`, no hooks, nothing
 * deferred behind the Suspense boundary that `useSearchParams()` creates in the
 * client listing. It renders from the same `getReportCards()` result the
 * listing already fetches, so it adds no query and no Supabase egress.
 *
 * Anchor text is `marketName()`, the same trim the related-report cards and the
 * social cards use: the stored titles carry tails like "— Growth Drivers,
 * Restraints and Future Outlook 2032", which make 182 near-identical anchors.
 */
export function ReportDirectory({ entries }: { entries: DirectoryEntry[] }) {
  if (!entries.length) return null;

  const byCategory = new Map<string, DirectoryEntry[]>();
  for (const e of entries) {
    const key = e.category?.trim() || 'Other';
    const list = byCategory.get(key);
    if (list) list.push(e);
    else byCategory.set(key, [e]);
  }

  const groups = [...byCategory.entries()]
    .map(([category, list]) => ({
      category,
      list: [...list].sort((a, b) => marketName(a.title).localeCompare(marketName(b.title))),
    }))
    .sort((a, b) => b.list.length - a.list.length || a.category.localeCompare(b.category));

  return (
    <nav
      aria-labelledby="report-directory-heading"
      className="border-t border-[var(--border)] mt-16 pt-12"
    >
      <h2
        id="report-directory-heading"
        className="font-display text-2xl font-bold mb-2 text-[var(--foreground)]"
      >
        All {entries.length} reports by vertical
      </h2>
      <p className="text-sm mb-8 text-[var(--muted-foreground)]">
        The full catalogue, {groups.length} verticals. The filters above search the
        same set.
      </p>

      {/* The link styling lives here, once, as descendant selectors rather
          than on 182 anchors. Measured on the built `reports.html`: the page
          was 199KB before the directory, 313KB with a className on every
          anchor, and **266KB** with the classes hoisted here — so the hoist
          returned 47KB and the whole directory costs 67KB uncompressed,
          33.0KB gzipped for the page, to turn 12 crawlable report links into
          182. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 [&_li]:mt-2 [&_a]:text-sm [&_a]:leading-snug [&_a]:text-[var(--muted-foreground)] [&_a]:underline-offset-2 [&_a:hover]:underline [&_a:hover]:text-[var(--foreground)]">
        {groups.map((g) => (
          <div key={g.category} className="min-w-0">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-[var(--foreground)]">
              {g.category}{' '}
              <span className="font-normal normal-case tracking-normal text-[var(--muted-foreground)]">
                ({g.list.length})
              </span>
            </h3>
            <ul>
              {g.list.map((e) => (
                <li key={e.slug}>
                  <Link href={`/reports/${e.slug}`}>{marketName(e.title)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
