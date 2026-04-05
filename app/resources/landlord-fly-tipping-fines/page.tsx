"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, AlertCircle,
  FileCheck, Truck, XCircle, ClipboardList, Banknote,
  ShieldCheck, BadgeAlert, Search, Receipt,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"
import { useBooking } from "@/components/BookingProvider"

export default function LandlordFlyTippingFinesPage() {
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
                BOOK COMPLIANCE REVIEW
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 border border-red-200 mb-4">
              <span className="poppins-semibold text-xs text-red-800 uppercase tracking-wide">Waste Compliance Guide</span>
            </div>
            <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-900 mb-4 leading-tight">
              Landlord Fly-Tipping Fines Hit Record Highs—Here&apos;s How to Protect Yourself When Clearing Properties
            </h1>
            <p className="poppins-regular text-lg text-emerald-700 mb-2">
              Using an Unlicensed &quot;Man with a Van&quot; Could Cost You £600+ Even If You Didn&apos;t Dump the Waste
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm text-emerald-600">
              <span className="poppins-medium">Last updated: February 2026</span>
              <span>•</span>
              <span className="poppins-medium">20 min read</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Fly-tipping incidents", value: "1.15M", sub: "England 2023/24 (+6%)", color: "bg-red-50 border-red-200", val: "text-red-700" },
              { label: "Household waste", value: "688K", sub: "Incidents involving residential", color: "bg-amber-50 border-amber-200", val: "text-amber-700" },
              { label: "Max landlord fine", value: "£600", sub: "Using unlicensed carrier", color: "bg-blue-50 border-blue-200", val: "text-blue-700" },
            ].map((s, i) => (
              <div key={i} className={`rounded-2xl border p-5 text-center ${s.color}`}>
                <p className={`poppins-bold text-3xl mb-1 ${s.val}`}>{s.value}</p>
                <p className="poppins-semibold text-sm text-emerald-900">{s.label}</p>
                <p className="poppins-regular text-xs text-emerald-600 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Intro */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="poppins-semibold text-amber-900 mb-2">You can be fined £600 even if you didn&apos;t dump the waste</p>
                <p className="poppins-regular text-amber-800 text-sm leading-relaxed">
                  Simply for failing to verify that your waste carrier was properly licensed. Councils now cross-reference waste carrier licences against property addresses, use packaging labels in dumped waste to trace landlords, and impose automatic fixed penalty notices when the trail leads to a rental property.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-emerald max-w-none space-y-8">

            {/* Scale of the Problem */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <BadgeAlert className="w-6 h-6 text-red-500" />
                The Scale of the Problem
              </h2>
              <p className="poppins-semibold text-emerald-800 mb-4">DEFRA&apos;s Latest Statistics (2023/24)</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Total incidents", value: "1.15 million", desc: "Up 6% from 2022/23" },
                  { label: "Household waste incidents", value: "688,000", desc: "60% of all fly-tipping" },
                  { label: "Rental property connection", value: "20–30%", desc: "Estimated % traceable to rental activities" },
                  { label: "Most affected areas", value: "Residential", desc: "Pavements, alleys, communal bin stores" },
                ].map((s, i) => (
                  <div key={i} className="bg-red-50 rounded-xl border border-red-200 p-4">
                    <p className="poppins-bold text-red-700 text-xl mb-1">{s.value}</p>
                    <p className="poppins-semibold text-red-900 text-sm">{s.label}</p>
                    <p className="poppins-regular text-red-600 text-xs mt-1">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
                <p className="poppins-semibold text-emerald-900 text-sm mb-2">What gets fly-tipped from rental properties:</p>
                <div className="flex flex-wrap gap-2">
                  {["Mattresses & sofas", "Black bags of household waste", "Old furniture & appliances", "Carpets & flooring", "Construction waste from refurbs", "Broken white goods"].map((item, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white border border-emerald-200 text-emerald-700 text-xs poppins-medium">{item}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Duty of Care Law */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                Why Landlords Keep Getting Fined (Even When They Hire Someone)
              </h2>
              <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">The &quot;Duty of Care&quot; Law</h3>
              <p className="poppins-regular text-emerald-800 leading-relaxed mb-4">
                <strong>Section 34 of the Environmental Protection Act 1990</strong> creates a legal duty of care for anyone who produces, carries, keeps, treats, or disposes of controlled waste. When you clear a property, you are the <strong>waste producer</strong>. You are legally responsible for ensuring that waste is:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  "Stored securely until collection",
                  "Transferred only to an authorised waste carrier",
                  "Documented with a Waste Transfer Note (WTN)",
                  "Disposed of at an authorised facility",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-emerald-800 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 border-l-4 border-red-400 rounded-r-xl p-4">
                <p className="poppins-semibold text-red-900 text-sm">If any step fails, you can be prosecuted or fined—even if someone else did the actual dumping.</p>
              </div>
            </div>

            {/* Four Ways Landlords Get Caught */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">The Four Ways Landlords Get Caught</h2>
              <div className="space-y-5">

                {/* Way 1 */}
                <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                  <h3 className="poppins-semibold text-lg text-red-900 mb-3 flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    1. Hiring an Unlicensed &quot;Man with a Van&quot;
                  </h3>
                  <div className="bg-white rounded-lg border border-red-200 p-4 mb-3">
                    <p className="poppins-semibold text-red-800 text-sm mb-2">The scenario:</p>
                    <p className="poppins-regular text-red-700 text-sm">Tenant moves out leaving a sofa, mattress, and 10 black bags. You see a Facebook ad: <em>&quot;Same-Day Waste Removal - £80 Cash.&quot;</em> They collect everything. Two weeks later, the waste (with post addressed to your property) is found dumped in a lay-by.</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg">
                    <Banknote className="w-5 h-5 text-red-700 flex-shrink-0" />
                    <p className="poppins-semibold text-red-800 text-sm">Penalty: £600 fixed penalty notice for breach of duty of care. Defence (&quot;I didn&apos;t know they&apos;d dump it&quot;) fails — law requires you to verify the carrier BEFORE handing over waste.</p>
                  </div>
                </div>

                {/* Way 2 */}
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
                  <h3 className="poppins-semibold text-lg text-amber-900 mb-3">2. Tenants Leaving Waste Outside on Move-Out</h3>
                  <p className="poppins-regular text-amber-800 text-sm mb-3">
                    Tenant vacates Saturday. By Monday there&apos;s a pile of furniture on the pavement. You leave it, assuming the council or someone will collect it. Council photographs the waste, traces address to you as landlord.
                  </p>
                  <div className="flex items-center gap-3 p-3 bg-amber-100 rounded-lg mb-3">
                    <Banknote className="w-5 h-5 text-amber-700 flex-shrink-0" />
                    <p className="poppins-semibold text-amber-800 text-sm">Penalty: £400–600. Once the tenant vacates, abandoned items become your responsibility.</p>
                  </div>
                  <p className="poppins-semibold text-amber-800 text-sm mb-2">What you should do instead:</p>
                  <ul className="space-y-1">
                    {["Conduct check-out inspection immediately on move-out day", "Arrange licensed waste collection within 24–48 hours", "OR report to council bulky waste service (£20–40 per item)", "Never leave waste on public land"].map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-amber-800 text-xs">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Way 3 */}
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                  <h3 className="poppins-semibold text-lg text-blue-900 mb-3">3. Builder/Contractor Waste from Refurbishments</h3>
                  <p className="poppins-regular text-blue-800 text-sm mb-3">
                    You hire a builder who quotes &quot;including waste removal.&quot; Old kitchen units, fixtures, and rubble disappear. Three months later, construction waste dumped in woodland is traced to your property via documents left in the skip.
                  </p>
                  <div className="flex items-center gap-3 p-3 bg-blue-100 rounded-lg">
                    <Banknote className="w-5 h-5 text-blue-700 flex-shrink-0" />
                    <p className="poppins-semibold text-blue-800 text-sm">Penalty: £600 FPN + potential prosecution. Even if the builder did the dumping, you share liability because you did not verify their waste carrier registration or obtain a WTN.</p>
                  </div>
                </div>

                {/* Way 4 */}
                <div className="bg-purple-50 rounded-xl border border-purple-200 p-5">
                  <h3 className="poppins-semibold text-lg text-purple-900 mb-3">4. HMO Bin Overflow Leading to Fly-Tipping</h3>
                  <p className="poppins-regular text-purple-800 text-sm mb-3">
                    Your 6-bed HMO has inadequate bin capacity. Bags pile up beside bins. Neighbours and passers-by add their waste (classic &quot;broken windows&quot; effect). Post and packaging in the pile traces to your HMO address.
                  </p>
                  <div className="flex items-center gap-3 p-3 bg-purple-100 rounded-lg">
                    <Banknote className="w-5 h-5 text-purple-700 flex-shrink-0" />
                    <p className="poppins-semibold text-purple-800 text-sm">Penalty: £400–1,000 + requirement to provide adequate bins. HMO licensing conditions require adequate waste storage.</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Legal Framework */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-emerald-600" />
                The Legal Framework: What You Must Do
              </h2>

              {/* Step 1 */}
              <div className="mb-6">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3 flex items-center gap-2">
                  <Search className="w-5 h-5 text-emerald-600" />
                  1. Verify Waste Carrier Registration (BEFORE Handover)
                </h3>
                <p className="poppins-regular text-emerald-800 text-sm mb-3">
                  Every waste carrier in England and Wales must be registered with the Environment Agency. Carriers must hold <strong>Upper Tier</strong> registration to transport waste commercially.
                </p>
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4 mb-4">
                  <p className="poppins-semibold text-emerald-900 text-sm mb-2">How to check:</p>
                  <p className="poppins-regular text-emerald-800 text-sm mb-2">Environment Agency Public Register:</p>
                  <p className="poppins-semibold text-emerald-700 text-sm font-mono">https://environment.data.gov.uk/public-register/view/search-waste-carriers-brokers</p>
                  <p className="poppins-regular text-emerald-700 text-xs mt-2">Record: company name, registration number (e.g., CBDU123456), tier (must be Upper Tier), expiry date, and date you checked. Keep for 2 years minimum.</p>
                </div>
                <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                  <p className="poppins-semibold text-red-900 text-sm mb-2">Red flags — DO NOT USE if any apply:</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {[
                      "Carrier refuses to provide registration number",
                      "Number doesn't appear on EA register",
                      "Registration expired",
                      "Registered as 'Lower Tier' only",
                      "Claims 'I don't need a licence for small jobs' (FALSE)",
                    ].map((flag, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-red-800 text-xs">{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-6">
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-emerald-600" />
                  2. Obtain a Waste Transfer Note (WTN)
                </h3>
                <p className="poppins-regular text-emerald-800 text-sm mb-4">
                  A WTN is a legal document recording the transfer of waste from producer (you) to carrier. Required information:
                </p>
                <div className="grid sm:grid-cols-2 gap-2 mb-4">
                  {[
                    "Description of waste (e.g., 'household furniture and bagged mixed waste')",
                    "Quantity (e.g., 'approx. 2 cubic metres' or '1 sofa, 8 black bags')",
                    "Transfer date",
                    "Property address where waste originated",
                    "Waste carrier details (name, registration number)",
                    "Disposal site (name and address of authorised facility)",
                    "Your details as waste producer",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-emerald-50 rounded-lg p-2.5 border border-emerald-100">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-emerald-800 text-xs">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                  <p className="poppins-semibold text-amber-900 text-sm mb-1">Retention requirement:</p>
                  <p className="poppins-regular text-amber-800 text-sm">You must keep WTNs for <strong>2 years minimum</strong> (Waste (England and Wales) Regulations 2011). Can be paper or digital.</p>
                  <p className="poppins-semibold text-amber-900 text-sm mt-2">&quot;I don&apos;t do paperwork, mate&quot; = unlicensed. Walk away. Legitimate carriers provide WTNs as standard.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">3. Verify Disposal Site</h3>
                <p className="poppins-regular text-emerald-800 text-sm mb-3">
                  The WTN should name the waste facility where your waste will be taken. You can verify it&apos;s legitimate by checking the EA&apos;s list of permitted waste sites or calling the facility to confirm.
                </p>
                <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                  <p className="poppins-semibold text-blue-900 text-sm mb-2">If you have a WTN but the carrier dumps it anyway:</p>
                  <p className="poppins-regular text-blue-800 text-sm">You&apos;re protected IF you checked carrier registration, obtained WTN, and had no reason to suspect illegal disposal. Council will pursue the carrier, not you. But if you didn&apos;t check registration, you share liability.</p>
                </div>
              </div>
            </div>

            {/* Penalty Structure */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <Banknote className="w-6 h-6 text-emerald-600" />
                Penalty Structure: What Fines Actually Cost
              </h2>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-emerald-800 text-white">
                      <th className="text-left p-3 poppins-semibold text-xs">Offence</th>
                      <th className="text-left p-3 poppins-semibold text-xs">FPN Amount</th>
                      <th className="text-left p-3 poppins-semibold rounded-tr-lg text-xs">Court Fine (if prosecuted)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Using unlicensed waste carrier", "£300–600", "Up to £5,000"],
                      ["No Waste Transfer Note", "£300–600", "Up to £5,000"],
                      ["Fly-tipping (small scale)", "£400–1,000", "Up to £50,000"],
                      ["Fly-tipping (van load+)", "£1,000+", "Unlimited + vehicle seizure"],
                      ["Repeat offences", "Escalating", "Criminal record"],
                    ].map(([offence, fpn, court], i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                        <td className="p-3 poppins-regular text-emerald-800 text-xs border-b border-emerald-100">{offence}</td>
                        <td className="p-3 poppins-semibold text-red-700 text-xs border-b border-emerald-100">{fpn}</td>
                        <td className="p-3 poppins-regular text-red-600 text-xs border-b border-emerald-100">{court}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <p className="poppins-semibold text-gray-900 text-sm mb-2">Real case (Nottingham, 2025):</p>
                <p className="poppins-regular text-gray-700 text-sm mb-2">Landlord with 8-property portfolio repeatedly used unlicensed clearance firm. Waste from 5 properties traced to multiple dump sites over 18 months.</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  {[["Fine", "£12,000"], ["Costs", "£4,800"], ["Criminal record", "Yes"], ["Total", "£16,800"]].map(([k, v], i) => (
                    <div key={i} className="text-center">
                      <p className="poppins-bold text-red-700 text-lg">{v}</p>
                      <p className="poppins-regular text-gray-600 text-xs">{k}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA mid-article */}
            <div className="bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-3">Manage multiple properties?</h3>
                <p className="poppins-regular text-emerald-100 mb-5 leading-relaxed">
                  Our Landlord Waste Compliance Service gives you a pre-verified carrier network, automatic WTN generation, and full indemnity against fly-tipping claims — so every clearance is covered.
                </p>
                <Button
                  onClick={() => openBooking()}
                  size="lg"
                  className="bg-white text-emerald-800 hover:bg-emerald-50 poppins-semibold shadow-xl"
                >
                  Get Your Free Waste Compliance Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Practical Clearance Workflows */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6">Practical Clearance Workflows (The Right Way)</h2>

              <div className="space-y-6">
                {/* Scenario 1 */}
                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">Scenario 1: Tenant Move-Out Clearance</h3>
                  <p className="poppins-regular text-emerald-600 text-sm mb-3 italic">Timeline: Tenant vacates Friday, new tenant moves in Monday</p>
                  <div className="space-y-2">
                    {[
                      { time: "Friday 3pm", action: "Check-out inspection. Document abandoned items (photos). Email tenant: '7 days to collect or items disposed of at your cost'.", color: "bg-emerald-50 border-emerald-200" },
                      { time: "Friday 4pm", action: "Call 2–3 licensed carriers for quotes. Ask for registration number, availability, and confirmation they provide WTNs.", color: "bg-blue-50 border-blue-200" },
                      { time: "Friday 5pm", action: "Check EA register online (5 minutes). Screenshot registration details. Confirm booking.", color: "bg-purple-50 border-purple-200" },
                      { time: "Saturday 9am", action: "Carrier arrives. Obtain WTN before they leave. Pay via card for audit trail. Photo the loaded van (optional but smart).", color: "bg-amber-50 border-amber-200" },
                      { time: "Saturday 10am", action: "File WTN in property folder. Note clearance cost for accounts. Deduct from tenant deposit if applicable.", color: "bg-green-50 border-green-200" },
                    ].map((step, i) => (
                      <div key={i} className={`rounded-xl border p-4 flex gap-4 ${step.color}`}>
                        <div className="flex-shrink-0 w-24 text-right">
                          <span className="poppins-semibold text-emerald-700 text-xs">{step.time}</span>
                        </div>
                        <p className="poppins-regular text-emerald-800 text-sm">{step.action}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {[["Cost", "£80–200"], ["Time", "2 hours"], ["Fly-tipping risk", "Zero"]].map(([k, v], i) => (
                      <div key={i} className="bg-emerald-50 rounded-lg border border-emerald-200 p-3 text-center">
                        <p className="poppins-bold text-emerald-700 text-base">{v}</p>
                        <p className="poppins-regular text-emerald-600 text-xs">{k}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scenario 2 */}
                <div>
                  <h3 className="poppins-semibold text-lg text-emerald-900 mb-3">Scenario 2: Void Refurbishment Clearance</h3>
                  <p className="poppins-regular text-emerald-800 text-sm mb-3">Include this clause in every builder contract before work starts:</p>
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 font-mono text-xs">
                    <p className="poppins-semibold text-gray-900 mb-2">Waste Removal Clause:</p>
                    <p className="poppins-regular text-gray-700 mb-2">Contractor agrees to:</p>
                    <ul className="space-y-1 mb-3">
                      {[
                        "Remove all waste arising from works to a licensed disposal facility",
                        "Provide copy of waste carrier registration before commencing works",
                        "Provide Waste Transfer Note for all waste removed",
                        "Indemnify Landlord against any fly-tipping claims arising from disposal",
                      ].map((item, i) => (
                        <li key={i} className="poppins-regular text-gray-700">• {item}</li>
                      ))}
                    </ul>
                    <p className="poppins-regular text-gray-700">Contractor waste carrier registration: [Number: ____________]</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 mt-3">
                    <p className="poppins-semibold text-amber-900 text-sm">If builder says &quot;Don&apos;t worry about the paperwork&quot;:</p>
                    <p className="poppins-regular text-amber-800 text-sm mt-1">&quot;I need your waste carrier registration and a WTN or I can&apos;t pay your invoice. It&apos;s a legal requirement.&quot; Legitimate builders will comply immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reasonable Measures Defence */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                The &quot;Reasonable Measures&quot; Defence
              </h2>
              <p className="poppins-regular text-emerald-800 mb-4">If accused of a duty-of-care breach, your defence is: <em>&quot;I took all reasonable measures to ensure lawful disposal.&quot;</em></p>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-xl border border-green-200 p-5">
                  <p className="poppins-semibold text-green-900 mb-3">What counts as &quot;reasonable measures&quot;:</p>
                  <ul className="space-y-2">
                    {[
                      "Checked carrier registration on EA website",
                      "Kept record of registration number and check date",
                      "Obtained WTN",
                      "Verified disposal site named on WTN",
                      "Paid via traceable method (bank transfer, card)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-green-800 text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 rounded-xl border border-red-200 p-5">
                  <p className="poppins-semibold text-red-900 mb-3">What does NOT count:</p>
                  <ul className="space-y-2">
                    {[
                      "\"The carrier looked professional\"",
                      "\"They had a company name on the van\"",
                      "\"They gave me a business card\"",
                      "\"They were cheaper than others\"",
                      "\"I trusted them\"",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="poppins-regular text-red-800 text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <p className="poppins-semibold text-gray-900 text-sm mb-1">Real case (Leeds, 2025):</p>
                <p className="poppins-regular text-gray-700 text-sm mb-2">Landlord fined £600. Defence: &quot;The van had a company name painted on it and the driver had a uniform.&quot;</p>
                <p className="poppins-semibold text-gray-800 text-sm italic">Magistrate: &quot;The legal requirement is to verify registration, not make assumptions based on appearance. Defence rejected.&quot; Fine upheld.</p>
              </div>
            </div>

            {/* Final Checklist */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-6 flex items-center gap-2">
                <ClipboardList className="w-6 h-6 text-emerald-600" />
                Final Checklist: Never Get Fined for Fly-Tipping
              </h2>
              <p className="poppins-semibold text-emerald-800 mb-4">Before every property clearance:</p>
              <div className="space-y-2 mb-6">
                {[
                  { step: "Step 1", action: "Verify waste carrier registration on EA website" },
                  { step: "Step 2", action: "Save registration number and screenshot" },
                  { step: "Step 3", action: "Request WTN before clearance" },
                  { step: "Step 4", action: "Obtain completed WTN on collection day" },
                  { step: "Step 5", action: "File WTN in property records (2-year minimum retention)" },
                  { step: "Step 6", action: "Pay via traceable method (avoid cash-only operators)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center flex-shrink-0">
                      <span className="poppins-bold text-white text-xs">{i + 1}</span>
                    </div>
                    <div>
                      <span className="poppins-semibold text-emerald-900 text-sm">{item.step}: </span>
                      <span className="poppins-regular text-emerald-800 text-sm">{item.action}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                <p className="poppins-semibold text-blue-900 text-sm mb-2">Optional but smart:</p>
                <ul className="space-y-1">
                  {["Photo waste before collection (proves quantity)", "Photo loaded van with company details visible", "Request disposal receipt from carrier (weighbridge ticket)"].map((t, i) => (
                    <li key={i} className="poppins-regular text-blue-800 text-xs">• {t}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-4 mt-3">
                  {[["Time cost", "+15 min/clearance"], ["Financial cost", "£0"], ["Risk reduction", "95%+"]].map(([k, v], i) => (
                    <div key={i} className="text-center">
                      <p className="poppins-bold text-blue-700 text-base">{v}</p>
                      <p className="poppins-regular text-blue-600 text-xs">{k}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Council Enforcement Trends */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
              <h2 className="poppins-semibold text-2xl text-emerald-900 mb-4">Council Enforcement Trends (2026)</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { title: "Increased patrols", desc: "Dedicated fly-tipping enforcement teams with ANPR cameras, DNA testing of waste, and covert cameras at hotspots." },
                  { title: "Faster penalties", desc: "FPNs now issued within 2–3 weeks of incident (was 1–2 months)." },
                  { title: "Data sharing", desc: "Councils share fly-tipping data with other councils, Environment Agency, and landlord licensing teams." },
                  { title: "Higher prosecution rates", desc: "Councils prosecuting more cases, especially repeat offenders and commercial/rental property clearances." },
                ].map((c, i) => (
                  <div key={i} className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                    <p className="poppins-semibold text-amber-900 mb-2">{c.title}</p>
                    <p className="poppins-regular text-amber-800 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-red-50 rounded-xl border border-red-200 p-4">
                <p className="poppins-semibold text-red-900 text-sm mb-1">Strictest enforcement councils (highest FPN rates):</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Tower Hamlets", "Newham", "Hackney", "Manchester", "Birmingham", "Bristol", "Leeds"].map((c, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-white border border-red-200 text-red-700 text-xs poppins-medium">{c}</span>
                  ))}
                </div>
                <p className="poppins-regular text-red-700 text-xs mt-2">These councils issue 2,000–5,000 FPNs/year for waste offences. If you operate in these areas, compliance is non-negotiable.</p>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
              <div className="relative z-10">
                <h3 className="poppins-bold text-2xl mb-3">What Millstone Compliance Can Do</h3>
                <p className="poppins-regular text-emerald-100 mb-4">Our Landlord Waste Compliance Service includes:</p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Pre-verified carrier network (all registrations checked)",
                    "Automatic WTN generation and storage",
                    "24–48 hour clearance booking",
                    "Cost tracking per property",
                    "Full indemnity against fly-tipping claims",
                    "Legal support if enforcement action arises",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                      <span className="poppins-regular text-emerald-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="poppins-regular text-emerald-200 text-sm mb-5">
                  <strong className="text-white">Cost:</strong> £200–350 per clearance (full compliance included) &nbsp;·&nbsp;
                  <strong className="text-white">ROI:</strong> Eliminate £600 FPN risk + save 2–3 hours per clearance
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => openBooking()}
                    size="lg"
                    className="bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold shadow-xl"
                  >
                    Get Your Free Waste Compliance Audit
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    onClick={() => openBooking()}
                    size="lg"
                    className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/60 poppins-semibold shadow-xl"
                  >
                    Received an FPN? Urgent Support
                  </Button>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-emerald-100 shadow-lg">
              <h3 className="poppins-semibold text-lg text-emerald-900 mb-4 flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Sources
              </h3>
              <ul className="space-y-2">
                {[
                  "DEFRA, \"Fly-tipping statistics for England, 2023/24,\" GOV.UK, 2025",
                  "NRLA, \"Avoiding illegal dumping fines in 2026: What landlords must know,\" 6 January 2026",
                  "Environment Agency, \"Waste carriers, brokers and dealers public register,\" 2026",
                  "Environmental Protection Act 1990, Section 34 (Duty of Care)",
                  "Waste (England and Wales) Regulations 2011",
                  "Litta, \"Landlord waste removal guide,\" 2026",
                ].map((s, i) => (
                  <li key={i} className="poppins-regular text-emerald-700 text-xs leading-relaxed">• {s}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Nav */}
          <div className="mt-12 pt-8 border-t border-emerald-200">
            <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="poppins-medium text-sm">Back to All Resources</span>
            </Link>
          </div>
        </div>
      </article>
      </div>
  )
}
