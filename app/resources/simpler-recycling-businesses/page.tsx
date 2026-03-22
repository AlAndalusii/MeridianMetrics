"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, AlertCircle, Calendar, Trash2, FileCheck, Users, Building, Coffee, Utensils, AlertTriangle, ArrowRight, BarChart3, Zap,
  BadgeCheck } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import { MobileMenu } from "@/components/MobileMenu"

export default function SimplerRecyclingBusinesses() {
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)

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
                onClick={() => setShowCalendlyModal(true)}
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px]"
              >
                <span className="hidden xs:inline">BOOK COMPLIANCE REVIEW</span>
                <span className="xs:hidden">BOOK REVIEW</span>
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 mb-4">
              <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Compliance Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              Simpler Recycling for Businesses: Complete 2025 Compliance Guide
            </h1>
            <p className="poppins-regular text-lg text-emerald-700">
              Everything UK businesses need to know about Simpler Recycling legislation, deadlines, and compliance requirements.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">8 min read</span>
            </div>
          </div>

          {/* Gap Analyser Hero CTA */}
          <div className="mb-10 rounded-3xl overflow-hidden relative bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 shadow-2xl shadow-green-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,transparent_50%)]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-7 sm:p-9">
              {/* Left: icon + score badge */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <BarChart3 className="w-8 h-8 text-green-200 mb-1" />
                <span className="text-green-200 poppins-bold text-lg leading-none">0–10</span>
                <span className="text-green-300 poppins-regular text-xs">Score</span>
              </div>

              {/* Middle: text */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/30 border border-green-400/40 mb-2">
                  <Zap className="w-3 h-3 text-green-300" />
                  <span className="poppins-semibold text-xs text-green-200 uppercase tracking-wide">AI-Powered Tool</span>
                </div>
                <h3 className="poppins-bold text-white text-xl sm:text-2xl mb-2 leading-tight">
                  Find Out Exactly Where Your Business Stands
                </h3>
                <p className="poppins-regular text-green-200 text-sm leading-relaxed max-w-lg">
                  Our Simpler Recycling Gap Analyser scores your compliance 0–10 using Gemini AI — identifying your critical gaps, penalty risks, and a personalised action plan in under 3 minutes.
                </p>
              </div>

              {/* Right: CTA */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <Link href="/simpler-recycling-gap-analyser">
                  <Button className="poppins-bold bg-white text-green-800 hover:bg-green-50 px-7 py-5 text-sm rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group whitespace-nowrap">
                    <BarChart3 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Try the Gap Analyser
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <span className="poppins-regular text-xs text-green-300">Free · AI-scored · Results emailed</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-emerald max-w-none">
            
            {/* Introduction */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">What Is Simpler Recycling and Why It Matters to Your Business</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Simpler Recycling legislation came into force on <strong>31 March 2025</strong> for all businesses in England with 10 or more employees. This government reform fundamentally changed how UK workplaces handle waste, requiring all businesses to separate recyclable materials before collection.
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The regulations affect every type of workplace:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Warehouses and distribution centres</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Offices and retail premises</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Restaurants, hotels, and hospitality venues</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Schools, hospitals, and care homes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Manufacturing facilities and construction sites</span>
                </li>
              </ul>
              <p className="poppins-regular text-emerald-800 leading-relaxed">
                If your business generates waste that resembles household waste, Simpler Recycling applies to you.
              </p>
            </div>

            {/* Deadlines */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Simpler Recycling Start Date and Deadlines
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The Defra Simpler Recycling implementation follows a phased timeline:
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-emerald-900">31 March 2025</span>
                    <span className="poppins-regular text-emerald-800"> – Businesses with 10+ full-time equivalent (FTE) employees must comply (this deadline has passed)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-blue-900">31 March 2026</span>
                    <span className="poppins-regular text-blue-800"> – All households must receive weekly food waste collections and standardised recycling services</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-amber-900">31 March 2027</span>
                    <span className="poppins-regular text-amber-800"> – Micro-firms (fewer than 10 FTE employees) must comply + plastic film collections begin for all businesses</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-red-900 mb-2">Critical clarification:</p>
                <p className="poppins-regular text-red-800 leading-relaxed">
                  Employee count applies to your entire business, not individual sites. A chain with 5 locations and 4 employees each (20 total) is NOT a micro-firm and must comply now.
                </p>
              </div>
            </div>

            {/* Penalties CTA */}
            <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  The True Cost of Non-Compliance
                </h3>
                <p className="poppins-regular text-lg mb-4">
                  Many businesses assume Simpler Recycling is "just about bins." The reality is more serious.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="poppins-semibold text-lg mb-2">Financial Penalties:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• £200 fixed penalty for missing waste documentation</li>
                      <li>• £50 per day ongoing fines for continued non-compliance</li>
                      <li>• Unlimited fines for serious breaches</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h4 className="poppins-semibold text-lg mb-2">Hidden Costs:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Rejected collections (£75-150 per bin)</li>
                      <li>• Lost productivity (15-30 staff hours)</li>
                      <li>• Reputational damage</li>
                      <li>• Lost contracts requiring proof of compliance</li>
                    </ul>
                  </div>
                </div>
                <p className="poppins-regular text-sm mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <strong>Real example:</strong> A 25-employee warehouse received a £200 fixed penalty for missing food waste bins, plus £450 in rejected collection fees when they tried to put food waste in general waste. A compliance audit would have cost a fraction of the fine.
                </p>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  size="lg"
                  className="bg-white text-red-700 hover:bg-red-50 poppins-semibold shadow-xl w-full sm:w-auto"
                >
                  Book Free Compliance Screening
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* The 4 Waste Streams */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">What Your Business Must Do: The 4 Mandatory Waste Streams</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Simpler Recycling regulations require all workplaces to separate waste into four categories before collection:
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="poppins-semibold text-lg text-blue-900 mb-3 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    1. Dry Recyclable Materials (Mixed)
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-blue-800 text-sm">Glass bottles and jars (rinsed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-blue-800 text-sm">Metal cans, foil, and aerosols (rinsed)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-blue-800 text-sm">Plastic bottles, pots, tubs, and trays (rinsed)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                  <h3 className="poppins-semibold text-lg text-green-900 mb-3 flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    2. Paper and Card (Separate)
                  </h3>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-green-800 text-sm">Cardboard boxes and packaging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-green-800 text-sm">Newspapers, magazines, office paper</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-green-800 text-sm">Envelopes and shredded paper</span>
                    </li>
                  </ul>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="poppins-semibold text-green-900 text-sm mb-1">Important:</p>
                    <p className="poppins-regular text-green-800 text-sm">
                      Paper and card must be collected separately from other recyclables unless your waste collector provides a written assessment proving co-collection is necessary.
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                  <h3 className="poppins-semibold text-lg text-orange-900 mb-3 flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    3. Food Waste (Mandatory Regardless of Volume)
                  </h3>
                  <ul className="space-y-2 mb-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-orange-800 text-sm">Leftover meals and food preparation waste</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-orange-800 text-sm">Coffee grounds, tea bags, fruit peels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-orange-800 text-sm">Canteen and staff room waste</span>
                    </li>
                  </ul>
                  <div className="bg-orange-100 rounded-lg p-3">
                    <p className="poppins-semibold text-orange-900 text-sm mb-1 flex items-center gap-2">
                      <Coffee className="w-4 h-4" />
                      Common mistake:
                    </p>
                    <p className="poppins-regular text-orange-800 text-sm">
                      Businesses often assume "we barely produce food waste" exempts them. It doesn't. Even coffee grounds from a staff kitchen require a dedicated food waste bin.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="poppins-semibold text-lg text-gray-900 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    4. General Waste (Non-Recyclable)
                  </h3>
                  <p className="poppins-regular text-gray-800 text-sm">
                    Everything that doesn't fit the categories above.
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Week Action Plan */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">How to Implement Simpler Recycling: 4-Week Action Plan</h2>
              
              <div className="space-y-4">
                <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">Week 1: Assessment</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-emerald-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-emerald-800 text-sm">Count total FTE employees across all sites (are you exempt until 2027?)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-emerald-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-emerald-800 text-sm">List all waste streams currently produced</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-emerald-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-emerald-800 text-sm">Identify where waste is generated (kitchens, loading bays, production areas)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-emerald-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-emerald-800 text-sm">Review current bin setup and collection frequency</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="poppins-semibold text-lg text-blue-900 mb-3">Week 2: Infrastructure</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Order additional bins if needed (food waste caddy + outdoor bin minimum)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Install clear signage on all bins (pictures + text)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Designate waste storage areas with adequate capacity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Contact waste carrier to discuss Simpler Recycling requirements</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                  <h3 className="poppins-semibold text-lg text-purple-900 mb-3">Week 3: Documentation</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Request Waste Transfer Notes from carrier (or set up eDoc system)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Verify carrier registration on public register</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Draft simple waste policy document</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Create staff briefing materials</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                  <h3 className="poppins-semibold text-lg text-green-900 mb-3">Week 4: Training & Launch</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Brief all staff on new bin system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Conduct dry run (monitor contamination for 1 week)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Adjust bin locations based on observed behaviour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Schedule first compliance review for 3 months</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Compliance Gaps */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">The Compliance Gaps We Find Most Often</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Based on 150+ workplace audits since March 2025, these are the most common violations:
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
                  <h3 className="poppins-semibold text-lg text-red-900 mb-2">1. No Food Waste Bin (68% of businesses)</h3>
                  <p className="poppins-regular text-red-800 text-sm mb-2">
                    <strong>Why it happens:</strong> "We don't have a kitchen" or "barely any food waste"
                  </p>
                  <p className="poppins-regular text-red-800 text-sm mb-2">
                    <strong>The fix:</strong> Small caddy for staff room (£15) + outdoor collection bin (provided by carrier)
                  </p>
                  <p className="poppins-semibold text-red-900 text-sm">
                    Risk if ignored: £200 fixed penalty
                  </p>
                </div>

                <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-400">
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-2">2. Paper Mixed with Plastic/Glass Without Written Assessment (47%)</h3>
                  <p className="poppins-regular text-amber-800 text-sm mb-2">
                    <strong>Why it happens:</strong> Waste carrier said "it's fine to mix everything"
                  </p>
                  <p className="poppins-regular text-amber-800 text-sm mb-2">
                    <strong>The fix:</strong> Request written TEEP assessment from carrier OR separate paper/card bins
                  </p>
                  <p className="poppins-semibold text-amber-900 text-sm">
                    Risk if ignored: Compliance notice from Environment Agency
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-400">
                  <h3 className="poppins-semibold text-lg text-orange-900 mb-2">3. Missing Waste Transfer Notes (52%)</h3>
                  <p className="poppins-regular text-orange-800 text-sm mb-2">
                    <strong>Why it happens:</strong> "The bin company just collects it"
                  </p>
                  <p className="poppins-regular text-orange-800 text-sm mb-2">
                    <strong>The fix:</strong> Demand WTNs from carrier or switch to compliant provider
                  </p>
                  <p className="poppins-semibold text-orange-900 text-sm">
                    Risk if ignored: £300 fixed penalty + liability for illegal disposal
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
                  <h3 className="poppins-semibold text-lg text-purple-900 mb-2">4. Hazardous Waste in General Bins (31%)</h3>
                  <p className="poppins-regular text-purple-800 text-sm mb-2">
                    <strong>Why it happens:</strong> Fluorescent tubes, batteries, paint tins not recognised as hazardous
                  </p>
                  <p className="poppins-regular text-purple-800 text-sm mb-2">
                    <strong>The fix:</strong> Separate hazardous waste collection with consignment notes
                  </p>
                  <p className="poppins-semibold text-purple-900 text-sm">
                    Risk if ignored: Prosecution (hazardous waste violations are taken very seriously)
                  </p>
                </div>
              </div>
            </div>

            {/* Mid-article Gap Analyser CTA */}
            <div className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/25">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="poppins-bold text-green-900 text-lg mb-1">Are any of these gaps affecting your business?</p>
                <p className="poppins-regular text-green-700 text-sm">Our free Gap Analyser checks all 10 compliance areas and gives you an AI-scored report with your top 3 risks — in under 3 minutes.</p>
              </div>
              <Link href="/simpler-recycling-gap-analyser" className="flex-shrink-0">
                <Button className="poppins-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/25 hover:scale-105 transition-all group whitespace-nowrap">
                  Check My Compliance Score
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Why Independent Audits */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Why Independent Compliance Audits Deliver ROI</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Your waste collection company offers "free audits." Why pay for an independent assessment?
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="poppins-semibold text-lg text-gray-900 mb-4">Waste Contractor "Free" Audit:</h3>
                  <ul className="space-y-2">
                    <li className="poppins-regular text-gray-700 text-sm">• Duration: 20-30 minutes</li>
                    <li className="poppins-regular text-gray-700 text-sm">• Focus: Sell more bins and higher-value collections</li>
                    <li className="poppins-regular text-gray-700 text-sm">• Deliverable: Verbal recommendations</li>
                    <li className="poppins-regular text-gray-700 text-sm">• Compliance verification: None</li>
                    <li className="poppins-regular text-gray-700 text-sm">• Documentation: No compliance certificate</li>
                  </ul>
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-300">
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-4">Millstone Compliance Audit:</h3>
                  <ul className="space-y-2">
                    <li className="poppins-regular text-emerald-800 text-sm">• Duration: 90 minutes comprehensive site review</li>
                    <li className="poppins-regular text-emerald-800 text-sm">• Focus: Legal compliance across all regulations</li>
                    <li className="poppins-regular text-emerald-800 text-sm">• Deliverable: Written report with action plan</li>
                    <li className="poppins-regular text-emerald-800 text-sm">• Compliance verification: Full legal risk assessment</li>
                    <li className="poppins-regular text-emerald-800 text-sm">• Documentation: Compliance certificate + templates</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">Value Calculation:</h3>
                <div className="space-y-2 mb-4">
                  <p className="poppins-regular text-emerald-800 text-sm">Avoided penalties: £200-£5,000</p>
                  <p className="poppins-regular text-emerald-800 text-sm">Staff time saved: 15 hours @ £25/hr = £375</p>
                  <p className="poppins-regular text-emerald-800 text-sm">Rejected collection prevention: £150</p>
                  <p className="poppins-regular text-emerald-800 text-sm">Compliance certificate value: £500 (usable for tenders, landlord requirements)</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="poppins-semibold text-emerald-900 text-lg mb-1">Total value: £1,225-£6,025</p>

                  <p className="poppins-bold text-emerald-700 text-xl">ROI: 4.2X to 20.4X</p>
                </div>
              </div>
            </div>

            {/* CTA Section - Dual: Gap Analyser + Free Screening */}
            <div className="mb-8 grid sm:grid-cols-2 gap-5">
              {/* Gap Analyser card */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-7 text-white relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
                <div className="relative z-10 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="poppins-bold text-lg mb-2">AI Gap Analyser</h4>
                  <p className="poppins-regular text-green-100 text-sm mb-5 leading-relaxed">
                    10 questions. AI-scored 0–10 compliance report. Get your personalised gap analysis and action plan instantly — free.
                  </p>
                  <div className="space-y-1.5 mb-6 text-xs text-green-200">
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> Under 3 minutes</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> Powered by Gemini AI</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> Results emailed instantly</div>
                  </div>
                </div>
                <Link href="/simpler-recycling-gap-analyser">
                  <Button className="w-full poppins-bold bg-white text-green-800 hover:bg-green-50 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all group">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Try the Gap Analyser — Free
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Book audit card */}
              <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-7 text-white relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
                <div className="relative z-10 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="poppins-bold text-lg mb-2">Compliance Audit</h4>
                  <p className="poppins-regular text-emerald-100 text-sm mb-5 leading-relaxed">
                    90-minute on-site review, written compliance report, legal risk assessment, and compliance certificate — everything you need to be inspection-ready.
                  </p>
                  <div className="space-y-1.5 mb-6 text-xs text-emerald-200">
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> Full legal risk assessment</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> Written compliance certificate</div>
                    <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> Report within 24 hours</div>
                  </div>
                </div>
                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  className="w-full poppins-bold bg-white text-emerald-800 hover:bg-emerald-50 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Compliance Audit
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Sector-Specific Considerations */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Sector-Specific Considerations</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="poppins-semibold text-lg text-blue-900 mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Warehouses & Distribution:
                  </h3>
                  <ul className="space-y-1">
                    <li className="poppins-regular text-blue-800 text-sm">• High cardboard volumes trigger Extended Producer Responsibility (EPR) obligations</li>
                    <li className="poppins-regular text-blue-800 text-sm">• Packaging data reporting required if importing or handling 50+ tonnes annually</li>
                    <li className="poppins-regular text-blue-800 text-sm">• Plastic Packaging Tax applies if manufacturing/importing 10+ tonnes plastic</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                  <h3 className="poppins-semibold text-lg text-orange-900 mb-2 flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    Hospitality & Retail:
                  </h3>
                  <ul className="space-y-1">
                    <li className="poppins-regular text-orange-800 text-sm">• Food waste = your highest-risk stream (weekly collections recommended)</li>
                    <li className="poppins-regular text-orange-800 text-sm">• Customer-facing bins must also comply (separate streams for public waste)</li>
                    <li className="poppins-regular text-orange-800 text-sm">• Multiple locations = standardised approach needed for consistency</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                  <h3 className="poppins-semibold text-lg text-green-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Offices & Professional Services:
                  </h3>
                  <ul className="space-y-1">
                    <li className="poppins-regular text-green-800 text-sm">• "Low waste" doesn't exempt you (even coffee grounds need food bin)</li>
                    <li className="poppins-regular text-green-800 text-sm">• Landlord may provide bins but YOU remain legally responsible</li>
                    <li className="poppins-regular text-green-800 text-sm">• Service charge clauses can often recover compliance costs from landlord</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                  <h3 className="poppins-semibold text-lg text-purple-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Healthcare & Veterinary:
                  </h3>
                  <ul className="space-y-1">
                    <li className="poppins-regular text-purple-800 text-sm">• Clinical waste = separate hazardous waste regulations (consignment notes, not WTNs)</li>
                    <li className="poppins-regular text-purple-800 text-sm">• Pre-acceptance audits mandatory every 2 years</li>
                    <li className="poppins-regular text-purple-800 text-sm">• Food waste cannot be mixed with clinical waste</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">Do we need this if we already have a waste company?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    Yes. Your waste company collects bins, but YOU are legally responsible for compliance. We verify they're licensed, your documentation is correct, and you won't face penalties. Think of it as insurance against waste fines.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">What if we're a micro-firm (under 10 employees)?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    You're exempt until March 2027. However, you still need Duty of Care compliance (Waste Transfer Notes, licensed carriers). We recommend preparing now to avoid the 2027 rush.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">Can we mix paper/card with plastic and glass?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    Only if your waste collector provides a written TEEP assessment proving separate collection is not technically, economically, or environmentally practical. Most businesses need separate paper/card bins.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">How long does an audit take?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    90 minutes on-site. We check bins, review documentation, verify carrier registration, and interview staff. You receive a comprehensive report within 24 hours showing compliance status and required actions.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">What if we don't have food waste?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    If your business has staff, you have food waste (coffee grounds, tea bags, lunch leftovers). The regulations have no minimum threshold. Even small amounts require a dedicated food waste bin.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              <div className="relative z-10 text-center">
                <h3 className="poppins-bold text-3xl mb-4">Take Action: Your Next Steps</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="poppins-semibold text-lg mb-3">If you're confident you're compliant:</h4>
                    <ul className="space-y-2 text-sm text-left">
                      <li>• Request Waste Transfer Notes from carrier</li>
                      <li>• Check carrier on EA public register</li>
                      <li>• Review bin signage</li>
                      <li>• Schedule 6-month compliance review</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="poppins-semibold text-lg mb-3">If you're uncertain or have gaps:</h4>
                    <ul className="space-y-2 text-sm text-left">
                      <li>• Book free 15-minute phone screening</li>
                      <li>• Receive instant compliance assessment</li>
                      <li>• Get fixed-price quote for resolution</li>
                      <li>• Implement fixes before EA inspection</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <h4 className="poppins-semibold text-lg mb-3">If you manage multiple sites:</h4>
                    <ul className="space-y-2 text-sm text-left">
                      <li>• Request portfolio audit quote</li>
                      <li>• Standardise compliance across locations</li>
                      <li>• Ongoing documentation support available</li>
                      <li>• We handle audit prep and reporting</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center flex-wrap">
                  <Link href="/simpler-recycling-gap-analyser">
                    <Button
                      size="lg"
                      className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-bold shadow-xl text-base px-7 py-5 group border-2 border-white"
                    >
                      <BarChart3 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Try the Free Gap Analyser
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setShowCalendlyModal(true)}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/60 poppins-semibold shadow-xl text-base px-7 py-5"
                  >
                    Book an Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                <p className="poppins-regular text-sm mt-4 text-emerald-50">
                  Gap Analyser is free · Fixed-fee audit · No sales pressure
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">About Milestone Compliance</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                We're an independent waste compliance consultancy specialising in Simpler Recycling, Duty of Care, and packaging regulations (EPR/PPT). Unlike waste collection companies, we have no financial interest in selling you bins or services—our only focus is keeping you legally compliant.
              </p>
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 mb-4">
                <p className="poppins-semibold text-emerald-900 mb-2">Our commitment:</p>
                <p className="poppins-regular text-emerald-800 text-sm">
                  Every audit includes written findings, regulatory references, and documented evidence. You receive either a compliance certificate or a detailed gap analysis with costed solutions—no vague recommendations.
                </p>
              </div>
              <div className="space-y-3">
                <p className="poppins-semibold text-emerald-900 text-lg mb-3">Why choose us:</p>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800 text-sm">Vendor-neutral perspective (we don't sell waste services)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800 text-sm">Cambridge sustainability qualification (circular economy expertise)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800 text-sm">HMRC compliance background (regulatory interpretation skills)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800 text-sm">Same-day reporting using advanced documentation systems</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-emerald-200">
            <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="poppins-medium text-sm">Back to All Resources</span>
            </Link>
          </div>
        </div>
      </article>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={showCalendlyModal}
        onClose={() => setShowCalendlyModal(false)}
      />
    </div>
  )
}
