'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { TableOfContents } from './TableOfContents';
import { FullReportTOC } from './FullReportTOC';
import { CTAPanel } from './CTAPanel';
import { CustomizeReportCard } from './CustomizeReportCard';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar - reading navigation */}
      {showTOC && (
        <aside className="hidden lg:block lg:col-span-3 2xl:col-span-2">
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
      <main className={showTOC ? 'lg:col-span-6 2xl:col-span-8' : 'lg:col-span-9 2xl:col-span-8'}>
        {showFullTOC ? (
          <FullReportTOC
            chapters={chapters}
            onClose={() => setShowFullTOC(false)}
          />
        ) : (
          children
        )}
      </main>

      {/* Right Sidebar - CTA Panel */}
      <aside className={showTOC ? 'lg:col-span-3 2xl:col-span-2' : 'lg:col-span-3 2xl:col-span-4'}>
        <div className="sticky top-24 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <CTAPanel discounted_price={discounted_price} price={price} reportTitle={reportTitle} reportSlug={reportSlug} />
          <CustomizeReportCard reportTitle={reportTitle} />
        </div>
      </aside>
    </div>
  );
};
