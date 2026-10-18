/**
 * ntfy delivery for new form submissions.
 *
 * Fire-and-forget by design: a notification that fails must never turn a
 * successful lead capture into an error for the person who filled the form.
 * Every failure path returns false and logs; nothing throws.
 *
 *   NTFY_TOPIC  - the topic to publish to, e.g. neograph-leads-7f3a
 *   NTFY_SERVER - optional, defaults to https://ntfy.sh (set it for self-hosted)
 *   NTFY_TOKEN  - optional access token (tk_…) for a protected topic
 *
 * With NTFY_TOPIC unset, notify() is a no-op and says so once per cold start.
 * A topic on the public ntfy.sh is readable by anyone who knows its name, so
 * use an unguessable one — or a token-protected topic — because the body
 * carries a lead's name and email.
 */
let warned = false;

export interface NtfyMessage {
  title: string;
  message: string;
  /** Tapping the notification opens this — the admin page, in practice. */
  click?: string;
  /** 1 min … 5 max. 3 (default) is a normal alert. */
  priority?: 1 | 2 | 3 | 4 | 5;
  /** Emoji shortcodes or labels shown with the title, e.g. ['inbox_tray']. */
  tags?: string[];
}

export function ntfyConfigured(): boolean {
  return Boolean(process.env.NTFY_TOPIC);
}

function server(): string {
  return (process.env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '');
}

/**
 * HTTP headers are latin-1 only and a newline in one would split the request,
 * so the title and tags are flattened to safe ASCII. The body is sent as the
 * request body, where UTF-8 and newlines are fine.
 */
function headerSafe(value: string, max: number): string {
  return value
    .replace(/[\r\n]+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')
    .trim()
    .slice(0, max);
}

export async function notify(msg: NtfyMessage): Promise<boolean> {
  if (!ntfyConfigured()) {
    if (!warned) {
      warned = true;
      console.warn('[ntfy] NTFY_TOPIC not set — skipping notifications.');
    }
    return false;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'text/plain; charset=utf-8',
    Title: headerSafe(msg.title, 250),
  };
  if (msg.click) headers.Click = headerSafe(msg.click, 512);
  if (msg.priority) headers.Priority = String(msg.priority);
  if (msg.tags?.length) headers.Tags = headerSafe(msg.tags.join(','), 200);
  if (process.env.NTFY_TOKEN) headers.Authorization = `Bearer ${process.env.NTFY_TOKEN}`;

  try {
    // A hung notification must not hold the form response open.
    const res = await fetch(`${server()}/${encodeURIComponent(process.env.NTFY_TOPIC!)}`, {
      method: 'POST',
      headers,
      body: msg.message.slice(0, 4000),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.error('[ntfy] delivery failed:', res.status, (await res.text()).slice(0, 300));
      return false;
    }
    return true;
  } catch (err) {
    console.error('[ntfy] delivery error:', err);
    return false;
  }
}
