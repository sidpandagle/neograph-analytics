// Press Release types for API integration
import type { ApiCategory } from './categories.types';
import type { ApiAuthor } from './common.types';

/**
 * Press Release status from API
 */
export type PressReleaseStatus = 'draft' | 'review' | 'published';

/**
 * Press Release metadata from API
 */
export interface ApiPressReleaseMetadata {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  [key: string]: string | string[] | undefined;
}

/**
 * Press Release entity from API (matches actual API response)
 */
export interface ApiPressRelease {
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
  status: PressReleaseStatus;
  publishDate?: string | null;
  scheduledPublishEnabled?: boolean;
  location?: string;
  reportUrl?: string;
  metadata?: ApiPressReleaseMetadata;
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string | null;
  reviewedBy?: number | null;
}

/**
 * UI Press Release interface (used by components)
 */
export interface PressRelease {
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
  reportUrl?: string;

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
  status?: PressReleaseStatus;
  publishDate?: string | null;
  scheduledPublishEnabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Press Release filters for API queries
 */
export interface PressReleaseFilters {
  page?: number;
  limit?: number;
  status?: PressReleaseStatus;
  category?: string;
  categoryId?: number;
  authorId?: number;
  search?: string;
}

/**
 * Paginated list of press releases from API
 */
export interface PressReleasesListData {
  pressReleases: ApiPressRelease[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Single press release detail response from API
 */
export interface PressReleaseDetailData {
  pressRelease: ApiPressRelease;
}
