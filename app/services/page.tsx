"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  CheckCircle,
  Lock,
  Truck,
  Send,
  ClipboardCheck,
  Wrench,
  FileText,
  Handshake,
  Phone,
  Recycle,
  Car,
  Factory,
  Hammer,
  Leaf,
  Camera,
  CalendarCheck,
  Wallet,
} from "lucide-react"
import { useRouter } from "next/navigation"
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

const WHATSAPP = "https://wa.me/447762270113"
const READY_2027 = "/carriers-and-brokers"
const FREE_TRIAL = "/free-trial"

/* ─── Data ────────────────────────────────────────────────────────────────── */
const services: {
  id: string
  num: string
  icon: React.ElementType
  tag: string
  forWho: string
  chip: string
  title: string
  what: string
  points: string[]
  priced: string
  cta: string
  href?: string
  featured?: boolean
}[] = [
  {
    id: "reporting",
    num: "01",
    icon: Send,
    tag: "Core",
    forWho: "Waste permit holders",
    chip: "Do it for me",
    title: "DWT Reporting, Done for You",
    what: "You send your tickets on WhatsApp. I submit every load to Defra, fix any errors, and send proof on Friday.",
    points: [
      "Your regular loads set up before we start",
      "Every load submitted, aiming for one working day",
      "Errors fixed, and a Friday confirmation of everything",
      "Updates from me when the rules change",
    ],
    priced: "Two weeks free first. Then we agree a fee on a free call.",
    cta: "Start a Free Two-Week Trial",
    href: FREE_TRIAL,
    featured: true,
  },
  {
    id: "health-check",
    num: "02",
    icon: ClipboardCheck,
    tag: "One-off",
    forWho: "Sites already reporting",
    chip: "Check my reporting",
    title: "DWT Health Check",
    what: "I check a sample week of your loads against your tickets and permit, and tell you what to fix.",
    points: [
      "Did each load land, with the right dates?",
      "Carrier registration numbers there, and right?",
      "A short written report with the fixes",
    ],
    priced: "One-off, agreed upfront on a free 15-minute call.",
    cta: "Book a Health Check",
  },
  {
    id: "setup",
    num: "03",
    icon: Wrench,
    tag: "One-off",
    forWho: "Businesses doing it themselves",
    chip: "Help me set up",
    title: "DWT Setup",
    what: "Doing it yourself? I prepare everything for your Defra registration. You sign it off.",
    points: [
      "Defra registration prepared, ready for you to sign",
      "Spreadsheet or software: help choosing what fits",
      "A pre-filled code template for your site",
      "A short handover for whoever receives loads",
    ],
    priced: "One-off, agreed upfront on a free 15-minute call.",
    cta: "Book a Setup Call",
  },
  {
    id: "paperwork",
    num: "04",
    icon: FileText,
    tag: "Add-on",
    forWho: "Reporting clients",
    chip: "Extra paperwork",
    title: "Paperwork Support",
    what: "Quarterly returns and records, done from data I already hold. Ready if the regulator asks.",
    points: [
      "Quarterly waste returns prepared for you",
      "Regular hauliers and customers set up before their first load",
    ],
    priced: "Added to your monthly fee, or per job.",
    cta: "Ask About Paperwork",
  },
]

const siteTypes = [
  { icon: Recycle, label: "Scrap, transfer, skip, soil and wood sites" },
  { icon: Hammer,  label: "Builders with a yard or crusher" },
  { icon: Car,     label: "Vehicle dismantlers and garages" },
  { icon: Factory, label: "Manufacturers taking waste in" },
  { icon: Leaf,    label: "Farms, landscapers and tree surgeons" },
]

const priceLines = [
  { who: "DWT Reporting, Done For You", how: "Two weeks free, then a fixed monthly fee" },
  { who: "DWT Health Check", how: "One-off fee" },
  { who: "DWT Setup", how: "One-off fee" },
  { who: "Paperwork Support", how: "Added monthly, or per job" },
  { who: "Introductions", how: "Free" },
]

/* ─── Ticket scene: a week's tickets arrive, get entered, then confirmed ─── */
const tickets = [
  { day: "Mon", label: "Steel" },
  { day: "Mon", label: "Metals" },
  { day: "Tue", label: "Rubble" },
  { day: "Wed", label: "Wood" },
  { day: "Thu", label: "Soil" },
  { day: "Fri", label: "Metals" },
]

const proofRows = ["Read from your photo", "Matched to your codes", "Submitted to Defra", "On Friday's confirmation"]

// One tick = 650ms. Tickets go in on ticks 2–7, the batch is sent on 9, proof ticks in on 10–13.
const SCENE_TICKS = 16
const BATCH_SENT = 9
const PROOF_STARTS = 10

function TicketScene({ active }: { active: boolean }) {
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

  const isIn = (i: number) => tick >= i + 2
  const entered = tickets.filter((_, i) => isIn(i)).length
  const allIn = entered === tickets.length
  const sent = tick >= BATCH_SENT
  const status = tick < 2 ? "New week" : allIn ? "All in" : "Entering"

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(209,250,229,0.45)_0%,transparent_70%)] pointer-events-none rounded-3xl" />

      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="poppins-semibold text-[11px] text-emerald-900 uppercase tracking-[0.15em]">Your week</p>
            <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Example only</p>
          </div>
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors duration-500 ${allIn ? "bg-emerald-700 border-emerald-700" : "bg-emerald-50 border-emerald-100"}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${allIn ? "bg-white" : "bg-emerald-500 animate-pulse"}`} />
            <span className={`poppins-semibold text-[10px] ${allIn ? "text-white" : "text-emerald-600"}`}>{status}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full h-1 bg-emerald-50 rounded-full mb-4 overflow-hidden">
          <div
            className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(entered / tickets.length) * 100}%` }}
          />
        </div>

        {/* The tickets */}
        <div className="relative rounded-2xl bg-emerald-50/60 border border-emerald-100 p-3 mb-3 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="relative grid grid-cols-3 gap-2">
            {tickets.map((t, i) => {
              const gone = isIn(i)
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 py-3 bg-white rounded-xl border border-emerald-100 shadow-sm"
                  style={{
                    opacity: gone ? 0 : 1,
                    transform: gone ? "translateY(120px) scale(0.35)" : "none",
                    transition: gone
                      ? "opacity 0.6s ease, transform 0.7s cubic-bezier(0.55,0,0.85,0.35)"
                      : "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                  }}
                >
                  <FileText className="w-5 h-5 text-emerald-600" strokeWidth={1.75} />
                  <span className="poppins-semibold text-[10px] text-emerald-800">{t.day}</span>
                  <span className="poppins-regular text-[10px] text-emerald-600">{t.label}</span>
                </div>
              )
            })}
          </div>

          {/* Clear stamp */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: allIn ? 1 : 0, transform: allIn ? "scale(1)" : "scale(0.9)", transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-emerald-200 shadow-md">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span className="poppins-semibold text-xs text-emerald-800">Every ticket in</span>
            </div>
          </div>
        </div>

        {/* Send lane */}
        <div className="relative h-14 rounded-xl bg-slate-50 border border-slate-100 mb-5 overflow-hidden">
          <div className="absolute left-0 right-0 bottom-3 border-t border-dashed border-slate-200" />
          <div
            key={cycle}
            className="absolute left-3 top-1/2 flex items-center gap-2"
            style={{
              transform: `translateY(-50%) translateX(${sent ? "130%" : "0"})`,
              opacity: sent ? 0 : 1,
              transition: "transform 1.1s cubic-bezier(0.55,0,0.85,0.35), opacity 0.4s ease 0.7s",
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center shadow-md">
              <Send className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="poppins-semibold text-[11px] text-slate-800 leading-none">Sent from WhatsApp</p>
              <p className="poppins-regular text-[10px] text-slate-400 mt-1 tabular-nums">{entered} of {tickets.length} entered</p>
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
        <p className="poppins-bold text-sm text-emerald-900 leading-none">2 working days</p>
        <p className="poppins-regular text-[10px] text-emerald-500 mt-1">The legal deadline per load</p>
      </div>
    </div>
  )
}

/* ─── Service card with a soft light that follows the mouse ───────────────── */
function ServiceCard({
  s,
  index,
  run,
  onBook,
}: {
  s: (typeof services)[number]
  index: number
  run: boolean
  onBook: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = s.icon
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  const btnClass = s.featured
    ? "bg-emerald-700 hover:bg-emerald-800 text-white shadow-[0_14px_30px_-10px_rgba(6,95,70,0.55)]"
    : "bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 hover:border-emerald-300"

  return (
    <div
      ref={ref}
      id={s.id}
      onMouseMove={onMove}
      className={`sv-card group relative flex flex-col rounded-[1.75rem] bg-white p-7 sm:p-8 overflow-hidden scroll-mt-28 transition-all duration-700 hover:-translate-y-1 ${
        s.featured
          ? "border-2 border-emerald-300 shadow-[0_24px_60px_-24px_rgba(6,95,70,0.35)]"
          : "border border-slate-200 shadow-[0_2px_16px_rgba(6,95,70,0.05)] hover:border-emerald-200 hover:shadow-[0_20px_50px_-20px_rgba(6,95,70,0.25)]"
      } ${run ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: run ? `${150 + index * 130}ms` : "0ms" }}
    >
      {s.featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-400" />
      )}

      {/* Top row */}
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-700 group-hover:border-emerald-700 transition-colors duration-500">
            <Icon className="w-5 h-5 text-emerald-700 group-hover:text-white transition-colors duration-500" />
          </div>
          <span
            className={`poppins-semibold text-[10px] uppercase tracking-[0.2em] rounded-full px-2.5 py-1 border ${
              s.featured ? "bg-emerald-700 border-emerald-700 text-white" : "bg-emerald-50 border-emerald-100 text-emerald-700"
            }`}
          >
            {s.tag}
          </span>
        </div>
        <span className="poppins-bold text-3xl text-emerald-100 group-hover:text-emerald-200 transition-colors duration-500 tabular-nums">{s.num}</span>
      </div>

      {/* Who + what */}
      <p className="poppins-semibold text-[11px] uppercase tracking-[0.2em] text-emerald-600 mb-2">For {s.forWho}</p>
      <h3 className="poppins-bold text-2xl text-slate-900 mb-3 leading-tight">{s.title}</h3>
      <p className="poppins-regular text-[15px] text-slate-600 leading-relaxed mb-6">{s.what}</p>

      {/* Points */}
      <div className="space-y-2.5 mb-7 flex-1">
        {s.points.map((p, i) => (
          <div
            key={p}
            className={`flex items-start gap-2.5 transition-all duration-500 ${run ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
            style={{ transitionDelay: run ? `${500 + index * 130 + i * 90}ms` : "0ms" }}
          >
            <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-px">
              <CheckCircle className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="poppins-regular text-sm text-slate-700 leading-snug">{p}</span>
          </div>
        ))}
      </div>

      {/* How it's priced */}
      <div className="flex items-center gap-3 rounded-xl bg-emerald-50/70 border border-emerald-100 px-3.5 py-3 mb-5">
        <Wallet className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <div className="min-w-0">
          <p className="poppins-medium text-[10px] uppercase tracking-[0.18em] text-emerald-600/80 leading-none">How it&apos;s priced</p>
          <p className="poppins-semibold text-[13px] text-emerald-900 leading-snug mt-1">{s.priced}</p>
        </div>
      </div>

      <button
        onClick={onBook}
        className={`sv-btn group/btn relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3.5 poppins-semibold text-sm rounded-xl transition-all duration-300 active:scale-[0.98] ${btnClass}`}
      >
        {s.cta}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </button>
    </div>
  )
}

/* ─── Site type strip: a line fills and each site type lights up in turn ─── */
function SiteTypeStrip({ run }: { run: boolean }) {
  return (
    <div className="relative">
      {/* Track + fill (desktop) */}
      <div className="hidden sm:block absolute top-7 left-[10%] right-[10%] h-px bg-emerald-100" />
      <div
        className="hidden sm:block absolute top-7 left-[10%] h-px bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all ease-out"
        style={{ width: run ? "80%" : "0%", transitionDuration: "1800ms", transitionDelay: "200ms" }}
      />
      <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-y-8 gap-x-4">
        {siteTypes.map((v, i) => {
          const Icon = v.icon
          return (
            <div
              key={v.label}
              className={`flex flex-col items-center text-center transition-all duration-700 ${i === siteTypes.length - 1 ? "col-span-2 sm:col-span-1" : ""} ${run ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: run ? `${300 + i * 300}ms` : "0ms" }}
            >
              <div className="relative">
                <div className={`absolute inset-0 rounded-2xl bg-emerald-400/30 ${run ? "sv-ping" : ""}`} style={{ animationDelay: `${300 + i * 300}ms` }} />
                <div className="relative w-14 h-14 rounded-2xl bg-white border border-emerald-200 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.4)] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
              </div>
              <p className="poppins-semibold text-sm text-slate-800 mt-4 leading-tight max-w-[140px]">{v.label}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const { openBooking } = useBooking()
  const router = useRouter()

  const hero     = useReveal(0.05)
  const cardsRef = useReveal(0.1)
  const howRef   = useReveal(0.15)
  const extraRef = useReveal(0.1)
  const whoRef   = useReveal(0.2)
  const paidRef  = useReveal(0.2)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black_30%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[340px] bg-emerald-100/60 rounded-full blur-[90px] pointer-events-none" />
        <div className="sv-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] pointer-events-none" />

        <div ref={hero.ref} className={`max-w-5xl mx-auto relative z-10 text-center ${hero.visible ? "sv-in" : ""}`}>
          <div className="sv-fade inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7" style={{ animationDelay: "0ms" }}>
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Services · Digital Waste Tracking</span>
          </div>

          <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-slate-900 mb-6">
            <span className="block">
              {["Report.", "Check."].map((w, i) => (
                <React.Fragment key={w}>
                  <span className="sv-word inline-block" style={{ animationDelay: `${120 + i * 110}ms` }}>{w}</span>{" "}
                </React.Fragment>
              ))}
            </span>
            <span
              className="sv-word sv-shine inline-block pb-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent"
              style={{ animationDelay: "360ms" }}
            >
              Keep It Tidy.
            </span>
          </h1>

          <p className="sv-fade poppins-regular text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-9" style={{ animationDelay: "560ms" }}>
            Your waste person, for anyone with a permit but no waste team. Start with a free two-week trial.
          </p>

          {/* Find your service */}
          <div className="sv-fade flex flex-wrap justify-center gap-2.5" style={{ animationDelay: "720ms" }}>
            {services.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-2 pl-2 pr-4 py-2 rounded-full bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-[0_8px_20px_-8px_rgba(6,95,70,0.3)] transition-all duration-300"
                >
                  <span className="w-7 h-7 rounded-full bg-emerald-50 group-hover:bg-emerald-700 flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-3.5 h-3.5 text-emerald-700 group-hover:text-white transition-colors duration-300" />
                  </span>
                  <span className="poppins-semibold text-sm text-slate-700 group-hover:text-emerald-800">{s.chip}</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-100/40 rounded-full blur-[110px] pointer-events-none" />
        <div ref={cardsRef.ref} className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-5 items-stretch">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} index={i} run={cardsRef.visible} onBook={() => (s.href ? router.push(s.href) : openBooking("discovery"))} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden scroll-mt-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div ref={howRef.ref} className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className="transition-all duration-700"
            style={{ opacity: howRef.visible ? 1 : 0, transform: howRef.visible ? "none" : "translateY(20px)" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">How it works</span>
            </div>

            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-slate-900 leading-[1.05] tracking-tight mb-5">
              Send the Tickets.<br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                I&apos;ll Do the Rest.
              </span>
            </h2>

            <p className="poppins-regular text-base sm:text-lg text-slate-500 leading-relaxed max-w-md mb-7">
              A load comes in. You snap the ticket. That&apos;s your part done.
            </p>

            <div className="max-w-md mb-6">
              {[
                { num: "01", icon: Camera, title: "Send", desc: "WhatsApp me photos of your tickets and transfer notes as loads arrive." },
                { num: "02", icon: Send, title: "Submitted", desc: "I enter and submit every load before the deadline." },
                { num: "03", icon: CalendarCheck, title: "Confirmed", desc: "Every Friday, you get a list of everything submitted." },
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

            {/* You vs me */}
            <div className="grid sm:grid-cols-2 gap-3 max-w-md mb-8">
              <div className="rounded-2xl bg-white border border-emerald-100 px-4 py-3.5">
                <p className="poppins-semibold text-[10px] uppercase tracking-[0.18em] text-emerald-600">What you do</p>
                <p className="poppins-regular text-sm text-slate-600 leading-snug mt-1.5">Send clear photos. Keep the details on your tickets right.</p>
              </div>
              <div className="rounded-2xl bg-emerald-700 border border-emerald-700 px-4 py-3.5">
                <p className="poppins-semibold text-[10px] uppercase tracking-[0.18em] text-emerald-200">What I do</p>
                <p className="poppins-regular text-sm text-white leading-snug mt-1.5">Enter, submit and confirm every load, correctly and on time.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                onClick={() => router.push(FREE_TRIAL)}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-95"
              >
                Start a Free Two-Week Trial
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

          <div
            className="transition-all duration-700 delay-150"
            style={{ opacity: howRef.visible ? 1 : 0, transform: howRef.visible ? "none" : "translateY(24px)" }}
          >
            <TicketScene active={howRef.visible} />
          </div>
        </div>
      </section>

      {/* ── FREE EXTRA + READY FOR 2027 ────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div ref={extraRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: extraRef.visible ? 1 : 0, transform: extraRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Also from me</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">One Free Extra. One List.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                id: "introductions",
                icon: Handshake,
                tag: "Free",
                title: "Introductions",
                body: "Technical question, like classification or a permit change? I'll introduce you to qualified people I trust. Free.",
                cta: "WhatsApp Zak",
                href: WHATSAPP,
              },
              {
                id: "ready-2027",
                icon: Truck,
                tag: "From Oct 2027",
                title: "Ready for 2027",
                body: "Carriers, brokers and skip firms without a yard come into the system from October 2027. Join the list and I'll keep you updated.",
                cta: "Join the List",
                href: READY_2027,
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  id={item.id}
                  className="group flex flex-col p-7 sm:p-8 rounded-[1.75rem] border border-slate-200 hover:border-emerald-200 hover:shadow-[0_20px_50px_-20px_rgba(6,95,70,0.25)] hover:-translate-y-0.5 transition-all duration-500 scroll-mt-28"
                  style={{
                    opacity: extraRef.visible ? 1 : 0,
                    transform: extraRef.visible ? undefined : "translateY(16px)",
                    transitionDelay: extraRef.visible ? `${i * 120}ms` : "0ms",
                  }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-700 flex items-center justify-center transition-all duration-300">
                      <Icon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="poppins-semibold text-[10px] uppercase tracking-[0.2em] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="poppins-bold text-xl text-slate-900 mb-2">{item.title}</h3>
                  <p className="poppins-regular text-[15px] text-slate-600 leading-relaxed mb-6 flex-1">{item.body}</p>
                  <a
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group/btn inline-flex items-center gap-1.5 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800"
                  >
                    {item.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div ref={whoRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: whoRef.visible ? 1 : 0, transform: whoRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Who it&apos;s for</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Waste Sites.{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">And Anyone With a Permit.</span>
            </h2>
          </div>
          <SiteTypeStrip run={whoRef.visible} />
        </div>
      </section>

      {/* ── HOW PRICING WORKS ──────────────────────────────────────────────── */}
      <section className="pt-4 pb-24 px-4 sm:px-6 bg-white">
        <div ref={paidRef.ref} className="max-w-4xl mx-auto">
          <div
            className="relative p-7 sm:p-9 rounded-[1.75rem] bg-gradient-to-br from-emerald-800 to-emerald-950 overflow-hidden shadow-[0_30px_70px_-30px_rgba(6,95,70,0.6)] transition-all duration-700"
            style={{ opacity: paidRef.visible ? 1 : 0, transform: paidRef.visible ? "none" : "translateY(16px)" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="poppins-bold text-white text-lg leading-tight">How pricing works</p>
                  <p className="poppins-regular text-emerald-200/80 text-xs mt-0.5">Agreed upfront. No hidden extras.</p>
                </div>
              </div>
              <div className="divide-y divide-white/10">
                {priceLines.map((l, i) => (
                  <div
                    key={l.who}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-3.5 transition-all duration-700"
                    style={{
                      opacity: paidRef.visible ? 1 : 0,
                      transform: paidRef.visible ? "none" : "translateX(-8px)",
                      transitionDelay: paidRef.visible ? `${250 + i * 120}ms` : "0ms",
                    }}
                  >
                    <p className="poppins-medium text-sm text-emerald-200">{l.who}</p>
                    <p className="poppins-semibold text-sm sm:text-base text-white">{l.how}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-7">
                <button
                  onClick={() => openBooking("discovery")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 poppins-semibold text-sm transition-all duration-300 active:scale-[0.98]"
                >
                  Book a Free 15-Minute Call
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 bg-white/5 hover:bg-white/15 text-white poppins-semibold text-sm transition-all duration-300"
                >
                  WhatsApp Zak
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes svWord {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes svFade {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes svShine { to { background-position: -200% 0; } }
        @keyframes svSweep { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes svPing  { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.6); opacity: 0; } }

        .sv-word, .sv-fade { opacity: 0; }
        .sv-in .sv-word { animation: svWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .sv-in .sv-fade { animation: svFade 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .sv-in .sv-shine { animation: svWord 0.9s cubic-bezier(0.22,1,0.36,1) both, svShine 6s linear 1.6s infinite; }
        .sv-sweep { animation: svSweep 10s ease-in-out infinite; }
        .sv-ping { opacity: 0; animation: svPing 1s cubic-bezier(0,0,0.2,1) both; }

        .sv-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(380px circle at var(--mx, 50%) var(--my, 0%), rgba(16,185,129,0.09), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .sv-card:hover::before { opacity: 1; }

        @media (prefers-reduced-motion: reduce) {
          .sv-word, .sv-fade { opacity: 1; }
          .sv-in .sv-word, .sv-in .sv-fade, .sv-in .sv-shine, .sv-sweep, .sv-ping { animation: none !important; }
        }
      ` }} />
    </div>
  )
}
