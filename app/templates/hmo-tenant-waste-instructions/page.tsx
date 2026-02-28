"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Star,
  Zap,
  Mail,
  Lock,
  Sparkles,
  Printer,
  ChevronRight,
  Download,
  Award,
  BookOpen,
  XCircle,
  Layers,
  Maximize2,
  AlignLeft,
  Image as ImageIcon,
  FileText,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Email config ─────────────────────────────────────────────────────────────

const EMAIL_ADDRESS = "hello@millstonecompliance.com"
const EMAIL_SUBJECT = "HMO Tenant Waste Instructions Pack — £27"
const EMAIL_BODY = `Hi Millstone Compliance team,

I'd like to purchase the HMO Tenant Waste Instructions Pack (£27).

Please send me the download link and payment details.

My details:
Name: 
Company / Trading name: 
Phone: 

Thank you`

const MAILTO_LINK = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`

// ─── Bin stream data ──────────────────────────────────────────────────────────

const binStreams = [
  {
    id: "food",
    label: "Food Waste",
    binColor: "bg-green-500",
    binBorder: "border-green-600",
    cardBg: "bg-green-50",
    cardBorder: "border-green-200",
    textColor: "text-green-800",
    mutedColor: "text-green-600",
    accentBg: "bg-green-500",
    sheet: "Sheet 1 of 4",
    goes: ["Cooked & raw food scraps", "Fruit & vegetable peel", "Meat and fish", "Tea bags & coffee grounds", "Dairy products"],
    nope: ["Liquids", "Packaging of any kind", "Cat litter / pet waste", "General rubbish"],
    icon: "🥦",
  },
  {
    id: "dry",
    label: "Dry Recycling",
    binColor: "bg-blue-500",
    binBorder: "border-blue-600",
    cardBg: "bg-blue-50",
    cardBorder: "border-blue-200",
    textColor: "text-blue-800",
    mutedColor: "text-blue-600",
    accentBg: "bg-blue-500",
    sheet: "Sheet 2 of 4",
    goes: ["Clean plastic bottles & containers", "Tins & cans", "Glass bottles & jars", "Foil (scrunched into a ball)", "Tetra Pak cartons"],
    nope: ["Food-contaminated packaging", "Black plastic", "Crisp packets", "Polystyrene"],
    icon: "♻️",
  },
  {
    id: "paper",
    label: "Paper & Card",
    binColor: "bg-amber-500",
    binBorder: "border-amber-600",
    cardBg: "bg-amber-50",
    cardBorder: "border-amber-200",
    textColor: "text-amber-900",
    mutedColor: "text-amber-700",
    accentBg: "bg-amber-500",
    sheet: "Sheet 3 of 4",
    goes: ["Newspapers & magazines", "Cardboard boxes (flattened)", "Envelopes (inc. windows)", "Office paper", "Cereal boxes"],
    nope: ["Greasy pizza boxes", "Shredded paper", "Wet or soiled paper", "Tissues & napkins"],
    icon: "📰",
  },
  {
    id: "general",
    label: "General Waste",
    binColor: "bg-slate-700",
    binBorder: "border-slate-800",
    cardBg: "bg-slate-50",
    cardBorder: "border-slate-200",
    textColor: "text-slate-800",
    mutedColor: "text-slate-600",
    accentBg: "bg-slate-700",
    sheet: "Sheet 4 of 4",
    goes: ["Nappies & hygiene products", "Broken ceramics", "Vacuum bags", "Non-recyclable packaging", "Rubber & leather"],
    nope: ["Anything recyclable", "Food waste", "Hazardous materials", "Electrical items (WEEE)"],
    icon: "🗑️",
  },
]

const mistakes = [
  {
    wrong: "Putting food waste in the general bin",
    why: "Triggers contamination — the entire load may go to landfill",
    fix: "Use the green food caddy, every time",
  },
  {
    wrong: "Leaving bin lids open",
    why: "Causes odour complaints and potential council enforcement",
    fix: "Check lid is fully closed when placing bins out",
  },
  {
    wrong: "Rinsing is optional",
    why: "Food residue contaminates recyclables — whole bin rejected",
    fix: "Give a quick rinse to all tins, bottles, and containers",
  },
  {
    wrong: "Pizza boxes in dry recycling",
    why: "Grease ruins paper fibres — entire paper stream contaminated",
    fix: "Greasy boxes go in general waste only",
  },
  {
    wrong: "Putting bins out too early",
    why: "Fly-tipping risk and neighbour/council complaints",
    fix: "Bins out the evening before collection day only",
  },
]

// ─── Animated A4 Sheet Mockup ─────────────────────────────────────────────────

function AnimatedSheetMockup() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % binStreams.length)
        setAnimating(false)
      }, 250)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  const stream = binStreams[activeIdx]

  return (
    <div className="relative w-full max-w-xs mx-auto select-none">
      {/* Stacked sheet shadows */}
      <div className="absolute top-5 left-5 right-0 bottom-0 bg-slate-200/50 rounded-2xl" />
      <div className="absolute top-3 left-3 right-0 bottom-0 bg-slate-100/70 rounded-2xl" />
      <div className="absolute top-1.5 left-1.5 right-0 bottom-0 bg-slate-50 rounded-2xl border border-slate-200" />

      {/* Main sheet */}
      <div
        className={`relative bg-white rounded-2xl border-2 shadow-2xl overflow-hidden transition-all duration-250 ${stream.cardBorder} ${animating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
      >
        {/* Sheet header stripe */}
        <div className={`${stream.accentBg} px-5 py-4`}>
          <div className="flex items-center justify-between mb-2">
            <span className="poppins-bold text-[10px] text-white/70 uppercase tracking-widest">
              {stream.sheet}
            </span>
            <span className="text-2xl leading-none">{stream.icon}</span>
          </div>
          <h3 className="poppins-bold text-lg text-white leading-tight">{stream.label}</h3>
          <p className="poppins-regular text-xs text-white/70 mt-0.5">Tenant Instruction Sheet</p>
        </div>

        {/* Bin visual */}
        <div className="flex justify-center py-4 border-b border-slate-100">
          <div className={`relative w-14 h-16 ${stream.binColor} rounded-b-xl rounded-t-lg border-2 ${stream.binBorder} shadow-lg`}>
            {/* Bin lid */}
            <div className={`absolute -top-3 -left-2 -right-2 h-4 ${stream.binColor} rounded-t-xl border-2 ${stream.binBorder}`} />
            {/* Bin handle */}
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 w-6 h-3 border-2 ${stream.binBorder} rounded-t-full bg-transparent`} />
            {/* Bin lines */}
            <div className="absolute inset-x-2 top-3 space-y-1">
              <div className="h-0.5 bg-white/30 rounded-full" />
              <div className="h-0.5 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>

        {/* Goes in */}
        <div className="px-4 py-3">
          <p className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2">✓ Put In</p>
          <div className="space-y-1">
            {stream.goes.slice(0, 3).map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className={`w-3 h-3 ${stream.mutedColor} flex-shrink-0`} />
                <span className="poppins-regular text-[11px] text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Does not go in */}
        <div className="px-4 pt-0 pb-3 border-t border-slate-50">
          <p className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2 mt-2">✗ Do NOT Put In</p>
          <div className="space-y-1">
            {stream.nope.slice(0, 2).map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <XCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                <span className="poppins-regular text-[11px] text-slate-500">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-3 pt-1">
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
            <span className="poppins-regular text-[10px] text-slate-400">Collection day:</span>
            <div className="w-16 h-2 bg-slate-200 rounded-full" />
          </div>
        </div>
      </div>

      {/* Sheet indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-5">
        {binStreams.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActiveIdx(i)}
            className={`transition-all duration-300 rounded-full ${i === activeIdx ? `w-6 h-2 ${s.accentBg}` : "w-2 h-2 bg-slate-200 hover:bg-slate-300"}`}
          />
        ))}
      </div>

      {/* Badge */}
      <div className="absolute -top-3 -right-3 bg-slate-700 text-white poppins-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
        £27
      </div>
    </div>
  )
}

// ─── Bin Stream Card ─────────────────────────────────────────────────────────

function BinStreamCard({ stream, idx }: { stream: typeof binStreams[0]; idx: number }) {
  const [open, setOpen] = useState(idx === 0)

  return (
    <div className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${open ? stream.cardBorder : "border-slate-100"}`}>
      <button
        type="button"
        className="w-full text-left"
        onClick={() => setOpen(!open)}
      >
        <div className={`flex items-center gap-4 px-5 py-4 ${open ? stream.cardBg : "bg-white hover:bg-slate-50"} transition-colors`}>
          <div className={`w-10 h-10 ${stream.binColor} rounded-xl flex items-center justify-center text-lg shadow-sm`}>
            {stream.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`poppins-bold text-[10px] ${stream.mutedColor} uppercase tracking-widest`}>{stream.sheet}</span>
            </div>
            <p className="poppins-bold text-sm text-slate-900">{stream.label}</p>
          </div>
          <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
        </div>
      </button>

      {open && (
        <div className={`${stream.cardBg} border-t ${stream.cardBorder} px-5 py-4`}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2">Goes In</p>
              <div className="space-y-1.5">
                {stream.goes.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${stream.mutedColor} flex-shrink-0 mt-0.5`} />
                    <span className="poppins-regular text-xs text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="poppins-bold text-[10px] text-slate-500 uppercase tracking-widest mb-2">Does NOT Go In</p>
              <div className="space-y-1.5">
                {stream.nope.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-xs text-slate-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HMOTenantWasteInstructionsPage() {
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS)
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-slate-900 overflow-hidden">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08)_0%,transparent_65%)]" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl" />
          <div className="hidden sm:block absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left copy */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-sm">
                <Link href="/templates" className="poppins-medium text-slate-400 hover:text-emerald-700 transition-colors">
                  Templates
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="poppins-medium text-emerald-700">Tenant Waste Instructions</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs poppins-semibold text-slate-600 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                Quick Start — Installed In 30 Minutes
              </div>

              <h1 className="poppins-bold text-4xl sm:text-5xl lg:text-[3.25rem] text-slate-900 leading-[1.1] tracking-tight mb-6">
                HMO Tenant Waste
                <br />
                Instructions
                <br />
                <span className="text-emerald-700">Pack</span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg">
                Ready-to-print A4 sheets that tell your tenants exactly what goes in each bin. 
                Colour-coded graphics, plain English, no briefing required. Installed in 30 minutes.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  { icon: Printer,   label: "Print & Laminate Ready" },
                  { icon: Layers,    label: "4 Sheets — One Per Bin" },
                  { icon: ImageIcon, label: "Colour-Coded Graphics" },
                  { icon: Maximize2, label: "A4 Format — Fits Any Frame" },
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

              {/* Price + CTA */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/80 p-6 max-w-md">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="poppins-bold text-5xl text-slate-900">£27</span>
                  <span className="poppins-regular text-sm text-slate-400">one-time · own it forever</span>
                </div>
                <p className="poppins-regular text-sm text-slate-500 mb-6">
                  Sent to your inbox within minutes of purchase.
                </p>
                <a
                  href={MAILTO_LINK}
                  className="group flex items-center justify-center gap-2.5 w-full px-6 py-4 rounded-xl poppins-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-md shadow-emerald-700/25 hover:shadow-lg hover:shadow-emerald-700/30 mb-3"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  I Want This Pack
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <p className="poppins-regular text-xs text-slate-400 text-center">
                  Opens your email app with subject & message pre-filled
                </p>
              </div>
            </div>

            {/* Right — animated mockup */}
            <div className="flex flex-col items-center gap-8">
              <AnimatedSheetMockup />

              <div className="flex items-center gap-3">
                {[{ label: "PDF", desc: "Print-ready" }, { label: "WORD", desc: "Editable" }].map(({ label, desc }) => (
                  <div key={label} className="flex flex-col items-center gap-1 px-6 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <span className="poppins-bold text-xs text-emerald-700 tracking-widest">{label}</span>
                    <span className="poppins-regular text-[10px] text-slate-400">{desc}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs">
                {[
                  { icon: Shield,   text: "Covers all 4 mandatory waste streams" },
                  { icon: Award,    text: "Council-approved format and wording" },
                  { icon: Lock,     text: "Secure email delivery — no account needed" },
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

      {/* ── 4 sheets preview ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              Inside The Pack
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              4 Sheets.
              <span className="text-emerald-700"> Every Bin Covered.</span>
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              One A4 sheet per waste stream. Tap each to expand the full contents list.
            </p>
          </div>

          <div className="space-y-3">
            {binStreams.map((stream, idx) => (
              <BinStreamCard key={stream.id} stream={stream} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Common mistakes list ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">
              Common Mistakes List — Included
            </p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
              The 5 Errors That Cause
              <span className="text-emerald-700"> 80% of Complaints.</span>
            </h2>
            <p className="poppins-regular text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Included in the pack as a separate printable — posted near bin areas so tenants can check themselves.
            </p>
          </div>

          <div className="space-y-3">
            {mistakes.map(({ wrong, why, fix }, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <div className="grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  <div className="px-5 py-4 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="poppins-bold text-[10px] text-red-500 uppercase tracking-widest mb-1">Common Error</p>
                      <p className="poppins-semibold text-sm text-slate-800">{wrong}</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-500 text-xs font-bold">!</span>
                    </div>
                    <div>
                      <p className="poppins-bold text-[10px] text-amber-600 uppercase tracking-widest mb-1">Why It Matters</p>
                      <p className="poppins-regular text-sm text-slate-600">{why}</p>
                    </div>
                  </div>
                  <div className="px-5 py-4 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                      <p className="poppins-bold text-[10px] text-emerald-600 uppercase tracking-widest mb-1">The Fix</p>
                      <p className="poppins-regular text-sm text-slate-700">{fix}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Laminated format guide ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual guide */}
            <div className="bg-slate-900 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12)_0%,transparent_55%)]" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Printer className="w-4 h-4 text-emerald-400" />
                  <span className="poppins-semibold text-xs text-emerald-400 uppercase tracking-widest">
                    Print & Laminate Guide — Included
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      title: "Print on A4 Paper",
                      desc: "Standard 80gsm white A4. Colour printer recommended — icons use bin colours for instant recognition.",
                      icon: Printer,
                    },
                    {
                      step: "02",
                      title: "Laminate to A4",
                      desc: "A4 laminator pouches from any office supplies store. Gives a wipe-clean, waterproof finish — essential near bin areas.",
                      icon: Layers,
                    },
                    {
                      step: "03",
                      title: "Fix With Screws or Adhesive",
                      desc: "Two holes pre-marked on the sheet for wall-mounting. Or use heavy-duty double-sided tape on tiled/painted surfaces.",
                      icon: Maximize2,
                    },
                    {
                      step: "04",
                      title: "Position at Eye Level",
                      desc: "Recommended position: directly above or on the side of each bin, at standing eye height. One sheet per bin type.",
                      icon: AlignLeft,
                    },
                  ].map(({ step, title, desc, icon: Icon }) => (
                    <div key={step} className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="poppins-bold text-[10px] text-white/30">Step {step}</span>
                          <p className="poppins-semibold text-sm text-white">{title}</p>
                        </div>
                        <p className="poppins-regular text-xs text-white/50 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">
                Why It Works
              </p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-6 leading-snug">
                No Reading Required.
                <span className="text-emerald-700"> Instant Clarity.</span>
              </h2>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-5">
                Most landlords write instructions in emails that tenants never read, or stick a single printed 
                sheet somewhere in a hallway. That's not proof of distribution — and it doesn't reduce contamination.
              </p>
              <p className="poppins-regular text-base text-slate-600 leading-relaxed mb-8">
                These sheets use the same colour-coding as the bins themselves. Tenants match the bin to the 
                sheet at a glance. No literacy required. No translation needed for the basics.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  "One sheet per bin — no confusion about which instruction is which",
                  "Icon-led design works across language barriers",
                  "Common mistakes section reduces contamination on day one",
                  "Collection day field editable per property",
                  "Wipe-clean when laminated — survives kitchen environments",
                  "Laminating guide and sizing instructions included",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={MAILTO_LINK}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Get The Pack — £27
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/templates"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-emerald-700 transition-all duration-200"
                >
                  View All Templates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Upsell to full pack ───────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-emerald-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="poppins-bold text-xs text-emerald-200 uppercase tracking-widest mb-2">
                Need More Than Posters?
              </p>
              <h3 className="poppins-bold text-xl sm:text-2xl text-white leading-snug">
                Get the full Waste Management Plan
                <span className="text-emerald-200"> for £97</span>
              </h3>
              <p className="poppins-regular text-sm text-white/70 mt-1">
                Includes the Instructions Pack plus 7 more document sections, Excel calculator, and 3 complaint templates.
              </p>
            </div>
            <Link
              href="/templates/hmo-waste-management-plan"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-white text-emerald-700 hover:bg-emerald-50 transition-all duration-200 active:scale-95 shadow-lg flex-shrink-0"
            >
              View Full Pack
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { icon: Lock,     label: "Secure Email Delivery" },
              { icon: Star,     label: "Council-Approved Format" },
              { icon: BookOpen, label: "No Subscription — Own It Forever" },
              { icon: Mail,     label: "hello@millstonecompliance.com" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="poppins-medium text-sm text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
        <div className="hidden sm:block absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/20 to-green-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-green-200/20 to-emerald-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs poppins-semibold text-emerald-700 mb-7">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            Installed In 30 Minutes
          </div>
          <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 tracking-tight mb-5 leading-[1.1]">
            Bins Sorted.
            <br />
            <span className="text-emerald-700">Today.</span>
          </h2>
          <p className="poppins-regular text-slate-600 text-base sm:text-lg mb-4 leading-relaxed">
            £27. Print, laminate, post. Done before lunch.
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-10">
            <span className="poppins-bold text-5xl text-slate-900">£27</span>
            <span className="poppins-regular text-slate-400 text-sm">one-time purchase</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href={MAILTO_LINK}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl poppins-bold text-base bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-700/30 hover:shadow-xl w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              I Want This Pack
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
            Questions? Email us at{" "}
            <button type="button" onClick={handleCopyEmail} className="text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-2">
              {emailCopied ? "Copied!" : EMAIL_ADDRESS}
            </button>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
