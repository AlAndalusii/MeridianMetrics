import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface Finding {
  status: 'compliant' | 'gap' | 'warning';
  title: string;
  detail: string;
}

interface EmailPayload {
  userInfo: { name: string; email: string; company: string; phone?: string };
  score: number;
  riskLevel: { level: string; color: string; description: string };
  findings: Finding[];
  answers: Record<number, string>;
}

function getScoreColor(color: string) {
  if (color === 'green') return '#059669';
  if (color === 'amber') return '#d97706';
  return '#dc2626';
}

function getScoreBg(color: string) {
  if (color === 'green') return '#ecfdf5';
  if (color === 'amber') return '#fffbeb';
  return '#fef2f2';
}

function getScoreBorder(color: string) {
  if (color === 'green') return '#6ee7b7';
  if (color === 'amber') return '#fcd34d';
  return '#fca5a5';
}

function getUrgencyBanner(color: string, level: string) {
  if (color === 'red') {
    return `
    <tr>
      <td style="padding:0 0 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="background:#fef2f2;border:1.5px solid #fca5a5;border-radius:12px;padding:18px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td width="32" valign="top" style="padding-right:14px;padding-top:2px;">
                    <div style="width:32px;height:32px;background:#dc2626;border-radius:50%;text-align:center;line-height:32px;font-size:16px;">⚠️</div>
                  </td>
                  <td>
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#991b1b;">Urgent: Compliance Action Required</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#b91c1c;line-height:1.5;">The Simpler Recycling deadline passed on 31 March 2025. With 10+ employees, you are currently non-compliant and at risk of Environment Agency enforcement.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }
  if (color === 'amber') {
    return `
    <tr>
      <td style="padding:0 0 28px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="background:#fffbeb;border:1.5px solid #fcd34d;border-radius:12px;padding:18px 22px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td width="32" valign="top" style="padding-right:14px;padding-top:2px;">
                    <div style="width:32px;height:32px;background:#d97706;border-radius:50%;text-align:center;line-height:32px;font-size:16px;">⚡</div>
                  </td>
                  <td>
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#92400e;">Gaps Identified — Action Needed</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#b45309;line-height:1.5;">You have compliance gaps that need addressing. A short consultation will help you close these before an Environment Agency inspection.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }
  return '';
}

function renderFindings(findings: Finding[]) {
  return findings.map(f => {
    const isCompliant = f.status === 'compliant';
    const isGap = f.status === 'gap';
    const bg = isCompliant ? '#f0fdf4' : isGap ? '#fef2f2' : '#fffbeb';
    const border = isCompliant ? '#86efac' : isGap ? '#fca5a5' : '#fcd34d';
    const titleColor = isCompliant ? '#166534' : isGap ? '#991b1b' : '#92400e';
    const detailColor = isCompliant ? '#15803d' : isGap ? '#b91c1c' : '#b45309';
    const icon = isCompliant ? '✓' : isGap ? '✗' : '!';
    const iconBg = isCompliant ? '#16a34a' : isGap ? '#dc2626' : '#d97706';

    return `
    <tr>
      <td style="padding:0 0 10px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="background:${bg};border:1px solid ${border};border-radius:10px;padding:14px 18px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td width="28" valign="top" style="padding-right:12px;padding-top:1px;">
                    <div style="width:24px;height:24px;background:${iconBg};border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;font-family:Arial,sans-serif;">${icon}</div>
                  </td>
                  <td>
                    <p style="margin:0 0 2px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:${titleColor};">${f.title}</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:${detailColor};line-height:1.5;">${f.detail}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>`;
  }).join('');
}

function buildEmailHtml(payload: EmailPayload, date: string): string {
  const { userInfo, score, riskLevel, findings } = payload;
  const scoreColor = getScoreColor(riskLevel.color);
  const scoreBg = getScoreBg(riskLevel.color);
  const scoreBorder = getScoreBorder(riskLevel.color);
  const bookingLink = process.env.NEXT_PUBLIC_BOOKING_LINK || 'https://calendly.com/millstonecompliance';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://millstonecompliance.com';

  const scorePercent = score;
  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - scorePercent / 100);

  const urgencyBanner = getUrgencyBanner(riskLevel.color, riskLevel.level);
  const findingsHtml = renderFindings(findings);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>Simpler Recycling Assessment — ${userInfo.name}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f0;font-family:Arial,Helvetica,sans-serif;">

<!-- Preheader -->
<div style="display:none;max-height:0;overflow:hidden;color:#f1f5f0;font-size:1px;">
  Your Simpler Recycling compliance score: ${score}/100 · ${riskLevel.level} · Millstone Compliance
</div>

<!-- Outer wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f1f5f0;padding:32px 0;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

        <!-- ═══════════════════════════════════════ HEADER ═══════════════════════════════════════ -->
        <tr>
          <td style="background:linear-gradient(135deg,#064e3b 0%,#065f46 40%,#047857 100%);border-radius:20px 20px 0 0;padding:36px 40px 32px;text-align:center;">

            <!-- Logo row -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:8px 18px;">
                        <span style="font-family:Arial,sans-serif;font-size:18px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">M</span>
                        <span style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;margin-left:8px;letter-spacing:0.2px;">Millstone Compliance</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Badge -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding-bottom:12px;">
                  <div style="display:inline-block;background:rgba(255,255,255,0.15);border:1px solid rgba(167,243,208,0.4);border-radius:20px;padding:5px 16px;">
                    <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#a7f3d0;text-transform:uppercase;letter-spacing:1.5px;">Simpler Recycling Assessment</span>
                  </div>
                </td>
              </tr>
            </table>

            <h1 style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:26px;font-weight:900;color:#ffffff;line-height:1.2;">Your Compliance Report</h1>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#a7f3d0;line-height:1.5;">${userInfo.company} &nbsp;·&nbsp; ${date}</p>

          </td>
        </tr>

        <!-- ═══════════════════════════════════════ SCORE SECTION ═══════════════════════════════════════ -->
        <tr>
          <td style="background:#ffffff;padding:36px 40px 32px;">

            <!-- Score header -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding-bottom:28px;">

                  <!-- Score circle (SVG) -->
                  <div style="display:inline-block;position:relative;width:140px;height:140px;">
                    <svg width="140" height="140" viewBox="0 0 140 140" style="transform:rotate(-90deg);">
                      <circle cx="70" cy="70" r="54" fill="none" stroke="#e5e7eb" stroke-width="10"/>
                      <circle cx="70" cy="70" r="54" fill="none" stroke="${scoreColor}" stroke-width="10"
                        stroke-dasharray="${circumference.toFixed(2)}"
                        stroke-dashoffset="${dashOffset.toFixed(2)}"
                        stroke-linecap="round"/>
                    </svg>
                    <div style="position:absolute;top:0;left:0;width:140px;height:140px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
                      <span style="font-family:Arial,sans-serif;font-size:38px;font-weight:900;color:${scoreColor};line-height:1;">${score}</span>
                      <span style="font-family:Arial,sans-serif;font-size:13px;font-weight:600;color:#9ca3af;margin-top:2px;">/100</span>
                    </div>
                  </div>

                  <!-- Risk badge -->
                  <div style="margin-top:16px;">
                    <div style="display:inline-block;background:${scoreColor};border-radius:20px;padding:8px 24px;">
                      <span style="font-family:Arial,sans-serif;font-size:15px;font-weight:700;color:#ffffff;">${riskLevel.level}</span>
                    </div>
                  </div>
                  <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:14px;color:#6b7280;text-align:center;">${riskLevel.description}</p>
                </td>
              </tr>
            </table>

            <!-- Score breakdown bar -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:32px;">
              <tr>
                <td style="background:${scoreBg};border:1.5px solid ${scoreBorder};border-radius:12px;padding:16px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td width="33%" style="text-align:center;padding:0 6px;">
                        <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">0–49</div>
                        <div style="background:${score < 50 ? '#dc2626' : '#e5e7eb'};height:4px;border-radius:2px;"></div>
                        <div style="font-family:Arial,sans-serif;font-size:10px;color:#9ca3af;margin-top:4px;">Non-Compliant</div>
                      </td>
                      <td width="33%" style="text-align:center;padding:0 6px;">
                        <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#d97706;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">50–79</div>
                        <div style="background:${score >= 50 && score < 80 ? '#d97706' : '#e5e7eb'};height:4px;border-radius:2px;"></div>
                        <div style="font-family:Arial,sans-serif;font-size:10px;color:#9ca3af;margin-top:4px;">Gaps Identified</div>
                      </td>
                      <td width="33%" style="text-align:center;padding:0 6px;">
                        <div style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;margin-bottom:4px;">80–100</div>
                        <div style="background:${score >= 80 ? '#059669' : '#e5e7eb'};height:4px;border-radius:2px;"></div>
                        <div style="font-family:Arial,sans-serif;font-size:10px;color:#9ca3af;margin-top:4px;">Compliant</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- ── Urgency Banner (if needed) ── -->
            ${urgencyBanner ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">${urgencyBanner}</table>` : ''}

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:28px;">
              <tr><td style="height:1px;background:linear-gradient(to right,transparent,#e5e7eb,transparent);"></td></tr>
            </table>

            <!-- ── KEY FINDINGS ── -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding-bottom:18px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:#f0fdf4;border-radius:8px;padding:6px 14px;">
                        <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:1.2px;">📋 Key Findings</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ${findingsHtml}
            </table>

          </td>
        </tr>

        <!-- ═══════════════════════════════════════ NEXT STEPS ═══════════════════════════════════════ -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:32px 40px;">

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="padding-bottom:18px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:#f0fdf4;border-radius:8px;padding:6px 14px;">
                        <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:1.2px;">🎯 Recommended Next Steps</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Steps -->
            ${[
              { n: '1', title: 'Book a Free 15-Minute Call', detail: 'Discuss your results with a compliance specialist at no cost. No obligation.' },
              { n: '2', title: 'Get Your Compliance Audit (£295)', detail: '90-minute on-site assessment. Written report in 24 hours. Penalty risk calculation.' },
              { n: '3', title: 'Implement the Action Plan', detail: 'Follow the priority fixes from your audit. Our team supports you throughout.' },
            ].map(s => `
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:12px;">
              <tr>
                <td style="background:#ffffff;border:1px solid #e5e7eb;border-radius:10px;padding:14px 18px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td width="36" valign="top" style="padding-right:14px;">
                        <div style="width:30px;height:30px;background:linear-gradient(135deg,#059669,#047857);border-radius:50%;text-align:center;line-height:30px;font-family:Arial,sans-serif;font-size:13px;font-weight:900;color:#ffffff;">${s.n}</div>
                      </td>
                      <td>
                        <p style="margin:0 0 3px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#065f46;">${s.title}</p>
                        <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.5;">${s.detail}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>`).join('')}

          </td>
        </tr>

        <!-- ═══════════════════════════════════════ PRICING ═══════════════════════════════════════ -->
        <tr>
          <td style="background:#ffffff;border-top:1px solid #f3f4f6;padding:32px 40px;">

            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:20px;">
              <tr>
                <td>
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:#f0fdf4;border-radius:8px;padding:6px 14px;">
                        <span style="font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:1.2px;">💼 Service Options</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Pricing cards row -->
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <!-- Free Call -->
                <td width="32%" valign="top" style="padding-right:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;border-radius:12px;padding:16px;text-align:center;">
                        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:20px;font-weight:900;color:#059669;">Free</p>
                        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:0.8px;">Discovery</p>
                        <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#065f46;">15-Min Call</p>
                        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#166534;line-height:1.5;">Discuss results<br>No obligation</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- £295 Audit -->
                <td width="32%" valign="top" style="padding:0 4px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:#ffffff;border:1.5px solid #d1fae5;border-radius:12px;padding:16px;text-align:center;">
                        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:20px;font-weight:900;color:#065f46;">£295</p>
                        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">One-time</p>
                        <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#065f46;">Compliance Audit</p>
                        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#374151;line-height:1.5;">90-min on-site<br>Report in 24h</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <!-- £495 Setup -->
                <td width="32%" valign="top" style="padding-left:8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="background:#ffffff;border:1.5px solid #d1fae5;border-radius:12px;padding:16px;text-align:center;">
                        <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:20px;font-weight:900;color:#065f46;">£495</p>
                        <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.8px;">One-time</p>
                        <p style="margin:0 0 10px;font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#065f46;">Audit + Support</p>
                        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#374151;line-height:1.5;">Audit + 30 days<br>support included</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ═══════════════════════════════════════ PRIMARY CTA ═══════════════════════════════════════ -->
        <tr>
          <td style="background:#ffffff;padding:8px 40px 36px;text-align:center;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <a href="${bookingLink}" style="display:inline-block;background:linear-gradient(135deg,#059669,#047857);color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:12px;letter-spacing:0.3px;">
                    Book Your Free 15-Minute Call →
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;">No obligation &nbsp;·&nbsp; No sales pressure &nbsp;·&nbsp; Just clarity</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══════════════════════════════════════ ABOUT DIVIDER ═══════════════════════════════════════ -->
        <tr>
          <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:28px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="border-left:3px solid #059669;padding-left:16px;">
                  <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#065f46;">About Millstone Compliance</p>
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6b7280;line-height:1.6;">
                    Independent waste compliance consultancy specialising in Simpler Recycling, Duty of Care, and packaging regulations. Vendor-neutral — we have no interest in selling you bins or contracts. Our only focus is keeping you legally compliant.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══════════════════════════════════════ FOOTER ═══════════════════════════════════════ -->
        <tr>
          <td style="background:#064e3b;border-radius:0 0 20px 20px;padding:28px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="padding-bottom:14px;">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:#ffffff;">Millstone Compliance Ltd</p>
                  <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:12px;color:#6ee7b7;">Your Regulatory Advisors</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <table cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding:0 12px;">
                        <a href="tel:01217512262" style="font-family:Arial,sans-serif;font-size:12px;color:#a7f3d0;text-decoration:none;">0121 751 2262</a>
                      </td>
                      <td style="color:#6ee7b7;font-size:12px;">|</td>
                      <td style="padding:0 12px;">
                        <a href="mailto:hello@millstonecompliance.com" style="font-family:Arial,sans-serif;font-size:12px;color:#a7f3d0;text-decoration:none;">hello@millstonecompliance.com</a>
                      </td>
                      <td style="color:#6ee7b7;font-size:12px;">|</td>
                      <td style="padding:0 12px;">
                        <a href="${siteUrl}" style="font-family:Arial,sans-serif;font-size:12px;color:#a7f3d0;text-decoration:none;">millstonecompliance.com</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#6ee7b7;line-height:1.6;">
                    This report was generated based on your self-assessment responses. It provides general guidance only and does not constitute legal advice.<br>
                    <a href="${siteUrl}/privacy" style="color:#a7f3d0;text-decoration:none;">Privacy Policy</a>
                    &nbsp;·&nbsp; © ${new Date().getFullYear()} Millstone Compliance Ltd
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const body: EmailPayload = await request.json();
    const { userInfo, score, riskLevel, findings } = body;

    if (!userInfo?.email || !userInfo?.name) {
      return NextResponse.json({ error: 'Missing required user information' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('xxxxxxxxx')) {
      console.warn('RESEND_API_KEY not configured — skipping email');
      return NextResponse.json({ success: true, message: 'Email service not configured', skipped: true });
    }

    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const html = buildEmailHtml(body, date);

    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com';
    const resend = getResendClient();

    const urgencyLabel = riskLevel.color === 'red' ? '🔴 URGENT' : riskLevel.color === 'amber' ? '🟡 GAPS' : '🟢 OK';

    const batchResult = await resend.batch.send([
      // User copy
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [userInfo.email],
        subject: `Your Simpler Recycling Compliance Report — ${score}/100 · ${riskLevel.level}`,
        html,
      },
      // Internal copy
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [businessEmail],
        subject: `${urgencyLabel} Quiz Lead: ${userInfo.name} (${userInfo.company}) — ${score}/100`,
        html: `<p><strong>Name:</strong> ${userInfo.name}<br><strong>Email:</strong> ${userInfo.email}<br><strong>Company:</strong> ${userInfo.company}<br><strong>Phone:</strong> ${userInfo.phone || '—'}<br><strong>Score:</strong> ${score}/100 (${riskLevel.level})</p><hr>${html}`,
      },
    ]);

    if (batchResult.error) {
      console.error('Resend error:', batchResult.error);
      return NextResponse.json({ error: 'Failed to send email', details: batchResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email results error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown' }, { status: 500 });
  }
}
