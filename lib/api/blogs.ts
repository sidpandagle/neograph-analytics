// Blog API client functions

import { apiFetch, buildQueryString, type ApiResponse, type PaginationMeta } from './config';
import type {
  BlogFilters,
  BlogsListData,
  BlogDetailData,
  Blog,
  ApiBlog,
} from './blogs.types';
import { mapApiBlogsToblogs, mapApiBlogToBlog } from './mappers';

/**
 * Fetch all blogs from the API
 *
 * @param filters - Optional filters (page, limit, status, categoryId, etc.)
 * @returns Promise<ApiResponse<Blog[]>>
 *
 * @example
 * const response = await getBlogs({ status: 'published', limit: 100 });
 * if (!isApiError(response)) {
 *   const blogs = response.data;
 * }
 */
export async function getBlogs(
  filters?: BlogFilters
): Promise<ApiResponse<Blog[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    page: filters?.page || 1,
    limit: filters?.limit || 100,
    status: filters?.status || 'published',
    ...(filters?.category && { category: filters.category }),
    ...(filters?.categoryId && { categoryId: filters.categoryId }),
    ...(filters?.authorId && { authorId: filters.authorId }),
    ...(filters?.search && { search: filters.search }),
  };

  const queryString = buildQueryString(params);
  const response = await apiFetch<BlogsListData>(`/api/v1/blogs${queryString}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiBlogs: ApiBlog[];

  // Check if data is directly the array or nested
  if (Array.isArray(response.data)) {
    // API returned array directly
    apiBlogs = response.data;
  } else if (response.data && typeof response.data === 'object' && 'blogs' in response.data) {
    // API returned { blogs: [...], page, limit, total, totalPages }
    apiBlogs = (response.data as { blogs: ApiBlog[] }).blogs;
  } else {
    console.error('Unexpected response structure:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }

  // Map API blogs to UI format
  const mappedBlogs = mapApiBlogsToblogs(apiBlogs);

  return {
    success: true,
    data: mappedBlogs,
    meta: (response.data as { meta?: PaginationMeta })?.meta,
  };
}

/**
 * Fetch a single blog by slug
 *
 * @param slug - Blog slug (e.g., 'future-of-personalized-medicine')
 * @returns Promise<ApiResponse<Blog>>
 *
 * @example
 * const response = await getBlogBySlug('future-of-personalized-medicine');
 * if (!isApiError(response)) {
 *   const blog = response.data;
 * }
 */
export async function getBlogBySlug(slug: string): Promise<ApiResponse<Blog>> {
  const response = await apiFetch<BlogDetailData>(`/api/v1/blogs/slug/${slug}`);

  // If error, return as-is
  if (!response.success) {
    return response;
  }

  // Handle different response structures
  let apiBlog: ApiBlog;

  if (response.data && typeof response.data === 'object') {
    // Check if data is nested or direct
    if ('blog' in response.data) {
      apiBlog = (response.data as { blog: ApiBlog }).blog;
    } else {
      // Assume response.data is the blog itself
      apiBlog = response.data;
    }
  } else {
    console.error('Unexpected response structure for getBlogBySlug:', response.data);
    return {
      success: false,
      error: 'invalid_response',
      message: 'API returned unexpected response structure',
    };
  }
  // console.log(apiBlog);

  // Map API blog to UI format
  const mappedBlog = mapApiBlogToBlog(apiBlog);

  return {
    success: true,
    data: mappedBlog,
  };
}

/**
 * Search blogs by query string
 *
 * @param query - Search query string
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 50)
 * @returns Promise<ApiResponse<Blog[]>>
 *
 * @example
 * const response = await searchBlogs('personalized medicine', 1, 20);
 * if (!isApiError(response)) {
 *   const results = response.data;
 * }
 */
export async function searchBlogs(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<ApiResponse<Blog[]>> {
  return getBlogs({
    search: query,
    page,
    limit,
    status: 'published',
  });
}
