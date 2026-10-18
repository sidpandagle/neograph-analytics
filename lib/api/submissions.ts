/**
 * Lead persistence and the admin read.
 *
 * Both sides use the service-role key: `form_submissions` has RLS enabled with
 * no policies, so the anon key cannot read or write it at all (see
 * scripts/sql/form_submissions.sql for why that is the design rather than an
 * oversight). This module is server-only — importing it from a client
 * component would ship the key to the browser, which the guard below makes
 * loud rather than silent.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { notify } from '@/lib/ntfy';
import { FORM_LABELS, type FormSubmission, type FormType, type SubmissionsPage } from './submissions.types';

const LIST_COLUMNS =
  'id,created_at,form_type,full_name,email,company,phone,country,subject,report_title,report_slug,message,extra,source_ip,user_agent,referer,handled_at';

let cached: SupabaseClient | null = null;

/** Service-role client, memoised per instance. Null when the key is absent. */
function admin(): SupabaseClient | null {
  if (typeof window !== 'undefined') {
    throw new Error('lib/api/submissions is server-only — do not import it into a client component.');
  }
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, { auth: { persistSession: false } });
  return cached;
}

export interface RecordInput {
  formType: FormType;
  /** Already validated and trimmed by lib/api/form-guard's validate(). */
  values: Record<string, string>;
  /** Keys of `values` that go into `extra` rather than their own column. */
  extraKeys?: string[];
  request: Request;
  clientIp?: string;
  /** Overrides for the notification body, e.g. the resolved subject label. */
  summary?: string;
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.neographanalytics.com').replace(/\/$/, '');

/**
 * Store a submission, then notify. Never throws: a storage or notification failure
 * is logged and swallowed so the caller still reports success to the visitor
 * whose form went through. Returns the row id when the insert landed.
 */
export async function recordSubmission(input: RecordInput): Promise<string | null> {
  const { formType, values, extraKeys = [], request, clientIp, summary } = input;

  let id: string | null = null;
  try {
    const db = admin();
    if (!db) {
      console.warn('[submissions] SUPABASE_SERVICE_ROLE_KEY not set — submission not stored.');
    } else {
      const extra: Record<string, string> = {};
      for (const key of extraKeys) {
        if (values[key]) extra[key] = values[key];
      }

      const row = {
        form_type: formType,
        full_name: values.fullName || values.name || null,
        email: values.email || null,
        company: values.company || null,
        phone: values.phone || null,
        country: values.country || null,
        subject: summary || values.subject || null,
        report_title: values.reportTitle || null,
        report_slug: values.reportSlug || null,
        message: values.message || values.additionalInfo || values.interest || null,
        extra,
        source_ip: clientIp || null,
        user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
        referer: request.headers.get('referer')?.slice(0, 500) || null,
      };

      const { data, error } = await db
        .from('form_submissions')
        .insert(row)
        .select('id')
        .single();

      if (error) console.error('[submissions] insert failed:', error.message);
      else id = (data as { id: string }).id;
    }
  } catch (err) {
    console.error('[submissions] insert error:', err);
  }

  // Notify even when the insert failed — that is exactly the case where the
  // only surviving trace of the lead may be the phone in someone's pocket.
  try {
    const who = values.fullName || values.name || values.email || 'Someone';
    const lines = [
      `${who}${values.company ? ` (${values.company})` : ''}`,
      values.email || '',
      summary || values.subject || values.reportTitle || '',
      (values.message || values.additionalInfo || values.interest || '').slice(0, 400),
    ].filter(Boolean);

    await notify({
      title: `New ${FORM_LABELS[formType]} submission`,
      message: lines.join('\n'),
      click: `${SITE_URL}/admin/submissions`,
      tags: ['inbox_tray'],
    });
  } catch (err) {
    console.error('[submissions] notify error:', err);
  }

  return id;
}

export interface ListOptions {
  page?: number;
  limit?: number;
  formType?: FormType;
  /** Matched against name, email and company. */
  search?: string;
}

/**
 * Newest first, paginated in the database. `count: 'exact'` gives the pager a
 * real total without a second query.
 */
export async function listSubmissions(opts: ListOptions = {}): Promise<SubmissionsPage> {
  const db = admin();
  if (!db) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured.');

  const page = Math.max(1, Math.floor(opts.page || 1));
  const limit = Math.min(200, Math.max(1, Math.floor(opts.limit || 50)));
  const from = (page - 1) * limit;

  let q = db
    .from('form_submissions')
    .select(LIST_COLUMNS, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + limit - 1);

  if (opts.formType) q = q.eq('form_type', opts.formType);

  const term = (opts.search || '').trim();
  if (term) {
    // Build the or() from escaped alternatives — a comma or parenthesis in the
    // term would otherwise be read as filter grammar (see lib/api/pgrst.ts).
    const safe = term.replace(/[(),*]/g, ' ').trim();
    if (safe) {
      q = q.or(
        ['full_name', 'email', 'company', 'report_title']
          .map((c) => `${c}.ilike.*${safe}*`)
          .join(',')
      );
    }
  }

  const { data, error, count } = await q;
  if (error) throw new Error(error.message);

  return {
    rows: (data ?? []) as unknown as FormSubmission[],
    total: count ?? 0,
    page,
    limit,
  };
}
