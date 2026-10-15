'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { TableOfContents } from './TableOfContents';
import { FullReportTOC } from './FullReportTOC';
import { CTAPanel } from './CTAPanel';
import { CustomizeReportCard } from './CustomizeReportCard';
import { cn } from '@/lib/utils';
import { groupTableOfContents, SidebarTOCItem, TOCItem } from '@/lib/toc-utils';
import { useGeneratedTOC } from '@/hooks/useGeneratedTOC';

interface ReportContentWrapperProps {
  tableOfContents?: SidebarTOCItem[];  // For sidebar navigation (optional, will be auto-generated if not provided)
  fullReportTOC?: TOCItem[];           // For full report TOC modal
  /** Retained for callers; reading navigation is now driven by the TOC itself. */
  hasFullContent?: boolean;
  price: string;
  discounted_price: string;
  reportTitle?: string;
  reportSlug?: string;
  children: ReactNode;
}

export const ReportContentWrapper: React.FC<ReportContentWrapperProps> = ({
  tableOfContents,
  fullReportTOC,
  price,
  discounted_price,
  reportTitle,
  reportSlug,
  children,
}) => {
  const [showFullTOC, setShowFullTOC] = useState(false);
  const targetSectionRef = useRef<string | null>(null);

  // Auto-generate TOC from h2 headings if not provided
  const generatedTOC = useGeneratedTOC('article');

  // Use the provided TOC only if it actually has entries. The report page passes
  // an empty array, which is truthy and so defeated this fallback entirely.
  const activeTOC =
    tableOfContents && tableOfContents.length > 0 ? tableOfContents : generatedTOC;

  // Show reading navigation whenever there is something to navigate. This used to
  // be gated on `hasFullContent`, which the report page hardcodes to false — so on
  // an 11-section document the only sticky element was the price panel, and the
  // working TOC built from the section headings was never rendered.
  const showTOC = activeTOC.length > 0;

  // Transform full report TOC data into chapters
  const chapters = fullReportTOC ? groupTableOfContents(fullReportTOC) : [];

  // Handle scroll to top when full TOC is opened
  useEffect(() => {
    if (showFullTOC) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [showFullTOC]);

  // Handle navigation to section after closing full TOC
  useEffect(() => {
    if (!showFullTOC && targetSectionRef.current) {
      const targetId = targetSectionRef.current;

      // Use setTimeout to allow DOM to update after render
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }

        // Clear the ref after scrolling
        targetSectionRef.current = null;
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [showFullTOC]);

  // Callback to handle navigation from sidebar TOC when full TOC is open
  const handleNavigateToSection = (sectionId: string) => {
    targetSectionRef.current = sectionId;
    setShowFullTOC(false);
  };

  return (
    /* A 12-column grid can only express the rails as 3/6/3, which on a 1392px
       grid makes each rail 324px. The TOC rail never needs that: its longest
       label, "Frequently Asked Questions", measures 201px, and with the 32px
       item padding the widest it ever needs is 233px -- so 91px of every row
       was empty. Explicit tracks let the rail take what it needs and hand the
       remainder to the centre column, which is where the analysis lives.
       The CTA rail keeps 324px; its price panel and buttons use the width. */
    <div
      className={cn(
        'grid grid-cols-1 gap-8',
        /* Fixed-width rails buy space on a wide display and cost it on a
           narrow one, because they do not scale down. Taking both rails at
           lg (1024px) left the article column 248px wide -- about 20
           characters a line -- where the old 3/6/3 proportional grid gave it
           432px. So the three-column layout only starts at xl (1280px),
           which is also where the primary nav appears; between 1024 and
           1279px the TOC stays and the CTA panel drops below the article,
           spanning the full width.
             1024px  centre 248px -> 589px
             1920px  centre 700px -> 784px (the wide-screen gain is kept) */
        showTOC
          ? 'lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_324px]'
          : 'lg:grid-cols-[minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_324px]'
      )}
    >
      {/* Left Sidebar - reading navigation */}
      {showTOC && (
        <aside className="hidden min-w-0 lg:block">
          <div className="sticky top-24">
            {activeTOC && activeTOC.length > 0 && (
              <TableOfContents
                items={activeTOC}
                onShowFullTOC={() => setShowFullTOC(true)}
                showFullTOC={showFullTOC}
                onNavigateToSection={handleNavigateToSection}
              />
            )}
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="min-w-0">
        {showFullTOC ? (
          <FullReportTOC
            chapters={chapters}
            onClose={() => setShowFullTOC(false)}
          />
        ) : (
          children
        )}
      </div>

      {/* Right Sidebar - CTA Panel */}
      <aside className={cn('min-w-0', showTOC ? 'lg:col-span-2 xl:col-span-1' : 'lg:col-span-1')}>
        <div className="sticky top-24 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <CTAPanel discounted_price={discounted_price} price={price} reportTitle={reportTitle} reportSlug={reportSlug} />
          <CustomizeReportCard reportTitle={reportTitle} />
        </div>
      </aside>
    </div>
  );
};
