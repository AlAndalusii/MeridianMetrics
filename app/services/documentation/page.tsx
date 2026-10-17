"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
  Sparkles,
  ChevronRight,
  FileCheck,
  ClipboardList,
  Award,
  Lock,
  Zap,
  Building2,
  Trash2,
  HeartPulse,
  Recycle,
  Users,
  Calendar,
  AlertTriangle,
  Star,
  Mail,
  BookOpen,
  Layers,
  PenLine,
  ScanLine,
  BarChart3,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

const MAILTO = "mailto:hello@millstonecompliance.com?subject=Paperwork%20Support&body=Hi%20Zak%2C%0A%0AI%27d%20like%20to%20know%20more%20about%20Paperwork%20Support.%0A%0AMy%20details%3A%0AName%3A%20%0ASite%3A%20%0APhone%3A%20%0A%0AThanks"

// ─── Document categories ──────────────────────────────────────────────────────

const docCategories = [
  {
    icon: ClipboardList,
    label: "Quarterly Returns",
    color: "emerald",
    headline: "Quarterly Waste Returns, Prepared From Data I Already Hold",
    docs: [
      "Loads in, totalled by waste type",
      "EWC codes grouped the way the return asks",
      "Weights pulled from your weighbridge tickets",
      "Ready for you to check and submit",
      "Matched against what went to Defra",
      "Done every quarter, without chasing",
    ],
  },
  {
    icon: Users,
    label: "Hauliers & Customers",
    color: "blue",
    headline: "Your Regulars Set Up Before Their First Load",
    docs: [
      "Regular hauliers' details on file",
      "Regular customers' details on file",
      "The waste each one usually brings",
      "Their usual EWC and R/D codes",
      "New regulars added when they start",
      "Fewer questions on busy days",
    ],
  },
  {
    icon: Layers,
    label: "Your DWT Records",
    color: "purple",
    headline: "Code Template, Weekly Lists and a Clear Paper Trail",
    docs: [
      "Your code template, kept up to date",
      "Every Friday confirmation, kept",
      "Ticket photos matched to each load",
      "Notes of anything I had to ask about",
      "Rule changes explained in plain English",
      "Easy to hand over if anyone asks",
    ],
  },
]

const colorMap: Record<string, { bg: string; border: string; icon: string; pill: string; pillBg: string; glow: string }> = {
  emerald: { bg: "bg-emerald-50", border: "border-emerald-200", icon: "text-emerald-600", pill: "text-emerald-700", pillBg: "bg-emerald-100", glow: "shadow-emerald-100" },
  blue:    { bg: "bg-blue-50",    border: "border-blue-200",    icon: "text-blue-600",    pill: "text-blue-700",    pillBg: "bg-blue-100",    glow: "shadow-blue-100"    },
  purple:  { bg: "bg-purple-50",  border: "border-purple-200",  icon: "text-purple-600",  pill: "text-purple-700",  pillBg: "bg-purple-100",  glow: "shadow-purple-100"  },
}

// ─── Process steps ────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: ScanLine,
    title: "I Look at What You Already Do",
    body: "Your returns, your regulars and your paperwork. I see what I can take off your plate, using the data I already hold.",
  },
  {
    num: "02",
    icon: Users,
    title: "I Set Up Your Regulars",
    body: "Regular hauliers and customers go in before their first load, with the waste they usually bring and the right codes.",
  },
  {
    num: "03",
    icon: PenLine,
    title: "I Prepare Your Returns",
    body: "Quarterly waste returns built from the loads I have already reported. You check them, and you stay in control.",
  },
  {
    num: "04",
    icon: Calendar,
    title: "I Keep It Current",
    body: "New hauliers, new waste types, new rules. I update your records as things change, and tell you what changed.",
  },
]

// ─── Animated document stack ──────────────────────────────────────────────────

function DocumentStack() {
  const [active, setActive] = useState(0)
  const docs = [
    { label: "Quarterly Waste Return", type: "QWR", color: "emerald" },
    { label: "Regular Haulier Details", type: "HAU", color: "blue" },
    { label: "Regular Customer Details", type: "CUS", color: "amber" },
    { label: "EWC & R/D Code Template", type: "TPL", color: "purple" },
    { label: "Friday Confirmation", type: "FRI", color: "rose" },
  ]
  const typeColors: Record<string, string> = {
    emerald: "bg-emerald-600",
    blue: "bg-blue-600",
    amber: "bg-amber-500",
    purple: "bg-purple-600",
    rose: "bg-rose-500",
  }

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % docs.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative w-full max-w-xs mx-auto h-64 select-none">
      {docs.map((doc, idx) => {
        const offset = (idx - active + docs.length) % docs.length
        const isActive = offset === 0
        const isBehind1 = offset === 1
        const isBehind2 = offset === 2

        return (
          <div
            key={doc.label}
            className={`absolute inset-x-0 bg-white rounded-2xl border border-slate-200 shadow-xl transition-all duration-700 ${
              isActive
                ? "top-0 scale-100 opacity-100 z-30"
                : isBehind1
                ? "top-4 scale-[0.97] opacity-70 z-20"
                : isBehind2
                ? "top-8 scale-[0.94] opacity-40 z-10"
                : "top-10 scale-[0.91] opacity-0 z-0"
            }`}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 ${typeColors[doc.color]} rounded-lg flex items-center justify-center`}>
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="poppins-bold text-[10px] text-slate-400 uppercase tracking-widest">{doc.type}</p>
                    <p className="poppins-semibold text-xs text-slate-700 leading-tight">{doc.label}</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
              <div className="space-y-2">
                {[85, 60, 75].map((w, i) => (
                  <div key={i} className="h-1.5 rounded-full bg-slate-100" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="poppins-regular text-[10px] text-slate-400">Millstone Compliance</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="poppins-bold text-[10px] text-emerald-600">Ready</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Intersection observer hook ───────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useFadeIn()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PaperworkSupportPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 lg:pt-44 pb-24 lg:pb-32 relative overflow-hidden">
        {/* Subtle radial background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.07)_0%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="poppins-medium text-sm text-emerald-700 tracking-wide">Paperwork Support · Add-on</span>
              </div>

              <h1 className="poppins-bold text-5xl lg:text-6xl xl:text-7xl text-slate-900 leading-[1.05] tracking-tight mb-8">
                Less Paperwork.
                <br />
                <span className="text-emerald-700">Same Data.</span>
              </h1>

              <p className="poppins-regular text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
                For sites I already report for. Quarterly waste returns and your regular hauliers and customers,
                done from the data I already hold. No forms filled twice.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={MAILTO}
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl poppins-semibold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-slate-900/20"
                >
                  <Mail className="w-4 h-4" />
                  Ask About Paperwork Support
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl poppins-semibold text-sm bg-white border border-slate-200 hover:border-slate-300 text-slate-700 transition-all duration-200"
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Right — animated doc stack */}
            <div className="flex flex-col items-center gap-10">
              <DocumentStack />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
                {[
                  { stat: "1", label: "Set of data, used twice" },
                  { stat: "4", label: "Quarterly returns a year" },
                  { stat: "1-1", label: "Direct line to me" },
                ].map(({ stat, label }) => (
                  <div key={label} className="text-center">
                    <p className="poppins-bold text-2xl text-slate-900">{stat}</p>
                    <p className="poppins-regular text-[11px] text-slate-400 leading-tight mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_65%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <FadeIn>
            <p className="poppins-medium text-sm text-emerald-400 tracking-widest uppercase mb-6">The Problem</p>
            <h2 className="poppins-bold text-4xl lg:text-5xl xl:text-6xl text-white leading-[1.1] tracking-tight mb-8">
              The Same Data,
              <br />
              <span className="text-emerald-400">Typed In Again.</span>
            </h2>
            <p className="poppins-regular text-lg text-white/50 leading-relaxed max-w-2xl mx-auto mb-12">
              Every load already goes on a ticket, a transfer note and now Defra&apos;s system.
              Then the quarterly return asks for it all again. Once I hold your data, I can use it for both.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { stat: "Ticket", label: "Written at the weighbridge for every load", color: "text-emerald-300" },
                { stat: "2 days", label: "To report each load to Defra", color: "text-amber-300" },
                { stat: "Quarterly", label: "Waste returns, built from the same loads", color: "text-teal-300" },
              ].map(({ stat, label, color }) => (
                <div key={stat} className="rounded-2xl bg-white/5 border border-white/10 p-6">
                  <p className={`poppins-bold text-4xl ${color} mb-2`}>{stat}</p>
                  <p className="poppins-regular text-sm text-white/50 leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Document categories ──────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="poppins-medium text-sm text-emerald-700 uppercase tracking-widest mb-4">What It Covers</p>
              <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight mb-5">
                Three Jobs,
                <span className="text-emerald-700"> Off Your Plate.</span>
              </h2>
              <p className="poppins-regular text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                Added to your monthly fee, or done per job. Agreed upfront.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {docCategories.map((cat, idx) => {
              const Icon = cat.icon
              const c = colorMap[cat.color]
              return (
                <FadeIn key={cat.label} delay={idx * 80}>
                  <div className={`rounded-3xl border ${c.border} bg-white overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 group`}>
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-0">
                      {/* Left panel */}
                      <div className={`${c.bg} p-8 lg:p-10 flex flex-col justify-between`}>
                        <div>
                          <div className={`w-12 h-12 rounded-2xl bg-white ${c.border} border flex items-center justify-center mb-5 shadow-sm`}>
                            <Icon className={`w-6 h-6 ${c.icon}`} />
                          </div>
                          <span className={`poppins-bold text-[10px] uppercase tracking-widest ${c.pill} ${c.pillBg} px-2.5 py-1 rounded-full`}>
                            {cat.label}
                          </span>
                          <h3 className="poppins-bold text-xl text-slate-900 mt-4 leading-snug">
                            {cat.headline}
                          </h3>
                        </div>
                        <a
                          href={MAILTO}
                          className="inline-flex items-center gap-2 poppins-semibold text-sm text-slate-700 hover:text-slate-900 transition-colors mt-6 group/link"
                        >
                          Ask About This
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      </div>

                      {/* Right panel — doc list */}
                      <div className="p-8 lg:p-10">
                        <p className="poppins-semibold text-xs text-slate-400 uppercase tracking-widest mb-5">
                          What&apos;s Included
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {cat.docs.map((doc) => (
                            <div key={doc} className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded-full ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <CheckCircle className={`w-3 h-3 ${c.icon}`} />
                              </div>
                              <span className="poppins-regular text-sm text-slate-700 leading-snug">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="poppins-medium text-sm text-emerald-700 uppercase tracking-widest mb-4">The Process</p>
              <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight">
                How It Works
                <span className="text-emerald-700"> in Four Steps.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ num, icon: Icon, title, body }, idx) => (
              <FadeIn key={num} delay={idx * 100}>
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="poppins-bold text-4xl text-slate-100">{num}</span>
                  </div>
                  <h3 className="poppins-bold text-base text-slate-900 mb-3 leading-snug">{title}</h3>
                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why it matters ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <div>
                <p className="poppins-medium text-sm text-emerald-700 uppercase tracking-widest mb-4">
                  Why It Helps
                </p>
                <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight mb-7 leading-[1.1]">
                  One Set of Data.
                  <br />
                  Used Twice.
                </h2>
                <p className="poppins-regular text-lg text-slate-500 leading-relaxed mb-7">
                  I already enter every load you take in. That same data is what your quarterly return
                  is built from. So instead of someone in the office adding it all up again at the end of
                  the quarter, I prepare it for you to check.
                </p>
                <p className="poppins-regular text-lg text-slate-500 leading-relaxed mb-10">
                  You stay responsible for what goes in your return. I make sure the numbers match
                  what was reported, and I explain anything that looks odd.
                </p>
                <div className="space-y-3">
                  {[
                    "Built from loads already reported to Defra",
                    "Weights taken from your weighbridge tickets",
                    "Codes match your template and your permit",
                    "Regular hauliers and customers set up early",
                    "Plain English notes on anything that changed",
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="poppins-regular text-sm text-slate-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              {/* Premium info panel */}
              <div className="bg-slate-950 rounded-3xl p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1)_0%,transparent_55%)]" />
                <div className="relative z-10">
                  <p className="poppins-semibold text-xs text-emerald-400 uppercase tracking-widest mb-6">
                    What You Receive
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Quarterly returns, prepared", sub: "Totals by waste type and code, ready for you to check" },
                      { label: "Regulars set up", sub: "Hauliers and customers on file before their first load" },
                      { label: "Your code template, kept current", sub: "Updated when you take in a new type of waste" },
                      { label: "Every Friday confirmation, kept", sub: "A clear record of what went in, and when" },
                      { label: "A real person to ask", sub: "Questions answered by me, not a call centre" },
                    ].map(({ label, sub }) => (
                      <div key={label} className="flex items-start gap-3 p-4 bg-white/5 border border-white/8 rounded-2xl">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div>
                          <p className="poppins-semibold text-sm text-white">{label}</p>
                          <p className="poppins-regular text-xs text-white/40 mt-0.5">{sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Related resources ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeIn>
            <p className="poppins-medium text-sm text-emerald-700 uppercase tracking-widest mb-8 text-center">
              Related Guides
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { title: "Digital Waste Tracking, Explained", href: "/waste-cost-savings", badge: "Guide", desc: "Who it affects, what to report, and the two-working-day deadline." },
              { title: "What I Check on Every Load",       href: "/what-we-check",      badge: "How it works", desc: "Date, weight, codes, carrier, permit and deadline." },
              { title: "Free Readiness Check",             href: "/free-check",         badge: "Free", desc: "10 quick questions. Is your site reporting properly?" },
            ].map(({ title, href, badge, desc }, idx) => (
              <FadeIn key={title} delay={idx * 80}>
                <Link href={href} className="group block bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <span className="poppins-bold text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">{badge}</span>
                  <h3 className="poppins-bold text-sm text-slate-900 mt-4 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">{title}</h3>
                  <p className="poppins-regular text-xs text-slate-500 leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-1 mt-4 text-emerald-600">
                    <span className="poppins-semibold text-xs">Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(16,185,129,0.05)_0%,transparent_100%)]" />
        <FadeIn>
          <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
            <h2 className="poppins-bold text-5xl lg:text-6xl text-slate-900 tracking-tight mb-7 leading-[1.05]">
              Less Typing.
              <br />
              <span className="text-emerald-700">Same Records.</span>
            </h2>
            <p className="poppins-regular text-lg text-slate-500 mb-10 leading-relaxed">
              Already reporting with me? Ask about adding Paperwork Support.
              New to Millstone? Start with a free two-week trial of reporting.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={MAILTO}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl poppins-semibold text-base bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-slate-900/20 w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4" />
                Ask About Paperwork Support
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/waste-contract-audit"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl poppins-semibold text-sm bg-white border border-slate-200 hover:border-slate-300 text-slate-700 transition-all duration-200 w-full sm:w-auto justify-center"
              >
                Start a Free Two-Week Trial
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  )
}
