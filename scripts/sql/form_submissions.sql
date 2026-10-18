-- Lead capture table for the four public form endpoints.
--
-- Until this table existed, /api/contact, /api/request-sample,
-- /api/purchase-inquiry and /api/not-found-inquiry sent one Resend email and
-- kept nothing. A bounced email, a mail rule, or a Resend outage lost the lead
-- with no record that it ever arrived. Every submission now lands here first,
-- and the email is the notification rather than the storage.
--
-- Run once, in the Supabase SQL editor (DDL cannot go through PostgREST):
--   https://supabase.com/dashboard/project/<ref>/sql/new

create table if not exists public.form_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  -- 'contact' | 'request-sample' | 'purchase-inquiry' | 'not-found-inquiry'
  form_type    text not null,
  full_name    text,
  email        text,
  company      text,
  phone        text,
  country      text,
  subject      text,
  report_title text,
  report_slug  text,
  message      text,
  -- Fields that belong to one form only (jobTitle, quotedPrice, attemptedUrl…).
  extra        jsonb not null default '{}'::jsonb,
  source_ip    text,
  user_agent   text,
  referer      text,
  -- Reserved: nothing writes this yet, kept so a triage flag needs no migration.
  handled_at   timestamptz
);

-- The admin list is always "newest first", optionally narrowed to one form.
create index if not exists form_submissions_created_at_idx
  on public.form_submissions (created_at desc);
create index if not exists form_submissions_form_type_created_at_idx
  on public.form_submissions (form_type, created_at desc);

-- RLS on with NO policies: the anon key and any signed-in user get zero rows
-- and cannot insert. Both the public insert and the admin read go through the
-- service-role key on the server, which bypasses RLS. This is deliberate — a
-- policy granting `authenticated` a read would hand every lead to anyone who
-- manages to create an account in the project.
alter table public.form_submissions enable row level security;
