"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  TrendingUp,
  PoundSterling,
  Trash2,
  FileCheck,
  CalendarClock,
  Receipt,
  Scale,
  BellRing,
} from "lucide-react"

/* ─── Reveal once when scrolled into view ─────────────────────────────────── */
function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Count up from 0 once visible ────────────────────────────────────────── */
function CountUp({ to, run, delay = 0 }: { to: number; run: boolean; delay?: number }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to)
      return
    }
    let raf = 0
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1200)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [run, to, delay])
  return <>{n}</>
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const areas = [
  { icon: PoundSterling, label: "Price", note: "Are you paying too much?" },
  { icon: Trash2, label: "Bins", note: "Right size? Right number?" },
  { icon: FileCheck, label: "Paperwork", note: "Is it all in order?" },
  { icon: CalendarClock, label: "Renewal", note: "When can you leave?" },
]

const services = [
  {
    icon: Receipt,
    step: "01",
    badge: "Bill Audit",
    title: "Waste Bill Audit",
    href: "/services#bill-audit",
    description: "We check every line of your bill. Wrong bins, missed lifts, charges with no proof. We find them all.",
  },
  {
    icon: Scale,
    step: "02",
    badge: "Free",
    title: "Am I Overpaying?",
    href: "/services#better-deals",
    description: "We compare your price with other licensed Birmingham collectors. Find a better deal? We do the switch.",
  },
  {
    icon: BellRing,
    step: "03",
    badge: "Renewals",
    title: "Renewal Watch",
    href: "/services#renewal-watch",
    description: "Contracts often roll over with a price rise. We track your dates and warn you in time.",
  },
]

const headlineTop = ["Your", "Free", "Waste", "Contract"]

/* ─── The health ring: four arcs fill one by one ──────────────────────────── */
function HealthRing({ run }: { run: boolean }) {
  const [lit, setLit] = useState(0)

  useEffect(() => {
    if (!run) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(areas.length)
      return
    }
    let i = 0
    const id = setInterval(() => {
      i++
      setLit(i)
      if (i >= areas.length) clearInterval(id)
    }, 650)
    return () => clearInterval(id)
  }, [run])

  const R = 88
  const C = 2 * Math.PI * R
  const gap = 10
  const seg = C / areas.length - gap

  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      {/* Ring */}
      <div className="relative aspect-square">
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(167,243,208,0.6)_0%,transparent_70%)] blur-2xl" />

        <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
          {/* Outer tick ring, slowly turning */}
          <g className="hc-spin" style={{ transformOrigin: "110px 110px" }}>
            <circle cx="110" cy="110" r="104" fill="none" stroke="rgba(16,185,129,0.3)" strokeWidth="1" strokeDasharray="1 5" />
          </g>
          {/* Track */}
          <circle cx="110" cy="110" r={R} fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="10" />
          {/* Four arcs */}
          {areas.map((a, i) => (
            <circle
              key={a.label}
              cx="110"
              cy="110"
              r={R}
              fill="none"
              stroke="url(#hcGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${i < lit ? seg : 0} ${C}`}
              strokeDashoffset={-(i * (seg + gap)) - gap / 2}
              style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.65,0,0.35,1)" }}
            />
          ))}
          <defs>
            <linearGradient id="hcGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>

        {/* Centre read-out */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="poppins-medium text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-emerald-600">
            {lit >= areas.length ? "Check done" : "Checking"}
          </p>
          <p className="poppins-bold text-5xl sm:text-6xl text-slate-900 tabular-nums leading-none mt-2">
            {lit}
            <span className="text-emerald-500/60 text-2xl sm:text-3xl">/{areas.length}</span>
          </p>
          <p className="poppins-regular text-xs text-slate-500 mt-2">areas checked</p>
        </div>
      </div>

      {/* Area chips */}
      <div className="grid grid-cols-2 gap-2.5 mt-6">
        {areas.map((a, i) => {
          const on = i < lit
          return (
            <div
              key={a.label}
              className={`flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-all duration-700 ${
                on
                  ? "bg-white border-emerald-200 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.3)]"
                  : "bg-white/60 border-slate-200"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-700 ${
                  on ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-300"
                }`}
              >
                <a.icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className={`poppins-semibold text-sm leading-tight transition-colors duration-700 ${on ? "text-slate-900" : "text-slate-400"}`}>{a.label}</p>
                <p className="poppins-regular text-[11px] leading-snug text-slate-500">{a.note}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Service card with a soft light that follows the mouse ───────────────── */
function ServiceCard({ s, index, run }: { s: (typeof services)[number]; index: number; run: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }
  return (
    <Link
      ref={ref}
      href={s.href}
      onMouseMove={onMove}
      className={`hc-card group relative block rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 overflow-hidden shadow-[0_2px_16px_rgba(6,95,70,0.05)] transition-all duration-700 hover:border-emerald-300 hover:shadow-[0_16px_40px_-12px_rgba(6,95,70,0.2)] hover:-translate-y-1 ${
        run ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: run ? `${300 + index * 120}ms` : "0ms" }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 transition-colors duration-500">
          <s.icon className="w-5 h-5 text-emerald-700 group-hover:text-white transition-colors duration-500" />
        </div>
        <span className="poppins-semibold text-[10px] uppercase tracking-[0.2em] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
          {s.badge}
        </span>
      </div>
      <p className="poppins-medium text-xs text-emerald-600/70 tabular-nums mb-1.5">{s.step}</p>
      <h3 className="poppins-bold text-xl text-slate-900 mb-2.5">{s.title}</h3>
      <p className="poppins-regular text-sm leading-relaxed text-slate-600">{s.description}</p>
      <span className="inline-flex items-center gap-1.5 mt-6 poppins-semibold text-sm text-emerald-700 group-hover:gap-2.5 transition-all duration-300">
        Learn more <ArrowRight className="w-4 h-4" />
      </span>
    </Link>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export function HealthCheckSection() {
  const head = useReveal<HTMLDivElement>(0.3)
  const ring = useReveal<HTMLDivElement>(0.35)
  const cards = useReveal<HTMLDivElement>(0.15)

  return (
    <section className="px-3 sm:px-6 py-10 sm:py-16" aria-labelledby="assessment-heading">
      <div className="relative max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-white via-emerald-50/40 to-emerald-50/70 border border-emerald-100 shadow-[0_30px_80px_-40px_rgba(6,95,70,0.25)] overflow-hidden isolate">
        {/* Backdrop: fine grid, glow and a slow light sweep */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(16,185,129,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black_30%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] -z-10 bg-[radial-gradient(ellipse,rgba(167,243,208,0.45)_0%,transparent_65%)]" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] -z-10 bg-[radial-gradient(circle,rgba(153,246,228,0.35)_0%,transparent_65%)]" />
        <div className="hc-sweep absolute inset-y-0 -left-1/3 w-1/3 -z-10 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg]" />

        <div className="px-5 sm:px-10 lg:px-16 pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-14">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
            {/* Words */}
            <div ref={head.ref} className={head.visible ? "hc-in" : ""}>
              <div className="hc-fade inline-flex items-center gap-2.5 rounded-full border border-emerald-200 bg-white/80 shadow-sm pl-2.5 pr-3.5 py-1.5 mb-7" style={{ animationDelay: "0ms" }}>
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span className="poppins-semibold text-xs uppercase tracking-[0.18em] text-emerald-800">Free Bill Check · 3 min</span>
              </div>

              <h2 id="assessment-heading" className="poppins-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-900">
                <span className="block">
                  {headlineTop.map((w, i) => (
                    <React.Fragment key={w}>
                      <span className="hc-word inline-block" style={{ animationDelay: `${120 + i * 90}ms` }}>
                        {w}
                      </span>{" "}
                    </React.Fragment>
                  ))}
                </span>
                <span className="block mt-1">
                  <span
                    className="hc-word hc-shine inline-block pb-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent"
                    style={{ animationDelay: "520ms" }}
                  >
                    Health Check.
                  </span>
                </span>
              </h2>

              <p className="hc-fade poppins-regular text-lg sm:text-xl text-slate-600 leading-relaxed mt-6 max-w-xl" style={{ animationDelay: "750ms" }}>
                Answer 10 quick questions. We&apos;ll show you if your waste deal is working <span className="text-emerald-700 poppins-semibold">for</span> you, or <span className="text-rose-600 poppins-semibold">against</span> you.
              </p>

              {/* Stats */}
              <div className="hc-fade flex items-stretch gap-6 sm:gap-10 mt-9" style={{ animationDelay: "900ms" }}>
                {[
                  { n: 4, label: "Areas" },
                  { n: 10, label: "Questions" },
                  { n: 3, label: "Minutes" },
                ].map((s, i) => (
                  <div key={s.label} className={i > 0 ? "pl-6 sm:pl-10 border-l border-emerald-200" : ""}>
                    <p className="poppins-bold text-3xl sm:text-4xl text-slate-900 tabular-nums leading-none">
                      <CountUp to={s.n} run={head.visible} delay={900 + i * 120} />
                    </p>
                    <p className="poppins-medium text-[11px] uppercase tracking-[0.18em] text-emerald-700/70 mt-2">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="hc-fade flex flex-col items-stretch sm:items-start gap-4 mt-10" style={{ animationDelay: "1050ms" }}>
                <Link
                  href="/free-check"
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-emerald-700 px-8 py-4 whitespace-nowrap poppins-semibold text-base text-white shadow-[0_20px_50px_-12px_rgba(6,95,70,0.55)] transition-all duration-300 hover:bg-emerald-800 active:scale-[0.98] min-h-[54px]"
                >
                  <span className="hc-btn-shine absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]" />
                  <span className="relative">Start Your Free Check</span>
                  <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 poppins-medium">
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-emerald-400" />3 minutes</span>
                  <span className="inline-flex items-center gap-1.5"><BadgeCheck className="w-4 h-4 text-emerald-400" />No card</span>
                  <span className="inline-flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-emerald-400" />Instant result</span>
                </div>
              </div>
            </div>

            {/* Ring */}
            <div
              ref={ring.ref}
              className={`transition-all duration-1000 ease-out ${ring.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <HealthRing run={ring.visible} />
            </div>
          </div>

          {/* Services */}
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center gap-4 mb-6">
              <p className="poppins-semibold text-xs uppercase tracking-[0.2em] text-emerald-700/70">What happens next</p>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-200 to-transparent" />
            </div>
            <div ref={cards.ref} className="grid md:grid-cols-3 gap-4">
              {services.map((s, i) => (
                <ServiceCard key={s.title} s={s} index={i} run={cards.visible} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hcWord {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes hcFade {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes hcShine { to { background-position: -200% 0; } }
        @keyframes hcSweep { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes hcBtn   { 0%, 60% { left: -50%; } 100% { left: 150%; } }
        @keyframes hcSpin  { to { transform: rotate(360deg); } }

        .hc-word, .hc-fade { opacity: 0; }
        .hc-in .hc-word { animation: hcWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .hc-in .hc-fade { animation: hcFade 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .hc-in .hc-shine { animation: hcWord 0.9s cubic-bezier(0.22,1,0.36,1) both, hcShine 6s linear 1.6s infinite; }
        .hc-sweep { animation: hcSweep 9s ease-in-out infinite; }
        .hc-btn-shine { animation: hcBtn 3.5s ease-in-out infinite; }
        .hc-spin { animation: hcSpin 60s linear infinite; }

        .hc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(360px circle at var(--mx, 50%) var(--my, 0%), rgba(16,185,129,0.09), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .hc-card:hover::before { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .hc-word, .hc-fade { opacity: 1; }
          .hc-in .hc-word, .hc-in .hc-fade, .hc-in .hc-shine,
          .hc-sweep, .hc-btn-shine, .hc-spin { animation: none !important; }
        }
      ` }} />
    </section>
  )
}
