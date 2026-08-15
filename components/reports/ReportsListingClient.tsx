'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, ChevronDown } from 'lucide-react';
import ReportCard from './ReportCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import categories from '@/data/categories.json';

interface Report {
  id: number;
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: string;
  date: string;
  price: string;
  region: string;
  year: string;
  reportType: string;
  pages: number;
}

interface ReportsListingClientProps {
  reports: Report[];
}

const ITEMS_PER_PAGE = 12;

const REGIONS = [
  'Global',
  'North America',
  'Europe',
  'Asia Pacific',
  'Latin America',
  'Middle East & Africa',
];

export default function ReportsListingClient({ reports }: ReportsListingClientProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('');
  const [activeRegion, setActiveRegion] = useState('');
  const [searchResults, setSearchResults] = useState<Report[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const cat = categories.find((c) => c.slug === categoryParam);
      if (cat) setActiveCategory(cat.name);
    }
  }, [searchParams]);

  const initialSearch = useMemo(() => searchParams.get('search') || '', [searchParams]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch && !searchQuery) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const handleSearchResults = useCallback((results: Report[] | null, loading: boolean) => {
    setSearchResults(results);
    if (!loading) setCurrentPage(1);
  }, []);

  const filteredReports = useMemo(() => {
    const base = searchResults !== null ? searchResults : reports;
    return base.filter((r) => {
      if (activeCategory && r.category !== activeCategory) return false;
      if (activeRegion && r.region !== activeRegion) return false;
      return true;
    });
  }, [reports, activeCategory, activeRegion, searchResults]);

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);

  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredReports.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredReports, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeRegion]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('reports-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const hasFilters = !!(activeCategory || activeRegion);

  const clearAll = () => {
    setActiveCategory('');
    setActiveRegion('');
  };

  return (
    <>
      {/* ── Hero panel ───────────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-7 rounded-panel bg-[var(--cmi-primary)] p-7 md:p-11">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <span className="eyebrow-on-blue">Market intelligence</span>
            <h1 className="mt-3 text-[38px] leading-[1.04] text-white md:text-[54px]">
              Research Reports
            </h1>
            <p className="mt-3 text-[15px] leading-[1.55] text-[var(--cmi-on-blue)]">
              {filteredReports.length.toLocaleString()}{' '}
              {filteredReports.length === 1 ? 'report' : 'reports'} across{' '}
              {categories.length} healthcare sectors
            </p>
          </div>

          <div className="w-full flex-shrink-0 lg:w-[440px]">
            <SearchBar
              onSearchResults={handleSearchResults}
              placeholder="Search by topic, technology, or region…"
              initialQuery={initialSearch}
            />
          </div>
        </div>
      </section>

      {/* ── Filters ──────────────────────────────────────────────────────────── */}
      <section className="rounded-panel bg-white p-4 md:px-6 md:py-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveCategory('')}
            data-active={!activeCategory}
            className="segmented-item flex-shrink-0 !py-2 !text-[13px]"
          >
            All Reports
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory((prev) => (prev === cat.name ? '' : cat.name))}
              data-active={activeCategory === cat.name}
              className="segmented-item flex-shrink-0 !py-2 !text-[13px]"
            >
              {cat.name}
            </button>
          ))}

          <div className="relative flex-shrink-0">
            <select
              value={activeRegion}
              onChange={(e) => setActiveRegion(e.target.value)}
              aria-label="Filter by region"
              className={`cursor-pointer appearance-none rounded-pill border py-2 pl-4 pr-9 text-[13px] font-semibold transition-colors duration-150 focus:outline-none ${
                activeRegion
                  ? 'border-[var(--cmi-primary)] bg-[var(--cmi-primary)] text-white'
                  : 'border-[var(--cmi-line)] bg-white text-[var(--cmi-idle)] hover:border-[var(--cmi-primary)]'
              }`}
            >
              <option value="">All Regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 ${
                activeRegion ? 'text-white' : 'text-[var(--cmi-meta)]'
              }`}
            />
          </div>

          {hasFilters && (
            <>
              <div className="h-5 w-px flex-shrink-0 bg-[var(--cmi-line)]" />
              <button
                onClick={clearAll}
                className="flex flex-shrink-0 items-center gap-1 text-[13px] font-semibold text-[var(--cmi-body)] transition-colors duration-150 hover:text-[var(--cmi-primary)]"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            </>
          )}
        </div>
      </section>

      {/* ── Results ──────────────────────────────────────────────────────────── */}
      <section className="rounded-panel bg-white p-7 md:p-11" style={{ minHeight: '50vh' }}>
        {paginatedReports.length > 0 ? (
          <>
            <div className="mb-7 flex items-center justify-between gap-4">
              <p className="text-[12.5px] text-[var(--cmi-body)]">
                Showing{' '}
                <span className="font-semibold text-[var(--cmi-ink)]">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredReports.length)}
                </span>{' '}
                of {filteredReports.length.toLocaleString()} reports
              </p>
              {activeCategory && (
                <div className="chip-primary">
                  {activeCategory}
                  <button
                    onClick={() => setActiveCategory('')}
                    className="opacity-60 transition-opacity hover:opacity-100"
                    aria-label={`Clear ${activeCategory} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            <div
              id="reports-grid"
              className="grid gap-[18px]"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}
            >
              {paginatedReports.map((report, idx) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  index={(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-soft bg-[var(--cmi-surface)]">
              <Search className="h-8 w-8 text-[var(--cmi-meta)]" />
            </div>
            <h3 className="mb-2 font-display text-xl font-semibold text-[var(--cmi-ink)]">
              No reports found
            </h3>
            <p className="mb-8 max-w-xs text-sm leading-[1.65] text-[var(--cmi-body)]">
              Try a different search term or broaden your filters
            </p>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="rounded-pill bg-[var(--cmi-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--cmi-primary-pressed)]"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </section>
    </>
  );
}
