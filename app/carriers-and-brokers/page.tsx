"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  FileText,
  Handshake,
  Loader2,
  Phone,
  Repeat,
  Route,
  Truck,
  Container,
  MessageCircle,
  Bell,
  ClipboardCheck,
  Send,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

/* ─── Motion helpers ──────────────────────────────────────────────────────── */
const EASE = "cubic-bezier(0.22,1,0.36,1)"

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

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

/** Writes 0→1 scroll progress to the element as --p without re-rendering. */
function useScrollVar<T extends HTMLElement>(start = 0.9, end = 0.3) {
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

const fadeUp = (show: boolean, delay = 0): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transform: show ? "none" : "translateY(28px)",
  filter: show ? "blur(0)" : "blur(6px)",
  transition: `opacity 1s ${EASE} ${delay}ms, transform 1s ${EASE} ${delay}ms, filter 1s ${EASE} ${delay}ms`,
})

/* ─── Data (from GOV.UK and the Environment Agency) ───────────────────────── */
const WHATSAPP = "https://wa.me/447762270113"
const MANDATORY = new Date("2027-10-01T00:00:00+01:00")

const timeline = [
  { when: "Autumn 2026", title: "Private Beta", body: "An invited group of waste collectors start testing the service. More are added over time." },
  { when: "Spring 2027", title: "Public Beta", body: "The service opens to all waste collectors. A good time to start, with no pressure." },
  { when: "October 2027", title: "Mandatory", body: "Digital waste tracking becomes a must for waste carriers, brokers and dealers." },
]

const who = [
  { icon: Truck,     title: "Carriers", body: "You collect or move waste. Hauliers, skip firms and man-and-van firms." },
  { icon: Handshake, title: "Brokers",  body: "You arrange for someone else to collect or move waste." },
  { icon: Repeat,    title: "Dealers",  body: "You buy or sell waste, even if someone else moves it." },
  { icon: Container, title: "Skip Firms Without a Yard", body: "If you don't run a permitted site, you come in with this group." },
]

const needs = [
  {
    icon: BadgeCheck,
    title: "A Valid Registration",
    body: "You must be registered as a carrier, broker or dealer. Your number starts with CB. Not registered can mean an unlimited fine.",
    facts: ["New registration £191.02", "Upper tier renews every 3 years (£130.25)", "Lower tier never renews"],
    status: "Needed now",
    links: [
      { label: "Check the Public Register", href: "https://environment.data.gov.uk/public-register/view/search-waste-carriers-brokers" },
      { label: "Register or Renew", href: "https://wastecarriersregistration.service.gov.uk/" },
    ],
  },
  {
    icon: FileText,
    title: "Your Paper Notes, Still",
    body: "Keep doing waste transfer notes and consignment notes. Digital tracking is extra, not a swap. For now.",
    facts: ["Waste transfer notes", "Hazardous consignment notes"],
    status: "Needed now",
    links: [],
  },
  {
    icon: Route,
    title: "Every Movement, Recorded",
    body: "Defra is building a way to log each load from the moment it's arranged until it reaches the site that takes it.",
    facts: ["Visible to regulators", "Exact fields not published yet"],
    status: "From Oct 2027",
    links: [],
  },
  {
    icon: Send,
    title: "A Way to Send It",
    body: "Sites today can link their software or upload a simple spreadsheet. The routes for collectors will be confirmed in the beta.",
    facts: ["Software link (API)", "Simpler route to be confirmed"],
    status: "From Oct 2027",
    links: [],
  },
]

const help = [
  { icon: Bell,           title: "Plain-English Updates", body: "Short notes when Defra shares something new. No jargon, no spam." },
  { icon: ClipboardCheck, title: "A Free Paperwork Check", body: "I check your registration and notes now, so you start clean." },
  { icon: Route,          title: "Set Up in the Beta",    body: "When the public beta opens, I help you get going early." },
  { icon: Send,           title: "Done for You",          body: "From October 2027, send me your tickets. I report them for you." },
]

const roleOptions = [
  { id: "carrier", label: "Carrier" },
  { id: "broker",  label: "Broker" },
  { id: "dealer",  label: "Dealer" },
  { id: "skip",    label: "Skip Firm" },
]

const sources = [
  { label: "Defra: Digital Waste Tracking Service", href: "https://www.gov.uk/government/publications/digital-waste-tracking-service/digital-waste-tracking-service" },
  { label: "Environment Agency: Digital Waste Tracking Goes Live", href: "https://environmentagency.blog.gov.uk/2026/04/30/digital-waste-tracking-goes-live-a-major-step-forward-in-stopping-waste-crime/" },
  { label: "GOV.UK: Register as a Waste Carrier, Broker or Dealer", href: "https://www.gov.uk/waste-carrier-or-broker-registration" },
]

/* ─── Countdown ───────────────────────────────────────────────────────────── */
function useDaysLeft() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    const calc = () => setDays(Math.max(0, Math.ceil((MANDATORY.getTime() - Date.now()) / 86_400_000)))
    calc()
    const id = setInterval(calc, 60_000)
    return () => clearInterval(id)
  }, [])
  return days
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (prefersReducedMotion()) { setN(to); return }
    let raf = 0
    const t0 = performance.now()
    const dur = 1600
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur)
      setN(Math.round(to * (1 - Math.pow(1 - k, 4))))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, run])
  return <>{n.toLocaleString("en-GB")}</>
}

/* ─── Sign-up form ────────────────────────────────────────────────────────── */
function JoinForm() {
  const [roles, setRoles] = useState<string[]>([])
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState("")

  const toggle = (id: string) => setRoles((r) => (r.includes(id) ? r.filter((x) => x !== id) : [...r, id]))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: String(fd.get("name") || ""),
      business: String(fd.get("business") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      registration: String(fd.get("registration") || ""),
      notes: String(fd.get("notes") || ""),
      roles,
    }
    setState("sending")
    setError("")
    try {
      const res = await fetch("/api/join-2027", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.")
      setFirstName(payload.name.split(" ")[0])
      setState("done")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setState("error")
    }
  }

  if (state === "done") {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center text-center px-6 py-16 cb-pop">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 cb-ring" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-9 w-9 text-white" strokeWidth={3} />
          </div>
        </div>
        <h3 className="poppins-bold text-3xl sm:text-4xl tracking-[-0.02em] text-white">You&apos;re on the List{firstName ? `, ${firstName}` : ""}.</h3>
        <p className="poppins-regular text-lg text-slate-400 mt-4 max-w-sm leading-relaxed">
          Check your inbox for a short welcome. I&apos;ll be in touch when there&apos;s news worth knowing.
        </p>
      </div>
    )
  }

  const field =
    "w-full rounded-2xl bg-white/[0.06] border border-white/10 px-4 py-3.5 poppins-regular text-[15px] text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-emerald-400/70 focus:bg-white/[0.09] focus:ring-4 focus:ring-emerald-400/10"

  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-10">
      <p className="poppins-medium text-sm text-slate-300 mb-3">What do you do?</p>
      <div className="flex flex-wrap gap-2 mb-7">
        {roleOptions.map((r) => {
          const on = roles.includes(r.id)
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => toggle(r.id)}
              aria-pressed={on}
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 poppins-medium text-sm transition-all duration-300 active:scale-95"
              style={{
                background: on ? "rgb(16 185 129)" : "rgba(255,255,255,0.06)",
                color: on ? "white" : "rgb(203 213 225)",
                border: `1px solid ${on ? "rgb(16 185 129)" : "rgba(255,255,255,0.1)"}`,
              }}
            >
              <Check className="w-3.5 h-3.5 transition-all duration-300" style={{ width: on ? 14 : 0, opacity: on ? 1 : 0 }} strokeWidth={3} />
              {r.label}
            </button>
          )
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required placeholder="Your name" autoComplete="name" className={field} />
        <input name="business" placeholder="Business name" autoComplete="organization" className={field} />
        <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
        <input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" className={field} />
        <input name="registration" placeholder="CB number (optional)" className={`${field} sm:col-span-2`} />
        <textarea name="notes" rows={3} placeholder="Anything I should know? (optional)" className={`${field} sm:col-span-2 resize-none`} />
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 poppins-medium text-sm text-rose-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group relative mt-7 w-full overflow-hidden inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 px-7 py-4 poppins-semibold text-[15px] text-white transition-colors duration-300 disabled:opacity-70"
      >
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent cb-shine" />
        {state === "sending" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        {state === "sending" ? "Joining…" : "Join the Ready for 2027 List"}
        {state === "sending" ? null : <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
      </button>
      <p className="mt-4 text-center poppins-regular text-xs text-slate-500">Free. No obligation. Unsubscribe any time.</p>
    </form>
  )
}

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function CarriersAndBrokersPage() {
  const [loaded, setLoaded] = useState(false)
  const days = useDaysLeft()

  const statsRef = useInView<HTMLDivElement>(0.3)
  const lineRef = useScrollVar<HTMLDivElement>(0.85, 0.35)
  const timeRef = useInView<HTMLDivElement>(0.2)
  const whoRef = useInView<HTMLDivElement>(0.15)
  const needRef = useInView<HTMLDivElement>(0.1)
  const helpRef = useInView<HTMLDivElement>(0.15)
  const joinRef = useInView<HTMLDivElement>(0.15)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const rise = (delay: number) => fadeUp(loaded, delay)

  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 px-6 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-20 -translate-x-1/2 h-[560px] w-[1000px] max-w-[150vw] rounded-full bg-[radial-gradient(closest-side,rgba(167,243,208,0.5),transparent)] blur-2xl" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-slate-200/80 px-4 py-1.5 mb-8 shadow-sm" style={rise(0)}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="poppins-medium text-[13px] text-slate-600">For Carriers, Brokers and Dealers</span>
          </div>

          <h1 className="poppins-bold text-[2.9rem] leading-[1.03] sm:text-7xl md:text-[5.75rem] tracking-[-0.04em] text-slate-900">
            <span className="block" style={rise(100)}>Ready for</span>
            <span className="block bg-gradient-to-b from-emerald-500 to-emerald-800 bg-clip-text text-transparent pb-2" style={rise(220)}>
              October 2027.
            </span>
          </h1>

          <p className="poppins-regular text-lg sm:text-[1.35rem] text-slate-500 max-w-2xl mx-auto mt-7 leading-relaxed" style={rise(360)}>
            Digital waste tracking is coming to every waste collector. Join the list and I&apos;ll get you ready, in plain English.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center" style={rise(480)}>
            <a
              href="#join"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3.5 poppins-semibold text-sm text-white hover:bg-slate-800 transition-colors duration-300"
            >
              Join the List
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a href="#changing" className="group inline-flex items-center gap-1.5 px-5 py-3.5 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800">
              What&apos;s Changing
              <ArrowRight className="w-4 h-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef.ref} className="relative max-w-4xl mx-auto mt-20 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-[28px] overflow-hidden bg-slate-200/70 border border-slate-200/70 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.18)]">
          {[
            { big: days === null ? "—" : <CountUp to={days} run={statsRef.inView} />, small: "Days Until October 2027" },
            { big: <><CountUp to={300000} run={statsRef.inView} /></>, small: "Registered Carriers, Brokers and Dealers" },
            { big: "2", small: "Steps Before It's a Must" },
          ].map((s, i) => (
            <div key={i} className="bg-white px-6 py-9 text-center" style={fadeUp(statsRef.inView, i * 120)}>
              <p className="poppins-bold text-5xl sm:text-[3.4rem] tracking-[-0.03em] text-slate-900 tabular-nums">{s.big}</p>
              <p className="poppins-medium text-[13px] text-slate-500 mt-2">{s.small}</p>
            </div>
          ))}
        </div>
        <p className="relative text-center poppins-regular text-xs text-slate-400 mt-4">Figures from Defra. Countdown to 1 October 2027.</p>
      </section>

      {/* ── TIMELINE ───────────────────────────────────────────────────────── */}
      <section id="changing" className="px-6 py-24 sm:py-32 bg-slate-50/70 border-y border-slate-100 scroll-mt-24">
        <div ref={timeRef.ref} className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-16" style={fadeUp(timeRef.inView)}>
            <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-4">What&apos;s Changing</p>
            <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.05] text-slate-900">
              Three Steps. <span className="text-slate-400">One Date to Remember.</span>
            </h2>
          </div>

          <div ref={lineRef} className="relative [--p:0]">
            {/* Line that draws as you scroll */}
            <div className="absolute left-[11px] md:left-0 md:right-0 top-0 bottom-0 md:bottom-auto md:top-[11px] w-px md:w-auto md:h-px bg-slate-200">
              <div
                className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-emerald-400 to-emerald-600 origin-top md:origin-left cb-line"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-10 md:gap-8">
              {timeline.map((t, i) => {
                const last = i === timeline.length - 1
                return (
                  <div key={t.when} className="relative pl-10 md:pl-0 md:pt-12" style={fadeUp(timeRef.inView, 200 + i * 160)}>
                    <span
                      className={`absolute left-0 md:left-0 top-1 md:top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        last ? "border-emerald-600 bg-emerald-600" : "border-emerald-500 bg-white"
                      }`}
                    >
                      {last ? <span className="h-2 w-2 rounded-full bg-white" /> : <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                    </span>
                    <p className={`poppins-semibold text-sm tabular-nums ${last ? "text-emerald-700" : "text-slate-500"}`}>{t.when}</p>
                    <h3 className="poppins-bold text-2xl sm:text-3xl tracking-[-0.02em] text-slate-900 mt-2 mb-3">{t.title}</h3>
                    <p className="poppins-regular text-base text-slate-500 leading-relaxed max-w-xs">{t.body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ───────────────────────────────────────────────────── */}
      <section className="px-6 py-24 sm:py-32">
        <div ref={whoRef.ref} className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14" style={fadeUp(whoRef.inView)}>
            <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-4">Who It&apos;s For</p>
            <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.05] text-slate-900">
              If You Move It, <span className="text-slate-400">You&apos;re In.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {who.map((w, i) => {
              const Icon = w.icon
              return (
                <div
                  key={w.title}
                  className="group rounded-[28px] border border-slate-200/80 bg-white p-7 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(6,95,70,0.3)] hover:border-emerald-200"
                  style={{ ...fadeUp(whoRef.inView, 120 + i * 110), transition: `${fadeUp(whoRef.inView, 120 + i * 110).transition}, translate 0.5s ${EASE}, box-shadow 0.5s ${EASE}, border-color 0.5s ${EASE}` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-slate-900 flex items-center justify-center mb-8 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-300 transition-colors duration-500" />
                  </div>
                  <h3 className="poppins-bold text-xl tracking-[-0.01em] text-slate-900 mb-2">{w.title}</h3>
                  <p className="poppins-regular text-[15px] text-slate-500 leading-relaxed">{w.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL NEED ───────────────────────────────────────────────── */}
      <section className="px-6 pb-24 sm:pb-32">
        <div ref={needRef.ref} className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14" style={fadeUp(needRef.inView)}>
            <div className="max-w-3xl">
              <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-4">What You&apos;ll Need</p>
              <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.05] text-slate-900">
                Four Things. <span className="text-slate-400">Two of Them Today.</span>
              </h2>
            </div>
            <p className="poppins-regular text-sm text-slate-400 max-w-xs">Taken from GOV.UK and the Environment Agency. Sources at the bottom of the page.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {needs.map((n, i) => {
              const Icon = n.icon
              const now = n.status === "Needed now"
              return (
                <div
                  key={n.title}
                  className="relative flex flex-col rounded-[28px] border border-slate-200/80 bg-white p-8 sm:p-9"
                  style={fadeUp(needRef.inView, 150 + i * 120)}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${now ? "bg-slate-900" : "bg-slate-100"}`}>
                      <Icon className={`w-5 h-5 ${now ? "text-emerald-300" : "text-slate-500"}`} />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 poppins-semibold text-[11px] ${
                        now ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {n.status}
                    </span>
                  </div>
                  <h3 className="poppins-bold text-2xl tracking-[-0.015em] text-slate-900 mb-3">{n.title}</h3>
                  <p className="poppins-regular text-base text-slate-500 leading-relaxed mb-6">{n.body}</p>
                  <ul className="space-y-2.5 mb-2">
                    {n.facts.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 poppins-medium text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {n.links.length > 0 && (
                    <div className="mt-auto pt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {n.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-1 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800"
                        >
                          {l.label}
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW I HELP ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 sm:py-32 bg-slate-50/70 border-y border-slate-100">
        <div ref={helpRef.ref} className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-14" style={fadeUp(helpRef.inView)}>
            <p className="poppins-semibold text-[13px] text-emerald-700 tracking-wide mb-4">How I Help</p>
            <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.05] text-slate-900">
              From Now <span className="text-slate-400">to Day One.</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {help.map((h, i) => {
              const Icon = h.icon
              return (
                <div key={h.title} style={fadeUp(helpRef.inView, 120 + i * 110)}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center">
                      <Icon className="w-[18px] h-[18px] text-emerald-600" />
                    </div>
                    <span className="poppins-semibold text-[13px] text-slate-400 tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className="poppins-bold text-xl tracking-[-0.01em] text-slate-900 mb-2">{h.title}</h3>
                  <p className="poppins-regular text-[15px] text-slate-500 leading-relaxed">{h.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── JOIN ───────────────────────────────────────────────────────────── */}
      <section id="join" className="px-4 sm:px-6 py-24 sm:py-32 scroll-mt-20">
        <div
          ref={joinRef.ref}
          className="relative max-w-6xl mx-auto overflow-hidden rounded-[36px] bg-slate-950"
          style={{
            opacity: joinRef.inView ? 1 : 0,
            transform: joinRef.inView ? "none" : "translateY(32px) scale(0.98)",
            transition: `opacity 1.1s ${EASE}, transform 1.1s ${EASE}`,
          }}
        >
          <div className="pointer-events-none absolute -top-40 -left-20 h-[480px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.35),transparent)] cb-glow" />
          <div className="relative grid lg:grid-cols-[1fr_1.15fr]">
            <div className="px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 lg:py-20">
              <p className="poppins-semibold text-[13px] text-emerald-400 tracking-wide mb-4">Ready for 2027</p>
              <h2 className="poppins-bold text-4xl sm:text-6xl tracking-[-0.035em] leading-[1.04] text-white">
                Join the List.
                <br />
                <span className="text-slate-500">Be Ready First.</span>
              </h2>
              <p className="poppins-regular text-lg text-slate-400 mt-6 leading-relaxed max-w-md">
                Takes a minute. I&apos;ll keep you updated and help you get set up before it becomes a must.
              </p>

              <div className="mt-10 space-y-3">
                <a href="tel:+447762270113" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:bg-white/[0.08] transition-colors duration-300">
                  <Phone className="w-5 h-5 text-emerald-400" />
                  <span>
                    <span className="block poppins-regular text-xs text-slate-500">Call or WhatsApp Zak</span>
                    <span className="block poppins-semibold text-white tabular-nums">07762 270 113</span>
                  </span>
                </a>
                <a href={`${WHATSAPP}?text=${encodeURIComponent("Hi Zak, please add me to the Ready for 2027 list.")}`} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 hover:bg-white/[0.08] transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span>
                    <span className="block poppins-regular text-xs text-slate-500">Rather message?</span>
                    <span className="block poppins-semibold text-white">Join on WhatsApp</span>
                  </span>
                  <ArrowUpRight className="ml-auto w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            <div className="lg:border-l border-white/10">
              <JoinForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── SOURCES ────────────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto border-t border-slate-100 pt-10">
          <p className="poppins-semibold text-[13px] text-slate-900 mb-4">Official Sources</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3">
            {sources.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 poppins-regular text-sm text-slate-500 hover:text-emerald-700 transition-colors">
                {s.label}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
          <p className="poppins-regular text-xs text-slate-400 mt-6 max-w-2xl leading-relaxed">
            Dates are Defra&apos;s current plan and may change. The Defra Digital Waste Tracking helpdesk is on 03000 203 781, Monday to Friday, 8am to 5pm.
            Millstone Compliance is independent and not part of Defra or the Environment Agency.
          </p>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .cb-line { transform: scaleY(var(--p)); }
        @media (min-width: 768px) { .cb-line { transform: scaleX(var(--p)); } }
        @keyframes cbGlow { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        .cb-glow { animation: cbGlow 9s ease-in-out infinite; }
        @keyframes cbShine { 0%, 55% { left: -50%; } 100% { left: 150%; } }
        .cb-shine { animation: cbShine 3.6s ease-in-out infinite; }
        @keyframes cbPop { 0% { opacity: 0; transform: scale(0.94); } 100% { opacity: 1; transform: none; } }
        .cb-pop { animation: cbPop 0.7s ${EASE} both; }
        @keyframes cbRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.9); opacity: 0; } }
        .cb-ring { animation: cbRing 2s cubic-bezier(0,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cb-glow, .cb-shine, .cb-ring, .cb-pop { animation: none; }
        }
      ` }} />
    </div>
  )
}
