import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailHeader, emailFooter, wrapEmail } from '@/lib/email-layout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FONT = `'Poppins','Helvetica Neue',Arial,sans-serif`

interface BookingPayload {
  name: string
  email: string
  phone?: string
  company?: string
  date?: string
  time?: string
  notes?: string
  serviceType?: string
}

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'No preference given'
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })
  } catch { return dateStr }
}

function formatTime(timeStr?: string): string {
  if (!timeStr) return 'No preference given'
  try {
    const [h, m] = timeStr.split(':')
    const d = new Date()
    d.setHours(parseInt(h), parseInt(m))
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true })
  } catch { return timeStr }
}

function serviceLabel(serviceType?: string): string {
  return serviceType === 'discovery' ? 'Discovery Call — FREE'
    : serviceType === 'snapshot'  ? 'Compliance Snapshot — £195'
    : serviceType === 'setup'     ? 'Compliance Setup Pack — £495'
    : 'Audit Booking'
}

function serviceShort(serviceType?: string): string {
  return serviceType === 'discovery' ? 'Discovery Call'
    : serviceType === 'snapshot'  ? 'Compliance Snapshot'
    : serviceType === 'setup'     ? 'Compliance Setup Pack'
    : 'Audit Booking'
}

/* ─── Business notification email ─────────────────────────────────────────── */
function buildBusinessEmail(p: BookingPayload): string {
  const rows = `
    ${emailHeader({
      eyebrow: 'New Booking Request',
      title: 'Audit Booking Received',
      subtitle: 'A client has submitted a booking request via the website.',
    })}

    <!-- CLIENT DETAILS -->
    <tr>
      <td style="background:#ffffff;padding:36px 44px 28px;">
        <p style="margin:0 0 18px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Client Details</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:24px 26px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom:16px;vertical-align:top;width:50%;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Name</p>
                <p style="margin:0;font-size:17px;font-weight:700;color:#0f172a;font-family:${FONT};">${p.name}</p>
              </td>
              ${p.company ? `<td style="padding-bottom:16px;vertical-align:top;width:50%;padding-left:16px;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Company</p>
                <p style="margin:0;font-size:15px;font-weight:600;color:#1e293b;font-family:${FONT};">${p.company}</p>
              </td>` : '<td></td>'}
            </tr>
            <tr>
              <td style="padding-bottom:4px;vertical-align:top;width:50%;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Email</p>
                <a href="mailto:${p.email}" style="font-size:14px;font-weight:600;color:#059669;font-family:${FONT};text-decoration:none;">${p.email}</a>
              </td>
              ${p.phone ? `<td style="padding-bottom:4px;vertical-align:top;width:50%;padding-left:16px;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Phone</p>
                <a href="tel:${p.phone.replace(/\s/g,'')}" style="font-size:14px;font-weight:600;color:#059669;font-family:${FONT};text-decoration:none;">${p.phone}</a>
              </td>` : '<td></td>'}
            </tr>
          </table>
        </div>
      </td>
    </tr>

    <!-- BOOKING DETAILS -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 28px;">
        <p style="margin:0 0 18px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Booking Details</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;width:32%;vertical-align:top;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#059669;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Service</p>
              <p style="margin:0;font-size:13px;font-weight:700;color:#065f46;font-family:${FONT};line-height:1.35;">${serviceLabel(p.serviceType)}</p>
            </td>
            <td style="width:8px;"></td>
            <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;width:32%;vertical-align:top;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Preferred Date</p>
              <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;font-family:${FONT};line-height:1.35;">${formatDate(p.date)}</p>
            </td>
            <td style="width:8px;"></td>
            <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;width:32%;vertical-align:top;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;color:#64748b;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Preferred Time</p>
              <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;font-family:${FONT};line-height:1.35;">${formatTime(p.time)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${p.notes ? `<!-- NOTES -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 28px;">
        <p style="margin:0 0 12px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Additional Notes</p>
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:18px 22px;">
          <p style="margin:0;font-size:13px;color:#78350f;line-height:1.65;font-family:${FONT};">${p.notes}</p>
        </div>
      </td>
    </tr>` : ''}

    <!-- REPLY CTA -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 48px;text-align:center;">
        <a href="mailto:${p.email}" style="display:inline-block;background:linear-gradient(135deg,#065f46 0%,#059669 100%);color:#ffffff;padding:16px 48px;border-radius:12px;text-decoration:none;font-size:15px;font-weight:700;font-family:${FONT};letter-spacing:0.01em;box-shadow:0 4px 16px rgba(6,95,70,0.28);">
          Reply to ${p.name} →
        </a>
      </td>
    </tr>

    ${emailFooter()}
  `
  return wrapEmail('New Audit Booking', rows)
}

/* ─── User confirmation email ──────────────────────────────────────────────── */
function buildConfirmationEmail(p: BookingPayload): string {
  const rows = `
    ${emailHeader({
      eyebrow: 'Booking Confirmed',
      title: `We've Got Your Request, ${p.name.split(' ')[0]}`,
      subtitle: 'Thank you for getting in touch. We will confirm your booking within one business day.',
    })}

    <!-- WHAT HAPPENS NEXT -->
    <tr>
      <td style="background:#ffffff;padding:36px 44px 28px;">
        <p style="margin:0 0 20px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">What Happens Next</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          ${[
            ['We review your request', 'We check your preferred date and time and confirm availability — usually within one business day.'],
            ['We send you a confirmation', `A short email to confirm your ${serviceShort(p.serviceType)} and any next steps before we start.`],
            ['We get started', 'On the day of your appointment, we work through your audit and deliver your written report within 48 hours.'],
          ].map(([title, desc], i) => `
          <tr>
            <td style="padding-bottom:12px;vertical-align:top;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="40" style="vertical-align:top;padding-right:16px;padding-top:3px;">
                    <div style="width:32px;height:32px;background:linear-gradient(135deg,#065f46,#059669);border-radius:50%;text-align:center;line-height:32px;font-size:12px;font-weight:800;color:#ffffff;font-family:${FONT};">${i + 1}</div>
                  </td>
                  <td style="vertical-align:top;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px 18px;">
                    <p style="margin:0 0 4px;font-size:14px;font-weight:700;color:#0f172a;font-family:${FONT};">${title}</p>
                    <p style="margin:0;font-size:13px;color:#64748b;line-height:1.55;font-family:${FONT};">${desc}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`).join('')}
        </table>
      </td>
    </tr>

    <!-- BOOKING SUMMARY -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 28px;">
        <p style="margin:0 0 16px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.16em;text-transform:uppercase;font-family:${FONT};">Your Booking Summary</p>
        <div style="background:#f0fdf4;border:2px solid #bbf7d0;border-radius:14px;padding:24px 26px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-bottom:14px;vertical-align:top;width:50%;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#059669;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Service</p>
                <p style="margin:0;font-size:14px;font-weight:700;color:#065f46;font-family:${FONT};">${serviceLabel(p.serviceType)}</p>
              </td>
              ${p.company ? `<td style="padding-bottom:14px;vertical-align:top;width:50%;padding-left:16px;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#059669;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Organisation</p>
                <p style="margin:0;font-size:14px;font-weight:600;color:#065f46;font-family:${FONT};">${p.company}</p>
              </td>` : '<td></td>'}
            </tr>
            <tr>
              <td style="vertical-align:top;width:50%;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#059669;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Preferred Date</p>
                <p style="margin:0;font-size:14px;font-weight:600;color:#065f46;font-family:${FONT};">${formatDate(p.date)}</p>
              </td>
              <td style="vertical-align:top;width:50%;padding-left:16px;">
                <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#059669;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Preferred Time</p>
                <p style="margin:0;font-size:14px;font-weight:600;color:#065f46;font-family:${FONT};">${formatTime(p.time)}</p>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>

    <!-- QUESTIONS? -->
    <tr>
      <td style="background:#ffffff;padding:0 44px 48px;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:22px 24px;text-align:center;">
          <p style="margin:0 0 6px;font-size:15px;font-weight:700;color:#0f172a;font-family:${FONT};">Got a question in the meantime?</p>
          <p style="margin:0 0 16px;font-size:13px;color:#64748b;font-family:${FONT};">Reach us directly and we'll get back to you quickly.</p>
          <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
              <td style="padding-right:10px;">
                <a href="tel:01217512262" style="display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;color:#0f172a;padding:10px 20px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:600;font-family:${FONT};">📞 0121 751 2262</a>
              </td>
              <td>
                <a href="mailto:hello@millstonecompliance.co.uk" style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;color:#065f46;padding:10px 20px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:600;font-family:${FONT};">✉ Email us</a>
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>

    ${emailFooter()}
  `
  return wrapEmail('Booking Confirmation', rows)
}

/* ─── Route handler ────────────────────────────────────────────────────────── */
export async function POST(request: Request) {
  try {
    const body: BookingPayload = await request.json()
    const { name, email } = body

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('Audit booking received (email not configured):', { name, email })
      return NextResponse.json({ success: true, message: 'Booking received (email not configured)' })
    }

    const resend = getResendClient()
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'
    const subject = `${serviceShort(body.serviceType)} Request — ${name}`

    const [bizResult, userResult] = await Promise.all([
      // Notification to business
      resend.emails.send({
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [businessEmail],
        replyTo: email,
        subject,
        html: buildBusinessEmail(body),
      }),
      // Confirmation to user
      resend.emails.send({
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [email],
        replyTo: businessEmail,
        subject: `Your booking request is confirmed — ${serviceShort(body.serviceType)}`,
        html: buildConfirmationEmail(body),
      }),
    ])

    if (bizResult.error || userResult.error) {
      const err = bizResult.error || userResult.error
      console.error('Resend error:', err)
      return NextResponse.json({ error: 'Failed to send email', details: err }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking submission error:', error)
    return NextResponse.json(
      { error: 'Submission failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}
