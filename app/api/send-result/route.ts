import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { UserResultEmail } from '@/components/emails/UserResultEmail';
import { BusinessNotificationEmail } from '@/components/emails/BusinessNotificationEmail';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Don't cache the Resend instance to ensure we use the latest API key
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  const resend = getResendClient();
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

    const scoreLevel = getScoreLevel(score);
    const recommendation = getRecommendation(score);

    const businessEmail = process.env.BUSINESS_EMAIL || 'zak@millstonecompliance.com';
    
    console.log('📧 Email Configuration:', {
      userEmail: userInfo.email,
      userName: userInfo.name,
      businessEmail: businessEmail,
      score: score
    });

    // Send batch emails using verified subdomain with React components
    const emailPayloads = [
      // 1. Business notification with all details (internal copy)
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [businessEmail],
        subject: `🆕 New Assessment: ${userInfo.name} (${userInfo.company}) - Score: ${score}/100`,
        react: BusinessNotificationEmail({
          userInfo,
          score,
          scoreLevel,
          gaps,
          strengths,
          answers,
          recommendation,
        }),
      },
      // 2. User's results email (sent to the customer)
      {
        from: 'Millstone Compliance <onboarding@mail.millstonecompliance.com>',
        to: [userInfo.email],
        subject: `${userInfo.name}, Your PPT Compliance Assessment Results - ${score}/100`,
        react: UserResultEmail({
          userInfo,
          score,
          scoreLevel,
          gaps,
          strengths,
          recommendation,
        }),
      },
    ];

    console.log('📨 Sending batch with recipients:', {
      email1: { to: emailPayloads[0].to, subject: emailPayloads[0].subject },
      email2: { to: emailPayloads[1].to, subject: emailPayloads[1].subject }
    });

    const batchResult = await resend.batch.send(emailPayloads);

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

