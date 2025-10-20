import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Heading,
} from '@react-email/components';

interface UserResultEmailProps {
  userInfo: {
    name: string;
    email: string;
    company: string;
    phone?: string;
  };
  score: number;
  scoreLevel: {
    level: string;
    color: string;
    emoji: string;
    description: string;
  };
  gaps: Array<{
    title: string;
    description: string;
    exposure?: string;
  }>;
  strengths: string[];
  recommendation: {
    title: string;
    service: string;
    description: string;
    whatWeProvide: string[];
    ctaMessage: string;
  };
}

export function UserResultEmail({
  userInfo,
  score,
  scoreLevel,
  gaps,
  strengths,
  recommendation,
}: UserResultEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f0fdf4', lineHeight: 1.6 }}>
        
        {/* Main Container */}
        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '40px 20px' }}>
                
                {/* Content Card */}
                <table role="presentation" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <tbody>
                    
                    {/* Header */}
                    <tr>
                      <td style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', padding: '40px 30px', textAlign: 'center' }}>
                        <h1 style={{ margin: 0, color: '#ffffff', fontSize: '28px', fontWeight: 700 }}>
                          🎯 Your PPT Compliance Results
                        </h1>
                      </td>
                    </tr>
                    
                    {/* Personalised Greeting */}
                    <tr>
                      <td style={{ padding: '30px' }}>
                        <h2 style={{ margin: '0 0 20px', color: '#064e3b', fontSize: '22px' }}>
                          Dear {userInfo.name},
                        </h2>
                        <p style={{ margin: '0 0 15px', color: '#047857', fontSize: '16px', lineHeight: 1.6 }}>
                          Thank you for completing your PPT Compliance Assessment. We've prepared this personalised report to help you understand where you stand and what steps you can take to protect <strong>{userInfo.company}</strong> from HMRC penalties.
                        </p>
                        <p style={{ margin: 0, color: '#047857', fontSize: '15px', lineHeight: 1.6 }}>
                          The good news? Most compliance gaps are straightforward to fix once you know what they are. Let's walk through your results together.
                        </p>
                      </td>
                    </tr>
                    
                    {/* Score Section */}
                    <tr>
                      <td style={{ padding: '0 30px 30px' }}>
                        <table role="presentation" style={{ width: '100%', background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', borderRadius: '12px', padding: '30px', border: '2px solid #a7f3d0' }}>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: '10px' }}>{scoreLevel.emoji}</div>
                                <div style={{ fontSize: '56px', fontWeight: 800, color: scoreLevel.color, marginBottom: '5px' }}>{score}/100</div>
                                <div style={{ fontSize: '20px', fontWeight: 600, color: '#065f46', marginBottom: '5px' }}>{scoreLevel.level}</div>
                                <div style={{ fontSize: '14px', color: '#059669' }}>{scoreLevel.description}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    
                    {/* Areas to Address */}
                    {gaps.length > 0 && (
                      <tr>
                        <td style={{ padding: '0 30px 30px' }}>
                          <h3 style={{ margin: '0 0 10px', color: '#b45309', fontSize: '18px', display: 'flex', alignItems: 'center' }}>
                            ⚠️ Areas to Address ({gaps.length})
                          </h3>
                          <p style={{ margin: '0 0 15px', color: '#047857', fontSize: '14px' }}>
                            We've identified {gaps.length} area{gaps.length > 1 ? 's' : ''} that need your attention. Don't worry - these are common issues, and we can help you fix them.
                          </p>
                          {gaps.map((gap, index) => (
                            <div key={index} style={{ backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '15px', marginBottom: '12px', borderRadius: '8px' }}>
                              <div style={{ fontWeight: 600, color: '#92400e', marginBottom: '5px' }}>{index + 1}. {gap.title}</div>
                              <div style={{ fontSize: '14px', color: '#b45309', lineHeight: 1.5 }}>{gap.description}</div>
                              {gap.exposure && (
                                <div style={{ backgroundColor: '#f59e0b', color: '#ffffff', display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', marginTop: '8px', fontWeight: 600 }}>
                                  Risk: {gap.exposure}
                                </div>
                              )}
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}
                    
                    {/* What You're Doing Well */}
                    {strengths.length > 0 && (
                      <tr>
                        <td style={{ padding: '0 30px 30px' }}>
                          <h3 style={{ margin: '0 0 10px', color: '#059669', fontSize: '18px' }}>
                            ✅ What You're Doing Well ({strengths.length})
                          </h3>
                          <p style={{ margin: '0 0 15px', color: '#047857', fontSize: '14px' }}>
                            Great work! You already have these important compliance elements in place:
                          </p>
                          {strengths.map((strength, index) => (
                            <div key={index} style={{ backgroundColor: '#d1fae5', borderLeft: '4px solid #10b981', padding: '12px', marginBottom: '8px', borderRadius: '8px' }}>
                              <div style={{ fontSize: '14px', color: '#065f46', lineHeight: 1.5 }}>✓ {strength}</div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}
                    
                    {/* Personalised Recommendation */}
                    <tr>
                      <td style={{ padding: '0 30px 30px' }}>
                        <div style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', borderRadius: '12px', padding: '30px', color: '#ffffff' }}>
                          <h3 style={{ margin: '0 0 15px', fontSize: '20px' }}>✨ Recommended Solution</h3>
                          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                            <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '10px' }}>{recommendation.service}</div>
                            <div style={{ fontSize: '15px', marginBottom: '15px', opacity: 0.95, lineHeight: 1.5 }}>
                              {recommendation.description}
                            </div>
                            <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '15px' }}>
                              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px', opacity: 0.9 }}>WHAT WE PROVIDE:</div>
                              {recommendation.whatWeProvide.map((item, index) => (
                                <div key={index} style={{ fontSize: '14px', marginBottom: '6px', paddingLeft: '5px', opacity: 0.95 }}>
                                  ✓ {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', padding: '15px', marginBottom: '20px', textAlign: 'center', fontSize: '15px', lineHeight: 1.5 }}>
                            {recommendation.ctaMessage}
                          </div>
                          <table role="presentation" style={{ width: '100%' }}>
                            <tbody>
                              <tr>
                                <td style={{ textAlign: 'center' }}>
                                  <a href={`mailto:zak@millstonecompliance.com?subject=My PPT Assessment Results - Ready to Get Compliant&body=Hi Zak,%0D%0A%0D%0AI've just completed my PPT compliance assessment.%0D%0A%0D%0A📊 My Score: ${score}/100 - ${scoreLevel.level}%0D%0A🏢 Company: ${userInfo.company}%0D%0A%0D%0AI need help getting compliant.%0D%0A%0D%0AI'd like to discuss: ${recommendation.service}%0D%0A%0D%0ACan we arrange a quick call this week?%0D%0A%0D%0ABest time to reach me: [Your preferred time]%0D%0A%0D%0ACheers,%0D%0A${userInfo.name}%0D%0A${userInfo.phone || ''}%0D%0A${userInfo.email}`}
                                     style={{ display: 'inline-block', backgroundColor: '#ffffff', color: '#059669', padding: '16px 40px', textDecoration: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '16px', marginTop: '10px' }}>
                                    Get My Custom Proposal →
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: '14px', opacity: 0.9 }}>
                            ⚡ Most clients get their proposal within 4 hours
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Footer */}
                    <tr>
                      <td style={{ padding: '30px', backgroundColor: '#f9fafb', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
                        <p style={{ margin: '0 0 10px', color: '#6b7280', fontSize: '14px' }}>
                          Have questions about your results?
                        </p>
                        <p style={{ margin: 0, color: '#059669', fontSize: '14px' }}>
                          📧 <a href="mailto:zak@millstonecompliance.com" style={{ color: '#059669', textDecoration: 'none' }}>zak@millstonecompliance.com</a>
                        </p>
                        <p style={{ margin: '15px 0 0', color: '#9ca3af', fontSize: '12px' }}>
                          © {new Date().getFullYear()} Millstone Compliance. All rights reserved.
                        </p>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        
      </Body>
    </Html>
  );
}

