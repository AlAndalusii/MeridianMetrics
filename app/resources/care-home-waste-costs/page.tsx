"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  PoundSterling,
  FileText,
  Trash2,
  Search,
  ClipboardList,
  Heart,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

export default function CareHomeWasteCosts() {
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
              <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Care Home Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-5 leading-tight">
              Why Waste Is Costing Your Care Home More Than It Should
            </h1>
            <p className="poppins-regular text-lg text-emerald-700 leading-relaxed">
              Most care homes are overpaying for waste — not because of bad luck, but because of the wrong bins, the wrong contracts, and waste going into the wrong bags. This guide explains what goes wrong and how an independent audit can fix it.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
              <span className="poppins-medium">Updated: April 2026</span>
              <span>·</span>
              <span className="poppins-medium">10 min read</span>
            </div>
          </div>

          {/* Intro callout */}
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 sm:p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed">
                Care homes deal with a wide range of waste every day — from food and recycling to clinical bags and sharps. Getting it wrong does not just create compliance risk. It quietly costs thousands of pounds every year.
              </p>
            </div>
          </div>

          {/* Section 1 — Why waste costs so much */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
                <PoundSterling className="w-5 h-5 text-red-500" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">Where The Money Goes</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
              Waste costs in a care home are not just about how many bags go out the door. There are several hidden ways the bill gets bigger than it needs to be.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 mb-5">
              {[
                { title: "Waste in the wrong bag", desc: "Clinical waste bags are expensive to treat. When ordinary rubbish or incontinence pads end up in clinical bags by mistake, you pay clinical prices for waste that did not need it." },
                { title: "Too many collections", desc: "If bins are collected more often than they are actually full, you are paying for lifts you do not need." },
                { title: "Bins that are the wrong size", desc: "A bin that is too big means you pay for capacity you never use. A bin that is too small leads to overflow charges and emergency collections." },
                { title: "Contracts with hidden charges", desc: "Many waste contracts include automatic price increases, extra surcharges and clauses that lock you in for another year without any warning." },
                { title: "Food waste going to the wrong place", desc: "Sending food waste to general waste costs more per tonne. Dedicated food waste collections are cheaper — and now required by law for most care homes." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 sm:p-5">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  <div>
                    <p className="poppins-semibold text-sm text-slate-800 mb-1">{item.title}</p>
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="poppins-medium text-sm text-amber-800">
                Research from healthcare waste specialists shows that around 70% of care home waste is put in the wrong place — including up to 90% of clinical waste bags containing items that did not belong there.
              </p>
            </div>
          </section>

          {/* Section 2 — What an independent auditor does */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">What An Independent Auditor Does</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
              An independent waste auditor is not a waste contractor. They do not sell bin collections. Their job is to look at your current setup and tell you honestly what is working, what is not, and where you are spending more than you should.
            </p>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              Because they are not tied to any contractor, they can look at pricing from multiple companies and tell you whether you are getting a fair deal.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Contract review", desc: "Checking your prices, surcharges and renewal terms against what others are paying." },
                { title: "Bin setup check", desc: "Making sure your bin sizes and how often they are collected actually match how much waste you produce." },
                { title: "Waste stream analysis", desc: "Looking at whether clinical, offensive, recycling and food waste are going to the right places." },
                { title: "Segregation review", desc: "Checking whether staff are putting waste into the correct colour-coded bags and bins." },
                { title: "Legal documents check", desc: "Making sure you have the right paperwork — including duty of care transfer notes and consignment notes." },
                { title: "Contractor checks", desc: "Verifying that your waste carriers are properly registered with the Environment Agency." },
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

          {/* Section 3 — What waste a care home produces */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">The Different Types Of Waste In A Care Home</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              Care homes produce more types of waste than most other businesses. Each type has different rules — and different costs if handled incorrectly.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
              {[
                { name: "General (residual) waste", desc: "Everyday rubbish from rooms, lounges and offices — things that cannot be recycled." },
                { name: "Dry recycling", desc: "Paper, card, plastic, cans and glass. Must be kept separate from general waste under Simpler Recycling rules." },
                { name: "Food waste", desc: "Kitchen scraps and plate waste. Now legally required to be collected separately for most care homes." },
                { name: "Clinical waste", desc: "Items that have been in contact with blood or body fluids, such as dressings and some PPE. These are expensive to treat and must be handled correctly." },
                { name: "Offensive (hygiene) waste", desc: "Non-infectious but unpleasant items like incontinence pads. These go in tiger-stripe bags — not clinical bags — and cost less to treat." },
                { name: "Sharps", desc: "Needles, syringes and lancets. Must go into approved sharps containers and be collected by a licensed contractor." },
                { name: "Pharmaceutical waste", desc: "Expired or unused medicines that must be disposed of via approved routes." },
                { name: "Confidential waste", desc: "Documents with personal data that must be securely shredded or collected for secure destruction." },
              ].map((item) => (
                <div key={item.name} className="flex items-start gap-3 p-4">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div>
                    <p className="poppins-semibold text-sm text-slate-800 mb-0.5">{item.name}</p>
                    <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — What the auditor checks on site */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">What Happens During A Site Audit</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              A proper audit involves a physical walk-through of the site — not just a paperwork review. The auditor looks at how waste is handled from the moment it is created to when it leaves the premises.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
              {[
                { heading: "Internal bins and bags", body: "Are the right colour-coded bags being used in bedrooms, bathrooms and treatment rooms? Do bins have lids and foot pedals?" },
                { heading: "Segregation points", body: "Are staff putting waste into the right containers? The auditor will check bag contents to see how much is being put in the wrong place." },
                { heading: "External bin stores", body: "Are clinical waste bins locked and labelled correctly? Are different waste streams being kept apart?" },
                { heading: "Storage conditions", body: "Is healthcare waste stored safely — with proper ventilation, sealed flooring and drainage where required?" },
                { heading: "Paperwork vs reality", body: "Does the physical setup match what is listed on your contracts and invoices? The auditor checks for services you are being billed for that do not exist on site." },
              ].map((item) => (
                <div key={item.heading} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-sm text-slate-800 mb-1">{item.heading}</p>
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 — Common failures */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">The Most Common Problems Found</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              The same issues come up again and again in care home waste audits. Most are easy to fix once they have been spotted.
            </p>
            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 mb-5">
              {[
                "Recyclable waste and incontinence pads being put into expensive clinical waste bags",
                "Bins without lids, foot pedals, or the correct colour-coded labelling",
                "Missing or unsigned waste transfer notes",
                "Hazardous waste consignment notes not being kept for the required three years",
                "Clinical waste storage areas left unlocked",
                "No proof that waste carriers are registered with the Environment Agency",
                "Staff who have not had any formal training on waste segregation",
                "Services listed on invoices that do not match what is actually being collected",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="poppins-regular text-sm text-slate-600 leading-snug">{item}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="poppins-medium text-sm text-emerald-800">
                These are not unusual edge cases — they are the norm. An audit finds them before a regulator does.
              </p>
            </div>
          </section>

          {/* Section 6 — Documents */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">The Documents You Need To Have</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              Waste management in a care home is not just a physical job — it comes with real legal paperwork requirements. Getting these wrong can lead to fines, rejected collections and problems with the Environment Agency or CQC.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { title: "Waste transfer notes", desc: "Required every time non-hazardous waste is collected. Must be kept for at least two years." },
                { title: "Clinical waste consignment notes", desc: "Required for every clinical or hazardous waste collection. Must be kept for at least three years." },
                { title: "Carrier licence checks", desc: "You must check that anyone taking your waste is registered with the Environment Agency. Keep a record of these checks." },
                { title: "Pre-acceptance audit records", desc: "Before a licensed contractor can legally accept your waste, they need a waste audit on file that describes what you produce." },
                { title: "Staff training records", desc: "Evidence that staff have been trained on correct waste segregation — especially those handling clinical waste." },
                { title: "Simpler Recycling records", desc: "From March 2025, care homes with 10 or more staff must separate food waste, paper and card, and dry recyclables — with documentation to show they are doing so." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-slate-100 p-5 flex gap-3">
                  <FileText className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="poppins-semibold text-sm text-slate-800 mb-1">{item.title}</p>
                    <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 — How we help */}
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                <BadgeCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="poppins-bold text-2xl text-emerald-900">How We Help Care Homes</h2>
            </div>
            <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
              We are an independent waste compliance consultancy. We do not sell bin collections or work for any contractor. Our job is to help care homes understand their waste setup, find where money is being lost, and fix the compliance gaps before they become problems.
            </p>
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 mb-5">
              <p className="poppins-semibold text-sm text-slate-700 mb-4">A typical audit with us covers:</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  "Contract and pricing review",
                  "Bin size and frequency check",
                  "Waste stream segregation",
                  "Clinical and offensive waste routing",
                  "Legal document review",
                  "Carrier licence verification",
                  "Staff training gaps",
                  "Simpler Recycling compliance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <p className="poppins-regular text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-2xl p-7 text-white">
              <p className="poppins-semibold text-sm text-emerald-200 uppercase tracking-wider mb-4">What you get:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "A clear picture of what your care home is spending on waste",
                  "Specific recommendations to reduce costs",
                  "A list of compliance gaps and how to close them",
                  "Practical steps your team can take straight away",
                  "Support with contracts, records and documentation",
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
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative z-10 p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="poppins-semibold text-xs text-emerald-200 uppercase tracking-[0.15em]">Find Out What You Could Save</span>
              </div>

              <h3 className="poppins-bold text-3xl sm:text-4xl text-white leading-tight mb-4">
                See exactly where<br />
                <span className="text-emerald-300">your money is going.</span>
              </h3>

              <p className="poppins-regular text-base text-emerald-100/80 max-w-lg mb-8 leading-relaxed">
                Our independent audit looks at your contracts, bins, segregation and paperwork — and gives you a clear, plain-English report showing where to save money and close compliance gaps.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                {["Independent advice", "No contractor ties", "Plain-English report"].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="poppins-medium text-sm text-emerald-200">{t}</span>
                  </div>
                ))}
              </div>

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
                  Free Compliance Check
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
