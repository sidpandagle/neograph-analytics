import { MetadataRoute } from 'next';
import { getReportSitemapEntries } from '@/lib/api/reports';
import { getBlogs } from '@/lib/api/blogs';
import { getPressReleases } from '@/lib/api/press-releases';


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

  return [...pageEntries, ...reportEntries, ...blogEntries, ...pressReleaseEntries];
}
