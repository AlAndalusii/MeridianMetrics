"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, AlertCircle,
  Calendar, Building2, Trash2, Home, FileCheck, Users,
  BadgeAlert, XCircle, ClipboardList, Banknote,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import { MobileMenu } from "@/components/MobileMenu"

export default function HmoRecyclingFinesPage() {
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)

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
                onClick={() => setShowCalendlyModal(true)}
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px]"
              >
                BOOK COMPLIANCE REVIEW
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
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 border border-amber-200 mb-4">
              <span className="poppins-semibold text-xs text-amber-800 uppercase tracking-wide">HMO Compliance Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              HMO Landlords Face £5,000 Fines for Tenant Recycling Errors—Here&apos;s How to Avoid Them
            </h1>
            <p className="poppins-regular text-lg text-emerald-700 mb-2">
              Cross-Contamination in Bins Now Counts as Management Failure
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Last updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">18 min read</span>
            </div>
          </div>

          {/* Intro alert */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="poppins-semibold text-red-900 mb-2">31 March 2026 — the date HMO landlords cannot afford to ignore</p>
                <p className="poppins-regular text-red-800 text-sm leading-relaxed">
                  From that date, Simpler Recycling regulations extend to all households including HMOs, student houses, purpose-built flats, and properties above commercial premises. Unlike standard residential properties where councils enforce against householders directly, <strong>HMO landlords and managing agents are legally responsible—even when tenants make mistakes.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Maximum fine", value: "£5,000", sub: "Fixed penalty notice", color: "bg-red-50 border-red-200", val: "text-red-700" },
              { label: "HMOs in England", value: "472,823", sub: "~1.5M residents", color: "bg-blue-50 border-blue-200", val: "text-blue-700" },
              { label: "EA enforcement rate", value: "£118/hr", sub: "Inspection charge", color: "bg-amber-50 border-amber-200", val: "text-amber-700" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl border p-5 text-center ${s.color}`}>
                <p className={`poppins-bold text-3xl mb-1 ${s.val}`}>{s.value}</p>
                <p className="poppins-semibold text-sm text-emerald-900">{s.label}</p>
                <p className="poppins-regular text-xs text-emerald-600 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-emerald max-w-none space-y-8">

            {/* What Simpler Recycling Means for HMOs */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Trash2 className="w-6 h-6 text-emerald-600" />
                What Simpler Recycling Means for HMOs
              </h2>
              <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">The Four-Stream Separation Rule</h3>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                From 31 March 2026, every HMO must have separate collection arrangements for:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { label: "General waste", sub: "Black bins", color: "bg-gray-50 border-gray-200" },
                  { label: "Food waste", sub: "Weekly caddies", color: "bg-orange-50 border-orange-200" },
                  { label: "Paper and card", sub: "Fortnightly or weekly", color: "bg-blue-50 border-blue-200" },
                  { label: "Dry recyclables", sub: "Plastic, metal, glass", color: "bg-green-50 border-green-200" },
                ].map((s, i) => (
                  <div key={i} className={`rounded-xl border p-4 flex items-center gap-3 ${s.color}`}>
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <p className="poppins-semibold text-sm text-emerald-900">{s.label}</p>
                      <p className="poppins-regular text-xs text-emerald-600">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">What This Means in Practice</h3>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                A typical 5-bed HMO that previously managed with one general waste wheelie bin and one recycling bin now needs all of the following:
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "1–2 general waste bins (smaller than before)",
                  "1 food waste caddy (23L minimum, usually 120L for shared houses)",
                  "1 paper/card recycling bin",
                  "1 dry recyclables bin (plastic/metal/glass)",
                  "Clear signage on each bin",
                  "Written instructions for tenants",
                  "Adequate storage space (compliant with fire safety and planning)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-emerald-800 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-amber-900 text-sm mb-1">Critical:</p>
                <p className="poppins-regular text-amber-800 text-sm">
                  If tenants contaminate bins—putting food waste in general, or plastic in paper recycling—councils can hold the landlord responsible under HMO licensing conditions.
                </p>
              </div>
            </div>

            {/* Management Failure */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-2 flex items-center gap-2">
                <BadgeAlert className="w-6 h-6 text-red-500" />
                The &quot;Management Failure&quot; Problem
              </h2>
              <p className="poppins-semibold text-lg text-emerald-800 mb-4">Why Landlords Are Liable for Tenant Mistakes</p>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Unlike owner-occupied homes, where councils issue warnings directly to householders, HMOs operate under licensing regimes that impose specific waste management duties on landlords and agents. Typical HMO licence conditions include:
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Providing adequate bin capacity for the number of tenants",
                  "Ensuring bins are suitable type and size for each waste stream",
                  "Issuing clear written instructions to tenants on waste separation",
                  "Maintaining regular collection arrangements",
                  "Keeping bin storage areas clean, accessible, and free from overflow",
                  "Some councils require a written waste management plan",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="poppins-semibold text-emerald-900 mb-2">What councils are now enforcing:</p>
              <p className="poppins-regular text-emerald-800 text-sm mb-3">If an HMO&apos;s bins are repeatedly contaminated, councils treat this as evidence that:</p>
              <ul className="space-y-2 mb-6">
                {[
                  "The landlord has not provided adequate capacity (forcing tenants to use wrong bins)",
                  "The landlord has not given clear instructions",
                  "The landlord is not actively managing the property",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-red-800 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Real example */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <p className="poppins-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Real example (Tower Hamlets, Feb 2026)
                </p>
                <p className="poppins-regular text-gray-700 text-sm mb-3">
                  A 6-bed student HMO in Bethnal Green received a compliance notice after environmental health officers found food waste in the general bin, black sacks of unsorted rubbish piled next to bins, and the recycling bin contaminated with non-recyclables.
                </p>
                <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                  <p className="poppins-semibold text-gray-800 text-sm mb-1">Landlord argued:</p>
                  <p className="poppins-regular text-gray-600 text-sm italic">&quot;The tenants are responsible—I provided the bins.&quot;</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="poppins-semibold text-red-800 text-sm mb-1">Council response:</p>
                  <p className="poppins-regular text-red-700 text-sm italic">&quot;Your licence conditions require you to ensure adequate capacity and give clear instructions. The contamination and overflow indicate management failure.&quot;</p>
                  <p className="poppins-semibold text-red-900 text-sm mt-2">Penalty: £1,200 fixed penalty notice + requirement to provide additional bins + monthly monitoring for 6 months. Appeal rejected.</p>
                </div>
              </div>
            </div>

            {/* Three Penalty Tiers */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <Banknote className="w-6 h-6 text-emerald-600" />
                The Three Penalty Tiers
              </h2>
              <div className="space-y-5">
                {/* Tier 1 */}
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-3">1. Compliance Notice (Warning)</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="poppins-semibold text-amber-800 text-sm mb-2">What triggers it:</p>
                      <ul className="space-y-1">
                        {["Initial contamination incident", "Bin overflow", "Missing waste stream (e.g., no food waste caddy)", "Inadequate capacity"].map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-amber-800 text-xs">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="poppins-semibold text-amber-800 text-sm mb-2">What happens:</p>
                      <ul className="space-y-1">
                        {["Council issues formal notice specifying failures", "28-day deadline to rectify", "No fine at this stage", "Failure to comply escalates to Tier 2"].map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-amber-800 text-xs">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Tier 2 */}
                <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                  <h3 className="poppins-semibold text-lg text-red-900 mb-1">2. Fixed Penalty Notice (£300–£5,000)</h3>
                  <p className="poppins-regular text-red-700 text-sm mb-3">Penalty bands:</p>
                  <div className="grid sm:grid-cols-3 gap-3 mb-4">
                    {[
                      { band: "Minor failures", range: "£300–£1,000" },
                      { band: "Moderate failures", range: "£1,000–£2,500" },
                      { band: "Serious/persistent", range: "£2,500–£5,000" },
                    ].map((b, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 border border-red-200 text-center">
                        <p className="poppins-bold text-red-700 text-lg">{b.range}</p>
                        <p className="poppins-regular text-red-600 text-xs mt-1">{b.band}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white rounded-lg border border-red-200 p-4">
                    <p className="poppins-semibold text-red-900 text-sm mb-2">Real case (Birmingham, Jan 2026):</p>
                    <p className="poppins-regular text-red-700 text-sm">Managing agent for 12-bed HMO fined <strong>£4,200</strong> after three compliance notices ignored, tenants continued using general waste for all materials, and neighbours complained about rats from overflowing bins. Agent claimed &quot;tenants won&apos;t cooperate.&quot;</p>
                    <p className="poppins-semibold text-red-800 text-sm mt-2 italic">Council: &quot;Your licensing conditions require you to manage waste. If tenants won&apos;t cooperate, that&apos;s an enforcement issue between you and them—not a defence against your licensing obligations.&quot;</p>
                  </div>
                </div>

                {/* Tier 3 */}
                <div className="bg-gray-900 rounded-xl p-5">
                  <h3 className="poppins-semibold text-lg text-white mb-3">3. Criminal Prosecution + Licence Revocation</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="poppins-semibold text-gray-300 text-sm mb-2">What triggers it:</p>
                      <ul className="space-y-1">
                        {["Persistent non-compliance despite FPNs", "Deliberate non-compliance", "Serious environmental health risk (major pest infestation, hazardous waste)"].map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-gray-300 text-xs">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="poppins-semibold text-gray-300 text-sm mb-2">Penalties:</p>
                      <ul className="space-y-1">
                        {["Unlimited fines (magistrates' court)", "Criminal record", "HMO licence revoked", "Banning order (serious cases)"].map((t, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-gray-300 text-xs">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Food Waste Complication */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">The Food Waste Complication</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Food waste is the biggest compliance challenge for HMOs. A 5-bed HMO with students generates 15–25kg food waste per week—3–5x more than a typical family home. One 23L caddy (standard household size) is inadequate.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { title: "High Volume", desc: "Most HMOs need a 120L food waste bin with weekly collection, OR 2× 23L caddies with twice-weekly collection, plus compostable liners and a sealed bin.", color: "bg-orange-50 border-orange-200" },
                  { title: "Hygiene & Odour", desc: "Unlike paper or plastic, food waste attracts pests within days and creates strong odours in warm weather. Bin overflow leads to neighbour complaints → council inspection.", color: "bg-red-50 border-red-200" },
                  { title: "Council Capacity Issues", desc: "Some councils are struggling to roll out food waste collections by the deadline. If council doesn't offer collection, you may need a private contractor (£60–120/month).", color: "bg-blue-50 border-blue-200" },
                ].map((c, i) => (
                  <div key={i} className={`rounded-xl border p-5 ${c.color}`}>
                    <p className="poppins-semibold text-emerald-900 mb-2">{c.title}</p>
                    <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Council vs Private */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Home className="w-6 h-6 text-emerald-600" />
                Council vs Private Waste: The Grey Area
              </h2>
              <p className="poppins-regular text-emerald-800 mb-4">
                Whether your HMO is classified as &quot;household&quot; or &quot;commercial&quot; depends on your council. Always check with your local council environmental services team.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl border border-green-200 p-5">
                  <p className="poppins-semibold text-green-900 mb-2">Household classification:</p>
                  <ul className="space-y-1">
                    {["Included in standard residential collections", "Council tax covers waste cost", "Council provides bins"].map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-green-800 text-xs">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                  <p className="poppins-semibold text-amber-900 mb-2">Commercial classification (6+ beds):</p>
                  <ul className="space-y-1">
                    {["Landlord must arrange private collection", "Council may charge separately for bins", "Or landlord must use private contractor"].map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-amber-800 text-xs">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="poppins-semibold text-emerald-900 mb-3">Typical private waste costs for a 6-bed HMO:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-emerald-800 text-white">
                      <th className="text-left p-3 poppins-semibold rounded-tl-lg text-xs">Service</th>
                      <th className="text-left p-3 poppins-semibold text-xs">Cost/Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["General waste (weekly, 240L)", "£40–60"],
                      ["Food waste (weekly, 120L)", "£60–80"],
                      ["Recycling (fortnightly, 2× 240L)", "£30–50"],
                      ["Total", "£130–190/month"],
                    ].map(([service, cost], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="p-3 poppins-regular text-emerald-800 text-xs border-b border-emerald-100">{service}</td>
                        <td className="p-3 poppins-semibold text-emerald-900 text-xs border-b border-emerald-100">{cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="poppins-regular text-emerald-600 text-xs mt-2">Compare to council service (if available): £0–80/month depending on council policy.</p>
            </div>

            {/* CTA mid-article */}
            <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Not sure if your HMO is compliant?
                </h3>
                <p className="poppins-regular text-red-100 mb-6 leading-relaxed">
                  31 March 2026 is weeks away. Our HMO Waste Audit gives you a property-by-property assessment, bin specifications, tenant templates, and ongoing monitoring — before enforcement begins.
                </p>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  size="lg"
                  className="bg-white text-red-700 hover:bg-red-50 poppins-semibold shadow-xl"
                >
                  Book Your HMO Compliance Check
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* 60-Day Action Plan */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-2 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Your Compliance Action Plan (60 Days)
              </h2>
              <p className="poppins-regular text-emerald-700 mb-6">If you haven&apos;t prepared for 31 March 2026, start now.</p>

              <div className="space-y-4">
                {[
                  {
                    week: "Week 1: Audit Current Situation",
                    color: "bg-emerald-50 border-emerald-200",
                    headColor: "text-emerald-900",
                    items: [
                      "Count tenants and estimate waste (10–15L general, 3–5kg food, 8–12L recycling per tenant per week)",
                      "Inspect current bins — how many, what sizes, adequate for new requirements?",
                      "Check for contamination now",
                      "Check bin storage — space for 4 bins, accessible for collectors, fire safety compliant?",
                    ],
                  },
                  {
                    week: "Week 2: Contact Council & Get Quotes",
                    color: "bg-blue-50 border-blue-200",
                    headColor: "text-blue-900",
                    items: [
                      "Call council environmental services: confirm household or commercial classification",
                      "Ask: what bins will council provide for Simpler Recycling?",
                      "Ask: when will food waste collection start in this area?",
                      "Get quotes from 2–3 private licensed waste carriers as a comparison",
                    ],
                  },
                  {
                    week: "Week 3: Order Bins & Materials",
                    color: "bg-purple-50 border-purple-200",
                    headColor: "text-purple-900",
                    items: [
                      "Bins for each waste stream (council-provided or purchased — wheelie bins £40–80, food bins £60–100)",
                      "Compostable caddy liners for food waste (budget £10–15/month)",
                      "Signage for each bin (photos of what goes in each — A4 laminated, £2–5 each)",
                      "Written instructions for tenants",
                    ],
                  },
                  {
                    week: "Week 4: Tenant Communication",
                    color: "bg-orange-50 border-orange-200",
                    headColor: "text-orange-900",
                    items: [
                      "Create a one-page instruction sheet with photos/icons for each bin",
                      "Email all current tenants and post copy in communal area",
                      "Include in new tenant welcome packs going forward",
                      "Add waste compliance clause to tenancy agreements (see below)",
                    ],
                  },
                  {
                    week: "Weeks 5–8: Monitor & Adjust",
                    color: "bg-green-50 border-green-200",
                    headColor: "text-green-900",
                    items: [
                      "Check weekly: are tenants using bins correctly? Any contamination or overflow?",
                      "Common fix: smaller general bin forces tenants to separate correctly",
                      "For repeat recycling contamination: photo guide showing exactly what&apos;s accepted",
                      "For overflow: increase collection frequency or add extra bin",
                    ],
                  },
                ].map((step, i) => (
                  <div key={i} className={`rounded-xl border p-5 ${step.color}`}>
                    <h3 className={`poppins-semibold text-base mb-3 ${step.headColor}`}>{step.week}</h3>
                    <ul className="space-y-2">
                      {step.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded border-2 border-current flex-shrink-0 mt-0.5 opacity-60" />
                          <span className="poppins-regular text-emerald-800 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenancy Agreement Clause */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-emerald-600" />
                Updating Tenancy Agreements
              </h2>
              <p className="poppins-regular text-emerald-800 mb-4">Add a waste compliance clause to create legal recourse if tenants cause fines:</p>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 font-mono text-sm">
                <p className="poppins-semibold text-gray-900 mb-3">Waste &amp; Recycling (Simpler Recycling Compliance)</p>
                <p className="poppins-semibold text-gray-800 text-xs mb-2">The Tenant agrees to:</p>
                <ul className="space-y-1 mb-4">
                  {[
                    "Separate all waste into the four streams provided: general waste, food waste, paper/card recycling, and dry recyclables",
                    "Use only the designated bins for each waste type as instructed",
                    "Not contaminate bins by placing incorrect items in them",
                    "Not allow bins to overflow — notify Landlord if additional capacity needed",
                    "Place bins out for collection on designated days and return them promptly",
                    "Not dispose of bulky waste in standard bins — arrange separate collection",
                  ].map((item, i) => (
                    <li key={i} className="poppins-regular text-gray-700 text-xs">• {item}</li>
                  ))}
                </ul>
                <p className="poppins-semibold text-gray-800 text-xs mb-2">Failure to comply may result in:</p>
                <ul className="space-y-1">
                  {[
                    "Deduction from deposit for contamination charges levied by waste collector",
                    "Deduction for additional private waste collection costs incurred",
                    "Breach of tenancy if non-compliance results in regulatory action against Landlord",
                  ].map((item, i) => (
                    <li key={i} className="poppins-regular text-gray-700 text-xs">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Student HMOs */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Special Considerations: Student HMOs
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    title: "High Turnover",
                    desc: "New tenants every September/January who don't know waste rules. Solution: in-person briefing at move-in, laminated sheets in every bedroom, refresher email mid-term.",
                    color: "bg-blue-50 border-blue-200",
                  },
                  {
                    title: "High Food Waste",
                    desc: "A 6-bed student house can generate 35–40kg food waste per week. You may need 2× 120L food bins with twice-weekly collection.",
                    color: "bg-orange-50 border-orange-200",
                  },
                  {
                    title: "Lower Compliance Motivation",
                    desc: "Solutions: bins right outside the kitchen, colour-coded bins with huge labels, deposit return bonus for well-managed waste, appoint house 'eco rep'.",
                    color: "bg-green-50 border-green-200",
                  },
                ].map((c, i) => (
                  <div key={i} className={`rounded-xl border p-5 ${c.color}`}>
                    <p className="poppins-semibold text-emerald-900 mb-2">{c.title}</p>
                    <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-World Costs */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <Banknote className="w-6 h-6 text-emerald-600" />
                Real-World Costs: What Non-Compliance Actually Costs
              </h2>
              <p className="poppins-semibold text-emerald-800 mb-4">Scenario: 8-bed student HMO in Manchester (actual case, Jan 2026)</p>
              <div className="space-y-3 mb-6">
                {[
                  { month: "March 2026", event: "Landlord doesn't provide food waste bin. Tenants put food waste in general bin." },
                  { month: "April 2026", event: "Waste collector inspects general bin, finds contamination. Refuses collection. Leaves notice." },
                  { month: "May 2026", event: "Bins overflow. Neighbour complains to council. Environmental health visits." },
                  { month: "June 2026", event: "Compliance notice issued. 28 days to provide compliant bins and clear backlog." },
                  { month: "July 2026", event: "Landlord provides bins but backlog not fully cleared. Fixed penalty: £2,800." },
                ].map((m, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-28 text-right">
                      <span className="poppins-semibold text-emerald-700 text-xs">{m.month}</span>
                    </div>
                    <div className="flex-1 bg-red-50 rounded-lg p-3 border border-red-100">
                      <span className="poppins-regular text-red-800 text-sm">{m.event}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                  <p className="poppins-semibold text-red-900 mb-3">Non-compliant total cost:</p>
                  <ul className="space-y-1">
                    {["Fixed penalty notice: £2,800", "Emergency private waste clearance: £400", "New food waste bin + signage: £150", "Lost tenant (void period): £800"].map((c, i) => (
                      <li key={i} className="poppins-regular text-red-800 text-sm">• {c}</li>
                    ))}
                  </ul>
                  <p className="poppins-bold text-red-900 text-xl mt-3">Total: £4,150</p>
                </div>
                <div className="bg-green-50 rounded-xl border border-green-200 p-5">
                  <p className="poppins-semibold text-green-900 mb-3">Compliant approach:</p>
                  <ul className="space-y-1">
                    {["Food waste bin provided March 2026: £80", "Caddy liners (annual): £120", "Tenant briefing: 1 hour"].map((c, i) => (
                      <li key={i} className="poppins-regular text-green-800 text-sm">• {c}</li>
                    ))}
                  </ul>
                  <p className="poppins-bold text-green-900 text-xl mt-3">Total: £200 + 1 hour</p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-3">What Millstone Compliance Can Do for HMO Landlords</h3>
                <p className="poppins-regular text-emerald-100 mb-5">Our HMO Waste Audit includes:</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Property-by-property waste capacity assessment",
                    "Council vs private contractor cost comparison",
                    "Bin specification and sourcing",
                    "Tenant instruction templates",
                    "Tenancy agreement clause drafting",
                    "Ongoing monitoring and adjustment",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                      <span className="poppins-regular text-emerald-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="poppins-regular text-emerald-200 text-sm mb-5">
                  <strong className="text-white">Cost:</strong> £300–600 per property (one-time), or £150–250/month for portfolio management (5+ properties)
                  <br />
                  <strong className="text-white">ROI:</strong> Avoid £5,000 fines, licence revocations, and tenant turnover from poor waste management.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setShowCalendlyModal(true)}
                    size="lg"
                    className="bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold shadow-xl"
                  >
                    Get Your Free HMO Compliance Check
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => setShowCalendlyModal(true)}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/60 poppins-semibold shadow-xl"
                  >
                    Received a Compliance Notice? Urgent Support
                  </Button>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-emerald-100 shadow-lg">
              <h3 className="poppins-semibold text-lg text-emerald-900 mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Sources
              </h3>
              <ul className="space-y-2">
                {[
                  "Property118.com, \"HMO landlords warned of fines under new waste regulations,\" 5 December 2025",
                  "Estate Agent Today, \"New bin laws to hit landlords and letting agents with £5,000 fines,\" 2025",
                  "Property Industry Eye, \"How the New Recycling Rules Affect HMOs and Multi-Tenant Properties,\" 10 January 2026",
                  "DEFRA, \"Simpler Recycling in England: policy update,\" GOV.UK, 28 November 2024",
                  "Tower Hamlets Council, \"Managing agents and landlords guide to rubbish and recycling for purpose-built flats,\" 2026",
                  "Mortgage Finance Gazette, \"HMO numbers increase by 2% in England,\" 25 September 2025",
                ].map((s, i) => (
                  <li key={i} className="poppins-regular text-emerald-700 text-xs leading-relaxed">• {s}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Nav */}
          <div className="mt-12 pt-8 border-t border-emerald-200">
            <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="poppins-medium text-sm">Back to All Resources</span>
            </Link>
          </div>
        </div>
      </article>

      <CalendlyModal
        isOpen={showCalendlyModal}
        onClose={() => setShowCalendlyModal(false)}
      />
    </div>
  )
}
