import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailHeader, emailFooter, wrapEmail, infoCell } from '@/lib/email-layout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FONT = `'Poppins','Helvetica Neue',Arial,sans-serif`
const FROM = 'Millstone Compliance <onboarding@mail.millstonecompliance.com>'

const ROLE_LABEL: Record<string, string> = {
  carrier: 'Carrier',
  broker:  'Broker',
  dealer:  'Dealer',
  skip:    'Skip firm without a yard',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface JoinRequest {
  name: string
  business: string
  email: string
  phone: string
  roles: string[]
  registration: string
  notes: string
}

function buildBusinessEmail(r: JoinRequest): string {
  const roles = r.roles.map((x) => ROLE_LABEL[x]).filter(Boolean).join(', ') || 'Not given'
  const rows = `
    ${emailHeader({
      eyebrow: 'Ready for 2027',
      title: 'New Sign-Up',
      subtitle: 'A carrier, broker or dealer has joined the Ready for 2027 list.',
    })}
    <tr>
      <td style="background:#ffffff;padding:36px 44px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            ${infoCell('Name', escapeHtml(r.name))}
            ${infoCell('Business', escapeHtml(r.business || 'Not given'))}
          </tr>
          <tr>
            ${infoCell('Email', escapeHtml(r.email), `mailto:${encodeURIComponent(r.email)}`)}
            ${r.phone ? infoCell('Phone', escapeHtml(r.phone), `tel:${r.phone.replace(/[^\d+]/g, '')}`) : infoCell('Phone', 'Not given')}
          </tr>
          <tr>
            ${infoCell('What they do', escapeHtml(roles))}
            ${infoCell('Registration number', escapeHtml(r.registration || 'Not given'))}
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:0 44px 36px;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Notes</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;font-family:${FONT};white-space:pre-wrap;">${escapeHtml(r.notes || 'None')}</p>
      </td>
    </tr>
    ${emailFooter()}`
  return wrapEmail('New Ready for 2027 Sign-Up', rows)
}

function buildConfirmationEmail(r: JoinRequest): string {
  const firstName = escapeHtml(r.name.split(' ')[0] || r.name)
  const rows = `
    ${emailHeader({
      eyebrow: 'Ready for 2027',
      title: 'You&apos;re on the list',
      subtitle: 'Digital waste tracking for carriers, brokers and dealers',
    })}
    <tr>
      <td style="background:#ffffff;padding:36px 44px;">
        <p style="margin:0 0 14px;font-size:16px;font-weight:600;color:#0f172a;font-family:${FONT};">Hi ${firstName},</p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">Thanks for joining. Digital waste tracking becomes a must for waste collectors from October 2027. I&apos;ll send you short, plain-English updates as Defra shares more, and I&apos;ll tell you when the public beta opens.</p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">One thing worth doing today: check your registration is in date on the public register. Your number starts with CB.</p>
        <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">Any questions, just reply to this email.</p>
      </td>
    </tr>
    ${emailFooter()}`
  return wrapEmail('You’re on the Ready for 2027 list', rows)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const req: JoinRequest = {
      name:         String(body.name || '').trim().slice(0, 200),
      business:     String(body.business || '').trim().slice(0, 200),
      email:        String(body.email || '').trim().slice(0, 200),
      phone:        String(body.phone || '').trim().slice(0, 50),
      roles:        Array.isArray(body.roles) ? body.roles.map(String).filter((x: string) => ROLE_LABEL[x]) : [],
      registration: String(body.registration || '').trim().slice(0, 50),
      notes:        String(body.notes || '').trim().slice(0, 2000),
    }

    if (!req.name) {
      return NextResponse.json({ error: 'Please tell me your name.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
      return NextResponse.json({ error: 'Please add a valid email address.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('Ready for 2027 sign-up received (email not configured):', { ...req, notes: undefined })
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'

    const results = await Promise.all([
      resend.emails.send({
        from: FROM,
        to: [businessEmail],
        replyTo: req.email,
        subject: `Ready for 2027 — ${req.name}${req.business ? ` (${req.business})` : ''}`,
        html: buildBusinessEmail(req),
      }),
      resend.emails.send({
        from: FROM,
        to: [req.email],
        replyTo: businessEmail,
        subject: 'You’re on the Ready for 2027 list',
        html: buildConfirmationEmail(req),
      }),
    ])
    const failed = results.find((r) => r.error)
    if (failed) {
      console.error('Resend error:', failed.error)
      return NextResponse.json({ error: 'That didn’t send just now. Please try again, or email hello@millstonecompliance.com.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Join 2027 error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again, or email hello@millstonecompliance.com.' }, { status: 500 })
  }
}
