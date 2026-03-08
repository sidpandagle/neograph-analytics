"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { searchReports, isApiError } from '@/lib/api';
import type { Report } from '@/lib/api/reports.types';

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
  const [results, setResults] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Debounce the search query to avoid too many API calls
  const debouncedQuery = useDebounce(query, 300);

  // Perform API search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await searchReports(debouncedQuery, 1, 5);

        if (!isApiError(response)) {
          setResults(response.data);
        } else {
          setResults([]);
          console.error('Search error:', response.message);
        }
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    // Show loading state immediately when user types
    if (value.trim()) {
      setIsLoading(true);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Close dropdown when clicking outside
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
          'absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none',
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
            'w-full rounded-xl border border-slate-300 bg-white shadow-sm transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500 focus:shadow-md',
            'placeholder:text-slate-400 hover:border-slate-400',
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
              'absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100',
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
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ocean-600 border-r-transparent mb-3"></div>
              <p className="text-sm text-slate-600">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-3 border-b border-slate-100 bg-slate-50">
                <p className="text-xs font-medium text-slate-600">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <div className="divide-y divide-slate-100">
                {results.map((report) => (
                  <Link
                    key={report.id}
                    href={`/reports/${report.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="block p-4 hover:bg-slate-50 transition-colors text-left"
                  >
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-1">
                      {report.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-ocean-100 text-ocean-800">
                        {report.category}
                      </span>
                      <span className="text-xs text-slate-500">{report.region}</span>
                      <span className="text-xs font-semibold text-ocean-600">{report.price}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                onClick={() => {
                  setIsOpen(false);
                  setQuery('');
                }}
                className="block p-3 text-center text-sm font-medium text-ocean-600 hover:bg-ocean-50 transition-colors border-t border-slate-200"
              >
                View all results for &ldquo;{query}&rdquo;
              </Link>
            </>
          ) : (
            <div className="p-8 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-slate-300 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-slate-600 font-medium mb-1">No results found</p>
              <p className="text-xs text-slate-500">
                Try searching with different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
