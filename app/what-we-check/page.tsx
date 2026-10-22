"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  CalendarCheck,
  CalendarClock,
  Check,
  Recycle,
  Scale,
  ScanLine,
  Send,
  ShieldCheck,
  Truck,
  Package,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useBooking } from "@/components/BookingProvider"

/* ─── Motion helpers ──────────────────────────────────────────────────────── */
function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Flips to true once the element scrolls into view. */
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/** Steps 0 → steps-1 and loops, once `run` is true. Reduced motion jumps to the end. */
function useCycle(steps: number, ms: number, run: boolean, hold = 0) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!run) return
    if (prefersReducedMotion()) { setI(steps - 1); return }
    const wait = i === steps - 1 ? ms + hold : ms
    const id = setTimeout(() => setI((n) => (n + 1) % steps), wait)
    return () => clearTimeout(id)
  }, [i, steps, ms, run, hold])
  return [i, setI] as const
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const flow = [
  { icon: Camera, title: "You snap it", cap: "A photo on WhatsApp" },
  { icon: ScanLine, title: "I check it", cap: "Six checks, every load" },
  { icon: Send, title: "I send it", cap: "To Defra, on time" },
  { icon: CalendarCheck, title: "You get proof", cap: "Every Friday" },
]

const checks = [
  { icon: CalendarClock, title: "Date", ask: "When did it arrive?", label: "Arrived", value: "Thu 15 Oct" },
  { icon: Scale, title: "Weight", ask: "Matches the ticket?", label: "Weight", value: "8.42 t" },
  { icon: Package, title: "Waste type", ask: "What is it?", label: "Waste", value: "Mixed metals" },
  { icon: Recycle, title: "Next step", ask: "Recycled or disposed?", label: "Going to", value: "Recycling" },
  { icon: Truck, title: "Carrier", ask: "Registration number there?", label: "Carrier", value: "Reg. no. on file" },
  { icon: ShieldCheck, title: "Permit & deadline", ask: "Covered, and on time?", label: "Due", value: "End of Mon" },
]

const days = [
  { d: "Thu", tag: "Load arrives", kind: "start" },
  { d: "Fri", tag: "Day 1", kind: "count" },
  { d: "Sat", tag: "Doesn't count", kind: "skip" },
  { d: "Sun", tag: "Doesn't count", kind: "skip" },
  { d: "Mon", tag: "Day 2 · Due", kind: "due" },
] as const

const mine = ["Every load reported", "Errors fixed", "Proof every Friday", "Quarterly returns", "Records kept tidy"]
const refer = ["Waste classification", "Permit changes", "Acting as your competent manager"]

/* ─── Shared section shell, matching the homepage cards ───────────────────── */
function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] border border-emerald-100 shadow-[0_30px_80px_-40px_rgba(6,95,70,0.25)] overflow-hidden isolate ${className}`}>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_30%,black_30%,transparent_100%)]" />
      {children}
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-8 bg-emerald-400" />
      <span className="poppins-semibold text-[11px] text-emerald-600 uppercase tracking-[0.22em]">{children}</span>
    </div>
  )
}

/* ─── 1. The flow: snap → check → send → proof ────────────────────────────── */
function Flow({ run }: { run: boolean }) {
  const [step] = useCycle(flow.length, 1500, run, 1400)
  const fill = (step / (flow.length - 1)) * 100

  return (
    <div className="relative">
      {/* Track: horizontal on desktop, vertical on mobile */}
      <div className="hidden sm:block absolute top-8 left-[12.5%] right-[12.5%] h-[3px] rounded-full bg-emerald-100">
        <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-700 transition-all duration-700 wc-ease" style={{ width: `${fill}%` }} />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-600 shadow-[0_0_0_6px_rgba(16,185,129,0.18)] transition-all duration-700 wc-ease"
          style={{ left: `${fill}%` }}
        />
      </div>
      <div className="sm:hidden absolute left-8 top-8 bottom-8 w-[3px] -translate-x-1/2 rounded-full bg-emerald-100">
        <div className="w-full rounded-full bg-gradient-to-b from-emerald-400 to-emerald-700 transition-all duration-700 wc-ease" style={{ height: `${fill}%` }} />
      </div>

      <div className="relative grid sm:grid-cols-4 gap-6 sm:gap-4">
        {flow.map((f, i) => {
          const Icon = f.icon
          const on = i <= step
          const now = i === step
          return (
            <div key={f.title} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-0">
              <div className="relative flex-shrink-0">
                {now && <span className="absolute inset-0 rounded-2xl bg-emerald-400/30 wc-ping" />}
                <div
                  className={`relative w-16 h-16 rounded-2xl border flex items-center justify-center transition-all duration-500 ${
                    on
                      ? "bg-emerald-700 border-emerald-700 text-white shadow-[0_14px_30px_-10px_rgba(6,95,70,0.6)]"
                      : "bg-white border-emerald-100 text-emerald-300"
                  } ${now ? "scale-110" : "scale-100"}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="sm:mt-5">
                <p className={`poppins-bold text-base sm:text-lg transition-colors duration-500 ${on ? "text-slate-900" : "text-slate-400"}`}>{f.title}</p>
                <p className="poppins-regular text-sm text-slate-500 mt-0.5">{f.cap}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── 2. The scanner: one ticket, six checks ──────────────────────────────── */
function Scanner({ run }: { run: boolean }) {
  // 0–5 = checking that line, 6 = all done
  const [step, setStep] = useCycle(checks.length + 1, 1300, run, 2200)
  const done = step >= checks.length

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-14 items-center">
      {/* Ticket */}
      <div className="relative">
        <div className="absolute -inset-6 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(52,211,153,0.25)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative rounded-[1.75rem] bg-white border border-emerald-100 shadow-[0_40px_90px_-35px_rgba(6,95,70,0.45)] overflow-hidden">
          <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-4 border-b border-emerald-50">
            <div>
              <p className="poppins-semibold text-[10px] uppercase tracking-[0.2em] text-emerald-600">Ticket</p>
              <p className="poppins-bold text-lg text-slate-900 tabular-nums leading-tight mt-0.5">No. 004127</p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 poppins-semibold text-[11px] px-3 py-1.5 rounded-full border tabular-nums transition-all duration-500 ${
                done ? "bg-emerald-700 border-emerald-700 text-white" : "bg-emerald-50 border-emerald-100 text-emerald-700"
              }`}
            >
              {done && <Check className="w-3.5 h-3.5" />}
              {done ? "Sent to Defra" : `${step} of ${checks.length} checked`}
            </span>
          </div>

          <div className="relative p-3 sm:p-4 space-y-2">
            {/* Scan beam */}
            <div
              className="absolute left-0 right-0 h-14 pointer-events-none z-10 bg-gradient-to-b from-transparent via-emerald-300/30 to-transparent transition-all duration-700 wc-ease"
              style={{ top: `calc(0.5rem + ${Math.min(step, checks.length - 1)} * 3.5rem)`, opacity: done ? 0 : 1 }}
            />
            {checks.map((c, i) => {
              const ok = i < step
              const now = i === step
              return (
                <div
                  key={c.title}
                  className={`relative flex items-center justify-between gap-3 h-12 px-4 rounded-xl border transition-all duration-500 ${
                    now ? "bg-emerald-50 border-emerald-300 scale-[1.02]" : ok ? "bg-white border-emerald-100" : "bg-white border-slate-100"
                  }`}
                >
                  <span className="poppins-medium text-[13px] text-slate-500">{c.label}</span>
                  <span className="flex items-center gap-2.5">
                    <span className={`poppins-semibold text-[13px] tabular-nums transition-colors duration-500 ${ok || now ? "text-slate-900" : "text-slate-300"}`}>
                      {c.value}
                    </span>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${ok ? "bg-emerald-500 scale-100" : "bg-slate-100 scale-90"}`}>
                      {ok ? <Check className="w-3 h-3 text-white wc-pop" strokeWidth={3} /> : now ? <span className="w-3 h-3 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" /> : null}
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        <p className="text-center poppins-regular text-[11px] text-slate-400 mt-4">Example ticket</p>
      </div>

      {/* Six check tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {checks.map((c, i) => {
          const Icon = c.icon
          const now = i === step
          const ok = i < step
          return (
            <button
              key={c.title}
              type="button"
              onClick={() => setStep(i)}
              className={`group text-left rounded-2xl border p-4 sm:p-5 transition-all duration-500 ${
                now
                  ? "bg-emerald-700 border-emerald-700 shadow-[0_20px_44px_-18px_rgba(6,95,70,0.7)] -translate-y-1"
                  : ok
                    ? "bg-white border-emerald-200"
                    : "bg-white/70 border-slate-200 hover:border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${now ? "bg-white/15 text-white" : ok ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-400"}`}>
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className={`poppins-semibold text-[11px] tabular-nums ${now ? "text-emerald-200" : "text-slate-300"}`}>0{i + 1}</span>
              </div>
              <p className={`poppins-bold text-[15px] leading-tight ${now ? "text-white" : "text-slate-900"}`}>{c.title}</p>
              <p className={`poppins-regular text-[13px] leading-snug mt-1 ${now ? "text-emerald-100" : "text-slate-500"}`}>{c.ask}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── 3. The deadline, as a week ──────────────────────────────────────────── */
function Deadline({ run }: { run: boolean }) {
  const [step] = useCycle(days.length + 1, 900, run, 2600)

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {days.map((day, i) => {
          const shown = i < step
          const skip = day.kind === "skip"
          const due = day.kind === "due"
          return (
            <div
              key={day.d}
              className={`relative rounded-2xl border px-2 sm:px-4 pt-4 pb-5 text-center transition-all duration-700 ${
                !shown
                  ? "bg-white/60 border-slate-100 opacity-40"
                  : skip
                    ? "border-slate-200 bg-[repeating-linear-gradient(135deg,#f8fafc_0_8px,#f1f5f9_8px_16px)]"
                    : due
                      ? "bg-emerald-700 border-emerald-700 shadow-[0_20px_44px_-18px_rgba(6,95,70,0.7)] -translate-y-1"
                      : "bg-white border-emerald-200"
              }`}
            >
              <p className={`poppins-bold text-lg sm:text-2xl ${due && shown ? "text-white" : skip ? "text-slate-400" : "text-slate-900"}`}>{day.d}</p>
              <p className={`poppins-medium text-[10px] sm:text-xs leading-tight mt-1.5 ${due && shown ? "text-emerald-100" : skip ? "text-slate-400" : "text-emerald-700"}`}>
                {day.tag}
              </p>
              {day.kind === "count" && shown && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-2 py-0.5 poppins-semibold text-[9px] sm:text-[10px] text-white wc-pop">
                  I aim for here
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Clock bar */}
      <div className="relative mt-6 h-2 rounded-full bg-emerald-50 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-700 transition-all duration-700 wc-ease"
          style={{ width: `${(Math.min(step, days.length) / days.length) * 100}%` }}
        />
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function WhatWeCheckPage() {
  const { openBooking } = useBooking()
  const [loaded, setLoaded] = useState(false)
  const flowView = useInView<HTMLDivElement>(0.3)
  const scanView = useInView<HTMLDivElement>(0.25)
  const weekView = useInView<HTMLDivElement>(0.35)
  const laneView = useInView<HTMLDivElement>(0.25)
  const ctaView = useInView<HTMLDivElement>(0.3)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const rise = (delay: number, show = loaded): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "none" : "translateY(20px)",
    filter: show ? "blur(0)" : "blur(8px)",
    transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, filter 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-x-clip">
      <Navigation />

      {/* ── HERO + FLOW ────────────────────────────────────────────────────── */}
      <section className="relative pt-28 sm:pt-32 px-3 sm:px-6 pb-8">
        <Panel className="bg-gradient-to-b from-white via-white to-emerald-50/60">
          <div className="wc-drift absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[520px] -z-10 bg-[radial-gradient(ellipse,rgba(167,243,208,0.5)_0%,transparent_65%)]" />
          <div className="wc-sweep absolute inset-y-0 -left-1/3 w-1/3 -z-10 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg]" />

          <div className="px-5 sm:px-10 lg:px-16 pt-14 sm:pt-20 pb-12 sm:pb-16 text-center">
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white/80 shadow-sm pl-2.5 pr-3.5 py-1.5 mb-7"
              style={rise(0)}
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
              </span>
              <span className="poppins-semibold text-xs uppercase tracking-[0.18em] text-emerald-800">How I work</span>
            </div>

            <h1 className="poppins-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight text-slate-900">
              <span className="block" style={rise(100)}>Every Load.</span>
              <span
                className="block pb-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent wc-shine"
                style={rise(220)}
              >
                Checked, Then Sent.
              </span>
            </h1>

            <p className="poppins-regular text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mt-6 leading-relaxed" style={rise(340)}>
              You send a photo. I check it six ways. Defra gets it on time.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center" style={rise(460)}>
              <Link
                href="/free-trial"
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 px-7 py-3.5 poppins-semibold text-sm text-white shadow-[0_16px_40px_-12px_rgba(6,95,70,0.55)] transition-all duration-300 active:scale-[0.98]"
              >
                <span className="wc-btn-shine absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]" />
                <span className="relative">Start a Free Two-Week Trial</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <button
                type="button"
                onClick={() => openBooking("discovery")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 px-7 py-3.5 poppins-semibold text-sm text-emerald-700 transition-all duration-300 active:scale-[0.98]"
              >
                Book a Free 15-Minute Call
              </button>
            </div>

            <div ref={flowView.ref} className="max-w-4xl mx-auto mt-16 sm:mt-20 text-left sm:text-center" style={rise(600)}>
              <Flow run={flowView.inView} />
            </div>
          </div>
        </Panel>
      </section>

      {/* ── THE SIX CHECKS ─────────────────────────────────────────────────── */}
      <section id="checks" className="px-3 sm:px-6 py-8 scroll-mt-24">
        <Panel className="bg-white">
          <div ref={scanView.ref} className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20">
            <div className="max-w-2xl mb-10 sm:mb-14" style={rise(0, scanView.inView)}>
              <Eyebrow>What I check</Eyebrow>
              <h2 className="poppins-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-slate-900">
                Six Checks.{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Every Load.</span>
              </h2>
              <p className="poppins-regular text-base sm:text-lg text-slate-500 mt-4">Unclear photo? I ask. I never guess.</p>
            </div>
            <div style={rise(150, scanView.inView)}>
              <Scanner run={scanView.inView} />
            </div>
          </div>
        </Panel>
      </section>

      {/* ── THE DEADLINE ───────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 py-8">
        <Panel className="bg-gradient-to-b from-white to-emerald-50/50">
          <div ref={weekView.ref} className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <div style={rise(0, weekView.inView)}>
              <Eyebrow>The deadline</Eyebrow>
              <h2 className="poppins-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-slate-900">
                Two Working Days.
              </h2>
              <p className="poppins-regular text-base sm:text-lg text-slate-500 mt-4 max-w-sm">
                Counted from the day after it arrives. Weekends and bank holidays don&apos;t count.
              </p>
            </div>
            <div style={rise(150, weekView.inView)}>
              <Deadline run={weekView.inView} />
            </div>
          </div>
        </Panel>
      </section>

      {/* ── MY LANE ────────────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 py-8">
        <div ref={laneView.ref} className="max-w-7xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-5">
          <div
            className="relative rounded-[2rem] bg-gradient-to-br from-emerald-700 to-emerald-900 p-7 sm:p-10 overflow-hidden shadow-[0_30px_70px_-30px_rgba(6,95,70,0.6)]"
            style={rise(0, laneView.inView)}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_60%)] pointer-events-none" />
            <p className="relative poppins-semibold text-[11px] uppercase tracking-[0.22em] text-emerald-200">In my lane</p>
            <h3 className="relative poppins-bold text-2xl sm:text-3xl text-white mt-3 mb-7">I do this, every week.</h3>
            <div className="relative space-y-2.5">
              {mine.map((m, i) => (
                <div
                  key={m}
                  className="flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-4 py-3"
                  style={rise(200 + i * 90, laneView.inView)}
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-950" strokeWidth={3} />
                  </span>
                  <span className="poppins-semibold text-sm text-white">{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative rounded-[2rem] bg-white border-2 border-dashed border-emerald-200 p-7 sm:p-10"
            style={rise(150, laneView.inView)}
          >
            <p className="poppins-semibold text-[11px] uppercase tracking-[0.22em] text-emerald-600">Not my lane</p>
            <h3 className="poppins-bold text-2xl sm:text-3xl text-slate-900 mt-3 mb-7">Here&apos;s who to call.</h3>
            <div className="space-y-2.5">
              {refer.map((r, i) => (
                <div
                  key={r}
                  className="flex items-center justify-between gap-3 rounded-xl bg-emerald-50/60 border border-emerald-100 px-4 py-3"
                  style={rise(350 + i * 90, laneView.inView)}
                >
                  <span className="poppins-semibold text-sm text-slate-800">{r}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                </div>
              ))}
            </div>
            <p className="poppins-regular text-sm text-slate-500 mt-6">I&apos;ll introduce you to qualified experts I trust. Free.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="px-3 sm:px-6 pt-8 pb-20">
        <div
          ref={ctaView.ref}
          className="relative max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 overflow-hidden isolate shadow-[0_40px_100px_-40px_rgba(6,95,70,0.7)] px-6 py-20 sm:py-28 text-center"
          style={rise(0, ctaView.inView)}
        >
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black_20%,transparent_100%)]" />
          <div className="wc-glow absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] -z-10 bg-[radial-gradient(ellipse,rgba(52,211,153,0.35)_0%,transparent_65%)]" />

          <h2 className="poppins-bold text-4xl sm:text-6xl tracking-tight leading-[1.04] text-white">
            Want Me to{" "}
            <span className="bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-clip-text text-transparent">Check Yours?</span>
          </h2>
          <p className="poppins-regular text-lg text-emerald-100/85 max-w-md mx-auto mt-5">Two weeks free. No card. No contract.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              href="/free-trial"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white hover:bg-emerald-50 px-8 py-4 poppins-semibold text-base text-emerald-900 transition-all duration-300 active:scale-[0.98]"
            >
              Start a Free Two-Week Trial
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="https://wa.me/447762270113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/5 hover:bg-white/15 px-7 py-4 poppins-semibold text-base text-white transition-all duration-300"
            >
              WhatsApp Zak
            </a>
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wcShine { to { background-position: -200% 0; } }
        @keyframes wcSweep { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes wcDrift { 0%, 100% { transform: translate(-50%, 0) scale(1); } 50% { transform: translate(-50%, 24px) scale(1.06); } }
        @keyframes wcGlow  { 0%, 100% { opacity: 0.75; } 50% { opacity: 1; } }
        @keyframes wcBtn   { 0%, 60% { left: -50%; } 100% { left: 150%; } }
        @keyframes wcPing  { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes wcPop   { 0% { transform: scale(0.3); opacity: 0; } 70% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }

        .wc-ease { transition-timing-function: cubic-bezier(0.22,1,0.36,1); }
        .wc-shine { animation: wcShine 6s linear 1.4s infinite; }
        .wc-sweep { animation: wcSweep 10s ease-in-out infinite; }
        .wc-drift { animation: wcDrift 14s ease-in-out infinite; }
        .wc-glow { animation: wcGlow 8s ease-in-out infinite; }
        .wc-btn-shine { animation: wcBtn 3.5s ease-in-out infinite; }
        .wc-ping { animation: wcPing 1.4s cubic-bezier(0,0,0.2,1) infinite; }
        .wc-pop { animation: wcPop 0.45s cubic-bezier(0.22,1,0.36,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .wc-shine, .wc-sweep, .wc-drift, .wc-glow, .wc-btn-shine, .wc-ping, .wc-pop { animation: none !important; }
        }
      ` }} />
    </div>
  )
}
