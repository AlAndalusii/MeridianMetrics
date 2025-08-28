"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  TrendingUp,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  BarChart3,
  AlertTriangle,
  FileCheck,
  Database,
  Calculator,
  Clock,
  DollarSign,
  Building,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { MeridianLogo } from "@/components/logo/MeridianLogo"

// Fortune 500 Premium Logo Component - World-Class Design
const MeridianMetricsLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <div className="flex items-center space-x-4">
    <div className="relative">
      <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Premium geometric outer ring */}
        <circle
          cx="40"
          cy="40"
          r="38"
          fill="none"
          stroke="url(#emeraldGradient)"
          strokeWidth="2"
          className="opacity-20"
        />
        
        {/* Precision inner ring */}
        <circle
          cx="40"
          cy="40"
          r="32"
          fill="none"
          stroke="url(#emeraldGradient)"
          strokeWidth="1.5"
          className="opacity-40"
        />

        {/* Main logo container - sophisticated hexagonal base */}
        <path
          d="M40 8 L62 24 L62 56 L40 72 L18 56 L18 24 Z"
          fill="url(#primaryGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="1"
          className="drop-shadow-lg"
        />

        {/* Inner architectural frame */}
        <path
          d="M40 16 L56 28 L56 52 L40 64 L24 52 L24 28 Z"
          fill="none"
          stroke="url(#innerGradient)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* The Premium 'M' - Masterpiece Typography */}
        <g transform="translate(40, 40)">
          {/* Main M structure - Bold and architectural */}
          <path
            d="M-16 -14 L-16 14 M-16 -14 L-4 6 M-4 6 L8 -14 M8 -14 L8 14 M-4 6 L4 -4"
            stroke="#065f46"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="drop-shadow-sm"
          />
          
          {/* Sophisticated inner details */}
          <path
            d="M-14 -10 L-8 2 M6 -10 L10 -2"
            stroke="#059669"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          
          {/* Premium accent lines */}
          <path
            d="M-16 12 L-12 12 M6 12 L10 12"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
          
          {/* Center precision point */}
          <circle
            cx="0"
            cy="2"
            r="1.5"
            fill="#065f46"
            className="drop-shadow-sm"
          />
        </g>

        {/* Precision corner markers - Fortune 500 attention to detail */}
        <g opacity="0.4">
          <path d="M20 20 L24 20 L24 24" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M60 20 L56 20 L56 24" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M20 60 L24 60 L24 56" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M60 60 L56 60 L56 56" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
        </g>

        {/* Gradients for premium finish */}
        <defs>
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ecfdf5" stopOpacity="0.95"/>
            <stop offset="50%" stopColor="#d1fae5" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.85"/>
          </linearGradient>
          
          <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669"/>
            <stop offset="100%" stopColor="#065f46"/>
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981"/>
            <stop offset="100%" stopColor="#059669"/>
          </linearGradient>
          
          <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.6"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="poppins-bold text-3xl text-emerald-800 tracking-tight leading-none">MeridianMetrics</span>
      <span className="poppins-medium text-xs text-emerald-600 tracking-widest uppercase mt-1">
        PPT Compliance Systems
      </span>
    </div>
  </div>
)

export default function MeridianMetricsWebsite() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [dashboardMetrics, setDashboardMetrics] = useState({
    pptLiability: 0,
    complianceScore: 0,
    annualSavings: 0,
    riskExposure: 0,
  })

  // PPT Command Centre Risk Trend Data (6 months)
  const riskTrendData = [
    { month: "Jul", risk: 85, color: "bg-red-500" },
    { month: "Aug", risk: 72, color: "bg-orange-500" },
    { month: "Sep", risk: 58, color: "bg-yellow-500" },
    { month: "Oct", risk: 34, color: "bg-lime-500" },
    { month: "Nov", risk: 18, color: "bg-green-500" },
    { month: "Dec", risk: 8, color: "bg-emerald-500" },
  ]

  useEffect(() => {
    setIsVisible(true)

    // Animate PPT Command Centre metrics
    const animateMetrics = () => {
      const targets = {
        pptLiability: 247850, // £247,850 PPT liability
        complianceScore: 99, // 99% compliance score
        annualSavings: 89400, // £89,400 annual savings
        riskExposure: 8, // 8% current risk exposure
      }

      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setDashboardMetrics({
          pptLiability: Math.round(targets.pptLiability * easeOut),
          complianceScore: Math.round(targets.complianceScore * easeOut),
          annualSavings: Math.round(targets.annualSavings * easeOut),
          riskExposure: Math.round(targets.riskExposure * easeOut),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepDuration)
    }

    const timer = setTimeout(animateMetrics, 1000)

    // Step animation
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(stepInterval)
    }
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-emerald-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-green-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <MeridianLogo size="md" variant="modern" />
            <div className="hidden md:flex items-center space-x-8">
              <Button className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Get Audit-Ready in 30 Days
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Badge className="mb-6 bg-red-100 text-red-800 border-red-200 hover:scale-105 transition-transform duration-300">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="poppins-medium">PPT Compliance Crisis</span>
              </Badge>
              <h1 className="poppins-bold text-6xl lg:text-7xl mb-6 leading-tight">
                <span className="text-emerald-900">Stop PPT penalties.</span>
                <br />
                <span className="text-emerald-600">Start audit-proof systems.</span>
              </h1>
              <p className="poppins-regular text-xl text-emerald-700 mb-8 leading-relaxed">
                Stay ahead of the UK Plastic Packaging Tax. We design PPT systems that keep you compliant, audit-ready, and free to focus on growth.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 group w-fit"
                >
                  Get Audit-Ready in 30 Days
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-4 text-emerald-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="poppins-medium text-sm">15-Min Systems Demo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="poppins-medium text-sm">No-Obligation Diagnosis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="poppins-medium text-sm">Clear Action Plan</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PPT Command Centre Dashboard Mockup */}
            <div
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-105">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="poppins-semibold text-xl text-emerald-900 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                      PPT Command Centre
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="poppins-medium text-sm text-green-700">Live Data</span>
                    </div>
                  </div>

                  {/* Headline KPIs */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-4 border border-emerald-200">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="poppins-bold text-lg text-emerald-700">
                          {formatCurrency(dashboardMetrics.pptLiability)}
                        </span>
                      </div>
                      <p className="poppins-medium text-xs text-emerald-600">Total PPT Liability</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="poppins-bold text-lg text-green-700">{dashboardMetrics.complianceScore}%</span>
                      </div>
                      <p className="poppins-medium text-xs text-green-600">Compliance Score</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span className="poppins-bold text-lg text-blue-700">
                          {formatCurrency(dashboardMetrics.annualSavings)}
                        </span>
                      </div>
                      <p className="poppins-medium text-xs text-blue-600">Annual Savings</p>
                    </div>
                  </div>

                  {/* Risk Trend Module */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="poppins-semibold text-sm text-gray-800">Monthly Risk Exposure</h4>
                      <span className="poppins-medium text-xs text-gray-600">Last 6 Months</span>
                    </div>
                    <div className="flex items-end space-x-2 h-16">
                      {riskTrendData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-full ${data.color} rounded-t transition-all duration-1000 delay-${index * 100}`}
                            style={{ height: `${(data.risk / 100) * 100}%` }}
                          ></div>
                          <span className="poppins-medium text-xs text-gray-600 mt-1">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance Status & Actionable Modules */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Compliance Status */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="poppins-semibold text-sm text-green-800">Status: Audit-Ready</span>
                      </div>
                      <p className="poppins-regular text-xs text-green-600">All systems operational</p>
                    </div>

                    {/* Actionable Sub-Modules */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-emerald-200">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-emerald-600" />
                          <span className="poppins-medium text-xs text-emerald-700">Supplier Data</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-emerald-200">
                        <div className="flex items-center space-x-2">
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          <span className="poppins-medium text-xs text-emerald-700">HMRC Submissions</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between bg-white rounded-lg p-2 border border-emerald-200">
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-emerald-600" />
                          <span className="poppins-medium text-xs text-emerald-700">Audit Trail</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Risk Indicator */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <span className="poppins-bold text-white text-xs">{dashboardMetrics.riskExposure}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Seamlessly blended */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 via-red-50 to-red-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="poppins-bold text-5xl mb-6 text-red-900">The Unseen Costs Bleeding Your Budget</h2>
            <p className="poppins-regular text-xl text-red-700 max-w-3xl mx-auto">
              It's not just a line item. It's the hidden risk that stalls funding rounds, drains operational hours, and puts your reputation on the line with every audit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "💰 £47,000 Penalty Risk",
                description:
                  "One compliance slip can trigger fines your finance team never budgeted.",
                gradient: "from-red-50 to-red-100",
                border: "border-red-200",
                iconColor: "text-red-600",
              },
              {
                icon: XCircle,
                title: "🚫 Funding Deal Killer",
                description: "Investors pull back fast when your compliance data doesn't hold up.",
                gradient: "from-orange-50 to-orange-100",
                border: "border-orange-200",
                iconColor: "text-orange-600",
              },
              {
                icon: Clock,
                title: "⏳ 40+ Hours Lost Monthly",
                description:
                  "Ops teams buried in spreadsheets instead of scaling the business.",
                gradient: "from-yellow-50 to-yellow-100",
                border: "border-yellow-200",
                iconColor: "text-yellow-600",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl border ${item.border} shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group`}
              >
                <CardContent className="p-8 text-center">
                  <item.icon
                    className={`h-12 w-12 ${item.iconColor} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  />
                  <h3 className="poppins-semibold text-xl text-gray-900 mb-3">{item.title}</h3>
                  <p className="poppins-regular text-gray-700">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-emerald-100 text-emerald-800 border-emerald-200">
                <span className="poppins-medium">The PPT Solution</span>
              </Badge>
              <h2 className="poppins-bold text-5xl mb-6 text-emerald-900">Audit-Proof PPT Systems</h2>
              <p className="poppins-regular text-xl text-emerald-700 mb-8">
                We build bulletproof PPT compliance systems that eliminate penalties, satisfy HMRC audits, and unlock
                hidden tax savings. Your operations team gets back 40+ hours monthly.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Automated PPT calculations with 99.9% accuracy",
                  "Real-time compliance monitoring and alerts",
                  "HMRC-ready audit trails and documentation",
                  "Supplier data integration and validation",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <CheckCircle className="h-5 w-5 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                    <span className="poppins-regular text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              >
                Get Audit-Ready in 30 Days
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-emerald-200 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:scale-105">
                <h3 className="poppins-bold text-2xl mb-6 text-emerald-900">What You Get</h3>
                <div className="space-y-6">
                  {[
                    {
                      title: "PPT Command Centre",
                      description: "Real-time dashboard showing liability, compliance score, and savings",
                      icon: BarChart3,
                      color: "text-emerald-600",
                      bg: "bg-emerald-50",
                      border: "border-emerald-200",
                    },
                    {
                      title: "Automated Calculations",
                      description: "AI-powered PPT calculations with built-in HMRC validation",
                      icon: Calculator,
                      color: "text-green-600",
                      bg: "bg-green-50",
                      border: "border-green-200",
                    },
                    {
                      title: "Audit Protection",
                      description: "Complete audit trail with HMRC-compliant documentation",
                      icon: Shield,
                      color: "text-blue-600",
                      bg: "bg-blue-50",
                      border: "border-blue-200",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div
                        className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center border ${item.border} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <div>
                        <h4 className="poppins-semibold text-emerald-900 mb-1">{item.title}</h4>
                        <p className="poppins-regular text-emerald-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-emerald-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="poppins-bold text-5xl mb-6 text-emerald-900">30-Day Implementation Process</h2>
            <p className="poppins-regular text-xl text-emerald-700 max-w-3xl mx-auto">
              We get you audit-ready fast. No lengthy consultations. No theoretical frameworks. Just practical systems
              that work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "Week 1",
                title: "PPT Risk Assessment",
                description: "Complete audit of your current PPT position. Identify immediate risks and quick wins.",
                gradient: "from-emerald-100 to-emerald-200",
                border: "border-emerald-300",
                icon: AlertTriangle,
              },
              {
                step: "Week 2-3",
                title: "System Build & Integration",
                description: "Deploy PPT Command Centre. Integrate supplier data. Build automated calculations.",
                gradient: "from-green-100 to-green-200",
                border: "border-green-300",
                icon: Building,
              },
              {
                step: "Week 4",
                title: "Audit-Ready Validation",
                description: "Complete testing, documentation, and HMRC compliance validation. Go live.",
                gradient: "from-blue-100 to-blue-200",
                border: "border-blue-300",
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 ${
                  activeStep === index ? "scale-110" : "scale-100"
                }`}
              >
                <div
                  className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold transition-all duration-500 bg-gradient-to-br ${item.gradient} border ${item.border} backdrop-blur-xl ${
                    activeStep === index ? "shadow-xl shadow-emerald-500/25 animate-pulse" : ""
                  }`}
                >
                  <item.icon className="w-8 h-8 text-emerald-700" />
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                    activeStep === index
                      ? "bg-emerald-700 text-white poppins-semibold"
                      : "bg-emerald-100 text-emerald-700 poppins-medium"
                  }`}
                >
                  {item.step}
                </div>
                <h3 className="poppins-semibold text-xl text-emerald-900 mb-3 mt-4">{item.title}</h3>
                <p className="poppins-regular text-emerald-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 to-green-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Shield className="w-32 h-32 text-white/20 animate-pulse" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Calculator className="w-24 h-24 text-white/20 animate-pulse delay-1000" />
          </div>
          <div className="absolute top-1/2 left-1/4">
            <FileCheck className="w-16 h-16 text-white/20 animate-pulse delay-2000" />
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="poppins-bold text-5xl mb-6">Stop PPT Penalties. Start Saving Money.</h2>
          <p className="poppins-regular text-xl text-emerald-100 mb-8">
            Every day without proper PPT systems costs you money and increases audit risk. Get audit-ready in 30 days
            with our proven PPT Command Centre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="poppins-semibold bg-white text-emerald-800 hover:bg-emerald-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Book PPT Risk Assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="poppins-medium border-white text-white hover:bg-white hover:text-emerald-800 transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Calculate Your PPT Liability
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 200C200 100 400 300 600 200C800 100 1000 300 1200 200V400H0V200Z" fill="currentColor" />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          {/* Main footer content */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <MeridianLogo size="md" variant="icon" className="text-emerald-400" />
                </div>
                <p className="poppins-regular text-emerald-200 mb-6 text-lg leading-relaxed max-w-md">
                  The UK's leading PPT compliance specialists. We build audit-proof systems that eliminate penalties,
                  satisfy HMRC, and unlock hidden tax savings for operations teams and investors.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors duration-300">
                      <Phone className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="poppins-medium text-emerald-300 text-sm">PPT Hotline</p>
                      <p className="poppins-semibold text-white">+44 (0) 121 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="poppins-medium text-emerald-300 text-sm">PPT Support</p>
                      <p className="poppins-semibold text-white">ppt@meridianmetrics.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 bg-emerald-800 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors duration-300">
                      <MapPin className="h-5 w-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="poppins-medium text-emerald-300 text-sm">Address</p>
                      <p className="poppins-semibold text-white">
                        Birmingham Business Park
                        <br />
                        Birmingham, B37 7YE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PPT Services */}
              <div>
                <h3 className="poppins-bold mb-6 text-white text-lg">PPT Services</h3>
                <div className="space-y-3">
                  {[
                    "PPT Risk Assessment",
                    "Command Centre Setup",
                    "HMRC Audit Support",
                    "Supplier Integration",
                    "Penalty Protection",
                    "Tax Optimization",
                    "Compliance Monitoring",
                    "Emergency PPT Fix",
                  ].map((item, index) => (
                    <div key={index} className="group">
                      <Link
                        href="#"
                        className="poppins-regular text-emerald-200 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span>{item}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div>
                <h3 className="poppins-bold mb-6 text-white text-lg">Company</h3>
                <div className="space-y-3">
                  {[
                    "About Us",
                    "PPT Experts",
                    "Case Studies",
                    "Client Success",
                    "PPT News",
                    "HMRC Updates",
                    "Partnerships",
                    "Contact",
                  ].map((item, index) => (
                    <div key={index} className="group">
                      <Link
                        href="#"
                        className="poppins-regular text-emerald-200 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span>{item}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources & Newsletter */}
              <div>
                <h3 className="poppins-bold mb-6 text-white text-lg">PPT Resources</h3>
                <div className="space-y-3 mb-8">
                  {[
                    "PPT Calculator",
                    "Compliance Checklist",
                    "HMRC Guidelines",
                    "Penalty Guide",
                    "PPT Webinars",
                    "Expert Blog",
                  ].map((item, index) => (
                    <div key={index} className="group">
                      <Link
                        href="#"
                        className="poppins-regular text-emerald-200 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span>{item}</span>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-emerald-800/50 rounded-2xl p-6 border border-emerald-700/50 backdrop-blur-sm">
                  <h4 className="poppins-semibold text-white mb-3 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-emerald-400" />
                    PPT Updates
                  </h4>
                  <p className="poppins-regular text-emerald-200 text-sm mb-4">
                    Get critical PPT updates and penalty alerts.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your email"
                      className="bg-emerald-900/50 border-emerald-600 text-white placeholder-emerald-300 focus:border-emerald-400 focus:ring-emerald-400"
                    />
                    <Button className="poppins-semibold w-full bg-emerald-600 hover:bg-emerald-500 text-white border-0 transition-all duration-300 hover:scale-105">
                      Get PPT Alerts
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-emerald-800">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-8">
                <p className="poppins-regular text-emerald-300 text-sm">
                  &copy; 2025 MeridianMetrics Ltd. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 text-sm">
                  <Link
                    href="#"
                    className="poppins-regular text-emerald-200 hover:text-white transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="#"
                    className="poppins-regular text-emerald-200 hover:text-white transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="#"
                    className="poppins-regular text-emerald-200 hover:text-white transition-colors duration-300"
                  >
                    PPT Disclaimer
                  </Link>
                </div>
              </div>

              {/* Certifications & Social */}
              <div className="flex items-center space-x-6">
                {/* Certifications */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-emerald-300" />
                  </div>
                  <span className="poppins-regular text-emerald-200 text-xs">HMRC Approved</span>
                </div>

                {/* Social Media */}
                <div className="flex items-center space-x-3">
                  {[
                    { name: "LinkedIn", icon: "💼" },
                    { name: "Twitter", icon: "🐦" },
                    { name: "YouTube", icon: "📺" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-emerald-800 hover:bg-emerald-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      title={social.name}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
