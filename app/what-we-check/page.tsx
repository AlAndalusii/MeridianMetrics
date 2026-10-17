"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  Truck,
  Camera,
  CalendarClock,
  FileCheck,
  ListChecks,
  Scale,
  ShieldCheck,
  Phone,
  Receipt,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

/* ─── Motion helpers ──────────────────────────────────────────────────────── */
const EASE = "cubic-bezier(0.22,1,0.36,1)"

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Flips to true once the element scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) { setInView(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/**
 * Writes a 0→1 scroll progress to the element as the CSS variable --p,
 * without re-rendering React. `start`/`end` are viewport fractions for the
 * element's top edge (1 = bottom of screen, 0 = top of screen).
 */
function useScrollVar<T extends HTMLElement>(start = 1, end = 0.25) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) { el.style.setProperty("--p", "1"); return }
    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = (start * vh - rect.top) / ((start - end) * vh)
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [start, end])
  return ref
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const heroWords = ["Dates", "Weights", "Codes", "Carriers", "Permits", "Deadlines"]

const checks = [
  {
    icon: CalendarClock,
    title: "Date In",
    ask: "When did it arrive?",
    body: "The date the load came in starts the clock. I check it on every ticket, so the deadline is worked out right.",
    line: { label: "Date received", value: "Thu 15 Oct" },
  },
  {
    icon: Scale,
    title: "Weight",
    ask: "Does it match the ticket?",
    body: "I take the weight straight from your weighbridge ticket. If a photo is hard to read, I ask you rather than guess.",
    line: { label: "Net weight", value: "8.42 t" },
  },
  {
    icon: Receipt,
    title: "EWC Code",
    ask: "What is the waste?",
    body: "Every waste has a six-digit code. I use the template we set up together, so the same waste gets the same code.",
    line: { label: "Waste code", value: "17 04 05" },
  },
  {
    icon: ListChecks,
    title: "R or D Code",
    ask: "What happens to it next?",
    body: "R means recovery, D means disposal. I match each load to what your site actually does with that waste.",
    line: { label: "Treatment", value: "R4" },
  },
  {
    icon: Truck,
    title: "Who Brought It",
    ask: "Which carrier and customer?",
    body: "Your regular hauliers and customers are set up in advance, so their details go in right every time.",
    line: { label: "Carrier", value: "Regular haulier" },
  },
  {
    icon: ShieldCheck,
    title: "Permit and Deadline",
    ask: "Is it covered, and on time?",
    body: "I check the codes sit inside your permit, then submit the load before the two-working-day deadline.",
    line: { label: "Submitted", value: "By end of Mon" },
  },
]

const youGet = [
  { icon: FileCheck,  title: "Every Load Submitted",  desc: "Entered and sent to Defra before the deadline." },
  { icon: ListChecks, title: "A Friday Confirmation", desc: "A list of everything submitted that week." },
  { icon: Camera,     title: "A Quick Question",      desc: "If a photo is unclear, I ask. I never guess." },
]

const statement =
  "I never guess. If a photo is unclear, I ask. Every load is checked six ways, then sent to Defra before the deadline."

/* ─── Hero: rotating word in a masked slot ────────────────────────────────── */
function RotatingWord() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setI((n) => (n + 1) % heroWords.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom -mb-[0.13em]">
      {/* Invisible longest word keeps the width steady */}
      <span className="invisible">Deadlines.</span>
      {heroWords.map((w, idx) => (
        <span
          key={w}
          aria-hidden={idx !== i}
          className="absolute inset-x-0 top-0 text-center bg-gradient-to-b from-emerald-500 to-emerald-700 bg-clip-text text-transparent"
          style={{
            transform: idx === i ? "translateY(0)" : idx === (i - 1 + heroWords.length) % heroWords.length ? "translateY(-105%)" : "translateY(105%)",
            opacity: idx === i ? 1 : 0,
            filter: idx === i ? "blur(0)" : "blur(6px)",
            transition: `transform 0.9s ${EASE}, opacity 0.7s ${EASE}, filter 0.7s ${EASE}`,
          }}
        >
          {w}.
        </span>
      ))}
    </span>
  )
}

/* ─── The ticket ──────────────────────────────────────────────────────────── */
function Ticket({ active, seen, compact = false }: { active: number; seen: number; compact?: boolean }) {
  const done = seen >= checks.length && active === checks.length - 1
  return (
    <div className="relative rounded-[28px] bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_40px_80px_-30px_rgba(15,23,42,0.25),0_12px_24px_-12px_rgba(15,23,42,0.08)] overflow-hidden">
      {/* Header */}
      <div className={`${compact ? "px-5 pt-5 pb-4" : "px-7 pt-7 pb-5"} border-b border-slate-100`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="poppins-semibold text-[11px] text-slate-400 uppercase tracking-[0.2em]">Weighbridge Ticket</p>
            <p className="poppins-bold text-lg text-slate-900 mt-1 tabular-nums">No. 004127</p>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 poppins-semibold text-[11px] tabular-nums"
            style={{
              background: done ? "rgb(5 150 105)" : "rgb(241 245 249)",
              color: done ? "white" : "rgb(71 85 105)",
              transition: `background 0.6s ${EASE}, color 0.6s ${EASE}`,
            }}
          >
            {done ? <Check className="w-3.5 h-3.5" /> : null}
            {done ? "Ready to Submit" : `${seen} of ${checks.length} Checked`}
          </div>
        </div>
        <div className="mt-5 h-[3px] w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
            style={{ width: `${(seen / checks.length) * 100}%`, transition: `width 0.9s ${EASE}` }}
          />
        </div>
      </div>

      {/* Lines */}
      <ul className={compact ? "p-3" : "p-4"}>
        {checks.map((c, i) => {
          const isActive = i === active
          const isSeen = i < seen
          return (
            <li
              key={c.title}
              className="relative flex items-center justify-between gap-4 rounded-2xl px-4 py-3.5"
              style={{
                background: isActive ? "rgb(236 253 245)" : "transparent",
                transform: isActive ? "scale(1.015)" : "scale(1)",
                transition: `background 0.6s ${EASE}, transform 0.6s ${EASE}`,
              }}
            >
              <span className="poppins-medium text-[13px] text-slate-500">{c.line.label}</span>
              <span className="flex items-center gap-3">
                <span
                  className="poppins-semibold text-[13px] tabular-nums"
                  style={{ color: isSeen ? "rgb(15 23 42)" : "rgb(203 213 225)", transition: `color 0.6s ${EASE}` }}
                >
                  {c.line.value}
                </span>
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{
                    background: isSeen ? "rgb(16 185 129)" : "rgb(241 245 249)",
                    transform: isSeen ? "scale(1)" : "scale(0.8)",
                    transition: `background 0.5s ${EASE}, transform 0.5s ${EASE}`,
                  }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} style={{ opacity: isSeen ? 1 : 0, transition: "opacity 0.4s" }} />
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      {/* The question */}
      <div className={compact ? "px-3 pb-3" : "px-4 pb-4"}>
        <div className="relative h-14 overflow-hidden rounded-2xl bg-slate-900">
          {checks.map((c, i) => (
            <div
              key={c.ask}
              className="absolute inset-0 flex items-center gap-3 px-5"
              style={{
                opacity: i === active ? 1 : 0,
                transform: i === active ? "none" : i < active ? "translateY(-60%)" : "translateY(60%)",
                filter: i === active ? "blur(0)" : "blur(4px)",
                transition: `opacity 0.5s ${EASE}, transform 0.7s ${EASE}, filter 0.5s ${EASE}`,
              }}
            >
              <c.icon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <p className="poppins-medium text-sm text-white">
                <span className="text-slate-400">I ask </span>{c.ask}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Statement that lights up word by word as you scroll ─────────────────── */
function ScrollStatement() {
  const ref = useScrollVar<HTMLParagraphElement>(0.85, 0.3)
  const words = statement.split(" ")
  return (
    <p
      ref={ref}
      className="poppins-bold text-3xl sm:text-5xl md:text-6xl leading-[1.12] tracking-tight text-slate-900 [--p:0]"
    >
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block mr-[0.25em]"
          style={{
            // Each word fades in over its own slice of the scroll
            opacity: `clamp(0.12, calc(var(--p) * ${words.length + 4} - ${i}), 1)`,
          }}
        >
          {w}
        </span>
      ))}
    </p>
  )
}

/* ─── Card with a soft light that follows the cursor ──────────────────────── */
function SpotlightCard({ children, delay, show }: { children: React.ReactNode; delay: number; show: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--x", `${e.clientX - r.left}px`)
    el.style.setProperty("--y", `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-[28px] bg-white border border-slate-200/80 p-8 sm:p-9 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,95,70,0.35)]"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? undefined : "translateY(28px)",
        transition: `opacity 0.9s ${EASE} ${delay}ms, transform 0.9s ${EASE} ${delay}ms, box-shadow 0.5s ${EASE}, translate 0.5s ${EASE}`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), rgba(16,185,129,0.10), transparent 60%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function WhatWeCheckPage() {
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const tiltRef = useScrollVar<HTMLDivElement>(1, 0.35)
  const railRef = useScrollVar<HTMLDivElement>(0.5, -0.9)
  const getRef = useInView<HTMLDivElement>(0.2)
  const ctaRef = useInView<HTMLDivElement>(0.3)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

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

  const rise = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(24px)",
    filter: loaded ? "blur(0)" : "blur(8px)",
    transition: `opacity 1.1s ${EASE} ${delay}ms, transform 1.1s ${EASE} ${delay}ms, filter 1.1s ${EASE} ${delay}ms`,
  })

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 sm:pt-44 px-6 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 h-[520px] w-[900px] max-w-[140vw] rounded-full bg-[radial-gradient(closest-side,rgba(167,243,208,0.55),transparent)] blur-2xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-6" style={rise(0)}>
            What I Check
          </p>

          <h1 className="poppins-bold text-[2.9rem] leading-[1.04] sm:text-7xl md:text-[5.5rem] tracking-[-0.035em] text-slate-900">
            <span className="block" style={rise(100)}>I Check the</span>
            <span className="block" style={rise(220)}><RotatingWord /></span>
          </h1>

          <p className="poppins-regular text-lg sm:text-[1.35rem] text-slate-500 max-w-2xl mx-auto mt-8 leading-relaxed" style={rise(360)}>
            Six simple checks on every load, before it goes to Defra. Nothing guessed. Nothing missed.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center" style={rise(480)}>
            <Link
              href="/send-your-bill"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 poppins-semibold text-sm text-white hover:bg-slate-800 transition-colors duration-300"
            >
              Send Me Your Tickets
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#checks"
              className="group inline-flex items-center gap-1.5 px-5 py-3.5 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800"
            >
              See the Six Checks
              <ArrowRight className="w-4 h-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Ticket that tilts flat as you scroll */}
        <div className="relative max-w-xl mx-auto mt-16 sm:mt-24 pb-24 sm:pb-32 [perspective:1600px]" style={rise(620)}>
          <div
            ref={tiltRef}
            className="[--p:0] will-change-transform"
            style={{
              transform: "rotateX(calc((1 - var(--p)) * 24deg)) scale(calc(0.9 + var(--p) * 0.1)) translateY(calc((1 - var(--p)) * 40px))",
              transformOrigin: "50% 100%",
            }}
          >
            <Ticket active={checks.length - 1} seen={checks.length} />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>
      </section>

      {/* ── THE SIX CHECKS (scroll story) ──────────────────────────────────── */}
      <section id="checks" className="relative px-6 pb-24 sm:pb-32 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14 lg:mb-6">
            <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-4">The Six Checks</p>
            <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.05] text-slate-900">
              Load by Load.{" "}
              <span className="text-slate-400">Nothing Guessed.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-24">
            {/* Steps with a progress rail */}
            <div ref={railRef} className="relative [--p:0]">
              <div className="hidden lg:block absolute left-0 top-[30vh] bottom-[30vh] w-px bg-slate-200">
                <div className="absolute inset-x-0 top-0 bg-emerald-500 origin-top h-full" style={{ transform: "scaleY(var(--p))" }} />
              </div>

              {checks.map((c, i) => {
                const Icon = c.icon
                const isActive = i === active
                return (
                  <div
                    key={c.title}
                    ref={(el) => { stepRefs.current[i] = el }}
                    data-index={i}
                    className="lg:min-h-[64vh] flex items-center py-5 lg:py-0"
                  >
                    <div className="w-full lg:pl-12">
                      <div className={`lg:transition-all lg:duration-700 ${isActive ? "lg:opacity-100 lg:translate-x-0" : "lg:opacity-30 lg:-translate-x-1"}`}>
                        <div className="flex items-center gap-5 mb-5">
                          <div
                            className="relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center"
                            style={{
                              background: isActive ? "rgb(15 23 42)" : "rgb(236 253 245)",
                              transition: `background 0.6s ${EASE}`,
                            }}
                          >
                            <Icon className="w-5 h-5" style={{ color: isActive ? "rgb(110 231 183)" : "rgb(5 150 105)", transition: `color 0.6s ${EASE}` }} />
                          </div>
                          <span className="poppins-semibold text-[13px] text-slate-400 tabular-nums">0{i + 1} / 06</span>
                        </div>
                        <h3 className="poppins-bold text-3xl sm:text-[2.6rem] tracking-[-0.02em] text-slate-900 mb-4">{c.title}</h3>
                        <p className="poppins-regular text-lg text-slate-500 leading-relaxed max-w-md mb-5">{c.body}</p>
                        <p className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200/80 px-4 py-2 poppins-medium text-sm text-slate-700">
                          <span className="text-emerald-600">I ask</span> {c.ask}
                        </p>

                        {/* Mobile: the matching ticket line */}
                        <div className="lg:hidden mt-5 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 shadow-sm">
                          <span className="poppins-medium text-[13px] text-slate-500">{c.line.label}</span>
                          <span className="flex items-center gap-2 poppins-semibold text-[13px] text-slate-900 tabular-nums">
                            {c.line.value}
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Sticky ticket — desktop */}
            <div className="hidden lg:block">
              <div className="sticky top-[calc(50vh-260px)]">
                <Ticket active={active} seen={seen} />
                <p className="mt-5 text-center poppins-regular text-[13px] text-slate-400">Example ticket. Your real ones are checked the same way.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATEMENT ──────────────────────────────────────────────────────── */}
      <section className="px-6 py-28 sm:py-40 bg-slate-50/70 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <ScrollStatement />
          <div className="mt-12 flex flex-wrap gap-3">
            {["Paper transfer notes still kept", "Rule changes explained to you", "Two working days, every time"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200/80 px-4 py-2 poppins-medium text-sm text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ───────────────────────────────────────────────────── */}
      <section className="px-6 py-28 sm:py-36">
        <div ref={getRef.ref} className="max-w-6xl mx-auto">
          <div
            className="max-w-3xl mb-14"
            style={{
              opacity: getRef.inView ? 1 : 0,
              transform: getRef.inView ? "none" : "translateY(24px)",
              transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
            }}
          >
            <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-4">What You Get</p>
            <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.05] text-slate-900">
              Three Things. <span className="text-slate-400">That&apos;s It.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {youGet.map((item, i) => {
              const Icon = item.icon
              return (
                <SpotlightCard key={item.title} delay={150 + i * 130} show={getRef.inView}>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-slate-900 flex items-center justify-center mb-10 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-300 transition-colors duration-500" />
                  </div>
                  <p className="poppins-semibold text-[13px] text-slate-400 tabular-nums mb-2">0{i + 1}</p>
                  <h3 className="poppins-bold text-2xl tracking-[-0.01em] text-slate-900 mb-3">{item.title}</h3>
                  <p className="poppins-regular text-base text-slate-500 leading-relaxed">{item.desc}</p>
                </SpotlightCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24">
        <div
          ref={ctaRef.ref}
          className="relative max-w-6xl mx-auto overflow-hidden rounded-[36px] bg-slate-950 px-6 py-24 sm:py-32 text-center"
          style={{
            opacity: ctaRef.inView ? 1 : 0,
            transform: ctaRef.inView ? "none" : "translateY(32px) scale(0.98)",
            transition: `opacity 1.1s ${EASE}, transform 1.1s ${EASE}`,
          }}
        >
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[820px] max-w-[160%] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.45),transparent)] wwc-glow" />
          <div className="relative">
            <h2 className="poppins-bold text-4xl sm:text-6xl md:text-7xl tracking-[-0.035em] leading-[1.04] text-white">
              Want Me to
              <br />
              <span className="bg-gradient-to-r from-emerald-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">Report Yours?</span>
            </h2>
            <p className="poppins-regular text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mt-7 leading-relaxed">
              Two weeks free. Send me your tickets, or let me call you and go through how your site reports now.
            </p>
            <div className="mt-11 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/send-your-bill"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 poppins-semibold text-sm text-slate-900 hover:bg-emerald-50 transition-colors duration-300"
              >
                Send Me Your Tickets
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/send-your-bill#call"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 poppins-semibold text-sm text-white hover:bg-white/10 transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Me Instead
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wwcGlow {
          0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
          50%      { opacity: 1;    transform: translate(-50%, -50%) scale(1.08); }
        }
        .wwc-glow { animation: wwcGlow 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .wwc-glow { animation: none; }
        }
      ` }} />
    </div>
  )
}
