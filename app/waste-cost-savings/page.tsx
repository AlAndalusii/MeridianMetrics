"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight, CheckCircle, ChevronRight, CalendarClock, Truck, FileText,
  Send, ClipboardCheck, Wrench, Building2, Timer, Plus,
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

/* ─── Deadline checker: pick the day a load arrives, see when it's due ────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Count two working days, starting the day after the waste arrives. Weekends don't count.
function dueDay(arrival: number) {
  let day = arrival
  let counted = 0
  const path: number[] = []
  while (counted < 2) {
    day = (day + 1) % 7
    const working = day < 5
    path.push(day)
    if (working) counted++
  }
  return { due: day, path }
}

function DeadlineChecker() {
  const [arrival, setArrival] = useState(3)
  const { due, path } = dueDay(arrival)

  return (
    <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs poppins-semibold text-white">Deadline Checker</span>
        </div>
        <span className="text-[10px] text-slate-400 poppins-regular">Tap the day a load arrives</span>
      </div>

      <div className="grid grid-cols-7 gap-1.5 mb-6">
        {DAYS.map((d, i) => {
          const isArrival = i === arrival
          const isDue = i === due
          const inPath = path.includes(i) && !isDue
          return (
            <button
              key={d}
              type="button"
              onClick={() => setArrival(i)}
              aria-pressed={isArrival}
              className={`flex flex-col items-center gap-1 rounded-xl border py-3 transition-all duration-300 ${
                isArrival
                  ? "bg-white border-white text-emerald-900"
                  : isDue
                  ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/30"
                  : inPath
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-200"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              }`}
            >
              <span className="poppins-semibold text-[11px]">{d}</span>
              <span className="text-[9px] poppins-regular opacity-80">{isArrival ? "In" : isDue ? "Due" : i > 4 ? "Off" : ""}&nbsp;</span>
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
        <p className="text-[10px] text-slate-400 poppins-semibold uppercase tracking-widest">Arrives {DAY_NAMES[arrival]}</p>
        <p className="poppins-bold text-2xl text-white mt-1">
          Report by end of <span className="text-emerald-400">{DAY_NAMES[due]}</span>
        </p>
        <p className="text-xs text-slate-400 poppins-regular mt-2 leading-relaxed">
          Two working days, counted from the day after it arrives. Weekends don&apos;t count. Bank holidays don&apos;t either, so add a day if one falls in the way.
        </p>
      </div>
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function DigitalWasteTrackingGuidePage() {
  const { openBooking } = useBooking()
  const hero    = useReveal(0.05)
  const basics  = useReveal(0.1)
  const same    = useReveal(0.1)
  const when    = useReveal(0.1)
  const options = useReveal(0.1)
  const ctaRef  = useReveal(0.1)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-6 bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 rounded-full blur-[100px]" />

        <div ref={hero.ref} className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6 transition-all duration-700"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs poppins-semibold text-emerald-300 uppercase tracking-wider">A Plain English Guide</span>
              </div>

              <h1
                className="poppins-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-5 transition-all duration-700 delay-100"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(20px)" }}
              >
                Digital Waste Tracking,{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Explained Simply
                </span>
              </h1>

              <p
                className="poppins-regular text-emerald-100/70 text-lg mb-8 max-w-lg leading-relaxed transition-all duration-700 delay-200"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(16px)" }}
              >
                What changed, who it affects, and what your site has to do. No jargon, no scare stories.
              </p>

              <div
                className="grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-300"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
              >
                {[
                  { val: "1 Oct",    label: "2026: permitted sites start", accent: "text-emerald-400" },
                  { val: "2 days",   label: "Working days per load",      accent: "text-white" },
                  { val: "Oct 2027", label: "Carriers and brokers join",  accent: "text-amber-300" },
                ].map(s => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-sm">
                    <p className={`poppins-bold text-xl sm:text-2xl ${s.accent}`}>{s.val}</p>
                    <p className="text-[10px] text-slate-400 poppins-regular mt-0.5 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>

              <div
                className="flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-400"
                style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
              >
                <Link
                  href="/free-check"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white poppins-bold text-sm rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/30"
                >
                  Take the Free Readiness Check <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <button
                  onClick={() => openBooking("discovery")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 poppins-semibold text-sm rounded-xl transition-all duration-200"
                >
                  Book a Free 15-Minute Call <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="transition-all duration-700 delay-300"
              style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(24px)" }}
            >
              <DeadlineChecker />
            </div>
          </div>
        </div>
      </section>

      {/* ── THE BASICS ───────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={basics.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: basics.visible ? 1 : 0, transform: basics.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The basics</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Who, What and When</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Building2,
                title: "Who It's for Now",
                body: "Permitted sites in England and Wales that receive waste. Scrap yards, transfer stations, skip hire firms with their own yard, and recyclers.",
              },
              {
                icon: Truck,
                title: "What You Report",
                body: "Every load your site receives goes to Defra's digital waste tracking service. Not just the big ones. Every load.",
              },
              {
                icon: Timer,
                title: "When It's Due",
                body: "Within two working days, counted from the day after the waste arrives. Weekends and bank holidays don't count.",
              },
            ].map((c, i) => (
              <div
                key={c.title}
                className="rounded-2xl border border-slate-100 p-7 hover:border-emerald-200 hover:shadow-[0_8px_32px_rgba(16,185,129,0.08)] transition-all duration-500"
                style={{
                  opacity: basics.visible ? 1 : 0,
                  transform: basics.visible ? "none" : "translateY(24px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                  <c.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="poppins-bold text-lg text-slate-900 mb-2">{c.title}</h3>
                <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT HASN'T CHANGED ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <div ref={same.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: same.visible ? 1 : 0, transform: same.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The catch</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">It&apos;s Extra, Not Instead</h2>
            <p className="poppins-regular text-base text-slate-500 mt-3 max-w-xl mx-auto">
              Your paper transfer notes haven&apos;t gone away. Now every load goes to Defra as well. That&apos;s the same job twice.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-5 items-stretch">
            {[
              { title: "You Still Do", tone: "white", items: ["Keep waste transfer notes", "Weigh loads on your weighbridge", "Keep records your permit asks for", "Quarterly waste returns"] },
              { title: "Now You Also Do", tone: "dark", items: ["Report every load received", "Use the right EWC and R/D codes", "Submit within two working days", "Keep it going when staff are off"] },
            ].map((col, i) => (
              <React.Fragment key={col.title}>
                {i === 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Plus className="w-5 h-5 text-emerald-700" />
                    </div>
                  </div>
                )}
                <div
                  className={`rounded-2xl p-7 transition-all duration-700 ${
                    col.tone === "dark"
                      ? "bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-[0_30px_70px_-30px_rgba(6,95,70,0.6)]"
                      : "bg-white border border-slate-100"
                  }`}
                  style={{ opacity: same.visible ? 1 : 0, transform: same.visible ? "none" : "translateY(24px)", transitionDelay: `${i * 150}ms` }}
                >
                  <p className={`poppins-semibold text-xs uppercase tracking-[0.18em] mb-5 ${col.tone === "dark" ? "text-emerald-300" : "text-emerald-600"}`}>{col.title}</p>
                  <div className="space-y-3">
                    {col.items.map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${col.tone === "dark" ? "text-emerald-300" : "text-emerald-500"}`} />
                        <span className={`poppins-regular text-sm ${col.tone === "dark" ? "text-emerald-50" : "text-slate-600"}`}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={when.ref} className="max-w-3xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: when.visible ? 1 : 0, transform: when.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Timeline</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Who Comes In, and When</h2>
          </div>

          <div className="relative pl-10">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-emerald-100" />
            {[
              { icon: CalendarClock, date: "1 October 2026", title: "Permitted Sites That Receive Waste", body: "Every load received must be reported within two working days. This is where your site is now.", now: true },
              { icon: Truck, date: "October 2027", title: "Carriers, Brokers and Dealers", body: "Skip firms without a yard, hauliers and brokers come into the system. Join my Ready for 2027 list for updates.", now: false },
            ].map((t, i) => (
              <div
                key={t.date}
                className="relative mb-6 last:mb-0 transition-all duration-700"
                style={{ opacity: when.visible ? 1 : 0, transform: when.visible ? "none" : "translateY(20px)", transitionDelay: `${i * 200}ms` }}
              >
                <div className={`absolute -left-10 top-5 w-8 h-8 rounded-xl flex items-center justify-center border-4 border-white shadow ${t.now ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700"}`}>
                  <t.icon className="w-3.5 h-3.5" />
                </div>
                <div className={`rounded-2xl border p-6 ${t.now ? "border-emerald-300 bg-emerald-50/50" : "border-slate-100 bg-white"}`}>
                  <p className="poppins-semibold text-[11px] uppercase tracking-[0.18em] text-emerald-600">{t.date}{t.now ? " · Now" : ""}</p>
                  <h3 className="poppins-bold text-lg text-slate-900 mt-1">{t.title}</h3>
                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed mt-1.5">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOUR OPTIONS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50/60">
        <div ref={options.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: options.visible ? 1 : 0, transform: options.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Your options</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Three Ways to Handle It</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Wrench, tag: "DWT Setup", title: "Do It Yourself", body: "I get you registered, build your code template and show whoever runs the weighbridge what to do.", href: "/services#setup" },
              { icon: ClipboardCheck, tag: "DWT Health Check", title: "Already Doing It", body: "I check a sample week against your tickets. Did each load land? Are the codes right?", href: "/services#health-check" },
              { icon: Send, tag: "Done For You", title: "Hand It Over", body: "Send tickets on WhatsApp. I enter and submit every load, and confirm it all on Friday.", href: "/services#reporting", featured: true },
            ].map((o, i) => (
              <Link
                key={o.title}
                href={o.href}
                className={`group flex flex-col rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 ${
                  o.featured ? "bg-white border-2 border-emerald-300 shadow-[0_24px_60px_-24px_rgba(6,95,70,0.35)]" : "bg-white border border-slate-100 hover:border-emerald-200"
                }`}
                style={{ opacity: options.visible ? 1 : 0, transform: options.visible ? undefined : "translateY(24px)", transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-700 flex items-center justify-center transition-colors duration-300">
                    <o.icon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="poppins-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{o.tag}</span>
                </div>
                <h3 className="poppins-bold text-lg text-slate-900 mb-2">{o.title}</h3>
                <p className="poppins-regular text-sm text-slate-500 leading-relaxed flex-1">{o.body}</p>
                <span className="inline-flex items-center gap-1.5 mt-5 poppins-semibold text-sm text-emerald-700">
                  See the service <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-emerald-900 to-emerald-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div
          ref={ctaRef.ref}
          className="max-w-3xl mx-auto relative z-10 text-center transition-all duration-700"
          style={{ opacity: ctaRef.visible ? 1 : 0, transform: ctaRef.visible ? "none" : "translateY(20px)" }}
        >
          <p className="text-emerald-300 poppins-semibold text-xs uppercase tracking-[0.18em] mb-3">Start Today</p>
          <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
            Two Weeks Free. No Contract.
          </h2>
          <p className="poppins-regular text-emerald-100/80 text-lg mb-9 max-w-xl mx-auto">
            Send me your tickets on WhatsApp, and I&apos;ll make sure every load is in on time. See it working before you pay.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/waste-contract-audit"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-900 poppins-bold text-sm rounded-xl transition-all duration-300 shadow-lg active:scale-95"
            >
              Start a Free Two-Week Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://wa.me/447762270113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              WhatsApp Zak
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
            {["Fixed Monthly Fee", "No Contract", "Plain English", "Direct Line"].map(b => (
              <span key={b} className="inline-flex items-center gap-1.5 text-xs text-emerald-200/80 poppins-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
