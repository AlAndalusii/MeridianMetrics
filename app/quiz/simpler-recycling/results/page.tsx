"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  TrendingUp,
  Target,
  Clock,
  Send,
  Loader2,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"

export default function SimplerRecyclingResultsPage() {
  const router = useRouter()
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [animatedScore, setAnimatedScore] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [userInfo, setUserInfo] = useState({ name: "", email: "", company: "", phone: "" })
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [showEmailInput, setShowEmailInput] = useState(false)

  useEffect(() => {
    try {
      const savedScore = localStorage.getItem("simpler_recycling_assessment_score")
      const savedAnswers = localStorage.getItem("simpler_recycling_assessment_answers")
      
      if (!savedScore || !savedAnswers) {
        router.push("/quiz/simpler-recycling")
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
      console.error("Error loading results:", error)
      router.push("/quiz/simpler-recycling")
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
    if (score >= 80) return { level: "Compliant", color: "green", description: "You're meeting Simpler Recycling requirements" }
    if (score >= 50) return { level: "Gaps Identified", color: "amber", description: "You have compliance gaps to fix" }
    return { level: "Non-Compliant", color: "red", description: "Urgent action needed - you're breaking the law" }
  }

  // Build findings array from answers for the email
  const buildFindings = () => {
    const findings: Array<{ status: 'compliant' | 'gap' | 'warning'; title: string; detail: string }> = []

    // Employee deadline
    if (answers[5] === "under_10") {
      findings.push({ status: 'compliant', title: 'Micro-firm — 2027 Deadline', detail: 'You have until 31 March 2027 to comply with Simpler Recycling.' })
    } else if (answers[5] === "not_sure") {
      findings.push({ status: 'warning', title: 'Employee Count Uncertain', detail: 'You need to count full-time equivalents to confirm your legal deadline.' })
    } else {
      findings.push({ status: 'gap', title: 'Deadline Passed — 31 March 2025', detail: 'With 10+ employees, your compliance deadline has passed. Immediate action required.' })
    }

    // Bins
    if (answers[6] === "one" || answers[6] === "two") {
      findings.push({ status: 'gap', title: 'Insufficient Waste Separation', detail: 'You need at least 3 separate bins: dry recyclables, food waste, and general waste.' })
    } else if (answers[6] === "three_plus") {
      findings.push({ status: 'compliant', title: 'Bin Separation in Place', detail: 'You have 3 or more separate waste streams — this meets the minimum requirement.' })
    }

    // Food waste
    if (answers[7] === "no") {
      findings.push({ status: 'gap', title: 'Missing Food Waste Separation', detail: 'Food waste must be collected separately. This is the #1 gap found in EA inspections.' })
    } else if (answers[7] === "yes" || answers[7] === "no_food") {
      findings.push({ status: 'compliant', title: 'Food Waste Handled Correctly', detail: 'You have a dedicated food waste stream or confirmed no food waste is produced.' })
    } else if (answers[7] === "partial") {
      findings.push({ status: 'warning', title: 'Inconsistent Food Waste Separation', detail: 'Food waste must be separated at every location, not just some.' })
    }

    // Contractor
    if (answers[8] === "no") {
      findings.push({ status: 'gap', title: 'Contractor Not Collecting Separately', detail: 'Your waste contractor must collect each stream separately. This is a legal requirement.' })
    } else if (answers[8] === "not_sure") {
      findings.push({ status: 'warning', title: 'Contractor Compliance Unverified', detail: 'You need to confirm your contractor provides separate collections for each stream.' })
    } else if (answers[8] === "yes") {
      findings.push({ status: 'compliant', title: 'Contractor Collections Compliant', detail: 'Your contractor collects each waste stream separately — correct.' })
    }

    // Deadline knowledge
    if (answers[9] !== "march_2025" && answers[5] !== "under_10") {
      findings.push({ status: 'gap', title: 'Deadline Misunderstood', detail: 'The mandatory deadline was 31 March 2025. If you have 10+ employees, you should already be compliant.' })
    }

    // Inspection readiness
    if (answers[10] !== "yes") {
      findings.push({ status: 'warning', title: 'Not Inspection-Ready', detail: 'You need labelled bins, collection records, and staff training to pass an EA inspection.' })
    } else {
      findings.push({ status: 'compliant', title: 'Inspection-Ready Documentation', detail: 'You have labelled bins, collection records, and staff awareness in place.' })
    }

    return findings
  }

  const handleEmailResults = async (overrideEmail?: string) => {
    const emailToUse = overrideEmail || userInfo.email || emailInput
    if (!emailToUse || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToUse)) {
      setShowEmailInput(true)
      return
    }

    setEmailSending(true)
    setEmailError("")

    try {
      const riskLvl = getRiskLevel()
      const res = await fetch("/api/simpler-recycling/email-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userInfo: { ...userInfo, email: emailToUse },
          score,
          riskLevel: riskLvl,
          findings: buildFindings(),
          answers,
        }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to send email")
      }

      setEmailSent(true)
      setShowEmailInput(false)
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Could not send email. Please try again.")
    } finally {
      setEmailSending(false)
    }
  }

  // Removed service-based recommendation — free call is always the first step

  const riskLevel = getRiskLevel()

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="poppins-medium text-green-700">Calculating your results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-green-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <Link href="/quiz">
              <Button
                variant="outline"
                size="sm"
                className="poppins-medium border-green-200 text-green-700 hover:bg-green-50"
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-4">
              <BadgeCheck className="w-4 h-4 text-green-600 mr-2" />
              <span className="poppins-semibold text-sm text-green-700">Simpler Recycling Results</span>
            </div>
            
            <h1 className="poppins-bold text-4xl sm:text-5xl text-green-900 mb-4">
              {userInfo.name}'s Workplace Assessment
            </h1>
            
            <p className="poppins-regular text-lg text-green-700">
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
          <div className="bg-white rounded-3xl p-8 border-2 border-green-100 shadow-lg mb-8">
            <h2 className="poppins-bold text-2xl text-green-900 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
              Key Findings From Your Answers
            </h2>

            <div className="space-y-4">
              {/* Finding 1 - Employee Count */}
              {answers[5] === "under_10" ? (
                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-green-900">Micro-firm status</p>
                    <p className="poppins-regular text-sm text-green-700">
                      You have until 31 March 2027 to comply (2 extra years)
                    </p>
                  </div>
                </div>
              ) : answers[5] === "not_sure" ? (
                <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-amber-900">Employee count uncertain</p>
                    <p className="poppins-regular text-sm text-amber-700">
                      You need to count full-time equivalents to know your deadline
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-red-900">Deadline passed: 31 March 2025</p>
                    <p className="poppins-regular text-sm text-red-700">
                      With 10+ employees, you should already be compliant
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 2 - Bin Setup */}
              {(answers[6] === "one" || answers[6] === "two") && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-red-900">Insufficient waste separation</p>
                    <p className="poppins-regular text-sm text-red-700">
                      You need at least 3 separate bins: dry recyclables, food waste, and general waste
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 3 - Food Waste */}
              {answers[7] === "no" && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-red-900">Missing food waste separation</p>
                    <p className="poppins-regular text-sm text-red-700">
                      This is the #1 thing Environment Agency inspectors look for - critical violation
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 4 - Contractor */}
              {(answers[8] === "no" || answers[8] === "not_sure") && (
                <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-amber-900">Waste contractor issue</p>
                    <p className="poppins-regular text-sm text-amber-700">
                      {answers[8] === "no" 
                        ? "You need a contractor offering separate collections" 
                        : "Check your contractor provides compliant collections"}
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 5 - Deadline Knowledge */}
              {answers[9] !== "march_2025" && answers[5] !== "under_10" && (
                <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-red-900">Deadline misunderstood</p>
                    <p className="poppins-regular text-sm text-red-700">
                      The deadline was 31 March 2025 - you should be compliant already
                    </p>
                  </div>
                </div>
              )}

              {/* Finding 6 - Inspection Readiness */}
              {answers[10] !== "yes" && (
                <div className="flex items-start space-x-3 p-4 bg-amber-50 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="poppins-semibold text-amber-900">Not inspection-ready</p>
                    <p className="poppins-regular text-sm text-amber-700">
                      You need labeled bins, collection records, and staff training for Environment Agency visits
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended: Free Call */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="poppins-bold text-2xl mb-1">Recommended For You</h2>
                <p className="poppins-regular text-green-100 text-sm">Based on your compliance score and answers</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="poppins-bold text-2xl mb-2">Free 15-Minute Consultation</h3>
              <p className="poppins-regular text-green-100 mb-5">
                Get personalised advice on your compliance gaps
              </p>
              <div className="space-y-2.5">
                {[
                  "Discuss your results",
                  "Calculate penalty exposure",
                  "Create action plan",
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-200 flex-shrink-0" />
                    <span className="poppins-regular text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowCalendlyModal(true)}
                className="flex-1 poppins-semibold bg-white text-green-700 hover:bg-green-50 py-6 text-lg rounded-2xl shadow-lg"
              >
                Book Free Call
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => handleEmailResults()}
                disabled={emailSending || emailSent}
                variant="outline"
                className="flex-1 poppins-semibold border-2 border-white text-white hover:bg-white/10 py-6 text-lg rounded-2xl disabled:opacity-60"
              >
                {emailSent ? (
                  <><CheckCircle className="w-5 h-5 mr-2" />Sent ✓</>
                ) : emailSending ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Sending…</>
                ) : (
                  <><Mail className="w-5 h-5 mr-2" />Email Report</>
                )}
              </Button>
            </div>
          </div>

          {/* All Service Options */}
          <div className="bg-white rounded-3xl p-8 border-2 border-green-100 shadow-lg mb-8">
            <h2 className="poppins-bold text-2xl text-green-900 mb-6">All Service Options</h2>

            <div className="grid md:grid-cols-3 gap-5">
              {/* Option 1 — Primary: Free Call */}
              <div className="border-2 border-green-500 rounded-2xl p-6 bg-gradient-to-br from-green-50 to-green-100 flex flex-col">
                <div className="text-center mb-4">
                  <div className="poppins-bold text-3xl text-green-900 mb-1">Free</div>
                  <div className="poppins-medium text-xs text-green-600 uppercase tracking-wide">Discovery Call</div>
                </div>
                <h3 className="poppins-bold text-base text-green-900 mb-2">15-Min Consultation</h3>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["Discuss your results", "Understand your gaps", "No obligation"].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-800">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  className="w-full poppins-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
                >
                  Book Free Call
                </Button>
              </div>

              {/* Option 2 — Audit */}
              <div className="border-2 border-green-100 rounded-2xl p-6 hover:border-green-300 transition-all flex flex-col">
                <h3 className="poppins-bold text-base text-green-900 mb-2">Compliance Audit</h3>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["90-min on-site assessment", "Written report in 24 hours", "Penalty risk calculation", "Action plan included"].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-800">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  className="w-full poppins-medium bg-white border-2 border-green-600 text-green-700 hover:bg-green-50 rounded-xl py-3"
                >
                  Book Audit
                </Button>
              </div>

              {/* Option 3 — Audit + Support */}
              <div className="border-2 border-green-100 rounded-2xl p-6 hover:border-green-300 transition-all flex flex-col">
                <h3 className="poppins-bold text-base text-green-900 mb-2">Audit + Support</h3>
                <ul className="space-y-1.5 mb-5 flex-1">
                  {["Everything in Audit", "30-day email & phone support", "Help sourcing contractors", "Follow-up compliance check"].map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-green-800">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  className="w-full poppins-medium bg-white border-2 border-green-200 text-green-700 hover:bg-green-50 rounded-xl py-3 text-sm"
                >
                  See Setup Option
                </Button>
              </div>
            </div>
          </div>

          {/* Urgency Note for Non-Compliant */}
          {score < 50 && answers[5] !== "under_10" && (
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 mb-8">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="poppins-bold text-xl text-red-900 mb-2">
                    Urgent: You're Breaking the Law
                  </h3>
                  <p className="poppins-regular text-red-800 mb-4">
                    The deadline passed on 31 March 2025. The Environment Agency can issue compliance notices and charge £118/hour for regulatory work. You need to fix this immediately.
                  </p>
                  <Button
                    onClick={() => setShowCalendlyModal(true)}
                    className="poppins-semibold bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Book Urgent Consultation
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 border-2 border-green-200">
            <div className="text-center">
              <h3 className="poppins-bold text-2xl text-green-900 mb-4">
                Want to Discuss Your Results?
              </h3>
              <p className="poppins-regular text-green-700 mb-6 max-w-2xl mx-auto">
                Book a free 15-minute consultation or send a full copy of this report to your inbox
              </p>

              {/* Email input (shown when no email on file) */}
              {showEmailInput && !emailSent && (
                <div className="mb-5 max-w-sm mx-auto">
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      placeholder="Enter your email address"
                      className="rounded-xl border-2 border-green-200 focus:border-green-500 poppins-regular text-sm py-3"
                      onKeyDown={e => e.key === "Enter" && handleEmailResults(emailInput)}
                    />
                    <Button
                      onClick={() => handleEmailResults(emailInput)}
                      disabled={emailSending}
                      className="poppins-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-3 flex-shrink-0"
                    >
                      {emailSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    </Button>
                  </div>
                  {emailError && <p className="text-xs text-red-600 mt-1.5 poppins-medium">{emailError}</p>}
                </div>
              )}

              {/* Success state */}
              {emailSent && (
                <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-2xl max-w-sm mx-auto">
                  <div className="flex items-center justify-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="poppins-semibold text-sm">Report sent! Check your inbox.</p>
                  </div>
                  <p className="text-xs text-green-600 poppins-regular mt-1 text-center">Full compliance report with findings and next steps</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => setShowCalendlyModal(true)}
                  className="poppins-semibold bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-2xl"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Call
                </Button>

                {!emailSent ? (
                  <Button
                    onClick={() => handleEmailResults()}
                    disabled={emailSending}
                    variant="outline"
                    className="poppins-semibold border-2 border-green-300 text-green-700 hover:bg-green-50 px-8 py-6 text-lg rounded-2xl disabled:opacity-60"
                  >
                    {emailSending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Email My Results
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    disabled
                    className="poppins-semibold border-2 border-green-300 text-green-600 px-8 py-6 text-lg rounded-2xl opacity-70"
                  >
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Report Sent ✓
                  </Button>
                )}
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
