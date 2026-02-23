"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, XCircle, Calculator, Zap, BarChart3, FileText, AlertTriangle, Shield, Phone } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"

export default function PPTHMRCAuditMistakes() {
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
                asChild
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]">
                <Link href="/ppt-gap-analyser">Free PPT Assessment</Link>
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 border border-red-200 mb-4">
              <span className="poppins-semibold text-xs text-red-800 uppercase tracking-wide">HMRC Audit Risk</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              5 Common Plastic Packaging Tax Mistakes That Will Trigger an HMRC Audit
            </h1>
            <p className="poppins-regular text-lg text-emerald-700">
              If you&apos;re a UK business importing or manufacturing plastic packaging, the Plastic Packaging Tax is on HMRC&apos;s radar — and so are you. Here are the five mistakes that consistently get businesses caught out.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">12 min read</span>
            </div>
          </div>

          {/* Urgent Alert Banner */}
          <div className="mb-10 rounded-2xl bg-red-50 border-2 border-red-200 p-6 flex items-start gap-4">
            <AlertTriangle className="w-7 h-7 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="poppins-semibold text-lg text-red-900 mb-1">HMRC Is Actively Auditing PPT Registrants</h2>
              <p className="poppins-regular text-red-800 text-sm leading-relaxed">
                Since April 2022, HMRC has been systematically auditing businesses to ensure compliance with the 10-tonne threshold and 30% recycled content requirements. Most businesses don&apos;t realise they&apos;ve crossed into taxable territory until HMRC sends the audit letter — by then you&apos;re facing backdated tax bills, penalties up to 100% of unpaid tax, and potential interest charges dating back years.
              </p>
            </div>
          </div>

          {/* PPT Gap Analyser Featured Tool */}
          <div className="mb-10 rounded-3xl bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 overflow-hidden shadow-2xl shadow-green-900/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 p-7 sm:p-9">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="10"
                      strokeDasharray="314" strokeDashoffset="31" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="poppins-black text-2xl text-white leading-none">90</span>
                    <span className="text-green-300 poppins-medium text-xs">/100</span>
                  </div>
                </div>
                <span className="poppins-semibold text-xs text-green-300 mt-2 text-center">AI Compliance Score</span>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/30 border border-green-400/40 mb-3">
                  <Zap className="w-3 h-3 text-green-300" />
                  <span className="poppins-semibold text-xs text-green-200 uppercase tracking-wide">Featured Tool — Free</span>
                </div>
                <h2 className="poppins-bold text-white text-xl sm:text-2xl mb-2 leading-tight">
                  PPT Gap Analyser
                </h2>
                <p className="poppins-regular text-green-200 text-sm leading-relaxed mb-4 max-w-xl">
                  Answer 10 questions and our Gemini AI scores your PPT compliance 0–100, identifies your top 3 HMRC risk areas, and emails you a personalised action plan — in under 3 minutes.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs text-green-300 mb-5">
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Under 3 minutes</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Powered by Gemini AI</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Free · Results emailed</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />0–100 scoring</div>
                </div>
                <Link
                  href="/ppt-gap-analyser"
                  className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group text-sm"
                >
                  <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Check My PPT Compliance
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-emerald max-w-none space-y-8">

            {/* Mistake 1 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="poppins-black text-white text-sm">1</span>
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl leading-tight">
                  Calculating the 10-Tonne Threshold Incorrectly (The &quot;Just Under&quot; Trap)
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-red-800 mb-2">The Mistake</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed">
                    Businesses assume the 10-tonne threshold applies to finished goods only — so they ignore components, transit packaging, and imported packaging. They calculate 9.8 tonnes and think they&apos;re safe.
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">The Reality</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed mb-3">
                    HMRC counts <strong>all</strong> plastic packaging you&apos;re responsible for in a 12-month rolling period, including:
                  </p>
                  <div className="space-y-2">
                    {[
                      "Finished product packaging you manufacture",
                      "Imported packaging (even if filled overseas)",
                      "Components supplied to other manufacturers",
                      "Transit packaging between your facilities",
                      "Unfilled packaging held in stock",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-5">
                  <p className="poppins-semibold text-sm text-amber-900 mb-1">Real example</p>
                  <p className="poppins-regular text-sm text-amber-800 leading-relaxed">
                    A Manchester e-commerce business calculated 8 tonnes of mailer bags. HMRC audit revealed they&apos;d imported 3 tonnes of protective bubble wrap and held 1.5 tonnes of seasonal stock. Total: 12.5 tonnes. Backdated liability: <strong>£3,125 plus penalties.</strong>
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-red-800 mb-2">Why HMRC Targets This</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed mb-3">
                    HMRC cross-references your PPT declaration against:
                  </p>
                  <div className="space-y-2">
                    {[
                      "Import records (if you bring packaging from EU/Asia)",
                      "Waste transfer notes (showing packaging volumes disposed)",
                      "Purchase orders to packaging suppliers",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-1" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="poppins-regular text-sm text-emerald-700 mt-3 italic">
                    If your tonnage seems suspiciously close to 9.9 tonnes year after year, expect an audit.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-2">How to Avoid</h3>
                  <p className="poppins-regular text-sm text-emerald-800 leading-relaxed">
                    Use the <strong>rolling 12-month calculation method.</strong> On the 1st of each month, total the previous 12 months&apos; packaging. If you breach 10 tonnes, you have 30 days to register for PPT. Don&apos;t wait until year-end — you could owe tax from the month you crossed the threshold.
                  </p>
                </div>
              </div>
            </div>

            {/* Mistake 2 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="poppins-black text-white text-sm">2</span>
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl leading-tight">
                  Claiming Recycled Content Without Proper Evidence (The &quot;Supplier Said So&quot; Defence)
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-red-800 mb-2">The Mistake</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed">
                    A business orders packaging from a supplier who states &quot;30% recycled content&quot; on the invoice. They claim the exemption and pay no tax. HMRC audits them 18 months later and rejects the claim because there&apos;s no independent verification.
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">The Reality</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">HMRC requires one of these evidence types:</p>
                  <div className="space-y-3">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">Option A: Mass Balance Certification</p>
                      <p className="poppins-regular text-sm text-emerald-800">Third-party audit trail showing recycled content throughout supply chain. Accepted certifications: ISCC PLUS, REDcert, RSB.</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">Option B: Sampling &amp; Testing</p>
                      <p className="poppins-regular text-sm text-emerald-800">Laboratory analysis of packaging samples. FTIR spectroscopy or similar methods. Test reports from UKAS-accredited labs.</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">Option C: Direct Production Records</p>
                      <p className="poppins-regular text-sm text-emerald-800">If you manufacture packaging in-house: production run records showing virgin vs recycled resin input, and monthly reconciliation reports.</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="poppins-semibold text-sm text-red-800">A supplier invoice alone is NOT sufficient.</p>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-5">
                  <p className="poppins-semibold text-sm text-amber-900 mb-1">Real example</p>
                  <p className="poppins-regular text-sm text-amber-800 leading-relaxed">
                    A Birmingham fulfilment company claimed £18,000 recycled content exemption based on supplier statements. HMRC demanded mass balance certificates. Supplier couldn&apos;t provide them. Company paid <strong>£18,000 tax + £9,000 penalty + interest.</strong>
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">How to Avoid</h3>
                  <div className="space-y-2">
                    {[
                      "Request mass balance certificate from supplier (ISCC PLUS or equivalent)",
                      "If supplier can't provide one, commission independent lab testing (£200–400 per SKU)",
                      "Store evidence for 6 years minimum",
                      "Include certificate reference numbers in your quarterly PPT returns",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="poppins-regular text-sm text-emerald-700 mt-3 italic">
                    If you&apos;ve already claimed exemptions without evidence, file a voluntary disclosure now before HMRC audits you. Penalties drop from 100% to 0–30% if you self-correct.
                  </p>
                </div>
              </div>
            </div>

            {/* Mid-article CTA */}
            <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                  <Zap className="w-3 h-3 text-white mr-2" />
                  <span className="text-xs poppins-semibold text-white uppercase tracking-wide">Free Tool</span>
                </div>
                <h3 className="poppins-bold text-2xl sm:text-3xl mb-3">Are you an audit risk right now?</h3>
                <p className="poppins-regular text-emerald-50 mb-6 text-base leading-relaxed">
                  Our free 3-minute assessment checks your PPT compliance across all 5 risk areas and tells you exactly where you stand — before HMRC does.
                </p>
                <Link
                  href="/ppt-gap-analyser"
                  className="inline-flex items-center gap-2 poppins-bold bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-sm"
                >
                  Check My PPT Compliance
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Mistake 3 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="poppins-black text-white text-sm">3</span>
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl leading-tight">
                  Ignoring Import Liability (The &quot;It&apos;s Not My Problem&quot; Assumption)
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-red-800 mb-2">The Mistake</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed">
                    A UK business imports packaging filled with product from China. They assume PPT is the supplier&apos;s responsibility because the packaging was manufactured overseas.
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">The Reality</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed mb-3">
                    If you import finished packaged goods or unfilled packaging into the UK, <strong>YOU are liable for PPT</strong> — even if you never manufactured or filled the packaging yourself.
                  </p>
                  <p className="poppins-regular text-sm text-emerald-700 mb-3">This catches out:</p>
                  <div className="space-y-1.5 mb-4">
                    {[
                      "E-commerce businesses importing from Alibaba/AliExpress",
                      "Retailers importing own-brand products",
                      "Distributors bringing EU stock into GB post-Brexit",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="poppins-regular text-sm text-emerald-700 mb-2">You&apos;re the &quot;importer&quot; if:</p>
                  <div className="space-y-1.5">
                    {[
                      "You're named on the customs declaration",
                      "You hold the EORI number used for import",
                      "You own the goods when they cross the UK border",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-5">
                  <p className="poppins-semibold text-sm text-amber-900 mb-1">Real example</p>
                  <p className="poppins-regular text-sm text-amber-800 leading-relaxed">
                    A London cosmetics distributor imported 15 tonnes of plastic bottles from Italy (filled with product). They thought PPT only applied to UK manufacturers. HMRC audit: <strong>£45,000 backdated tax + penalties.</strong>
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">How to Avoid</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">1</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">Review all imports in the last 12 months — check customs declarations for HS codes 3923 (plastic packaging) and total the weight.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">2</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">Register for PPT if you&apos;ve imported 10+ tonnes.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">3</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">For future imports, request a Certificate of Tax Paid from overseas suppliers. If they haven&apos;t paid (rare for non-UK suppliers), YOU owe the tax.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">4</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">Factor PPT (£200/tonne for non-recycled packaging) into landed cost calculations — it adds approximately 2–5% to import costs depending on packaging weight.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mistake 4 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="poppins-black text-white text-sm">4</span>
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl leading-tight">
                  Failing to Keep Adequate Records (The &quot;I&apos;ll Remember&quot; Trap)
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-red-800 mb-2">The Mistake</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed">
                    A business registers for PPT, files quarterly returns, but doesn&apos;t maintain a proper audit trail. When HMRC requests records 2 years later, they piece together invoices, emails, and spreadsheets — but can&apos;t reconcile figures. HMRC assesses &quot;best judgement&quot; tax, which is always higher than actual liability.
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">Mandatory Records You Must Keep for 6 Years</h3>
                  <div className="space-y-2">
                    {[
                      "Weight of all plastic packaging (manufactured, imported, unfilled supplied)",
                      "Recycled content percentage for each component",
                      "Evidence supporting recycled content claims (certificates, test reports)",
                      "Import/export documentation",
                      "Purchase orders and supplier invoices showing packaging specifications",
                      "Waste transfer notes (to cross-check disposed packaging volumes)",
                      "Quarterly calculation worksheets",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="poppins-regular text-xs text-emerald-600 mt-3">
                    Format: Digital or paper is acceptable, but must be produceable within 30 days of HMRC request.
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">How to Set Up a PPT Record System</h3>
                  <div className="space-y-3">
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">Option 1: Manual Spreadsheet (Small volumes)</p>
                      <p className="poppins-regular text-sm text-emerald-800">Monthly log: Date | Supplier | Product Code | Tonnage | Recycled % | Certificate Ref. Include a running 12-month total and a folder of supporting certificates/invoices.</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">Option 2: Automated System (10+ SKUs or 50+ tonnes/year)</p>
                      <p className="poppins-regular text-sm text-emerald-800">Integrate with procurement software to auto-extract packaging weight from purchase orders, link to a certificate database, and generate quarterly return data automatically.</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">Option 3: Outsource to Compliance Specialist (100+ tonnes/year)</p>
                      <p className="poppins-regular text-sm text-emerald-800">Submit invoices/import docs monthly. Compliance team maintains records, files returns, and provides HMRC audit defence.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                  <p className="poppins-semibold text-sm text-red-900 mb-1">Red flag to HMRC</p>
                  <p className="poppins-regular text-sm text-red-800">Businesses that file identical tonnage every quarter (e.g., exactly 2.5 tonnes Q1–Q4). It suggests estimates rather than actual records. Expect an audit.</p>
                </div>
              </div>
            </div>

            {/* Mistake 5 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="poppins-black text-white text-sm">5</span>
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl leading-tight">
                  Misunderstanding the &quot;Unfilled Packaging&quot; Export Exemption (The &quot;We Ship Overseas&quot; Loophole)
                </h2>
              </div>
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-red-800 mb-2">The Mistake</h3>
                  <p className="poppins-regular text-emerald-800 leading-relaxed">
                    A UK manufacturer produces plastic bottles and exports them unfilled to an EU customer. They claim full PPT exemption, assuming all exports are exempt. HMRC audits them and denies the exemption.
                  </p>
                </div>

                <div className="mb-5">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">The Reality</h3>
                  <p className="poppins-regular text-emerald-800 mb-3">The export exemption <strong>only</strong> applies if:</p>
                  <div className="space-y-1.5 mb-4">
                    {[
                      "Packaging is exported unfilled and unused",
                      "You have proof of export (customs declaration, shipping docs)",
                      "The packaging leaves the UK before being filled or used",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="poppins-regular text-emerald-800 mb-3">What <strong>doesn&apos;t</strong> qualify:</p>
                  <div className="space-y-1.5">
                    {[
                      "Packaging exported filled with product (you owe PPT)",
                      "Packaging exported to your own overseas facility for filling (you still owe PPT unless you prove it never returns to UK)",
                      "Packaging exported but later re-imported filled (you owe PPT on import)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 mb-5">
                  <p className="poppins-semibold text-sm text-amber-900 mb-1">Real example</p>
                  <p className="poppins-regular text-sm text-amber-800 leading-relaxed">
                    A Sheffield manufacturer exported 12 tonnes of plastic caps to Ireland. The Irish customer filled them and sold products back into the UK. HMRC ruled: No exemption. Manufacturer owed PPT because packaging was ultimately used for UK supply.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">How to Avoid (For Genuine Exports)</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">1</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">Obtain export declaration from your freight forwarder showing HS code 3923.xx (plastic packaging) and &quot;unfilled&quot; status. Keep copy for 6 years.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">2</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">Get a signed customer declaration confirming packaging will be used exclusively outside the UK and will not be re-imported in filled form.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-white text-xs poppins-bold">3</span></div>
                      <span className="poppins-regular text-sm text-emerald-800">Track re-imports quarterly. If any packaging returns to the UK (e.g., returned products), you owe PPT on that tonnage.</span>
                    </div>
                  </div>
                  <p className="poppins-regular text-xs text-emerald-700 mt-3 italic">
                    Complex supply chains (manufacturing in UK, filling overseas, selling back to UK): you likely owe PPT upfront on manufacture. Seek specialist advice — HMRC&apos;s interpretation is strict.
                  </p>
                </div>
              </div>
            </div>

            {/* What Happens If You're Audited */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">What Happens If You&apos;re Audited?</h2>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  { period: "Week 1–2", title: "Information Request", desc: "HMRC requests 12–24 months of records with a 30-day response deadline. Extending the deadline makes you look guilty — respond on time." },
                  { period: "Week 3–6", title: "Review Period", desc: "HMRC analyses submissions, identifies discrepancies (tonnage gaps, missing certificates), and may request additional evidence." },
                  { period: "Week 7–8", title: "Assessment", desc: "HMRC issues preliminary findings, states additional tax owed plus penalty calculation, and gives 30 days to dispute." },
                  { period: "Week 9–12", title: "Resolution", desc: "Accept: pay tax + penalties + interest. Dispute: provide counter-evidence or request internal review. Worst case: Tax tribunal (6–18 months, legal costs £10K+)." },
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-20 text-right">
                      <span className="poppins-semibold text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">{step.period}</span>
                    </div>
                    <div className="flex-1 pb-4 border-b border-emerald-100 last:border-0 last:pb-0">
                      <p className="poppins-semibold text-sm text-emerald-900 mb-1">{step.title}</p>
                      <p className="poppins-regular text-sm text-emerald-800 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                <h3 className="poppins-semibold text-base text-red-900 mb-3">Typical Penalties</h3>
                <div className="space-y-2">
                  {[
                    { label: "Inaccurate return (unintentional)", value: "30% of unpaid tax" },
                    { label: "Deliberate understatement", value: "70% of unpaid tax" },
                    { label: "Deliberate + concealment", value: "100% of unpaid tax" },
                    { label: "Voluntary disclosure before audit", value: "0–30% (massive reduction)" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="poppins-regular text-red-800">{item.label}</span>
                      <span className={`poppins-semibold ml-4 ${i === 3 ? "text-emerald-700" : "text-red-700"}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audit-Proof Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">How to Audit-Proof Your PPT Compliance</h2>
              </div>

              <div className="mb-6">
                <h3 className="poppins-semibold text-base text-emerald-900 mb-3">Quarterly PPT Health Check</h3>
                <p className="poppins-regular text-sm text-emerald-700 mb-3">Every 3 months, review:</p>
                <div className="space-y-2">
                  {[
                    "Rolling 12-month tonnage (are you close to the 10-tonne threshold?)",
                    "Certificate renewals (ISCC PLUS certs expire annually)",
                    "Import records (any new packaging sources?)",
                    "Return accuracy (does declared tonnage match supplier invoices?)",
                    "Payment status (late payments trigger penalties automatically)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                <h3 className="poppins-semibold text-base text-amber-900 mb-3">Red Flags HMRC Looks For</h3>
                <div className="space-y-2">
                  {[
                    "Tonnage consistently just under 10 tonnes (suggests manipulation)",
                    "100% recycled content claims without strong evidence",
                    "Large import volumes with no PPT registration",
                    "Quarterly returns with round numbers (suggests estimates, not actuals)",
                    "Late filings or missed payments",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-amber-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost comparison */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">The Cost of Getting It Wrong vs Prevention</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-5 border border-red-100">
                  <h3 className="poppins-semibold text-base text-red-900 mb-3">Cost of Getting It Wrong</h3>
                  <div className="space-y-2">
                    {[
                      "Backdated tax: £200/tonne × tonnage × years",
                      "Penalties: 30–100% of unpaid tax",
                      "Interest: Bank base rate + 2.5% compounded",
                      "Legal costs if disputing: £10K–50K",
                      "Reputational damage (HMRC publishes deliberate defaulters)",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-red-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">Cost of Prevention</h3>
                  <div className="space-y-2">
                    {[
                      "PPT compliance audit: £500–1,500 (one-time)",
                      "Ongoing quarterly management: £150–400/quarter",
                      "Specialist defence if audited: £2K–5K",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* HMRC Is Getting Smarter */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-bold text-2xl text-emerald-900 mb-4">Final Thought: HMRC Is Getting Smarter</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                HMRC now uses data analytics to identify PPT non-compliance:
              </p>
              <div className="space-y-2 mb-5">
                {[
                  "Cross-referencing VAT returns (packaging purchases) vs PPT declarations",
                  "Matching import records (plastic packaging codes) to PPT registrations",
                  "Flagging businesses with packaging suppliers but no PPT registration",
                  "Comparing industry benchmarks (e.g., e-commerce packaging ratios per order)",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                  </div>
                ))}
              </div>
              <p className="poppins-semibold text-emerald-900 leading-relaxed">
                The audit net is tightening. If you&apos;re not compliant, it&apos;s not &quot;if&quot; HMRC finds you — it&apos;s &quot;when.&quot;
              </p>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Shield className="w-4 h-4 text-white mr-2" />
                  <span className="text-sm poppins-semibold text-white uppercase tracking-wide">Audit-Proof Your Business</span>
                </div>
                <h2 className="poppins-bold text-3xl sm:text-4xl mb-4">
                  Find out if you&apos;re at risk — in 3 minutes
                </h2>
                <p className="poppins-regular text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                  Our free PPT Gap Analyser checks all five risk areas covered in this article and identifies exactly where your compliance gaps are — before HMRC does.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    href="/ppt-gap-analyser"
                    className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-sm"
                  >
                    <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Start Free PPT Assessment
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={`mailto:hello@millstonecompliance.com?subject=PPT Compliance Help&body=Hello Millstone Compliance,%0D%0A%0D%0AI would like to discuss Plastic Packaging Tax compliance assistance.%0D%0A%0D%0AName: %0D%0ACompany: %0D%0AWhat I need help with: %0D%0A%0D%0APreferred contact date and time: %0D%0A%0D%0AThank you.`}
                    className="border-2 border-white text-white hover:bg-white/10 poppins-semibold bg-transparent px-8 py-4 rounded-xl inline-flex items-center justify-center transition-all duration-300 text-sm"
                  >
                    Or Contact Us via Email
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/20">
                  {[
                    { icon: CheckCircle, text: "Under 3 minutes" },
                    { icon: Shield, text: "HMRC-compliant" },
                    { icon: Zap, text: "Instant results" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="poppins-medium text-sm text-emerald-50">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HMRC Audit Notice CTA */}
            <div className="rounded-2xl bg-red-50 border-2 border-red-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                <Phone className="w-7 h-7 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="poppins-bold text-lg text-red-900 mb-1">Already received an HMRC audit notice?</h3>
                <p className="poppins-regular text-sm text-red-800 leading-relaxed mb-4">
                  We provide specialist defence services and penalty mitigation. Contact us for urgent support.
                </p>
                <a
                  href={`mailto:hello@millstonecompliance.com?subject=URGENT: HMRC PPT Audit Notice&body=Hello Millstone Compliance,%0D%0A%0D%0AI have received an HMRC audit notice and require urgent assistance.%0D%0A%0D%0AName: %0D%0ACompany: %0D%0AAudit notice date: %0D%0AHMRC response deadline: %0D%0A%0D%0APlease contact me as soon as possible.%0D%0A%0D%0AThank you.`}
                  className="inline-flex items-center gap-2 poppins-semibold bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Contact Us for Urgent Support
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Author Bio */}
          <div className="mt-12 pt-8 border-t border-emerald-100">
            <p className="poppins-regular text-sm text-emerald-600">
              Last updated: February 2026 | Based on HMRC PPT guidance and enforcement activity data
            </p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-white to-emerald-50/50 border-t border-emerald-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>
          <p className="poppins-regular text-emerald-600 text-sm">
            © {new Date().getFullYear()} Millstone Compliance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
