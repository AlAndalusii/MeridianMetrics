import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

function buildBusinessEmailHtml(params: {
  userInfo: { name: string; email: string; company: string; phone?: string };
  score: number;
  scoreLevel: { level: string; color: string; emoji: string; description: string };
  gaps: Array<{ title: string; description: string; exposure?: string }>;
  strengths: string[];
  answers: Record<number, string>;
  recommendation: { title: string; service: string; price: string; description: string };
}): string {
  const { userInfo, score, scoreLevel, gaps, strengths, answers, recommendation } = params;

  const gapsHtml = gaps.map(g => `
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:12px;margin-bottom:10px;border-radius:6px;">
      <div style="font-weight:600;color:#92400e;font-size:14px;margin-bottom:4px;">${g.title}</div>
      <div style="font-size:13px;color:#b45309;">${g.description}</div>
      ${g.exposure ? `<div style="font-size:12px;color:#dc2626;margin-top:6px;font-weight:600;">Exposure: ${g.exposure}</div>` : ''}
    </div>`).join('');

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f3f4f6;margin:0;padding:0;">
<div style="max-width:700px;margin:0 auto;padding:40px 20px;">
  <div style="background:#fff;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.1);overflow:hidden;">
    <div style="background:#1f2937;padding:25px 30px;">
      <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">🆕 New Assessment Submission</h1>
      <p style="margin:8px 0 0;color:#9ca3af;font-size:14px;">${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
    </div>
    <div style="padding:30px;border-bottom:2px solid #e5e7eb;">
      <h2 style="margin:0 0 15px;color:#111827;font-size:20px;">📋 Contact Information</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:#6b7280;font-size:14px;width:120px;padding:8px 0;">Name:</td><td style="color:#111827;font-weight:600;font-size:14px;padding:8px 0;">${userInfo.name}</td></tr>
        <tr><td style="color:#6b7280;font-size:14px;padding:8px 0;">Email:</td><td style="padding:8px 0;"><a href="mailto:${userInfo.email}" style="color:#059669;">${userInfo.email}</a></td></tr>
        <tr><td style="color:#6b7280;font-size:14px;padding:8px 0;">Company:</td><td style="color:#111827;font-weight:600;font-size:14px;padding:8px 0;">${userInfo.company}</td></tr>
        ${userInfo.phone ? `<tr><td style="color:#6b7280;font-size:14px;padding:8px 0;">Phone:</td><td style="padding:8px 0;"><a href="tel:${userInfo.phone}" style="color:#059669;">${userInfo.phone}</a></td></tr>` : ''}
      </table>
    </div>
    <div style="padding:30px;border-bottom:2px solid #e5e7eb;">
      <h2 style="margin:0 0 15px;color:#111827;font-size:20px;">🎯 Assessment Score</h2>
      <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border-radius:8px;padding:20px;text-align:center;border:2px solid #86efac;">
        <div style="font-size:48px;font-weight:800;color:${scoreLevel.color};margin-bottom:5px;">${score}/100</div>
        <div style="font-size:18px;font-weight:600;color:#065f46;">${scoreLevel.emoji} ${scoreLevel.level}</div>
        <div style="margin-top:15px;padding-top:15px;border-top:1px solid #bbf7d0;font-size:14px;color:#047857;">
          Gaps: ${gaps.length} &nbsp;·&nbsp; Strengths: ${strengths.length}
        </div>
      </div>
    </div>
    ${gaps.length > 0 ? `
    <div style="padding:30px;border-bottom:2px solid #e5e7eb;">
      <h2 style="margin:0 0 15px;color:#111827;font-size:20px;">⚠️ Critical Gaps (${gaps.length})</h2>
      ${gapsHtml}
    </div>` : ''}
    <div style="padding:30px;border-bottom:2px solid #e5e7eb;">
      <h2 style="margin:0 0 15px;color:#111827;font-size:20px;">🔍 Key Insights</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;width:200px;">Business Scale:</td><td style="padding:8px 0;color:#111827;font-size:14px;">${answers[15] || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Primary Goal:</td><td style="padding:8px 0;color:#111827;font-size:14px;">${answers[16] || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Biggest Obstacle:</td><td style="padding:8px 0;color:#111827;font-size:14px;">${answers[17] || '—'}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;font-size:14px;">Preferred Solution:</td><td style="padding:8px 0;color:#111827;font-size:14px;">${answers[18] || '—'}</td></tr>
      </table>
      ${answers[19] ? `<div style="margin-top:20px;background:#f9fafb;padding:15px;border-radius:6px;border-left:4px solid #6366f1;"><div style="font-weight:600;color:#111827;font-size:14px;margin-bottom:8px;">💬 Additional Notes:</div><div style="font-size:13px;color:#4b5563;">${answers[19]}</div></div>` : ''}
    </div>
    <div style="padding:30px;">
      <h2 style="margin:0 0 15px;color:#111827;font-size:20px;">💰 Recommended Service</h2>
      <div style="background:#ecfdf5;border-radius:8px;padding:20px;border:2px solid #a7f3d0;">
        <div style="font-size:18px;font-weight:700;color:#065f46;margin-bottom:8px;">${recommendation.service}</div>
        <div style="font-size:14px;color:#047857;margin-bottom:10px;">${recommendation.description}</div>
        <div style="font-size:24px;font-weight:800;color:#059669;">${recommendation.price}</div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`
}

function buildUserEmailHtml(params: {
  userInfo: { name: string; email: string; company: string; phone?: string };
  score: number;
  scoreLevel: { level: string; color: string; emoji: string; description: string };
  gaps: Array<{ title: string; description: string; exposure?: string }>;
  strengths: string[];
  recommendation: { title: string; service: string; price: string; description: string };
}): string {
  const { userInfo, score, scoreLevel, gaps, strengths, recommendation } = params;
  const bookingLink = process.env.NEXT_PUBLIC_BOOKING_LINK || 'https://calendly.com/millstonecompliance';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.co.uk';

  const gapsHtml = gaps.map((gap, i) => `
    <div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:15px;margin-bottom:12px;border-radius:8px;">
      <div style="font-weight:600;color:#92400e;margin-bottom:5px;">${i + 1}. ${gap.title}</div>
      <div style="font-size:14px;color:#b45309;line-height:1.5;">${gap.description}</div>
      ${gap.exposure ? `<div style="background:#f59e0b;color:#fff;display:inline-block;padding:4px 10px;border-radius:6px;font-size:12px;margin-top:8px;font-weight:600;">Risk: ${gap.exposure}</div>` : ''}
    </div>`).join('');

  const strengthsHtml = strengths.map(s => `
    <div style="background:#d1fae5;border-left:4px solid #10b981;padding:12px;margin-bottom:8px;border-radius:8px;">
      <div style="font-size:14px;color:#065f46;line-height:1.5;">✓ ${s}</div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f0fdf4;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.1);overflow:hidden;">
    <div style="background:linear-gradient(135deg,#059669,#10b981);padding:40px 30px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;">🎯 Your PPT Compliance Results</h1>
    </div>
    <div style="padding:30px;">
      <h2 style="margin:0 0 20px;color:#064e3b;font-size:22px;">Dear ${userInfo.name},</h2>
      <p style="margin:0 0 15px;color:#047857;font-size:16px;line-height:1.6;">
        Thank you for completing your PPT Compliance Assessment. We've prepared this personalised report to help you understand where you stand and what steps you can take to protect <strong>${userInfo.company}</strong> from HMRC penalties.
      </p>
    </div>
    <div style="padding:0 30px 30px;">
      <div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:12px;padding:30px;border:2px solid #a7f3d0;text-align:center;">
        <div style="font-size:48px;margin-bottom:10px;">${scoreLevel.emoji}</div>
        <div style="font-size:56px;font-weight:800;color:${scoreLevel.color};margin-bottom:5px;">${score}/100</div>
        <div style="font-size:20px;font-weight:600;color:#065f46;margin-bottom:5px;">${scoreLevel.level}</div>
        <div style="font-size:14px;color:#059669;">${scoreLevel.description}</div>
      </div>
    </div>
    ${gaps.length > 0 ? `
    <div style="padding:0 30px 30px;">
      <h3 style="margin:0 0 10px;color:#b45309;font-size:18px;">⚠️ Areas to Address (${gaps.length})</h3>
      <p style="margin:0 0 15px;color:#047857;font-size:14px;">We've identified ${gaps.length} area${gaps.length > 1 ? 's' : ''} that need your attention.</p>
      ${gapsHtml}
    </div>` : ''}
    ${strengths.length > 0 ? `
    <div style="padding:0 30px 30px;">
      <h3 style="margin:0 0 10px;color:#059669;font-size:18px;">✅ What You're Doing Well (${strengths.length})</h3>
      ${strengthsHtml}
    </div>` : ''}
    <div style="padding:0 30px 30px;">
      <div style="background:linear-gradient(135deg,#059669,#10b981);border-radius:12px;padding:30px;color:#fff;">
        <h3 style="margin:0 0 15px;font-size:20px;">✨ Recommended Solution</h3>
        <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:20px;margin-bottom:20px;">
          <div style="font-size:24px;font-weight:700;margin-bottom:10px;">${recommendation.service}</div>
          <div style="font-size:15px;margin-bottom:15px;opacity:0.95;line-height:1.5;">${recommendation.description}</div>
          <div style="font-size:20px;font-weight:800;">${recommendation.price}</div>
        </div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="text-align:center;">
            <a href="${bookingLink}" style="display:inline-block;background:#fff;color:#059669;padding:16px 40px;text-decoration:none;border-radius:8px;font-weight:700;font-size:16px;margin-top:10px;">Book Your Free Call →</a>
          </td></tr>
        </table>
      </div>
    </div>
    <div style="padding:30px;background:#f9fafb;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0 0 10px;color:#6b7280;font-size:14px;">Have questions about your results?</p>
      <p style="margin:0;color:#059669;font-size:14px;">
        📞 <a href="tel:01217512262" style="color:#059669;text-decoration:none;font-weight:600;">0121 751 2262</a>
        &nbsp;|&nbsp;
        📧 <a href="mailto:hello@millstonecompliance.co.uk" style="color:#059669;text-decoration:none;font-weight:600;">hello@millstonecompliance.co.uk</a>
      </p>
      <p style="margin:15px 0 0;color:#9ca3af;font-size:12px;">
        © ${new Date().getFullYear()} Millstone Compliance Ltd &nbsp;·&nbsp;
        <a href="${siteUrl}/privacy" style="color:#9ca3af;text-decoration:underline;">Privacy Policy</a>
      </p>
    </div>
  </div>
</div>
</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userInfo, score, gaps, strengths, answers } = body;

    if (!userInfo?.email || !userInfo?.name) {
      return NextResponse.json(
        { error: 'Missing required user information' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('Email service not configured — skipping send');
      return NextResponse.json({ success: true, message: 'Email service not configured', skippedEmail: true });
    }

    const scoreLevel = getScoreLevel(score);
    const recommendation = getRecommendation(score);
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com';
    const resend = getResendClient();

    const businessHtml = buildBusinessEmailHtml({ userInfo, score, scoreLevel, gaps, strengths, answers, recommendation });
    const userHtml = buildUserEmailHtml({ userInfo, score, scoreLevel, gaps, strengths, recommendation });

    const result1 = await resend.emails.send({
      from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
      to: [businessEmail],
      subject: `🆕 New Assessment: ${userInfo.name} (${userInfo.company}) - Score: ${score}/100`,
      html: businessHtml,
    });

    if (result1.error) {
      console.error('Resend error (business email):', result1.error);
      return NextResponse.json({ error: 'Failed to send emails', details: result1.error }, { status: 500 });
    }

    const result2 = await resend.emails.send({
      from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
      to: [userInfo.email],
      subject: `${userInfo.name}, Your PPT Compliance Assessment Results - ${score}/100`,
      html: userHtml,
    });

    if (result2.error) {
      console.error('Resend error (user email):', result2.error);
      return NextResponse.json({ error: 'Failed to send user email', details: result2.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to determine score level
function getScoreLevel(score: number) {
  if (score >= 90) return { level: 'Audit-Ready', color: '#10b981', emoji: '🟢', description: 'Top 15% of businesses' };
  if (score >= 70) return { level: 'Strong Foundation', color: '#f59e0b', emoji: '🟡', description: '3-4 gaps to address' };
  if (score >= 50) return { level: 'Compliance Risk', color: '#f97316', emoji: '🟠', description: 'Significant exposure' };
  return { level: 'Critical Gaps', color: '#ef4444', emoji: '🔴', description: 'Urgent action needed' };
}

// Helper function to get recommendation
function getRecommendation(score: number) {
  if (score >= 90) {
    return {
      title: 'Maintenance & Monitoring',
      service: 'Quarterly Compliance Review',
      price: '£100/month',
      description: 'Maintain your excellent systems audit-ready with quarterly reviews',
    };
  }
  if (score >= 70) {
    return {
      title: 'Documentation Audit',
      service: 'Expert Audit + Implementation Guide',
      price: '£495 → £250 Early Client Rate',
      description: "We'll identify and help you address those final gaps",
    };
  }
  if (score >= 50) {
    return {
      title: 'Compliance Overhaul',
      service: 'Full Documentation Audit + Implementation Support',
      price: '£750 → £495 Early Client Rate',
      description: 'Comprehensive review and hands-on help to get you audit-ready',
    };
  }
  return {
    title: 'Emergency Compliance Package',
    service: 'Done-For-You Documentation + Urgent Support',
    price: '£1,200 → £750 Emergency Rate',
    description: "We'll organise everything and get you compliant quickly",
  };
}

