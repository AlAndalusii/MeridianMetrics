"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  PoundSterling,
  FileText,
  Trash2,
  BadgeCheck,
  TrendingDown,
  ClipboardList,
  Lightbulb,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function HowBusinessesSaveMoneyOnWaste() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <Navigation />

      <article className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back */}
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-10 transition-colors poppins-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Resources
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 mb-5">
              <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Business Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-5 leading-tight">
              How Businesses Can Save Money On Waste
            </h1>
            <p className="poppins-regular text-lg text-emerald-700 leading-relaxed">
              Waste can cost a business more than it should. It is not just the bin bill — it can also mean wasted time, poor records, and a higher risk of fines.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
              <span className="poppins-medium">Updated: April 2026</span>
              <span>·</span>
              <span className="poppins-medium">5 min read</span>
            </div>
          </div>

          {/* Intro card */}
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 sm:p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed">
                The good news is that many businesses can save money by making small, smart changes. They can also stay more organised and more compliant with waste rules — without major disruption or cost.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">Why Waste Costs More Than You Think</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
              If waste is not managed well, a business can end up paying for things it does not need to. The costs are not always obvious, but they add up quickly.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
              {[
                "Too many collections — or collections that are too frequent for the actual volume",
                "The wrong size bins for the site",
                "Mixed waste that could have been recycled at lower cost",
                "Missing or poor records that create admin time and risk",
                "Mistakes that lead to extra charges, failed audits, or fines",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  <p className="poppins-regular text-sm text-slate-600 leading-snug">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="poppins-medium text-sm text-emerald-800">
                A simple waste check can show where money is being lost and what can be improved.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <PoundSterling className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">Easy Ways To Save Cash</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              These changes do not require big investment. Most can be done quickly, and the savings tend to compound over time.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Buy Less", desc: "Only order what you need. Reduce what enters the business and you reduce what needs to leave it." },
                { title: "Reuse Where Possible", desc: "Packaging, containers, and materials that can be used again are waste costs avoided." },
                { title: "Sort Waste Properly", desc: "Recyclables in the general waste bin cost you money. Right bin, right stream, lower cost." },
                { title: "Right Bins, Right Plan", desc: "Match your bin sizes and collection frequency to your actual output — not a default contract." },
                { title: "Check Your Bills", desc: "Waste bills are often not reviewed. Checking them regularly reveals overcharges and unnecessary services." },
                { title: "Verify Your Contractors", desc: "Make sure waste carriers are registered and licences are current. Illegal carriers create legal risk for your business." },
                { title: "Keep Clear Records", desc: "Good documentation prevents problems and makes audits straightforward." },
                { title: "Train Your Staff", desc: "People who know what goes where make better decisions every day. Small habit changes make a real difference." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-slate-100 p-5 flex gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-sm text-slate-800 mb-1">{item.title}</p>
                    <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">Why Good Records Matter</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              Good records help a business stay in control. They also show that waste has been handled the right way — which matters if a regulator, council, or the Environment Agency ever asks.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <p className="poppins-semibold text-sm text-slate-700 mb-4">Useful records to keep:</p>
              <div className="space-y-3">
                {[
                  "Waste transfer notes for every collection",
                  "Carrier licence checks and copies",
                  "Collection contracts and pricing agreements",
                  "Waste audit reports and findings",
                  "Notes on what waste comes from where and how it is handled",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ClipboardList className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p className="poppins-regular text-sm text-slate-600 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="poppins-medium text-sm text-emerald-700">
                  When records are clear, it is easier to spot waste, reduce cost, and avoid problems later.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 — How we help */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">How Millstone Compliance Helps</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              Millstone Compliance helps UK businesses cut waste costs and stay on top of waste rules. The service is straightforward: a clear review of your current setup and a practical action plan — delivered within 48 hours.
            </p>
            <div className="bg-white rounded-2xl border border-emerald-100 p-6">
              <p className="poppins-semibold text-sm text-slate-700 mb-4">We look at:</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  "Waste transfer notes",
                  "Carrier licences",
                  "Waste records",
                  "Bin setup",
                  "Segregation",
                  "Compliance gaps",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <p className="poppins-regular text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-emerald-100">
                <p className="poppins-regular text-sm text-slate-500 leading-relaxed">
                  We give clear advice with no confusing jargon. Our reports are built to help businesses see what is working, what needs fixing, and where money may be wasted.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 — What this means */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">What This Means For Your Business</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
              Saving money on waste is not just about paying less for bins. It is about having a better system — one that works for your site, your team, and your budget.
            </p>
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-2xl p-7 text-white">
              <p className="poppins-semibold text-sm text-emerald-200 uppercase tracking-wider mb-4">A better waste system helps you:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Spend less on collections and contractors",
                  "Waste less through better segregation",
                  "Work better with clear processes and records",
                  "Stay compliant without guesswork",
                  "Reduce risk before it becomes a problem",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <p className="poppins-regular text-sm text-emerald-100 leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 p-8 sm:p-12">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="poppins-semibold text-xs text-emerald-200 uppercase tracking-[0.15em]">Ready To Reduce Your Waste Costs?</span>
              </div>

              {/* Heading */}
              <h3 className="poppins-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
                See exactly where<br />
                <span className="text-emerald-300">you stand.</span>
              </h3>

              {/* Body */}
              <p className="poppins-regular text-base text-emerald-100/80 max-w-lg mb-8 leading-relaxed">
                Our audit reviews your waste setup, records, and contractor arrangements — and shows you where costs can be reduced and compliance tightened.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                {["Fixed-fee pricing", "48-hour written report", "Independent advice"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="poppins-medium text-sm text-emerald-200">{t}</span>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white hover:bg-emerald-50 text-emerald-800 poppins-bold text-sm rounded-xl transition-all duration-200 active:scale-95 shadow-lg"
                >
                  Book An Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 poppins-semibold text-sm rounded-xl transition-all duration-200"
                >
                  Free Cost Check
                </Link>
              </div>
            </div>
          </div>

        </div>
      </article>

      <Footer />
    </div>
  )
}
