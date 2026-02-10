"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowRight,
  ArrowLeft,
  Shield,
  FileCheck,
  Calculator,
  Database,
  Clock,
  CheckCircle,
  AlertTriangle,
  Package,
  XCircle,
  Building,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

// Question types and data
interface Question {
  id: number
  section: string
  icon: any
  question: string
  subtitle?: string
  type: "text" | "radio" | "textarea"
  options?: { label: string; value: string; isCorrect?: boolean; isGap?: boolean }[]
  whyMatters: string
  placeholder?: string
}

const questions: Question[] = [
  // PART 1: Contact Information (4 questions)
  {
    id: 1,
    section: "Contact Information",
    icon: Shield,
    question: "What's your name?",
    subtitle: "Let's start with the basics",
    type: "text",
    whyMatters: "We'll personalise your EPR compliance report with your name",
    placeholder: "First and Last Name",
  },
  {
    id: 2,
    section: "Contact Information",
    icon: Shield,
    question: "What's your work email?",
    subtitle: "We'll send your detailed report here",
    type: "text",
    whyMatters: "Required to see your results and recommendations",
    placeholder: "your.email@company.com",
  },
  {
    id: 3,
    section: "Contact Information",
    icon: Shield,
    question: "What's your company name?",
    type: "text",
    whyMatters: "Helps us understand your business context",
    placeholder: "Your Company Ltd",
  },
  {
    id: 4,
    section: "Contact Information",
    icon: Shield,
    question: "Phone number (optional)",
    subtitle: "We will not call you unless you explicitly request a call",
    type: "text",
    whyMatters: "Optional - skip if you prefer email contact only",
    placeholder: "+44 7XXX XXXXXX (you can skip this)",
  },
  
  // PART 2: EPR Compliance Assessment (6 questions - Questions 1-3: Liability, 4-6: Knowledge & Service Need)
  {
    id: 5,
    section: "EPR Liability Check",
    icon: Package,
    question: "Does your business handle packaging?",
    subtitle: "Manufacturer, importer, brand owner, or online marketplace seller",
    type: "radio",
    options: [
      { label: "Yes - we manufacture packaging", value: "manufacturer" },
      { label: "Yes - we import packaged goods into the UK", value: "importer" },
      { label: "Yes - we're a brand owner selling packaged products", value: "brand_owner" },
      { label: "Yes - we sell via online marketplace (Amazon, eBay, etc.)", value: "marketplace" },
      { label: "No - we don't handle packaging", value: "no", isCorrect: true },
    ],
    whyMatters: "EPR applies to businesses that manufacture, import, brand, or sell packaged goods. This determines if you have legal obligations.",
  },
  {
    id: 6,
    section: "EPR Liability Check",
    icon: Calculator,
    question: "What's your annual packaging tonnage?",
    subtitle: "Include all packaging materials (plastic, paper, glass, metal)",
    type: "radio",
    options: [
      { label: "Under 25 tonnes (small producer)", value: "under_25" },
      { label: "25-50 tonnes (EPR registration required)", value: "25_50" },
      { label: "50+ tonnes (full EPR obligations)", value: "50_plus" },
      { label: "Not sure - we haven't measured this", value: "not_sure", isGap: true },
    ],
    whyMatters: "EPR thresholds: 25+ tonnes = must register. 50+ tonnes = full reporting and fees apply. Not knowing your tonnage is a compliance risk.",
  },
  {
    id: 7,
    section: "EPR Liability Check",
    icon: Database,
    question: "Do you sell goods in UK market requiring packaging data?",
    subtitle: "This includes B2B and B2C sales of packaged products",
    type: "radio",
    options: [
      { label: "Yes - we sell packaged goods to UK customers", value: "yes" },
      { label: "No - we don't sell packaged goods", value: "no", isCorrect: true },
      { label: "Not sure if our sales require packaging data", value: "not_sure", isGap: true },
    ],
    whyMatters: "If you place packaged goods on the UK market, you're responsible for EPR data submission and fees.",
  },
  {
    id: 8,
    section: "EPR Knowledge",
    icon: FileCheck,
    question: "Are you registered with the environmental regulator?",
    subtitle: "Environment Agency (England), SEPA (Scotland), NRW (Wales), NIEA (Northern Ireland)",
    type: "radio",
    options: [
      { label: "Yes - registered and up to date", value: "yes", isCorrect: true },
      { label: "Partially - registered but not sure if up to date", value: "partial" },
      { label: "No - not registered yet", value: "no", isGap: true },
      { label: "Not sure if we need to be registered", value: "not_sure", isGap: true },
    ],
    whyMatters: "EPR registration is legally required if you handle 25+ tonnes of packaging. Non-registration = fines and penalties.",
  },
  {
    id: 9,
    section: "EPR Knowledge",
    icon: Clock,
    question: "Do you understand your EPR fee calculations?",
    subtitle: "Household vs non-household split, material categories, modulation fees",
    type: "radio",
    options: [
      { label: "Yes - I understand how fees are calculated", value: "yes", isCorrect: true },
      { label: "Partially - I know some but not all", value: "partial" },
      { label: "No - I just pay what the scheme sends me", value: "no", isGap: true },
      { label: "Not sure what EPR fees are", value: "not_sure", isGap: true },
    ],
    whyMatters: "Most businesses overpay £5K-£15K annually due to incorrect household/non-household categorisation. Understanding fees saves money.",
  },
  {
    id: 10,
    section: "Service Need",
    icon: AlertTriangle,
    question: "What's your biggest EPR compliance challenge right now?",
    type: "radio",
    options: [
      { label: "EPR invoice too high - think we're overpaying", value: "overpaying" },
      { label: "Not sure if we're registered correctly", value: "registration" },
      { label: "Don't track packaging data properly", value: "data_tracking", isGap: true },
      { label: "Upcoming deadline - need urgent help", value: "deadline" },
      { label: "Just want peace of mind we're compliant", value: "peace_of_mind" },
    ],
    whyMatters: "This helps us recommend the right service tier - audit (£295), fee review (£795), or managed compliance (£499/month).",
  },
]

function EPRQuizContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"correct" | "gap" | "neutral">("neutral")
  const [isContactInfoPhase, setIsContactInfoPhase] = useState(true)
  const [validationError, setValidationError] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")

  const currentQuestion = questions[currentStep]
  const totalQuestions = questions.length
  const contactInfoQuestions = 4
  const assessmentQuestions = totalQuestions - contactInfoQuestions
  
  const progress = isContactInfoPhase 
    ? ((currentStep + 1) / contactInfoQuestions) * 100
    : ((currentStep - contactInfoQuestions + 1) / assessmentQuestions) * 100

  useEffect(() => {
    try {
      let savedSessionId = localStorage.getItem("epr_session_id")
      if (!savedSessionId) {
        savedSessionId = `epr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("epr_session_id", savedSessionId)
      }
      setSessionId(savedSessionId)

      const savedAnswers = localStorage.getItem("epr_assessment_answers")
      const savedStep = localStorage.getItem("epr_assessment_step")
      
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedStep && parseInt(savedStep) > 0) setCurrentStep(parseInt(savedStep))
    } catch (error) {
      console.error("Failed to load saved progress:", error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("epr_assessment_answers", JSON.stringify(answers))
      localStorage.setItem("epr_assessment_step", currentStep.toString())
    } catch (error) {
      console.error("Failed to save progress:", error)
    }
  }, [answers, currentStep])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    const phoneRegex = /^(\+44|0)[0-9]{9,10}$/
    return phoneRegex.test(cleanPhone)
  }

  const handleAnswer = (value: string) => {
    setValidationError("")
    setAnswers({ ...answers, [currentQuestion.id]: value })
    
    if (currentQuestion.options) {
      const selectedOption = currentQuestion.options.find(opt => opt.value === value)
      if (selectedOption?.isCorrect) {
        setFeedbackType("correct")
        setShowFeedback(true)
      } else if (selectedOption?.isGap) {
        setFeedbackType("gap")
        setShowFeedback(true)
      } else {
        setFeedbackType("neutral")
        setShowFeedback(true)
      }
    }

    setTimeout(() => setShowFeedback(false), 2000)
  }

  const handleInputBlur = (value: string) => {
    if (currentQuestion.id === 2 && value && !validateEmail(value)) {
      setValidationError("Please enter a valid email address")
    }
    if (currentQuestion.id === 4 && value && !validatePhone(value)) {
      setValidationError("Please enter a valid UK phone number")
    }
  }

  const handleNext = () => {
    setValidationError("")
    
    const isOptional = currentQuestion.type === "textarea" || currentQuestion.id === 4
    const currentAnswer = answers[currentQuestion.id]
    
    if (!currentAnswer && !isOptional) return
    
    if (currentQuestion.id === 2 && currentAnswer && !validateEmail(currentAnswer)) {
      setValidationError("Please enter a valid email address before continuing")
      return
    }
    
    if (currentQuestion.id === 4 && currentAnswer && !validatePhone(currentAnswer)) {
      setValidationError("Please enter a valid UK phone number or skip this field")
      return
    }

    setIsAnimating(true)
    setTimeout(() => {
      if (currentStep === contactInfoQuestions - 1) {
        setIsContactInfoPhase(false)
      }
      
      if (currentStep < totalQuestions - 1) {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
      } else {
        calculateAndRedirectToResults()
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        const prevIndex = currentStep - 1
        if (prevIndex < contactInfoQuestions) {
          setIsContactInfoPhase(true)
        }
        setCurrentStep(prevIndex)
        setIsAnimating(false)
      }, 300)
    }
  }

  const calculateAndRedirectToResults = async () => {
    try {
      let score = 0
      let maxScore = 0

      // Questions 5-10 are assessment questions
      for (let i = 5; i <= 10; i++) {
        const answer = answers[i]
        const question = questions.find(q => q.id === i)
        
        if (question && question.options) {
          const selectedOption = question.options.find(opt => opt.value === answer)
          
          maxScore += 10
          
          if (selectedOption?.isCorrect) {
            score += 10
          } else if (selectedOption?.isGap || answer === "not_sure") {
            score += 0
          } else if (answer === "partial") {
            score += 5
          } else {
            score += 3
          }
        }
      }

      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

      try {
        localStorage.setItem("epr_assessment_score", percentage.toString())
        localStorage.setItem("epr_assessment_complete", "true")
      } catch (storageError) {
        console.error("Failed to save results:", storageError)
      }

      router.push("/quiz/epr/results")
    } catch (error) {
      console.error("Error calculating results:", error)
      setValidationError("An error occurred. Please try again.")
    }
  }

  const getSectionIcon = () => {
    const Icon = currentQuestion.icon
    return <Icon className="w-6 h-6 text-blue-600" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/quiz">
                <Button
                  size="sm"
                  className="poppins-medium bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50"
                >
                  ← All Quizzes
                </Button>
              </Link>
              <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50/80 rounded-full border border-blue-100">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm poppins-medium text-blue-700">
                  {isContactInfoPhase 
                    ? `${currentStep + 1}/${contactInfoQuestions}` 
                    : `Q${currentStep - contactInfoQuestions + 1}/${assessmentQuestions}`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-[61px] sm:top-[73px] left-0 right-0 z-40">
        <div className="w-full h-2 bg-blue-100/50 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-blue-200/60 shadow-lg">
              {getSectionIcon()}
              <span className="ml-3 poppins-semibold text-sm text-blue-800 tracking-wide">
                {currentQuestion.section}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-12 border border-blue-100/50 shadow-[0_8px_32px_rgba(59,130,246,0.08)]">
              <div className="relative z-10">
                <h1 className="poppins-bold text-4xl text-blue-900 mb-4 leading-tight">
                  {currentQuestion.question}
                </h1>

                {currentQuestion.subtitle && (
                  <p className="poppins-regular text-lg text-blue-700 mb-8 leading-relaxed">
                    {currentQuestion.subtitle}
                  </p>
                )}
                
                {validationError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up">
                    <p className="text-sm text-red-800 poppins-medium flex items-center">
                      <XCircle className="w-4 h-4 mr-2" />
                      {validationError}
                    </p>
                  </div>
                )}

                {/* Answer Input */}
                <div className="mt-8 space-y-4">
                  {currentQuestion.type === "text" && (
                    <Input
                      type={currentQuestion.id === 2 ? "email" : currentQuestion.id === 4 ? "tel" : "text"}
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      onBlur={(e) => handleInputBlur(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full px-6 py-4 text-lg border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 poppins-regular"
                    />
                  )}

                  {currentQuestion.type === "radio" && currentQuestion.options && (
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = answers[currentQuestion.id] === option.value
                        const isCorrectAnswer = option.isCorrect && isSelected
                        const isGapAnswer = option.isGap && isSelected

                        return (
                          <button
                            key={index}
                            onClick={() => handleAnswer(option.value)}
                            className={`w-full text-left px-6 py-5 rounded-2xl border-2 transition-all duration-300 group ${
                              isSelected
                                ? isCorrectAnswer
                                  ? "border-green-400 bg-green-50/80 shadow-lg"
                                  : isGapAnswer
                                  ? "border-amber-400 bg-amber-50/80 shadow-lg"
                                  : "border-blue-500 bg-blue-50/80 shadow-lg"
                                : "border-blue-100 bg-white/50 hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                          >
                            <div className="flex items-start space-x-4">
                              <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                                  isSelected
                                    ? isCorrectAnswer
                                      ? "border-green-500 bg-green-500"
                                      : isGapAnswer
                                      ? "border-amber-500 bg-amber-500"
                                      : "border-blue-500 bg-blue-500"
                                    : "border-blue-300 bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-white animate-scale-in"></div>
                                )}
                              </div>

                              <span
                                className={`poppins-medium text-base flex-1 ${
                                  isSelected
                                    ? isCorrectAnswer
                                      ? "text-green-900"
                                      : isGapAnswer
                                      ? "text-amber-900"
                                      : "text-blue-900"
                                    : "text-blue-800"
                                }`}
                              >
                                {option.label}
                              </span>

                              {isSelected && showFeedback && (
                                <div className="flex-shrink-0 animate-scale-in">
                                  {isCorrectAnswer && <CheckCircle className="w-6 h-6 text-green-600" />}
                                  {isGapAnswer && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Why This Matters */}
                {currentQuestion.id !== 4 && (
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100/50">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 poppins-semibold text-sm">?</span>
                      </div>
                      <div>
                        <h3 className="poppins-semibold text-blue-900 mb-1">Why this matters</h3>
                        <p className="poppins-regular text-sm text-blue-800 leading-relaxed">
                          {currentQuestion.whyMatters}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback Messages */}
                {showFeedback && answers[currentQuestion.id] && (
                  <div
                    className={`mt-6 p-4 rounded-xl animate-fade-in-up ${
                      feedbackType === "correct"
                        ? "bg-green-50 border border-green-200"
                        : feedbackType === "gap"
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-blue-50 border border-blue-200"
                    }`}
                  >
                    <p
                      className={`poppins-medium text-sm ${
                        feedbackType === "correct"
                          ? "text-green-800"
                          : feedbackType === "gap"
                          ? "text-amber-800"
                          : "text-blue-800"
                      }`}
                    >
                      {feedbackType === "correct" && "✓ You're doing this right!"}
                      {feedbackType === "gap" && "⚠️ We'll help you fix this"}
                      {feedbackType === "neutral" && "✓ Got it"}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-10 flex items-center justify-between gap-4">
                  <Button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`poppins-semibold px-8 py-6 rounded-2xl transition-all duration-300 ${
                      currentStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border-2 border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id] && currentQuestion.type !== "textarea" && currentQuestion.id !== 4}
                    className={`poppins-semibold px-10 py-6 rounded-2xl transition-all duration-300 relative overflow-hidden group flex-1 ${
                      !answers[currentQuestion.id] && currentQuestion.type !== "textarea" && currentQuestion.id !== 4
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {currentQuestion.id === 4 && !answers[currentQuestion.id] 
                        ? "Skip" 
                        : currentStep === totalQuestions - 1 
                        ? "See Results" 
                        : "Next"}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>

                {/* Trust Signal */}
                {currentStep === 0 && (
                  <div className="mt-8 pt-6 border-t border-blue-100">
                    <div className="flex items-center justify-center space-x-2 text-blue-600">
                      <Shield className="w-4 h-4" />
                      <span className="poppins-medium text-sm">
                        🔒 Your information is confidential and never shared
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EPRQuizPage() {
  return (
    <ErrorBoundary>
      <EPRQuizContent />
    </ErrorBoundary>
  )
}
