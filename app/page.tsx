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
      <section className="pt-32 pb-20 px-6 relative overflow-hidden group/hero">
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
                    <span className="poppins-medium text-sm">Book a 15-Min Intro Call</span>
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

      {/* Problem Section - Premium Red Theme */}
      <section className="py-20 bg-gradient-to-b from-red-50/80 via-white to-red-50/80 relative overflow-hidden group/problem">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] animate-pulse-slow"></div>
          <div className="absolute top-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(185,28,28,0.02)_0deg,rgba(239,68,68,0.02)_120deg,rgba(185,28,28,0.02)_240deg)] animate-spin-slower"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] animate-shimmer"></div>
        </div>

        {/* Premium floating elements with red theme */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Geometric shapes */}
          <div className="absolute top-1/4 left-10 w-24 h-24 animate-float-slow">
            <div className="absolute inset-0 bg-gradient-to-br from-red-200/10 to-red-300/5 rounded-[30px] rotate-[10deg] backdrop-blur-sm"></div>
          </div>
          <div className="absolute bottom-1/4 right-10 w-32 h-32 animate-float-slow-reverse delay-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-red-200/10 to-red-300/5 rounded-full backdrop-blur-sm"></div>
          </div>
          
          {/* Light beams with red tint */}
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-red-200/20 to-transparent animate-beam-slide"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-red-200/20 to-transparent animate-beam-slide-reverse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100/90 backdrop-blur-xl border border-red-200/80 shadow-lg mb-8 group-hover/problem:scale-105 transition-all duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-50/0 via-red-50/80 to-red-50/0 animate-shine"></div>
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2 animate-pulse" />
              <span className="poppins-medium text-sm text-red-800">Critical Risk Alert</span>
            </div>
            
            <h2 className="poppins-bold text-5xl mb-6 text-red-900 tracking-tight relative animate-fade-in-up">
              The Unseen Costs
              <span className="block mt-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-x">
                Bleeding Your Budget
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-red-300/0 via-red-400 to-red-300/0 animate-pulse"></div>
            </h2>
            <p className="poppins-regular text-xl text-red-700 max-w-3xl mx-auto leading-relaxed">
              It's not just a line item. It's the hidden risk that stalls funding rounds, drains operational hours, and puts your reputation on the line with every audit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: AlertTriangle,
                title: "£47,000 Penalty Risk",
                description:
                  "One compliance slip can trigger fines your finance team never budgeted.",
                gradient: "from-red-50/90 to-red-100/90",
                border: "border-red-200",
                iconColor: "text-red-600",
                iconBg: "bg-red-100",
              },
              {
                icon: XCircle,
                title: "Funding Deal Killer",
                description: "Investors pull back fast when your compliance data doesn't hold up.",
                gradient: "from-red-50/80 to-red-100/80",
                border: "border-red-200",
                iconColor: "text-red-600",
                iconBg: "bg-red-100",
              },
              {
                icon: Clock,
                title: "40+ Hours Lost Monthly",
                description:
                  "Ops teams buried in spreadsheets instead of scaling the business.",
                gradient: "from-red-50/70 to-red-100/70",
                border: "border-red-200",
                iconColor: "text-red-600",
                iconBg: "bg-red-100",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${item.gradient} backdrop-blur-xl border ${item.border} shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 group overflow-hidden`}
              >
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-100/0 via-red-100/30 to-red-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className={`w-16 h-16 ${item.iconBg} rounded-2xl mx-auto mb-6 flex items-center justify-center border ${item.border} shadow-md group-hover:shadow-red-500/20 transition-all duration-300`}>
                      <item.icon
                        className={`h-8 w-8 ${item.iconColor} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                    <h3 className="poppins-semibold text-xl text-red-900 mb-3">{item.title}</h3>
                    <p className="poppins-regular text-red-700">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/solution">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
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
      <section id="process" className="py-20 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/process">
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
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

      {/* Ultra Premium Founder Section */}
      <section className="py-16 mt-8 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/founder">
        {/* Apple-style glass morphism background */}
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

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Ultra Premium Identity */}
            <div className="text-center lg:text-left space-y-8 pt-10">
              {/* Premium badge with glass effect */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-xl border border-emerald-100/80 shadow-lg group-hover/founder:scale-105 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/80 to-emerald-50/0 animate-shine"></div>
                <Shield className="w-4 h-4 text-emerald-600 mr-2 animate-pulse" />
                <span className="poppins-medium text-sm text-emerald-800">About the Founder</span>
              </div>
              
              {/* Enhanced heading with sophisticated animations */}
              <div className="relative">
                <h2 className="poppins-bold text-5xl mb-10 tracking-tight relative animate-fade-in-up">
                  <span className="block text-emerald-900 mb-2">The Specialist</span>
                  <span className="block text-emerald-900">Behind</span>
                  <span className="relative inline-block mt-2">
                    <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                      the System
                    </span>
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-300/0 via-emerald-400 to-emerald-300/0 animate-pulse"></div>
                  </span>
                </h2>
              </div>

              {/* Ultra Premium Founder Image */}
              <div className="relative inline-block group">
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative">
                  {/* Main image container with premium border */}
                  <div className="w-48 h-48 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full p-1 shadow-[0_8px_32px_rgba(6,95,70,0.25)] transform group-hover:scale-105 transition-all duration-500">
                    <div className="w-full h-full rounded-full bg-white p-1">
                      <Image
                        src="/D7622D45-9B41-4CD9-ABAB-97252155B6A8.jpeg"
                        alt="Zak Jama"
                        width={180}
                        height={180}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  
                  {/* Premium animated rings */}
                  <div className="absolute -inset-2 border border-emerald-200/40 rounded-full animate-spin-slow"></div>
                  <div className="absolute -inset-4 border border-emerald-100/30 rounded-full animate-reverse-spin"></div>
                  <div className="absolute -inset-6 border border-emerald-100/20 rounded-full animate-spin-slower"></div>
                  
                  {/* Floating accent elements */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full shadow-lg animate-float-slow"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full shadow-lg animate-float-slow-reverse"></div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="poppins-bold text-2xl text-emerald-900">Zak Jama</h3>
                <p className="poppins-medium text-emerald-700 tracking-wide">Founder & PPT Systems Specialist</p>
              </div>
            </div>

            {/* Right Column - Ultra Premium Bio */}
            <div className="relative group/card">
              {/* Premium glass card */}
              <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-10 border border-emerald-100 shadow-[0_8px_32px_rgba(6,95,70,0.08)] hover:shadow-[0_16px_48px_rgba(6,95,70,0.12)] transition-all duration-500 animate-fade-in-up overflow-hidden">
                {/* Subtle background animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content with enhanced typography */}
                <div className="relative space-y-8">
                  <div className="space-y-5">
                    <p className="poppins-regular text-emerald-900 leading-relaxed text-base">
                      I founded Meridian Metrics after seeing the gap between official guidance and the messy reality of Plastic Packaging Tax.
                    </p>
                    <p className="poppins-regular text-emerald-900 leading-relaxed text-base">
                      My experience in UK government services, including HMRC, showed me where systems break down. With sustainability training from the University of Cambridge, I help businesses build practical, audit-ready data systems that work in the real world.
                    </p>
                  </div>

                  {/* Ultra Premium Credentials */}
                  <div className="space-y-6">
                    {/* Cambridge credential */}
                    <div className="group/item">
                      <div className="flex items-center gap-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-transparent border border-emerald-100/50 hover:border-emerald-200/50 transition-all duration-300 hover:translate-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-full blur-sm"></div>
                          <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center border border-emerald-200/50 shadow-md group-hover/item:shadow-emerald-500/20 transition-all duration-300 p-3">
                            <Image
                              src="/University of Cambridge new Logo Vector.svg"
                              alt="University of Cambridge Logo"
                              width={40}
                              height={40}
                              className="object-contain w-full h-full group-hover/item:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="poppins-semibold text-emerald-900 text-base mb-1.5">Cambridge-Trained Strategist</h4>
                          <p className="poppins-regular text-emerald-700 leading-relaxed text-sm">
                            Trained at the University of Cambridge (CISL) to turn complex sustainability challenges into clear, actionable business strategies.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* HMRC credential */}
                    <div className="group/item">
                      <div className="flex items-center gap-6 p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 to-transparent border border-emerald-100/50 hover:border-emerald-200/50 transition-all duration-300 hover:translate-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-full blur-sm"></div>
                          <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center border border-emerald-200/50 shadow-md group-hover/item:shadow-emerald-500/20 transition-all duration-300 p-3">
                            <Image
                              src="/hm-revenue-customs-svgrepo-com.svg"
                              alt="HMRC Systems Experience"
                              width={40}
                              height={40}
                              className="object-contain w-full h-full group-hover/item:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="poppins-semibold text-emerald-900 text-base mb-1.5">HMRC Systems Experience</h4>
                          <p className="poppins-regular text-emerald-700 leading-relaxed text-sm">
                            Worked within HMRC-facing services, guiding businesses on online systems and processes that underpin compliance today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 relative overflow-hidden group/cta">
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
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center relative">
            {/* Premium badge with enhanced animation */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm border border-emerald-200/80 mb-8 group-hover/cta:scale-105 transition-all duration-500 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-200/0 via-emerald-200/30 to-emerald-200/0 animate-shine"></div>
              <Shield className="w-5 h-5 text-emerald-600 mr-2 animate-pulse" />
              <span className="poppins-medium text-sm text-emerald-800">Premium PPT Solutions</span>
            </div>

            {/* Enhanced headline with animated gradient */}
            <h2 className="poppins-bold text-5xl mb-6 text-emerald-900 tracking-tight relative animate-fade-in-up">
              <span className="inline-block">Stay </span>
              <span className="inline-block bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 bg-[length:200%_100%] animate-gradient-x bg-clip-text text-transparent">
                Audit-Proof
              </span>
              <span className="inline-block">, Always</span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-300/0 via-emerald-400/50 to-emerald-300/0 animate-pulse"></div>
            </h2>

            {/* Enhanced description with fade-in animation */}
            <p className="poppins-regular text-xl text-emerald-700 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-100">
              We design sophisticated PPT compliance systems that eliminate penalties, 
              <br className="hidden md:block" />
              exceed HMRC audit standards, and empower your team.
            </p>

            {/* Premium CTA buttons with enhanced animations */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up delay-200">
              <Button
                size="lg"
                className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 group/button relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/0 via-emerald-600/50 to-emerald-600/0 animate-shine"></div>
                <span className="relative z-10 flex items-center">
                  Book Your Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform duration-500" />
                </span>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="poppins-semibold group/button bg-white/90 backdrop-blur-sm border border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-all duration-500 hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  Watch Demo
                  <div className="ml-2 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center group-hover/button:bg-emerald-200 transition-colors duration-500">
                    <div className="w-2 h-2 bg-emerald-700 rounded-full group-hover/button:scale-110 transition-transform duration-500"></div>
                  </div>
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

      {/* Refined Footer */}
      <footer className="bg-gradient-to-b from-emerald-50 via-emerald-50 to-emerald-100/50 relative overflow-hidden">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.03)_0%,transparent_50%)]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(6,95,70,0.03)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:40px_40px] animate-shimmer"></div>
        </div>

        <div className="relative z-10">
          {/* Main footer content */}
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <div className="mb-5">
                  <MeridianLogo size="md" variant="modern" className="text-emerald-700" />
                </div>
                <p className="text-emerald-700 mb-5 text-sm leading-relaxed">
                  We help businesses like yours handle plastic packaging tax without the headache. Making PPT data collection simple, so you can focus on what matters.
                </p>
                <div className="flex items-center space-x-3">
                  {[
                    { name: "LinkedIn", icon: "💼" },
                    { name: "Twitter", icon: "🐦" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="w-7 h-7 bg-emerald-100 hover:bg-emerald-200 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                      title={social.name}
                    >
                      <span className="text-sm">{social.icon}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 mb-5 text-sm tracking-wider uppercase">Services</h3>
                <div className="space-y-3">
                  {[
                    "PPT Strategy & Advisory",
                    "Compliance Architecture",
                    "Systems Integration",
                    "Risk Management",
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block text-emerald-700 hover:text-emerald-900 text-sm transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 mb-5 text-sm tracking-wider uppercase">Expertise</h3>
                <div className="space-y-3">
                  {[
                    "Industry Insights",
                    "Client Success Stories",
                    "Thought Leadership",
                    "Research & Publications",
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block text-emerald-700 hover:text-emerald-900 text-sm transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="poppins-semibold text-emerald-900 mb-5 text-sm tracking-wider uppercase">Connect</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-emerald-800 text-sm poppins-medium">London</p>
                    <p className="text-emerald-700 text-sm">One Canada Square, Canary Wharf</p>
                  </div>
                  <div>
                    <p className="text-emerald-800 text-sm poppins-medium">Enquiries</p>
                    <p className="text-emerald-700 text-sm">enquiries@meridianmetrics.com</p>
                  </div>
                  <div>
                    <p className="text-emerald-800 text-sm poppins-medium">Advisory Team</p>
                    <p className="text-emerald-700 text-sm">+44 (0) 20 7123 4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-emerald-200/80">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                <div className="flex items-center">
                  <span className="text-emerald-700 text-xs">&copy; 2024 MeridianMetrics Ltd. All rights reserved.</span>
                </div>
                <div className="flex items-center space-x-6 text-xs">
                  <Link href="#" className="text-emerald-700 hover:text-emerald-900 transition-colors duration-300">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="text-emerald-700 hover:text-emerald-900 transition-colors duration-300">
                    Terms of Service
                  </Link>
                  <Link href="#" className="text-emerald-700 hover:text-emerald-900 transition-colors duration-300">
                    Cookie Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
