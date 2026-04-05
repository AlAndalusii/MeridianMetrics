import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailHeader, emailFooter, wrapEmail } from '@/lib/email-layout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FONT = `'Poppins','Helvetica Neue',Arial,sans-serif`

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
  const bookingLink = process.env.NEXT_PUBLIC_BOOKING_LINK || `${siteUrl}/services`

  const summaryColor  = issueCount === 0 ? '#059669' : issueCount >= 3 ? '#dc2626' : '#d97706'
  const summaryBg     = issueCount === 0 ? '#f0fdf4' : issueCount >= 3 ? '#fef2f2' : '#fffbeb'
  const summaryBorder = issueCount === 0 ? '#bbf7d0' : issueCount >= 3 ? '#fecaca' : '#fde68a'
  const summaryLabel  = issueCount === 0 ? 'No Issues Found'
    : issueCount >= 3 ? 'Multiple Issues Found'
    : issueCount === 1 ? 'One Issue Found' : 'A Few Issues Found'
  const summaryEmoji  = issueCount === 0 ? '✅' : issueCount >= 3 ? '🔴' : '🟡'

  const questionRows = results.map((r) => `
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #f1f5f9;vertical-align:top;width:58%;">
        <p style="margin:0;font-size:13px;color:#1f2937;font-family:${FONT};line-height:1.55;">${r.question}</p>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #f1f5f9;text-align:center;vertical-align:middle;width:20%;">
        <span style="display:inline-block;padding:4px 14px;border-radius:99px;font-size:11px;font-weight:700;font-family:${FONT};letter-spacing:0.06em;background:${r.answer === 'yes' ? '#f0fdf4' : '#f8fafc'};color:${r.answer === 'yes' ? '#065f46' : '#374151'};border:1px solid ${r.answer === 'yes' ? '#bbf7d0' : '#e2e8f0'};">
          ${r.answer === 'yes' ? 'YES' : 'NO'}
        </span>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #f1f5f9;text-align:center;vertical-align:middle;width:22%;">
        ${r.isIssue
          ? `<span style="display:inline-block;padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;font-family:${FONT};">⚠ Issue</span>`
          : `<span style="display:inline-block;padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;background:#f0fdf4;color:#059669;border:1px solid #bbf7d0;font-family:${FONT};">✓ OK</span>`
        }
      </td>
    </tr>`).join('')

  const rows = `
    ${emailHeader({
      eyebrow: 'Partner Site Check',
      title: 'New Check Submitted',
      subtitle: 'A Millstone Compliance partner has completed an on-site waste assessment.',
    })}

    <!-- PARTNER DETAILS + SCORE -->
    <tr>
      <td style="background:#ffffff;padding:36px 44px 28px;">
        <p style="margin:0 0 18px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Submitted By</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <!-- Partner card -->
            <td style="width:58%;padding-right:12px;vertical-align:top;">
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:22px 24px;">
                <p style="margin:0 0 3px;font-size:18px;font-weight:800;color:#0f172a;font-family:${FONT};line-height:1.2;">${partnerName}</p>
                ${partnerCompany ? `<p style="margin:0 0 14px;font-size:13px;color:#64748b;font-family:${FONT};">${partnerCompany}</p>` : '<div style="margin-bottom:14px;"></div>'}
                <div style="height:1px;background:#e2e8f0;margin-bottom:14px;"></div>
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr><td style="padding-bottom:8px;">
                    <a href="tel:${partnerPhone.replace(/\s/g,'')}" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;">
                      <span style="font-size:12px;">📞</span>
                      <span style="font-size:13px;font-weight:600;color:#059669;font-family:${FONT};">${partnerPhone}</span>
                    </a>
                  </td></tr>
                  <tr><td>
                    <a href="mailto:${partnerEmail}" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;">
                      <span style="font-size:12px;">✉</span>
                      <span style="font-size:13px;font-weight:600;color:#059669;font-family:${FONT};">${partnerEmail}</span>
                    </a>
                  </td></tr>
                </table>
              </div>
            </td>
            <!-- Score card -->
            <td style="width:42%;padding-left:12px;vertical-align:top;">
              <div style="background:${summaryBg};border:2px solid ${summaryBorder};border-radius:14px;padding:22px 16px;text-align:center;">
                <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:${summaryColor};letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Site Result</p>
                <p style="margin:0 0 8px;font-size:30px;line-height:1;">${summaryEmoji}</p>
                <p style="margin:0 0 6px;font-size:36px;font-weight:900;color:${summaryColor};line-height:1;font-family:${FONT};">${issueCount}</p>
                <p style="margin:0;font-size:12px;font-weight:700;color:${summaryColor};font-family:${FONT};line-height:1.3;">${summaryLabel}</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- RESULTS TABLE -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 36px;">
        <p style="margin:0 0 14px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Site Check Results</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;">
          <tr style="background:#f8fafc;">
            <td style="padding:12px 16px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;font-family:${FONT};border-bottom:1px solid #e2e8f0;">Question</td>
            <td style="padding:12px 16px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;text-align:center;font-family:${FONT};border-bottom:1px solid #e2e8f0;">Answer</td>
            <td style="padding:12px 16px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.12em;text-transform:uppercase;text-align:center;font-family:${FONT};border-bottom:1px solid #e2e8f0;">Status</td>
          </tr>
          ${questionRows}
        </table>
      </td>
    </tr>

    <!-- SUMMARY BANNER -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 36px;">
        <div style="background:${hasIssues ? '#fffbeb' : '#f0fdf4'};border:2px solid ${hasIssues ? '#fde68a' : '#bbf7d0'};border-radius:14px;padding:22px 26px;">
          <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:${hasIssues ? '#92400e' : '#065f46'};font-family:${FONT};">
            ${hasIssues
              ? `${issueCount} potential compliance issue${issueCount > 1 ? 's' : ''} spotted on this visit`
              : 'No obvious issues spotted on this visit'}
          </p>
          <p style="margin:0;font-size:13px;color:${hasIssues ? '#78350f' : '#065f46'};line-height:1.65;font-family:${FONT};">
            ${hasIssues
              ? 'This client is likely to benefit from a full waste compliance audit. Review the results above and contact the partner to arrange next steps.'
              : 'A clean result on the 5-point check. It may still be worth offering a full audit to confirm everything is in order and help the client document their compliance.'}
          </p>
        </div>
      </td>
    </tr>

    <!-- NEXT STEPS -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 36px;">
        <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Suggested Next Steps</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${[
            [`Contact ${partnerName}`, `Call or email the partner to discuss the site and plan your next move.`, partnerPhone, partnerEmail],
            ['Arrange a consultation', 'Book a site visit or call with the client to walk through findings.', '', ''],
            ['Prepare a proposal', 'Put together a tailored compliance audit based on the issues identified.', '', ''],
          ].map(([title, desc, phone, email], i) => `
          <tr>
            <td style="padding-bottom:10px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="44" style="vertical-align:top;padding-right:14px;padding-top:2px;">
                    <div style="width:32px;height:32px;background:linear-gradient(135deg,#065f46,#059669);border-radius:50%;text-align:center;line-height:32px;font-size:11px;font-weight:800;color:#ffffff;font-family:${FONT};">${i + 1}</div>
                  </td>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;vertical-align:top;">
                    <p style="margin:0 0 3px;font-size:14px;font-weight:700;color:#0f172a;font-family:${FONT};">${title}</p>
                    <p style="margin:0 0 ${phone || email ? '10px' : '0'};font-size:13px;color:#64748b;line-height:1.5;font-family:${FONT};">${desc}</p>
                    ${phone ? `<a href="tel:${(phone as string).replace(/\s/g,'')}" style="display:inline-block;font-size:13px;font-weight:600;color:#059669;text-decoration:none;font-family:${FONT};margin-right:14px;">📞 ${phone}</a>` : ''}
                    ${email ? `<a href="mailto:${email}" style="display:inline-block;font-size:13px;font-weight:600;color:#059669;text-decoration:none;font-family:${FONT};">✉ ${email}</a>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`).join('')}
        </table>
      </td>
    </tr>

    <!-- CTA BUTTON -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 48px;text-align:center;">
        <a href="${bookingLink}" style="display:inline-block;background:linear-gradient(135deg,#065f46 0%,#059669 100%);color:#ffffff;padding:16px 48px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:700;font-family:${FONT};letter-spacing:0.01em;box-shadow:0 4px 16px rgba(6,95,70,0.28);">
          Book a Consultation →
        </a>
      </td>
    </tr>

    ${emailFooter()}
  `
  return wrapEmail('Partner Site Check', rows)
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
