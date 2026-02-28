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
  Package,
  Recycle,
  Trash2,
  FileCheck,
  Building2,
  Calendar,
  Zap,
  Mail,
  Star,
  Lock,
  Users,
  BarChart3,
  ClipboardList,
  PenLine,
  FolderOpen,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Article TOC ──────────────────────────────────────────────────────────────

const sections = [
  { id: "overview",        label: "Overview" },
  { id: "waste-docs",      label: "Waste Documents" },
  { id: "packaging-docs",  label: "Packaging Documents" },
  { id: "hmo-docs",        label: "HMO Documentation" },
  { id: "penalties",       label: "Penalties for Gaps" },
  { id: "how-to-build",    label: "Building Your File" },
  { id: "get-help",        label: "Get Help" },
]

// ─── Scroll TOC ───────────────────────────────────────────────────────────────

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
          href="mailto:hello@millstonecompliance.com?subject=Documentation%20Support%20Enquiry"
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

function DocRow({ doc, regulation, required, penalty, notes }: {
  doc: string; regulation: string; required: string; penalty: string; notes: string
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3 py-4 border-b border-slate-100 last:border-0">
      <div>
        <p className="poppins-semibold text-sm text-slate-900">{doc}</p>
        <p className="poppins-regular text-xs text-slate-400 mt-0.5">{notes}</p>
      </div>
      <div>
        <span className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Regulation</span>
        <span className="poppins-medium text-xs text-slate-700">{regulation}</span>
      </div>
      <div>
        <span className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Missing = </span>
        <span className="poppins-semibold text-xs text-red-600">{penalty}</span>
      </div>
    </div>
  )
}

// ─── Callout ─────────────────────────────────────────────────────────────────

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

export default function WastePackagingDocumentationPage() {
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
            {/* ── Main article ────────────────────────────────────────────── */}
            <article className="min-w-0">

              {/* ── Article header ─────────────────────────────────────── */}
              <div className="mb-14">
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="poppins-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">Guide</span>
                  <span className="poppins-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">Essential Reading</span>
                </div>

                <h1 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-[1.1] tracking-tight mb-5">
                  Waste & Packaging Documentation:
                  <br />
                  <span className="text-emerald-700">The Complete UK Guide</span>
                </h1>

                <p className="poppins-regular text-xl text-slate-500 leading-relaxed mb-8 max-w-2xl">
                  Every core document UK businesses and landlords are required or expected to hold under waste and packaging rules — 
                  what it is, why you need it, and what happens when it's missing.
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-5 py-5 border-y border-slate-100">
                  {[
                    { icon: Clock,   label: "15 min read" },
                    { icon: Shield,  label: "Covers EPA 1990, PPT, EPR 2024" },
                    { icon: Calendar, label: "Updated Feb 2026" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-slate-500">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="poppins-medium text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section: Overview ──────────────────────────────────── */}
              <section id="overview" className="mb-16 scroll-mt-28">
                <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-5">
                  Why documentation is your legal protection
                </h2>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-4">
                  UK waste and packaging regulations don't just tell you what to do — they tell you what to <em>prove</em>. 
                  In enforcement proceedings, the question is never whether you intended to comply. It's whether you have 
                  dated, signed, verifiable records demonstrating that you did.
                </p>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-4">
                  Under the Environmental Protection Act 1990, the Plastic Packaging Tax regulations, and the Extended 
                  Producer Responsibility framework — all three expect businesses to hold specific categories of documentary 
                  evidence. The regulator (the Environment Agency, HMRC, or your local authority) can request records at any 
                  time. Inability to produce them is usually treated as a breach — separate from any underlying compliance issue.
                </p>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  This guide maps every document type, the legislation that requires it, and the penalty for failing to hold it.
                </p>

                <Callout type="info">
                  <strong>Scope:</strong> This guide covers three regulatory frameworks — Waste (including Duty of Care and current workplace recycling rules), 
                  Plastic Packaging Tax (PPT), and Extended Producer Responsibility (EPR). HMO landlords are separately covered in 
                  <Link href="#hmo-docs" className="text-emerald-600 hover:underline ml-1">Section 3</Link>.
                </Callout>

                {/* Quick-reference summary cards */}
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                  {[
                    { icon: Trash2,   label: "Waste", count: "6 document types", color: "emerald", href: "#waste-docs" },
                    { icon: Package,  label: "PPT",   count: "5 document types", color: "blue",    href: "#packaging-docs" },
                    { icon: Building2, label: "HMO",  count: "8 document types", color: "amber",   href: "#hmo-docs" },
                  ].map(({ icon: Icon, label, count, color, href }) => {
                    const colors: Record<string, string> = { emerald: "bg-emerald-50 border-emerald-200 text-emerald-600", blue: "bg-blue-50 border-blue-200 text-blue-600", amber: "bg-amber-50 border-amber-200 text-amber-600" }
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

              {/* ── Section: Waste documents ───────────────────────────── */}
              <section id="waste-docs" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    Waste compliance documents
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  The Environmental Protection Act 1990 (Section 34) places a legal Duty of Care on anyone 
                  who produces, carries, keeps, treats, or disposes of controlled waste. This duty cannot be 
                  delegated — you remain liable even if a contractor fails on your behalf.
                </p>

                {/* Document table */}
                <div className="rounded-2xl border border-slate-100 overflow-hidden mb-6">
                  <div className="bg-slate-900 px-5 py-3 grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-3">
                    {["Document", "Legislation", "Penalty if missing"].map((h) => (
                      <span key={h} className="poppins-semibold text-[10px] text-white/60 uppercase tracking-widest">{h}</span>
                    ))}
                  </div>
                  <div className="px-5 divide-y divide-slate-50">
                    {[
                      { doc: "Waste Transfer Note (WTN)", regulation: "EPA 1990 s.34", required: "Yes", penalty: "Typically up to £300 fixed penalty", notes: "Must be signed by producer and carrier. Retain 2 years." },
                      { doc: "Consignment Note", regulation: "Hazardous Waste Regs 2005", required: "Hazardous only", penalty: "May lead to criminal prosecution", notes: "Required for all hazardous waste transfers. Retain 3 years." },
                      { doc: "Waste carrier licence record", regulation: "EPA 1990 / Controlled Waste Regs", required: "Yes", penalty: "Fixed penalty or prosecution (often £300+)", notes: "Must verify contractor's EA carrier registration before use." },
                      { doc: "Workplace recycling evidence file", regulation: "Workplace recycling rules / Duty of Care", required: "From Mar 2026", penalty: "Higher risk of enforcement action", notes: "Records showing 4-stream separation and waste arrangements." },
                      { doc: "Duty of Care description of waste", regulation: "EPA 1990 s.34", required: "Yes", penalty: "Fines of up to several thousand pounds", notes: "Accurate description of waste type and estimated quantity." },
                      { doc: "Waste management policy", regulation: "Best practice / licence conditions", required: "Recommended", penalty: "Management or licence risk", notes: "Written policy demonstrating management arrangements." },
                    ].map((row) => (
                      <DocRow key={row.doc} {...row} />
                    ))}
                  </div>
                </div>

                <Callout type="warning">
                  <strong>Important:</strong> Waste Transfer Notes must be completed <em>before</em> waste is transferred — not retrospectively. 
                  A WTN signed after the event provides no defence. The regulator may check handwriting, print dates, and metadata if documents are disputed.
                </Callout>

                <h3 className="poppins-bold text-lg text-slate-900 mt-8 mb-4">What must a Waste Transfer Note contain?</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Description of the waste (by type and SIC code)",
                    "Estimated quantity (in kilograms)",
                    "Full name and address of the producer",
                    "Full name, address and EA licence number of the carrier",
                    "Date of transfer",
                    "Signatures of both parties",
                    "Whether it covers a single transfer or a season ticket (up to 12 months for the same waste type)",
                    "The place of transfer",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Section: Packaging documents (PPT + EPR) ──────────── */}
              <section id="packaging-docs" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    Packaging documentation
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  Two distinct regulatory frameworks apply to packaging: the Plastic Packaging Tax (administered by HMRC) 
                  and Extended Producer Responsibility (EPR, administered via the Environment Agency and approved schemes). 
                  Each has separate, mandatory record-keeping requirements.
                </p>

                {/* PPT subsection */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="poppins-bold text-sm text-blue-700 uppercase tracking-widest">Plastic Packaging Tax (PPT)</span>
                  </div>
                  <p className="poppins-regular text-sm text-slate-600 leading-relaxed mb-4">
                    Applies to manufacturers and importers of plastic packaging components that contain less than 30% recycled plastic. 
                    From April 2022, HMRC expects detailed records to be kept for <strong>6 years</strong>.
                  </p>
                  <div className="space-y-3">
                    {[
                      { doc: "Weight of plastic packaging manufactured / imported", note: "Per component. Monthly records required." },
                      { doc: "Recycled plastic content evidence", note: "Supplier declarations or independent verification." },
                      { doc: "Exemption and exclusion records", note: "Documentary evidence for any exempt packaging." },
                      { doc: "Tax calculation worksheets", note: "Showing the amount of tax chargeable per period." },
                      { doc: "Quarterly return supporting records", note: "Evidence to substantiate each return submitted to HMRC." },
                    ].map(({ doc, note }) => (
                      <div key={doc} className="flex items-start gap-3 bg-white/70 rounded-xl p-3">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="poppins-semibold text-sm text-slate-900">{doc}</p>
                          <p className="poppins-regular text-xs text-slate-500">{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Callout type="warning">
                  <strong>Typical HMRC audit trigger:</strong> A common PPT audit trigger is an inconsistency between the declared recycled content 
                  percentage and the volume of packaging handled. Ensure your supplier declarations are current, signed, and match your production records exactly.
                </Callout>

                {/* EPR subsection */}
                <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mt-6 mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Recycle className="w-4 h-4 text-purple-600" />
                    <span className="poppins-bold text-sm text-purple-700 uppercase tracking-widest">Extended Producer Responsibility (EPR)</span>
                  </div>
                  <p className="poppins-regular text-sm text-slate-600 leading-relaxed mb-4">
                    Applies to UK businesses that supply or import packaging and exceed the registration thresholds 
                    (£1m+ turnover and handling 25+ tonnes of packaging per year from 2024). 
                    Records must be retained for <strong>7 years</strong>.
                  </p>
                  <div className="space-y-3">
                    {[
                      { doc: "Packaging tonnage activity records", note: "By material type (plastic, glass, card, metal, etc.)." },
                      { doc: "PRN / PERN purchase records", note: "Packaging Recovery Notes from accredited reprocessors." },
                      { doc: "Producer registration confirmation", note: "Submitted to the relevant EPR scheme administrator." },
                      { doc: "Scheme membership records", note: "Evidence of compliance scheme participation." },
                      { doc: "Annual data submission evidence", note: "Supporting data for each yearly submission." },
                    ].map(({ doc, note }) => (
                      <div key={doc} className="flex items-start gap-3 bg-white/70 rounded-xl p-3">
                        <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="poppins-semibold text-sm text-slate-900">{doc}</p>
                          <p className="poppins-regular text-xs text-slate-500">{note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Section: HMO documentation ────────────────────────── */}
              <section id="hmo-docs" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    HMO landlord documentation
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  HMO landlords face documentation requirements from two directions: HMO licensing conditions 
                  (set and enforced by the local authority) and wider waste regulations (including workplace recycling rules and Duty of Care). 
                  These requirements overlap but are separate, and serious failures can result in licence refusal or prosecution.
                </p>

                <div className="rounded-2xl border border-slate-100 overflow-hidden mb-6">
                  <div className="bg-amber-600 px-5 py-3">
                    <span className="poppins-semibold text-[11px] text-white/80 uppercase tracking-widest">8 Key Documents for HMO Waste Compliance</span>
                  </div>
                  <div className="px-5 divide-y divide-slate-50">
                    {[
                      { doc: "HMO Waste Management Plan", regulation: "Common HMO licence condition / waste rules", penalty: "Higher risk of licence refusal or fines", notes: "Document covering all 4 waste streams — format varies by council." },
                      { doc: "Tenant instruction record", regulation: "Typical HMO licence condition", penalty: "Potential licence breach", notes: "Signed record that each tenant received waste instructions." },
                      { doc: "Waste contractor details", regulation: "EPA 1990 s.34", penalty: "Fixed penalties (often up to £300 per transfer)", notes: "Current EA licence number and contract terms." },
                      { doc: "Waste Transfer Notes", regulation: "EPA 1990 s.34", penalty: "Fixed penalties (commonly up to £300 each)", notes: "From every waste collection — retain 2 years." },
                      { doc: "6-month inspection log", regulation: "Best practice / may be required in licence", penalty: "Management and licence risk", notes: "Dated inspection records showing compliance monitoring." },
                      { doc: "Bin location diagram", regulation: "Often requested by councils with HMO licences", penalty: "Planning or licence risk", notes: "Floor plan showing bin positions and access routes." },
                      { doc: "Contingency procedures", regulation: "Good practice / may be required in HMO licence", penalty: "Increased risk of enforcement notices", notes: "Written procedures for overflow, contamination, and complaints." },
                      { doc: "Council compliance statement", regulation: "Common HMO application requirement", penalty: "Application delay or possible refusal", notes: "Signed declaration of compliance with waste obligations." },
                    ].map((row) => (
                      <DocRow key={row.doc} {...row} />
                    ))}
                  </div>
                </div>

                <Callout type="tip">
                  <strong>Ready-made:</strong> All 8 of these documents are included in our{" "}
                  <Link href="/templates/hmo-waste-management-plan" className="text-emerald-600 hover:underline font-semibold">
                    HMO Waste Management Plan Template
                  </Link>{" "}
                  (£97) — formatted to council-submission standard, editable Word format.
                </Callout>
              </section>

              {/* ── Section: Penalties ────────────────────────────────── */}
              <section id="penalties" className="mb-16 scroll-mt-28">
                <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-6">
                  What missing documentation costs you
                </h2>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  Documentation failures are treated as independent breaches — separate from any underlying operational 
                  non-compliance. You can be fined for failing to <em>hold</em> a record, even if the underlying activity 
                  was fully compliant.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { reg: "Waste Transfer Notes", penalty: "Up to around £300", type: "Fixed penalty notice from regulator", authority: "Environment Agency", color: "red" },
                    { reg: "Duty of Care breach", penalty: "Up to £5,000", type: "Magistrates' Court", authority: "Environment Agency", color: "red" },
                    { reg: "HMO waste non-compliance", penalty: "Up to around £5,000", type: "Civil penalty · varies by council", authority: "Local authority", color: "rose" },
                    { reg: "PPT records missing", penalty: "Up to £20,000 in serious cases", type: "HMRC civil penalty", authority: "HMRC", color: "red" },
                    { reg: "PPT deliberate failure", penalty: "Up to 100% of tax owed in the most serious cases", type: "Criminal penalty", authority: "HMRC", color: "red" },
                    { reg: "EPR non-registration", penalty: "Can be up to £200/day", type: "Civil sanction", authority: "Environment Agency", color: "amber" },
                  ].map(({ reg, penalty, type, authority, color }) => {
                    const col = color === "red" ? "border-red-200 bg-red-50" : color === "rose" ? "border-rose-200 bg-rose-50" : "border-amber-200 bg-amber-50"
                    const textCol = color === "red" ? "text-red-700" : color === "rose" ? "text-rose-700" : "text-amber-700"
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
                  <strong>Multiple penalties:</strong> Where the same incident involves missing documentation across several document types 
                  (e.g. no WTN <em>and</em> unverified carrier), each missing document may attract a separate penalty. 
                  A single collection with an unlicensed carrier and no WTN can result in penalties exceeding £5,000.
                </Callout>
              </section>

              {/* ── Section: How to build your file ───────────────────── */}
              <section id="how-to-build" className="mb-16 scroll-mt-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900">
                    How to build your evidence file
                  </h2>
                </div>

                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-6">
                  The goal is not just to hold individual documents — it's to have them organised so that 
                  when an inspector or HMRC officer asks for evidence, you can retrieve every relevant record 
                  within minutes. A coherent evidence file also demonstrates intention to comply, which affects 
                  how regulators exercise discretion on penalties.
                </p>

                <div className="space-y-5 mb-8">
                  {[
                    {
                      step: "01",
                      icon: ClipboardList,
                      title: "Map your obligations",
                      body: "Start by identifying which regulations apply to your business. Waste Duty of Care applies to all — PPT and EPR apply only if you manufacture or import packaging above the thresholds. HMO rules apply only to HMO landlords.",
                    },
                    {
                      step: "02",
                      icon: BarChart3,
                      title: "Audit what you currently hold",
                      body: "Go through each document category and list what you have, what's missing, and what's outdated. A simple spreadsheet noting document name, date, and next review date is sufficient.",
                    },
                    {
                      step: "03",
                      icon: PenLine,
                      title: "Produce or commission missing documents",
                      body: "For templates, our resource pages and template store can help. For complex documents (PPT accounts, EPR records), professional production is strongly recommended — errors in these documents can trigger audits.",
                    },
                    {
                      step: "04",
                      icon: FolderOpen,
                      title: "Organise into a named evidence file",
                      body: "Create a single folder (physical or digital) with tabbed sections: Waste, Packaging, HMO, Contractor Records. Label each document with the regulation it satisfies. Provide a cover sheet listing contents and review dates.",
                    },
                    {
                      step: "05",
                      icon: Calendar,
                      title: "Set a review schedule",
                      body: "Most records need annual review. PPT accounts need quarterly reconciliation. HMO plans should be updated whenever your contractor or property details change. Build review dates into your calendar now.",
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

              {/* ── Section: Get help ──────────────────────────────────── */}
              <section id="get-help" className="mb-10 scroll-mt-28">
                <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-5">
                  Get your documentation right
                </h2>
                <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                  Building and maintaining a compliant evidence file takes time most businesses don't have. 
                  Millstone Compliance produces, organises, and maintains documentation for waste, PPT, and EPR 
                  compliance — so you can focus on running your business.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/services/documentation" className="group block bg-emerald-700 hover:bg-emerald-800 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5">
                    <p className="poppins-bold text-[10px] text-emerald-200 uppercase tracking-widest mb-2">Professional Service</p>
                    <h3 className="poppins-bold text-base text-white mb-2">Documentation Service</h3>
                    <p className="poppins-regular text-sm text-emerald-200 leading-relaxed mb-4">We produce, organise, and maintain all your compliance records.</p>
                    <div className="flex items-center gap-1.5 text-white">
                      <span className="poppins-semibold text-xs">Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>

                  <Link href="/templates/hmo-waste-management-plan" className="group block bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                    <span className="poppins-bold text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-widest">£97 Template</span>
                    <h3 className="poppins-bold text-base text-slate-900 mt-3 mb-2">HMO Waste Management Plan</h3>
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-4">Full 8-section document pack — council-submission ready.</p>
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <span className="poppins-semibold text-xs">View template</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </div>
              </section>

              {/* ── Related articles ──────────────────────────────────── */}
              <div className="border-t border-slate-100 pt-8">
                <p className="poppins-semibold text-xs text-slate-400 uppercase tracking-widest mb-5">Related Guides</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { title: "Waste Duty of Care: Complete Guide", href: "/resources/duty-of-care-waste" },
                    { title: "PPT Records & Accounts Guide", href: "/resources/plastic-packaging-tax" },
                    { title: "HMO Landlords & £5,000 Fines", href: "/resources/hmo-recycling-fines" },
                    { title: "5 PPT Mistakes That Trigger Audits", href: "/resources/ppt-hmrc-audit-mistakes" },
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

            {/* ── Sidebar TOC ─────────────────────────────────────────── */}
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
