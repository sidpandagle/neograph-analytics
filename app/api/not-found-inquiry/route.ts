import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  validate,
  escapeHtml,
  singleLine,
  rateLimited,
  clientKey,
  badRequest,
  tooManyRequests,
  type FieldRule,
} from '@/lib/api/form-guard';

const RULES: FieldRule[] = [
  { key: 'name', label: 'Name', required: true, max: 120 },
  { key: 'email', label: 'Email', required: true, email: true, max: 160 },
  { key: 'company', label: 'Company', max: 160 },
  { key: 'interest', label: 'Interest', max: 240 },
  { key: 'attemptedUrl', label: 'Attempted URL', max: 500 },
];

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'support@neographanalytics.com';
const FROM_EMAIL = 'support@neographanalytics.com';

export async function POST(request: NextRequest) {
  try {
    if (rateLimited(clientKey(request))) return tooManyRequests();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest(['Malformed request body.']);
    }

    const { ok, errors, values: data } = validate(body, RULES);
    if (!ok) return badRequest(errors);

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: singleLine(`[404 Lead] ${escapeHtml(data.name)} — ${escapeHtml(data.company)}`, 180),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Inquiry from 404 Page</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Interest</strong></td><td>${escapeHtml(data.interest)}</td></tr>
            ${data.attemptedUrl ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Attempted URL</strong></td><td>${escapeHtml(data.attemptedUrl)}</td></tr>` : ''}
          </table>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[not-found-inquiry/route] Resend error:', err);
    return NextResponse.json(
      { success: false, message: 'Failed to send. Please try again.' },
      { status: 500 }
    );
  }
}
