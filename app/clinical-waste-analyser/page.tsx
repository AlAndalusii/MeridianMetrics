"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, ArrowLeft, BadgeCheck, Heart,
  CheckCircle, AlertTriangle, FileCheck, Clock,
  BookOpen, ClipboardList, BarChart3, Building2,
  Truck, AlertCircle, ShieldCheck, Trash2,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

const STORAGE_KEY = "cw_gap_analyzer_answers"
const STEP_KEY    = "cw_gap_analyzer_step"
const SESSION_KEY = "cw_gap_analyzer_session"

interface Option  { label: string; value: string; score: number; flag?: "gap" | "good" | "neutral" }
interface Question { id: number; section: string; icon: React.ElementType; question: string; subtitle?: string; options: Option[]; whyMatters: string; answerKey: string }

const questions: Question[] = [
  {
    id: 1,
    section: "Clinical Waste Identification",
    icon: Heart,
    question: "Which of the following clinical waste types does your service generate?",
    subtitle: "HTM 07-01 defines clinical waste as waste that poses a risk of infection or may be hazardous due to its pharmaceutical or chemical nature",
    answerKey: "waste_types",
    options: [
      { label: "Infectious waste, sharps, medicines AND offensive/hygiene waste — we produce all types", value: "all_types",         score: 8, flag: "neutral" },
      { label: "Infectious waste and sharps only (dressings, needles, lancets)",                        value: "infectious_sharps",  score: 8, flag: "neutral" },
      { label: "Offensive/hygiene waste only (incontinence products, non-infectious dressings)",         value: "offensive_only",     score: 7, flag: "neutral" },
      { label: "We produce clinical waste but haven't formally identified what types",                   value: "unidentified",       score: 1, flag: "gap"     },
      { label: "We don't think we produce any clinical waste",                                          value: "none",               score: 3, flag: "gap"     },
    ],
    whyMatters: "Under HTM 07-01, every service must formally identify and classify its clinical waste streams. Care homes, children's homes and supported living services routinely produce infectious waste, sharps and medicines waste. Assuming you produce none is a common compliance gap — soiled dressings and continence products alone qualify.",
  },
  {
    id: 2,
    section: "Colour-Code Segregation",
    icon: Trash2,
    question: "How does your service segregate clinical waste at the point of generation?",
    subtitle: "HTM 07-01 requires strict colour-coded segregation: yellow/orange = infectious, tiger-stripe = offensive, purple = cytotoxic, yellow lid sharps for medicines",
    answerKey: "segregation",
    options: [
      { label: "Full colour-coded system in place — all waste goes into the correct stream at source", value: "full_segregation",      score: 10, flag: "good" },
      { label: "Mostly correct, but staff sometimes use the wrong bin",                                value: "mostly_segregated",     score:  6, flag: "neutral" },
      { label: "We have clinical waste bags but don't use a formal colour-coded system",               value: "bags_no_colour",        score:  2, flag: "gap"    },
      { label: "All clinical waste goes into one bag regardless of type",                              value: "all_one_bag",           score:  0, flag: "gap"    },
      { label: "Clinical waste goes into the general waste bin",                                       value: "general_waste",         score:  0, flag: "gap"    },
    ],
    whyMatters: "Incorrect segregation is the single most common clinical waste violation found during CQC and Ofsted inspections. Putting offensive waste into yellow infectious bags incurs unnecessary treatment costs and regulatory risk. Placing infectious waste into general bins is a potential public health risk and a criminal offence under the Hazardous Waste Regulations 2005.",
  },
  {
    id: 3,
    section: "Sharps Management",
    icon: AlertCircle,
    question: "How does your service manage sharps — needles, lancets, syringes and auto-injectors?",
    subtitle: "Sharps injuries are a major occupational health risk — HTM 07-01 and the Sharps Regulations 2013 require UN-approved rigid containers and staff training",
    answerKey: "sharps",
    options: [
      { label: "UN-approved rigid sharps containers at point-of-use, collected by licensed carrier", value: "fully_compliant",     score: 10, flag: "good"    },
      { label: "Sharps containers in use but not always at point-of-use",                          value: "containers_not_pou",  score:  6, flag: "neutral"  },
      { label: "Sharps go into yellow clinical waste bags (not rigid containers)",                 value: "bags_not_containers", score:  0, flag: "gap"      },
      { label: "Sharps are placed in used drinks bottles or improvised containers",                value: "improvised",          score:  0, flag: "gap"      },
      { label: "We don't currently produce sharps waste",                                          value: "no_sharps",           score:  9, flag: "good"     },
    ],
    whyMatters: "Sharps injuries cause serious occupational health harm and potential blood-borne virus transmission. HTM 07-01 requires rigid, UN-approved containers (BS 7320 compliant) at the point of use — not collected and then transferred. CQC and Ofsted inspect sharps management as a fundamental safe care standard.",
  },
  {
    id: 4,
    section: "Medicines Waste",
    icon: FileCheck,
    question: "How is medicines waste — including unused, expired or returned medications — disposed of at your service?",
    subtitle: "Medicines waste must not enter clinical waste yellow bags. Liquid medicines, controlled drugs waste and cytotoxic medicines each have distinct disposal routes",
    answerKey: "medicines_waste",
    options: [
      { label: "Separate pharmaceutical waste containers, returned to pharmacist or licensed carrier",  value: "separate_pharma",     score: 10, flag: "good"   },
      { label: "Medicines go into the yellow clinical waste bag alongside other waste",                 value: "in_yellow_bag",        score:  0, flag: "gap"    },
      { label: "Expired medicines are flushed down the sink or toilet",                                value: "flushed",              score:  0, flag: "gap"    },
      { label: "Medicines are returned to the GP or pharmacy, but no records kept",                    value: "returned_no_records",  score:  5, flag: "neutral" },
      { label: "We don't administer medicines and produce no medicines waste",                          value: "no_medicines",         score:  9, flag: "good"   },
    ],
    whyMatters: "Medicines placed in yellow clinical waste bags contaminate the load and create regulatory breaches. Flushing medicines down the drain is an environmental offence under the Water Resources Act 1991 and can be prosecuted by the EA. Controlled drugs waste has additional requirements under the Misuse of Drugs Regulations 2001 — destruction must be witnessed and recorded.",
  },
  {
    id: 5,
    section: "Storage Facilities",
    icon: Building2,
    question: "Where and how is clinical waste stored on-site before collection?",
    subtitle: "HTM 07-01 requires clinical waste to be stored in a designated, secure, weatherproof area — separate from general waste and inaccessible to the public",
    answerKey: "storage",
    options: [
      { label: "Dedicated, locked, weatherproof clinical waste store — inaccessible to service users", value: "fully_compliant",     score: 10, flag: "good"   },
      { label: "Designated area but not fully secure or weatherproof",                                 value: "partial_storage",     score:  5, flag: "neutral" },
      { label: "Clinical waste bags are stored in a cupboard or corridor",                             value: "corridor_cupboard",   score:  2, flag: "gap"    },
      { label: "Clinical waste is mixed with general waste before collection",                         value: "mixed_general",       score:  0, flag: "gap"    },
      { label: "No specific storage area — bags are left wherever they're filled",                     value: "no_storage",          score:  0, flag: "gap"    },
    ],
    whyMatters: "HTM 07-01 specifies that infectious waste must not be stored for more than 7 days at room temperature or 3 months if refrigerated. Unsecured storage creates public access risk, odour complaints and regulatory breaches. CQC inspectors routinely check waste storage as part of the safe environment domain.",
  },
  {
    id: 6,
    section: "Consignment Notes",
    icon: ClipboardList,
    question: "Does your service complete and retain Hazardous Waste Consignment Notes for all clinical waste collections?",
    subtitle: "Clinical waste is classified as hazardous waste — standard Waste Transfer Notes are not sufficient. Consignment notes must be retained for 3 years",
    answerKey: "consignment_notes",
    options: [
      { label: "Yes — consignment note completed for every collection, retained for 3+ years", value: "fully_compliant",    score: 10, flag: "good"   },
      { label: "We get paperwork from the carrier but aren't sure if it's a consignment note", value: "unsure_type",         score:  4, flag: "neutral" },
      { label: "We use standard Waste Transfer Notes for clinical waste",                       value: "wrong_doc_type",     score:  1, flag: "gap"    },
      { label: "The carrier takes the waste and we receive no documentation",                   value: "no_documentation",   score:  0, flag: "gap"    },
      { label: "We retain documentation but only keep it for 1–2 years",                       value: "short_retention",    score:  3, flag: "gap"    },
    ],
    whyMatters: "Under the Hazardous Waste Regulations 2005, all movements of clinical waste require a pre-notification (for producers generating over 500kg/year) and a Consignment Note — not a standard WTN. Records must be kept for 3 years. The EA has prosecuted care homes for missing consignment notes, with fines ranging from £3,000 to £25,000.",
  },
  {
    id: 7,
    section: "Carrier Registration",
    icon: ShieldCheck,
    question: "Is your clinical waste carrier registered as Upper Tier with the Environment Agency?",
    subtitle: "Clinical waste is hazardous — only Upper Tier carriers can legally collect it. Lower Tier carriers cannot touch clinical waste",
    answerKey: "carrier_registration",
    options: [
      { label: "Upper Tier — confirmed on the EA public register with screenshot on file", value: "upper_documented",  score: 10, flag: "good"   },
      { label: "Upper Tier — carrier confirmed verbally but not checked on the register",  value: "upper_unverified",  score:  5, flag: "neutral" },
      { label: "We use the same carrier for all our waste — we haven't checked their tier", value: "unchecked_tier",   score:  1, flag: "gap"    },
      { label: "We don't know if our carrier is Upper or Lower Tier",                      value: "unaware",           score:  0, flag: "gap"    },
      { label: "We manage clinical waste disposal ourselves",                               value: "self_managed",      score:  0, flag: "gap"    },
    ],
    whyMatters: "Using a Lower Tier carrier — or an unregistered carrier — for clinical waste is a criminal offence. Both the service and the carrier can be prosecuted. The EA and local authorities check carrier registration during inspections. If your carrier is unregistered and waste is improperly disposed of, your service is liable even if you didn't know.",
  },
  {
    id: 8,
    section: "Collection Frequency",
    icon: Clock,
    question: "How frequently is your clinical waste collected, and is this documented?",
    subtitle: "HTM 07-01 states infectious waste should not be stored at room temperature for more than 7 days; the collection schedule must match your waste generation rate",
    answerKey: "collection_frequency",
    options: [
      { label: "Weekly or more frequent — collection schedule documented and reviewed", value: "frequent_documented",  score: 10, flag: "good"   },
      { label: "Weekly — but no written schedule or review process",                   value: "weekly_undocumented",  score:  7, flag: "neutral" },
      { label: "Monthly — but sometimes waste accumulates beyond one bag",             value: "monthly_overflow",     score:  2, flag: "gap"    },
      { label: "Whenever we remember or when bags are full",                           value: "ad_hoc",               score:  0, flag: "gap"    },
      { label: "We don't know how often our clinical waste is collected",              value: "unaware",              score:  0, flag: "gap"    },
    ],
    whyMatters: "Over-accumulation of clinical waste is a regulated breach. Infectious waste stored beyond 7 days at room temperature creates odour, pest risk, infection risk and regulatory exposure. Lack of a documented collection schedule is a common CQC finding — inspectors look for evidence that waste management is planned and monitored, not reactive.",
  },
  {
    id: 9,
    section: "Staff Training",
    icon: BookOpen,
    question: "When were your staff last trained on clinical waste segregation, safe handling and HTM 07-01 requirements?",
    subtitle: "CQC and Ofsted both require evidence of staff training in infection prevention and waste management — verbal induction is not sufficient",
    answerKey: "staff_training",
    options: [
      { label: "Within the last 12 months — with records and signed training logs", value: "recent_documented",     score: 10, flag: "good"   },
      { label: "Within the last 2 years — but training records are incomplete",    value: "recent_incomplete",     score:  6, flag: "neutral" },
      { label: "Training was given at induction — no refresher since",             value: "induction_only",        score:  2, flag: "gap"    },
      { label: "We haven't provided specific clinical waste training",             value: "no_training",           score:  0, flag: "gap"    },
      { label: "Verbal guidance only — nothing written down or signed",            value: "verbal_only",           score:  1, flag: "gap"    },
    ],
    whyMatters: "CQC's KLOE E1 (safe care and treatment) and Ofsted's quality of education judgement both require staff to demonstrate competence in infection control including clinical waste. Undocumented or outdated training is a recurring finding in poor-rating inspections. Annual refresher training with signed records is the minimum expected standard.",
  },
  {
    id: 10,
    section: "CQC / Ofsted Readiness",
    icon: BarChart3,
    question: "Has your service had any clinical waste concerns raised during a CQC or Ofsted inspection — or by any other regulatory body?",
    subtitle: "Repeat inspection findings in the same area trigger escalated enforcement — including requirement notices, special measures and prosecutions",
    answerKey: "inspection_history",
    options: [
      { label: "No concerns raised — our last inspection was satisfactory on waste management", value: "clean_history",          score: 10, flag: "good"   },
      { label: "Minor recommendations made — we've addressed them since",                       value: "minor_addressed",       score:  8, flag: "good"   },
      { label: "A requirement was issued — we're working on it but it's not fully resolved",   value: "requirement_open",      score:  1, flag: "gap"    },
      { label: "We've had concerns raised but haven't yet actioned them fully",                value: "concerns_unactioned",   score:  0, flag: "gap"    },
      { label: "We haven't been inspected or aren't sure of our inspection history",           value: "no_inspection_history", score:  3, flag: "neutral" },
    ],
    whyMatters: "Previous inspection findings that remain unresolved are treated by CQC and Ofsted as evidence of systemic failure — not just isolated incidents. Repeat findings in waste or infection control can result in a 'Requires Improvement' or 'Inadequate' rating, enforcement notices, or referral to the EA. Outstanding requirements must be treated as urgent priorities.",
  },
]

function ClinicalWasteAnalyserContent() {
  const router = useRouter()
  const [currentStep,  setCurrentStep]  = useState(0)
  const [answers,      setAnswers]       = useState<Record<string, string>>({})
  const [isAnimating,  setIsAnimating]   = useState(false)
  const [showFeedback, setShowFeedback]  = useState(false)
  const [feedbackType, setFeedbackType]  = useState<"good" | "gap" | "neutral">("neutral")
  const [isSubmitting, setIsSubmitting]  = useState(false)

  const currentQuestion = questions[currentStep]
  const totalQuestions  = questions.length
  const progress        = ((currentStep + 1) / totalQuestions) * 100

  useEffect(() => {
    try {
      if (!localStorage.getItem(SESSION_KEY)) {
        localStorage.setItem(SESSION_KEY, `cw_ga_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
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
      try {
        const totalScore = questions.reduce((sum, q) => {
          const selected = answers[q.answerKey]
          const option   = q.options.find(o => o.value === selected)
          return sum + (option?.score ?? 0)
        }, 0)

        const gaps = questions
          .filter(q => q.options.find(o => o.value === answers[q.answerKey])?.flag === "gap")
          .map(q => ({ title: q.section, description: q.whyMatters, risk: "High risk — action required" }))

        localStorage.setItem("cw_gap_analyzer_result",   JSON.stringify({ score: totalScore, topGaps: gaps.slice(0, 3), urgencyLevel: totalScore < 50 ? "High" : totalScore < 75 ? "Medium" : "Low" }))
        localStorage.setItem("cw_gap_analyzer_complete", "true")
      } catch { /* silent */ }

      setIsSubmitting(false)
      router.push("/clinical-waste-analyser/results")
      return
    }

    setTimeout(() => { setCurrentStep(s => s + 1); setIsAnimating(false) }, 300)
  }, [answers, currentQuestion, currentStep, totalQuestions, router])

  const handleBack = useCallback(() => {
    if (currentStep === 0) return
    setIsAnimating(true)
    setTimeout(() => { setCurrentStep(s => s - 1); setIsAnimating(false) }, 300)
  }, [currentStep])

  const selectedAnswer = answers[currentQuestion.answerKey]
  const isLast         = currentStep === totalQuestions - 1
  const canProceed     = !!selectedAnswer
  const Icon           = currentQuestion.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
              <Heart className="w-4 h-4 text-emerald-600" />
              <span className="text-sm poppins-medium text-emerald-700">Clinical Waste Gap Analyser</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-full border border-emerald-100">
              <span className="text-sm poppins-semibold text-emerald-700">Q{currentStep + 1}/{totalQuestions}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress */}
      <div className="fixed top-[61px] sm:top-[73px] left-0 right-0 z-40">
        <div className="w-full h-1.5 bg-emerald-100/60">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="hidden md:flex items-center justify-between px-8 pt-2 pb-1 bg-white/60 backdrop-blur-sm border-b border-emerald-50">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-all duration-300 ${i < currentStep ? "bg-emerald-500" : i === currentStep ? "bg-emerald-600 scale-125 ring-2 ring-emerald-200" : "bg-emerald-200"}`} />
          ))}
        </div>
      </div>

      <div className="pt-28 md:pt-32 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">

          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald-200/60 shadow-md">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-emerald-700" />
              </div>
              <span className="poppins-semibold text-sm text-emerald-800 tracking-wide">{currentQuestion.section}</span>
              <span className="text-xs poppins-regular text-emerald-500">Step {currentStep + 1} of {totalQuestions}</span>
            </div>
          </div>

          <div className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}>
            <div className="bg-white/85 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-emerald-100/50 shadow-[0_8px_40px_rgba(16,185,129,0.10)]">

              <h1 className="poppins-bold text-2xl md:text-3xl text-emerald-900 mb-3 leading-tight">{currentQuestion.question}</h1>

              {currentQuestion.subtitle && (
                <p className="poppins-regular text-base text-emerald-600/80 mb-8 leading-relaxed">{currentQuestion.subtitle}</p>
              )}

              <div className="space-y-3 mt-6">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option.value
                  const isGap  = option.flag === "gap"
                  const isGood = option.flag === "good"
                  return (
                    <button key={idx} onClick={() => handleAnswer(option.value)}
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-250 group ${
                        isSelected
                          ? isGood ? "border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg shadow-emerald-100"
                            : isGap ? "border-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-lg shadow-amber-100"
                            : "border-emerald-500 bg-emerald-50 shadow-md"
                          : "border-emerald-100 bg-white/60 hover:border-emerald-300 hover:bg-emerald-50/60 hover:shadow-sm"
                      }`}>
                      <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? isGood ? "border-emerald-500 bg-emerald-500" : isGap ? "border-amber-500 bg-amber-500" : "border-emerald-500 bg-emerald-500"
                          : "border-emerald-300 bg-white group-hover:border-emerald-400"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className={`poppins-medium text-sm flex-1 ${isSelected ? isGood ? "text-emerald-900" : isGap ? "text-amber-900" : "text-emerald-900" : "text-gray-700 group-hover:text-emerald-900"}`}>
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

              {showFeedback && selectedAnswer && (
                <div className={`mt-4 p-3 rounded-xl text-sm poppins-medium animate-fade-in-up ${
                  feedbackType === "good" ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : feedbackType === "gap" ? "bg-amber-50 border border-amber-200 text-amber-800"
                  : "bg-gray-50 border border-gray-200 text-gray-700"
                }`}>
                  {feedbackType === "good" && "✅ Good — this meets the clinical waste requirement"}
                  {feedbackType === "gap"  && "⚠️ Gap identified — we'll include this in your report"}
                  {feedbackType === "neutral" && "✓ Noted — we'll factor this into your score"}
                </div>
              )}

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

              <div className="mt-8 flex items-center gap-3">
                <Button onClick={handleBack} disabled={currentStep === 0}
                  className={`poppins-semibold px-6 py-5 rounded-2xl transition-all ${
                    currentStep === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50"
                  }`}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" />Back
                </Button>
                <Button onClick={handleNext} disabled={!canProceed || isSubmitting}
                  className={`poppins-semibold px-8 py-5 rounded-2xl flex-1 transition-all duration-300 group ${
                    !canProceed ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                  }`}>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>Calculating your score…
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isLast ? "Get My Clinical Waste Score" : "Next"}
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

export default function ClinicalWasteAnalyserPage() {
  return <ErrorBoundary><ClinicalWasteAnalyserContent /></ErrorBoundary>
}
