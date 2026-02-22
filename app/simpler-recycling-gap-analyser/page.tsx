"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Users,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileCheck,
  Clock,
  BookOpen,
  ClipboardList,
  Recycle,
  GraduationCap,
  Building2,
  BarChart3,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

const STORAGE_KEY = "gap_analyzer_answers"
const STEP_KEY = "gap_analyzer_step"
const SESSION_KEY = "gap_analyzer_session"

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
    question: "How many employees does your business have across all locations?",
    subtitle: "Count full-time equivalents across every site or branch",
    answerKey: "business_size",
    options: [
      { label: "Fewer than 10 employees (micro-firm)", value: "under_10_2027", score: 3, flag: "neutral" },
      { label: "10 – 50 employees", value: "10_50", score: 6, flag: "neutral" },
      { label: "51 – 250 employees", value: "51_250", score: 7, flag: "neutral" },
      { label: "250+ employees", value: "250_plus", score: 8, flag: "neutral" },
      { label: "Not sure — need to verify", value: "not_sure_size", score: 1, flag: "gap" },
    ],
    whyMatters: "Businesses with 10+ employees had to comply with Simpler Recycling by 31 March 2025. Micro-firms (<10) have until March 2027. Not knowing your threshold is itself a compliance risk.",
  },
  {
    id: 2,
    section: "Waste Volume",
    icon: BarChart3,
    question: "Roughly how much general waste does your business generate each week?",
    subtitle: "Include all sites if you have multiple locations",
    answerKey: "waste_volume",
    options: [
      { label: "Minimal — a few bags (under 50kg)", value: "minimal", score: 5, flag: "neutral" },
      { label: "Moderate — several bins (50 – 200kg)", value: "moderate", score: 6, flag: "neutral" },
      { label: "Large — multiple large bins (200 – 500kg)", value: "large", score: 7, flag: "neutral" },
      { label: "Very large — daily collections needed (500kg+)", value: "very_large", score: 8, flag: "neutral" },
      { label: "I don't know our waste volumes", value: "unknown_volume", score: 1, flag: "gap" },
    ],
    whyMatters: "Higher volumes mean greater regulatory scrutiny. Businesses generating significant waste are more likely to be targeted for Environment Agency inspection.",
  },
  {
    id: 3,
    section: "Waste Separation",
    icon: Recycle,
    question: "How many separate waste streams do you currently collect on your premises?",
    subtitle: "Think: dry recycling, food waste, general waste, glass, etc.",
    answerKey: "separation_bins",
    options: [
      { label: "One bin — everything mixed together", value: "one_bin", score: 0, flag: "gap" },
      { label: "Two streams — recycling + general waste", value: "two_bins", score: 3, flag: "gap" },
      { label: "Three streams — dry recyclables, food waste & general waste", value: "three_bins", score: 7, flag: "good" },
      { label: "Four or more streams (includes glass separately etc.)", value: "four_plus", score: 10, flag: "good" },
      { label: "Not sure what we have", value: "not_sure_bins", score: 1, flag: "gap" },
    ],
    whyMatters: "Simpler Recycling mandates a minimum of THREE separate streams: dry recyclables (paper, plastic, glass, metal), food waste, and general residual waste. Having only one or two bins is non-compliant.",
  },
  {
    id: 4,
    section: "Food Waste Handling",
    icon: Trash2,
    question: "How does your business handle food waste from staff meals, kitchens, or canteens?",
    subtitle: "Even coffee grounds, fruit peels, and lunch leftovers count as food waste",
    answerKey: "food_waste",
    options: [
      { label: "Dedicated food waste bins with separate collection", value: "dedicated_food", score: 10, flag: "good" },
      { label: "Food waste goes into general waste bins", value: "general_waste", score: 0, flag: "gap" },
      { label: "We separate in some areas but not consistently", value: "partial_food", score: 4, flag: "gap" },
      { label: "We genuinely produce no food waste at all", value: "no_food_waste", score: 10, flag: "good" },
    ],
    whyMatters: "Food waste separation is the most commonly failed requirement. If any staff eat on-site, you almost certainly generate food waste. Mixing it with general waste is a direct violation of Simpler Recycling regulations.",
  },
  {
    id: 5,
    section: "Dry Recyclables",
    icon: FileCheck,
    question: "Which dry recyclable materials do you collect separately from general waste?",
    subtitle: "Simpler Recycling requires paper, card, plastic, glass, and metal to be separated",
    answerKey: "dry_recyclables",
    options: [
      { label: "All five: paper, card, plastic, glass & metal — separately", value: "all_separated", score: 10, flag: "good" },
      { label: "Most are separated — missing 1 or 2 materials", value: "most_separated", score: 7, flag: "neutral" },
      { label: "Some are separated — co-mingled recycling bin only", value: "some_separated", score: 5, flag: "neutral" },
      { label: "Very few are separated from general waste", value: "few_separated", score: 2, flag: "gap" },
      { label: "Nothing is separated — all goes to general waste", value: "none_separated", score: 0, flag: "gap" },
    ],
    whyMatters: "You must segregate dry recyclables as a minimum. While co-mingled (mixed recycling) bins are accepted, having NO separation is non-compliant. The ideal is separate bins for each material type.",
  },
  {
    id: 6,
    section: "Staff Training & Signage",
    icon: GraduationCap,
    question: "What training and signage do you have in place for staff on waste separation?",
    answerKey: "staff_training",
    options: [
      { label: "Full training programme + clear bin labels + posters", value: "full_training", score: 10, flag: "good" },
      { label: "Some training and basic bin labels", value: "some_training", score: 5, flag: "neutral" },
      { label: "Signage only — no formal training", value: "signage_only", score: 4, flag: "neutral" },
      { label: "No training or signage in place", value: "no_training", score: 0, flag: "gap" },
    ],
    whyMatters: "Contamination caused by untrained staff is the top reason for collection rejections and additional charges. The Environment Agency looks for evidence that employees understand waste separation duties.",
  },
  {
    id: 7,
    section: "Waste Transfer Documentation",
    icon: ClipboardList,
    question: "Do you have Waste Transfer Notes (WTNs) or similar documentation from your waste contractor?",
    subtitle: "These prove that your waste was collected and handled legally",
    answerKey: "waste_docs",
    options: [
      { label: "Yes — full WTNs/season tickets on file for all waste streams", value: "full_docs", score: 10, flag: "good" },
      { label: "Partial — some documentation but gaps exist", value: "some_docs", score: 5, flag: "neutral" },
      { label: "No documentation on file", value: "no_docs", score: 0, flag: "gap" },
      { label: "Not sure what documentation we have", value: "unsure_docs", score: 2, flag: "gap" },
    ],
    whyMatters: "Without Waste Transfer Notes you cannot demonstrate legal compliance to an inspector. Under the Environmental Protection Act, businesses must keep WTNs for at least 2 years. Missing records = automatic non-compliance.",
  },
  {
    id: 8,
    section: "Collection Frequency",
    icon: Clock,
    question: "How does your waste contractor collect your separated waste streams?",
    subtitle: "Each stream should be collected separately — not all mixed together",
    answerKey: "collection_frequency",
    options: [
      { label: "Separate collections for each stream on a regular schedule", value: "correct_frequency", score: 10, flag: "good" },
      { label: "Separate collections but infrequent — bins overflow sometimes", value: "infrequent", score: 4, flag: "neutral" },
      { label: "All waste is collected together in one vehicle", value: "mixed_collection", score: 0, flag: "gap" },
      { label: "I don't know how our contractor operates", value: "unsure_frequency", score: 2, flag: "gap" },
    ],
    whyMatters: "Having separate bins on-site counts for nothing if the contractor collects everything in one vehicle. Your contractor must provide separate collections for each waste stream — this is a legal requirement throughout the chain.",
  },
  {
    id: 9,
    section: "Deadline Awareness",
    icon: BookOpen,
    question: "When did Simpler Recycling become mandatory for businesses with 10 or more employees?",
    answerKey: "deadline_awareness",
    options: [
      { label: "31 March 2025", value: "knows_march_2025", score: 10, flag: "good" },
      { label: "31 March 2027 (micro-firms deadline)", value: "knows_2027", score: 6, flag: "neutral" },
      { label: "January 2025 or another date", value: "wrong_date", score: 2, flag: "neutral" },
      { label: "I wasn't aware there was a deadline", value: "no_idea", score: 0, flag: "gap" },
    ],
    whyMatters: "The 31 March 2025 deadline has already passed. Businesses with 10+ employees that are not yet compliant are currently breaking the law and are subject to enforcement action. Micro-firms have until March 2027.",
  },
  {
    id: 10,
    section: "Contamination Prevention",
    icon: AlertTriangle,
    question: "What measures do you have to prevent contamination of recyclables (e.g. food-soiled paper, wrong items in bins)?",
    subtitle: "Contamination causes collections to be rejected and processed as general waste",
    answerKey: "contamination",
    options: [
      { label: "Strong — clear bin labels, training, regular bin audits", value: "strong_prevention", score: 10, flag: "good" },
      { label: "Moderate — some labelling but inconsistent", value: "some_measures", score: 5, flag: "neutral" },
      { label: "Minimal — basic bins but no contamination controls", value: "minimal_measures", score: 3, flag: "gap" },
      { label: "None — no measures in place", value: "no_measures", score: 0, flag: "gap" },
    ],
    whyMatters: "Contamination rates above 10% can result in your entire recycling load being rejected and sent to landfill — defeating the purpose of separation and potentially triggering regulatory action.",
  },
]

function GapAnalyzerContent() {
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
        localStorage.setItem(SESSION_KEY, `ga_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
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

        const res = await fetch("/api/gap-analyser/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: answersPayload }),
        })

        if (res.ok) {
          const result = await res.json()
          try {
            localStorage.setItem("gap_analyzer_result", JSON.stringify(result))
            localStorage.setItem("gap_analyzer_complete", "true")
          } catch { /* silent */ }
        }
      } catch (err) {
        console.error("Scoring error:", err)
      } finally {
        setIsSubmitting(false)
        router.push("/simpler-recycling-gap-analyser/results")
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-green-100/10 to-emerald-100/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                <Recycle className="w-4 h-4 text-green-600" />
                <span className="text-sm poppins-medium text-green-700">Simpler Recycling Gap Analyser</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="text-sm poppins-semibold text-emerald-700">Q{currentStep + 1}/{totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="fixed top-[61px] sm:top-[73px] left-0 right-0 z-40">
        <div className="w-full h-1.5 bg-green-100/60 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step dots */}
        <div className="hidden md:flex items-center justify-between px-8 pt-2 pb-1 bg-white/60 backdrop-blur-sm border-b border-green-50">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? "bg-green-500 scale-100"
                  : i === currentStep
                  ? "bg-green-600 scale-125 ring-2 ring-green-200"
                  : "bg-green-200"
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
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-green-200/60 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-green-700" />
              </div>
              <span className="poppins-semibold text-sm text-green-800 tracking-wide">{currentQuestion.section}</span>
              <span className="text-xs poppins-regular text-green-500">Step {currentStep + 1} of {totalQuestions}</span>
            </div>
          </div>

          {/* Question card */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"
            }`}
          >
            <div className="bg-white/85 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-green-100/50 shadow-[0_8px_40px_rgba(16,185,129,0.10)]">

              <h1 className="poppins-bold text-2xl md:text-3xl text-green-900 mb-3 leading-tight">
                {currentQuestion.question}
              </h1>

              {currentQuestion.subtitle && (
                <p className="poppins-regular text-base text-green-600/80 mb-8 leading-relaxed">
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
                            ? "border-green-400 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg shadow-green-100"
                            : isGap
                            ? "border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg shadow-amber-100"
                            : "border-green-500 bg-green-50 shadow-md"
                          : "border-green-100 bg-white/60 hover:border-green-300 hover:bg-green-50/60 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Radio circle */}
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? isGood
                                ? "border-green-500 bg-green-500"
                                : isGap
                                ? "border-amber-500 bg-amber-500"
                                : "border-green-500 bg-green-500"
                              : "border-green-300 bg-white group-hover:border-green-400"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <span
                          className={`poppins-medium text-sm flex-1 ${
                            isSelected
                              ? isGood
                                ? "text-green-900"
                                : isGap
                                ? "text-amber-900"
                                : "text-green-900"
                              : "text-gray-700 group-hover:text-green-900"
                          }`}
                        >
                          {option.label}
                        </span>

                        {isSelected && showFeedback && (
                          <div className="flex-shrink-0">
                            {isGood && <CheckCircle className="w-5 h-5 text-green-600" />}
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
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : feedbackType === "gap"
                      ? "bg-amber-50 border border-amber-200 text-amber-800"
                      : "bg-gray-50 border border-gray-200 text-gray-700"
                  }`}
                >
                  {feedbackType === "good" && "✅ Good — this meets the regulation requirement"}
                  {feedbackType === "gap" && "⚠️ Gap identified — we'll include this in your report"}
                  {feedbackType === "neutral" && "✓ Noted — we'll factor this into your score"}
                </div>
              )}

              {/* Why this matters */}
              <div className="mt-7 p-5 rounded-2xl bg-gradient-to-br from-green-50/70 to-emerald-50/50 border border-green-100/60">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span className="text-green-700 poppins-bold text-xs">?</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-green-900 text-sm mb-1">Why this matters</p>
                    <p className="poppins-regular text-sm text-green-800/80 leading-relaxed">{currentQuestion.whyMatters}</p>
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
                      : "bg-white border-2 border-green-200 text-green-700 hover:border-green-400 hover:bg-green-50"
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
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02]"
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
                      {isLast ? "Get My Compliance Score" : "Next"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Trust note on first step */}
              {currentStep === 0 && (
                <div className="mt-6 pt-5 border-t border-green-100 flex items-center justify-center gap-2 text-green-600">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="poppins-medium text-xs">Your answers are confidential — 10 quick questions, no obligation</span>
                </div>
              )}
            </div>

            {/* Mini progress text */}
            <div className="mt-4 text-center">
              <span className="poppins-regular text-xs text-green-500">
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

export default function GapAnalyzerPage() {
  return (
    <ErrorBoundary>
      <GapAnalyzerContent />
    </ErrorBoundary>
  )
}
