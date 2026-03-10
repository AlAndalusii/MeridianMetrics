import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

interface GapItem { title: string; description: string; risk: string }

interface LeadPayload {
  name: string
  email: string
  company: string
  phone?: string
  gdprConsent: boolean
  source: 'duty-of-care-analyser' | 'clinical-waste-analyser'
  score: number
  topGaps?: GapItem[]
  urgencyLevel?: 'High' | 'Medium' | 'Low'
}

function getScoreZone(score: number) {
  if (score <= 49) return { label: 'High Risk', color: '#dc2626', emoji: '🔴' }
  if (score <= 79) return { label: 'Compliance Gaps', color: '#d97706', emoji: '🟡' }
  return { label: 'Compliant', color: '#059669', emoji: '🟢' }
}

const toolMeta = {
  'duty-of-care-analyser': {
    title: 'Duty of Care Gap Analyser',
    subtitle: 'Your Waste Duty of Care Compliance Results',
    gapsHeading: '🚨 Top Duty of Care Gaps Identified',
    urgencyHeading: 'Critical Duty of Care gaps identified — Environment Agency enforcement risk',
    urgencyBody: 'The Environment Agency issues £300 fixed penalties on-the-spot and can prosecute for serious breaches. Businesses that fail their Duty of Care face unlimited fines on conviction.',
    positiveHeading: "You're mostly compliant — let's close the remaining gaps",
    positiveBody: 'Good progress on your Duty of Care compliance. A short consultation will help you address the remaining gaps and ensure full protection during any EA or council inspection.',
    contactLine: 'Have questions? Contact our waste compliance specialists',
    businessSubject: (name: string, company: string, score: number, urgency: string) =>
      `🆕 Duty of Care Lead: ${name} (${company}) — Score: ${score}/100 [${urgency} Priority]`,
    userSubject: 'Your Duty of Care Compliance Results — Millstone Compliance',
  },
  'clinical-waste-analyser': {
    title: 'Clinical Waste Gap Analyser',
    subtitle: 'Your Clinical Waste Compliance Results (HTM 07-01 · CQC · Ofsted)',
    gapsHeading: '🚨 Top Clinical Waste Compliance Gaps Identified',
    urgencyHeading: 'Critical clinical waste gaps — CQC / Ofsted inspection risk',
    urgencyBody: 'CQC and Ofsted inspect clinical waste as a fundamental safe care standard. Gaps in segregation, sharps management or consignment notes can result in enforcement action, requirement notices and adverse inspection ratings.',
    positiveHeading: "You're mostly compliant — let's close the final gaps",
    positiveBody: 'Good progress on your clinical waste compliance. A short consultation can help you address the remaining gaps and ensure you are fully prepared for your next CQC, Ofsted or EA inspection.',
    contactLine: 'Have questions? Contact our clinical waste specialists',
    businessSubject: (name: string, company: string, score: number, urgency: string) =>
      `🆕 Clinical Waste Lead: ${name} (${company}) — Score: ${score}/100 [${urgency} Priority]`,
    userSubject: 'Your Clinical Waste Compliance Results — Millstone Compliance',
  },
}

export async function POST(request: Request) {
  try {
    const body: LeadPayload = await request.json()
    const { name, email, company, phone, gdprConsent, source, score, topGaps = [], urgencyLevel = 'Medium' } = body

    if (!email || !name)      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    if (!gdprConsent)          return NextResponse.json({ error: 'GDPR consent required' },  { status: 400 })

    const zone          = getScoreZone(score)
    const meta          = toolMeta[source] ?? toolMeta['duty-of-care-analyser']
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'
    const bookingLink   = process.env.NEXT_PUBLIC_BOOKING_LINK || 'https://calendly.com/millstonecompliance'
    const siteUrl       = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.com'
    const isHighPriority = score < 80
    const scoreBarColor  = score <= 49 ? '#dc2626' : score <= 79 ? '#d97706' : '#059669'

    const gapsHtml = topGaps.map(g => `
      <div style="background:#fef3c7;border-left:4px solid #d97706;padding:12px 16px;margin:8px 0;border-radius:0 8px 8px 0;">
        <strong style="color:#92400e;">${g.title}</strong>
        <p style="color:#78350f;margin:4px 0 0;font-size:14px;">${g.description}</p>
        <p style="color:#dc2626;margin:4px 0 0;font-size:12px;font-weight:600;">⚠️ Risk: ${g.risk}</p>
      </div>`).join('')

    const userCTA = isHighPriority
      ? `<a href="${bookingLink}" style="display:inline-block;background:#dc2626;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">BOOK YOUR £295 COMPLIANCE AUDIT →</a>`
      : `<a href="${bookingLink}" style="display:inline-block;background:#059669;color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">GET YOUR FREE CONSULTATION →</a>`

    // ─── USER EMAIL ───────────────────────────────────────────────────────────
    const userEmailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;margin:0;padding:0;">
<div style="max-width:600px;margin:0 auto;background:#fff;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#064e3b,#065f46,#059669);padding:48px 32px;text-align:center;position:relative;overflow:hidden;">
    <div style="position:absolute;top:-30px;right:-30px;width:120px;height:120px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
    <div style="position:absolute;bottom:-20px;left:-20px;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
    <p style="color:#a7f3d0;margin:0 0 8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Millstone Compliance</p>
    <h1 style="color:#fff;margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">${meta.title}</h1>
    <p style="color:#6ee7b7;margin:12px 0 0;font-size:15px;">${meta.subtitle}</p>
  </div>

  <!-- Greeting -->
  <div style="padding:32px 32px 0;">
    <p style="color:#374151;font-size:16px;margin:0 0 8px;">Hi ${name},</p>
    <p style="color:#6b7280;font-size:14px;margin:0;">Thank you for completing the ${meta.title}. Here are your personalised compliance results for <strong>${company}</strong>.</p>
  </div>

  <!-- Score Section -->
  <div style="padding:24px 32px;">
    <div style="background:linear-gradient(135deg,${zone.color}0d,${zone.color}1a);border:2px solid ${zone.color}40;border-radius:20px;padding:32px;text-align:center;">
      <p style="color:${zone.color};font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Compliance Score</p>
      <div style="font-size:80px;font-weight:900;color:${zone.color};line-height:1;margin-bottom:4px;">${score}</div>
      <div style="font-size:18px;color:#9ca3af;margin-bottom:16px;">/100</div>
      <div style="background:#e5e7eb;border-radius:99px;height:12px;margin:0 auto 16px;max-width:300px;overflow:hidden;">
        <div style="background:${scoreBarColor};height:100%;border-radius:99px;width:${Math.round(score)}%;"></div>
      </div>
      <div style="display:inline-block;background:${zone.color};color:#fff;padding:8px 20px;border-radius:99px;font-size:14px;font-weight:700;margin-bottom:16px;">${zone.emoji} ${zone.label}</div>
    </div>
  </div>

  ${isHighPriority ? `
  <!-- Urgency Banner -->
  <div style="padding:0 32px 24px;">
    <div style="background:#fef2f2;border:2px solid #fecaca;border-radius:12px;padding:20px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="32" valign="top" style="padding-right:12px;font-size:24px;">⚠️</td>
        <td>
          <p style="color:#dc2626;font-weight:700;margin:0 0 6px;font-size:15px;">${meta.urgencyHeading}</p>
          <p style="color:#991b1b;font-size:13px;margin:0;line-height:1.5;">${meta.urgencyBody}</p>
        </td>
      </tr></table>
    </div>
  </div>` : `
  <!-- Positive Banner -->
  <div style="padding:0 32px 24px;">
    <div style="background:#f0fdf4;border:2px solid #bbf7d0;border-radius:12px;padding:20px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="32" valign="top" style="padding-right:12px;font-size:24px;">✅</td>
        <td>
          <p style="color:#059669;font-weight:700;margin:0 0 6px;font-size:15px;">${meta.positiveHeading}</p>
          <p style="color:#065f46;font-size:13px;margin:0;line-height:1.5;">${meta.positiveBody}</p>
        </td>
      </tr></table>
    </div>
  </div>`}

  <!-- CTA -->
  <div style="text-align:center;padding:0 32px 32px;">${userCTA}</div>

  <!-- Score Bands -->
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
      <tr style="${score >= 80 ? 'background:#f0fdf4;' : ''}">
        <td style="padding:10px 16px;font-size:13px;color:#059669;font-weight:600;">80 – 100</td>
        <td style="padding:10px 16px;font-size:13px;color:#374151;">🟢 Compliant</td>
        <td style="padding:10px 16px;">${score >= 80 ? `<span style="background:#059669;color:#fff;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:700;">YOUR SCORE: ${score}</span>` : ''}</td>
      </tr>
    </table>
  </div>

  ${topGaps.length > 0 ? `
  <!-- Gaps -->
  <div style="padding:0 32px 24px;">
    <h3 style="color:#1f2937;font-size:17px;margin:0 0 16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:12px;">${meta.gapsHeading}</h3>
    ${gapsHtml}
  </div>` : ''}

  <!-- How We Can Help -->
  <div style="padding:0 32px 32px;">
    <h3 style="color:#1f2937;font-size:17px;margin:0 0 16px;font-weight:700;border-bottom:2px solid #f3f4f6;padding-bottom:12px;">🎯 How We Can Help</h3>
    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="padding:12px;background:#f0fdf4;border:2px solid #059669;border-radius:12px;vertical-align:top;">
          <p style="color:#059669;font-weight:800;font-size:16px;margin:0 0 4px;">FREE</p>
          <p style="color:#065f46;font-weight:700;font-size:14px;margin:0 0 8px;">Discovery Call</p>
          <p style="color:#374151;font-size:13px;margin:0 0 12px;">15-minute consultation to discuss your results and next steps — no obligation.</p>
          <a href="${bookingLink}" style="display:block;background:#059669;color:#fff;padding:10px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;text-align:center;">Book Free Call →</a>
        </td>
      </tr>
      <tr><td style="height:12px;"></td></tr>
      <tr>
        <td style="padding:12px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;vertical-align:top;">
          <p style="color:#065f46;font-weight:800;font-size:16px;margin:0 0 4px;">£295</p>
          <p style="color:#374151;font-weight:700;font-size:14px;margin:0 0 8px;">Compliance Audit</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• 90-minute on-site assessment</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Written report within 48 hours</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Specific action plan</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 12px;">• CQC / Ofsted inspection ready</p>
          <a href="${bookingLink}" style="display:block;background:#f0fdf4;color:#065f46;border:2px solid #065f46;padding:10px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;text-align:center;">Book Audit →</a>
        </td>
      </tr>
      <tr><td style="height:12px;"></td></tr>
      <tr>
        <td style="padding:12px;background:#fff;border:1px solid #e5e7eb;border-radius:12px;vertical-align:top;">
          <p style="color:#065f46;font-weight:800;font-size:16px;margin:0 0 4px;">£495</p>
          <p style="color:#374151;font-weight:700;font-size:14px;margin:0 0 8px;">Audit + Implementation Support</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Everything in Compliance Audit</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• 30-day email/phone support</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 4px;">• Document templates provided</p>
          <p style="color:#6b7280;font-size:13px;margin:0 0 12px;">• Follow-up compliance check</p>
          <a href="${bookingLink}" style="display:block;background:#f9fafb;color:#374151;border:1px solid #e5e7eb;padding:10px;border-radius:8px;text-decoration:none;font-weight:600;font-size:13px;text-align:center;">See Full Setup Option →</a>
        </td>
      </tr>
    </table>
  </div>

  <!-- Contact -->
  <div style="padding:0 32px 32px;">
    <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border-radius:16px;padding:24px;text-align:center;border:1px solid #a7f3d0;">
      <p style="color:#065f46;font-weight:700;margin:0 0 8px;font-size:15px;">${meta.contactLine}</p>
      <p style="color:#374151;font-size:14px;margin:0 0 12px;">
        📞 <a href="tel:01217512262" style="color:#059669;text-decoration:none;font-weight:600;">0121 751 2262</a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        📧 <a href="mailto:hello@millstonecompliance.com" style="color:#059669;text-decoration:none;font-weight:600;">hello@millstonecompliance.com</a>
      </p>
      <a href="${bookingLink}" style="display:inline-block;background:linear-gradient(135deg,#065f46,#059669);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Book Your Free 15-Minute Call →</a>
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
</html>`

    // ─── BUSINESS NOTIFICATION EMAIL ──────────────────────────────────────────
    const businessEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f9fafb;padding:20px;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
  <div style="background:#065f46;padding:24px;color:#fff;">
    <h2 style="margin:0;font-size:20px;">New ${meta.title} Lead ${zone.emoji}</h2>
    <p style="margin:4px 0 0;color:#a7f3d0;font-size:14px;">Urgency: ${urgencyLevel} | Score: ${score}/100 | Zone: ${zone.label}</p>
  </div>
  <div style="padding:24px;">
    <h3 style="color:#374151;margin:0 0 16px;">Lead Details</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:120px;">Name</td><td style="padding:8px 0;color:#1f2937;font-size:13px;font-weight:600;">${name}</td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#059669;">${email}</a></td></tr>
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Company</td><td style="padding:8px 0;color:#1f2937;font-size:13px;">${company}</td></tr>
      ${phone ? `<tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#059669;">${phone}</a></td></tr>` : ''}
      <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Source</td><td style="padding:8px 0;color:#1f2937;font-size:13px;">${source}</td></tr>
    </table>

    <div style="background:${zone.color}15;border:2px solid ${zone.color};border-radius:8px;padding:16px;margin:20px 0;text-align:center;">
      <div style="font-size:48px;font-weight:900;color:${zone.color};">${score}/100</div>
      <div style="color:${zone.color};font-weight:700;">${zone.emoji} ${zone.label} — ${urgencyLevel} Priority</div>
    </div>

    ${topGaps.length > 0 ? `
    <h3 style="color:#374151;margin:20px 0 12px;">Top Gaps Identified</h3>
    ${gapsHtml}` : ''}

    <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;">
      <p style="margin:0;font-size:14px;color:#065f46;font-weight:600;">Suggested action:</p>
      <p style="margin:6px 0 0;font-size:13px;color:#374151;">
        ${score <= 49 ? 'High-priority lead — follow up within 24 hours. Significant compliance exposure identified.' : score <= 79 ? 'Warm lead — follow up within 48 hours. Gaps identified that need addressing.' : 'Good score — send a nurture email and offer a free consultation to close remaining gaps.'}
      </p>
    </div>
  </div>
</div>
</body>
</html>`

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('📧 Email service not configured — lead logged:', { name, email, company, source, score })
      return NextResponse.json({ success: true, message: 'Lead saved (email not configured)', skippedEmail: true })
    }

    const resend = getResendClient()

    const batchResult = await resend.batch.send([
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [businessEmail],
        subject: meta.businessSubject(name, company, score, urgencyLevel),
        html: businessEmailHtml,
      },
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [email],
        subject: meta.userSubject,
        html: userEmailHtml,
      },
    ])

    if (batchResult.error) {
      console.error('Resend error:', batchResult.error)
      return NextResponse.json({ error: 'Failed to send emails', details: batchResult.error }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Lead captured and emails sent' })
  } catch (error) {
    console.error('Error in /api/leads:', error)
    return NextResponse.json({ error: 'Submission failed', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}
