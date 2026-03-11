import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getReports, isApiError } from '@/lib/api';
import { ReportsListingClient } from '@/components/reports';
import ReportsSkeleton from '@/components/reports/ReportsSkeleton';

export const metadata: Metadata = {
  title: "Healthcare Market Research Reports & Industry Analysis",
  description: "Browse in-depth healthcare market research reports covering industry trends, competitive analysis, forecasts, and strategic insights.",
  keywords: ["healthcare reports", "healthcare market research", "medical industry reports", "healthcare forecast", "healthcare industry analysis"],
  alternates: {
    canonical: '/industry',
  },
};

export const revalidate = 300;
export const fetchCache = 'default-cache';

async function ReportsContent() {
  const response = await getReports({
    status: 'published',
    limit: 1000,
  });

  if (isApiError(response)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Unable to Load Reports</h2>
          <p className="text-gray-600">{response.message}</p>
          <Link
            href="/industry"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const totalItems = response.meta?.totalItems ?? response.data.length;

  return (
    <ReportsListingClient
      reports={response.data}
      totalItems={totalItems}
    />
  );
}

export default async function IndustryPage() {
  return (
    <Suspense fallback={<ReportsSkeleton />}>
      <ReportsContent />
    </Suspense>
  );
}
