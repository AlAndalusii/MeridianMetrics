"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Recycle, 
  Zap, 
  FileText, 
  Trash2,
  ArrowRight,
  Clock,
  Shield
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"

const quizOptions = [
  {
    id: "ppt",
    title: "PPT - Plastic Packaging Tax",
    description: "£210/tonne tax on plastic packaging. Do you have valid recycled content certificates?",
    icon: Package,
    color: "emerald",
    duration: "5 minutes",
    questions: "19 questions",
    targetAudience: "Businesses handling 10+ tonnes plastic packaging annually",
    link: "/assessment",
    isActive: true,
  },
  {
    id: "epr",
    title: "EPR - Extended Producer Responsibility",
    description: "New packaging fees launched January 2025. Are you registered? Are you overpaying?",
    icon: Recycle,
    color: "blue",
    duration: "2 minutes",
    questions: "10 questions",
    targetAudience: "Businesses handling 25+ tonnes packaging with £1M+ turnover",
    link: "/quiz/epr",
    isActive: true,
  },
  {
    id: "simpler-recycling",
    title: "Simpler Recycling - Workplace Waste",
    description: "New rules (31 March 2025) require all businesses to separate waste into 3 bins. Are you compliant?",
    icon: Trash2,
    color: "green",
    duration: "2 minutes",
    questions: "10 questions",
    targetAudience: "Businesses with 10+ employees",
    link: "/quiz/simpler-recycling",
    isActive: true,
  },
  {
    id: "weee",
    title: "WEEE - Waste Electronics Compliance",
    description: "Selling electronics, light bulbs, or anything with a plug? You might need WEEE registration.",
    icon: Zap,
    color: "purple",
    duration: "2 minutes",
    questions: "10 questions",
    targetAudience: "Manufacturers, importers, and sellers of electrical products",
    link: "/quiz/weee",
    isActive: false,
  },
  {
    id: "prn",
    title: "PRN - Packaging Recovery Notes",
    description: "Do you need to buy PRNs by January 31? Miss this deadline and face criminal prosecution.",
    icon: FileText,
    color: "amber",
    duration: "2 minutes",
    questions: "10 questions",
    targetAudience: "Businesses with 50+ tonnes packaging and £2M+ turnover",
    link: "/quiz/prn",
    isActive: false,
  },
]

const colorClasses = {
  emerald: {
    bg: "from-emerald-50 to-emerald-100",
    border: "border-emerald-200",
    text: "text-emerald-700",
    button: "bg-emerald-600 hover:bg-emerald-700",
    icon: "text-emerald-600",
  },
  blue: {
    bg: "from-blue-50 to-blue-100",
    border: "border-blue-200",
    text: "text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
    icon: "text-blue-600",
  },
  purple: {
    bg: "from-purple-50 to-purple-100",
    border: "border-purple-200",
    text: "text-purple-700",
    button: "bg-purple-600 hover:bg-purple-700",
    icon: "text-purple-600",
  },
  amber: {
    bg: "from-amber-50 to-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
    button: "bg-amber-600 hover:bg-amber-700",
    icon: "text-amber-600",
  },
  green: {
    bg: "from-green-50 to-green-100",
    border: "border-green-200",
    text: "text-green-700",
    button: "bg-green-600 hover:bg-green-700",
    icon: "text-green-600",
  },
}

export default function QuizSelectorPage() {
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="hover:opacity-80 transition-opacity cursor-pointer">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="poppins-medium border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
              <Shield className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="poppins-semibold text-sm text-emerald-700">
                Millstone Compliance Assessments
              </span>
            </div>
            
            <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-6">
              Which Regulation Do You Need Help With?
            </h1>
            
            <p className="poppins-regular text-lg sm:text-xl text-emerald-700 max-w-3xl mx-auto">
              Take our 2-minute assessment to find out if you're compliant and what steps you need to take
            </p>
          </div>

          {/* Quiz Options Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {quizOptions.map((quiz) => {
              const colors = colorClasses[quiz.color as keyof typeof colorClasses]
              const Icon = quiz.icon

              return (
                <div
                  key={quiz.id}
                  className={`bg-gradient-to-br ${colors.bg} rounded-2xl p-8 border-2 ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col min-h-[400px] ${
                    !quiz.isActive ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center ${colors.border} border-2`}>
                      <Icon className={`w-7 h-7 ${colors.icon}`} />
                    </div>
                    
                    {!quiz.isActive && (
                      <span className="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs poppins-semibold">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <div className="flex-grow">
                    <h2 className={`poppins-bold text-2xl ${colors.text} mb-3`}>
                      {quiz.title}
                    </h2>

                    <p className="poppins-regular text-sm text-gray-700 mb-4 leading-relaxed min-h-[40px]">
                      {quiz.description}
                    </p>

                    {quiz.targetAudience && (
                      <div className="mb-4 p-3 bg-white/60 rounded-lg border border-white min-h-[52px] flex items-center">
                        <p className="poppins-medium text-xs text-gray-600">
                          <span className="font-semibold">Who this is for:</span> {quiz.targetAudience}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="poppins-medium text-sm text-gray-600">
                          {quiz.duration}
                        </span>
                      </div>
                      <div className="w-px h-4 bg-gray-300"></div>
                      <span className="poppins-medium text-sm text-gray-600">
                        {quiz.questions}
                      </span>
                    </div>
                  </div>

                  {quiz.isActive ? (
                    <Link href={quiz.link}>
                      <Button
                        className={`w-full poppins-semibold ${colors.button} text-white shadow-md hover:shadow-lg transition-all duration-300 group py-6`}
                      >
                        <span className="flex items-center justify-center w-full">
                          Start {quiz.title.split(" - ")[0]} Quiz
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      className="w-full poppins-semibold bg-gray-300 text-gray-500 cursor-not-allowed py-6"
                    >
                      Coming Soon
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          {/* Not Sure Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-emerald-200 shadow-lg">
            <div className="text-center">
              <h3 className="poppins-bold text-2xl text-emerald-900 mb-4">
                Not Sure Which Regulations Apply?
              </h3>
              <p className="poppins-regular text-emerald-700 mb-6 max-w-2xl mx-auto">
                Book a free 15-minute consultation and we'll help you understand your compliance obligations
              </p>
              <Button
                onClick={() => setShowCalendlyModal(true)}
                className="poppins-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
              >
                Book Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={showCalendlyModal} 
        onClose={() => setShowCalendlyModal(false)} 
      />
    </div>
  )
}
