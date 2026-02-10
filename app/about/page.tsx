"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Shield,
  Target,
  Brain,
  FileCheck,
  Users,
  Building,
  Mail,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  Package,
  Zap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import Footer from "@/components/Footer"
import { CONTACT_INFO } from "@/lib/constants"

export default function AboutPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <Button 
              onClick={() => router.push("/quiz")}
              className="poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3"
            >
              <span className="hidden xs:inline">FREE COMPLIANCE CHECK</span>
              <span className="xs:hidden">ASSESSMENT</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className={`pt-32 pb-16 px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-4 leading-tight">
            About Millstone Compliance
          </h1>
          <p className="poppins-regular text-xl text-emerald-700">
            Practical PPT compliance for UK businesses
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Building className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-3xl text-emerald-900">Who We Are</h2>
              </div>
              <p className="poppins-regular text-base text-emerald-700 leading-relaxed mb-6">
                We're PPT compliance specialists. Founded to provide practical help with Plastic Packaging Tax—not theory, just clear action.
              </p>
              <div className="space-y-3">
                {[
                  "UK government tax experience",
                  "Cambridge sustainability trained",
                  "PPT-focused expertise"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Mockup */}
            <div className="relative h-[400px]">
              {/* Credentials Card */}
              <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100 p-6 shadow-xl max-w-sm animate-float-slow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="poppins-semibold text-sm text-emerald-900">Credentials</h3>
                    <p className="text-xs text-emerald-600">Verified Experience</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <p className="text-xs poppins-medium text-emerald-900 mb-1">UK Government</p>
                    <p className="text-xs text-emerald-600">Tax Systems Experience</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                    <p className="text-xs poppins-medium text-emerald-900 mb-1">Cambridge CISL</p>
                    <p className="text-xs text-emerald-600">Sustainability Leadership</p>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-xl rounded-xl border border-emerald-100 p-5 shadow-xl max-w-xs animate-float-slow-reverse">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <span className="poppins-semibold text-sm text-emerald-900">Specialization</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-600">PPT Focus</span>
                    <span className="text-xs poppins-semibold text-emerald-900">100%</span>
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-3xl text-emerald-900">What We Do</h2>
            </div>
            <p className="poppins-regular text-base text-emerald-700 max-w-2xl mx-auto">
              We identify gaps, organise documentation, and build audit-ready systems
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck,
                title: "Assessment",
                description: "3-minute compliance review"
              },
              {
                icon: Brain,
                title: "Analysis",
                description: "Identify what needs fixing"
              },
              {
                icon: Shield,
                title: "Implementation",
                description: "Organise your records"
              },
              {
                icon: Users,
                title: "Support",
                description: "Track changes & deadlines"
              }
            ].map((item, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">{item.title}</h3>
                  <p className="poppins-regular text-sm text-emerald-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Mockup */}
            <div className="order-2 lg:order-1 relative h-[400px]">
              {/* Assessment Dashboard */}
              <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100 p-6 shadow-xl animate-float-slow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="poppins-semibold text-sm text-emerald-900">Assessment Running</span>
                  </div>
                  <span className="text-xs text-emerald-600 poppins-medium">3min</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-700">Supplier Certificates</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-700">Weight Records</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{width: '95%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-700">Export Documentation</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-1000" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>

              {/* Results Preview */}
              <div className="absolute bottom-0 right-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-5 shadow-xl max-w-xs text-white animate-float-slow-reverse">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5" />
                  <span className="poppins-semibold text-sm">Instant Results</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-emerald-50">Compliance Score</span>
                    <span className="text-xl poppins-bold">92%</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-50">
                    <TrendingUp className="w-3 h-3" />
                    <span>Action plan ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="poppins-bold text-3xl text-emerald-900">Our Approach</h2>
              </div>
              <p className="poppins-regular text-base text-emerald-700 leading-relaxed mb-6">
                Our assessment checks 15+ compliance areas in 3 minutes. You get immediate feedback showing what's solid and what needs attention.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: "3 minutes", value: "Fast" },
                  { icon: Package, label: "15+ checks", value: "Thorough" },
                  { icon: CheckCircle, label: "Instant report", value: "Clear" },
                  { icon: Target, label: "Action plan", value: "Practical" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/60 rounded-xl border border-emerald-100 p-4">
                    <item.icon className="w-5 h-5 text-emerald-600 mb-2" />
                    <p className="text-xs text-emerald-600 mb-1">{item.label}</p>
                    <p className="poppins-semibold text-sm text-emerald-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100 p-8 sm:p-10 text-center">
            <h2 className="poppins-bold text-2xl sm:text-3xl text-emerald-900 mb-4">
              Start Your Assessment
            </h2>
            <p className="poppins-regular text-base text-emerald-700 mb-6">
              Free 3-minute review. Instant feedback on your compliance status.
            </p>
            <Button
              onClick={() => router.push("/quiz")}
              className="bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold shadow-lg"
              size="lg"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-3xl text-emerald-900">Contact</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 p-6 text-center">
              <Mail className="w-6 h-6 text-emerald-600 mx-auto mb-3" />
              <p className="poppins-medium text-xs text-emerald-600 mb-2">Email</p>
              <a 
                href={CONTACT_INFO.mailto}
                className="poppins-regular text-sm text-emerald-900 hover:text-emerald-700 transition-colors break-all"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 p-6 text-center">
              <Users className="w-6 h-6 text-emerald-600 mx-auto mb-3" />
              <p className="poppins-medium text-xs text-emerald-600 mb-2">Phone</p>
              <a 
                href={CONTACT_INFO.tel}
                className="poppins-regular text-sm text-emerald-900 hover:text-emerald-700 transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100 p-6 text-center">
              <Building className="w-6 h-6 text-emerald-600 mx-auto mb-3" />
              <p className="poppins-medium text-xs text-emerald-600 mb-2">Location</p>
              <p className="poppins-regular text-sm text-emerald-900">
                United Kingdom
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
