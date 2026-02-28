"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
  Star,
  Zap,
  Mail,
  Lock,
  Sparkles,
  ClipboardCheck,
  AlertTriangle,
  ChevronRight,
  Download,
  Eye,
  Award,
  Circle,
  XCircle,
  TrendingUp,
  BookOpen,
  Users,
  Building2,
  Trash2,
  FileCheck,
  MessageSquare,
  BarChart3,
  Target,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Email config ─────────────────────────────────────────────────────────────

const EMAIL_ADDRESS = "hello@millstonecompliance.com"
const EMAIL_SUBJECT = "HMO Compliance Checklist — £47"
const EMAIL_BODY = `Hi Millstone Compliance team,

I'd like to purchase the HMO Compliance Checklist (£47).

Please send me the download link and payment details.

My details:
Name: 
Company / Trading name: 
Phone: 

Thank you`

const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`

// ─── Checklist data ───────────────────────────────────────────────────────────

const riskSections = [
  {
    id: "A",
    title: "Bin Provision & Capacity",
    icon: Trash2,
    color: "emerald",
    questions: [
      { q: "Are four separate waste streams provided?", risk: "HIGH" },
      { q: "Is food waste collected at least weekly?", risk: "HIGH" },
      { q: "Are bin sizes sufficient for tenant count?", risk: "HIGH" },
      { q: "Are additional bins available for overflow?", risk: "MEDIUM" },
    ],
  },
  {
    id: "B",
    title: "Licensed Contractor",
    icon: FileCheck,
    color: "blue",
    questions: [
      { q: "Does your contractor hold a current EA licence?", risk: "HIGH" },
      { q: "Is the licence number recorded in writing?", risk: "HIGH" },
      { q: "Are contract terms documented and signed?", risk: "MEDIUM" },
      { q: "Is an emergency contact number available?", risk: "MEDIUM" },
    ],
  },
  {
    id: "C",
    title: "Tenant Communication",
    icon: Users,
    color: "purple",
    questions: [
      { q: "Have tenants received written waste instructions?", risk: "HIGH" },
      { q: "Is proof of instruction distribution on file?", risk: "HIGH" },
      { q: "Are bin labels clearly displayed?", risk: "MEDIUM" },
      { q: "Have new tenants received instructions on arrival?", risk: "MEDIUM" },
    ],
  },
  {
    id: "D",
    title: "Documentation & Records",
    icon: ClipboardCheck,
    color: "amber",
    questions: [
      { q: "Is a written Waste Management Plan in place?", risk: "HIGH" },
      { q: "Are inspection logs maintained for 6+ months?", risk: "HIGH" },
      { q: "Are complaint records retained and dated?", risk: "MEDIUM" },
      { q: "Is the plan updated after any changes?", risk: "MEDIUM" },
    ],
  },
  {
    id: "E",
    title: "Site & Location",
    icon: Building2,
    color: "rose",
    questions: [
      { q: "Are bins stored in an approved location?", risk: "HIGH" },
      { q: "Is there clear collector vehicle access?", risk: "HIGH" },
      { q: "Are bin areas free from obstruction?", risk: "MEDIUM" },
      { q: "Is signage posted at bin stations?", risk: "MEDIUM" },
    ],
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; badgeBg: string; dot: string; light: string }> = {
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", badge: "text-emerald-700", badgeBg: "bg-emerald-100", dot: "bg-emerald-500", light: "bg-emerald-500/10" },
  blue:    { bg: "bg-blue-50",    border: "border-blue-200",    icon: "text-blue-600",    badge: "text-blue-700",    badgeBg: "bg-blue-100",    dot: "bg-blue-500",    light: "bg-blue-500/10"    },
  purple:  { bg: "bg-purple-50",  border: "border-purple-200",  icon: "text-purple-600",  badge: "text-purple-700",  badgeBg: "bg-purple-100",  dot: "bg-purple-500",  light: "bg-purple-500/10"  },
  amber:   { bg: "bg-amber-50",   border: "border-amber-200",   icon: "text-amber-600",   badge: "text-amber-700",   badgeBg: "bg-amber-100",   dot: "bg-amber-500",   light: "bg-amber-500/10"   },
  rose:    { bg: "bg-rose-50",    border: "border-rose-200",    icon: "text-rose-600",    badge: "text-rose-700",    badgeBg: "bg-rose-100",    dot: "bg-rose-500",    light: "bg-rose-500/10"    },
}

// ─── Animated Checklist Mockup ────────────────────────────────────────────────

const animItems = [
  { q: "Four separate waste streams provided?",    risk: "HIGH",   answer: true,  section: "A" },
  { q: "EA-licensed contractor on file?",          risk: "HIGH",   answer: false, section: "B" },
  { q: "Written instructions given to tenants?",   risk: "HIGH",   answer: true,  section: "C" },
  { q: "Waste Management Plan documented?",        risk: "HIGH",   answer: false, section: "D" },
  { q: "Bin areas have clear vehicle access?",     risk: "MEDIUM", answer: true,  section: "E" },
  { q: "6-month inspection log maintained?",       risk: "HIGH",   answer: false, section: "D" },
  { q: "Contractor licence number recorded?",      risk: "HIGH",   answer: true,  section: "B" },
  { q: "New tenants briefed on arrival?",          risk: "MEDIUM", answer: false, section: "C" },
]

function AnimatedChecklistMockup() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (visibleCount < animItems.length) {
      const t = setTimeout(() => {
        setVisibleCount((v) => v + 1)
        setPulse(true)
        setTimeout(() => setPulse(false), 300)
      }, 700)
      return () => clearTimeout(t)
    } else {
      // Loop after a pause
      const t = setTimeout(() => setVisibleCount(0), 4000)
      return () => clearTimeout(t)
    }
  }, [visibleCount])

  const answered = animItems.slice(0, visibleCount)
  const passes = answered.filter((i) => i.answer).length
  const fails = answered.filter((i) => !i.answer).length
  const highRiskFails = answered.filter((i) => !i.answer && i.risk === "HIGH").length

  const scoreColor = highRiskFails >= 2 ? "text-red-500" : highRiskFails === 1 ? "text-amber-500" : "text-emerald-500"
  const scoreLabel = highRiskFails >= 2 ? "HIGH RISK" : highRiskFails === 1 ? "MEDIUM RISK" : "LOW RISK"
  const scoreBg = highRiskFails >= 2 ? "bg-red-50 border-red-200" : highRiskFails === 1 ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"

  return (
    <div className="relative w-full max-w-md mx-auto select-none">
      {/* Shadow pages */}
      <div className="absolute top-4 left-4 right-0 bottom-0 bg-slate-200 rounded-2xl opacity-30" />
      <div className="absolute top-2 left-2 right-0 bottom-0 bg-slate-100 rounded-2xl opacity-60" />

      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.2)_0%,transparent_60%)]" />
          <div className="relative flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="poppins-semibold text-[11px] text-white/70 uppercase tracking-widest">
                Millstone Compliance
              </span>
            </div>
            <span className="poppins-bold text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              PRE-AUDIT
            </span>
          </div>
          <p className="poppins-bold text-sm text-white mt-1">HMO Compliance Checklist</p>
          <p className="poppins-regular text-[11px] text-white/40 mt-0.5">20 questions · 5 risk sections</p>
        </div>

        {/* Score bar */}
        <div className={`px-5 py-3 border-b border-slate-100 flex items-center justify-between transition-all duration-500 ${visibleCount > 0 ? scoreBg : "bg-slate-50 border-slate-100"}`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="poppins-semibold text-[11px] text-slate-600">{passes} pass</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="poppins-semibold text-[11px] text-slate-600">{fails} gap{fails !== 1 ? "s" : ""}</span>
            </div>
          </div>
          {visibleCount > 0 && (
            <span className={`poppins-bold text-[11px] ${scoreColor} transition-all duration-300`}>
              {scoreLabel}
            </span>
          )}
        </div>

        {/* Questions */}
        <div className="px-5 py-4 space-y-2 min-h-[280px]">
          {animItems.map((item, idx) => {
            const visible = idx < visibleCount
            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-500 ${
                  visible
                    ? item.answer
                      ? "bg-emerald-50/60 border border-emerald-100"
                      : "bg-red-50/60 border border-red-100"
                    : "opacity-0 translate-y-1"
                } ${idx === visibleCount - 1 && pulse ? "scale-[1.01]" : ""}`}
                style={{ transitionDelay: visible ? "0ms" : "0ms" }}
              >
                {visible ? (
                  item.answer ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                  )
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-200 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`poppins-regular text-[11px] leading-snug ${visible ? "text-slate-700" : "text-slate-200"}`}>
                    {item.q}
                  </p>
                </div>
                {visible && (
                  <span
                    className={`poppins-bold text-[9px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                      item.risk === "HIGH"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {item.risk}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="poppins-regular text-[10px] text-slate-400">Progress</span>
            <span className="poppins-semibold text-[10px] text-slate-500">
              {visibleCount} / {animItems.length}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${(visibleCount / animItems.length) * 100}%` }}
            />
          </div>
          <p className="poppins-regular text-[10px] text-slate-400 mt-2 text-center">
            Traffic-light scoring · identifies every gap
          </p>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-emerald-700 text-white poppins-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg shadow-emerald-700/30">
        £47
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HMOComplianceChecklistPage() {
  const [emailCopied, setEmailCopied] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-slate-900 overflow-hidden">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_65%)]" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl" />
          <div className="hidden sm:block absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link href="/templates" className="poppins-medium text-slate-400 hover:text-emerald-700 transition-colors">
                  Templates
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="poppins-medium text-emerald-700">HMO Compliance Checklist</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Most Popular — PDF + Word Included
              </div>

              <h1 className="poppins-bold text-4xl sm:text-5xl lg:text-[3.25rem] text-slate-900 leading-[1.1] tracking-tight mb-6">
                HMO Compliance
                <br />
                <span className="text-emerald-700">Checklist</span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                The 20-question pre-audit framework we use with clients. Traffic-light scoring across 5 risk sections 
                — know exactly where you stand before an EA inspector does.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  { icon: ClipboardCheck, label: "20 Questions · 5 Sections" },
                  { icon: BarChart3,      label: "Traffic-Light Scoring" },
                  { icon: Target,         label: "Gap Identification" },
                  { icon: Download,       label: "PDF + Word Included" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-100 rounded-full poppins-medium text-xs text-slate-700 shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/80 p-6 max-w-md">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="poppins-bold text-5xl text-slate-900">£47</span>
                  <span className="poppins-regular text-sm text-slate-400">one-time · own it forever</span>
                </div>
                <p className="poppins-regular text-sm text-slate-500 mb-6">
                  Sent to your inbox within minutes of purchase.
                </p>
                <a
                  href={MAILTO_LINK}
                  className="group flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl poppins-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/30 mb-3"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  I Want This Checklist
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <p className="poppins-regular text-xs text-slate-400 text-center">
                  Opens your email app with subject & message pre-filled
                </p>
              </div>
            </div>

            {/* Right — animated mockup */}
            <div className="flex flex-col items-center gap-8">
              <AnimatedChecklistMockup />

              <div className="flex items-center gap-3">
                {[{ label: "PDF", desc: "Print-ready" }, { label: "WORD", desc: "Fully editable" }].map(({ label, desc }) => (
                  <div key={label} className="flex flex-col items-center gap-1 px-6 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <span className="poppins-bold text-xs text-emerald-700 tracking-widest">{label}</span>
                    <span className="poppins-regular text-[10px] text-slate-400">{desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs">
                {[
                  { icon: Shield, text: "Aligned to Simpler Recycling Regs 2026" },
                  { icon: Award,  text: "Used by Millstone with real HMO clients" },
                  { icon: Lock,   text: "Secure email delivery — no account needed" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm">
                    <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="poppins-regular text-slate-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Traffic-light scoring explainer ──────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              How The Scoring Works
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              Every "No" Gets a
              <span className="text-emerald-700"> Risk Rating.</span>
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              The checklist doesn't just flag gaps — it tells you how urgently each one needs fixing. 
              Walk away knowing exactly what to prioritise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                dot: "bg-red-500",
                ring: "ring-red-200",
                bg: "bg-red-50 border-red-200",
                label: "HIGH RISK",
                labelColor: "text-red-700",
                title: "Fix Before Any Inspection",
                desc: "These gaps expose you to immediate enforcement action, licence refusal, or Environment Agency prosecution. 9 of the 20 questions carry this rating.",
                count: "9 questions",
                countBg: "bg-red-100 text-red-700",
              },
              {
                dot: "bg-amber-500",
                ring: "ring-amber-200",
                bg: "bg-amber-50 border-amber-200",
                label: "MEDIUM RISK",
                labelColor: "text-amber-700",
                title: "Address Within 30 Days",
                desc: "These gaps are noted by inspectors and can tip a borderline licence application into a refusal. 11 of the 20 questions carry this rating.",
                count: "11 questions",
                countBg: "bg-amber-100 text-amber-700",
              },
              {
                dot: "bg-emerald-500",
                ring: "ring-emerald-200",
                bg: "bg-emerald-50 border-emerald-200",
                label: "COMPLIANT",
                labelColor: "text-emerald-700",
                title: "Evidence & Retain",
                desc: "For every compliant answer, the checklist tells you what written evidence to retain — so you can prove it to an inspector, not just assert it.",
                count: "Evidence prompts",
                countBg: "bg-emerald-100 text-emerald-700",
              },
            ].map(({ dot, ring, bg, label, labelColor, title, desc, count, countBg }) => (
              <div key={label} className={`rounded-2xl border p-7 ${bg} relative overflow-hidden`}>
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${dot} opacity-5`} />
                <div className="flex items-start gap-3 mb-5">
                  <div className={`w-4 h-4 rounded-full ${dot} ring-4 ${ring} flex-shrink-0 mt-0.5`} />
                  <div>
                    <span className={`poppins-bold text-xs tracking-widest uppercase ${labelColor}`}>{label}</span>
                    <h3 className="poppins-bold text-base text-slate-900 mt-1">{title}</h3>
                  </div>
                </div>
                <p className="poppins-regular text-sm text-slate-600 leading-relaxed mb-4">{desc}</p>
                <span className={`poppins-semibold text-xs px-2.5 py-1 rounded-full ${countBg}`}>{count}</span>
              </div>
            ))}
          </div>

          {/* Score summary panel */}
          <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12)_0%,transparent_55%)]" />
            <div className="relative z-10">
              <p className="poppins-semibold text-xs text-emerald-400 uppercase tracking-widest mb-4">
                Gap Identification Worksheet — Included
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { label: "Section", example: "B — Licensed Contractor" },
                  { label: "Question", example: "EA licence number recorded?" },
                  { label: "Your Answer", example: "NO ✗" },
                  { label: "Risk Level", example: "HIGH" },
                  { label: "Recommended Fix", example: "Request licence copy from contractor" },
                  { label: "Target Date", example: "Within 7 days" },
                ].map(({ label, example }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="poppins-semibold text-[10px] text-white/40 uppercase tracking-widest">{label}</span>
                    <div className="h-7 bg-white/8 border border-white/10 rounded-lg px-3 flex items-center">
                      <span className="poppins-regular text-xs text-white/70">{example}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="poppins-regular text-xs text-white/30 mt-6">
                The worksheet auto-populates every "NO" answer from your checklist into an action log with deadlines and fix guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 risk sections ──────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              All 20 Questions
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              5 Risk Sections.
              <span className="text-emerald-700"> Nothing Missed.</span>
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Click each section to see the questions inside.
            </p>
          </div>

          <div className="space-y-3">
            {riskSections.map((section, idx) => {
              const Icon = section.icon
              const c = colorMap[section.color]
              const isOpen = activeSection === idx
              const highCount = section.questions.filter((q) => q.risk === "HIGH").length

              return (
                <div
                  key={section.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? `${c.border} shadow-lg` : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => setActiveSection(isOpen ? -1 : idx)}
                  >
                    <div className="flex items-center gap-4 px-6 py-5">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`poppins-bold text-[10px] ${c.badge} ${c.badgeBg} px-2 py-0.5 rounded-full`}>
                            Section {section.id}
                          </span>
                          <span className="poppins-bold text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            {highCount} HIGH risk
                          </span>
                        </div>
                        <p className="poppins-bold text-sm sm:text-base text-slate-900 mt-1">{section.title}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="poppins-regular text-xs text-slate-400 hidden sm:block">
                          {section.questions.length} questions
                        </span>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${isOpen ? `${c.bg} ${c.border}` : "bg-slate-50 border-slate-200"}`}>
                          <ChevronRight className={`w-3.5 h-3.5 ${isOpen ? c.icon : "text-slate-400"} transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
                        </div>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-6 pb-5 ${c.bg} border-t ${c.border}`}>
                      <div className="pt-4 space-y-2">
                        {section.questions.map(({ q, risk }, qi) => (
                          <div key={qi} className="flex items-start gap-3 bg-white rounded-xl p-3 border border-white shadow-sm">
                            <span className="poppins-bold text-[10px] text-slate-400 w-5 flex-shrink-0 mt-0.5">
                              {String(qi + 1).padStart(2, "0")}
                            </span>
                            <p className="poppins-regular text-sm text-slate-700 flex-1">{q}</p>
                            <span className={`poppins-bold text-[10px] px-2 py-0.5 rounded flex-shrink-0 ${risk === "HIGH" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
                              {risk}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Council communication scripts ────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">
                Bonus Included
              </p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6 leading-snug">
                3 Council Communication
                <span className="text-emerald-700"> Scripts.</span>
              </h2>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                After the checklist identifies your gaps, these scripts give you the exact language to use 
                when communicating with your local authority — without sounding defensive or uninformed.
              </p>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                Each script is drafted in plain, professional English. Edit in your details and send.
              </p>
              <a
                href={MAILTO_LINK}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
              >
                Get The Checklist — £47
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-4">
              {[
                {
                  num: "01",
                  title: "Gap Remediation Notice",
                  desc: "Proactively inform your council of identified gaps and your remediation timeline. Shows good faith before any formal inspection.",
                  tags: ["Proactive", "Pre-Inspection"],
                  lines: [
                    "Dear [Council Housing Officer],",
                    "Following an internal compliance review of [Address] conducted on [Date], I am writing to notify you of the steps being taken to ensure continued compliance with...",
                    "The following gaps were identified and are being addressed within the timescales set out below...",
                  ],
                },
                {
                  num: "02",
                  title: "Inspection Response Letter",
                  desc: "Reply to a formal council inspection notice with evidence of your current compliance position and planned improvements.",
                  tags: ["Reactive", "Post-Inspection"],
                  lines: [
                    "Dear [Inspector Name],",
                    "Thank you for your inspection report dated [Date] regarding the above property. I acknowledge the findings and write to confirm the actions taken to date...",
                    "Please find attached our updated Waste Management Plan and contractor documentation...",
                  ],
                },
                {
                  num: "03",
                  title: "Contractor Change Notification",
                  desc: "Notify the council when you change waste contractor — required under some HMO licence conditions to maintain compliance.",
                  tags: ["Administrative", "Contractor Change"],
                  lines: [
                    "Dear [Council Licensing Team],",
                    "I write to advise that the licensed waste contractor for [Address] has changed with effect from [Date]. The new contractor details are as follows...",
                    "The incoming contractor holds EA Waste Carrier registration number [Ref], valid until [Date]...",
                  ],
                },
              ].map(({ num, title, desc, tags, lines }) => (
                <div key={num} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="poppins-bold text-xs text-slate-300 mr-2">Script {num}</span>
                        <span className="poppins-bold text-sm text-slate-900">{title}</span>
                      </div>
                      <div className="flex gap-1.5">
                        {tags.map((tag) => (
                          <span key={tag} className="poppins-medium text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="poppins-regular text-sm text-slate-500 mb-4">{desc}</p>
                    {/* Letter preview */}
                    <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-2">
                      {lines.map((line, li) => (
                        <p key={li} className={`poppins-regular text-xs leading-relaxed ${li === 0 ? "text-slate-700" : "text-slate-400"}`}>
                          {line}
                        </p>
                      ))}
                      <div className="pt-1 space-y-1">
                        {[80, 60, 70].map((w, wi) => (
                          <div key={wi} className="h-1.5 rounded-full bg-slate-200" style={{ width: `${w}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "20", label: "Questions covering every inspector checklist category", bg: "bg-emerald-50 border-emerald-100", statColor: "text-emerald-700", icon: ClipboardCheck, iconColor: "text-emerald-400" },
                { stat: "5", label: "Risk sections mapped to EA and council frameworks", bg: "bg-blue-50 border-blue-100", statColor: "text-blue-700", icon: Target, iconColor: "text-blue-400" },
                { stat: "3", label: "Pre-written council communication scripts included", bg: "bg-purple-50 border-purple-100", statColor: "text-purple-700", icon: MessageSquare, iconColor: "text-purple-400" },
                { stat: "£5k", label: "Maximum fine avoided with documented compliance", bg: "bg-red-50 border-red-100", statColor: "text-red-700", icon: AlertTriangle, iconColor: "text-red-400" },
              ].map(({ stat, label, bg, statColor, icon: Icon, iconColor }) => (
                <div key={stat} className={`rounded-2xl border p-5 ${bg}`}>
                  <Icon className={`w-5 h-5 mb-3 ${iconColor}`} />
                  <p className={`poppins-bold text-3xl mb-1 ${statColor}`}>{stat}</p>
                  <p className="poppins-regular text-xs text-slate-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">Know Before They Do</p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6 leading-snug">
                The Same Framework
                <span className="text-emerald-700"> Inspectors Use.</span>
              </h2>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
                This checklist mirrors the structure local authority housing officers and EA inspectors 
                follow when they arrive at your property. Every HIGH risk question maps directly to a 
                prosecution risk or licence refusal ground.
              </p>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                Running it yourself gives you the same view they have — before they have it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={MAILTO_LINK}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm"
                >
                  Get The Checklist — £47 <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200"
                >
                  Book A Professional Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-emerald-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: Lock,     label: "Secure Email Delivery" },
              { icon: Star,     label: "Used By Millstone With Real HMO Clients" },
              { icon: BookOpen, label: "No Subscription — Own It Forever" },
              { icon: Mail,     label: "hello@millstonecompliance.com" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-white/90">
                <Icon className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                <span className="poppins-medium text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/20 to-green-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-green-200/20 to-emerald-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-7">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Delivered Within Minutes
          </div>
          <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 tracking-tight mb-5 leading-[1.1]">
            Know Your Risk.
            <br />
            <span className="text-emerald-700">Before They Do.</span>
          </h2>
          <p className="poppins-regular text-slate-600 text-base sm:text-lg mb-4 leading-relaxed">
            £47. No subscription. No login. The same pre-audit framework used by compliance professionals — in your inbox in minutes.
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-10">
            <span className="poppins-bold text-5xl text-slate-900">£47</span>
            <span className="poppins-regular text-slate-400 text-sm">one-time purchase</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href={MAILTO_LINK}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl poppins-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:shadow-emerald-700/35 w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              I Want This Checklist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200 w-full sm:w-auto"
            >
              View All Templates
            </Link>
          </div>
          <p className="poppins-regular text-xs text-slate-400">
            Questions? Email us at{" "}
            <button type="button" onClick={handleCopyEmail} className="text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-2">
              {emailCopied ? "Copied!" : EMAIL_ADDRESS}
            </button>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
