"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, ArrowRight, CheckCircle, XCircle, AlertTriangle,
  Leaf, Trash2, Calendar, Building2, Coffee, Zap, BarChart3,
  Clock, TrendingDown, Users, Phone, Shield, RefreshCw,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"

const recyclingStreams = [
  "Paper and card",
  "Plastic (bottles, tubs, trays)",
  "Metal (cans, tins, foil)",
  "Glass (bottles and jars)",
  "Food waste (if your business produces any)",
]

const notReadyReasons = [
  {
    num: "1",
    title: '"Someone Else\'s Problem" Syndrome',
    body: 'Many businesses assumed their waste collector would automatically handle compliance. They didn\'t. Waste companies sent letters in January–February 2025 saying: "To continue service under new regulations, you\'ll need to upgrade to our Simpler Recycling package at £X per month." Businesses that ignored these letters found themselves scrambling days before the deadline.',
  },
  {
    num: "2",
    title: 'Confusion Over "Who It Applies To"',
    body: 'The "10+ employees" threshold created uncertainty — part-timers, contractors, 9.5 FTE. The answer: it\'s based on full-time equivalents averaged over the year. If you\'re close to the threshold, assume you\'re in scope — enforcement officers aren\'t sympathetic to "we thought we were exempt" arguments.',
  },
  {
    num: "3",
    title: "Food Waste Was the Blocker",
    body: "Separating paper, plastic, and glass is straightforward — most offices already did this informally. But food waste collection was the stumbling block. Many commercial waste collectors didn't offer food waste services pre-2025, pricing is higher, and businesses with canteens suddenly needed caddy liners, sealed bins, and more frequent collections.",
  },
  {
    num: "4",
    title: "Sector-Specific Denial",
    body: "Finance (43% prepared) and IT (41%) were the most ready — used to compliance deadlines. Education (<20%) and retail (<25%) were the least ready, often viewing Simpler Recycling as \"yet another cost\" rather than a legal requirement.",
  },
]

const wasteStreams = [
  { stream: "General waste (240L wheelie bin)", cost: "£8–15 per collection" },
  { stream: "Mixed recycling (240L bin)",        cost: "£4–8 per collection" },
  { stream: "Food waste (23L caddy, weekly)",    cost: "£6–12 per week" },
  { stream: "Glass (240L bin, fortnightly)",     cost: "£3–6 per collection" },
]

const myths = [
  {
    myth: 'Myth 1: "We don\'t produce food waste, so this doesn\'t apply to us"',
    reality: "If your staff have a break room with a fridge, microwave, or kettle, you almost certainly produce food waste: coffee grounds, tea bags, fruit peels, expired food from fridge clean-outs, biscuit crumbs. Even 2–3 kg/week requires compliant collection.",
  },
  {
    myth: 'Myth 2: "Recycling costs more than general waste"',
    reality: "The opposite is true. General waste: £12–15 per 240L bin. Mixed recycling: £4–8 per 240L bin. Businesses that separate waste pay 20–30% less overall. The food waste caddy adds cost but diverts weight from expensive general waste.",
  },
  {
    myth: 'Myth 3: "We can just wait until the Environment Agency forces us"',
    reality: "Your waste collector will force compliance before the regulator does. They face penalties for servicing non-compliant customers, so they're auditing bins now. Refusing collections, contamination surcharges, or contract termination will happen first.",
  },
  {
    myth: 'Myth 4: "Small volumes don\'t count"',
    reality: "There's no formal de minimis exemption in the regulations. If you produce recyclable material, you're expected to separate it. Less than 5 kg/week of a specific material may allow a case-by-case negotiation with your collector — but it must be documented.",
  },
]

const sectors = [
  {
    icon: Building2,
    label: "Offices & Professional Services",
    profile: ["Paper/card: 60–70% (documents, delivery packaging)", "Plastic/metal: 15–20% (bottles, cans)", "Food waste: 5–10% (break room)", "General: 10–15%"],
    priorities: ["Paper/card (biggest volume, easiest win)", "Food waste (compliance requirement, most overlooked)", "Plastic/metal (moderate volume)"],
    cost: "£120–180/month for 20-person office",
    accentColor: "blue",
  },
  {
    icon: Coffee,
    label: "Retail & Hospitality",
    profile: ["Food waste: 40–60% (cafés, restaurants)", "Cardboard: 20–30% (delivery packaging)", "Plastic/metal: 10–15%", "Glass: 5–10% (if alcohol served)"],
    priorities: ["Food waste (highest volume, highest risk)", "Cardboard (bulky, frequent collections)", "Glass (if alcohol served)"],
    cost: "£300–600/month for small café/restaurant",
    accentColor: "amber",
  },
  {
    icon: Users,
    label: "Education (Schools, Colleges)",
    profile: ["Paper/card: 50–60%", "Food waste: 20–30% (canteens)", "Plastic/metal: 10–15%", "General: 10–15%"],
    priorities: ["Canteen food waste (largest weight, odour risk)", "Classroom/office paper", "Drinks containers (vending machines)"],
    cost: "Varies by site; multi-site packages available",
    accentColor: "green",
  },
]

export default function SimplerRecycling2025() {
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
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px]"
              >
                <Link href="/simpler-recycling-gap-analyser">Free Recycling Check</Link>
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back */}
          <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 border border-green-200 mb-4">
              <Leaf className="w-3.5 h-3.5 text-green-700 mr-1.5" />
              <span className="poppins-semibold text-xs text-green-800 uppercase tracking-wide">Compliance Readiness Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              Two-Thirds of UK Businesses Aren&apos;t Ready for Simpler Recycling — Are You?
            </h1>
            <p className="poppins-regular text-lg text-emerald-700 leading-relaxed">
              The 31 March 2025 deadline has passed. 64% of companies missed it. Here&apos;s what Simpler Recycling actually requires, why enforcement is ramping up, and how to get compliant in the next 60 days without overpaying for bins you don&apos;t need.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">15 min read</span>
            </div>
          </div>

          {/* Urgent Alert */}
          <div className="mb-10 rounded-2xl bg-amber-50 border-2 border-amber-200 p-6 flex items-start gap-4">
            <AlertTriangle className="w-7 h-7 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="poppins-semibold text-lg text-amber-900 mb-1">The Deadline Has Already Passed</h2>
              <p className="poppins-regular text-amber-800 text-sm leading-relaxed">
                Businesses with 10+ employees in England were legally required to separate their waste streams from <strong>31 March 2025</strong>. A recent survey found that only 6% of companies made changes before the deadline. Waste collector audits and Environment Agency enforcement are increasing throughout 2026. If you haven&apos;t acted yet, every week of delay adds risk and cost.
              </p>
            </div>
          </div>

          {/* Featured Tool — Simpler Recycling Gap Analyser */}
          <div className="mb-10 rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 overflow-hidden shadow-2xl shadow-green-900/20 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 p-7 sm:p-9">
              {/* Icon cluster */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <RefreshCw className="w-12 h-12 text-white/90" />
                </div>
                <span className="poppins-semibold text-xs text-green-300 mt-2 text-center">Waste Compliance</span>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/30 border border-green-400/40 mb-3">
                  <Zap className="w-3 h-3 text-green-300" />
                  <span className="poppins-semibold text-xs text-green-200 uppercase tracking-wide">Featured Tool — Free</span>
                </div>
                <h2 className="poppins-bold text-white text-xl sm:text-2xl mb-2 leading-tight">
                  Simpler Recycling Gap Analyser
                </h2>
                <p className="poppins-regular text-green-200 text-sm leading-relaxed mb-4 max-w-xl">
                  Answer 8 questions and get an instant compliance score showing exactly which waste streams you&apos;re missing, your enforcement risk level, and a prioritised action list — in under 2 minutes.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-xs text-green-300 mb-5">
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Under 2 minutes</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Instant compliance score</div>
                  <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Free · No card required</div>
                </div>
                <Link
                  href="/simpler-recycling-gap-analyser"
                  className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-green-800 hover:bg-green-50 px-6 py-3 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group text-sm"
                >
                  <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Check My Compliance Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="prose prose-emerald max-w-none space-y-8">

            {/* What Is Simpler Recycling */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">What Is Simpler Recycling? (The 60-Second Explainer)</h2>
              </div>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-5">
                Simpler Recycling is UK government policy requiring businesses, charities, and public sector organisations in England to separate recyclable waste into specific streams rather than mixing everything into general waste.
              </p>
              <p className="poppins-semibold text-emerald-900 mb-3">From 31 March 2025, businesses with 10+ employees must arrange separate collections for:</p>
              <div className="space-y-2 mb-5">
                {recyclingStreams.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="poppins-medium text-sm text-green-900">{s}</span>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="poppins-semibold text-sm text-blue-900 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />Deadlines
                  </p>
                  <p className="poppins-regular text-sm text-blue-800 mb-1"><strong>10+ employees:</strong> 31 March 2025 ✓ (past)</p>
                  <p className="poppins-regular text-sm text-blue-800"><strong>Micro-businesses (&lt;10 FTE):</strong> 31 March 2027</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <p className="poppins-semibold text-sm text-amber-900 mb-2">Exemptions</p>
                  <p className="poppins-regular text-sm text-amber-800 mb-1">Zero food waste (documented, pure office environment)</p>
                  <p className="poppins-regular text-sm text-amber-800">Genuinely &lt;5 kg/week of a specific material — case-by-case only, must be documented</p>
                </div>
              </div>
            </div>

            {/* Why Only 6% Prepared */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl">Why Only 6% of Businesses Prepared On Time</h2>
              </div>
              <div className="p-6 sm:p-8 space-y-5">
                <p className="poppins-regular text-emerald-800 leading-relaxed">
                  Despite the government announcing Simpler Recycling in 2023 and confirming the March 2025 deadline in November 2024, the mass unpreparedness came down to four factors:
                </p>
                {notReadyReasons.map((r) => (
                  <div key={r.num} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center">
                      <span className="poppins-black text-amber-700 text-sm">{r.num}</span>
                    </div>
                    <div>
                      <h3 className="poppins-semibold text-base text-emerald-900 mb-1">{r.title}</h3>
                      <p className="poppins-regular text-sm text-emerald-800 leading-relaxed">{r.body}</p>
                    </div>
                  </div>
                ))}
                {/* Real Example */}
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                  <p className="poppins-semibold text-sm text-amber-900 mb-1">Real example</p>
                  <p className="poppins-regular text-sm text-amber-800 leading-relaxed">
                    A 50-person marketing agency in London assumed food waste meant &quot;restaurant-level volumes.&quot; They delayed until March 2025, then discovered they did need food waste collection — staff break room produced 8 kg/week of coffee grounds, fruit peels, and scraps. Rush-order for food caddies cost <strong>40% more</strong> than if they&apos;d planned ahead.
                  </p>
                </div>
              </div>
            </div>

            {/* Enforcement Reality */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl">What Happens If You&apos;re Not Compliant?</h2>
              </div>
              <div className="p-6 sm:p-8">
                <p className="poppins-semibold text-emerald-900 mb-4">Enforcement works through waste carrier audits, not direct business inspections (yet):</p>
                <div className="space-y-3 mb-6">
                  {[
                    "Environment Agency audits waste collectors to check they offer compliant services",
                    "Waste collectors are required to verify their business customers are separating waste correctly",
                    "If a waste collector services non-compliant businesses, they get fined — so they're now auditing you",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                    </div>
                  ))}
                </div>

                <h3 className="poppins-semibold text-base text-red-800 mb-3">What waste collectors are doing right now:</h3>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { label: "Bin audits", desc: "Inspecting your bins for recyclable contamination" },
                    { label: "Collection refusals", desc: "Won't collect general waste bins containing obvious recyclables" },
                    { label: "Contamination fees", desc: "£50–150 per contaminated bin — adding up fast" },
                    { label: "Contract terminations", desc: "Persistently non-compliant customers are being dropped" },
                  ].map((item, i) => (
                    <div key={i} className="bg-red-50 rounded-xl p-3 border border-red-100">
                      <p className="poppins-semibold text-sm text-red-900 mb-0.5">{item.label}</p>
                      <p className="poppins-regular text-xs text-red-800">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <p className="poppins-semibold text-sm text-emerald-900 mb-1">2026 update</p>
                  <p className="poppins-regular text-sm text-emerald-800 leading-relaxed">
                    The Environment Agency has signalled that direct business inspections will increase in 2026–2027, particularly targeting sectors with low compliance — education, hospitality, and retail. Non-compliant businesses also pay 20–40% more for general waste by not separating cheaper recyclable streams.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Case */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <TrendingDown className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">The Business Case: It&apos;s Cheaper to Comply</h2>
              </div>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-5">
                Government modelling estimates Simpler Recycling will deliver a <strong>net economic benefit of £1.27 billion</strong> to UK businesses. Here&apos;s why compliance saves money:
              </p>

              {/* Pricing table */}
              <div className="rounded-xl overflow-hidden border border-emerald-200 mb-6">
                <div className="bg-emerald-700 px-4 py-2.5">
                  <p className="poppins-semibold text-sm text-white">Typical waste collection costs</p>
                </div>
                <div className="divide-y divide-emerald-100">
                  {wasteStreams.map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? "bg-white" : "bg-emerald-50/40"}`}>
                      <span className="poppins-regular text-sm text-emerald-900">{row.stream}</span>
                      <span className="poppins-semibold text-sm text-emerald-700 ml-4 text-right">{row.cost}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-5 border border-green-200 mb-5">
                <p className="poppins-semibold text-green-900 mb-2">The maths for a 20-person office:</p>
                <div className="space-y-1">
                  <p className="poppins-regular text-sm text-green-800">❌ Before: 3 bins of general waste/week = <strong>£24–45/week</strong></p>
                  <p className="poppins-regular text-sm text-green-800">✓ After: 1 general + 1 recycling + 1 glass + food caddy = <strong>£18–35/week</strong></p>
                  <p className="poppins-bold text-sm text-green-900 mt-2">Typical saving: £300–500/year for a 20-person office</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="poppins-semibold text-sm text-blue-900 mb-2">B2B Procurement Benefit</p>
                  <p className="poppins-regular text-xs text-blue-800">Local authority contracts and corporate supply chains increasingly audit suppliers&apos; environmental practices. Simpler Recycling compliance is becoming a requirement for public sector and major corporate work.</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="poppins-semibold text-sm text-purple-900 mb-2">Staff Attraction & Retention</p>
                  <p className="poppins-regular text-xs text-purple-800">Employees under 35 increasingly factor workplace sustainability into job decisions. Visible recycling and food waste systems signal a values-aligned employer.</p>
                </div>
              </div>
            </div>

            {/* 60-Day Checklist */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h2 className="poppins-bold text-white text-lg sm:text-xl">Your 60-Day Compliance Checklist</h2>
              </div>
              <div className="p-6 sm:p-8 space-y-6">

                {/* Week 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 bg-emerald-100 border border-emerald-300 rounded-lg px-3 py-1">
                      <span className="poppins-bold text-xs text-emerald-800">WEEK 1</span>
                    </div>
                    <h3 className="poppins-semibold text-base text-emerald-900">Audit Current State</h3>
                  </div>
                  <div className="space-y-2 ml-1">
                    {[
                      "Walk your premises: count every general waste bin and peek inside — you'll likely find 40–60% is recyclable",
                      "Review your waste collection contract: does it mention Simpler Recycling compliance?",
                      "Estimate weekly volumes by material: general, paper, plastic/metal, glass, food waste",
                      "Check employee count (FTE average): are you definitely in scope for the 2025 deadline?",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded border-2 border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-emerald-100" />

                {/* Week 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 bg-blue-100 border border-blue-300 rounded-lg px-3 py-1">
                      <span className="poppins-bold text-xs text-blue-800">WEEK 2</span>
                    </div>
                    <h3 className="poppins-semibold text-base text-emerald-900">Get Quotes from 3 Waste Collectors</h3>
                  </div>
                  <p className="poppins-regular text-sm text-emerald-700 mb-3 ml-1">Ask each provider: "Do you offer Simpler Recycling compliant packages?" and "What bins/caddies are included?"</p>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <p className="poppins-semibold text-xs text-red-800 mb-2">Red flags to watch for:</p>
                    <div className="space-y-1">
                      {[
                        "Provider can't offer food waste collection → look elsewhere",
                        'Pricing is vague or "we\'ll assess on site" → get it in writing',
                        "They push more bins than you need → they're upselling",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="poppins-regular text-xs text-red-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="poppins-medium text-sm text-emerald-700 mt-3 ml-1">
                    Typical all-in cost for a 20-person office: <strong className="text-emerald-900">£120–250/month</strong> for full compliance
                  </p>
                </div>

                <div className="border-t border-emerald-100" />

                {/* Weeks 3-4 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 bg-amber-100 border border-amber-300 rounded-lg px-3 py-1">
                      <span className="poppins-bold text-xs text-amber-800">WEEKS 3–4</span>
                    </div>
                    <h3 className="poppins-semibold text-base text-emerald-900">Implement & Train Staff</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="poppins-semibold text-xs text-emerald-900 mb-2">Minimum bin setup:</p>
                      <div className="space-y-1">
                        {[
                          "2–3 recycling bins (paper/card + plastic/metal + glass)",
                          "1 food waste caddy (23 L for small offices; 120 L+ for canteens)",
                          "Compostable caddy liners",
                          "Clear signage for each bin",
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-xs text-emerald-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="poppins-semibold text-xs text-emerald-900 mb-2">15-min all-hands training:</p>
                      <div className="space-y-1">
                        {[
                          "What goes in each bin (with examples)",
                          "Where bins are located around the office",
                          "What happens if bins are contaminated",
                          "Pizza boxes → recycling if clean, composting if greasy",
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-xs text-emerald-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-emerald-100" />

                {/* Weeks 5-8 */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 bg-purple-100 border border-purple-300 rounded-lg px-3 py-1">
                      <span className="poppins-bold text-xs text-purple-800">WEEKS 5–8</span>
                    </div>
                    <h3 className="poppins-semibold text-base text-emerald-900">Monitor & Optimise</h3>
                  </div>
                  <div className="space-y-2">
                    {[
                      { problem: "Staff still putting recyclables in general waste", fix: "Move general bins away from desks; put recycling bins in prominent locations" },
                      { problem: "Food waste bin smells", fix: "Switch to twice-weekly collections or store bin in a cooler area" },
                      { problem: "Contamination charges appearing on invoice", fix: "Add photo signage showing what goes in each bin; send a reminder email" },
                    ].map((item, i) => (
                      <div key={i} className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                        <p className="poppins-semibold text-xs text-red-800 mb-0.5">Problem: {item.problem}</p>
                        <p className="poppins-regular text-xs text-emerald-800">Fix: {item.fix}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Micro-businesses */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">Special Case: Micro-Businesses (&lt;10 Employees)</h2>
              </div>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                If you have fewer than 10 FTE, your deadline is <strong>31 March 2027</strong> — but you should start now anyway.
              </p>
              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                {[
                  { title: "Early-adopter discounts", desc: "Waste collectors are offering lower rates to businesses that implement before the 2027 rush" },
                  { title: "Cost savings start now", desc: "Same logic applies — separating waste is cheaper than all-general from day one" },
                  { title: "Supplier requirements", desc: "Larger clients may audit your waste practices before 2027 as part of procurement" },
                ].map((item, i) => (
                  <div key={i} className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                    <p className="poppins-semibold text-sm text-blue-900 mb-1">{item.title}</p>
                    <p className="poppins-regular text-xs text-blue-800">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="poppins-semibold text-sm text-emerald-900 mb-2">Micro-business setup (simpler):</p>
                <div className="space-y-1">
                  {[
                    "1 mixed recycling bin (paper, plastic, metal, glass combined — most collectors accept this for small volumes)",
                    "1 small food waste caddy (if applicable)",
                    "1 general waste bin (now much smaller)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="poppins-medium text-sm text-emerald-800 mt-3">Typical cost: <strong>£50–100/month</strong></p>
              </div>
            </div>

            {/* Myths vs Reality */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">Myths vs Reality</h2>
              </div>
              <div className="space-y-4">
                {myths.map((m, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-emerald-100">
                    <div className="bg-red-50 border-b border-red-100 px-4 py-3 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="poppins-semibold text-sm text-red-800">{m.myth}</p>
                    </div>
                    <div className="bg-emerald-50 px-4 py-3 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="poppins-regular text-sm text-emerald-800"><strong className="text-emerald-900">Reality:</strong> {m.reality}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sector-Specific Guidance */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">Sector-Specific Guidance</h2>
              </div>
              <div className="space-y-4">
                {sectors.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <div key={i} className={`rounded-xl border overflow-hidden border-${s.accentColor}-100`}>
                      <div className={`bg-${s.accentColor}-50 border-b border-${s.accentColor}-100 px-4 py-3 flex items-center gap-3`}>
                        <Icon className={`w-5 h-5 text-${s.accentColor}-600`} />
                        <p className={`poppins-bold text-sm text-${s.accentColor}-900`}>{s.label}</p>
                      </div>
                      <div className="px-4 py-4 grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="poppins-semibold text-xs text-emerald-900 mb-2 uppercase tracking-wide">Typical waste profile</p>
                          {s.profile.map((p, j) => (
                            <p key={j} className="poppins-regular text-xs text-emerald-800 mb-0.5">• {p}</p>
                          ))}
                        </div>
                        <div>
                          <p className="poppins-semibold text-xs text-emerald-900 mb-2 uppercase tracking-wide">Implementation priorities</p>
                          {s.priorities.map((p, j) => (
                            <div key={j} className="flex items-start gap-1.5 mb-0.5">
                              <span className="poppins-bold text-xs text-emerald-600">{j + 1}.</span>
                              <span className="poppins-regular text-xs text-emerald-800">{p}</span>
                            </div>
                          ))}
                          <p className="poppins-semibold text-xs text-emerald-700 mt-2">Cost benchmark: {s.cost}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Connection to EPR/PPT */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">How Simpler Recycling Fits with EPR, PPT & DRS</h2>
              </div>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Simpler Recycling is one piece of a larger UK waste reform system that businesses need to understand together:
              </p>
              <div className="space-y-3">
                {[
                  { title: "Extended Producer Responsibility (EPR)", desc: "Producers of packaged goods pay fees based on packaging put on market. Encourages reducing packaging and using recyclable materials. Simpler Recycling complements this by improving business recycling rates." },
                  { title: "Plastic Packaging Tax (PPT)", desc: "£217.85/tonne on plastic packaging with <30% recycled content. Businesses importing/manufacturing 10+ tonnes must register. Simpler Recycling helps businesses track and report packaging volumes accurately." },
                  { title: "Deposit Return Scheme (DRS) — England", desc: "Expected 2025–2026 (delayed). Will require return points for drinks containers. Simpler Recycling establishes the baseline recycling infrastructure needed for DRS to work at scale." },
                ].map((item, i) => (
                  <div key={i} className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                    <p className="poppins-semibold text-sm text-purple-900 mb-1">{item.title}</p>
                    <p className="poppins-regular text-sm text-purple-800">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="poppins-semibold text-sm text-emerald-900 mb-1">The bottom line</p>
                <p className="poppins-regular text-sm text-emerald-800">Government is building an integrated system where every layer reinforces the others. Early compliance with Simpler Recycling positions you well for all upcoming changes — and demonstrates the waste tracking capability that regulators will increasingly require.</p>
              </div>
            </div>

            {/* When to Get Professional Help */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-2xl text-emerald-900">When to Get Professional Help</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <p className="poppins-semibold text-sm text-green-900 mb-2">DIY works for:</p>
                  {["Single-site businesses", "Fewer than 50 employees", "Standard office waste profile", "Simple, predictable waste volumes"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-xs text-green-800">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <p className="poppins-semibold text-sm text-amber-900 mb-2">Specialist support needed if:</p>
                  {["Multi-site operations", "Complex waste streams (manufacturing, healthcare)", "High food waste volumes (commercial kitchens)", "Ongoing compliance monitoring required"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-xs text-amber-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <p className="poppins-semibold text-sm text-emerald-900 mb-1">ROI on professional waste management</p>
                <p className="poppins-regular text-sm text-emerald-800">Typical savings from professional waste optimisation: <strong>15–30% of annual waste costs</strong>, paying back consultant fees within 6–12 months. For multi-site operations, the savings can be substantial — a 10-site business saving 25% on a £60,000 annual waste bill saves £15,000/year.</p>
              </div>
            </div>

            {/* Mid-article CTA */}
            <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-6 sm:p-8 relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <p className="poppins-bold text-white text-lg mb-1">Not sure where you stand?</p>
                  <p className="poppins-regular text-green-100 text-sm mb-4">Our free gap analyser checks all required waste streams and gives you an instant compliance score with a prioritised action list.</p>
                  <Link
                    href="/simpler-recycling-gap-analyser"
                    className="inline-flex items-center gap-2 poppins-bold bg-white text-green-800 hover:bg-green-50 px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm group"
                  >
                    Check My Compliance Score
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15)_0%,transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <Leaf className="w-4 h-4 text-white mr-2" />
                  <span className="text-sm poppins-semibold text-white uppercase tracking-wide">Get Compliant in 60 Days</span>
                </div>
                <h2 className="poppins-bold text-3xl sm:text-4xl mb-4">
                  Find out exactly what you&apos;re missing — in 2 minutes
                </h2>
                <p className="poppins-regular text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
                  Our free Simpler Recycling Gap Analyser checks all required waste streams, calculates your enforcement risk, and gives you a prioritised action list — completely free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link
                    href="/simpler-recycling-gap-analyser"
                    className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group text-sm"
                  >
                    <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Start Free Recycling Check
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={`mailto:hello@millstonecompliance.com?subject=Simpler Recycling Compliance Help&body=Hello Millstone Compliance,%0D%0A%0D%0AI would like help with Simpler Recycling compliance.%0D%0A%0D%0ACompany name: %0D%0ANumber of employees: %0D%0ASites: %0D%0ACurrent waste setup: %0D%0A%0D%0AThank you.`}
                    className="border-2 border-white text-white hover:bg-white/10 poppins-semibold bg-transparent px-8 py-4 rounded-xl inline-flex items-center justify-center transition-all duration-300 text-sm"
                  >
                    Contact Us for Help
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/20">
                  {[
                    { icon: CheckCircle, text: "Under 2 minutes" },
                    { icon: Shield,       text: "Free to use" },
                    { icon: Zap,          text: "Instant results" },
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

            {/* Non-compliant urgent notice */}
            <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center">
                <Phone className="w-7 h-7 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="poppins-bold text-lg text-amber-900 mb-1">Already received a non-compliance notice from your waste collector?</h3>
                <p className="poppins-regular text-sm text-amber-800 leading-relaxed mb-4">
                  We provide rapid implementation plans, waste carrier negotiation, and multi-site rollouts. Contact us for urgent support — most businesses can achieve full compliance within 3–4 weeks with the right help.
                </p>
                <a
                  href={`mailto:hello@millstonecompliance.com?subject=URGENT: Simpler Recycling Non-Compliance&body=Hello Millstone Compliance,%0D%0A%0D%0AI have received a non-compliance notice and need urgent assistance with Simpler Recycling.%0D%0A%0D%0ACompany: %0D%0ANotice date: %0D%0ADeadline given: %0D%0ANumber of sites: %0D%0A%0D%0APlease contact me as soon as possible.`}
                  className="inline-flex items-center gap-2 poppins-semibold bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                >
                  Contact Us for Urgent Support
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-white/50 rounded-xl p-5 border border-emerald-100">
              <p className="poppins-semibold text-xs text-emerald-700 uppercase tracking-wide mb-3">Sources</p>
              <div className="space-y-1">
                {[
                  "DEFRA, \"Simpler recycling: workplace recycling in England,\" GOV.UK, 2025.",
                  "DEFRA, \"Simpler Recycling in England: policy update,\" GOV.UK, 28 November 2024.",
                  "First Mile, \"35 Business Waste & Recycling Statistics UK 2024,\" 31 July 2024.",
                  "DEFRA, \"UK statistics on waste,\" GOV.UK, 2025.",
                  "HM Government, \"Simpler Recycling in England – Impact Assessment,\" 2024.",
                  "Veolia UK, \"Simpler Recycling,\" 2026.",
                  "Biffa, \"Simpler Recycling 2025 legislation (England),\" 2025.",
                ].map((s, i) => (
                  <p key={i} className="poppins-regular text-xs text-emerald-600">{i + 1}. {s}</p>
                ))}
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="mt-12 pt-8 border-t border-emerald-100">
            <p className="poppins-regular text-sm text-emerald-600">
              Last updated: February 2026 | Based on DEFRA Simpler Recycling guidance and waste industry data
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
