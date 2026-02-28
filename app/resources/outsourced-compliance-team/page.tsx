"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Building, Users, Clock,
  BadgeCheck, TrendingDown, AlertTriangle, FileCheck, Target, Zap, Mail, ArrowRight, Phone } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { ContactModal } from "@/components/ContactModal"
import { MobileMenu } from "@/components/MobileMenu"

export default function OutsourcedComplianceTeam() {
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                onClick={() => setShowContactModal(true)}
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px]"
              >
                <span className="hidden xs:inline">GET EXPERT HELP</span>
                <span className="xs:hidden">CONTACT</span>
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <header className="mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
              <Building className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="poppins-semibold text-sm text-emerald-700">Complete Guide</span>
            </div>
            
            <h1 className="poppins-bold text-4xl sm:text-5xl text-emerald-900 mb-4 leading-tight">
              Outsourced Compliance Team for UK Businesses
            </h1>
            
            <p className="poppins-regular text-lg text-emerald-700 mb-6">
              Last updated: Nov 2025 | For UK businesses seeking external waste & packaging compliance support
            </p>

            {/* Quick CTA */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl p-6 border border-emerald-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="poppins-semibold text-emerald-900">Need immediate help?</p>
                    <p className="text-sm text-emerald-700">Get expert support in 24 hours</p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowContactModal(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold shadow-lg whitespace-nowrap"
                >
                  Contact Us Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="poppins-bold text-3xl text-emerald-900 mb-6">What Is an Outsourced Compliance Team?</h2>
            
            <p className="poppins-regular text-base text-emerald-800 leading-relaxed mb-6">
              An outsourced compliance team is an external specialist service that handles your regulatory compliance obligations without hiring full-time staff. Instead of employing a dedicated compliance officer (£35,000-55,000/year salary + benefits), businesses pay for expert support on a project or retainer basis.
            </p>

            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h3 className="poppins-semibold text-xl text-emerald-900 mb-4">For UK waste and packaging regulations, this means:</h3>
              <div className="space-y-3">
                {[
                  "We become your compliance department",
                  "You get expert guidance without employment costs",
                  "We handle Simpler Recycling, Duty of Care, EPR, PPT, and hazardous waste",
                  "You stay compliant, we do the work"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-emerald-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who Needs This */}
          <section className="mb-12">
            <h2 className="poppins-bold text-3xl text-emerald-900 mb-6">Who Needs an Outsourced Compliance Team?</h2>
            
            <div className="space-y-6">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  You're a Perfect Fit If:
                </h3>
                <div className="space-y-4 pl-7">
                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-2">✓ You don't have compliance expertise in-house</p>
                    <ul className="space-y-1 text-sm text-emerald-700 poppins-regular">
                      <li>• No one on your team understands waste regulations</li>
                      <li>• Staff are stretched managing operations, not reading legislation</li>
                      <li>• You've received compliance warnings or penalties</li>
                    </ul>
                  </div>

                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-2">✓ You can't justify a full-time hire</p>
                    <ul className="space-y-1 text-sm text-emerald-700 poppins-regular">
                      <li>• 10-50 employee business (too small for dedicated compliance role)</li>
                      <li>• Compliance needs are periodic, not daily</li>
                      <li>• £50k salary doesn't make financial sense</li>
                    </ul>
                  </div>

                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-2">✓ You operate multiple sites</p>
                    <ul className="space-y-1 text-sm text-emerald-700 poppins-regular">
                      <li>• Managing agents with 5-20 commercial properties</li>
                      <li>• Retail/hospitality chains with multiple locations</li>
                      <li>• Warehouses across different regions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="my-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
            <div className="relative z-10 text-center">
              <h3 className="poppins-bold text-2xl mb-3">Not Sure If You're Compliant?</h3>
              <p className="poppins-regular text-emerald-50 mb-6 max-w-2xl mx-auto">
                Get a free 15-minute phone assessment. We'll tell you exactly where you stand and what needs fixing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowContactModal(true)}
                  className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-semibold shadow-xl px-8 py-6"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Request Free Assessment
                </Button>
              </div>
            </div>
          </div>

          {/* Problems We Solve */}
          <section className="mb-12">
            <h2 className="poppins-bold text-3xl text-emerald-900 mb-6">What Problems Does Outsourced Compliance Solve?</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Problem 1: \"We Don't Know If We're Compliant\"",
                  scenario: "Our waste company said we're fine, but I received a letter from the Environment Agency asking for documentation. I can't find half the paperwork they want.",
                  solution: [
                    "Complete compliance audit (all regulations)",
                    "Gap analysis showing exactly what's missing",
                    "Prioritised action plan with penalty risks quantified",
                    "Implementation support until fully compliant"
                  ],
                  timeline: "2-4 weeks from audit to full compliance"
                },
                {
                  title: "Problem 2: \"Regulations Keep Changing\"",
                  scenario: "We set up bins last year, but now there's Extended Producer Responsibility, Digital Waste Tracking in October 2026, and we can't keep up.",
                  solution: [
                    "Regulatory monitoring service (we track all updates)",
                    "Proactive alerts when laws affect your business",
                    "Updated compliance procedures sent to you",
                    "Annual re-audits to catch new requirements"
                  ],
                  timeline: "Late compliance, last-minute scrambles, missed deadlines"
                },
                {
                  title: "Problem 3: \"We Don't Have Time for This\"",
                  scenario: "I'm the operations manager. I should be managing operations, not reading 47-page Defra guidance documents and chasing waste carriers for documentation.",
                  solution: [
                    "We handle all compliance administration",
                    "We chase carriers for Waste Transfer Notes",
                    "We verify registrations and permits",
                    "We deal with Environment Agency queries",
                    "You get a monthly compliance status report (5 minutes to review)"
                  ],
                  timeline: "Time saved: 10-20 hours/month"
                }
              ].map((problem, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
                  <h3 className="poppins-bold text-xl text-emerald-900 mb-4">{problem.title}</h3>
                  
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                    <p className="poppins-regular text-sm text-amber-900 italic">"{problem.scenario}"</p>
                  </div>

                  <h4 className="poppins-semibold text-emerald-900 mb-3">How we solve it:</h4>
                  <div className="space-y-2 mb-4">
                    {problem.solution.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm poppins-regular text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-3 inline-block">
                    <p className="text-sm poppins-semibold text-emerald-900">{problem.timeline}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="poppins-bold text-3xl text-emerald-900 mb-6">How Outsourced Compliance Actually Works</h2>
            
            <div className="space-y-6">
              {[
                {
                  step: "Step 1: Initial Assessment (Week 1)",
                  icon: FileCheck,
                  items: [
                    "90-minute on-site audit OR comprehensive virtual assessment",
                    "We review: bins, storage, documentation, carrier registrations",
                    "Written compliance report (15-20 pages)",
                    "Traffic light status (compliant/minor gaps/serious violations)"
                  ],
                  investment: "£295-795"
                },
                {
                  step: "Step 2: Remediation (Week 2-4)",
                  icon: Target,
                  items: [
                    "Obtain missing Waste Transfer Notes from carriers",
                    "Verify all carriers on Environment Agency register",
                    "Correct bin labeling and setup",
                    "Create staff training materials"
                  ],
                  investment: "Included or £150-500"
                },
                {
                  step: "Step 3: Ongoing Management (Month 2+)",
                  icon: BadgeCheck,
                  items: [
                    "Collect and file all Waste Transfer Notes",
                    "Track regulatory changes",
                    "Quarterly compliance dashboard",
                    "Annual re-audit with certification"
                  ],
                  investment: "£299-799/month"
                }
              ].map((step, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-emerald-100 shadow-lg">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="poppins-bold text-xl text-emerald-900 mb-3">{step.step}</h3>
                      <div className="space-y-2 mb-4">
                        {step.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm poppins-regular text-emerald-800">{item}</span>
                          </div>
                        ))}
                      </div>
                      <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-lg px-4 py-2">
                        <span className="text-sm poppins-semibold text-emerald-900">Investment: {step.investment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Comparison */}
          <section className="mb-12">
            <h2 className="poppins-bold text-3xl text-emerald-900 mb-6">Cost Comparison</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* In-House */}
              <div className="bg-rose-50 rounded-2xl p-6 border-2 border-rose-200">
                <h3 className="poppins-bold text-xl text-rose-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Full-time Compliance Officer
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Salary", value: "£35,000-55,000/year" },
                    { label: "National Insurance", value: "£4,200-6,600/year" },
                    { label: "Pension", value: "£1,050-1,650/year" },
                    { label: "Training/CPD", value: "£1,500/year" },
                    { label: "Recruitment", value: "£3,000-8,000" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="poppins-regular text-rose-800">{item.label}:</span>
                      <span className="poppins-semibold text-rose-900">{item.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t-2 border-rose-300">
                    <div className="flex justify-between items-center">
                      <span className="poppins-bold text-rose-900">Total Year 1:</span>
                      <span className="poppins-bold text-xl text-rose-900">£44,750-71,250</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Outsourced */}
              <div className="bg-emerald-50 rounded-2xl p-6 border-2 border-emerald-200">
                <h3 className="poppins-bold text-xl text-emerald-900 mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Outsourced Compliance
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="poppins-regular text-emerald-800">Monthly retainer:</span>
                    <span className="poppins-semibold text-emerald-900">£499</span>
                  </div>
                  <div className="pt-3 border-t-2 border-emerald-300">
                    <div className="flex justify-between items-center">
                      <span className="poppins-bold text-emerald-900">Annual cost:</span>
                      <span className="poppins-bold text-xl text-emerald-900">£5,988</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
                    <p className="text-sm poppins-semibold text-emerald-900 text-center">
                      💰 Savings: £35,762-57,262/year
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <div className="my-12 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
            <div className="relative z-10 text-center">
              <h2 className="poppins-bold text-3xl sm:text-4xl mb-4">Ready to Get Started?</h2>
              <p className="poppins-regular text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                Get expert compliance support without the £40k+ salary. Contact us today for a free assessment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={() => setShowContactModal(true)}
                  className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-semibold shadow-xl px-8 py-6 text-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us Now
                </Button>
                <Button
                  onClick={() => window.location.href = '/quiz'}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white text-white poppins-semibold px-8 py-6 text-lg"
                >
                  Take Free Quiz
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm poppins-medium">24hr response</span>
                </div>
                <div className="w-px h-6 bg-white/30 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5" />
                  <span className="text-sm poppins-medium">100% compliance</span>
                </div>
                <div className="w-px h-6 bg-white/30 hidden sm:block"></div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm poppins-medium">Expert team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-emerald-200">
            <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="poppins-medium text-sm">Back to All Resources</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  )
}
