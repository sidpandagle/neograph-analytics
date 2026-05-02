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

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all images in the content
    const images = contentRef.current.querySelectorAll('img');

    images.forEach((img, i) => {
      // Skip if already wrapped (check for image-container as it's the direct parent after wrapping)
      if (img.parentElement?.classList.contains('image-container')) return;

      // Set loading/decoding attributes before wrapping
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');

      // Reserve space to prevent CLS if natural dimensions are available
      if (!img.getAttribute('width') && img.naturalWidth) {
        img.setAttribute('width', String(img.naturalWidth));
        img.setAttribute('height', String(img.naturalHeight));
      }

      // Create wrapper div for image
      const wrapper = document.createElement('div');
      wrapper.className = 'image-wrapper';

      // Create image container with border (matching the commented code styling)
      const imageContainer = document.createElement('div');
      imageContainer.className = 'image-container';

      // Wrap the image
      img.parentNode?.insertBefore(wrapper, img);
      imageContainer.appendChild(img);
      wrapper.appendChild(imageContainer);

      // Only add CTA to the first image and check globally if CTA already exists
      if (i === 0 && contentRef.current) {
        // Check if CTA section already exists anywhere in the content to prevent duplication
        const existingCTA = contentRef.current.querySelector('.image-cta-section');
        if (!existingCTA) {
          // Create CTA section (matching the commented code styling)
          const ctaSection = document.createElement('div');
          ctaSection.className = 'image-cta-section';
          ctaSection.innerHTML = `
            <div class="image-cta-content">
              <div class="image-cta-text">To learn more about this report,</div>
              <a href="/request-sample${reportSlug ? `?report=${reportSlug}` : ''}"  target="_blank" class="image-cta-button">
                <svg class="download-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Free Sample
              </a>
            </div>
          `;
          wrapper.appendChild(ctaSection);
        }
      }
    });
  }, [htmlContent, reportSlug]);

  return (
    <>
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none styled-report-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx global>{`
        /* Typography overrides for report content */
        .styled-report-content {
          color: var(--foreground);
        }

        /* H1 fallback */
        .styled-report-content h1 {
          color: var(--foreground);
          font-weight: 700;
          margin-top: 2.5rem;
        }

        /* H2 - Major sections */
        .styled-report-content h2 {
          color: var(--foreground);
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        /* H3 - Subsections */
        .styled-report-content h3 {
          color: var(--primary);
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        /* H5/H6 - Smallest headings */
        .styled-report-content h5,
        .styled-report-content h6 {
          color: var(--foreground);
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
          color: var(--muted-foreground);
          font-size: 1rem;
          line-height: 1.75;
        }

        .styled-report-content ul,
        .styled-report-content ol {
          color: var(--foreground);
        }

        .styled-report-content li {
          color: var(--foreground);
        }

        .styled-report-content strong {
          color: var(--foreground);
          font-weight: 600;
        }

        .styled-report-content table {
          color: var(--foreground);
        }

        /* Table header styling */
        .styled-report-content th {
          background-color: var(--muted);
          color: var(--foreground);
          font-weight: 600;
          text-align: left;
          padding: 12px 15px;
          font-size: 0.875rem;
          border: 1px solid var(--border);
        }

        .styled-report-content td {
          color: var(--foreground);
          padding: 10px 15px;
          font-size: 0.9375rem;
          background-color: var(--card);
        }

        /* Table hover effects with teal (higher specificity to override .prose styles) */
        .styled-report-content.prose tbody tr {
          transition: background-color 0.2s ease;
        }

        .styled-report-content.prose tbody tr:hover {
          background-color: var(--muted) !important;
        }

        /* Table header hover effect - enhance the gradient */
        .styled-report-content.prose th {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .styled-report-content.prose thead tr:hover th {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px hsl(var(--accent-hsl) / 0.18);
        }

        /* Links */
        .styled-report-content a {
          color: var(--primary);
          text-decoration: underline;
          text-decoration-color: hsl(var(--primary-hsl) / 0.35);
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }

        .styled-report-content a:hover {
          color: var(--accent);
          text-decoration-color: hsl(var(--accent-hsl) / 0.45);
        }

        /* Blockquotes */
        .styled-report-content blockquote {
          border-left: 4px solid var(--primary);
          padding-left: 1.25rem;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: var(--foreground);
          background: hsl(var(--primary-hsl) / 0.06);
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
          aspect-ratio: attr(width) / attr(height);
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
          background: var(--primary);
          color: white !important;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 4px 14px 0 hsl(var(--primary-hsl) / 0.2);
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
