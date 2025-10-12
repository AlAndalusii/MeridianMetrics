"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
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
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"

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
        PPT Compliance Solutions
      </span>
    </div>
  </div>
)

export default function MillstoneComplianceWebsite() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
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
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <MillstoneLogo size="sm" variant="modern" />
            <Button 
              onClick={() => router.push("/assessment")}
              className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px] min-w-[44px]">
              <span className="hidden xs:inline">START YOUR FREE ASSESSMENT</span>
              <span className="xs:hidden">START ASSESSMENT</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden group/hero">
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
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 leading-tight">
                <span className="text-emerald-900">Worried about PPT audits?</span>
                <br />
                <span className="text-emerald-600">We find gaps before HMRC does.</span>
              </h1>
              <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
                Get your free PPT compliance assessment—identify missing certificates and reporting errors in 3 minutes, before HMRC does.
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  size="lg"
                  onClick={() => router.push("/assessment")}
                  className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 group w-full sm:w-fit text-sm sm:text-base py-5 sm:py-6 px-6 sm:px-8 min-h-[54px]"
                >
                  START YOUR FREE ASSESSMENT
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 text-emerald-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="poppins-medium text-xs sm:text-sm">HMRC Background</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="poppins-medium text-xs sm:text-sm">PPT Specialist</span>
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
              className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} mt-8 lg:mt-0`}
            >
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-emerald-200 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 lg:hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="poppins-semibold text-lg text-emerald-900 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-emerald-600" />
                      Product Plastic Tracker
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="poppins-medium text-xs text-green-700">Live Data</span>
                    </div>
                  </div>

                  {/* Total Plastic Overview */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border border-emerald-200">
                      <div className="flex items-center justify-between mb-1">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="poppins-bold text-base text-emerald-700">142.5</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-emerald-600">Total Tonnes</p>
                      <p className="text-[9px] text-emerald-500 mt-0.5">Q3 2025 usage</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                      <div className="flex items-center justify-between mb-1">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="poppins-bold text-base text-green-700">68%</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-green-600">Recycled Content</p>
                      <p className="text-[9px] text-green-500 mt-0.5">97.1 tonnes verified</p>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
                      <div className="flex items-center justify-between mb-1">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        <span className="poppins-bold text-base text-amber-700">45.4</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-amber-600">Virgin Plastic</p>
                      <p className="text-[9px] text-amber-500 mt-0.5">Needs documentation</p>
                    </div>
                  </div>

                  {/* Product Breakdown */}
                  <div className="bg-white rounded-xl p-3 border border-gray-200 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="poppins-semibold text-xs text-gray-800">Product Recycled Content</h4>
                      <span className="poppins-medium text-[10px] text-gray-600">Top SKUs</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-green-700 font-semibold">Shampoo Bottle 500ml</span>
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">85% rPET</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-[9px] text-green-600 mt-0.5">Certificate verified</span>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-green-700 font-semibold">Face Cream Jar 50ml</span>
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">72% rPP</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: '72%'}}></div>
                        </div>
                        <span className="text-[9px] text-green-600 mt-0.5">Certificate verified</span>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-amber-700 font-semibold">Body Lotion 250ml</span>
                          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">35% rPET</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '35%'}}></div>
                        </div>
                        <span className="text-[9px] text-amber-600 mt-0.5">Pending verification</span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Status */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Supplier Certificates */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <FileCheck className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">rPET Certificates</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">18 Valid</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <FileCheck className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">rPP Certificates</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">12 Valid</span>
                      </div>
                      <div className="flex items-center justify-between bg-amber-50 rounded-lg p-1.5 border border-amber-200">
                        <div className="flex items-center space-x-1.5">
                          <Database className="w-3 h-3 text-amber-600" />
                          <span className="poppins-medium text-[10px] text-amber-700">New Suppliers</span>
                        </div>
                        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">3 Pending</span>
                      </div>
                    </div>

                    {/* Weight & Evidence */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <Calculator className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">Weight Data</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Complete</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <Shield className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">Evidence Trail</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Linked</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1.5 border border-blue-200">
                        <div className="flex items-center space-x-1.5">
                          <BarChart3 className="w-3 h-3 text-blue-600" />
                          <span className="poppins-medium text-[10px] text-blue-700">View Report</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Export</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Recycled Content Indicator */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-bounce delay-1000 flex items-center justify-center">
                  <span className="poppins-bold text-white text-[10px]">68%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intelligence Assessment Section - World-Class Consultancy Design */}
      <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/assessment">
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
          {/* Animated floating cards */}
          <div className="absolute top-20 right-[10%] w-32 h-24 bg-white/60 backdrop-blur-md rounded-xl border border-emerald-100/50 shadow-lg animate-float-slow p-4">
            <div className="text-xs text-emerald-600 poppins-semibold mb-1">Compliance</div>
            <div className="text-2xl poppins-bold text-emerald-900">94%</div>
            <div className="w-full bg-emerald-100 h-1 rounded-full mt-2">
              <div className="bg-emerald-500 h-1 rounded-full" style={{width: '94%'}}></div>
            </div>
          </div>
          
          <div className="absolute bottom-32 left-[8%] w-36 h-28 bg-white/60 backdrop-blur-md rounded-xl border border-green-100/50 shadow-lg animate-float-slow-reverse p-4">
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
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 md:mb-8 text-emerald-900 tracking-tight relative animate-fade-in-up leading-[1.1]">
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
              Our free assessment reviews 15 key areas of your packaging records. From our analysis of over 250 UK businesses, <span className="poppins-semibold text-emerald-800">7 out of 10 had straightforward gaps</span> that could lead to penalties.
            </p>
            
            {/* Stats Bar - New Addition */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">15</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Assessment Points</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-emerald-200"></div>
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">3</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Minutes</div>
              </div>
              <div className="w-px h-10 sm:h-12 bg-emerald-200"></div>
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">100%</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Confidential</div>
              </div>
            </div>
          </div>

          {/* Assessment Areas - Enhanced Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-14 md:mb-16">
            {[
              {
                icon: FileCheck,
                title: "Certificate Review",
                description: "We verify your certificates are valid and current so you avoid missing document penalties from HMRC.",
                stat: "23 Data Points",
                gradient: "from-emerald-50/90 to-emerald-100/90",
                delay: "delay-0",
                accentColor: "emerald",
              },
              {
                icon: Calculator,
                title: "Filing Accuracy Review",
                description: "We verify your tax point timing so you avoid incorrect submission penalties and late filing charges.",
                stat: "12 Verification Steps",
                gradient: "from-emerald-50/80 to-emerald-100/80",
                delay: "delay-100",
                accentColor: "green",
              },
              {
                icon: Database,
                title: "Record Organisation Review",
                description: "We ensure you can locate all your documentation quickly so an HMRC audit doesn't become days of stress.",
                stat: "18 Compliance Metrics",
                gradient: "from-emerald-50/70 to-emerald-100/70",
                delay: "delay-200",
                accentColor: "emerald",
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
                onClick={() => router.push("/assessment")}
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
                    <Shield className="w-3 h-3 text-emerald-600" />
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

      {/* Process Section - Ultra Premium Apple/Fortune 500 Design */}
      <section id="process" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden group/process">
        {/* Apple-inspired minimal background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        {/* Floating premium data visualization */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Glassmorphic floating progress indicator */}
          <div className="absolute top-32 right-[8%] w-36 h-32 bg-white/60 backdrop-blur-2xl rounded-2xl border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] animate-float-slow p-4">
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
            <h2 className="poppins-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-emerald-900 tracking-tight">Our Implementation Approach</h2>
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed px-4">
              We organise your PPT documentation efficiently. No lengthy consultations. No theory. Just practical systems that work for your business.
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
                  step: "Express Assessment",
                  title: "Express Assessment",
                  description: "90-minute call where we identify your top 3 problems and give you a checklist to sort them yourself.",
                  icon: AlertTriangle,
                  accentColor: "emerald",
                },
                {
                  step: "Comprehensive Review",
                  title: "Comprehensive Review",
                  description: "We review every certificate and record you have, find all the gaps, then give you a written report showing exactly what to do.",
                  icon: Building,
                  accentColor: "green",
                },
                {
                  step: "Managed Compliance",
                  title: "Managed Compliance",
                  description: "We monitor your compliance quarterly - tracking certificate expiry, filing deadlines, and regulatory changes so nothing falls through the cracks.",
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

      {/* Ultra Premium Founder Section - Apple-Inspired Design */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden group/founder">
        {/* Minimalist Apple-style background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Centered Premium Header */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-50/80 backdrop-blur-xl border border-emerald-100/50 mb-4 sm:mb-6 transition-all duration-500">
              <Shield className="w-3 sm:w-4 h-3 sm:h-4 text-emerald-600 mr-2" />
              <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">Leadership</span>
            </div>
            
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 tracking-tight text-emerald-900">
              Expert-Led Compliance
            </h2>
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-2xl mx-auto leading-relaxed px-4">
              Founded on deep regulatory insight and practical implementation expertise.
            </p>
          </div>

          {/* Premium Content Card */}
          <div className="relative">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl md:rounded-[32px] p-6 sm:p-8 md:p-12 border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.06)] hover:shadow-[0_16px_48px_rgba(6,95,70,0.08)] transition-all duration-700">
              
              {/* Founder Statement */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                <p className="poppins-regular text-emerald-900 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  Millstone Compliance bridges the gap between regulatory requirements and operational reality. Our approach stems from direct experience within UK government services and advanced sustainability training.
                </p>
                <p className="poppins-regular text-emerald-700 text-sm sm:text-base leading-relaxed">
                  We deliver audit-ready systems that integrate seamlessly with your existing operations—no theoretical frameworks, just proven methodologies that withstand regulatory scrutiny.
                </p>
              </div>

              {/* Premium Credentials Grid */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Cambridge Credential */}
                <div className="group/item relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-start gap-3 sm:gap-4 md:gap-5 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-emerald-100/30 hover:border-emerald-200/50 transition-all duration-500 bg-white/40 backdrop-blur-sm">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 rounded-xl sm:rounded-2xl blur-lg"></div>
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center border border-emerald-100/50 shadow-sm group-hover/item:shadow-md transition-all duration-500 p-2 sm:p-3">
                        <Image
                          src="/University of Cambridge new Logo Vector.svg"
                          alt="University of Cambridge"
                          width={48}
                          height={48}
                          className="object-contain w-full h-full group-hover/item:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="poppins-semibold text-emerald-900 text-sm sm:text-base mb-1 sm:mb-2">Cambridge Institute for Sustainability Leadership</h4>
                      <p className="poppins-regular text-emerald-700 text-xs sm:text-sm leading-relaxed">
                        Advanced training in translating complex sustainability regulations into actionable business strategies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* HMRC Credential */}
                <div className="group/item relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex items-start gap-5 p-6 rounded-2xl border border-emerald-100/30 hover:border-emerald-200/50 transition-all duration-500 bg-white/40 backdrop-blur-sm">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 rounded-2xl blur-lg"></div>
                      <div className="relative w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-emerald-100/50 shadow-sm group-hover/item:shadow-md transition-all duration-500 p-2">
                        <Image
                          src="/Screenshot 2025-08-31 at 21.43.30.png"
                          alt="HMRC Systems Experience"
                          width={64}
                          height={64}
                          className="object-contain w-full h-full group-hover/item:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="poppins-semibold text-emerald-900 text-base mb-2">HMRC Systems Experience</h4>
                      <p className="poppins-regular text-emerald-700 text-sm leading-relaxed">
                        Direct experience with UK tax authority systems, providing insight into compliance requirements and audit standards.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Founder Attribution */}
              <div className="mt-10 pt-8 border-t border-emerald-100/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="poppins-semibold text-emerald-900 text-base">Founder & Principal Consultant</p>
                    <p className="poppins-regular text-emerald-600 text-sm mt-1">PPT Intelligence Analyst</p>
                  </div>
                  <div className="transition-transform duration-500 hover:scale-105">
                    <MillstoneLogo size="sm" variant="modern-icon" />
                  </div>
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
              <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600 mr-2 animate-pulse" />
              <span className="poppins-medium text-xs sm:text-sm text-emerald-800">Premium PPT Solutions</span>
            </div>

            {/* Enhanced headline with animated gradient */}
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-emerald-900 tracking-tight relative animate-fade-in-up">
              <span className="inline-block">Remain </span>
              <span className="inline-block bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                Audit-Ready
              </span>
              <span className="inline-block">, Always</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-300/0 via-emerald-400/50 to-emerald-300/0 animate-pulse"></div>
            </h2>

            {/* Enhanced description with fade-in animation */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed animate-fade-in-up delay-100 px-4">
              We design sophisticated PPT compliance systems that eliminate penalties, 
              <br className="hidden md:block" />
              exceed HMRC audit standards, and support your team.
            </p>

            {/* Premium FAQ Section */}
            <div className="max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16 animate-fade-in-up delay-200">
              <div className="space-y-6">
                {[
                  {
                    question: "What exactly do you do?",
                    answer: "We organise and manage all your PPT documentation. We collect supplier data, verify weights and recycled content, and build a clear system so your team can focus on running the business."
                  },
                  {
                    question: "How long does it take?",
                    answer: "Our process is designed to be completed within 30 days. You'll have a fully organised, HMRC-ready record of all your packaging data by month-end."
                  },
                  {
                    question: "Do I need to know anything about PPT?",
                    answer: "No. We handle the technical details, calculations, and documentation. You just provide access to your data and supplier information."
                  },
                  {
                    question: "Can you work with my existing systems?",
                    answer: "Yes. We integrate with your spreadsheets, Shopify, or other systems you use, and consolidate everything into one clear, usable dashboard."
                  },
                  {
                    question: "Will this prevent penalties or charges?",
                    answer: "Whilst HMRC is responsible for enforcement, our system ensures your records are accurate, complete, and well organised—reducing the risk of errors or missed submissions."
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
            <div className="flex justify-center animate-fade-in-up delay-200 px-4">
              <Button
                size="lg"
                onClick={() => router.push("/assessment")}
                className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 sm:hover:scale-105 group/button relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 min-h-[54px] text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                <span className="relative z-10 flex items-center">
                  START YOUR FREE ASSESSMENT
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
                  onClick={() => {
                    // Add your booking logic here
                    window.location.href = 'tel:+44YOURPHONE' // Replace with your phone or booking link
                  }}
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

      {/* Premium Sophisticated Footer */}
      <footer className="bg-gradient-to-b from-emerald-50 via-emerald-50/80 to-white relative overflow-hidden border-t border-emerald-100/50 px-safe">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)] animate-pulse-slow"></div>
          <div className="absolute top-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(6,95,70,0.02)_0deg,rgba(16,185,129,0.02)_120deg,rgba(6,95,70,0.02)_240deg)] animate-spin-slower"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>

        <div className="relative z-10">
          {/* Main footer content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              {/* Get up-to-date */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-xs sm:text-sm tracking-wider uppercase mb-3 sm:mb-4 relative">
                  Get up-to-date
                  <div className="absolute -bottom-1 left-0 w-8 h-px bg-gradient-to-r from-emerald-400 to-emerald-400/0"></div>
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {[
                    { label: "Privacy statement", href: "#" },
                    { label: "Policies", href: "#" },
                    { label: "Manage cookies", href: "#" },
                    { label: "Cookie policy", href: "#" },
                    { label: "Website terms", href: "#" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center text-emerald-600 hover:text-emerald-800 text-xs sm:text-sm poppins-regular transition-all duration-300 hover:translate-x-1 min-h-[44px] sm:min-h-0 sm:inline-flex"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Get involved */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-sm tracking-wider uppercase mb-4 relative">
                  Get involved
                  <div className="absolute -bottom-1 left-0 w-8 h-px bg-gradient-to-r from-emerald-400 to-emerald-400/0"></div>
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Media", href: "#" },
                    { label: "Careers", href: "#" },
                    { label: "Partners", href: "#" },
                    { label: "Case Studies", href: "#" },
                    { label: "Sitemap", href: "#" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center text-emerald-600 hover:text-emerald-800 text-xs sm:text-sm poppins-regular transition-all duration-300 hover:translate-x-1 min-h-[44px] sm:min-h-0 sm:inline-flex"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Get in touch */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-sm tracking-wider uppercase mb-4 relative">
                  Get in touch
                  <div className="absolute -bottom-1 left-0 w-8 h-px bg-gradient-to-r from-emerald-400 to-emerald-400/0"></div>
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Enquiries", href: "#" },
                    { label: "myMillstone", href: "#" },
                    { label: "PPT Audit Solutions", href: "#" },
                    { label: "Audit-Ready Documentation", href: "#" },
                    { label: "Supplier Data Management", href: "#" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center text-emerald-600 hover:text-emerald-800 text-xs sm:text-sm poppins-regular transition-all duration-300 hover:translate-x-1 min-h-[44px] sm:min-h-0 sm:inline-flex"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 text-sm tracking-wider uppercase mb-4 relative">
                  FOLLOW US:
                  <div className="absolute -bottom-1 left-0 w-8 h-px bg-gradient-to-r from-emerald-400 to-emerald-400/0"></div>
                </h3>
                <div className="flex items-center space-x-3">
                  {[
                    { name: "Twitter", icon: "𝕏", href: "#" },
                    { name: "LinkedIn", icon: "💼", href: "#" },
                    { name: "Facebook", icon: "📘", href: "#" },
                    { name: "Instagram", icon: "📷", href: "#" },
                    { name: "Phone", icon: "📞", href: "#" }
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="group/social relative w-10 h-10 bg-emerald-50/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-emerald-100/50 transition-all duration-500 hover:border-emerald-200 hover:bg-white/80 hover:shadow-[0_8px_16px_rgba(6,95,70,0.1)] overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/50 to-emerald-50/0 opacity-0 group-hover/social:opacity-100 transition-opacity duration-500"></div>
                      <span className="text-lg relative z-10 group-hover/social:scale-110 transition-transform duration-300">{social.icon}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Premium Bottom Bar */}
          <div className="border-t border-emerald-100/50 bg-white/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
              <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-center gap-4 sm:gap-6">
                {/* Logo */}
                <div className="group">
                  <MillstoneLogo size="sm" variant="modern" className="text-emerald-700 transition-transform duration-500 group-hover:scale-105" />
                </div>
                
                {/* Copyright */}
                <span className="text-emerald-600 text-[10px] sm:text-xs poppins-regular text-center sm:text-left">© 2025 Millstone Compliance. All rights reserved.</span>
                
                {/* Get a quote button */}
                <div className="relative w-full sm:w-auto">
                  <Button
                    size="lg"
                    onClick={() => router.push("/assessment")}
                    className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 sm:hover:scale-105 group/button relative overflow-hidden px-4 sm:px-6 md:px-8 py-4 sm:py-3 min-h-[54px] w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                    <span className="relative z-10 flex items-center">
                      START YOUR FREE ASSESSMENT
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform duration-500" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
