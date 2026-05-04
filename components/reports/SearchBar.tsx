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
    <div className="relative w-full">
      <div className="relative">
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: 'var(--on-dark-subtle)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || 'Search reports…'}
          className="reports-search-input w-full pl-11 pr-12 py-3.5 text-sm rounded-xl transition-all focus:outline-none"
          style={{
            background: 'var(--on-dark-surface)',
            border: '1px solid var(--on-dark-border)',
            color: 'var(--on-dark-text)',
            caretColor: 'var(--accent)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = `1px solid hsl(var(--accent-hsl) / 0.5)`;
            e.currentTarget.style.background = 'var(--on-dark-surface-hover)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = '1px solid var(--on-dark-border)';
            e.currentTarget.style.background = 'var(--on-dark-surface)';
          }}
        />

        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity opacity-60 hover:opacity-100"
            aria-label="Clear search"
            style={{ color: 'var(--on-dark-muted)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {query && (
        <p className="mt-2 text-xs" style={{ color: 'var(--on-dark-hint)' }}>
          Press Enter or wait for results
        </p>
      )}
    </div>
  );
}
