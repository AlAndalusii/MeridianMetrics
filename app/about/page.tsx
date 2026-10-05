"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  CheckCircle,
  Phone,
  Mail,
  BadgeCheck,
  ShieldCheck,
  History,
  Users,
  MessageSquare,
  Search,
  Handshake,
  Wallet,
  Landmark,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  }, [])
  return reduced
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
        const p = Math.min(1, (now - start) / 1100)
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
const story = [
  {
    icon: Landmark,
    tag: "Before",
    title: "I worked at HMRC",
    body: "There I learned to read rules, check records and spot numbers that don't add up.",
  },
  {
    icon: GraduationCap,
    tag: "Learning",
    title: "Cambridge certificate",
    body: "A Certificate in Circular Economy from the Cambridge Institute for Sustainability Leadership.",
  },
  {
    icon: Sparkles,
    tag: "Now",
    title: "I started Millstone",
    body: "A new Birmingham business, to make waste and compliance simple, using people I've checked myself.",
  },
]

const checks = [
  {
    icon: BadgeCheck,
    title: "Registration",
    body: "Every partner must hold the right licence, like a waste carrier registration. I check it on the public register myself.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance",
    body: "If something goes wrong on your job, you need to know it's covered. I check their insurance is in place and up to date.",
  },
  {
    icon: History,
    title: "Company History",
    body: "How long they've traded, and whether there are any red flags. I look at their company record before I send any work.",
  },
  {
    icon: Users,
    title: "References",
    body: "I speak to people they've worked for. A good firm is happy for you to ask, and a good reference tells you a lot.",
  },
  {
    icon: MessageSquare,
    title: "Feedback After Every Job",
    body: "The check doesn't stop. I ask you how it went after every job. If a partner slips, they come off my list.",
  },
]

const steps = [
  { icon: Phone, num: "01", title: "Tell me what you need", desc: "A bill check, a clearance, a survey or new customers. One call or WhatsApp." },
  { icon: Search, num: "02", title: "I match a vetted partner", desc: "Someone who has passed all five of my checks. I tell you how I'm paid." },
  { icon: Handshake, num: "03", title: "I follow up", desc: "After the job I check in with you. If it wasn't right, I sort it." },
]

const trust = ["Vetted Partners", "Licensed & Insured", "Birmingham Based", "Direct Line"]

/* ─── Partner file: the five checks tick in, then the partner is approved ── */
const FILE_STEPS = checks.length + 3 // five ticks, then hold on "approved"

function PartnerFile({ run, active, onPick }: { run: boolean; active: number; onPick: (i: number) => void }) {
  const approved = active >= checks.length
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(167,243,208,0.5)_0%,transparent_70%)] pointer-events-none rounded-3xl" />
      <div className="relative bg-white/85 backdrop-blur-xl rounded-[2rem] border border-emerald-100 shadow-[0_30px_80px_-30px_rgba(6,95,70,0.3)] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Handshake className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="poppins-semibold text-sm text-emerald-900 leading-tight">Partner file</p>
              <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Example: local waste firm</p>
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors duration-500 ${
              approved ? "bg-emerald-700 border-emerald-700" : "bg-emerald-50 border-emerald-100"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${approved ? "bg-white" : "bg-emerald-500 animate-pulse"}`} />
            <span className={`poppins-semibold text-[10px] ${approved ? "text-white" : "text-emerald-600"}`}>
              {approved ? "Approved" : "Checking"}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-5">
          {checks.map((c, i) => (
            <div key={c.title} className="flex-1 h-1 rounded-full bg-emerald-50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-700 ease-out"
                style={{ width: run && i < active ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {checks.map((c, i) => {
            const Icon = c.icon
            const done = run && i < active
            const now = run && i === active
            return (
              <button
                key={c.title}
                type="button"
                onClick={() => onPick(i)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl border text-left transition-all duration-500 ${
                  done
                    ? "bg-emerald-50/70 border-emerald-100"
                    : now
                    ? "bg-white border-emerald-300 shadow-[0_8px_24px_-10px_rgba(16,185,129,0.5)]"
                    : "bg-white border-slate-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                    done ? "bg-emerald-600 text-white" : now ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`flex-1 poppins-medium text-[13px] transition-colors duration-500 ${done || now ? "text-emerald-900" : "text-slate-400"}`}>
                  {c.title}
                </span>
                {done ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 ab-pop" />
                ) : now ? (
                  <span className="poppins-medium text-[10px] text-emerald-600">Checking…</span>
                ) : null}
              </button>
            )
          })}
        </div>

        {/* Approved stamp */}
        <div
          className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-700 text-white transition-all duration-700"
          style={{ opacity: approved ? 1 : 0.15, transform: approved ? "scale(1)" : "scale(0.97)" }}
        >
          <BadgeCheck className="w-4 h-4" />
          <span className="poppins-semibold text-sm">{approved ? "On my list. Ready for work." : "Not on my list yet"}</span>
        </div>
      </div>

      {/* Floating stat */}
      <div className="absolute -bottom-4 -left-2 sm:-left-5 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-3 shadow-xl animate-float-slow">
        <p className="poppins-bold text-xl text-emerald-900 leading-none">5</p>
        <p className="poppins-regular text-[10px] text-emerald-500 mt-1">Checks per partner</p>
      </div>
    </div>
  )
}

export default function MeetZakPage() {
  const reduced = usePrefersReducedMotion()
  const hero = useReveal<HTMLDivElement>(0.1)
  const storyRef = useReveal<HTMLDivElement>(0.25)
  const checksRef = useReveal<HTMLDivElement>(0.25)
  const stepsRef = useReveal<HTMLDivElement>(0.3)
  const numbersRef = useReveal<HTMLDivElement>(0.3)
  const contactRef = useReveal<HTMLDivElement>(0.2)

  // Partner file cycles through the checks; hovering or clicking takes over.
  const [check, setCheck] = useState(0)
  const [hold, setHold] = useState(false)
  useEffect(() => {
    if (!checksRef.visible || hold) return
    if (reduced) {
      setCheck(checks.length)
      return
    }
    const id = setInterval(() => setCheck((c) => (c + 1) % FILE_STEPS), 1100)
    return () => clearInterval(id)
  }, [checksRef.visible, hold, reduced])

  const focus = Math.min(check, checks.length - 1)
  const pick = (i: number) => {
    setHold(true)
    setCheck(i)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_78%_18%,rgba(209,250,229,0.5)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_70%_at_60%_30%,black_30%,transparent_100%)] pointer-events-none" />
        <div className="ab-sweep absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg] pointer-events-none" />

        <div ref={hero.ref} className={`max-w-6xl mx-auto relative z-10 ${hero.visible ? "ab-in" : ""}`}>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-16 items-center">
            {/* Words */}
            <div>
              <div className="ab-fade inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/80 border border-emerald-100 rounded-full mb-8 shadow-sm" style={{ animationDelay: "0ms" }}>
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-50" />
                  <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                <span className="poppins-semibold text-[11px] text-emerald-700 tracking-[0.18em] uppercase">Meet Zak · Birmingham</span>
              </div>

              <h1 className="poppins-bold text-5xl sm:text-6xl lg:text-7xl text-slate-900 leading-[1.02] tracking-tight">
                <span className="block">
                  {["No", "call", "centre."].map((w, i) => (
                    <React.Fragment key={w}>
                      <span className="ab-word inline-block" style={{ animationDelay: `${100 + i * 90}ms` }}>{w}</span>{" "}
                    </React.Fragment>
                  ))}
                </span>
                <span className="block mt-1">
                  <span
                    className="ab-word ab-shine inline-block pb-1 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700 bg-[length:200%_100%] bg-clip-text text-transparent"
                    style={{ animationDelay: "420ms" }}
                  >
                    No small print.
                  </span>
                </span>
              </h1>

              <p className="ab-fade poppins-regular text-lg sm:text-xl text-slate-600 max-w-lg mt-7 leading-relaxed" style={{ animationDelay: "650ms" }}>
                One call for vetted waste and compliance help in Birmingham. I find the right partner, and I&apos;ve checked them first.
              </p>

              <div className="ab-fade flex flex-wrap items-center gap-5 mt-9" style={{ animationDelay: "800ms" }}>
                <a
                  href="https://wa.me/447762270113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-300 shadow-[0_16px_40px_-12px_rgba(6,95,70,0.55)] active:scale-95"
                >
                  <span className="ab-btn-shine absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg]" />
                  <WhatsAppIcon className="relative w-5 h-5" />
                  <span className="relative">WhatsApp Me</span>
                </a>
                <a
                  href="tel:+447762270113"
                  className="group inline-flex items-center gap-2 poppins-semibold text-sm text-emerald-700 hover:text-emerald-800 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4" />
                  07762 270 113
                  <span className="w-0 group-hover:w-4 h-px bg-emerald-600 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Profile card */}
            <div
              className={`relative transition-all duration-1000 delay-300 ease-out ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(209,250,229,0.5)_0%,transparent_70%)] pointer-events-none rounded-3xl" />
              <div className="relative bg-white/85 backdrop-blur-xl rounded-[2rem] border border-emerald-100 shadow-[0_30px_80px_-30px_rgba(6,95,70,0.3)] p-7 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/30 ab-ping" />
                    <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="poppins-bold text-white text-xl">Z</span>
                    </div>
                  </div>
                  <div>
                    <p className="poppins-bold text-xl text-slate-900 leading-tight">Zak</p>
                    <p className="poppins-regular text-sm text-emerald-600 mt-0.5">Founder, Millstone Compliance</p>
                    <p className="poppins-regular text-xs text-slate-400 mt-1 inline-flex items-center gap-1"><MapPin className="w-3 h-3" />Birmingham</p>
                  </div>
                </div>

                <div className="mt-7 space-y-2.5">
                  {[
                    { img: "/University of Cambridge new Logo Vector.svg", alt: "University of Cambridge", title: "Cambridge Institute", sub: "Certificate in Circular Economy" },
                    { img: "/Screenshot 2025-08-31 at 21.43.30.png", alt: "HMRC", title: "Worked at HMRC", sub: "Rules, records and numbers" },
                  ].map((c, i) => (
                    <div
                      key={c.title}
                      className={`flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-3.5 py-3 transition-all duration-700 ${hero.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                      style={{ transitionDelay: hero.visible ? `${700 + i * 150}ms` : "0ms" }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center p-1.5 flex-shrink-0">
                        <Image src={c.img} alt={c.alt} width={30} height={30} className="object-contain w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="poppins-semibold text-[13px] text-emerald-900 leading-tight">{c.title}</p>
                        <p className="poppins-regular text-[11px] text-emerald-600/80 mt-0.5">{c.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-emerald-50 grid grid-cols-3 gap-3 text-center">
                  {[
                    { v: "5", l: "Checks per partner" },
                    { v: "1", l: "Call to sort it" },
                    { v: "1-1", l: "Direct access" },
                  ].map((s) => (
                    <div key={s.l}>
                      <p className="poppins-bold text-xl text-emerald-900 leading-none">{s.v}</p>
                      <p className="poppins-regular text-[10px] text-emerald-500 mt-1.5 leading-tight">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating chip */}
              <div className="absolute -top-4 -right-2 sm:-right-5 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-2.5 shadow-xl animate-float-slow">
                <p className="poppins-semibold text-xs text-emerald-900 leading-none">You&apos;ll talk to me</p>
                <p className="poppins-regular text-[10px] text-emerald-500 mt-1">Not a call centre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY I STARTED ────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_20%_50%,rgba(209,250,229,0.3)_0%,transparent_70%)] pointer-events-none" />

        <div ref={storyRef.ref} className={`max-w-6xl mx-auto relative z-10 ${storyRef.visible ? "ab-in" : ""}`}>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-32">
              <div className="ab-fade flex items-center gap-3 mb-7" style={{ animationDelay: "0ms" }}>
                <div className="h-px w-8 bg-emerald-400" />
                <span className="poppins-semibold text-[11px] text-emerald-600 uppercase tracking-[0.22em]">Why I started</span>
              </div>
              <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-[1.05] tracking-tight">
                <span className="ab-word inline-block" style={{ animationDelay: "100ms" }}>One call.</span>
                <br />
                <span
                  className="ab-word inline-block pb-1 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent"
                  style={{ animationDelay: "260ms" }}
                >
                  People I&apos;ve checked.
                </span>
              </h2>
              <p className="ab-fade poppins-regular text-base sm:text-lg text-slate-600 leading-relaxed mt-6 max-w-md" style={{ animationDelay: "420ms" }}>
                Millstone Compliance is a new Birmingham business. Finding someone you can trust takes time. So I do the checking, and you make one call.
              </p>
              <div className="ab-fade mt-7 pl-5 border-l-2 border-emerald-400 max-w-md" style={{ animationDelay: "540ms" }}>
                <p className="poppins-semibold text-base text-emerald-900 leading-relaxed">
                  Local. Plain English. A direct line to me. Always upfront about how I get paid.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-10 sm:pl-14">
              <div className="absolute left-[19px] sm:left-[23px] top-2 bottom-2 w-px bg-emerald-100" />
              <div
                className="absolute left-[19px] sm:left-[23px] top-2 w-px bg-gradient-to-b from-emerald-400 to-emerald-700 transition-all ease-out"
                style={{ height: storyRef.visible ? "calc(100% - 16px)" : "0%", transitionDuration: "1800ms", transitionDelay: "300ms" }}
              />
              <div className="space-y-6">
                {story.map((s, i) => {
                  const Icon = s.icon
                  const last = i === story.length - 1
                  return (
                    <div
                      key={s.title}
                      className={`relative transition-all duration-700 ${storyRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                      style={{ transitionDelay: storyRef.visible ? `${400 + i * 450}ms` : "0ms" }}
                    >
                      <div
                        className={`absolute -left-10 sm:-left-14 top-5 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center border-4 border-white shadow-md ${
                          last ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div
                        className={`ml-4 rounded-3xl p-6 sm:p-7 border transition-shadow duration-500 ${
                          last
                            ? "bg-gradient-to-br from-emerald-700 to-emerald-900 border-emerald-700 shadow-[0_24px_60px_-24px_rgba(6,95,70,0.6)]"
                            : "bg-white border-emerald-100 shadow-[0_4px_24px_rgba(6,95,70,0.06)] hover:shadow-[0_16px_40px_-16px_rgba(6,95,70,0.2)]"
                        }`}
                      >
                        <p className={`poppins-semibold text-[10px] uppercase tracking-[0.2em] ${last ? "text-emerald-200" : "text-emerald-500"}`}>{s.tag}</p>
                        <h3 className={`poppins-bold text-xl mt-2 ${last ? "text-white" : "text-slate-900"}`}>{s.title}</h3>
                        <p className={`poppins-regular text-[15px] leading-relaxed mt-2 ${last ? "text-emerald-100/90" : "text-slate-600"}`}>{s.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FIVE PARTNER CHECKS ──────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(209,250,229,0.35)_0%,transparent_70%)] pointer-events-none" />

        <div ref={checksRef.ref} className={`max-w-6xl mx-auto relative z-10 ${checksRef.visible ? "ab-in" : ""}`}>
          <div className="text-center mb-14">
            <div className="ab-fade inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-5" style={{ animationDelay: "0ms" }}>
              <span className="poppins-semibold text-[10px] text-emerald-700 uppercase tracking-[0.2em]">The five checks</span>
            </div>
            <h2 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-tight tracking-tight">
              <span className="ab-word inline-block" style={{ animationDelay: "100ms" }}>Every partner checked.</span>
              <br />
              <span
                className="ab-word inline-block pb-1 bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent"
                style={{ animationDelay: "260ms" }}
              >
                Before they get any work.
              </span>
            </h2>
            <p className="ab-fade poppins-regular text-base sm:text-lg text-slate-600 max-w-lg mx-auto mt-4" style={{ animationDelay: "420ms" }}>
              Here&apos;s what I check on every partner, and why it matters.
            </p>
          </div>

          <div
            className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center"
            onMouseLeave={() => setHold(false)}
          >
            {/* Check list */}
            <div className="space-y-3">
              {checks.map((c, i) => {
                const Icon = c.icon
                const on = checksRef.visible && i === focus && check < checks.length
                return (
                  <button
                    key={c.title}
                    type="button"
                    onMouseEnter={() => pick(i)}
                    onFocus={() => pick(i)}
                    onClick={() => pick(i)}
                    className={`group w-full text-left flex items-start gap-4 sm:gap-5 rounded-2xl border p-5 sm:p-6 transition-all duration-500 ${
                      on
                        ? "bg-white border-emerald-300 shadow-[0_20px_50px_-24px_rgba(6,95,70,0.35)]"
                        : "bg-white/60 border-emerald-100/70 hover:bg-white"
                    } ${checksRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: checksRef.visible ? `${300 + i * 90}ms` : "0ms" }}
                  >
                    <span className={`poppins-bold text-2xl tabular-nums transition-colors duration-500 w-8 flex-shrink-0 ${on ? "text-emerald-600" : "text-emerald-200"}`}>
                      0{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 transition-colors duration-500 ${on ? "text-emerald-600" : "text-emerald-400"}`} />
                        <h3 className="poppins-bold text-base text-slate-900">{c.title}</h3>
                      </div>
                      <div
                        className="grid transition-all duration-500 ease-out"
                        style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                      >
                        <p className="overflow-hidden poppins-regular text-sm text-slate-600 leading-relaxed">
                          <span className="block pt-2">{c.body}</span>
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Partner file */}
            <div
              className={`transition-all duration-1000 delay-200 ${checksRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <PartnerFile run={checksRef.visible} active={check} onPick={pick} />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div ref={stepsRef.ref} className={`max-w-5xl mx-auto ${stepsRef.visible ? "ab-in" : ""}`}>
          <div className="text-center mb-14">
            <div className="ab-fade inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-4" style={{ animationDelay: "0ms" }}>
              <span className="poppins-semibold text-[10px] text-emerald-700 uppercase tracking-[0.2em]">How it works</span>
            </div>
            <h2 className="ab-word poppins-bold text-3xl sm:text-4xl text-slate-900 leading-tight" style={{ animationDelay: "100ms" }}>
              Three steps. No jargon.
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line with a travelling light */}
            <div className="hidden sm:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-emerald-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all ease-out"
                style={{ width: stepsRef.visible ? "100%" : "0%", transitionDuration: "1600ms", transitionDelay: "300ms" }}
              />
              {stepsRef.visible && !reduced && <div className="ab-travel absolute top-0 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />}
            </div>

            <div className="grid sm:grid-cols-3 gap-8 sm:gap-6">
              {steps.map((s, i) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.num}
                    className={`text-center transition-all duration-700 ${stepsRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                    style={{ transitionDelay: stepsRef.visible ? `${300 + i * 400}ms` : "0ms" }}
                  >
                    <div className="relative inline-block">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 shadow-[0_12px_30px_-12px_rgba(16,185,129,0.5)] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-700" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-700 border-2 border-white text-white text-[11px] poppins-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="poppins-bold text-lg text-slate-900 mt-5">{s.title}</h3>
                    <p className="poppins-regular text-sm text-slate-600 leading-relaxed mt-2 max-w-[260px] mx-auto">{s.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── NUMBERS + HOW I'M PAID ───────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div ref={numbersRef.ref} className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
          <div
            className={`grid grid-cols-2 rounded-[1.75rem] border border-emerald-100 overflow-hidden bg-white transition-all duration-700 ${numbersRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {[
              { n: 5, pre: "", label: "Checks on every partner" },
              { n: 1, pre: "", label: "Call to sort it" },
              { n: 0, pre: "£", label: "Bill check if no saving" },
              { n: 1, pre: "1-", label: "Direct access" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`hover:bg-emerald-50/50 px-6 py-9 text-center transition-colors duration-300 border-emerald-100 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}
              >
                <p className="poppins-bold text-4xl sm:text-5xl text-emerald-900 tabular-nums">
                  {s.pre}
                  <CountUp to={s.n} run={numbersRef.visible} delay={200 + i * 120} />
                </p>
                <p className="poppins-medium text-[11px] text-emerald-500 uppercase tracking-[0.14em] mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          <div
            className={`relative rounded-[1.75rem] bg-gradient-to-br from-emerald-700 to-emerald-950 p-7 sm:p-8 overflow-hidden shadow-[0_30px_70px_-30px_rgba(6,95,70,0.6)] flex flex-col justify-between transition-all duration-700 delay-150 ${numbersRef.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-5">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <p className="poppins-bold text-2xl text-white mb-3 leading-tight">How I&apos;m paid</p>
              <p className="poppins-regular text-sm text-emerald-100/90 leading-relaxed">
                Either you pay a simple fee, or the partner I send you to pays me a small cut. I tell you which one before you agree to anything. The bill check is free: no saving, no fee.
              </p>
            </div>
            <p className="relative poppins-semibold text-xs text-white/80 mt-6">No hidden fees. No surprises.</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(209,250,229,0.5)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_100%)] pointer-events-none" />

        <div ref={contactRef.ref} className={`max-w-2xl mx-auto relative z-10 text-center ${contactRef.visible ? "ab-in" : ""}`}>
          <div className="ab-fade inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-emerald-100 rounded-full mb-8 shadow-sm" style={{ animationDelay: "0ms" }}>
            <span className="poppins-semibold text-[11px] text-emerald-700 uppercase tracking-widest">Get in touch</span>
          </div>

          <h2 className="ab-word poppins-bold text-5xl sm:text-6xl md:text-7xl text-slate-900 mb-4 leading-tight tracking-tight" style={{ animationDelay: "100ms" }}>
            Ready to talk?
          </h2>
          <p className="ab-fade poppins-regular text-lg text-emerald-700 mb-10" style={{ animationDelay: "300ms" }}>
            WhatsApp or call. You&apos;ll talk to me.
          </p>

          <a
            href="tel:+447762270113"
            className="ab-fade block poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 hover:text-emerald-700 transition-colors duration-200 mb-10 tabular-nums"
            style={{ animationDelay: "420ms" }}
          >
            07762 270 113
          </a>

          <div className="ab-fade flex flex-col sm:flex-row justify-center gap-3 mb-10" style={{ animationDelay: "540ms" }}>
            <a
              href="https://wa.me/447762270113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white poppins-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <WhatsAppIcon />
              Message on WhatsApp
            </a>
            <a
              href="mailto:hello@millstonecompliance.com"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <Mail className="w-4 h-4" />
              hello@millstonecompliance.com
            </a>
          </div>

          <div className="ab-fade flex flex-wrap justify-center gap-4" style={{ animationDelay: "660ms" }}>
            {trust.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 poppins-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes abWord {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes abFade {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes abShine  { to { background-position: -200% 0; } }
        @keyframes abSweep  { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes abBtn    { 0%, 60% { left: -50%; } 100% { left: 150%; } }
        @keyframes abPing   { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
        @keyframes abPop    { 0% { transform: scale(0.4); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes abTravel { 0% { left: -6rem; } 100% { left: 100%; } }

        .ab-word, .ab-fade { opacity: 0; }
        .ab-in .ab-word { animation: abWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .ab-in .ab-fade { animation: abFade 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .ab-in .ab-shine { animation: abWord 0.9s cubic-bezier(0.22,1,0.36,1) both, abShine 6s linear 1.6s infinite; }
        .ab-sweep { animation: abSweep 10s ease-in-out infinite; }
        .ab-btn-shine { animation: abBtn 3.5s ease-in-out infinite; }
        .ab-ping { animation: abPing 2.4s cubic-bezier(0,0,0.2,1) infinite; }
        .ab-pop { animation: abPop 0.45s cubic-bezier(0.22,1,0.36,1) both; }
        .ab-travel { animation: abTravel 3s ease-in-out 2s infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ab-word, .ab-fade { opacity: 1; }
          .ab-in .ab-word, .ab-in .ab-fade, .ab-in .ab-shine,
          .ab-sweep, .ab-btn-shine, .ab-ping, .ab-pop, .ab-travel { animation: none !important; }
        }
      ` }} />
    </div>
  )
}
