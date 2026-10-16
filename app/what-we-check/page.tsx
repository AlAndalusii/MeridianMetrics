"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Receipt,
  Trash2,
  Truck,
  Camera,
  TrendingUp,
  CalendarClock,
  FileCheck,
  ListChecks,
  Scale,
  ShieldCheck,
  Phone,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

/* ─── Reveal on scroll ────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const heroWords = ["dates", "weights", "codes", "carriers", "permits", "deadlines"]

const checks = [
  {
    icon: CalendarClock,
    title: "Date in",
    ask: "When did it arrive?",
    body: "The date the load came in starts the clock. I check it on every ticket, so the deadline is worked out right.",
    line: { label: "Date received", detail: "Thursday" },
  },
  {
    icon: Scale,
    title: "Weight",
    ask: "Does it match the ticket?",
    body: "I take the weight straight from your weighbridge ticket. If a photo is hard to read, I ask you rather than guess.",
    line: { label: "Net weight", detail: "From the weighbridge" },
  },
  {
    icon: Receipt,
    title: "EWC code",
    ask: "What is the waste?",
    body: "Every waste has a six-digit code. I use the template we set up together, so the same waste gets the same code.",
    line: { label: "Waste code", detail: "17 04 05 · Iron and steel" },
  },
  {
    icon: ListChecks,
    title: "R or D code",
    ask: "What happens to it next?",
    body: "R means recovery, D means disposal. I match each load to what your site actually does with that waste.",
    line: { label: "Treatment", detail: "R4 · Recycling of metals" },
  },
  {
    icon: Truck,
    title: "Who brought it",
    ask: "Which carrier and customer?",
    body: "Your regular hauliers and customers are set up in advance, so their details go in right every time.",
    line: { label: "Carrier", detail: "Regular haulier" },
  },
  {
    icon: ShieldCheck,
    title: "Permit and deadline",
    ask: "Is it covered, and on time?",
    body: "I check the codes sit inside your permit, then submit the load before the two-working-day deadline.",
    line: { label: "Submitted", detail: "Before the deadline" },
  },
]

const youGet = [
  { icon: FileCheck,  title: "Every load submitted", desc: "Entered and sent to Defra before the deadline." },
  { icon: ListChecks, title: "A Friday confirmation", desc: "A list of everything submitted that week." },
  { icon: Camera,     title: "A quick question",     desc: "If a photo is unclear, I ask. I never guess." },
]

/* ─── Rotating word in the hero ───────────────────────────────────────────── */
function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setI((n) => (n + 1) % heroWords.length), 1800)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-block">
      <span
        key={heroWords[i]}
        className="block pb-[0.14em] -mb-[0.14em] bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-[wordIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
      >
        {heroWords[i]}.
      </span>
    </span>
  )
}

/* ─── The example ticket that lights up as you scroll ─────────────────────── */
function ExampleBill({ active, seen }: { active: number; seen: number }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(209,250,229,0.55)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative bg-white rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden">
        {/* Scan line */}
        <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-emerald-300/20 to-transparent pointer-events-none scan-line z-10" />

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="poppins-semibold text-[11px] text-emerald-900 uppercase tracking-[0.15em]">Weighbridge Ticket</p>
              <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Example only</p>
            </div>
            <span className="poppins-semibold text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full tabular-nums">
              Checked {seen} of {checks.length}
            </span>
          </div>
          <div className="w-full h-1 bg-emerald-50 rounded-full overflow-hidden">
            <div
              className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(seen / checks.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lines */}
        <div className="p-4 space-y-2">
          {checks.map((c, i) => {
            const isActive = i === active
            const isSeen = i < seen
            return (
              <div
                key={c.title}
                className={`relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-500 ${
                  isActive
                    ? "bg-emerald-50 border-emerald-300 shadow-[0_6px_24px_rgba(16,185,129,0.15)] scale-[1.02]"
                    : "bg-white border-slate-100"
                }`}
              >
                <div
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-emerald-500 transition-all duration-500 origin-center"
                  style={{ transform: isActive ? "scaleY(1)" : "scaleY(0)" }}
                />
                <div className="min-w-0">
                  <p className={`poppins-semibold text-xs transition-colors duration-500 ${isActive ? "text-emerald-900" : "text-slate-700"}`}>{c.line.label}</p>
                  <p className="poppins-regular text-[10px] text-slate-400 mt-0.5">{c.line.detail}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="h-1.5 w-12 rounded-full bg-slate-100" />
                  <CheckCircle
                    className={`w-4 h-4 transition-all duration-500 ${isSeen ? "text-emerald-500 scale-100" : "text-slate-200 scale-90"}`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* The question we ask */}
        <div className="px-6 pb-6">
          <div className="relative h-14 rounded-xl bg-emerald-700 overflow-hidden">
            {checks.map((c, i) => (
              <div
                key={c.ask}
                className="absolute inset-0 flex items-center gap-3 px-4"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "none" : i < active ? "translateY(-100%)" : "translateY(100%)",
                  transition: "opacity 0.45s ease, transform 0.55s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <c.icon className="w-4 h-4 text-emerald-200 flex-shrink-0" />
                <p className="poppins-semibold text-sm text-white">
                  <span className="text-emerald-300">I ask:</span> {c.ask}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function WhatWeCheckPage() {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const hero = useReveal(0.05)
  const getRef = useReveal(0.15)
  const ctaRef = useReveal(0.2)

  // Light up the ticket line for whichever step sits in the middle of the screen
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const i = Number((e.target as HTMLElement).dataset.index)
          setActive(i)
          setSeen((s) => Math.max(s, i + 1))
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    stepRefs.current.forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />

        <div ref={hero.ref} className="max-w-4xl mx-auto relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7 transition-all duration-700"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">A Simple Guide</span>
          </div>

          <h1
            className="poppins-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-slate-900 mb-6 transition-all duration-700 delay-100"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(20px)" }}
          >
            I check the <RotatingWord />
          </h1>

          <p
            className="poppins-regular text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(16px)" }}
          >
            Every ticket you send me has a few key details. Here are the six things I check on every load before it goes to Defra.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center transition-all duration-700 delay-300"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
          >
            <a
              href="#checks"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-95"
            >
              Show Me
              <ArrowRight className="w-4 h-4 rotate-90 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <Link
              href="/send-your-bill"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              Send Me Your Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* ── THE SIX CHECKS ON EVERY LOAD (scroll story) ─────────────────────── */}
      <section id="checks" className="relative px-6 py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 lg:mb-4">
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The six checks</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Load by load.{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Nothing guessed.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
            {/* Steps */}
            <div>
              {checks.map((c, i) => {
                const Icon = c.icon
                const isActive = i === active
                return (
                  <div
                    key={c.title}
                    ref={(el) => { stepRefs.current[i] = el }}
                    data-index={i}
                    className="lg:min-h-[60vh] flex items-center py-6 lg:py-0"
                  >
                    <div className={`w-full transition-all duration-500 ${isActive ? "lg:opacity-100" : "lg:opacity-35"}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? "bg-emerald-700 shadow-lg shadow-emerald-700/20" : "bg-emerald-50"}`}>
                          <Icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? "text-white" : "text-emerald-600"}`} />
                        </div>
                        <span className="poppins-bold text-xs text-emerald-400 tabular-nums tracking-widest">0{i + 1}</span>
                      </div>
                      <h3 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mb-3">{c.title}</h3>
                      <p className="poppins-regular text-base sm:text-lg text-slate-500 leading-relaxed max-w-md mb-4">{c.body}</p>
                      <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 poppins-semibold text-xs text-emerald-800">
                        <span className="text-emerald-500">I ask:</span> {c.ask}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Sticky ticket — desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-[calc(50vh-230px)]">
                <ExampleBill active={active} seen={seen} />
              </div>
            </div>
          </div>

          {/* Also checked */}
          <div className="mt-10 lg:mt-0 flex flex-wrap justify-center items-center gap-3">
            <span className="poppins-medium text-sm text-slate-400">Also covered:</span>
            {["Your paper transfer notes still kept", "Rule changes, explained to you"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-emerald-100 rounded-full text-xs text-emerald-700 poppins-medium shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <div ref={getRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: getRef.visible ? 1 : 0, transform: getRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">What you get</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Three things. That&apos;s it.</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {youGet.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group bg-white rounded-2xl border border-slate-100 p-7 text-center hover:border-emerald-200 hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] transition-all duration-500"
                  style={{
                    opacity: getRef.visible ? 1 : 0,
                    transform: getRef.visible ? "none" : "translateY(24px)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-emerald-700 flex items-center justify-center mx-auto mb-5 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="poppins-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/30 rounded-full blur-[80px]" />
        <div
          ref={ctaRef.ref}
          className="max-w-3xl mx-auto relative z-10 text-center transition-all duration-700"
          style={{ opacity: ctaRef.visible ? 1 : 0, transform: ctaRef.visible ? "none" : "translateY(20px)" }}
        >
          <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
            Want me to report yours?
          </h2>
          <p className="poppins-regular text-emerald-100 text-lg mb-9 max-w-xl mx-auto">
            Two weeks free. Send me your tickets, or let me call you and go through how your site reports now.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/send-your-bill"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 poppins-bold text-sm rounded-xl transition-all duration-300 shadow-lg active:scale-95"
            >
              Send Me Your Tickets
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/send-your-bill#call"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call Me Instead
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wordIn {
          0%   { transform: translateY(0.35em); opacity: 0; }
          100% { transform: translateY(0);      opacity: 1; }
        }
        @keyframes scanDown {
          0%   { top: -4rem; }
          100% { top: 100%; }
        }
        .scan-line { animation: scanDown 3.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .scan-line { animation: none; display: none; }
        }
      ` }} />
    </div>
  )
}
