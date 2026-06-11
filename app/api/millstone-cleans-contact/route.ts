import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.com'

    const businessEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f9fafb;padding:20px;margin:0;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
  <div style="background:linear-gradient(135deg,#064e3b,#065f46,#059669);padding:32px;color:#fff;">
    <p style="color:#a7f3d0;margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">New Enquiry</p>
    <h2 style="margin:0;font-size:22px;font-weight:800;">Millstone Cleans — Contact Form</h2>
    <p style="color:#6ee7b7;margin:8px 0 0;font-size:14px;">Commercial Bin Cleaning Lead</p>
  </div>
  <div style="padding:32px;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;width:100px;vertical-align:top;border-bottom:1px solid #f3f4f6;">Name</td><td style="padding:10px 0;color:#1f2937;font-size:14px;font-weight:600;border-bottom:1px solid #f3f4f6;">${name}</td></tr>
      <tr><td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;border-bottom:1px solid #f3f4f6;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="color:#059669;font-size:14px;">${email}</a></td></tr>
      ${phone ? `<tr><td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;border-bottom:1px solid #f3f4f6;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="tel:${phone}" style="color:#059669;font-size:14px;">${phone}</a></td></tr>` : ''}
      ${company ? `<tr><td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;border-bottom:1px solid #f3f4f6;">Company</td><td style="padding:10px 0;color:#1f2937;font-size:14px;border-bottom:1px solid #f3f4f6;">${company}</td></tr>` : ''}
      ${message ? `<tr><td style="padding:10px 0;color:#6b7280;font-size:13px;vertical-align:top;">Message</td><td style="padding:10px 0;color:#374151;font-size:14px;line-height:1.6;">${message}</td></tr>` : ''}
    </table>
    <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:10px;border:1px solid #a7f3d0;">
      <p style="margin:0;font-size:13px;color:#065f46;font-weight:700;">Action required</p>
      <p style="margin:6px 0 0;font-size:13px;color:#374151;">Follow up within 24 hours — this is a commercial bin cleaning enquiry.</p>
    </div>
  </div>
  <div style="background:#111827;padding:20px;text-align:center;">
    <p style="color:#6b7280;font-size:11px;margin:0;">&copy; 2026 Millstone Cleans &nbsp;&bull;&nbsp; <a href="${siteUrl}" style="color:#059669;text-decoration:none;">millstonecompliance.com</a></p>
  </div>
</div>
</body>
</html>`

    const userEmailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;background:#f9fafb;padding:20px;margin:0;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
  <div style="background:linear-gradient(135deg,#064e3b,#065f46,#059669);padding:48px 32px;text-align:center;">
    <p style="color:#a7f3d0;margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Millstone Cleans</p>
    <h1 style="color:#fff;margin:0;font-size:26px;font-weight:800;">We got your message.</h1>
    <p style="color:#6ee7b7;margin:12px 0 0;font-size:15px;">We'll be in touch within 24 hours.</p>
  </div>
  <div style="padding:40px 32px;">
    <p style="color:#374151;font-size:16px;margin:0 0 8px;">Hi ${name},</p>
    <p style="color:#6b7280;font-size:14px;line-height:1.7;margin:0 0 24px;">Thanks for getting in touch about commercial bin cleaning. Our team will review your enquiry and call you back within one working day.</p>
    <p style="color:#6b7280;font-size:14px;line-height:1.7;margin:0 0 24px;">If you need to speak with us right now, call us directly:</p>
    <div style="text-align:center;margin:24px 0;">
      <a href="tel:01217512262" style="display:inline-block;background:linear-gradient(135deg,#065f46,#059669);color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:18px;letter-spacing:-0.3px;">0121 751 2262</a>
    </div>
  </div>
  <div style="background:#111827;padding:28px 32px;text-align:center;">
    <p style="color:#f9fafb;font-size:14px;font-weight:700;margin:0 0 4px;">Millstone Cleans</p>
    <p style="color:#6b7280;font-size:12px;margin:0 0 12px;">Commercial Bin Cleaning — West Midlands</p>
    <p style="color:#4b5563;font-size:11px;margin:0;">&copy; 2026 Millstone Cleans. &nbsp;&bull;&nbsp; <a href="${siteUrl}/privacy" style="color:#6b7280;text-decoration:underline;">Privacy Policy</a></p>
  </div>
</div>
</body>
</html>`

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.log('📧 Millstone Cleans contact (email not configured):', { name, email, company, phone })
      return NextResponse.json({ success: true, message: 'Enquiry received (email not configured)' })
    }

    const resend = getResendClient()

    await resend.emails.send({
      from: 'Millstone Cleans <onboarding@mail.millstonecompliance.com>',
      to: [businessEmail],
      subject: `🗑️ New Bin Cleaning Enquiry: ${name}${company ? ` — ${company}` : ''}`,
      html: businessEmailHtml,
    })

    await resend.emails.send({
      from: 'Millstone Cleans <onboarding@mail.millstonecompliance.com>',
      to: [email],
      subject: 'We received your enquiry — Millstone Cleans',
      html: userEmailHtml,
    })

    return NextResponse.json({ success: true, message: 'Enquiry sent successfully' })
  } catch (error) {
    console.error('Error in /api/millstone-cleans-contact:', error)
    return NextResponse.json({ error: 'Submission failed', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}
