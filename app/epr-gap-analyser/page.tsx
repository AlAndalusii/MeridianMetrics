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
  Calculator,
  Database,
  Recycle,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

const STORAGE_KEY = "epr_gap_analyser_answers"
const STEP_KEY = "epr_gap_analyser_step"
const SESSION_KEY = "epr_gap_analyser_session"

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
    section: "Business Profile",
    icon: Building2,
    question: "What is your business's role in the UK packaging supply chain?",
    subtitle: "Your role determines your exact EPR obligations and which thresholds apply to you",
    answerKey: "business_role",
    options: [
      { label: "UK manufacturer of packaging or packaged goods", value: "manufacturer", score: 7, flag: "neutral" },
      { label: "Importer of packaged goods into the UK", value: "importer", score: 7, flag: "neutral" },
      { label: "Brand owner selling packaged products in the UK", value: "brand_owner", score: 7, flag: "neutral" },
      { label: "Online marketplace seller (Amazon, eBay, Etsy, etc.)", value: "marketplace", score: 6, flag: "neutral" },
      { label: "We don't handle or sell any packaged goods", value: "no_packaging", score: 10, flag: "good" },
    ],
    whyMatters: "EPR (Extended Producer Responsibility) applies to any business that manufactures, imports, brands, or sells packaged goods in the UK. Understanding your role is the first step to calculating your obligations and fees.",
  },
  {
    id: 2,
    section: "Tonnage Threshold",
    icon: BarChart3,
    question: "How many tonnes of packaging does your business place on the UK market each year?",
    subtitle: "Include all material types: plastic, paper/card, glass, metal, wood, and fibre",
    answerKey: "annual_tonnage",
    options: [
      { label: "Under 25 tonnes — below the EPR registration threshold", value: "under_25t", score: 8, flag: "good" },
      { label: "25 – 50 tonnes — basic registration required", value: "25_50t", score: 6, flag: "neutral" },
      { label: "50 – 200 tonnes — full obligations apply", value: "50_200t", score: 5, flag: "neutral" },
      { label: "Over 200 tonnes — large producer status", value: "over_200t", score: 4, flag: "neutral" },
      { label: "I don't know our annual packaging tonnage", value: "unknown_tonnage", score: 0, flag: "gap" },
    ],
    whyMatters: "The key threshold is 25 tonnes per year (with £1M+ turnover). Businesses above this must register with the Environment Agency and pay EPR fees. Exceeding 50 tonnes triggers full reporting obligations. Not knowing your tonnage is itself a compliance risk.",
  },
  {
    id: 3,
    section: "EPR Registration",
    icon: FileCheck,
    question: "Is your business registered for EPR with the relevant environmental regulator?",
    subtitle: "Environment Agency (England), SEPA (Scotland), NRW (Wales), NIEA (Northern Ireland)",
    answerKey: "registration_status",
    options: [
      { label: "Yes — fully registered and current for this compliance year", value: "fully_registered", score: 10, flag: "good" },
      { label: "Registered, but unsure if all details are up to date", value: "registered_unsure", score: 5, flag: "neutral" },
      { label: "Not yet registered — we plan to do so", value: "not_registered_yet", score: 2, flag: "gap" },
      { label: "Not registered — we don't think we need to be", value: "not_registered_believe", score: 3, flag: "gap" },
      { label: "Not sure if we're required to register", value: "unsure_registration", score: 1, flag: "gap" },
    ],
    whyMatters: "Registration is a legal requirement for any UK business handling 25+ tonnes of packaging with turnover over £1M. Operating without registration risks unlimited fines, enforcement notices, and criminal prosecution.",
  },
  {
    id: 4,
    section: "Compliance Scheme",
    icon: BadgeCheck,
    question: "Are you a member of an approved EPR compliance scheme?",
    subtitle: "Compliance schemes handle EPR data submissions and fee payments on your behalf",
    answerKey: "compliance_scheme",
    options: [
      { label: "Yes — scheme handles all EPR reporting and fee payments", value: "scheme_full", score: 10, flag: "good" },
      { label: "Yes — but I'm not sure exactly what they cover", value: "scheme_unsure", score: 5, flag: "neutral" },
      { label: "No — we manage EPR obligations directly (self-compliance)", value: "self_compliance", score: 7, flag: "neutral" },
      { label: "No — we haven't joined a scheme and aren't sure we should", value: "no_scheme", score: 1, flag: "gap" },
    ],
    whyMatters: "Most businesses use an approved compliance scheme (e.g. Valpak, Veolia, DS Smith) which pools data and negotiates fees collectively. Going it alone requires direct HMRC reporting, which carries higher administrative burden and risk of error.",
  },
  {
    id: 5,
    section: "Household vs Non-Household",
    icon: Building2,
    question: "Do you correctly categorise your packaging as household or non-household in your EPR data?",
    subtitle: "This split dramatically affects fee levels — non-household packaging typically attracts lower fees",
    answerKey: "hh_split",
    options: [
      { label: "Yes — we accurately classify all packaging as household or non-household", value: "accurate_split", score: 10, flag: "good" },
      { label: "Partially — we try to classify but aren't fully confident in the methodology", value: "partial_split", score: 5, flag: "neutral" },
      { label: "No — we classify everything as household to be safe", value: "all_household", score: 2, flag: "gap" },
      { label: "I wasn't aware this distinction existed", value: "unaware_split", score: 0, flag: "gap" },
    ],
    whyMatters: "The household/non-household classification is the single biggest source of EPR overpayment. Businesses that classify all packaging as household typically overpay by £5,000–£15,000+ per year. Non-household packaging (e.g. B2B transit packaging) attracts significantly lower modulated fees.",
  },
  {
    id: 6,
    section: "Fee Calculation",
    icon: Calculator,
    question: "Do you understand how your EPR fees are calculated across each material category?",
    subtitle: "EPR fees vary by material type (plastic, paper, glass, metal, wood) and packaging function",
    answerKey: "fee_understanding",
    options: [
      { label: "Yes — I understand modulated fees, material rates, and how they apply to us", value: "full_understanding", score: 10, flag: "good" },
      { label: "Partial — I know the rough totals but not the detailed breakdown", value: "partial_understanding", score: 5, flag: "neutral" },
      { label: "No — I just receive an invoice and pay it", value: "just_pay", score: 2, flag: "gap" },
      { label: "I've never reviewed our EPR fee methodology", value: "never_reviewed", score: 0, flag: "gap" },
    ],
    whyMatters: "EPR modulated fees (introduced under the reformed scheme) vary significantly by material and packaging type. Businesses that accept fee invoices without auditing the underlying data frequently overpay. Conducting a fee review typically saves £3,000–£20,000 per year.",
  },
  {
    id: 7,
    section: "Data & Reporting",
    icon: Database,
    question: "How do you collect and submit your packaging data for EPR reporting?",
    subtitle: "EPR requires accurate data on packaging weights and material types placed on the UK market",
    answerKey: "data_reporting",
    options: [
      { label: "Structured system — dedicated software or spreadsheet updated regularly", value: "structured_system", score: 10, flag: "good" },
      { label: "Ad hoc — we compile data annually from various sources", value: "adhoc_annual", score: 5, flag: "neutral" },
      { label: "Estimates only — no robust data tracking in place", value: "estimates_only", score: 2, flag: "gap" },
      { label: "Our compliance scheme collects data for us but we don't verify it", value: "scheme_unverified", score: 3, flag: "gap" },
      { label: "We don't currently collect packaging data", value: "no_data", score: 0, flag: "gap" },
    ],
    whyMatters: "EPR submissions require detailed packaging data by material type and weight. Inaccurate or estimated data leads to incorrect fee calculations and exposure to HMRC/regulator scrutiny. Large producers must submit data twice yearly; small producers annually.",
  },
  {
    id: 8,
    section: "Deadline Awareness",
    icon: Clock,
    question: "When did the reformed EPR for packaging scheme launch in the UK, requiring producer fees?",
    subtitle: "Understanding key dates helps identify if you have potential back-dated liability",
    answerKey: "deadline_awareness",
    options: [
      { label: "January 2025 — I know the fee payment timeline too", value: "knows_jan_2025_full", score: 10, flag: "good" },
      { label: "January 2025 — but I'm unclear on reporting deadlines", value: "knows_jan_2025_partial", score: 6, flag: "neutral" },
      { label: "I thought it was 2024 or earlier", value: "wrong_date_early", score: 2, flag: "neutral" },
      { label: "I wasn't aware EPR fees had launched yet", value: "unaware_launched", score: 0, flag: "gap" },
    ],
    whyMatters: "Reformed EPR producer fees began in January 2025. Businesses that missed the initial registration or data submission deadlines are already non-compliant. Data submission deadlines apply quarterly for large producers — missing them triggers late fees and potential enforcement.",
  },
  {
    id: 9,
    section: "Record Keeping",
    icon: ClipboardList,
    question: "What EPR records does your business currently maintain?",
    subtitle: "Regulators can request records going back several years during an audit",
    answerKey: "record_keeping",
    options: [
      { label: "Full records — packaging weights, material categories, submission history, invoices", value: "full_records", score: 10, flag: "good" },
      { label: "Partial — some records but gaps in documentation", value: "partial_records", score: 5, flag: "neutral" },
      { label: "Invoices only — no underlying packaging data on file", value: "invoices_only", score: 2, flag: "gap" },
      { label: "Minimal or no records kept", value: "no_records", score: 0, flag: "gap" },
    ],
    whyMatters: "EPR regulators require you to maintain packaging data records that substantiate your fee submissions. In the event of an audit, inability to produce records is treated as a compliance failure — even if you've paid the correct fees. Records should cover at minimum 4 years.",
  },
  {
    id: 10,
    section: "Overpayment Risk",
    icon: Recycle,
    question: "Have you ever had your EPR fee submission independently reviewed or audited?",
    subtitle: "Most businesses that audit their EPR data discover they have been overpaying",
    answerKey: "fee_review",
    options: [
      { label: "Yes — reviewed within the last 12 months, no significant issues found", value: "reviewed_clean", score: 10, flag: "good" },
      { label: "Yes — reviewed and we found we were overpaying, now corrected", value: "reviewed_fixed", score: 9, flag: "good" },
      { label: "Never reviewed — we rely on our compliance scheme's calculation", value: "never_reviewed", score: 2, flag: "gap" },
      { label: "Never reviewed — we're not sure an independent review is possible", value: "never_unaware", score: 1, flag: "gap" },
    ],
    whyMatters: "Industry data shows over 60% of businesses are overpaying EPR fees due to incorrect household/non-household splits, misclassified materials, or erroneous tonnage figures. An independent fee audit pays for itself within weeks through fee reductions.",
  },
]

function EPRGapAnalyserContent() {
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
        localStorage.setItem(SESSION_KEY, `epr_ga_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
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

        const res = await fetch("/api/epr-gap-analyser/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersPayload }),
        })

        if (res.ok) {
          const result = await res.json()
          try {
            localStorage.setItem("epr_gap_analyser_result", JSON.stringify(result))
            localStorage.setItem("epr_gap_analyser_complete", "true")
          } catch { /* silent */ }
        }
      } catch (err) {
        console.error("EPR scoring error:", err)
      } finally {
        setIsSubmitting(false)
        router.push("/epr-gap-analyser/results")
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/25 to-indigo-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-200/25 to-blue-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <Recycle className="w-4 h-4 text-blue-600" />
                <span className="text-sm poppins-medium text-blue-700">EPR Gap Analyser</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-full border border-indigo-100">
                <span className="text-sm poppins-semibold text-indigo-700">Q{currentStep + 1}/{totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="fixed top-[61px] sm:top-[73px] left-0 right-0 z-40">
        <div className="w-full h-1.5 bg-blue-100/60 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="hidden md:flex items-center justify-between px-8 pt-2 pb-1 bg-white/60 backdrop-blur-sm border-b border-blue-50">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? "bg-blue-500 scale-100"
                  : i === currentStep
                  ? "bg-blue-600 scale-125 ring-2 ring-blue-200"
                  : "bg-blue-200"
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
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-200/60 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-700" />
              </div>
              <span className="poppins-semibold text-sm text-blue-800 tracking-wide">{currentQuestion.section}</span>
              <span className="text-xs poppins-regular text-blue-500">Step {currentStep + 1} of {totalQuestions}</span>
            </div>
          </div>

          {/* Question card */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="bg-white/85 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-blue-100/50 shadow-[0_8px_40px_rgba(99,102,241,0.10)]">

              <h1 className="poppins-bold text-2xl md:text-3xl text-blue-900 mb-3 leading-tight">
                {currentQuestion.question}
              </h1>

              {currentQuestion.subtitle && (
                <p className="poppins-regular text-base text-blue-600/80 mb-8 leading-relaxed">
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
                            ? "border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg shadow-blue-100"
                            : isGap
                            ? "border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg shadow-amber-100"
                            : "border-blue-500 bg-blue-50 shadow-md"
                          : "border-blue-100 bg-white/60 hover:border-blue-300 hover:bg-blue-50/60 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? isGood
                                ? "border-blue-500 bg-blue-500"
                                : isGap
                                ? "border-amber-500 bg-amber-500"
                                : "border-blue-500 bg-blue-500"
                              : "border-blue-300 bg-white group-hover:border-blue-400"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <span
                          className={`poppins-medium text-sm flex-1 ${
                            isSelected
                              ? isGood
                                ? "text-blue-900"
                                : isGap
                                ? "text-amber-900"
                                : "text-blue-900"
                              : "text-gray-700 group-hover:text-blue-900"
                          }`}
                        >
                          {option.label}
                        </span>

                        {isSelected && showFeedback && (
                          <div className="flex-shrink-0">
                            {isGood && <CheckCircle className="w-5 h-5 text-blue-600" />}
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
                      ? "bg-blue-50 border border-blue-200 text-blue-800"
                      : feedbackType === "gap"
                      ? "bg-amber-50 border border-amber-200 text-amber-800"
                      : "bg-gray-50 border border-gray-200 text-gray-700"
                  }`}
                >
                  {feedbackType === "good" && "✅ Good — this meets the EPR requirement"}
                  {feedbackType === "gap" && "⚠️ Gap identified — we'll include this in your report"}
                  {feedbackType === "neutral" && "✓ Noted — we'll factor this into your score"}
                </div>
              )}

              {/* Why this matters */}
              <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-100/60">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                    <span className="text-blue-700 poppins-bold text-xs">?</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-blue-900 text-sm mb-1">Why this matters</p>
                    <p className="poppins-regular text-sm text-blue-800/80 leading-relaxed">{currentQuestion.whyMatters}</p>
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
                      : "bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50"
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
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Analysing your responses…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLast ? "Get My EPR Compliance Score" : "Next"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>

              {currentStep === 0 && (
                <div className="mt-6 pt-5 border-t border-blue-100 flex items-center justify-center gap-2 text-blue-600">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="poppins-medium text-xs">Your answers are confidential — 10 quick questions, no obligation</span>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <span className="poppins-regular text-xs text-blue-500">
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

export default function EPRGapAnalyserPage() {
  return (
    <ErrorBoundary>
      <EPRGapAnalyserContent />
    </ErrorBoundary>
  )
}
