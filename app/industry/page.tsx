import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { getReports, getBlogs, getPressReleases, isApiError } from '@/lib/api';
import { ReportsListingClient } from '@/components/reports';
import IndustryHero from '@/components/reports/IndustryHero';
import IndustryContentPreview from '@/components/industry/IndustryContentPreview';

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
    page: 1,
    limit: 8,
    sort_by: 'publish_date_desc',
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
      totalPages={response.meta?.totalPages ?? 1}
    />
  );
}

function ReportsListSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-[1fr_288px] gap-10">
        <main>
          <div className="flex items-center pb-3 border-b border-slate-200 mb-1">
            <div className="h-3 w-36 bg-slate-100 animate-pulse rounded" />
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="py-6 pl-5 -ml-5 border-b border-slate-100">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="h-3 w-28 bg-slate-100 animate-pulse rounded" />
                <div className="h-3 w-2 bg-slate-100 animate-pulse rounded-full" />
                <div className="h-3 w-16 bg-slate-100 animate-pulse rounded" />
              </div>
              <div className="h-5 w-full bg-slate-100 animate-pulse rounded mb-1.5" />
              <div className={`h-5 bg-slate-100 animate-pulse rounded mb-3 ${i % 3 === 0 ? 'w-3/4' : i % 3 === 1 ? 'w-5/6' : 'w-2/3'}`} />
              <div className="h-3.5 w-full bg-slate-100 animate-pulse rounded mb-1.5" />
              <div className="h-3.5 w-4/5 bg-slate-100 animate-pulse rounded" />
            </div>
          ))}
        </main>
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="h-3 w-32 bg-slate-200 animate-pulse rounded" />
              </div>
              <div className="py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="px-4 py-2">
                    <div className="h-3.5 bg-slate-100 animate-pulse rounded" style={{ width: `${60 + (i % 4) * 15}px` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1B4B7F] to-[#0F2D52] rounded-xl p-5 h-32 animate-pulse" />
          </div>
        </aside>
      </div>
    </div>
  );
}

async function ContentPreviewSection() {
  const [blogsResponse, pressReleasesResponse] = await Promise.all([
    getBlogs({ status: 'published', page: 1, limit: 2, sort_by: 'publish_date_desc' }),
    getPressReleases({ status: 'published', page: 1, limit: 2, sort_by: 'publish_date_desc' }),
  ]);

  const blogs = isApiError(blogsResponse) ? [] : blogsResponse.data;
  const pressReleases = isApiError(pressReleasesResponse) ? [] : pressReleasesResponse.data;

  return <IndustryContentPreview blogs={blogs} pressReleases={pressReleases} />;
}

export default function IndustryPage() {
  return (
    <>
      <IndustryHero />
      <Suspense fallback={null}>
        <ContentPreviewSection />
      </Suspense>
      <Suspense fallback={<ReportsListSkeleton />}>
        <ReportsContent />
      </Suspense>
    </>
  );
}
