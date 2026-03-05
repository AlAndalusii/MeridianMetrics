import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface LeadData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  gdprConsent: boolean;
}

interface GapResult {
  title: string;
  description: string;
  risk: string;
}

interface SubmitPayload {
  leadData: LeadData;
  score: number;
  topGaps: GapResult[];
  strengths: string[];
  recommendedSteps: string[];
  urgencyLevel: string;
  aiAnalysis: string;
  answers: Array<{ section: string; question: string; answer: string }>;
}

function getScoreZone(score: number) {
  if (score <= 3) return { label: 'Critical Non-Compliance', color: '#dc2626', zone: 'red', emoji: '🔴' };
  if (score <= 6) return { label: 'Partial Compliance', color: '#d97706', zone: 'amber', emoji: '🟡' };
  return { label: 'Good Compliance', color: '#059669', zone: 'green', emoji: '🟢' };
}

export async function POST(request: Request) {
  try {
    const body: SubmitPayload = await request.json();
    const { leadData, score, topGaps, strengths, recommendedSteps, urgencyLevel, aiAnalysis, answers } = body;

    if (!leadData?.email || !leadData?.name) {
      return NextResponse.json({ error: 'Missing required lead information' }, { status: 400 });
    }

    if (!leadData.gdprConsent) {
      return NextResponse.json({ error: 'GDPR consent required' }, { status: 400 });
    }

    const zone = getScoreZone(score);
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com';
    const bookingLink = process.env.NEXT_PUBLIC_BOOKING_LINK || 'https://calendly.com/millstonecompliance';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.com';

    const isHighPriority = score < 7;

    const userCTA = isHighPriority
      ? `<a href="${bookingLink}" style="display:inline-block;background:#dc2626;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">BOOK YOUR £295 COMPLIANCE AUDIT →</a>`
      : `<a href="${bookingLink}" style="display:inline-block;background:#059669;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">GET YOUR FREE CONSULTATION →</a>`;

    const gapsHtml = topGaps.map(g => `
      <div style="background:#fef3c7;border-left:4px solid #d97706;padding:12px 16px;margin:8px 0;border-radius:0 8px 8px 0;">
        <strong style="color:#92400e;">${g.title}</strong>
        <p style="color:#78350f;margin:4px 0 0;font-size:14px;">${g.description}</p>
        <p style="color:#dc2626;margin:4px 0 0;font-size:12px;font-weight:600;">⚠️ Risk: ${g.risk}</p>
      </div>`).join('');

    const stepsHtml = recommendedSteps.map((s, i) => `
      <div style="display:flex;align-items:flex-start;margin:8px 0;">
        <span style="background:#065f46;color:#fff;border-radius:50%;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;flex-shrink:0;margin-right:12px;">${i + 1}</span>
        <span style="color:#1f2937;font-size:14px;">${s}</span>
      </div>`).join('');

    const answersTable = answers.map(a => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:13px;font-weight:500;">${a.section}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">${a.answer}</td>
      </tr>`).join('');

    const userEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">
    <div style="background:linear-gradient(135deg,#065f46,#059669);padding:40px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;">Simpler Recycling Gap Analyser</h1>
      <p style="color:#a7f3d0;margin:8px 0 0;font-size:14px;">Millstone Compliance</p>
    </div>
    
    <div style="padding:32px;">
      <p style="color:#374151;font-size:16px;">Hi ${leadData.name},</p>
      <p style="color:#6b7280;font-size:14px;">Thank you for completing the Simpler Recycling Gap Analyser. Here are your personalised compliance results.</p>
      
      <div style="background:${zone.color}15;border:2px solid ${zone.color};border-radius:16px;padding:24px;text-align:center;margin:24px 0;">
        <div style="font-size:64px;font-weight:900;color:${zone.color};line-height:1;">${score}/10</div>
        <div style="font-size:18px;font-weight:700;color:${zone.color};margin-top:8px;">${zone.emoji} ${zone.label}</div>
        <p style="color:#374151;font-size:14px;margin:12px 0 0;">${aiAnalysis}</p>
      </div>

      ${isHighPriority ? `
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#dc2626;font-weight:700;margin:0 0 4px;">⚠️ Critical gaps identified — avoid penalties</p>
        <p style="color:#991b1b;font-size:14px;margin:0;">The Environment Agency can inspect your premises at any time. Non-compliance can result in fines and enforcement notices.</p>
      </div>` : `
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="color:#059669;font-weight:700;margin:0 0 4px;">✅ You're mostly compliant — let's fix the final gaps</p>
        <p style="color:#065f46;font-size:14px;margin:0;">Good progress! A quick consultation can help you close the remaining gaps and ensure full compliance.</p>
      </div>`}

      <div style="text-align:center;margin:24px 0;">${userCTA}</div>

      <h3 style="color:#1f2937;font-size:16px;margin:24px 0 12px;">Top Compliance Gaps Identified</h3>
      ${gapsHtml}

      <h3 style="color:#1f2937;font-size:16px;margin:24px 0 12px;">Recommended Next Steps</h3>
      ${stepsHtml}

      <div style="background:#f0fdf4;border-radius:8px;padding:20px;margin:24px 0;text-align:center;">
        <p style="color:#065f46;font-weight:700;margin:0 0 4px;">Need help? Contact Millstone Compliance</p>
        <p style="color:#374151;font-size:14px;margin:8px 0;">📞 <a href="tel:01217512262" style="color:#059669;">0121 751 2262</a> &nbsp;|&nbsp; 📧 <a href="mailto:hello@millstonecompliance.com" style="color:#059669;">hello@millstonecompliance.com</a></p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#111827;padding:32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="text-align:center;padding-bottom:16px;">
          <p style="color:#f9fafb;font-size:15px;font-weight:800;margin:0 0 2px;letter-spacing:-0.3px;">Millstone Compliance</p>
          <p style="color:#6b7280;font-size:12px;margin:0;">United Kingdom &nbsp;&bull;&nbsp; Zak, Founder</p>
        </td></tr>
        <tr><td style="border-top:1px solid #1f2937;padding-top:20px;text-align:center;">
          <p style="color:#4b5563;font-size:11px;margin:0 0 8px;line-height:1.7;">
            You're receiving this because you completed a compliance assessment on our website.<br>
            If this wasn't you, <a href="mailto:hello@millstonecompliance.com" style="color:#6b7280;text-decoration:underline;">reply to this email</a> and we'll remove your address immediately.
          </p>
          <p style="color:#374151;font-size:11px;margin:0;">
            &copy; 2026 Millstone Compliance Ltd.
            &nbsp;&bull;&nbsp; <a href="${siteUrl}/privacy" style="color:#6b7280;text-decoration:underline;">Privacy Policy</a>
            &nbsp;&bull;&nbsp; <a href="mailto:hello@millstonecompliance.com" style="color:#6b7280;text-decoration:underline;">hello@millstonecompliance.com</a>
          </p>
        </td></tr>
      </table>
    </div>
  </div>
</body>
</html>`;

    const businessEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f9fafb;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
    <div style="background:#065f46;padding:24px;color:#fff;">
      <h2 style="margin:0;font-size:20px;">New Gap Analyser Lead ${zone.emoji}</h2>
      <p style="margin:4px 0 0;color:#a7f3d0;font-size:14px;">Urgency: ${urgencyLevel} | Score: ${score}/10 | Zone: ${zone.label}</p>
    </div>
    <div style="padding:24px;">
      <h3 style="color:#374151;margin:0 0 16px;">Lead Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Name</td><td style="padding:8px 0;color:#1f2937;font-size:13px;font-weight:600;">${leadData.name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${leadData.email}" style="color:#059669;">${leadData.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Company</td><td style="padding:8px 0;color:#1f2937;font-size:13px;">${leadData.company}</td></tr>
        ${leadData.phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;"><a href="tel:${leadData.phone}" style="color:#059669;">${leadData.phone}</a></td></tr>` : ''}
      </table>
      
      <div style="background:${zone.color}15;border:2px solid ${zone.color};border-radius:8px;padding:16px;margin:20px 0;text-align:center;">
        <div style="font-size:48px;font-weight:900;color:${zone.color};">${score}/10</div>
        <div style="color:${zone.color};font-weight:700;">${zone.label}</div>
      </div>

      <h3 style="color:#374151;margin:20px 0 12px;">AI Analysis</h3>
      <p style="color:#6b7280;font-size:14px;">${aiAnalysis}</p>

      <h3 style="color:#374151;margin:20px 0 12px;">Assessment Answers</h3>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead><tr style="background:#f9fafb;"><th style="padding:8px 12px;text-align:left;color:#6b7280;font-weight:600;">Section</th><th style="padding:8px 12px;text-align:left;color:#6b7280;font-weight:600;">Answer</th></tr></thead>
        <tbody>${answersTable}</tbody>
      </table>

      <h3 style="color:#374151;margin:20px 0 12px;">Top Gaps Identified</h3>
      ${gapsHtml}
    </div>
  </div>
</body>
</html>`;

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('📧 Email service not configured - skipping email send');
      return NextResponse.json({ success: true, message: 'Lead saved (email not configured)', skippedEmail: true });
    }

    const resend = getResendClient();

    const batchResult = await resend.batch.send([
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [businessEmail],
        subject: `🆕 Gap Analyser Lead: ${leadData.name} (${leadData.company}) - Score: ${score}/10 [${urgencyLevel} Priority]`,
        html: businessEmailHtml,
      },
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [leadData.email],
        subject: `Your Compliance Assessment Results`,
        html: userEmailHtml,
      },
    ]);

    if (batchResult.error) {
      console.error('Resend error:', batchResult.error);
      return NextResponse.json({ error: 'Failed to send emails', details: batchResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, batchId: batchResult.data?.id, message: 'Lead captured and emails sent' });
  } catch (error) {
    console.error('Error in gap analyzer submit:', error);
    return NextResponse.json({ error: 'Submission failed', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}
