"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Phone, Plus, Receipt, KeyRound, Handshake, CheckCircle } from "lucide-react"
import { useBooking } from "@/components/BookingProvider"

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

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const paths = [
  { icon: Receipt, who: "Small business", what: "Free waste bill check", href: "/services#small-businesses" },
  { icon: KeyRound, who: "Agent or landlord", what: "A vetted contractor", href: "/services#landlords" },
  { icon: Handshake, who: "Waste firm", what: "New local work", href: "/services#partners" },
]

const faqs = [
  {
    q: "What can you help with?",
    a: "Free waste bill checks for small businesses, vetted contractors for landlords and letting agents, and new customers for local waste firms. Plus urgent clearances and survey specialists.",
  },
  {
    q: "How do you check your partners?",
    a: "Five checks: registration, insurance, company history, references, and your feedback after every job. If a partner slips, they come off my list.",
  },
  {
    q: "How much does it cost?",
    a: "The bill check is free to start. If I find no saving, there's no fee. For other jobs, I tell you the price and how I'm paid before you agree to anything.",
  },
  {
    q: "How do you get paid?",
    a: "Either you pay a simple fee, or the partner I send you to pays me a small cut. I always tell you which one upfront. No surprises.",
  },
  {
    q: "How fast can you help?",
    a: "Call or WhatsApp and you'll talk to me. For urgent clearances I'll find a partner as fast as I can.",
  },
]

export function ClosingCTA() {
  const { openBooking } = useBooking()
  const panel = useReveal<HTMLDivElement>(0.25)
  const faq = useReveal<HTMLDivElement>(0.15)
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="px-3 sm:px-6 py-12 sm:py-20" aria-labelledby="cta-heading">
      {/* ── Dark CTA panel ── */}
      <div
        ref={panel.ref}
        className={`relative max-w-7xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 overflow-hidden isolate shadow-[0_40px_100px_-40px_rgba(6,95,70,0.7)] ${panel.visible ? "cc-in" : ""}`}
      >
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_0%,black_20%,transparent_100%)]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] -z-10 bg-[radial-gradient(ellipse,rgba(52,211,153,0.35)_0%,transparent_65%)]" />
        <div className="cc-sweep absolute inset-y-0 -left-1/3 w-1/3 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]" />

        <div className="px-6 sm:px-12 lg:px-20 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
          <div className="cc-fade inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 pl-2.5 pr-3.5 py-1.5 mb-8" style={{ animationDelay: "0ms" }}>
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-60" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-300" />
            </span>
            <span className="poppins-semibold text-xs uppercase tracking-[0.18em] text-emerald-100">For Birmingham businesses</span>
          </div>

          <h2 id="cta-heading" className="poppins-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-white">
            <span className="cc-word inline-block" style={{ animationDelay: "120ms" }}>One call.</span>{" "}
            <span
              className="cc-word cc-shine inline-block pb-1 bg-gradient-to-r from-emerald-200 via-white to-emerald-200 bg-[length:200%_100%] bg-clip-text text-transparent"
              style={{ animationDelay: "300ms" }}
            >
              Sorted.
            </span>
          </h2>

          <p className="cc-fade poppins-regular text-lg sm:text-xl text-emerald-100/85 leading-relaxed mt-6 max-w-2xl mx-auto" style={{ animationDelay: "480ms" }}>
            Bill checks, vetted contractors and new customers for waste firms. Tell me what you need and I&apos;ll find someone I trust to do it.
          </p>

          {/* Pick your path */}
          <div className="grid sm:grid-cols-3 gap-3 mt-12 max-w-4xl mx-auto text-left">
            {paths.map((p, i) => {
              const Icon = p.icon
              return (
                <Link
                  key={p.who}
                  href={p.href}
                  className={`group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/25 px-5 py-4 transition-all duration-700 hover:-translate-y-0.5 ${
                    panel.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: panel.visible ? `${600 + i * 120}ms` : "0ms" }}
                >
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 group-hover:bg-white group-hover:border-white flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-emerald-100 group-hover:text-emerald-800 transition-colors duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="poppins-medium text-[11px] uppercase tracking-[0.16em] text-emerald-300/80">{p.who}</p>
                    <p className="poppins-semibold text-[15px] text-white leading-tight mt-0.5">{p.what}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-200/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </Link>
              )
            })}
          </div>

          {/* Main actions */}
          <div className="cc-fade flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-10" style={{ animationDelay: "1000ms" }}>
            <button
              onClick={() => openBooking("discovery")}
              className="group relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 poppins-semibold text-base text-emerald-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-emerald-50 active:scale-[0.98] min-h-[54px]"
            >
              <span className="cc-btn-shine absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent skew-x-[-20deg]" />
              <span className="relative">Book a Free 15-Min Call</span>
              <ArrowRight className="relative w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="https://wa.me/447762270113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/25 bg-white/5 hover:bg-white/15 px-7 py-4 poppins-semibold text-base text-white transition-all duration-300 active:scale-[0.98] min-h-[54px]"
            >
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Zak
            </a>
          </div>

          <div className="cc-fade flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-sm text-emerald-100/70 poppins-medium" style={{ animationDelay: "1120ms" }}>
            <a href="tel:+447762270113" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              07762 270 113
            </a>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-300" />No obligation</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-emerald-300" />You&apos;ll talk to me</span>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div ref={faq.ref} className="max-w-3xl mx-auto mt-16 sm:mt-20 px-2">
        <div
          className={`text-center mb-8 transition-all duration-700 ${faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="poppins-semibold text-xs uppercase tracking-[0.2em] text-emerald-600">Questions</p>
          <h3 className="poppins-bold text-3xl sm:text-4xl text-slate-900 mt-2 tracking-tight">Straight answers.</h3>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                className={`rounded-2xl border bg-white transition-all duration-500 ${
                  isOpen ? "border-emerald-200 shadow-[0_16px_40px_-20px_rgba(6,95,70,0.3)]" : "border-slate-200 hover:border-emerald-200"
                } ${faq.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: faq.visible ? `${150 + i * 70}ms` : "0ms" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5"
                >
                  <span className="poppins-semibold text-base sm:text-lg text-slate-900">{f.q}</span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border transition-all duration-300 ${
                      isOpen ? "bg-emerald-700 border-emerald-700 rotate-45" : "bg-emerald-50 border-emerald-100"
                    }`}
                  >
                    <Plus className={`w-4 h-4 ${isOpen ? "text-white" : "text-emerald-700"}`} />
                  </span>
                </button>
                <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 poppins-regular text-[15px] text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ccWord {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes ccFade {
          0%   { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes ccShine { to { background-position: -200% 0; } }
        @keyframes ccSweep { 0% { left: -35%; } 100% { left: 135%; } }
        @keyframes ccBtn   { 0%, 60% { left: -50%; } 100% { left: 150%; } }

        .cc-word, .cc-fade { opacity: 0; }
        .cc-in .cc-word { animation: ccWord 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .cc-in .cc-fade { animation: ccFade 0.8s cubic-bezier(0.22,1,0.36,1) both; }
        .cc-in .cc-shine { animation: ccWord 0.9s cubic-bezier(0.22,1,0.36,1) both, ccShine 6s linear 1.6s infinite; }
        .cc-sweep { animation: ccSweep 10s ease-in-out infinite; }
        .cc-btn-shine { animation: ccBtn 3.5s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .cc-word, .cc-fade { opacity: 1; }
          .cc-in .cc-word, .cc-in .cc-fade, .cc-in .cc-shine, .cc-sweep, .cc-btn-shine { animation: none !important; }
        }
      ` }} />
    </section>
  )
}
