/** One row of `public.form_submissions`. Mirrors scripts/sql/form_submissions.sql. */
export interface FormSubmission {
  id: string;
  created_at: string;
  form_type: FormType;
  full_name: string | null;
  email: string | null;
  company: string | null;
  phone: string | null;
  country: string | null;
  subject: string | null;
  report_title: string | null;
  report_slug: string | null;
  message: string | null;
  extra: Record<string, string> | null;
  source_ip: string | null;
  user_agent: string | null;
  referer: string | null;
  handled_at: string | null;
}

export type FormType =
  | 'contact'
  | 'request-sample'
  | 'purchase-inquiry'
  | 'not-found-inquiry';

export const FORM_TYPES: FormType[] = [
  'contact',
  'request-sample',
  'purchase-inquiry',
  'not-found-inquiry',
];

export const FORM_LABELS: Record<FormType, string> = {
  contact: 'Contact',
  'request-sample': 'Sample request',
  'purchase-inquiry': 'Purchase inquiry',
  'not-found-inquiry': '404 inquiry',
};

/** What the admin API returns. */
export interface SubmissionsPage {
  rows: FormSubmission[];
  /** Total matching rows, for the pager — not just this page's length. */
  total: number;
  page: number;
  limit: number;
}
