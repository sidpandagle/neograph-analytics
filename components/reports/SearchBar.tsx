'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { searchReports, isApiError, type Report } from '@/lib/api';

interface SearchBarProps {
  onSearchResults: (results: Report[] | null, isLoading: boolean) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchBar({ onSearchResults, placeholder, initialValue }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      // If query is empty, clear search results
      if (!debouncedQuery.trim()) {
        onSearchResults(null, false);
        return;
      }

      setIsLoading(true);
      onSearchResults(null, true);

      try {
        const response = await searchReports(debouncedQuery);

        if (isApiError(response)) {
          console.error('Search error:', response.message);
          onSearchResults([], false);
        } else {
          onSearchResults(response.data, false);
        }
      } catch (error) {
        console.error('Search failed:', error);
        onSearchResults([], false);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, onSearchResults]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || 'Search reports...'}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading && (
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          )}
          {!isLoading && query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
          {!query && (
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
