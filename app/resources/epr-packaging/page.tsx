"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Recycle,
  Package,
  Calculator,
  Calendar,
  BadgeCheck,
  Zap,
  BarChart3,
  Lightbulb,
  TrendingDown,
  ClipboardList,
  Building2,
  Mail,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"
import Footer from "@/components/Footer"
import { useBooking } from "@/components/BookingProvider"

export default function EPRPackagingGuide() {
  const { openBooking } = useBooking()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                asChild
                className="hidden lg:flex poppins-semibold bg-blue-700 hover:bg-blue-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]">
                <Link href="/epr-gap-analyser">Free EPR Assessment</Link>
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back Button */}
          <Link href="/resources" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          {/* Article Header */}
          <div className="mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
              <span className="poppins-semibold text-xs text-blue-800 uppercase tracking-wide">Plain English Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-blue-900 mb-4 leading-tight">
              EPR Packaging — What It Is, Whether It Affects You, and What to Do Next
            </h1>
            <p className="poppins-regular text-lg text-blue-700 leading-relaxed">
              If you&apos;ve heard the term &quot;EPR&quot; thrown around and had no idea what it means — this guide is for you. No jargon, no waffle. Just the stuff that actually matters for your business.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-blue-600">
              <span className="poppins-medium">Updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">8 min read</span>
            </div>
          </div>

          {/* EPR Gap Analyser CTA — Card */}
          <div className="mb-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 overflow-hidden shadow-2xl shadow-blue-900/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 p-7 sm:p-9">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="10"
                      strokeDasharray="314" strokeDashoffset="63" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="poppins-black text-2xl text-white leading-none">80</span>
                    <span className="text-blue-300 poppins-medium text-xs">/100</span>
                  </div>
                </div>
                <span className="poppins-semibold text-xs text-blue-300 mt-2 text-center">AI Compliance Score</span>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 mb-3">
                  <Zap className="w-3 h-3 text-blue-300" />
                  <span className="poppins-semibold text-xs text-blue-200 uppercase tracking-wide">Featured Tool — Free</span>
                </div>
                <h2 className="poppins-bold text-white text-xl sm:text-2xl mb-2 leading-tight">EPR Gap Analyser</h2>
                <p className="poppins-regular text-blue-200 text-sm leading-relaxed mb-4 max-w-xl">
                  Answer 10 questions and our Gemini AI scores your EPR compliance 0–100, flags your top 3 risk areas, and emails you a personalised action plan — in under 3 minutes.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs text-blue-300 mb-5">
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Under 3 minutes</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Powered by Gemini AI</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Free · Results emailed</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />0–100 scoring</div>
                </div>
                <Link href="/epr-gap-analyser"
                  className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-blue-800 hover:bg-blue-50 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group text-sm">
                  <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Check My EPR Compliance
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="space-y-10">

            {/* Section 1 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-blue-700" />
                </div>
                So… What Actually IS EPR?
              </h2>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-4">
                Okay, let&apos;s make this really simple. Imagine you run a biscuit company. You sell your biscuits in a plastic tray, wrapped in a cardboard box. When your customer finishes the biscuits, they throw away the box and the tray.
              </p>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-4">
                Someone has to deal with all that packaging. Someone has to collect it, sort it, and recycle it. That costs money. In the past, the government (and therefore taxpayers) mostly paid for that. Now the rules have changed.
              </p>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-4">
                <strong>EPR — Extended Producer Responsibility</strong> — is the new regulatory system that says: <em>if your business puts packaging on the UK market, you help pay for the cost of dealing with it</em>.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-xl p-5 mt-4">
                <p className="poppins-semibold text-blue-900 mb-1">The one-line version:</p>
                <p className="poppins-regular text-blue-800">
                  Your packaging generates waste. EPR makes sure the businesses creating that packaging help pay to clean it up.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-blue-700" />
                </div>
                Does This Affect Your Business?
              </h2>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-3">
                Here&apos;s how to know if EPR applies to you. Ask yourself three questions:
              </p>
              <p className="poppins-regular text-blue-700 text-sm leading-relaxed mb-5">
                Government and industry estimates suggest that many tens of thousands of UK businesses are now in scope of packaging EPR — including manufacturers, importers, retailers, and online sellers. If you have more than £1m turnover and handle more than 25 tonnes of packaging, you&apos;re very likely one of them.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  {
                    q: "Does your business make, import, brand, or sell packaged goods in the UK?",
                    hint: "This includes pretty much any product that arrives in any kind of packaging — plastic, cardboard, glass, metal, wood.",
                  },
                  {
                    q: "Does your business have a turnover of more than £1 million per year?",
                    hint: "Businesses below £1m turnover or under 25 tonnes of packaging a year are currently outside the EPR thresholds — but should still track tonnage in case they grow.",
                  },
                  {
                    q: "Does your business handle more than 25 tonnes of packaging per year?",
                    hint: "That sounds like a lot, but for many manufacturers and importers it adds up quickly. One tonne = roughly 1,000 kg. Your answer here also determines whether you're a small or large producer — which affects how often you must report.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white poppins-bold text-xs">{i + 1}</span>
                    </div>
                    <div>
                      <p className="poppins-semibold text-blue-900 text-sm mb-1">{item.q}</p>
                      <p className="poppins-regular text-blue-700 text-xs leading-relaxed">{item.hint}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Small vs Large Producer clarification */}
              <div className="bg-blue-900 rounded-2xl p-5 mb-4">
                <p className="poppins-semibold text-white text-sm mb-3">What type of producer are you?</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="bg-blue-800/60 rounded-xl p-4">
                    <p className="poppins-bold text-blue-200 text-xs uppercase tracking-wide mb-2">Small Producer</p>
                    <p className="poppins-regular text-blue-100 text-xs leading-relaxed mb-2">£1m–£2m turnover <strong>and</strong> 25–50 tonnes of packaging per year</p>
                    <p className="poppins-regular text-blue-300 text-xs">Lighter duties: report once a year, by 1 April.</p>
                  </div>
                  <div className="bg-indigo-800/60 rounded-xl p-4">
                    <p className="poppins-bold text-indigo-200 text-xs uppercase tracking-wide mb-2">Large Producer</p>
                    <p className="poppins-regular text-indigo-100 text-xs leading-relaxed mb-2">≥£2m turnover <strong>and</strong> &gt;50 tonnes of packaging per year</p>
                    <p className="poppins-regular text-indigo-300 text-xs">Full duties: report twice a year (April and October), higher fees.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="poppins-regular text-amber-800 text-sm leading-relaxed">
                    <strong>If you answered yes to all three:</strong> EPR applies to you. Whether you&apos;re a small or large producer changes your reporting frequency and fee level — both are covered in this guide.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-blue-700" />
                </div>
                What Do You Actually Have to Pay?
              </h2>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-4">
                This is where most businesses get confused — and unfortunately, it&apos;s also where most businesses accidentally overpay. Let us break it down simply.
              </p>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-4">
                Your EPR fee is calculated based on the weight of packaging you put on the market each year. But — and this is the big part — it also depends on <strong>what type</strong> of packaging it is and <strong>who ends up with it</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="poppins-semibold text-red-800 text-sm mb-2">Household packaging</p>
                  <p className="poppins-regular text-red-700 text-xs leading-relaxed">Packaging that ends up in people&apos;s homes (e.g. cereal boxes, water bottles, shopping bags). This attracts <strong>higher fees</strong> because councils have to collect and process it.</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="poppins-semibold text-green-800 text-sm mb-2">Non-household packaging</p>
                  <p className="poppins-regular text-green-700 text-xs leading-relaxed">Packaging that stays in businesses — like the pallet wrap around your delivery or the cardboard used in B2B shipments. This attracts <strong>lower fees</strong>.</p>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4">
                <p className="poppins-semibold text-indigo-900 text-sm mb-1.5">There&apos;s more on top: PRNs and waste management fees</p>
                <p className="poppins-regular text-indigo-700 text-xs leading-relaxed">
                  Under packaging EPR you&apos;ll still need <strong>PRNs or PERNs</strong> (Packaging Recovery/Export Recovery Notes) to meet your recycling obligations — usually procured by your compliance scheme if you&apos;re registered with one. On top of that, you&apos;ll pay new <strong>waste management fees</strong> that reflect the cost of collecting and treating your household-type packaging through local authority kerbside systems.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-blue-900 text-sm mb-1">The overpayment problem is real</p>
                    <p className="poppins-regular text-blue-700 text-xs leading-relaxed">
                      Industry reviews of EPR data often find four- and five-figure annual overpayments where packaging has been misclassified as household or incorrectly allocated between nations. For a mid-size business, that&apos;s typically £5,000–£15,000 a year. Getting this wrong once costs a lot. Getting it wrong for years is even worse.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 — Dates */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-700" />
                </div>
                Important Dates You Can&apos;t Ignore
              </h2>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-5">
                The EPR calendar can feel overwhelming — there are lots of deadlines and they matter. Miss one and you could face late fees or enforcement action. Here are the ones that matter most right now.
              </p>

              <div className="space-y-3">
                {[
                  {
                    date: "1 Jan 2026",
                    event: "Updated EPR rules come into force",
                    detail: "From 1 January 2026, updated EPR rules apply. If you meet the EPR thresholds and haven't registered by your regulator's deadline, you may be non-compliant and at risk of enforcement action.",
                    urgent: true,
                  },
                  {
                    date: "1 Apr 2026",
                    event: "Data submission deadline",
                    detail: "This deadline covers all small producers (full 2025 data) and large producers (Jul–Dec 2025 data) — so it affects the majority of obligated businesses. Don't miss it.",
                    urgent: true,
                  },
                  {
                    date: "1 Aug 2026",
                    event: "Mid-year data submission (planned — large producers)",
                    detail: "Large producers must submit January–June 2026 packaging data, including mandatory Self-Managed Organisation Waste data, by 1 August 2026.",
                    urgent: false,
                  },
                  {
                    date: "Oct 2026",
                    event: "Notice of Liability issued",
                    detail: "Your EPR invoice for the year will be sent. This is based on the data you submitted.",
                    urgent: false,
                  },
                  {
                    date: "Oct 2027",
                    event: "Deposit Return Scheme goes live",
                    detail: "New rules for drinks packaging. More detail to come in 2026 as the DRS organisation builds out its systems.",
                    urgent: false,
                  },
                ].map((item, i) => (
                  <div key={i} className={`flex gap-4 p-4 rounded-xl border ${item.urgent ? "bg-red-50 border-red-100" : "bg-blue-50 border-blue-100"}`}>
                    <div className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs poppins-bold h-fit mt-0.5 ${item.urgent ? "bg-red-600 text-white" : "bg-blue-600 text-white"}`}>
                      {item.date}
                    </div>
                    <div>
                      <p className={`poppins-semibold text-sm mb-0.5 ${item.urgent ? "text-red-900" : "text-blue-900"}`}>{item.event}</p>
                      <p className={`poppins-regular text-xs leading-relaxed ${item.urgent ? "text-red-700" : "text-blue-700"}`}>{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5 — Tips */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-2 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                </div>
                7 Practical Tips to Stay on Top of EPR
              </h2>
              <p className="poppins-regular text-blue-700 text-sm leading-relaxed mb-6">
                These are the things we tell every client. Get these right and you&apos;re already ahead of most businesses in the UK.
              </p>

              <div className="space-y-4">
                {[
                  {
                    tip: "Know your tonnage — it's the first thing anyone will ask",
                    detail: "If you don't know how many tonnes of packaging your business uses each year, start there. Add up all your packaging — plastic, cardboard, glass, metal — by weight. You need this number to know if EPR applies to you at all.",
                    icon: "📦",
                  },
                  {
                    tip: "Don't classify everything as 'household' packaging",
                    detail: "This is the most common mistake. Lots of businesses assume all their packaging is household because it's simpler. But B2B transit packaging, pallet wrap, and internal distribution packaging is non-household — and it attracts much lower fees. Review your split carefully.",
                    icon: "🏭",
                  },
                  {
                    tip: "Join a compliance scheme — don't go it alone",
                    detail: "Unless you're a large business with a dedicated compliance team, managing EPR yourself is hard work. Compliance schemes (like Valpak or Veolia) handle your data submissions and fee payments for you. They're worth every penny.",
                    icon: "🤝",
                  },
                  {
                    tip: "Keep records of your packaging data — all of it",
                    detail: "The regulator can ask to see your packaging records going back several years. Keep weight data, material types, and submission history somewhere safe and organised. Losing this data is a compliance failure even if you've paid the right fees.",
                    icon: "📁",
                  },
                  {
                    tip: "Put the important dates in your calendar right now",
                    detail: "The 1 April 2026 deadline covers all small producers and half-year data for large producers, so it affects the majority of obligated businesses. Missing it triggers late fees and puts you on the regulator's radar. Put it in your diary today.",
                    icon: "📅",
                  },
                  {
                    tip: "Get a fee review — most businesses are overpaying",
                    detail: "More than half of businesses we speak to have never had their EPR fees independently checked. A proper review takes a few hours and often finds four- or five-figure annual overpayments. It pays for itself almost immediately.",
                    icon: "💷",
                  },
                  {
                    tip: "Sort your data systems before the next deadline — not after",
                    detail: "Regulators reported a noticeable number of late or corrected submissions for the very first EPR data deadlines in 2025, mainly due to poor data systems. Getting your process sorted in 2026 means you're far less likely to be flagged for follow-up or enforcement.",
                    icon: "🗂️",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex-shrink-0 text-2xl">{item.icon}</div>
                    <div>
                      <p className="poppins-semibold text-blue-900 text-sm mb-1.5">Tip {i + 1}: {item.tip}</p>
                      <p className="poppins-regular text-blue-700 text-xs leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6 */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="w-5 h-5 text-blue-700" />
                </div>
                What Do You Actually Need to Do Right Now?
              </h2>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-5">
                Not sure where to start? Here&apos;s the simplest version of what you need to do, in order.
              </p>

              <div className="space-y-3">
                {[
                  { step: "Work out your annual packaging tonnage", detail: "Add up all materials across your whole business." },
                  { step: "Check if you're above the registration threshold", detail: "25+ tonnes AND £1m+ turnover = you must register. 50+ tonnes AND £2m+ = you're a large producer with twice-yearly reporting." },
                  { step: "Register with the Environment Agency", detail: "Or check your existing registration is current and correct." },
                  { step: "Join a compliance scheme (or review your current one)", detail: "They handle submissions and fees for you." },
                  { step: "Review your household vs non-household split", detail: "This is where most businesses overpay. Don't skip this." },
                  { step: "Set up a packaging data tracking system", detail: "Even a simple spreadsheet is better than nothing." },
                  { step: "Mark the April 2026 deadline in your calendar", detail: "It affects large and small producers alike." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-blue-100">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <span className="text-white poppins-bold text-xs">{i + 1}</span>
                    </div>
                    <div>
                      <p className="poppins-semibold text-blue-900 text-sm">{item.step}</p>
                      <p className="poppins-regular text-blue-600 text-xs mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7 — What's coming */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Recycle className="w-5 h-5 text-indigo-700" />
                </div>
                What&apos;s Coming Down the Track?
              </h2>
              <p className="poppins-regular text-blue-800 leading-relaxed mb-4">
                EPR isn&apos;t going away — it&apos;s getting bigger. Here are three things happening in the next few years that every producer should know about.
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-xl bg-indigo-50 border border-indigo-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-4 h-4 text-indigo-600" />
                    <p className="poppins-semibold text-indigo-900 text-sm">Recyclability Assessments (from 2026)</p>
                  </div>
                  <p className="poppins-regular text-indigo-700 text-xs leading-relaxed">
                    The current RAM v1.1 has already been in force since January 2025. A new <strong>RAM 2027</strong> version is expected in July 2026, with updated criteria applying from January 2027. That gives packaging teams a roughly six-month window in late 2026 to check their designs against the new rules and plan changes. If your packaging scores poorly on recyclability, you&apos;ll pay higher EPR fees — and packaging redesigns typically take 2+ years, so businesses need to start planning now.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-4 h-4 text-blue-600" />
                    <p className="poppins-semibold text-blue-900 text-sm">Deposit Return Scheme — October 2027</p>
                  </div>
                  <p className="poppins-regular text-blue-700 text-xs leading-relaxed">
                    The UK is introducing a deposit return scheme for drinks containers. When a customer buys a drink in a plastic bottle or can, they&apos;ll pay a small deposit and get it back when they return the empty. If you produce drinks packaging, this will affect your labelling and reporting requirements.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-4 h-4 text-slate-600" />
                    <p className="poppins-semibold text-slate-900 text-sm">Digital Waste Tracking — from October 2026</p>
                  </div>
                  <p className="poppins-regular text-slate-700 text-xs leading-relaxed">
                    A new digital system will track where all UK waste goes — and from October 2026, paper waste transfer notes are being phased out, with digital records becoming the default. This gives regulators near real-time data on how waste moves through the system. Your waste contractor will need to be digitally compliant, and you&apos;ll need to verify that your collections are correctly logged. Check with your contractor now — don&apos;t wait until October.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-blue-900 mb-6">Quick Answers to Common Questions</h2>
              <div className="space-y-5">
                {[
                  {
                    q: "What if I'm a small business — does EPR still apply?",
                    a: "If your turnover is below £1 million per year, you're currently exempt from registering. However, you still need to know your packaging tonnage in case your business grows past the threshold.",
                  },
                  {
                    q: "I sell goods on Amazon. Am I responsible for EPR?",
                    a: "Yes — online marketplace sellers are treated as producers under EPR. If you import goods and sell them on platforms like Amazon, eBay, or Etsy, you're responsible for the packaging on those goods.",
                  },
                  {
                    q: "What happens if I don't register?",
                    a: "If you should be registered and you're not, regulators can take enforcement action — including financial penalties and, in serious cases, criminal prosecution with potentially unlimited fines. In practice, regulators use a mix of civil penalties and enforcement undertakings, escalating to prosecution for deliberate non-compliance. Either way, it's not worth the risk.",
                  },
                  {
                    q: "How do I know if I'm overpaying my EPR fees?",
                    a: "The most common sign is that you've never had your household/non-household classification reviewed. If your compliance scheme or advisor hasn't specifically checked this with you, there's a good chance you're paying more than you need to.",
                  },
                  {
                    q: "Does EPR apply if I only export goods?",
                    a: "If you're exporting goods and the packaging leaves the UK, those goods may be exempt from UK EPR fees — but you need proper documentation to prove it. If you can't evidence the export, you'll pay the fee.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-blue-100 last:border-0 pb-5 last:pb-0">
                    <p className="poppins-semibold text-blue-900 text-sm mb-2">Q: {item.q}</p>
                    <p className="poppins-regular text-blue-700 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA — Free Consultation */}
            <div className="rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl shadow-blue-900/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/30 border border-blue-400/40 mb-6">
                  <Mail className="w-4 h-4 text-blue-300" />
                  <span className="poppins-semibold text-xs text-blue-200 uppercase tracking-wide">Free Consultation</span>
                </div>
                <h2 className="poppins-bold text-2xl sm:text-3xl mb-4">
                  Still not sure where your business stands?
                </h2>
                <p className="poppins-regular text-blue-200 text-base mb-8 max-w-xl mx-auto leading-relaxed">
                  Book a free 15-minute call with one of our EPR specialists. We&apos;ll look at your specific situation, tell you exactly what applies to you, and give you a clear action plan — no charge, no obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <button
                    onClick={() => openBooking()}
                    className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-blue-800 hover:bg-blue-50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group text-base"
                  >
                    <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Book Free 15-Minute Call
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link
                    href="/epr-gap-analyser"
                    className="inline-flex items-center justify-center gap-2 poppins-semibold bg-white/15 hover:bg-white/25 text-white border border-white/30 px-6 py-4 rounded-2xl transition-all duration-300 text-sm"
                  >
                    Try the EPR Gap Analyser
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <p className="text-blue-300 text-xs poppins-regular mt-5">
                  Millstone Compliance — independent EPR advisors with no ties to any compliance scheme
                </p>
              </div>
            </div>

          </div>
        </div>
      </article>

      <Footer />
      </div>
  )
}
