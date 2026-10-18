'use client';

/**
 * Sign-in + the submissions table, newest first.
 *
 * The browser only ever holds the anon key and its own session; the rows come
 * from /api/admin/submissions, which re-verifies the token and the email
 * allowlist on every request. Hiding the table client-side is presentation,
 * not the security boundary.
 */
import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { browserSupabase } from '@/lib/supabase/browser';
import { Badge, Button, Container, Section } from '@/components/ui';
import {
  FORM_LABELS,
  FORM_TYPES,
  type FormSubmission,
  type FormType,
  type SubmissionsPage,
} from '@/lib/api/submissions.types';

const PAGE_SIZE = 50;

const TYPE_BADGE: Record<FormType, 'primary' | 'success' | 'warning' | 'default'> = {
  contact: 'primary',
  'request-sample': 'success',
  'purchase-inquiry': 'warning',
  'not-found-inquiry': 'default',
};

/** Local time, to the minute — a lead's age is the whole point of the sort. */
function stamp(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
}

export default function SubmissionsClient() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = browserSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <Section padding="lg">
        <Container>
          <p className="text-sm text-[var(--muted-foreground)]">Checking your session…</p>
        </Container>
      </Section>
    );
  }

  return session ? <SubmissionsTable session={session} /> : <LoginCard />;
}

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: signInError } = await browserSupabase().auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    // Supabase returns one message for a wrong password and an unknown address
    // alike; keep it that way rather than confirming which emails exist.
    if (signInError) setError(signInError.message);
    setBusy(false);
  }

  return (
    <Section padding="xl">
      <Container size="sm">
        <div className="mx-auto max-w-sm rounded-2xl border border-[var(--cmi-line)] bg-[var(--card)] p-8">
          <h1 className="text-xl font-semibold text-[var(--cmi-ink)]">Submissions</h1>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            Sign in with your NeoGraph administrator account.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-[var(--cmi-ink)]">Email</span>
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[var(--cmi-line)] bg-[var(--background)] px-3 py-2.5 text-[15px] text-[var(--foreground)] outline-none focus-visible:border-[var(--cmi-primary)]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-[var(--cmi-ink)]">Password</span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[var(--cmi-line)] bg-[var(--background)] px-3 py-2.5 text-[15px] text-[var(--foreground)] outline-none focus-visible:border-[var(--cmi-primary)]"
              />
            </label>

            {error && (
              <p role="alert" className="text-[13px] text-[var(--destructive)]">
                {error}
              </p>
            )}

            <Button type="submit" fullWidth isLoading={busy}>
              Sign in
            </Button>
          </form>
        </div>
      </Container>
    </Section>
  );
}

function SubmissionsTable({ session }: { session: Session }) {
  const [data, setData] = useState<SubmissionsPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [formType, setFormType] = useState<'' | FormType>('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [openRow, setOpenRow] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Read the token from the live session rather than the prop so a refresh
      // between renders does not send a stale one.
      const { data: current } = await browserSupabase().auth.getSession();
      const token = current.session?.access_token ?? session.access_token;

      const qs = new URLSearchParams({ page: String(page), limit: String(PAGE_SIZE) });
      if (formType) qs.set('formType', formType);
      if (search) qs.set('search', search);

      const res = await fetch(`/api/admin/submissions?${qs}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json?.message || 'Could not load submissions.');
        setData(null);
      } else {
        setData(json.data as SubmissionsPage);
      }
    } catch {
      setError('Network error while loading submissions.');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [page, formType, search, session.access_token]);

  useEffect(() => {
    void load();
  }, [load]);

  const total = data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Section padding="lg">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--cmi-ink)]">Form submissions</h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {loading ? 'Loading…' : `${total} submission${total === 1 ? '' : 's'}, newest first`}
              {' · '}
              {session.user.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => void load()}>
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void browserSupabase().auth.signOut()}
            >
              Sign out
            </Button>
          </div>
        </div>

        <form
          className="mt-6 flex flex-wrap items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setPage(1);
            setSearch(searchInput.trim());
          }}
        >
          <select
            value={formType}
            onChange={(e) => {
              setPage(1);
              setFormType(e.target.value as '' | FormType);
            }}
            className="rounded-lg border border-[var(--cmi-line)] bg-[var(--card)] px-3 py-2 text-[14px] text-[var(--foreground)]"
          >
            <option value="">All forms</option>
            {FORM_TYPES.map((t) => (
              <option key={t} value={t}>
                {FORM_LABELS[t]}
              </option>
            ))}
          </select>

          <input
            type="search"
            placeholder="Name, email, company or report"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="min-w-[240px] flex-1 rounded-lg border border-[var(--cmi-line)] bg-[var(--card)] px-3 py-2 text-[14px] text-[var(--foreground)] outline-none focus-visible:border-[var(--cmi-primary)]"
          />
          <Button type="submit" size="sm" variant="secondary">
            Search
          </Button>
        </form>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-[var(--destructive)] px-4 py-3 text-sm text-[var(--destructive)]"
          >
            {error}
          </p>
        )}

        {!error && (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--cmi-line)]">
            <table className="w-full min-w-[840px] border-collapse text-left text-[14px]">
              <thead>
                <tr className="bg-[var(--muted)] text-[12.5px] uppercase tracking-wide text-[var(--muted-foreground)]">
                  <th scope="col" className="px-4 py-3 font-semibold">Received</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Form</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Email</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Company</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Subject / report</th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    <span className="sr-only">Detail</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(data?.rows ?? []).map((row) => (
                  <SubmissionRow
                    key={row.id}
                    row={row}
                    open={openRow === row.id}
                    onToggle={() => setOpenRow(openRow === row.id ? null : row.id)}
                  />
                ))}
                {!loading && !data?.rows.length && (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-[var(--muted-foreground)]">
                      No submissions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div className="mt-6 flex items-center justify-between gap-4">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-[13px] text-[var(--muted-foreground)]">
              Page {page} of {pages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= pages || loading}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </Container>
    </Section>
  );
}

function SubmissionRow({
  row,
  open,
  onToggle,
}: {
  row: FormSubmission;
  open: boolean;
  onToggle: () => void;
}) {
  const extras = Object.entries(row.extra ?? {});

  return (
    <>
      <tr className="border-t border-[var(--cmi-line)] align-top">
        <td className="whitespace-nowrap px-4 py-3 text-[var(--muted-foreground)]">{stamp(row.created_at)}</td>
        <td className="px-4 py-3">
          <Badge variant={TYPE_BADGE[row.form_type] ?? 'default'} size="sm">
            {FORM_LABELS[row.form_type] ?? row.form_type}
          </Badge>
        </td>
        <td className="px-4 py-3 font-medium text-[var(--cmi-ink)]">{row.full_name || '—'}</td>
        <td className="px-4 py-3">
          {row.email ? (
            <a className="text-[var(--cmi-primary)] hover:underline" href={`mailto:${row.email}`}>
              {row.email}
            </a>
          ) : (
            '—'
          )}
        </td>
        <td className="px-4 py-3">{row.company || '—'}</td>
        <td className="max-w-[260px] px-4 py-3">{row.subject || row.report_title || '—'}</td>
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="text-[13px] font-semibold text-[var(--cmi-primary)] hover:underline"
          >
            {open ? 'Hide' : 'Detail'}
          </button>
        </td>
      </tr>

      {open && (
        <tr className="border-t border-[var(--cmi-line)] bg-[var(--muted)]">
          <td colSpan={7} className="px-4 py-4">
            <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <Field label="Phone" value={row.phone} />
              <Field label="Country" value={row.country} />
              <Field label="Report" value={row.report_title} />
              <Field label="Report slug" value={row.report_slug} />
              {extras.map(([k, v]) => (
                <Field key={k} label={k} value={v} />
              ))}
              <Field label="Referer" value={row.referer} />
              <Field label="IP" value={row.source_ip} />
            </dl>
            {row.message && (
              <div className="mt-4">
                <dt className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
                  Message
                </dt>
                <p className="mt-1 whitespace-pre-wrap text-[14px] text-[var(--foreground)]">{row.message}</p>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

function Field({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[12.5px] font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
        {label}
      </dt>
      <dd className="text-[14px] text-[var(--foreground)] break-words">{value}</dd>
    </div>
  );
}
