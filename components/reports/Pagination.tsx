'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** When provided, pagination uses client-side callbacks (e.g. search results).
   *  When omitted, pagination navigates via URL (?page=N). */
  onPageChange?: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      router.push(`?${params.toString()}`);
    }
  };

  // Generate smart page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        aria-label="Previous page"
      >
        ← Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm text-[var(--muted-foreground)]"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <button
              key={pageNumber}
              onClick={() => goToPage(pageNumber)}
              className={`
                min-w-[40px] px-3 py-2 text-sm rounded-lg transition-all
                ${
                  isCurrentPage
                    ? 'bg-[var(--primary)] text-white font-semibold'
                    : 'bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--muted)] hover:border-[var(--primary)]'
                }
              `}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        aria-label="Next page"
      >
        Next →
      </Button>
    </div>
  );
}
