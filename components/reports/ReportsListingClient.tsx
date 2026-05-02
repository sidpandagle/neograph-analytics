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
      {/* ── Hero Banner ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-20 pb-16 px-6 theme-hero theme-hero-grid"
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-[0.12] blur-3xl pointer-events-none"
          style={{ background: 'var(--accent)' }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end gap-10">
            {/* Left: Headline */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px w-8 flex-shrink-0" style={{ background: 'var(--accent)' }} />
                <p
                  className="text-xs font-bold tracking-[0.2em] uppercase"
                  style={{ color: 'var(--accent)' }}
                >
                  Market Intelligence
                </p>
              </div>
              <h1
                className="font-display font-bold leading-none mb-5 theme-hero-text"
                style={{
                  fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Research
                <br />
                <span style={{ color: 'var(--accent)' }}>Reports</span>
              </h1>
              <p className="theme-hero-muted" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                {filteredReports.length.toLocaleString()}{' '}
                {filteredReports.length === 1 ? 'report' : 'reports'} across{' '}
                {categories.length} healthcare sectors
              </p>
            </div>

            {/* Right: Search */}
            <div className="w-full lg:w-[440px] flex-shrink-0">
              <SearchBar
                onSearchResults={handleSearchResults}
                placeholder="Search by topic, technology, or region…"
                initialQuery={initialSearch}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Strip ─────────────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-20 bg-[var(--card)] border-b border-[var(--border)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="flex items-center gap-2.5 py-3 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
          >
            {/* All button */}
            <button
              onClick={() => setActiveCategory('')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0"
              style={
                !activeCategory
                  ? { background: 'var(--primary)', color: '#ffffff' }
                  : { background: 'var(--muted)', color: 'var(--muted-foreground)' }
              }
            >
              All Reports
            </button>

            <div className="h-5 w-px flex-shrink-0" style={{ background: 'var(--border)' }} />

            {/* Category pills */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory((prev) => (prev === cat.name ? '' : cat.name))}
                className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex-shrink-0"
style={
                activeCategory === cat.name
                  ? { background: 'var(--primary)', color: '#ffffff' }
                  : { background: 'var(--muted)', color: 'var(--muted-foreground)' }
              }
              >
                {cat.name}
              </button>
            ))}

            <div className="h-5 w-px flex-shrink-0" style={{ background: 'var(--border)' }} />

            {/* Region select */}
            <div className="relative flex-shrink-0">
              <select
                value={activeRegion}
                onChange={(e) => setActiveRegion(e.target.value)}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none transition-all duration-150"
                style={
                  activeRegion
                    ? { background: 'var(--primary)', color: '#ffffff', borderColor: 'var(--primary)' }
                    : { background: 'var(--muted)', color: 'var(--muted-foreground)', borderColor: 'var(--border)' }
                }
              >
                <option value="">All Regions</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
                style={{ color: activeRegion ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}
              />
            </div>

            {/* Clear filters */}
            {hasFilters && (
              <>
                <div className="h-5 w-px flex-shrink-0" style={{ background: 'var(--border)' }} />
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 flex-shrink-0 text-xs font-medium transition-colors duration-150"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  <X className="w-3 h-3" />
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Reports Grid ─────────────────────────────────────────────────────── */}
      <section className="py-12 px-6" style={{ background: 'var(--muted)', minHeight: '60vh' }}>
        <div className="max-w-7xl mx-auto">
          {paginatedReports.length > 0 ? (
            <>
              {/* Results meta bar */}
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-medium tracking-wide" style={{ color: 'var(--muted-foreground)' }}>
                  Showing{' '}
                  <span style={{ color: 'var(--foreground)' }}>
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredReports.length)}
                  </span>{' '}
                  of {filteredReports.length.toLocaleString()} reports
                </p>
                {activeCategory && (
                  <div
                    className="flex items-center gap-2 text-xs px-3 py-1 rounded-full"
                    style={{ background: 'hsl(var(--primary-hsl) / 0.09)', color: 'var(--primary)' }}
                  >
                    <span className="font-medium">{activeCategory}</span>
                    <button
                      onClick={() => setActiveCategory('')}
                      className="opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Grid */}
              <div
                id="reports-grid"
                className="grid gap-5"
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
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'var(--card)' }}
              >
                <Search className="w-8 h-8" style={{ color: 'var(--border)' }} />
              </div>
              <h3
                className="font-display text-xl font-bold mb-2"
                style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}
              >
                No reports found
              </h3>
              <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--muted-foreground)', lineHeight: '1.65' }}>
                Try a different search term or broaden your filters
              </p>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={{ background: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
