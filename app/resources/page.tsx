"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ClipboardCheck, Recycle, Package, Calculator, ListChecks, FileSearch, Users, BarChart3, Zap, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import Footer from "@/components/Footer"
import { MobileMenu } from "@/components/MobileMenu"

export default function ResourcesPage() {
  const router = useRouter()

  const resources = [
    {
      title: "EPR Packaging: A Plain English Guide for UK Businesses",
      description: "What EPR is, whether it applies to your business, what you need to do, and the key dates you can't miss — explained simply. Includes 6 practical tips and common Q&As.",
      icon: Recycle,
      href: "/resources/epr-packaging",
      badge: "New",
      topics: ["EPR Basics", "2026 Deadlines", "Fees", "Tips"]
    },
    {
      title: "Outsourced Compliance Team",
      description: "Complete guide to outsourcing compliance vs hiring in-house. Compare costs, understand what's included, and see how to get expert support from £299/month.",
      icon: Users,
      href: "/resources/outsourced-compliance-team",
      badge: "New",
      topics: ["Cost Savings", "Expert Support", "Full Service", "Multi-Site"]
    },
    {
      title: "Waste Duty of Care Guide",
      description: "Complete UK Duty of Care compliance guide covering legal requirements, Waste Transfer Notes, carrier verification, and how to avoid £300 penalties and prosecution.",
      icon: ClipboardCheck,
      href: "/resources/duty-of-care-waste",
      badge: "Essential",
      topics: ["Legal Requirements", "Documentation", "Penalties", "WTN"]
    },
    {
      title: "Simpler Recycling for Businesses",
      description: "Complete 2025 compliance guide covering deadlines, the 4 mandatory waste streams, penalties, and practical implementation steps for UK businesses.",
      icon: Recycle,
      href: "/resources/simpler-recycling-businesses",
      badge: "Popular",
      topics: ["Waste Compliance", "Deadlines", "Food Waste", "Regulations"]
    },
    {
      title: "April 2027 PPT Changes: What UK Businesses Need to Know",
      description: "Two major rule changes are coming to Plastic Packaging Tax in April 2027. Factory scraps will no longer count, and chemical recycling will count (with certification). Find out how to prepare.",
      icon: Package,
      href: "/resources/plastic-packaging-tax-2027",
      badge: "New",
      topics: ["2027 Changes", "Chemical Recycling", "Factory Scraps", "Action Plan"]
    },
    {
      title: "What Is Plastic Packaging Tax?",
      description: "A simple beginner's guide explaining the UK plastic packaging tax in plain English. Perfect for businesses new to PPT compliance in 2025.",
      icon: Package,
      href: "/resources/plastic-packaging-tax-explained",
      badge: "Essential",
      topics: ["Beginner", "PPT Basics", "2025 Rates", "Registration"]
    },
    {
      title: "Plastic Packaging Tax Guide",
      description: "Complete guide to records and accounts you must keep for Plastic Packaging Tax. Learn what HMRC requires in simple, easy-to-understand language.",
      icon: Calculator,
      href: "/resources/plastic-packaging-tax",
      badge: "Essential",
      topics: ["Records", "Accounts", "Evidence", "Compliance"]
    },
    {
      title: "PPT Compliance Checklist",
      description: "Download our comprehensive checklist to ensure you have all the documentation HMRC requires. Perfect for quarterly reviews.",
      icon: ListChecks,
      href: "#",
      badge: "Coming Soon",
      topics: ["Checklist", "Documentation", "Quarterly Review"]
    },
    {
      title: "HMRC Audit Preparation",
      description: "How to prepare for an HMRC audit and what to expect. Essential reading for businesses registered for PPT.",
      icon: FileSearch,
      href: "#",
      badge: "Coming Soon",
      topics: ["Audit", "Preparation", "HMRC"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button 
                onClick={() => router.push("/quiz")}
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px]"
              >
                <span className="hidden xs:inline">FREE COMPLIANCE CHECK</span>
                <span className="xs:hidden">ASSESSMENT</span>
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-4">
            RESOURCES
          </h1>
          <h2 className="poppins-semibold text-2xl sm:text-3xl md:text-4xl text-emerald-700 mb-6">
            Compliance Guides & Resources
          </h2>
          <p className="poppins-regular text-lg sm:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            Expert guides, checklists, and tools to help you stay compliant with UK packaging and waste regulations
          </p>
        </div>

        {/* Featured Tool: Gap Analyser */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 overflow-hidden shadow-2xl shadow-green-900/20 relative">
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
                <button
                  onClick={() => router.push("/simpler-recycling-gap-analyser")}
                  className="inline-flex items-center justify-center gap-2 poppins-bold bg-white text-green-800 hover:bg-green-50 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group text-sm"
                >
                  <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Analyse My Compliance Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push("/resources/simpler-recycling-businesses")}
                  className="inline-flex items-center justify-center gap-2 poppins-semibold bg-white/15 hover:bg-white/25 text-white border border-white/30 px-6 py-4 rounded-2xl transition-all duration-300 text-sm"
                >
                  Read the Guide
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Link
              key={index}
              href={resource.href}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-emerald-100 p-8 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                  <resource.icon className="w-7 h-7 text-emerald-600" />
                </div>
                {resource.badge && (
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs poppins-semibold">
                    {resource.badge}
                  </span>
                )}
              </div>
              
              <h2 className="poppins-semibold text-xl text-emerald-900 mb-3 group-hover:text-emerald-700 transition-colors">
                {resource.title}
              </h2>
              <p className="poppins-regular text-sm text-emerald-700 mb-6 leading-relaxed">
                {resource.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {resource.topics.map((topic, topicIndex) => (
                  <span
                    key={topicIndex}
                    className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-xs poppins-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-emerald-600 poppins-semibold text-sm group-hover:text-emerald-700 transition-colors">
                Read guide
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-700 rounded-3xl p-10 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="poppins-bold text-3xl sm:text-4xl mb-4">
              Not sure where you stand?
            </h2>
            <p className="poppins-regular text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Start with our free AI-powered Gap Analyser — get your compliance score in 3 minutes, or book a full expert audit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                onClick={() => router.push("/simpler-recycling-gap-analyser")}
                size="lg"
                className="poppins-bold bg-white text-green-800 hover:bg-green-50 shadow-xl px-8 py-5 text-base group"
              >
                <BarChart3 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Try the Free Gap Analyser
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => router.push("/quiz")}
                size="lg"
                className="poppins-semibold bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 shadow-lg px-8 py-5 text-base"
              >
                Full Compliance Assessment
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

