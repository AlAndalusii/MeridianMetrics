"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { CheckCircle, XCircle, ArrowRight, Calendar } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { CalendlyModal } from "@/components/CalendlyWidget"

// ─── Scan data ────────────────────────────────────────────────────────────────
const scanItems = [
  { label: "Clinical Waste Segregation", status: "ok" },
  { label: "Food Waste Caddy", status: "gap" },
  { label: "Dry Recyclables Stream", status: "ok" },
  { label: "Duty of Care Records", status: "gap" },
  { label: "Contractor Registration", status: "ok" },
]

// ─── Custom SVG icons ─────────────────────────────────────────────────────────
const ClinicalIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10">
    <circle cx="28" cy="28" r="26" stroke="url(#clin-g)" strokeWidth="1.5" opacity="0.3" />
    <circle cx="28" cy="28" r="18" stroke="url(#clin-g)" strokeWidth="1" opacity="0.5" />
    <rect x="24.5" y="16" width="7" height="24" rx="3.5" fill="url(#clin-g)" />
    <rect x="16" y="24.5" width="24" height="7" rx="3.5" fill="url(#clin-g)" />
    <defs>
      <linearGradient id="clin-g" x1="4" y1="4" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fb7185" />
        <stop offset="1" stopColor="#e11d48" />
      </linearGradient>
    </defs>
  </svg>
)

const RecyclingIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10">
    <circle cx="28" cy="28" r="26" stroke="url(#rec-g)" strokeWidth="1.5" opacity="0.25" />
    <path d="M28 13 C36 13 42 18 43 26 L46 23 L46 32 L37 32 L40 29 C39 23 34 19 28 19 C22 19 17 23 16 29 L10 29 C11 20 18 13 28 13 Z" fill="url(#rec-g)" opacity="0.9" />
    <path d="M10 31 C11 40 18 47 28 47 C34 47 39 44 42 39 L45 42 L45 33 L36 33 L39 36 C37 40 33 43 28 43 C20 43 14 37 13 31 Z" fill="url(#rec-g)" opacity="0.7" />
    <circle cx="28" cy="28" r="4" fill="url(#rec-g)" />
    <defs>
      <linearGradient id="rec-g" x1="4" y1="4" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34d399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
)

const DutyIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10">
    <rect x="11" y="7" width="34" height="42" rx="5" stroke="url(#duty-g)" strokeWidth="1.5" />
    <line x1="18" y1="18" x2="38" y2="18" stroke="url(#duty-g)" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="25" x2="38" y2="25" stroke="url(#duty-g)" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="32" x2="28" y2="32" stroke="url(#duty-g)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="38" cy="40" r="8" fill="url(#duty-fill)" />
    <path d="M34.5 40 L37 42.5 L41.5 38" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="duty-g" x1="4" y1="4" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="duty-fill" x1="30" y1="32" x2="46" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fbbf24" />
        <stop offset="1" stopColor="#d97706" />
      </linearGradient>
    </defs>
  </svg>
)

const DigitalIcon = () => (
  <svg viewBox="0 0 56 56" fill="none" className="w-10 h-10">
    <rect x="7" y="13" width="42" height="30" rx="5" stroke="url(#dig-g)" strokeWidth="1.5" />
    <circle cx="18" cy="21" r="3" fill="url(#dig-g)" />
    <circle cx="28" cy="28" r="3" fill="url(#dig-g)" />
    <circle cx="38" cy="21" r="3" fill="url(#dig-g)" />
    <circle cx="18" cy="35" r="3" fill="url(#dig-g)" />
    <circle cx="38" cy="35" r="3" fill="url(#dig-g)" />
    <path d="M21 21 L25 28" stroke="url(#dig-g)" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M31 28 L35 21" stroke="url(#dig-g)" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M18 24 L18 32" stroke="url(#dig-g)" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M38 24 L38 32" stroke="url(#dig-g)" strokeWidth="1.3" strokeLinecap="round" opacity="0.6" />
    <path d="M21 35 L35 35" stroke="url(#dig-g)" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
    <circle cx="28" cy="28" r="6" stroke="url(#dig-g)" strokeWidth="1" opacity="0.2" />
    <defs>
      <linearGradient id="dig-g" x1="4" y1="4" x2="52" y2="52" gradientUnits="userSpaceOnUse">
        <stop stopColor="#818cf8" />
        <stop offset="1" stopColor="#4f46e5" />
      </linearGradient>
    </defs>
  </svg>
)

const checkCards = [
  {
    Icon: ClinicalIcon,
    tag: "HTM 07-01",
    title: "Clinical Waste",
    desc: "Segregation, colour-coding, and licensed disposal — verified.",
    tagBg: "bg-rose-50 text-rose-600 border-rose-200",
    cardBg: "bg-white hover:border-rose-200",
    glow: "hover:shadow-rose-100",
    accent: "from-rose-50/80",
    dot: "bg-rose-500",
  },
  {
    Icon: RecyclingIcon,
    tag: "March 2026",
    title: "Simpler Recycling",
    desc: "3-stream separation, food caddies, and bin labelling across your site.",
    tagBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cardBg: "bg-white hover:border-emerald-200",
    glow: "hover:shadow-emerald-100",
    accent: "from-emerald-50/80",
    dot: "bg-emerald-500",
  },
  {
    Icon: DutyIcon,
    tag: "Legal",
    title: "Duty of Care",
    desc: "Transfer notes, EA-registered contractors, 3-year records audited.",
    tagBg: "bg-amber-50 text-amber-700 border-amber-200",
    cardBg: "bg-white hover:border-amber-200",
    glow: "hover:shadow-amber-100",
    accent: "from-amber-50/80",
    dot: "bg-amber-500",
  },
  {
    Icon: DigitalIcon,
    tag: "Oct 2026",
    title: "Digital Tracking",
    desc: "Paper records end. We assess your systems and prepare you.",
    tagBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    cardBg: "bg-white hover:border-indigo-200",
    glow: "hover:shadow-indigo-100",
    accent: "from-indigo-50/80",
    dot: "bg-indigo-500",
  },
]

export default function CareHomesPage() {
  const [mounted, setMounted] = useState(false)
  const [scoreWidth, setScoreWidth] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setScoreWidth(62), 700)
    const interval = setInterval(() => setActiveStep((p) => (p + 1) % 3), 3200)
    return () => { clearTimeout(t); clearInterval(interval) }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-slate-900">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Soft background orbs — light theme */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl animate-gradient-shift" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-100/60 rounded-full blur-3xl animate-gradient-shift-reverse" />
          <div className="absolute top-40 right-10 w-48 h-48 bg-rose-100/30 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}
            <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="inline-flex items-center gap-2 border border-emerald-300 bg-emerald-100/60 text-emerald-800 px-4 py-1.5 rounded-full text-xs poppins-semibold tracking-widest uppercase mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Care Home Compliance
              </div>

              <h1 className="poppins-bold text-5xl sm:text-6xl lg:text-[64px] leading-[1.05] tracking-tight text-slate-900 mb-6">
                New rules.<br />
                <span className="text-emerald-700">Real fines.</span><br />
                One audit.
              </h1>

              <p className="poppins-regular text-slate-600 text-lg leading-relaxed mb-10 max-w-md">
                Care homes carry legal obligations across three separate waste streams. We audit every one and hand you an inspection-ready report in 48 hours.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <button
                  onClick={() => setCalendlyOpen(true)}
                  className="group inline-flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm px-7 py-4 rounded-2xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-700/20"
                >
                  <Calendar className="w-4 h-4" />
                  Book Site Audit — £295
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 border border-emerald-300 hover:border-emerald-400 bg-white/70 hover:bg-white text-emerald-800 poppins-semibold text-sm px-7 py-4 rounded-2xl transition-all duration-200 active:scale-95 backdrop-blur-sm"
                >
                  Free Compliance Check
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-3">
                {["Cambridge-Trained", "48hr Turnaround", "Weekend Availability"].map((b) => (
                  <span key={b} className="poppins-medium text-xs text-slate-600 border border-slate-200 bg-white/80 px-3.5 py-1.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Compliance Scan Widget */}
            <div className={`relative transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {/* Floating accent pieces */}
              <div className="absolute -top-6 -right-4 w-36 h-14 bg-white/80 border border-emerald-100 rounded-2xl shadow-sm animate-float-slow opacity-80" />
              <div className="absolute -bottom-4 -left-6 w-24 h-24 bg-emerald-100/60 border border-emerald-200/60 rounded-2xl shadow-sm animate-float-slow-reverse opacity-70" />

              {/* Main widget */}
              <div className="relative bg-white/90 backdrop-blur-2xl border border-slate-200/80 rounded-3xl p-7 max-w-[360px] mx-auto lg:ml-auto lg:mr-0 shadow-2xl shadow-slate-200/80">
                {/* Widget header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="poppins-bold text-sm text-slate-900">Compliance Scan</p>
                    <p className="poppins-regular text-xs text-slate-400 mt-0.5">Live assessment</p>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="poppins-medium text-xs text-emerald-700">Running</span>
                  </div>
                </div>

                {/* Rows */}
                <div className="space-y-2.5 mb-6">
                  {scanItems.map((item, i) => (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                        item.status === "ok"
                          ? "bg-emerald-50 border-emerald-100"
                          : "bg-rose-50 border-rose-100"
                      }`}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="flex items-center gap-3">
                        {item.status === "ok" ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        )}
                        <span className="poppins-medium text-xs text-slate-700">{item.label}</span>
                      </div>
                      <span className={`text-[10px] poppins-bold px-2 py-0.5 rounded-full ${
                        item.status === "ok"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}>
                        {item.status === "ok" ? "OK" : "GAP"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Score */}
                <div className="border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="poppins-medium text-xs text-slate-500">Compliance Score</span>
                    <span className="poppins-bold text-base text-slate-900">62<span className="text-slate-400 text-sm">%</span></span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all ease-out"
                      style={{
                        width: `${scoreWidth}%`,
                        background: "linear-gradient(90deg, #f59e0b, #10b981)",
                        transitionDuration: "1200ms",
                      }}
                    />
                  </div>
                  <p className="poppins-medium text-[11px] text-rose-600 mt-2.5">
                    2 gaps found · action required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────────── */}
      <section className="border-y border-emerald-100/80 bg-white/60 backdrop-blur-sm py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-4">
          {[
            { n: "31 Mar", label: "Deadline passed", accent: "text-rose-600" },
            { n: "3", label: "Waste streams required", accent: "text-amber-600" },
            { n: "£5k", label: "Max fine per incident", accent: "text-rose-600" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`poppins-bold text-3xl sm:text-4xl ${s.accent} mb-1`}>{s.n}</p>
              <p className="poppins-regular text-xs sm:text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT WE CHECK ────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="poppins-semibold text-emerald-700 text-xs tracking-[0.2em] uppercase mb-4">What We Check</p>
            <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-tight">
              Every obligation.<br />Fully covered.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {checkCards.map((card) => (
              <div
                key={card.title}
                className={`group relative overflow-hidden ${card.cardBg} border border-slate-200/80 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.glow} cursor-default`}
              >
                {/* Gradient accent top-right */}
                <div className={`absolute top-0 right-0 w-56 h-40 bg-gradient-to-bl ${card.accent} to-transparent rounded-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative">
                  {/* Tag row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-2 h-2 rounded-full ${card.dot}`} />
                    <span className={`poppins-semibold text-[10px] tracking-widest uppercase border px-2.5 py-1 rounded-full ${card.tagBg}`}>
                      {card.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-5">
                    <card.Icon />
                  </div>

                  {/* Text */}
                  <h3 className="poppins-bold text-xl text-slate-900 mb-2">{card.title}</h3>
                  <p className="poppins-regular text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 border-y border-emerald-100/80 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="poppins-semibold text-emerald-700 text-xs tracking-[0.2em] uppercase mb-4">Process</p>
            <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900">Three steps.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Book a call", sub: "15 minutes. We scope your site and current setup." },
              { n: "02", title: "Site audit", sub: "We visit, check every stream, verify your contractor." },
              { n: "03", title: "Written report", sub: "48hr turnaround. Inspection-ready PDF." },
            ].map((s, i) => {
              const isActive = activeStep === i
              return (
                <div
                  key={s.n}
                  className={`relative rounded-3xl border p-8 transition-all duration-500 ${
                    isActive
                      ? "bg-emerald-700 border-emerald-700 shadow-xl shadow-emerald-200/60 scale-[1.02]"
                      : "bg-white border-slate-200/80"
                  }`}
                >
                  <div className={`text-6xl poppins-bold mb-6 leading-none transition-colors duration-500 ${
                    isActive ? "text-white/20" : "text-slate-100"
                  }`}>
                    {s.n}
                  </div>
                  <h3 className={`poppins-bold text-lg mb-2 transition-colors duration-500 ${isActive ? "text-white" : "text-slate-900"}`}>
                    {s.title}
                  </h3>
                  <p className={`poppins-regular text-sm leading-relaxed transition-colors duration-500 ${isActive ? "text-emerald-100" : "text-slate-500"}`}>
                    {s.sub}
                  </p>
                  {isActive && (
                    <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="poppins-semibold text-emerald-700 text-xs tracking-[0.2em] uppercase mb-5">Why Millstone</p>
              <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-tight mb-6">
                Independent.<br />Qualified.<br />
                <span className="text-slate-400">No agenda.</span>
              </h2>
              <p className="poppins-regular text-slate-600 text-base leading-relaxed max-w-sm">
                We don&apos;t sell bins or contractor services. We tell you the truth about your compliance — in plain English.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Cambridge CISL",
                  sub: "Sustainability & Environmental Leadership",
                  tag: "Qualified",
                  style: "border-blue-200 bg-blue-50/60 text-blue-700",
                  tagStyle: "bg-blue-100 text-blue-700",
                },
                {
                  label: "Government Background",
                  sub: "Former HMRC — compliance is what we do",
                  tag: "Experienced",
                  style: "border-amber-200 bg-amber-50/60 text-amber-800",
                  tagStyle: "bg-amber-100 text-amber-700",
                },
                {
                  label: "Plain English Reports",
                  sub: "No jargon. Just what you need to fix.",
                  tag: "Practical",
                  style: "border-emerald-200 bg-emerald-50/60 text-emerald-800",
                  tagStyle: "bg-emerald-100 text-emerald-700",
                },
              ].map((c) => (
                <div key={c.label} className={`flex items-center gap-5 border rounded-2xl px-6 py-5 ${c.style}`}>
                  <div className="flex-1">
                    <p className="poppins-bold text-sm text-slate-900 mb-0.5">{c.label}</p>
                    <p className="poppins-regular text-xs text-slate-500">{c.sub}</p>
                  </div>
                  <span className={`poppins-semibold text-[10px] tracking-wide px-2.5 py-1 rounded-full ${c.tagStyle}`}>
                    {c.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-28 px-4 sm:px-6 bg-emerald-700">
        {/* Subtle texture */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/40 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-emerald-800/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="poppins-semibold text-emerald-300 text-xs tracking-[0.2em] uppercase mb-5">Get Started</p>
          <h2 className="poppins-bold text-5xl sm:text-6xl text-white leading-tight mb-6">
            Inspection-ready<br />in 48 hours.
          </h2>
          <p className="poppins-regular text-emerald-100/80 text-lg mb-10 max-w-lg mx-auto">
            One site visit. One clear report. Everything your inspector needs to see.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCalendlyOpen(true)}
              className="group inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-800 poppins-bold text-sm px-8 py-4 rounded-2xl transition-all duration-200 active:scale-95 shadow-xl shadow-black/20"
            >
              <Calendar className="w-4 h-4" />
              Book Site Audit — £295
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/15 text-white poppins-semibold text-sm px-8 py-4 rounded-2xl transition-all duration-200 active:scale-95"
            >
              Free Compliance Check
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <CalendlyModal isOpen={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </div>
  )
}
