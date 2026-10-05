"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Building,
  CheckCircle,
  KeyRound,
  Receipt,
  ShieldCheck,
  Truck,
  Zap,
  MapPin,
  Phone,
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

/* ─── Data ────────────────────────────────────────────────────────────────── */
const groups = [
  { icon: Receipt, label: "Small Businesses", sub: "A free waste bill check. No saving, no fee." },
  { icon: KeyRound, label: "Landlords", sub: "Vetted contractors for clearances, waste and compliance jobs." },
  { icon: Building, label: "Letting Agents", sub: "One call for the jobs between tenants, done by people I trust." },
  { icon: Truck, label: "Waste Firms", sub: "New local customers, once you pass my checks." },
  { icon: Zap, label: "Urgent Jobs & Surveys", sub: "Urgent clearances and survey specialists, found fast." },
]

const trust = [
  { icon: BadgeCheck, label: "Vetted Partners" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: MapPin, label: "Birmingham Based" },
  { icon: Phone, label: "Direct Line" },
]

// Hub geometry (SVG units). Five groups sit on a circle around Zak.
const SIZE = 400
const CX = SIZE / 2
const CY = SIZE / 2
const R = 148
const nodes = groups.map((_, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
})

/* ─── The hub: one call in the middle, five groups around it ─────────────── */
function ConnectorHub({ run }: { run: boolean }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (!run || paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % groups.length), 2800)
    return () => clearInterval(id)
  }, [run, paused])

  const current = groups[active]
  const CurrentIcon = current.icon

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_45%,rgba(167,243,208,0.5)_0%,transparent_70%)] pointer-events-none rounded-3xl" />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] border border-emerald-100 shadow-[0_30px_80px_-30px_rgba(6,95,70,0.3)] p-5 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="poppins-bold text-sm text-emerald-900">Who I help</h3>
            <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Waste and compliance, one call</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="poppins-semibold text-[10px] text-emerald-600">5 groups</span>
          </div>
        </div>

        {/* Hub */}
        <div className="relative aspect-square w-full max-w-[400px] mx-auto">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
            <defs>
              <linearGradient id="fsLine" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <radialGradient id="fsCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
                <stop offset="100%" stopColor="rgba(52,211,153,0)" />
              </radialGradient>
            </defs>

            {/* Slow turning orbit */}
            <g className="fs-spin" style={{ transformOrigin: `${CX}px ${CY}px` }}>
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(16,185,129,0.25)" strokeWidth="1" strokeDasharray="2 6" />
            </g>
            <circle cx={CX} cy={CY} r={R - 52} fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="1" />
            <circle cx={CX} cy={CY} r="90" fill="url(#fsCore)" />

            {/* Spokes draw in, the active one lights up */}
            {nodes.map((n, i) => {
              const len = R
              const on = i === active
              return (
                <line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={n.x}
                  y2={n.y}
                  stroke={on ? "url(#fsLine)" : "rgba(16,185,129,0.22)"}
                  strokeWidth={on ? 2.5 : 1.25}
                  strokeLinecap="round"
                  strokeDasharray={len}
                  strokeDashoffset={run ? 0 : len}
                  style={{
                    transition: `stroke-dashoffset 1s cubic-bezier(0.65,0,0.35,1) ${300 + i * 120}ms, stroke-width 0.5s ease`,
                  }}
                />
              )
            })}

            {/* A pulse travels out along the active spoke */}
            {run && !reduced && (
              <circle key={active} r="5" fill="#10b981">
                <animate attributeName="cx" from={CX} to={nodes[active].x} dur="1.1s" fill="freeze" />
                <animate attributeName="cy" from={CY} to={nodes[active].y} dur="1.1s" fill="freeze" />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="1.1s" fill="freeze" />
              </circle>
            )}
          </svg>

          {/* Centre: Zak */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${run ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-full bg-emerald-400/30 fs-ping" />
              <div className="relative w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-[0_16px_40px_-10px_rgba(6,95,70,0.6)] flex flex-col items-center justify-center text-center border-4 border-white">
                <span className="poppins-bold text-white text-base sm:text-lg leading-none">Zak</span>
                <span className="poppins-medium text-emerald-100 text-[9px] sm:text-[10px] mt-1 uppercase tracking-[0.15em]">One call</span>
              </div>
            </div>
          </div>

          {/* Group nodes */}
          {groups.map((g, i) => {
            const Icon = g.icon
            const on = i === active
            const n = nodes[i]
            return (
              <button
                key={g.label}
                type="button"
                onClick={() => setActive(i)}
                onFocus={() => {
                  setActive(i)
                  setPaused(true)
                }}
                onBlur={() => setPaused(false)}
                aria-pressed={on}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 w-[84px] sm:w-[100px] focus:outline-none transition-all duration-700 ${run ? "opacity-100" : "opacity-0"}`}
                style={{
                  left: `${(n.x / SIZE) * 100}%`,
                  top: `${(n.y / SIZE) * 100}%`,
                  transitionDelay: run ? `${700 + i * 120}ms` : "0ms",
                }}
              >
                <span
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    on
                      ? "bg-emerald-700 border-emerald-700 text-white scale-110 shadow-[0_10px_24px_-6px_rgba(6,95,70,0.55)]"
                      : "bg-white border-emerald-100 text-emerald-600 shadow-sm hover:border-emerald-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </span>
                <span
                  className={`poppins-semibold text-[10px] sm:text-[11px] leading-tight text-center transition-colors duration-500 ${
                    on ? "text-emerald-900" : "text-emerald-700/60"
                  }`}
                >
                  {g.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active group read-out */}
        <div className="mt-2 rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 min-h-[84px]">
          <div key={active} className="fs-swap flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-emerald-100 flex items-center justify-center flex-shrink-0">
              <CurrentIcon className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="min-w-0">
              <p className="poppins-semibold text-sm text-emerald-900 leading-tight">{current.label}</p>
              <p className="poppins-regular text-[13px] text-slate-600 leading-snug mt-1">{current.sub}</p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-4" aria-hidden="true">
            {groups.map((g, i) => (
              <div key={g.label} className="flex-1 h-1 rounded-full bg-emerald-100 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 ${i === active && !paused && !reduced ? "fs-fill" : ""}`}
                  style={{ width: i < active || (i === active && (paused || reduced)) ? "100%" : i === active ? undefined : "0%" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-4 pt-4 border-t border-emerald-50 flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
          <p className="poppins-regular text-[11px] text-emerald-600/80">Free bill check · No saving, no fee</p>
        </div>
      </div>

      {/* Floating stat */}
      <div className="absolute -top-4 -right-2 sm:-right-5 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-3 shadow-xl animate-float-slow">
        <p className="poppins-bold text-xl text-emerald-900 leading-none">1-1</p>
        <p className="poppins-regular text-[10px] text-emerald-500 mt-1">Direct access</p>
      </div>
    </div>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export function FounderSection() {
  const head = useReveal<HTMLDivElement>(0.25)
  const hub = useReveal<HTMLDivElement>(0.3)

  return (
    <section className="px-3 sm:px-6 py-10 sm:py-16" aria-labelledby="founder-heading">
      <div className="relative max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-white via-white to-emerald-50/60 border border-emerald-100 shadow-[0_30px_80px_-40px_rgba(6,95,70,0.25)] overflow-hidden isolate">
        {/* Backdrop: fine grid, glow and a slow light sweep */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_75%_40%,black_30%,transparent_100%)]" />
        <div className="absolute -top-40 right-0 w-[700px] h-[500px] -z-10 bg-[radial-gradient(ellipse,rgba(167,243,208,0.4)_0%,transparent_65%)]" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] -z-10 bg-[radial-gradient(circle,rgba(153,246,228,0.25)_0%,transparent_65%)]" />
        <div className="fs-sweep absolute inset-y-0 -left-1/3 w-1/3 -z-10 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg]" />

        <div className="px-5 sm:px-10 lg:px-16 py-14 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center">
            {/* Words */}
            <div ref={head.ref} className={head.visible ? "fs-in" : ""}>
              <div className="fs-fade flex items-center gap-3 mb-8" style={{ animationDelay: "0ms" }}>
                <div className="h-px w-8 bg-emerald-400" />
                <span className="poppins-semibold text-[11px] text-emerald-600 uppercase tracking-[0.22em]">Why I started Millstone</span>
              </div>

              <h2 id="founder-heading" className="poppins-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-900">
                <span className="block">
                  {["One", "call."].map((w, i) => (
                    <React.Fragment key={w}>
                      <span className="fs-word inline-block" style={{ animationDelay: `${120 + i * 90}ms` }}>
                        {w}
                      </span>{" "}
                    </React.Fragment>
                  ))}
                </span>
                <span className="block mt-1">
                  <span
                    className="fs-word fs-shine inline-block pb-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent"
                    style={{ animationDelay: "360ms" }}
                  >
                    People I&apos;ve checked.
                  </span>
                </span>
              </h2>

              <p className="fs-fade poppins-regular text-lg sm:text-xl text-slate-700 leading-relaxed mt-7 max-w-xl" style={{ animationDelay: "600ms" }}>
                Millstone Compliance is a new Birmingham business. I started it to make waste and compliance simple, using people I&apos;ve checked myself.
              </p>

              <p className="fs-fade poppins-regular text-base text-slate-500 leading-relaxed mt-4 max-w-xl" style={{ animationDelay: "720ms" }}>
                I&apos;m Zak. I hold a Certificate in Circular Economy from the Cambridge Institute for Sustainability Leadership, and I worked at HMRC. There I learned to read rules, check records and spot numbers that don&apos;t add up.
              </p>

              {/* Credentials */}
              <div className="fs-fade grid sm:grid-cols-2 gap-3 mt-8 max-w-xl" style={{ animationDelay: "840ms" }}>
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 px-3.5 py-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center p-2 flex-shrink-0">
                    <Image src="/University of Cambridge new Logo Vector.svg" alt="University of Cambridge" width={28} height={28} className="object-contain w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="poppins-semibold text-[13px] text-emerald-900 leading-tight">Cambridge Institute</p>
                    <p className="poppins-regular text-[11px] text-emerald-600/80 leading-tight mt-0.5">Circular Economy certificate</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white/80 px-3.5 py-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center p-1.5 flex-shrink-0">
                    <Image src="/Screenshot 2025-08-31 at 21.43.30.png" alt="HMRC" width={30} height={30} className="object-contain w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="poppins-semibold text-[13px] text-emerald-900 leading-tight">Worked at HMRC</p>
                    <p className="poppins-regular text-[11px] text-emerald-600/80 leading-tight mt-0.5">Rules, records and numbers</p>
                  </div>
                </div>
              </div>

              {/* Promise */}
              <div className="fs-fade mt-8 pl-5 border-l-2 border-emerald-400 max-w-xl" style={{ animationDelay: "960ms" }}>
                <p className="poppins-semibold text-base sm:text-lg text-emerald-900 leading-relaxed">
                  Local. Plain English. A direct line to me. Always upfront about how I get paid.
                </p>
                <p className="poppins-medium text-sm text-emerald-600 mt-2">Zak, Founder</p>
              </div>

              {/* Trust chips */}
              <div className="fs-fade flex flex-wrap gap-2 mt-8" style={{ animationDelay: "1080ms" }}>
                {trust.map(({ icon: Icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs text-emerald-800 poppins-medium">
                    <Icon className="w-3.5 h-3.5 text-emerald-500" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="fs-fade mt-9" style={{ animationDelay: "1200ms" }}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800"
                >
                  More about me and how I vet partners
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Hub */}
            <div
              ref={hub.ref}
              className={`transition-all duration-1000 ease-out ${hub.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <ConnectorHub run={hub.visible} />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fsWord {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes fsFade {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes fsShine { to { background-position: -200% 0; } }
        @keyframes fsSweep { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes fsSpin  { to { transform: rotate(360deg); } }
        @keyframes fsPing  { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.7); opacity: 0; } }
        @keyframes fsFill  { from { width: 0%; } to { width: 100%; } }
        @keyframes fsSwap  { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

        .fs-word, .fs-fade { opacity: 0; }
        .fs-in .fs-word { animation: fsWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .fs-in .fs-fade { animation: fsFade 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .fs-in .fs-shine { animation: fsWord 0.9s cubic-bezier(0.22,1,0.36,1) both, fsShine 6s linear 1.6s infinite; }
        .fs-sweep { animation: fsSweep 10s ease-in-out infinite; }
        .fs-spin { animation: fsSpin 80s linear infinite; }
        .fs-ping { animation: fsPing 2.4s cubic-bezier(0,0,0.2,1) infinite; }
        .fs-fill { animation: fsFill 2.8s linear both; }
        .fs-swap { animation: fsSwap 0.5s cubic-bezier(0.22,1,0.36,1) both; }

        @media (prefers-reduced-motion: reduce) {
          .fs-word, .fs-fade { opacity: 1; }
          .fs-in .fs-word, .fs-in .fs-fade, .fs-in .fs-shine,
          .fs-sweep, .fs-spin, .fs-ping, .fs-fill, .fs-swap { animation: none !important; }
        }
      ` }} />
    </section>
  )
}
