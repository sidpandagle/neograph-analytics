'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import allReportsData from '@/data/all_reports.json';
import { jsonReportToUIReport } from '@/lib/jsonReports';
import type { JsonReport } from '@/lib/jsonReports';

type UIReport = ReturnType<typeof jsonReportToUIReport>;

interface SearchBarProps {
  onSearchResults: (results: UIReport[] | null, isLoading: boolean) => void;
  placeholder?: string;
  initialQuery?: string;
}

const allReports = allReportsData as JsonReport[];

function searchLocal(query: string): UIReport[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allReports
    .filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.industry.toLowerCase().includes(q) ||
        r.market_overview.summary.toLowerCase().includes(q) ||
        (r.seo.meta_description ?? '').toLowerCase().includes(q)
    )
    .map((r, i) => jsonReportToUIReport(r, i));
}

export default function SearchBar({ onSearchResults, placeholder, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      onSearchResults(null, false);
      return;
    }
    const results = searchLocal(debouncedQuery);
    onSearchResults(results, false);
  }, [debouncedQuery, onSearchResults]);

  return (
    <div className="w-full">
      {/* White pill, so it reads clearly against the blue panel behind it. */}
      <div className="flex items-center gap-2.5 rounded-pill bg-white py-2 pl-[18px] pr-2.5 transition-shadow focus-within:ring-2 focus-within:ring-white/40">
        <svg
          className="h-[18px] w-[18px] shrink-0 text-[var(--cmi-meta)]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || 'Search reports…'}
          aria-label="Search reports"
          className="reports-search-input min-w-0 flex-1 border-none bg-transparent py-1.5 text-sm text-[var(--cmi-ink)] outline-none placeholder:text-[var(--cmi-meta)]"
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="shrink-0 rounded-full p-1 text-[var(--cmi-meta)] transition-colors hover:bg-[var(--cmi-surface)] hover:text-[var(--cmi-ink)]"
            aria-label="Clear search"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
