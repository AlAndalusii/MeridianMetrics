"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BadgeCheck, CheckCircle, AlertTriangle, XCircle,
  ArrowRight, Mail, Building2, User, Heart,
  Download, Phone, Lock, Star,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import ErrorBoundary from "@/components/ErrorBoundary"

interface GapItem { title: string; description: string; risk: string }
interface ScoreResult { score: number; topGaps: GapItem[]; urgencyLevel: "High" | "Medium" | "Low" }
interface LeadForm { name: string; email: string; company: string; phone: string; gdprConsent: boolean }
interface FormErrors { name?: string; email?: string; company?: string; gdprConsent?: string }

function CircularScore({ score, color, animate }: { score: number; color: string; animate: boolean }) {
  const radius = 80; const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference   = normalizedRadius * 2 * Math.PI
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!animate) return
    let frame = 0; const total = 80
    const interval = setInterval(() => {
      frame++
      const eased = 1 - Math.pow(1 - frame / total, 3)
      setDisplayed(Math.round(score * eased))
      if (frame >= total) clearInterval(interval)
    }, 25)
    return () => clearInterval(interval)
  }, [animate, score])

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={radius * 2} height={radius * 2} className="-rotate-90">
        <circle cx={radius} cy={radius} r={normalizedRadius} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle cx={radius} cy={radius} r={normalizedRadius} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - (displayed / 100) * circumference}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.05s ease" }} />
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
  const [result,       setResult]       = useState<ScoreResult | null>(null)
  const [isLoading,    setIsLoading]    = useState(true)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm,     setLeadForm]     = useState<LeadForm>({ name: "", email: "", company: "", phone: "", gdprConsent: false })
  const [formErrors,   setFormErrors]   = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted,    setSubmitted]    = useState(false)
  const [submitError,  setSubmitError]  = useState("")
  const [animateScore, setAnimateScore] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  useEffect(() => {
    try {
      const raw        = localStorage.getItem("cw_gap_analyzer_result")
      const isComplete = localStorage.getItem("cw_gap_analyzer_complete")
      if (!raw || !isComplete) { router.push("/clinical-waste-analyser"); return }
      setResult(JSON.parse(raw))
      if (localStorage.getItem("cw_gap_analyzer_lead_submitted")) setSubmitted(true)
      setIsLoading(false)
      setTimeout(() => setAnimateScore(true), 400)
    } catch { router.push("/clinical-waste-analyser") }
  }, [router])

  const getZone = (score: number) => {
    if (score <= 49) return { label: "High Risk — Significant Clinical Waste Exposure", color: "#dc2626", bg: "bg-red-50", border: "border-red-200", text: "text-red-800", badge: "bg-red-100 text-red-700", icon: XCircle,       zone: "red"   }
    if (score <= 79) return { label: "Compliance Gaps — Action Required",               color: "#d97706", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-100 text-amber-700", icon: AlertTriangle, zone: "amber" }
    return               { label: "Compliant — Minor Improvements Recommended",         color: "#059669", bg: "bg-green-50", border: "border-green-200", text: "text-green-800", badge: "bg-green-100 text-green-700", icon: CheckCircle,   zone: "green" }
  }

  const validate = (): boolean => {
    const errors: FormErrors = {}
    if (!leadForm.name.trim())          errors.name        = "Required"
    if (!leadForm.email.includes("@"))  errors.email       = "Valid email required"
    if (!leadForm.company.trim())       errors.company     = "Required"
    if (!leadForm.gdprConsent)          errors.gdprConsent = "Please confirm consent"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true); setSubmitError("")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadForm, source: "clinical-waste-analyser", score: result?.score, topGaps: result?.topGaps, urgencyLevel: result?.urgencyLevel }),
      })
      if (res.ok) {
        localStorage.setItem("cw_gap_analyzer_lead_submitted", "true")
        setSubmitted(true)
      } else {
        setSubmitError("Something went wrong. Please try again.")
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = () => {
    localStorage.removeItem("cw_gap_analyzer_lead_submitted")
    setSubmitted(false)
    setLeadForm({ name: "", email: "", company: "", phone: "", gdprConsent: false })
    setShowLeadForm(true)
  }

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="poppins-medium text-emerald-700">Building your report…</p>
      </div>
    </div>
  )

  if (!result) return null
  const zone = getZone(result.score)
  const ZoneIcon = zone.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span className="text-sm poppins-medium text-emerald-700">Clinical Waste Results</span>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          <div className={`rounded-3xl p-8 md:p-12 border-2 ${zone.border} ${zone.bg} mb-8 text-center shadow-lg`}>
            <div className="flex justify-center mb-6">
              <CircularScore score={result.score} color={zone.color} animate={animateScore} />
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${zone.badge} mb-4`}>
              <ZoneIcon className="w-4 h-4" />
              <span className="poppins-semibold text-sm">{zone.label}</span>
            </div>
            <h1 className={`poppins-bold text-3xl md:text-4xl ${zone.text} mb-3`}>Your Clinical Waste Score</h1>
            <p className={`poppins-regular text-base ${zone.text} opacity-80 max-w-lg mx-auto`}>
              {result.score <= 49
                ? "Your clinical waste compliance has critical gaps. CQC and Ofsted inspect clinical waste as a fundamental safe care standard — these gaps need urgent attention before your next inspection."
                : result.score <= 79
                ? "You have some clinical waste practices in place, but gaps remain. These need addressing before a CQC or Ofsted inspection — or before an EA enforcement visit."
                : "Your clinical waste compliance is in good shape. A few improvements will give you full confidence during any CQC, Ofsted or EA inspection."}
            </p>
          </div>

          {result.topGaps.length > 0 && (
            <div className="bg-white rounded-3xl border border-emerald-100 p-8 mb-8 shadow-sm">
              <h2 className="poppins-bold text-xl text-emerald-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Your Key Compliance Gaps
              </h2>
              <div className="space-y-4">
                {result.topGaps.map((gap, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="poppins-bold text-sm text-amber-700">{i + 1}</span>
                    </div>
                    <div>
                      <p className="poppins-semibold text-sm text-amber-900 mb-1">{gap.title}</p>
                      <p className="poppins-regular text-xs text-amber-700 leading-relaxed line-clamp-3">{gap.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!submitted ? (
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              {!showLeadForm ? (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-700/50 border border-emerald-600/40 flex items-center justify-center mx-auto mb-5">
                    <Download className="w-7 h-7 text-emerald-300" />
                  </div>
                  <h2 className="poppins-bold text-2xl md:text-3xl text-white mb-3">Get Your Full Report</h2>
                  <p className="poppins-regular text-emerald-200/70 mb-8 max-w-md mx-auto leading-relaxed">
                    Receive a personalised clinical waste gap report covering HTM 07-01, CQC, Ofsted and EA requirements — with a 48hr audit quote.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {["Written gap analysis", "HTM 07-01 checklist", "CQC / Ofsted ready", "48hr audit quote"].map(f => (
                      <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800/50 rounded-full text-emerald-300 text-xs poppins-medium border border-emerald-700/40">
                        <CheckCircle className="w-3 h-3" />{f}
                      </span>
                    ))}
                  </div>
                  <Button onClick={() => setShowLeadForm(true)}
                    className="bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold text-base px-8 py-5 rounded-2xl w-full sm:w-auto shadow-xl">
                    Get My Free Report <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <button onClick={() => setShowCalendly(true)}
                    className="mt-4 block mx-auto poppins-medium text-sm text-emerald-400 hover:text-emerald-200 underline transition-colors">
                    Or book a free 15-min call instead
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="poppins-bold text-2xl text-white mb-2">Where Should We Send Your Report?</h2>
                  <p className="poppins-regular text-emerald-200/60 text-sm mb-6">Your data is never shared. Unsubscribe any time.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block poppins-medium text-xs text-emerald-300 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                        <Input value={leadForm.name} onChange={e => setLeadForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Your name" className="pl-10 bg-emerald-800/40 border-emerald-700/50 text-white placeholder:text-emerald-500 focus:border-emerald-400" />
                      </div>
                      {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <label className="block poppins-medium text-xs text-emerald-300 mb-1.5">Work Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                        <Input value={leadForm.email} onChange={e => setLeadForm(p => ({ ...p, email: e.target.value }))}
                          type="email" placeholder="you@company.com" className="pl-10 bg-emerald-800/40 border-emerald-700/50 text-white placeholder:text-emerald-500 focus:border-emerald-400" />
                      </div>
                      {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block poppins-medium text-xs text-emerald-300 mb-1.5">Organisation *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                        <Input value={leadForm.company} onChange={e => setLeadForm(p => ({ ...p, company: e.target.value }))}
                          placeholder="Care home / children's home name" className="pl-10 bg-emerald-800/40 border-emerald-700/50 text-white placeholder:text-emerald-500 focus:border-emerald-400" />
                      </div>
                      {formErrors.company && <p className="text-red-400 text-xs mt-1">{formErrors.company}</p>}
                    </div>
                    <div>
                      <label className="block poppins-medium text-xs text-emerald-300 mb-1.5">Phone (optional)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                        <Input value={leadForm.phone} onChange={e => setLeadForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+44 7700 000000" className="pl-10 bg-emerald-800/40 border-emerald-700/50 text-white placeholder:text-emerald-500 focus:border-emerald-400" />
                      </div>
                    </div>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={leadForm.gdprConsent} onChange={e => setLeadForm(p => ({ ...p, gdprConsent: e.target.checked }))}
                      className="mt-1 w-4 h-4 accent-emerald-500" />
                    <span className="poppins-regular text-xs text-emerald-300/80 leading-relaxed">
                      I agree to Millstone Compliance contacting me about my results and compliance services. I can unsubscribe at any time.
                    </span>
                  </label>
                  {formErrors.gdprConsent && <p className="text-red-400 text-xs">{formErrors.gdprConsent}</p>}
                  {submitError && <p className="text-red-400 text-sm poppins-medium">{submitError}</p>}
                  <Button type="submit" disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-white poppins-bold py-5 rounded-2xl text-base shadow-lg">
                    {isSubmitting ? "Sending…" : "Send My Free Report"}
                    {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                  <p className="text-center text-xs text-emerald-500 flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" /> Your data is secure and never sold
                  </p>
                </form>
              )}
            </div>
          ) : (
            <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-3xl p-10 text-center text-white shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="poppins-bold text-2xl text-white mb-3">Report on its way!</h2>
              <p className="poppins-regular text-emerald-200/70 mb-8 max-w-md mx-auto">
                Your personalised clinical waste report — covering HTM 07-01, CQC and Ofsted requirements — will be with you within one business day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <Button onClick={() => setShowCalendly(true)}
                  className="bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold px-8 py-4 rounded-xl">
                  Book Free Call <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Link href="/resources">
                  <Button className="bg-emerald-700/50 hover:bg-emerald-700 text-white border border-emerald-600/40 poppins-semibold px-8 py-4 rounded-xl">
                    Read More Guides
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-5 border-t border-emerald-700/40">
                <button
                  onClick={handleResend}
                  className="text-sm poppins-medium text-emerald-300 hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send to a different email
                </button>
                <span className="hidden sm:block text-emerald-700">·</span>
                <Link href="/clinical-waste-analyser" className="text-sm poppins-medium text-emerald-400 hover:text-emerald-200 hover:underline transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  Change my answers
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {[{ icon: BadgeCheck, label: "Independent Experts" }, { icon: Star, label: "48hr Reports" }, { icon: Lock, label: "No Data Sharing" }].map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-2 text-emerald-600">
                <I className="w-4 h-4" /><span className="poppins-medium text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CalendlyModal isOpen={showCalendly} onClose={() => setShowCalendly(false)} />
    </div>
  )
}

export default function ClinicalWasteResultsPage() {
  return <ErrorBoundary><ResultsContent /></ErrorBoundary>
}
