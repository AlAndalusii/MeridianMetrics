"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
  Star,
  Zap,
  FileSpreadsheet,
  Mail,
  Lock,
  Sparkles,
  Building2,
  Trash2,
  Users,
  MapPin,
  ClipboardList,
  Calendar,
  AlertTriangle,
  FileCheck,
  Calculator,
  MessageSquare,
  ChevronRight,
  Download,
  Eye,
  BookOpen,
  Award,
  Layers,
  Grid,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Email CTA configuration ──────────────────────────────────────────────────

const EMAIL_ADDRESS = "hello@millstonecompliance.com"
const EMAIL_SUBJECT = "HMO Waste Management Plan Template — £97"
const EMAIL_BODY = `Hi Millstone Compliance team,

I'd like to purchase the HMO Waste Management Plan Template (£97).

Please send me the download link and payment details.

My details:
Name: 
Company / Trading name: 
Phone: 

Thank you`

const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`

// ─── Document section data ─────────────────────────────────────────────────

const documentSections = [
  {
    number: "01",
    icon: Building2,
    title: "Property Details",
    subtitle: "Editable cover sheet",
    color: "emerald",
    preview: [
      { label: "Property Address", value: "Full address & postcode" },
      { label: "HMO Licence Number", value: "Issued by local authority" },
      { label: "Number of Tenants", value: "Registered occupants" },
      { label: "Licence Holder", value: "Name & contact" },
      { label: "Managing Agent", value: "If applicable" },
      { label: "Plan Issue Date", value: "Auto-formatted" },
    ],
  },
  {
    number: "02",
    icon: Trash2,
    title: "Waste Streams Table",
    subtitle: "4-bin compliance matrix",
    color: "blue",
    preview: [
      { label: "Bin 1 — Food Waste", value: "Capacity · Colour · Frequency" },
      { label: "Bin 2 — Dry Recycling", value: "Capacity · Colour · Frequency" },
      { label: "Bin 3 — Paper & Card", value: "Capacity · Colour · Frequency" },
      { label: "Bin 4 — Residual Waste", value: "Capacity · Colour · Frequency" },
      { label: "Collection Schedule", value: "Day & time per stream" },
      { label: "Overflow Protocol", value: "EA-approved procedure" },
    ],
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Contractor Details",
    subtitle: "Licensed carrier record",
    color: "purple",
    preview: [
      { label: "Contractor Name", value: "Registered business name" },
      { label: "EA Waste Carrier Licence", value: "Number & expiry date" },
      { label: "Contract Start / End", value: "Term & renewal date" },
      { label: "Primary Contact", value: "Name, phone & email" },
      { label: "Emergency Line", value: "24/7 contact detail" },
      { label: "Contract Terms", value: "Collections & SLA summary" },
    ],
  },
  {
    number: "04",
    icon: MapPin,
    title: "Bin Location Diagram",
    subtitle: "Editable floor plan placeholder",
    color: "amber",
    preview: [
      { label: "Floor Plan Template", value: "Editable Word shape layer" },
      { label: "Bin Station Labels", value: "Numbered & colour-coded" },
      { label: "Access Route Notes", value: "Collector access description" },
      { label: "Signage Positions", value: "Council-required posting spots" },
      { label: "Measurement Fields", value: "Clearance distances" },
      { label: "Photo Reference", value: "Insert image placeholder" },
    ],
  },
  {
    number: "05",
    icon: Users,
    title: "Tenant Instruction Record",
    subtitle: "Proof of distribution log",
    color: "teal",
    preview: [
      { label: "Tenant Name Column", value: "All occupants listed" },
      { label: "Room / Unit Reference", value: "Individual allocation" },
      { label: "Briefing Date", value: "Date instructions received" },
      { label: "Signature Field", value: "Wet-sign or digital" },
      { label: "Language Requirement", value: "Translation noted" },
      { label: "Re-issue Log", value: "Updated instruction record" },
    ],
  },
  {
    number: "06",
    icon: Calendar,
    title: "Monitoring Schedule",
    subtitle: "6-month inspection log",
    color: "rose",
    preview: [
      { label: "Monthly Inspection Rows", value: "6 pre-formatted entries" },
      { label: "Contamination Check", value: "Pass / Fail per stream" },
      { label: "Bin Condition Notes", value: "Damage & repair log" },
      { label: "Inspector Name", value: "Signed accountability" },
      { label: "Corrective Actions", value: "Issue → fix → date" },
      { label: "Next Review Date", value: "Auto-calculated field" },
    ],
  },
  {
    number: "07",
    icon: AlertTriangle,
    title: "Contingency Procedures",
    subtitle: "Overflow · contamination · complaints",
    color: "orange",
    preview: [
      { label: "Overflow Protocol", value: "Step-by-step response" },
      { label: "Contamination Response", value: "EA-approved procedure" },
      { label: "Missed Collection", value: "Contractor escalation script" },
      { label: "Tenant Complaint Log", value: "Reference number system" },
      { label: "Council Notification", value: "When & how to report" },
      { label: "Incident Record Form", value: "Dated evidence trail" },
    ],
  },
  {
    number: "08",
    icon: Award,
    title: "Council Compliance Statement",
    subtitle: "Declaration & sign-off page",
    color: "indigo",
    preview: [
      { label: "Legislative References", value: "EPA 1990 s.34 · SR 2026" },
      { label: "Declaration Wording", value: "Solicitor-reviewed text" },
      { label: "Licence Holder Signature", value: "Named signatory field" },
      { label: "Date of Declaration", value: "Auto-formatted" },
      { label: "Witness Countersignature", value: "Optional authority field" },
      { label: "Council Submission Notes", value: "Address & reference guide" },
    ],
  },
]

const bonusItems = [
  {
    icon: Calculator,
    title: "Excel Bin Capacity Calculator",
    description:
      "Enter tenant count and average weekly waste volume — the calculator outputs exact bin sizes, quantities and collection frequency needed for your property.",
    tag: "Excel Included",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: MessageSquare,
    title: "Tenant Briefing Script",
    description:
      "Word-for-word script for in-person or written tenant inductions. Covers all four waste streams, correct usage, and what happens when rules are broken.",
    tag: "Word Included",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: FileText,
    title: "Complaint Response Templates",
    description:
      "Three pre-written letters: missed collection complaint, contamination notice to tenant, and council-facing incident response. Edit in under 5 minutes.",
    tag: "3 Templates",
    tagColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; num: string; dot: string }> = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    num: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    num: "text-blue-700",
    dot: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
    num: "text-purple-700",
    dot: "bg-purple-500",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "text-amber-600",
    num: "text-amber-700",
    dot: "bg-amber-500",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    icon: "text-teal-600",
    num: "text-teal-700",
    dot: "bg-teal-500",
  },
  rose: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    icon: "text-rose-600",
    num: "text-rose-700",
    dot: "bg-rose-500",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "text-orange-600",
    num: "text-orange-700",
    dot: "bg-orange-500",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    icon: "text-indigo-600",
    num: "text-indigo-700",
    dot: "bg-indigo-500",
  },
}

// ─── Document mockup component ────────────────────────────────────────────────

function DocumentMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Shadow pages behind */}
      <div className="absolute top-4 left-4 right-0 bottom-0 bg-slate-200 rounded-2xl opacity-40" />
      <div className="absolute top-2 left-2 right-0 bottom-0 bg-slate-100 rounded-2xl opacity-70" />

      {/* Main document */}
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Document header bar */}
        <div className="bg-emerald-700 px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center">
                <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="poppins-semibold text-xs text-white/90 uppercase tracking-widest">
                Millstone Compliance
              </span>
            </div>
            <span className="poppins-bold text-[10px] text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full">
              CONFIDENTIAL
            </span>
          </div>
          <h3 className="poppins-bold text-sm text-white leading-snug">
            HMO Waste Management Plan
          </h3>
          <p className="poppins-regular text-[11px] text-emerald-200 mt-0.5">
            Council-Submission Ready · Editable Word
          </p>
        </div>

        {/* Simulated content rows */}
        <div className="px-5 py-4 space-y-3">
          {/* Property row */}
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3">
            <p className="poppins-semibold text-[10px] text-emerald-700 uppercase tracking-widest mb-2">
              Property Details
            </p>
            <div className="space-y-1.5">
              {["Address", "HMO Licence", "Tenants"].map((label) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="poppins-regular text-[10px] text-slate-400 w-16 flex-shrink-0">{label}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 border border-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Waste streams mini-table */}
          <div className="rounded-lg border border-slate-100 overflow-hidden">
            <div className="bg-slate-800 px-3 py-1.5 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="poppins-semibold text-[10px] text-white/80 uppercase tracking-widest">
                Waste Streams
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {[
                { color: "bg-green-500", label: "Food Waste" },
                { color: "bg-blue-500", label: "Dry Recycling" },
                { color: "bg-amber-500", label: "Paper & Card" },
                { color: "bg-slate-700", label: "Residual" },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 bg-white">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${color}`} />
                  <span className="poppins-medium text-[10px] text-slate-700 flex-1">{label}</span>
                  <div className="w-10 h-1.5 rounded-full bg-slate-100" />
                  <div className="w-8 h-1.5 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Monitoring log preview */}
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-3">
            <p className="poppins-semibold text-[10px] text-slate-500 uppercase tracking-widest mb-2">
              6-Month Inspection Log
            </p>
            <div className="space-y-1">
              {["Jan", "Feb", "Mar"].map((m) => (
                <div key={m} className="flex items-center gap-2">
                  <span className="poppins-regular text-[10px] text-slate-400 w-6">{m}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200" />
                  <div className="w-6 h-1.5 rounded-full bg-emerald-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Signature row */}
          <div className="flex items-center gap-3 pt-1 pb-2">
            <div className="flex-1">
              <div className="h-px bg-slate-200 mb-0.5" />
              <span className="poppins-regular text-[9px] text-slate-300">Licence Holder Signature</span>
            </div>
            <div className="flex-1">
              <div className="h-px bg-slate-200 mb-0.5" />
              <span className="poppins-regular text-[9px] text-slate-300">Date</span>
            </div>
          </div>
        </div>

        {/* Footer stamp */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-700/5 border border-emerald-100">
            <span className="poppins-medium text-[10px] text-emerald-600">
              Simpler Recycling 2026 Compliant
            </span>
            <Shield className="w-3 h-3 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-amber-500 text-white poppins-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30">
        £97
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HMOWasteManagementPlanPage() {
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-slate-900 overflow-hidden">
      <Navigation />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_65%)]" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl" />
          <div className="hidden sm:block absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link href="/templates" className="poppins-medium text-slate-400 hover:text-emerald-700 transition-colors">
                  Templates
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="poppins-medium text-emerald-700">HMO Waste Management Plan</span>
              </div>

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs poppins-semibold text-amber-700 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Complete Document Pack — 3 File Formats
              </div>

              <h1 className="poppins-bold text-4xl sm:text-5xl lg:text-[3.25rem] text-slate-900 leading-[1.1] tracking-tight mb-6">
                HMO Waste
                <br />
                Management Plan
                <br />
                <span className="text-emerald-700">Template</span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                The full council-submission ready document package. 8 structured sections, an Excel bin calculator, 
                tenant briefing script, and three complaint response letters — everything an EA inspector expects to see.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  { icon: FileText, label: "Editable Word Document" },
                  { icon: FileSpreadsheet, label: "Excel Calculator" },
                  { icon: Shield, label: "March 2026 Compliant" },
                  { icon: Download, label: "Instant Email Delivery" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-emerald-100 rounded-full poppins-medium text-xs text-slate-700 shadow-sm"
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Price + CTA block */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/80 p-6 max-w-md">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="poppins-bold text-5xl text-slate-900">£97</span>
                  <span className="poppins-regular text-sm text-slate-400">one-time · own it forever</span>
                </div>
                <p className="poppins-regular text-sm text-slate-500 mb-6">
                  Sent to your inbox within minutes of purchase.
                </p>

                <a
                  href={MAILTO_LINK}
                  className="group flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl poppins-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/30 mb-3"
                >
                  <Mail className="w-4.5 h-4.5 flex-shrink-0" />
                  I Want This Template
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <p className="poppins-regular text-xs text-slate-400 text-center">
                  Opens your email app with subject & message pre-filled
                </p>
              </div>
            </div>

            {/* Right — document mockup */}
            <div className="flex flex-col items-center gap-8">
              <DocumentMockup />

              {/* File formats row */}
              <div className="flex items-center gap-3">
                {[
                  { label: "PDF", desc: "Print-ready" },
                  { label: "WORD", desc: "Fully editable" },
                  { label: "EXCEL", desc: "Calculator" },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex flex-col items-center gap-1 px-5 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <span className="poppins-bold text-xs text-emerald-700 tracking-widest">{label}</span>
                    <span className="poppins-regular text-[10px] text-slate-400">{desc}</span>
                  </div>
                ))}
              </div>

              {/* Trust micro-badges */}
              <div className="flex flex-col gap-2 w-full max-w-xs">
                {[
                  { icon: Shield, text: "Covers Simpler Recycling Regs 2026" },
                  { icon: Award, text: "Written by compliance professionals" },
                  { icon: Lock, text: "Secure email delivery — no account needed" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm">
                    <Icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="poppins-regular text-slate-600">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's inside — 8 sections ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              Full Document Structure
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              8 Sections. Every Field
              <span className="text-emerald-700"> Pre-Structured.</span>
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Every section mirrors what council officers and EA inspectors expect to find — formatted, signed-off, and ready to hand over.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {documentSections.map((section) => {
              const Icon = section.icon
              const c = colorMap[section.color]
              return (
                <div
                  key={section.number}
                  className={`group rounded-2xl border ${c.border} bg-white p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
                >
                  {/* Subtle background tint on hover */}
                  <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-2xl`} />

                  <div className="relative z-10">
                    {/* Section number + icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                      </div>
                      <span className={`poppins-bold text-xs ${c.num} opacity-60`}>
                        {section.number}
                      </span>
                    </div>

                    <h3 className="poppins-bold text-sm text-slate-900 leading-tight mb-0.5">
                      {section.title}
                    </h3>
                    <p className="poppins-regular text-xs text-slate-400 mb-4">
                      {section.subtitle}
                    </p>

                    {/* Preview fields */}
                    <ul className="space-y-1.5">
                      {section.preview.map(({ label, value }) => (
                        <li key={label} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0 mt-1.5`} />
                          <div className="min-w-0">
                            <span className="poppins-semibold text-[11px] text-slate-700">{label}</span>
                            <span className="poppins-regular text-[11px] text-slate-400"> — {value}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bonus materials ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs poppins-semibold text-amber-700 mb-4">
              <Star className="w-3.5 h-3.5 text-amber-500" />
              Included In The Pack
            </div>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              Three Bonus Documents
              <span className="text-emerald-700"> Included</span>
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Beyond the management plan — the tools you need to actually run a compliant HMO from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {bonusItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>

                    <span className={`inline-block poppins-semibold text-[11px] px-2.5 py-1 rounded-full border ${item.tagColor} mb-4`}>
                      {item.tag}
                    </span>

                    <h3 className="poppins-bold text-base text-slate-900 mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Document preview strip ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">
                Why It Passes Inspection
              </p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6 leading-snug">
                Formatted The Way
                <br />
                <span className="text-emerald-700">Councils Expect It.</span>
              </h2>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
                Most landlords produce a single-page Word document that fails on arrival. This template 
                mirrors the structure that local authority housing officers and Environment Agency inspectors 
                are trained to review.
              </p>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                Every field, every table, every signature block — positioned where they look for it. You 
                edit your details in. You hand it over. That's it.
              </p>

              <div className="space-y-3">
                {[
                  "References EPA 1990 s.34 Duty of Care legislation",
                  "Aligned to Simpler Recycling Regulations March 2026",
                  "Includes EA waste carrier licence verification field",
                  "Countersignature block accepted by most councils",
                  "Covers all four mandatory waste streams",
                  "6-month monitoring log satisfies annual licence review",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual breakdown panel */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15)_0%,transparent_60%)]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span className="poppins-semibold text-xs text-emerald-400 uppercase tracking-widest">
                    Pack Contents
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { file: "HMO_Waste_Management_Plan.docx", type: "WORD", size: "~18 pages", color: "text-blue-400" },
                    { file: "Bin_Capacity_Calculator.xlsx", type: "EXCEL", size: "Auto-formula", color: "text-emerald-400" },
                    { file: "Tenant_Briefing_Script.docx", type: "WORD", size: "~4 pages", color: "text-blue-400" },
                    { file: "Complaint_Response_Templates.docx", type: "WORD", size: "3 templates", color: "text-blue-400" },
                    { file: "All_Documents_Combined.pdf", type: "PDF", size: "Print-ready", color: "text-rose-400" },
                  ].map(({ file, type, size, color }) => (
                    <div
                      key={file}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/8 transition-colors"
                    >
                      <div className={`poppins-bold text-[10px] ${color} w-12 flex-shrink-0`}>{type}</div>
                      <div className="flex-1 min-w-0">
                        <p className="poppins-medium text-xs text-white/80 truncate">{file}</p>
                        <p className="poppins-regular text-[10px] text-white/40">{size}</p>
                      </div>
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="poppins-regular text-xs text-white/40">Total Value</span>
                    <span className="poppins-bold text-sm text-white line-through opacity-40">£240</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="poppins-semibold text-sm text-white/80">Your Price</span>
                    <span className="poppins-bold text-2xl text-emerald-400">£97</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Waste streams visual table ──────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              Section Preview
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              The Waste Streams
              <span className="text-emerald-700"> Table</span>
            </h2>
            <p className="poppins-regular text-slate-500 mt-4 max-w-md mx-auto text-sm">
              A snapshot of the pre-formatted 4-bin compliance matrix included in the template.
            </p>
          </div>

          {/* Stylised table preview */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
            {/* Table header */}
            <div className="bg-slate-900 px-6 py-4 grid grid-cols-5 gap-4">
              {["Bin Type", "Bin Colour", "Capacity", "Collection", "Frequency"].map((h) => (
                <span key={h} className="poppins-semibold text-[11px] text-white/60 uppercase tracking-widest">
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {[
              {
                type: "Food Waste",
                colour: "bg-green-500",
                colourLabel: "Green",
                capacity: "23L caddy",
                collection: "Weekly",
                frequency: "52×/yr",
                rowBg: "bg-green-50/40",
              },
              {
                type: "Dry Recycling",
                colour: "bg-blue-500",
                colourLabel: "Blue",
                capacity: "240L wheeled bin",
                collection: "Fortnightly",
                frequency: "26×/yr",
                rowBg: "bg-blue-50/30",
              },
              {
                type: "Paper & Card",
                colour: "bg-amber-500",
                colourLabel: "Brown/Grey",
                capacity: "240L wheeled bin",
                collection: "Fortnightly",
                frequency: "26×/yr",
                rowBg: "bg-amber-50/30",
              },
              {
                type: "Residual Waste",
                colour: "bg-slate-700",
                colourLabel: "Black",
                capacity: "240L wheeled bin",
                collection: "Fortnightly",
                frequency: "26×/yr",
                rowBg: "bg-slate-50/40",
              },
            ].map(({ type, colour, colourLabel, capacity, collection, frequency, rowBg }, idx) => (
              <div
                key={type}
                className={`px-6 py-4 grid grid-cols-5 gap-4 items-center ${rowBg} ${idx < 3 ? "border-b border-slate-100" : ""}`}
              >
                <span className="poppins-semibold text-sm text-slate-800">{type}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${colour}`} />
                  <span className="poppins-regular text-sm text-slate-600">{colourLabel}</span>
                </div>
                <span className="poppins-regular text-sm text-slate-600">{capacity}</span>
                <span className="poppins-regular text-sm text-slate-600">{collection}</span>
                <span className="poppins-medium text-sm text-emerald-700">{frequency}</span>
              </div>
            ))}

            {/* Footer note */}
            <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-100 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="poppins-regular text-xs text-emerald-700">
                All fields are editable — capacity, frequency, and collection days are set per property in the Word document.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who this is for ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  stat: "£5,000",
                  label: "Maximum fine for a non-compliant HMO waste arrangement",
                  bg: "bg-red-50 border-red-100",
                  statColor: "text-red-700",
                  icon: AlertTriangle,
                  iconColor: "text-red-400",
                },
                {
                  stat: "31 Mar",
                  label: "Simpler Recycling enforcement date — already in effect",
                  bg: "bg-amber-50 border-amber-100",
                  statColor: "text-amber-700",
                  icon: Calendar,
                  iconColor: "text-amber-400",
                },
                {
                  stat: "8",
                  label: "Structured sections — covering every inspector checklist item",
                  bg: "bg-emerald-50 border-emerald-100",
                  statColor: "text-emerald-700",
                  icon: Grid,
                  iconColor: "text-emerald-400",
                },
                {
                  stat: "30 min",
                  label: "Average time to complete and submit the plan after download",
                  bg: "bg-blue-50 border-blue-100",
                  statColor: "text-blue-700",
                  icon: Zap,
                  iconColor: "text-blue-400",
                },
              ].map(({ stat, label, bg, statColor, icon: Icon, iconColor }) => (
                <div key={stat} className={`rounded-2xl border p-5 ${bg}`}>
                  <Icon className={`w-5 h-5 mb-3 ${iconColor}`} />
                  <p className={`poppins-bold text-3xl mb-1 ${statColor}`}>{stat}</p>
                  <p className="poppins-regular text-xs text-slate-500 leading-snug">{label}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">
                Made For
              </p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6 leading-snug">
                HMO Landlords Who
                <br />
                <span className="text-emerald-700">Can't Afford A Gap.</span>
              </h2>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
                Environment Agency inspections and HMO licence renewals increasingly require written evidence 
                of your waste management arrangements. A conversation with your contractor doesn't cut it — you 
                need a document.
              </p>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                This template gives you everything they look for, structured and signed off, with no legal 
                drafting knowledge required.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={MAILTO_LINK}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Get The Template — £97
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200"
                >
                  Book A Professional Audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-emerald-50/60 via-white to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              How It Works
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Three Steps to
              <span className="text-emerald-700"> Compliance Ready</span>
            </h2>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.666%+1.25rem)] right-[calc(16.666%+1.25rem)] h-px bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
              {[
                {
                  step: "01",
                  icon: Mail,
                  title: "Request via Email",
                  desc: "Click the button — your email opens with the subject and message pre-filled. Send it in 10 seconds.",
                },
                {
                  step: "02",
                  icon: Download,
                  title: "Receive Your Files",
                  desc: "We send your PDF, Word, and Excel files by return email, typically within minutes.",
                },
                {
                  step: "03",
                  icon: FileCheck,
                  title: "Complete & Submit",
                  desc: "Fill in your property details, print the plan, get it signed, and you're council-submission ready.",
                },
              ].map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-700 flex items-center justify-center mb-5 shadow-lg shadow-emerald-700/25">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="poppins-bold text-xs text-emerald-600 uppercase tracking-widest mb-2">
                    Step {step}
                  </span>
                  <h3 className="poppins-bold text-base text-slate-900 mb-2">{title}</h3>
                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ───────────────────────────────────────────────────────── */}
      <section className="py-10 bg-emerald-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: Lock, label: "Secure Email Delivery" },
              { icon: Star, label: "Written By Compliance Professionals" },
              { icon: BookOpen, label: "No Subscription — Own It Forever" },
              { icon: Mail, label: "hello@millstonecompliance.com" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-white/90">
                <Icon className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                <span className="poppins-medium text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/20 to-green-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-green-200/20 to-emerald-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-7">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Delivered Within Minutes
          </div>

          <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 tracking-tight mb-5 leading-[1.1]">
            One Document.
            <br />
            <span className="text-emerald-700">Full Protection.</span>
          </h2>

          <p className="poppins-regular text-slate-600 text-base sm:text-lg mb-4 leading-relaxed">
            £97. No subscription. No login. No legal knowledge required.
            <br />
            Just an editable Word document that passes inspection.
          </p>

          <div className="flex items-baseline justify-center gap-2 mb-10">
            <span className="poppins-bold text-5xl text-slate-900">£97</span>
            <span className="poppins-regular text-slate-400 text-sm">one-time purchase</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href={MAILTO_LINK}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl poppins-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:shadow-emerald-700/35 w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              I Want This Template
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200 w-full sm:w-auto"
            >
              View All Templates
            </Link>
          </div>

          <p className="poppins-regular text-xs text-slate-400">
            Questions? Email us directly at{" "}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-2"
            >
              {emailCopied ? "Copied!" : EMAIL_ADDRESS}
            </button>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
