"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Package,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Clock,
  BookOpen,
  ClipboardList,
  BarChart3,
  Building2,
  Search,
  AlertCircle,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

const STORAGE_KEY = "ppt_gap_analyzer_answers"
const STEP_KEY = "ppt_gap_analyzer_step"
const SESSION_KEY = "ppt_gap_analyzer_session"

interface Option {
  label: string
  value: string
  score: number
  flag?: "gap" | "good" | "neutral"
}

interface Question {
  id: number
  section: string
  icon: React.ElementType
  question: string
  subtitle?: string
  options: Option[]
  whyMatters: string
  answerKey: string
}

const questions: Question[] = [
  {
    id: 1,
    section: "Tonnage Threshold",
    icon: BarChart3,
    question: "How many tonnes of plastic packaging does your business manufacture or import into the UK each year?",
    subtitle: "Include all plastic packaging — whether used to contain your own products or sold separately",
    answerKey: "tonnage_threshold",
    options: [
      { label: "Under 10 tonnes annually", value: "under_10t", score: 8, flag: "neutral" },
      { label: "10 – 50 tonnes annually", value: "10_50t", score: 6, flag: "neutral" },
      { label: "50 – 100 tonnes annually", value: "50_100t", score: 5, flag: "neutral" },
      { label: "Over 100 tonnes annually", value: "over_100t", score: 4, flag: "neutral" },
      { label: "I don't track our plastic packaging volumes", value: "unknown_tonnage", score: 0, flag: "gap" },
    ],
    whyMatters: "Businesses that manufacture or import 10 or more tonnes of plastic packaging per year must register for PPT with HMRC. Failure to register when above the threshold is a criminal offence with unlimited fines.",
  },
  {
    id: 2,
    section: "Recycled Content",
    icon: Package,
    question: "What is the average recycled plastic content in the packaging you manufacture or import?",
    subtitle: "PPT applies at £217.85/tonne (2024/25) to packaging with less than 30% recycled plastic by weight",
    answerKey: "recycled_content",
    options: [
      { label: "30% or more recycled content — all our packaging", value: "above_30_all", score: 10, flag: "good" },
      { label: "30%+ on most lines, but some packaging below 30%", value: "above_30_most", score: 7, flag: "neutral" },
      { label: "Below 30% recycled content on most packaging", value: "below_30_most", score: 3, flag: "gap" },
      { label: "Zero recycled content — virgin plastic only", value: "zero_recycled", score: 0, flag: "gap" },
      { label: "I don't know our recycled content percentages", value: "unknown_content", score: 0, flag: "gap" },
    ],
    whyMatters: "The 30% recycled content threshold is the single most important PPT trigger. Every tonne of packaging below this threshold is liable for PPT at £217.85/tonne (rising annually). Accurate measurement is essential.",
  },
  {
    id: 3,
    section: "Recycled Content Type",
    icon: Search,
    question: "What types of recycled plastic content does your packaging contain?",
    subtitle: "HMRC distinguishes between different sources of recycled material",
    answerKey: "content_type",
    options: [
      { label: "Post-consumer recycled (PCR) plastic — collected from consumers", value: "post_consumer", score: 10, flag: "good" },
      { label: "Mix of post-consumer and pre-consumer recycled content", value: "mixed_recycled", score: 7, flag: "neutral" },
      { label: "Pre-consumer recycled only (manufacturing offcuts/trim)", value: "pre_consumer", score: 5, flag: "neutral" },
      { label: "We use biomass/bio-based plastic claiming exemption", value: "biomass", score: 4, flag: "neutral" },
      { label: "Not sure of the source of our recycled content", value: "unsure_source", score: 0, flag: "gap" },
    ],
    whyMatters: "HMRC recognises post-consumer recycled plastic as the primary compliance route. Pre-consumer waste from the same manufacturing process may not qualify. Mass balance approaches require ISCC+ or equivalent certification.",
  },
  {
    id: 4,
    section: "Import & Registration",
    icon: Building2,
    question: "If you import plastic packaging (or goods in plastic packaging), have you registered for PPT with HMRC?",
    subtitle: "Both UK manufacturers and importers of plastic packaging must register once above the 10-tonne threshold",
    answerKey: "import_registration",
    options: [
      { label: "Yes — fully registered and filing quarterly returns", value: "fully_registered", score: 10, flag: "good" },
      { label: "Registered but not sure if our returns are complete", value: "registered_unsure", score: 5, flag: "neutral" },
      { label: "We don't import plastic packaging directly", value: "no_imports", score: 8, flag: "neutral" },
      { label: "We import but haven't registered with HMRC", value: "import_not_registered", score: 0, flag: "gap" },
      { label: "We don't know if we need to register", value: "unsure_registration", score: 1, flag: "gap" },
    ],
    whyMatters: "Importers are jointly and severally liable with manufacturers for PPT on the same packaging. If your UK business buys goods from overseas in plastic packaging and brings it into the UK, you may be liable for PPT even if you don't manufacture packaging.",
  },
  {
    id: 5,
    section: "Deadline Awareness",
    icon: Clock,
    question: "When did the Plastic Packaging Tax first come into effect in the UK?",
    subtitle: "Understanding key PPT dates is essential to assess your exposure to back-dated liability",
    answerKey: "deadline_awareness",
    options: [
      { label: "1 April 2022 — I know the rate history too", value: "knows_full_history", score: 10, flag: "good" },
      { label: "1 April 2022 — but I'm unclear on rate changes since", value: "knows_start_unsure_rates", score: 6, flag: "neutral" },
      { label: "I thought it started in 2023 or 2024", value: "wrong_date", score: 2, flag: "neutral" },
      { label: "I wasn't aware of when PPT came into force", value: "unaware", score: 0, flag: "gap" },
    ],
    whyMatters: "PPT launched on 1 April 2022. The rate has increased annually (£200/tonne 2022/23 → £210.82/tonne 2023/24 → £217.85/tonne 2024/25). Businesses unaware of the start date may have significant back-dated liability since April 2022.",
  },
  {
    id: 6,
    section: "Mass Balance Certification",
    icon: FileCheck,
    question: "Do you hold mass balance or chemically recycled content certifications for any of your packaging?",
    subtitle: "Mass balance certificates (e.g. ISCC+, REDcert²) are required to claim chemically recycled content",
    answerKey: "mass_balance",
    options: [
      { label: "Yes — we hold valid ISCC+ or equivalent certificates", value: "full_certified", score: 10, flag: "good" },
      { label: "Certificates from suppliers — not independently verified", value: "supplier_certs_only", score: 5, flag: "neutral" },
      { label: "We rely on mechanical recycled content only (no mass balance)", value: "mechanical_only", score: 7, flag: "good" },
      { label: "No certificates — we claim recycled content without documentation", value: "no_certs", score: 0, flag: "gap" },
      { label: "We don't use any chemically recycled content", value: "no_chemical", score: 8, flag: "good" },
    ],
    whyMatters: "For chemically recycled plastic, HMRC requires mass balance certification (ISCC+, REDcert² or equivalent). Without valid certificates, you cannot claim the recycled content — meaning the packaging will be liable for PPT regardless of actual recycled content claims.",
  },
  {
    id: 7,
    section: "Supplier Verification",
    icon: ClipboardList,
    question: "How do you verify recycled content claims made by your packaging suppliers?",
    subtitle: "HMRC holds you responsible for the accuracy of recycled content claims in your PPT returns",
    answerKey: "supplier_verification",
    options: [
      { label: "Third-party audits + certificates reviewed annually", value: "full_verification", score: 10, flag: "good" },
      { label: "We request certificates but don't audit independently", value: "certs_no_audit", score: 6, flag: "neutral" },
      { label: "We rely on supplier declarations only", value: "declarations_only", score: 3, flag: "gap" },
      { label: "We accept supplier claims without formal documentation", value: "no_verification", score: 0, flag: "gap" },
    ],
    whyMatters: "HMRC places the burden of proof on the taxpayer. If your supplier over-states recycled content and you claimed an exemption based on that, you remain liable for the unpaid PPT, plus penalties and interest. Supplier verification is critical protection.",
  },
  {
    id: 8,
    section: "Record Keeping",
    icon: BookOpen,
    question: "What PPT records does your business currently maintain for HMRC?",
    subtitle: "HMRC can request records going back 6 years — incomplete records risk penalties",
    answerKey: "record_keeping",
    options: [
      { label: "Full records: weight data, recycled content evidence, invoices, returns history", value: "full_records", score: 10, flag: "good" },
      { label: "Partial records — some documentation but gaps exist", value: "partial_records", score: 5, flag: "neutral" },
      { label: "Records exist but are disorganised or hard to retrieve", value: "disorganised_records", score: 3, flag: "gap" },
      { label: "Minimal records — mainly invoices only", value: "minimal_records", score: 2, flag: "gap" },
      { label: "No formal PPT records kept", value: "no_records", score: 0, flag: "gap" },
    ],
    whyMatters: "HMRC requires you to keep PPT records for at least 6 years. Required records include weight of plastic packaging, evidence of recycled content percentages, exemption evidence, and all PPT returns. Failure to maintain records can result in penalties independent of any tax owed.",
  },
  {
    id: 9,
    section: "Exemption Claims",
    icon: FileCheck,
    question: "Which PPT exemptions does your business currently claim?",
    subtitle: "Claiming exemptions without proper evidence is a common source of HMRC enquiries",
    answerKey: "exemption_claims",
    options: [
      { label: "Export exemption — with evidence of export for each claim", value: "export_with_evidence", score: 10, flag: "good" },
      { label: "Transport packaging exemption (immediate import packaging)", value: "transport_exemption", score: 8, flag: "good" },
      { label: "We claim exemptions but have limited supporting evidence", value: "exemptions_no_evidence", score: 1, flag: "gap" },
      { label: "We don't claim any exemptions", value: "no_exemptions", score: 7, flag: "neutral" },
      { label: "We're not sure which exemptions we qualify for", value: "unsure_exemptions", score: 2, flag: "gap" },
    ],
    whyMatters: "HMRC scrutinises exemption claims heavily — particularly the export exemption, which requires documentary evidence for every tonne claimed. Claiming exemptions without sufficient evidence is one of the top triggers for PPT compliance investigations.",
  },
  {
    id: 10,
    section: "Fraud Risk Prevention",
    icon: AlertCircle,
    question: "What measures do you have in place to prevent fraudulent or inaccurate recycled content claims entering your supply chain?",
    subtitle: "HMRC is increasing enforcement action on fraudulent recycled content certificates",
    answerKey: "fraud_prevention",
    options: [
      { label: "Formal due diligence policy + supplier audits + certificate verification", value: "full_due_diligence", score: 10, flag: "good" },
      { label: "Certificate checks only — no formal due diligence policy", value: "cert_checks_only", score: 5, flag: "neutral" },
      { label: "Reliance on supplier assurances only", value: "supplier_assurance_only", score: 2, flag: "gap" },
      { label: "No specific measures in place", value: "no_measures", score: 0, flag: "gap" },
    ],
    whyMatters: "HMRC has flagged recycled content fraud as a growing risk in the PPT supply chain. If you're found to have submitted fraudulent claims — even unknowingly — you may be liable for the full tax plus 100% penalties. A documented due diligence policy is your primary defence.",
  },
]

function PPTGapAnalyzerContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"good" | "gap" | "neutral">("neutral")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentStep]
  const totalQuestions = questions.length
  const progress = ((currentStep + 1) / totalQuestions) * 100

  useEffect(() => {
    try {
      if (!localStorage.getItem(SESSION_KEY)) {
        localStorage.setItem(SESSION_KEY, `ppt_ga_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
      }
      const savedAnswers = localStorage.getItem(STORAGE_KEY)
      const savedStep = localStorage.getItem(STEP_KEY)
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedStep) setCurrentStep(parseInt(savedStep))
    } catch { /* silent */ }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
      localStorage.setItem(STEP_KEY, currentStep.toString())
    } catch { /* silent */ }
  }, [answers, currentStep])

  const handleAnswer = useCallback((value: string) => {
    const option = currentQuestion.options.find(o => o.value === value)
    setAnswers(prev => ({ ...prev, [currentQuestion.answerKey]: value }))
    setFeedbackType(option?.flag === "good" ? "good" : option?.flag === "gap" ? "gap" : "neutral")
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 1800)
  }, [currentQuestion])

  const handleNext = useCallback(async () => {
    if (!answers[currentQuestion.answerKey]) return
    setIsAnimating(true)

    if (currentStep === totalQuestions - 1) {
      setIsSubmitting(true)
      try {
        const answersPayload = questions.map(q => ({
          questionId: q.id,
          question: q.question,
          answer: answers[q.answerKey] || "not_answered",
          section: q.section,
        }))

        const res = await fetch("/api/ppt-gap-analyser/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersPayload }),
        })

        if (res.ok) {
          const result = await res.json()
          try {
            localStorage.setItem("ppt_gap_analyzer_result", JSON.stringify(result))
            localStorage.setItem("ppt_gap_analyzer_complete", "true")
          } catch { /* silent */ }
        }
      } catch (err) {
        console.error("PPT Scoring error:", err)
      } finally {
        setIsSubmitting(false)
        router.push("/ppt-gap-analyser/results")
      }
      return
    }

    setTimeout(() => {
      setCurrentStep(s => s + 1)
      setIsAnimating(false)
    }, 300)
  }, [answers, currentQuestion, currentStep, totalQuestions, router])

  const handleBack = useCallback(() => {
    if (currentStep === 0) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(s => s - 1)
      setIsAnimating(false)
    }, 300)
  }, [currentStep])

  const selectedAnswer = answers[currentQuestion.answerKey]
  const isLast = currentStep === totalQuestions - 1
  const canProceed = !!selectedAnswer

  const Icon = currentQuestion.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-100/10 to-green-100/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                <Package className="w-4 h-4 text-emerald-600" />
                <span className="text-sm poppins-medium text-emerald-700">PPT Gap Analyser</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-full border border-green-100">
                <span className="text-sm poppins-semibold text-green-700">Q{currentStep + 1}/{totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="fixed top-[61px] sm:top-[73px] left-0 right-0 z-40">
        <div className="w-full h-1.5 bg-emerald-100/60 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="hidden md:flex items-center justify-between px-8 pt-2 pb-1 bg-white/60 backdrop-blur-sm border-b border-emerald-50">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? "bg-emerald-500 scale-100"
                  : i === currentStep
                  ? "bg-emerald-600 scale-125 ring-2 ring-emerald-200"
                  : "bg-emerald-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="pt-28 md:pt-32 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">

          {/* Section badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald-200/60 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-emerald-700" />
              </div>
              <span className="poppins-semibold text-sm text-emerald-800 tracking-wide">{currentQuestion.section}</span>
              <span className="text-xs poppins-regular text-emerald-500">Step {currentStep + 1} of {totalQuestions}</span>
            </div>
          </div>

          {/* Question card */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="bg-white/85 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-emerald-100/50 shadow-[0_8px_40px_rgba(16,185,129,0.10)]">

              <h1 className="poppins-bold text-2xl md:text-3xl text-emerald-900 mb-3 leading-tight">
                {currentQuestion.question}
              </h1>

              {currentQuestion.subtitle && (
                <p className="poppins-regular text-base text-emerald-600/80 mb-8 leading-relaxed">
                  {currentQuestion.subtitle}
                </p>
              )}

              {/* Options */}
              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option.value
                  const isGap = option.flag === "gap"
                  const isGood = option.flag === "good"

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-250 group ${
                        isSelected
                          ? isGood
                            ? "border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg shadow-emerald-100"
                            : isGap
                            ? "border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg shadow-amber-100"
                            : "border-emerald-500 bg-emerald-50 shadow-md"
                          : "border-emerald-100 bg-white/60 hover:border-emerald-300 hover:bg-emerald-50/60 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Radio circle */}
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? isGood
                                ? "border-emerald-500 bg-emerald-500"
                                : isGap
                                ? "border-amber-500 bg-amber-500"
                                : "border-emerald-500 bg-emerald-500"
                              : "border-emerald-300 bg-white group-hover:border-emerald-400"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <span
                          className={`poppins-medium text-sm flex-1 ${
                            isSelected
                              ? isGood
                                ? "text-emerald-900"
                                : isGap
                                ? "text-amber-900"
                                : "text-emerald-900"
                              : "text-gray-700 group-hover:text-emerald-900"
                          }`}
                        >
                          {option.label}
                        </span>

                        {isSelected && showFeedback && (
                          <div className="flex-shrink-0">
                            {isGood && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                            {isGap && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Inline feedback banner */}
              {showFeedback && selectedAnswer && (
                <div
                  className={`mt-4 p-3 rounded-xl text-sm poppins-medium transition-all animate-fade-in-up ${
                    feedbackType === "good"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                      : feedbackType === "gap"
                      ? "bg-amber-50 border border-amber-200 text-amber-800"
                      : "bg-gray-50 border border-gray-200 text-gray-700"
                  }`}
                >
                  {feedbackType === "good" && "✅ Good — this meets the PPT requirement"}
                  {feedbackType === "gap" && "⚠️ Gap identified — we'll include this in your report"}
                  {feedbackType === "neutral" && "✓ Noted — we'll factor this into your score"}
                </div>
              )}

              {/* Why this matters */}
              <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-green-50/50 border border-emerald-100/60">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                    <span className="text-emerald-700 poppins-bold text-xs">?</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-emerald-900 text-sm mb-1">Why this matters</p>
                    <p className="poppins-regular text-sm text-emerald-800/80 leading-relaxed">{currentQuestion.whyMatters}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center gap-3">
                <Button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`poppins-semibold px-6 py-5 rounded-2xl transition-all ${
                    currentStep === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Back
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className={`poppins-semibold px-8 py-5 rounded-2xl flex-1 transition-all duration-300 group ${
                    !canProceed
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Analyzing your responses…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLast ? "Get My PPT Compliance Score" : "Next"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Trust note on first step */}
              {currentStep === 0 && (
                <div className="mt-6 pt-5 border-t border-emerald-100 flex items-center justify-center gap-2 text-emerald-600">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="poppins-medium text-xs">Your answers are confidential — 10 quick questions, no obligation</span>
                </div>
              )}
            </div>

            {/* Mini progress text */}
            <div className="mt-4 text-center">
              <span className="poppins-regular text-xs text-emerald-500">
                {totalQuestions - currentStep - 1 === 0
                  ? "Last question — almost done!"
                  : `${totalQuestions - currentStep - 1} question${totalQuestions - currentStep - 1 !== 1 ? "s" : ""} remaining`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PPTGapAnalyzerPage() {
  return (
    <ErrorBoundary>
      <PPTGapAnalyzerContent />
    </ErrorBoundary>
  )
}
