import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { emailHeader, emailFooter, wrapEmail, infoCell } from '@/lib/email-layout'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FONT = `'Poppins','Helvetica Neue',Arial,sans-serif`
const FROM = 'Millstone Compliance <onboarding@mail.millstonecompliance.com>'

// Serverless request bodies are capped at ~4.5MB, so keep uploads under that.
const MAX_TOTAL_BYTES = 4 * 1024 * 1024
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic', 'image/heif', 'image/webp']

type RequestKind = 'quarterly' | 'thorough' | 'callback'

const KIND_LABEL: Record<RequestKind, string> = {
  quarterly: 'Quick bill check (one quarter)',
  thorough:  'Thorough audit (12 months)',
  callback:  'Call me back',
}

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

interface BillRequest {
  kind: RequestKind
  name: string
  email: string
  phone: string
  business: string
  callTime: string
  notes: string
  fileNames: string[]
}

function buildBusinessEmail(r: BillRequest): string {
  const files = r.fileNames.length
    ? r.fileNames.map((f) => `<li style="margin:0 0 4px;">${escapeHtml(f)}</li>`).join('')
    : '<li>No files attached</li>'

  const rows = `
    ${emailHeader({
      eyebrow: 'New Bill Request',
      title: KIND_LABEL[r.kind],
      subtitle: 'Someone has sent their waste bill, or asked for a call, through the website.',
    })}
    <tr>
      <td style="background:#ffffff;padding:36px 44px 12px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            ${infoCell('Name', escapeHtml(r.name))}
            ${infoCell('Business', escapeHtml(r.business || 'Not given'))}
          </tr>
          <tr>
            ${r.email ? infoCell('Email', escapeHtml(r.email), `mailto:${encodeURIComponent(r.email)}`) : infoCell('Email', 'Not given')}
            ${r.phone ? infoCell('Phone', escapeHtml(r.phone), `tel:${r.phone.replace(/[^\d+]/g, '')}`) : infoCell('Phone', 'Not given')}
          </tr>
          ${r.kind === 'callback' ? `<tr>${infoCell('Best time to call', CALL_TIME_LABEL[r.callTime] || 'Any time')}</tr>` : ''}
        </table>
      </td>
    </tr>
    <tr>
      <td style="background:#ffffff;padding:0 44px 36px;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Files</p>
        <ul style="margin:0 0 20px;padding-left:18px;font-size:14px;color:#0f172a;font-family:${FONT};">${files}</ul>
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">Notes</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;font-family:${FONT};white-space:pre-wrap;">${escapeHtml(r.notes || 'None')}</p>
      </td>
    </tr>
    ${emailFooter()}`
  return wrapEmail('New Bill Request', rows)
}

function buildConfirmationEmail(r: BillRequest): string {
  const firstName = escapeHtml(r.name.split(' ')[0] || r.name)
  const body = r.kind === 'callback'
    ? `Thanks for asking us to call. We&apos;ll ring you on <strong>${escapeHtml(r.phone)}</strong> to go through your waste bill together. It only takes about 15 minutes.`
    : `Thanks for sending your bill. We&apos;ll check it line by line and send you a written report within 48 hours, in plain English.`

  const rows = `
    ${emailHeader({
      eyebrow: 'Got it',
      title: r.kind === 'callback' ? 'We&apos;ll call you soon' : 'Your bill is with us',
      subtitle: KIND_LABEL[r.kind],
    })}
    <tr>
      <td style="background:#ffffff;padding:36px 44px;">
        <p style="margin:0 0 14px;font-size:16px;font-weight:600;color:#0f172a;font-family:${FONT};">Hi ${firstName},</p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">${body}</p>
        <p style="margin:0;font-size:15px;line-height:1.7;color:#334155;font-family:${FONT};">If you think of anything else, just reply to this email.</p>
      </td>
    </tr>
    ${emailFooter()}`
  return wrapEmail('We got your request', rows)
}

export async function POST(request: Request) {
  try {
    const form = await request.formData()
    const kind = String(form.get('kind') || 'quarterly') as RequestKind
    const req: BillRequest = {
      kind: KIND_LABEL[kind] ? kind : 'quarterly',
      name:     String(form.get('name') || '').trim(),
      email:    String(form.get('email') || '').trim(),
      phone:    String(form.get('phone') || '').trim(),
      business: String(form.get('business') || '').trim(),
      callTime: String(form.get('callTime') || 'any'),
      notes:    String(form.get('notes') || '').trim().slice(0, 4000),
      fileNames: [],
    }

    if (!req.name) {
      return NextResponse.json({ error: 'Please tell us your name.' }, { status: 400 })
    }
    if (req.kind === 'callback') {
      if (!req.phone) return NextResponse.json({ error: 'Please add a phone number so we can call you.' }, { status: 400 })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
      return NextResponse.json({ error: 'Please add a valid email address.' }, { status: 400 })
    }

    const files = form.getAll('files').filter((f): f is File => f instanceof File && f.size > 0)
    const totalBytes = files.reduce((sum, f) => sum + f.size, 0)
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json({ error: 'Those files are too big together. Please keep them under 4MB, or email them to us instead.' }, { status: 413 })
    }
    const badFile = files.find((f) => f.type && !ALLOWED_TYPES.includes(f.type))
    if (badFile) {
      return NextResponse.json({ error: `We can't read "${badFile.name}". Please send a PDF or a photo.` }, { status: 400 })
    }

    const attachments = await Promise.all(
      files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()) }))
    )
    req.fileNames = files.map((f) => f.name)

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('Bill request received (email not configured):', { ...req, notes: undefined })
      return NextResponse.json({ success: true })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'

    const sends = [
      resend.emails.send({
        from: FROM,
        to: [businessEmail],
        replyTo: req.email || undefined,
        subject: `${KIND_LABEL[req.kind]} — ${req.name}${req.business ? ` (${req.business})` : ''}`,
        html: buildBusinessEmail(req),
        attachments,
      }),
    ]
    if (req.email) {
      sends.push(
        resend.emails.send({
          from: FROM,
          to: [req.email],
          replyTo: businessEmail,
          subject: req.kind === 'callback' ? 'We’ll call you soon' : 'We’ve got your waste bill',
          html: buildConfirmationEmail(req),
        })
      )
    }

    const results = await Promise.all(sends)
    const failed = results.find((r) => r.error)
    if (failed) {
      console.error('Resend error:', failed.error)
      return NextResponse.json({ error: 'We couldn’t send that just now. Please try again, or WhatsApp us.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send bill error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again, or WhatsApp us.' }, { status: 500 })
  }
}
