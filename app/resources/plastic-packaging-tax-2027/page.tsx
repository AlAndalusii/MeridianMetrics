"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, XCircle, Calculator, Zap, BarChart3, Calendar, FileText, AlertTriangle } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"

export default function PlasticPackagingTax2027() {
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 border border-amber-200 mb-4">
              <span className="poppins-semibold text-xs text-amber-800 uppercase tracking-wide">Rule Change Alert</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              April 2027 Plastic Packaging Tax Changes: What UK Businesses Need to Know
            </h1>
            <p className="poppins-regular text-lg text-emerald-700">
              Simple breakdown of the new PPT rules and what they mean for your business.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">10 min read</span>
              <span>•</span>
              <span className="poppins-medium">Source: Manufacturing.net, Dec 2025</span>
            </div>
          </div>

          {/* Urgent Alert Banner */}
          <div className="mb-10 rounded-2xl bg-amber-50 border-2 border-amber-300 p-6 flex items-start gap-4">
            <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="poppins-semibold text-lg text-amber-900 mb-1">Action Required Before 1st April 2027</h2>
              <p className="poppins-regular text-amber-800 text-sm leading-relaxed">
                Starting 1st April 2027, the UK government is making two major changes to Plastic Packaging Tax rules. If you make, import, or use plastic packaging, you need to understand what&apos;s changing — and what you need to do before the deadline.
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
          <div className="prose prose-emerald max-w-none">

            {/* The Two Big Changes */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">The Two Big Changes</h2>

              {/* Change 1 */}
              <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white poppins-bold text-sm">1</span>
                  </div>
                  <h3 className="poppins-semibold text-lg text-emerald-900">Chemical Recycling Now Counts <span className="text-emerald-600 text-sm poppins-medium">(Good News)</span></h3>
                </div>
                <p className="poppins-regular text-emerald-800 leading-relaxed mb-3">
                  From April 2027, businesses can count <strong>chemically recycled plastic</strong> toward the 30% recycled content threshold needed to avoid PPT.
                </p>
                <div className="bg-white/80 rounded-lg p-4 mb-3">
                  <p className="poppins-semibold text-sm text-emerald-800 mb-1">What&apos;s chemical recycling?</p>
                  <p className="poppins-regular text-sm text-emerald-700">Normal recycling melts plastic and reshapes it. Chemical recycling breaks plastic down to its basic molecules and rebuilds new plastic from scratch.</p>
                </div>
                <p className="poppins-regular text-sm text-emerald-700">
                  <strong>Why this matters:</strong> Until now, businesses couldn&apos;t prove chemical recycling counted toward PPT. Now they can — if they get proper certification.
                </p>
              </div>

              {/* Change 2 */}
              <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white poppins-bold text-sm">2</span>
                  </div>
                  <h3 className="poppins-semibold text-lg text-red-900">Factory Scraps Don&apos;t Count Anymore <span className="text-red-600 text-sm poppins-medium">(Bad News)</span></h3>
                </div>
                <p className="poppins-regular text-red-800 leading-relaxed mb-3">
                  From April 2027, <strong>pre-consumer waste</strong> (factory scraps, production off-cuts, manufacturing leftovers) will no longer count as recycled content.
                </p>
                <div className="bg-white/80 rounded-lg p-4 mb-3">
                  <p className="poppins-semibold text-sm text-red-800 mb-1">What this means:</p>
                  <p className="poppins-regular text-sm text-red-700">If you currently use factory scraps to reach your 30% target, that won&apos;t work anymore. Only <strong>post-consumer recycled plastic</strong> (from used bottles, bags, packaging) will count.</p>
                </div>
                <p className="poppins-regular text-sm text-red-700">
                  According to Manufacturing.net, this change closes a &ldquo;long-standing loophole&rdquo; that let businesses use their own production waste to avoid the tax.
                </p>
              </div>
            </div>

            {/* Quick Reminder */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Quick Reminder: What Is Plastic Packaging Tax?</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="poppins-regular text-emerald-800 text-sm">If you make or import more than <strong>10 tonnes</strong> of plastic packaging per year, you must register</span>
                </div>
                <div className="flex items-start gap-3">
                  <Calculator className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="poppins-regular text-emerald-800 text-sm">If your packaging contains less than 30% recycled plastic, you pay <strong>£223 per tonne</strong> (2025 rate)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="poppins-regular text-emerald-800 text-sm">If your packaging is <strong>30% or more recycled</strong>, you pay nothing</span>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <p className="poppins-semibold text-sm text-emerald-800 mb-3">Example:</p>
                <div className="space-y-1 text-sm poppins-regular text-emerald-700 mb-3">
                  <p>• You import 50 tonnes of plastic packaging</p>
                  <p>• It&apos;s only 20% recycled plastic</p>
                  <p className="poppins-semibold text-emerald-900">• You pay: 50 tonnes × £223 = <span className="text-red-600">£11,150</span></p>
                </div>
                <p className="poppins-regular text-sm text-emerald-700">But if that same packaging was 30% recycled, you&apos;d pay <strong className="text-emerald-700">£0</strong>. That 30% threshold is everything.</p>
              </div>
            </div>

            {/* Mass Balance */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Understanding the Mass Balance Approach</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-5">
                Mass balance is a tracking system that follows recycled plastic through production — even when it gets mixed with virgin (new) plastic.
              </p>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 mb-5">
                <p className="poppins-semibold text-sm text-emerald-800 mb-3">How it works:</p>
                <div className="space-y-2">
                  {[
                    "A factory receives 30 tonnes of recycled plastic waste",
                    "They process it and mix it with 70 tonnes of virgin plastic",
                    "The mass balance system tracks that 30% of all output came from recycled sources",
                    "The company gets certification proving this",
                    "They can count that 30% toward their PPT threshold",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs poppins-bold">{i + 1}</span>
                      </div>
                      <span className="poppins-regular text-sm text-emerald-800">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-sm text-amber-900 mb-1">Why this matters now:</p>
                <p className="poppins-regular text-sm text-amber-800">Chemical recycling couldn&apos;t be tracked this way before. From April 2027, it can — but you need <strong>PPT-MBA (Mass Balance Approach) certification</strong>. Without certification, chemical recycling still won&apos;t count.</p>
              </div>
            </div>

            {/* What Counts */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">What Counts as &ldquo;Recycled Content&rdquo; After April 2027?</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5">
                  <p className="poppins-semibold text-emerald-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    What WILL count
                  </p>
                  <ul className="space-y-2">
                    <li className="poppins-regular text-sm text-emerald-700">
                      <strong>Post-consumer recycled plastic</strong> — from bottles, bags, containers, packaging that people used and threw away
                    </li>
                    <li className="poppins-regular text-sm text-emerald-700">
                      <strong>Chemically recycled plastic</strong> — but only with proper PPT-MBA certification and traceable records
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl bg-red-50 border border-red-200 p-5">
                  <p className="poppins-semibold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    What WON&apos;T count
                  </p>
                  <ul className="space-y-2">
                    <li className="poppins-regular text-sm text-red-700">
                      <strong>Pre-consumer waste</strong> — factory scraps, production off-cuts, manufacturing leftovers, regrind material
                    </li>
                    <li className="poppins-regular text-sm text-red-700">
                      <strong>Uncertified chemical recycling</strong> — even if it&apos;s genuinely recycled, no certification = doesn&apos;t count
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How This Affects Different Businesses */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">How This Affects Different Businesses</h2>

              {/* Factory Scraps users */}
              <div className="mb-6">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">If You Currently Use Factory Scraps</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
                    <p className="poppins-semibold text-sm text-emerald-800 mb-2">Before April 2027</p>
                    <div className="space-y-1 text-sm poppins-regular text-emerald-700">
                      <p>25% post-consumer recycled plastic</p>
                      <p>5% factory scraps/off-cuts</p>
                      <p className="poppins-semibold text-emerald-800 pt-1">Total: 30% ✓ (avoids tax)</p>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                    <p className="poppins-semibold text-sm text-red-800 mb-2">After April 2027</p>
                    <div className="space-y-1 text-sm poppins-regular text-red-700">
                      <p>25% post-consumer recycled plastic ✓</p>
                      <p>5% factory scraps ✗ (doesn&apos;t count)</p>
                      <p className="poppins-semibold text-red-800 pt-1">Total: Only 25% — you&apos;ll pay tax</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5 mb-4">
                  <p className="poppins-semibold text-sm text-amber-900 mb-2">Example cost impact:</p>
                  <div className="space-y-1 text-sm poppins-regular text-amber-800">
                    <p>• You use 100 tonnes of plastic packaging per year</p>
                    <p>• Currently 30% recycled (15% post-consumer + 15% factory scraps)</p>
                    <p>• From April 2027: Only 15% will count</p>
                    <p className="poppins-semibold text-red-700 pt-1">Tax liability: 100 tonnes × £223 = £22,300 per year</p>
                  </div>
                </div>

                <p className="poppins-semibold text-sm text-emerald-800 mb-2">What to do:</p>
                <ul className="space-y-2">
                  {[
                    "Calculate exactly how much of your current '30%' is factory scraps",
                    "Find suppliers selling post-consumer recycled plastic to make up the difference",
                    "Or consider chemical recycling (with certification)",
                    "Or budget for paying the tax",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                      <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical recycling users */}
              <div className="mb-6 pt-6 border-t border-emerald-100">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">If You Want to Use Chemical Recycling</h3>
                <p className="poppins-semibold text-sm text-emerald-800 mb-2">Requirements from April 2027:</p>
                <ul className="space-y-2 mb-4">
                  {[
                    "Certification under PPT-MBA standards",
                    "Traceable records from plastic waste collection through to finished packaging",
                    "Supply chain documentation showing where recycled material came from",
                    "Regular audits to maintain certification",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                  <p className="poppins-semibold text-sm text-amber-900 mb-1">Timeline to set this up:</p>
                  <p className="poppins-regular text-sm text-amber-800">Most businesses need 6–12 months to find certified suppliers, set up tracking systems, and complete initial certification. <strong>Start now if you&apos;re planning to use this route.</strong></p>
                </div>
              </div>

              {/* Importers */}
              <div className="pt-6 border-t border-emerald-100">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">If You Import Packaging</h3>
                <p className="poppins-semibold text-sm text-emerald-800 mb-2">Critical questions to ask your suppliers today:</p>
                <ul className="space-y-2 mb-4">
                  {[
                    '"What percentage of this packaging is recycled plastic?"',
                    '"Is it post-consumer recycled or factory scraps?"',
                    '"Will it still meet the 30% threshold under April 2027 rules?"',
                    '"Do you have PPT-MBA certification for any chemical recycling?"',
                    '"Can you provide documentation proving recycled content?"',
                  ].map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                      <span className="poppins-regular text-sm text-emerald-800 italic">{q}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                  <p className="poppins-semibold text-sm text-red-900 mb-1">Warning:</p>
                  <p className="poppins-regular text-sm text-red-800">Your supplier might say &ldquo;30% recycled content&rdquo; but if most of it is factory scraps, you&apos;ll be non-compliant from April 2027 — with unexpected tax bills for packaging you&apos;ve already ordered.</p>
                </div>
              </div>
            </div>

            {/* What the Government Says */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-2">What the Government Says</h3>
                  <p className="poppins-regular text-amber-800 leading-relaxed mb-3">
                    According to government guidance, these changes will &ldquo;level the playing field between firms&rdquo; and ensure recycled content reflects &ldquo;genuine post-consumer or chemically recycled material&rdquo;, strengthening the &ldquo;environmental integrity of the tax.&rdquo;
                  </p>
                  <p className="poppins-semibold text-amber-900">
                    The message is clear: Using your own factory waste isn&apos;t real recycling. Only genuinely recycled plastic counts.
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Timeline: Action Steps by Date
              </h2>

              <div className="space-y-6">
                {/* Now - Dec 2026 */}
                <div className="relative pl-8 border-l-2 border-emerald-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white shadow" />
                  <p className="poppins-bold text-emerald-800 mb-3">Now — December 2026</p>
                  <ul className="space-y-2">
                    {[
                      "Audit your current packaging — how much is post-consumer vs. factory scraps?",
                      "Contact all packaging suppliers and ask the 5 questions above",
                      "Calculate financial impact if you drop below 30%",
                      "Explore post-consumer recycled plastic suppliers and chemical recycling options",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Jan - Mar 2027 */}
                <div className="relative pl-8 border-l-2 border-amber-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow" />
                  <p className="poppins-bold text-amber-800 mb-3">January — March 2027</p>
                  <ul className="space-y-2">
                    {[
                      "Switch to suppliers with verified post-consumer recycled content",
                      "OR set up chemical recycling certification (if using that route)",
                      "Update contracts to reflect new requirements",
                      "Ensure record-keeping systems are ready to prove recycled content sources",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 1 April 2027 */}
                <div className="relative pl-8 border-l-2 border-red-300">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow" />
                  <p className="poppins-bold text-red-800 mb-3">1st April 2027 — New rules take effect</p>
                  <ul className="space-y-2">
                    {[
                      "Factory scraps no longer count as recycled content",
                      "Chemical recycling counts — but only with PPT-MBA certification",
                      "Documentation proving all recycled content sources required",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow" />
                  <p className="poppins-bold text-emerald-700 mb-3">After April 2027 — Ongoing compliance</p>
                  <ul className="space-y-2">
                    {[
                      "Keep detailed records of all packaging",
                      "Maintain certification (if using chemical recycling)",
                      "Prepare for potential HMRC audits",
                      "Annual PPT returns with new documentation requirements",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Questions */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">Common Questions</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-2">&ldquo;Can I stockpile packaging before April 2027?&rdquo;</h3>
                  <p className="poppins-regular text-sm text-emerald-800 leading-relaxed mb-2">
                    Technically yes — packaging manufactured before April 2027 can use the old rules. But consider storage costs, product shelf life, and the fact that this only buys time — not a long-term solution.
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-100">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-3">&ldquo;Is it cheaper to just pay the tax?&rdquo;</h3>
                  <p className="poppins-regular text-sm text-emerald-800 mb-3">Maybe. Do the maths for your situation:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
                      <p className="poppins-semibold text-sm text-emerald-800 mb-2">Small importer example</p>
                      <div className="space-y-1 text-sm poppins-regular text-emerald-700">
                        <p>15 tonnes/year packaging</p>
                        <p>Currently 28% recycled (2% scraps)</p>
                        <p>Tax if no change: <span className="poppins-semibold">£3,345/year</span></p>
                        <p>Cost to find 4% more post-consumer: <span className="poppins-semibold">~£500–1,000/year</span></p>
                        <p className="poppins-semibold text-emerald-800 pt-1">→ Find more recycled plastic</p>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                      <p className="poppins-semibold text-sm text-amber-800 mb-2">Large manufacturer example</p>
                      <div className="space-y-1 text-sm poppins-regular text-amber-700">
                        <p>500 tonnes/year packaging</p>
                        <p>Currently 30% (20% scraps, 10% post-consumer)</p>
                        <p>Tax if no change: <span className="poppins-semibold">£111,500/year</span></p>
                        <p>Cost to redesign sourcing: <span className="poppins-semibold">~£50k one-time + £20k/year</span></p>
                        <p className="poppins-semibold text-amber-800 pt-1">→ Redesign sourcing</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-emerald-100">
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-2">&ldquo;What if my supplier lies about recycled content?&rdquo;</h3>
                  <p className="poppins-regular text-sm text-emerald-800 leading-relaxed mb-3">
                    <strong>You&apos;re still liable.</strong> HMRC can audit you and demand proof. If you can&apos;t provide documentation showing genuine post-consumer or certified chemical recycling, you&apos;ll pay the tax retroactively, face penalties, and potentially deal with fraud investigations.
                  </p>
                  <p className="poppins-semibold text-sm text-emerald-800 mb-2">Protect yourself:</p>
                  <ul className="space-y-1">
                    {[
                      "Get written confirmation from suppliers",
                      "Request third-party certification",
                      "Keep detailed records",
                      "Consider independent verification",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Takeaways */}
            <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-5">Key Takeaways</h2>
              <ul className="space-y-3">
                {[
                  "April 2027 = major PPT rule changes",
                  "Factory scraps won't count as recycled anymore",
                  "Chemical recycling will count — but only with PPT-MBA certification",
                  "Most businesses using factory scraps will need to adapt",
                  "Start planning now — you have just over a year",
                  "Calculate your exposure before it's too late",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-emerald-800">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 sm:p-8 text-white mb-8">
              <h2 className="poppins-semibold text-2xl mb-4">Need help calculating your April 2027 exposure?</h2>
              <div className="space-y-4 mb-6 text-sm poppins-regular">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="poppins-bold text-white text-xs">1</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-white mb-0.5">Take our free PPT Gap Analyser</p>
                    <p className="text-emerald-200">Check if you&apos;ll meet 30% under new rules, calculate potential tax liability, and get personalised recommendations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="poppins-bold text-white text-xs">2</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-white mb-0.5">Book a Plastic Packaging Tax Audit</p>
                    <p className="text-emerald-200">Calculate exact recycled content under new rules, identify compliance gaps, find supplier alternatives, and prepare documentation systems.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button
                  asChild
                  className="poppins-semibold bg-white hover:bg-emerald-50 text-emerald-700 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/ppt-gap-analyser">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Take the Free PPT Gap Analyser
                  </Link>
                </Button>
                <a
                  href={`mailto:hello@milestonecompliance.co.uk?subject=PPT April 2027 Changes - Help Needed&body=Hello Milestone Compliance,%0D%0A%0D%0AI would like to discuss how the April 2027 PPT changes affect my business.%0D%0A%0D%0AName: %0D%0ACompany: %0D%0AApprox. annual plastic packaging volume (tonnes): %0D%0ACurrent recycled content %25 (approx.): %0D%0A%0D%0AThank you.`}
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white poppins-semibold shadow-xl px-6 py-3 rounded-md inline-flex items-center justify-center transition-all duration-300"
                >
                  Book a Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

          </div>

          {/* Author / Source */}
          <div className="mt-12 pt-8 border-t border-emerald-100">
            <p className="poppins-regular text-sm text-emerald-600">
              Published: February 2026 | Source: Manufacturing.net — &ldquo;Chemical recycling becomes tax-eligible for UK packaging from 2027&rdquo; (December 5, 2025)
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
