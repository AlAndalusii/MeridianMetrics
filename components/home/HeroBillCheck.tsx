"use client"

import React, { useEffect, useRef, useState } from "react"
import { CheckCircle, AlertTriangle, Sparkles, CalendarClock, Scale } from "lucide-react"

/* ─── The example bill ────────────────────────────────────────────────────── */
type Line = {
  label: string
  detail: string
  amount: number
  save?: number
  reason?: string
}

const lines: Line[] = [
  { label: "General waste bin", detail: "1100 litre · weekly", amount: 168 },
  { label: "Lifts", detail: "13 this month", amount: 96, save: 32, reason: "Only 9 happened" },
  { label: "Bin rental", detail: "2 bins", amount: 28 },
  { label: "Extra charge", detail: "Wrong items in bin", amount: 45, save: 45, reason: "No photo proof" },
  { label: "Price rise", detail: "+12% this year", amount: 40, save: 40, reason: "Not in your contract" },
]

const startTotal = lines.reduce((sum, l) => sum + l.amount, 0)

// Phase 0 = bill lands, 1–5 = checking each line, 6 = better deal, 7 = hold
const INTRO = 1000
const PER_LINE = 1100
const RESULT = 1600
const HOLD = 4200
const LAST = lines.length + 2

/* ─── Smoothly count a number toward its target ───────────────────────────── */
function useTween(target: number, duration = 700) {
  const [value, setValue] = useState(target)
  const from = useRef(target)
  useEffect(() => {
    const start = performance.now()
    const begin = from.current
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const v = begin + (target - begin) * eased
      from.current = v
      setValue(v)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return Math.round(value)
}

export function HeroBillCheck() {
  const [phase, setPhase] = useState(0)
  const [running, setRunning] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Only play while the card is on screen; show the finished bill if motion is reduced
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(LAST)
      return
    }
    const el = rootRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.25 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    const wait =
      phase === 0 ? INTRO : phase <= lines.length ? PER_LINE : phase === lines.length + 1 ? RESULT : HOLD
    const id = setTimeout(() => setPhase((p) => (p >= LAST ? 0 : p + 1)), wait)
    return () => clearTimeout(id)
  }, [phase, running])

  const checking = phase >= 1 && phase <= lines.length ? phase - 1 : -1
  const doneCount = Math.min(Math.max(phase - 1, 0), lines.length)
  const resolved = (i: number) => phase > i + 1
  const monthlySave = lines.reduce((sum, l, i) => sum + (resolved(i) && l.save ? l.save : 0), 0)
  const total = useTween(startTotal - monthlySave)
  const save = useTween(monthlySave)
  const finished = phase > lines.length
  const yearly = monthlySave * 12

  return (
    <div ref={rootRef} className="relative" aria-label="Example: how we check a bin bill">
      {/* Soft glow behind the card */}
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgba(16,185,129,0.18)_0%,transparent_70%)] pointer-events-none" />

      <div
        key={phase === 0 ? "reset" : "run"}
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-[0_30px_80px_-20px_rgba(6,95,70,0.35)] overflow-hidden hbc-land"
      >
        {/* Header */}
        <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="poppins-semibold text-[11px] text-emerald-900 uppercase tracking-[0.15em]">Your Bin Bill</p>
              <p className="poppins-regular text-[10px] text-slate-400 mt-0.5">Example only</p>
            </div>
            <span
              className={`poppins-semibold text-[10px] px-2.5 py-1 rounded-full tabular-nums border transition-colors duration-500 ${
                finished
                  ? "text-white bg-emerald-600 border-emerald-600"
                  : "text-emerald-700 bg-emerald-50 border-emerald-100"
              }`}
            >
              {finished ? "Check done" : phase === 0 ? "Starting check" : `Checking ${doneCount + 1} of ${lines.length}`}
            </span>
          </div>
          <div className="w-full h-1 bg-emerald-50 rounded-full overflow-hidden">
            <div
              className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(doneCount / lines.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Bill lines */}
        <div className="relative px-3 sm:px-4 py-3 space-y-1.5">
          {/* Scan line follows the line being checked */}
          <div
            className="absolute left-0 right-0 h-14 bg-gradient-to-b from-transparent via-emerald-300/25 to-transparent pointer-events-none z-10 transition-all duration-700 ease-out"
            style={{
              top: `calc(0.6875rem + ${Math.max(checking, 0)} * 3.75rem)`,
              opacity: checking >= 0 ? 1 : 0,
            }}
          />
          {lines.map((l, i) => {
            const isChecking = i === checking
            const isDone = resolved(i)
            const isFlagged = isDone && !!l.save
            return (
              <div
                key={l.label}
                className={`relative flex items-center justify-between gap-3 px-3 sm:px-4 h-[3.375rem] rounded-xl border transition-all duration-500 ${
                  isChecking
                    ? "bg-emerald-50/80 border-emerald-300 scale-[1.02] shadow-[0_6px_24px_rgba(16,185,129,0.15)]"
                    : isFlagged
                    ? "bg-rose-50/70 border-rose-200"
                    : "bg-white border-slate-100"
                }`}
              >
                <div className="min-w-0">
                  <p className={`poppins-semibold text-xs truncate ${isFlagged ? "text-rose-900" : "text-slate-800"}`}>{l.label}</p>
                  <p
                    className={`poppins-regular text-[10px] truncate mt-0.5 transition-colors duration-500 ${
                      isFlagged ? "text-rose-600" : "text-slate-400"
                    }`}
                  >
                    {isFlagged ? l.reason : l.detail}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <div className="text-right leading-tight">
                    <span
                      className={`poppins-semibold text-xs tabular-nums relative transition-colors duration-500 ${
                        isFlagged ? "text-rose-400" : "text-slate-700"
                      }`}
                    >
                      £{l.amount}
                      <span
                        className="absolute left-0 right-0 top-1/2 h-px bg-rose-500 origin-left transition-transform duration-500"
                        style={{ transform: isFlagged ? "scaleX(1)" : "scaleX(0)" }}
                      />
                    </span>
                    {l.save && (
                      <span
                        className="block poppins-bold text-[10px] text-emerald-600 tabular-nums transition-all duration-500"
                        style={{ opacity: isFlagged ? 1 : 0, transform: isFlagged ? "none" : "translateY(4px)" }}
                      >
                        −£{l.save}
                      </span>
                    )}
                  </div>
                  <div className="w-4 h-4 relative">
                    {isChecking && (
                      <span className="absolute inset-0 rounded-full border-2 border-emerald-200 border-t-emerald-600 animate-spin" />
                    )}
                    {isDone && !l.save && <CheckCircle className="absolute inset-0 w-4 h-4 text-emerald-500 hbc-pop" />}
                    {isFlagged && <AlertTriangle className="absolute inset-0 w-4 h-4 text-rose-500 hbc-pop" />}
                    {!isChecking && !isDone && <span className="absolute inset-1 rounded-full bg-slate-100" />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total */}
        <div className="mx-3 sm:mx-4 mb-3 rounded-2xl bg-emerald-900 text-white px-4 sm:px-5 py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(52,211,153,0.35)_0%,transparent_55%)] pointer-events-none" />
          <div className="relative flex items-end justify-between gap-3">
            <div>
              <p className="poppins-medium text-[10px] uppercase tracking-[0.15em] text-emerald-300">You pay each month</p>
              <p className="poppins-bold text-3xl tabular-nums leading-none mt-1.5">£{total}</p>
            </div>
            <div className="text-right">
              <p className="poppins-medium text-[10px] uppercase tracking-[0.15em] text-emerald-300">You save</p>
              <p className="poppins-bold text-xl text-emerald-300 tabular-nums leading-none mt-1.5">£{save}</p>
            </div>
          </div>
        </div>

        {/* Result chips */}
        <div className="px-3 sm:px-4 pb-4 grid grid-cols-3 gap-1.5">
          {[
            { icon: Sparkles, text: `£${yearly.toLocaleString("en-GB")} a year back` },
            { icon: Scale, text: "Better deal found" },
            { icon: CalendarClock, text: "Renewal date watched" },
          ].map((c, i) => (
            <div
              key={c.text}
              className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-2 transition-all duration-500"
              style={{
                opacity: finished ? 1 : 0,
                transform: finished ? "none" : "translateY(8px)",
                transitionDelay: finished ? `${i * 140}ms` : "0ms",
              }}
            >
              <c.icon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="poppins-semibold text-[10px] leading-tight text-emerald-800">{c.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hbcLand {
          0%   { opacity: 0; transform: translateY(16px) scale(0.98); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes hbcPop {
          0%   { opacity: 0; transform: scale(0.4); }
          70%  { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        .hbc-land { animation: hbcLand 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .hbc-pop  { animation: hbcPop 0.45s cubic-bezier(0.22,1,0.36,1) both; }
      ` }} />
    </div>
  )
}
