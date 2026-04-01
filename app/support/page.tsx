"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Mail,
  Phone,
  CheckCircle,
  ChevronDown,
  Target,
  TrendingUp,
  Clock,
  Lock,
  Recycle,
  HeartPulse,
  Trash2,
  ScanSearch,
  FolderOpen,
  Layers,
  Headphones,
  ExternalLink,
  Zap,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { CONTACT_INFO } from "@/lib/constants"

// ─── Animated compliance score ring ──────────────────────────────────────────

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const [current, setCurrent] = useState(0)
  const r = 36
  const circ = 2 * Math.PI * r
  const dash = (current / 100) * circ

  useEffect(() => {
    const t = setTimeout(() => {
      let s = 0
      const id = setInterval(() => {
        s += 2
        setCurrent(Math.min(s, score))
        if (s >= score) clearInterval(id)
      }, 18)
      return () => clearInterval(id)
    }, 400)
    return () => clearTimeout(t)
  }, [score])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
          <circle
            cx="44" cy="44" r={r} fill="none"
            stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            className="transition-all duration-100"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center poppins-bold text-lg text-slate-800">
          {current}%
        </span>
      </div>
      <span className="poppins-medium text-[11px] text-slate-600 text-center">{label}</span>
    </div>
  )
}

// ─── Animated service card mockup ─────────────────────────────────────────────

function ServiceCardMockup() {
  const [activeCard, setActiveCard] = useState(0)

  const cards = [
    {
      icon: Trash2,
      title: "Duty of Care",
      status: "Active",
      items: ["WTN Records Current", "EA Carrier Verified", "EWC Codes Accurate"],
      score: 94,
      color: "#10b981",
    },
    {
      icon: HeartPulse,
      title: "Clinical Waste",
      status: "Compliant",
      items: ["HTM 07-01 Segregation", "Consignment Notes Filed", "CQC Inspection-Ready"],
      score: 89,
      color: "#0ea5e9",
    },
    {
      icon: Recycle,
      title: "Simpler Recycling",
      status: "Registered",
      items: ["4-Stream Separation", "Food Waste Collected", "Evidence Records Held"],
      score: 92,
      color: "#a855f7",
    },
  ]

  useEffect(() => {
    const t = setInterval(() => setActiveCard((a) => (a + 1) % cards.length), 3000)
    return () => clearInterval(t)
  }, [])

  const card = cards[activeCard]
  const Icon = card.icon

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div
        className="absolute inset-0 rounded-3xl blur-2xl opacity-15 transition-all duration-700"
        style={{ background: card.color }}
      />
      <div className="relative bg-slate-900 border border-slate-800/60 rounded-3xl p-7 overflow-hidden shadow-2xl shadow-slate-900/20">
        <div
          className="absolute inset-0 opacity-10 transition-all duration-700"
          style={{ background: `radial-gradient(ellipse at top right, ${card.color}, transparent 60%)` }}
        />
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${card.color}20`, border: `1px solid ${card.color}40` }}
            >
              <Icon className="w-5 h-5" style={{ color: card.color }} />
            </div>
            <div>
              <p className="poppins-bold text-sm text-white">{card.title}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: card.color }} />
                <span className="poppins-medium text-[10px]" style={{ color: card.color }}>{card.status}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="poppins-bold text-2xl text-white">{card.score}%</span>
            <p className="poppins-regular text-[10px] text-white/40">Compliance</p>
          </div>
        </div>
        <div className="relative h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
            style={{ width: `${card.score}%`, background: card.color }}
          />
        </div>
        <div className="relative space-y-2.5">
          {card.items.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: card.color }} />
              <span className="poppins-regular text-xs text-white/70">{item}</span>
            </div>
          ))}
        </div>
        <div className="relative flex items-center justify-between mt-6 pt-5 border-t border-white/8">
          <span className="poppins-regular text-[10px] text-white/30">Managed By Millstone</span>
          <span className="poppins-semibold text-[10px] text-white/50">Updated Today</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 mt-5">
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveCard(i)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === activeCard ? "24px" : "8px",
              height: "8px",
              background: i === activeCard ? card.color : "rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Stat counter ─────────────────────────────────────────────────────────────

function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let s = 0
    const steps = 60
    const id = setInterval(() => {
      s++
      setVal(Math.round((s / steps) * target))
      if (s >= steps) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [started, target])

  return (
    <div ref={ref} className="text-center">
      <p className="poppins-bold text-4xl lg:text-5xl text-slate-900">{val}{suffix}</p>
      <p className="poppins-regular text-sm text-slate-500 mt-1">{label}</p>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

const services = [
  {
    icon: ScanSearch,
    title: "Compliance Audits",
    body: "We review your setup, find weak spots, and show where costs and compliance risks can be reduced — within 48 hours.",
    href: "/services",
    icon_color: "text-emerald-600",
    icon_bg: "bg-emerald-50",
    accent: "from-emerald-400/20 to-transparent",
  },
  {
    icon: FolderOpen,
    title: "Documentation",
    body: "We organise the key records your business needs to keep waste costs controlled and paperwork in order.",
    href: "/services/documentation",
    icon_color: "text-sky-600",
    icon_bg: "bg-sky-50",
    accent: "from-sky-400/20 to-transparent",
  },
  {
    icon: Layers,
    title: "Templates",
    body: "Professionally written, ready-to-use documents — editable in Word and easy to put into practice.",
    href: "/templates",
    icon_color: "text-amber-600",
    icon_bg: "bg-amber-50",
    accent: "from-amber-400/20 to-transparent",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    body: "Waste changes tracked. Records kept current. Practical help available the same day by email.",
    href: "/support",
    icon_color: "text-violet-600",
    icon_bg: "bg-violet-50",
    accent: "from-violet-400/20 to-transparent",
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What Does A Waste Audit Actually Cover?",
    a: "We review your waste setup, records, contractor details, and key compliance risks. You get a clear written report within 48 hours showing what is working and what to fix.",
  },
  {
    q: "How Quickly Will I Get My Report?",
    a: "Your written report is delivered within 48 hours of the audit.",
  },
  {
    q: "Can You Help Us Cut Waste Costs?",
    a: "Yes. We look for overspending, poor segregation, weak contractor terms, and waste streams that are not being managed well.",
  },
  {
    q: "Do You Work With Both Property And Businesses?",
    a: "Yes. We audit care homes, property portfolios, hospitality, logistics, manufacturing, and most other business sectors.",
  },
]

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button type="button" onClick={() => setOpen(!open)} className="w-full text-left group">
      <div className="py-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-6">
          <span className="poppins-semibold text-sm sm:text-base text-slate-800 group-hover:text-emerald-700 transition-colors">{q}</span>
          <div className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${open ? "bg-emerald-700 border-emerald-700" : "bg-white border-slate-200 group-hover:border-emerald-300"}`}>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "text-white rotate-180" : "text-slate-400"}`} />
          </div>
        </div>
        {open && <p className="mt-3 poppins-regular text-sm text-slate-500 leading-relaxed pr-12">{a}</p>}
      </div>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 text-slate-900 overflow-hidden">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 lg:pt-44 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.08)_0%,transparent_100%)]" />
          <div className="hidden sm:block absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-green-300/15 rounded-full blur-3xl" />
          <div className="hidden sm:block absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-200/20 to-emerald-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="poppins-medium text-xs text-emerald-700 tracking-wider uppercase">
                  UK Compliance Specialists
                </span>
              </div>

              <h1 className="poppins-bold text-5xl lg:text-6xl xl:text-[4.5rem] text-slate-900 leading-[1.05] tracking-tight mb-6">
                Cost &amp; Compliance
                <br />
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">Made Simple.</span>
              </h1>

              <p className="poppins-regular text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
                Waste costs, duty of care, and waste records — reviewed, improved, and kept under control.
                We help UK businesses cut costs, reduce risk, and stay organised.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:hello@millstonecompliance.com?subject=Support%20Enquiry"
                  className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-700/20"
                >
                  <Mail className="w-4 h-4" />
                  Get In Touch
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href={CONTACT_INFO.tel}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl poppins-semibold text-sm bg-white border border-emerald-200 hover:border-emerald-400 text-slate-700 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            <div className="hidden lg:block">
              <ServiceCardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ───────────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter target={48} suffix="h" label="Avg Report Turnaround" />
            <StatCounter target={3} label="Key Waste Areas Covered" />
            <div className="text-center">
              <p className="poppins-bold text-4xl lg:text-5xl text-slate-900">Cost</p>
              <p className="poppins-regular text-sm text-slate-500 mt-1">Saving Opportunities Found</p>
            </div>
            <StatCounter target={100} suffix="%" label="Clear Written Reports" />
          </div>
        </div>
      </section>

      {/* ── How we help ──────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">What We Do</p>
            <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Four Ways We Help
              <span className="text-emerald-700"> Your Business.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(({ icon: Icon, title, body, href, icon_color, icon_bg, accent }) => (
              <Link
                key={title}
                href={href}
                className="group relative bg-white rounded-3xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] border border-slate-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Subtle gradient wash on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl`} />

                <div className={`relative inline-flex w-14 h-14 rounded-2xl ${icon_bg} items-center justify-center mb-7`}>
                  <Icon className={`w-7 h-7 ${icon_color}`} />
                </div>

                <h3 className="relative poppins-bold text-[17px] text-slate-900 mb-3 leading-snug">
                  {title}
                </h3>
                <p className="relative poppins-regular text-[14px] text-slate-500 leading-relaxed mb-7">{body}</p>
                <span className={`relative inline-flex items-center gap-1.5 poppins-semibold text-sm ${icon_color} group-hover:gap-3 transition-all duration-200`}>
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance dashboard visual ───────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left — Dashboard card with emerald tint */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-emerald-900/10">
              {/* Header bar */}
              <div className="bg-emerald-700 px-8 py-5 flex items-center justify-between">
                <div>
                  <p className="poppins-bold text-[10px] text-emerald-200 uppercase tracking-widest">Compliance Overview</p>
                  <p className="poppins-bold text-base text-white mt-0.5">Your Business · 2026</p>
                </div>
                <div className="flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span className="poppins-semibold text-xs text-white">Active</span>
                </div>
              </div>

              {/* Body */}
              <div className="bg-white border-x border-b border-slate-100 p-8">
                {/* Score rings */}
                <div className="grid grid-cols-3 gap-4 mb-7 pb-7 border-b border-slate-100">
                  <ScoreRing score={94} label="Duty of Care" color="#059669" />
                  <ScoreRing score={89} label="Clinical" color="#0ea5e9" />
                  <ScoreRing score={92} label="Recycling" color="#7c3aed" />
                </div>

                {/* Activity log */}
                <p className="poppins-semibold text-[10px] text-slate-400 uppercase tracking-widest mb-4">Recent Activity</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Waste Transfer Notes Filed", time: "Today", dot: "#059669" },
                    { label: "Clinical Waste Consignment Logged", time: "3 Days Ago", dot: "#0ea5e9" },
                    { label: "HMO Waste Plan Updated", time: "1 Week Ago", dot: "#d97706" },
                    { label: "Simpler Recycling Evidence Saved", time: "2 Weeks Ago", dot: "#7c3aed" },
                  ].map(({ label, time, dot }) => (
                    <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                        <span className="poppins-regular text-xs text-slate-700">{label}</span>
                      </div>
                      <span className="poppins-regular text-[11px] text-slate-400">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — copy */}
            <div>
              <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-4">Full Visibility</p>
              <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight mb-5 leading-[1.1]">
                Know Where
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent"> You Stand.</span>
              </h2>
              <p className="poppins-regular text-lg text-slate-600 leading-relaxed mb-7">
                We give every client a view of their waste costs, records, and compliance position — and help keep everything on track as rules change.
              </p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Target,     text: "Gap analysis across waste costs, records, and legal duties" },
                  { icon: TrendingUp, text: "Ongoing review as waste rules evolve" },
                  { icon: Clock,      text: "48-hour turnaround on all audit reports" },
                  { icon: Lock,       text: "Clear written evidence you can actually use" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="poppins-regular text-sm text-slate-600">{text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/quiz"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 active:scale-95 shadow-sm"
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact channels ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">Contact Us</p>
            <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight">
              Reach Us Directly.
            </h2>
            <p className="poppins-regular text-lg text-slate-500 mt-3">
              No bots. No call centres. A real person replies the same day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Email — featured */}
            <a
              href="mailto:hello@millstonecompliance.com"
              className="group relative block rounded-2xl overflow-hidden border-2 border-emerald-600 bg-white hover:shadow-xl hover:shadow-emerald-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-1.5 bg-emerald-600 w-full" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <p className="poppins-bold text-[10px] uppercase tracking-widest text-emerald-700">Email</p>
                </div>
                <p className="poppins-bold text-sm text-slate-900 mb-1 break-all">hello@millstonecompliance.com</p>
                <p className="poppins-regular text-xs text-slate-500 mb-6">Typically Within 2 Hours</p>
                <span className="inline-flex items-center gap-2 poppins-semibold text-sm text-emerald-700 group-hover:gap-3 transition-all">
                  Send Email
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>

            {/* Phone */}
            <a
              href={CONTACT_INFO.tel}
              className="group relative block rounded-2xl overflow-hidden border-2 border-slate-200 bg-white hover:border-slate-900 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-1.5 bg-slate-800 w-full" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <p className="poppins-bold text-[10px] uppercase tracking-widest text-slate-500">Phone</p>
                </div>
                <p className="poppins-bold text-sm text-slate-900 mb-1">{CONTACT_INFO.phone}</p>
                <p className="poppins-regular text-xs text-slate-500 mb-6">Mon–Fri · 9am–5:30pm</p>
                <span className="inline-flex items-center gap-2 poppins-semibold text-sm text-slate-700 group-hover:gap-3 transition-all">
                  Call Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>

            {/* Free Assessment */}
            <a
              href="/quiz"
              className="group relative block rounded-2xl overflow-hidden border-2 border-slate-200 bg-white hover:border-amber-500 hover:shadow-xl hover:shadow-amber-50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-1.5 bg-amber-500 w-full" />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <p className="poppins-bold text-[10px] uppercase tracking-widest text-amber-600">Free Assessment</p>
                </div>
                <p className="poppins-bold text-sm text-slate-900 mb-1">3-Minute Check</p>
                <p className="poppins-regular text-xs text-slate-500 mb-6">Instant Cost &amp; Risk View</p>
                <span className="inline-flex items-center gap-2 poppins-semibold text-sm text-amber-600 group-hover:gap-3 transition-all">
                  Start Assessment
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ + CTA banner ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="poppins-medium text-xs text-emerald-700 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="poppins-bold text-4xl lg:text-5xl text-slate-900 tracking-tight">Common Questions.</h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 px-6 divide-y divide-slate-100 mb-8">
            {faqs.map((f) => <FaqRow key={f.q} q={f.q} a={f.a} />)}
          </div>

          {/* CTA banner */}
          <div className="relative bg-emerald-700 rounded-3xl p-8 sm:p-10 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_55%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="poppins-bold text-2xl sm:text-3xl text-white leading-snug mb-2">
                  Let&apos;s Get Your Waste Setup Under Control.
                </p>
                <p className="poppins-regular text-emerald-200 text-sm leading-relaxed">
                  Email us your situation. We will tell you what is working, what is not, and what to do next — within hours.
                </p>
              </div>
              <a
                href="mailto:hello@millstonecompliance.com?subject=Compliance%20Enquiry"
                className="flex-shrink-0 group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl poppins-semibold text-sm bg-white text-emerald-700 hover:bg-emerald-50 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-900/20 whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                hello@millstonecompliance.com
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
            <p className="relative z-10 poppins-regular text-xs text-emerald-300/70 mt-5">
              Or call{" "}
              <a href={CONTACT_INFO.tel} className="text-emerald-200 hover:text-white transition-colors">
                {CONTACT_INFO.phone}
              </a>
              {" "}· Mon–Fri, 9am–5:30pm
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
