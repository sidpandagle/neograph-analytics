'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { PressRelease } from '@/lib/api/press-releases.types';
import PressReleaseListCard from './PressReleaseListCard';
import Pagination from '@/components/reports/Pagination';
import CategorySidebar from '@/components/CategorySidebar';
import { getPressReleases, isApiError } from '@/lib/api';

const ITEMS_PER_PAGE = 10;

interface PressReleaseListingClientProps {
  pressReleases: PressRelease[];
  totalItems: number;
  totalPages: number;
  activeCategorySlug?: string;
  categoryName?: string;
}

export default function PressReleaseListingClient({
  pressReleases: initialPressReleases,
  totalItems: initialTotalItems,
  totalPages: initialTotalPages,
  activeCategorySlug,
  categoryName,
}: PressReleaseListingClientProps) {
  const storageKey = activeCategorySlug ? `press_releases_${activeCategorySlug}_page` : 'press_releases_page';
  const [pressReleases, setPressReleases] = useState<PressRelease[]>(initialPressReleases);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalItems, setTotalItems] = useState(initialTotalItems);
  const [isLoading, setIsLoading] = useState(false);

  // Restore page from sessionStorage and fetch on mount if not page 1
  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    const savedPage = saved ? Math.max(1, parseInt(saved, 10) || 1) : 1;
    if (savedPage !== 1) {
      setCurrentPage(savedPage);
      fetchPage(savedPage);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  async function fetchPage(page: number) {
    setIsLoading(true);
    const response = await getPressReleases({
      status: 'published',
      page,
      limit: ITEMS_PER_PAGE,
      ...(activeCategorySlug && { category: activeCategorySlug }),
    });
    if (!isApiError(response)) {
      setPressReleases(response.data);
      if (response.meta) {
        setTotalPages(response.meta.totalPages);
        setTotalItems(response.meta.totalItems);
      }
    }
    setIsLoading(false);
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem(storageKey, String(page));
    await fetchPage(page);
    document.getElementById('press-releases-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Hero Banner ───────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
            <Link href="/" className="hover:text-[#2563A3] transition-colors">Home</Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-600 font-medium">Press Releases</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 text-3xl shadow-sm shrink-0 mt-0.5">
              📢
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                {categoryName ? `${categoryName} Press Releases` : 'Press Releases'}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-4">
                Latest news and announcements from Healthcare Foresights. Stay informed about our research publications and industry insights.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563A3] bg-blue-100 px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {`${totalItems} ${totalItems === 1 ? 'release' : 'releases'}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_288px] gap-10">

          {/* ── Main: Press Release List ───────────────────────────── */}
          <main id="press-releases-list">
            {/* Meta row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-1">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                {`${totalItems} releases`}
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-4 mt-4">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : pressReleases.length > 0 ? (
              <>
                <div>
                  {pressReleases.map((pr) => (
                    <PressReleaseListCard key={pr.id} pressRelease={pr} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl mt-4">
                <div className="text-5xl mb-4">📢</div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No press releases found</h3>
                <p className="text-sm text-slate-400">Check back later for new announcements</p>
              </div>
            )}
          </main>

          {/* ── Right Sidebar ──────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <CategorySidebar basePath="/press-releases" activeCategorySlug={activeCategorySlug} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
