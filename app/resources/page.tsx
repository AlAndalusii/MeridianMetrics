"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Book, FileCheck, Shield, Download } from "lucide-react"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import Footer from "@/components/Footer"

export default function ResourcesPage() {
  const router = useRouter()

  const resources = [
    {
      title: "What Is Plastic Packaging Tax?",
      description: "A simple beginner's guide explaining the UK plastic packaging tax in plain English. Perfect for businesses new to PPT compliance in 2025.",
      icon: Book,
      href: "/resources/plastic-packaging-tax-explained",
      badge: "New",
      topics: ["Beginner", "PPT Basics", "2025 Rates", "Registration"]
    },
    {
      title: "Plastic Packaging Tax Guide",
      description: "Complete guide to records and accounts you must keep for Plastic Packaging Tax. Learn what HMRC requires in simple, easy-to-understand language.",
      icon: Book,
      href: "/resources/plastic-packaging-tax",
      badge: "Popular",
      topics: ["Records", "Accounts", "Evidence", "Compliance"]
    },
    {
      title: "PPT Compliance Checklist",
      description: "Download our comprehensive checklist to ensure you have all the documentation HMRC requires. Perfect for quarterly reviews.",
      icon: FileCheck,
      href: "#",
      badge: "Coming Soon",
      topics: ["Checklist", "Documentation", "Quarterly Review"]
    },
    {
      title: "HMRC Audit Preparation",
      description: "How to prepare for an HMRC audit and what to expect. Essential reading for businesses registered for PPT.",
      icon: Shield,
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-4">
            RESOURCES
          </h1>
          <h2 className="poppins-semibold text-2xl sm:text-3xl md:text-4xl text-emerald-700 mb-6">
            Plastic Packaging Tax Resources
          </h2>
          <p className="poppins-regular text-lg sm:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            Expert guides, checklists, and tools to help you stay compliant with UK Plastic Packaging Tax regulations
          </p>
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
        <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="relative z-10">
            <h2 className="poppins-bold text-3xl sm:text-4xl mb-4">
              Need personalised guidance?
            </h2>
            <p className="poppins-regular text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
              Get a free assessment of your specific PPT compliance situation
            </p>
            <Button
              onClick={() => router.push("/quiz")}
              size="lg"
              className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-semibold shadow-xl"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

