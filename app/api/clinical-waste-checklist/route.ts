import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface ChecklistPayload {
  userInfo: { name: string; email: string; company: string; phone?: string };
  answers: Record<number, 'yes' | 'no'>;
  gaps: number;
  gapLabels: string[];
}

const questions = [
  'Do you know your current cost per tonne for clinical waste collection?',
  'Is your offensive waste (incontinence pads, non-infectious items) collected separately from infectious clinical waste?',
  'Has someone independent reviewed your contractor rates in the last 12 months?',
  'Does your collection frequency match your actual waste output week to week?',
  'Do you hold a current pre-acceptance audit document from your clinical waste contractor?',
];

const moneyMessages = [
  'Most care homes overpay by 20–40% without benchmarking.',
  'Mixing streams means paying infectious disposal rates for cheaper waste.',
  'Unreviewed contracts drift well above market rate year on year.',
  'Over-collection is one of the most common unnecessary charges we find.',
  'Missing documentation puts your CQC rating and licence at risk.',
];

function buildBusinessEmail(p: ChecklistPayload): string {
  const { userInfo, answers, gaps, gapLabels } = p;
  const riskColor = gaps === 0 ? '#059669' : gaps <= 2 ? '#d97706' : '#dc2626';
  const riskLabel = gaps === 0 ? 'FULLY COMPLIANT' : gaps <= 2 ? 'MODERATE RISK' : 'HIGH RISK';

  const answersHtml = questions.map((q, i) => {
    const n = i + 1;
    const ans = answers[n];
    const bg  = ans === 'no' ? '#fef2f2' : '#f0fdf4';
    const col = ans === 'no' ? '#dc2626' : '#059669';
    const txt = ans === 'no' ? '✗ NO'    : '✓ YES';
    return `
      <tr>
        <td style="padding:6px 0;border-bottom:1px solid #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:13px;color:#374151;padding:10px 12px;background:${bg};border-radius:8px;line-height:1.4;">
                <strong style="color:#111827;">${n}.</strong> ${q}
                <br/><span style="font-weight:700;color:${col};font-size:12px;margin-top:4px;display:inline-block;">${txt}${ans === 'no' ? ` — This is costing you money.` : ''}</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f3f4f6;margin:0;padding:0;">
<div style="max-width:680px;margin:0 auto;padding:32px 20px;">
  <div style="background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

    <div style="background:#0a1628;padding:28px 32px;">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#10b981;font-weight:600;">CLINICAL WASTE · NEW SUBMISSION</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">New Checklist Completed</h1>
      <p style="margin:8px 0 0;color:#94a3b8;font-size:13px;">${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}</p>
    </div>

    <div style="padding:28px 32px;border-bottom:1px solid #e5e7eb;">
      <h2 style="margin:0 0 16px;color:#111827;font-size:17px;font-weight:700;">Contact Details</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="color:#6b7280;font-size:13px;padding:7px 0;width:90px;">Name</td><td style="color:#111827;font-weight:700;font-size:13px;">${userInfo.name}</td></tr>
        <tr><td style="color:#6b7280;font-size:13px;padding:7px 0;">Email</td><td><a href="mailto:${userInfo.email}" style="color:#059669;font-size:13px;">${userInfo.email}</a></td></tr>
        <tr><td style="color:#6b7280;font-size:13px;padding:7px 0;">Company</td><td style="color:#111827;font-weight:700;font-size:13px;">${userInfo.company}</td></tr>
        ${userInfo.phone ? `<tr><td style="color:#6b7280;font-size:13px;padding:7px 0;">Phone</td><td><a href="tel:${userInfo.phone}" style="color:#059669;font-size:13px;">${userInfo.phone}</a></td></tr>` : ''}
      </table>
    </div>

    <div style="padding:28px 32px;border-bottom:1px solid #e5e7eb;">
      <h2 style="margin:0 0 16px;color:#111827;font-size:17px;font-weight:700;">Gap Summary</h2>
      <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border-radius:12px;padding:20px;text-align:center;border:2px solid #6ee7b7;">
        <div style="font-size:52px;font-weight:900;color:${riskColor};line-height:1;">${gaps}</div>
        <div style="font-size:14px;font-weight:700;color:#064e3b;margin-top:4px;">gap${gaps !== 1 ? 's' : ''} out of 5</div>
        <div style="display:inline-block;margin-top:10px;padding:5px 16px;background:${riskColor};border-radius:100px;font-size:11px;font-weight:800;color:#fff;letter-spacing:0.1em;">${riskLabel}</div>
      </div>
      ${gaps > 0 ? `
      <div style="margin-top:14px;">
        <p style="font-size:13px;font-weight:700;color:#111827;margin:0 0 10px;">Gaps identified:</p>
        ${gapLabels.map(g => `<div style="background:#fef3c7;border-left:3px solid #f59e0b;padding:10px 14px;margin-bottom:8px;border-radius:6px;font-size:13px;color:#92400e;">${g}</div>`).join('')}
      </div>` : ''}
    </div>

    <div style="padding:28px 32px;">
      <h2 style="margin:0 0 14px;color:#111827;font-size:17px;font-weight:700;">Full Answers</h2>
      <table width="100%" cellpadding="0" cellspacing="0">${answersHtml}</table>
    </div>

  </div>
  <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:20px;">Millstone Compliance · Clinical Waste Quick Check</p>
</div>
</body>
</html>`;
}

function buildUserEmail(p: ChecklistPayload): string {
  const { userInfo, answers, gaps } = p;
  const riskColor = gaps === 0 ? '#059669' : gaps <= 2 ? '#d97706' : '#dc2626';
  const riskBg    = gaps === 0 ? '#f0fdf4' : gaps <= 2 ? '#fffbeb' : '#fef2f2';
  const riskBorder= gaps === 0 ? '#6ee7b7' : gaps <= 2 ? '#fcd34d' : '#fca5a5';
  const headline  = gaps === 0
    ? "You're fully compliant — great work."
    : gaps <= 2
    ? `You have ${gaps} gap${gaps > 1 ? 's' : ''} — let's fix that quickly.`
    : `You have ${gaps} gaps — this is costing you money.`;
  const bodyMsg   = gaps === 0
    ? "Your clinical waste setup looks solid. Keep your pre-acceptance audits and documentation current. We recommend an independent review annually to maintain compliance and ensure you're still on the best market rate."
    : "Our team has reviewed your results. Care homes with these gaps typically overpay by £2,000–£5,000 per year — often without realising it. A free 15-minute call is the fastest way to find out exactly where you stand.";

  const rowsHtml = questions.map((q, i) => {
    const n = i + 1;
    const ans = answers[n];
    const col = ans === 'no' ? '#dc2626' : '#059669';
    const icon= ans === 'no' ? '✗' : '✓';
    return `
      <tr>
        <td style="padding:4px 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="24" valign="top" style="padding-top:11px;">
                <span style="font-size:13px;font-weight:800;color:${col};">${icon}</span>
              </td>
              <td style="font-family:Arial,sans-serif;font-size:13px;color:#374151;padding:10px 0;line-height:1.4;border-bottom:1px solid #f3f4f6;">
                ${q}
                ${ans === 'no' ? `<br/><span style="font-size:11.5px;font-weight:700;color:#dc2626;">This is costing you money.</span>` : ''}
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f3f4f6;margin:0;padding:0;">
<div style="max-width:620px;margin:0 auto;padding:32px 20px;">
  <div style="background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

    <div style="background:#0a1628;padding:28px 32px;text-align:center;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#10b981;font-weight:600;">MILLSTONE COMPLIANCE</p>
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:800;">Your Clinical Waste<br>Quick Check Results</h1>
    </div>

    <div style="padding:28px 32px;border-bottom:1px solid #e5e7eb;">
      <p style="margin:0 0 4px;font-size:14px;color:#6b7280;">Hi ${userInfo.name},</p>
      <h2 style="margin:8px 0 12px;font-size:20px;font-weight:800;color:#111827;">${headline}</h2>
      <p style="font-size:14px;color:#4b5563;line-height:1.7;margin:0;">${bodyMsg}</p>
    </div>

    <div style="padding:28px 32px;border-bottom:1px solid #e5e7eb;">
      <div style="background:${riskBg};border:2px solid ${riskBorder};border-radius:12px;padding:20px;text-align:center;">
        <div style="font-size:48px;font-weight:900;color:${riskColor};line-height:1;">${gaps}/5</div>
        <div style="font-size:13px;color:#374151;margin-top:6px;">gaps identified</div>
      </div>
    </div>

    <div style="padding:28px 32px;border-bottom:1px solid #e5e7eb;">
      <h3 style="margin:0 0 14px;font-size:15px;font-weight:700;color:#111827;">Your answers</h3>
      <table width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
    </div>

    <div style="padding:28px 32px;text-align:center;background:linear-gradient(135deg,#f0fdf4,#ecfdf5);">
      <h3 style="margin:0 0 8px;font-size:18px;font-weight:800;color:#064e3b;">Get Your Free Savings Check</h3>
      <p style="font-size:13px;color:#374151;margin:0 0 20px;line-height:1.6;">A 15-minute call with our team is all it takes to find out how much you could save — at no cost and no obligation.</p>
      <a href="https://millstonecompliance.com" style="display:inline-block;background:#064e3b;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.02em;">Book Free Call →</a>
      <p style="margin:20px 0 0;font-size:12px;color:#9ca3af;">📞 0121 751 2262 &nbsp;·&nbsp; 📧 <a href="mailto:hello@millstonecompliance.com" style="color:#059669;text-decoration:none;">hello@millstonecompliance.com</a></p>
    </div>

  </div>
  <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px;">© 2025 Millstone Compliance Ltd · Registered in England &amp; Wales<br>If this wasn't you, <a href="mailto:hello@millstonecompliance.com" style="color:#9ca3af;">reply to this email</a>.</p>
</div>
</body>
</html>`;
}

export async function POST(req: Request) {
  try {
    const body: ChecklistPayload = await req.json();
    const { userInfo, answers, gaps, gapLabels } = body;

    if (!userInfo?.name || !userInfo?.email || !userInfo?.company) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 'your-resend-api-key') {
      console.warn('Resend API key not configured — skipping email send');
      return NextResponse.json({ success: true, skippedEmail: true });
    }

    const resend = getResendClient();
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com';

    const [r1, r2] = await Promise.all([
      resend.emails.send({
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [businessEmail],
        subject: `🩺 New Waste Quick Check — ${userInfo.name} (${userInfo.company}) — ${gaps} gap${gaps !== 1 ? 's' : ''}`,
        html: buildBusinessEmail({ userInfo, answers, gaps, gapLabels }),
      }),
      resend.emails.send({
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [userInfo.email],
        subject: `${userInfo.name}, your clinical waste quick check results`,
        html: buildUserEmail({ userInfo, answers, gaps, gapLabels }),
      }),
    ]);

    if (r1.error || r2.error) {
      console.error('Resend errors:', r1.error, r2.error);
      return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Clinical waste checklist email error:', error);
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
