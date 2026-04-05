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
  if (score <= 49) return { label: 'High Risk', color: '#dc2626', zone: 'red', emoji: '🔴' };
  if (score <= 79) return { label: 'Compliance Gaps', color: '#d97706', zone: 'amber', emoji: '🟡' };
  return { label: 'Compliant', color: '#2563eb', zone: 'blue', emoji: '🔵' };
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

    const isHighPriority = score < 80;

    const userCTA = isHighPriority
      ? `<a href="${bookingLink}" style="display:inline-block;background:#dc2626;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">BOOK YOUR £295 COMPLIANCE AUDIT →</a>`
      : `<a href="${bookingLink}" style="display:inline-block;background:#2563eb;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">GET YOUR FREE CONSULTATION →</a>`;

    const gapsHtml = topGaps.map(g => `
      <div style="background:#fef3c7;border-left:4px solid #d97706;padding:12px 16px;margin:8px 0;border-radius:0 8px 8px 0;">
        <strong style="color:#92400e;">${g.title}</strong>
        <p style="color:#78350f;margin:4px 0 0;font-size:14px;">${g.description}</p>
        <p style="color:#dc2626;margin:4px 0 0;font-size:12px;font-weight:600;">⚠️ Risk: ${g.risk}</p>
      </div>`).join('');

    const strengthsHtml = strengths.length > 0
      ? strengths.map(s => `
        <div style="display:flex;align-items:center;margin:6px 0;gap:10px;">
          <span style="color:#2563eb;font-size:16px;">✅</span>
          <span style="color:#1e3a5f;font-size:14px;">${s}</span>
        </div>`).join('')
      : '<p style="color:#6b7280;font-size:14px;">Complete the recommended steps to build your compliance strengths.</p>';

    const stepsHtml = recommendedSteps.map((s, i) => `
      <div style="display:flex;align-items:flex-start;margin:8px 0;">
        <span style="background:#1d4ed8;color:#fff;border-radius:50%;width:24px;height:24px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;flex-shrink:0;margin-right:12px;">${i + 1}</span>
        <span style="color:#1f2937;font-size:14px;">${s}</span>
      </div>`).join('');

    const answersTable = answers.map(a => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#374151;font-size:13px;font-weight:500;">${a.section}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;">${a.answer}</td>
      </tr>`).join('');

    const scoreBarWidth = Math.round(score);
    const scoreBarColor = score <= 49 ? '#dc2626' : score <= 79 ? '#d97706' : '#2563eb';

    const userEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;margin:0;padding:0;">
  <div style="max-width:600px;margin:0 auto;background:#fff;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e3a8a,#1d4ed8,#2563eb);padding:48px 32px;text-align:center;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <p style="color:#bfdbfe;margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Millstone Compliance</p>
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">EPR Gap Analyser</h1>
      <p style="color:#93c5fd;margin:12px 0 0;font-size:15px;">Your Extended Producer Responsibility Compliance Results</p>
    </div>

    <!-- Greeting -->
    <div style="padding:32px 32px 0;">
      <p style="color:#374151;font-size:16px;margin:0 0 8px;">Hi ${leadData.name},</p>
      <p style="color:#6b7280;font-size:14px;margin:0;">Thank you for completing the EPR Gap Analyser. Here are your personalised compliance results for <strong>${leadData.company}</strong>.</p>
    </div>

    <!-- Score Section -->
    <div style="padding:24px 32px;">
      <div style="background:linear-gradient(135deg,${zone.color}0d,${zone.color}1a);border:2px solid ${zone.color}40;border-radius:20px;padding:32px;text-align:center;">
        <p style="color:${zone.color};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">EPR Compliance Score</p>
        <div style="font-size:80px;font-weight:900;color:${zone.color};line-height:1;margin-bottom:4px;">${score}</div>
        <div style="font-size:18px;color:#9ca3af;margin-bottom:16px;">/100</div>

        <!-- Score bar -->
        <div style="background:#e5e7eb;border-radius:99px;height:12px;margin:0 auto 16px;max-width:300px;overflow:hidden;">
          <div style="background:${scoreBarColor};height:100%;border-radius:99px;width:${scoreBarWidth}%;"></div>
        </div>

        <div style="display:inline-block;background:${zone.color};color:#fff;padding:8px 20px;border-radius:99px;font-size:14px;font-weight:700;margin-bottom:16px;">${zone.emoji} ${zone.label}</div>
        <p style="color:#374151;font-size:14px;margin:0;line-height:1.6;">${aiAnalysis}</p>
      </div>
    </div>

    ${isHighPriority ? `
    <!-- Urgency Banner -->
    <div style="padding:0 32px 24px;">
      <div style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="32" valign="top" style="padding-right:12px;font-size:24px;">⚠️</td>
            <td>
              <p style="color:#dc2626;font-weight:700;margin:0 0 6px;font-size:15px;">Critical EPR gaps identified — enforcement risk</p>
              <p style="color:#991b1b;font-size:13px;margin:0;line-height:1.5;">Non-registration or incorrect EPR submissions can result in enforcement notices, unlimited fines, and criminal prosecution. The Environment Agency is actively auditing producers.</p>
            </td>
          </tr>
        </table>
      </div>
    </div>` : `
    <!-- Positive Banner -->
    <div style="padding:0 32px 24px;">
      <div style="background:#eff6ff;border:2px solid #bfdbfe;border-radius:12px;padding:20px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="32" valign="top" style="padding-right:12px;font-size:24px;">✅</td>
            <td>
              <p style="color:#2563eb;font-weight:700;margin:0 0 6px;font-size:15px;">You're mostly compliant — let's close the final gaps</p>
              <p style="color:#1e40af;font-size:13px;margin:0;line-height:1.5;">Good progress on your EPR compliance! A short consultation can help verify your fee calculations and ensure you're not overpaying.</p>
            </td>
          </tr>
        </table>
      </div>
    </div>`}

    <!-- CTA Button -->
    <div style="text-align:center;padding:0 32px 32px;">${userCTA}</div>

    <!-- Score Bands Reference -->
    <div style="padding:0 32px 24px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr style="background:#f9fafb;">
          <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Score Band</td>
          <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Status</td>
          <td style="padding:10px 16px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Your Score</td>
        </tr>
        <tr style="${score <= 49 ? 'background:#fef2f2;' : ''}">
          <td style="padding:10px 16px;font-size:13px;color:#dc2626;font-weight:600;">0 – 49</td>
          <td style="padding:10px 16px;font-size:13px;color:#374151;">🔴 High Risk</td>
          <td style="padding:10px 16px;">${score <= 49 ? `<span style="background:#dc2626;color:#fff;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:700;">YOUR SCORE: ${score}</span>` : ''}</td>
        </tr>
        <tr style="${score >= 50 && score <= 79 ? 'background:#fffbeb;' : ''}">
          <td style="padding:10px 16px;font-size:13px;color:#d97706;font-weight:600;">50 – 79</td>
          <td style="padding:10px 16px;font-size:13px;color:#374151;">🟡 Compliance Gaps</td>
          <td style="padding:10px 16px;">${score >= 50 && score <= 79 ? `<span style="background:#d97706;color:#fff;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:700;">YOUR SCORE: ${score}</span>` : ''}</td>
        </tr>
        <tr style="${score >= 80 ? 'background:#eff6ff;' : ''}">
          <td style="padding:10px 16px;font-size:13px;color:#2563eb;font-weight:600;">80 – 100</td>
          <td style="padding:10px 16px;font-size:13px;color:#374151;">🔵 Compliant</td>
          <td style="padding:10px 16px;">${score >= 80 ? `<span style="background:#2563eb;color:#fff;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:700;">YOUR SCORE: ${score}</span>` : ''}</td>
        </tr>
      </table>
    </div>

    <!-- Top Gaps -->
    <div style="padding:0 32px 24px;">
      <h3 style="color:#1f2937;font-size:17px;margin:0 0 16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:12px;">
        🚨 Top EPR Compliance Gaps Identified
      </h3>
      ${gapsHtml}
    </div>

    <!-- Strengths -->
    ${strengths.length > 0 ? `
    <div style="padding:0 32px 24px;">
      <h3 style="color:#1f2937;font-size:17px;margin:0 0 16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:12px;">
        💪 Compliance Strengths
      </h3>
      ${strengthsHtml}
    </div>` : ''}

    <!-- Recommended Steps -->
    <div style="padding:0 32px 24px;">
      <h3 style="color:#1f2937;font-size:17px;margin:0 0 16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:12px;">
        📋 Recommended Next Steps
      </h3>
      ${stepsHtml}
    </div>

    <!-- Service Options -->
    <div style="padding:0 32px 32px;">
      <h3 style="color:#1f2937;font-size:17px;margin:0 0 16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:12px;">
        🎯 How We Can Help
      </h3>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:12px;background:#eff6ff;border:2px solid #2563eb;border-radius:12px;vertical-align:top;">
            <p style="color:#2563eb;font-weight:800;font-size:16px;margin:0 0 4px;">FREE</p>
            <p style="color:#1e40af;font-weight:700;font-size:14px;margin:0 0 8px;">Discovery Call</p>
            <p style="color:#374151;font-size:13px;margin:0 0 12px;">15-minute consultation to review your results and identify fee savings</p>
            <a href="${bookingLink}" style="display:block;background:#2563eb;color:#fff;padding:10px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;text-align:center;">Book Free Call →</a>
          </td>
        </tr>
        <tr><td style="height:12px;"></td></tr>
        <tr>
          <td style="padding:12px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;vertical-align:top;">
            <p style="color:#1e3a8a;font-weight:800;font-size:16px;margin:0 0 4px;">£295</p>
            <p style="color:#374151;font-weight:700;font-size:14px;margin:0 0 8px;">Compliance Audit</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• 90-minute on-site assessment</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• EPR fee overpayment analysis</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Written report within 24 hours</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 12px;">• Specific action plan</p>
            <a href="${bookingLink}" style="display:block;background:#eff6ff;color:#1e3a8a;border:2px solid #1e3a8a;padding:10px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;text-align:center;">Book Audit →</a>
          </td>
        </tr>
        <tr><td style="height:12px;"></td></tr>
        <tr>
          <td style="padding:12px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;vertical-align:top;">
            <p style="color:#1e3a8a;font-weight:800;font-size:16px;margin:0 0 4px;">£495</p>
            <p style="color:#374151;font-weight:700;font-size:14px;margin:0 0 8px;">Audit + Implementation Support</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Everything in Compliance Audit</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• 30-day email/phone support</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Help correcting EPR data submissions</p>
            <p style="color:#6b7280;font-size:13px;margin:0 0 12px;">• Follow-up compliance check</p>
            <a href="${bookingLink}" style="display:block;background:#f9fafb;color:#374151;border:1px solid #e5e7eb;padding:10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;text-align:center;">See Full Setup Option →</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- Contact -->
    <div style="padding:0 32px 32px;">
      <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-radius:16px;padding:24px;text-align:center;border:1px solid #bfdbfe;">
        <p style="color:#1e3a8a;font-weight:700;margin:0 0 8px;font-size:15px;">Have questions? Contact our EPR specialists</p>
        <p style="color:#374151;font-size:14px;margin:0 0 12px;">
          📞 <a href="tel:01217512262" style="color:#2563eb;text-decoration:none;font-weight:600;">0121 751 2262</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          📧 <a href="mailto:hello@millstonecompliance.com" style="color:#2563eb;text-decoration:none;font-weight:600;">hello@millstonecompliance.com</a>
        </p>
        <a href="${bookingLink}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Book Your Free 15-Minute Call →</a>
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
    <div style="background:#1e3a8a;padding:24px;color:#fff;">
      <h2 style="margin:0;font-size:20px;">New EPR Gap Analyser Lead ${zone.emoji}</h2>
      <p style="margin:4px 0 0;color:#bfdbfe;font-size:14px;">Urgency: ${urgencyLevel} | Score: ${score}/100 | Zone: ${zone.label}</p>
    </div>
    <div style="padding:24px;">
      <h3 style="color:#374151;margin:0 0 16px;">Lead Details</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Name</td><td style="padding:8px 0;color:#1f2937;font-size:13px;font-weight:600;">${leadData.name}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${leadData.email}" style="color:#2563eb;">${leadData.email}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Company</td><td style="padding:8px 0;color:#1f2937;font-size:13px;">${leadData.company}</td></tr>
        ${leadData.phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;"><a href="tel:${leadData.phone}" style="color:#2563eb;">${leadData.phone}</a></td></tr>` : ''}
      </table>

      <div style="background:${zone.color}15;border:2px solid ${zone.color};border-radius:8px;padding:16px;margin:20px 0;text-align:center;">
        <div style="font-size:48px;font-weight:900;color:${zone.color};">${score}/100</div>
        <div style="color:${zone.color};font-weight:700;">${zone.emoji} ${zone.label}</div>
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

    const result1 = await resend.emails.send({
      from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
      to: [businessEmail],
      subject: `🆕 EPR Gap Analyser Lead: ${leadData.name} (${leadData.company}) - Score: ${score}/100 [${urgencyLevel} Priority]`,
      html: businessEmailHtml,
    });

    if (result1.error) {
      console.error('Resend error:', result1.error);
      return NextResponse.json({ error: 'Failed to send emails', details: result1.error }, { status: 500 });
    }

    const result2 = await resend.emails.send({
      from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
      to: [leadData.email],
      subject: `Your Compliance Assessment Results`,
      html: userEmailHtml,
    });

    if (result2.error) {
      console.error('Resend error:', result2.error);
      return NextResponse.json({ error: 'Failed to send emails', details: result2.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Lead captured and emails sent' });
  } catch (error) {
    console.error('Error in EPR gap analyser submit:', error);
    return NextResponse.json({ error: 'Submission failed', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}
