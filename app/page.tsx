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
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CONTACT_INFO } from "@/lib/constants"
import { MobileMenu } from "@/components/MobileMenu"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useBooking } from "@/components/BookingProvider"
import { HeroBillCheck } from "@/components/home/HeroBillCheck"
import { HealthCheckSection } from "@/components/home/HealthCheckSection"
import { FounderSection } from "@/components/home/FounderSection"
import { ClosingCTA } from "@/components/home/ClosingCTA"



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
    const { openBooking } = useBooking()

  const [isVisible, setIsVisible] = useState(true)
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
      <section id="hero" className="pt-24 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 relative overflow-hidden group/hero" aria-label="Hero section">
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
                Waste &amp; Compliance Help · Birmingham
              </div>

              <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight mb-5">
                <span className="block overflow-hidden pb-1"><span className="text-slate-900 block hero-rise" style={{ animationDelay: "0ms" }}>One Call for</span></span>
                <span className="block overflow-hidden pb-1"><span className="text-slate-900 block hero-rise" style={{ animationDelay: "120ms" }}>Vetted Waste</span></span>
                <span className="block overflow-hidden pb-2">
                  <span className="relative inline-block text-emerald-700 hero-rise" style={{ animationDelay: "240ms" }}>
                    &amp; Compliance Help.
                    <svg className="absolute left-0 -bottom-1.5 w-full h-3 text-emerald-400" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M2 9 C 50 3, 110 3, 198 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="hero-underline" />
                    </svg>
                  </span>
                </span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-slate-600 mb-7 leading-relaxed max-w-xl">
                I&apos;m Zak. I link Birmingham businesses, landlords and waste firms with licensed partners I&apos;ve checked myself. One call, and I sort the right person for the job.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-wrap gap-3 mb-5">
                <Link
                  href="/send-your-bill"
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Get a Free Bill Check <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95"
                >
                  How I Vet Partners
                </Link>
              </div>

              {/* Also serving */}
              <p className="text-xs text-slate-400 poppins-regular mb-5">
                <span className="text-slate-600 poppins-medium">For small businesses, letting agents, landlords and waste firms</span>
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4">
                {[
                  "Vetted Partners",
                  "Licensed &amp; Insured",
                  "Birmingham Based",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-xs text-emerald-700 poppins-medium">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Live bill check — shows what we do at a glance */}
            <div
              className={`hidden xs:block transition-all duration-700 delay-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} mt-8 lg:mt-0`}
            >
              <HeroBillCheck />
            </div>
          </div>
        </div>
      </section>

      {/* Why I started + who I help */}
      <FounderSection />

      {/* Free Waste Contract Health Check */}
      <HealthCheckSection />

      {/* Who I Help Section - Matching Site Design */}
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
              <span className="poppins-semibold text-xs sm:text-sm text-emerald-900 tracking-wide uppercase relative z-10">Who I Help</span>
            </div>
            
            {/* Main Headline - matching site typography */}
            <h2 id="regulations-heading" className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-5 sm:mb-7 md:mb-9 text-emerald-900 tracking-tight relative animate-fade-in-up leading-[1.1]">
              One Call,
              <span className="block mt-2 sm:mt-3 leading-tight pb-2 sm:pb-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                The Right Partner
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 animate-fade-in-up delay-100">
              Three core services and two extras,
              <span className="poppins-semibold text-emerald-800"> all done by partners I&apos;ve checked myself.</span>
            </p>
          </div>

          {/* Regulations Grid - Premium Cards matching site style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Small Businesses Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-amber-200/50 rounded-2xl overflow-hidden hover:border-amber-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(245,158,11,0.2)] animate-fade-in-up">
              {/* Card shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white/50 to-amber-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                {/* Icon Container */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-amber-700" />
                  </div>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Free</Badge>
                </div>
                
                {/* Title */}
                <h3 className="poppins-bold text-2xl sm:text-3xl text-amber-900 mb-4 group-hover/reg:text-amber-800 transition-colors duration-300">
                  Small Businesses
                </h3>

                {/* Description */}
                <p className="text-amber-800 poppins-regular text-base leading-relaxed mb-6">
                  A free waste bill check. I read every line and find where you&apos;re overpaying. No saving, no fee.
                </p>

                {/* Requirements List */}
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900 text-sm poppins-medium">Every charge checked against your contract</span>
                  </div>
                  <div className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Archive className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900 text-sm poppins-medium">A better deal from a licensed collector</span>
                  </div>
                  <div className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <ClipboardCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-amber-900 text-sm poppins-medium">No saving found? You pay nothing</span>
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

            {/* Landlords & Agents Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-2xl overflow-hidden hover:border-green-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(34,197,94,0.2)] animate-fade-in-up delay-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-white/50 to-green-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 border border-green-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <Book className="w-7 h-7 text-green-700" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Vetted</Badge>
                </div>
                
                <h3 className="poppins-bold text-2xl sm:text-3xl text-green-900 mb-4 group-hover/reg:text-green-800 transition-colors duration-300">
                  Landlords &amp; Agents
                </h3>
                
                <p className="text-green-800 poppins-regular text-base leading-relaxed mb-6">
                  Vetted contractors for clearances, waste and compliance jobs. One call, and I find the right licensed partner.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <FileText className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-900 text-sm poppins-medium">Licensed and insured partners only</span>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-900 text-sm poppins-medium">Proper paperwork for every job</span>
                  </div>
                  <div className="flex items-start gap-3 bg-green-50/50 p-3 rounded-lg border border-green-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-green-900 text-sm poppins-medium">I follow up after every job</span>
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

            {/* Local Waste Firms Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-emerald-200/50 rounded-2xl overflow-hidden hover:border-emerald-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(16,185,129,0.2)] animate-fade-in-up delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white/50 to-emerald-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <Wifi className="w-7 h-7 text-emerald-700" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Partners</Badge>
                </div>
                
                <h3 className="poppins-bold text-2xl sm:text-3xl text-emerald-900 mb-4 group-hover/reg:text-emerald-800 transition-colors duration-300">
                  Local Waste Firms
                </h3>
                
                <p className="text-emerald-800 poppins-regular text-base leading-relaxed mb-6">
                  New customers from local businesses and landlords. Pass my checks and I send good work your way.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Database className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-emerald-900 text-sm poppins-medium">Registered, licensed and insured</span>
                  </div>
                  <div className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Activity className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-emerald-900 text-sm poppins-medium">Good references and feedback</span>
                  </div>
                  <div className="flex items-start gap-3 bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Calendar className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-emerald-900 text-sm poppins-medium">Steady, local work sent to you</span>
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

            {/* Urgent Jobs & Surveys Card */}
            <div className="group/reg relative bg-white/80 backdrop-blur-xl border border-rose-200/50 rounded-2xl overflow-hidden hover:border-rose-400/60 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(244,63,94,0.2)] animate-fade-in-up delay-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-white/50 to-rose-50/50 opacity-0 group-hover/reg:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-8 sm:p-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 border border-rose-300 flex items-center justify-center group-hover/reg:scale-110 group-hover/reg:rotate-3 transition-all duration-500 shadow-lg">
                    <Activity className="w-7 h-7 text-rose-700" />
                  </div>
                  <Badge className="bg-rose-100 text-rose-700 border-rose-300 poppins-semibold text-xs px-3 py-1.5 shadow-sm">Extras</Badge>
                </div>

                <h3 className="poppins-bold text-2xl sm:text-3xl text-rose-900 mb-4 group-hover/reg:text-rose-800 transition-colors duration-300">
                  Urgent Jobs &amp; Surveys
                </h3>

                <p className="text-rose-800 poppins-regular text-base leading-relaxed mb-6">
                  When it can&apos;t wait. Urgent clearances and survey specialists, found fast from partners I trust.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">Urgent clearances, booked fast</span>
                  </div>
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">Survey specialists when you need one</span>
                  </div>
                  <div className="flex items-start gap-3 bg-rose-50/50 p-3 rounded-lg border border-rose-100/50">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-emerald-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-rose-900 text-sm poppins-medium">Same checks, same direct line</span>
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
              No jargon. No long meetings. The same three steps, whatever you need.
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
                  step: "Tell Me",
                  title: "Tell Me What You Need",
                  description: "A quick call or WhatsApp. A bill check, a clearance, a survey or new customers.",
                  icon: AlertTriangle,
                  accentColor: "emerald",
                },
                {
                  step: "Matched",
                  title: "I Match a Vetted Partner",
                  description: "I pick a licensed partner who has passed all five of my checks, and tell you how I'm paid.",
                  icon: Building,
                  accentColor: "green",
                },
                {
                  step: "Follow Up",
                  title: "I Follow Up",
                  description: "After every job I check in with you. If it wasn't right, I sort it.",
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
                  <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">Local &amp; Hands-On</span>
                </div>
                <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-emerald-900 mb-3 sm:mb-4 animate-fade-in-up">
                  Partners
                  <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                    I&apos;ve Checked
                  </span>
                </h2>
                <p className="poppins-regular text-base sm:text-lg text-emerald-700 max-w-xl mx-auto leading-relaxed animate-fade-in-up">
                  I help Birmingham businesses, landlords and waste firms find people they can trust, without the stress of checking everyone yourself.
                </p>
              </div>

              {/* Right floating card */}
              <div className="hidden lg:flex justify-start animate-float-slow-reverse">
                <div className="w-40 bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100/60 shadow-[0_8px_32px_rgba(6,95,70,0.10)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-green-700 poppins-semibold uppercase tracking-wider">Status</span>
                  </div>
                  <p className="poppins-bold text-emerald-900 text-2xl mb-0.5">5</p>
                  <p className="poppins-medium text-emerald-700 text-[11px]">Checks per partner</p>
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
              "Bill Checks",
              "Landlords",
              "Waste Firms",
              "Urgent Jobs",
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
              { value: "5", label: "Checks On Every Partner" },
              { value: "1", label: "Call To Sort It" },
              { value: "1-1", label: "Direct Access, No Call Centre" },
              { value: "£0", label: "Bill Check If No Saving" },
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
                  I check the people so you don&apos;t have to.
                </h3>

                <p className="poppins-regular text-emerald-700 text-sm sm:text-sm leading-relaxed mb-4">
                  Finding a waste firm or contractor you can trust takes time. Is it licensed? Insured? Any good? You&apos;re busy running a business. I take it off your plate.
                </p>

                <p className="poppins-regular text-emerald-600 text-sm leading-relaxed mb-5">
                  I check every partner myself before I send them any work, and I ask you how it went after every job. If they slip, they&apos;re off my list.
                </p>

                {/* What we handle */}
                <div className="space-y-2.5">
                  {[
                    "Registration and licences checked",
                    "Insurance checked",
                    "Company history and references checked",
                    "Your feedback after every job",
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
                  <p className="poppins-semibold text-emerald-900 text-sm">Founder</p>
                  <p className="poppins-regular text-emerald-500 text-xs mt-0.5">Waste &amp; Compliance Connector</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href="https://www.linkedin.com/in/zak-millstone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white poppins-semibold text-xs rounded-xl transition-all duration-300 hover:shadow-[0_4px_16px_rgba(10,102,194,0.35)]"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white poppins-semibold text-xs rounded-xl transition-all duration-300 hover:shadow-[0_4px_16px_rgba(6,95,70,0.30)] group/btn w-fit"
                  >
                    Meet Zak
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                  </Link>
                </div>
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
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">Certificate in Circular Economy from the Cambridge Institute for Sustainability Leadership. It shapes how we see waste: as a cost you can cut, not just a box to tick.</p>
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
                  <h4 className="poppins-semibold text-emerald-900 text-sm mb-1.5">Public Sector Background</h4>
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">Working at HMRC taught me how to read rules, check records and spot numbers that don&apos;t add up.</p>
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
                  <h4 className="poppins-semibold text-white text-sm mb-1.5">Honest About How I&apos;m Paid</h4>
                  <p className="poppins-regular text-emerald-100/90 text-sm leading-relaxed">Either you pay a simple fee, or the partner I send you to pays me a small cut. I tell you which, upfront.</p>
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
                  <p className="poppins-regular text-emerald-600 text-sm leading-relaxed">No jargon, no legal waffle. I tell you who I&apos;m sending, why I trust them and what happens next, in words that make sense.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Closing call to action + FAQ */}
      <ClosingCTA />

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
                  <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">Direct Line to Zak</span>
                </div>

                {/* Headline - Minimal & Compelling */}
                <h3 className="poppins-bold text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 tracking-tight text-emerald-900 leading-[1.1]">
                  Need someone<br/>
                  <span className="text-emerald-600">you can trust?</span>
                </h3>

                {/* Subheadline - Ultra concise */}
                <p className="poppins-regular text-base sm:text-lg text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
                  15-minute call. No obligation.<br/>
                  <span className="text-emerald-600 poppins-medium">A vetted partner for the job.</span>
                </p>

                {/* Premium CTA Button */}
                <Button
                  size="lg"
                  className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 sm:hover:scale-105 group/button w-full relative overflow-hidden py-5 sm:py-6 min-h-[54px]"
                  onClick={() => openBooking()}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                  <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                    Book a Free Call
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 group-hover/button:translate-x-1 transition-transform duration-500" />
                  </span>
                </Button>

                {/* Trust elements - Minimal */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-emerald-100/50">
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-emerald-600">
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
      {/* Email Template Modal */}
      </div>
  )
}
