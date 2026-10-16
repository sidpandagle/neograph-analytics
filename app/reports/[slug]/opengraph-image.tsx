import { ImageResponse } from 'next/og';
import { getReportBySlugFull, getReportSlugs } from '@/lib/supabaseReports';
import { marketValue } from '@/lib/format';

/**
 * Per-report social card.
 *
 * Every report shared a single stock photo — `/assets/images/mr.webp` — as its
 * `og:image`, so 152 distinct reports looked identical in a Slack unfurl, a
 * LinkedIn post or an X card. This renders the figures instead: the market
 * name, the base-year value, the forecast value and the rate. Those four
 * numbers are the report's content, and they are what makes a link worth
 * opening.
 *
 * Generated at build time alongside the page (same `generateStaticParams`), so
 * there is no image host, no egress and no transformation quota — the standing
 * constraint that keeps Cloudflare and Supabase inside their free tiers.
 *
 * No external font is fetched: a build that reaches out to Google Fonts for
 * every one of 152 images is slow and fails closed on a flaky network. The
 * system stack renders fine at this size.
 */
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'NeoGraph Analytics research report';

export async function generateStaticParams() {
  const slugs = await getReportSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getReportBySlugFull(slug);

  /* Keep the market's name and the word "Market" and drop the tail. Corpus
     titles carry several — "Market Size, Share & Forecast 2026-2032", "Market —
     Growth Drivers, Restraints and Future Outlook 2032", "Market Size and
     Trends Analysis" — so the cut is made at the end of the first whole word
     "Market" rather than by matching each tail.

     The pattern is built from a character class, not a word-boundary escape:
     the escapes here were once written through a tool that turned a
     backslash-b into a literal backspace (U+0008), so the pattern matched
     nothing and every card rendered the untrimmed title. The PNG came back
     byte-identical after a rebuild, which is what gave it away. */
  const MARKET_WORD = new RegExp('(^|[^A-Za-z])Market([^A-Za-z]|$)', 'i');
  const rawTitle = report?.title ?? '';
  const marketMatch = MARKET_WORD.exec(rawTitle);
  const title =
    (marketMatch
      ? rawTitle.slice(0, marketMatch.index + marketMatch[0].indexOf('Market') + 6)
      : rawTitle
    ).replace(/\s+/g, ' ').trim() || 'Market Research';
  const industry = report?.industry ?? 'Healthcare';
  const base = report ? marketValue(report.market_size?.current_value, report.unit) : '';
  const forecast = report ? marketValue(report.market_size?.forecast_value, report.unit) : '';
  const cagr = typeof report?.market_size?.cagr === 'number' ? `${report.market_size.cagr}%` : '';
  const period = report?.forecast_period ?? '';
  const baseYear = report?.base_year ? String(report.base_year) : '';
  const endYear = period.split(/[-–]/)[1]?.trim() ?? '';

  const figures = [
    base && base !== '—' ? { label: baseYear ? `Base ${baseYear}` : 'Base', value: base } : null,
    forecast && forecast !== '—' ? { label: endYear ? `Forecast ${endYear}` : 'Forecast', value: forecast } : null,
    cagr ? { label: period ? `CAGR ${period}` : 'CAGR', value: cagr } : null,
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#0B1120',
          color: '#FFFFFF',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              padding: '8px 18px',
              borderRadius: 999,
              background: '#1541E3',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {industry}
          </div>
          <div
            style={{
              display: 'flex',
              /* Three steps, not two: the longest names in the corpus run past
                 60 characters ("North America Cell & Gene Therapy Manufacturing
                 Market") and at 60px those wrapped into the figures row. */
              fontSize: title.length > 62 ? 48 : title.length > 46 ? 58 : 72,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 56 }}>
            {figures.map((f) => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', fontSize: 20, color: '#9AA7C4', letterSpacing: 0.5 }}>
                  {f.label}
                </div>
                <div style={{ display: 'flex', fontSize: 46, fontWeight: 700 }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <div style={{ display: 'flex', fontSize: 28, fontWeight: 700 }}>NeoGraph Analytics</div>
            <div style={{ display: 'flex', fontSize: 18, color: '#9AA7C4' }}>
              Figures sourced and checked
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
