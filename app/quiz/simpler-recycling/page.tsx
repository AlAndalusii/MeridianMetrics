"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  Users,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Building,
  Clock,
  FileCheck,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import ErrorBoundary from "@/components/ErrorBoundary"

interface Question {
  id: number
  section: string
  icon: any
  question: string
  subtitle?: string
  type: "text" | "radio"
  options?: { label: string; value: string; isCorrect?: boolean; isGap?: boolean }[]
  whyMatters: string
  placeholder?: string
}

const questions: Question[] = [
  // PART 1: Contact Information (4 questions)
  {
    id: 1,
    section: "Contact Information",
    icon: BadgeCheck,
    question: "What's your name?",
    subtitle: "Let's start with the basics",
    type: "text",
    whyMatters: "We'll personalise your Simpler Recycling compliance report with your name",
    placeholder: "First and Last Name",
  },
  {
    id: 2,
    section: "Contact Information",
    icon: BadgeCheck,
    question: "What's your work email?",
    subtitle: "We'll send your detailed report here",
    type: "text",
    whyMatters: "Required to see your results and recommendations",
    placeholder: "your.email@company.com",
  },
  {
    id: 3,
    section: "Contact Information",
    icon: BadgeCheck,
    question: "What's your company name?",
    type: "text",
    whyMatters: "Helps us understand your business context",
    placeholder: "Your Company Ltd",
  },
  {
    id: 4,
    section: "Contact Information",
    icon: BadgeCheck,
    question: "Phone number (optional)",
    subtitle: "We will not call you unless you explicitly request a call",
    type: "text",
    whyMatters: "Optional - skip if you prefer email contact only",
    placeholder: "+44 7XXX XXXXXX (you can skip this)",
  },
  
  // PART 2: Simpler Recycling Compliance (6 questions)
  {
    id: 5,
    section: "Employee Count",
    icon: Users,
    question: "How many employees does your business have?",
    subtitle: "Count full-time equivalent across ALL your locations",
    type: "radio",
    options: [
      { label: "Under 10 employees (exempt until March 2027)", value: "under_10", isCorrect: true },
      { label: "10-50 employees (must comply by March 2025)", value: "10_50" },
      { label: "50+ employees (must comply by March 2025)", value: "50_plus" },
      { label: "Not sure - need to count properly", value: "not_sure", isGap: true },
    ],
    whyMatters: "Businesses with 10+ employees must comply NOW. Under 10 employees (micro-firms) have until March 2027.",
  },
  {
    id: 6,
    section: "Current Setup",
    icon: Trash2,
    question: "How many separate waste bins do you currently have?",
    subtitle: "Think about bins in offices, kitchens, and customer areas",
    type: "radio",
    options: [
      { label: "One bin - everything mixed together", value: "one", isGap: true },
      { label: "Two bins - general waste and recycling", value: "two", isGap: true },
      { label: "Three or more - separated by material type", value: "three_plus", isCorrect: true },
      { label: "Not sure / varies by location", value: "not_sure", isGap: true },
    ],
    whyMatters: "You MUST have at least 3 separate bins: dry recyclables, food waste, and general waste. If you only have 1-2 bins, you're not compliant.",
  },
  {
    id: 7,
    section: "Food Waste",
    icon: Trash2,
    question: "Do you separate food waste from other rubbish?",
    subtitle: "Even coffee grounds and fruit peels count as food waste",
    type: "radio",
    options: [
      { label: "Yes - we have dedicated food waste bins", value: "yes", isCorrect: true },
      { label: "No - food goes in general waste", value: "no", isGap: true },
      { label: "We don't produce food waste at all", value: "no_food", isCorrect: true },
      { label: "Only in some locations, not everywhere", value: "partial", isGap: true },
    ],
    whyMatters: "Food waste separation is THE most commonly missed requirement. If staff eat lunch at your workplace, you need separate food waste collection.",
  },
  {
    id: 8,
    section: "Waste Collection",
    icon: FileCheck,
    question: "Does your waste contractor collect recyclables and food waste separately?",
    subtitle: "Each waste stream should be collected in separate trucks or compartments",
    type: "radio",
    options: [
      { label: "Yes - they collect each stream separately", value: "yes", isCorrect: true },
      { label: "No - they collect everything mixed together", value: "no", isGap: true },
      { label: "They collect recyclables but not food waste", value: "partial", isGap: true },
      { label: "I don't know what our contractor does", value: "not_sure", isGap: true },
    ],
    whyMatters: "You can only comply if your contractor offers separate collections. 'My contractor doesn't offer it' is NOT a legal defence.",
  },
  {
    id: 9,
    section: "Deadline Awareness",
    icon: Clock,
    question: "When did Simpler Recycling become mandatory for businesses with 10+ employees?",
    type: "radio",
    options: [
      { label: "31 March 2025 (correct)", value: "march_2025", isCorrect: true },
      { label: "1 January 2025", value: "jan_2025" },
      { label: "31 March 2026", value: "march_2026" },
      { label: "I didn't know there was a deadline", value: "no_idea", isGap: true },
    ],
    whyMatters: "The deadline was 31 March 2025. If you're not compliant NOW and have 10+ employees, you're breaking the law.",
  },
  {
    id: 10,
    section: "Compliance Readiness",
    icon: CheckCircle,
    question: "If an Environment Agency inspector arrived today, could you prove compliance?",
    subtitle: "Labeled bins, waste collection records, and staff awareness",
    type: "radio",
    options: [
      { label: "Yes - we have labeled bins and collection records", value: "yes", isCorrect: true },
      { label: "Probably - but not sure what proof they need", value: "maybe" },
      { label: "No - we don't have the right setup yet", value: "no", isGap: true },
      { label: "I didn't know we could be inspected", value: "unaware", isGap: true },
    ],
    whyMatters: "The Environment Agency can inspect ANY workplace. They look for separate labeled bins, collection records, and staff awareness. Non-compliance = fines.",
  },
]

function SimplerRecyclingQuizContent() {
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
      let savedSessionId = localStorage.getItem("simpler_recycling_session_id")
      if (!savedSessionId) {
        savedSessionId = `sr_session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("simpler_recycling_session_id", savedSessionId)
      }
      setSessionId(savedSessionId)

      const savedAnswers = localStorage.getItem("simpler_recycling_assessment_answers")
      const savedStep = localStorage.getItem("simpler_recycling_assessment_step")
      
      if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
      if (savedStep && parseInt(savedStep) > 0) setCurrentStep(parseInt(savedStep))
    } catch (error) {
      console.error("Failed to load saved progress:", error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("simpler_recycling_assessment_answers", JSON.stringify(answers))
      localStorage.setItem("simpler_recycling_assessment_step", currentStep.toString())
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
    
    const isOptional = currentQuestion.id === 4
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
          } else if (answer === "partial" || answer === "maybe") {
            score += 5
          } else {
            score += 3
          }
        }
      }

      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

      try {
        localStorage.setItem("simpler_recycling_assessment_score", percentage.toString())
        localStorage.setItem("simpler_recycling_assessment_complete", "true")
      } catch (storageError) {
        console.error("Failed to save results:", storageError)
      }

      router.push("/quiz/simpler-recycling/results")
    } catch (error) {
      console.error("Error calculating results:", error)
      setValidationError("An error occurred. Please try again.")
    }
  }

  const getSectionIcon = () => {
    const Icon = currentQuestion.icon
    return <Icon className="w-6 h-6 text-green-600" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/quiz">
                <Button
                  size="sm"
                  className="poppins-medium bg-white border-2 border-green-200 text-green-700 hover:border-green-400 hover:bg-green-50"
                >
                  ← All Quizzes
                </Button>
              </Link>
              <div className="flex items-center space-x-2 px-4 py-2 bg-green-50/80 rounded-full border border-green-100">
                <BadgeCheck className="w-4 h-4 text-green-600" />
                <span className="text-sm poppins-medium text-green-700">
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
        <div className="w-full h-2 bg-green-100/50 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-28 pb-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/80 backdrop-blur-xl border border-green-200/60 shadow-lg">
              {getSectionIcon()}
              <span className="ml-3 poppins-semibold text-sm text-green-800 tracking-wide">
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
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-12 border border-green-100/50 shadow-[0_8px_32px_rgba(34,197,94,0.08)]">
              <div className="relative z-10">
                <h1 className="poppins-bold text-4xl text-green-900 mb-4 leading-tight">
                  {currentQuestion.question}
                </h1>

                {currentQuestion.subtitle && (
                  <p className="poppins-regular text-lg text-green-700 mb-8 leading-relaxed">
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
                      className="w-full px-6 py-4 text-lg border-2 border-green-200 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 poppins-regular"
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
                                  : "border-green-500 bg-green-50/80 shadow-lg"
                                : "border-green-100 bg-white/50 hover:border-green-300 hover:bg-green-50/50"
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
                                      : "border-green-500 bg-green-500"
                                    : "border-green-300 bg-white"
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
                                      : "text-green-900"
                                    : "text-green-800"
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
                  <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-green-50/80 to-emerald-50/50 border border-green-100/50">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 poppins-semibold text-sm">?</span>
                      </div>
                      <div>
                        <h3 className="poppins-semibold text-green-900 mb-1">Why this matters</h3>
                        <p className="poppins-regular text-sm text-green-800 leading-relaxed">
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
                        : "bg-green-50 border border-green-200"
                    }`}
                  >
                    <p
                      className={`poppins-medium text-sm ${
                        feedbackType === "correct"
                          ? "text-green-800"
                          : feedbackType === "gap"
                          ? "text-amber-800"
                          : "text-green-800"
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
                        : "bg-white border-2 border-green-200 text-green-700 hover:border-green-400 hover:bg-green-50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={!answers[currentQuestion.id] && currentQuestion.id !== 4}
                    className={`poppins-semibold px-10 py-6 rounded-2xl transition-all duration-300 relative overflow-hidden group flex-1 ${
                      !answers[currentQuestion.id] && currentQuestion.id !== 4
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-xl hover:shadow-green-500/30 hover:scale-105"
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
                  <div className="mt-8 pt-6 border-t border-green-100">
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <BadgeCheck className="w-4 h-4" />
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

export default function SimplerRecyclingQuizPage() {
  return (
    <ErrorBoundary>
      <SimplerRecyclingQuizContent />
    </ErrorBoundary>
  )
}
