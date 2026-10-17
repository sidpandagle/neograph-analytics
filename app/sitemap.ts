import { MetadataRoute } from 'next';
import { getReportSitemapEntries } from '@/lib/api/reports';
import { getBlogs } from '@/lib/api/blogs';
import { getPressReleases } from '@/lib/api/press-releases';
import { getAllConsultingServices } from '@/lib/api/consulting';
import { supabase } from '@/lib/supabase/client';


// Content is served from Supabase and must not be cached forever. Without this,
// App Router marks the route fully static (X-Nextjs-Stale-Time: 4294967294) and
// Vercel serves the build-time HTML until the next deploy - which is why
// production was serving 28-day-old pages.
export const revalidate = 3600;

const BASE_URL = 'https://www.neographanalytics.com';

const STATIC_PAGES = [
  { path: '/',                changeFrequency: 'daily'   as const, priority: 1.0 },
  { path: '/reports',         changeFrequency: 'daily'   as const, priority: 0.9 },
  { path: '/blog',            changeFrequency: 'daily'   as const, priority: 0.8 },
  { path: '/press-releases',  changeFrequency: 'weekly'  as const, priority: 0.7 },
  { path: '/about',           changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/methodology',     changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/services',        changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/contact',         changeFrequency: 'monthly' as const, priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const pageEntries: MetadataRoute.Sitemap = STATIC_PAGES.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Report pages from Supabase
  const reportSlugs = await getReportSitemapEntries();
  const reportEntries: MetadataRoute.Sitemap = reportSlugs.map((report) => ({
    url: `${BASE_URL}/reports/${report.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages from API (graceful fallback)
  const blogsRes = await getBlogs({ status: 'published', page: 1, limit: 500 });
  const blogEntries: MetadataRoute.Sitemap =
    blogsRes.success && blogsRes.data
      ? blogsRes.data.map((blog: { slug: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/blog/${blog.slug}`,
          lastModified: blog.updatedAt ? new Date(blog.updatedAt) : now,
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        }))
      : [];

  // Press release pages from API (graceful fallback)
  const prRes = await getPressReleases({ status: 'published', page: 1, limit: 500 });
  const pressReleaseEntries: MetadataRoute.Sitemap =
    prRes.success && prRes.data
      ? prRes.data.map((pr: { slug: string; updatedAt?: string }) => ({
          url: `${BASE_URL}/press-releases/${pr.slug}`,
          lastModified: pr.updatedAt ? new Date(pr.updatedAt) : now,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }))
      : [];

  /* Three page families were indexable, rendered by the build, and in no
     sitemap that robots.ts advertises: 4 legal pages, 10 consulting services
     and 3 author profiles — 17 URLs. The consulting ones did have a sitemap
     of their own, `/sitemap-consulting.xml`, which `robots.ts` never names,
     so no crawler was told it exists. With Search Console reporting 7 pages
     indexed of 158, a sitemap that omits real pages is not a small gap.
     `/sitemap-pages.xml` and `/sitemap-consulting.xml` still serve their own
     subsets; this route is the complete one, and the one robots points at. */

  // Legal pages. A lean select: the table's `content` is a large column and
  // this route revalidates hourly, so `getLegalPages` (which selects *) would
  // pull every policy's full text to print four URLs.
  const { data: legalRows } = await supabase
    .from('neograph_legal_pages')
    .select('slug,last_updated')
    .order('id');
  const legalEntries: MetadataRoute.Sitemap = (legalRows ?? []).map(
    (row: { slug: string; last_updated?: string | null }) => ({
      url: `${BASE_URL}/legal/${row.slug}`,
      lastModified: row.last_updated ? new Date(row.last_updated) : now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })
  );

  // Consulting service pages from /consulting/[slug].
  const consultingServices = await getAllConsultingServices();
  const consultingEntries: MetadataRoute.Sitemap = consultingServices.map((service) => ({
    url: `${BASE_URL}/consulting/${service.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  /* Author profiles. The route param is positional, not the team member's own
     id — `/authors/1` is the first row of `neograph_team_members` ordered by
     id, because the real ids are strings ("tm001") and cannot be the numeric
     param. `lib/api/authors.ts` and `app/authors/[id]/generateStaticParams`
     both build the range this same way; this is the third place that has to
     agree, so it counts rows rather than reading ids. */
  const { data: teamRows } = await supabase
    .from('neograph_team_members')
    .select('id');
  const authorEntries: MetadataRoute.Sitemap = (teamRows ?? []).map((_, index) => ({
    url: `${BASE_URL}/authors/${index + 1}`,
    lastModified: now,
    changeFrequency: 'yearly' as const,
    priority: 0.4,
  }));

  return [
    ...pageEntries,
    ...reportEntries,
    ...blogEntries,
    ...pressReleaseEntries,
    ...consultingEntries,
    ...legalEntries,
    ...authorEntries,
  ];
}
