"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight, TrendingDown, AlertTriangle, CheckCircle, Zap, Lock,
  BarChart3, Building2, Heart, Package, ChevronRight, Minus, Plus,
  ShieldAlert, PoundSterling, FileWarning, Users,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useBooking } from "@/components/BookingProvider"

/* ─── Hooks ───────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
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

function useCount(target: number, active: boolean, duration = 1600) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

/* ─── ROI Calculator ──────────────────────────────────────────────────────── */
function ROICalc() {
  const [spend, setSpend] = useState(12000)
  const low  = Math.round(spend * 0.20)
  const high = Math.round(spend * 0.40)
  const roi  = Math.round(((low + high) / 2 - 195) / 195 * 100)
  return (
    <div className="bg-slate-900 rounded-2xl p-7 border border-slate-700/50 shadow-2xl">
      <p className="text-slate-400 text-xs poppins-semibold uppercase tracking-widest mb-1">Your Potential Savings</p>
      <p className="text-white poppins-bold text-xl mb-6">Annual waste spend: <span className="text-emerald-400">£{spend.toLocaleString()}</span></p>

      {/* Slider */}
      <div className="relative mb-6">
        <input
          type="range" min={2000} max={100000} step={1000}
          value={spend} onChange={e => setSpend(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-emerald-500"
          style={{ background: `linear-gradient(to right, #059669 0%, #059669 ${(spend - 2000) / 980}%, #1e293b ${(spend - 2000) / 980}%, #1e293b 100%)` }}
        />
        <div className="flex justify-between text-[10px] text-slate-500 poppins-regular mt-1.5">
          <span>£2k</span><span>£100k</span>
        </div>
      </div>

      {/* Output */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Low estimate", val: `£${low.toLocaleString()}`, color: "text-emerald-400" },
          { label: "High estimate", val: `£${high.toLocaleString()}`, color: "text-emerald-300" },
          { label: "Audit ROI", val: `${roi}×`, color: "text-amber-400" },
        ].map(c => (
          <div key={c.label} className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-4 text-center">
            <p className={`poppins-bold text-lg ${c.color}`}>{c.val}</p>
            <p className="text-slate-500 text-[10px] poppins-regular mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      <p className="text-slate-500 text-xs poppins-regular text-center">
        Based on 20–40% typical overpayment. Audit cost: £195.
      </p>
    </div>
  )
}

/* ─── Animated cost scanner widget ───────────────────────────────────────── */
function CostScanner() {
  const streams = [
    { label: "Clinical Waste",   current: "£503/t", after: "£160/t", saving: "£343",  bad: true  },
    { label: "Mixed Recycling",  current: "£190/t", after: "£80/t",  saving: "£110",  bad: true  },
    { label: "Food Waste",       current: "£210/t", after: "£95/t",  saving: "£115",  bad: true  },
    { label: "Dry Recyclables",  current: "£65/t",  after: "£0/t",   saving: "£65",   bad: false },
  ]
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
      <div className="bg-slate-800 px-5 py-3.5 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs poppins-semibold text-white">Cost Analysis Scan</span>
        </div>
        <span className="text-[10px] text-slate-400 poppins-regular">Example 40-bed care home</span>
      </div>

      <div className="p-4 space-y-2.5">
        {streams.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-xl px-4 py-3 border flex items-center justify-between ${s.bad ? "bg-red-950/30 border-red-800/30" : "bg-emerald-950/30 border-emerald-800/30"}`}
            style={{ animation: `fadeInUp 0.4s ease both`, animationDelay: `${i * 0.12}s` }}
          >
            <div>
              <p className={`text-xs poppins-semibold ${s.bad ? "text-red-200" : "text-emerald-200"}`}>{s.label}</p>
              <p className="text-[10px] poppins-regular text-slate-400 mt-0.5">{s.current} → {s.after}</p>
            </div>
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${s.bad ? "bg-red-800/40 animate-pulse" : "bg-emerald-800/40"}`}>
              {s.bad
                ? <><TrendingDown className="w-3 h-3 text-red-400" /><span className="text-[10px] text-red-300 poppins-bold">−{s.saving}</span></>
                : <><CheckCircle className="w-3 h-3 text-emerald-400" /><span className="text-[10px] text-emerald-300 poppins-bold">OK</span></>
              }
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-slate-400 poppins-regular">Potential annual saving</span>
          <span className="text-sm poppins-bold text-emerald-400">£4,635</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2 mb-3">
          <div className="h-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000" style={{ width: "43%" }} />
        </div>
        <p className="text-[10px] text-slate-500 poppins-regular text-center">43% of current annual waste spend</p>
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function WasteCostSavingsPage() {
  const { openBooking } = useBooking()

  const hero      = useReveal(0.05)
  const prob      = useReveal(0.1)
  const cases     = useReveal(0.1)
  const tables    = useReveal(0.1)
  const howRef    = useReveal(0.1)
  const roiRef    = useReveal(0.1)
  const whyRef    = useReveal(0.1)
  const proofRef  = useReveal(0.1)
  const ctaRef    = useReveal(0.1)

  const stat1 = useCount(40,  hero.visible)
  const stat2 = useCount(503, hero.visible)
  const stat3 = useCount(30,  hero.visible)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-6 bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px]" />

        <div
          ref={hero.ref}
          className="max-w-6xl mx-auto relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6 transition-all duration-700"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs poppins-semibold text-emerald-300 uppercase tracking-wider">Independent Audit Data</span>
              </div>

              <h1
                className="poppins-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-5 transition-all duration-700 delay-100"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(20px)" }}
              >
                How UK Businesses{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Cut Waste Costs 20–40%
                </span>
              </h1>

              <p
                className="poppins-regular text-emerald-100/70 text-lg mb-8 max-w-lg leading-relaxed transition-all duration-700 delay-200"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(16px)" }}
              >
                Independent audits find where money leaks — backed by NHS data, real case studies, and sector-level cost tables.
              </p>

              {/* Stat row */}
              <div
                className="grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-300"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
              >
                {[
                  { val: `${stat1}%`,  label: "Typical overpayment", accent: "text-emerald-400" },
                  { val: `£${stat2}`,  label: "NHS clinical/tonne",  accent: "text-red-400" },
                  { val: `£${stat3}k`, label: "Hutchinsons saving",  accent: "text-amber-400" },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                    <p className={`poppins-bold text-2xl ${s.accent}`}>{s.val}</p>
                    <p className="text-[10px] text-slate-400 poppins-regular mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-400"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
              >
                <button
                  onClick={() => openBooking("snapshot")}
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white poppins-bold text-sm rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/30"
                >
                  Book £195 Snapshot <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <Link
                  href="/quiz"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 poppins-semibold text-sm rounded-xl transition-all duration-200"
                >
                  Free Savings Estimate <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: animated scanner */}
            <div
              className="transition-all duration-700 delay-300"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(24px)" }}
            >
              <CostScanner />
              <p className="text-center text-xs text-slate-500 poppins-regular mt-3">Example cost analysis — 40-bed care home</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={prob.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: prob.visible ? 1 : 0, transform: prob.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The Problem</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Businesses Are Overpaying</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: FileWarning,
                color: "from-red-500 to-red-700",
                bg: "bg-red-50",
                border: "border-red-100",
                title: "Wrong Classification",
                stat: "£343/t premium",
                body: "NHS data: clinical waste costs £503/t vs £160/t non-clinical. 50% of orange bags contain non-clinical waste.",
              },
              {
                icon: BarChart3,
                color: "from-amber-500 to-orange-600",
                bg: "bg-amber-50",
                border: "border-amber-100",
                title: "Poor Segregation",
                stat: "3× cost gap",
                body: "General waste runs £170–210/t. Dry recyclables cost £0–70/t. Mixed streams push every tonne into the highest tier.",
              },
              {
                icon: ShieldAlert,
                color: "from-slate-500 to-slate-700",
                bg: "bg-slate-50",
                border: "border-slate-100",
                title: "Bad Contracts",
                stat: "25% brand premium",
                body: "Out-of-contract rates run 15–25% above tender pricing. Major contractors charge up to 30% above alternatives.",
              },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={c.title}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-7 transition-all duration-700 hover:-translate-y-1 hover:shadow-lg`}
                  style={{ opacity: prob.visible ? 1 : 0, transform: prob.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: `${i * 100}ms` }}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="poppins-bold text-slate-900 text-base mb-1">{c.title}</p>
                  <p className="poppins-bold text-emerald-700 text-sm mb-3">{c.stat}</p>
                  <p className="poppins-regular text-slate-500 text-sm leading-relaxed">{c.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CASE STUDIES ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div ref={cases.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: cases.visible ? 1 : 0, transform: cases.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Real Results</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Recent UK Savings Examples</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                org: "Hutchinsons",
                sector: "Agricultural Business",
                saving: "£30,000",
                pct: "35%",
                icon: Package,
                color: "emerald",
                points: [
                  "Waste stream segregation improved across all sites",
                  "Three contractor contracts consolidated into one",
                  "Annual saving of £30K locked in year one",
                ],
              },
              {
                org: "NHS Greater Glasgow",
                sector: "Healthcare Trust",
                saving: "£343/t",
                pct: "50%",
                icon: Heart,
                color: "red",
                points: [
                  "50% of orange-bag clinical waste was non-clinical",
                  "Reclassification reduced cost by £343 per tonne",
                  "Compliance risk reduced across multiple sites",
                ],
              },
            ].map((cs, i) => {
              const Icon = cs.icon
              const isGreen = cs.color === "emerald"
              return (
                <div
                  key={cs.org}
                  className="relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5"
                  style={{ opacity: cases.visible ? 1 : 0, transform: cases.visible ? "none" : "translateY(28px)", transitionDelay: `${i * 120}ms` }}
                >
                  {/* Top accent bar */}
                  <div className={`h-1 w-full ${isGreen ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-gradient-to-r from-red-500 to-rose-400"}`} />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <p className="poppins-bold text-slate-900 text-xl">{cs.org}</p>
                        <p className="text-slate-400 text-xs poppins-regular mt-0.5">{cs.sector}</p>
                      </div>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${isGreen ? "bg-emerald-50" : "bg-red-50"}`}>
                        <Icon className={`w-5 h-5 ${isGreen ? "text-emerald-600" : "text-red-500"}`} />
                      </div>
                    </div>

                    {/* Saving highlight */}
                    <div className={`flex items-center gap-4 p-4 rounded-xl mb-5 ${isGreen ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"}`}>
                      <div className="text-center">
                        <p className={`poppins-bold text-2xl ${isGreen ? "text-emerald-700" : "text-red-600"}`}>{cs.saving}</p>
                        <p className="text-[10px] poppins-regular text-slate-500 uppercase tracking-wide mt-0.5">Annual saving</p>
                      </div>
                      <div className={`w-px h-10 ${isGreen ? "bg-emerald-200" : "bg-red-200"}`} />
                      <div className="text-center">
                        <p className={`poppins-bold text-2xl ${isGreen ? "text-emerald-700" : "text-red-600"}`}>{cs.pct}</p>
                        <p className="text-[10px] poppins-regular text-slate-500 uppercase tracking-wide mt-0.5">{isGreen ? "Reduction" : "Misclassified"}</p>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {cs.points.map(pt => (
                        <div key={pt} className="flex items-start gap-2.5">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isGreen ? "text-emerald-500" : "text-red-400"}`} />
                          <p className="poppins-regular text-sm text-slate-600 leading-snug">{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SECTOR TABLES ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={tables.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: tables.visible ? 1 : 0, transform: tables.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">By sector</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Typical Savings by Sector</h2>
          </div>

          <div className="space-y-10">
            {/* Care Homes table */}
            <div
              className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-700"
              style={{ opacity: tables.visible ? 1 : 0, transform: tables.visible ? "none" : "translateY(24px)", transitionDelay: "0ms" }}
            >
              <div className="flex items-center gap-3 px-6 py-4 bg-emerald-700">
                <Heart className="w-4 h-4 text-white" />
                <p className="poppins-bold text-white text-sm">Care Home — 40 beds</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {["Cost Area", "Current Spend", "After Audit", "Annual Saving"].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] poppins-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Clinical waste (50% misclassified)", "£5,030", "£3,315", "£1,715"],
                      ["Food waste (mixed into general)", "£3,400", "£1,200", "£2,200"],
                      ["General waste optimisation", "£2,400", "£1,680", "£720"],
                    ].map(([area, curr, after, sav], i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-emerald-50/40 transition-colors">
                        <td className="px-5 py-4 poppins-regular text-sm text-slate-700">{area}</td>
                        <td className="px-5 py-4 poppins-semibold text-sm text-slate-500">{curr}</td>
                        <td className="px-5 py-4 poppins-semibold text-sm text-emerald-600">{after}</td>
                        <td className="px-5 py-4 poppins-bold text-sm text-emerald-700">{sav}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50 border-t-2 border-emerald-200">
                      <td className="px-5 py-4 poppins-bold text-sm text-emerald-900">TOTAL</td>
                      <td className="px-5 py-4 poppins-bold text-sm text-slate-700">£10,830</td>
                      <td className="px-5 py-4 poppins-bold text-sm text-emerald-700">£6,195</td>
                      <td className="px-5 py-4 poppins-bold text-base text-emerald-700">£4,635</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Manufacturing table */}
            <div
              className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-700"
              style={{ opacity: tables.visible ? 1 : 0, transform: tables.visible ? "none" : "translateY(24px)", transitionDelay: "150ms" }}
            >
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-800">
                <Package className="w-4 h-4 text-white" />
                <p className="poppins-bold text-white text-sm">Food &amp; Beverage Manufacturing</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      {["Cost Area", "Current Spend", "After Audit", "Annual Saving"].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] poppins-bold text-slate-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Mixed waste vs segregated streams", "£18,000", "£10,800", "£7,200"],
                      ["Cardboard (landfill vs baling)", "£7,200", "£0", "£7,200"],
                      ["Contract renegotiation", "£12,000", "£8,400", "£3,600"],
                    ].map(([area, curr, after, sav], i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-emerald-50/40 transition-colors">
                        <td className="px-5 py-4 poppins-regular text-sm text-slate-700">{area}</td>
                        <td className="px-5 py-4 poppins-semibold text-sm text-slate-500">{curr}</td>
                        <td className="px-5 py-4 poppins-semibold text-sm text-emerald-600">{after}</td>
                        <td className="px-5 py-4 poppins-bold text-sm text-emerald-700">{sav}</td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50 border-t-2 border-emerald-200">
                      <td className="px-5 py-4 poppins-bold text-sm text-emerald-900">TOTAL</td>
                      <td className="px-5 py-4 poppins-bold text-sm text-slate-700">£37,200</td>
                      <td className="px-5 py-4 poppins-bold text-sm text-emerald-700">£19,200</td>
                      <td className="px-5 py-4 poppins-bold text-base text-emerald-700">£18,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div ref={howRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: howRef.visible ? 1 : 0, transform: howRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Process</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">How We Find The Waste</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { step: "01", price: "£195", title: "Snapshot",       badge: "Most Popular", badgeColor: "bg-amber-100 text-amber-800", body: "48-hour remote review. We analyse your waste spend, contractor setup and records. Identify the 3–5 biggest cost leaks. Written report delivered." },
              { step: "02", price: "£495", title: "Setup Pack",     badge: "Full Service",  badgeColor: "bg-emerald-100 text-emerald-800", body: "Everything in the Snapshot plus key compliance documents, team templates, a guidance call, and a follow-up check four weeks later." },
              { step: "03", price: "FREE", title: "Discovery Call", badge: "Start Here",   badgeColor: "bg-slate-100 text-slate-700", body: "15-minute call. We understand your setup and tell you exactly what you need. No obligation, no sales pitch." },
            ].map((s, i) => (
              <div
                key={s.step}
                className="relative bg-white rounded-2xl border border-slate-200 p-7 hover:border-emerald-300 hover:shadow-[0_8px_32px_rgba(16,185,129,0.1)] transition-all duration-300 hover:-translate-y-1"
                style={{ opacity: howRef.visible ? 1 : 0, transform: howRef.visible ? "none" : "translateY(28px)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="poppins-bold text-4xl text-slate-100">{s.step}</span>
                  <span className={`text-[10px] poppins-bold px-2.5 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span>
                </div>
                <p className="poppins-bold text-2xl text-emerald-700 mb-1">{s.price}</p>
                <p className="poppins-bold text-slate-900 text-base mb-3">{s.title}</p>
                <p className="poppins-regular text-slate-500 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-900">
        <div
          ref={roiRef.ref}
          className="max-w-3xl mx-auto transition-all duration-700"
          style={{ opacity: roiRef.visible ? 1 : 0, transform: roiRef.visible ? "none" : "translateY(28px)" }}
        >
          <div className="text-center mb-10">
            <p className="text-emerald-400 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Calculate Your Return</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-white">Your Potential Savings</h2>
            <p className="text-slate-400 poppins-regular text-base mt-3">Drag to your annual waste spend and see your recovery range.</p>
          </div>
          <ROICalc />
        </div>
      </section>

      {/* ── WHY INDEPENDENT ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={whyRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: whyRef.visible ? 1 : 0, transform: whyRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Independence</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Why Your Contractor Won't Tell You This</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: PoundSterling, title: "They profit from volume", body: "Higher tonnage, premium waste streams, and frequent collections all increase contractor revenue. Reducing your cost means reducing theirs." },
              { icon: BarChart3,     title: "No incentive to reclassify", body: "Clinical waste generates higher fees than general waste. There is no commercial reason for a contractor to suggest reclassification." },
              { icon: Users,         title: "No independent voice", body: "Most UK businesses have no independent waste advisor. WRAP data shows the majority rely entirely on contractor guidance." },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div
                  key={c.title}
                  className="p-7 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:shadow-[0_4px_24px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-0.5"
                  style={{ opacity: whyRef.visible ? 1 : 0, transform: whyRef.visible ? "none" : "translateY(24px)", transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="poppins-bold text-slate-900 text-base mb-2">{c.title}</p>
                  <p className="poppins-regular text-slate-500 text-sm leading-relaxed">{c.body}</p>
                </div>
              )
            })}
          </div>

          {/* Quote */}
          <div
            className="p-8 rounded-2xl bg-emerald-700 text-center transition-all duration-700 delay-300"
            style={{ opacity: whyRef.visible ? 1 : 0, transform: whyRef.visible ? "none" : "translateY(16px)" }}
          >
            <Lock className="w-6 h-6 text-emerald-300 mx-auto mb-4" />
            <p className="poppins-bold text-white text-xl sm:text-2xl max-w-xl mx-auto leading-snug">
              "Most businesses rely on their waste contractor for advice. We represent you."
            </p>
            <p className="text-emerald-200 text-sm poppins-regular mt-3">Millstone Compliance — we do not sell bins, collections, or contracts.</p>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div ref={proofRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: proofRef.visible ? 1 : 0, transform: proofRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Client results</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">What Clients Say</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { quote: "Identified £4,200 annual waste we didn't know existed.", role: "Operations Manager, Care Home" },
              { quote: "Paid for itself in 3 months. Now saving £6K+ every year.", role: "Director, Hospitality Group" },
              { quote: "Finally have independent advice instead of a contractor sales pitch.", role: "Estates Lead, NHS Trust" },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-7 hover:border-emerald-200 hover:shadow-[0_4px_24px_rgba(16,185,129,0.08)] transition-all duration-300 hover:-translate-y-0.5"
                style={{ opacity: proofRef.visible ? 1 : 0, transform: proofRef.visible ? "none" : "translateY(24px)", transitionDelay: `${i * 100}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <div key={s} className="w-3 h-3 bg-amber-400 rounded-sm" />)}
                </div>
                <p className="poppins-semibold text-slate-800 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-slate-400 text-xs poppins-regular">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/30 rounded-full blur-[80px]" />

        <div
          ref={ctaRef.ref}
          className="max-w-3xl mx-auto relative z-10 text-center transition-all duration-700"
          style={{ opacity: ctaRef.visible ? 1 : 0, transform: ctaRef.visible ? "none" : "translateY(20px)" }}
        >
          <p className="text-emerald-300 poppins-semibold text-xs uppercase tracking-[0.18em] mb-3">Start Today</p>
          <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
            Find Your Waste in 48 Hours
          </h2>
          <p className="poppins-regular text-emerald-100 text-lg mb-8 max-w-xl mx-auto">
            A £195 Snapshot pays for itself in weeks. Book now and see exactly where your money is going.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button
              onClick={() => openBooking("snapshot")}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 poppins-bold text-sm rounded-xl transition-all duration-200 shadow-lg active:scale-95"
            >
              <Zap className="w-4 h-4" />
              Book £195 Snapshot
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 poppins-semibold text-sm rounded-xl transition-all duration-200"
            >
              Free Savings Estimate
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-emerald-200">
            {["Fixed Fees", "No Contracts", "Independent", "48hr Report"].map(b => (
              <div key={b} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs poppins-semibold">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      ` }} />
    </div>
  )
}
