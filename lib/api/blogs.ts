import { supabase } from '@/lib/supabase/client';
import { ilikeAny, rangeFor } from './pgrst';
import type { Blog, BlogFilters } from './blogs.types';
import type { ApiResponse } from './config';

export async function getBlogs(filters?: BlogFilters): Promise<ApiResponse<Blog[]>> {
  let query = supabase
    .from('neograph_blogs')
    .select('*')
    .order('id');

  const searchFilter = ilikeAny(['title', 'excerpt'], filters?.search ?? '');
  if (searchFilter) query = query.or(searchFilter);

  /* page/limit were accepted and then ignored, so every caller that asked for
     one page still pulled the whole table across metered egress. They are
     applied server-side now. A caller that passes neither still gets the
     whole table, so no existing call site changes behaviour. */
  const window = rangeFor(filters?.page, filters?.limit);
  if (window) query = query.range(window.from, window.to);

  const { data, error } = await query;
  if (error) return { success: false, error: 'fetch_error', message: error.message };

  const blogs: Blog[] = (data ?? []).map(row => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    content: row.content,
    location: row.location,
  }));

  return { success: true, data: blogs };
}

export async function getBlogBySlug(slug: string): Promise<ApiResponse<Blog>> {
  const { data, error } = await supabase
    .from('neograph_blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { success: false, error: 'not_found', message: 'Blog not found' };
  }

  return {
    success: true,
    data: {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      author: data.author,
      date: data.date,
      readTime: data.read_time,
      content: data.content,
      location: data.location,
    },
  };
}

export async function searchBlogs(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Blog[]>> {
  return getBlogs({ search: query, page, limit });
}
