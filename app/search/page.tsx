import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getReports, isApiError } from '@/lib/api';
import ReportCard from '@/components/reports/ReportCard';
import Pagination from '@/components/reports/Pagination';

const ITEMS_PER_PAGE = 10;

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() || '';
  return {
    title: query
      ? `Search results for "${query}" | Healthcare Market Research`
      : 'Search | Healthcare Market Research',
    description: `Browse healthcare market research reports${query ? ` matching "${query}"` : ''}.`,
    robots: { index: false },
  };
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const response = await getReports({
    status: 'published',
    search: query,
    page,
    limit: ITEMS_PER_PAGE,
  });

  if (isApiError(response)) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-2">⚠️</p>
        <h2 className="text-lg font-semibold text-slate-700 mb-1">Unable to load results</h2>
        <p className="text-sm text-slate-500">{response.message}</p>
      </div>
    );
  }

  const currentPage = response.meta?.currentPage ?? page;
  const totalPages = response.meta?.totalPages ?? 1;
  const totalItems = response.meta?.totalItems ?? response.data.length;
  const reports = response.data;

  return (
    <>
      {/* Count badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-1">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
          {totalItems} {totalItems === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {reports.length > 0 ? (
        <>
          <div>
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl mt-4">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No results found</h3>
          <p className="text-sm text-slate-400 mb-6">
            Try searching with different keywords or{' '}
            <Link href="/industry" className="text-[#2563A3] hover:underline">
              browse all reports
            </Link>
            .
          </p>
        </div>
      )}
    </>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-36 bg-slate-200 rounded mb-4 pb-3 border-b border-slate-200" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="py-6 pl-5 -ml-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="h-3 w-28 bg-slate-200 rounded" />
            <div className="h-3 w-2 bg-slate-200 rounded-full" />
            <div className="h-3 w-16 bg-slate-200 rounded" />
          </div>
          <div className="h-5 w-full bg-slate-200 rounded mb-1.5" />
          <div className="h-5 w-3/4 bg-slate-200 rounded mb-3" />
          <div className="h-3.5 w-full bg-slate-200 rounded mb-1.5" />
          <div className="h-3.5 w-4/5 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q, page: pageParam } = await searchParams;
  const query = q?.trim() || '';
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  return (
    <>
      {/* ── Search Header Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
            <Link href="/" className="hover:text-[#2563A3] transition-colors">
              Home
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/industry" className="hover:text-[#2563A3] transition-colors">
              Reports
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600 font-medium">Search</span>
          </nav>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
              {query ? (
                <>
                  Search results for{' '}
                  <span className="text-[#2563A3]">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                'Search Reports'
              )}
            </h1>
            <p className="text-sm sm:text-base text-slate-500">
              {query
                ? 'Showing healthcare market research reports matching your query.'
                : 'Enter a keyword in the search bar above to find reports.'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl">
          {query ? (
            <Suspense fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} page={page} />
            </Suspense>
          ) : (
            <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">Start searching</h3>
              <p className="text-sm text-slate-400">
                Use the search bar in the header to find reports.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
