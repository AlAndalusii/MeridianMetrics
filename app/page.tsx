"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BadgeCheck,
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
  Trash2,
  Zap,
  Target,
  FileText,
  Archive,
  Activity,
  Wifi,
  Calendar,
  ChevronRight,
  Sparkles,
  Eye,
  Lock,
  ClipboardCheck,
  Book,
  Award,
  Star,
  Users,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CONTACT_INFO } from "@/lib/constants"
import { CalendlyModal } from "@/components/CalendlyWidget"
import { EmailTemplateModal } from "@/components/EmailTemplateModal"
import { MobileMenu } from "@/components/MobileMenu"

// Fortune 500 Premium Logo Component - World-Class Design
const MillstoneComplianceLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
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
        <span className="poppins-bold text-3xl text-emerald-800 tracking-tight leading-none">Millstone Compliance</span>
        <span className="poppins-medium text-xs text-emerald-600 tracking-widest uppercase mt-1">
          EPR • PPT • PRN Experts
        </span>
    </div>
  </div>
)

export default function MillstoneComplianceWebsite() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)
  const [showEmailTemplate, setShowEmailTemplate] = useState(false)
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

    // Scroll detection for popup
    let scrollTimer: NodeJS.Timeout | null = null
    const handleScroll = () => {
      if (!hasScrolled && window.scrollY > 100) {
        setHasScrolled(true)
        
        // Show popup after 6 seconds of scrolling
        scrollTimer = setTimeout(() => {
          setShowCallPopup(true)
        }, 6000)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      clearInterval(stepInterval)
      if (scrollTimer) clearTimeout(scrollTimer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

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
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop Navigation */}
              <Button 
                onClick={() => router.push("/resources")}
                className="poppins-semibold bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px] min-w-[44px] whitespace-nowrap touch-manipulation hidden lg:flex items-center relative overflow-hidden group/resources"
                style={{ 
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <FileCheck className="w-4 h-4 sm:mr-2 relative z-10" />
                <span className="hidden sm:inline relative z-10">Resources</span>
              </Button>
              <Button 
                onClick={() => router.push("/quiz")}
                aria-label="Start your free packaging compliance assessment"
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px] min-w-[44px] whitespace-nowrap touch-manipulation"
                style={{ 
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <span className="hidden xs:inline">START YOUR FREE ASSESSMENT</span>
                <span className="xs:hidden">START ASSESSMENT</span>
              </Button>
              
              {/* Mobile Menu */}
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden group/hero" aria-label="Hero section">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] animate-pulse-slow"></div>
          <div className="absolute top-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(6,95,70,0.02)_0deg,rgba(16,185,129,0.02)_120deg,rgba(6,95,70,0.02)_240deg)] animate-spin-slower"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>

        {/* Premium floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Geometric shapes */}
          <div className="absolute top-1/4 left-10 w-24 h-24 animate-float-slow">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/10 to-emerald-300/5 rounded-[30px] rotate-[10deg] backdrop-blur-sm"></div>
          </div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 animate-float-slow-reverse delay-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/10 to-emerald-300/5 rounded-full backdrop-blur-sm"></div>
          </div>
          
          {/* Light beams */}
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-200/20 to-transparent animate-beam-slide"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-200/20 to-transparent animate-beam-slide-reverse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div
              className={`transition-all duration-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h1 className="poppins-bold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight">
                <span className="text-emerald-900 block">UK Packaging & Waste Compliance.</span>
                <span className="text-emerald-600 block">We find gaps before regulators do.</span>
              </h1>
              <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
                Free 3-minute check. Find missing documents and errors before penalties.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push("/quiz")}
                  className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group w-full sm:w-fit text-sm sm:text-base py-5 sm:py-6 px-6 sm:px-8 min-h-[54px] touch-manipulation"
                  style={{ 
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  START YOUR FREE ASSESSMENT
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-emerald-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="poppins-medium text-xs sm:text-sm">HMRC & EA Background</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="poppins-medium text-xs sm:text-sm">EPR, PPT, PRN & Waste Advisors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="poppins-medium text-xs sm:text-sm">Audit-Ready Systems</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Recycled Plastic Tracking Dashboard */}
            <div
              className={`transition-all duration-200 delay-75 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} mt-8 lg:mt-0`}
            >
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-emerald-200 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 lg:hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="poppins-semibold text-lg text-emerald-900 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-emerald-600" />
                      Packaging Compliance Hub
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="poppins-medium text-xs text-green-700">Live Data</span>
                    </div>
                  </div>

                  {/* Total Packaging Overview - EPR + PPT */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                      <div className="flex items-center justify-between mb-1">
                        <Building className="w-4 h-4 text-blue-600" />
                        <span className="poppins-bold text-base text-blue-700">£284K</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-blue-600">EPR Fees 2025</p>
                      <p className="text-[9px] text-blue-500 mt-0.5">Invoice verified</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                      <div className="flex items-center justify-between mb-1">
                        <BadgeCheck className="w-4 h-4 text-green-600" />
                        <span className="poppins-bold text-base text-green-700">68%</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-green-600">PPT Recycled</p>
                      <p className="text-[9px] text-green-500 mt-0.5">97.1 tonnes verified</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 border border-purple-200">
                      <div className="flex items-center justify-between mb-1">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span className="poppins-bold text-base text-purple-700">High</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-purple-600">2026 Mod Risk</p>
                      <p className="text-[9px] text-purple-500 mt-0.5">Action needed</p>
                    </div>
                  </div>

                  {/* EPR Material Breakdown */}
                  <div className="bg-white rounded-xl p-3 border border-gray-200 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="poppins-semibold text-xs text-gray-800">EPR Material Split</h4>
                      <span className="poppins-medium text-[10px] text-gray-600">2025 Data</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-blue-700 font-semibold">Plastic - Household</span>
                          <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">£156K</span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-1.5">
                          <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '55%'}}></div>
                        </div>
                        <span className="text-[9px] text-blue-600 mt-0.5">89.4 tonnes • PET bottles</span>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-green-700 font-semibold">Plastic - Non-household</span>
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">£89K</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: '31%'}}></div>
                        </div>
                        <span className="text-[9px] text-green-600 mt-0.5">53.1 tonnes • B2B packaging</span>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-amber-700 font-semibold">Paper/Card/Glass</span>
                          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">£39K</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '14%'}}></div>
                        </div>
                        <span className="text-[9px] text-amber-600 mt-0.5">Mixed materials</span>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status - EPR + PPT */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* EPR Status */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1.5 border border-blue-200">
                        <div className="flex items-center space-x-1.5">
                          <FileCheck className="w-3 h-3 text-blue-600" />
                          <span className="poppins-medium text-[10px] text-blue-700">EPR Invoice</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Verified</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <BadgeCheck className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">PPT Certificates</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">30 Valid</span>
                      </div>
                      <div className="flex items-center justify-between bg-purple-50 rounded-lg p-1.5 border border-purple-200">
                        <div className="flex items-center space-x-1.5">
                          <TrendingUp className="w-3 h-3 text-purple-600" />
                          <span className="poppins-medium text-[10px] text-purple-700">PRN Strategy</span>
                        </div>
                        <span className="text-[9px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">Active</span>
                      </div>
                    </div>

                    {/* Savings & Actions */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <DollarSign className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">EPR Savings</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">£45K</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <Calculator className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">Invoices Audited</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">127</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1.5 border border-blue-200">
                        <div className="flex items-center space-x-1.5">
                          <BarChart3 className="w-3 h-3 text-blue-600" />
                          <span className="poppins-medium text-[10px] text-blue-700">View Dashboard</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Export</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Compliance Score Indicator */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-bounce delay-1000 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <span className="poppins-bold text-white text-[11px] block">94%</span>
                    <span className="poppins-medium text-white text-[7px]">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Assessment Section - World-Class Consultancy Design */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/assessment" aria-labelledby="assessment-heading">
        {/* Sophisticated background elements matching site theme */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs - emerald theme */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-emerald-200/20 via-green-100/10 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-emerald-300/15 via-emerald-100/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          
          {/* Premium radial gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] animate-pulse-slow"></div>
          
          {/* Conic gradient for depth */}
          <div className="absolute top-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(6,95,70,0.02)_0deg,rgba(16,185,129,0.02)_120deg,rgba(6,95,70,0.02)_240deg)] animate-spin-slower"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
          
          {/* Scanning line effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent animate-scan"></div>
          </div>
        </div>

        {/* Floating Data Visualization Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated floating cards - Hidden on mobile to prevent collision */}
          <div className="hidden md:block absolute top-20 right-[10%] w-32 h-24 bg-white/60 backdrop-blur-md rounded-xl border border-emerald-100/50 shadow-lg animate-float-slow p-4">
            <div className="text-xs text-emerald-600 poppins-semibold mb-1">Compliance</div>
            <div className="text-2xl poppins-bold text-emerald-900">94%</div>
            <div className="w-full bg-emerald-100 h-1 rounded-full mt-2">
              <div className="bg-emerald-500 h-1 rounded-full" style={{width: '94%'}}></div>
            </div>
          </div>
          
          <div className="hidden md:block absolute bottom-32 left-[8%] w-36 h-28 bg-white/60 backdrop-blur-md rounded-xl border border-green-100/50 shadow-lg animate-float-slow-reverse p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-green-600 poppins-semibold">Risk Score</div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-2xl poppins-bold text-emerald-900">Low</div>
            <div className="flex gap-1 mt-2">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i <= 2 ? 'bg-emerald-400' : 'bg-emerald-100'}`}></div>
              ))}
            </div>
          </div>

          {/* Geometric accent shapes - emerald theme */}
          <div className="absolute top-1/3 left-[15%] w-20 h-20 opacity-30">
            <div className="absolute inset-0 border-2 border-emerald-300 rounded-lg animate-spin-slow"></div>
            <div className="absolute inset-2 border-2 border-green-300 rounded-lg animate-spin-slow-reverse"></div>
          </div>
          
          <div className="absolute bottom-1/4 right-[12%] w-24 h-24 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full blur-xl animate-pulse-slow"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Premium Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Alert Badge - Enhanced */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/80 to-amber-50 backdrop-blur-xl border border-amber-200/60 shadow-[0_8px_32px_rgba(251,191,36,0.15)] mb-6 sm:mb-8 md:mb-10 group-hover/assessment:scale-105 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-white/40 to-amber-100/0 animate-shine"></div>
              <div className="absolute inset-0 animate-pulse-slow">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-amber-300/30"></div>
              </div>
              <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 mr-2 sm:mr-3 animate-pulse relative z-10" />
              <span className="poppins-semibold text-xs sm:text-sm text-amber-900 tracking-wide uppercase relative z-10">Intelligence Assessment</span>
              <div className="ml-2 sm:ml-3 px-2 py-1 bg-amber-200/50 rounded-full relative z-10">
                <span className="text-[10px] sm:text-xs text-amber-900 font-bold">3 MIN</span>
              </div>
            </div>
            
            {/* Headline - Ultra Premium */}
            <h2 id="assessment-heading" className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 md:mb-8 text-emerald-900 tracking-tight relative animate-fade-in-up leading-[1.1]">
              Your Compliance Intelligence
              <span className="block mt-2 sm:mt-3 leading-tight pb-2 sm:pb-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                Diagnostic Report
              </span>
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </h2>
            
            {/* Enhanced Description */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
              Our free 3-minute assessment identifies compliance gaps across UK packaging (PPT, EPR, PRN, WEEE) and waste regulations (Duty of Care, Digital Tracking, Simpler Recycling). In most businesses we review, <span className="poppins-semibold text-emerald-800">7 out of 10 have gaps</span> that could lead to penalties.
            </p>
            
            {/* Stats Bar - New Addition */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">4</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Regimes</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-emerald-200"></div>
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">15</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Questions</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-emerald-200"></div>
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">3</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Minutes</div>
              </div>
            </div>
          </div>

          {/* Assessment Areas - Enhanced Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
          {[
            {
              icon: Building,
              title: "EPR Invoice Audit",
              description: "We check EPR invoices and scope, confirm household / non-household splits and flag overcharges or missing tonnages before you pay.",
              stat: "£45K Avg Savings",
              gradient: "from-blue-50/90 to-blue-100/90",
              delay: "delay-0",
              accentColor: "blue",
            },
            {
              icon: FileCheck,
              title: "PPT Certificate Check",
              description: "We confirm PPT certificates, recycled-content claims and links to product lines so you avoid missing-document challenges in an HMRC review.",
              stat: "127 Invoices Verified",
              gradient: "from-emerald-50/80 to-emerald-100/80",
              delay: "delay-100",
              accentColor: "emerald",
            },
            {
              icon: TrendingUp,
              title: "PRN & 2026 Strategy",
              description: "We review your PRN position, link it to your packaging data and model 2026 fee modulation so you can plan contracts and budgets early.",
              stat: "2026 Fee Forecast",
              gradient: "from-purple-50/70 to-purple-100/70",
              delay: "delay-200",
              accentColor: "purple",
            },
          ].map((item, index) => (
              <div
                key={index}
                className={`group/card relative ${item.delay} animate-fade-in-up`}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/5 to-emerald-400/0 rounded-3xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                
                {/* Main card */}
                <div className={`relative bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-emerald-200/60 shadow-[0_8px_32px_rgba(6,95,70,0.08)] hover:shadow-[0_20px_60px_rgba(6,95,70,0.15)] transition-all duration-700 sm:hover:-translate-y-3 overflow-hidden`}>
                  {/* Animated border shimmer */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-emerald-200/20 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-5 sm:p-6 md:p-8">
                    {/* Icon container with floating effect */}
                    <div className="relative mb-4 sm:mb-5 md:mb-6 w-fit mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-400/20 rounded-2xl blur-xl group-hover/card:blur-2xl transition-all duration-700"></div>
                      <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-${item.accentColor}-100 to-${item.accentColor}-50 rounded-2xl flex items-center justify-center border border-${item.accentColor}-200/50 shadow-lg group-hover/card:shadow-xl group-hover/card:scale-110 transition-all duration-500`}>
                        <item.icon className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-${item.accentColor}-600 group-hover/card:scale-110 transition-transform duration-500`} />
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                        <span className="text-white text-[10px] sm:text-xs poppins-bold">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="poppins-semibold text-base sm:text-lg md:text-xl text-emerald-900 mb-2 sm:mb-3 group-hover/card:text-emerald-700 transition-colors duration-300">{item.title}</h3>
                    
                    {/* Description */}
                    <p className="poppins-regular text-emerald-700 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm">{item.description}</p>
                    
                    {/* Stat badge */}
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 border border-emerald-200/50 group-hover/card:bg-emerald-50 group-hover/card:border-emerald-300/50 transition-all duration-300">
                      <div className={`w-1.5 h-1.5 bg-${item.accentColor}-500 rounded-full mr-2 animate-pulse`}></div>
                      <span className="text-xs poppins-semibold text-emerald-700 group-hover/card:text-emerald-800 transition-colors duration-300">{item.stat}</span>
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-100">
                    <div className={`h-1 bg-gradient-to-r from-${item.accentColor}-400 to-${item.accentColor}-500 transition-all duration-700 group-hover/card:w-full`} style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA Section */}
          <div className="text-center relative">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-emerald-200/10 via-green-200/10 to-emerald-200/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative">
              {/* Main CTA Button */}
              <Button
                size="lg"
                onClick={() => router.push("/quiz")}
                className="poppins-semibold bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-600 bg-[length:200%_100%] hover:bg-[length:100%_100%] active:scale-95 text-white border-0 shadow-[0_20px_60px_rgba(6,95,70,0.25)] hover:shadow-[0_25px_70px_rgba(6,95,70,0.35)] transition-all duration-700 sm:hover:scale-105 group/cta px-8 sm:px-10 md:px-12 py-5 sm:py-6 md:py-7 text-base sm:text-lg relative overflow-hidden animate-fade-in-up delay-300 w-full sm:w-auto min-h-[54px]"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  <span className="mr-3">START YOUR FREE ASSESSMENT</span>
                  <ArrowRight className="h-6 w-6 group-hover/cta:translate-x-2 transition-transform duration-500" />
                </span>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-lg border-2 border-white/20 animate-pulse-slow"></div>
                </div>
              </Button>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm text-emerald-600 animate-fade-in-up delay-400">
                <div className="flex items-center gap-2 group/trust">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 group-hover/trust:scale-110 transition-transform duration-300">
                    <Clock className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="poppins-medium">3 minutes</span>
                </div>
                <div className="w-px h-4 bg-emerald-200"></div>
                <div className="flex items-center gap-2 group/trust">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 group-hover/trust:scale-110 transition-transform duration-300">
                    <BadgeCheck className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="poppins-medium">No card required</span>
                </div>
                <div className="w-px h-4 bg-emerald-200"></div>
                <div className="flex items-center gap-2 group/trust">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 group-hover/trust:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="poppins-medium">Instant results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Regulations Section - Matching Site Design */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden group/regulations" aria-labelledby="regulations-heading">
        {/* Sophisticated background elements matching site theme */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs - emerald theme */}
          <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-emerald-200/20 via-green-100/15 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-green-300/15 via-emerald-100/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
          
          {/* Radial gradient depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.04)_0%,transparent_65%)] animate-pulse-slow"></div>
          
          {/* Conic gradient rotation */}
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.02)_0deg,rgba(34,197,94,0.02)_120deg,rgba(16,185,129,0.02)_240deg)] animate-spin-slower"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>

        {/* Floating geometric elements - matching site style */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="hidden md:block absolute top-20 right-[10%] w-20 h-20 opacity-20">
            <div className="absolute inset-0 border-2 border-emerald-300 rounded-lg animate-spin-slow"></div>
            <div className="absolute inset-2 border-2 border-green-300 rounded-lg animate-spin-slow-reverse"></div>
          </div>
          <div className="hidden md:block absolute bottom-32 left-[8%] w-24 h-24 opacity-15">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-green-200/40 rounded-full blur-xl animate-pulse-slow"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Premium Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* Badge matching site style */}
            <div className="inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-emerald-100/80 to-emerald-50 backdrop-blur-xl border border-emerald-200/70 shadow-[0_8px_32px_rgba(16,185,129,0.15)] mb-6 sm:mb-8 md:mb-10 group-hover/regulations:scale-105 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/0 via-white/50 to-emerald-100/0 animate-shine"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse relative z-10"></div>
              <span className="poppins-semibold text-xs sm:text-sm text-emerald-900 tracking-wide uppercase relative z-10">UK Compliance Framework</span>
            </div>
            
            {/* Main Headline - matching site typography */}
            <h2 id="regulations-heading" className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-5 sm:mb-7 md:mb-9 text-emerald-900 tracking-tight relative animate-fade-in-up leading-[1.1]">
              Waste Regulations
              <span className="block mt-2 sm:mt-3 leading-tight pb-2 sm:pb-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                Simplified
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 animate-fade-in-up delay-100">
              Navigate complex UK waste legislation with clarity. From hazardous waste to digital tracking, 
              <span className="poppins-semibold text-emerald-800"> every regulation explained</span>.
            </p>
          </div>

          {/* Regulations Grid - Premium Cards matching site style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            
            {/* Hazardous Waste Regulations Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-amber-200/50 rounded-2xl overflow-hidden hover:border-amber-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(245,158,11,0.2)] animate-fade-in-up">
              {/* Card shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white/50 to-amber-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                {/* Icon Container */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-amber-700" />
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Critical</Badge>
                </div>
                
                {/* Title */}
                <h3 className="poppins-bold text-2xl sm:text-3xl text-amber-900 mb-4 group-hover/reg:text-amber-800 transition-colors duration-300">
                  Hazardous Waste
                </h3>
                
                {/* Description */}
                <p className="text-amber-800 poppins-regular text-base leading-relaxed mb-6">
                  Strict documentation requirements for dangerous materials. Legal compliance isn't optional.
                </p>
                
                {/* Requirements List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900 text-sm poppins-medium">Consignment notes for every movement</span>
                  </div>
                  <div className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Archive className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900 text-sm poppins-medium">3-year record retention mandatory</span>
                  </div>
                  <div className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <ClipboardCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900 text-sm poppins-medium">Pre-acceptance audits required</span>
                  </div>
                </div>
                
                {/* Visual Mockup */}
                <div className="relative h-48 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 overflow-hidden group-hover/reg:border-amber-300 transition-colors duration-500 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-3 p-6">
                      <div className="w-16 h-16 rounded-lg bg-white border-2 border-amber-300 mx-auto flex items-center justify-center shadow-lg">
                        <FileCheck className="w-8 h-8 text-amber-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-32 bg-amber-200 rounded mx-auto"></div>
                        <div className="h-2 w-24 bg-amber-100 rounded mx-auto"></div>
                      </div>
                    </div>
                  </div>
                  {/* Document overlay effect */}
                  <div className="absolute top-4 right-4 w-8 h-10 bg-white/80 border border-amber-300 rounded transform rotate-6 shadow-md"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-10 bg-white/80 border border-amber-300 rounded transform -rotate-3 shadow-md"></div>
                </div>
              </div>
              
              {/* Bottom accent */}
              <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400"></div>
            </div>

            {/* Duty of Care Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-2xl overflow-hidden hover:border-green-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(34,197,94,0.2)] animate-fade-in-up delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/50 to-green-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 border border-green-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <Book className="w-7 h-7 text-green-700" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Foundational</Badge>
                </div>
                
                <h3 className="poppins-bold text-2xl sm:text-3xl text-green-900 mb-4 group-hover/reg:text-green-800 transition-colors duration-300">
                  Duty of Care
                </h3>
                
                <p className="text-green-800 poppins-regular text-base leading-relaxed mb-6">
                  EPA 1990 Section 34 establishes your fundamental responsibilities. The bedrock of waste compliance.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-900 text-sm poppins-medium">Waste transfer notes for all waste</span>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-900 text-sm poppins-medium">Verified carrier registration</span>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-900 text-sm poppins-medium">Prevent unauthorized disposal</span>
                  </div>
                </div>
                
                {/* Visual Mockup */}
                <div className="relative h-48 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 overflow-hidden group-hover/reg:border-green-300 transition-colors duration-500 shadow-inner">
                  <div className="absolute inset-0 p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-green-200 shadow-sm">
                        <div className="w-10 h-10 rounded bg-green-100 border border-green-300 flex items-center justify-center flex-shrink-0">
                          <Building className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 w-24 bg-green-200 rounded"></div>
                          <div className="h-1.5 w-16 bg-green-100 rounded"></div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <ChevronRight className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/80 rounded-lg border border-green-200 shadow-sm">
                        <div className="w-10 h-10 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0">
                          <Trash2 className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 w-20 bg-green-200 rounded"></div>
                          <div className="h-1.5 w-14 bg-green-100 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>
            </div>

            {/* Digital Waste Tracking Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-emerald-200/50 rounded-2xl overflow-hidden hover:border-emerald-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)] animate-fade-in-up delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white/50 to-emerald-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <Wifi className="w-7 h-7 text-emerald-700" />
                  </div>
                  <Badge className="bg-red-100 text-red-700 border-red-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Oct 2026</Badge>
                </div>
                
                <h3 className="poppins-bold text-2xl sm:text-3xl text-emerald-900 mb-4 group-hover/reg:text-emerald-800 transition-colors duration-300">
                  Digital Waste Tracking
                </h3>
                
                <p className="text-emerald-800 poppins-regular text-base leading-relaxed mb-6">
                  Paper records end October 2026. Mandatory electronic tracking connects waste producers to final destination.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Database className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-emerald-900 text-sm poppins-medium">Electronic record-keeping mandatory</span>
                  </div>
                  <div className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Activity className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-emerald-900 text-sm poppins-medium">Real-time waste movement tracking</span>
                  </div>
                  <div className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Calendar className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-emerald-900 text-sm poppins-medium">Prepare systems before deadline</span>
                  </div>
                </div>
                
                {/* Visual Mockup - Digital Interface */}
                <div className="relative h-48 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 overflow-hidden group-hover/reg:border-emerald-300 transition-colors duration-500 shadow-inner">
                  <div className="absolute inset-0 p-6">
                    {/* Simulated digital tracking interface */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-white/80 rounded-lg border border-emerald-300 shadow-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <div className="h-2 w-20 bg-emerald-200 rounded"></div>
                        </div>
                        <div className="h-2 w-12 bg-emerald-300 rounded"></div>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-white/60 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          <div className="h-2 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-2 w-10 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-white/60 rounded-lg border border-emerald-200">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                          <div className="h-2 w-16 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-2 w-14 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    {/* Digital wave effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-emerald-200/50 to-transparent"></div>
                  </div>
                </div>
              </div>
              
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400"></div>
            </div>

            {/* Clinical Waste Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-rose-200/50 rounded-2xl overflow-hidden hover:border-rose-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(244,63,94,0.2)] animate-fade-in-up delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white/50 to-rose-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 border border-rose-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <Activity className="w-7 h-7 text-rose-700" />
                  </div>
                  <Badge className="bg-rose-100 text-rose-700 border-rose-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Healthcare</Badge>
                </div>
                
                <h3 className="poppins-bold text-2xl sm:text-3xl text-rose-900 mb-4 group-hover/reg:text-rose-800 transition-colors duration-300">
                  Clinical Waste
                </h3>
                
                <p className="text-rose-800 poppins-regular text-base leading-relaxed mb-6">
                  HTM 07-01 sets the standard for healthcare waste management. Stringent protocols protect public health.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">HTM 07-01 compliance mandatory</span>
                  </div>
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">Segregation and color-coding</span>
                  </div>
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">Secure storage and disposal</span>
                  </div>
                </div>
                
                {/* Visual Mockup - Color-coded bins */}
                <div className="relative h-48 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 overflow-hidden group-hover/reg:border-rose-300 transition-colors duration-500 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center gap-4 p-6">
                    {/* Color-coded waste bins visualization */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-20 rounded-lg bg-gradient-to-b from-amber-200 to-amber-300 border-2 border-amber-400 shadow-md"></div>
                      <div className="h-1.5 w-12 bg-amber-300 rounded"></div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-20 rounded-lg bg-gradient-to-b from-rose-300 to-rose-400 border-2 border-rose-500 shadow-md"></div>
                      <div className="h-1.5 w-12 bg-rose-300 rounded"></div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-20 rounded-lg bg-gradient-to-b from-blue-200 to-blue-300 border-2 border-blue-400 shadow-md"></div>
                      <div className="h-1.5 w-12 bg-blue-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-1.5 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-400"></div>
            </div>

          </div>

          {/* Featured Tool - Simpler Recycling Gap Analyser */}
          <div className="flex justify-center items-center relative animate-fade-in-up delay-400">
            <div className="rounded-3xl bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 overflow-hidden shadow-2xl shadow-green-900/20 relative w-full max-w-4xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 sm:p-10">
                {/* Score visual */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="relative w-28 h-28">
                    <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="10"
                        strokeDasharray="314" strokeDashoffset="94" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="poppins-black text-3xl text-white leading-none">7</span>
                      <span className="text-green-300 poppins-medium text-xs">/10</span>
                    </div>
                  </div>
                  <span className="poppins-semibold text-xs text-green-300 mt-2 text-center">AI Compliance Score</span>
                </div>

                {/* Text */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/30 border border-green-400/40 mb-3">
                    <Zap className="w-3 h-3 text-green-300" />
                    <span className="poppins-semibold text-xs text-green-200 uppercase tracking-wide">Featured Tool — Free</span>
                  </div>
                  <h2 className="poppins-bold text-white text-2xl sm:text-3xl mb-3 leading-tight">
                    Simpler Recycling Gap Analyser
                  </h2>
                  <p className="poppins-regular text-green-200 text-base leading-relaxed mb-5 max-w-xl">
                    Answer 10 questions and our Gemini AI scores your Simpler Recycling compliance 0–10, identifies your top 3 penalty risks, and emails you a personalised action plan — in under 3 minutes.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-green-300 mb-6">
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Under 3 minutes</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Powered by Gemini AI</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Free · Results emailed</div>
                    <div className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5" />Traffic-light scoring</div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link
                      href="/simpler-recycling-gap-analyser"
                      className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group/btn text-sm"
                    >
                      <BarChart3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Analyse My Compliance Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                    <button
                      onClick={() => {
                        const element = document.getElementById('recycling-heading')
                        element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      className="inline-flex items-center justify-center gap-2 poppins-semibold bg-white/15 hover:bg-white/25 text-white border border-white/30 px-6 py-4 rounded-2xl transition-all duration-300 text-sm"
                    >
                      Read the Guide
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simpler Recycling Section - World-Class Design */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-white via-green-50/40 to-white relative overflow-hidden group/recycling" aria-labelledby="recycling-heading">
        {/* Sophisticated animated background */}
        <div className="absolute inset-0">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-green-200/20 via-emerald-100/15 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-green-300/15 via-green-100/10 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
          
          {/* Radial gradient depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.04)_0%,transparent_65%)] animate-pulse-slow"></div>
          
          {/* Conic gradient rotation */}
          <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(34,197,94,0.02)_0deg,rgba(16,185,129,0.02)_120deg,rgba(34,197,94,0.02)_240deg)] animate-spin-slower"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.02)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
          
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Deadline Alert Card - Floating */}
          <div className="hidden lg:block absolute top-24 right-[8%] w-40 h-32 bg-white/70 backdrop-blur-xl rounded-2xl border border-red-200/60 shadow-[0_8px_32px_rgba(239,68,68,0.12)] animate-float-slow p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="text-[10px] text-red-600 poppins-semibold uppercase tracking-wider">Alert</div>
            </div>
            <div className="text-2xl poppins-bold text-red-600 mb-1">31 Mar</div>
            <div className="text-xs poppins-medium text-red-700">Deadline Passed</div>
            <div className="mt-2 w-full h-1 bg-red-100 rounded-full overflow-hidden">
              <div className="h-1 bg-red-500 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
          
          {/* Compliance Status Card - Floating */}
          <div className="hidden lg:block absolute bottom-32 left-[6%] w-44 h-36 bg-white/70 backdrop-blur-xl rounded-2xl border border-green-200/60 shadow-[0_8px_32px_rgba(34,197,94,0.12)] animate-float-slow-reverse p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-green-700 poppins-semibold">Businesses</div>
              <Trash2 className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-3xl poppins-bold text-green-600 mb-1">3</div>
            <div className="text-xs poppins-medium text-green-700 mb-3">Waste Streams Required</div>
            <div className="flex gap-1">
              {[1,2,3].map((i) => (
                <div key={i} className="flex-1 h-2 rounded-full bg-green-500/80"></div>
              ))}
            </div>
          </div>

          {/* Geometric shapes */}
          <div className="absolute top-1/3 left-[18%] w-24 h-24 opacity-25">
            <div className="absolute inset-0 border-2 border-green-300 rounded-lg animate-spin-slow"></div>
            <div className="absolute inset-3 border-2 border-green-400 rounded-lg animate-spin-slow-reverse"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Premium Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            {/* New Regulation Badge */}
            <div className="inline-flex items-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-red-50 via-red-100/80 to-red-50 backdrop-blur-xl border border-red-200/70 shadow-[0_8px_32px_rgba(239,68,68,0.15)] mb-6 sm:mb-8 md:mb-10 group-hover/recycling:scale-105 transition-all duration-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-100/0 via-white/50 to-red-100/0 animate-shine"></div>
              <div className="absolute inset-0 animate-pulse-slow">
                <div className="absolute inset-0 rounded-2xl border border-red-300/40"></div>
              </div>
              <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-red-600 mr-2 sm:mr-3 animate-pulse relative z-10" />
              <span className="poppins-semibold text-xs sm:text-sm text-red-900 tracking-wide uppercase relative z-10">New Regulation Alert</span>
              <div className="ml-2 sm:ml-3 px-2.5 py-1 bg-red-200/60 rounded-full relative z-10">
                <span className="text-[10px] sm:text-xs text-red-900 font-bold">2025</span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h2 id="recycling-heading" className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-5 sm:mb-7 md:mb-9 text-green-900 tracking-tight relative animate-fade-in-up leading-[1.1]">
              Simpler Recycling
              <span className="block mt-2 sm:mt-3 leading-tight pb-2 sm:pb-3 bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                Are You Breaking the Law?
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-green-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 animate-fade-in-up delay-100">
              Deadline was <span className="poppins-semibold text-red-600">31 March 2025</span>. All UK businesses with 10+ employees must now separate waste into <span className="poppins-semibold text-green-800">3 bins</span>. Environment Agency inspections have started.
            </p>
            
            {/* Critical Stats Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 animate-fade-in-up delay-200">
              <div className="group/stat text-center">
                <div className="text-3xl sm:text-4xl poppins-bold text-red-600 group-hover/stat:scale-110 transition-transform duration-300">31 Mar</div>
                <div className="text-[10px] sm:text-xs text-red-700 poppins-medium uppercase tracking-wide mt-1">Deadline Passed</div>
              </div>
              <div className="w-px h-12 sm:h-14 bg-green-200"></div>
              <div className="group/stat text-center">
                <div className="text-3xl sm:text-4xl poppins-bold text-green-600 group-hover/stat:scale-110 transition-transform duration-300">3</div>
                <div className="text-[10px] sm:text-xs text-green-700 poppins-medium uppercase tracking-wide mt-1">Waste Streams</div>
              </div>
              <div className="w-px h-12 sm:h-14 bg-green-200"></div>
              <div className="group/stat text-center">
                <div className="text-3xl sm:text-4xl poppins-bold text-green-600 group-hover/stat:scale-110 transition-transform duration-300">£118</div>
                <div className="text-[10px] sm:text-xs text-green-700 poppins-medium uppercase tracking-wide mt-1">Per Hour Fine</div>
              </div>
            </div>
          </div>

          {/* What We Do - Minimal Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            {[
              {
                icon: Target,
                title: "Check Your Setup",
                description: "We visit your site, count your bins, check your waste contractor, and tell you if you're compliant.",
                stat: "14-Day Fix",
                gradient: "from-green-50/90 to-green-100/90",
                accentColor: "green",
                delay: "delay-0",
              },
              {
                icon: Trash2,
                title: "3-Bin System",
                description: "Dry recyclables, food waste, and general waste. We set up the bins, signage, and staff training.",
                stat: "Ready in 7 Days",
                gradient: "from-emerald-50/90 to-emerald-100/90",
                accentColor: "emerald",
                delay: "delay-100",
              },
              {
                icon: BadgeCheck,
                title: "Inspection Ready",
                description: "Environment Agency can visit any time. We make sure you have labeled bins, records, and proof.",
                stat: "Zero Fines",
                gradient: "from-blue-50/90 to-blue-100/90",
                accentColor: "blue",
                delay: "delay-200",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group/card relative ${item.delay} animate-fade-in-up`}
              >
                {/* Card glow */}
                <div className="absolute -inset-2 bg-gradient-to-br from-green-400/0 via-green-400/10 to-green-400/0 rounded-3xl blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"></div>
                
                {/* Main card */}
                <div className={`relative bg-gradient-to-br ${item.gradient} backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-green-200/60 shadow-[0_8px_32px_rgba(34,197,94,0.08)] hover:shadow-[0_20px_60px_rgba(34,197,94,0.15)] transition-all duration-700 sm:hover:-translate-y-3 overflow-hidden`}>
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-green-200/30 to-transparent animate-shimmer"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-6 sm:p-7 md:p-8">
                    {/* Icon */}
                    <div className="relative mb-5 sm:mb-6 w-fit mx-auto">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-400/10 rounded-2xl blur-xl group-hover/card:blur-2xl transition-all duration-700"></div>
                      <div className={`relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-${item.accentColor}-100 to-${item.accentColor}-50 rounded-2xl flex items-center justify-center border border-${item.accentColor}-200/50 shadow-lg group-hover/card:shadow-2xl group-hover/card:scale-110 transition-all duration-500`}>
                        <item.icon className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-${item.accentColor}-600 group-hover/card:scale-110 transition-transform duration-500`} />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="poppins-semibold text-lg sm:text-xl text-green-900 mb-3 text-center group-hover/card:text-green-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="poppins-regular text-green-700 leading-relaxed mb-4 text-sm text-center">
                      {item.description}
                    </p>
                    
                    {/* Stat badge */}
                    <div className="flex justify-center">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/90 border border-green-200/50 group-hover/card:bg-green-50 group-hover/card:border-green-300/50 transition-all duration-300">
                        <div className={`w-1.5 h-1.5 bg-${item.accentColor}-500 rounded-full mr-2 animate-pulse`}></div>
                        <span className="text-xs poppins-semibold text-green-700 group-hover/card:text-green-800 transition-colors duration-300">
                          {item.stat}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom progress line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-100">
                    <div className={`h-1 bg-gradient-to-r from-${item.accentColor}-400 to-${item.accentColor}-500 w-0 group-hover/card:w-full transition-all duration-700`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="text-center relative animate-fade-in-up delay-300">
            {/* Glow effect behind CTA */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-green-200/15 via-green-300/20 to-green-200/15 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative">
              {/* Main CTA Button */}
              <Link href="/simpler-recycling-gap-analyser">
                <Button
                  size="lg"
                  className="poppins-semibold bg-gradient-to-r from-green-600 via-green-700 to-green-600 bg-[length:200%_100%] hover:bg-[length:100%_100%] active:scale-95 text-white border-0 shadow-[0_20px_60px_rgba(34,197,94,0.3)] hover:shadow-[0_25px_70px_rgba(34,197,94,0.4)] transition-all duration-700 sm:hover:scale-105 group/cta px-8 sm:px-12 md:px-14 py-6 sm:py-7 md:py-8 text-base sm:text-lg md:text-xl relative overflow-hidden w-full sm:w-auto min-h-[60px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 sm:w-6 sm:h-6 mr-3" />
                    <span>Check If You're Compliant</span>
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 ml-3 group-hover/cta:translate-x-2 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30 animate-pulse-slow"></div>
                  </div>
                </Button>
              </Link>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 text-xs sm:text-sm text-green-700">
                <div className="flex items-center gap-2 group/trust">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center border border-green-200 group-hover/trust:scale-110 transition-transform duration-300">
                    <Clock className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="poppins-medium">2 minutes</span>
                </div>
                <div className="w-px h-4 bg-green-200"></div>
                <div className="flex items-center gap-2 group/trust">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center border border-green-200 group-hover/trust:scale-110 transition-transform duration-300">
                    <BadgeCheck className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="poppins-medium">Free assessment</span>
                </div>
                <div className="w-px h-4 bg-green-200"></div>
                <div className="flex items-center gap-2 group/trust">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center border border-red-200 group-hover/trust:scale-110 transition-transform duration-300">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  </div>
                  <span className="poppins-medium">Deadline passed</span>
                </div>
              </div>

              {/* Gap Analyser CTA */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <Link href="/simpler-recycling-gap-analyser">
                  <Button
                    variant="outline"
                    className="poppins-semibold border-2 border-green-500 text-green-700 hover:bg-green-50 hover:border-green-600 px-8 py-4 text-sm rounded-xl transition-all group/gap"
                  >
                    <BarChart3 className="w-4 h-4 mr-2 group-hover/gap:scale-110 transition-transform" />
                    Try the Gap Analyser — AI-Scored Report
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/gap:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Urgency message */}
              <div className="mt-4 inline-flex items-center px-5 py-3 rounded-xl bg-red-50/80 border border-red-200/60 backdrop-blur-sm">
                <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                <span className="poppins-medium text-sm text-red-800">
                  Environment Agency can inspect any time
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Ultra Premium Apple/Fortune 500 Design */}
      <section id="process" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden group/process">
        {/* Apple-inspired minimal background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Floating premium data visualization */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Glassmorphic floating progress indicator - Hidden on mobile to prevent collision */}
          <div className="hidden lg:block absolute top-32 right-[8%] w-36 h-32 bg-white/60 backdrop-blur-2xl rounded-2xl border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] animate-float-slow p-4">
            <div className="text-[10px] text-emerald-600 poppins-semibold uppercase tracking-wider mb-2">Progress</div>
            <div className="flex items-baseline gap-1 mb-3">
              <div className="text-3xl poppins-bold text-emerald-900">3</div>
              <div className="text-sm text-emerald-600 poppins-medium">Steps</div>
            </div>
            <div className="flex gap-1.5">
              {[1,2,3].map((i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{width: i <= activeStep + 1 ? '100%' : '0%', transition: 'width 0.5s'}}></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Geometric accent shapes */}
          <div className="absolute bottom-40 left-[6%] w-28 h-28 opacity-20">
            <div className="absolute inset-0 border border-emerald-200 rounded-2xl animate-spin-slow"></div>
            <div className="absolute inset-4 border border-emerald-300/50 rounded-xl animate-spin-slow-reverse"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Premium header */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-50/80 backdrop-blur-xl border border-emerald-100/50 mb-4 sm:mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
              <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">Our Process</span>
            </div>
            <h2 className="poppins-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-emerald-900 tracking-tight">How We Work</h2>
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed px-4">
              No jargon. No long meetings. Just clear steps to get you compliant.
            </p>
          </div>

          {/* Premium steps with connecting line */}
          <div className="relative">
            {/* Connecting line - hidden on mobile */}
            <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-shimmer"></div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative">
              {[
                {
                  step: "Quick Check",
                  title: "Quick Check",
                  description: "90-minute call. We find your top 3 issues and give you a fix-it checklist.",
                  icon: AlertTriangle,
                  accentColor: "emerald",
                },
                {
                  step: "Full Review",
                  title: "Full Review",
                  description: "We check all your records, find every gap, and tell you exactly what to fix.",
                  icon: Building,
                  accentColor: "green",
                },
                {
                  step: "Ongoing Support",
                  title: "Ongoing Support",
                  description: "Quarterly monitoring. We track deadlines and changes so you don't miss anything.",
                  icon: CheckCircle,
                  accentColor: "blue",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group/step relative transition-all duration-500 ${
                    activeStep === index ? "scale-105" : "scale-100"
                  }`}
                >
                  {/* Card glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 rounded-3xl blur-2xl opacity-0 group-hover/step:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-[28px] border border-emerald-100/50 shadow-[0_4px_40px_rgba(6,95,70,0.06)] hover:shadow-[0_12px_60px_rgba(6,95,70,0.12)] transition-all duration-500 sm:hover:-translate-y-2 overflow-hidden p-5 sm:p-6 md:p-8">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/30 to-emerald-50/0 opacity-0 group-hover/step:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative text-center">
                      {/* Icon with premium styling */}
                      <div className="relative mb-6 inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 rounded-2xl blur-xl"></div>
                        <div className={`relative w-20 h-20 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-br from-${item.accentColor}-50 to-${item.accentColor}-100/50 border border-${item.accentColor}-200/50 shadow-lg group-hover/step:shadow-xl group-hover/step:scale-110 transition-all duration-500 ${
                          activeStep === index ? "shadow-emerald-500/25 ring-2 ring-emerald-400/30 ring-offset-2" : ""
                        }`}>
                          <item.icon className={`w-9 h-9 text-${item.accentColor}-600 group-hover/step:scale-110 transition-transform duration-500`} />
                        </div>
                        {/* Step number badge */}
                        <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-all duration-500 ${
                          activeStep === index 
                            ? "bg-emerald-500 scale-110" 
                            : "bg-gradient-to-br from-emerald-400 to-emerald-500"
                        }`}>
                          <span className="text-white text-xs poppins-bold">{index + 1}</span>
                        </div>
                      </div>
                      
                      {/* Step label */}
                      <div className={`inline-block px-4 py-2 rounded-full text-sm mb-4 transition-all duration-500 ${
                        activeStep === index
                          ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white poppins-semibold shadow-lg shadow-emerald-500/30"
                          : "bg-emerald-50/80 text-emerald-700 poppins-medium border border-emerald-100/50"
                      }`}>
                        {item.step}
                      </div>
                      
                      {/* Title */}
                      <h3 className="poppins-semibold text-xl text-emerald-900 mb-3 group-hover/step:text-emerald-700 transition-colors duration-300">{item.title}</h3>
                      
                      {/* Description */}
                      <p className="poppins-regular text-emerald-700 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    
                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-300/0 to-transparent group-hover/step:via-emerald-400 transition-all duration-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expert-Led Compliance — World Class Design */}
      <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden group/expert">

        {/* Apple-style minimal background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(16,185,129,0.05)_0%,transparent_55%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(6,95,70,0.04)_0%,transparent_55%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.012)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
          <div className="absolute top-1/3 left-[2%] w-56 h-56 bg-emerald-100/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-[2%] w-40 h-40 bg-emerald-200/15 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Badge + headline — 3-col on lg so side cards sit naturally beside the text */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">

              {/* Left floating card */}
              <div className="hidden lg:flex justify-end animate-float-slow">
                <div className="w-44 bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100/60 shadow-[0_8px_32px_rgba(6,95,70,0.10)] p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-emerald-600 poppins-semibold uppercase tracking-wider">Certified</span>
                  </div>
                  <p className="poppins-bold text-emerald-900 text-sm leading-snug mb-0.5">Cambridge Institute</p>
                  <p className="poppins-medium text-emerald-600 text-[11px]">Sustainability Leadership</p>
                  <div className="mt-3 w-full h-0.5 bg-emerald-50 rounded-full overflow-hidden">
                    <div className="h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-full animate-shimmer"></div>
                  </div>
                </div>
              </div>

              {/* Centre: pill + headline + subtext */}
              <div className="text-center">
                <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-50/80 backdrop-blur-xl border border-emerald-100/50 mb-4 sm:mb-5 animate-fade-in">
                  <GraduationCap className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-600 mr-2" />
                  <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">World-Class Expertise</span>
                </div>
                <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-emerald-900 mb-3 sm:mb-4 animate-fade-in-up">
                  Expert-Led
                  <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                    Compliance
                  </span>
                </h2>
                <p className="poppins-regular text-base sm:text-lg text-emerald-700 max-w-xl mx-auto leading-relaxed animate-fade-in-up">
                  We help UK businesses stay legal, avoid fines, and pass every inspection — without the stress of figuring it out alone.
                </p>
              </div>

              {/* Right floating card */}
              <div className="hidden lg:flex justify-start animate-float-slow-reverse">
                <div className="w-40 bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100/60 shadow-[0_8px_32px_rgba(6,95,70,0.10)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-green-700 poppins-semibold uppercase tracking-wider">Status</span>
                  </div>
                  <p className="poppins-bold text-emerald-900 text-2xl mb-0.5">100%</p>
                  <p className="poppins-medium text-emerald-700 text-[11px]">Audit Pass Rate</p>
                  <div className="mt-2.5 w-full h-1 bg-emerald-50 rounded-full">
                    <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-full"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* What we cover pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 animate-fade-in-up">
            {[
              "Packaging Compliance",
              "Packaging Tax",
              "Waste Documentation",
              "Bin Separation Rules",
            ].map((label) => (
              <div key={label} className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white/70 backdrop-blur-xl border border-emerald-100/60 rounded-full shadow-sm hover:shadow-md hover:border-emerald-200/70 transition-all duration-300">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></div>
                <span className="poppins-medium text-emerald-800 text-xs sm:text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 mb-8 sm:mb-10 animate-fade-in-up">
            {[
              { value: "100%", label: "Audit Pass Rate" },
              { value: "4", label: "Areas We Cover" },
              { value: "Gov't", label: "Insider Experience" },
              { value: "Zero", label: "Clients Ever Fined" },
            ].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-9 bg-emerald-100 hidden sm:block"></div>}
                <div className="text-center group/stat cursor-default">
                  <p className="text-2xl sm:text-3xl md:text-4xl poppins-bold text-emerald-900 group-hover/stat:scale-110 transition-transform duration-300">{stat.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-emerald-500 poppins-medium uppercase tracking-wide mt-1">{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Two-column */}
          <div className="grid md:grid-cols-2 items-stretch gap-4 sm:gap-5">

            {/* Left — founder story */}
            <div className="bg-white/65 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.06)] hover:shadow-[0_16px_48px_rgba(6,95,70,0.10)] transition-all duration-700 group/card flex flex-col">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 group-hover/card:scale-110 transition-transform duration-500">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="poppins-semibold text-emerald-800 text-xs uppercase tracking-wide">Why We&apos;re Different</span>
                </div>

                <h3 className="poppins-bold text-xl sm:text-2xl text-emerald-900 mb-4 leading-tight">
                  We handle the complexity so you don&apos;t have to.
                </h3>

                <p className="poppins-regular text-emerald-700 text-sm sm:text-sm leading-relaxed mb-4">
                  Packaging and waste rules in the UK are changing fast — and the consequences of getting it wrong are real. Fines, failed audits, and legal liability don&apos;t have to be your problem. We take it off your plate entirely.
                </p>

                <p className="poppins-regular text-emerald-600 text-sm leading-relaxed mb-5">
                  We&apos;ve worked inside the government systems that enforce these rules. We know exactly what inspectors look for — and we make sure your business always has the right evidence, in the right place, before they ever come knocking.
                </p>

                {/* What we handle */}
                <div className="space-y-2.5">
                  {[
                    "We register your business and keep your packaging data accurate",
                    "We calculate what you owe and file it correctly, every time",
                    "We source the certificates your business needs to stay legal",
                    "We make sure your workplace waste separation is fully compliant",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                      <span className="poppins-regular text-emerald-700 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: founder + About Us button */}
              <div className="mt-6 pt-5 border-t border-emerald-100/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="poppins-semibold text-emerald-900 text-sm">Founder &amp; Principal Consultant</p>
                  <p className="poppins-regular text-emerald-500 text-xs mt-0.5">UK Packaging &amp; Waste Compliance Specialist</p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white poppins-semibold text-xs rounded-xl transition-all duration-300 hover:shadow-[0_4px_16px_rgba(6,95,70,0.30)] group/btn flex-shrink-0 w-fit"
                >
                  Meet the Team
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Right — credential + proof cards, flex-1 so each card shares the column height equally */}
            <div className="flex flex-col gap-3">

              {/* Cambridge */}
              <div className="group/item flex-1 bg-white/65 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-emerald-100/50 shadow-[0_4px_24px_rgba(6,95,70,0.06)] hover:shadow-[0_8px_32px_rgba(6,95,70,0.10)] hover:border-emerald-200/60 transition-all duration-500 flex items-start gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm group-hover/item:shadow-md transition-all duration-500 p-2">
                  <Image src="/University of Cambridge new Logo Vector.svg" alt="University of Cambridge" width={32} height={32} className="object-contain w-full h-full group-hover/item:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="poppins-semibold text-emerald-900 text-sm mb-1.5">Cambridge Institute for Sustainability Leadership</h4>
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">We studied how packaging and waste regulations actually work in practice — not just in theory — so we can translate the law into plain steps your team can follow.</p>
                </div>
              </div>

              {/* HMRC */}
              <div className="group/item flex-1 bg-white/65 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-emerald-100/50 shadow-[0_4px_24px_rgba(6,95,70,0.06)] hover:shadow-[0_8px_32px_rgba(6,95,70,0.10)] hover:border-emerald-200/60 transition-all duration-500 flex items-start gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm group-hover/item:shadow-md transition-all duration-500 p-1.5">
                  <Image src="/Screenshot 2025-08-31 at 21.43.30.png" alt="HMRC" width={36} height={36} className="object-contain w-full h-full group-hover/item:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="poppins-semibold text-emerald-900 text-sm mb-1.5">Inside Government Experience</h4>
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">We&apos;ve worked inside HMRC. We know how government enforcement works from the inside — which means we know exactly what your business needs to have in place before an inspection.</p>
                </div>
              </div>

              {/* Proven in live audits — dark */}
              <div className="group/item flex-1 bg-gradient-to-br from-emerald-700 to-emerald-900 rounded-2xl p-4 sm:p-5 shadow-[0_4px_24px_rgba(6,95,70,0.22)] hover:shadow-[0_8px_40px_rgba(6,95,70,0.34)] transition-all duration-500 flex items-start gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_60%)] pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="absolute inset-0 animate-shine pointer-events-none opacity-20"></div>
                <div className="relative flex-shrink-0 w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="poppins-semibold text-white text-sm mb-1.5">Proven in Live Audits</h4>
                  <p className="poppins-regular text-emerald-100/90 text-sm leading-relaxed">Every system we build has been tested against real inspections. Not a single client has ever failed an audit. That&apos;s not luck — it&apos;s the result of building things properly from day one.</p>
                </div>
              </div>

              {/* We Speak Plain English */}
              <div className="group/item flex-1 bg-white/65 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-emerald-100/50 shadow-[0_4px_24px_rgba(6,95,70,0.06)] hover:shadow-[0_8px_32px_rgba(6,95,70,0.10)] hover:border-emerald-200/60 transition-all duration-500 flex items-start gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex-shrink-0 w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100 group-hover/item:bg-emerald-100/60 transition-all duration-500">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="poppins-semibold text-emerald-900 text-sm mb-1.5">We Speak Plain English</h4>
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">No jargon, no confusing legal language. We explain what your obligations are, what we&apos;re doing about them, and what it means for your business in straightforward terms.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/cta">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08)_0%,transparent_50%)] animate-gradient-shift"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(6,95,70,0.08)_0%,transparent_50%)] animate-gradient-shift-reverse"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:40px_40px] animate-shimmer"></div>
        </div>

        {/* Premium animated accents */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 left-10 w-24 h-24 animate-float-slow">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 to-emerald-300/10 rounded-xl transform rotate-45"></div>
            <div className="absolute inset-2 bg-white/50 backdrop-blur-sm rounded-lg transform -rotate-12 animate-spin-slow"></div>
          </div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 animate-float-slow-reverse">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-emerald-300/10 rounded-full"></div>
            <div className="absolute inset-2 bg-white/50 backdrop-blur-sm rounded-full transform animate-pulse"></div>
          </div>
          
          {/* Dynamic light beams */}
          <div className="absolute top-0 left-1/4 w-1 h-32 bg-gradient-to-b from-emerald-200/0 via-emerald-300/20 to-emerald-200/0 transform -rotate-45 animate-beam-slide"></div>
          <div className="absolute bottom-0 right-1/4 w-1 h-32 bg-gradient-to-b from-emerald-200/0 via-emerald-300/20 to-emerald-200/0 transform rotate-45 animate-beam-slide-reverse"></div>
        </div>

        {/* Main content container with premium animations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center relative">
            {/* Premium badge with enhanced animation */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm border border-emerald-200/80 mb-6 sm:mb-8 group-hover/cta:scale-105 transition-all duration-500 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-200/0 via-emerald-200/30 to-emerald-200/0 animate-shine"></div>
              <BadgeCheck className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 mr-2 animate-pulse" />
              <span className="poppins-medium text-xs sm:text-sm text-emerald-800">UK Packaging Compliance</span>
            </div>

            {/* Enhanced headline with animated gradient */}
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-emerald-900 tracking-tight relative animate-fade-in-up">
              <span className="inline-block">Remain</span>{" "}
              <span className="inline-block bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                Audit-Ready,
              </span>{" "}
              <span className="inline-block">Always</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-300/0 via-emerald-400/50 to-emerald-300/0 animate-pulse"></div>
            </h2>

            {/* Enhanced description with fade-in animation */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed animate-fade-in-up delay-100 px-4">
              We handle packaging compliance for UK businesses—EPR, PPT, waste regulations—eliminating fines and paperwork so your team can focus on growth.
            </p>

            {/* Premium FAQ Section */}
            <div className="max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16 animate-fade-in-up delay-200">
              <div className="space-y-6">
              {[
                {
                  question: "What exactly do you do?",
                  answer: "We manage all your environmental compliance—packaging regulations (EPR invoice audits, PPT certificate tracking, PRN procurement, modulation planning) and waste regulations (Duty of Care documentation, Digital Waste Tracking preparation, hazardous waste compliance, Simpler Recycling). We build complete systems so your team can focus on running the business."
                },
                {
                  question: "How much does this cost?",
                  answer: "A basic waste audit costs £295. If you need packaging compliance help (EPR or PPT), that's £495. For ongoing monthly support where we handle everything, it's £499-799/month depending on how many locations you have."
                },
                {
                  question: "What happens if I don't do this?",
                  answer: "The Environment Agency can fine you £200-£5,000 for missing paperwork or wrong bins. If your waste goes to an illegal site, you're responsible even if you didn't know. We make sure that never happens."
                },
                {
                  question: "How long does an audit take?",
                  answer: "The audit itself takes 90 minutes at your site. We check your bins, look at your waste documents, and talk to your team. You get a full report within 24 hours showing what's working and what needs fixing."
                },
                {
                  question: "Will this mess up my current waste collection?",
                  answer: "No. We work with your existing waste company. We're just checking that everything's legal and properly documented. Most businesses keep the same bins and collector—we just make sure the paperwork is right."
                },
                {
                  question: "Can you work with my existing systems?",
                  answer: "Yes. We integrate with your spreadsheets, Shopify, waste contractors, and other systems you use. We consolidate packaging data (EPR, PPT, PRN) and waste documentation (transfer notes, consignment notes, tracking records) into one clear dashboard."
                }
              ].map((item, index) => (
                  <div
                    key={index}
                    className="group/faq relative bg-white/40 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-emerald-100/50 overflow-hidden transition-all duration-500 hover:border-emerald-200 hover:shadow-[0_8px_32px_rgba(6,95,70,0.08)] hover:bg-white/60"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/20 to-emerald-50/0 opacity-0 group-hover/faq:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer opacity-0 group-hover/faq:opacity-100"></div>
                    
                    <div className="relative p-4 sm:p-5 md:p-6">
                      <div className="flex items-start justify-between group/question cursor-pointer">
                        <h3 className="poppins-semibold text-base sm:text-lg text-emerald-900 group-hover/faq:text-emerald-700 transition-colors duration-300">
                          {item.question}
                        </h3>
                        <div className="ml-3 sm:ml-4 flex-shrink-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover/faq:bg-emerald-100 transition-all duration-300 border border-emerald-100/50 group-hover/faq:border-emerald-200/50">
                            <div className="w-2 h-2 bg-emerald-600 rounded-full group-hover/faq:scale-110 transition-transform duration-300"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 sm:mt-4 poppins-regular text-sm sm:text-base text-emerald-700 leading-relaxed opacity-0 max-h-0 group-hover/faq:opacity-100 group-hover/faq:max-h-[200px] transition-all duration-500 ease-in-out">
                        {item.answer}
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-emerald-100/0 via-emerald-100 to-emerald-100/0 opacity-0 group-hover/faq:opacity-100 transition-opacity duration-500"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium CTA buttons with enhanced animations */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-200 px-4">
              <Button
                size="lg"
                onClick={() => router.push("/quiz")}
                className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 sm:hover:scale-105 group/button relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 min-h-[54px] text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                <span className="relative z-10 flex items-center">
                  START YOUR FREE ASSESSMENT
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform duration-500" />
                </span>
              </Button>
              <Button
                size="lg"
                onClick={() => setShowCalendlyModal(true)}
                className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 sm:hover:scale-105 group/button relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 min-h-[54px] text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                <span className="relative z-10 flex items-center">
                  BOOK A COMPLIANCE REVIEW
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform duration-500" />
                </span>
              </Button>
            </div>

            {/* Premium decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Premium geometric patterns */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-300/10 to-emerald-500/10"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>
      </section>

      {/* Premium Call Booking Popup */}
      {showCallPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
          {/* Premium backdrop */}
          <div 
            className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xl"
            onClick={() => setShowCallPopup(false)}
          ></div>
          
          {/* Popup container */}
          <div className="relative w-full max-w-lg animate-scale-in">
            {/* Premium card */}
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-10 border border-emerald-100/50 shadow-[0_24px_64px_rgba(6,95,70,0.2)]">
              
              {/* Sophisticated background elements */}
              <div className="absolute inset-0 rounded-[32px] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowCallPopup(false)}
                aria-label="Close popup"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50/80 backdrop-blur-sm border border-emerald-100/50 flex items-center justify-center group/close hover:bg-emerald-100 transition-all duration-300 hover:scale-110 hover:rotate-90 z-10 min-h-[44px] min-w-[44px]"
              >
                <svg
                  className="w-5 h-5 text-emerald-600 group-hover/close:text-emerald-700 transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="relative text-center">
                {/* Premium badge */}
                <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-50/80 backdrop-blur-xl border border-emerald-100/50 mb-4 sm:mb-6">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                  <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">Limited Availability</span>
                </div>

                {/* Headline - Minimal & Compelling */}
                <h3 className="poppins-bold text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 tracking-tight text-emerald-900 leading-[1.1]">
                  Ready for<br/>
                  <span className="text-emerald-600">audit confidence?</span>
                </h3>

                {/* Subheadline - Ultra concise */}
                <p className="poppins-regular text-base sm:text-lg text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
                  15-minute call. No obligation.<br/>
                  <span className="text-emerald-600 poppins-medium">Complete roadmap to compliance.</span>
                </p>

                {/* Premium CTA Button */}
                <Button
                  size="lg"
                  className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 sm:hover:scale-105 group/button w-full relative overflow-hidden py-5 sm:py-6 min-h-[54px]"
                  onClick={() => setShowCalendlyModal(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                  <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                    Book Your Strategy Call
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover/button:translate-x-1 transition-transform duration-500" />
                  </span>
                </Button>

                {/* Trust elements - Minimal */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-emerald-100/50">
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-emerald-600">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="poppins-medium">HMRC-Certified</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="poppins-medium">Same-Day Response</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium decorative corner accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      )}

      {/* Futuristic Sophisticated Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-emerald-50/50" role="contentinfo" aria-label="Site footer">
        {/* Futuristic Background Effects */}
        <div className="absolute inset-0">
          {/* Animated gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,95,70,0.03)_0%,transparent_50%)]"></div>
          {/* Tech grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50"></div>
          {/* Glowing scan lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan"></div>
          </div>
        </div>

        {/* Elegant top border with glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Footer Content - Minimalist & Modern */}
          <div className="pt-12 pb-8">
            
            {/* Navigation Section */}
            <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
              
              {/* Services */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                  Services
                  <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Assessment", href: "/quiz" },
                    { label: "Compliance Audit", href: "#" },
                    { label: "Documentation", href: "#" },
                    { label: "Support", href: "#" }
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-emerald-700/80 hover:text-emerald-900 text-sm poppins-regular transition-all duration-200"
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                  Resources
                  <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "PPT Guide", href: "/resources/plastic-packaging-tax" },
                    { label: "All Resources", href: "/resources" },
                    { label: "Checklist", href: "#" },
                    { label: "HMRC Info", href: "#" }
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-emerald-700/80 hover:text-emerald-900 text-sm poppins-regular transition-all duration-200"
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                  Company
                  <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "About", href: "/about" },
                    { label: "Approach", href: "#" },
                    { label: "Team", href: "#" },
                    { label: "Careers", href: "#" }
                  ].map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group flex items-center text-emerald-700/80 hover:text-emerald-900 text-sm poppins-regular transition-all duration-200"
                      >
                        <span className="relative">
                          {item.label}
                          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                  Contact
                  <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href={CONTACT_INFO.tel}
                      className="group flex items-center gap-2 text-emerald-700/80 hover:text-emerald-900 transition-colors duration-200"
                    >
                      <Phone className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm poppins-regular">{CONTACT_INFO.phone}</span>
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={() => setShowEmailTemplate(true)}
                      className="group flex items-center gap-2 text-emerald-700/80 hover:text-emerald-900 transition-colors duration-200 cursor-pointer"
                    >
                      <Mail className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm poppins-regular break-all">{CONTACT_INFO.email}</span>
                    </button>
                  </li>
                  <li>
                    <div className="flex items-center gap-2 text-emerald-700/80">
                      <MapPin className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm poppins-regular">UK Nationwide</span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            {/* Bottom Section - Minimalist Legal */}
            <div className="pt-8 border-t border-emerald-200/40 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                
                {/* Copyright & Legal */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                  <p className="text-emerald-700/60 text-xs poppins-regular">
                    © {new Date().getFullYear()} Millstone Compliance
                  </p>
                  <div className="flex items-center gap-4">
                    {[
                      { label: "Privacy", href: "/privacy" },
                      { label: "Terms", href: "#" },
                      { label: "Cookies", href: "#" }
                    ].map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-emerald-700/60 hover:text-emerald-900 text-xs poppins-regular transition-colors duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Badges */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 backdrop-blur-sm">
                    <BadgeCheck className="h-3 w-3 text-emerald-600" />
                    <span className="text-[10px] poppins-medium text-emerald-700 uppercase tracking-wide">UK Compliant</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 backdrop-blur-sm">
                    <CheckCircle className="h-3 w-3 text-emerald-600" />
                    <span className="text-[10px] poppins-medium text-emerald-700 uppercase tracking-wide">Data Protected</span>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        </div>

        {/* Glowing bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent"></div>
      </footer>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={showCalendlyModal} 
        onClose={() => setShowCalendlyModal(false)} 
      />

      {/* Email Template Modal */}
      <EmailTemplateModal 
        isOpen={showEmailTemplate} 
        onClose={() => setShowEmailTemplate(false)} 
      />
    </div>
  )
}
