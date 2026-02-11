"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Shield,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Award,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"

export default function EPRResultsPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [userInfo, setUserInfo] = useState({ name: "", email: "", company: "", phone: "" })
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("epr_assessment_score")
      const savedAnswers = localStorage.getItem("epr_assessment_answers")
      
      if (!savedScore || !savedAnswers) {
        router.push("/quiz/epr")
        return
      }

      const parsedAnswers = JSON.parse(savedAnswers)
      setAnswers(parsedAnswers)
      setScore(parseInt(savedScore))
      
      const userInfoData = {
        name: parsedAnswers[1] || "Valued Client",
        email: parsedAnswers[2] || "",
        company: parsedAnswers[3] || "Your Company",
        phone: parsedAnswers[4] || "",
      }
      setUserInfo(userInfoData)

      setIsLoading(false)
      animateScore(parseInt(savedScore))
    } catch (error) {
      console.error("Error loading EPR results:", error)
      router.push("/quiz/epr")
    }
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

  const getRiskLevel = () => {
    if (score >= 80) return { level: "Low Risk", color: "green", description: "You're doing well with EPR compliance" }
    if (score >= 50) return { level: "Medium Risk", color: "amber", description: "You have some compliance gaps to address" }
    return { level: "High Risk", color: "red", description: "You need urgent EPR compliance support" }
  }

  const getRecommendedService = () => {
    if (score >= 80) {
      return {
        title: "EPR Health Check - £295",
        description: "Annual review to ensure ongoing compliance and identify potential savings",
        features: [
          "Fee calculation review",
          "Registration status check",
          "Data tracking assessment",
          "Compliance documentation audit",
        ]
      }
    }
    if (score >= 50) {
      return {
        title: "EPR Fee Review - £795",
        description: "Comprehensive audit of your EPR invoices and potential overcharges",
        features: [
          "Full invoice audit (household/non-household split)",
          "Material categorisation review",
          "£5K-£15K average savings identified",
          "Fee dispute handling with scheme",
          "Corrected invoices obtained",
        ]
      }
    }
    return {
      title: "Managed EPR Compliance - £499/month",
      description: "We handle all your EPR obligations - registration, data, fees, and reporting",
      features: [
        "Complete EPR registration setup",
        "Monthly packaging data tracking",
        "Fee calculation and verification",
        "Annual data submissions",
        "Modulation fee planning (2026)",
        "Ongoing scheme liaison",
      ]
    }
  }

  const riskLevel = getRiskLevel()
  const recommendedService = getRecommendedService()

  const colorClasses = {
    green: {
      bg: "from-green-50 to-green-100",
      text: "text-green-700",
      border: "border-green-300",
      badge: "bg-green-500",
    },
    amber: {
      bg: "from-amber-50 to-amber-100",
      text: "text-amber-700",
      border: "border-amber-300",
      badge: "bg-amber-500",
    },
    red: {
      bg: "from-red-50 to-red-100",
      text: "text-red-700",
      border: "border-red-300",
      badge: "bg-red-500",
    },
  }

  const colors = colorClasses[riskLevel.color as keyof typeof colorClasses]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="poppins-medium text-blue-700">Calculating your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <Link href="/quiz">
              <Button
                variant="outline"
                size="sm"
                className="poppins-medium border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                All Quizzes
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-4">
              <Shield className="w-4 h-4 text-blue-600 mr-2" />
              <span className="poppins-semibold text-sm text-blue-700">EPR Compliance Results</span>
            </div>
            
            <h1 className="poppins-bold text-4xl sm:text-5xl text-blue-900 mb-4">
              {userInfo.name}'s EPR Assessment
            </h1>
            
            <p className="poppins-regular text-lg text-blue-700">
              {userInfo.company}
            </p>
          </div>

          {/* Score Card */}
          <div className={`bg-gradient-to-br ${colors.bg} rounded-3xl p-8 sm:p-12 border-2 ${colors.border} shadow-xl mb-8`}>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-white/30"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 70}`}
                      strokeDashoffset={`${2 * Math.PI * 70 * (1 - animatedScore / 100)}`}
                      className={colors.text}
                      style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className={`poppins-bold text-5xl ${colors.text}`}>{animatedScore}</div>
                      <div className={`poppins-medium text-lg ${colors.text} opacity-75`}>/100</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`inline-flex items-center px-6 py-3 rounded-full ${colors.badge} text-white mb-4`}>
                <span className="poppins-bold text-lg">{riskLevel.level}</span>
              </div>

              <p className={`poppins-medium text-xl ${colors.text}`}>
                {riskLevel.description}
              </p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-lg mb-8">
            <h2 className="poppins-bold text-2xl text-blue-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
              Key Findings From Your Answers
            </h2>

            <div className="space-y-4">
              {/* Finding 1 - Packaging Handling */}
              {answers[5] !== "no" && (
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-blue-900">You handle packaging</p>
                    <p className="poppins-regular text-sm text-blue-700">
                      As a {answers[5]}, you have EPR obligations
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 2 - Registration Status */}
              {answers[8] !== "yes" && (
                <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-amber-900">Registration issue identified</p>
                    <p className="poppins-regular text-sm text-amber-700">
                      {answers[8] === "no" 
                        ? "You're not registered - this is urgent" 
                        : "Your registration status needs review"}
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 3 - Fee Understanding */}
              {answers[9] !== "yes" && (
                <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-amber-900">Fee calculation gap</p>
                    <p className="poppins-regular text-sm text-amber-700">
                      You may be overpaying £5K-£15K annually due to incorrect categorisation
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 4 - Tonnage Uncertainty */}
              {answers[6] === "not_sure" && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-red-900">Tonnage not measured</p>
                    <p className="poppins-regular text-sm text-red-700">
                      You can't comply without knowing your packaging volume
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Service */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="poppins-bold text-2xl mb-2">Recommended For You</h2>
                <p className="poppins-regular text-blue-100">Based on your compliance score and answers</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="poppins-bold text-3xl mb-3">{recommendedService.title}</h3>
              <p className="poppins-regular text-lg text-blue-100 mb-6">
                {recommendedService.description}
              </p>

              <div className="space-y-3">
                {recommendedService.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                    <span className="poppins-regular text-white">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowCalendlyModal(true)}
                className="flex-1 poppins-semibold bg-white text-blue-700 hover:bg-blue-50 py-6 text-lg rounded-2xl shadow-lg"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="flex-1 poppins-semibold border-2 border-white text-white hover:bg-white/10 py-6 text-lg rounded-2xl"
              >
                Download Report
              </Button>
            </div>
          </div>

          {/* All Service Options */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-lg mb-8">
            <h2 className="poppins-bold text-2xl text-blue-900 mb-6">All Service Options</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Option 1 */}
              <div className="border-2 border-blue-100 rounded-2xl p-6 hover:border-blue-300 transition-all">
                <div className="text-center mb-4">
                  <div className="poppins-bold text-3xl text-blue-900 mb-1">£295</div>
                  <div className="poppins-medium text-sm text-blue-600">One-time</div>
                </div>
                <h3 className="poppins-bold text-lg text-blue-900 mb-2">EPR Audit</h3>
                <p className="poppins-regular text-sm text-blue-700 mb-4">
                  90-minute assessment of your EPR setup
                </p>
                <Button className="w-full poppins-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  Book Audit
                </Button>
              </div>

              {/* Option 2 */}
              <div className="border-2 border-blue-500 rounded-2xl p-6 bg-blue-50 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs poppins-semibold">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-4">
                  <div className="poppins-bold text-3xl text-blue-900 mb-1">£795</div>
                  <div className="poppins-medium text-sm text-blue-600">One-time</div>
                </div>
                <h3 className="poppins-bold text-lg text-blue-900 mb-2">Fee Review</h3>
                <p className="poppins-regular text-sm text-blue-700 mb-4">
                  Full invoice audit + £5K-£15K savings
                </p>
                <Button className="w-full poppins-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  Book Review
                </Button>
              </div>

              {/* Option 3 */}
              <div className="border-2 border-blue-100 rounded-2xl p-6 hover:border-blue-300 transition-all">
                <div className="text-center mb-4">
                  <div className="poppins-bold text-3xl text-blue-900 mb-1">£499</div>
                  <div className="poppins-medium text-sm text-blue-600">Per month</div>
                </div>
                <h3 className="poppins-bold text-lg text-blue-900 mb-2">Managed Service</h3>
                <p className="poppins-regular text-sm text-blue-700 mb-4">
                  We handle everything ongoing
                </p>
                <Button className="w-full poppins-medium bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 border-2 border-blue-200">
            <div className="text-center">
              <h3 className="poppins-bold text-2xl text-blue-900 mb-4">
                Want to Discuss Your Results?
              </h3>
              <p className="poppins-regular text-blue-700 mb-6 max-w-2xl mx-auto">
                Book a free 15-minute consultation to understand your EPR obligations and how we can help
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => setShowCalendlyModal(true)}
                  className="poppins-semibold bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-2xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Call
                </Button>
                <Button variant="outline" className="poppins-semibold border-2 border-blue-300 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg rounded-2xl">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Results
                </Button>
              </div>
            </div>
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
