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
  TrendingUp,
  Globe,
  Package,
  Scale,
  RefreshCw,
  Target,
  Sparkles,
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
  examples?: string[]
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
  
  // PART 2: Business Profile & Scheme Identification (4 questions)
  {
    id: 5,
    section: "Business Profile",
    icon: Package,
    question: "What's your approximate annual revenue?",
    subtitle: "Helps us understand your compliance obligations",
    type: "radio",
    options: [
      { label: "Under £500K (may be exempt from some schemes)", value: "under_500k" },
      { label: "£500K - £2M (EPR likely applies)", value: "500k_2m" },
      { label: "£2M - £10M (EPR + potential PPT obligations)", value: "2m_10m" },
      { label: "£10M+ (full multi-scheme compliance required)", value: "10m_plus" },
      { label: "Prefer not to say / Not sure", value: "not_sure" },
    ],
    whyMatters: "Revenue determines which UK packaging schemes apply to your business",
  },
  {
    id: 6,
    section: "Business Profile",
    icon: Building,
    question: "What sector are you in?",
    type: "radio",
    options: [
      { label: "Food & Drink (high packaging volume)", value: "food_drink" },
      { label: "E-commerce / Retail (shipping materials)", value: "ecommerce" },
      { label: "Manufacturing (product packaging)", value: "manufacturing" },
      { label: "Healthcare / Pharmaceuticals (regulated packaging)", value: "healthcare" },
      { label: "Other", value: "other" },
    ],
    whyMatters: "Different sectors have specific packaging compliance challenges",
  },
  {
    id: 7,
    section: "Packaging Volume",
    icon: Scale,
    question: "How much packaging do you handle annually across ALL materials?",
    subtitle: "Include plastic, paper, cardboard, glass, aluminium, steel",
    type: "radio",
    options: [
      { label: "Under 25 tonnes (small obligated producer)", value: "under_25" },
      { label: "25-50 tonnes (EPR full reporting required)", value: "25_50" },
      { label: "50-200 tonnes (medium producer - all schemes likely)", value: "50_200" },
      { label: "200+ tonnes (large producer - complex obligations)", value: "200_plus" },
      { label: "Not sure - we haven't measured this", value: "not_sure", isGap: true },
    ],
    whyMatters: "Total packaging volume determines EPR, PPT, and PRN obligations - 50T+ triggers full requirements",
  },
  {
    id: 8,
    section: "Scheme Obligations",
    icon: FileCheck,
    question: "Which packaging compliance schemes do you currently deal with?",
    subtitle: "Select the one that matches your situation",
    type: "radio",
    options: [
      { label: "Just EPR (Extended Producer Responsibility)", value: "epr_only" },
      { label: "Just PPT (Plastic Packaging Tax)", value: "ppt_only" },
      { label: "EPR + PPT (both schemes)", value: "epr_ppt" },
      { label: "EPR + PPT + PRN (all three schemes)", value: "all_three" },
      { label: "Not sure which schemes apply to us", value: "not_sure", isGap: true },
    ],
    whyMatters: "Identifies your current compliance scope and potential gaps - most businesses need multiple schemes",
  },
  
  // PART 3: EPR Compliance (3 questions)
  {
    id: 9,
    section: "EPR Compliance",
    icon: Database,
    question: "Have you verified your EPR invoice is accurate?",
    subtitle: "EPR fees average £423/tonne for plastic - household/non-household split affects your cost",
    type: "radio",
    options: [
      { label: "Yes - we've audited and verified the invoice breakdown", value: "yes", isCorrect: true },
      { label: "No - we just pay whatever the scheme sends us", value: "no", isGap: true },
      { label: "Not sure - we don't know how to check this", value: "not_sure", isGap: true },
      { label: "We're not yet registered for EPR", value: "not_registered", isGap: true },
    ],
    whyMatters: "Most businesses overpay £5K-£15K annually due to incorrect household/non-household categorisation",
  },
  {
    id: 10,
    section: "EPR Compliance",
    icon: Calculator,
    question: "Do you track packaging data by material type for EPR reporting?",
    subtitle: "Plastic (household/non-household), Paper/Card, Glass, Aluminium, Steel, Wood",
    type: "radio",
    options: [
      { label: "Yes - we maintain detailed records by material type", value: "yes", isCorrect: true },
      { label: "Partially - we track some but not all materials", value: "partial" },
      { label: "No - we estimate or use supplier data", value: "no", isGap: true },
      { label: "Not sure what data EPR requires", value: "not_sure", isGap: true },
    ],
    whyMatters: "Environmental regulator requires accurate material-by-material data for annual submissions",
  },
  {
    id: 11,
    section: "EPR Compliance",
    icon: Clock,
    question: "Are you ready for 2026 EPR modulation fees?",
    subtitle: "Fees will vary based on recyclability ratings - non-recyclable packaging costs more",
    type: "radio",
    options: [
      { label: "Yes - we've assessed our packaging recyclability", value: "yes", isCorrect: true },
      { label: "No - we haven't looked at this yet", value: "no", isGap: true },
      { label: "Not sure what modulation means for us", value: "not_sure", isGap: true },
      { label: "This doesn't apply to us", value: "not_applicable" },
    ],
    whyMatters: "2026 modulation could increase your fees by 20-40% if packaging isn't recyclable - prepare now to save",
  },
  
  // PART 4: PPT Compliance (3 questions)
  {
    id: 12,
    section: "PPT Compliance",
    icon: FileCheck,
    question: "Do you have valid certificates for ALL packaging claiming 30%+ recycled content?",
    subtitle: "PPT charges £210.82/tonne - proper certificates save you money",
    type: "radio",
    options: [
      { label: "Yes - all certificates show exact percentages and are current", value: "yes", isCorrect: true },
      { label: "Partially - we have some certificates but not all", value: "partial", isGap: true },
      { label: "No - we're missing certificates or they're vague/outdated", value: "no", isGap: true },
      { label: "Not applicable - we don't claim recycled content exemptions", value: "not_applicable" },
    ],
    whyMatters: "HMRC requires dated certificates showing exact recycled % - invalid certs trigger penalty + back tax",
  },
  {
    id: 13,
    section: "PPT Compliance",
    icon: CheckCircle,
    question: "Can you locate all PPT records within 10 minutes if HMRC requests them?",
    subtitle: "Certificates, weight records, quarterly returns, supplier documentation",
    type: "radio",
    options: [
      { label: "Yes - everything is organised in one accessible system", value: "yes", isCorrect: true },
      { label: "Probably - might take 30 minutes to pull everything together", value: "maybe" },
      { label: "No - we'd need hours or days to compile records", value: "no", isGap: true },
      { label: "Not sure where all our PPT records are stored", value: "not_sure", isGap: true },
    ],
    whyMatters: "HMRC can request records anytime - must be 'readily accessible' or face penalties",
  },
  {
    id: 14,
    section: "PPT Compliance",
    icon: Globe,
    question: "Have you submitted all PPT quarterly returns on time?",
    type: "radio",
    options: [
      { label: "Yes - all returns filed by deadline", value: "yes", isCorrect: true },
      { label: "Mostly - we've missed one or two deadlines", value: "mostly", isGap: true },
      { label: "No - we've had multiple late submissions", value: "no", isGap: true },
      { label: "Not applicable - we're not registered for PPT yet", value: "not_registered" },
    ],
    whyMatters: "Late PPT returns trigger automatic penalties - £100 minimum per missed deadline",
  },
  
  // PART 5: PRN Strategy & Pain Points (3 questions)
  {
    id: 15,
    section: "PRN Strategy",
    icon: TrendingUp,
    question: "Do you have a strategy for meeting PRN obligations?",
    subtitle: "Packaging Recovery Notes prove you've met recycling obligations - due January 31 annually",
    type: "radio",
    options: [
      { label: "Yes - we have a clear PRN procurement plan", value: "yes", isCorrect: true },
      { label: "Partially - we buy PRNs but without a clear strategy", value: "partial" },
      { label: "No - we haven't addressed PRN obligations yet", value: "no", isGap: true },
      { label: "Not sure if PRN applies to us", value: "not_sure", isGap: true },
    ],
    whyMatters: "PRN prices fluctuate - strategic procurement can save thousands vs last-minute panic buying",
  },
  {
    id: 16,
    section: "Biggest Challenge",
    icon: AlertTriangle,
    question: "What's your biggest packaging compliance pain point right now?",
    type: "radio",
    options: [
      { label: "EPR invoice errors - overpaying or incorrect categorisation", value: "epr_invoice" },
      { label: "PPT documentation chaos - missing certificates or poor records", value: "ppt_docs" },
      { label: "PRN deadline stress - annual scramble to meet obligations", value: "prn_deadline" },
      { label: "Multiple schemes - juggling EPR, PPT, PRN all at once", value: "multiple" },
      { label: "Not sure if we're even compliant across all schemes", value: "uncertain", isGap: true },
    ],
    whyMatters: "This reveals your primary pain point and helps us prioritise solutions",
  },
  {
    id: 17,
    section: "Urgency Indicators",
    icon: Clock,
    question: "What best describes your situation?",
    type: "radio",
    options: [
      { label: "Upcoming deadline - need to fix compliance gaps quickly", value: "deadline" },
      { label: "HMRC enquiry or audit concern - need immediate support", value: "audit" },
      { label: "Received compliance warning or penalty notice", value: "warning" },
      { label: "Proactive - want systems in place before issues arise", value: "proactive" },
      { label: "Just exploring - trying to understand requirements", value: "exploring" },
    ],
    whyMatters: "Helps us recommend the right service tier and timeline for your needs",
  },
  
  // PART 6: Service Preference & Additional Context (2 questions)
  {
    id: 18,
    section: "Your Preferences",
    icon: Target,
    question: "How would you prefer to handle your packaging compliance?",
    type: "radio",
    options: [
      { label: "Express Assessment - 90-minute audit of my top 3 compliance gaps", value: "express" },
      { label: "Comprehensive Review - full audit with written action plan", value: "comprehensive" },
      { label: "Managed Compliance - quarterly monitoring to keep me audit-ready", value: "managed" },
      { label: "Multi-Scheme Fix - sort out EPR + PPT + PRN all at once", value: "multi_scheme" },
      { label: "Not sure yet - just want to see my results first", value: "not_sure" },
    ],
    whyMatters: "This helps us recommend the right service approach for your situation",
  },
  {
    id: 19,
    section: "Additional Context",
    icon: FileCheck,
    question: "Anything else we should know about your compliance situation?",
    subtitle: "Optional - but often reveals critical details",
    type: "textarea",
    whyMatters: "Many businesses share important context here that helps us provide better recommendations",
    placeholder: "Examples that help us help you:\n\n• 'HMRC compliance check scheduled next month'\n• 'Just received £15K EPR invoice - seems too high'\n• 'PRN deadline approaching and we're not ready'\n• 'Managing EPR, PPT, PRN across 3 different spreadsheets'\n• 'Accountant flagged documentation gaps'\n\nAny details about your situation, concerns, or upcoming deadlines...",
  },
]

function AssessmentPageContent() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"correct" | "gap" | "neutral">("neutral")
  const [isContactInfoPhase, setIsContactInfoPhase] = useState(true)
  const [validationError, setValidationError] = useState<string>("")
  const [storageError, setStorageError] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [showQuestionNav, setShowQuestionNav] = useState(false)

  const currentQuestion = questions[currentStep]
  const totalQuestions = questions.length
  const contactInfoQuestions = 4 // First 4 questions are contact info
  const assessmentQuestions = totalQuestions - contactInfoQuestions
  
  // Calculate progress based on current phase
  const progress = isContactInfoPhase 
    ? ((currentStep + 1) / contactInfoQuestions) * 100
    : ((currentStep - contactInfoQuestions + 1) / assessmentQuestions) * 100

  // Generate or retrieve session ID
  useEffect(() => {
    try {
      let savedSessionId = localStorage.getItem("ppt_session_id")
      if (!savedSessionId) {
        savedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        localStorage.setItem("ppt_session_id", savedSessionId)
      }
      setSessionId(savedSessionId)

      // Load saved progress from localStorage
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

  // Auto-save to localStorage AND database
  useEffect(() => {
    const saveProgress = async () => {
      try {
        // Save to localStorage
        localStorage.setItem("ppt_assessment_answers", JSON.stringify(answers))
        localStorage.setItem("ppt_assessment_step", currentStep.toString())
        setStorageError(false)

        // Save to database (if we have answers and a session ID)
        if (sessionId && Object.keys(answers).length > 0) {
          await fetch('/api/assessment/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              name: answers[1] || null,
              email: answers[2] || null,
              company: answers[3] || null,
              phone: answers[4] || null,
              answers,
              currentQuestion: currentStep,
              isComplete: false,
            }),
          }).catch(error => {
            console.error('Failed to save to database:', error)
            // Don't set error state - localStorage still works
          })
        }
      } catch (error) {
        console.error("Failed to save progress:", error)
        setStorageError(true)
      }
    }

    saveProgress()
  }, [answers, currentStep, sessionId])

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
    
    // Skip EPR questions (9-11) if they only do PPT
    if ((question.id === 9 || question.id === 10 || question.id === 11) && answers[8] === "ppt_only") {
      return true
    }
    
    // Skip PPT questions (12-14) if they only do EPR
    if ((question.id === 12 || question.id === 13 || question.id === 14) && answers[8] === "epr_only") {
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

  const calculateAndRedirectToResults = async () => {
    try {
      // Calculate compliance score
      let score = 0
      let maxScore = 0

      // Questions 5-17 are assessment questions (excluding 18-19 which are preference/context)
      // Q5-8: Business Profile (10 points each for clarity)
      // Q9-17: Compliance questions (10 points each)
      for (let i = 5; i <= 17; i++) {
        const answer = answers[i]
        const question = questions.find(q => q.id === i)
        
        if (question && question.options) {
          const selectedOption = question.options.find(opt => opt.value === answer)
          
          // Skip questions based on scheme selection
          if (answers[8] === "ppt_only" && (i === 9 || i === 10 || i === 11)) {
            continue // Skip EPR questions
          }
          if (answers[8] === "epr_only" && (i === 12 || i === 13 || i === 14)) {
            continue // Skip PPT questions
          }
          
          // Business profile questions (5-8) - score for data quality
          if (i >= 5 && i <= 8) {
            maxScore += 10
            if (selectedOption?.isGap || answer === "not_sure") {
              score += 0 // Gap in business understanding
            } else {
              score += 8 // Good data
            }
            continue
          }
          
          // Compliance questions (9-17)
          maxScore += 10
          
          if (selectedOption?.isCorrect) {
            score += 10 // Perfect compliance
          } else if (selectedOption?.isGap || answer === "not_sure") {
            score += 0 // Clear gap
          } else if (answer === "partial" || answer === "maybe" || answer === "mostly") {
            score += 5 // Partial compliance
          } else if (answer === "not_registered" || answer === "not_applicable") {
            score += 10 // N/A is acceptable
            maxScore += 10
            continue
          } else {
            score += 3 // Some effort but needs work
          }
        }
      }

      // Calculate percentage
      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

      // Save results with error handling
      try {
        localStorage.setItem("ppt_assessment_score", percentage.toString())
        localStorage.setItem("ppt_assessment_complete", "true")
      } catch (storageError) {
        console.error("Failed to save results:", storageError)
      }

      // Save completed assessment to database
      if (sessionId) {
        try {
          await fetch('/api/assessment/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId,
              name: answers[1] || null,
              email: answers[2] || null,
              company: answers[3] || null,
              phone: answers[4] || null,
              answers,
              currentQuestion: totalQuestions - 1,
              isComplete: true,
              score: percentage,
            }),
          })
        } catch (dbError) {
          console.error('Failed to save completion to database:', dbError)
          // Don't block user - continue to results
        }
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
    const sections = ["Contact Information", "Certificate Compliance", "Documentation Organisation", "Tax Point Knowledge", 
      "Supplier Management", "Weight Methodology", "Filing Compliance", "Export Documentation", "Nation Data Tracking",
      "Business Scale", "Your Goals", "Your Challenges", "Your Preferences", "Additional Information"]
    const uniqueSections = Array.from(new Set(questions.map(q => q.section)))
    const currentSectionIndex = uniqueSections.indexOf(currentQuestion.section)
    return {
      current: currentSectionIndex + 1,
      total: uniqueSections.length,
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentStep(questionIndex)
      setShowQuestionNav(false)
      // Update phase based on which question we're jumping to
      if (questionIndex < contactInfoQuestions) {
        setIsContactInfoPhase(true)
      } else {
        setIsContactInfoPhase(false)
      }
      setIsAnimating(false)
    }, 300)
  }

  const getQuestionStatus = (questionIndex: number) => {
    const questionId = questions[questionIndex].id
    if (answers[questionId]) return "answered"
    if (questionIndex === currentStep) return "current"
    return "unanswered"
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
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                size="sm"
                onClick={() => setShowQuestionNav(!showQuestionNav)}
                className="poppins-medium bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm px-2 sm:px-3 py-2 min-h-[44px]"
              >
                <Package className="w-3 sm:w-4 h-3 sm:h-4" />
              </Button>
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

      {/* Question Navigation Sidebar */}
      {showQuestionNav && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] animate-fade-in"
            onClick={() => setShowQuestionNav(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white z-[70] shadow-2xl overflow-y-auto animate-slide-in-right">
            <div className="sticky top-0 bg-white border-b border-emerald-100 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="poppins-bold text-lg sm:text-xl text-emerald-900">Questions</h2>
                <button
                  onClick={() => setShowQuestionNav(false)}
                  className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <XCircle className="w-5 h-5 text-emerald-600" />
                </button>
              </div>
              <p className="poppins-regular text-xs sm:text-sm text-emerald-600">
                Jump to any question - your progress is saved
              </p>
            </div>

            <div className="p-4 sm:p-6 space-y-2">
              {questions.map((q, index) => {
                const status = getQuestionStatus(index)
                const isCurrent = index === currentStep
                
                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionJump(index)}
                    className={`w-full text-left p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                      isCurrent
                        ? "border-emerald-500 bg-emerald-50 shadow-md"
                        : status === "answered"
                        ? "border-green-200 bg-green-50/50 hover:bg-green-50"
                        : "border-emerald-100 bg-white hover:bg-emerald-50/50"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm poppins-semibold ${
                        isCurrent
                          ? "bg-emerald-500 text-white"
                          : status === "answered"
                          ? "bg-green-500 text-white"
                          : "bg-emerald-100 text-emerald-600"
                      }`}>
                        {status === "answered" ? "✓" : q.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`poppins-medium text-xs sm:text-sm mb-1 ${
                          isCurrent ? "text-emerald-900" : "text-emerald-700"
                        }`}>
                          {q.section}
                        </p>
                        <p className={`poppins-regular text-xs line-clamp-2 ${
                          isCurrent ? "text-emerald-700" : "text-emerald-600"
                        }`}>
                          {q.question}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}

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

export default function AssessmentPage() {
  return (
    <ErrorBoundary>
      <AssessmentPageContent />
    </ErrorBoundary>
  )
}

