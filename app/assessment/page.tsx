"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  TrendingUp,
  Globe,
  Package,
  Scale,
  RefreshCw,
  Target,
  Sparkles,
  XCircle,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"

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
  examples?: string[]
}

const questions: Question[] = [
  // PART 1: Contact Information
  {
    id: 1,
    section: "Contact Information",
    icon: Shield,
    question: "What's your name?",
    subtitle: "Let's start with the basics",
    type: "text",
    whyMatters: "We'll personalise your compliance report with your name",
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
    subtitle: "We will not call you unless you explicitly request a call. This is purely for your convenience.",
    type: "text",
    whyMatters: "Optional - skip if you prefer email contact only",
    placeholder: "+44 7XXX XXXXXX (you can skip this)",
  },
  
  // PART 2: Compliance Best Practices
  {
    id: 5,
    section: "Certificate Compliance",
    icon: FileCheck,
    question: "Do you have certificates for ALL packaging where you claim recycled content?",
    type: "radio",
    options: [
      { label: "Yes - we have certificates for everything we claim", value: "yes", isCorrect: true },
      { label: "No - we're missing certificates for some products", value: "no", isGap: true },
      { label: "Not sure - we need to check what we have", value: "not_sure", isGap: true },
      { label: "We don't claim any recycled content exemptions", value: "no_exemptions" },
    ],
    whyMatters: "HMRC requires 'sufficient supporting evidence' for all recycled content exemption claims",
  },
  {
    id: 6,
    section: "Certificate Compliance",
    icon: FileCheck,
    question: "Do your certificates show the EXACT recycled percentage?",
    subtitle: "Example: '32% post-consumer recycled PET' (specific ✓) Not: 'Contains recycled materials' (too vague ✗)\n\nHMRC Formula: Recycled % = (recycled plastic weight ÷ total plastic weight) × 100",
    type: "radio",
    options: [
      { label: 'Yes - all certificates show exact percentages like "30% recycled"', value: "yes", isCorrect: true },
      { label: 'No - most just say "eco-friendly" or "contains recycled content"', value: "no", isGap: true },
      { label: "Not sure - we haven't checked the wording", value: "not_sure", isGap: true },
      { label: "We don't have any certificates yet", value: "no_certificates", isGap: true },
    ],
    whyMatters: "Must show 'proportion of recycled plastic' - vague wording invalidates 30%+ exemption",
  },
  {
    id: 7,
    section: "Certificate Compliance",
    icon: Clock,
    question: "Are your certificates current (issued within last 12 months)?",
    type: "radio",
    options: [
      { label: "Yes - all certificates are less than 12 months old", value: "yes", isCorrect: true },
      { label: "No - some are older than 12 months", value: "no", isGap: true },
      { label: "Not sure - we haven't checked the dates", value: "not_sure", isGap: true },
      { label: "We don't have certificates to check", value: "no_certificates", isGap: true },
    ],
    whyMatters: "Records must show 'which dates evidence relates to' - outdated certs fail audits",
  },
  {
    id: 8,
    section: "Documentation Organization",
    icon: Database,
    question: "Can you access all your PPT documents within 10 minutes?",
    subtitle: "If HMRC rang right now requesting certificates, weight records, and past returns, could you locate everything quickly?",
    type: "radio",
    options: [
      { label: "Yes - everything is organised in one place", value: "yes", isCorrect: true },
      { label: "Probably - might take 20-30 minutes to gather everything", value: "maybe" },
      { label: "No - we'd need a few hours or days to collect it all", value: "no", isGap: true },
      { label: "Honestly not sure where everything is right now", value: "not_sure", isGap: true },
    ],
    whyMatters: "Must keep records 'for 6 years' in writing or digitally - accessible on demand",
  },
  {
    id: 9,
    section: "Tax Point Knowledge",
    icon: Calculator,
    question: "Do you know when your packaging becomes taxable?",
    subtitle: "Plastic packaging is taxable when...",
    type: "radio",
    options: [
      { label: "Manufacturing completes", value: "manufacturing", isCorrect: true },
      { label: "You fill it with your product", value: "filling", isGap: true },
      { label: "You sell it to customers", value: "selling", isGap: true },
      { label: "Not sure / Need to check", value: "not_sure", isGap: true },
    ],
    whyMatters: "Tax due when component 'finished or imported' - not at filling or sale point",
  },
  {
    id: 10,
    section: "Supplier Management",
    icon: RefreshCw,
    question: "When you change suppliers, do you obtain new certificates?",
    subtitle: "Example: You switched from Supplier A to Supplier B for same bottles",
    type: "radio",
    options: [
      { label: "Yes - we always request new certificates when suppliers change", value: "yes", isCorrect: true },
      { label: "No - we keep using the old supplier's certificates", value: "no", isGap: true },
      { label: "Not sure - this hasn't come up yet", value: "not_sure" },
      { label: "We've never changed packaging suppliers", value: "never_changed" },
    ],
    whyMatters: "If 'specifications or materials change' must keep separate evidence for each",
  },
  {
    id: 11,
    section: "Weight Methodology",
    icon: Scale,
    question: "Do you have a written process for weighing packaging?",
    type: "radio",
    options: [
      { label: "Yes - we have documented methodology for how we measure weights", value: "yes", isCorrect: true },
      { label: "No - we estimate weights or use supplier data", value: "no", isGap: true },
      { label: "We use scales but haven't written down the process", value: "scales_only" },
      { label: "Not sure what this requirement means", value: "not_sure", isGap: true },
    ],
    whyMatters: "Must 'record weight in tonnes, kilograms and grams' with written methodology",
  },
  {
    id: 12,
    section: "Filing Compliance",
    icon: CheckCircle,
    question: "Have you submitted all quarterly PPT returns on time?",
    type: "radio",
    options: [
      { label: "Yes - we've submitted every quarterly return by the deadline", value: "yes", isCorrect: true },
      { label: "No - we've missed some deadlines or submitted late", value: "no", isGap: true },
      { label: "We've submitted but aren't sure if they were accurate", value: "unsure" },
      { label: "We haven't started submitting yet / Just registered", value: "not_started", isGap: true },
    ],
    whyMatters: "Accounts must show 'how you've worked out each entry on quarterly tax return'",
  },
  {
    id: 13,
    section: "Export Documentation",
    icon: Globe,
    question: "If you export products, do you have proof BEFORE manufacturing?",
    subtitle: "To defer tax on exports, you need documented export intent BEFORE you make the packaging",
    type: "radio",
    options: [
      { label: "Yes - we document export orders before manufacturing", value: "yes", isCorrect: true },
      { label: "No - we haven't been tracking this", value: "no", isGap: true },
      { label: "We don't export packaged goods", value: "no_export" },
      { label: "Not sure what proof HMRC needs", value: "not_sure", isGap: true },
    ],
    whyMatters: "Records must be 'dated at or before time of production/import' to defer tax",
  },
  {
    id: 14,
    section: "Nation Data Tracking",
    icon: Globe,
    question: "Do you track where in the UK your packaging goes?",
    subtitle: "Nation data: England vs Scotland vs Wales vs Northern Ireland",
    type: "radio",
    options: [
      { label: "Yes - we track which UK nation receives our packaging", value: "yes", isCorrect: true },
      { label: "No - we don't separate this in our records", value: "no", isGap: true },
      { label: "Not sure - don't know this is required", value: "not_sure", isGap: true },
      { label: "We only supply to one UK nation", value: "one_nation" },
    ],
    whyMatters: "Must keep 'breakdown of weight' by product line - nation tracking mandatory",
  },
  
  // PART 3: Strategic Questions
  {
    id: 15,
    section: "Business Scale",
    icon: Package,
    question: "How much plastic packaging does your business use annually?",
    type: "radio",
    options: [
      { label: "Under 10 tonnes (below PPT threshold - you may not need to register)", value: "under_10" },
      { label: "10-50 tonnes (small producer - reporting only)", value: "10_50" },
      { label: "50-200 tonnes (medium producer - need strong systems)", value: "50_200" },
      { label: "200+ tonnes (large producer - complex compliance requirements)", value: "200_plus" },
      { label: "Not sure - we haven't calculated this yet", value: "not_sure" },
    ],
    whyMatters: "Determines record-keeping requirements - 10T+ must register for PPT",
  },
  {
    id: 16,
    section: "Your Goals",
    icon: Target,
    question: "What's your primary goal for PPT compliance over the next 90 days?",
    subtitle: "Select the most important outcome you want to achieve",
    type: "radio",
    options: [
      { label: "Fix documentation gaps before an HMRC audit occurs", value: "fix_gaps" },
      { label: "Organise records so quarterly filing takes 30 minutes not 8 hours", value: "organize" },
      { label: "Set up a monitoring system to stay compliant automatically", value: "monitor" },
      { label: "Reduce time our team spends on PPT admin", value: "reduce_time" },
      { label: "Train internal team to handle this properly", value: "train" },
    ],
    whyMatters: "This tells us which service you need most",
  },
  {
    id: 17,
    section: "Your Challenges",
    icon: AlertTriangle,
    question: "What's the biggest obstacle preventing you from getting PPT sorted?",
    type: "radio",
    options: [
      { label: "Don't fully understand what HMRC requires", value: "understanding" },
      { label: "Don't have time to organise documentation properly", value: "time" },
      { label: "Suppliers won't provide proper certificates", value: "suppliers" },
      { label: "Not sure if our current system would pass HMRC audit", value: "uncertain" },
      { label: "We've had compliance issues flagged already", value: "flagged" },
    ],
    whyMatters: "This reveals your main pain point",
  },
  {
    id: 18,
    section: "Your Preferences",
    icon: TrendingUp,
    question: "How would you prefer to fix your PPT compliance?",
    type: "radio",
    options: [
      { label: "DIY Guide - teach me how to do it myself (£100-200 budget)", value: "diy" },
      { label: "Expert Audit - tell me exactly what's wrong and how to fix it (£300-500 budget)", value: "audit" },
      { label: "Done-With-You - audit plus help implementing fixes (£500-1,000 budget)", value: "done_with" },
      { label: "Done-For-You - ongoing service that keeps me compliant (£100-150/month budget)", value: "done_for" },
      { label: "Not sure yet - just want to know where I stand first", value: "not_sure" },
    ],
    whyMatters: "This indicates your budget range and service preference",
  },
  {
    id: 19,
    section: "Additional Information",
    icon: FileCheck,
    question: "Anything else we should know about your PPT situation?",
    subtitle: "Optional - but often the most valuable information",
    type: "textarea",
    whyMatters: "Many people share critical details here that help us give better recommendations",
    placeholder: "Examples of helpful information:\n\n• 'We have an HMRC enquiry pending'\n• 'Just changed suppliers last month'\n• 'Accountant said our documentation is weak'\n• 'Need this sorted before year-end'\n\nAny details that might help us understand your situation better...",
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"correct" | "gap" | "neutral">("neutral")
  const [isContactInfoPhase, setIsContactInfoPhase] = useState(true)
  const [validationError, setValidationError] = useState<string>("")
  const [storageError, setStorageError] = useState(false)

  const currentQuestion = questions[currentStep]
  const totalQuestions = questions.length
  const contactInfoQuestions = 4 // First 4 questions are contact info
  const assessmentQuestions = totalQuestions - contactInfoQuestions
  
  // Calculate progress based on current phase
  const progress = isContactInfoPhase 
    ? ((currentStep + 1) / contactInfoQuestions) * 100
    : ((currentStep - contactInfoQuestions + 1) / assessmentQuestions) * 100

  // Auto-save to localStorage with error handling
  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem("ppt_assessment_answers")
      const savedStep = localStorage.getItem("ppt_assessment_step")
      
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers))
      }
      if (savedStep && parseInt(savedStep) > 0) {
        setCurrentStep(parseInt(savedStep))
      }
    } catch (error) {
      console.error("Failed to load saved progress:", error)
      setStorageError(true)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("ppt_assessment_answers", JSON.stringify(answers))
      localStorage.setItem("ppt_assessment_step", currentStep.toString())
      setStorageError(false)
    } catch (error) {
      console.error("Failed to save progress:", error)
      setStorageError(true)
    }
  }, [answers, currentStep])

  // Email validation helper
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Phone validation helper (optional UK format)
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true // Phone is optional
    // More flexible UK phone validation - allows spaces, dashes, parentheses
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
    const phoneRegex = /^(\+44|0)[0-9]{9,10}$/
    return phoneRegex.test(cleanPhone)
  }

  const handleAnswer = (value: string) => {
    // Clear validation error when user starts typing
    setValidationError("")
    
    // Always set the answer first - don't block input
    setAnswers({ ...answers, [currentQuestion.id]: value })
    
    // Show feedback animation
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
    } else {
      setShowFeedback(false)
    }

    setTimeout(() => setShowFeedback(false), 2000)
  }

  const handleInputBlur = (value: string) => {
    // Only validate on blur (when user finishes typing and moves away)
    if (currentQuestion.id === 2 && value) {
      if (!validateEmail(value)) {
        setValidationError("Please enter a valid email address")
      }
    }
    
    if (currentQuestion.id === 4 && value) {
      if (!validatePhone(value)) {
        setValidationError("Please enter a valid UK phone number (e.g., +44 7XXX XXXXXX or 07XXX XXXXXX)")
      }
    }
  }

  const handleNext = () => {
    setValidationError("")
    
    // Allow skipping phone number (question 4) and textarea questions (question 19)
    const isOptional = currentQuestion.type === "textarea" || currentQuestion.id === 4
    const currentAnswer = answers[currentQuestion.id]
    
    if (!currentAnswer && !isOptional) return
    
    // Validate email before proceeding
    if (currentQuestion.id === 2 && currentAnswer) {
      if (!validateEmail(currentAnswer)) {
        setValidationError("Please enter a valid email address before continuing")
        return
      }
    }
    
    // Validate phone before proceeding (if provided)
    if (currentQuestion.id === 4 && currentAnswer) {
      if (!validatePhone(currentAnswer)) {
        setValidationError("Please enter a valid UK phone number or skip this field")
        return
      }
    }

    setIsAnimating(true)
    setTimeout(() => {
      // Check if moving from contact info to assessment phase
      if (currentStep === contactInfoQuestions - 1) {
        setIsContactInfoPhase(false)
      }
      
      if (currentStep < totalQuestions - 1) {
        // Check for conditional logic
        if (shouldSkipQuestion(currentStep + 1)) {
          setCurrentStep(getNextQuestionIndex(currentStep + 1))
        } else {
          setCurrentStep(currentStep + 1)
        }
        setIsAnimating(false)
      } else {
        // Final question - go to results
        calculateAndRedirectToResults()
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setIsAnimating(true)
      setTimeout(() => {
        // Check if moving back to contact info phase
        if (currentStep === contactInfoQuestions) {
          setIsContactInfoPhase(true)
        }
        setCurrentStep(currentStep - 1)
        setIsAnimating(false)
      }, 300)
    }
  }

  const shouldSkipQuestion = (questionIndex: number): boolean => {
    const question = questions[questionIndex]
    
    // Skip Q6 and Q7 if they answered "We don't claim exemptions" on Q5
    if ((question.id === 6 || question.id === 7) && answers[5] === "no_exemptions") {
      return true
    }
    
    // Skip Q13 if they don't export
    if (question.id === 13 && answers[13] === "no_export") {
      return true
    }
    
    return false
  }

  const getNextQuestionIndex = (startIndex: number): number => {
    for (let i = startIndex; i < questions.length; i++) {
      if (!shouldSkipQuestion(i)) {
        return i
      }
    }
    return startIndex
  }

  const calculateAndRedirectToResults = () => {
    try {
      // Calculate compliance score
      let score = 0
      let maxScore = 0

      // Questions 5-14 are compliance questions (10 points each)
      for (let i = 5; i <= 14; i++) {
        const answer = answers[i]
        const question = questions.find(q => q.id === i)
        
        if (question && question.options) {
          const selectedOption = question.options.find(opt => opt.value === answer)
          
          // Skip if question was skipped
          if (answer === "no_exemptions" && (i === 5 || i === 6 || i === 7)) {
            continue
          }
          if (answer === "no_export" && i === 13) {
            continue
          }
          if (answer === "one_nation" && i === 14) {
            score += 10
            maxScore += 10
            continue
          }
          if (answer === "never_changed" && i === 10) {
            score += 10
            maxScore += 10
            continue
          }
          
          maxScore += 10
          
          if (selectedOption?.isCorrect) {
            score += 10
          } else if (selectedOption?.isGap) {
            score += 0
          } else if (answer === "scales_only" && i === 11) {
            score += 5
          } else if (answer === "unsure" && i === 12) {
            score += 5
          } else if (answer === "maybe" && i === 8) {
            score += 6
          } else {
            score += 3
          }
        }
      }

      // Calculate percentage
      const percentage = Math.round((score / maxScore) * 100)

      // Save results with error handling
      try {
        localStorage.setItem("ppt_assessment_score", percentage.toString())
        localStorage.setItem("ppt_assessment_complete", "true")
      } catch (storageError) {
        console.error("Failed to save results:", storageError)
        // Continue anyway - results page will handle missing data
      }

      // Redirect to results
      router.push("/assessment/results")
    } catch (error) {
      console.error("Error calculating results:", error)
      setValidationError("An error occurred. Please try again.")
    }
  }

  const getSectionIcon = () => {
    const Icon = currentQuestion.icon
    return <Icon className="w-6 h-6 text-emerald-600" />
  }

  const getSectionProgress = () => {
    const sections = ["Contact Information", "Certificate Compliance", "Documentation Organization", "Tax Point Knowledge", 
      "Supplier Management", "Weight Methodology", "Filing Compliance", "Export Documentation", "Nation Data Tracking",
      "Business Scale", "Your Goals", "Your Challenges", "Your Preferences", "Additional Information"]
    const uniqueSections = Array.from(new Set(questions.map(q => q.section)))
    const currentSectionIndex = uniqueSections.indexOf(currentQuestion.section)
    return {
      current: currentSectionIndex + 1,
      total: uniqueSections.length,
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-green-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <MillstoneLogo size="sm" variant="modern" />
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-emerald-50/80 rounded-full border border-emerald-100">
                <Shield className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-600" />
                <span className="text-[10px] sm:text-sm poppins-medium text-emerald-700">
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
        <div className="w-full h-1.5 sm:h-2 bg-emerald-100/50 backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Badge */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex items-center px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-xl border border-emerald-200/60 shadow-lg max-w-full">
              {getSectionIcon()}
              <span className="ml-2 sm:ml-3 poppins-semibold text-xs sm:text-sm text-emerald-800 tracking-wide truncate max-w-[120px] sm:max-w-none">
                {currentQuestion.section}
              </span>
              <div className="ml-2 sm:ml-3 md:ml-4 w-px h-4 sm:h-5 bg-emerald-200"></div>
              <span className="ml-2 sm:ml-3 md:ml-4 poppins-medium text-[10px] sm:text-xs text-emerald-600 whitespace-nowrap">
                {getSectionProgress().current}/{getSectionProgress().total}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`transition-all duration-300 ${
              isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-5 sm:p-8 md:p-10 lg:p-12 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/30 to-emerald-50/0 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                {/* Storage Error Warning */}
                {storageError && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl">
                    <p className="text-xs sm:text-sm text-amber-800 poppins-medium">
                      ⚠️ Unable to save progress. Your answers won't be saved if you leave this page.
                    </p>
                  </div>
                )}
                
                {/* Question */}
                <h1 className="poppins-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-emerald-900 mb-3 sm:mb-4 leading-tight">
                  {currentQuestion.question}
                </h1>

                {currentQuestion.subtitle && (
                  <p className="poppins-regular text-sm sm:text-base md:text-lg text-emerald-700 mb-6 sm:mb-8 leading-relaxed whitespace-pre-line">
                    {currentQuestion.subtitle}
                  </p>
                )}
                
                {/* Validation Error */}
                {validationError && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl animate-fade-in-up">
                    <p className="text-xs sm:text-sm text-red-800 poppins-medium flex items-center">
                      <XCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      {validationError}
                    </p>
                  </div>
                )}

                {/* Answer Input */}
                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 relative z-10">
                  {currentQuestion.type === "text" && (
                    <Input
                      type={currentQuestion.id === 2 ? "email" : currentQuestion.id === 4 ? "tel" : "text"}
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      onBlur={(e) => handleInputBlur(e.target.value)}
                      onClick={() => {
                        // Ensure input is focusable and clickable
                        console.log('Input clicked for question:', currentQuestion.id)
                      }}
                      placeholder={currentQuestion.placeholder}
                      className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-base sm:text-lg border-2 border-emerald-200 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 poppins-regular min-h-[54px] focus:outline-none relative z-10 touch-manipulation"
                      autoComplete={currentQuestion.id === 2 ? "email" : currentQuestion.id === 4 ? "tel" : "name"}
                      inputMode={currentQuestion.id === 4 ? "tel" : currentQuestion.id === 2 ? "email" : "text"}
                      style={{ 
                        pointerEvents: 'auto',
                        WebkitAppearance: 'none',
                        MozAppearance: 'textfield',
                        touchAction: 'manipulation'
                      }}
                    />
                  )}

                  {currentQuestion.type === "textarea" && (
                    <Textarea
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleAnswer(e.target.value)}
                      onBlur={(e) => handleInputBlur(e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      rows={6}
                      className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base border-2 border-emerald-200 rounded-xl sm:rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 poppins-regular resize-none focus:outline-none touch-manipulation"
                      style={{ 
                        pointerEvents: 'auto',
                        WebkitAppearance: 'none',
                        touchAction: 'manipulation'
                      }}
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
                            className={`w-full text-left px-4 sm:px-5 md:px-6 py-4 sm:py-4.5 md:py-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 group relative overflow-hidden min-h-[66px] active:scale-98 touch-manipulation ${
                              isSelected
                                ? isCorrectAnswer
                                  ? "border-green-400 bg-green-50/80 shadow-lg shadow-green-500/20"
                                  : isGapAnswer
                                  ? "border-amber-400 bg-amber-50/80 shadow-lg shadow-amber-500/20"
                                  : "border-emerald-500 bg-emerald-50/80 shadow-lg shadow-emerald-500/20"
                                : "border-emerald-100 bg-white/50 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-md"
                            }`}
                            style={{ 
                              pointerEvents: 'auto',
                              touchAction: 'manipulation',
                              WebkitTapHighlightColor: 'transparent'
                            }}
                          >
                            {/* Shimmer effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>

                            <div className="flex items-start space-x-3 sm:space-x-4 relative z-10">
                              {/* Radio button */}
                              <div
                                className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all duration-300 ${
                                  isSelected
                                    ? isCorrectAnswer
                                      ? "border-green-500 bg-green-500"
                                      : isGapAnswer
                                      ? "border-amber-500 bg-amber-500"
                                      : "border-emerald-500 bg-emerald-500"
                                    : "border-emerald-300 bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-scale-in"></div>
                                )}
                              </div>

                              {/* Label */}
                              <span
                                className={`poppins-medium text-sm sm:text-base flex-1 transition-colors duration-300 leading-relaxed ${
                                  isSelected
                                    ? isCorrectAnswer
                                      ? "text-green-900"
                                      : isGapAnswer
                                      ? "text-amber-900"
                                      : "text-emerald-900"
                                    : "text-emerald-800 group-hover:text-emerald-900"
                                }`}
                              >
                                {option.label}
                              </span>

                              {/* Feedback icon */}
                              {isSelected && showFeedback && (
                                <div className="flex-shrink-0 animate-scale-in">
                                  {isCorrectAnswer && (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                  )}
                                  {isGapAnswer && (
                                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                                  )}
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Why This Matters - Hidden for phone number question */}
                {currentQuestion.id !== 4 && (
                  <div className="mt-6 sm:mt-8 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border border-blue-100/50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
                    <div className="relative flex items-start space-x-2.5 sm:space-x-3">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 poppins-semibold text-xs sm:text-sm">?</span>
                      </div>
                      <div>
                        <h3 className="poppins-semibold text-blue-900 mb-1 text-sm sm:text-base">Why this matters</h3>
                        <p className="poppins-regular text-xs sm:text-sm text-blue-800 leading-relaxed">
                          {currentQuestion.whyMatters}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Feedback Messages */}
                {showFeedback && answers[currentQuestion.id] && (
                  <div
                    className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl animate-fade-in-up ${
                      feedbackType === "correct"
                        ? "bg-green-50 border border-green-200"
                        : feedbackType === "gap"
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-emerald-50 border border-emerald-200"
                    }`}
                  >
                    <p
                      className={`poppins-medium text-xs sm:text-sm ${
                        feedbackType === "correct"
                          ? "text-green-800"
                          : feedbackType === "gap"
                          ? "text-amber-800"
                          : "text-emerald-800"
                      }`}
                    >
                      {feedbackType === "correct" && "✓ You're doing this right!"}
                      {feedbackType === "gap" && "⚠️ We'll help you fix this"}
                      {feedbackType === "neutral" && "✓ Got it"}
                    </p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 sm:mt-10 flex items-center justify-between gap-3 sm:gap-4">
                  <Button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`poppins-semibold px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 min-h-[54px] text-sm sm:text-base touch-manipulation ${
                      currentStep === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 shadow-md hover:shadow-lg active:scale-95"
                    }`}
                    style={{ 
                      pointerEvents: 'auto',
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2" />
                    <span className="hidden xs:inline">Back</span>
                  </Button>

                <Button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.id] && currentQuestion.type !== "textarea" && currentQuestion.id !== 4}
                  className={`poppins-semibold px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-xl sm:rounded-2xl transition-all duration-300 relative overflow-hidden group min-h-[54px] text-sm sm:text-base flex-1 sm:flex-initial touch-manipulation ${
                    !answers[currentQuestion.id] && currentQuestion.type !== "textarea" && currentQuestion.id !== 4
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:shadow-xl hover:shadow-emerald-500/30 sm:hover:scale-105 active:scale-95"
                  }`}
                  style={{ 
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  {(answers[currentQuestion.id] || currentQuestion.type === "textarea" || currentQuestion.id === 4) ? (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  ) : null}
                  <span className="relative z-10 flex items-center justify-center">
                    {currentQuestion.id === 4 && !answers[currentQuestion.id] 
                      ? "Skip" 
                      : currentStep === totalQuestions - 1 
                      ? "See Results" 
                      : "Next"}
                    <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
                </div>

                {/* Trust Signal */}
                {!isContactInfoPhase && currentStep === Math.floor(totalQuestions / 2) + contactInfoQuestions && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-emerald-100">
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <Clock className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span className="poppins-medium text-xs sm:text-sm text-center">
                        ⏱️ Almost done! Just {totalQuestions - currentStep - 1} more to go
                      </span>
                    </div>
                  </div>
                )}

                {currentStep === 0 && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-emerald-100">
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <Shield className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span className="poppins-medium text-xs sm:text-sm text-center">
                        🔒 Your information is confidential and never shared
                      </span>
                    </div>
                  </div>
                )}
                
                {currentStep === contactInfoQuestions - 1 && (
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-emerald-100">
                    <div className="flex items-center justify-center space-x-2 text-emerald-600">
                      <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 flex-shrink-0" />
                      <span className="poppins-medium text-xs sm:text-sm text-center">
                        ✨ Great! Now let's assess your compliance status
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

