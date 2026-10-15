'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { SidebarTOCItem } from '@/lib/toc-utils';

interface TableOfContentsProps {
  items: SidebarTOCItem[];
  className?: string;
  onShowFullTOC?: () => void;
  showFullTOC?: boolean;
  onNavigateToSection?: (sectionId: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  items,
  className,
  onShowFullTOC,
  showFullTOC,
  onNavigateToSection,
}) => {
  const [activeId, setActiveId] = useState<string>('');

  /* This used an IntersectionObserver with rootMargin '-100px 0px -66%' and
     called setActiveId for every intersecting entry. Two things went wrong:
     the callback receives several entries at once and the last one won by
     arbitrary order, and nothing ever cleared the value when a section left
     the band -- so a stale id persisted. Because the band was only ~34% of
     the viewport tall, sections taller than it never fired at all. Measured
     on agricultural-biotechnology-market: at the top of the page the TOC
     highlighted 'faq' (the LAST section), held it unchanged for the first
     6,000px of scrolling, and produced just 3 distinct highlights across the
     whole 9,322px document.

     Which section you are in is a question about position, not about events,
     so it is now computed from position: the active item is the last one
     whose top edge has passed the reading line. Reads are batched into a
     single rAF so a scroll burst costs one layout pass, and the bottom of
     the document always resolves to the final section, which can otherwise
     never reach the line. */
  useEffect(() => {
    if (!items.length) return;

    const READING_LINE = 120;
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
      if (atBottom) {
        setActiveId(items[items.length - 1].id);
        return;
      }
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= READING_LINE) current = item.id;
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    /* Charts size themselves on the client, so section offsets move while the
       reader is scrolling past them. Measured on ai-in-cancer-diagnostics-market
       the highlight lagged a full section between 2,100px and 4,200px -- exactly
       the chart band -- and then corrected itself below it. Scroll events alone
       cannot see that, because the page moved without anyone scrolling. */
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.body);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    if (showFullTOC && onNavigateToSection) {
      // Full TOC is open: trigger close + scroll sequence
      onNavigateToSection(id);
    } else {
      // Normal behavior: scroll immediately
      const element = document.getElementById(id);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav
      aria-label="Report details"
      className={cn(
        'flex flex-col max-h-[calc(100vh-8rem)]',
        className
      )}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="eyebrow-muted mb-4 flex-shrink-0">Report details</div>
        <div className="flex-1 overflow-y-auto pb-4">
          {/* 13 chapters at py-2.5 + space-y-1.5 made this rail ~700px against a
              ~545px hero panel, so it overhung the report's own header by about
              155px and read as the longest thing on the page. py-2 + space-y-1
              takes ~76px out without crowding; the rail is lg-and-up only, so
              the 44px touch-target guidance is not the binding constraint. */}
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={cn(
                    'block rounded-tile px-4 py-2 text-[13.5px] transition-colors duration-150',
                    activeId === item.id
                      ? 'bg-[var(--cmi-primary)] font-semibold text-white'
                      : 'bg-[var(--cmi-surface)] text-[var(--cmi-body)] hover:bg-white hover:text-[var(--cmi-primary)]'
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {onShowFullTOC && (
          <button
            onClick={onShowFullTOC}
            className="mt-4 inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-pill border border-[var(--cmi-line)] px-4 py-2.5 text-sm font-semibold text-[var(--cmi-ink)] transition-colors duration-150 hover:border-[var(--cmi-primary)]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            Table of Contents
          </button>
        )}
      </div>
    </nav>
  );
};
