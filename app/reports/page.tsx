import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getReportCards } from '@/lib/api/reports';
import { ReportsListingClient } from '@/components/reports';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Healthcare Market Research Reports",
  description: "Browse market research across healthcare, life sciences and frontier technology: market sizing, segmentation, regional detail and competitive analysis.",
  keywords: ["market research reports", "healthcare market research", "life sciences reports", "market forecast", "industry analysis"],
  alternates: {
    canonical: '/reports',
  },
};

async function ReportsContent() {
  const result = await getReportCards();
  const reports = result.success ? result.data : [];

  /* Only the fields the cards and the client-side filter actually read cross to
     the browser. `ReportsListingClient` already declares exactly these thirteen
     in its own interface — the rest of the `Report` shape (meta_title,
     meta_keywords, baseYear, forecastPeriod, the formatted market-size strings,
     cagr, reportCode, discounted_price, the empty keyFindings/faqs/keyPlayers
     arrays) was riding along in the RSC payload unread, once per card, 152
     times. `description` and `summary` also held the same string twice. */
  const cards = reports.map((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    summary: r.summary === r.description ? '' : r.summary,
    category: r.category,
    date: r.date,
    price: r.price,
    region: r.region,
    year: r.year,
    reportType: r.reportType,
    pages: r.pages,
  }));

  return <ReportsListingClient reports={cards} />;
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <ReportsContent />
    </Suspense>
  );
}
