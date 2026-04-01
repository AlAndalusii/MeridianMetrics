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
  Recycle,
  Shield,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CONTACT_INFO } from "@/lib/constants"
import { MobileMenu } from "@/components/MobileMenu"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// Defer heavy modal bundles — loaded only when first opened
const CalendlyModal = dynamic(() => import("@/components/CalendlyWidget").then(m => ({ default: m.CalendlyModal })), { ssr: false })
const EmailTemplateModal = dynamic(() => import("@/components/EmailTemplateModal").then(m => ({ default: m.EmailTemplateModal })), { ssr: false })

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
        <span className="poppins-bold text-xl sm:text-2xl md:text-3xl text-emerald-800 tracking-tight leading-none">Millstone Compliance</span>
        <span className="poppins-medium text-[10px] sm:text-xs text-emerald-600 tracking-widest uppercase mt-1">
          Waste & Recycling Compliance Specialists
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-emerald-900 overflow-x-hidden">
      {/* Animated Background — hidden on mobile (too GPU-heavy on small screens) */}
      <div className="hidden sm:block fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-green-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-100/20 to-green-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden group/hero" aria-label="Hero section">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] animate-pulse-slow"></div>
          <div className="absolute top-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(6,95,70,0.02)_0deg,rgba(16,185,129,0.02)_120deg,rgba(6,95,70,0.02)_240deg)] animate-spin-slower"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>

        {/* Premium floating elements — tablet and above only */}
        <div className="hidden sm:block absolute inset-0 overflow-hidden">
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
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-5">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                UK Waste Cost &amp; Compliance Audits
              </div>

              <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-5">
                <span className="text-slate-900 block">Reduce Waste Spend Fast.</span>
                <span className="text-emerald-700 block">48-Hour Reports</span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-slate-600 mb-7 leading-relaxed max-w-xl">
                Spot overspending, tighten compliance, and improve waste performance with independent fixed-fee audits and clear 48-hour action reports.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-3 mb-5">
                <button
                  onClick={() => setShowEmailTemplate(true)}
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Book Your Audit Now <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95"
                >
                  Free Savings Check
                </Link>
              </div>

              {/* Also serving */}
              <p className="text-xs text-slate-400 poppins-regular mb-5">
                Serving:{" "}
                <span className="text-slate-600 poppins-medium">Care Homes · UK Property Sector · Food & Beverage Manufacturing</span>
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4">
                {[
                  "Independent Experts",
                  "Remote Nationwide",
                  "48hr Reports",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-xs text-emerald-700 poppins-medium">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Business Waste & Compliance Dashboard — hidden on tiny phones */}
            <div
              className={`hidden xs:block transition-all duration-200 delay-75 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} mt-8 lg:mt-0`}
            >
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-emerald-200 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 lg:hover:scale-105">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="poppins-semibold text-lg text-emerald-900 flex items-center">
                      <Recycle className="w-4 h-4 mr-2 text-emerald-600" />
                      Waste &amp; Compliance Tracker
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="poppins-medium text-xs text-green-700">Live Data</span>
                    </div>
                  </div>

                  {/* Top KPI cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-3 border border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <Trash2 className="w-4 h-4 text-slate-500" />
                        <span className="poppins-bold text-base text-slate-700">↓ 12%</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-slate-600">General Waste</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">vs last quarter</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                      <div className="flex items-center justify-between mb-1">
                        <Recycle className="w-4 h-4 text-green-600" />
                        <span className="poppins-bold text-base text-green-700">73%</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-green-600">Recycling Rate</p>
                      <p className="text-[9px] text-green-500 mt-0.5">Target: 75%</p>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3 border border-emerald-200">
                      <div className="flex items-center justify-between mb-1">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        <span className="poppins-bold text-base text-emerald-700">91%</span>
                      </div>
                      <p className="poppins-medium text-[10px] text-emerald-600">Compliance Score</p>
                      <p className="text-[9px] text-emerald-500 mt-0.5">Audit-ready</p>
                    </div>
                  </div>

                  {/* Waste Stream Breakdown */}
                  <div className="bg-white rounded-xl p-3 border border-gray-200 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="poppins-semibold text-xs text-gray-800">Waste Stream Breakdown</h4>
                      <span className="poppins-medium text-[10px] text-gray-500">This month</span>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-slate-50 rounded-lg p-2 border border-slate-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-slate-700 font-semibold">General Waste</span>
                          <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">18 collections</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5">
                          <div className="bg-slate-400 h-1.5 rounded-full" style={{width: '27%'}}></div>
                        </div>
                        <span className="text-[9px] text-slate-500 mt-0.5">4.2 tonnes • landfill route</span>
                      </div>

                      <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-green-700 font-semibold">Dry Recyclables</span>
                          <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">24 collections</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{width: '49%'}}></div>
                        </div>
                        <span className="text-[9px] text-green-600 mt-0.5">7.6 tonnes • paper, plastic, cans</span>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-amber-700 font-semibold">Food Waste</span>
                          <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Weekly</span>
                        </div>
                        <div className="w-full bg-amber-100 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{width: '24%'}}></div>
                        </div>
                        <span className="text-[9px] text-amber-600 mt-0.5">3.7 tonnes • AD facility</span>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status + Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-emerald-50 rounded-lg p-1.5 border border-emerald-200">
                        <div className="flex items-center space-x-1.5">
                          <BadgeCheck className="w-3 h-3 text-emerald-600" />
                          <span className="poppins-medium text-[10px] text-emerald-700">Simpler Recycling</span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">Setup</span>
                      </div>
                      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-1.5 border border-blue-200">
                        <div className="flex items-center space-x-1.5">
                          <FileCheck className="w-3 h-3 text-blue-600" />
                          <span className="poppins-medium text-[10px] text-blue-700">Contractor</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">Audited</span>
                      </div>
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <ClipboardCheck className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">Bin Labelling</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">Compliant</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between bg-green-50 rounded-lg p-1.5 border border-green-200">
                        <div className="flex items-center space-x-1.5">
                          <TrendingUp className="w-3 h-3 text-green-600" />
                          <span className="poppins-medium text-[10px] text-green-700">CO₂ Saved</span>
                        </div>
                        <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">4.2t</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 rounded-lg p-1.5 border border-slate-200">
                        <div className="flex items-center space-x-1.5">
                          <Archive className="w-3 h-3 text-slate-500" />
                          <span className="poppins-medium text-[10px] text-slate-600">Collections Logged</span>
                        </div>
                        <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">48</span>
                      </div>
                      <div className="flex items-center justify-between bg-amber-50 rounded-lg p-1.5 border border-amber-200">
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          <span className="poppins-medium text-[10px] text-amber-700">Next Audit</span>
                        </div>
                        <span className="text-[9px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">Mar 31</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Compliance Score Indicator */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full animate-bounce delay-1000 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <span className="poppins-bold text-white text-[11px] block">91%</span>
                    <span className="poppins-medium text-white text-[7px]">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU CAN EXPECT — Editorial Value Section ───────────────────── */}
      <section className="relative bg-white border-t border-b border-emerald-100 py-16 sm:py-20 overflow-hidden">

        {/* Subtle radial wash — barely visible, just adds warmth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(209,250,229,0.35)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

          {/* Two-column editorial layout */}
          <div className="grid lg:grid-cols-[1fr_1px_1fr] gap-0 items-start">

            {/* Left — Bold claim */}
            <div className="lg:pr-16 pb-12 lg:pb-0">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-emerald-400" />
                <span className="poppins-semibold text-[11px] text-emerald-600 uppercase tracking-[0.22em]">What every client receives</span>
              </div>

              <h2 className="poppins-bold text-3xl sm:text-4xl md:text-[2.75rem] text-emerald-950 leading-[1.1] mb-6">
                Know exactly where you stand{' '}
                <em className="not-italic bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                  before it escalates.
                </em>
              </h2>

              <p className="poppins-regular text-emerald-700/65 text-base sm:text-lg leading-relaxed max-w-md mb-10">
                Independent. Site-specific. Plain English. Every audit delivers the same practical standard — because waste costs, weak documentation, and compliance gaps should never be left to guesswork.
              </p>

              {/* Outcome pills row */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Action-Focused Reports', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
                  { label: '48hr turnaround', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
                  { label: 'Fixed Fee', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
                  { label: 'EA · Councils · Regulators', color: 'bg-emerald-900 border-emerald-900 text-emerald-100' },
                ].map(({ label, color }) => (
                  <span key={label} className={`inline-flex items-center px-3.5 py-1.5 rounded-full border text-xs poppins-medium ${color}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Vertical divider — desktop only */}
            <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-emerald-200 to-transparent" />

            {/* Right — Stacked deliverables list */}
            <div className="lg:pl-16">
              {[
                {
                  num: '01',
                  title: 'Written Findings Report',
                  desc: 'Site-specific. Clear risks, overspend points, and compliance gaps identified. Delivered in 48 hours — not a template, not a checklist.',
                },
                {
                  num: '02',
                  title: 'Prioritised Action Plan',
                  desc: 'Ranked by risk and savings opportunity. What to fix first, what to change next, and where waste costs can be reduced.',
                },
                {
                  num: '03',
                  title: 'Audit-Ready Templates',
                  desc: 'Waste transfer notes, internal logs, and record-keeping templates — formatted to support inspections, reviews, and day-to-day compliance.',
                },
                {
                  num: '04',
                  title: '30-Day Expert Access',
                  desc: 'Direct line to your consultant. Unlimited questions. Practical support when you need it — with no clock running.',
                },
              ].map((item, i, arr) => (
                <div
                  key={item.num}
                  className={`group flex gap-5 py-5 transition-colors duration-200 ${i < arr.length - 1 ? 'border-b border-emerald-100' : ''}`}
                >
                  {/* Number */}
                  <span className="poppins-bold text-xs text-emerald-400 tabular-nums mt-1 flex-shrink-0 w-6 text-right">{item.num}</span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="poppins-semibold text-sm text-emerald-900 group-hover:text-emerald-700 transition-colors duration-200">{item.title}</p>
                      {/* Animated underline on hover */}
                      <div className="h-px flex-1 bg-emerald-100 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                    <p className="poppins-regular text-sm text-emerald-600/65 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
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
              Your Waste Compliance
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
              Our free 3-minute check finds waste compliance gaps in your business — Duty of Care, Simpler Recycling and clinical waste. Most businesses have risks they don&apos;t see. This shows you exactly where you stand.
            </p>
            
            {/* Stats Bar - New Addition */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8">
              <div className="group/stat text-center">
                <div className="text-2xl sm:text-3xl poppins-bold text-emerald-600 group-hover/stat:scale-110 transition-transform duration-300">4</div>
                <div className="text-[10px] sm:text-xs text-emerald-600 poppins-medium uppercase tracking-wide mt-1">Check Areas</div>
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
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12 sm:mb-14 md:mb-16">
          {[
            {
              icon: Building,
              label: "Waste — Service 1",
              badge: "Duty of Care",
              title: "Duty of Care Audit",
              description: "We check your waste contracts, carrier licences and transfer notes, and flag missing records or risky contractors. You get a clear action list so the EA or council can't catch you out.",
              highlight: true,
            },
            {
              icon: FileCheck,
              label: "Waste — Service 2",
              badge: "Clinical",
              title: "Clinical Waste Check",
              description: "We review how you store and segregate clinical waste, sharps and medicines, and confirm your contractor paperwork. Designed for CQC and Ofsted registered services needing assurance.",
              highlight: false,
            },
            {
              icon: Recycle,
              label: "Waste — Service 3",
              badge: "Simpler Recycling",
              title: "Simpler Recycling Check",
              description: "Deadline passed 31 March 2026. All UK businesses must now separate key waste streams. We review your bins, labels and contracts, and tell you exactly what to fix to be compliant.",
              highlight: false,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                item.highlight
                  ? "border border-emerald-400/40 shadow-[0_4px_32px_rgba(6,95,70,0.18)] bg-emerald-950"
                  : "border border-slate-200/80 shadow-[0_2px_16px_rgba(6,95,70,0.06)] bg-white hover:shadow-[0_6px_32px_rgba(6,95,70,0.10)] hover:border-emerald-200"
              }`}
            >
              <div className={`h-1 w-full ${item.highlight ? "bg-gradient-to-r from-emerald-400 to-emerald-300" : "bg-gradient-to-r from-emerald-600/40 to-emerald-500/20"}`} />
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.highlight ? "bg-emerald-400/20 border border-emerald-400/30" : "bg-emerald-700"}`}>
                    <item.icon className={`w-5 h-5 ${item.highlight ? "text-emerald-300" : "text-white"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] poppins-semibold uppercase tracking-widest ${item.highlight ? "text-emerald-400/60" : "text-slate-400"}`}>{item.label}</span>
                      <span className={`text-[10px] poppins-semibold px-2 py-0.5 rounded-full border ${item.highlight ? "bg-emerald-400/15 text-emerald-300 border-emerald-400/30" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>{item.badge}</span>
                    </div>
                    <h3 className={`poppins-bold text-base leading-tight ${item.highlight ? "text-white" : "text-slate-900"}`}>{item.title}</h3>
                  </div>
                </div>
                <p className={`poppins-regular text-sm leading-relaxed ${item.highlight ? "text-emerald-100/70" : "text-slate-600"}`}>{item.description}</p>
              </div>
              <div className={`px-6 py-3 border-t ${item.highlight ? "bg-emerald-900/40 border-emerald-700/40" : "bg-slate-50 border-slate-100"}`}>
                <Link href="/services#packaging" className={`inline-flex items-center gap-1.5 text-xs poppins-semibold transition-colors ${item.highlight ? "text-emerald-300 hover:text-emerald-200" : "text-emerald-700 hover:text-emerald-800"}`}>
                  Learn more <ArrowRight className="w-3 h-3" />
                </Link>
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
                    <span className="text-green-900 text-sm poppins-medium">Prevent unauthorised disposal</span>
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
                    <span className="text-rose-900 text-sm poppins-medium">Segregation and colour-coding</span>
                  </div>
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">Secure storage and disposal</span>
                  </div>
                </div>
                
                {/* Visual Mockup - Colour-coded bins */}
                <div className="relative h-48 rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 border border-rose-200 overflow-hidden group-hover/reg:border-rose-300 transition-colors duration-500 shadow-inner">
                  <div className="absolute inset-0 flex items-center justify-center gap-4 p-6">
                    {/* Colour-coded waste bins visualization */}
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

      {/* Simpler Recycling Section */}
      <section className="py-14 sm:py-20 bg-white border-t border-slate-100" aria-labelledby="recycling-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Alert stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12 px-4 py-4 bg-red-50 border border-red-200 rounded-2xl">
            <div className="text-center">
              <div className="poppins-bold text-2xl text-red-600">31 Mar</div>
              <div className="text-[10px] text-red-700 poppins-semibold uppercase tracking-wider mt-0.5">Deadline Passed</div>
            </div>
            <div className="w-px h-10 bg-red-200 hidden sm:block" />
            <div className="text-center">
              <div className="poppins-bold text-2xl text-slate-800">3</div>
              <div className="text-[10px] text-slate-500 poppins-semibold uppercase tracking-wider mt-0.5">Waste Streams Required</div>
            </div>
            <div className="w-px h-10 bg-red-200 hidden sm:block" />
            <div className="text-center">
              <div className="poppins-bold text-2xl text-slate-800">£118</div>
              <div className="text-[10px] text-slate-500 poppins-semibold uppercase tracking-wider mt-0.5">Per Hour EA Fine</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12">
            {/* Left: content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full mb-5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="text-xs poppins-semibold text-red-700">UK Businesses — Deadline Passed</span>
              </div>
              <h2 id="recycling-heading" className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
                Simpler Recycling —{" "}
                <span className="text-red-600">Now Law for Every UK Business</span>
              </h2>
              <p className="poppins-regular text-slate-500 text-base leading-relaxed mb-6 max-w-md">
                The 31 March 2026 deadline has passed. Every UK business must now separate dry recyclables, food waste and general waste. Missing bins or wrong contractors means fines and enforcement notices.
              </p>

              {/* Quick book CTA */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={() => setShowCalendlyModal(true)}
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <Calendar className="w-4 h-4" /> Book a Free Call
                </button>
                <Link href="/services" className="inline-flex items-center gap-2 poppins-semibold text-sm bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 px-5 py-3 rounded-xl transition-all duration-200 active:scale-95">
                  See How We Help <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Mini trust */}
              <div className="flex flex-wrap gap-3 text-xs text-slate-400 poppins-regular">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 15-min call</span>
                <span>·</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> No obligation</span>
                <span>·</span>
                <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> EA inspections active</span>
              </div>
            </div>

            {/* Right: animated property compliance mockup */}
            <div className="relative">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                {/* Header bar */}
                <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs poppins-semibold text-white">Waste Compliance Scan</span>
                  </div>
                  <span className="text-[10px] text-slate-400 poppins-regular">Example business — 3 waste streams</span>
                </div>

                {/* Bin rows */}
                <div className="p-4 space-y-2">
                  {[
                    { icon: Recycle, name: "Dry Recyclables", detail: "Paper, plastic, glass", ok: true, delay: "0s" },
                    { icon: Trash2, name: "Food Waste", detail: "No caddy found — GAP", ok: false, delay: "0.4s" },
                    { icon: Trash2, name: "General Waste", detail: "Correctly labelled", ok: true, delay: "0.8s" },
                  ].map((bin) => (
                    <div
                      key={bin.name}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 border ${bin.ok ? "bg-emerald-950/60 border-emerald-800/40" : "bg-amber-950/40 border-amber-700/40"}`}
                      style={{ animation: `fadeInUp 0.4s ease both`, animationDelay: bin.delay }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bin.ok ? "bg-emerald-800/50" : "bg-amber-800/40"}`}>
                          <bin.icon className={`w-4 h-4 ${bin.ok ? "text-emerald-400" : "text-amber-400"}`} />
                        </div>
                        <div>
                          <p className={`text-xs poppins-semibold ${bin.ok ? "text-emerald-100" : "text-amber-100"}`}>{bin.name}</p>
                          <p className={`text-[10px] poppins-regular ${bin.ok ? "text-emerald-400/70" : "text-amber-400/70"}`}>{bin.detail}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${bin.ok ? "bg-emerald-700/40" : "bg-amber-700/40 animate-pulse"}`}>
                        {bin.ok
                          ? <><CheckCircle className="w-3 h-3 text-emerald-400" /><span className="text-[10px] text-emerald-300 poppins-semibold">OK</span></>
                          : <><AlertTriangle className="w-3 h-3 text-amber-400" /><span className="text-[10px] text-amber-300 poppins-semibold">GAP</span></>
                        }
                      </div>
                    </div>
                  ))}
                </div>

                {/* Score + CTA */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 poppins-regular">Compliance Score</span>
                    <span className="text-xs poppins-bold text-amber-400">67%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
                    <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000" style={{ width: "67%" }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-amber-400/80 poppins-regular">⚠ 1 issue — food waste bin required</p>
                    <button
                      onClick={() => setShowCalendlyModal(true)}
                      className="text-[10px] poppins-semibold text-emerald-400 hover:text-emerald-300 underline transition-colors"
                    >
                      Fix this →
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm text-[11px] poppins-semibold text-slate-500">
                Example compliance scan
              </div>
            </div>
          </div>

          {/* 3 feature cards */}
          <div className="grid sm:grid-cols-3 gap-4 pt-4 pb-2">
            {[
              { icon: Target, title: "Check Your Setup", desc: "We review your bins, contractor records and waste streams. Written report delivered in 48 hours.", tag: "Fixed Fee", tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              { icon: Trash2, title: "Find the Gaps", desc: "Dry recyclables, food waste, general waste — we identify exactly what's missing and what to fix.", tag: "Clear Action Plan", tagColor: "bg-blue-50 text-blue-700 border-blue-200" },
              { icon: ClipboardCheck, title: "Inspection Ready", desc: "Labelled bins, contractor records, written proof. Hand it over the moment an inspector arrives.", tag: "EA & CQC Ready", tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200" },
            ].map((card) => (
              <div key={card.title} className="bg-[#f8faf9] border border-slate-200 rounded-xl p-5 hover:border-emerald-200 hover:shadow-[0_4px_20px_rgba(6,95,70,0.08)] transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className={`text-[10px] poppins-semibold px-2 py-0.5 rounded-full border ${card.tagColor}`}>{card.tag}</span>
                </div>
                <h3 className="poppins-bold text-sm text-slate-900 mb-1.5">{card.title}</h3>
                <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
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
                    Waste Compliance
                  </span>
                </h2>
                <p className="poppins-regular text-base sm:text-lg text-emerald-700 max-w-xl mx-auto leading-relaxed animate-fade-in-up">
                  We help UK regulated businesses stay compliant, avoid fines, and pass inspections — without the stress of figuring it out alone.
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
              "Duty of Care",
              "Clinical Waste",
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
                  We handle the waste rules so you don&apos;t have to.
                </h3>

                <p className="poppins-regular text-emerald-700 text-sm sm:text-sm leading-relaxed mb-4">
                  Waste regulations are tightening across every regulated sector — and the consequences of getting it wrong are real. Fines, failed inspections and legal liability don&apos;t have to be your problem. We take it off your plate.
                </p>

                <p className="poppins-regular text-emerald-600 text-sm leading-relaxed mb-5">
                  We&apos;ve worked alongside the systems that enforce these rules. We know what inspectors look for — and we make sure your service always has the right evidence, in the right place, before they ever come knocking.
                </p>

                {/* What we handle */}
                <div className="space-y-2.5">
                  {[
                    "We review your waste setup and keep your documentation accurate",
                    "We identify your risks and give you clear, practical actions",
                    "We confirm your contractors and licences keep you legal",
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
                  <p className="poppins-regular text-emerald-500 text-xs mt-0.5">UK Health &amp; Waste Compliance Specialist</p>
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
                  <Image src="/University of Cambridge new Logo Vector.svg" alt="University of Cambridge" width={32} height={32} loading="lazy" className="object-contain w-full h-full group-hover/item:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="poppins-semibold text-emerald-900 text-sm mb-1.5">Cambridge Institute for Sustainability Leadership</h4>
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">We studied how health and waste regulations work in practice — not just in theory — so we can translate the law into plain steps your team can follow.</p>
                </div>
              </div>

              {/* HMRC */}
              <div className="group/item flex-1 bg-white/65 backdrop-blur-xl rounded-2xl p-4 sm:p-5 border border-emerald-100/50 shadow-[0_4px_24px_rgba(6,95,70,0.06)] hover:shadow-[0_8px_32px_rgba(6,95,70,0.10)] hover:border-emerald-200/60 transition-all duration-500 flex items-start gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-50/50 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-emerald-100 shadow-sm group-hover/item:shadow-md transition-all duration-500 p-1.5">
                  <Image src="/Screenshot 2025-08-31 at 21.43.30.png" alt="HMRC" width={36} height={36} loading="lazy" className="object-contain w-full h-full group-hover/item:scale-105 transition-transform duration-500" />
                </div>
                <div className="relative flex-1 min-w-0">
                  <h4 className="poppins-semibold text-emerald-900 text-sm mb-1.5">Regulatory Systems Background</h4>
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">Our background in public sector systems means we understand how enforcement operates — and exactly what documentation your service needs in place before an inspection ever happens.</p>
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
                  <h4 className="poppins-semibold text-white text-sm mb-1.5">Built on Solid Foundations</h4>
                  <p className="poppins-regular text-emerald-100/90 text-sm leading-relaxed">Every engagement produces documentation built to withstand scrutiny — written reports, clear gap analysis, and action plans shaped around what councils, CQC, Ofsted and the EA actually want to see.</p>
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
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">No jargon, no confusing legal language. We explain what your obligations are, what we&apos;re doing about them, and what it means for your service in straightforward terms.</p>
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
              <span className="poppins-medium text-xs sm:text-sm text-emerald-800">UK Waste Compliance</span>
            </div>

            {/* Enhanced headline with animated gradient */}
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-emerald-900 tracking-tight relative animate-fade-in-up">
              <span className="inline-block">Stay</span>{" "}
              <span className="inline-block bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                Inspection-Ready,
              </span>{" "}
              <span className="inline-block">Always</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-300/0 via-emerald-400/50 to-emerald-300/0 animate-pulse"></div>
            </h2>

            {/* Enhanced description with fade-in animation */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed animate-fade-in-up delay-100 px-4">
              We handle waste compliance for regulated businesses across the UK — so you avoid fines, failed inspections and licence issues.
            </p>

            {/* Premium FAQ Section */}
            <div className="max-w-3xl mx-auto mb-12 sm:mb-14 md:mb-16 animate-fade-in-up delay-200">
              <div className="space-y-6">
              {[
                {
                  question: "How do I know if we need an audit?",
                  answer: "If you're unsure about your waste costs, paperwork, contractor checks, or bin setup, you likely need one."
                },
                {
                  question: "What does the audit cover?",
                  answer: "We review your waste setup, records, contractor details, and key compliance risks."
                },
                {
                  question: "Can you help us save money too?",
                  answer: "Yes. We look for overspending, poor segregation, weak contractor setup, and wasted spend."
                },
                {
                  question: "Do you sell bins, collections or waste contracts?",
                  answer: "No. We stay independent and only provide audits, findings, and practical recommendations."
                },
                {
                  question: "How quickly do we get the report?",
                  answer: "Your written report is delivered within 48 hours of the audit."
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
                  BOOK A WASTE COMPLIANCE REVIEW
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

      <Footer />

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
