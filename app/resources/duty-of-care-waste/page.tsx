"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, AlertCircle, Shield, FileText, Users, Scale, AlertTriangle, ArrowRight, XCircle, Clock, Building, Trash2, FileCheck, Lock } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import { MobileMenu } from "@/components/MobileMenu"

export default function DutyOfCareWaste() {
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
                <span className="hidden xs:inline">BOOK COMPLIANCE AUDIT</span>
                <span className="xs:hidden">BOOK AUDIT</span>
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
              <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Legal Compliance Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              Waste Duty of Care: Complete UK Business Compliance Guide
            </h1>
            <p className="poppins-regular text-lg text-emerald-700">
              Everything UK businesses need to know about Duty of Care legal requirements, Waste Transfer Notes, and avoiding prosecution.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: January 2026</span>
              <span>•</span>
              <span className="poppins-medium">10 min read</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-emerald max-w-none">
            
            {/* Introduction */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-emerald-600" />
                What Is Duty of Care for Waste and Why Every Business Must Comply
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Duty of Care is the cornerstone of UK waste law, established under <strong>Section 34 of the Environmental Protection Act 1990</strong>. It requires every business that produces, stores, transports, or manages waste to ensure it's handled safely and legally from creation to final disposal.
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Unlike Simpler Recycling (which focuses on physical waste separation), Duty of Care is about <strong>documentation, authorization, and legal accountability</strong> for your waste throughout its entire journey.
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                This applies to every business in England and Wales that handles:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Commercial waste (shops, offices, warehouses)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Industrial waste (manufacturing, construction)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <span className="poppins-regular text-emerald-800">Any waste similar to household waste</span>
                </li>
              </ul>
              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-red-900 mb-2">Critical distinction:</p>
                <p className="poppins-regular text-red-800 leading-relaxed">
                  Even if you use a waste collection company, <strong>YOU remain legally responsible</strong>. Your business can be prosecuted and fined unlimited amounts if your waste ends up illegally disposed—even if you didn't know.
                </p>
              </div>
            </div>

            {/* Who Must Comply */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-emerald-600" />
                Who Must Comply: Duty of Care Waste Holders
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The law defines a "waste holder" as anyone who:
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-emerald-900">Produces waste</span>
                    <span className="poppins-regular text-emerald-800"> – Factories, offices, shops, restaurants, construction sites</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-blue-900">Carries waste</span>
                    <span className="poppins-regular text-blue-800"> – Waste collection companies, businesses transporting their own waste</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-purple-900">Stores waste</span>
                    <span className="poppins-regular text-purple-800"> – Warehouses, transfer stations, temporary storage facilities</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-green-900">Treats waste</span>
                    <span className="poppins-regular text-green-800"> – Recycling facilities, composting sites, waste processors</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-orange-900">Brokers waste</span>
                    <span className="poppins-regular text-orange-800"> – Companies arranging waste collection for others</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="poppins-semibold text-amber-900">Deals in waste</span>
                    <span className="poppins-regular text-amber-800"> – Buying and selling waste materials</span>
                  </div>
                </div>
              </div>
              <p className="poppins-semibold text-emerald-900 text-lg">
                If your business generates waste, you are a waste holder and Duty of Care applies.
              </p>
            </div>

            {/* The 5 Legal Requirements */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">The 5 Legal Requirements Under Duty of Care</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                UK waste Duty of Care law requires you to take "all reasonable steps" to comply with five mandatory obligations:
              </p>

              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
                  <h3 className="poppins-semibold text-lg text-red-900 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    1. Prevent Unauthorized or Harmful Disposal
                  </h3>
                  <p className="poppins-regular text-red-800 text-sm mb-3">
                    You must ensure waste doesn't go to illegal sites or get fly-tipped.
                  </p>
                  <p className="poppins-semibold text-red-900 text-sm mb-2">What this means in practice:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="poppins-regular text-red-800 text-sm">• Only use licensed waste carriers (verify on public register)</li>
                    <li className="poppins-regular text-red-800 text-sm">• Check waste facilities have proper permits</li>
                    <li className="poppins-regular text-red-800 text-sm">• Never give waste to someone who can't provide authorization proof</li>
                    <li className="poppins-regular text-red-800 text-sm">• Report suspected illegal activity to Environment Agency</li>
                  </ul>
                  <div className="bg-red-100 rounded-lg p-3">
                    <p className="poppins-semibold text-red-900 text-sm">Common violation:</p>
                    <p className="poppins-regular text-red-800 text-sm">Using "cheap" waste removal found on social media without checking registration. If they fly-tip your waste, YOU are prosecuted.</p>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-400">
                  <h3 className="poppins-semibold text-lg text-orange-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    2. Prevent Environmental Permit Breaches
                  </h3>
                  <p className="poppins-regular text-orange-800 text-sm mb-3">
                    Ensure waste goes to facilities authorized to accept your specific waste type.
                  </p>
                  <p className="poppins-semibold text-orange-900 text-sm mb-2">What this means in practice:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="poppins-regular text-orange-800 text-sm">• Verify facility permit covers your waste codes</li>
                    <li className="poppins-regular text-orange-800 text-sm">• Don't exceed quantity limits at permitted sites</li>
                    <li className="poppins-regular text-orange-800 text-sm">• Ensure waste condition matches what facility can accept</li>
                  </ul>
                  <div className="bg-orange-100 rounded-lg p-3">
                    <p className="poppins-semibold text-orange-900 text-sm">Common violation:</p>
                    <p className="poppins-regular text-orange-800 text-sm">Sending contaminated recyclables that facility can't legally process, causing permit breach.</p>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-400">
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    3. Prevent Waste Escape
                  </h3>
                  <p className="poppins-regular text-amber-800 text-sm mb-3">
                    Keep waste secure so it doesn't blow away, leak, or get accessed by unauthorized people.
                  </p>
                  <p className="poppins-semibold text-amber-900 text-sm mb-2">What this means in practice:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="poppins-regular text-amber-800 text-sm">• Use covered bins with lids</li>
                    <li className="poppins-regular text-amber-800 text-sm">• Secure loads on vehicles during transport</li>
                    <li className="poppins-regular text-amber-800 text-sm">• Store waste in designated areas (not public access)</li>
                    <li className="poppins-regular text-amber-800 text-sm">• Use appropriate containers (leak-proof for liquids)</li>
                    <li className="poppins-regular text-amber-800 text-sm">• Prevent pest access</li>
                  </ul>
                  <div className="bg-amber-100 rounded-lg p-3">
                    <p className="poppins-semibold text-amber-900 text-sm">Common violation:</p>
                    <p className="poppins-regular text-amber-800 text-sm">Overflowing skips with waste blowing into streets = £300 fixed penalty.</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-5 border-l-4 border-blue-400">
                  <h3 className="poppins-semibold text-lg text-blue-900 mb-3 flex items-center gap-2">
                    <FileCheck className="w-5 h-5" />
                    4. Transfer Only to Authorized Persons
                  </h3>
                  <p className="poppins-regular text-blue-800 text-sm mb-3">
                    Every person who receives your waste must be legally authorized.
                  </p>
                  <p className="poppins-semibold text-blue-900 text-sm mb-2">How to check authorization:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="poppins-regular text-blue-800 text-sm">• England: https://environment.data.gov.uk/public-register/view/index</li>
                    <li className="poppins-regular text-blue-800 text-sm">• Wales: https://naturalresources.wales/permits-and-permissions/</li>
                  </ul>
                  <div className="bg-blue-100 rounded-lg p-3">
                    <p className="poppins-semibold text-blue-900 text-sm">Common violation:</p>
                    <p className="poppins-regular text-blue-800 text-sm">Assuming "the waste company" is licensed without actually checking the register.</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-5 border-l-4 border-green-400">
                  <h3 className="poppins-semibold text-lg text-green-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    5. Provide Accurate Waste Description
                  </h3>
                  <p className="poppins-regular text-green-800 text-sm mb-3">
                    You must give a detailed written description of waste when transferring it.
                  </p>
                  <p className="poppins-semibold text-green-900 text-sm mb-2">What this means in practice:</p>
                  <ul className="space-y-1 mb-3">
                    <li className="poppins-regular text-green-800 text-sm">• Complete Waste Transfer Note (WTN) for every transfer</li>
                    <li className="poppins-regular text-green-800 text-sm">• Use correct European Waste Catalogue (EWC) codes</li>
                    <li className="poppins-regular text-green-800 text-sm">• Describe quantity, container type, any hazards</li>
                    <li className="poppins-regular text-green-800 text-sm">• Both parties must sign documentation</li>
                    <li className="poppins-regular text-green-800 text-sm">• Keep records for 2 years minimum (3 years for hazardous waste)</li>
                  </ul>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="poppins-semibold text-green-900 text-sm">Common violation:</p>
                    <p className="poppins-regular text-green-800 text-sm">No Waste Transfer Notes kept = £300 fixed penalty when EA inspects.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waste Transfer Notes */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-600" />
                Waste Transfer Notes: Your Legal Protection
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                A Waste Transfer Note is not optional paperwork—it's your <strong>proof of legal disposal and protection against prosecution</strong>.
              </p>
              
              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200 mb-6">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">What Must Be On Every Waste Transfer Note:</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Waste description (including EWC code)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Quantity (weight in kg or volume in litres)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Container type (wheelie bin, skip, bag, loose)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Date and location of transfer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Producer details (business name, address, SIC code)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Carrier details (name, registration number)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Destination facility (name, permit number)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Both parties' signatures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span className="poppins-regular text-emerald-800 text-sm">Waste hierarchy statement</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="poppins-semibold text-base text-blue-900 mb-2">Standard Waste Transfer Note</h4>
                  <p className="poppins-regular text-blue-800 text-sm mb-2"><strong>Use for:</strong> Individual collections</p>
                  <p className="poppins-regular text-blue-800 text-sm mb-2"><strong>Validity:</strong> Single transfer only</p>
                  <p className="poppins-regular text-blue-800 text-sm"><strong>Keep for:</strong> 2 years</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="poppins-semibold text-base text-green-900 mb-2">Season Ticket</h4>
                  <p className="poppins-regular text-green-800 text-sm mb-2"><strong>Use for:</strong> Regular collections of same waste with same carrier</p>
                  <p className="poppins-regular text-green-800 text-sm mb-2"><strong>Validity:</strong> Up to 12 months</p>
                  <p className="poppins-regular text-green-800 text-sm mb-2"><strong>Keep for:</strong> 2 years + collection log (dates, quantities)</p>
                  <p className="poppins-regular text-green-800 text-sm"><strong>Advantage:</strong> One document covers multiple transfers</p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <h4 className="poppins-semibold text-base text-red-900 mb-2">Hazardous Waste Consignment Note</h4>
                  <p className="poppins-regular text-red-800 text-sm mb-2"><strong>Use for:</strong> ALL hazardous waste movements (batteries, chemicals, fluorescent tubes, asbestos)</p>
                  <p className="poppins-regular text-red-800 text-sm mb-2"><strong>Validity:</strong> Single transfer</p>
                  <p className="poppins-regular text-red-800 text-sm"><strong>Keep for:</strong> 3 years</p>
                </div>
              </div>
            </div>

            {/* Penalties CTA */}
            <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Penalties for Duty of Care Breaches
                </h3>
                <p className="poppins-regular text-lg mb-6">
                  Duty of Care violations are <strong>criminal offenses</strong> under the Environmental Protection Act 1990.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <h4 className="poppins-semibold text-lg mb-4">Fixed Penalty Notices (On-the-Spot Fines):</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center bg-white/10 rounded p-2">
                        <span>Cannot produce Waste Transfer Notes</span>
                        <span className="poppins-bold">£300</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/10 rounded p-2">
                        <span>Cannot show carrier registration</span>
                        <span className="poppins-bold">£300</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/10 rounded p-2">
                        <span>Waste escape from control</span>
                        <span className="poppins-bold">£300</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/10 rounded p-2">
                        <span>Failed to provide waste information</span>
                        <span className="poppins-bold">£300</span>
                      </div>
                    </div>
                    <p className="poppins-regular text-sm mt-3 bg-white/10 rounded p-2">
                      These are immediate fines. No warning, no time to fix—pay £300 or go to court.
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
                    <h4 className="poppins-semibold text-lg mb-4">Prosecution (Court Fines):</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white/10 rounded p-3">
                        <p className="poppins-semibold mb-1">Magistrates' Court:</p>
                        <p>• Maximum fine: Unlimited</p>
                        <p>• Typical range: £5,000-£50,000</p>
                        <p>• Criminal record: Yes</p>
                      </div>
                      <div className="bg-white/10 rounded p-3">
                        <p className="poppins-semibold mb-1">Crown Court (serious cases):</p>
                        <p>• Maximum fine: Unlimited</p>
                        <p>• Typical range: £50,000-£500,000+</p>
                        <p>• Prison: Up to 5 years</p>
                        <p>• Director disqualification: Possible</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 mb-6">
                  <h4 className="poppins-semibold text-lg mb-3">Real-World Examples:</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="poppins-semibold mb-1">Case 1: Missing Waste Transfer Notes</p>
                      <p>Small garage (8 employees) couldn't produce WTNs during EA inspection. £300 fixed penalty + required to obtain copies from carrier (additional £150 admin fee).</p>
                    </div>
                    <div>
                      <p className="poppins-semibold mb-1">Case 2: Using Unlicensed Carrier</p>
                      <p>Restaurant gave waste to unregistered "cheap removal service" who fly-tipped it. Restaurant prosecuted: £12,000 fine + £8,000 cleanup costs + criminal record.</p>
                    </div>
                    <div>
                      <p className="poppins-semibold mb-1">Case 3: Misdescribing Hazardous Waste</p>
                      <p>Construction firm described asbestos as "general building waste." Recycling facility discovered it, reported to EA. Prosecution: £28,000 fine + cleanup costs + 6-month community order for site manager.</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  size="lg"
                  className="bg-white text-red-700 hover:bg-red-50 poppins-semibold shadow-xl w-full sm:w-auto"
                >
                  Book Compliance Audit to Avoid Penalties
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Common Violations */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Common Duty of Care Violations We Find in Audits</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Based on 150+ workplace compliance assessments, these failures appear repeatedly:
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 rounded-xl p-5 border-l-4 border-red-400">
                  <h3 className="poppins-semibold text-lg text-red-900 mb-2">1. No Waste Transfer Notes Retained (63% of businesses)</h3>
                  <p className="poppins-regular text-red-800 text-sm mb-2">
                    <strong>What we hear:</strong> "The waste company just collects it" • "They email invoices, isn't that enough?" • "We used to have them but can't find them now"
                  </p>
                  <p className="poppins-regular text-red-800 text-sm mb-2">
                    <strong>Why it's a problem:</strong> You cannot prove legal disposal. If waste was fly-tipped or illegally managed, you're liable.
                  </p>
                  <p className="poppins-regular text-red-800 text-sm mb-2">
                    <strong>The fix:</strong> Demand WTNs from carrier (they're legally required to provide them) • Set up free eDoc account for electronic WTNs • Create filing system (physical folder + digital backup)
                  </p>
                  <p className="poppins-semibold text-red-900 text-sm">Cost to fix: £0 (process change)</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border-l-4 border-orange-400">
                  <h3 className="poppins-semibold text-lg text-orange-900 mb-2">2. Carrier Not Verified on Public Register (58%)</h3>
                  <p className="poppins-regular text-orange-800 text-sm mb-2">
                    <strong>What we hear:</strong> "They've been collecting for years, must be licensed" • "They gave me a business card" • "I assumed the council checked them"
                  </p>
                  <p className="poppins-regular text-orange-800 text-sm mb-2">
                    <strong>Why it's a problem:</strong> 30-40% of "waste companies" operating are unregistered. If caught, both you AND them get prosecuted.
                  </p>
                  <p className="poppins-regular text-orange-800 text-sm mb-2">
                    <strong>The fix:</strong> Check carrier name on Environment Agency public register • Verify registration number matches Waste Transfer Note • Screenshot registration as evidence • Re-check annually
                  </p>
                  <p className="poppins-semibold text-orange-900 text-sm">Time to fix: 5 minutes • Cost: £0</p>
                </div>

                <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-amber-400">
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-2">3. Incomplete Waste Descriptions (71%)</h3>
                  <p className="poppins-regular text-amber-800 text-sm mb-2">
                    <strong>What we see:</strong> WTN says "general waste" (too vague) • Missing EWC codes • No waste hierarchy statement • Unsigned documents
                  </p>
                  <p className="poppins-regular text-amber-800 text-sm mb-2">
                    <strong>Why it's a problem:</strong> Invalid WTN = no legal protection. Same as having no WTN at all.
                  </p>
                  <p className="poppins-regular text-amber-800 text-sm mb-2">
                    <strong>The fix:</strong> Use correct EWC codes • Ensure both parties sign • Include waste hierarchy statement (eDoc adds this automatically)
                  </p>
                  <p className="poppins-semibold text-amber-900 text-sm">Time to fix: 10 minutes per WTN • Cost: £0</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-5 border-l-4 border-purple-400">
                  <h3 className="poppins-semibold text-lg text-purple-900 mb-2">4. Hazardous Waste Treated as Non-Hazardous (34%)</h3>
                  <p className="poppins-regular text-purple-800 text-sm mb-2">
                    <strong>What we find:</strong> Fluorescent tubes in general waste • Batteries discarded with office waste • Paint tins (even empty) in skips • Vapes in recycling bins (contain lithium batteries)
                  </p>
                  <p className="poppins-regular text-purple-800 text-sm mb-2">
                    <strong>Why it's a problem:</strong> Hazardous waste has different rules: Must use Consignment Notes (not WTNs) • Carrier must be "Upper Tier" registered • 3-year record retention (not 2) • Much higher penalties for violations
                  </p>
                  <p className="poppins-regular text-purple-800 text-sm mb-2">
                    <strong>The fix:</strong> Conduct hazardous waste audit • Segregate hazardous items • Arrange specialist collection • Use proper consignment notes
                  </p>
                  <p className="poppins-semibold text-purple-900 text-sm">Cost to fix: £150-400/year (specialist collection) vs. £5,000-£28,000 prosecution</p>
                </div>
              </div>
            </div>

            {/* Compliance Checklist */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Duty of Care Compliance Checklist</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Use this checklist monthly to verify ongoing compliance:
              </p>

              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h3 className="poppins-semibold text-lg text-blue-900 mb-3">Documentation:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Waste Transfer Notes for last 2 years accessible (physical or electronic)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Hazardous waste consignment notes for last 3 years accessible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Season tickets current (not expired)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-blue-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-blue-800 text-sm">Collection logs maintained (if using season tickets)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                  <h3 className="poppins-semibold text-lg text-green-900 mb-3">Carrier Authorization:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Current waste carrier verified on public register (within last 12 months)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Registration number matches Waste Transfer Notes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Upper Tier registration confirmed (if handling hazardous waste)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-green-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-green-800 text-sm">Evidence of verification saved (screenshots, dated notes)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                  <h3 className="poppins-semibold text-lg text-purple-900 mb-3">Waste Descriptions:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">All WTNs include correct EWC codes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Waste hierarchy statement present on all transfers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Quantities accurately recorded</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-purple-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-purple-800 text-sm">Both parties signed documentation</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-5 border border-orange-200">
                  <h3 className="poppins-semibold text-lg text-orange-900 mb-3">Physical Compliance:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-orange-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-orange-800 text-sm">Waste stored securely (no escape risk)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-orange-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-orange-800 text-sm">Bins covered and appropriate for waste type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-orange-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-orange-800 text-sm">Hazardous waste segregated from non-hazardous</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded border-2 border-orange-400 flex-shrink-0 mt-0.5"></div>
                      <span className="poppins-regular text-orange-800 text-sm">No overflowing containers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA - Free Assessment */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-4">Free 5-Minute Self-Assessment</h3>
                <p className="poppins-regular text-lg mb-6">
                  Find out if you're compliant with our quick diagnostic questions:
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="poppins-semibold mb-2">Question 1: Can you locate Waste Transfer Notes from the last 2 years right now?</p>
                    <p className="text-sm">YES → Continue to Q2 | NO → Critical gap (£300 penalty risk)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="poppins-semibold mb-2">Question 2: What's your waste carrier's registration number?</p>
                    <p className="text-sm">Know it AND verified on register → Continue to Q3 | Don't know → Critical gap (prosecution risk)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="poppins-semibold mb-2">Question 3: Do your WTNs include: EWC codes, signatures, waste hierarchy statement?</p>
                    <p className="text-sm">YES to all → Continue to Q4 | NO to any → Moderate gap (invalid documentation)</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="poppins-semibold mb-2">Question 4: Do you produce hazardous waste (batteries, tubes, chemicals, paint)?</p>
                    <p className="text-sm">NO → You may be compliant | YES → Check Q5</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="poppins-semibold mb-2">Question 5: Is your carrier Upper Tier registered? Do you use consignment notes?</p>
                    <p className="text-sm">YES to all → Likely compliant | NO to any → Serious hazardous waste violation</p>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 mb-6">
                  <h4 className="poppins-semibold text-lg mb-3">If You Found Gaps:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Critical gaps (Q1 or Q2 failed):</strong> Penalty risk HIGH (prosecution likely if inspected)</p>
                    <p><strong>Moderate gaps (Q3 failed):</strong> Penalty risk MEDIUM (fixed penalties if inspected)</p>
                    <p><strong>Hazardous waste gaps (Q5 failed):</strong> Penalty risk VERY HIGH (£5,000-£50,000 prosecution range)</p>
                  </div>
                </div>

                <Button
                  onClick={() => setShowCalendlyModal(true)}
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-semibold shadow-xl w-full sm:w-auto"
                >
                  Book Compliance Audit (£295)
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="poppins-regular text-sm mt-4 text-emerald-50">
                  90-minute on-site review • Written report within 24 hours • Compliance certificate or gap analysis
                </p>
              </div>
            </div>

            {/* Why Independent Audits */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Why Independent Duty of Care Audits Prevent Prosecution</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Your waste carrier may say "don't worry, we handle the paperwork." That's not compliance.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <h3 className="poppins-semibold text-lg text-gray-900 mb-4">What Waste Carriers DON'T Do:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-gray-700 text-sm">Verify YOU are keeping WTNs for 2 years</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-gray-700 text-sm">Check YOU understand your Duty of Care obligations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-gray-700 text-sm">Ensure YOUR waste descriptions are accurate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-gray-700 text-sm">Audit YOUR hazardous waste segregation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-gray-700 text-sm">Protect YOU from prosecution if they subcontract illegally</span>
                    </li>
                  </ul>
                  <p className="poppins-semibold text-red-700 text-sm mt-4">
                    If your waste ends up fly-tipped, illegally disposed, or at an unpermitted site, YOU are prosecuted—not the carrier.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-300">
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-4">Milestone Compliance Duty of Care Audit (£295):</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Review of all Waste Transfer Notes (completeness check)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Public register verification of all carriers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Hazardous waste identification and segregation review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Document retention compliance verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Physical storage inspection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Staff awareness interview</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Written report with compliance certificate OR gap analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                      <span className="poppins-regular text-emerald-800 text-sm">Template WTNs and documentation procedures</span>
                    </li>
                  </ul>
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <p className="poppins-regular text-emerald-800 text-sm mb-2">
                      <strong>Duration:</strong> 90 minutes on-site
                    </p>
                    <p className="poppins-regular text-emerald-800 text-sm mb-2">
                      <strong>Report delivery:</strong> Within 24 hours
                    </p>
                    <p className="poppins-regular text-emerald-800 text-sm">
                      <strong>Follow-up support:</strong> 30 days email/phone assistance included
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">Value Delivered:</h3>
                <div className="space-y-2 mb-4">
                  <p className="poppins-regular text-emerald-800 text-sm">Avoided £300 fixed penalty (missing WTNs): <strong>£300</strong></p>
                  <p className="poppins-regular text-emerald-800 text-sm">Avoided prosecution risk (using unregistered carrier): <strong>£5,000-£50,000</strong></p>
                  <p className="poppins-regular text-emerald-800 text-sm">Staff time saved (researching requirements): <strong>20 hours @ £25/hr = £500</strong></p>
                  <p className="poppins-regular text-emerald-800 text-sm">Peace of mind: <strong>Priceless</strong></p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="poppins-semibold text-emerald-900 text-lg mb-1">Investment: £295</p>
                  <p className="poppins-bold text-emerald-700 text-xl">ROI: 2.7X minimum (if only avoiding one fixed penalty)</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">Frequently Asked Questions: Waste Duty of Care</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">Can we use invoices instead of Waste Transfer Notes?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    Only if invoices contain all legally required information: waste description with EWC code, quantity, container type, date, both parties' details and signatures, carrier registration number, and waste hierarchy statement. Most invoices don't include all this, so proper WTNs are safer.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">What if our landlord arranges waste collection?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    You remain responsible under Duty of Care. Verify the landlord's carrier is registered and obtain copies of Waste Transfer Notes. If waste is illegally disposed, both you and the landlord can be prosecuted.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">How do we know what EWC code to use?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    Use the Waste Classification Technical Guidance (Appendix A). Common codes: 20 03 01 (mixed municipal waste), 15 01 01 (paper/cardboard), 20 01 08 (food waste). If uncertain, your waste carrier should advise—but verify it's correct.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">Do we need WTNs for recycling?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    Yes. Duty of Care applies to ALL waste transfers, whether going to disposal, recycling, or recovery. "It's recycling not waste" is not a legal exemption.
                  </p>
                </div>

                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-2">What's the difference between Upper Tier and Lower Tier registration?</h3>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">
                    Upper Tier carriers can transport hazardous waste. Lower Tier can only transport non-hazardous waste. If your business produces any hazardous waste (batteries, fluorescent tubes, chemicals), your carrier MUST be Upper Tier registered.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
              <div className="relative z-10 text-center">
                <h3 className="poppins-bold text-3xl mb-4">Verify Your Compliance Today</h3>
                <p className="poppins-regular text-lg mb-8">
                  Don't wait for an Environment Agency inspection to discover gaps. Book your Duty of Care audit now.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Clock className="w-8 h-8 mx-auto mb-3" />
                    <h4 className="poppins-semibold text-lg mb-2">90 Minutes On-Site</h4>
                    <p className="text-sm">Comprehensive review of documentation, carriers, and physical waste storage</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <FileCheck className="w-8 h-8 mx-auto mb-3" />
                    <h4 className="poppins-semibold text-lg mb-2">24-Hour Report</h4>
                    <p className="text-sm">Written findings with compliance certificate or costed gap analysis</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                    <Shield className="w-8 h-8 mx-auto mb-3" />
                    <h4 className="poppins-semibold text-lg mb-2">30-Day Support</h4>
                    <p className="text-sm">Email and phone assistance to implement recommendations</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Button
                    onClick={() => setShowCalendlyModal(true)}
                    size="lg"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 poppins-semibold shadow-xl text-lg px-8 py-6"
                  >
                    Book Your £295 Duty of Care Audit
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                  <a
                    href={`mailto:info@millstonecompliance.com?subject=Duty of Care Compliance Help&body=Hello Millstone Compliance,%0D%0A%0D%0AI would like to discuss Duty of Care compliance assistance.%0D%0A%0D%0AName: %0D%0ACompany: %0D%0AWhat I need help with: %0D%0A%0D%0APreferred contact date and time: %0D%0A%0D%0AThank you.`}
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white poppins-semibold shadow-xl text-lg px-8 py-6 rounded-md inline-flex items-center justify-center transition-all duration-300"
                  >
                    Or Contact Us via Email
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </a>
                </div>
                <p className="poppins-regular text-sm mt-4 text-emerald-50">
                  Fixed price. No hidden costs. Compliance guaranteed.
                </p>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">About Milestone Compliance</h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                We're an independent waste compliance consultancy specializing in Simpler Recycling, Duty of Care, and packaging regulations (EPR/PPT). Unlike waste collection companies, we have no financial interest in selling you bins or services—our only focus is keeping you legally compliant.
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
