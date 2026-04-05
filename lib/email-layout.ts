/**
 * Shared email layout helpers for Millstone Compliance.
 *
 * Email clients (Gmail, Outlook, Apple Mail) block SVG images, so the logo
 * is built from pure HTML tables — a green gradient rounded square with a
 * styled "M" lettermark and the company name beside it. This renders
 * perfectly in every major email client.
 */

const FONT = `'Poppins','Helvetica Neue',Arial,sans-serif`
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.co.uk'

/** Pure-HTML logo block — renders in all email clients, no image dependency */
export function logoBlock(variant: 'light' | 'dark' = 'light'): string {
  const textColor   = variant === 'dark' ? '#ecfdf5' : '#0f172a'
  const subColor    = variant === 'dark' ? '#6ee7b7' : '#059669'

  return `
    <table cellpadding="0" cellspacing="0" border="0">
      <tr>
        <!-- M icon -->
        <td width="52" height="52" style="background:linear-gradient(135deg,#052e16 0%,#065f46 55%,#059669 100%);border-radius:14px;text-align:center;vertical-align:middle;padding:0;" align="center" valign="middle">
          <table cellpadding="0" cellspacing="0" border="0" width="52" height="52">
            <tr>
              <td align="center" valign="middle" height="52" style="padding:0;">
                <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="width:52px;height:52px;" arcsize="27%" stroke="f" fillcolor="#065f46"><w:anchorlock/><center style="color:#ffffff;font-family:Poppins,Arial,sans-serif;font-size:24px;font-weight:900;">M</center></v:roundrect><![endif]-->
                <!--[if !mso]><!-->
                <span style="display:block;font-size:26px;font-weight:900;color:#ffffff;font-family:${FONT};line-height:1;padding:13px 0 0 0;">M</span>
                <!--<![endif]-->
              </td>
            </tr>
          </table>
        </td>
        <!-- Name + tagline -->
        <td style="padding-left:14px;vertical-align:middle;" valign="middle">
          <p style="margin:0 0 3px;font-size:19px;font-weight:800;color:${textColor};font-family:${FONT};letter-spacing:-0.3px;line-height:1.1;">Millstone Compliance</p>
          <p style="margin:0;font-size:9px;font-weight:700;color:${subColor};font-family:${FONT};letter-spacing:0.18em;text-transform:uppercase;">Waste &amp; Recycling Compliance Specialists</p>
        </td>
      </tr>
    </table>`
}

/** Dark header banner — used at the top of every email */
export function emailHeader(opts: {
  eyebrow: string
  title: string
  subtitle: string
}): string {
  return `
    <tr>
      <td style="background:linear-gradient(145deg,#052e16 0%,#064e3b 35%,#065f46 65%,#059669 100%);border-radius:20px 20px 0 0;padding:48px 44px 44px;">

        <!-- Logo -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td align="center" style="padding-bottom:32px;">${logoBlock('light')}</td></tr>
        </table>

        <!-- Divider -->
        <div style="width:52px;height:2px;background:rgba(110,231,183,0.4);margin:0 auto 32px;border-radius:2px;"></div>

        <!-- Titles -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#6ee7b7;letter-spacing:0.22em;text-transform:uppercase;font-family:${FONT};">${opts.eyebrow}</p>
              <h1 style="margin:0 0 12px;font-size:32px;font-weight:800;color:#ffffff;line-height:1.12;font-family:${FONT};letter-spacing:-0.6px;">${opts.title}</h1>
              <p style="margin:0;font-size:14px;color:#a7f3d0;font-family:${FONT};line-height:1.55;max-width:380px;">${opts.subtitle}</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>`
}

/** Dark footer — consistent across all emails */
export function emailFooter(): string {
  return `
    <tr>
      <td style="background:#0f172a;border-radius:0 0 20px 20px;padding:38px 44px 34px;">

        <!-- Logo -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td align="center" style="padding-bottom:24px;">${logoBlock('light')}</td></tr>
        </table>

        <!-- Divider -->
        <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(110,231,183,0.25),transparent);margin-bottom:24px;"></div>

        <!-- Links -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding-bottom:16px;">
              <p style="margin:0;font-size:13px;color:#475569;font-family:${FONT};line-height:2.2;">
                <a href="tel:01217512262" style="color:#6ee7b7;text-decoration:none;font-weight:600;">0121 751 2262</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="mailto:hello@millstonecompliance.co.uk" style="color:#6ee7b7;text-decoration:none;font-weight:600;">hello@millstonecompliance.co.uk</a>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <a href="${SITE_URL}" style="color:#6ee7b7;text-decoration:none;font-weight:600;">millstonecompliance.co.uk</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Legal -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center">
              <p style="margin:0;font-size:11px;color:#334155;font-family:${FONT};line-height:1.7;">
                © ${new Date().getFullYear()} Millstone Compliance Ltd · United Kingdom
                &nbsp;·&nbsp;
                <a href="${SITE_URL}/privacy" style="color:#475569;text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>`
}

/** Wraps inner row HTML in the outer email shell */
export function wrapEmail(title: string, innerRows: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title} — Millstone Compliance</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing:border-box; }
    body { margin:0;padding:0;background:#f1f5f9;font-family:'Poppins','Helvetica Neue',Arial,sans-serif; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Poppins','Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
    ${innerRows}
  </table>
  </td></tr>
</table>
</body>
</html>`
}

/** A single info row inside a card section */
export function infoCell(label: string, value: string, link?: string): string {
  const val = link
    ? `<a href="${link}" style="font-size:14px;font-weight:600;color:#059669;font-family:${FONT};text-decoration:none;">${value}</a>`
    : `<p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;font-family:${FONT};">${value}</p>`
  return `
    <td style="padding:0 12px 16px 0;vertical-align:top;">
      <p style="margin:0 0 3px;font-size:10px;font-weight:700;color:#94a3b8;letter-spacing:0.14em;text-transform:uppercase;font-family:${FONT};">${label}</p>
      ${val}
    </td>`
}
