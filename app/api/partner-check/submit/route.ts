import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface QuestionResult {
  id: number
  question: string
  answer: 'yes' | 'no'
  isIssue: boolean
}

interface SubmitPayload {
  partnerName: string
  partnerPhone: string
  partnerEmail: string
  partnerCompany?: string
  results: QuestionResult[]
  issueCount: number
}

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

function buildPartnerCheckEmail(payload: SubmitPayload): string {
  const { partnerName, partnerPhone, partnerEmail, partnerCompany, results, issueCount } = payload
  const hasIssues = issueCount > 0
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.co.uk'
  const bookingLink = process.env.NEXT_PUBLIC_BOOKING_LINK || 'https://calendly.com/millstonecompliance'

  const summaryColor = issueCount === 0 ? '#059669' : issueCount >= 3 ? '#dc2626' : '#d97706'
  const summaryLabel =
    issueCount === 0
      ? 'No Issues Found'
      : issueCount >= 3
      ? 'Multiple Issues Found'
      : issueCount === 1
      ? 'One Issue Found'
      : 'A Few Issues Found'
  const summaryEmoji = issueCount === 0 ? '✅' : issueCount >= 3 ? '🔴' : '🟡'

  const questionRows = results
    .map(
      (r) => `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #f3f4f6;vertical-align:top;width:58%;">
        <p style="margin:0;font-size:13px;color:#1f2937;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:1.55;">${r.question}</p>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #f3f4f6;text-align:center;vertical-align:middle;width:20%;">
        <span style="display:inline-block;padding:4px 14px;border-radius:99px;font-size:11px;font-weight:700;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;letter-spacing:0.06em;background:${r.answer === 'yes' ? '#f0fdf4' : '#f8fafc'};color:${r.answer === 'yes' ? '#065f46' : '#374151'};border:1px solid ${r.answer === 'yes' ? '#bbf7d0' : '#e2e8f0'};">
          ${r.answer === 'yes' ? 'YES' : 'NO'}
        </span>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #f3f4f6;text-align:center;vertical-align:middle;width:22%;">
        ${
          r.isIssue
            ? `<span style="display:inline-block;padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">⚠ Issue</span>`
            : `<span style="display:inline-block;padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;background:#f0fdf4;color:#059669;border:1px solid #bbf7d0;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">✓ OK</span>`
        }
      </td>
    </tr>`
    )
    .join('')

  const nextSteps = [
    [`Contact ${partnerName}`, `Call or email the partner to discuss the site and plan your next move.`, partnerPhone, partnerEmail],
    ['Arrange a consultation', 'Book a site visit or call with the client to walk through findings.', '', ''],
    ['Prepare a proposal', 'Put together a tailored compliance audit based on the issues identified.', '', ''],
  ]

  const nextStepsHtml = nextSteps
    .map(
      ([title, desc, phone, email], i) => `
    <tr>
      <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 20px;margin-bottom:8px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="width:28px;vertical-align:top;padding-right:12px;">
            <div style="width:24px;height:24px;background:#065f46;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:700;color:#ffffff;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">${i + 1}</div>
          </td>
          <td style="vertical-align:top;">
            <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#0f172a;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">${title}</p>
            <p style="margin:0 0 ${phone || email ? '8px' : '0'};font-size:13px;color:#64748b;line-height:1.5;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">${desc}</p>
            ${phone ? `<a href="tel:${phone.replace(/\s/g, '')}" style="display:inline-block;font-size:13px;font-weight:600;color:#059669;text-decoration:none;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;margin-right:12px;">📞 ${phone}</a>` : ''}
            ${email ? `<a href="mailto:${email}" style="display:inline-block;font-size:13px;font-weight:600;color:#059669;text-decoration:none;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">✉ ${email}</a>` : ''}
          </td>
        </tr></table>
      </td>
    </tr>
    <tr><td style="height:8px;"></td></tr>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Partner Site Check — Millstone Compliance</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; }
    body { margin:0;padding:0;background:#f1f5f9;font-family:'Poppins','Helvetica Neue',Arial,sans-serif; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

    <!-- ─── HEADER ───────────────────────────────────────────────── -->
    <tr>
      <td style="background:linear-gradient(145deg,#052e16 0%,#064e3b 35%,#065f46 65%,#059669 100%);border-radius:20px 20px 0 0;padding:44px 40px 40px;">

        <!-- Logo row -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Actual logo image from the logo folder -->
                  <td style="vertical-align:middle;padding-right:14px;">
                    <img
                      src="${siteUrl}/logo/meridian-logo-modern.svg"
                      alt="Millstone Compliance"
                      width="56"
                      height="56"
                      style="display:block;width:56px;height:56px;"
                    />
                  </td>
                  <td style="vertical-align:middle;text-align:left;">
                    <p style="margin:0 0 3px;font-size:20px;font-weight:800;color:#ecfdf5;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;letter-spacing:-0.4px;line-height:1.1;">Millstone Compliance</p>
                    <p style="margin:0;font-size:9.5px;font-weight:600;color:#6ee7b7;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;">Waste &amp; Recycling Compliance Specialists</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Divider -->
        <div style="width:48px;height:2px;background:rgba(110,231,183,0.45);margin:0 auto 28px;border-radius:2px;"></div>

        <!-- Title -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <p style="margin:0 0 8px;font-size:10.5px;font-weight:700;color:#6ee7b7;letter-spacing:0.22em;text-transform:uppercase;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">Partner Site Check</p>
              <h1 style="margin:0 0 10px;font-size:30px;font-weight:800;color:#ffffff;line-height:1.15;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;letter-spacing:-0.6px;">New Check Submitted</h1>
              <p style="margin:0;font-size:14px;color:#a7f3d0;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:1.5;">A Millstone Compliance partner has completed an on-site waste assessment</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- ─── PARTNER DETAILS + SCORE ──────────────────────────────── -->
    <tr>
      <td style="background:#ffffff;padding:36px 40px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>

            <!-- Partner info card -->
            <td style="width:58%;padding-right:12px;vertical-align:top;">
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px 22px;">
                <p style="margin:0 0 14px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">Submitted by</p>

                <p style="margin:0 0 2px;font-size:18px;font-weight:700;color:#0f172a;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:1.2;">${partnerName}</p>

                ${partnerCompany ? `<p style="margin:0 0 12px;font-size:13px;color:#64748b;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">${partnerCompany}</p>` : '<div style="margin-bottom:12px;"></div>'}

                <!-- Divider -->
                <div style="height:1px;background:#e2e8f0;margin-bottom:12px;"></div>

                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-bottom:8px;">
                      <a href="tel:${partnerPhone.replace(/\s/g, '')}" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">
                        <span style="font-size:12px;">📞</span>
                        <span style="font-size:13px;font-weight:600;color:#059669;">${partnerPhone}</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="mailto:${partnerEmail}" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">
                        <span style="font-size:12px;">✉</span>
                        <span style="font-size:13px;font-weight:600;color:#059669;">${partnerEmail}</span>
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>

            <!-- Score card -->
            <td style="width:42%;padding-left:12px;vertical-align:top;">
              <div style="background:${summaryColor}0d;border:2px solid ${summaryColor}35;border-radius:14px;padding:20px;text-align:center;height:100%;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:${summaryColor};letter-spacing:0.16em;text-transform:uppercase;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">Site Result</p>
                <p style="margin:0 0 8px;font-size:32px;line-height:1;">${summaryEmoji}</p>
                <p style="margin:0 0 10px;font-size:32px;font-weight:900;color:${summaryColor};line-height:1;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">${issueCount}</p>
                <p style="margin:0;font-size:12px;font-weight:600;color:${summaryColor};font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:1.3;">${summaryLabel}</p>
              </div>
            </td>

          </tr>
        </table>
      </td>
    </tr>

    <!-- ─── RESULTS TABLE ─────────────────────────────────────────── -->
    <tr>
      <td style="background:#ffffff;padding:0 40px 36px;">
        <p style="margin:0 0 14px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">Site Check Results</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          <tr style="background:#f8fafc;">
            <td style="padding:10px 16px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;border-bottom:1px solid #e2e8f0;">Question</td>
            <td style="padding:10px 16px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;border-bottom:1px solid #e2e8f0;">Answer</td>
            <td style="padding:10px 16px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;text-align:center;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;border-bottom:1px solid #e2e8f0;">Status</td>
          </tr>
          ${questionRows}
        </table>
      </td>
    </tr>

    <!-- ─── SUMMARY BANNER ────────────────────────────────────────── -->
    <tr>
      <td style="background:#ffffff;padding:0 40px 36px;">
        <div style="background:${hasIssues ? '#fffbeb' : '#f0fdf4'};border:2px solid ${hasIssues ? '#fde68a' : '#bbf7d0'};border-radius:14px;padding:22px 24px;">
          <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:${hasIssues ? '#92400e' : '#065f46'};font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">
            ${hasIssues
              ? `${issueCount} potential compliance issue${issueCount > 1 ? 's' : ''} spotted on this visit`
              : 'No obvious issues spotted on this visit'}
          </p>
          <p style="margin:0;font-size:13px;color:${hasIssues ? '#78350f' : '#065f46'};line-height:1.65;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">
            ${hasIssues
              ? 'This client is likely to benefit from a full waste compliance audit. Review the results above and contact the partner to arrange next steps.'
              : 'A clean result on the 5-point check. It may still be worth offering a full audit to confirm everything is in order and help the client document their compliance.'}
          </p>
        </div>
      </td>
    </tr>

    <!-- ─── NEXT STEPS ────────────────────────────────────────────── -->
    <tr>
      <td style="background:#ffffff;padding:0 40px 44px;">
        <p style="margin:0 0 14px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">Suggested Next Steps</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${nextStepsHtml}
        </table>
      </td>
    </tr>

    <!-- ─── CTA BUTTON ─────────────────────────────────────────────── -->
    <tr>
      <td style="background:#ffffff;padding:0 40px 48px;text-align:center;">
        <a href="${bookingLink}" style="display:inline-block;background:linear-gradient(135deg,#065f46 0%,#059669 100%);color:#ffffff;padding:16px 44px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:700;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;letter-spacing:0.01em;box-shadow:0 4px 14px rgba(6,95,70,0.25);">
          Book a Consultation →
        </a>
      </td>
    </tr>

    <!-- ─── FOOTER ─────────────────────────────────────────────────── -->
    <tr>
      <td style="background:#0f172a;border-radius:0 0 20px 20px;padding:36px 40px 32px;">

        <!-- Logo + name row -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding-bottom:22px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:12px;">
                    <img
                      src="${siteUrl}/logo/meridian-logo-minimal.svg"
                      alt="Millstone Compliance"
                      width="36"
                      height="36"
                      style="display:block;width:36px;height:36px;opacity:0.9;"
                    />
                  </td>
                  <td style="vertical-align:middle;text-align:left;">
                    <p style="margin:0 0 2px;font-size:15px;font-weight:800;color:#f1f5f9;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:1.1;">Millstone Compliance</p>
                    <p style="margin:0;font-size:9px;font-weight:600;color:#6ee7b7;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;letter-spacing:0.16em;text-transform:uppercase;">Waste &amp; Recycling Specialists</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Divider line -->
        <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(110,231,183,0.3),transparent);margin-bottom:22px;"></div>

        <!-- Contact links -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <p style="margin:0;font-size:13px;color:#64748b;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:2;">
                <a href="tel:01217512262" style="color:#6ee7b7;text-decoration:none;font-weight:600;">0121 751 2262</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="mailto:hello@millstonecompliance.co.uk" style="color:#6ee7b7;text-decoration:none;font-weight:600;">hello@millstonecompliance.co.uk</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="${siteUrl}" style="color:#6ee7b7;text-decoration:none;font-weight:600;">millstonecompliance.co.uk</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Legal line -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <p style="margin:0 0 5px;font-size:11px;color:#334155;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;line-height:1.7;">
                This email was generated when a partner submitted a site check via the Millstone Compliance Partner Portal.
              </p>
              <p style="margin:0;font-size:11px;color:#334155;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">
                © ${new Date().getFullYear()} Millstone Compliance Ltd · United Kingdom
                &nbsp;·&nbsp;
                <a href="${siteUrl}/privacy" style="color:#475569;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body: SubmitPayload = await request.json()
    const { partnerName, partnerPhone, partnerEmail, results, issueCount } = body

    if (!partnerName || !partnerPhone || !partnerEmail || !results || results.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'
    const emailHtml = buildPartnerCheckEmail(body)

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('Partner check submitted (email not configured):', { partnerName, partnerPhone, partnerEmail, issueCount })
      return NextResponse.json({ success: true, message: 'Submitted (email not configured)' })
    }

    const resend = getResendClient()

    const result = await resend.emails.send({
      from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
      to: [businessEmail],
      replyTo: partnerEmail,
      subject: `Partner Site Check — ${issueCount} issue${issueCount !== 1 ? 's' : ''} found | ${partnerName}`,
      html: emailHtml,
    })

    if (result.error) {
      console.error('Resend error:', result.error)
      return NextResponse.json({ error: 'Failed to send email', details: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Partner check submission error:', error)
    return NextResponse.json(
      { error: 'Submission failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
