"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
  Phone,
  FileCheck,
  Clock,
  Target,
  BarChart3,
  Award,
  Sparkles,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CONTACT_INFO } from "@/lib/constants"
import { CalendlyModal } from "@/components/CalendlyWidget"

interface Gap {
  title: string
  description: string
  exposure?: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [gaps, setGaps] = useState<Gap[]>([])
  const [strengths, setStrengths] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [userInfo, setUserInfo] = useState({ name: "", email: "", company: "", phone: "" })
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState(false)

  useEffect(() => {
    try {
      // Load results from localStorage
      const savedScore = localStorage.getItem("ppt_assessment_score")
      const savedAnswers = localStorage.getItem("ppt_assessment_answers")
      
      if (!savedScore || !savedAnswers) {
        // Redirect back to assessment if no results
        console.warn("No assessment results found, redirecting to assessment")
        router.push("/assessment")
        return
      }

      const parsedAnswers = JSON.parse(savedAnswers)
      setAnswers(parsedAnswers)
      setScore(parseInt(savedScore))
      
      // Get user info with validation
      const userInfoData = {
        name: parsedAnswers[1] || "Valued Client",
        email: parsedAnswers[2] || "no-email@provided.com",
        company: parsedAnswers[3] || "Your Company",
        phone: parsedAnswers[4] || "",
      }
      setUserInfo(userInfoData)

      // Calculate gaps and strengths
      const { gaps: calculatedGaps, strengths: calculatedStrengths } = calculateGapsAndStrengths(parsedAnswers)

      setIsLoading(false)

      // Animate score
      animateScore(parseInt(savedScore))
      
      // Send results via email (only if email is valid and not already sent)
      const emailSentFlag = localStorage.getItem("ppt_assessment_email_sent")
      if (userInfoData.email && userInfoData.email !== "no-email@provided.com" && !emailSentFlag) {
        sendResultsEmail(userInfoData, parseInt(savedScore), calculatedGaps, calculatedStrengths, parsedAnswers)
      }
    } catch (error) {
      console.error("Error loading assessment results:", error)
      // Redirect to assessment on error
      router.push("/assessment")
    }
  }, [router])

  const animateScore = (targetScore: number) => {
    try {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)
        setAnimatedScore(Math.round(targetScore * easeOut))

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)
    } catch (error) {
      console.error("Error animating score:", error)
      setAnimatedScore(targetScore)
    }
  }

  const sendResultsEmail = async (
    userInfo: any,
    score: number,
    gaps: Gap[],
    strengths: string[],
    answers: Record<number, string>
  ) => {
    try {
      const response = await fetch('/api/send-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo,
          score,
          gaps,
          strengths,
          answers,
        }),
      })

      if (response.ok) {
        setEmailSent(true)
        localStorage.setItem("ppt_assessment_email_sent", "true")
        console.log('Results email sent successfully')
      } else {
        console.error('Failed to send results email')
        setEmailError(true)
      }
    } catch (error) {
      console.error('Error sending results email:', error)
      setEmailError(true)
    }
  }

  const calculateGapsAndStrengths = (answers: Record<number, string>) => {
    try {
      const identifiedGaps: Gap[] = []
      const identifiedStrengths: string[] = []

      // Check Q5 - Certificates
      if (answers[5] === "no" || answers[5] === "not_sure") {
      identifiedGaps.push({
        title: "Missing recycled content certificates",
        description: "You don't have complete certificates for all packaging with recycled content claims",
        exposure: "£5,000-15,000",
      })
    } else if (answers[5] === "yes") {
      identifiedStrengths.push("Complete recycled content certificates")
    }

    // Check Q6 - Certificate specificity
    if (answers[6] === "no" || answers[6] === "not_sure" || answers[6] === "no_certificates") {
      identifiedGaps.push({
        title: "Certificates don't show exact percentages",
        description: "Vague certificates like 'eco-friendly' won't pass HMRC scrutiny",
        exposure: "£3,000-8,000",
      })
    } else if (answers[6] === "yes") {
      identifiedStrengths.push("Specific percentage documentation")
    }

    // Check Q7 - Certificate currency
    if (answers[7] === "no" || answers[7] === "not_sure" || answers[7] === "no_certificates") {
      identifiedGaps.push({
        title: "Outdated or missing certificate dates",
        description: "Certificates older than 12 months are considered invalid",
      })
    } else if (answers[7] === "yes") {
      identifiedStrengths.push("Current certificates (within 12 months)")
    }

    // Check Q8 - Document organisation
    if (answers[8] === "no" || answers[8] === "not_sure") {
      identifiedGaps.push({
        title: "Records would take 20+ minutes to access",
        description: "Disorganised records can fail an audit even if you have proper documentation",
      })
    } else if (answers[8] === "yes") {
      identifiedStrengths.push("Well-organised documentation system")
    }

    // Check Q9 - Tax point knowledge
    if (answers[9] !== "manufacturing") {
      identifiedGaps.push({
        title: "Incorrect tax point understanding",
        description: "Wrong tax point timing leads to incorrect quarterly reporting and penalties",
        exposure: "£2,000-6,000",
      })
    } else {
      identifiedStrengths.push("Correct tax point knowledge")
    }

    // Check Q10 - Supplier changes
    if (answers[10] === "no") {
      identifiedGaps.push({
        title: "No re-certification after supplier changes",
        description: "Regulation 27 requires new certificates when suppliers change",
      })
    } else if (answers[10] === "yes" || answers[10] === "never_changed") {
      identifiedStrengths.push("Proper supplier change protocols")
    }

    // Check Q11 - Weighing methodology
    if (answers[11] === "no" || answers[11] === "not_sure") {
      identifiedGaps.push({
        title: "No documented weighing methodology",
        description: "HMRC can reject tonnage calculations without written procedures",
        exposure: "£4,000-10,000",
      })
    } else if (answers[11] === "yes") {
      identifiedStrengths.push("Documented weighing procedures")
    }

    // Check Q12 - Filing compliance
    if (answers[12] === "no" || answers[12] === "not_started") {
      identifiedGaps.push({
        title: "Late or missing quarterly submissions",
        description: "Missed deadlines trigger automatic penalties even if no tax is owed",
        exposure: "£300+ per quarter",
      })
    } else if (answers[12] === "yes") {
      identifiedStrengths.push("Timely quarterly submission record")
    }

    // Check Q13 - Export documentation
    if (answers[13] === "no" || answers[13] === "not_sure") {
      identifiedGaps.push({
        title: "No pre-manufacturing export proof",
        description: "Can't claim export deferral without documented export intent before manufacturing",
      })
    } else if (answers[13] === "yes" || answers[13] === "no_export") {
      if (answers[13] === "yes") {
        identifiedStrengths.push("Proper export documentation procedures")
      }
    }

    // Check Q14 - Nation data
    if (answers[14] === "no" || answers[14] === "not_sure") {
      identifiedGaps.push({
        title: "Missing UK nation data tracking",
        description: "Nation data reporting is mandatory from 2025 onwards",
      })
    } else if (answers[14] === "yes" || answers[14] === "one_nation") {
      identifiedStrengths.push("Nation data tracking in place")
    }

      setGaps(identifiedGaps)
      setStrengths(identifiedStrengths)
      
      return { gaps: identifiedGaps, strengths: identifiedStrengths }
    } catch (error) {
      console.error("Error calculating gaps and strengths:", error)
      setGaps([])
      setStrengths([])
      return { gaps: [], strengths: [] }
    }
  }

  const getScoreLevel = () => {
    if (score >= 90) return { level: "Audit-Ready", color: "green", emoji: "🟢", description: "Top 15% of businesses" }
    if (score >= 70) return { level: "Strong Foundation", color: "yellow", emoji: "🟡", description: "3-4 gaps to address" }
    if (score >= 50) return { level: "Compliance Risk", color: "orange", emoji: "🟠", description: "Significant exposure" }
    return { level: "Critical Gaps", color: "red", emoji: "🔴", description: "Urgent action needed" }
  }

  const getRecommendation = () => {
    if (score >= 90) {
      return {
        title: "Maintain Your Excellence",
        service: "Quarterly Compliance Monitoring",
        description: "Your systems are strong. We'll help you stay audit-ready with regular check-ins to track certificate expiry, filing deadlines, and regulatory changes.",
        whatWeProvide: [
          "Quarterly compliance health checks",
          "Certificate expiry tracking and alerts",
          "Regulatory update notifications",
          "Priority email support"
        ],
        ctaMessage: "Keep your excellent compliance status with our monitoring service",
      }
    }
    if (score >= 70) {
      return {
        title: "Close The Gaps",
        service: "Expert Documentation Audit",
        description: "You have a solid foundation with 3-4 gaps to address. We'll review your documentation, identify exactly what's missing, and provide a detailed action plan you can implement yourself or with our help.",
        whatWeProvide: [
          "Complete audit of all PPT documentation",
          "Written gap analysis report",
          "Step-by-step remediation guide",
          "Email support during implementation"
        ],
        ctaMessage: "Get your personalised compliance roadmap to address those final gaps",
      }
    }
    if (score >= 50) {
      return {
        title: "Build Audit-Ready Systems",
        service: "Full Compliance Implementation",
        description: "You have significant gaps that need structured attention. We'll audit your current state, create organised systems for your documentation, and work with you to get everything audit-ready.",
        whatWeProvide: [
          "Comprehensive documentation review",
          "Supplier certificate collection support",
          "Organised filing system setup",
          "Hands-on implementation guidance",
          "Ongoing support until compliant"
        ],
        ctaMessage: "Let us help you build a compliance system that works",
      }
    }
    return {
      title: "Urgent Action Required",
      service: "Done-For-You Compliance Setup",
        description: "Your current exposure is high. We'll take immediate action to organise your documentation, collect missing certificates, and create a defensible system before HMRC comes knocking.",
        whatWeProvide: [
          "Emergency documentation organisation",
        "Direct supplier certificate collection",
        "Complete record system creation",
        "Priority implementation support",
        "HMRC correspondence assistance if needed"
      ],
      ctaMessage: "Get urgent help to protect your business from penalties",
    }
  }

  const getScoreColor = () => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    if (score >= 50) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreBgColor = () => {
    if (score >= 90) return "from-green-500 to-emerald-500"
    if (score >= 70) return "from-yellow-500 to-amber-500"
    if (score >= 50) return "from-orange-500 to-amber-600"
    return "from-red-500 to-rose-600"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="poppins-medium text-emerald-700">Analysing your compliance data...</p>
        </div>
      </div>
    )
  }

  const scoreLevel = getScoreLevel()
  const recommendation = getRecommendation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                onClick={() => router.push("/")}
                className="poppins-medium bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 min-h-[44px]"
              >
                <span className="hidden xs:inline">Back to Home</span>
                <span className="xs:hidden">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="inline-flex items-center px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 mb-4 sm:mb-5 md:mb-6 animate-fade-in-up">
              <Award className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 mr-2 sm:mr-3" />
              <span className="poppins-semibold text-emerald-800 text-xs sm:text-sm md:text-base">Your Compliance Intelligence Report</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-emerald-900 mb-3 sm:mb-4 animate-fade-in-up delay-100">
              {userInfo.name}'s Assessment
            </h1>
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 animate-fade-in-up delay-200">
              {userInfo.company}
            </p>
          </div>

          {/* Score Card */}
          <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in-up delay-300">
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/30 to-emerald-50/0"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="poppins-bold text-xl sm:text-2xl text-emerald-900 mb-2">Your PPT Compliance Score</h2>
                  <p className={`poppins-semibold text-base sm:text-lg ${getScoreColor()}`}>
                    {scoreLevel.emoji} {scoreLevel.level}
                  </p>
                </div>

                {/* Speedometer */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-6 sm:mb-8">
                  {/* Background circle */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      stroke="currentColor"
                      strokeWidth="14"
                      fill="none"
                      className="text-emerald-100"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      stroke="url(#scoreGradient)"
                      strokeWidth="14"
                      fill="none"
                      strokeDasharray={`${(animatedScore / 100) * 691} 691`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" className={`${score >= 90 ? "stop-color-green-500" : score >= 70 ? "stop-color-yellow-500" : score >= 50 ? "stop-color-orange-500" : "stop-color-red-500"}`} />
                        <stop offset="100%" className={`${score >= 90 ? "stop-color-emerald-500" : score >= 70 ? "stop-color-amber-500" : score >= 50 ? "stop-color-amber-600" : "stop-color-rose-600"}`} />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Score text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`poppins-bold text-4xl sm:text-5xl md:text-6xl ${getScoreColor()}`}>{animatedScore}</div>
                    <div className="poppins-medium text-base sm:text-lg text-emerald-700">/100</div>
                  </div>
                </div>

                <p className="text-center poppins-regular text-sm sm:text-base text-emerald-700 max-w-2xl mx-auto px-4">
                  {scoreLevel.description}
                </p>
              </div>
            </div>
          </div>

          {/* Gaps Section */}
          {gaps.length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in-up delay-400">
              <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-white/0 to-amber-50/20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                    <AlertTriangle className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <h2 className="poppins-bold text-lg sm:text-xl md:text-2xl text-emerald-900">
                      Critical Gaps ({gaps.length})
                    </h2>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {gaps.map((gap, index) => (
                      <div
                        key={index}
                        className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50/80 to-orange-50/50 border border-amber-200/50"
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
                          <div className="flex-1 w-full">
                            <h3 className="poppins-semibold text-amber-900 mb-2 flex items-start text-sm sm:text-base">
                              <XCircle className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span className="flex-1">{gap.title}</span>
                            </h3>
                            <p className="poppins-regular text-xs sm:text-sm text-amber-800 leading-relaxed">
                              {gap.description}
                            </p>
                          </div>
                          {gap.exposure && (
                            <div className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-amber-100 rounded-lg sm:rounded-xl border border-amber-200">
                              <p className="poppins-semibold text-amber-900 text-xs sm:text-sm">
                                Exposure: {gap.exposure}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-5 md:mt-6 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-red-50/50 border border-red-200/50">
                    <p className="poppins-medium text-red-900 text-center text-xs sm:text-sm md:text-base">
                      <span className="text-red-700">⚠️ Total Potential Exposure:</span>{" "}
                      £{gaps.reduce((sum, gap) => {
                        if (gap.exposure) {
                          const match = gap.exposure.match(/[\d,]+/)
                          return sum + (match ? parseInt(match[0].replace(",", "")) : 0)
                        }
                        return sum
                      }, 0).toLocaleString()}–{gaps.reduce((sum, gap) => {
                        if (gap.exposure) {
                          const matches = gap.exposure.match(/[\d,]+/g)
                          return sum + (matches && matches[1] ? parseInt(matches[1].replace(",", "")) : 0)
                        }
                        return sum
                      }, 0).toLocaleString()} in disallowed exemptions if HMRC conducts an audit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Strengths Section */}
          {strengths.length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in-up delay-500">
              <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-white/0 to-emerald-50/20"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                    <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                    <h2 className="poppins-bold text-lg sm:text-xl md:text-2xl text-emerald-900">
                      Your Strengths ({strengths.length})
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-50/80 to-emerald-50/50 border border-green-200/50 flex items-center"
                      >
                        <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                        <span className="poppins-medium text-green-900 text-xs sm:text-sm">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recommendation Section */}
          <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in-up delay-600">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(6,95,70,0.25)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
              
              <div className="relative z-10 text-white">
                <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                  <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 mr-2 sm:mr-3" />
                  <h2 className="poppins-bold text-xl sm:text-2xl">Recommended Solution</h2>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 border border-white/20">
                  <h3 className="poppins-bold text-2xl sm:text-3xl mb-3">{recommendation.service}</h3>
                  <p className="poppins-regular text-base sm:text-lg mb-4 sm:mb-5 text-emerald-50 leading-relaxed">{recommendation.description}</p>
                  
                  {/* What We Provide List */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <h4 className="poppins-semibold text-sm text-emerald-100 mb-3 uppercase tracking-wide">What We Provide:</h4>
                    <ul className="space-y-2">
                      {recommendation.whatWeProvide.map((item, index) => (
                        <li key={index} className="flex items-start text-sm sm:text-base">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-emerald-300 flex-shrink-0 mt-0.5" />
                          <span className="poppins-regular text-white">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Message */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 sm:mb-5 border border-white/10">
                  <p className="poppins-semibold text-center text-white text-base sm:text-lg mb-2">
                    {recommendation.ctaMessage}
                  </p>
                  <p className="poppins-regular text-center text-emerald-100 text-sm">
                    {score >= 90 
                      ? "Let's keep you audit-ready with minimal effort on your part."
                      : score >= 70 
                      ? "We'll have you fully compliant within 2 weeks."
                      : score >= 50 
                      ? "Most clients are audit-ready within 30 days of starting."
                      : "We can get you compliant before HMRC notices the gaps."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      const subject = "My PPT Assessment Results - Ready to Get Compliant"
                      const body = `Hi Zak,%0D%0A%0D%0AI've just completed my PPT compliance assessment.%0D%0A%0D%0A📊 My Score: ${score}/100 - ${scoreLevel.level}%0D%0A🏢 Company: ${userInfo.company}%0D%0A%0D%0A${gaps.length > 0 ? `I need help with ${gaps.length} compliance gap${gaps.length > 1 ? 's' : ''} you've identified.%0D%0A%0D%0A` : ''}I'd like to discuss: ${recommendation.service}%0D%0A%0D%0ACan we arrange a quick call this week?%0D%0A%0D%0ABest time to reach me: [Your preferred time]%0D%0A%0D%0ACheers,%0D%0A${userInfo.name}%0D%0A${userInfo.phone ? userInfo.phone : ''}%0D%0A${userInfo.email}`
                      window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`
                    }}
                    className="poppins-semibold bg-white text-emerald-700 hover:bg-emerald-50 active:scale-95 border-0 shadow-xl transition-all duration-300 sm:hover:scale-105 group w-full py-5 sm:py-6 text-sm sm:text-base min-h-[54px]"
                  >
                    <span className="flex items-center justify-center">
                      <Mail className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                      Get My Custom Proposal
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <Button
                    size="lg"
                    onClick={() => setShowCalendlyModal(true)}
                    className="poppins-semibold bg-emerald-800 text-white hover:bg-emerald-900 active:scale-95 border-2 border-white/20 shadow-xl transition-all duration-300 sm:hover:scale-105 group w-full py-5 sm:py-6 text-sm sm:text-base min-h-[54px]"
                  >
                    <span className="flex items-center justify-center">
                      <Phone className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                      <span className="hidden xs:inline">Book Your Free Call</span>
                      <span className="xs:hidden">Book Call</span>
                    </span>
                  </Button>
                </div>

                <p className="text-center text-emerald-100 text-xs sm:text-sm poppins-regular mt-4 sm:mt-5 md:mt-6">
                  ⚡ Most clients get their proposal within 4 hours
                </p>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in-up delay-700">
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)]">
              <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 ${
                  emailSent ? 'bg-emerald-100' : emailError ? 'bg-amber-100' : 'bg-gray-100'
                }`}>
                  <Mail className={`w-8 h-8 sm:w-10 sm:h-10 ${
                    emailSent ? 'text-emerald-600' : emailError ? 'text-amber-600' : 'text-gray-400'
                  }`} />
                </div>
                
                <h3 className="poppins-bold text-xl sm:text-2xl text-emerald-900 mb-2">
                  {emailSent ? 'Your Report Has Been Emailed!' : emailError ? 'Email In Progress...' : 'Sending Your Report...'}
                </h3>
                
                <p className="poppins-regular text-emerald-700 text-sm sm:text-base mb-4">
                  {emailSent 
                    ? `We've sent your personalised compliance report to:` 
                    : emailError 
                    ? 'We\'re working on sending your report to:' 
                    : 'Your personalised report is being sent to:'}
                </p>
                
                <div className="bg-emerald-50 rounded-xl px-6 py-3 mb-6">
                  <p className="poppins-semibold text-emerald-900 text-base sm:text-lg">{userInfo.email}</p>
                </div>
                
                {emailSent && (
                  <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-4 sm:p-5 w-full max-w-md">
                    <p className="poppins-semibold text-emerald-900 text-sm sm:text-base mb-2">✓ Email Sent Successfully!</p>
                    <p className="poppins-regular text-emerald-700 text-xs sm:text-sm">
                      Check your inbox for your personalised compliance report. Don't forget to check your spam folder if you don't see it.
                    </p>
                  </div>
                )}
                
                {emailError && (
                  <div className="bg-amber-100 border border-amber-200 rounded-xl p-4 sm:p-5 w-full max-w-md">
                    <p className="poppins-semibold text-amber-900 text-sm sm:text-base mb-2">⚠️ Email Pending</p>
                    <p className="poppins-regular text-amber-700 text-xs sm:text-sm">
                      If you don't receive your report within a few minutes, please check your spam folder or contact us directly.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-200 mb-6">
              <h3 className="poppins-bold text-xl sm:text-2xl text-emerald-900 mb-3">
                Ready to Get This Sorted?
              </h3>
              <p className="poppins-regular text-emerald-700 mb-6 text-sm sm:text-base px-4">
                {score >= 70 
                  ? "You're close to full compliance. Let's close those gaps before your next filing deadline."
                  : "Every day you wait increases your risk. Let's get you protected."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                <Button
                  onClick={() => {
                    const subject = "My PPT Assessment Results - Ready to Get Compliant"
                    const body = `Hi Zak,%0D%0A%0D%0AI've just completed my PPT compliance assessment.%0D%0A%0D%0A📊 My Score: ${score}/100 - ${scoreLevel.level}%0D%0A🏢 Company: ${userInfo.company}%0D%0A%0D%0A${gaps.length > 0 ? `I need help with ${gaps.length} compliance gap${gaps.length > 1 ? 's' : ''} you've identified.%0D%0A%0D%0A` : ''}I'd like to discuss: ${recommendation.service}%0D%0A%0D%0ACan we arrange a quick call this week?%0D%0A%0D%0ABest time to reach me: [Your preferred time]%0D%0A%0D%0ACheers,%0D%0A${userInfo.name}%0D%0A${userInfo.phone ? userInfo.phone : ''}%0D%0A${userInfo.email}`
                    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`
                  }}
                  className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white active:scale-95 w-full sm:w-auto text-sm px-8 py-4 min-h-[54px] shadow-lg hover:shadow-xl transition-all group"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email for Proposal (4hr response)
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  className="poppins-semibold bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 active:scale-95 w-full sm:w-auto text-sm px-8 py-4 min-h-[54px] shadow-lg hover:shadow-xl transition-all"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Free Strategy Call
                </Button>
              </div>
            </div>
            <p className="poppins-regular text-emerald-600 text-xs sm:text-sm">
              🔒 Your assessment data stays confidential • No sales pressure • Just honest advice
            </p>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={showCalendlyModal} 
        onClose={() => setShowCalendlyModal(false)} 
      />
    </div>
  )
}

