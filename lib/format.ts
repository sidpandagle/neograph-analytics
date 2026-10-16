/**
 * Safe formatters for values that come out of Supabase JSONB.
 *
 * JSONB columns are untyped: a numeric field may be absent, null, or stored as a
 * string, and rows sometimes carry placeholder entries such as `{"country": ""}`.
 * Calling `.toFixed()` on those throws, and during `next build` a single bad row
 * aborts the entire export — which is exactly what
 * `agritech-ai-crop-disease-detection-market` did.
 *
 * These helpers coerce, guard, and fall back to a dash rather than crashing.
 */

/** Coerce an unknown JSONB value to a finite number, or null. */
export function toNum(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

/** `18.5` -> "18.5%". Missing/!finite -> "—". */
export function pct(value: unknown, digits = 1): string {
  const n = toNum(value);
  return n === null ? '—' : `${n.toFixed(digits)}%`;
}

/**
 * The suffix for a report's stated `unit` column.
 *
 * Rows are not all in billions. `phage-therapy-market` is stored in millions,
 * because its disclosed base is $66.5M — rendering that as "$66.5B" overstates
 * the market by a factor of 1,000, which is the worst class of error this site
 * can make. The charts and the hero already read the column; the card and
 * detail-page formatters did not.
 */
export function unitSuffix(unit: unknown): string {
  switch (String(unit ?? '').trim().toLowerCase()) {
    case 'trillion': return 'T';
    case 'billion': return 'B';
    case 'million': return 'M';
    case 'thousand': return 'K';
    default: return '';
  }
}

/** `66.5` with unit "Million" -> "$66.5M". Missing/!finite -> "—". */
export function marketValue(value: unknown, unit: unknown, currency = '$'): string {
  const n = toNum(value);
  return n === null ? '—' : `${currency}${n.toFixed(1)}${unitSuffix(unit)}`;
}

/** `1.2` -> "$1.2B". Missing/!finite -> "—". */
export function money(value: unknown, digits = 1, unit = 'B', currency = '$'): string {
  const n = toNum(value);
  return n === null ? '—' : `${currency}${n.toFixed(digits)}${unit}`;
}

/** Plain fixed-digit number, or "—". */
export function num(value: unknown, digits = 1): string {
  const n = toNum(value);
  return n === null ? '—' : n.toFixed(digits);
}

/** Width for a bar, clamped to 0-100. Never NaN. */
export function barWidth(value: unknown): number {
  const n = toNum(value);
  if (n === null) return 0;
  return Math.max(0, Math.min(100, n));
}

/**
 * Drop placeholder rows: entries whose label is blank, and entries carrying no
 * usable numbers at all. Keeps a row that has a label AND at least one metric.
 */
export function usableRows<T extends object>(
  rows: T[] | undefined | null,
  labelKey: keyof T,
  metricKeys: Array<keyof T>
): T[] {
  if (!Array.isArray(rows)) return [];
  return rows.filter((r) => {
    if (!r) return false;
    const label = r[labelKey];
    if (typeof label !== 'string' || label.trim() === '') return false;
    return metricKeys.some((k) => toNum(r[k]) !== null);
  });
}
