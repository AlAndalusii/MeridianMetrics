import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userInfo, score, gaps, strengths, answers } = body;

    // Validate required fields
    if (!userInfo?.email || !userInfo?.name) {
      return NextResponse.json(
        { error: 'Missing required user information' },
        { status: 400 }
      );
    }

    // Check if API key is set
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_xxxxxxxxx') {
      console.error('❌ RESEND_API_KEY not set or still using placeholder!');
      return NextResponse.json(
        { error: 'Email service not configured. Please add RESEND_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    console.log('📧 Attempting to send emails to:', {
      user: userInfo.email,
      business: process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'
    });

    const scoreLevel = getScoreLevel(score);
    const recommendation = getRecommendation(score);

    // TEMPORARY: Send both emails to business owner until domain is verified
    // This ensures you don't miss any leads while setting up domain verification
    const batchResult = await resend.batch.send([
      // 1. Business notification with all details (goes to you)
      {
        from: 'Assessment System <onboarding@resend.dev>',
        to: [process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'],
        subject: `🆕 New Assessment: ${userInfo.name} (${userInfo.company}) - Score: ${score}/100`,
        html: generateBusinessEmail(userInfo, score, scoreLevel, gaps, strengths, answers, recommendation),
      },
      // 2. User's results email (also sent to you for now)
      // NOTE: After domain verification, change 'to' to [userInfo.email]
      {
        from: 'Millstone Compliance <onboarding@resend.dev>',
        to: [process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com'], // TODO: Change to [userInfo.email] after domain verification
        subject: `${userInfo.name}, Your PPT Compliance Assessment Results - ${score}/100`,
        html: `
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 20px;">
            <strong>⚠️ IMPORTANT - Forward this email to: ${userInfo.email}</strong><br>
            <small>Domain verification pending. Once verified, emails will send automatically to customers.</small>
          </div>
          ${generateUserEmail(userInfo, score, scoreLevel, gaps, strengths, recommendation)}
        `,
      },
    ]);

    // Log the full response from Resend
    console.log('📬 Resend batch response:', JSON.stringify(batchResult, null, 2));

    if (batchResult.error) {
      console.error('❌ Resend error:', batchResult.error);
      return NextResponse.json(
        { error: 'Failed to send emails via Resend', details: batchResult.error },
        { status: 500 }
      );
    }

    console.log('✅ Emails sent successfully! Batch ID:', batchResult.data?.id);

    return NextResponse.json({
      success: true,
      batchId: batchResult.data?.id,
      message: 'Emails sent successfully',
    });
  } catch (error) {
    console.error('❌ Error sending emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to determine score level
function getScoreLevel(score: number) {
  if (score >= 90) return { level: 'Audit-Ready', color: '#10b981', emoji: '🟢', description: 'Top 15% of businesses' };
  if (score >= 70) return { level: 'Strong Foundation', color: '#f59e0b', emoji: '🟡', description: '3-4 gaps to address' };
  if (score >= 50) return { level: 'Compliance Risk', color: '#f97316', emoji: '🟠', description: 'Significant exposure' };
  return { level: 'Critical Gaps', color: '#ef4444', emoji: '🔴', description: 'Urgent action needed' };
}

// Helper function to get recommendation
function getRecommendation(score: number) {
  if (score >= 90) {
    return {
      title: 'Maintenance & Monitoring',
      service: 'Quarterly Compliance Review',
      price: '£100/month',
      description: 'Maintain your excellent systems audit-ready with quarterly reviews',
    };
  }
  if (score >= 70) {
    return {
      title: 'Documentation Audit',
      service: 'Expert Audit + Implementation Guide',
      price: '£495 → £250 Early Client Rate',
      description: "We'll identify and help you address those final gaps",
    };
  }
  if (score >= 50) {
    return {
      title: 'Compliance Overhaul',
      service: 'Full Documentation Audit + Implementation Support',
      price: '£750 → £495 Early Client Rate',
      description: 'Comprehensive review and hands-on help to get you audit-ready',
    };
  }
  return {
    title: 'Emergency Compliance Package',
    service: 'Done-For-You Documentation + Urgent Support',
    price: '£1,200 → £750 Emergency Rate',
    description: "We'll organise everything and get you compliant quickly",
  };
}

// Generate professional email for the user
function generateUserEmail(
  userInfo: any,
  score: number,
  scoreLevel: any,
  gaps: any[],
  strengths: string[],
  recommendation: any
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your PPT Compliance Assessment Results</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0fdf4; line-height: 1.6;">
  
  <!-- Main Container -->
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <!-- Content Card -->
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🎯 Your PPT Compliance Results
              </h1>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="margin: 0 0 20px; color: #064e3b; font-size: 22px;">
                Hi ${userInfo.name},
              </h2>
              <p style="margin: 0 0 20px; color: #047857; font-size: 16px;">
                Thank you for completing the PPT Compliance Assessment for <strong>${userInfo.company}</strong>.
              </p>
            </td>
          </tr>
          
          <!-- Score Section -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 12px; padding: 30px; border: 2px solid #a7f3d0;">
                <tr>
                  <td style="text-align: center;">
                    <div style="font-size: 48px; margin-bottom: 10px;">${scoreLevel.emoji}</div>
                    <div style="font-size: 56px; font-weight: 800; color: ${scoreLevel.color}; margin-bottom: 5px;">${score}/100</div>
                    <div style="font-size: 20px; font-weight: 600; color: #065f46; margin-bottom: 5px;">${scoreLevel.level}</div>
                    <div style="font-size: 14px; color: #059669;">${scoreLevel.description}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          ${gaps.length > 0 ? `
          <!-- Critical Gaps -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h3 style="margin: 0 0 15px; color: #b45309; font-size: 18px; display: flex; align-items: center;">
                ⚠️ Critical Gaps (${gaps.length})
              </h3>
              ${gaps.map((gap: any) => `
                <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 12px; border-radius: 8px;">
                  <div style="font-weight: 600; color: #92400e; margin-bottom: 5px;">${gap.title}</div>
                  <div style="font-size: 14px; color: #b45309;">${gap.description}</div>
                  ${gap.exposure ? `<div style="font-size: 13px; color: #dc2626; margin-top: 8px; font-weight: 600;">Exposure: ${gap.exposure}</div>` : ''}
                </div>
              `).join('')}
            </td>
          </tr>
          ` : ''}
          
          ${strengths.length > 0 ? `
          <!-- Your Strengths -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <h3 style="margin: 0 0 15px; color: #059669; font-size: 18px;">
                ✅ Your Strengths (${strengths.length})
              </h3>
              ${strengths.map((strength: string) => `
                <div style="background-color: #d1fae5; border-left: 4px solid #10b981; padding: 12px; margin-bottom: 8px; border-radius: 8px;">
                  <div style="font-size: 14px; color: #065f46;">✓ ${strength}</div>
                </div>
              `).join('')}
            </td>
          </tr>
          ` : ''}
          
          <!-- Recommendation -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 12px; padding: 30px; color: #ffffff;">
                <h3 style="margin: 0 0 15px; font-size: 20px;">✨ Recommended Next Step</h3>
                <div style="background-color: rgba(255,255,255,0.1); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                  <div style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">${recommendation.service}</div>
                  <div style="font-size: 15px; margin-bottom: 15px; opacity: 0.95;">${recommendation.description}</div>
                  <div style="font-size: 32px; font-weight: 800;">${recommendation.price.split('→')[1] || recommendation.price}</div>
                </div>
                <table role="presentation" style="width: 100%;">
                  <tr>
                    <td style="text-align: center;">
                      <a href="mailto:zak@millstonecompliance.com?subject=Assessment Follow-up: ${userInfo.name} - ${userInfo.company}" 
                         style="display: inline-block; background-color: #ffffff; color: #059669; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; margin-top: 10px;">
                        Book Your Audit Now →
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9fafb; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px; color: #6b7280; font-size: 14px;">
                Have questions about your results?
              </p>
              <p style="margin: 0; color: #059669; font-size: 14px;">
                📧 <a href="mailto:zak@millstonecompliance.com" style="color: #059669; text-decoration: none;">zak@millstonecompliance.com</a>
              </p>
              <p style="margin: 15px 0 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Millstone Compliance. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;
}

// Generate notification email for business owner
function generateBusinessEmail(
  userInfo: any,
  score: number,
  scoreLevel: any,
  gaps: any[],
  strengths: string[],
  answers: Record<number, string>,
  recommendation: any
) {
  // Question labels for reference
  const questionLabels: Record<number, string> = {
    1: 'Name',
    2: 'Email',
    3: 'Company',
    4: 'Phone',
    5: 'Certificates for recycled content',
    6: 'Certificates show exact percentages',
    7: 'Certificates current (12 months)',
    8: 'Document access time',
    9: 'Tax point knowledge',
    10: 'Supplier change certificates',
    11: 'Written weighing process',
    12: 'Quarterly returns submitted',
    13: 'Export documentation',
    14: 'UK nation tracking',
    15: 'Annual plastic packaging volume',
    16: 'Primary goal (90 days)',
    17: 'Biggest obstacle',
    18: 'Preferred solution',
    19: 'Additional information',
  };

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Assessment Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; line-height: 1.6;">
  
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <table role="presentation" style="max-width: 700px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #1f2937; padding: 25px 30px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">
                🆕 New Assessment Submission
              </h1>
              <p style="margin: 8px 0 0; color: #9ca3af; font-size: 14px;">
                ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
              </p>
            </td>
          </tr>
          
          <!-- Contact Info -->
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 20px;">📋 Contact Information</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${userInfo.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Email:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">
                    <a href="mailto:${userInfo.email}" style="color: #059669; text-decoration: none;">${userInfo.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Company:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">${userInfo.company}</td>
                </tr>
                ${userInfo.phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Phone:</td>
                  <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 14px;">
                    <a href="tel:${userInfo.phone}" style="color: #059669; text-decoration: none;">${userInfo.phone}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          
          <!-- Score Summary -->
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 20px;">🎯 Assessment Score</h2>
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 8px; padding: 20px; text-align: center; border: 2px solid #86efac;">
                <div style="font-size: 48px; font-weight: 800; color: ${scoreLevel.color}; margin-bottom: 5px;">${score}/100</div>
                <div style="font-size: 18px; font-weight: 600; color: #065f46;">${scoreLevel.emoji} ${scoreLevel.level}</div>
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #bbf7d0;">
                  <div style="font-size: 14px; color: #047857; margin-bottom: 5px;"><strong>Gaps:</strong> ${gaps.length}</div>
                  <div style="font-size: 14px; color: #047857;"><strong>Strengths:</strong> ${strengths.length}</div>
                </div>
              </div>
            </td>
          </tr>
          
          ${gaps.length > 0 ? `
          <!-- Critical Gaps -->
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 20px;">⚠️ Critical Gaps (${gaps.length})</h2>
              ${gaps.map((gap: any) => `
                <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 12px; margin-bottom: 10px; border-radius: 6px;">
                  <div style="font-weight: 600; color: #92400e; font-size: 14px; margin-bottom: 4px;">${gap.title}</div>
                  <div style="font-size: 13px; color: #b45309;">${gap.description}</div>
                  ${gap.exposure ? `<div style="font-size: 12px; color: #dc2626; margin-top: 6px; font-weight: 600;">Exposure: ${gap.exposure}</div>` : ''}
                </div>
              `).join('')}
            </td>
          </tr>
          ` : ''}
          
          <!-- Key Insights -->
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 20px;">🔍 Key Insights</h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 200px;">Business Scale:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">${answers[15] || 'Not answered'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Primary Goal:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">${answers[16] || 'Not answered'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Biggest Obstacle:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">${answers[17] || 'Not answered'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Preferred Solution:</td>
                  <td style="padding: 8px 0; color: #111827; font-size: 14px;">${answers[18] || 'Not answered'}</td>
                </tr>
              </table>
              
              ${answers[19] ? `
              <div style="margin-top: 20px; background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #6366f1;">
                <div style="font-weight: 600; color: #111827; font-size: 14px; margin-bottom: 8px;">💬 Additional Notes:</div>
                <div style="font-size: 13px; color: #4b5563; white-space: pre-wrap;">${answers[19]}</div>
              </div>
              ` : ''}
            </td>
          </tr>
          
          <!-- Recommended Service -->
          <tr>
            <td style="padding: 30px; border-bottom: 2px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px; color: #111827; font-size: 20px;">💰 Recommended Service</h2>
              <div style="background-color: #ecfdf5; border-radius: 8px; padding: 20px; border: 2px solid #a7f3d0;">
                <div style="font-size: 18px; font-weight: 700; color: #065f46; margin-bottom: 8px;">${recommendation.service}</div>
                <div style="font-size: 14px; color: #047857; margin-bottom: 10px;">${recommendation.description}</div>
                <div style="font-size: 24px; font-weight: 800; color: #059669;">${recommendation.price}</div>
              </div>
            </td>
          </tr>
          
          <!-- All Answers -->
          <tr>
            <td style="padding: 30px;">
              <details>
                <summary style="font-size: 18px; font-weight: 600; color: #111827; cursor: pointer; margin-bottom: 15px;">
                  📝 View All Answers
                </summary>
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  ${Object.entries(answers).map(([questionId, answer]) => `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; vertical-align: top; width: 40%;">
                        Q${questionId}: ${questionLabels[parseInt(questionId)] || 'Question ' + questionId}
                      </td>
                      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 13px; vertical-align: top;">
                        ${answer || '<em style="color: #9ca3af;">Not answered</em>'}
                      </td>
                    </tr>
                  `).join('')}
                </table>
              </details>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px; background-color: #f9fafb; text-align: center; border-radius: 0 0 12px 12px;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Assessment completed at ${new Date().toLocaleTimeString('en-GB')} on ${new Date().toLocaleDateString('en-GB')}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
  
</body>
</html>
  `;
}

