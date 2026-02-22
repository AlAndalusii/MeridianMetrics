"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BadgeCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Mail,
  Phone,
  Building2,
  User,
  Calendar,
  Download,
  Package,
  ChevronRight,
  Lock,
  Star,
  TrendingUp,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import ErrorBoundary from "@/components/ErrorBoundary"

interface GapItem {
  title: string
  description: string
  risk: string
}

interface ScoreResult {
  score: number
  topGaps: GapItem[]
  strengths: string[]
  recommendedSteps: string[]
  urgencyLevel: "High" | "Medium" | "Low"
  aiAnalysis: string
  source?: string
}

interface LeadForm {
  name: string
  email: string
  company: string
  phone: string
  gdprConsent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  company?: string
  phone?: string
  gdprConsent?: string
}

function CircularScore({ score, color, animate }: { score: number; color: string; animate: boolean }) {
  const radius = 80
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!animate) return
    let frame = 0
    const total = 80
    const interval = setInterval(() => {
      frame++
      const progress = frame / total
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(score * eased))
      if (frame >= total) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [animate, score])

  const strokeDashoffset = circumference - (displayed / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="-rotate-90">
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.05s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="poppins-black text-5xl" style={{ color }}>{displayed}</span>
        <span className="poppins-medium text-sm text-gray-500">/100</span>
      </div>
    </div>
  )
}

function ResultsContent() {
  const router = useRouter()
  const [result, setResult] = useState<ScoreResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState<LeadForm>({ name: "", email: "", company: "", phone: "", gdprConsent: false })
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [animateScore, setAnimateScore] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const leadFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ppt_gap_analyzer_result")
      const isComplete = localStorage.getItem("ppt_gap_analyzer_complete")

      if (!raw || !isComplete) {
        router.push("/ppt-gap-analyser")
        return
      }

      const parsed: ScoreResult = JSON.parse(raw)
      setResult(parsed)

      const alreadySubmitted = localStorage.getItem("ppt_gap_analyzer_lead_submitted")
      if (alreadySubmitted) setSubmitted(true)

      setIsLoading(false)
      setTimeout(() => setAnimateScore(true), 400)
    } catch {
      router.push("/ppt-gap-analyser")
    }
  }, [router])

  const getZone = (score: number) => {
    if (score <= 49) return { label: "High Risk — Significant PPT Exposure", color: "#dc2626", bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "bg-red-100 text-red-700", icon: XCircle, zone: "red" }
    if (score <= 79) return { label: "Compliance Gaps — Action Required", color: "#d97706", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100 text-amber-700", icon: AlertTriangle, zone: "amber" }
    return { label: "Compliant — Minor Improvements Needed", color: "#059669", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", badge: "bg-green-100 text-green-700", icon: CheckCircle, zone: "green" }
  }

  const validateForm = () => {
    const errs: FormErrors = {}
    if (!leadForm.name.trim()) errs.name = "Full name is required"
    if (!leadForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email)) errs.email = "Valid work email required"
    if (!leadForm.company.trim()) errs.company = "Company name is required"
    if (!leadForm.gdprConsent) errs.gdprConsent = "You must consent to receive your results"
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm() || !result) return
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const answers = (() => {
        try {
          const raw = localStorage.getItem("ppt_gap_analyzer_answers")
          return raw ? Object.entries(JSON.parse(raw)).map(([section, answer]) => ({
            section,
            question: section,
            answer: answer as string,
          })) : []
        } catch { return [] }
      })()

      const res = await fetch("/api/ppt-gap-analyser/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadData: leadForm,
          ...result,
          answers,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Submission failed")
      }

      localStorage.setItem("ppt_gap_analyzer_lead_submitted", "true")
      setSubmitted(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToLeadForm = () => {
    setShowLeadForm(true)
    setTimeout(() => leadFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="poppins-medium text-emerald-700">Calculating your PPT compliance score…</p>
        </div>
      </div>
    )
  }

  if (!result) return null

  const zone = getZone(result.score)
  const ZoneIcon = zone.icon
  const isHighPriority = result.score < 80

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-full border border-emerald-100">
              <Package className="w-4 h-4 text-emerald-600" />
              <span className="text-sm poppins-medium text-emerald-700 hidden sm:block">PPT Gap Analyser Results</span>
            </div>
            <Button
              onClick={() => setShowCalendly(true)}
              size="sm"
              className="poppins-semibold bg-gradient-to-r from-emerald-600 to-green-600 text-white hidden sm:flex items-center gap-1.5 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <Calendar className="w-4 h-4" />
              Book Audit
            </Button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Score hero */}
        <div className={`${zone.bg} ${zone.border} border-2 rounded-3xl p-8 md:p-10 text-center shadow-lg`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm poppins-semibold" style={{ background: `${zone.color}15`, color: zone.color }}>
            <ZoneIcon className="w-4 h-4" />
            PPT Compliance Score
          </div>

          <div className="flex justify-center mb-6">
            <CircularScore score={result.score} color={zone.color} animate={animateScore} />
          </div>

          <h2 className="poppins-bold text-2xl md:text-3xl mb-2" style={{ color: zone.color }}>
            {zone.label}
          </h2>

          <p className="poppins-regular text-gray-600 text-base leading-relaxed max-w-xl mx-auto mb-6">
            {result.aiAnalysis}
          </p>

          {/* Traffic light indicator */}
          <div className="flex items-center justify-center gap-6 mb-6">
            {[
              { zone: "red", label: "0–49", active: result.score <= 49 },
              { zone: "amber", label: "50–79", active: result.score >= 50 && result.score <= 79 },
              { zone: "green", label: "80–100", active: result.score >= 80 },
            ].map(({ zone: z, label, active }) => (
              <div key={z} className={`flex flex-col items-center gap-1 transition-all ${active ? "scale-125" : "opacity-40"}`}>
                <div
                  className={`w-5 h-5 rounded-full ${active ? "ring-2 ring-offset-2" : ""} ${
                    z === "red" ? "ring-red-500" : z === "amber" ? "ring-amber-500" : "ring-green-500"
                  }`}
                  style={{
                    background: z === "red" ? "#dc2626" : z === "amber" ? "#d97706" : "#059669",
                  }}
                />
                <span className="text-xs poppins-medium text-gray-500">{label}</span>
              </div>
            ))}
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm poppins-semibold ${zone.badge}`}>
            Urgency Level: {result.urgencyLevel}
          </div>
        </div>

        {/* CTA block */}
        {isHighPriority ? (
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-8 text-white shadow-xl shadow-red-500/20">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle className="w-7 h-7 text-red-200 flex-shrink-0 mt-0.5" />
              <div>
                <p className="poppins-bold text-lg text-red-100 mb-1">Critical PPT gaps identified — avoid HMRC penalties</p>
                <p className="poppins-regular text-sm text-red-200">HMRC is actively auditing PPT-registered businesses. Unresolved gaps can result in back-dated tax demands, penalties up to 100% of tax owed, and criminal prosecution.</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCalendly(true)}
              className="w-full poppins-bold py-5 text-base bg-white text-red-700 hover:bg-red-50 rounded-2xl transition-all hover:shadow-lg group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              BOOK YOUR £295 COMPLIANCE AUDIT
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-center text-xs text-red-300 mt-3 poppins-regular">Limited availability — priority booking for high-risk businesses</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-8 text-white shadow-xl shadow-emerald-500/20">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-200 flex-shrink-0 mt-0.5" />
              <div>
                <p className="poppins-bold text-lg text-emerald-100 mb-1">You&apos;re mostly compliant — let&apos;s close the final gaps</p>
                <p className="poppins-regular text-sm text-emerald-200">A short consultation will help you address the remaining gaps and ensure you&apos;re fully protected before any HMRC review.</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCalendly(true)}
              className="w-full poppins-bold py-5 text-base bg-white text-emerald-700 hover:bg-emerald-50 rounded-2xl transition-all hover:shadow-lg group"
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              GET YOUR FREE CONSULTATION
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-center text-xs text-emerald-300 mt-3 poppins-regular">No obligation — 20-minute call with a PPT compliance expert</p>
          </div>
        )}

        {/* Recommended For You */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 border border-emerald-100 shadow-md">
          <h3 className="poppins-bold text-xl text-emerald-900 mb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-600" />
            Recommended For You
          </h3>
          <p className="poppins-regular text-sm text-gray-500 mb-6">Based on your compliance score and answers</p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6">
            <h4 className="poppins-bold text-emerald-900 mb-1">Free 15-Minute Consultation</h4>
            <p className="poppins-regular text-sm text-emerald-700 mb-4">Get personalised advice on your PPT compliance gaps</p>
            <ul className="space-y-2 mb-5">
              {[
                "Discuss your results",
                "Calculate penalty exposure",
                "Create action plan",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm poppins-medium text-emerald-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => setShowCalendly(true)}
              className="w-full poppins-bold py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
            >
              Book Free Call
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Service tiers */}
          <div className="space-y-3">
            {/* £295 Audit */}
            <div className="border border-emerald-200 rounded-2xl p-5 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="poppins-bold text-emerald-900">£295 — Compliance Audit</p>
                  <p className="poppins-regular text-xs text-gray-500 mt-0.5">90-minute on-site assessment</p>
                </div>
              </div>
              <ul className="space-y-1 mb-4">
                {[
                  "Identifies all PPT compliance gaps",
                  "Written report within 24 hours",
                  "Specific action plan",
                  "Penalty risk calculation",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs poppins-medium text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => setShowCalendly(true)}
                variant="outline"
                className="w-full poppins-semibold border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-xl py-3"
              >
                Book Audit
              </Button>
            </div>

            {/* £495 Setup */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="poppins-bold text-gray-900">£495 — Audit + Implementation Support</p>
                  <p className="poppins-regular text-xs text-gray-500 mt-0.5">Everything in Compliance Audit, plus</p>
                </div>
              </div>
              <ul className="space-y-1 mb-4">
                {[
                  "30-day email/phone support",
                  "Help sourcing compliant suppliers",
                  "Record-keeping templates",
                  "Follow-up compliance check",
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs poppins-medium text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowCalendly(true)}
                className="w-full text-center text-sm poppins-semibold text-emerald-600 hover:text-emerald-800 hover:underline transition-colors py-2"
              >
                See Full Setup Option →
              </button>
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-8 border border-emerald-100 shadow-md">
          <h3 className="poppins-bold text-xl text-emerald-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Compliance Area Breakdown
          </h3>

          {/* Top 3 gaps */}
          {result.topGaps?.length > 0 && (
            <div className="mb-6">
              <p className="poppins-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">Critical Gaps Found</p>
              <div className="space-y-3">
                {result.topGaps.map((gap, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-amber-50 border border-amber-100 rounded-2xl"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-700 poppins-bold text-xs">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="poppins-semibold text-sm text-amber-900">{gap.title}</p>
                      <p className="poppins-regular text-xs text-amber-700 mt-0.5">{gap.description}</p>
                      {gap.risk && (
                        <p className="poppins-medium text-xs text-red-600 mt-1.5 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          {gap.risk}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          {result.strengths?.length > 0 && (
            <div className="mb-6">
              <p className="poppins-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">Compliance Strengths</p>
              <div className="space-y-2">
                {result.strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="poppins-medium text-sm text-emerald-800">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended steps */}
          {result.recommendedSteps?.length > 0 && (
            <div>
              <p className="poppins-semibold text-sm text-gray-500 uppercase tracking-wide mb-3">Recommended Next Steps</p>
              <div className="space-y-2">
                {result.recommendedSteps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                      <span className="text-white poppins-bold text-xs">{i + 1}</span>
                    </div>
                    <span className="poppins-regular text-sm text-gray-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lead Capture Form */}
        <div ref={leadFormRef} className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-emerald-100 shadow-md">
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="poppins-bold text-xl text-emerald-900 mb-2">Results sent to your inbox!</h3>
              <p className="poppins-regular text-gray-600 text-sm mb-6">Check your email for your personalised PPT compliance report. Our team will be in touch shortly.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setShowCalendly(true)}
                  className="poppins-semibold bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-2xl hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {isHighPriority ? "Book Compliance Audit" : "Book Free Consultation"}
                </Button>
                <Link href="/">
                  <Button variant="outline" className="poppins-semibold border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 py-4 px-6 rounded-2xl w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="poppins-bold text-xl text-emerald-900">Get Your PPT Compliance Report</h3>
                  <p className="poppins-regular text-sm text-gray-500 mt-0.5">Receive your full personalised report with action plan via email</p>
                </div>
              </div>

              {!showLeadForm ? (
                <div className="text-center">
                  <Button
                    onClick={scrollToLeadForm}
                    className="poppins-bold py-5 px-10 text-base bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 transition-all group"
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Get Your Compliance Score Report
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-gray-400 mt-3 poppins-regular">Free report — no spam, unsubscribe anytime</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm poppins-semibold text-gray-700 mb-1.5">
                        <User className="w-4 h-4 inline mr-1.5 text-emerald-600" />Full Name *
                      </label>
                      <Input
                        type="text"
                        value={leadForm.name}
                        onChange={e => setLeadForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Jane Smith"
                        className={`rounded-xl border-2 py-3 poppins-regular ${formErrors.name ? "border-red-300 bg-red-50" : "border-emerald-200 focus:border-emerald-500"}`}
                      />
                      {formErrors.name && <p className="text-xs text-red-600 mt-1 poppins-medium">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm poppins-semibold text-gray-700 mb-1.5">
                        <Mail className="w-4 h-4 inline mr-1.5 text-emerald-600" />Work Email *
                      </label>
                      <Input
                        type="email"
                        value={leadForm.email}
                        onChange={e => setLeadForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="jane@company.com"
                        className={`rounded-xl border-2 py-3 poppins-regular ${formErrors.email ? "border-red-300 bg-red-50" : "border-emerald-200 focus:border-emerald-500"}`}
                      />
                      {formErrors.email && <p className="text-xs text-red-600 mt-1 poppins-medium">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm poppins-semibold text-gray-700 mb-1.5">
                        <Building2 className="w-4 h-4 inline mr-1.5 text-emerald-600" />Company Name *
                      </label>
                      <Input
                        type="text"
                        value={leadForm.company}
                        onChange={e => setLeadForm(f => ({ ...f, company: e.target.value }))}
                        placeholder="Acme Ltd"
                        className={`rounded-xl border-2 py-3 poppins-regular ${formErrors.company ? "border-red-300 bg-red-50" : "border-emerald-200 focus:border-emerald-500"}`}
                      />
                      {formErrors.company && <p className="text-xs text-red-600 mt-1 poppins-medium">{formErrors.company}</p>}
                    </div>
                    <div>
                      <label className="block text-sm poppins-semibold text-gray-700 mb-1.5">
                        <Phone className="w-4 h-4 inline mr-1.5 text-emerald-600" />Phone (optional)
                      </label>
                      <Input
                        type="tel"
                        value={leadForm.phone}
                        onChange={e => setLeadForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+44 7XXX XXXXXX"
                        className="rounded-xl border-2 border-emerald-200 focus:border-emerald-500 py-3 poppins-regular"
                      />
                    </div>
                  </div>

                  {/* Spam warning */}
                  <div className="flex items-start gap-2 px-1 py-2 rounded-xl bg-red-50 border border-red-200">
                    <span className="text-base flex-shrink-0 mt-0.5">📬</span>
                    <p className="text-xs text-red-600 poppins-semibold leading-relaxed">
                      <strong>Check your spam / junk folder</strong> — our email may land there. Mark it as &quot;Not Spam&quot; to make sure you see it.
                    </p>
                  </div>

                  {/* GDPR */}
                  <label className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${leadForm.gdprConsent ? "border-emerald-300 bg-emerald-50" : formErrors.gdprConsent ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-emerald-200"}`}>
                    <div
                      onClick={() => setLeadForm(f => ({ ...f, gdprConsent: !f.gdprConsent }))}
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${leadForm.gdprConsent ? "border-emerald-500 bg-emerald-500" : "border-gray-300 bg-white"}`}
                    >
                      {leadForm.gdprConsent && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="poppins-regular text-xs text-gray-600 leading-relaxed">
                      I consent to Millstone Compliance processing my data to send me my PPT compliance report and relevant compliance updates. I can unsubscribe at any time.{" "}
                      <Link href="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                  {formErrors.gdprConsent && <p className="text-xs text-red-600 poppins-medium flex items-center gap-1"><XCircle className="w-3 h-3" />{formErrors.gdprConsent}</p>}

                  {submitError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-sm text-red-700 poppins-medium">{submitError}</p>
                    </div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full poppins-bold py-5 text-base bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl hover:shadow-xl hover:shadow-emerald-500/30 transition-all group disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending your report…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        Send My PPT Compliance Report
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 poppins-regular">
                    <Lock className="w-3 h-3" />
                    Secure & confidential — GDPR compliant
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Retake / Back */}
        <div className="flex flex-col sm:flex-row gap-3 pb-6">
          <Link href="/ppt-gap-analyser" className="flex-1">
            <Button variant="outline" className="w-full poppins-semibold border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-2xl py-4">
              Retake Assessment
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full poppins-semibold border-2 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-2xl py-4">
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Trust footer */}
        <div className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 poppins-regular">
            <BadgeCheck className="w-4 h-4 text-emerald-400" />
            Millstone Compliance — UK Plastic Packaging Tax Specialists
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
    </div>
  )
}

export default function PPTGapAnalyzerResultsPage() {
  return (
    <ErrorBoundary>
      <ResultsContent />
    </ErrorBoundary>
  )
}
