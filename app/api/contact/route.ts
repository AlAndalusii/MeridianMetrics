import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailHeader, emailFooter, wrapEmail, infoCell } from '@/lib/email-layout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FONT = `'Poppins','Helvetica Neue',Arial,sans-serif`
const FROM = 'Millstone Compliance <onboarding@mail.millstonecompliance.com>'

type Mode = 'call' | 'email'

const CALL_TIME_LABEL: Record<string, string> = {
  morning:   'Morning',
  afternoon: 'Afternoon',
  evening:   'Early evening',
  any:       'Any time',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface ContactRequest {
  mode: Mode
  name: string
  phone: string
  email: string
  callTime: string
  message: string
}

function buildBusinessEmail(r: ContactRequest): string {
  const rows = `
    ${emailHeader({
      eyebrow: 'Meet Zak page',
      title: r.mode === 'call' ? 'Call Me Back' : 'New Message',
      subtitle: r.mode === 'call'
        ? 'Someone has asked you to call them.'
        : 'Someone has sent you a message.',
    })}
    <tr>
      <td style="background:#ffffff;padding:36px 44px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            ${infoCell('Name', escapeHtml(r.name))}
            ${r.mode === 'call'
              ? infoCell('Best time', CALL_TIME_LABEL[r.callTime] || 'Any time')
              : infoCell('Reply by', 'Email')}
          </tr>
          <tr>
            ${r.phone ? infoCell('Phone', escapeHtml(r.phone), `tel:${r.phone.replace(/[^\d+]/g, '')}`) : infoCell('Phone', 'Not given')}
            ${r.email ? infoCell('Email', escapeHtml(r.email), `mailto:${encodeURIComponent(r.email)}`) : infoCell('Email', 'Not given')}
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:0 44px 36px;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Message</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;font-family:${FONT};white-space:pre-wrap;">${escapeHtml(r.message || 'None')}</p>
      </td>
    </tr>
    ${emailFooter()}`
  return wrapEmail(r.mode === 'call' ? 'Call Me Back' : 'New Message', rows)
}

function buildConfirmationEmail(r: ContactRequest): string {
  const firstName = escapeHtml(r.name.split(' ')[0] || r.name)
  const rows = `
    ${emailHeader({
      eyebrow: 'Got it',
      title: 'Thanks for getting in touch',
      subtitle: 'Millstone Compliance',
    })}
    <tr>
      <td style="background:#ffffff;padding:36px 44px;">
        <p style="margin:0 0 14px;font-size:16px;font-weight:600;color:#0f172a;font-family:${FONT};">Hi ${firstName},</p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">Thanks for your message. I&apos;ll reply personally, in plain English.</p>
        <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">If it&apos;s urgent, call me on 07762 270 113.</p>
      </td>
    </tr>
    ${emailFooter()}`
  return wrapEmail('Thanks for getting in touch', rows)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const req: ContactRequest = {
      mode:     body.mode === 'email' ? 'email' : 'call',
      name:     String(body.name || '').trim().slice(0, 200),
      phone:    String(body.phone || '').trim().slice(0, 50),
      email:    String(body.email || '').trim().slice(0, 200),
      callTime: CALL_TIME_LABEL[body.callTime] ? body.callTime : 'any',
      message:  String(body.message || '').trim().slice(0, 4000),
    }

    if (!req.name) {
      return NextResponse.json({ error: 'Please tell me your name.' }, { status: 400 })
    }
    if (req.mode === 'call' && req.phone.replace(/\D/g, '').length < 7) {
      return NextResponse.json({ error: 'Please add a phone number so I can call you.' }, { status: 400 })
    }
    if (req.mode === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
      return NextResponse.json({ error: 'Please add a valid email address.' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('Contact request received (email not configured):', { ...req, message: undefined })
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'

    const sends = [
      resend.emails.send({
        from: FROM,
        to: [businessEmail],
        replyTo: req.email || undefined,
        subject: `${req.mode === 'call' ? 'Call me back' : 'New message'} — ${req.name}`,
        html: buildBusinessEmail(req),
      }),
    ]
    if (req.mode === 'email') {
      sends.push(
        resend.emails.send({
          from: FROM,
          to: [req.email],
          replyTo: businessEmail,
          subject: 'Thanks for getting in touch',
          html: buildConfirmationEmail(req),
        })
      )
    }

    const results = await Promise.all(sends)
    const failed = results.find((r) => r.error)
    if (failed) {
      console.error('Resend error:', failed.error)
      return NextResponse.json({ error: 'That didn’t send just now. Please try again, or email hello@millstonecompliance.com.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again, or email hello@millstonecompliance.com.' }, { status: 500 })
  }
}
