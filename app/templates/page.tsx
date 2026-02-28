"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  Shield,
  Star,
  Zap,
  ChevronDown,
  ChevronUp,
  Package,
  ClipboardCheck,
  FileSpreadsheet,
  Printer,
  AlertTriangle,
  BadgeCheck,
  Lock,
  Mail,
  BadgeCheck as Check,
  Sparkles,
  Eye,
  XCircle,
  Circle,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Hero animated checklist mockup ──────────────────────────────────────────

const heroCheckItems = [
  { q: "Four waste streams provided?",             risk: "HIGH",   answer: true  },
  { q: "EA-licensed contractor documented?",       risk: "HIGH",   answer: false },
  { q: "Written instructions issued to tenants?",  risk: "HIGH",   answer: true  },
  { q: "Waste Management Plan in place?",          risk: "HIGH",   answer: false },
  { q: "Bin area has clear vehicle access?",       risk: "MEDIUM", answer: true  },
  { q: "6-month inspection log maintained?",       risk: "HIGH",   answer: false },
]

function HeroChecklistMockup() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count < heroCheckItems.length) {
      const t = setTimeout(() => setCount((c) => c + 1), 600)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setCount(0), 3500)
      return () => clearTimeout(t)
    }
  }, [count])

  const passes = heroCheckItems.slice(0, count).filter((i) => i.answer).length
  const gaps   = heroCheckItems.slice(0, count).filter((i) => !i.answer).length

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      <div className="absolute top-3 left-3 right-0 bottom-0 bg-slate-200/40 rounded-2xl" />
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18)_0%,transparent_55%)]" />
          <div className="relative flex items-center gap-2 mb-1">
            <div className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <ClipboardCheck className="w-3 h-3 text-emerald-400" />
            </div>
            <span className="poppins-semibold text-[10px] text-white/60 uppercase tracking-widest">HMO Compliance Checklist</span>
          </div>
          <div className="relative flex items-center justify-between mt-2">
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="poppins-bold text-xs text-white/80">{passes} pass</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="poppins-bold text-xs text-white/80">{gaps} gap{gaps !== 1 ? "s" : ""}</span>
              </div>
            </div>
            {gaps >= 2 && <span className="poppins-bold text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">HIGH RISK</span>}
            {gaps === 1 && <span className="poppins-bold text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">MEDIUM RISK</span>}
            {gaps === 0 && count > 0 && <span className="poppins-bold text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">LOW RISK</span>}
          </div>
        </div>

        {/* Items */}
        <div className="px-4 py-3 space-y-1.5 min-h-[200px]">
          {heroCheckItems.map((item, idx) => {
            const visible = idx < count
            return (
              <div
                key={idx}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-400 ${
                  visible
                    ? item.answer ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"
                    : "opacity-0"
                }`}
              >
                {visible ? (
                  item.answer
                    ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    : <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-200 flex-shrink-0" />
                )}
                <span className={`poppins-regular text-[11px] flex-1 ${visible ? "text-slate-700" : "text-slate-200"}`}>{item.q}</span>
                {visible && (
                  <span className={`poppins-bold text-[9px] px-1.5 py-0.5 rounded flex-shrink-0 ${item.risk === "HIGH" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                    {item.risk}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress */}
        <div className="px-4 pb-3">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-600" style={{ width: `${(count / heroCheckItems.length) * 100}%` }} />
          </div>
          <p className="poppins-regular text-[10px] text-slate-400 text-center mt-1.5">Traffic-light scoring · identifies every gap</p>
        </div>
      </div>
    </div>
  )
}

// ─── Product data ─────────────────────────────────────────────────────────────

const products = [
  {
    id: "instructions",
    badge: "Quick Start",
    badgeColor: "bg-slate-100 text-slate-600 border border-slate-200",
    tag: null,
    title: "HMO Tenant Waste Instructions Pack",
    price: "£27",
    priceNote: "One-time · Instant download",
    description:
      "Ready-to-print A4 sheets that tell your tenants exactly what goes in each bin — installed in 30 minutes.",
    icon: Printer,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    borderColor: "border-slate-200",
    ctaStyle: "bg-emerald-700 hover:bg-emerald-800 text-white",
    includes: [
      "Printable A4 sheet per bin stream (food, dry, paper, general)",
      "Colour-coded graphics — no reading required",
      "Common mistakes list",
      "Laminated format & sizing guide",
    ],
    fileTypes: ["PDF", "Word"],
    subject: "HMO Tenant Waste Instructions Pack — £27",
  },
  {
    id: "checklist",
    badge: "Most Popular",
    badgeColor: "bg-emerald-700 text-white border border-emerald-600",
    tag: "Best Value",
    title: "HMO Compliance Checklist",
    price: "£47",
    priceNote: "One-time · Instant download",
    description:
      "The 20-question pre-audit framework we use with clients. Know your risk before an inspector does.",
    icon: ClipboardCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-700",
    borderColor: "border-emerald-400",
    ctaStyle: "bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20",
    includes: [
      "20-question self-assessment across 5 risk sections",
      "Traffic-light scoring — HIGH / MEDIUM per gap",
      "Gap identification worksheet",
      "Council communication scripts (3 templates)",
    ],
    fileTypes: ["PDF", "Word"],
    subject: "HMO Compliance Checklist — £47",
  },
  {
    id: "plan",
    badge: "Complete Pack",
    badgeColor: "bg-amber-50 text-amber-700 border border-amber-300",
    tag: null,
    title: "HMO Waste Management Plan Template",
    price: "£97",
    priceNote: "One-time · Instant download",
    description:
      "The full council-submission ready document package. Everything needed to demonstrate long-term compliance.",
    icon: FileSpreadsheet,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    borderColor: "border-amber-300",
    ctaStyle: "bg-emerald-700 hover:bg-emerald-800 text-white",
    includes: [
      "Editable Word doc — property, waste streams, contractor",
      "6-month monitoring & inspection log",
      "Excel bin capacity calculator (tenants × volume)",
      "Complaint response letter templates (3 scenarios)",
    ],
    fileTypes: ["PDF", "Word", "Excel"],
    subject: "HMO Waste Management Plan Template — £97",
  },
]

const faqs = [
  {
    q: "What Format Do I Receive The Templates In?",
    a: "All templates come as both PDF (for printing/sharing) and editable Microsoft Word or Excel files. Customise them with your property details, branding, and contractor information.",
  },
  {
    q: "How Quickly Will I Receive My Download?",
    a: "After purchase confirmation we'll send your download link by email within minutes. If you haven't received it within 30 minutes, check your spam folder or contact us directly.",
  },
  {
    q: "Are These Templates Compliant With The March 2026 Simpler Recycling Rules?",
    a: "Yes. All templates reflect the Simpler Recycling legislation as enacted from 31 March 2026, including four-stream separation requirements and EA carrier registration obligations.",
  },
  {
    q: "Can I Use These Templates For Multiple Properties?",
    a: "Yes — each purchase covers unlimited properties under your ownership or management. Editable fields allow you to customise for each address.",
  },
  {
    q: "Do These Replace A Professional Audit?",
    a: "Templates are a strong starting point but they're self-assessed. For a written compliance report you can hand to the EA or your council — one that protects you legally — you'll need a Millstone professional audit.",
  },
]

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button type="button" onClick={() => setOpen(!open)} className="w-full text-left group">
      <div className="py-5 border-b border-emerald-100">
        <div className="flex items-center justify-between gap-4">
          <span className="poppins-semibold text-sm sm:text-base text-slate-800 group-hover:text-emerald-700 transition-colors">
            {q}
          </span>
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-100 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
            {open ? (
              <ChevronUp className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
            )}
          </span>
        </div>
        {open && (
          <p className="mt-3 poppins-regular text-sm text-slate-600 leading-relaxed pr-10">{a}</p>
        )}
      </div>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-emerald-900 overflow-hidden">
      <Navigation />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.07)_0%,transparent_65%)]" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl" />
          <div className="hidden sm:block absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Instant Digital Downloads
              </div>

              <h1 className="poppins-bold text-4xl sm:text-5xl lg:text-[3.25rem] text-slate-900 leading-[1.1] tracking-tight mb-6">
                Professional Compliance
                <br />
                <span className="text-emerald-700">Documents. Done.</span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-slate-600 max-w-lg mb-10 leading-relaxed">
                Skip the blank page. Every template is written by compliance professionals,
                formatted for councils, and editable in Word within minutes of purchase.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {[
                  { icon: Download, label: "Instant Delivery By Email" },
                  { icon: FileText, label: "PDF + Word + Excel Included" },
                  { icon: Shield,   label: "March 2026 Compliant" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-100 rounded-full poppins-medium text-xs text-slate-700 shadow-sm">
                    <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </div>

              <a
                href="#products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-md shadow-emerald-700/20 hover:shadow-lg"
              >
                See All Templates
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right — animated checklist mockup */}
            <div className="hidden lg:flex flex-col items-center gap-6">
              <HeroChecklistMockup />
              <p className="poppins-regular text-xs text-slate-400 text-center">
                Live preview of the HMO Compliance Checklist · traffic-light scoring shown
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white" id="products">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              Three Templates. Every Scenario Covered.
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Choose Your Pack
            </h2>
          </div>

          {/* items-stretch keeps all cards same height */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {products.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.id}
                  className={`relative rounded-2xl border-2 ${p.borderColor} bg-white p-6 flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                    p.id === "checklist" ? "ring-2 ring-emerald-200" : ""
                  }`}
                >
                  {/* Best value ribbon */}
                  {p.tag && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="poppins-bold text-[10px] tracking-widest uppercase px-4 py-1 rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/30">
                        {p.tag}
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${p.iconColor}`} />
                    </div>
                    <span className={`poppins-semibold text-[11px] px-2.5 py-1 rounded-full ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="poppins-bold text-lg text-slate-900 leading-snug mb-2">
                    {p.title}
                  </h3>

                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                    {p.description}
                  </p>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="poppins-bold text-4xl text-slate-900">{p.price}</span>
                    <p className="poppins-regular text-xs text-slate-400 mt-0.5">{p.priceNote}</p>
                  </div>

                  {/* Includes — flex-1 pushes CTA to bottom */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-sm text-slate-600">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* File type pills */}
                  <div className="flex gap-1.5 mb-5">
                    {p.fileTypes.map((ft) => (
                      <span
                        key={ft}
                        className="poppins-medium text-[10px] tracking-widest uppercase px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100"
                      >
                        {ft}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={`mailto:hello@millstonecompliance.com?subject=Purchase: ${encodeURIComponent(p.subject)}&body=Hi,%0D%0A%0D%0AI'd like to purchase the ${encodeURIComponent(p.title)} (${p.price}).%0D%0A%0D%0APlease send me the download link and payment details.%0D%0A%0D%0AThanks`}
                    className={`flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl poppins-semibold text-sm transition-all duration-200 active:scale-95 ${p.ctaStyle}`}
                  >
                    Get Instant Access
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  {/* Preview links */}
                  {p.id === "plan" && (
                    <Link
                      href="/templates/hmo-waste-management-plan"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl poppins-medium text-sm text-amber-700 hover:text-amber-800 hover:bg-amber-50 border border-amber-200 hover:border-amber-300 transition-all duration-200 mt-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Preview
                    </Link>
                  )}
                  {p.id === "checklist" && (
                    <Link
                      href="/templates/hmo-compliance-checklist"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl poppins-medium text-sm text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-200 mt-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Preview
                    </Link>
                  )}
                  {p.id === "instructions" && (
                    <Link
                      href="/templates/hmo-tenant-waste-instructions"
                      className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl poppins-medium text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-200 mt-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Preview
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why templates ────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">
                Why These Templates Exist
              </p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6 leading-snug">
                Most Landlords Fail
                <br />
                <span className="text-emerald-700">On Paperwork, Not Bins.</span>
              </h2>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
                EA inspectors don't just look at your bins — they ask for written evidence. Signed tenant instructions. Contractor registration numbers. A management plan. Most landlords have none of it.
              </p>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                These templates mean when an inspector turns up, you hand them a folder. Not a blank look.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm"
                >
                  Book A Professional Audit <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200"
                >
                  Free Compliance Check
                </Link>
              </div>
            </div>

            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  stat: "£5,000",
                  label: "Maximum fine for non-compliant HMO",
                  color: "bg-red-50 border-red-100",
                  textColor: "text-red-700",
                  icon: AlertTriangle,
                  iconColor: "text-red-500",
                },
                {
                  stat: "31 Mar",
                  label: "Simpler Recycling deadline — already passed",
                  color: "bg-amber-50 border-amber-100",
                  textColor: "text-amber-700",
                  icon: Zap,
                  iconColor: "text-amber-500",
                },
                {
                  stat: "20",
                  label: "Questions in our pre-audit checklist",
                  color: "bg-emerald-50 border-emerald-100",
                  textColor: "text-emerald-700",
                  icon: ClipboardCheck,
                  iconColor: "text-emerald-500",
                },
                {
                  stat: "48 hrs",
                  label: "Typical professional audit turnaround",
                  color: "bg-blue-50 border-blue-100",
                  textColor: "text-blue-700",
                  icon: BadgeCheck,
                  iconColor: "text-blue-500",
                },
              ].map(({ stat, label, color, textColor, icon: Icon, iconColor }) => (
                <div key={stat} className={`rounded-2xl border p-5 ${color}`}>
                  <Icon className={`w-5 h-5 mb-3 ${iconColor}`} />
                  <p className={`poppins-bold text-3xl mb-1 ${textColor}`}>{stat}</p>
                  <p className="poppins-regular text-xs text-slate-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Built for real inspections ───────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              What's Inside
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              Built For Real Inspections
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base">
              Every document is formatted as councils and the Environment Agency expect to receive it.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Printer,
                title: "Print & Laminate In Minutes",
                body: "The Instructions Pack uses clear icons and plain English. Tenants understand it on day one — no briefing needed.",
              },
              {
                icon: ClipboardCheck,
                title: "Identify Gaps Before They Do",
                body: "The Checklist walks through 20 questions in 5 risk categories. Every NO answer is a gap with a fix timeline.",
              },
              {
                icon: FileSpreadsheet,
                title: "Council-Submission Ready",
                body: "The Management Plan is structured as councils request: property section, waste streams, contractor details, monitoring log.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="poppins-semibold text-slate-900 text-base mb-2">{title}</h3>
                <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────── */}
      <section className="py-10 bg-emerald-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: Lock, label: "Secure Email Delivery" },
              { icon: Star, label: "Written By Compliance Professionals" },
              { icon: Package, label: "No Subscription — Own It Forever" },
              { icon: Mail, label: "hello@millstonecompliance.com" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-white/90">
                <Icon className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                <span className="poppins-medium text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Common Questions
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-7">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Delivered In Minutes
          </div>
          <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-5">
            Stop Guessing.
            <br />
            <span className="text-emerald-700">Start Compliant.</span>
          </h2>
          <p className="poppins-regular text-slate-600 text-base mb-10 leading-relaxed">
            From £27. No subscription. No upsell. Just the document you need, ready before tomorrow morning.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
            >
              View All Templates <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200"
            >
              Book A Professional Audit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
