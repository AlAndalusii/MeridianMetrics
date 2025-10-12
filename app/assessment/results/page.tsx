"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
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

interface Gap {
  title: string
  description: string
  exposure?: string
}

export default function ResultsPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [gaps, setGaps] = useState<Gap[]>([])
  const [strengths, setStrenghts] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [userInfo, setUserInfo] = useState({ name: "", email: "", company: "" })

  useEffect(() => {
    // Load results from localStorage
    const savedScore = localStorage.getItem("ppt_assessment_score")
    const savedAnswers = localStorage.getItem("ppt_assessment_answers")
    
    if (!savedScore || !savedAnswers) {
      // Redirect back to assessment if no results
      router.push("/assessment")
      return
    }

    const parsedAnswers = JSON.parse(savedAnswers)
    setAnswers(parsedAnswers)
    setScore(parseInt(savedScore))
    
    // Get user info
    setUserInfo({
      name: parsedAnswers[1] || "Valued Client",
      email: parsedAnswers[2] || "",
      company: parsedAnswers[3] || "Your Company",
    })

    // Calculate gaps and strengths
    calculateGapsAndStrengths(parsedAnswers)

    setIsLoading(false)

    // Animate score
    animateScore(parseInt(savedScore))
  }, [router])

  const animateScore = (targetScore: number) => {
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
  }

  const calculateGapsAndStrengths = (answers: Record<number, string>) => {
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

    // Check Q8 - Document organization
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
    setStrenghts(identifiedStrengths)
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
        title: "Maintenance & Monitoring",
        service: "Quarterly Compliance Review",
        price: "£100/month",
        description: "Maintain your excellent systems audit-ready with quarterly reviews",
      }
    }
    if (score >= 70) {
      return {
        title: "Documentation Audit",
        service: "Expert Audit + Implementation Guide",
        price: "£495 → £250 Early Client Rate",
        description: "We'll identify and help you address those final gaps",
      }
    }
    if (score >= 50) {
      return {
        title: "Compliance Overhaul",
        service: "Full Documentation Audit + Implementation Support",
        price: "£750 → £495 Early Client Rate",
        description: "Comprehensive review and hands-on help to get you audit-ready",
      }
    }
    return {
      title: "Emergency Compliance Package",
      service: "Done-For-You Documentation + Urgent Support",
      price: "£1,200 → £750 Emergency Rate",
        description: "We'll organise everything and get you compliant quickly",
    }
  }

  const scoreLevel = getScoreLevel()
  const recommendation = getRecommendation()

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
          <p className="poppins-medium text-emerald-700">Analyzing your compliance data...</p>
        </div>
      </div>
    )
  }

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
            <MillstoneLogo size="sm" variant="modern" />
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
      <div className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative z-10">
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
                  <h2 className="poppins-bold text-xl sm:text-2xl">Recommended Next Step</h2>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6 border border-white/20">
                  <h3 className="poppins-bold text-2xl sm:text-3xl mb-2">{recommendation.service}</h3>
                  <p className="poppins-regular text-base sm:text-lg mb-3 sm:mb-4 text-emerald-50">{recommendation.description}</p>
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                    <span className="poppins-bold text-3xl sm:text-4xl">{recommendation.price.split("→")[1] || recommendation.price}</span>
                    {recommendation.price.includes("→") && (
                      <span className="poppins-medium text-base sm:text-lg line-through text-emerald-200">
                        {recommendation.price.split("→")[0]}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <Button
                    size="lg"
                    className="poppins-semibold bg-white text-emerald-700 hover:bg-emerald-50 active:scale-95 border-0 shadow-xl transition-all duration-300 sm:hover:scale-105 group w-full py-5 sm:py-6 text-sm sm:text-base min-h-[54px]"
                  >
                    <span className="flex items-center justify-center">
                      Book Your Audit Now
                      <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  
                  <Button
                    size="lg"
                    className="poppins-semibold bg-emerald-800 text-white hover:bg-emerald-900 active:scale-95 border-2 border-white/20 shadow-xl transition-all duration-300 sm:hover:scale-105 group w-full py-5 sm:py-6 text-sm sm:text-base min-h-[54px]"
                  >
                    <span className="flex items-center justify-center">
                      <Phone className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                      <span className="hidden xs:inline">Book Strategy Call</span>
                      <span className="xs:hidden">Call Us</span>
                    </span>
                  </Button>
                </div>

                <p className="text-center text-emerald-100 text-xs sm:text-sm poppins-regular mt-4 sm:mt-5 md:mt-6">
                  Or start smaller: Book a £100 Roadmap Session to understand your options
                </p>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in-up delay-700">
            <div className="bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-5 sm:p-6 md:p-8 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="poppins-semibold text-emerald-900 text-sm sm:text-base">Report emailed to:</h3>
                    <p className="poppins-regular text-emerald-700 text-xs sm:text-sm truncate">{userInfo.email}</p>
                  </div>
                </div>
                <Button className="poppins-medium bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white w-full sm:w-auto text-xs sm:text-sm px-4 sm:px-6 py-3 sm:py-3.5 min-h-[48px]">
                  <Download className="w-3 sm:w-4 h-3 sm:h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center">
            <p className="poppins-regular text-emerald-700 mb-4 text-sm sm:text-base px-4">
              Have questions? Would you like to discuss your specific situation?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Button
                onClick={() => (window.location.href = "mailto:hello@millstonecompliance.com")}
                className="poppins-medium bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 w-full sm:w-auto text-sm px-6 py-3.5 min-h-[48px]"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </Button>
              <Button
                onClick={() => (window.location.href = "tel:+44YOURPHONE")}
                className="poppins-medium bg-white border-2 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 w-full sm:w-auto text-sm px-6 py-3.5 min-h-[48px]"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

