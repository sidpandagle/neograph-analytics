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

/* The checkout form used to call `setSubmitted(true)` and nothing else: it
   rendered "our team will contact you" over a lead that was never sent
   anywhere. This route is the delivery it was missing. It mirrors
   /api/contact - same guard, same Resend sender - and adds the two fields a
   purchase inquiry needs over a general one: which report, and the price the
   page quoted. */

const RULES: FieldRule[] = [
  { key: 'fullName', label: 'Name', required: true, max: 120 },
  { key: 'email', label: 'Email', required: true, email: true, max: 160 },
  { key: 'company', label: 'Company', max: 160 },
  { key: 'phone', label: 'Phone', max: 40 },
  { key: 'country', label: 'Country', max: 80 },
  { key: 'reportTitle', label: 'Report', required: true, max: 300 },
  { key: 'reportSlug', label: 'Report slug', required: true, max: 200 },
  { key: 'quotedPrice', label: 'Quoted price', max: 40 },
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

    const reportUrl = `https://www.neographanalytics.com/reports/${encodeURIComponent(data.reportSlug)}`;

    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email, // validated as a single-line address above
      subject: singleLine(`[Purchase] ${data.reportTitle} - ${data.fullName}`, 180),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a5f;">Purchase Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td>${escapeHtml(data.fullName)}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
            ${data.company ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Company</strong></td><td>${escapeHtml(data.company)}</td></tr>` : ''}
            ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>` : ''}
            ${data.country ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Country</strong></td><td>${escapeHtml(data.country)}</td></tr>` : ''}
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <strong style="color: #666;">Report requested</strong>
            <p style="margin: 8px 0 0;">${escapeHtml(data.reportTitle)}</p>
            <p style="margin: 8px 0 0;"><a href="${escapeHtml(reportUrl)}">${escapeHtml(reportUrl)}</a></p>
            ${data.quotedPrice ? `<p style="margin: 8px 0 0;">Price shown at checkout: <strong>${escapeHtml(data.quotedPrice)}</strong></p>` : ''}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: {
        success: true,
        submissionId: crypto.randomUUID(),
        category: 'purchase-inquiry',
        message: 'Thank you. Our team will contact you to complete your purchase.',
        createdAt: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('[purchase-inquiry/route] Resend error:', err);
    return NextResponse.json(
      { success: false, error: 'send_failed', message: 'Failed to send your inquiry. Please try again.' },
      { status: 500 }
    );
  }
}
