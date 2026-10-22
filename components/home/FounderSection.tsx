"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Camera, Check, Clock, Compass, FileCheck } from "lucide-react"

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
// The admin that comes with a waste permit. Only the first job stays with the business.
const jobs = [
  { label: "Snap the ticket", stays: true },
  { label: "Report the load to Defra" },
  { label: "Fix any errors" },
  { label: "Quarterly return" },
  { label: "Records ready for the regulator" },
]

const promises = [
  { icon: Clock, title: "On time", line: "Every load, every week." },
  { icon: FileCheck, title: "Proven", line: "Proof every Friday." },
  { icon: Compass, title: "Honest", line: "Not our lane? We'll say who to call." },
]

const sectors = [
  "Scrap & metal",
  "Transfer stations",
  "Skip yards",
  "Soil & aggregates",
  "Wood recyclers",
  "Builders & groundworks",
  "Vehicle dismantlers",
  "Garages",
  "Manufacturers",
  "Farms",
  "Landscapers",
  "Tree surgeons",
]

const CYCLE = 4600

/* ─── Who does the admin: today vs with Millstone ─────────────────────────── */
function DeskScene({ run }: { run: boolean }) {
  const [withUs, setWithUs] = useState(false)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])

  useEffect(() => {
    if (!run || paused || reduced) return
    const id = setTimeout(() => setWithUs((w) => !w), CYCLE)
    return () => clearTimeout(id)
  }, [run, paused, reduced, withUs])

  const onDesk = withUs ? 1 : jobs.length

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(52,211,153,0.28)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative rounded-[2rem] bg-white/85 backdrop-blur-xl border border-emerald-100 shadow-[0_40px_90px_-35px_rgba(6,95,70,0.45)] p-5 sm:p-7 overflow-hidden">
        {/* Light pass on every switch */}
        <div key={String(withUs)} className="fm-pass absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent via-emerald-200/40 to-transparent pointer-events-none" />

        {/* Toggle */}
        <div className="relative grid grid-cols-2 p-1 rounded-2xl bg-slate-100/80 border border-slate-200/70">
          <span
            className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-[0_6px_16px_-6px_rgba(15,23,42,0.25)] transition-transform duration-500 fm-ease"
            style={{ transform: withUs ? "translateX(100%)" : "none" }}
          />
          {["Today", "With Millstone"].map((t, i) => {
            const on = (i === 1) === withUs
            return (
              <button
                key={t}
                type="button"
                onClick={() => setWithUs(i === 1)}
                aria-pressed={on}
                className={`relative z-10 py-2.5 poppins-semibold text-[13px] transition-colors duration-300 ${on ? "text-emerald-900" : "text-slate-400 hover:text-slate-600"}`}
              >
                {t}
              </button>
            )
          })}
        </div>

        {/* Timer */}
        <div className="h-0.5 mt-3 rounded-full bg-emerald-50 overflow-hidden" aria-hidden="true">
          {run && !paused && !reduced && (
            <div key={String(withUs)} className="fm-timer h-full bg-gradient-to-r from-emerald-300 to-emerald-600" style={{ animationDuration: `${CYCLE}ms` }} />
          )}
        </div>

        {/* Count */}
        <div className="flex items-end justify-between mt-6 mb-5">
          <div>
            <p className="poppins-medium text-[10px] uppercase tracking-[0.22em] text-slate-400">On your desk</p>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span key={onDesk} className="fm-num poppins-bold text-6xl sm:text-7xl leading-none tabular-nums text-slate-900">
                {onDesk}
              </span>
              <span className="poppins-semibold text-sm text-slate-400">{onDesk === 1 ? "job" : "jobs"}</span>
            </div>
          </div>
          <span
            className={`poppins-semibold text-[11px] px-3 py-1.5 rounded-full border transition-all duration-500 ${
              withUs ? "bg-emerald-700 border-emerald-700 text-white" : "bg-amber-50 border-amber-200 text-amber-700"
            }`}
          >
            {withUs ? "Handled" : "Every load"}
          </span>
        </div>

        {/* Jobs */}
        <div className="space-y-2">
          {jobs.map((j, i) => {
            const ours = withUs && !j.stays
            const delay = `${(withUs ? i : jobs.length - 1 - i) * 90}ms`
            return (
              <div
                key={j.label}
                className={`flex items-center justify-between gap-3 h-12 px-3.5 rounded-2xl border transition-all duration-500 ${
                  ours
                    ? "bg-emerald-50/80 border-emerald-200"
                    : j.stays && withUs
                      ? "bg-white border-emerald-300 shadow-[0_8px_22px_-10px_rgba(16,185,129,0.5)]"
                      : "bg-white border-slate-200"
                }`}
                style={{ transitionDelay: delay }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      ours ? "bg-emerald-600 text-white" : j.stays ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"
                    }`}
                    style={{ transitionDelay: delay }}
                  >
                    {j.stays ? <Camera className="w-3.5 h-3.5" /> : ours ? <Check className="w-3.5 h-3.5 fm-pop" key="c" /> : <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                  </span>
                  <span
                    className={`poppins-medium text-[13px] truncate transition-colors duration-500 ${ours ? "text-emerald-900/50 line-through decoration-emerald-300" : "text-slate-800"}`}
                    style={{ transitionDelay: delay }}
                  >
                    {j.label}
                  </span>
                </div>

                {/* Owner swaps from You to Millstone */}
                <span className="relative h-6 w-[78px] overflow-hidden flex-shrink-0">
                  <span
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-100 poppins-semibold text-[10px] text-slate-500 transition-transform duration-500 fm-ease"
                    style={{ transform: ours ? "translateY(-120%)" : "none", transitionDelay: delay }}
                  >
                    You
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center rounded-full bg-emerald-700 poppins-semibold text-[10px] text-white transition-transform duration-500 fm-ease"
                    style={{ transform: ours ? "none" : "translateY(120%)", transitionDelay: delay }}
                  >
                    Millstone
                  </span>
                </span>
              </div>
            )
          })}
        </div>

        <p className="poppins-regular text-[11px] text-slate-400 mt-5 text-center">
          Every load to Defra within two working days, since 1 October 2026.
        </p>
      </div>
    </div>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export function FounderSection() {
  const head = useReveal<HTMLDivElement>(0.25)
  const scene = useReveal<HTMLDivElement>(0.3)

  return (
    <section className="px-3 sm:px-6 py-10 sm:py-16" aria-labelledby="why-heading">
      <div className="relative max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-white via-white to-emerald-50/60 border border-emerald-100 shadow-[0_30px_80px_-40px_rgba(6,95,70,0.25)] overflow-hidden isolate">
        {/* Backdrop: drifting aurora, fine grid, slow light sweep */}
        <div className="fm-drift absolute -top-32 -right-24 w-[620px] h-[620px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(110,231,183,0.35)_0%,transparent_65%)]" />
        <div className="fm-drift-rev absolute -bottom-40 -left-24 w-[560px] h-[560px] -z-10 rounded-full bg-[radial-gradient(circle,rgba(153,246,228,0.3)_0%,transparent_65%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_70%_40%,black_30%,transparent_100%)]" />
        <div className="fm-sweep absolute inset-y-0 -left-1/3 w-1/3 -z-10 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-[-20deg]" />

        <div className="px-5 sm:px-10 lg:px-16 pt-14 sm:pt-20 lg:pt-24 pb-10 sm:pb-12">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-center">
            {/* Words */}
            <div ref={head.ref} className={head.visible ? "fm-in" : ""}>
              <div className="fm-fade flex items-center gap-3 mb-8" style={{ animationDelay: "0ms" }}>
                <div className="fm-line h-px w-8 bg-emerald-400 origin-left" />
                <span className="poppins-semibold text-[11px] text-emerald-600 uppercase tracking-[0.22em]">Why Millstone exists</span>
              </div>

              <h2 id="why-heading" className="poppins-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-900">
                <span className="block">
                  {["Waste", "rules", "grew."].map((w, i) => (
                    <React.Fragment key={w}>
                      <span className="fm-word inline-block" style={{ animationDelay: `${120 + i * 90}ms` }}>
                        {w}
                      </span>{" "}
                    </React.Fragment>
                  ))}
                </span>
                <span className="block mt-1">
                  <span
                    className="fm-word fm-shine inline-block pb-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent"
                    style={{ animationDelay: "420ms" }}
                  >
                    Your team didn&apos;t.
                  </span>
                </span>
              </h2>

              <p className="fm-fade poppins-regular text-lg sm:text-xl text-slate-600 leading-relaxed mt-7 max-w-md" style={{ animationDelay: "640ms" }}>
                So we built Millstone: a waste person for every business with a permit, without hiring one.
              </p>

              {/* Promises */}
              <div className="mt-10 space-y-3 max-w-md">
                {promises.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <div
                      key={p.title}
                      className="fm-fade group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white/80 backdrop-blur px-4 py-3.5 shadow-sm hover:border-emerald-300 hover:shadow-[0_12px_30px_-14px_rgba(6,95,70,0.35)] hover:-translate-y-0.5 transition-all duration-300"
                      style={{ animationDelay: `${800 + i * 130}ms` }}
                    >
                      <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 group-hover:border-emerald-700 transition-colors duration-300">
                        <Icon className="w-[18px] h-[18px] text-emerald-700 group-hover:text-white transition-colors duration-300" />
                      </span>
                      <div className="min-w-0">
                        <p className="poppins-bold text-[15px] text-slate-900 leading-tight">{p.title}</p>
                        <p className="poppins-regular text-sm text-slate-500 leading-snug mt-0.5">{p.line}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="fm-fade mt-9" style={{ animationDelay: "1250ms" }}>
                <Link href="/about" className="group inline-flex items-center gap-2 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800">
                  Meet the founder
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Scene */}
            <div
              ref={scene.ref}
              className={`transition-all duration-1000 ease-out ${scene.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <DeskScene run={scene.visible} />
            </div>
          </div>
        </div>

        {/* Who it's for: a slow ribbon of sectors */}
        <div className="relative border-t border-emerald-100/80 bg-white/50 py-5">
          <p className="sr-only">Built for: {sectors.join(", ")}</p>
          <div className="flex items-center gap-6" aria-hidden="true">
            <span className="hidden sm:block pl-10 lg:pl-16 poppins-semibold text-[11px] uppercase tracking-[0.22em] text-emerald-600 whitespace-nowrap">Built for</span>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
              <div className="fm-track flex w-max gap-2.5">
                {[...sectors, ...sectors].map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-100 bg-white poppins-medium text-xs text-emerald-800 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fmWord {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes fmFade {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes fmLine  { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes fmShine { to { background-position: -200% 0; } }
        @keyframes fmSweep { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes fmDrift { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-40px, 30px) scale(1.08); } }
        @keyframes fmPass  { from { transform: translateY(0); } to { transform: translateY(900px); } }
        @keyframes fmTimer { from { width: 0%; } to { width: 100%; } }
        @keyframes fmNum   { 0% { opacity: 0; transform: translateY(0.4em) scale(0.9); filter: blur(6px); } 100% { opacity: 1; transform: none; filter: blur(0); } }
        @keyframes fmPop   { 0% { transform: scale(0.3); opacity: 0; } 70% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fmScroll { to { transform: translateX(-50%); } }

        .fm-word, .fm-fade { opacity: 0; }
        .fm-in .fm-word { animation: fmWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .fm-in .fm-fade { animation: fmFade 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .fm-in .fm-line { animation: fmLine 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .fm-in .fm-shine { animation: fmWord 0.9s cubic-bezier(0.22,1,0.36,1) both, fmShine 6s linear 1.6s infinite; }
        .fm-sweep { animation: fmSweep 10s ease-in-out infinite; }
        .fm-drift { animation: fmDrift 16s ease-in-out infinite; }
        .fm-drift-rev { animation: fmDrift 19s ease-in-out infinite reverse; }
        .fm-pass { animation: fmPass 1.4s cubic-bezier(0.45,0,0.2,1) both; }
        .fm-timer { animation-name: fmTimer; animation-timing-function: linear; animation-fill-mode: both; }
        .fm-num { animation: fmNum 0.6s cubic-bezier(0.22,1,0.36,1) both; }
        .fm-pop { animation: fmPop 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .fm-track { animation: fmScroll 45s linear infinite; }
        .fm-track:hover { animation-play-state: paused; }
        .fm-ease { transition-timing-function: cubic-bezier(0.22,1,0.36,1); }

        @media (prefers-reduced-motion: reduce) {
          .fm-word, .fm-fade { opacity: 1; }
          .fm-in .fm-word, .fm-in .fm-fade, .fm-in .fm-line, .fm-in .fm-shine,
          .fm-sweep, .fm-drift, .fm-drift-rev, .fm-pass, .fm-num, .fm-pop, .fm-track { animation: none !important; }
          .fm-track { flex-wrap: wrap; width: auto; }
        }
      ` }} />
    </section>
  )
}
