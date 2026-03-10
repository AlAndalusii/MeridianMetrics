"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BadgeCheck,
  Target,
  Brain,
  FileCheck,
  CheckCircle,
  Clock,
  BarChart3,
  TrendingUp,
  Recycle,
  Zap,
  Settings,
  Mail,
  Building,
  Users,
  CheckCircle2
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import Footer from "@/components/Footer"
import { MobileMenu } from "@/components/MobileMenu"
import { ContactModal } from "@/components/ContactModal"
import { Navigation } from "@/components/Navigation"

export default function AboutPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <Navigation />

      {/* Hero */}
      <div className={`pt-32 pb-16 px-4 sm:px-6 max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-4 leading-tight">
              About Millstone Compliance
            </h1>
            <p className="poppins-regular text-xl text-emerald-700">
              Waste compliance for care homes, children&apos;s homes and agencies
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
                We help UK care homes, children&apos;s homes and estate agents handle waste rules. Our focus: clear advice on what you need to do, no confusing jargon.
              </p>
              <div className="space-y-3">
                {[
                  "UK government regulatory experience",
                  "Cambridge sustainability trained",
                  "Independent waste compliance experts"
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
                    <BadgeCheck className="w-6 h-6 text-emerald-600" />
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
                    <span className="text-xs text-emerald-600">Waste Compliance</span>
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
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="poppins-bold text-4xl sm:text-5xl text-emerald-900 mb-4 tracking-tight">
              What We Do
            </h2>
            <p className="poppins-regular text-lg text-emerald-700 max-w-xl mx-auto">
              We help UK care homes and agencies stay compliant with waste regulations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {[
              {
                icon: FileCheck,
                title: "Check",
                description: "Quick 3-minute review of your setup"
              },
              {
                icon: Brain,
                title: "Find gaps",
                description: "Show you what's missing or wrong"
              },
              {
                icon: Settings,
                title: "Fix it",
                description: "Get your paperwork in order"
              },
              {
                icon: Users,
                title: "Stay safe",
                description: "Keep track of new rules"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="poppins-semibold text-xl text-emerald-900 mb-2">{item.title}</h3>
                <p className="poppins-regular text-sm text-emerald-700 leading-relaxed">{item.description}</p>
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
                    <span className="text-xs text-emerald-700">Waste Transfer Notes</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-700">Carrier Licences</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="w-full bg-emerald-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-1000" style={{width: '95%'}}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-700">Clinical Waste Records</span>
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
                  { icon: Recycle, label: "15+ checks", value: "Thorough" },
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

      {/* Premium CTA Section - World Class */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
              <Zap className="w-4 h-4 text-white animate-pulse" />
              <span className="poppins-semibold text-sm text-white uppercase tracking-wider">Take Action Now</span>
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden group animate-fade-in-up">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-float-slow"></div>
              <div className="absolute top-20 right-20 w-3 h-3 bg-white/20 rounded-full animate-float-slow-reverse"></div>
              <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-white/30 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-float-slow-reverse"></div>
            </div>

            <div className="relative z-10">
              {/* Heading */}
              <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4 text-center tracking-tight">
                Ready to get compliant?
              </h2>
              
              <p className="poppins-regular text-base sm:text-lg text-emerald-50 max-w-2xl mx-auto text-center mb-10 leading-relaxed">
                Our free 3-minute check finds waste compliance gaps and tells you exactly what to fix — before a council, CQC or Ofsted visit does
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
                <Button
                  onClick={() => router.push("/quiz")}
                  className="group/btn bg-white hover:bg-emerald-50 text-emerald-700 poppins-semibold shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-base sm:text-lg relative overflow-hidden min-w-[240px]"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Start Free Assessment
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Button>

                <Button
                  onClick={() => setShowContactModal(true)}
                  className="group/btn bg-white hover:bg-emerald-50 text-emerald-700 poppins-semibold shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-base sm:text-lg relative overflow-hidden min-w-[240px]"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Contact Us
                  </span>
                </Button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2 text-white/90 group/feature">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/feature:bg-white/20 transition-colors">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="poppins-medium text-sm">3 minutes</span>
                </div>

                <div className="w-px h-6 bg-white/30 hidden sm:block"></div>

                <div className="flex items-center gap-2 text-white/90 group/feature">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/feature:bg-white/20 transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="poppins-medium text-sm">UK COMPLIANT</span>
                </div>

                <div className="w-px h-6 bg-white/30 hidden sm:block"></div>

                <div className="flex items-center gap-2 text-white/90 group/feature">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover/feature:bg-white/20 transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="poppins-medium text-sm">Instant results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="text-center mt-8 animate-fade-in">
            <p className="poppins-regular text-sm text-emerald-600">
              Trusted by care homes, children&apos;s homes and agencies across the UK
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal 
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
      />
    </div>
  )
}
