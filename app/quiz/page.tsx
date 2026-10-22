"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ClipboardCheck,
  CalendarClock,
  ListChecks,
  FileText,
  ArrowRight,
  Clock,
  BadgeCheck
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { useBooking } from "@/components/BookingProvider"

const quizOptions = [
  {
    id: "readiness",
    title: "Readiness Check - Digital Waste Tracking",
    description: "10 quick questions on registration, reporting, codes and deadlines. Find out if your site is reporting properly, or if loads are slipping through.",
    icon: ClipboardCheck,
    color: "emerald",
    duration: "3 minutes",
    questions: "10 questions",
    targetAudience: "Permitted sites that receive waste: scrap yards, transfer stations, skip yards and recyclers",
    link: "/free-check",
    cta: "Start the Readiness Check",
    isActive: true,
  },
  {
    id: "deadline",
    title: "Deadline Checker - Two Working Days",
    description: "Tap the day a load arrives and see the day it must be reported by. Weekends are handled for you.",
    icon: CalendarClock,
    color: "green",
    duration: "1 minute",
    questions: "1 tap",
    targetAudience: "Anyone at the site who reports loads to Defra",
    link: "/waste-cost-savings",
    cta: "Open the Deadline Checker",
    isActive: true,
  },
  {
    id: "codes",
    title: "Codes Guide - EWC and R/D Codes",
    description: "The EWC codes scrap and skip yards see most, and how to pick the right R or D code for each load.",
    icon: ListChecks,
    color: "blue",
    duration: "5 minutes",
    questions: "Plain English guide",
    targetAudience: "Scrap yards, skip yards and transfer stations building a code template",
    link: "/guides/ewc-codes-scrap-skip-yards",
    cta: "Read the Codes Guide",
    isActive: true,
  },
  {
    id: "paperwork",
    title: "Paperwork Guide - Transfer Notes",
    description: "Do you still need paper waste transfer notes? Yes. What still applies, what's new, and how to avoid doing the same job twice.",
    icon: FileText,
    color: "amber",
    duration: "3 minutes",
    questions: "Plain English guide",
    targetAudience: "Site owners and office managers handling the paperwork",
    link: "/guides/waste-transfer-notes",
    cta: "Read the Paperwork Guide",
    isActive: true,
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
  const { openBooking } = useBooking()

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
              <BadgeCheck className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="poppins-semibold text-sm text-emerald-700">
                Free Digital Waste Tracking Checks
              </span>
            </div>
            
            <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-6">
              Is Your Site Ready for Digital Waste Tracking?
            </h1>

            <p className="poppins-regular text-lg sm:text-xl text-emerald-700 max-w-3xl mx-auto">
              Free checks and plain answers for permitted waste sites. Start with the 3-minute readiness check.
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
                          {quiz.cta}
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
                Rather Hand It Over?
              </h3>
              <p className="poppins-regular text-emerald-700 mb-6 max-w-2xl mx-auto">
                Email me your tickets and I&apos;ll report every load to Defra on time. Two weeks free, no card, no contract.
              </p>
              <Button
                onClick={() => openBooking()}
                className="poppins-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg"
              >
                Book a Free 15-Minute Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      </div>
  )
}
