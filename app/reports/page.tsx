import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getReports } from '@/lib/api/reports';
import { ReportsListingClient } from '@/components/reports';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Healthcare Market Research Reports",
  description: "Browse in-depth healthcare market research covering industry trends, competitive analysis, forecasts, and strategic insights across 140+ reports.",
  keywords: ["healthcare market research", "healthcare reports", "medical industry reports", "healthcare forecast", "healthcare industry analysis"],
  alternates: {
    canonical: '/reports',
  },
};

async function ReportsContent() {
  const result = await getReports();
  const reports = result.success ? result.data : [];
  return <ReportsListingClient reports={reports} />;
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <ReportsContent />
    </Suspense>
  );
}
