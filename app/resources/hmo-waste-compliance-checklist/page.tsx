"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, ArrowRight, Download, CheckCircle, AlertTriangle,
  FileCheck, ShieldCheck, Clock, Phone, Mail, Globe,
  Trash2, Home, ClipboardList, BadgeAlert,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import { MobileMenu } from "@/components/MobileMenu"
import Footer from "@/components/Footer"

export default function HmoWasteChecklistPage() {
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)

  const checklist = [
    { q: "Does your property have a separate food waste bin?",                                          risk: "HIGH" },
    { q: "Is food waste collected at least once a week?",                                               risk: "HIGH" },
    { q: "Do you have a separate bin for paper and cardboard?",                                         risk: "HIGH" },
    { q: "Do you have a dry recycling bin for plastic, tins and glass?",                                risk: "HIGH" },
    { q: "Have all tenants received written waste instructions?",                                        risk: "HIGH" },
    { q: "Is a written waste guide or notice displayed in a communal area of the property?",            risk: "HIGH" },
    { q: "Do you hold a duty of care waste transfer note for any private waste contractor you use?",    risk: "HIGH" },
    { q: "Are all bins clearly labelled so tenants know which is which?",                               risk: "HIGH" },
    { q: "Have you contacted your council to confirm collection setup?",                                 risk: "HIGH" },
    { q: "Do you hold your waste carrier's EA registration number?",                                    risk: "HIGH" },
    { q: "Have tenancy agreements been updated to include waste compliance clauses?",                    risk: "MED"  },
    { q: "Is food waste stored in a sealed caddy to prevent pests and odours?",                         risk: "MED"  },
    { q: "Are bin areas accessible to the collection vehicle on collection day?",                        risk: "MED"  },
    { q: "Does your council require glass separated from dry recyclables — and if so, is it?",          risk: "MED"  },
    { q: "Do you keep copies of waste collection receipts or contracts?",                               risk: "MED"  },
    { q: "Are bin areas clean, pest-free, and not overflowing?",                                        risk: "MED"  },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">

      {/* ── Navigation ─────────────────────────────────────────────────── */}
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

      {/* ── Page body ──────────────────────────────────────────────────── */}
      <main className="pt-20 pb-16">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#1C2B3A] via-[#243447] to-[#1a3a4a] text-white py-16 sm:py-20 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,150,105,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,150,105,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
            <Link
              href="/resources"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors text-sm poppins-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {["EA Inspections Active", "Fines up to £5,000", "Licence at Risk"].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] poppins-semibold uppercase tracking-wide bg-white/10 text-blue-200 border border-white/15"
                >
                  {pill}
                </span>
              ))}
            </div>

            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
              HMO Waste Compliance
              <span className="text-emerald-400"> Checklist</span>
            </h1>

            <p className="poppins-regular text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
              A free, single-page printable checklist for HMO landlords to verify compliance
              with Simpler Recycling regulations before EA inspections begin.
            </p>

            {/* Download CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/HMO_Waste_Compliance_Checklist.pdf"
                download="HMO_Waste_Compliance_Checklist.pdf"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white poppins-bold rounded-xl shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 text-sm"
              >
                <Download className="w-5 h-5" />
                Download Free Checklist — PDF
              </a>
              <Button
                onClick={() => setShowCalendlyModal(true)}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 poppins-semibold px-7 py-3.5 rounded-xl text-sm bg-transparent min-h-[44px]"
              >
                Book an HMO Audit from £295
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 mt-8">
              {[
                { icon: FileCheck,   text: "One-page A4 printable" },
                { icon: ShieldCheck, text: "Updated March 2026" },
                { icon: Clock,       text: "5-minute self-audit" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-slate-400 text-sm poppins-regular">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-8">

          {/* ── ALERT BOX ───────────────────────────────────────────────── */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="poppins-semibold text-red-900 mb-1">Since 31 March 2026 — landlords are personally liable</p>
                <p className="poppins-regular text-red-800 text-sm leading-relaxed">
                  HMO landlords are personally responsible for tenant bin mistakes under Simpler Recycling.
                  Cross-contamination = management failure = fine and licence review.
                  Walk your property and tick each box. <strong>Any NO answer needs fixing immediately.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* ── STATS ──────────────────────────────────────────────────── */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { value: "£5,000",  label: "Maximum fine",        sub: "Fixed penalty notice",   color: "bg-red-50 border-red-200",   val: "text-red-700"  },
              { value: "16",      label: "Checklist questions",  sub: "10 HIGH · 6 MED risk",   color: "bg-emerald-50 border-emerald-200", val: "text-emerald-700" },
              { value: "£295",    label: "Full HMO Audit",       sub: "48-hour written report", color: "bg-blue-50 border-blue-200", val: "text-blue-700" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl border p-5 text-center ${s.color}`}>
                <p className={`poppins-bold text-3xl mb-1 ${s.val}`}>{s.value}</p>
                <p className="poppins-semibold text-sm text-slate-700">{s.label}</p>
                <p className="poppins-regular text-xs text-slate-500 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ── CHECKLIST PREVIEW TABLE ─────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#1C2B3A] to-[#243447] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-emerald-400" />
                <h2 className="poppins-semibold text-white text-lg">What&apos;s Inside the Checklist</h2>
              </div>
              <span className="text-xs text-slate-400 poppins-regular">16 questions · 2 risk levels</span>
            </div>

            <div className="divide-y divide-emerald-50">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto] px-6 py-2.5 bg-emerald-800/5">
                <span className="poppins-semibold text-xs text-emerald-900 uppercase tracking-wide">Question</span>
                <span className="poppins-semibold text-xs text-emerald-900 uppercase tracking-wide">Risk</span>
              </div>

              {checklist.map(({ q, risk }, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto] items-center px-6 py-3 gap-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] poppins-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="poppins-regular text-sm text-slate-700">{q}</span>
                  </div>
                  <span
                    className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] poppins-bold uppercase tracking-wide ${
                      risk === "HIGH"
                        ? "bg-red-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {risk === "HIGH" ? "HIGH RISK" : "MED RISK"}
                  </span>
                </div>
              ))}
            </div>

            {/* Scoring bands */}
            <div className="border-t border-emerald-100 bg-slate-50/50 px-6 py-5">
              <p className="poppins-semibold text-sm text-emerald-900 mb-3">Score your results:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "0 NOs",    text: "You look compliant — get written proof.",  bg: "bg-emerald-50 border-emerald-200", col: "text-emerald-700" },
                  { label: "1–3 NOs",  text: "Fix HIGH RISK items this week.",            bg: "bg-amber-50 border-amber-200",     col: "text-amber-700"  },
                  { label: "4+ NOs",   text: "Book an audit immediately.",                bg: "bg-red-50 border-red-200",         col: "text-red-700"    },
                ].map(({ label, text, bg, col }) => (
                  <div key={label} className={`rounded-xl border p-3 ${bg}`}>
                    <p className={`poppins-bold text-sm ${col}`}>{label}</p>
                    <p className="poppins-regular text-xs text-slate-600 mt-0.5">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── WHY IT MATTERS ───────────────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-2 flex items-center gap-2">
              <BadgeAlert className="w-6 h-6 text-red-500" />
              Why Every HMO Landlord Needs This Checklist
            </h2>
            <p className="poppins-regular text-emerald-700 mb-6 text-sm">
              The Environment Agency is actively visiting HMO properties across England.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Trash2,
                  title: "4 Bin Streams Required",
                  desc: "General waste, food waste, paper/card, and dry recyclables must all have separate bins and collection arrangements.",
                  color: "bg-emerald-50 border-emerald-200",
                  ic: "text-emerald-600",
                },
                {
                  icon: Home,
                  title: "Landlord, Not Tenant, Is Liable",
                  desc: "HMO licensing conditions place the duty on you — even if tenants make the mistakes. 'They did it' is not a defence.",
                  color: "bg-red-50 border-red-200",
                  ic: "text-red-600",
                },
                {
                  icon: ShieldCheck,
                  title: "Written Proof Is Everything",
                  desc: "Councils need to see written instructions given to tenants, receipts kept, and councils contacted. Verbal arrangements won't hold up.",
                  color: "bg-blue-50 border-blue-200",
                  ic: "text-blue-600",
                },
              ].map(({ icon: Icon, title, desc, color, ic }) => (
                <div key={title} className={`rounded-xl border p-5 ${color}`}>
                  <Icon className={`w-6 h-6 mb-3 ${ic}`} />
                  <p className="poppins-semibold text-emerald-900 mb-2 text-sm">{title}</p>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── DOWNLOAD CTA BANNER ─────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="poppins-bold text-xl sm:text-2xl mb-2">
                  Download the checklist — it&apos;s free
                </h3>
                <p className="poppins-regular text-emerald-100 text-sm leading-relaxed max-w-md">
                  Single-page A4 PDF. Print it, walk your property, and know exactly where you stand
                  before an EA inspector arrives.
                </p>
              </div>
              <a
                href="/HMO_Waste_Compliance_Checklist.pdf"
                download="HMO_Waste_Compliance_Checklist.pdf"
                className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold rounded-xl shadow-xl transition-all duration-300 text-sm"
              >
                <Download className="w-5 h-5" />
                Download PDF — Free
              </a>
            </div>
          </div>

          {/* ── UPGRADE TO FULL AUDIT ───────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="poppins-semibold text-2xl text-emerald-900 mb-1">
                  Need a Full Written Compliance Report?
                </h2>
                <p className="poppins-regular text-emerald-700 text-sm">
                  Show your council or the Environment Agency a professional audit — not just a self-completed checklist.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Property-by-property waste capacity assessment",
                "Council vs private contractor cost comparison",
                "Bin specification and sourcing guidance",
                "Tenant instruction templates included",
                "Tenancy agreement waste compliance clauses",
                "Written report ready in 48 hours",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div>
                <span className="poppins-bold text-3xl text-emerald-900">£295</span>
                <span className="poppins-regular text-emerald-600 text-sm ml-2">per property · one-time</span>
              </div>
              <Button
                onClick={() => setShowCalendlyModal(true)}
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold shadow-lg px-8"
              >
                Book Your HMO Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-emerald-100">
              {[
                { icon: Globe,  text: "millstonecompliance.com/services", href: "https://millstonecompliance.com/services", breakAll: false },
                { icon: Phone,  text: "0121 751 0551",                    href: "tel:01217510551",                         breakAll: false },
                { icon: Mail,   text: "hello@millstonecompliance.com",    href: "mailto:hello@millstonecompliance.com",    breakAll: true  },
              ].map(({ icon: Icon, text, href, breakAll }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors text-sm poppins-regular ${breakAll ? "break-all" : ""}`}
                >
                  <Icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* ── Back link ───────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-emerald-100">
            <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="poppins-medium text-sm">Back to All Resources</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />

      <CalendlyModal
        isOpen={showCalendlyModal}
        onClose={() => setShowCalendlyModal(false)}
      />
    </div>
  )
}
