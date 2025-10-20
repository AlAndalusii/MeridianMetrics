"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  CheckCircle, 
  Shield,
  Sparkles,
  Target,
  Zap,
  TrendingUp,
  Users,
  Award,
  Clock,
  FileCheck,
  Brain,
  Rocket,
  BarChart3
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import Footer from "@/components/Footer"

export default function AboutPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Rotate metrics animation
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { value: "250+", label: "Businesses Helped", icon: Users },
    { value: "99%", label: "Compliance Rate", icon: Shield },
    { value: "3min", label: "Assessment Time", icon: Clock },
    { value: "£2M+", label: "Penalties Avoided", icon: Award }
  ]

  const process = [
    {
      icon: Brain,
      title: "Analyse",
      description: "Smart assessment identifies your gaps",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Solve",
      description: "Clear roadmap to full compliance",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Protect",
      description: "Ongoing monitoring and support",
      color: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <Button 
              onClick={() => router.push("/assessment")}
              className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3"
            >
              <span className="hidden xs:inline">FREE COMPLIANCE CHECK</span>
              <span className="xs:hidden">ASSESSMENT</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-float-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-100/10 to-blue-100/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-blue-100 border border-emerald-200 mb-8 shadow-lg">
              <Sparkles className="w-4 h-4 text-emerald-600 mr-2 animate-pulse" />
              <span className="poppins-semibold text-sm text-emerald-900 uppercase tracking-wide">About Us</span>
            </div>

            {/* Main Heading */}
            <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-emerald-900 mb-6 leading-tight">
              PPT Compliance
              <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mt-2">
                Made Simple
              </span>
            </h1>

            <p className="poppins-regular text-lg sm:text-xl md:text-2xl text-emerald-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              We turn complex regulations into clear action plans
            </p>

            {/* Animated Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className={`relative group transition-all duration-500 ${
                    activeMetric === index ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <div className={`bg-white/80 backdrop-blur-xl rounded-2xl border-2 p-6 transition-all duration-500 ${
                    activeMetric === index 
                      ? 'border-emerald-400 shadow-2xl shadow-emerald-500/20' 
                      : 'border-emerald-100 shadow-lg'
                  }`}>
                    <metric.icon className={`w-8 h-8 mx-auto mb-3 transition-all duration-500 ${
                      activeMetric === index ? 'text-emerald-600 scale-110' : 'text-emerald-500'
                    }`} />
                    <div className={`text-3xl poppins-bold mb-1 transition-all duration-500 ${
                      activeMetric === index ? 'text-emerald-600' : 'text-emerald-900'
                    }`}>
                      {metric.value}
                    </div>
                    <div className="text-xs poppins-medium text-emerald-700 uppercase tracking-wide">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-4">
                <Target className="w-4 h-4 text-emerald-600 mr-2" />
                <span className="poppins-semibold text-xs text-emerald-900 uppercase tracking-wide">What We Do</span>
              </div>
              
              <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 leading-tight">
                We eliminate
                <span className="block text-emerald-600">PPT compliance stress</span>
              </h2>
              
              <p className="poppins-regular text-lg text-emerald-700 leading-relaxed">
                Most businesses struggle with PPT because it's complex, time-consuming, and the penalties are severe. We've simplified the entire process.
              </p>

              <div className="space-y-4">
                {[
                  "Identify documentation gaps before audits",
                  "Collect and verify supplier certificates",
                  "Build audit-ready record systems",
                  "Monitor deadlines and changes"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-600 transition-all duration-300">
                      <CheckCircle className="w-4 h-4 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="poppins-regular text-base text-emerald-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Mockup */}
            <div className="relative">
              {/* Floating Dashboard Cards */}
              <div className="relative h-[500px]">
                {/* Main Card */}
                <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100 p-6 shadow-2xl animate-float-slow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="poppins-semibold text-sm text-emerald-900">Compliance Dashboard</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-100 border border-green-200">
                      <span className="text-xs poppins-semibold text-green-700">99% Ready</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-600 poppins-medium">Certificates</span>
                      <span className="text-xs text-emerald-900 poppins-semibold">18/18 ✓</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{width: '100%'}}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-emerald-600 poppins-medium">Records</span>
                      <span className="text-xs text-emerald-900 poppins-semibold">45/47</span>
                    </div>
                    <div className="w-full bg-emerald-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                </div>

                {/* Floating Card 1 */}
                <div className="absolute top-40 -right-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 shadow-xl w-48 animate-float-slow-reverse">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-white" />
                    <span className="text-sm poppins-semibold text-white">Audit Ready</span>
                  </div>
                  <p className="text-xs text-emerald-50">All documentation verified and organized</p>
                </div>

                {/* Floating Card 2 */}
                <div className="absolute bottom-20 -left-8 bg-white/90 backdrop-blur-xl rounded-xl border border-blue-200 p-4 shadow-xl w-52 animate-float-slow">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span className="text-sm poppins-semibold text-blue-900">Real-Time Tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map((i) => (
                      <div key={i} className="flex-1 bg-blue-100 rounded-full h-8 relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                          style={{height: `${Math.random() * 80 + 20}%`}}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute top-10 right-10 w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shadow-lg animate-bounce">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div className="absolute bottom-10 left-20 w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shadow-lg animate-pulse">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Do It Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-emerald-50/30 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
              <Rocket className="w-4 h-4 text-blue-600 mr-2" />
              <span className="poppins-semibold text-xs text-blue-900 uppercase tracking-wide">How We Do It</span>
            </div>
            
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4">
              Three steps to
              <span className="block text-blue-600">compliance confidence</span>
            </h2>
            <p className="poppins-regular text-lg text-emerald-700 max-w-2xl mx-auto">
              Our process is designed for speed and simplicity
            </p>
          </div>

          {/* Process Cards */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300"></div>
            
            {process.map((step, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-emerald-100 p-8 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl poppins-bold">{index + 1}</span>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="poppins-bold text-2xl text-emerald-900 mb-3">{step.title}</h3>
                  <p className="poppins-regular text-base text-emerald-700 leading-relaxed">{step.description}</p>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 via-blue-400/20 to-purple-400/20 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              onClick={() => router.push("/assessment")}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white poppins-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              See It In Action
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 border border-purple-200 mb-4">
              <Award className="w-4 h-4 text-purple-600 mr-2" />
              <span className="poppins-semibold text-xs text-purple-900 uppercase tracking-wide">Why Us</span>
            </div>
            
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4">
              Built by experts
              <span className="block text-purple-600">for businesses like yours</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Brain,
                title: "Expert Knowledge",
                description: "Former tax specialists who understand the regulations inside out",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "3-minute assessment, instant results, immediate action plan",
                color: "from-amber-500 to-amber-600"
              },
              {
                icon: Shield,
                title: "Zero Risk",
                description: "Audit-ready systems that withstand scrutiny",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: TrendingUp,
                title: "Always Current",
                description: "We track regulation changes so you don't have to",
                color: "from-purple-500 to-purple-600"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 hover:border-emerald-300 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-md`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">{feature.title}</h3>
                  <p className="poppins-regular text-sm text-emerald-700 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-700 rounded-3xl p-12 sm:p-16 text-white relative overflow-hidden shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15)_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow"></div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                <Sparkles className="w-4 h-4 text-white mr-2 animate-pulse" />
                <span className="text-sm poppins-semibold text-white uppercase tracking-wide">Get Started Today</span>
              </div>

              <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl mb-6">
                Ready to simplify your PPT compliance?
              </h2>
              <p className="poppins-regular text-lg text-emerald-50 mb-10 max-w-2xl mx-auto">
                Start with our free 3-minute assessment and get instant insights into your compliance status
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => router.push("/assessment")}
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Start Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 poppins-semibold backdrop-blur-sm bg-transparent"
                >
                  <FileCheck className="w-5 h-5 mr-2" />
                  Book Expert Review
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-10 border-t border-white/20">
                {[
                  { icon: Clock, text: "3 minutes" },
                  { icon: Shield, text: "100% Confidential" },
                  { icon: CheckCircle, text: "Instant Results" },
                  { icon: Zap, text: "Action Plan Included" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="poppins-medium text-sm text-emerald-50">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

