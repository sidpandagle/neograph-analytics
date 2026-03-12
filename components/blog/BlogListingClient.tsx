'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Blog } from '@/lib/api/blogs.types';
import BlogListCard from './BlogListCard';
import Pagination from '@/components/reports/Pagination';
import CategorySidebar from '@/components/CategorySidebar';

const ITEMS_PER_PAGE = 10;

interface BlogListingClientProps {
  blogs: Blog[];
  totalItems: number;
  activeCategorySlug?: string;
}

export default function BlogListingClient({
  blogs,
  totalItems,
  activeCategorySlug,
}: BlogListingClientProps) {
  const storageKey = activeCategorySlug ? `blog_${activeCategorySlug}_page` : 'blog_page';
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) setCurrentPage(Math.max(1, parseInt(saved, 10) || 1));
  }, [storageKey]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    sessionStorage.setItem(storageKey, String(page));
    document.getElementById('blogs-list')?.scrollIntoView({ behavior: 'smooth' });
  };

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            <span className="text-slate-600 font-medium">Blog</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-slate-200 text-3xl shadow-sm shrink-0 mt-0.5">
              📝
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                Insights & Analysis
              </h1>
              <p className="text-sm sm:text-base text-slate-500 max-w-2xl mb-4">
                Expert perspectives on healthcare market trends, emerging technologies, and industry transformations.
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563A3] bg-blue-100 px-3 py-1.5 rounded-full">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {`${totalItems} ${totalItems === 1 ? 'article' : 'articles'}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_288px] gap-10">

          {/* ── Main: Blog List ────────────────────────────────────── */}
          <main id="blogs-list">
            {/* Meta row */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-1">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                {`${totalItems} articles`}
              </p>
            </div>

            {blogs.length > 0 ? (
              <>
                <div>
                  {paginatedBlogs.map((blog) => (
                    <BlogListCard key={blog.id} blog={blog} />
                  ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl mt-4">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No articles found</h3>
                <p className="text-sm text-slate-400">Check back later for new content</p>
              </div>
            )}
          </main>

          {/* ── Right Sidebar ──────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <CategorySidebar basePath="/blogs" categoryBasePath="/blogs" activeCategorySlug={activeCategorySlug} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
