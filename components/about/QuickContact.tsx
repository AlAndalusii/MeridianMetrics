"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Loader2, Mail, Phone, Truck } from "lucide-react"

const EASE = "cubic-bezier(0.22,1,0.36,1)"
const PHONE_DISPLAY = "07762 270 113"
const PHONE_TEL = "tel:+447762270113"
const EMAIL = "hello@millstonecompliance.com"


const callTimes = [
  { id: "morning",   label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening",   label: "Evening" },
  { id: "any",       label: "Any Time" },
]

const trust = ["Done for You", "Proof Every Friday", "Birmingham Based", "Direct Line"]

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setInView(true); return }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

const rise = (show: boolean, delay = 0): React.CSSProperties => ({
  opacity: show ? 1 : 0,
  transform: show ? "none" : "translateY(24px)",
  filter: show ? "blur(0)" : "blur(6px)",
  transition: `opacity 1s ${EASE} ${delay}ms, transform 1s ${EASE} ${delay}ms, filter 1s ${EASE} ${delay}ms`,
})

/* ─── Quick action row ────────────────────────────────────────────────────── */
function Action({
  href, icon, label, value, external, accent,
}: {
  href: string
  icon: React.ReactNode
  label: string
  value: string
  external?: boolean
  accent: string
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-[20px] border border-slate-200/80 bg-white px-5 py-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_24px_48px_-24px_rgba(6,95,70,0.35)] active:scale-[0.99]"
    >
      <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-105 ${accent}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block poppins-regular text-[13px] text-slate-500">{label}</span>
        <span className="block truncate poppins-semibold text-[17px] text-slate-900 tabular-nums">{value}</span>
      </span>
      <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600" />
    </a>
  )
}

/* ─── The form ────────────────────────────────────────────────────────────── */
function ContactForm() {
  const [mode, setMode] = useState<"call" | "email">("call")
  const [callTime, setCallTime] = useState("any")
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle")
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      mode,
      callTime,
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    }
    setState("sending")
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.")
      setFirstName(payload.name.trim().split(" ")[0])
      setState("done")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setState("error")
    }
  }

  if (state === "done") {
    return (
      <div className="flex min-h-[460px] flex-col items-center justify-center px-6 py-14 text-center qc-pop">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 qc-ring" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-9 w-9 text-white" strokeWidth={3} />
          </div>
        </div>
        <h3 className="poppins-bold text-3xl tracking-[-0.02em] text-white">
          {mode === "call" ? "I'll Call You Soon" : "Message Sent"}{firstName ? `, ${firstName}` : ""}.
        </h3>
        <p className="mt-4 max-w-sm poppins-regular text-lg leading-relaxed text-slate-400">
          {mode === "call"
            ? "Keep your phone close. It'll be me on the line, not a call centre."
            : "Check your inbox for a quick confirmation. I'll reply personally."}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-8 poppins-semibold text-sm text-emerald-400 hover:text-emerald-300"
        >
          Send Another
        </button>
      </div>
    )
  }

  const field =
    "w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 poppins-regular text-[15px] text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-emerald-400/70 focus:bg-white/[0.09] focus:ring-4 focus:ring-emerald-400/10"

  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-10">
      {/* Call / Email switch */}
      <div className="relative mb-8 grid grid-cols-2 rounded-full bg-white/[0.06] p-1 border border-white/10" role="tablist" aria-label="How should I get back to you?">
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm"
          style={{ transform: mode === "call" ? "translateX(0)" : "translateX(100%)", transition: `transform 0.5s ${EASE}` }}
        />
        {(["call", "email"] as const).map((m) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => { setMode(m); setState("idle"); setError("") }}
            className="relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 poppins-semibold text-sm transition-colors duration-300"
            style={{ color: mode === m ? "rgb(15 23 42)" : "rgb(148 163 184)" }}
          >
            {m === "call" ? <Phone className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
            {m === "call" ? "Call Me Back" : "Email Me"}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        <input name="name" required placeholder="Your name" autoComplete="name" className={field} />

        {/* Fields swap with a soft cross-fade */}
        <div key={mode} className="grid gap-3 qc-swap">
          {mode === "call" ? (
            <>
              <input name="phone" type="tel" required placeholder="Phone number" autoComplete="tel" className={field} />
              <div>
                <p className="mb-2.5 mt-2 poppins-medium text-sm text-slate-300">Best time to call</p>
                <div className="flex flex-wrap gap-2">
                  {callTimes.map((t) => {
                    const on = callTime === t.id
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setCallTime(t.id)}
                        aria-pressed={on}
                        className="rounded-full px-4 py-2 poppins-medium text-sm transition-all duration-300 active:scale-95"
                        style={{
                          background: on ? "rgb(16 185 129)" : "rgba(255,255,255,0.06)",
                          color: on ? "white" : "rgb(203 213 225)",
                          border: `1px solid ${on ? "rgb(16 185 129)" : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>
              <textarea name="message" rows={2} placeholder="What's it about? (optional)" className={`${field} resize-none`} />
            </>
          ) : (
            <>
              <input name="email" type="email" required placeholder="Email" autoComplete="email" className={field} />
              <input name="phone" type="tel" placeholder="Phone (optional)" autoComplete="tel" className={field} />
              <textarea name="message" rows={4} required placeholder="How can I help?" className={`${field} resize-none`} />
            </>
          )}
        </div>
      </div>

      {state === "error" && (
        <p role="alert" className="mt-4 poppins-medium text-sm text-rose-300">{error}</p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="group relative mt-7 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-emerald-500 px-7 py-4 poppins-semibold text-[15px] text-white transition-colors duration-300 hover:bg-emerald-400 disabled:opacity-70"
      >
        <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent qc-shine" />
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {state === "sending" ? "Sending…" : mode === "call" ? "Call Me Back" : "Send Message"}
        {state === "sending" ? null : <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />}
      </button>
      <p className="mt-4 text-center poppins-regular text-xs text-slate-500">
        Goes straight to me. No call centre, no sales team.
      </p>
    </form>
  )
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export default function QuickContact() {
  const { ref, inView } = useInView<HTMLDivElement>(0.12)

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36 scroll-mt-20">
      <div className="pointer-events-none absolute left-1/2 top-10 h-[520px] w-[1000px] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(167,243,208,0.45),transparent)] blur-2xl" />

      <div ref={ref} className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left: say hello */}
          <div className="min-w-0 lg:pt-6">
            <p className="mb-4 poppins-semibold text-[13px] tracking-wide text-emerald-700" style={rise(inView, 0)}>Get in Touch</p>
            <h2 className="poppins-bold text-5xl leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-7xl" style={rise(inView, 100)}>
              Ready to Talk?
            </h2>
            <p className="mt-6 max-w-md poppins-regular text-lg leading-relaxed text-slate-500 sm:text-xl" style={rise(inView, 200)}>
              Call or email. Or leave your details and I&apos;ll get back to you. Either way, you&apos;ll talk to me.
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <div style={rise(inView, 300)}>
                <Action href={PHONE_TEL} label="Call Zak" value={PHONE_DISPLAY} accent="bg-slate-900" icon={<Phone className="h-5 w-5" />} />
              </div>
              <div style={rise(inView, 380)}>
                <Action href={`mailto:${EMAIL}`} label="Email" value={EMAIL} accent="bg-emerald-700" icon={<Mail className="h-5 w-5" />} />
              </div>
            </div>

            <div style={rise(inView, 560)}>
              <Link
                href="/carriers-and-brokers"
                className="group mt-6 flex items-center gap-3 rounded-2xl px-1 py-2 poppins-medium text-sm text-slate-600 hover:text-emerald-700 transition-colors"
              >
                <Truck className="h-4 w-4 text-emerald-600" />
                Carrier, broker or dealer? Join the Ready for 2027 list
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2" style={rise(inView, 640)}>
              {trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 poppins-medium text-xs text-slate-500">
                  <Check className="h-3.5 w-3.5 text-emerald-500" strokeWidth={3} />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: the form */}
          <div
            className="relative overflow-hidden rounded-[32px] bg-slate-950 shadow-[0_50px_100px_-40px_rgba(15,23,42,0.55)]"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(40px) scale(0.98)",
              transition: `opacity 1.1s ${EASE} 250ms, transform 1.1s ${EASE} 250ms`,
            }}
          >
            <div className="pointer-events-none absolute -right-24 -top-40 h-[420px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.35),transparent)] qc-glow" />
            <div className="relative">
              <div className="px-6 pt-8 sm:px-10 sm:pt-10">
                <p className="poppins-bold text-2xl tracking-[-0.02em] text-white">Leave Your Details</p>
                <p className="mt-1.5 poppins-regular text-[15px] text-slate-400">Takes 30 seconds.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes qcSwap { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: none; } }
        .qc-swap { animation: qcSwap 0.5s ${EASE} both; }
        @keyframes qcGlow { 0%,100% { opacity: 0.7; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
        .qc-glow { animation: qcGlow 9s ease-in-out infinite; }
        @keyframes qcShine { 0%, 55% { left: -50%; } 100% { left: 150%; } }
        .qc-shine { animation: qcShine 3.6s ease-in-out infinite; }
        @keyframes qcPop { 0% { opacity: 0; transform: scale(0.94); } 100% { opacity: 1; transform: none; } }
        .qc-pop { animation: qcPop 0.7s ${EASE} both; }
        @keyframes qcRing { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.9); opacity: 0; } }
        .qc-ring { animation: qcRing 2s cubic-bezier(0,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .qc-swap, .qc-glow, .qc-shine, .qc-pop, .qc-ring { animation: none; }
        }
      ` }} />
    </section>
  )
}
