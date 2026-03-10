"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  BookOpen,
  ChevronRight,
  Recycle,
  Trash2,
  FileCheck,
  Building2,
  Calendar,
  Mail,
  Users,
  BarChart3,
  ClipboardList,
  PenLine,
  FolderOpen,
  HeartPulse,
  Home,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── TOC ──────────────────────────────────────────────────────────────────────

const sections = [
  { id: "overview",          label: "Overview" },
  { id: "controlled-waste",  label: "Controlled Waste Docs" },
  { id: "clinical-waste",    label: "Clinical & Hazardous Waste" },
  { id: "care-home",         label: "Care Home Records" },
  { id: "hmo-docs",          label: "HMO & Property Docs" },
  { id: "simpler-recycling", label: "Simpler Recycling Records" },
  { id: "penalties",         label: "Penalties" },
  { id: "how-to-build",      label: "Building Your File" },
  { id: "get-help",          label: "Get Help" },
]

function TableOfContents({ active }: { active: string }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <nav className="sticky top-28 hidden lg:block">
      <p className="poppins-semibold text-[10px] text-slate-400 uppercase tracking-widest mb-4">On This Page</p>
      <ul className="space-y-1">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-2.5 w-full text-left py-1.5 px-3 rounded-lg transition-all duration-150 text-sm ${
                active === id
                  ? "bg-emerald-50 text-emerald-700 poppins-semibold"
                  : "text-slate-500 hover:text-slate-900 poppins-regular hover:bg-slate-50"
              }`}
            >
              {active === id && <div className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />}
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 pt-6 border-t border-slate-100">
        <a
          href="mailto:hello@millstonecompliance.com?subject=Waste%20Documentation%20Support"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl poppins-semibold text-xs transition-all duration-200 active:scale-95"
        >
          <Mail className="w-3.5 h-3.5" />
          Get Your Docs Sorted
        </a>
      </div>
    </nav>
  )
}

// ─── Document row ─────────────────────────────────────────────────────────────

function DocRow({ doc, regulation, penalty, notes }: {
  doc: string; regulation: string; penalty: string; notes: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3 py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="poppins-semibold text-sm text-slate-900">{doc}</p>
        <p className="poppins-regular text-xs text-slate-400 mt-0.5">{notes}</p>
      </div>
      <div>
        <span className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Legislation</span>
        <span className="poppins-medium text-xs text-slate-700">{regulation}</span>
      </div>
      <div>
        <span className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest block mb-1">If Missing</span>
        <span className="poppins-semibold text-xs text-red-600">{penalty}</span>
      </div>
    </div>
  )
}

// ─── Callout ──────────────────────────────────────────────────────────────────

function Callout({ type, children }: { type: "warning" | "info" | "tip"; children: React.ReactNode }) {
  const styles = {
    warning: { bg: "bg-amber-50 border-amber-200", icon: <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" /> },
    info:    { bg: "bg-blue-50 border-blue-200",   icon: <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />          },
    tip:     { bg: "bg-emerald-50 border-emerald-200", icon: <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" /> },
  }
  const s = styles[type]
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${s.bg} my-6`}>
      {s.icon}
      <div className="poppins-regular text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WasteDocumentationPage() {
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const handleScroll = () => {
      for (const { id } of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <Link href="/resources" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-10 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="poppins-medium text-sm">Back to Resources</span>
          </Link>

          <div className="grid lg:grid-cols-[1fr_220px] gap-16 items-start">
            {/* ── Main article ─────────────────────────────────────────── */}
            <article className="min-w-0">

              {/* ── Article header ────────────────────────────────────── */}
              <div className="mb-14">
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="poppins-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Guide</span>
                  <span className="poppins-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Essential Reading</span>
                </div>

                <h1 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-[1.1] tracking-tight mb-5">
                  Waste Documentation:
                  <br />
                  <span className="text-emerald-700">The Complete UK Guide 2026</span>
                </h1>

                <p className="poppins-regular text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
                  Every document UK care homes, children&apos;s homes, landlords and businesses are required to hold under waste law — what it is, why you need it, and what happens if it&apos;s missing.
                </p>

                <div className="flex flex-wrap items-center gap-5 py-5 border-y border-slate-100">
                  {[
                    { icon: Clock,    label: "12 min read" },
                    { icon: Shield,   label: "EPA 1990 · HTM 07-01 · CQC · Ofsted · EA" },
                    { icon: Calendar, label: "Updated March 2026" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-slate-500">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="poppins-medium text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Overview ──────────────────────────────────────────── */}
              <section id="overview" className="mb-16 scroll-mt-28">
                <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-5">
                  Why documentation is your legal protection
                </h2>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-4">
                  UK waste regulations don&apos;t just tell you what to do — they tell you what to <em>prove</em>.
                  In enforcement proceedings, the question is never whether you intended to comply. It&apos;s whether
                  you have dated, signed, verifiable records demonstrating that you did.
                </p>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-4">
                  The Environmental Protection Act 1990, the Hazardous Waste Regulations 2005, HTM 07-01, and
                  the Simpler Recycling regulations all require specific documentary evidence. The Environment Agency,
                  CQC, Ofsted, and local authorities can request records at any time. Inability to produce them
                  is typically treated as a breach — separate from any underlying operational issue.
                </p>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  This guide maps every document type relevant to waste compliance for care homes, children&apos;s homes,
                  landlords and businesses — what the law requires, how long to keep it, and the penalty for a gap.
                </p>

                <Callout type="info">
                  <strong>Who this guide is for:</strong> Care homes, children&apos;s homes, estate agents, HMO landlords, and any UK business
                  producing controlled or clinical waste. If you use a waste contractor, you still hold legal responsibility — the Duty of Care cannot be delegated.
                </Callout>

                {/* Quick-reference links */}
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Trash2,     label: "Controlled Waste",   count: "6 document types", color: "emerald", href: "#controlled-waste"  },
                    { icon: HeartPulse, label: "Clinical Waste",     count: "5 document types", color: "red",     href: "#clinical-waste"    },
                    { icon: Building2,  label: "Care Home & HMO",    count: "7 document types", color: "amber",   href: "#care-home"         },
                  ].map(({ icon: Icon, label, count, color, href }) => {
                    const colors: Record<string, string> = {
                      emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
                      red:     "bg-red-50 border-red-200 text-red-700",
                      amber:   "bg-amber-50 border-amber-200 text-amber-700",
                    }
                    return (
                      <a key={label} href={href} className={`flex items-center gap-3 p-4 rounded-xl border ${colors[color]} hover:opacity-80 transition-opacity`}>
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="poppins-semibold text-sm">{label}</p>
                          <p className="poppins-regular text-xs opacity-70">{count}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                      </a>
                    )
                  })}
                </div>
              </section>

              {/* ── Controlled Waste ──────────────────────────────────── */}
              <section id="controlled-waste" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    Controlled waste documents
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  Section 34 of the Environmental Protection Act 1990 places a legal Duty of Care on anyone who produces,
                  carries, keeps, treats, or disposes of controlled waste. This duty applies from the moment waste is created
                  until it reaches an authorised facility — and it cannot be transferred to a contractor.
                </p>

                <div className="rounded-2xl border border-slate-100 overflow-hidden mb-6">
                  <div className="bg-slate-900 px-5 py-3 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3">
                    {["Document", "Legislation", "Penalty if missing"].map((h) => (
                      <span key={h} className="poppins-semibold text-[10px] text-white/60 uppercase tracking-widest">{h}</span>
                    ))}
                  </div>
                  <div className="px-5 divide-y divide-slate-50">
                    {[
                      { doc: "Waste Transfer Note (WTN)", regulation: "EPA 1990 s.34", penalty: "Up to £300 fixed penalty per transfer", notes: "Signed by producer and carrier before waste moves. Retain 2 years." },
                      { doc: "Waste carrier licence record", regulation: "EPA 1990 / Controlled Waste Regs", penalty: "£300 fixed penalty + potential prosecution", notes: "Verify EA carrier registration before each contractor use." },
                      { doc: "Description of waste (EWC code)", regulation: "EPA 1990 s.34", penalty: "Up to £5,000 on conviction", notes: "Accurate waste type and estimated quantity — must match the WTN." },
                      { doc: "Season Ticket (recurring collections)", regulation: "EPA 1990 s.34", penalty: "Each transfer treated as undocumented", notes: "Covers same waste type with same carrier for up to 12 months." },
                      { doc: "Carrier Upper Tier registration evidence", regulation: "Controlled Waste (Registration of Carriers) Regs 1991", penalty: "Use of unregistered carrier = criminal offence for producer", notes: "Upper Tier required for most commercial waste. Check EA public register." },
                      { doc: "Waste management policy / site procedure", regulation: "Best practice / CQC / Ofsted expectation", penalty: "Adverse inspection finding", notes: "Written document demonstrating management arrangements." },
                    ].map((row) => <DocRow key={row.doc} {...row} />)}
                  </div>
                </div>

                <Callout type="warning">
                  <strong>Critical:</strong> Waste Transfer Notes must be completed <em>before</em> waste is transferred — not retrospectively.
                  A WTN signed after the event provides no defence. Regulators may check print dates, handwriting, and metadata if documents are disputed.
                </Callout>

                <h3 className="poppins-bold text-lg text-slate-900 mt-8 mb-4">What must a Waste Transfer Note contain?</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Description of the waste by type (EWC code and plain language)",
                    "Estimated quantity in kilograms or litres",
                    "Full name and address of the waste producer",
                    "Full name, address and EA licence number of the carrier",
                    "Date and place of transfer",
                    "Signatures of both the producer and the carrier",
                    "Whether it is a single transfer or a Season Ticket (up to 12 months)",
                    "The intended destination facility and its permit number",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Callout type="tip">
                  <strong>Season Tickets:</strong> If the same type of waste goes to the same carrier on a regular basis, a Season Ticket WTN
                  (valid up to 12 months) can replace individual notes for each collection. You must still retain the Season Ticket for 2 years after it expires.
                </Callout>
              </section>

              {/* ── Clinical & Hazardous Waste ────────────────────────── */}
              <section id="clinical-waste" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
                    <HeartPulse className="w-5 h-5 text-red-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    Clinical and hazardous waste documents
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  Clinical waste produced by care homes, children&apos;s homes, GP surgeries and similar settings is classified
                  as hazardous under the Hazardous Waste Regulations 2005. It requires a completely separate documentation trail
                  from general controlled waste — using Hazardous Waste Consignment Notes rather than standard WTNs.
                </p>

                <Callout type="warning">
                  <strong>Common mistake:</strong> Using a standard Waste Transfer Note for clinical or hazardous waste. This is a legal error —
                  clinical waste movements require a Hazardous Waste Consignment Note and a carrier holding Upper Tier EA registration with a hazardous waste permit.
                </Callout>

                <div className="rounded-2xl border border-slate-100 overflow-hidden mb-6">
                  <div className="bg-red-800 px-5 py-3 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3">
                    {["Document", "Legislation", "If Missing"].map((h) => (
                      <span key={h} className="poppins-semibold text-[10px] text-white/70 uppercase tracking-widest">{h}</span>
                    ))}
                  </div>
                  <div className="px-5 divide-y divide-slate-50">
                    {[
                      { doc: "Hazardous Waste Consignment Note", regulation: "Hazardous Waste Regs 2005", penalty: "Criminal prosecution — unlimited fine on conviction", notes: "Required for every clinical/hazardous waste transfer. Retain 3 years." },
                      { doc: "Clinical waste register / log", regulation: "HTM 07-01 / Hazardous Waste Regs 2005", penalty: "CQC / Ofsted finding — enforcement action", notes: "Records of waste type, volume, segregation, collection date and destination." },
                      { doc: "Carrier hazardous waste permit", regulation: "Environmental Permitting Regs 2016", penalty: "Use of unlicensed carrier = criminal offence", notes: "Your carrier must hold both Upper Tier registration and a hazardous waste permit." },
                      { doc: "Sharps management record", regulation: "HTM 07-01 / Health & Safety at Work Act 1974", penalty: "CQC enforcement notice — potential prosecution", notes: "Sharps container batch numbers, fill dates, collection dates. Retain 3 years." },
                      { doc: "Medicines waste disposal records", regulation: "Misuse of Drugs Regs 2001 / HTM 07-01", penalty: "MHRA investigation — criminal liability", notes: "Controlled drugs require a destruction register signed by an authorised witness." },
                    ].map((row) => <DocRow key={row.doc} {...row} />)}
                  </div>
                </div>

                <h3 className="poppins-bold text-lg text-slate-900 mt-8 mb-4">HTM 07-01 colour-code segregation records</h3>
                <p className="poppins-regular text-sm text-slate-600 leading-relaxed mb-4">
                  HTM 07-01 requires that clinical waste is segregated at the point of generation using the colour-coded system
                  below. Staff training records must demonstrate that all waste-handling staff understand this system and have been
                  trained within the last 12 months.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { color: "bg-yellow-400", label: "Yellow lid / yellow bag", desc: "Infectious waste for incineration (soiled dressings, PPE in clinical settings)" },
                    { color: "bg-orange-400", label: "Orange bag", desc: "Potentially infectious waste — may be treated by alternative methods" },
                    { color: "bg-yellow-300 border border-black/20", label: "Tiger-stripe bag (yellow/black)", desc: "Offensive/hygiene waste — not infectious but not suitable for landfill without treatment" },
                    { color: "bg-purple-500", label: "Purple lid", desc: "Cytotoxic and cytostatic medicines waste — specialist disposal only" },
                  ].map(({ color, label, desc }) => (
                    <div key={label} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-0.5 ${color}`} />
                      <div>
                        <p className="poppins-semibold text-sm text-slate-900 mb-1">{label}</p>
                        <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Care Home Documentation ───────────────────────────── */}
              <section id="care-home" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    Care home and children&apos;s home documentation
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  CQC and Ofsted both inspect waste management as part of their safe care and environment standards.
                  Unlike the Environment Agency (which focuses on legal compliance), CQC and Ofsted assess whether your
                  waste management <em>demonstrates safe working practices</em>. Documentation shortfalls can result in
                  requirement notices, inadequate ratings, and — in serious cases — enforcement action.
                </p>

                <div className="rounded-2xl border border-slate-100 overflow-hidden mb-6">
                  <div className="bg-emerald-800 px-5 py-3">
                    <span className="poppins-semibold text-[11px] text-white/80 uppercase tracking-widest">7 Key Documents for CQC / Ofsted Waste Compliance</span>
                  </div>
                  <div className="px-5 divide-y divide-slate-50">
                    {[
                      { doc: "Waste Management Policy", regulation: "CQC Regulation 12 / Ofsted SCCIF", penalty: "Requirement notice — potential enforcement", notes: "Written policy covering all waste streams, segregation, storage and contractor arrangements." },
                      { doc: "Annual staff training records", regulation: "HTM 07-01 / CQC Regulation 18", penalty: "Adverse inspection finding", notes: "Signed records showing every staff member trained on waste segregation within 12 months." },
                      { doc: "Clinical waste register", regulation: "Hazardous Waste Regs 2005 / HTM 07-01", penalty: "Criminal prosecution + CQC enforcement", notes: "Log of waste type, volume, collection date and consignment note number." },
                      { doc: "Waste Transfer / Consignment Notes", regulation: "EPA 1990 s.34 / Hazardous Waste Regs 2005", penalty: "£300 per transfer (WTN) or prosecution (clinical)", notes: "All waste movements must be documented. Clinical waste requires a Consignment Note." },
                      { doc: "Carrier verification records", regulation: "EPA 1990 s.34", penalty: "Up to £300 + potential prosecution", notes: "Record of checking your carrier's EA registration number before each contract." },
                      { doc: "Medicines waste / CD destruction register", regulation: "Misuse of Drugs Regs 2001", penalty: "MHRA investigation — criminal liability", notes: "Controlled drug destruction must be witnessed and recorded." },
                      { doc: "Waste contractor contracts and permits", regulation: "Best practice / CQC expectation", penalty: "CQC finding — provider may fail key question", notes: "Copies of contractor's EA permit, insurance, and signed service agreement." },
                    ].map((row) => <DocRow key={row.doc} {...row} />)}
                  </div>
                </div>

                <Callout type="info">
                  <strong>CQC inspection focus:</strong> Inspectors routinely ask to see Waste Transfer Notes, staff training records, and evidence
                  that waste is correctly segregated at source. They also check whether bins are locked, correctly labelled, and stored away from
                  resident areas. A gap in any of these areas commonly results in a &ldquo;Requires Improvement&rdquo; rating under Safe.
                </Callout>
              </section>

              {/* ── HMO & Property ────────────────────────────────────── */}
              <section id="hmo-docs" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Home className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    HMO and property landlord documentation
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  HMO landlords face waste documentation requirements from two directions: HMO licensing conditions
                  (set by the local authority) and waste regulations (including the Duty of Care and Simpler Recycling).
                  Both can result in fines, licence revocation, or prosecution independently of each other.
                </p>

                <div className="rounded-2xl border border-slate-100 overflow-hidden mb-6">
                  <div className="bg-amber-600 px-5 py-3">
                    <span className="poppins-semibold text-[11px] text-white/80 uppercase tracking-widest">Key Documents for HMO Waste Compliance</span>
                  </div>
                  <div className="px-5 divide-y divide-slate-50">
                    {[
                      { doc: "HMO Waste Management Plan", regulation: "Common HMO licence condition", penalty: "Licence refusal or revocation", notes: "Covers all 4 waste streams, bin provision, and storage. Format varies by council." },
                      { doc: "Tenant waste instruction record", regulation: "Typical HMO licence condition", penalty: "Licence breach — fines up to £5,000", notes: "Signed acknowledgement from each tenant of waste instructions received." },
                      { doc: "Waste contractor details and licence", regulation: "EPA 1990 s.34", penalty: "£300+ per collection — potential prosecution", notes: "Current EA registration number for all waste contractors used." },
                      { doc: "Waste Transfer Notes", regulation: "EPA 1990 s.34", penalty: "£300 fixed penalty per transfer", notes: "From every waste collection — retain 2 years." },
                      { doc: "Bin location and capacity plan", regulation: "Often required by councils", penalty: "Planning or licence risk", notes: "Diagram showing bin positions, access routes, and capacity per waste stream." },
                      { doc: "Monthly inspection log", regulation: "Best practice / may be required in licence", penalty: "Management and licence risk", notes: "Dated records showing condition of bins, contamination, and corrective action." },
                    ].map((row) => <DocRow key={row.doc} {...row} />)}
                  </div>
                </div>

                <Callout type="tip">
                  <strong>Related guide:</strong>{" "}
                  <Link href="/resources/hmo-recycling-fines" className="text-emerald-600 hover:underline font-semibold">
                    HMO Landlords Face £5,000 Fines Under New Recycling Rules
                  </Link>{" "}
                  — covering Simpler Recycling obligations, tenant liability, and the three tiers of enforcement.
                </Callout>
              </section>

              {/* ── Simpler Recycling Records ─────────────────────────── */}
              <section id="simpler-recycling" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center">
                    <Recycle className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    Simpler Recycling records (from 2026)
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  From 31 March 2026, Simpler Recycling regulations extend to all businesses and residential settings,
                  requiring separation of four mandatory waste streams. While the regulations don&apos;t specify a standalone
                  &ldquo;Simpler Recycling record&rdquo;, enforcement relies on documentary evidence of your arrangements —
                  and the absence of records is treated as evidence of non-compliance.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      stream: "General waste",
                      color:  "bg-gray-50 border-gray-200",
                      hd:     "text-gray-800",
                      docs: ["Written waste arrangements document", "Contractor collection schedule", "Bin provision confirmation"],
                    },
                    {
                      stream: "Food waste",
                      color:  "bg-orange-50 border-orange-200",
                      hd:     "text-orange-800",
                      docs: ["Food waste collection contract", "Caddy provision record", "Collection frequency confirmation"],
                    },
                    {
                      stream: "Paper and card",
                      color:  "bg-blue-50 border-blue-200",
                      hd:     "text-blue-800",
                      docs: ["Recycling collection contract", "Bin labelling evidence", "Tenant/staff instructions"],
                    },
                    {
                      stream: "Dry recyclables (plastic, metal, glass)",
                      color:  "bg-green-50 border-green-200",
                      hd:     "text-green-800",
                      docs: ["Mixed recycling contractor details", "Contamination monitoring log", "Collection schedule"],
                    },
                  ].map(({ stream, color, hd, docs }) => (
                    <div key={stream} className={`rounded-xl border p-5 ${color}`}>
                      <p className={`poppins-semibold text-sm mb-3 ${hd}`}>{stream}</p>
                      <ul className="space-y-1.5">
                        {docs.map(d => (
                          <li key={d} className="flex items-start gap-2">
                            <FileCheck className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                            <span className="poppins-regular text-xs text-slate-700">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <Callout type="info">
                  <strong>Enforcement approach:</strong> Local authorities enforce Simpler Recycling primarily through inspection.
                  Inspectors check that physical bin provision matches the four streams, that bins are clearly labelled, and that
                  arrangements are in place. A written waste arrangements document is your strongest evidence of intentional compliance.
                </Callout>
              </section>

              {/* ── Penalties ─────────────────────────────────────────── */}
              <section id="penalties" className="mb-16 scroll-mt-28">
                <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-6">
                  What missing documentation costs you
                </h2>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  Documentation failures are treated as independent breaches — separate from any underlying operational
                  non-compliance. You can be fined for failing to <em>hold</em> a record even if the underlying activity was
                  fully compliant. Worse, multiple missing documents from the same incident attract separate penalties each.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { reg: "Missing Waste Transfer Note", penalty: "Up to ~£300", type: "Fixed penalty notice", authority: "Environment Agency", color: "red" },
                    { reg: "Duty of Care breach (general)", penalty: "Up to £5,000", type: "Magistrates&apos; Court conviction", authority: "Environment Agency", color: "red" },
                    { reg: "Missing Consignment Note (clinical)", penalty: "Criminal prosecution", type: "Unlimited fine on conviction", authority: "Environment Agency", color: "red" },
                    { reg: "Unlicensed waste carrier used", penalty: "£300–£5,000+", type: "Fixed penalty + potential prosecution", authority: "Environment Agency", color: "red" },
                    { reg: "HMO waste non-compliance", penalty: "Up to ~£5,000", type: "Civil penalty per council", authority: "Local authority", color: "amber" },
                    { reg: "CQC clinical waste finding", penalty: "Requirement notice", type: "Adverse inspection rating", authority: "CQC / Ofsted", color: "amber" },
                  ].map(({ reg, penalty, type, authority, color }) => {
                    const col     = color === "red" ? "border-red-200 bg-red-50"     : "border-amber-200 bg-amber-50"
                    const textCol = color === "red" ? "text-red-700"                 : "text-amber-700"
                    return (
                      <div key={reg} className={`rounded-xl border p-4 ${col}`}>
                        <p className={`poppins-bold text-xl ${textCol} mb-1`}>{penalty}</p>
                        <p className="poppins-semibold text-sm text-slate-800">{reg}</p>
                        <p className="poppins-regular text-xs text-slate-500 mt-1">{type} · {authority}</p>
                      </div>
                    )
                  })}
                </div>

                <Callout type="warning">
                  <strong>Compounding penalties:</strong> A single waste collection with an unverified carrier, no WTN, and an inaccurate
                  waste description can attract three separate fixed penalties — easily exceeding £900 before any court proceedings.
                  For clinical waste movements, the same scenario can trigger criminal prosecution.
                </Callout>
              </section>

              {/* ── How to build ──────────────────────────────────────── */}
              <section id="how-to-build" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    How to build your waste evidence file
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  The goal is not just to hold individual documents — it&apos;s to have them organised so that when
                  an inspector arrives, you can retrieve every relevant record in minutes. A coherent evidence file
                  also demonstrates genuine intent to comply, which regulators factor into how they exercise penalty discretion.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      step: "01", icon: ClipboardList,
                      title: "Map your obligations",
                      body:  "Identify which regulations apply. Duty of Care applies to all. Clinical waste rules apply if you produce any healthcare waste. HTM 07-01 applies to all care homes and children&apos;s homes. Simpler Recycling applies to all businesses from March 2026. HMO rules apply to HMO landlords.",
                    },
                    {
                      step: "02", icon: BarChart3,
                      title: "Audit what you currently hold",
                      body:  "Go through each document category and list what you have, what is missing, and what is outdated. A simple spreadsheet noting document name, date issued, and next review date is sufficient to start.",
                    },
                    {
                      step: "03", icon: PenLine,
                      title: "Produce or commission missing documents",
                      body:  "Templates for WTNs, clinical waste logs, staff training records and care home waste policies are available through our resource library. For complex or inspection-critical documents, professional production is strongly recommended.",
                    },
                    {
                      step: "04", icon: FolderOpen,
                      title: "Organise into a named evidence file",
                      body:  "Create a single folder — physical or digital — with tabbed sections: Controlled Waste, Clinical Waste, Staff Training, Contractor Records. Label each document with the regulation it satisfies. Include a cover sheet listing contents and review dates.",
                    },
                    {
                      step: "05", icon: Calendar,
                      title: "Set a review schedule",
                      body:  "WTNs and consignment notes are created per collection — build the habit. Staff training records need annual renewal. Waste policies should be reviewed whenever your contractor, premises, or waste type changes. Set recurring calendar reminders now.",
                    },
                  ].map(({ step, icon: Icon, title, body }) => (
                    <div key={step} className="flex items-start gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="poppins-bold text-[10px] text-slate-400 uppercase tracking-widest">Step {step}</span>
                          <p className="poppins-bold text-sm text-slate-900">{title}</p>
                        </div>
                        <p className="poppins-regular text-sm text-slate-600 leading-relaxed">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Get help ──────────────────────────────────────────── */}
              <section id="get-help" className="mb-10 scroll-mt-28">
                <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-5">
                  Get your documentation right
                </h2>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                  Building a compliant evidence file takes time most care homes and businesses don&apos;t have.
                  Millstone Compliance produces, organises, and reviews waste documentation — so you&apos;re
                  inspection-ready before an inspector calls.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/duty-of-care-analyser" className="group block bg-emerald-700 hover:bg-emerald-800 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5">
                    <p className="poppins-bold text-[10px] text-emerald-200 uppercase tracking-widest mb-2">Free Tool</p>
                    <h3 className="poppins-bold text-base text-white mb-2">Duty of Care Gap Analyser</h3>
                    <p className="poppins-regular text-sm text-emerald-200 leading-relaxed mb-4">10 questions. Instant compliance score. Find your documentation gaps now.</p>
                    <div className="flex items-center gap-1.5 text-white">
                      <span className="poppins-semibold text-xs">Start free check</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>

                  <Link href="/clinical-waste-analyser" className="group block bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-200 hover:-translate-y-0.5">
                    <p className="poppins-bold text-[10px] text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase tracking-widest inline-block mb-3">Free Tool</p>
                    <h3 className="poppins-bold text-base text-slate-900 mb-2">Clinical Waste Gap Analyser</h3>
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-4">HTM 07-01, CQC and Ofsted compliance score in under 3 minutes.</p>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="poppins-semibold text-xs">Start free check</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              </section>

              {/* ── Related articles ─────────────────────────────────── */}
              <div className="border-t border-slate-100 pt-8">
                <p className="poppins-semibold text-xs text-slate-400 uppercase tracking-widest mb-5">Related Guides</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Waste Duty of Care: The Complete Guide", href: "/resources/duty-of-care-waste" },
                    { title: "Care Home Waste Compliance Checklist", href: "/resources/care-home-waste-compliance-checklist" },
                    { title: "HMO Landlords & £5,000 Recycling Fines", href: "/resources/hmo-recycling-fines" },
                    { title: "Landlord Fly-Tipping Fines: How to Avoid £600 Penalties", href: "/resources/landlord-fly-tipping-fines" },
                  ].map(({ title, href }) => (
                    <Link key={title} href={href} className="group flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-200">
                      <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-emerald-600 transition-colors" />
                      <span className="poppins-medium text-sm text-slate-700 group-hover:text-emerald-700 transition-colors">{title}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

            </article>

            {/* ── Sidebar TOC ────────────────────────────────────────── */}
            <aside>
              <TableOfContents active={activeSection} />
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
