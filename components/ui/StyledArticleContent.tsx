'use client';

interface StyledArticleContentProps {
  htmlContent: string;
}

export const StyledArticleContent: React.FC<StyledArticleContentProps> = ({
  htmlContent,
}) => {
  return (
    <>
      <div
        className="prose prose-lg max-w-none styled-article-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <style jsx global>{`
        /* Typography overrides for article content */
        .styled-article-content {
          color: var(--foreground);
        }

        /* H1 */
        .styled-article-content h1 {
          color: var(--foreground);
          font-weight: 700;
          margin-top: 2.5rem;
        }

        /* H2 - Major sections */
        .styled-article-content h2 {
          color: var(--foreground);
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }

        /* H3 - Subsections */
        .styled-article-content h3 {
          color: var(--primary);
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        /* H5/H6 - Smallest headings */
        .styled-article-content h5,
        .styled-article-content h6 {
          color: var(--foreground);
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        /* Ensure strong tags inside headings inherit heading color */
        .styled-article-content h1 strong,
        .styled-article-content h2 strong,
        .styled-article-content h3 strong,
        .styled-article-content h4 strong,
        .styled-article-content h5 strong,
        .styled-article-content h6 strong {
          color: inherit;
        }

        .styled-article-content p {
          color: var(--muted-foreground);
          line-height: 1.75;
        }

        .styled-article-content ul,
        .styled-article-content ol {
          color: var(--foreground);
        }

        .styled-article-content li {
          color: var(--foreground);
        }

        .styled-article-content strong {
          color: var(--foreground);
          font-weight: 600;
        }

        .styled-article-content table {
          color: var(--foreground);
        }

        /* Table header styling */
        .styled-article-content th {
          background-color: var(--muted);
          color: var(--foreground);
          font-weight: 600;
          text-align: left;
          padding: 12px 15px;
          font-size: 0.875rem;
          border: 1px solid var(--border);
        }

        .styled-article-content td {
          color: var(--foreground);
          padding: 10px 15px;
          font-size: 0.9375rem;
          background-color: var(--card);
        }

        /* Table hover effects with teal */
        .styled-article-content.prose tbody tr {
          transition: background-color 0.2s ease;
        }

        .styled-article-content.prose tbody tr:hover {
          background-color: var(--muted) !important;
        }

        /* Table header hover effect */
        .styled-article-content.prose th {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .styled-article-content.prose thead tr:hover th {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px hsl(var(--accent-hsl) / 0.18);
        }

        /* Links */
        .styled-article-content a {
          color: var(--primary);
          text-decoration: underline;
          text-decoration-color: hsl(var(--primary-hsl) / 0.35);
          transition: color 0.2s ease, text-decoration-color 0.2s ease;
        }

        .styled-article-content a:hover {
          color: var(--accent);
          text-decoration-color: hsl(var(--accent-hsl) / 0.45);
        }

        /* Blockquotes */
        .styled-article-content blockquote {
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
        .styled-article-content > h2 + *,
        .styled-article-content > h3 + * {
          margin-top: 1rem;
        }
      `}</style>
    </>
  );
};
