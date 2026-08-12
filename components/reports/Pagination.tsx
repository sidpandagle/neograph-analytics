'use client';

import { Button } from '@/components/ui';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render pagination if there's only 1 page or no pages
  if (totalPages <= 1) {
    return null;
  }

  // Generate smart page numbers with ellipsis
  const getPageNumbers = (): (number | string)[] => {
    // If 7 or fewer pages, show all
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Show: 1 2 3 4 ... 10 (when current is near start)
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }

    // Show: 1 ... 7 8 9 10 (when current is near end)
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // Show: 1 ... 4 5 6 ... 10 (when current is in middle)
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
        onClick={() => onPageChange(currentPage - 1)}
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
              onClick={() => onPageChange(pageNumber)}
              className={`
                min-w-[40px] rounded-pill px-3 py-2 text-sm transition-colors duration-150
                ${
                  isCurrentPage
                    ? 'bg-[var(--cmi-primary)] font-semibold text-white'
                    : 'border border-[var(--cmi-line)] bg-white text-[var(--cmi-ink)] hover:border-[var(--cmi-primary)] hover:text-[var(--cmi-primary)]'
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
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next →
      </Button>
    </div>
  );
}
