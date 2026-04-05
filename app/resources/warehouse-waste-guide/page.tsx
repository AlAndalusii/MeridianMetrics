"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, CheckCircle, AlertTriangle, ArrowRight,
  Scale, Recycle, Truck, FileText, Warehouse, Leaf,
  BadgeCheck, ShieldAlert, BarChart3, Package,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"
import { useBooking } from "@/components/BookingProvider"

export default function WarehouseWasteGuide() {
  const { openBooking } = useBooking()

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
                onClick={() => openBooking()}
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px]"
              >
                BOOK COMPLIANCE AUDIT
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
              <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Practical Compliance Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              Waste Duty of Care &amp; Simpler Recycling: A Practical Guide for Warehouses
            </h1>
            <p className="poppins-regular text-lg text-emerald-700">
              If your warehouse produces, stores, or moves waste — you are legally responsible for it. This is not optional. It is the law, and getting it wrong can cost your business heavily.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Updated: March 2026</span>
              <span>•</span>
              <span className="poppins-medium">12 min read</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-emerald max-w-none">

            {/* What Is Duty of Care */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Scale className="w-6 h-6 text-emerald-600" />
                What Is the Waste Duty of Care?
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The Waste Duty of Care is a legal obligation under <strong>Section 34 of the Environmental Protection Act 1990</strong>. Every UK business — including warehouses — must manage its waste safely, responsibly, and lawfully from the moment it is created to the moment it is collected by a licensed contractor.
              </p>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                Think of it like a chain of responsibility. You are the first link. You cannot simply hand your waste to anyone and walk away.
              </p>
              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-red-900 mb-1">Important:</p>
                <p className="poppins-regular text-red-800 leading-relaxed">
                  Even after waste leaves your site, <strong>you remain legally responsible</strong> for where it ends up. If your contractor fly-tips it, you can still face prosecution.
                </p>
              </div>
            </div>

            {/* What Does It Require */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-emerald-600" />
                What Does It Actually Require?
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                As a warehouse operator, you must do four things:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="poppins-bold text-white text-sm">1</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-1">Store waste securely</p>
                    <p className="poppins-regular text-emerald-800 text-sm">Waste must not be able to escape, cause pollution, or harm people or the surrounding environment.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="poppins-bold text-white text-sm">2</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-1">Only use authorised collectors</p>
                    <p className="poppins-regular text-emerald-800 text-sm">Your waste carrier must be registered with the Environment Agency. Verify them on the public register before handing over any waste.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="poppins-bold text-white text-sm">3</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-1">Complete a Waste Transfer Note (WTN) every time waste leaves your site</p>
                    <p className="poppins-regular text-emerald-800 text-sm">The WTN must include an accurate description of the waste — not just "general rubbish". It must reflect what the waste actually is.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="poppins-bold text-white text-sm">4</span>
                  </div>
                  <div>
                    <p className="poppins-semibold text-emerald-900 mb-1">Keep records for at least two years</p>
                    <p className="poppins-regular text-emerald-800 text-sm">Inspectors can ask to see your Waste Transfer Notes at any time. Failure to produce them is itself a breach.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-amber-900 mb-1 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Penalties
                </p>
                <p className="poppins-regular text-amber-800 leading-relaxed text-sm">
                  Failing to comply can result in <strong>unlimited fines</strong> and, in serious cases, <strong>criminal prosecution of company directors</strong>.
                </p>
              </div>
            </div>

            {/* What Counts as Warehouse Waste */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Warehouse className="w-6 h-6 text-emerald-600" />
                What Counts as Warehouse Waste?
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Warehouses generate a surprising variety of waste streams. Each has its own correct disposal or recycling route. Lumping them all together in one skip is not compliance — it is a shortcut that creates real legal risk.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Cardboard and paper packaging", icon: Package },
                  { label: "Plastic wrap, stretch film, and shrink wrap", icon: Package },
                  { label: "Wooden and plastic pallets", icon: Warehouse },
                  { label: "Metal strapping and banding", icon: Package },
                  { label: "Damaged or unsellable stock", icon: Package },
                  { label: "Electronic and electrical equipment (e-waste)", icon: Package },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-emerald-800 text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simpler Recycling */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Recycle className="w-6 h-6 text-emerald-600" />
                Simpler Recycling: What&apos;s Changed?
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                The UK government&apos;s Simpler Recycling reforms are rolling out across England, requiring businesses to separate recyclable materials more clearly. For warehouses, this means recycling is no longer an afterthought — <strong>segregation is becoming a legal expectation, not just good practice</strong>.
              </p>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-4">
                <p className="poppins-semibold text-emerald-900 mb-1">The core principle</p>
                <p className="poppins-regular text-emerald-800 leading-relaxed text-sm">
                  Sort your waste <strong>at the point it is created</strong>, not after it has been mixed in a skip. Once materials are contaminated together, many become non-recyclable and more expensive to dispose of.
                </p>
              </div>
            </div>

            {/* How to Set Up Recycling */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-600" />
                How to Set Up Recycling in Your Warehouse
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Getting this right does not have to be complicated. Here is a simple, practical approach:
              </p>

              <div className="space-y-5">
                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-500">
                  <h3 className="poppins-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center poppins-bold flex-shrink-0">1</span>
                    Set up designated waste zones
                  </h3>
                  <p className="poppins-regular text-emerald-800 text-sm">
                    Use colour-coded bins clearly labelled for cardboard, plastic, metal, and general waste. Place them near loading bays and workstations where waste is actually created — not just near the exit.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-500">
                  <h3 className="poppins-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center poppins-bold flex-shrink-0">2</span>
                    Remove stretch film immediately at the receiving area
                  </h3>
                  <p className="poppins-regular text-emerald-800 text-sm">
                    Plastic film is one of the most commonly contaminated waste streams in warehouses. Strip it at the point of receipt to keep it clean and recyclable.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-500">
                  <h3 className="poppins-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center poppins-bold flex-shrink-0">3</span>
                    Use reusable pallets and containers where possible
                  </h3>
                  <p className="poppins-regular text-emerald-800 text-sm">
                    Reducing the amount of waste generated in the first place is always the most cost-effective and environmentally sound approach.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-500">
                  <h3 className="poppins-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center poppins-bold flex-shrink-0">4</span>
                    Consider a baler machine for cardboard and plastic
                  </h3>
                  <p className="poppins-regular text-emerald-800 text-sm">
                    A baler compresses materials, saves floor space, and can significantly reduce collection costs. For high-volume operations, it often pays for itself quickly.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-500">
                  <h3 className="poppins-semibold text-emerald-900 mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center poppins-bold flex-shrink-0">5</span>
                    Audit your waste regularly
                  </h3>
                  <p className="poppins-regular text-emerald-800 text-sm">
                    Know what you are producing, how much, and where it is going. A simple monthly review of your waste records will identify patterns and opportunities to reduce costs.
                  </p>
                </div>
              </div>
            </div>

            {/* Choosing the Right Contractor */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <Truck className="w-6 h-6 text-emerald-600" />
                Choosing the Right Waste Contractor
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                This step matters more than many businesses realise. Before handing waste to any contractor, verify that they are:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-emerald-900 text-sm mb-1">Registered as an authorised waste carrier with the Environment Agency</p>
                    <p className="poppins-regular text-emerald-700 text-sm">Check the public register at gov.uk before engaging any new contractor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-emerald-900 text-sm mb-1">Able to provide a properly completed Waste Transfer Note</p>
                    <p className="poppins-regular text-emerald-700 text-sm">If they cannot or will not provide a WTN, walk away — you are taking on their legal risk.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-emerald-900 text-sm mb-1">Transparent about where your waste ends up</p>
                    <p className="poppins-regular text-emerald-700 text-sm">A reputable contractor should be able to tell you which facility receives your waste and confirm it is appropriately licensed.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-red-900 mb-1">Do not cut corners here</p>
                <p className="poppins-regular text-red-800 text-sm leading-relaxed">
                  If a contractor cannot provide these basics, do not use them. You remain legally responsible even after the waste leaves your site — and cheap, unregistered collectors are the leading cause of business prosecution under waste law.
                </p>
              </div>
            </div>

            {/* Business Case */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg mb-8">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
                The Business Case for Getting This Right
              </h2>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-6">
                Beyond compliance, there is a real financial upside. Warehouses that actively sort and recycle their waste typically:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="poppins-semibold text-emerald-900 mb-1 text-sm">Reduce collection costs</p>
                  <p className="poppins-regular text-emerald-700 text-sm">Less mixed waste means cheaper pickups — many materials can be collected free or at low cost when properly sorted.</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="poppins-semibold text-emerald-900 mb-1 text-sm">Generate income from recyclables</p>
                  <p className="poppins-regular text-emerald-700 text-sm">Clean cardboard, metal, and plastic can attract rebate payments from specialist recyclers.</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="poppins-semibold text-emerald-900 mb-1 text-sm">Free up floor space</p>
                  <p className="poppins-regular text-emerald-700 text-sm">Compaction equipment reduces the footprint of waste storage, freeing up operational space.</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="poppins-semibold text-emerald-900 mb-1 text-sm">Strengthen supplier relationships</p>
                  <p className="poppins-regular text-emerald-700 text-sm">A lower carbon footprint is increasingly important for winning and retaining supplier and client contracts.</p>
                </div>
              </div>
            </div>

            {/* Key Takeaway */}
            <div className="bg-emerald-800 rounded-2xl p-6 sm:p-8 border border-emerald-700 shadow-lg mb-8">
              <h2 className="poppins-semibold text-xl text-white mb-3">Key Takeaway</h2>
              <p className="poppins-regular text-emerald-100 leading-relaxed mb-4">
                Waste duty of care is not red tape — it is your responsibility as a business. And with Simpler Recycling raising the bar, warehouses that build clean, well-organised waste systems now will be ahead of the curve.
              </p>
              <p className="poppins-semibold text-emerald-200 text-sm">
                Start with the basics: secure storage, correct segregation, authorised collectors, and paper trails. Everything else builds from there.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-2xl p-6 sm:p-8 border border-emerald-600 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="poppins-semibold text-xl text-white mb-2">Not sure where your warehouse stands?</h3>
                  <p className="poppins-regular text-emerald-100 text-sm">
                    Book a compliance audit with Millstone Compliance. We will review your waste systems, documentation, and contractor arrangements — and give you a clear action plan.
                  </p>
                </div>
                <Button
                  onClick={() => openBooking()}
                  className="flex-shrink-0 bg-white text-emerald-800 hover:bg-emerald-50 poppins-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
                >
                  Book a Free Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </article>

    </div>
  )
}
