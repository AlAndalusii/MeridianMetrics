"use client"

import React from "react"
import Link from "next/link"
import Footer from "@/components/Footer"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-6">
            Privacy Policy
          </h1>
          <p className="poppins-regular text-lg sm:text-xl text-emerald-700 leading-relaxed">
            Your privacy is important to us. This policy explains how we handle and use your personal information.
          </p>
          <p className="poppins-regular text-sm text-emerald-600 mt-4">
            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="px-4 sm:px-6 pb-20 max-w-4xl mx-auto">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100 p-8 sm:p-12 space-y-12">
          
          {/* 1. Contact Information */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
              Contact Information
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-2 ml-11">
              <p><strong>Organisation:</strong> Millstone Compliance Ltd</p>
              <p><strong>Address:</strong> United Kingdom</p>
              <p><strong>Email:</strong> hello@millstonecompliance.com</p>
              <p><strong>Phone:</strong> 0121 751 2262</p>
              <p className="pt-4 text-sm italic">For data protection inquiries or to exercise your rights, please contact us using the details above.</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-100"></div>

          {/* 2. Data Collection */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
              Data Collection
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-4 ml-11">
              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">What Personal Data We Collect</h3>
                <p>We collect personal information that you voluntarily provide to us, including:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Name and contact details (email address, phone number)</li>
                  <li>Company name and business information</li>
                  <li>Information about your packaging and compliance needs</li>
                  <li>Assessment responses and compliance data</li>
                  <li>Payment information (processed securely by third-party providers)</li>
                  <li>Communication history and enquiry records</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">Technical Data</h3>
                <p>We automatically collect certain technical information when you visit our website:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent on each page</li>
                  <li>Referring URL and device information</li>
                  <li>Interaction data with our website features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">How We Collect Data</h3>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Through contact forms and assessment questionnaires</li>
                  <li>Via email communications</li>
                  <li>Through website analytics and cookies</li>
                  <li>From calendar scheduling systems (Calendly)</li>
                  <li>Through email template interactions</li>
                </ul>
              </div>

              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">Legal Basis for Processing</h3>
                <p>We process your personal data based on:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li><strong>Consent:</strong> When you voluntarily provide information and explicitly consent to processing</li>
                  <li><strong>Contract Performance:</strong> To provide compliance assessment services you've requested</li>
                  <li><strong>Legitimate Business Interests:</strong> To improve our services, maintain security, and communicate with you</li>
                  <li><strong>Legal Compliance:</strong> To meet UK regulatory requirements</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-100"></div>

          {/* 3. Data Usage and Purpose */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
              Data Usage and Purpose
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-4 ml-11">
              <p>We use your personal data for the following purposes:</p>
              
              <div className="space-y-3">
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Service Delivery</h3>
                  <p className="text-sm">Providing PPT compliance assessments, audit support, and related services</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Communication</h3>
                  <p className="text-sm">Responding to enquiries, sending assessment results, scheduling consultations, and providing updates</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Business Improvement</h3>
                  <p className="text-sm">Analysing service usage to improve our offerings and personalise user experience</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Marketing & Updates</h3>
                  <p className="text-sm">Sending relevant compliance updates, resources, and news (only with your consent)</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Security & Compliance</h3>
                  <p className="text-sm">Detecting fraud, maintaining security, and complying with legal obligations</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-emerald-900 font-semibold mb-2">Data Sharing</h3>
                <p>We do not sell or share your personal data with third parties except:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>With trusted service providers (email providers, payment processors, hosting providers)</li>
                  <li>When required by law or regulatory authority (HMRC, ICO)</li>
                  <li>To comply with legal obligations or protect our rights</li>
                  <li>With calendar scheduling services when you book a consultation</li>
                </ul>
                <p className="mt-2 text-sm italic">All third parties are contractually obligated to protect your data.</p>
              </div>

              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">Data Retention</h3>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Assessment data: Retained for 7 years (in line with UK tax regulations)</li>
                  <li>Email communications: Retained for 3 years unless legally required longer</li>
                  <li>Website analytics: Retained for 26 months</li>
                  <li>Contact enquiries: Retained for 2 years unless active service relationship</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-100"></div>

          {/* 4. User Rights and Choices */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
              Your Rights and Choices
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-4 ml-11">
              <p>Under UK GDPR and Data Protection Act 2018, you have the following rights:</p>
              
              <div className="space-y-3">
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Right to Access</h3>
                  <p className="text-sm">You can request a copy of all personal data we hold about you</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Right to Rectification</h3>
                  <p className="text-sm">You can request correction of inaccurate or incomplete information</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Right to Erasure</h3>
                  <p className="text-sm">You can request deletion of your data (subject to legal retention obligations)</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Right to Restrict Processing</h3>
                  <p className="text-sm">You can limit how we use your data while your request is investigated</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Right to Data Portability</h3>
                  <p className="text-sm">You can request your data in a structured, portable format</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Right to Withdraw Consent</h3>
                  <p className="text-sm">You can withdraw consent to marketing communications at any time</p>
                </div>
              </div>

              <div className="mt-6 bg-emerald-100/30 p-4 rounded-lg border border-emerald-200">
                <h3 className="text-emerald-900 font-semibold mb-2">How to Exercise Your Rights</h3>
                <p className="text-sm">To exercise any of these rights, please contact us at hello@millstonecompliance.com. We will respond within 30 days (or up to 60 days for complex requests).</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-100"></div>

          {/* 5. Security Measures */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">5</span>
              Security Measures
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-4 ml-11">
              <p>We implement comprehensive security measures to protect your personal data:</p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encryption:</strong> All sensitive data is encrypted in transit (SSL/TLS) and at rest</li>
                <li><strong>Access Controls:</strong> Only authorised staff can access personal data, with role-based permissions</li>
                <li><strong>Secure Servers:</strong> Data is hosted on secure, managed servers with regular security updates</li>
                <li><strong>Regular Audits:</strong> We conduct regular security assessments and penetration testing</li>
                <li><strong>Data Backups:</strong> Regular encrypted backups ensure data recovery in emergencies</li>
                <li><strong>Incident Response:</strong> We have procedures to detect and respond to security breaches</li>
                <li><strong>Staff Training:</strong> Our team receives regular data protection and security training</li>
              </ul>

              <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h3 className="text-amber-900 font-semibold mb-2">Security Note</h3>
                <p className="text-sm">While we implement strong security measures, no system is 100% secure. We cannot guarantee absolute security of your data. If you believe your data has been compromised, please contact us immediately.</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-100"></div>

          {/* 6. Cookies and Tracking */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">6</span>
              Cookies and Tracking Technologies
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-4 ml-11">
              <p>Our website uses cookies and similar tracking technologies to enhance your experience:</p>
              
              <div className="space-y-3">
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Essential Cookies</h3>
                  <p className="text-sm">Required for website functionality (authentication, security, form submission)</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Analytics Cookies</h3>
                  <p className="text-sm">Help us understand how visitors use our website to improve performance</p>
                </div>
                
                <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                  <h3 className="text-emerald-900 font-semibold mb-1">Preference Cookies</h3>
                  <p className="text-sm">Remember your preferences and settings for future visits</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-emerald-900 font-semibold mb-2">Third-Party Services</h3>
                <p>We use the following third-party services which may set cookies:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Calendly (for scheduling consultations)</li>
                  <li>Google Analytics (for website analytics)</li>
                  <li>Email providers (for communication tracking)</li>
                </ul>
                <p className="mt-2 text-sm italic">These services have their own privacy policies.</p>
              </div>

              <div className="mt-6 bg-emerald-100/30 p-4 rounded-lg border border-emerald-200">
                <h3 className="text-emerald-900 font-semibold mb-2">Cookie Management</h3>
                <p className="text-sm">You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Please note that disabling cookies may affect website functionality.</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-100"></div>

          {/* 7. Updates and Legal Compliance */}
          <div>
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">7</span>
              Updates and Legal Compliance
            </h2>
            <div className="poppins-regular text-emerald-700 space-y-4 ml-11">
              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">Policy Changes</h3>
                <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website and updating the "Last updated" date. Your continued use of our website constitutes acceptance of any changes.</p>
              </div>

              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">Legal Framework</h3>
                <p>This Privacy Policy complies with:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>UK General Data Protection Regulation (UK GDPR)</li>
                  <li>Data Protection Act 2018</li>
                  <li>UK Privacy and Electronic Communications Regulations (PECR)</li>
                  <li>HMRC compliance regulations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-emerald-900 font-semibold mb-2">Data Protection Authority</h3>
                <p>If you believe we have violated your data protection rights, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Website: www.ico.org.uk</li>
                  <li>Email: casework@ico.org.uk</li>
                  <li>Phone: 0303 123 1113</li>
                </ul>
              </div>

              <div className="mt-6 bg-emerald-100/30 p-4 rounded-lg border border-emerald-200">
                <h3 className="text-emerald-900 font-semibold mb-2">Contact Us</h3>
                <p className="text-sm">If you have any questions about this Privacy Policy or our data practices, please contact us at hello@millstonecompliance.com.</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-8 mt-8 border-t border-emerald-100 text-center">
            <p className="poppins-regular text-sm text-emerald-600">
              This Privacy Policy was last updated on {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })} and is effective immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
