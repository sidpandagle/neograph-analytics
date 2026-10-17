import { supabase } from '@/lib/supabase/client';
import { rangeFor } from './pgrst';
import type { ApiResponse } from './config';
import type { LegalPageFilters, LegalPage } from './legal-pages.types';

export async function getLegalPages(
  filters?: LegalPageFilters
): Promise<ApiResponse<LegalPage[]>> {
  /* This selected the whole table and then sliced it in JS, so asking for
     page 2 of 10 still pulled every policy's full `content` across metered
     egress. The window is applied by the database now. The column list is
     explicit for the same reason: `select('*')` on a table with a long text
     column is the pattern the egress budget is spent on. */
  let query = supabase
    .from('neograph_legal_pages')
    .select('id,slug,title,excerpt,content,last_updated,category,metadata')
    .order('id');

  const window = rangeFor(filters?.page, filters?.limit);
  if (window) query = query.range(window.from, window.to);

  const { data, error } = await query;

  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const pages: LegalPage[] = (data ?? []).map(row => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    lastUpdated: row.last_updated,
    category: row.category,
    metadata: row.metadata,
  }));

  return { success: true, data: pages };
}

export async function getLegalPageBySlug(slug: string): Promise<ApiResponse<LegalPage>> {
  const { data, error } = await supabase
    .from('neograph_legal_pages')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: `Legal page "${slug}" not found` };
  }

  return {
    success: true,
    data: {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      lastUpdated: data.last_updated,
      category: data.category,
      metadata: data.metadata,
    },
  };
}
