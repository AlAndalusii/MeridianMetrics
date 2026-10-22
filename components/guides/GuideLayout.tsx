import React from "react"
import Link from "next/link"
import { ArrowRight, Clock, CheckCircle } from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

export type RelatedGuide = { title: string; href: string }

/* ─── Short answer box at the top of each guide ───────────────────────────── */
export function ShortAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 p-6 mb-10">
      <p className="poppins-semibold text-[11px] uppercase tracking-[0.18em] text-emerald-700 mb-2">The short answer</p>
      <div className="poppins-medium text-lg text-emerald-950 leading-relaxed">{children}</div>
    </div>
  )
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="poppins-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mt-12 mb-4">{children}</h2>
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="poppins-regular text-base sm:text-lg text-slate-600 leading-relaxed mb-4">{children}</p>
}

export function Ticks({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 mb-6">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <span className="poppins-regular text-base text-slate-700 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/* ─── Page shell: hero, article body, related guides, trial CTA ───────────── */
export function GuideLayout({
  eyebrow,
  title,
  intro,
  readTime,
  related,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  readTime: string
  related: RelatedGuide[]
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-emerald-100/70 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link href="/resources" className="poppins-medium text-sm text-emerald-700 hover:text-emerald-900">Guides</Link>
            <span className="text-emerald-300">/</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-emerald-200 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="poppins-semibold text-[11px] text-emerald-700 uppercase tracking-[0.15em]">{eyebrow}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 poppins-medium">
              <Clock className="w-3.5 h-3.5" /> {readTime}
            </span>
          </div>
          <h1 className="poppins-bold text-4xl sm:text-5xl text-slate-900 leading-[1.08] tracking-tight mb-5">{title}</h1>
          <p className="poppins-regular text-lg sm:text-xl text-slate-500 leading-relaxed">{intro}</p>
          <p className="poppins-medium text-sm text-slate-400 mt-6">By Zak, founder of Millstone Compliance</p>
        </div>
      </section>

      {/* Body */}
      <article className="px-4 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto">{children}</div>
      </article>

      {/* Trial CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-3xl mx-auto relative rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 sm:p-10 overflow-hidden shadow-[0_30px_70px_-30px_rgba(6,95,70,0.6)]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative">
            <p className="poppins-semibold text-xs uppercase tracking-[0.18em] text-emerald-300 mb-3">Want me to handle it?</p>
            <h2 className="poppins-bold text-2xl sm:text-3xl text-white leading-tight mb-3">Start a Free Two-Week Trial.</h2>
            <p className="poppins-regular text-emerald-100/85 leading-relaxed mb-7 max-w-xl">
              Send me your tickets on WhatsApp. I enter and submit every load to Defra before the deadline, and send you a confirmation every Friday.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/free-trial"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 poppins-semibold text-sm transition-all duration-300"
              >
                Start a Free Two-Week Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="https://wa.me/447762270113"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/25 bg-white/5 hover:bg-white/15 text-white poppins-semibold text-sm transition-all duration-300"
              >
                WhatsApp Zak
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="poppins-semibold text-xs uppercase tracking-[0.18em] text-emerald-600 mb-4">More plain answers</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {related.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 hover:border-emerald-300 bg-white px-5 py-4 transition-all duration-300"
              >
                <span className="poppins-semibold text-sm text-slate-800 group-hover:text-emerald-800">{g.title}</span>
                <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
