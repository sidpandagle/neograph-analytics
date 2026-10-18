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
import { recordSubmission } from '@/lib/api/submissions';

const RULES: FieldRule[] = [
  { key: 'fullName', label: 'Name', required: true, max: 120 },
  { key: 'email', label: 'Email', required: true, email: true, max: 160 },
  { key: 'company', label: 'Company', max: 160 },
  { key: 'phone', label: 'Phone', max: 40 },
  { key: 'country', label: 'Country', max: 80 },
  { key: 'subject', label: 'Subject', max: 60 },
  { key: 'message', label: 'Message', required: true, max: 5000 },
];

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'support@neographanalytics.com';
const FROM_EMAIL = 'support@neographanalytics.com';

export async function POST(request: NextRequest) {
  try {
    const clientIp = clientKey(request);
    if (rateLimited(clientIp)) return tooManyRequests();

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return badRequest(['Malformed request body.']);
    }

    const { ok, errors, values: data } = validate(body, RULES);
    if (!ok) return badRequest(errors);

    const subjectMap: Record<string, string> = {
      general: 'General Inquiry',
      research: 'Research Report Question',
      custom: 'Custom Research Request',
      partnership: 'Partnership Opportunity',
      support: 'Technical Support',
      other: 'Other',
    };

    // Never let a caller-supplied value reach a mail header unescaped or multiline.
    // `??` would not fire here on an empty string, so use `||`.
    const subjectLabel = subjectMap[data.subject] || singleLine(data.subject, 60) || 'Inquiry';

    // Store and notify before the email goes out: a Resend failure must not be
    // the difference between having the lead and not having it.
    const submissionId = await recordSubmission({
      formType: 'contact',
      values: data,
      request,
      clientIp,
      summary: subjectLabel,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email, // validated as a single-line address above
      // A subject is plain text, not HTML: escaping here would literally print
      // "&amp;" in the inbox. singleLine() is what matters, to block header injection.
      subject: singleLine(`[Contact] ${subjectLabel} — ${data.fullName}`, 180),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td>${escapeHtml(data.fullName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>Country</strong></td><td>${escapeHtml(data.country)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td>${escapeHtml(subjectLabel)}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #666;">Message</strong>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${escapeHtml(data.message)}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        submissionId: submissionId ?? crypto.randomUUID(),
        category: 'contact',
        message: 'Thank you for your inquiry. We will get back to you shortly.',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[contact/route] Resend error:', err);
    return NextResponse.json(
      { success: false, error: 'send_failed', message: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
