"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import allReportsData from '@/data/all_reports.json';
import { jsonReportToUIReport } from '@/lib/jsonReports';
import type { JsonReport } from '@/lib/jsonReports';

type UIReport = ReturnType<typeof jsonReportToUIReport>;

const allReports = allReportsData as JsonReport[];

function searchLocal(query: string, limit = 5): UIReport[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const matches = allReports.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.industry.toLowerCase().includes(q) ||
      r.market_overview.summary.toLowerCase().includes(q) ||
      (r.seo.meta_description ?? '').toLowerCase().includes(q)
  );
  return matches.slice(0, limit).map((r, i) => jsonReportToUIReport(r, i));
}

interface SearchBarProps {
  variant?: 'hero' | 'header';
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  variant = 'hero',
  placeholder = 'Search reports, categories, regions...',
  className
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<UIReport[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    setResults(searchLocal(debouncedQuery));
  }, [debouncedQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/reports?search=${encodeURIComponent(query)}`);
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHeroVariant = variant === 'hero';
  const inputSizeClasses = isHeroVariant
    ? 'h-14 md:h-16 text-base md:text-lg'
    : 'h-10 text-sm';

  const containerClasses = isHeroVariant
    ? 'w-full max-w-3xl'
    : 'w-full';

  return (
    <div ref={searchRef} className={cn('relative', containerClasses, className)}>
      <div className="relative">
        {/* Search Icon */}
        <div className={cn(
          'absolute top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)]',
          isHeroVariant ? 'left-4 md:left-5' : 'left-3.5'
        )}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(isHeroVariant ? 'h-5 w-5 md:h-6 md:w-6' : 'h-4 w-4')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-xl bg-[var(--card)] text-[var(--foreground)] transition-all duration-200',
            'border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-[var(--ring)]',
            'placeholder:text-[var(--muted-foreground)] hover:border-[var(--muted-foreground)]',
            isHeroVariant
              ? 'pl-12 md:pl-14 pr-12 md:pr-14'
              : 'pl-10 pr-10',
            inputSizeClasses
          )}
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors rounded-full p-1 hover:bg-[var(--muted)]',
              isHeroVariant ? 'right-4 md:right-5' : 'right-3.5'
            )}
            aria-label="Clear search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn(isHeroVariant ? 'h-5 w-5' : 'h-4 w-4')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl overflow-hidden z-50 max-h-96 overflow-y-auto theme-shadow">
          {results.length > 0 ? (
            <>
              <div className="p-3 border-b border-[var(--border)]" style={{ backgroundColor: 'var(--muted)' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {results.map((report) => (
                  <Link
                    key={report.id}
                    href={`/reports/${report.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="block p-4 hover:bg-[var(--muted)] transition-colors text-left"
                  >
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1" style={{ color: 'var(--foreground)' }}>
                      {report.title}
                    </h3>
                    <p className="text-xs line-clamp-2 mb-2" style={{ color: 'var(--muted-foreground)' }}>
                      {report.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium theme-chip">
                        {report.category}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{report.region}</span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{report.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/reports?search=${encodeURIComponent(query)}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="block p-3 text-center text-sm font-medium border-t border-[var(--border)] transition-colors hover:bg-[var(--muted)]"
                style={{ color: 'var(--accent)' }}
              >
                View all results for &ldquo;{query}&rdquo;
              </Link>
            </>
          ) : (
            <div className="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: 'var(--border)' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>No results found</p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
