import { notFound } from 'next/navigation';
import { getAuthorById, getReportsByAuthorId, isApiError } from '@/lib/api';
import { Breadcrumb } from '@/components/ui';
import AuthorProfile from '@/components/authors/AuthorProfile';
import AuthorReportsListing from '@/components/authors/AuthorReportsListing';
import type { Metadata } from 'next';

import { supabase } from '@/lib/supabase/client';


// Content is served from Supabase and must not be cached forever. Without this,
// App Router marks the route fully static (X-Nextjs-Stale-Time: 4294967294) and
// Vercel serves the build-time HTML until the next deploy - which is why
// production was serving 28-day-old pages.
export const revalidate = 3600;

export async function generateStaticParams() {
  const { data } = await supabase.from('neograph_team_members').select('id');
  return (data ?? []).map((_, index) => ({ id: (index + 1).toString() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const authorId = parseInt(id);

    if (isNaN(authorId)) {
      return {
        title: 'Author Not Found',
      };
    }

    const response = await getAuthorById(authorId);

    if (isApiError(response)) {
      return {
        title: 'Author Not Found',
      };
    }

    const author = response.data;

    return {
      title: `Healthcare Articles by ${author.name}`,
      description: `Browse healthcare market articles, insights, and research content published by ${author.name}.`,
      keywords: ["healthcare articles", "healthcare research blogs", "market insights", "medical industry content"],
      openGraph: {
        title: `Healthcare Articles by ${author.name}`,
        description: `Browse healthcare market articles, insights, and research content published by ${author.name}.`,
        images: author.imageUrl ? [{ url: author.imageUrl }] : [],
      },
      alternates: {
        canonical: `/authors/${id}`,
      },
    };
  } catch {
    return { title: 'Author Not Found' };
  }
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const authorId = parseInt(id);

  // Validate numeric ID
  if (isNaN(authorId)) {
    notFound();
  }

  // Parallel fetch: author + reports
  let authorResponse;
  let reportsResponse;
  try {
    [authorResponse, reportsResponse] = await Promise.all([
      getAuthorById(authorId),
      getReportsByAuthorId(authorId, { status: 'published', limit: 1000 }),
    ]);
  } catch {
    notFound();
  }

  // Error handling
  if (isApiError(authorResponse)) {
    console.error('Failed to fetch author:', authorResponse.message);
    notFound();
  }

  const author = authorResponse.data;
  const reports = isApiError(reportsResponse) ? [] : reportsResponse.data;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Authors', href: '/authors' },
    { label: author.name },
  ];

  return (
    <div className="bg-[var(--background)]">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="px-4 py-4 md:px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 md:px-6 max-w-7xl mx-auto">
        <AuthorProfile author={author} totalReports={reports.length} />
        <AuthorReportsListing reports={reports} authorName={author.name} />
      </div>
    </div>
  );
}
