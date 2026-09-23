"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Lock,
  Home,
  Truck,
  Sparkles,
  Sofa,
  Recycle,
  Scale,
  Search,
  CalendarClock,
  BedDouble,
  Tv,
  Lamp,
  Package,
  Trash2,
  Phone,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useBooking } from "@/components/BookingProvider"

/* ─── Intersection observer hook ─────────────────────────────────────────── */
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
const auditChecks = [
  "Wrong bin sizes spotted",
  "Missed lifts found",
  "Charges with no proof flagged",
]

const dealChecks = [
  "Prices from licensed collectors",
  "You choose, we do the work",
  "We sort the switch for you",
]

const renewalChecks = [
  "Renewal date and notice period logged",
  "A reminder before it's too late",
  "Your price checked every year",
]

const everythingElse = [
  { icon: Home,     label: "Clearances" },
  { icon: Sparkles, label: "Cleaning" },
  { icon: Truck,    label: "Skips" },
  { icon: Recycle,  label: "Recycling" },
  { icon: FileText, label: "Shredding" },
  { icon: Sofa,     label: "Furniture" },
]

/* ─── Clearance scene: a room empties onto a van, then the proof ticks in ── */
const roomItems = [
  { icon: Sofa,      label: "Sofa" },
  { icon: BedDouble, label: "Bed" },
  { icon: Tv,        label: "TV" },
  { icon: Lamp,      label: "Lamp" },
  { icon: Package,   label: "Boxes" },
  { icon: Trash2,    label: "Bags" },
]

const proofRows = ["Before photos", "Cleared by a licensed partner", "After photos", "Waste transfer note"]

// One tick = 650ms. Items leave on ticks 2–7, van drives off on 9, proof ticks in on 10–13.
const SCENE_TICKS = 16
const VAN_LEAVES = 9
const PROOF_STARTS = 10

function ClearanceScene({ active }: { active: boolean }) {
  const [tick, setTick] = useState(0)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTick(SCENE_TICKS - 1)
      return
    }
    const id = setInterval(() => {
      setTick((t) => {
        if (t + 1 >= SCENE_TICKS) {
          setCycle((c) => c + 1)
          return 0
        }
        return t + 1
      })
    }, 650)
    return () => clearInterval(id)
  }, [active])

  const isGone = (i: number) => tick >= i + 2
  const loaded = roomItems.filter((_, i) => isGone(i)).length
  const roomClear = loaded === roomItems.length
  const vanGone = tick >= VAN_LEAVES
  const status = tick < 2 ? "Full" : roomClear ? "Clear" : "Clearing"

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(209,250,229,0.45)_0%,transparent_70%)] pointer-events-none rounded-3xl" />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="poppins-semibold text-[11px] text-emerald-900 uppercase tracking-[0.15em]">Clearance</p>
            <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Example job</p>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors duration-500 ${roomClear ? "bg-emerald-700 border-emerald-700" : "bg-emerald-50 border-emerald-100"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${roomClear ? "bg-white" : "bg-emerald-500 animate-pulse"}`} />
            <span className={`poppins-semibold text-[10px] ${roomClear ? "text-white" : "text-emerald-600"}`}>{status}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full h-1 bg-emerald-50 rounded-full mb-4 overflow-hidden">
          <div
            className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(loaded / roomItems.length) * 100}%` }}
          />
        </div>

        {/* The room */}
        <div className="relative rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3 mb-3 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative grid grid-cols-3 gap-2">
            {roomItems.map((item, i) => {
              const Icon = item.icon
              const gone = isGone(i)
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1.5 py-3 bg-white rounded-xl border border-emerald-100 shadow-sm"
                  style={{
                    opacity: gone ? 0 : 1,
                    transform: gone ? "translateY(120px) scale(0.35)" : "none",
                    transition: gone
                      ? "opacity 0.6s ease, transform 0.7s cubic-bezier(0.55,0,0.85,0.35)"
                      : "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <Icon className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
                  <span className="poppins-medium text-[10px] text-emerald-700">{item.label}</span>
                </div>
              )
            })}
          </div>

          {/* Clear stamp */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: roomClear ? 1 : 0, transform: roomClear ? "scale(1)" : "scale(0.9)", transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-emerald-200 shadow-md">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="poppins-semibold text-xs text-emerald-800">Room clear</span>
            </div>
          </div>
        </div>

        {/* Van lane */}
        <div className="relative h-14 rounded-xl bg-slate-50 border border-slate-100 mb-5 overflow-hidden">
          <div className="absolute left-0 right-0 bottom-3 border-t border-dashed border-slate-200" />
          <div
            key={cycle}
            className="absolute left-3 top-1/2 flex items-center gap-2"
            style={{
              transform: `translateY(-50%) translateX(${vanGone ? "130%" : "0"})`,
              opacity: vanGone ? 0 : 1,
              transition: "transform 1.1s cubic-bezier(0.55,0,0.85,0.35), opacity 0.4s ease 0.7s",
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center shadow-md">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="poppins-semibold text-[11px] text-slate-800 leading-none">Licensed partner</p>
              <p className="poppins-regular text-[10px] text-slate-400 mt-1 tabular-nums">{loaded} of {roomItems.length} loaded</p>
            </div>
          </div>
        </div>

        {/* Proof */}
        <div className="space-y-2">
          {proofRows.map((row, r) => {
            const done = tick >= PROOF_STARTS + r
            return (
              <div
                key={row}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-500 ${done ? "bg-emerald-50/70 border-emerald-100" : "bg-white border-slate-100"}`}
              >
                <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 transition-colors duration-500 ${done ? "text-emerald-600" : "text-slate-200"}`} />
                <span className={`poppins-medium text-[11px] transition-colors duration-500 ${done ? "text-emerald-900" : "text-slate-400"}`}>{row}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating chip */}
      <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-2.5 shadow-xl animate-float-slow">
        <p className="poppins-bold text-sm text-emerald-900 leading-none">One call</p>
        <p className="poppins-regular text-[10px] text-emerald-500 mt-1">Photos + paperwork</p>
      </div>
    </div>
  )
}

export default function ServicesPage() {
    const { openBooking } = useBooking()

  const hero      = useReveal(0.05)
  const twoSvcRef = useReveal(0.1)
  const whoRef    = useReveal(0.1)
  const clearRef  = useReveal(0.15)
  const paidRef   = useReveal(0.1)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />

        <div
          ref={hero.ref}
          className="max-w-5xl mx-auto relative z-10 text-center"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7 transition-all duration-700"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Waste Help for Birmingham Businesses</span>
          </div>

          {/* Headline */}
          <h1
            className="poppins-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-slate-900 mb-10 transition-all duration-700 delay-100"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(20px)" }}
          >
            We cut your waste bill.<br />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientX_3s_ease_infinite]">
              And sort everything else.
            </span>
          </h1>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center transition-all duration-700 delay-300"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
          >
            <Link
              href="/send-your-bill"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-95"
            >
              Send Us Your Bill
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── THREE CORE SERVICES ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div ref={twoSvcRef.ref} className="max-w-6xl mx-auto relative z-10">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: twoSvcRef.visible ? 1 : 0, transform: twoSvcRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">What we do</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Three Ways{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                We Save You Money.
              </span>
            </h2>
            <p className="poppins-regular text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Start with a free bill check. Then we get you a better deal, and keep it that way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">

            {/* Service 01 — Bill Audit */}
            <div
              id="bill-audit"
              className="group relative bg-white rounded-2xl border border-slate-100 p-7 flex flex-col hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] hover:border-emerald-200 transition-all duration-500 scroll-mt-28"
              style={{
                opacity: twoSvcRef.visible ? 1 : 0,
                transform: twoSvcRef.visible ? "none" : "translateY(24px)",
                transitionDelay: "0ms",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                  <Search className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="poppins-semibold text-[10px] text-emerald-500 uppercase tracking-widest">Service 01</span>
              </div>

              <h3 className="poppins-bold text-lg text-slate-900 mb-2">Bill Audit</h3>
              <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                We check every line of your waste bill against your contract and what really gets collected.
              </p>

              <div className="space-y-2 mb-7 flex-1">
                {auditChecks.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-600 poppins-regular leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/send-your-bill"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Send Us Your Bill
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 02 — Better Deals */}
            <div
              id="better-deals"
              className="group relative bg-white rounded-2xl border-2 border-emerald-200 p-7 flex flex-col shadow-[0_8px_40px_rgba(16,185,129,0.14)] hover:shadow-[0_12px_48px_rgba(16,185,129,0.2)] transition-all duration-500 scroll-mt-28"
              style={{
                opacity: twoSvcRef.visible ? 1 : 0,
                transform: twoSvcRef.visible ? "none" : "translateY(24px)",
                transitionDelay: "120ms",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                  <Scale className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="poppins-semibold text-[10px] text-emerald-500 uppercase tracking-widest">Service 02</span>
              </div>

              <h3 className="poppins-bold text-lg text-slate-900 mb-2">Better Deals</h3>
              <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                We get prices from licensed Birmingham collectors and show you the best one.
              </p>

              <div className="space-y-2 mb-7 flex-1">
                {dealChecks.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-600 poppins-regular leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/waste-contract-audit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Get Better Prices
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 03 — Renewal Watch */}
            <div
              id="renewal-watch"
              className="group relative bg-white rounded-2xl border border-slate-100 p-7 flex flex-col hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] hover:border-emerald-200 transition-all duration-500 scroll-mt-28"
              style={{
                opacity: twoSvcRef.visible ? 1 : 0,
                transform: twoSvcRef.visible ? "none" : "translateY(24px)",
                transitionDelay: "240ms",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                  <CalendarClock className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="poppins-semibold text-[10px] text-emerald-500 uppercase tracking-widest">Service 03</span>
              </div>

              <h3 className="poppins-bold text-lg text-slate-900 mb-2">Renewal Watch</h3>
              <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                We track your contract dates, so it never rolls over onto a bad deal without you knowing.
              </p>

              <div className="space-y-2 mb-7 flex-1">
                {renewalChecks.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-600 poppins-regular leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openBooking("discovery")}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Book a 15-Min Call
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── EVERYTHING ELSE + HOW WE GET PAID ─────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={whoRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: whoRef.visible ? 1 : 0, transform: whoRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Also available</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Everything Else, Sorted.</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {everythingElse.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-[0_4px_24px_rgba(16,185,129,0.08)] transition-all duration-300 text-center"
                  style={{
                    opacity: whoRef.visible ? 1 : 0,
                    transform: whoRef.visible ? "none" : "translateY(16px)",
                    transitionDelay: `${i * 60}ms`,
                    transitionDuration: "500ms",
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-700 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="poppins-semibold text-sm text-slate-700">{item.label}</p>
                </div>
              )
            })}
          </div>

          <p
            className="poppins-regular text-slate-500 text-base text-center transition-all duration-700 delay-300"
            style={{ opacity: whoRef.visible ? 1 : 0 }}
          >
            One call. A checked, licensed partner. Photos and paperwork.
          </p>

        </div>
      </section>


      {/* ── NEED A HAND? CLEARANCES ───────────────────────────────────────── */}
      <section id="clearances" className="py-24 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden scroll-mt-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div ref={clearRef.ref} className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Words */}
          <div
            className="transition-all duration-700"
            style={{ opacity: clearRef.visible ? 1 : 0, transform: clearRef.visible ? "none" : "translateY(20px)" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Need a hand?</span>
            </div>

            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-[1.05] tracking-tight mb-5">
              Got stuff to clear?<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                We&apos;ll sort it.
              </span>
            </h2>

            <p className="poppins-regular text-base sm:text-lg text-slate-500 leading-relaxed max-w-md mb-8">
              A tenant moved out. A shop is closing. A room is full of old things. You make one call. We send a checked, licensed partner. You get photos and the right papers.
            </p>

            <div className="max-w-md mb-8">
              {[
                { num: "01", title: "You send a few photos", desc: "Show us what needs to go. That's all we need." },
                { num: "02", title: "We send a checked partner", desc: "Licensed, vetted and booked for you." },
                { num: "03", title: "It's gone. You get proof.", desc: "Before and after photos, plus the waste papers." },
              ].map((step, i, arr) => (
                <div key={step.num} className={`flex gap-5 py-4 ${i < arr.length - 1 ? "border-b border-emerald-100" : ""}`}>
                  <span className="poppins-bold text-xs text-emerald-400 tabular-nums mt-1 flex-shrink-0 w-6 text-right">{step.num}</span>
                  <div>
                    <p className="poppins-semibold text-sm text-emerald-900 mb-0.5">{step.title}</p>
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {["Landlords", "Letting agents", "Property managers", "Shops & offices"].map((who) => (
                <span key={who} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs poppins-medium shadow-sm">
                  {who}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={() => openBooking("discovery")}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-95"
              >
                Send Us a Few Photos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="tel:+447762270113"
                className="inline-flex items-center gap-2 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800 transition-colors duration-200"
              >
                <Phone className="w-3.5 h-3.5" />
                07762 270 113
              </a>
            </div>
          </div>

          {/* Animated scene */}
          <div
            className="transition-all duration-700 delay-150"
            style={{ opacity: clearRef.visible ? 1 : 0, transform: clearRef.visible ? "none" : "translateY(24px)" }}
          >
            <ClearanceScene active={clearRef.visible} />
          </div>

        </div>
      </section>

      {/* ── HOW WE GET PAID ────────────────────────────────────────────────── */}
      <section className="pt-8 pb-24 px-6 bg-white">
        <div ref={paidRef.ref} className="max-w-5xl mx-auto">
          <div
            className="p-7 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-all duration-700 delay-400"
            style={{ opacity: paidRef.visible ? 1 : 0, transform: paidRef.visible ? "none" : "translateY(12px)" }}
          >
            <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-3" />
            <p className="poppins-bold text-slate-900 text-base mb-2">How we get paid</p>
            <p className="poppins-regular text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              Your first bill check is free. After that, either you pay a simple fee, or the collector you switch to pays us a small cut. We always tell you which one upfront. No surprises.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      ` }} />
      </div>
  )
}
