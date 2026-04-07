"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Zap,
  Eye,
  TrendingDown,
  Award,
  Users,
  Shield,
  Phone,
  Mail,
  XCircle,
  ChevronRight,
  PoundSterling,
  Send,
  BadgeCheck,
  Handshake,
  ClipboardCheck,
  Loader2,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { CONTACT_INFO } from "@/lib/constants"

// ─── Question data ────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    image: "/Wheelie bins under waste separation sign.png",
    imageAlt: "Wheelie bins under a waste separation sign",
    imageClass: "h-64 sm:h-72",
    question:
      "Are there separate bins or a clear system for food waste, recycling, and general waste?",
    yesIsGood: true,
  },
  {
    id: 2,
    image: "/Grimy alley waste disposal scene.png",
    imageAlt: "Grimy alley waste disposal scene",
    imageClass: "h-48 sm:h-56",
    question:
      "Are food waste or food packaging being put into general waste bins or bags?",
    yesIsGood: false,
  },
  {
    id: 3,
    image: "/Waste sorting in a utility room.png",
    imageAlt: "Waste sorting in a utility room",
    imageClass: "h-40 sm:h-48",
    question:
      "Are bin labels or waste signs missing, unclear, or ignored by staff?",
    yesIsGood: false,
  },
  {
    id: 4,
    image: "/Industrial alley with overflowing dumpsters.png",
    imageAlt: "Industrial alley with overflowing dumpsters",
    imageClass: "h-72 sm:h-80",
    question:
      "Are outside bins regularly overflowing, smelling badly, or attracting pests?",
    yesIsGood: false,
  },
  {
    id: 5,
    image: "/Office discussion on safety protocols.png",
    imageAlt: "Office discussion on safety protocols",
    imageClass: "h-56 sm:h-64",
    question:
      "Has the client mentioned rising waste costs, contractor problems, or an upcoming inspection?",
    yesIsGood: false,
  },
]

type View = "landing" | "questions" | "results"
type Answer = "yes" | "no"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function countIssues(answers: Record<number, Answer>): number {
  return QUESTIONS.filter((q) => {
    const a = answers[q.id]
    if (!a) return false
    return q.yesIsGood ? a === "no" : a === "yes"
  }).length
}

function buildResults(answers: Record<number, Answer>) {
  return QUESTIONS.map((q) => {
    const answer = answers[q.id] as Answer
    const isIssue = q.yesIsGood ? answer === "no" : answer === "yes"
    return { id: q.id, question: q.question, answer, isIssue }
  })
}

// ─── Landing page ─────────────────────────────────────────────────────────────

function LandingView({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-16 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">
              Partner Tool · On-Site Assessment
            </span>
          </div>

          <h1 className="poppins-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-slate-900 mb-5 max-w-3xl">
            5-Point On-Site{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Waste Check
            </span>
          </h1>

          <p className="poppins-regular text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed mb-10">
            Walk through any client site and answer five quick questions. In
            under two minutes you&apos;ll know exactly where their waste
            compliance gaps are — and what to say next.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                icon: Zap,
                title: "Under 2 minutes",
                desc: "Five targeted questions. No jargon. No lengthy forms.",
              },
              {
                icon: Eye,
                title: "On-site spotting",
                desc: "Visual cues any partner can identify at a glance.",
              },
              {
                icon: TrendingDown,
                title: "Helps clients save",
                desc: "Find waste inefficiencies that are costing the client money.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="poppins-semibold text-slate-800 text-sm">{title}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* What this does for you */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 sm:p-8 mb-10">
            <div className="flex items-center gap-3 mb-5">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="poppins-semibold text-emerald-800 text-sm uppercase tracking-wide">
                What this check does for you
              </span>
            </div>
            <ul className="space-y-3">
              {[
                "Opens a natural conversation about waste compliance during a client visit",
                "Gives you a clear, evidence-based picture you can share with the client",
                "Helps clients understand where they're losing money on waste",
                "Our audits regularly save clients hundreds of pounds a year in waste costs",
                "Positions you as a trusted, compliance-aware partner to your clients",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center gap-5 mb-10">
            {[
              { icon: Shield, label: "Works for any UK business" },
              { icon: Users, label: "Trusted across all sectors" },
              { icon: ClipboardCheck, label: "No technical knowledge needed" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-slate-500 text-sm">
                <Icon className="w-4 h-4 text-emerald-500" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <button
              onClick={onStart}
              className="group inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-600 text-white poppins-bold text-lg px-8 py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all duration-200 active:scale-95"
            >
              Begin Site Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-slate-400 text-sm">Takes under 2 minutes · No login needed</span>
          </div>
        </div>
      </section>

      {/* Working together section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 sm:p-12 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none rounded-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <Handshake className="w-5 h-5 text-emerald-300" />
                  <span className="text-xs poppins-semibold text-emerald-300 uppercase tracking-widest">
                    Working Together
                  </span>
                </div>
                <h2 className="poppins-bold text-2xl sm:text-3xl text-white mb-4 leading-tight">
                  We help your clients fix real problems —{" "}
                  <span className="text-emerald-300">and save money</span>
                </h2>
                <p className="text-emerald-100 text-sm leading-relaxed max-w-lg mb-6">
                  When you spot a compliance issue on-site, we work alongside
                  you to give the client a proper fix — not just a report. Our
                  audits are practical, plain-English, and built around helping
                  businesses reduce waste costs while staying compliant.
                </p>
                <ul className="space-y-3">
                  {[
                    "We turn on-site observations into a clear compliance picture",
                    "Our audits identify waste cost savings, not just legal risks",
                    "Clients get a written action plan they can actually follow",
                    "We work with your schedule — no disruption to your relationship",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-emerald-100 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
                  <PoundSterling className="w-4 h-4 text-emerald-300" />
                  <span className="text-xs poppins-semibold text-emerald-200">
                    Partners earn a referral reward — contact us to find out more
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0">
                <button
                  onClick={onStart}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 poppins-bold text-sm px-8 py-4 rounded-xl shadow-md transition-all duration-200 active:scale-95"
                >
                  Start a site check
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-emerald-400 text-xs text-center mt-3">
                  Free · No login · Under 2 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ─── Question view ────────────────────────────────────────────────────────────

function QuestionView({
  answers,
  currentIndex,
  onAnswer,
  onBack,
}: {
  answers: Record<number, Answer>
  currentIndex: number
  onAnswer: (id: number, answer: Answer) => void
  onBack: () => void
}) {
  const q = QUESTIONS[currentIndex]
  const total = QUESTIONS.length
  const progress = (currentIndex / total) * 100

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <Navigation />

      {/* Progress bar fixed below nav */}
      <div className="fixed top-[60px] sm:top-[64px] left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 text-sm poppins-medium transition-colors active:opacity-70 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-emerald-700 text-sm poppins-semibold tabular-nums shrink-0">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-4 pt-36 pb-10 sm:pt-40 sm:pb-12 max-w-2xl mx-auto w-full">

        {/* Image */}
        <div className={`w-full ${q.imageClass} relative rounded-2xl overflow-hidden shadow-md mb-6`}>
          <Image
            src={q.image}
            alt={q.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 672px"
            priority={currentIndex === 0}
          />
          <div className="absolute top-3 left-3 bg-emerald-900/80 backdrop-blur-sm text-emerald-200 text-xs poppins-bold px-2.5 py-1 rounded-lg tracking-widest uppercase">
            Q{q.id} of {total}
          </div>
        </div>

        {/* Question */}
        <p className="text-slate-800 poppins-semibold text-xl sm:text-2xl leading-snug text-center mb-8 px-1">
          {q.question}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => onAnswer(q.id, "yes")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-5 rounded-2xl poppins-bold text-xl transition-all duration-150 active:scale-95 min-h-[72px] border-2 ${
              answers[q.id] === "yes"
                ? "bg-emerald-600 border-emerald-600 text-white shadow-md"
                : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-400"
            }`}
          >
            <CheckCircle className="w-6 h-6" />
            Yes
          </button>
          <button
            onClick={() => onAnswer(q.id, "no")}
            className={`flex-1 flex items-center justify-center gap-2.5 py-5 rounded-2xl poppins-bold text-xl transition-all duration-150 active:scale-95 min-h-[72px] border-2 ${
              answers[q.id] === "no"
                ? "bg-slate-700 border-slate-700 text-white shadow-md"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
            }`}
          >
            <XCircle className="w-6 h-6" />
            No
          </button>
        </div>

        <p className="text-slate-400 text-sm text-center mt-6 px-4">
          Tap what you can see right now on-site. No guessing needed.
        </p>
      </div>
    </div>
  )
}

// ─── Results view ─────────────────────────────────────────────────────────────

type SubmitState = "idle" | "sending" | "sent" | "error"

function ResultsView({
  answers,
  onReset,
}: {
  answers: Record<number, Answer>
  onReset: () => void
}) {
  const [partnerName, setPartnerName] = useState("")
  const [partnerPhone, setPartnerPhone] = useState("")
  const [partnerEmail, setPartnerEmail] = useState("")
  const [partnerCompany, setPartnerCompany] = useState("")
  const [gdprConsent, setGdprConsent] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const issueCount = countIssues(answers)
  const isClean = issueCount === 0
  const isSerious = issueCount >= 3
  const flags = QUESTIONS.map((q) => {
    const a = answers[q.id]
    const isIssue = q.yesIsGood ? a === "no" : a === "yes"
    return { ...q, answer: a, isIssue }
  })

  const canSubmit =
    partnerName.trim() !== "" &&
    partnerPhone.trim() !== "" &&
    partnerEmail.trim() !== "" &&
    partnerEmail.includes("@") &&
    gdprConsent

  function handleResend() {
    setSubmitState("idle")
    setPartnerName("")
    setPartnerPhone("")
    setPartnerEmail("")
    setPartnerCompany("")
    setGdprConsent(false)
    setErrorMsg("")
  }

  async function handleSubmit() {
    if (!canSubmit) return
    setSubmitState("sending")
    setErrorMsg("")

    try {
      const results = buildResults(answers)
      const res = await fetch("/api/partner-check/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerName: partnerName.trim(),
          partnerPhone: partnerPhone.trim(),
          partnerEmail: partnerEmail.trim(),
          partnerCompany: partnerCompany.trim() || undefined,
          results,
          issueCount,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Submission failed")
      }

      setSubmitState("sent")
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setSubmitState("error")
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-16">

        {/* Score */}
        <div className="text-center mb-10">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 text-3xl poppins-black border-4 ${
              isClean
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : isSerious
                ? "bg-red-50 border-red-200 text-red-600"
                : "bg-amber-50 border-amber-200 text-amber-600"
            }`}
          >
            {isClean ? "✓" : issueCount}
          </div>
          <h1 className="poppins-bold text-3xl sm:text-4xl text-slate-900 mb-3">
            {isClean
              ? "Looking Good"
              : isSerious
              ? "Multiple Issues Found"
              : issueCount === 1
              ? "One Issue Found"
              : "A Few Issues Found"}
          </h1>
          <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">
            {isClean
              ? "No obvious waste compliance issues spotted on this visit. A deeper audit could still confirm everything is in order."
              : `You spotted ${issueCount} potential issue${issueCount > 1 ? "s" : ""} on-site. This client could benefit from a compliance review — and there may be savings to find too.`}
          </p>
        </div>

        {/* Per-question results */}
        <div className="space-y-3 mb-10">
          {flags.map((f) => (
            <div
              key={f.id}
              className={`flex items-start gap-4 rounded-2xl p-4 border ${
                f.isIssue ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"
              }`}
            >
              <div className={`mt-0.5 shrink-0 ${f.isIssue ? "text-red-500" : "text-emerald-600"}`}>
                {f.isIssue ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-700 text-sm poppins-medium leading-snug mb-1">{f.question}</p>
                <span className={`text-xs poppins-bold tracking-wide uppercase ${f.isIssue ? "text-red-500" : "text-emerald-600"}`}>
                  {f.isIssue ? "Issue spotted" : "No issue"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Cost savings callout */}
        {!isClean && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="poppins-semibold text-slate-800 text-sm mb-1">
                  These issues are likely costing the client money
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Waste compliance problems often lead to higher collection costs, fines, or
                  contractor overcharging. Our audits help businesses fix this and reduce
                  their waste spend — typically saving hundreds of pounds a year.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Send results form */}
        {submitState !== "sent" ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="poppins-bold text-slate-900 text-base">Send results to Millstone Compliance</p>
                <p className="text-slate-500 text-sm">We&apos;ll review the results and be in touch.</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mb-5">
              Fill in your details below and tap send. We&apos;ll receive the
              full site check results and follow up with you directly.
            </p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-sm poppins-medium text-slate-700 mb-1.5">
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="e.g. Sarah Jones"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 text-sm poppins-regular placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm poppins-medium text-slate-700 mb-1.5">
                  Your phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={partnerPhone}
                  onChange={(e) => setPartnerPhone(e.target.value)}
                  placeholder="e.g. 07700 900 123"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 text-sm poppins-regular placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm poppins-medium text-slate-700 mb-1.5">
                  Your email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={partnerEmail}
                  onChange={(e) => setPartnerEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 text-sm poppins-regular placeholder:text-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm poppins-medium text-slate-700 mb-1.5">
                  Business name <span className="text-slate-400 poppins-regular">(optional)</span>
                </label>
                <input
                  type="text"
                  value={partnerCompany}
                  onChange={(e) => setPartnerCompany(e.target.value)}
                  placeholder="e.g. ABC Facilities Management"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-800 text-sm poppins-regular placeholder:text-slate-400"
                />
              </div>

              {/* GDPR consent */}
              <label className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                gdprConsent ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50 hover:border-emerald-200"
              }`}>
                <div
                  onClick={() => setGdprConsent(!gdprConsent)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${
                    gdprConsent ? "border-emerald-500 bg-emerald-500" : "border-slate-300 bg-white"
                  }`}
                >
                  {gdprConsent && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="poppins-regular text-xs text-slate-600 leading-relaxed">
                  I consent to Millstone Compliance processing my details and the site check results to follow up with me about this visit. I can request removal at any time.{" "}
                  <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                </span>
              </label>
            </div>

            {submitState === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
                <p className="text-red-600 text-sm poppins-medium">{errorMsg}</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitState === "sending"}
              className="flex items-center justify-center gap-2.5 w-full bg-emerald-700 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white poppins-bold text-base py-4 rounded-xl transition-all duration-150 active:scale-95 shadow-md shadow-emerald-100"
            >
              {submitState === "sending" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending results…
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send results to Millstone
                </>
              )}
            </button>

            <p className="text-slate-400 text-xs text-center mt-3">
              Sends directly to the Millstone Compliance team · Secure &amp; private
            </p>
          </div>
        ) : (
          /* Confirmation */
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 mb-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="poppins-bold text-emerald-900 text-xl mb-2">
              Thank you, {partnerName.split(" ")[0]}!
            </h3>
            <p className="text-emerald-800 text-sm leading-relaxed mb-2">
              We&apos;ve received the site check results and will be in touch
              with you within one working day.
            </p>
            <p className="text-emerald-700 text-sm leading-relaxed mb-5">
              If you need to reach us sooner, give us a call or drop us a message.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-5">
              <a
                href={CONTACT_INFO.tel}
                className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white poppins-semibold py-3 px-5 rounded-xl text-sm transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.mailto}
                className="flex items-center justify-center gap-2 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-800 poppins-semibold py-3 px-5 rounded-xl text-sm transition-all active:scale-95"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-emerald-200">
              <button
                onClick={handleResend}
                className="text-sm poppins-medium text-emerald-700 hover:text-emerald-900 hover:underline transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Send with different details
              </button>
              <span className="hidden sm:block text-emerald-300">·</span>
              <button
                onClick={onReset}
                className="text-sm poppins-medium text-slate-500 hover:text-slate-700 hover:underline transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Change my answers
              </button>
            </div>
          </div>
        )}

        {/* Clean site — still reach out */}
        {isClean && submitState !== "sent" && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
            <p className="poppins-semibold text-slate-700 text-sm mb-2">
              No issues — but still worth a conversation
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Even a clean check can benefit from a deeper audit. Get in touch
              and we can discuss whether a full review would help the client
              strengthen their compliance position and reduce costs.
            </p>
            <a
              href={CONTACT_INFO.tel}
              className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white poppins-semibold py-3 px-5 rounded-xl text-sm transition-all active:scale-95 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              Call us — {CONTACT_INFO.phone}
            </a>
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 poppins-semibold py-3.5 rounded-xl transition-all duration-150 active:scale-95 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Start a new check
          </button>
          <Link
            href="/resources"
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 poppins-semibold py-3.5 rounded-xl transition-all duration-150 active:scale-95 text-sm"
          >
            Back to Resources
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function PartnerCheckPage() {
  const [view, setView] = useState<View>("landing")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})

  function handleStart() {
    setView("questions")
    setCurrentIndex(0)
    setAnswers({})
  }

  function handleAnswer(id: number, answer: Answer) {
    const updated = { ...answers, [id]: answer }
    setAnswers(updated)
    if (currentIndex < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentIndex((i) => i + 1), 220)
    } else {
      setTimeout(() => setView("results"), 220)
    }
  }

  function handleBack() {
    if (currentIndex === 0) setView("landing")
    else setCurrentIndex((i) => i - 1)
  }

  function handleReset() {
    setView("landing")
    setCurrentIndex(0)
    setAnswers({})
  }

  if (view === "landing") return <LandingView onStart={handleStart} />
  if (view === "results") return <ResultsView answers={answers} onReset={handleReset} />
  return (
    <QuestionView
      answers={answers}
      currentIndex={currentIndex}
      onAnswer={handleAnswer}
      onBack={handleBack}
    />
  )
}
