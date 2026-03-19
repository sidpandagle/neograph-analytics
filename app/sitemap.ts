import { MetadataRoute } from 'next';
import { apiFetch } from '@/lib/api/config';

export const revalidate = 3600; // regenerate hourly

const BASE_URL = 'https://www.healthcareforesights.com';
const ITEMS_PER_SITEMAP = 1000;

interface SitemapMeta {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

async function getSitemapTotalPages(type: 'reports' | 'blogs' | 'press-releases'): Promise<number> {
  const res = await apiFetch<unknown>(`/api/v1/sitemap/${type}?page=1&limit=${ITEMS_PER_SITEMAP}`);
  if (!res.success) return 1;
  const meta = (res as unknown as { meta?: SitemapMeta }).meta;
  if (!meta?.total) return 1;
  return Math.ceil(meta.total / ITEMS_PER_SITEMAP);
}

/**
 * Sitemap Index
 *
 * This is the main sitemap that references all sub-sitemaps.
 *
 * Sub-sitemaps:
 * - /sitemap-pages.xml - Static pages (home, about, services, etc.)
 * - /sitemap-reports-1.xml, /sitemap-reports-2.xml, ... - Published research reports (1000 per file)
 * - /sitemap-blogs-1.xml, /sitemap-blogs-2.xml, ... - Published blog posts (1000 per file)
 * - /sitemap-press-releases-1.xml, /sitemap-press-releases-2.xml, ... - Published press releases (1000 per file)
 * - /sitemap-consulting.xml - Consulting services pages
 * - /news-sitemap.xml - Google News sitemap (all blogs + press releases)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [reportsTotalPages, blogsTotalPages, prTotalPages] = await Promise.all([
    getSitemapTotalPages('reports'),
    getSitemapTotalPages('blogs'),
    getSitemapTotalPages('press-releases'),
  ]);

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/sitemap-pages.xml`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sitemap-consulting.xml`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/news-sitemap.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  // Reports paginated sitemaps: sitemap-reports-1.xml, sitemap-reports-2.xml, ...
  for (let i = 1; i <= reportsTotalPages; i++) {
    entries.push({
      url: `${BASE_URL}/sitemap-reports-${i}.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    });
  }

  // Blogs paginated sitemaps: sitemap-blogs-1.xml, sitemap-blogs-2.xml, ...
  for (let i = 1; i <= blogsTotalPages; i++) {
    entries.push({
      url: `${BASE_URL}/sitemap-blogs-${i}.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    });
  }

  // Press releases paginated sitemaps: sitemap-press-releases-1.xml, sitemap-press-releases-2.xml, ...
  for (let i = 1; i <= prTotalPages; i++) {
    entries.push({
      url: `${BASE_URL}/sitemap-press-releases-${i}.xml`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    });
  }

  return entries;
}
