// Blog types for API integration
import type { ApiCategory } from './categories.types';
import type { ApiAuthor } from './common.types';

/**
 * Blog status from API
 */
export type BlogStatus = 'draft' | 'review' | 'published';

/**
 * Blog metadata from API
 */
export interface ApiBlogMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  [key: string]: string | string[] | undefined;
}

/**
 * Blog entity from API (matches actual API response)
 */
export interface ApiBlog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryId?: number;
  authorId?: number;
  author?: ApiAuthor;
  category?: ApiCategory;
  tags?: string;
  status: BlogStatus;
  publishDate?: string | null;
  scheduledPublishEnabled?: boolean;
  location?: string;
  metadata?: ApiBlogMetadata;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string | null;
  reviewedBy?: number | null;
}

/**
 * UI Blog interface (used by components)
 */
export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content: string;

  // Extended fields for detail page
  tags?: string[];
  location?: string;

  // Full nested objects from API
  authorId?: number;
  categoryId?: number;
  authorDetails?: ApiAuthor;
  categoryDetails?: ApiCategory;

  // Metadata fields
  metadata?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  // Publishing fields
  status?: BlogStatus;
  publishDate?: string | null;
  scheduledPublishEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Blog filters for API queries
 */
export interface BlogFilters {
  page?: number;
  limit?: number;
  status?: BlogStatus;
  category?: string;
  categoryId?: number;
  authorId?: number;
  search?: string;
}

/**
 * Paginated list of blogs from API
 */
export interface BlogsListData {
  blogs: ApiBlog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Single blog detail response from API
 */
export interface BlogDetailData {
  blog: ApiBlog;
}
