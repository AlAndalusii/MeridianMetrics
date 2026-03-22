"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft, ArrowRight, Download, CheckCircle, AlertTriangle,
  FileCheck, ShieldCheck, Clock, Phone, Mail, Globe,
  Trash2, ClipboardList, BadgeAlert, Building2, Lock,
  ChevronDown, Heart, Users,
} from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { CalendlyModal } from "@/components/CalendlyWidget"
import { MobileMenu } from "@/components/MobileMenu"
import Footer from "@/components/Footer"

// ─── Checklist data ────────────────────────────────────────────────────────────
const checklist = [
  { q: "Do you have a separate clinical waste bin for hazardous clinical waste (yellow bags/bins)?",   risk: "HIGH" },
  { q: "Is clinical waste collected by an Environment Agency-licensed clinical waste contractor?",       risk: "HIGH" },
  { q: "Do you hold a current signed duty of care waste transfer note for each waste stream?",          risk: "HIGH" },
  { q: "Is your clinical waste contractor's EA licence number recorded on file?",                       risk: "HIGH" },
  { q: "Do you have a separate food waste bin with a minimum weekly collection?",                       risk: "HIGH" },
  { q: "Do you have a dry recycling bin for plastic, tins, and glass?",                                risk: "HIGH" },
  { q: "Do you have a separate bin for paper and cardboard?",                                           risk: "HIGH" },
  { q: "Have all care staff received written waste segregation instructions?",                           risk: "HIGH" },
  { q: "Is a written Waste Management Plan in place at the facility?",                                  risk: "HIGH" },
  { q: "Is clinical and hazardous waste stored in a secure, locked area away from general waste?",      risk: "HIGH" },
  { q: "Are all clinical waste bins colour-coded and labelled in line with HTM 07-01?",                 risk: "MED"  },
  { q: "Are bin areas accessible to collection vehicles on scheduled collection days?",                  risk: "MED"  },
  { q: "Do you retain all waste collection manifests, consignment notes, and receipts?",                risk: "MED"  },
  { q: "Is food waste stored in a sealed caddy to prevent pests and cross-contamination?",              risk: "MED"  },
  { q: "Are waste segregation instructions displayed in all clinical and domestic areas?",               risk: "MED"  },
  { q: "Is there a documented procedure for confidential and sensitive document disposal?",              risk: "MED"  },
]

// ─── Animated preview items ────────────────────────────────────────────────────
const previewItems = [
  { q: "Clinical waste contractor EA licence on file?", risk: "HIGH", pass: true  },
  { q: "Separate food waste bin — weekly collection?",  risk: "HIGH", pass: false },
  { q: "Written Waste Management Plan in place?",       risk: "HIGH", pass: true  },
  { q: "Duty of care transfer notes held?",             risk: "HIGH", pass: false },
  { q: "HTM 07-01 colour-coding applied to bins?",      risk: "MED",  pass: true  },
  { q: "Clinical waste in secure locked storage?",      risk: "HIGH", pass: false },
]

// ─── Animated preview component ───────────────────────────────────────────────
function AnimatedPreview() {
  const [visible, setVisible] = useState(0)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (visible < previewItems.length) {
      const t = setTimeout(() => {
        setVisible((v) => v + 1)
        setPulse(true)
        setTimeout(() => setPulse(false), 300)
      }, 800)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisible(0), 4500)
    return () => clearTimeout(t)
  }, [visible])

  const answered  = previewItems.slice(0, visible)
  const passes    = answered.filter((i) => i.pass).length
  const gaps      = answered.filter((i) => !i.pass).length
  const highGaps  = answered.filter((i) => !i.pass && i.risk === "HIGH").length
  const riskColor = highGaps >= 2 ? "text-red-500" : highGaps === 1 ? "text-amber-500" : "text-emerald-500"
  const riskLabel = highGaps >= 2 ? "HIGH RISK" : highGaps === 1 ? "REVIEW NEEDED" : "ON TRACK"
  const scoreBg   = highGaps >= 2 ? "bg-red-50 border-red-200" : highGaps === 1 ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Stacked paper shadow */}
      <div className="absolute top-4 left-4 right-0 bottom-0 bg-emerald-200/40 rounded-2xl" />
      <div className="absolute top-2 left-2 right-0 bottom-0 bg-emerald-100/60 rounded-2xl" />

      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1C2B3A] to-[#243447] px-5 py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,150,105,0.18)_0%,transparent_60%)]" />
          <div className="relative flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Heart className="w-3 h-3 text-emerald-300" />
              </div>
              <span className="poppins-semibold text-[10px] text-white/60 uppercase tracking-widest">
                Millstone Compliance
              </span>
            </div>
            <span className="poppins-bold text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              CARE HOMES
            </span>
          </div>
          <p className="poppins-bold text-sm text-white">Waste Compliance Checklist</p>
          <p className="poppins-regular text-[11px] text-white/40 mt-0.5">16 questions · CQC + EA aligned</p>
        </div>

        {/* Score bar */}
        <div className={`px-5 py-2.5 border-b border-slate-100 flex items-center justify-between transition-all duration-500 ${visible > 0 ? scoreBg : "bg-slate-50 border-slate-100"}`}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="poppins-semibold text-[10px] text-slate-600">{passes} pass</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="poppins-semibold text-[10px] text-slate-600">{gaps} gap{gaps !== 1 ? "s" : ""}</span>
            </div>
          </div>
          {visible > 0 && (
            <span className={`poppins-bold text-[10px] transition-all duration-300 ${riskColor}`}>{riskLabel}</span>
          )}
        </div>

        {/* Items */}
        <div className="px-5 py-4 space-y-2 min-h-[250px]">
          {previewItems.map((item, idx) => {
            const show = idx < visible
            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-all duration-500 ${
                  show
                    ? item.pass
                      ? "bg-emerald-50/70 border border-emerald-100"
                      : "bg-red-50/70 border border-red-100"
                    : "opacity-0 translate-y-1"
                } ${idx === visible - 1 && pulse ? "scale-[1.015]" : ""}`}
              >
                {show ? (
                  item.pass
                    ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    : <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-200 flex-shrink-0 mt-0.5" />
                )}
                <p className={`poppins-regular text-[11px] leading-snug flex-1 ${show ? "text-slate-700" : "text-slate-200"}`}>
                  {item.q}
                </p>
                {show && (
                  <span className={`poppins-bold text-[9px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                    item.risk === "HIGH" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                  }`}>
                    {item.risk}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Progress */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="poppins-regular text-[10px] text-slate-400">Progress</span>
            <span className="poppins-semibold text-[10px] text-slate-500">{visible} / {previewItems.length}</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${(visible / previewItems.length) * 100}%` }}
            />
          </div>
          <p className="poppins-regular text-[10px] text-slate-400 mt-2 text-center">
            CQC + Environment Agency aligned
          </p>
        </div>
      </div>

      {/* Free badge */}
      <div className="absolute -top-3 -right-3 bg-emerald-700 text-white poppins-bold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg shadow-emerald-700/30">
        FREE
      </div>
    </div>
  )
}

// ─── Counter animation hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1200, started = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setValue(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return value
}

// ─── FAQ item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`transition-colors ${open ? "bg-emerald-50/40" : "bg-white hover:bg-slate-50/50"}`}>
      <button
        type="button"
        className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="poppins-semibold text-sm text-slate-800">{q}</span>
        <ChevronDown className={`w-4 h-4 text-emerald-600 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="poppins-regular text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CareHomeWasteChecklistPage() {
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)
  const [statsStarted, setStatsStarted]           = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const fineCount  = useCountUp(5000, 1400, statsStarted)
  const questCount = useCountUp(16,    800, statsStarted)
  const auditCount = useCountUp(295,  1000, statsStarted)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">

      {/* ── Navigation ─────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group/logo transition-transform duration-300 hover:scale-105">
              <MillstoneLogo size="sm" variant="modern" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={() => setShowCalendlyModal(true)}
                className="hidden lg:flex poppins-semibold bg-emerald-700 hover:bg-emerald-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3 min-h-[44px]"
              >
                BOOK COMPLIANCE REVIEW
              </Button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-16">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#1C2B3A] via-[#243447] to-[#1a3a4a] text-white py-16 sm:py-20 relative overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,150,105,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(5,150,105,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left copy */}
              <div>
                <Link
                  href="/resources"
                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors text-sm poppins-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resources
                </Link>

                <div className="flex flex-wrap gap-2 mb-6">
                  {["CQC Inspections Active", "EA Enforcement Active", "Fines up to £5,000"].map((pill) => (
                    <span
                      key={pill}
                      className="inline-flex items-center px-3 py-1 rounded-full text-[11px] poppins-semibold uppercase tracking-wide bg-white/10 text-blue-200 border border-white/15"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

                <h1 className="poppins-bold text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                  Care Home Waste
                  <span className="text-emerald-400"> Compliance Checklist</span>
                </h1>

                <p className="poppins-regular text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                  A free, single-page printable checklist for care home managers to verify compliance
                  with Simpler Recycling and clinical waste obligations before CQC or EA inspections.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/print/care-home-checklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white poppins-bold rounded-xl shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 text-sm"
                  >
                    <Download className="w-5 h-5" />
                    Download Free Checklist — PDF
                  </a>
                  <Button
                    onClick={() => setShowCalendlyModal(true)}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 poppins-semibold px-7 py-3.5 rounded-xl text-sm bg-transparent min-h-[44px]"
                  >
                    Book a Care Home Audit
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                {/* Trust signals */}
                <div className="flex flex-wrap gap-5 mt-8">
                  {[
                    { icon: FileCheck,   text: "One-page A4 printable" },
                    { icon: ShieldCheck, text: "Updated March 2026"    },
                    { icon: Clock,       text: "5-minute self-audit"   },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-slate-400 text-sm poppins-regular">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — animated preview */}
              <div className="flex justify-center lg:justify-end">
                <AnimatedPreview />
              </div>

            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12 space-y-8">

          {/* ── ALERT BOX ─────────────────────────────────────────────── */}
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="poppins-semibold text-red-900 mb-1">
                  Since 31 March 2026 — care home managers are personally accountable
                </p>
                <p className="poppins-regular text-red-800 text-sm leading-relaxed">
                  Care homes must comply with Simpler Recycling <em>and</em> clinical waste regulations simultaneously.
                  CQC and the Environment Agency both inspect — and both can act. A missed bin stream or an
                  unlicensed contractor is a compliance failure.{" "}
                  <strong>Any NO answer needs fixing immediately.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* ── ANIMATED STATS ─────────────────────────────────────────── */}
          <div ref={statsRef} className="grid sm:grid-cols-3 gap-4">
            {[
              {
                value: statsStarted ? `£${fineCount.toLocaleString()}` : "£—",
                label: "Maximum fine",
                sub:   "Duty of care offence",
                color: "bg-red-50 border-red-200",
                val:   "text-red-700",
              },
              {
                value: statsStarted ? `${questCount}` : "—",
                label: "Checklist questions",
                sub:   "10 HIGH · 6 MED risk",
                color: "bg-emerald-50 border-emerald-200",
                val:   "text-emerald-700",
              },
              {
                value: statsStarted ? `£${auditCount}` : "£—",
                label: "Full Care Home Audit",
                sub:   "Written report, 48 hours",
                color: "bg-blue-50 border-blue-200",
                val:   "text-blue-700",
              },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl border p-5 text-center ${s.color}`}>
                <p className={`poppins-bold text-3xl mb-1 ${s.val}`}>{s.value}</p>
                <p className="poppins-semibold text-sm text-slate-700">{s.label}</p>
                <p className="poppins-regular text-xs text-slate-500 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ── CHECKLIST PREVIEW TABLE ─────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#1C2B3A] to-[#243447] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-emerald-400" />
                <h2 className="poppins-semibold text-white text-lg">What&apos;s Inside the Checklist</h2>
              </div>
              <span className="text-xs text-slate-400 poppins-regular">16 questions · 2 risk levels</span>
            </div>

            <div className="divide-y divide-emerald-50">
              {/* Table header */}
              <div className="grid grid-cols-[1fr_auto] px-6 py-2.5 bg-emerald-800/5">
                <span className="poppins-semibold text-xs text-emerald-900 uppercase tracking-wide">Question</span>
                <span className="poppins-semibold text-xs text-emerald-900 uppercase tracking-wide">Risk</span>
              </div>

              {checklist.map(({ q, risk }, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto] items-center px-6 py-3 gap-4 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] poppins-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="poppins-regular text-sm text-slate-700">{q}</span>
                  </div>
                  <span
                    className={`flex-shrink-0 inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] poppins-bold uppercase tracking-wide ${
                      risk === "HIGH" ? "bg-red-600 text-white" : "bg-amber-500 text-white"
                    }`}
                  >
                    {risk === "HIGH" ? "HIGH RISK" : "MED RISK"}
                  </span>
                </div>
              ))}
            </div>

            {/* Scoring bands */}
            <div className="border-t border-emerald-100 bg-slate-50/50 px-6 py-5">
              <p className="poppins-semibold text-sm text-emerald-900 mb-3">Score your results:</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { label: "0 NOs",   text: "You look compliant — document everything.",   bg: "bg-emerald-50 border-emerald-200", col: "text-emerald-700" },
                  { label: "1–3 NOs", text: "Fix HIGH RISK items this week.",              bg: "bg-amber-50 border-amber-200",     col: "text-amber-700"  },
                  { label: "4+ NOs",  text: "Book an audit — do not delay.",               bg: "bg-red-50 border-red-200",         col: "text-red-700"    },
                ].map(({ label, text, bg, col }) => (
                  <div key={label} className={`rounded-xl border p-3 ${bg}`}>
                    <p className={`poppins-bold text-sm ${col}`}>{label}</p>
                    <p className="poppins-regular text-xs text-slate-600 mt-0.5">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── WHY IT MATTERS ───────────────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
            <h2 className="poppins-semibold text-2xl text-emerald-900 mb-2 flex items-center gap-2">
              <BadgeAlert className="w-6 h-6 text-red-500" />
              Why Every Care Home Manager Needs This Checklist
            </h2>
            <p className="poppins-regular text-emerald-700 mb-6 text-sm">
              Two regulators. Two inspection frameworks. One facility that must satisfy both.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: Trash2,
                  title: "5 Waste Streams Required",
                  desc:  "Clinical, food waste, paper/card, dry recyclables, and general waste must all be separately collected and documented. Missing any stream is a compliance gap.",
                  color: "bg-emerald-50 border-emerald-200",
                  ic:    "text-emerald-600",
                },
                {
                  icon: Building2,
                  title: "CQC + EA Both Inspect",
                  desc:  "The Care Quality Commission checks waste management under safe care delivery. The Environment Agency enforces duty of care and Simpler Recycling separately.",
                  color: "bg-blue-50 border-blue-200",
                  ic:    "text-blue-600",
                },
                {
                  icon: Lock,
                  title: "Written Proof Is Everything",
                  desc:  "Transfer notes, contractor licences, staff instructions, and a written Waste Management Plan are all required documents. Verbal arrangements provide zero protection.",
                  color: "bg-amber-50 border-amber-200",
                  ic:    "text-amber-600",
                },
              ].map(({ icon: Icon, title, desc, color, ic }) => (
                <div key={title} className={`rounded-xl border p-5 ${color}`}>
                  <Icon className={`w-6 h-6 mb-3 ${ic}`} />
                  <p className="poppins-semibold text-emerald-900 mb-2 text-sm">{title}</p>
                  <p className="poppins-regular text-emerald-800 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── WHAT MAKES CARE HOMES DIFFERENT ─────────────────────────── */}
          <div className="bg-gradient-to-br from-[#1C2B3A] via-[#243447] to-[#1a3a4a] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.10)_0%,transparent_60%)]" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-emerald-400" />
                <h2 className="poppins-semibold text-lg text-white">Care Homes Are a Higher-Risk Category</h2>
              </div>
              <p className="poppins-regular text-slate-300 text-sm leading-relaxed mb-6 max-w-2xl">
                Unlike HMOs or commercial premises, care homes generate clinical waste alongside domestic streams.
                This means <strong className="text-white">two separate regulatory frameworks</strong> apply simultaneously —
                and failure under either can trigger enforcement from two different agencies.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "HTM 07-01 governs clinical waste segregation and colour coding",
                  "Environmental Protection Act 1990 covers duty of care for all streams",
                  "Simpler Recycling (March 2026) adds four mandatory non-clinical streams",
                  "CQC can impose conditions or cancel registration for waste failures",
                  "EA prosecution for unlicensed disposal carries unlimited fines",
                  "Consignment notes required for all hazardous clinical waste movements",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="poppins-regular text-sm text-slate-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── DOWNLOAD CTA BANNER ─────────────────────────────────────── */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-700 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="poppins-bold text-xl sm:text-2xl mb-2">
                  Download the checklist — it&apos;s free
                </h3>
                <p className="poppins-regular text-emerald-100 text-sm leading-relaxed max-w-md">
                  Single-page A4 PDF. Print it, walk your facility, and know exactly where you stand
                  before a CQC or EA inspector arrives.
                </p>
              </div>
              <a
                href="/print/care-home-checklist"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold rounded-xl shadow-xl transition-all duration-300 text-sm"
              >
                <Download className="w-5 h-5" />
                Download PDF — Free
              </a>
            </div>
          </div>

          {/* ── FAQ ACCORDION ───────────────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-emerald-100 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#1C2B3A] to-[#243447] px-6 py-4">
              <h2 className="poppins-semibold text-white text-lg">Frequently Asked Questions</h2>
            </div>
            <div className="divide-y divide-emerald-50">
              {[
                {
                  q: "Does Simpler Recycling apply to care homes?",
                  a: "Yes. Care homes with 10 or more employees must comply with Simpler Recycling from 31 March 2025. This requires separate collection of food waste, core dry recyclables and paper/card, alongside existing clinical waste obligations.",
                },
                {
                  q: "Do we need a separate clinical waste contractor?",
                  a: "Yes. Clinical and hazardous waste must be collected by a contractor holding a valid Environment Agency waste carrier registration. You should obtain and keep their registration/permit details in writing. Using an unauthorised contractor can leave you liable under the duty of care provisions of the Environmental Protection Act 1990.",
                },
                {
                  q: "What is HTM 07-01 and does it apply to us?",
                  a: "Health Technical Memorandum 07-01 is official guidance on the safe management of healthcare waste. It covers NHS organisations and commissioned or independent healthcare providers, including residential and nursing care homes. It sets out how clinical waste should be segregated, colour-coded, stored and disposed of.",
                },
                {
                  q: "Can CQC inspect our waste compliance?",
                  a: "Yes. Waste management is considered under Key Lines of Enquiry on safe care and infection prevention. Inspectors can highlight waste non-compliance in their reports, which may affect your rating. In serious or persistent cases, waste failings can form part of the evidence for CQC enforcement action, including conditions on registration.",
                },
              ].map(({ q, a }, idx) => (
                <FaqItem key={idx} q={q} a={a} />
              ))}
            </div>
          </div>

          {/* ── UPGRADE TO FULL AUDIT ───────────────────────────────────── */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-emerald-100 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h2 className="poppins-semibold text-2xl text-emerald-900 mb-1">
                  Need a Full Written Compliance Report?
                </h2>
                <p className="poppins-regular text-emerald-700 text-sm">
                  Show the CQC or Environment Agency a professional audit — not just a self-completed checklist.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                "Clinical waste stream capacity and contractor assessment",
                "Simpler Recycling compliance gap analysis",
                "HTM 07-01 colour-coding and storage review",
                "Staff instruction templates included",
                "Waste Management Plan drafted for your facility",
                "Written report ready in 48 hours",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="poppins-regular text-sm text-emerald-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button
                onClick={() => setShowCalendlyModal(true)}
                size="lg"
                className="bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold shadow-lg px-8"
              >
                Book Your Care Home Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Contact row */}
            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-emerald-100">
              {[
                { icon: Globe, text: "millstonecompliance.com/services", href: "https://millstonecompliance.com/services", breakAll: false },
                { icon: Phone, text: "0121 751 2262",                    href: "tel:01217512262",                         breakAll: false },
                { icon: Mail,  text: "hello@millstonecompliance.com",    href: "mailto:hello@millstonecompliance.com",    breakAll: true  },
              ].map(({ icon: Icon, text, href, breakAll }) => (
                <a
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors text-sm poppins-regular ${breakAll ? "break-all" : ""}`}
                >
                  <Icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* ── Back link ─────────────────────────────────────────────── */}
          <div className="pt-4 border-t border-emerald-100">
            <Link href="/resources" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="poppins-medium text-sm">Back to All Resources</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />

      <CalendlyModal
        isOpen={showCalendlyModal}
        onClose={() => setShowCalendlyModal(false)}
      />
    </div>
  )
}
