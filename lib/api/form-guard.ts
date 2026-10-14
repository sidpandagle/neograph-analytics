/**
 * Shared input handling for the public form endpoints.
 *
 * All three handlers (contact, request-sample, not-found-inquiry) previously took
 * `await request.json()` with only a TypeScript annotation as "validation", then
 * interpolated the values straight into an HTML email and set `replyTo` from the
 * request body. Three consequences:
 *
 *  1. A message body of `<a href="https://evil">Reset your password</a>` arrived in
 *     the support inbox as a working link, apparently sent by
 *     support@neographanalytics.com, with Reply-To pointing at the attacker.
 *  2. Missing fields rendered the literal string "undefined" in the email.
 *  3. Nothing limited how often the endpoint could be called, so a loop could burn
 *     the Resend quota and get the sending domain blocked.
 */
import { NextResponse } from 'next/server';

/** Escape everything that can change the meaning of surrounding HTML. */
export function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Conservative address check; deliberately stricter than the RFC. */
export function isEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@,;:<>"']+@[^\s@,;:<>"']+\.[A-Za-z]{2,}$/.test(value.trim());
}

/**
 * Header injection guard. A newline in a value used in a header (subject,
 * reply-to) lets a caller append headers of their own.
 */
export function singleLine(value: unknown, max = 200): string {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

export interface FieldRule {
  key: string;
  label: string;
  required?: boolean;
  email?: boolean;
  max?: number;
}

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  /** Trimmed, length-capped values. Still needs escaping before HTML use. */
  values: Record<string, string>;
}

export function validate(body: unknown, rules: FieldRule[]): ValidationResult {
  const errors: string[] = [];
  const values: Record<string, string> = {};

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, errors: ['Malformed request body.'], values };
  }
  const src = body as Record<string, unknown>;

  for (const rule of rules) {
    const raw = src[rule.key];
    const str = raw === null || raw === undefined ? '' : String(raw).trim();

    if (rule.required && !str) {
      errors.push(`${rule.label} is required.`);
      continue;
    }
    if (str && rule.email && !isEmail(str)) {
      errors.push(`${rule.label} must be a valid email address.`);
      continue;
    }
    if (rule.max && str.length > rule.max) {
      errors.push(`${rule.label} must be ${rule.max} characters or fewer.`);
      continue;
    }
    values[rule.key] = str;
  }

  return { ok: errors.length === 0, errors, values };
}

/**
 * Per-instance sliding-window rate limit.
 *
 * This is deliberately simple: on serverless each instance keeps its own counter,
 * so it throttles a single caller rather than a distributed flood. It is a floor,
 * not a guarantee. A shared store (e.g. Upstash) would be needed for a real limit,
 * and that is a service decision rather than a code one.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

export function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (!v.length || now - v[v.length - 1] > WINDOW_MS) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

/** Best-effort client identity from proxy headers. */
export function clientKey(request: Request): string {
  const h = request.headers;
  const fwd = h.get('x-forwarded-for');
  return (
    h.get('x-real-ip') ||
    (fwd ? fwd.split(',')[0]!.trim() : '') ||
    'unknown'
  );
}

export function badRequest(errors: string[]) {
  return NextResponse.json(
    { success: false, error: 'invalid_input', message: errors.join(' ') },
    { status: 400 }
  );
}

export function tooManyRequests() {
  return NextResponse.json(
    {
      success: false,
      error: 'rate_limited',
      message: 'Too many submissions. Please wait a minute and try again.',
    },
    { status: 429, headers: { 'Retry-After': '60' } }
  );
}
