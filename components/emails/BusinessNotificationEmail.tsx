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

interface BusinessNotificationEmailProps {
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
  answers: Record<number, string>;
  recommendation: {
    title: string;
    service: string;
    price: string;
    description: string;
  };
}

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

export function BusinessNotificationEmail({
  userInfo,
  score,
  scoreLevel,
  gaps,
  strengths,
  answers,
  recommendation,
}: BusinessNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ margin: 0, padding: 0, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f3f4f6', lineHeight: 1.6 }}>
        
        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{ padding: '40px 20px' }}>
                
                <table role="presentation" style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <tbody>
                    
                    {/* Header */}
                    <tr>
                      <td style={{ backgroundColor: '#1f2937', padding: '25px 30px', borderRadius: '12px 12px 0 0' }}>
                        <h1 style={{ margin: 0, color: '#ffffff', fontSize: '24px', fontWeight: 700 }}>
                          🆕 New Assessment Submission
                        </h1>
                        <p style={{ margin: '8px 0 0', color: '#9ca3af', fontSize: '14px' }}>
                          {new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'short' })}
                        </p>
                      </td>
                    </tr>
                    
                    {/* Contact Info */}
                    <tr>
                      <td style={{ padding: '30px', borderBottom: '2px solid #e5e7eb' }}>
                        <h2 style={{ margin: '0 0 15px', color: '#111827', fontSize: '20px' }}>📋 Contact Information</h2>
                        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px', width: '120px' }}>Name:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontWeight: 600, fontSize: '14px' }}>{userInfo.name}</td>
                            </tr>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Email:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontWeight: 600, fontSize: '14px' }}>
                                <a href={`mailto:${userInfo.email}`} style={{ color: '#059669', textDecoration: 'none' }}>{userInfo.email}</a>
                              </td>
                            </tr>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Company:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontWeight: 600, fontSize: '14px' }}>{userInfo.company}</td>
                            </tr>
                            {userInfo.phone && (
                              <tr>
                                <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Phone:</td>
                                <td style={{ padding: '8px 0', color: '#111827', fontWeight: 600, fontSize: '14px' }}>
                                  <a href={`tel:${userInfo.phone}`} style={{ color: '#059669', textDecoration: 'none' }}>{userInfo.phone}</a>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    
                    {/* Score Summary */}
                    <tr>
                      <td style={{ padding: '30px', borderBottom: '2px solid #e5e7eb' }}>
                        <h2 style={{ margin: '0 0 15px', color: '#111827', fontSize: '20px' }}>🎯 Assessment Score</h2>
                        <div style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', borderRadius: '8px', padding: '20px', textAlign: 'center', border: '2px solid #86efac' }}>
                          <div style={{ fontSize: '48px', fontWeight: 800, color: scoreLevel.color, marginBottom: '5px' }}>{score}/100</div>
                          <div style={{ fontSize: '18px', fontWeight: 600, color: '#065f46' }}>{scoreLevel.emoji} {scoreLevel.level}</div>
                          <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #bbf7d0' }}>
                            <div style={{ fontSize: '14px', color: '#047857', marginBottom: '5px' }}><strong>Gaps:</strong> {gaps.length}</div>
                            <div style={{ fontSize: '14px', color: '#047857' }}><strong>Strengths:</strong> {strengths.length}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Critical Gaps */}
                    {gaps.length > 0 && (
                      <tr>
                        <td style={{ padding: '30px', borderBottom: '2px solid #e5e7eb' }}>
                          <h2 style={{ margin: '0 0 15px', color: '#111827', fontSize: '20px' }}>⚠️ Critical Gaps ({gaps.length})</h2>
                          {gaps.map((gap, index) => (
                            <div key={index} style={{ backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '12px', marginBottom: '10px', borderRadius: '6px' }}>
                              <div style={{ fontWeight: 600, color: '#92400e', fontSize: '14px', marginBottom: '4px' }}>{gap.title}</div>
                              <div style={{ fontSize: '13px', color: '#b45309' }}>{gap.description}</div>
                              {gap.exposure && (
                                <div style={{ fontSize: '12px', color: '#dc2626', marginTop: '6px', fontWeight: 600 }}>Exposure: {gap.exposure}</div>
                              )}
                            </div>
                          ))}
                        </td>
                      </tr>
                    )}
                    
                    {/* Key Insights */}
                    <tr>
                      <td style={{ padding: '30px', borderBottom: '2px solid #e5e7eb' }}>
                        <h2 style={{ margin: '0 0 15px', color: '#111827', fontSize: '20px' }}>🔍 Key Insights</h2>
                        <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px', width: '200px' }}>Business Scale:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontSize: '14px' }}>{answers[15] || 'Not answered'}</td>
                            </tr>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Primary Goal:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontSize: '14px' }}>{answers[16] || 'Not answered'}</td>
                            </tr>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Biggest Obstacle:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontSize: '14px' }}>{answers[17] || 'Not answered'}</td>
                            </tr>
                            <tr>
                              <td style={{ padding: '8px 0', color: '#6b7280', fontSize: '14px' }}>Preferred Solution:</td>
                              <td style={{ padding: '8px 0', color: '#111827', fontSize: '14px' }}>{answers[18] || 'Not answered'}</td>
                            </tr>
                          </tbody>
                        </table>
                        
                        {answers[19] && (
                          <div style={{ marginTop: '20px', backgroundColor: '#f9fafb', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #6366f1' }}>
                            <div style={{ fontWeight: 600, color: '#111827', fontSize: '14px', marginBottom: '8px' }}>💬 Additional Notes:</div>
                            <div style={{ fontSize: '13px', color: '#4b5563', whiteSpace: 'pre-wrap' }}>{answers[19]}</div>
                          </div>
                        )}
                      </td>
                    </tr>
                    
                    {/* Recommended Service */}
                    <tr>
                      <td style={{ padding: '30px', borderBottom: '2px solid #e5e7eb' }}>
                        <h2 style={{ margin: '0 0 15px', color: '#111827', fontSize: '20px' }}>💰 Recommended Service</h2>
                        <div style={{ backgroundColor: '#ecfdf5', borderRadius: '8px', padding: '20px', border: '2px solid #a7f3d0' }}>
                          <div style={{ fontSize: '18px', fontWeight: 700, color: '#065f46', marginBottom: '8px' }}>{recommendation.service}</div>
                          <div style={{ fontSize: '14px', color: '#047857', marginBottom: '10px' }}>{recommendation.description}</div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#059669' }}>{recommendation.price}</div>
                        </div>
                      </td>
                    </tr>
                    
                    {/* All Answers */}
                    <tr>
                      <td style={{ padding: '30px' }}>
                        <details>
                          <summary style={{ fontSize: '18px', fontWeight: 600, color: '#111827', cursor: 'pointer', marginBottom: '15px' }}>
                            📝 View All Answers
                          </summary>
                          <table role="presentation" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                            <tbody>
                              {Object.entries(answers).map(([questionId, answer]) => (
                                <tr key={questionId}>
                                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontSize: '13px', verticalAlign: 'top', width: '40%' }}>
                                    Q{questionId}: {questionLabels[parseInt(questionId)] || 'Question ' + questionId}
                                  </td>
                                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', color: '#111827', fontSize: '13px', verticalAlign: 'top' }}>
                                    {answer || <em style={{ color: '#9ca3af' }}>Not answered</em>}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </details>
                      </td>
                    </tr>
                    
                    {/* Footer */}
                    <tr>
                      <td style={{ padding: '20px', backgroundColor: '#f9fafb', textAlign: 'center', borderRadius: '0 0 12px 12px' }}>
                        <p style={{ margin: 0, color: '#9ca3af', fontSize: '12px' }}>
                          Assessment completed at {new Date().toLocaleTimeString('en-GB')} on {new Date().toLocaleDateString('en-GB')}
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

