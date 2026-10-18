'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReportCard from '@/components/reports/ReportCard';
import Pagination from '@/components/reports/Pagination';
import type { Report } from '@/lib/api/reports.types';

interface AuthorReportsListingProps {
  reports: Report[];
  authorName: string;
}

const ITEMS_PER_PAGE = 12;

export default function AuthorReportsListing({ reports, authorName }: AuthorReportsListingProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);
  const paginatedReports = reports.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of reports section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Empty state
  if (reports.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-[var(--muted-foreground)] opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          {/* What this state actually means.
              It is not that the analyst has published nothing — it is that the
              corpus records no per-report byline: `neograph_reports` has no
              author column and `getReportsByAuthorId` returns an empty list by
              construction, so this branch renders on all three profiles
              regardless of who did the work. "hasn't authored any reports yet.
              Check back soon!" was therefore a claim about a person that the
              data cannot support, on a page that is in `/sitemap.xml`. R-26
              tracks recording the attribution; until it is recorded, the page
              says what is true. */}
          <h3 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
            Reports are published under organisational attribution
          </h3>
          <p className="text-[var(--muted-foreground)] mb-6">
            Our figures are published by NeoGraph Analytics rather than under
            individual bylines, so {authorName}&apos;s contributions are not
            listed separately here. Every report states its sources and the
            method behind its figures.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--cmi-primary-fill)] text-[var(--primary-foreground)] rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse All Reports
            </Link>
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              How these figures are produced
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          Reports by {authorName}
        </h2>
        <p className="text-[var(--muted-foreground)]">
          {reports.length} {reports.length === 1 ? 'report' : 'reports'} found
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        {paginatedReports.map((report) => (
          <ReportCard key={report.id} report={report} headingLevel="h3" />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
