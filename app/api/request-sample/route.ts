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
  { key: 'company', label: 'Company', required: true, max: 160 },
  { key: 'jobTitle', label: 'Job title', max: 120 },
  { key: 'phone', label: 'Phone', max: 40 },
  { key: 'country', label: 'Country', max: 80 },
  { key: 'reportTitle', label: 'Report', required: true, max: 240 },
  { key: 'additionalInfo', label: 'Additional information', max: 3000 },
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

    // Store and notify before the email goes out: a Resend failure must not be
    // the difference between having the lead and not having it.
    const submissionId = await recordSubmission({
      formType: 'request-sample',
      values: data,
      extraKeys: ['jobTitle'],
      request,
      clientIp,
      summary: data.reportTitle,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: singleLine(`[Sample Request] ${escapeHtml(data.reportTitle)} — ${escapeHtml(data.fullName)}`, 180),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">New Sample Report Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td>${escapeHtml(data.fullName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Job Title</strong></td><td>${escapeHtml(data.jobTitle)}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #666;"><strong>Country</strong></td><td>${escapeHtml(data.country)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Report</strong></td><td>${escapeHtml(data.reportTitle)}</td></tr>
          </table>
          ${data.additionalInfo ? `
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #666;">Additional Information</strong>
            <p style="white-space: pre-wrap; margin: 8px 0 0;">${escapeHtml(data.additionalInfo)}</p>
          </div>` : ''}
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        submissionId: submissionId ?? crypto.randomUUID(),
        category: 'request-sample',
        message: 'Thank you for your request. We will send you the sample shortly.',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[request-sample/route] Resend error:', err);
    return NextResponse.json(
      { success: false, error: 'send_failed', message: 'Failed to send request. Please try again.' },
      { status: 500 }
    );
  }
}
