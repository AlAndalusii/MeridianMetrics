"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle,
  ShieldCheck, PoundSterling, ClipboardList, ChevronRight,
  Sparkles, TrendingDown,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Data ────────────────────────────────────────────────────────────────────
const questions = [
  {
    id: 1,
    label: "Cost Transparency",
    text: "Do you know your current cost per tonne for clinical waste collection?",
    context: "Most contracts hide the per-tonne rate inside bundled pricing.",
    warning: "Most care homes overpay by 20–40% without ever benchmarking. Your contractor knows this.",
    icon: PoundSterling,
  },
  {
    id: 2,
    label: "Waste Segregation",
    text: "Is your offensive waste collected separately from infectious clinical waste?",
    context: "Incontinence pads and non-infectious items should never be in yellow bags.",
    warning: "Mixing streams forces you to pay premium infectious disposal rates on much cheaper waste — a systematic overcharge.",
    icon: ClipboardList,
  },
  {
    id: 3,
    label: "Independent Review",
    text: "Has someone independent reviewed your contractor rates in the last 12 months?",
    context: "Not a renewal conversation with the same contractor — an independent benchmark.",
    warning: "Contractor loyalty is rewarded with price drift. Unreviewed contracts move 15–30% above market rate annually.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    label: "Collection Efficiency",
    text: "Does your collection frequency match your actual waste output week to week?",
    context: "Frequency is usually set at contract start and never revisited.",
    warning: "Over-collection is the most common unnecessary line item we find. You're paying for capacity you don't use.",
    icon: TrendingDown,
  },
  {
    id: 5,
    label: "Documentation",
    text: "Do you hold a current pre-acceptance audit document from your clinical waste contractor?",
    context: "This document confirms your contractor has audited your waste classification.",
    warning: "Without this, you have no defence in a CQC or Environment Agency inspection. It also voids many insurance policies.",
    icon: ClipboardList,
  },
]

type Answer = "yes" | "no" | null

// ─── Animated score ring ──────────────────────────────────────────────────────
function ScoreRing({ score, total }: { score: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100)
  const r = 54
  const circ = 2 * Math.PI * r
  const dash = circ * (pct / 100)
  const color = pct === 100 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444"

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" className="rotate-[-90deg]">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={r} fill="none"
        stroke={color} strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  )
}

// ─── Question card ────────────────────────────────────────────────────────────
function QuestionCard({
  q, answer, onAnswer, index, revealed,
}: {
  q: typeof questions[0]
  answer: Answer
  onAnswer: (id: number, val: "yes" | "no") => void
  index: number
  revealed: boolean
}) {
  const isYes = answer === "yes"
  const isNo  = answer === "no"
  const done  = answer !== null

  return (
    <div
      className={`
        relative rounded-3xl border transition-all duration-500 overflow-hidden
        ${isNo  ? "border-red-200/80 shadow-[0_8px_32px_-8px_rgba(239,68,68,0.15)]"
        : isYes ? "border-emerald-200/80 shadow-[0_8px_32px_-8px_rgba(16,185,129,0.12)]"
        :         "border-slate-200/60 shadow-sm hover:border-slate-300/80 hover:shadow-md"}
        bg-white
      `}
      style={{
        opacity:   revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 70}ms, transform 0.5s ease ${index * 70}ms, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 ${
          isNo ? "bg-red-400" : isYes ? "bg-emerald-400" : "bg-slate-200"
        }`}
      />

      <div className="pl-6 pr-5 py-5 sm:py-6">
        <div className="flex items-start gap-4">

          {/* Number / state badge */}
          <div
            className={`
              flex-shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center
              transition-all duration-400 font-bold text-sm mt-0.5
              ${isNo
                ? "bg-red-100 text-red-600"
                : isYes
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-400"}
            `}
          >
            {isYes ? <CheckCircle className="w-4.5 h-4.5 w-[18px] h-[18px]" />
             : isNo  ? <AlertTriangle className="w-[18px] h-[18px]" />
             : <span className="text-xs poppins-bold">{String(index + 1).padStart(2, "0")}</span>}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`
                poppins-semibold text-[10px] uppercase tracking-[0.14em]
                ${isNo ? "text-red-500" : isYes ? "text-emerald-600" : "text-slate-400"}
              `}>
                {q.label}
              </span>
            </div>
            <p className={`poppins-semibold text-sm sm:text-[15px] leading-relaxed mb-1
              ${done ? "text-slate-900" : "text-slate-700"}`}>
              {q.text}
            </p>
            {!done && (
              <p className="poppins-regular text-xs text-slate-400 leading-relaxed mt-1">
                {q.context}
              </p>
            )}
          </div>

          {/* YES / NO toggle */}
          <div className="flex-shrink-0 flex rounded-xl overflow-hidden border border-slate-200 ml-2 shadow-sm">
            <button
              onClick={() => onAnswer(q.id, "yes")}
              className={`
                px-3.5 sm:px-4 py-2.5 text-[11px] poppins-bold tracking-wider
                transition-all duration-200 border-r border-slate-200
                ${isYes
                  ? "bg-emerald-500 text-white border-r-transparent shadow-inner"
                  : "bg-white text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"}
              `}
            >
              YES
            </button>
            <button
              onClick={() => onAnswer(q.id, "no")}
              className={`
                px-3.5 sm:px-4 py-2.5 text-[11px] poppins-bold tracking-wider
                transition-all duration-200
                ${isNo
                  ? "bg-red-500 text-white shadow-inner"
                  : "bg-white text-slate-400 hover:bg-red-50 hover:text-red-600"}
              `}
            >
              NO
            </button>
          </div>
        </div>

        {/* Warning — NO state */}
        {isNo && (
          <div className="mt-4 ml-13 ml-[52px] flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-4 py-3.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="poppins-bold text-[11px] text-red-600 mb-0.5">This is costing you money.</p>
              <p className="poppins-regular text-[11px] text-red-500/80 leading-relaxed">{q.warning}</p>
            </div>
          </div>
        )}

        {/* Confirmation — YES state */}
        {isYes && (
          <div className="mt-3 ml-[52px] flex items-center gap-2.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <p className="poppins-medium text-[11px] text-emerald-600">
              Good — keep this documented and benchmarked annually.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Results panel ────────────────────────────────────────────────────────────
function ResultsPanel({
  gaps, total, gapQuestions, onGetResults,
}: {
  gaps: number; total: number; gapQuestions: string[]; onGetResults: () => void
}) {
  const [ring, setRing] = useState(false)
  useEffect(() => { const t = setTimeout(() => setRing(true), 100); return () => clearTimeout(t) }, [])

  const yeses  = total - gaps
  const cfg = gaps === 0
    ? { label: "Fully Compliant", sub: "Your setup looks solid. Document everything and review annually.",      badge: "bg-emerald-100 text-emerald-800 border-emerald-200" }
    : gaps <= 2
    ? { label: "Review Needed",   sub: "These gaps are fixable. Most are resolved within a single review.",    badge: "bg-amber-100 text-amber-800 border-amber-200" }
    : { label: "High Risk",       sub: "Multiple gaps. Care homes at this level overpay by £3,000–£8,000/yr.", badge: "bg-red-100 text-red-800 border-red-200" }

  return (
    <div className="rounded-3xl overflow-hidden border border-slate-200/60 bg-white shadow-xl shadow-slate-200/60">
      {/* Dark header */}
      <div className="bg-gradient-to-br from-[#1C2B3A] via-[#1e3040] to-[#1a3a2a] px-7 py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="relative flex flex-col sm:flex-row items-center gap-7">
          {/* Ring */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="poppins-bold text-3xl text-white leading-none">{ring ? yeses : 0}</p>
                <p className="poppins-regular text-[10px] text-white/40 mt-0.5">of {total}</p>
              </div>
            </div>
            <ScoreRing score={ring ? yeses : 0} total={total} />
          </div>
          {/* Text */}
          <div className="text-center sm:text-left">
            <span className={`inline-flex items-center gap-1.5 poppins-bold text-[10px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border mb-3 ${cfg.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${gaps === 0 ? "bg-emerald-500" : gaps <= 2 ? "bg-amber-500" : "bg-red-500"}`} />
              {cfg.label}
            </span>
            <h3 className="poppins-bold text-white text-xl mb-1.5">
              {gaps === 0 ? "No gaps found." : `${gaps} gap${gaps > 1 ? "s" : ""} identified.`}
            </h3>
            <p className="poppins-regular text-slate-400 text-sm leading-relaxed max-w-xs">{cfg.sub}</p>
          </div>
        </div>
      </div>

      {/* Gap list */}
      {gapQuestions.length > 0 && (
        <div className="px-7 py-5 border-b border-slate-100 space-y-2.5">
          <p className="poppins-semibold text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-3">Gaps to address</p>
          {gapQuestions.map((g, i) => (
            <div key={i} className="flex items-start gap-3 group">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mt-0.5">
                <AlertTriangle className="w-2.5 h-2.5 text-red-500" />
              </div>
              <p className="poppins-regular text-xs text-slate-600 leading-relaxed">{g}</p>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="px-7 py-6">
        <button
          onClick={onGetResults}
          className="
            w-full group flex items-center justify-center gap-2.5
            bg-emerald-700 hover:bg-emerald-800 text-white
            poppins-bold text-sm tracking-wide
            px-6 py-4 rounded-2xl
            shadow-[0_4px_20px_rgba(5,150,105,0.30)]
            hover:shadow-[0_8px_32px_rgba(5,150,105,0.40)]
            transition-all duration-200 active:scale-[0.98]
          "
        >
          Get Your Free Savings Check
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
        <div className="flex items-center justify-center gap-5 mt-4">
          {["No obligation", "15-minute call", "Results emailed"].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="poppins-regular text-[10px] text-slate-400">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Email capture ─────────────────────────────────────────────────────────────
function EmailForm({
  gaps, answers, gapLabels, onBack,
}: {
  gaps: number; answers: Record<number, Answer>; gapLabels: string[]; onBack: () => void
}) {
  const [form, setForm]     = useState({ name: "", email: "", company: "", phone: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [errMsg, setErrMsg] = useState("")

  const valid = form.name.trim() && form.email.includes("@") && form.company.trim()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) return
    setStatus("loading")
    setErrMsg("")
    try {
      const res = await fetch("/api/clinical-waste-checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInfo: {
            name: form.name, email: form.email,
            company: form.company, phone: form.phone || undefined,
          },
          answers: answers as Record<number, "yes" | "no">,
          gaps,
          gapLabels,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("done")
    } catch {
      setStatus("error")
      setErrMsg("Something went wrong — please email us directly at hello@millstonecompliance.com")
    }
  }

  if (status === "done") {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-9 h-9 text-emerald-600" />
        </div>
        <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-3">Results sent.</h2>
        <p className="poppins-regular text-slate-500 text-base leading-relaxed max-w-sm mb-8">
          Check your inbox. Our team will also be in touch within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="https://millstonecompliance.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 transition-all duration-200"
          >
            Visit Millstone Compliance <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 poppins-semibold text-sm px-6 py-3.5 rounded-2xl transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 poppins-medium text-sm mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" /> Back to checklist
      </button>

      {/* Score recap */}
      <div className={`
        flex items-center gap-4 rounded-2xl border px-5 py-4 mb-8
        ${gaps === 0 ? "border-emerald-200 bg-emerald-50/60"
        : gaps <= 2  ? "border-amber-200 bg-amber-50/60"
        :              "border-red-200 bg-red-50/60"}
      `}>
        <div className={`
          w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl poppins-bold
          ${gaps === 0 ? "bg-emerald-100 text-emerald-700"
          : gaps <= 2  ? "bg-amber-100 text-amber-700"
          :              "bg-red-100 text-red-700"}
        `}>{gaps}</div>
        <div>
          <p className="poppins-bold text-sm text-slate-900">{gaps === 0 ? "No gaps found" : `${gaps} gap${gaps > 1 ? "s" : ""} identified`}</p>
          <p className="poppins-regular text-xs text-slate-500">
            {gaps === 0
              ? "Your setup looks solid — keep it documented."
              : "Enter your details below to receive your personalised report."}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-3xl border border-slate-200/60 bg-white shadow-sm overflow-hidden">
        <div className="px-7 sm:px-8 pt-8 pb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-5">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span className="poppins-semibold text-[10px] uppercase tracking-[0.14em] text-emerald-700">Free · No Obligation</span>
          </div>
          <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-2">
            Get your personalised report
          </h2>
          <p className="poppins-regular text-slate-500 text-sm leading-relaxed mb-8 max-w-md">
            We&apos;ll email your full results and one of our specialists will review your gaps within one business day — at no cost.
          </p>
        </div>

        <form onSubmit={submit} className="px-7 sm:px-8 pb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="poppins-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">Full name <span className="text-red-400 normal-case tracking-normal">*</span></label>
              <input
                type="text" required
                placeholder="Jane Smith"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 focus:bg-white transition-all placeholder:text-slate-300 poppins-regular"
              />
            </div>
            <div className="space-y-1.5">
              <label className="poppins-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">Work email <span className="text-red-400 normal-case tracking-normal">*</span></label>
              <input
                type="email" required
                placeholder="jane@carehome.co.uk"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 focus:bg-white transition-all placeholder:text-slate-300 poppins-regular"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="poppins-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">Care home / company <span className="text-red-400 normal-case tracking-normal">*</span></label>
              <input
                type="text" required
                placeholder="Sunrise Care Home"
                value={form.company}
                onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                className="w-full px-4 py-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 focus:bg-white transition-all placeholder:text-slate-300 poppins-regular"
              />
            </div>
            <div className="space-y-1.5">
              <label className="poppins-semibold text-[11px] uppercase tracking-[0.1em] text-slate-500">
                Phone <span className="poppins-regular normal-case tracking-normal text-slate-300">(optional)</span>
              </label>
              <input
                type="tel"
                placeholder="0121 000 0000"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 focus:bg-white transition-all placeholder:text-slate-300 poppins-regular"
              />
            </div>
          </div>

          {errMsg && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3.5">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 poppins-regular">{errMsg}</p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={!valid || status === "loading"}
              className="
                w-full group flex items-center justify-center gap-2.5
                bg-emerald-700 hover:bg-emerald-800 text-white
                disabled:opacity-40 disabled:cursor-not-allowed
                poppins-bold text-sm tracking-wide
                px-6 py-4 rounded-2xl
                shadow-[0_4px_20px_rgba(5,150,105,0.25)]
                hover:shadow-[0_8px_32px_rgba(5,150,105,0.35)]
                transition-all duration-200 active:scale-[0.98]
              "
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending your report…
                </>
              ) : (
                <>
                  Get Your Free Savings Check
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
            <p className="text-center poppins-regular text-[11px] text-slate-400 mt-3">
              No spam. No obligation. We respect your privacy.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ClinicalWasteQuickCheckPage() {
  const [answers, setAnswers]     = useState<Record<number, Answer>>({})
  const [showForm, setShowForm]   = useState(false)
  const [mounted, setMounted]     = useState(false)
  const resultsRef                = useRef<HTMLDivElement>(null)

  useEffect(() => { setMounted(true) }, [])

  const answered  = Object.values(answers).filter(Boolean).length
  const total     = questions.length
  const allDone   = answered === total
  const gaps      = Object.values(answers).filter(a => a === "no").length
  const gapLabels = questions.filter(q => answers[q.id] === "no").map(q => q.text)

  function handleAnswer(id: number, val: "yes" | "no") {
    const next = { ...answers, [id]: val }
    setAnswers(next)
    if (Object.keys(next).length === total && resultsRef.current) {
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 160)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-emerald-100/70 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Back */}
          <div
            className="flex justify-center mb-8"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease" }}
          >
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-emerald-600/70 hover:text-emerald-700 poppins-medium text-sm transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" /> All Resources
            </Link>
          </div>

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)", transition: "opacity 0.5s ease 60ms, transform 0.5s ease 60ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">
              Clinical Waste · Care Homes · UK
            </span>
          </div>

          <h1
            className="poppins-bold text-4xl sm:text-5xl md:text-6xl leading-[1.06] tracking-tight text-slate-900 mb-5"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(14px)", transition: "opacity 0.55s ease 100ms, transform 0.55s ease 100ms" }}
          >
            Is your waste contract{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              costing you too much?
            </span>
          </h1>

          <p
            className="poppins-regular text-slate-500 text-base sm:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(10px)", transition: "opacity 0.55s ease 160ms, transform 0.55s ease 160ms" }}
          >
            Five clinical waste questions designed for directors and operations leads.
            Identify exactly where you&apos;re losing money, then get a free specialist review.
          </p>

          {/* Stat pills */}
          <div
            className="flex flex-wrap justify-center gap-3"
            style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.55s ease 220ms" }}
          >
            {[
              { v: "5",     l: "Questions" },
              { v: "2 min", l: "To complete" },
              { v: "Free",  l: "Results & review" },
            ].map(s => (
              <div key={s.l} className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="poppins-bold text-sm text-slate-900">{s.v}</span>
                <span className="poppins-regular text-xs text-slate-400">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKLIST / FORM ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-slate-50/80 to-white px-4 sm:px-6 pt-14 pb-24">
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />

        <div className="max-w-3xl mx-auto">
          {!showForm ? (
            <div className="space-y-3">

              {/* Progress header */}
              <div
                className="bg-white rounded-2xl border border-slate-200/60 shadow-sm px-6 py-4 flex items-center gap-4 mb-6"
                style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 200ms" }}
              >
                <div className="flex-shrink-0">
                  <p className="poppins-semibold text-[10px] uppercase tracking-[0.14em] text-slate-400 mb-0.5">Progress</p>
                  <p className="poppins-bold text-sm text-slate-900">{answered} of {total} answered</p>
                </div>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${(answered / total) * 100}%` }}
                  />
                </div>
                {allDone && (
                  <div className="flex-shrink-0 flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span className="poppins-bold text-[10px] text-emerald-700 uppercase tracking-wide">Complete</span>
                  </div>
                )}
              </div>

              {/* Questions */}
              {questions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  answer={answers[q.id] ?? null}
                  onAnswer={handleAnswer}
                  index={i}
                  revealed={mounted}
                />
              ))}

              {/* Results or prompt */}
              <div ref={resultsRef} className="pt-2">
                {allDone ? (
                  <ResultsPanel
                    gaps={gaps}
                    total={total}
                    gapQuestions={gapLabels}
                    onGetResults={() => {
                      setShowForm(true)
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  />
                ) : (
                  <div
                    className="rounded-3xl border border-dashed border-slate-200 bg-white/60 px-6 py-6 text-center"
                    style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 500ms" }}
                  >
                    <p className="poppins-medium text-sm text-slate-400">
                      Answer all {total} questions to see your compliance score
                    </p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <EmailForm
              gaps={gaps}
              answers={answers}
              gapLabels={gapLabels}
              onBack={() => setShowForm(false)}
            />
          )}

          {/* ── Trust cards ───────────────────────────────────────────── */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Fully Independent",
                body: "We earn nothing from contractors. Our review is conflict-free and benchmark-driven.",
                color: "text-emerald-600",
                bg: "bg-emerald-50 border-emerald-100",
              },
              {
                icon: PoundSterling,
                title: "£2k–£8k Saved",
                body: "The average care home saves between £2,000 and £8,000 per year after an independent review.",
                color: "text-amber-600",
                bg: "bg-amber-50 border-amber-100",
              },
              {
                icon: ClipboardList,
                title: "CQC & EA Aligned",
                body: "We make sure your documentation stands up to both CQC inspection and EA compliance checks.",
                color: "text-slate-700",
                bg: "bg-slate-50 border-slate-200",
              },
            ].map(item => (
              <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex flex-col gap-3.5">
                <div className={`w-9 h-9 rounded-xl border ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div>
                  <p className="poppins-bold text-sm text-slate-900 mb-1">{item.title}</p>
                  <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA banner ─────────────────────────────────────────────── */}
          <div className="mt-6 rounded-3xl overflow-hidden">
            <div className="relative bg-gradient-to-br from-[#0d1f2d] via-[#1C2B3A] to-[#0f2d1e] px-7 sm:px-10 py-9 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
                <div>
                  <p className="poppins-semibold text-[10px] uppercase tracking-[0.16em] text-emerald-400 mb-2.5">
                    Free · No Obligation · 15 Minutes
                  </p>
                  <h3 className="poppins-bold text-xl sm:text-2xl text-white mb-2">
                    Ready to cut your waste costs?
                  </h3>
                  <p className="poppins-regular text-slate-400 text-sm leading-relaxed max-w-sm">
                    Speak with a specialist and find out exactly how much your care home could save.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 w-full sm:w-auto flex-shrink-0">
                  <Link
                    href="https://millstonecompliance.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0d1f2d] poppins-bold text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 whitespace-nowrap shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.45)]"
                  >
                    Book Free Call <ChevronRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/resources"
                    className="flex items-center justify-center gap-2 text-slate-500 hover:text-white poppins-medium text-xs py-2 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back to all guides
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
