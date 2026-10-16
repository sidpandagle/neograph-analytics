'use client';

import { cn } from '@/lib/utils';
import { TOCChapter, TOCItem } from '@/lib/toc-utils';

interface TOCChapterItemProps {
  chapter: TOCChapter;
  isOpen: boolean;
  onToggle: () => void;
}

interface TOCNestedItemProps {
  item: TOCItem;
  depth?: number;
}

const TOCNestedItem: React.FC<TOCNestedItemProps> = ({ item, depth = 0 }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <div
        className={cn(
          'py-2.5 border-l-2 border-transparent',
          'text-sm text-[var(--muted-foreground)]',
          'hover:text-[var(--foreground)] hover:border-[var(--primary)]',
          'transition-colors duration-200',
          depth === 0 && 'pl-12 text-base font-medium',
          depth === 1 && 'pl-16 text-sm',
          depth === 2 && 'pl-20 text-sm',
          depth >= 3 && 'pl-24 text-xs'
        )}
      >
        <span className="text-[var(--primary)] font-mono mr-3">
          {item.number}
        </span>
        {item.title}
      </div>
      {hasChildren && (
        <div>
          {item.children!.map((child) => (
            <TOCNestedItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const TOCChapterItem: React.FC<TOCChapterItemProps> = ({
  chapter,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border-b border-[var(--border)] overflow-hidden">
      <button
        onClick={onToggle}
        className={cn(
          'w-full text-left p-6 flex items-center gap-4 group',
          'bg-[var(--muted)] hover:bg-[var(--cmi-raisedsurface)]',
          'transition-colors duration-200'
        )}
        aria-expanded={isOpen}
      >
        <div
          className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
            'bg-[var(--cmi-primary-fill)] text-[var(--primary-foreground)] transition-colors duration-200',
            'group-hover:bg-[var(--cmi-primary-pressed)]'
          )}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m-7-7h14"
              />
            )}
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
            {chapter.number && (
              <span className="text-[var(--primary)] font-mono mr-3">
                Chapter {chapter.number}.
              </span>
            )}
            {chapter.title}
          </div>
        </div>
      </button>

      {chapter.children && chapter.children.length > 0 && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-300 ease-in-out',
            isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-[var(--card)] pb-4">
            {chapter.children.map((child) => (
              <TOCNestedItem key={child.id} item={child} depth={0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
