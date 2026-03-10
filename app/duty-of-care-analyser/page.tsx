"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, ArrowLeft, BadgeCheck, ClipboardCheck,
  CheckCircle, AlertTriangle, FileCheck, Clock,
  BookOpen, ClipboardList, BarChart3, Building2,
  Search, AlertCircle, Truck, ShieldCheck,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

const STORAGE_KEY = "doc_gap_analyzer_answers"
const STEP_KEY    = "doc_gap_analyzer_step"
const SESSION_KEY = "doc_gap_analyzer_session"

interface Option  { label: string; value: string; score: number; flag?: "gap" | "good" | "neutral" }
interface Question { id: number; section: string; icon: React.ElementType; question: string; subtitle?: string; options: Option[]; whyMatters: string; answerKey: string }

const questions: Question[] = [
  {
    id: 1,
    section: "Waste Transfer Notes",
    icon: FileCheck,
    question: "Do you receive and keep a Waste Transfer Note (WTN) every time your waste is collected?",
    subtitle: "A WTN is a legal receipt proving your waste went to an authorised person — required under Environmental Protection Act 1990, s.34",
    answerKey: "wtn_practice",
    options: [
      { label: "Yes — we receive and file a WTN for every single collection", value: "always", score: 10, flag: "good" },
      { label: "Usually, but we sometimes miss collections or lose paperwork", value: "usually", score: 5, flag: "neutral" },
      { label: "We get invoices but not always a separate WTN", value: "invoices_only", score: 3, flag: "gap" },
      { label: "No — our bin company just collects and we have no documentation", value: "none", score: 0, flag: "gap" },
      { label: "I'm not sure what a Waste Transfer Note is", value: "unaware", score: 0, flag: "gap" },
    ],
    whyMatters: "Every waste collection legally requires a WTN. Failure to obtain or retain one is a £300 fixed penalty on the spot. The Environment Agency can request your records at any time — including during a routine inspection of a nearby site.",
  },
  {
    id: 2,
    section: "Record Keeping",
    icon: BookOpen,
    question: "How long do you retain your waste documentation?",
    subtitle: "Standard waste records must be kept for 2 years; hazardous waste (including clinical waste) requires 3 years",
    answerKey: "record_retention",
    options: [
      { label: "3+ years — we keep all waste records well beyond the minimum", value: "3_plus", score: 10, flag: "good" },
      { label: "2 years for standard, 3 years for hazardous waste", value: "correct_periods", score: 10, flag: "good" },
      { label: "About 1 year — we clear old paperwork annually", value: "one_year", score: 3, flag: "gap" },
      { label: "We keep records but are not sure how long", value: "unsure_period", score: 4, flag: "neutral" },
      { label: "We don't keep waste records systematically", value: "no_records", score: 0, flag: "gap" },
    ],
    whyMatters: "The EA can issue a £300 fixed penalty simply for failing to produce records on request — even if your waste was actually disposed of legally. Records must be producible immediately. 'I had them somewhere' is not a defence.",
  },
  {
    id: 3,
    section: "Carrier Registration",
    icon: Search,
    question: "Have you checked your waste carrier on the Environment Agency's public register?",
    subtitle: "You can check at environment.data.gov.uk/public-register — takes 2 minutes",
    answerKey: "carrier_check",
    options: [
      { label: "Yes — we checked and have a screenshot or note of their registration", value: "checked_documented", score: 10, flag: "good" },
      { label: "Yes — we checked verbally but didn't document it", value: "checked_undocumented", score: 6, flag: "neutral" },
      { label: "No — we trust that our carrier is registered", value: "trusted_unchecked", score: 1, flag: "gap" },
      { label: "Our carrier said they're registered but we haven't verified it", value: "carrier_claimed", score: 2, flag: "gap" },
      { label: "We've never checked the public register", value: "never_checked", score: 0, flag: "gap" },
    ],
    whyMatters: "If your carrier is unregistered and illegally dumps your waste, YOU are liable — not just the carrier. Both parties can face prosecution. The public register is free and takes two minutes to check. Not checking is an indefensible gap.",
  },
  {
    id: 4,
    section: "Carrier Registration Type",
    icon: ShieldCheck,
    question: "Do you know whether your waste carrier is registered as Upper Tier or Lower Tier?",
    subtitle: "Only Upper Tier carriers can legally collect hazardous waste (batteries, fluorescent tubes, clinical waste, chemicals)",
    answerKey: "carrier_tier",
    options: [
      { label: "Upper Tier — confirmed on the public register", value: "upper_confirmed", score: 10, flag: "good" },
      { label: "Upper Tier — our carrier told us but we haven't checked", value: "upper_unchecked", score: 5, flag: "neutral" },
      { label: "Lower Tier — we only produce standard non-hazardous waste", value: "lower_standard_only", score: 7, flag: "good" },
      { label: "I don't know the difference between Upper and Lower Tier", value: "unaware_tiers", score: 1, flag: "gap" },
      { label: "We've never checked the tier of our carrier", value: "never_checked_tier", score: 0, flag: "gap" },
    ],
    whyMatters: "Lower Tier carriers cannot legally collect hazardous waste. If your site produces batteries, fluorescent tubes, vapes, chemicals or clinical waste and your carrier is only Lower Tier, every single collection is unlawful — with criminal prosecution risk for both parties.",
  },
  {
    id: 5,
    section: "Waste Description Accuracy",
    icon: ClipboardList,
    question: "How is your waste described on your Waste Transfer Notes?",
    subtitle: "Each waste type needs its own European Waste Catalogue (EWC) code — 'mixed waste' or 'general rubbish' is not legally compliant",
    answerKey: "waste_description",
    options: [
      { label: "Each stream is separately described with EWC codes and quantities", value: "full_codes", score: 10, flag: "good" },
      { label: "Waste is described but without formal EWC codes", value: "described_no_codes", score: 5, flag: "neutral" },
      { label: "WTNs just say 'general waste' or 'mixed waste'", value: "vague_description", score: 2, flag: "gap" },
      { label: "We don't fill in waste descriptions — the carrier does it for us", value: "carrier_fills", score: 3, flag: "gap" },
      { label: "Our WTNs have no waste description at all", value: "no_description", score: 0, flag: "gap" },
    ],
    whyMatters: "Inaccurate waste descriptions are one of the top 5 Duty of Care violations found in EA inspections. A WTN saying 'general waste' when the bin contains hazardous items (batteries, chemicals) means the description is fraudulent — creating liability for illegal disposal even if the carrier was registered.",
  },
  {
    id: 6,
    section: "Waste Storage",
    icon: Building2,
    question: "How is your business waste stored on-site before collection?",
    subtitle: "Waste escape (overflowing bins, uncovered skips, spillages) is an immediate £300 fixed penalty offence",
    answerKey: "waste_storage",
    options: [
      { label: "Secure, lidded bins in a dedicated enclosed storage area", value: "fully_secure", score: 10, flag: "good" },
      { label: "Lidded bins but no dedicated storage area", value: "lidded_no_area", score: 7, flag: "neutral" },
      { label: "Open-top bins or skips — sometimes overflowing", value: "open_overflow", score: 2, flag: "gap" },
      { label: "Waste is left in bags in corridors or accessible areas", value: "bags_corridors", score: 1, flag: "gap" },
      { label: "No specific waste storage system in place", value: "no_system", score: 0, flag: "gap" },
    ],
    whyMatters: "Escape of waste — including waste blowing from open skips, overflowing bins or unsecured bags — is a separate £300 fixed penalty from failure to maintain WTNs. It is also a fly-tipping trigger. Council and EA inspectors can issue fines on-the-spot during or following a visit.",
  },
  {
    id: 7,
    section: "Hazardous Waste",
    icon: AlertCircle,
    question: "Does your premises generate any hazardous waste — batteries, fluorescent tubes, vapes, cleaning chemicals, paint or clinical waste?",
    subtitle: "Hazardous waste requires separate consignment notes (not standard WTNs), 3-year retention and an Upper Tier carrier",
    answerKey: "hazardous_waste",
    options: [
      { label: "Yes — and we have separate consignment notes for every hazardous collection", value: "hazardous_compliant", score: 10, flag: "good" },
      { label: "Yes — but we put it in the general waste bin with everything else", value: "hazardous_mixed", score: 0, flag: "gap" },
      { label: "Yes — but we're not sure if we're handling it correctly", value: "hazardous_unsure", score: 2, flag: "gap" },
      { label: "Possibly — we've never specifically audited our waste streams for hazardous items", value: "possibly_unaudited", score: 1, flag: "gap" },
      { label: "No hazardous waste on our premises", value: "none_hazardous", score: 8, flag: "good" },
    ],
    whyMatters: "Batteries, fluorescent tubes, vapes, paints and cleaning chemicals are all classified as hazardous waste. Putting them in a general bin is a criminal offence. Care homes also generate sharps, medicines and infectious waste — all hazardous. The EA takes hazardous waste violations very seriously and prosecutions are common.",
  },
  {
    id: 8,
    section: "WTN Completeness",
    icon: FileCheck,
    question: "When you receive a Waste Transfer Note, does it include your carrier's registration number and both parties' signatures?",
    subtitle: "A WTN missing any legally required fields is not valid — and will not protect you during an EA inspection",
    answerKey: "wtn_completeness",
    options: [
      { label: "Yes — every WTN includes carrier registration number, EWC code, quantities and both signatures", value: "fully_complete", score: 10, flag: "good" },
      { label: "Mostly complete — but we've noticed some fields are sometimes blank", value: "mostly_complete", score: 5, flag: "neutral" },
      { label: "Our WTNs are invoices — they have some information but not all required fields", value: "invoices_incomplete", score: 3, flag: "gap" },
      { label: "We accept whatever the carrier gives us without checking", value: "unchecked", score: 1, flag: "gap" },
      { label: "We don't receive documentation from our carrier", value: "no_docs", score: 0, flag: "gap" },
    ],
    whyMatters: "An incomplete WTN is not legally valid. Required fields include: waste description with EWC code, quantity, container type, date, producer name and address, carrier name and registration number, destination facility and permit number, and both parties' signatures. Missing your carrier's registration number alone invalidates the document.",
  },
  {
    id: 9,
    section: "Season Ticket Use",
    icon: ClipboardCheck,
    question: "For regular waste collections of the same waste stream, do you use a Season Ticket arrangement?",
    subtitle: "A Season Ticket covers 12 months of identical collections — but you still need a collection log showing dates and quantities",
    answerKey: "season_ticket",
    options: [
      { label: "Yes — Season Ticket in place with a collection log maintained", value: "season_with_log", score: 10, flag: "good" },
      { label: "Yes — Season Ticket in place but no collection log kept", value: "season_no_log", score: 5, flag: "neutral" },
      { label: "No — we get individual WTNs for every collection (which is fine)", value: "individual_wtns", score: 9, flag: "good" },
      { label: "We use a Season Ticket but sometimes put different waste types in the same bin", value: "season_mixed", score: 0, flag: "gap" },
      { label: "We don't know whether we have a Season Ticket or not", value: "unaware_season", score: 1, flag: "gap" },
    ],
    whyMatters: "A Season Ticket is only valid for the exact waste type described. Putting different waste in a bin covered by a Season Ticket — for example, adding plastic to a cardboard-only Season Ticket — invalidates the entire arrangement and means every collection under that Season Ticket was technically undocumented.",
  },
  {
    id: 10,
    section: "Staff Awareness",
    icon: BarChart3,
    question: "Can the person responsible for waste at your site name your licensed carrier and explain where your waste goes?",
    subtitle: "The Duty of Care extends to knowing the final destination of your waste — 'I don't know' is not a legal defence",
    answerKey: "staff_awareness",
    options: [
      { label: "Yes — they know the carrier name, registration number and destination site", value: "full_awareness", score: 10, flag: "good" },
      { label: "They know the carrier name but not registration or destination", value: "partial_awareness", score: 5, flag: "neutral" },
      { label: "They know who collects it but not if the carrier is registered", value: "collector_only", score: 3, flag: "gap" },
      { label: "Multiple people handle waste and nobody owns it", value: "no_owner", score: 1, flag: "gap" },
      { label: "Nobody on site is specifically responsible for waste management", value: "no_responsibility", score: 0, flag: "gap" },
    ],
    whyMatters: "Duty of Care requires you to take 'all reasonable steps' — which includes knowing who your carrier is, checking they're registered, and understanding where your waste goes. If waste is fly-tipped by an unknown carrier and you cannot demonstrate you checked their registration, you face prosecution alongside the carrier.",
  },
]

function DutyOfCareAnalyserContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep]     = useState(0)
  const [answers,     setAnswers]          = useState<Record<string, string>>({})
  const [isAnimating, setIsAnimating]      = useState(false)
  const [showFeedback, setShowFeedback]    = useState(false)
  const [feedbackType, setFeedbackType]    = useState<"good" | "gap" | "neutral">("neutral")
  const [isSubmitting, setIsSubmitting]    = useState(false)

  const currentQuestion = questions[currentStep]
  const totalQuestions  = questions.length
  const progress        = ((currentStep + 1) / totalQuestions) * 100

  useEffect(() => {
    try {
      if (!localStorage.getItem(SESSION_KEY)) {
        localStorage.setItem(SESSION_KEY, `doc_ga_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
      }
      const savedAnswers = localStorage.getItem(STORAGE_KEY)
      const savedStep    = localStorage.getItem(STEP_KEY)
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedStep)    setCurrentStep(parseInt(savedStep))
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
      // Compute score client-side and store result
      try {
        const totalScore = questions.reduce((sum, q) => {
          const selected = answers[q.answerKey]
          const option   = q.options.find(o => o.value === selected)
          return sum + (option?.score ?? 0)
        }, 0)

        const gaps = questions
          .filter(q => {
            const selected = answers[q.answerKey]
            return q.options.find(o => o.value === selected)?.flag === "gap"
          })
          .map(q => ({
            title:       q.section,
            description: q.whyMatters,
            risk:        "High risk — action required",
          }))

        const result = {
          score:        totalScore,
          topGaps:      gaps.slice(0, 3),
          urgencyLevel: totalScore < 50 ? "High" : totalScore < 75 ? "Medium" : "Low",
        }

        localStorage.setItem("doc_gap_analyzer_result",   JSON.stringify(result))
        localStorage.setItem("doc_gap_analyzer_complete", "true")
      } catch { /* silent */ }

      setIsSubmitting(false)
      router.push("/duty-of-care-analyser/results")
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
  const isLast         = currentStep === totalQuestions - 1
  const canProceed     = !!selectedAnswer
  const Icon           = currentQuestion.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
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
                <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-sm poppins-medium text-emerald-700">Duty of Care Gap Analyser</span>
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
        <div className="w-full h-1.5 bg-emerald-100/60 backdrop-blur-sm">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="hidden md:flex items-center justify-between px-8 pt-2 pb-1 bg-white/60 backdrop-blur-sm border-b border-emerald-50">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i < currentStep ? "bg-emerald-500" : i === currentStep ? "bg-emerald-600 scale-125 ring-2 ring-emerald-200" : "bg-emerald-200"}`} />
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
          <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}>
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
                  const isGap  = option.flag === "gap"
                  const isGood = option.flag === "good"
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-250 group ${
                        isSelected
                          ? isGood ? "border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg shadow-emerald-100"
                            : isGap ? "border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg shadow-amber-100"
                            : "border-emerald-500 bg-emerald-50 shadow-md"
                          : "border-emerald-100 bg-white/60 hover:border-emerald-300 hover:bg-emerald-50/60 hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? isGood ? "border-emerald-500 bg-emerald-500" : isGap ? "border-amber-500 bg-amber-500" : "border-emerald-500 bg-emerald-500"
                            : "border-emerald-300 bg-white group-hover:border-emerald-400"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className={`poppins-medium text-sm flex-1 ${
                          isSelected
                            ? isGood ? "text-emerald-900" : isGap ? "text-amber-900" : "text-emerald-900"
                            : "text-gray-700 group-hover:text-emerald-900"
                        }`}>
                          {option.label}
                        </span>
                        {isSelected && showFeedback && (
                          <div className="flex-shrink-0">
                            {isGood && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                            {isGap  && <AlertTriangle className="w-5 h-5 text-amber-600" />}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Inline feedback */}
              {showFeedback && selectedAnswer && (
                <div className={`mt-4 p-3 rounded-xl text-sm poppins-medium animate-fade-in-up ${
                  feedbackType === "good" ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : feedbackType === "gap" ? "bg-amber-50 border border-amber-200 text-amber-800"
                  : "bg-gray-50 border border-gray-200 text-gray-700"
                }`}>
                  {feedbackType === "good" && "✅ Good — this meets the Duty of Care requirement"}
                  {feedbackType === "gap"  && "⚠️ Gap identified — we'll include this in your report"}
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
                    currentStep === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed || isSubmitting}
                  className={`poppins-semibold px-8 py-5 rounded-2xl flex-1 transition-all duration-300 group ${
                    !canProceed ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Calculating your score…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLast ? "Get My Duty of Care Score" : "Next"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </div>

              {currentStep === 0 && (
                <div className="mt-6 pt-5 border-t border-emerald-100 flex items-center justify-center gap-2 text-emerald-600">
                  <BadgeCheck className="w-4 h-4" />
                  <span className="poppins-medium text-xs">Your answers are confidential — 10 questions, no obligation</span>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <span className="poppins-regular text-xs text-emerald-500">
                {totalQuestions - currentStep - 1 === 0 ? "Last question — almost done!" : `${totalQuestions - currentStep - 1} question${totalQuestions - currentStep - 1 !== 1 ? "s" : ""} remaining`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DutyOfCareAnalyserPage() {
  return (
    <ErrorBoundary>
      <DutyOfCareAnalyserContent />
    </ErrorBoundary>
  )
}
