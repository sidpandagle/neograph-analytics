'use client';

import { useEffect, useRef } from 'react';

interface StyledReportContentProps {
  htmlContent: string;
  reportSlug?: string;
}

export const StyledReportContent: React.FC<StyledReportContentProps> = ({
  htmlContent,
  reportSlug,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!contentRef.current) return;

  //   // Find all images in the content
  //   const images = contentRef.current.querySelectorAll('img');

  //   images.forEach((img, i) => {
  //     // Skip if already wrapped (check for image-container as it's the direct parent after wrapping)
  //     if (img.parentElement?.classList.contains('image-container')) return;

  //     // Set loading/decoding attributes before wrapping
  //     img.setAttribute('loading', 'lazy');
  //     img.setAttribute('decoding', 'async');

  //     // Images load directly from CDN — no /_next/image routing needed here.

  //     // Prevent CLS: set aspect-ratio from HTML attributes (naturalWidth is 0 for
  //     // lazy images that haven't loaded yet, so we must read from the element attributes)
  //     const attrW = img.getAttribute('width');
  //     const attrH = img.getAttribute('height');
  //     if (attrW && attrH) {
  //       img.style.aspectRatio = `${attrW} / ${attrH}`;
  //     } else {
  //       // Fallback: reserve 16:9 space so page doesn't reflow when image loads
  //       img.style.aspectRatio = '16 / 9';
  //     }

  //     // Create wrapper div for image
  //     const wrapper = document.createElement('div');
  //     wrapper.className = 'image-wrapper';

  //     // Create image container with border (matching the commented code styling)
  //     const imageContainer = document.createElement('div');
  //     imageContainer.className = 'image-container';

  //     // Wrap the image
  //     img.parentNode?.insertBefore(wrapper, img);
  //     imageContainer.appendChild(img);
  //     wrapper.appendChild(imageContainer);

  //     // Only add CTA to the first image and check globally if CTA already exists
  //     if (i === 0 && contentRef.current) {
  //       // Check if CTA section already exists anywhere in the content to prevent duplication
  //       const existingCTA = contentRef.current.querySelector('.image-cta-section');
  //       if (!existingCTA) {
  //         // Create CTA section (matching the commented code styling)
  //         const ctaSection = document.createElement('div');
  //         ctaSection.className = 'image-cta-section';
  //         ctaSection.innerHTML = `
  //           <div class="image-cta-content">
  //             <div class="image-cta-text">To learn more about this report,</div>
  //             <a href="/request-sample${reportSlug ? `?report=${reportSlug}` : ''}"  target="_blank" class="image-cta-button">
  //               <svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  //                 <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
  //                 <polyline points="7 10 12 15 17 10"></polyline>
  //                 <line x1="12" y1="15" x2="12" y2="3"></line>
  //               </svg>
  //               Download Free Sample
  //             </a>
  //           </div>
  //         `;
  //         wrapper.appendChild(ctaSection);
  //       }
  //     }
  //   });
  // }, [htmlContent, reportSlug]);

  return (
    <>
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none text-[#333333] styled-report-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx global>{`
        /* Typography overrides for report content */
        .styled-report-content {
          color: #333333;
        }

        /* H1 fallback (rarely used in marketDetails) */
        .styled-report-content h1 {
          color: #22E1B0;
          color: var(--teal-bright, #22E1B0);
          font-weight: 700;
          margin-top: 2.5rem;
        }

        /* H2 - Major sections with bright teal */
        .styled-report-content h2 {
          color: #22E1B0;
          color: var(--teal-bright, #22E1B0);
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        /* H3 - Subsections with muted teal */
        .styled-report-content h3 {
          color: #00695C;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        /* H4 - Minor sections with steel blue */
        // .styled-report-content h4 {
        //   color: #307898;
        //   color: var(--teal-steel, #307898);
        //   font-weight: 600;
        //   margin-top: 1.5rem;
        //   margin-bottom: 0.75rem;
        // }

        /* H5/H6 - Smallest headings with deep blue */
        .styled-report-content h5,
        .styled-report-content h6 {
          color: #37448C;
          color: var(--teal-deep, #37448C);
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        /* Ensure strong tags inside headings inherit heading color */
        .styled-report-content h1 strong,
        .styled-report-content h2 strong,
        .styled-report-content h3 strong,
        .styled-report-content h4 strong,
        .styled-report-content h5 strong,
        .styled-report-content h6 strong {
          color: inherit;
        }

        .styled-report-content p {
          color: #333333;
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 1em;
        }

        .styled-report-content ul,
        .styled-report-content ol {
          color: #333333;
        }

        .styled-report-content li {
          color: #333333;
          p {
            margin-bottom: 0;
          }
        }

        .styled-report-content strong {
          color: #37448C;
          color: var(--teal-deep, #37448C);
          font-weight: 600;
        }

        .styled-report-content table {
          color: #333333;
        }

        /* Table header styling - faint teal background with dark text */
        .styled-report-content th {
          background-color: #E0F5F3;
          background-color: var(--teal-subtle, #E0F5F3);
          color: #37448C;
          color: var(--teal-deep, #37448C);
          font-weight: 600;
          text-align: left;
          padding: 12px 15px;
          font-size: 0.875rem;
          border: 1px solid #b09ad5;
        }

        .styled-report-content td {
          color: #333333;
          padding: 10px 15px;
          font-size: 0.9375rem;
          background-color: #ffffff;
        }

        /* Table hover effects with teal (higher specificity to override .prose styles) */
        .styled-report-content.prose tbody tr {
          transition: background-color 0.2s ease;
        }

        .styled-report-content.prose tbody tr:hover {
          background-color: #E0F5F3 !important;
          background-color: var(--teal-subtle, #E0F5F3) !important;
        }

        /* Table header hover effect - enhance the gradient */
        .styled-report-content.prose th {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .styled-report-content.prose thead tr:hover th {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(41, 173, 164, 0.2);
        }

        /* Links with teal color — no color transition (non-composited, flagged by Lighthouse) */
        .styled-report-content a {
          color: #00695C;
          text-decoration: underline;
          text-decoration-color: #B0D9D5;
          text-decoration-color: var(--teal-border, #B0D9D5);
        }

        .styled-report-content a:hover {
          color: #22E1B0;
          color: var(--teal-bright, #22E1B0);
          text-decoration-color: #22E1B0;
          text-decoration-color: var(--teal-bright, #22E1B0);
        }

        /* Blockquotes with teal left border */
        .styled-report-content blockquote {
          border-left: 4px solid #00695C;
          padding-left: 1.25rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: var(--muted-foreground);
          background: #E0F5F3;
          background: var(--teal-subtle, #E0F5F3);
          padding: 1rem 1.25rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        /* Section spacing */
        .styled-report-content > * + * {
          // margin-top: 1rem;
        }

        .styled-report-content > h2 + *,
        .styled-report-content > h3 + * {
          margin-top: 1rem;
        }

        .image-wrapper {
          margin: 1rem 0;
          width: 100%;
        }

        .image-container {
          border-radius: 0.5rem;
          padding: 0.5rem;
        }

        .image-container img {
          width: 100%;
          height: auto;
          max-width: 48rem;
          margin: 0 auto !important;
          display: block;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border: 1px solid var(--border);
        }

        .image-cta-section {
          border-radius: 1rem;
          padding-top: 1rem;
        }

        .image-cta-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          text-align: center;
        }

        .image-cta-text {
          color: var(--muted-foreground);
          font-size: 0.875rem;
          font-weight: 500;
          margin: 0;
          line-height: 1.5;
        }

        .image-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(to right, #0F2D52, #2563A3, #3B7CB8);
          color: white !important;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 14px 0 rgba(37, 99, 163, 0.2);
          white-space: nowrap;
          transform: translateY(0);
          width: 100%;
          max-width: 280px;
        }

        // .image-cta-button:hover {
        //   background: linear-gradient(to right, #0A1F3D, #1B4B7F, #2563A3);
        //   box-shadow: 0 10px 25px -5px rgba(37, 99, 163, 0.25), 0 8px 10px -6px rgba(37, 99, 163, 0.15);
        //   transform: scale(1.02);
        // }

        .download-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        @media (min-width: 480px) {
          .image-wrapper {
            margin: 1.25rem 0;
          }

          .image-container {
            padding: 0.625rem;
          }

          .image-cta-text {
            font-size: 0.9375rem;
          }

          .image-cta-button {
            font-size: 0.9375rem;
            padding: 0.8125rem 1.5rem;
          }

          .download-icon {
            width: 1.125rem;
            height: 1.125rem;
          }
        }

        @media (min-width: 640px) {
          .image-wrapper {
            margin: 1.5rem 0;
          }

          .image-container {
            padding: 0.75rem;
          }

          .image-cta-section {
            padding-top: 1.5rem;
          }

          .image-cta-content {
            flex-direction: row;
            gap: 1rem;
            text-align: left;
          }

          .image-cta-text {
            font-size: 1rem;
          }

          .image-cta-button {
            width: auto;
            font-size: 1rem;
            padding: 0.875rem 1.75rem;
          }

          .download-icon {
            width: 1.25rem;
            height: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .image-cta-text {
            font-size: 1.125rem;
          }

          .image-cta-button {
            font-size: 1.125rem;
          }
        }

        @media (min-width: 2560px) {
          .image-container img {
            max-width: 56rem;
          }
        }
      `}</style>
    </>
  );
};
