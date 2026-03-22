"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight, ArrowUpRight, ClipboardCheck, Recycle,
  ListChecks, FileCheck, Leaf, Trash2, Truck, Heart,
  Clock, Zap, BookOpen, Shield, BadgeCheck, Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import { Navigation } from "@/components/Navigation"

/* ─── Types ──────────────────────────────────────────────────── */
type Category = "all" | "duty-of-care" | "simpler-recycling" | "care-homes" | "hmo"

/* ─── Category meta — all Tailwind classes in full for JIT ───── */
const catMeta: Record<Category, {
  label: string
  pillActive: string
  pillInactive: string
  dot: string
  cardBar: string
  tagBg: string
  tagText: string
  ctaText: string
}> = {
  all: {
    label: "All Guides",
    pillActive:   "bg-emerald-900 text-white shadow-sm",
    pillInactive: "bg-white/60 text-emerald-700 hover:bg-white hover:text-emerald-900 border border-emerald-200",
    dot:          "bg-emerald-600",
    cardBar:      "bg-emerald-600",
    tagBg:        "bg-emerald-50", tagText: "text-emerald-700", ctaText: "text-emerald-700",
  },
  "duty-of-care": {
    label: "Duty of Care",
    pillActive:   "bg-emerald-700 text-white shadow-sm",
    pillInactive: "bg-white/60 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 border border-emerald-200",
    dot:          "bg-emerald-600",
    cardBar:      "bg-emerald-600",
    tagBg:        "bg-emerald-50", tagText: "text-emerald-700", ctaText: "text-emerald-700",
  },
  "simpler-recycling": {
    label: "Simpler Recycling",
    pillActive:   "bg-green-700 text-white shadow-sm",
    pillInactive: "bg-white/60 text-green-700 hover:bg-green-50 hover:text-green-900 border border-green-200",
    dot:          "bg-green-600",
    cardBar:      "bg-green-600",
    tagBg:        "bg-green-50", tagText: "text-green-700", ctaText: "text-green-700",
  },
  "care-homes": {
    label: "Care Homes",
    pillActive:   "bg-emerald-800 text-white shadow-sm",
    pillInactive: "bg-white/60 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900 border border-emerald-200",
    dot:          "bg-emerald-500",
    cardBar:      "bg-emerald-500",
    tagBg:        "bg-emerald-50", tagText: "text-emerald-800", ctaText: "text-emerald-800",
  },
  hmo: {
    label: "HMO & Estates",
    pillActive:   "bg-amber-600 text-white shadow-sm",
    pillInactive: "bg-white/60 text-amber-700 hover:bg-amber-50 hover:text-amber-900 border border-amber-200",
    dot:          "bg-amber-500",
    cardBar:      "bg-amber-500",
    tagBg:        "bg-amber-50", tagText: "text-amber-700", ctaText: "text-amber-700",
  },
}

const badgeStyles: Record<string, string> = {
  "Free Checklist": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Essential:        "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Urgent:           "bg-amber-50 text-amber-700 border border-amber-200",
  Popular:          "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Template:         "bg-emerald-50 text-emerald-800 border border-emerald-200",
  New:              "bg-emerald-50 text-emerald-700 border border-emerald-200",
}

/* ─── Visible articles (waste-only) ─────────────────────────── */
const articles: {
  title: string
  description: string
  icon: React.ElementType
  href: string
  badge: string
  topics: string[]
  category: Category
  readTime: string
  featured?: boolean
}[] = [
  {
    title: "Care Home Waste Compliance Checklist",
    description: "Free 16-question checklist for care home managers. Covers clinical waste, Simpler Recycling, HTM 07-01 and CQC requirements — with free PDF download.",
    icon: Heart,
    href: "/resources/care-home-waste-compliance-checklist",
    badge: "Free Checklist",
    topics: ["Care Homes", "Clinical Waste", "CQC Ready"],
    category: "care-homes",
    readTime: "5 min",
    featured: true,
  },
  {
    title: "Waste Duty of Care: Complete UK Compliance Guide",
    description: "Legal requirements, Waste Transfer Notes, carrier verification, and how to avoid £300 fixed penalties before enforcement knocks.",
    icon: ClipboardCheck,
    href: "/resources/duty-of-care-waste",
    badge: "Essential",
    topics: ["Legal Requirements", "WTN", "Carrier Licences"],
    category: "duty-of-care",
    readTime: "10 min",
  },
  {
    title: "Waste Documentation: Complete UK Guide",
    description: "Every document legally required — Waste Transfer Notes, carrier licences, clinical waste consignment notes and Simpler Recycling records.",
    icon: FileCheck,
    href: "/resources/waste-packaging-documentation",
    badge: "Essential",
    topics: ["WTNs", "Carrier Licences", "Audit Trail"],
    category: "duty-of-care",
    readTime: "15 min",
  },
  {
    title: "Two-Thirds of UK Businesses Aren't Ready for Simpler Recycling",
    description: "64% missed the March 2025 deadline. What's required, enforcement risk, and how to get compliant in 60 days.",
    icon: Leaf,
    href: "/resources/simpler-recycling-2025",
    badge: "Urgent",
    topics: ["Readiness Check", "60-Day Plan", "Enforcement"],
    category: "simpler-recycling",
    readTime: "15 min",
  },
  {
    title: "Simpler Recycling for Businesses: Complete 2025 Guide",
    description: "Mandatory waste streams, 31 March 2026 deadline, EA enforcement and practical steps for your service.",
    icon: Recycle,
    href: "/resources/simpler-recycling-businesses",
    badge: "Popular",
    topics: ["Waste Streams", "Food Waste", "Regulations"],
    category: "simpler-recycling",
    readTime: "10 min",
  },
  {
    title: "HMO Compliance Checklist",
    description: "20-question pre-audit framework with traffic-light scoring across 5 risk sections. Know your gaps before the council does.",
    icon: ListChecks,
    href: "/templates/hmo-compliance-checklist",
    badge: "Template",
    topics: ["20 Questions", "Gap Analysis", "Pre-Audit"],
    category: "hmo",
    readTime: "Self-assess",
  },
  {
    title: "HMO Landlords Face £5,000 Fines Under New Recycling Rules",
    description: "Simpler Recycling now covers all HMOs. Landlords are legally liable — and council inspections have started.",
    icon: Trash2,
    href: "/resources/hmo-recycling-fines",
    badge: "New",
    topics: ["HMO Compliance", "£5K Fines", "Licence Risk"],
    category: "hmo",
    readTime: "18 min",
  },
  {
    title: "Landlord Fly-Tipping Fines Hit Record Highs",
    description: "1.15M incidents in 2023/24. Landlords face £600 fines for using unlicensed waste carriers — here's how to stay clean.",
    icon: Truck,
    href: "/resources/landlord-fly-tipping-fines",
    badge: "New",
    topics: ["Fly-Tipping", "Carrier Licence", "£600 Fine"],
    category: "hmo",
    readTime: "20 min",
  },
]

/* ─── Tools (waste-only) ─────────────────────────────────────── */
const tools = [
  {
    label: "Simpler Recycling Check",
    description: "Instant compliance score showing which waste streams you're missing and your enforcement risk level.",
    href: "/simpler-recycling-gap-analyser",
    icon: Leaf,
    tag: "Simpler Recycling · Free",
    num: "01",
  },
  {
    label: "Waste Compliance Assessment",
    description: "Duty of Care, clinical waste and Simpler Recycling — all three in one free 3-minute check.",
    href: "/quiz",
    icon: ClipboardCheck,
    tag: "All Waste Regulations · Free",
    num: "02",
  },
]

const catKeys = Object.keys(catMeta) as Category[]

/* ─── Page ───────────────────────────────────────────────────── */
export default function ResourcesPage() {
  const router   = useRouter()
  const [selected, setSelected] = useState<Category>("all")
  const [visible,  setVisible]  = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const handleSelect = (key: Category) => {
    if (key === selected) return
    setVisible(false)
    setSelected(key)
    setTimeout(() => setVisible(true), 50)
  }

  const featured    = articles.find(a => a.featured)!
  const nonFeatured = articles.filter(a => !a.featured)
  const filtered    = selected === "all"
    ? nonFeatured
    : nonFeatured.filter(a => a.category === selected)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-emerald-100/70 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">UK Waste Compliance Intelligence</span>
            </div>

            {/* Headline */}
            <h1
              className="poppins-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight text-slate-900 mb-5"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "opacity 0.55s ease 60ms, transform 0.55s ease 60ms" }}
            >
              Waste{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Intelligence.
              </span>
            </h1>

            {/* Sub */}
            <p
              className="poppins-regular text-lg sm:text-xl text-slate-500 max-w-xl leading-relaxed mb-10"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.55s ease 120ms, transform 0.55s ease 120ms" }}
            >
              Expert guides for UK businesses — plain English, inspection-ready, free.
            </p>

            {/* Stats strip */}
            <div
              className="flex flex-wrap items-center gap-8 sm:gap-12"
              style={{ opacity: visible ? 1 : 0, transition: "opacity 0.55s ease 200ms" }}
            >
              {[
                { value: "8",    label: "Free Guides" },
                { value: "2",    label: "Free Tools" },
                { value: "48hr", label: "Report Turnaround" },
                { value: "£0",   label: "To Get Started" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <p className="poppins-bold text-3xl sm:text-4xl text-emerald-700 leading-none">{s.value}</p>
                  <p className="poppins-regular text-[10px] text-slate-400 uppercase tracking-[0.14em] mt-1.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured article ─────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pt-4 pb-10">
        <div className="max-w-6xl mx-auto">
          <Link
            href={featured.href}
            className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(16,185,129,0.15)] shadow-sm"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.55s ease 240ms, transform 0.55s ease 240ms" }}
          >
            {/* Top emerald accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" />

            {/* Left content */}
            <div className="flex-1 p-8 sm:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-7">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] poppins-bold uppercase tracking-[0.15em]">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured Guide
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 text-[11px] poppins-medium">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>

                <p className="poppins-semibold text-[10px] text-emerald-600 uppercase tracking-[0.18em] mb-3">
                  Care Homes
                </p>

                <h2 className="poppins-bold text-[26px] sm:text-[32px] lg:text-[36px] text-slate-900 leading-[1.1] tracking-tight mb-4 group-hover:text-emerald-800 transition-colors duration-300">
                  {featured.title}
                </h2>

                <p className="poppins-regular text-[15px] text-slate-500 leading-relaxed max-w-xl">
                  {featured.description}
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2.5 bg-emerald-700 group-hover:bg-emerald-800 text-white poppins-bold text-[13px] px-6 py-3 rounded-xl transition-all duration-300 shadow-md shadow-emerald-700/20">
                  Read the guide
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {featured.topics.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] poppins-semibold border border-emerald-200">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right decorative panel */}
            <div className="hidden lg:flex w-[300px] flex-shrink-0 relative bg-emerald-50 items-center justify-center p-10 border-l border-emerald-100">
              <div
                className="absolute inset-0 opacity-[0.4]"
                style={{ backgroundImage: "linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
              />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-emerald-200 shadow-sm flex items-center justify-center">
                  <Heart className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
                </div>
                <div className="space-y-2 w-full">
                  {["CQC Ready", "HTM 07-01", "Clinical Waste", "Simpler Recycling"].map((tag) => (
                    <div key={tag} className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-2.5 border border-emerald-200 shadow-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="poppins-medium text-[12px] text-emerald-700">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Category filter ─────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 pb-6"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(8px)", transition: "opacity 0.5s ease 300ms, transform 0.5s ease 300ms" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span className="poppins-bold text-[15px] text-emerald-900 tracking-tight">Browse Guides</span>
              <span className="poppins-regular text-[13px] text-emerald-500">
                — {filtered.length + (selected === "all" ? 1 : 0)} articles
              </span>
            </div>
            {selected !== "all" && (
              <button
                type="button"
                onClick={() => handleSelect("all")}
                className="poppins-medium text-[12px] text-emerald-500 hover:text-emerald-700 transition-colors flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm inline-flex flex-wrap gap-1 w-full sm:w-auto">
            {catKeys.map(key => {
              const meta    = catMeta[key]
              const count   = key === "all" ? articles.length : articles.filter(a => a.category === key).length
              const isActive = selected === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl poppins-semibold text-[12px] transition-all duration-200 flex-shrink-0 ${isActive ? meta.pillActive : meta.pillInactive}`}
                >
                  {meta.label}
                  <span className={`text-[10px] poppins-medium ${isActive ? "opacity-60" : "opacity-40"}`}>{count}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Article grid ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-6xl mx-auto">

          {/* Featured row item in "all" view */}
          {selected === "all" && (
            <div className="mb-4">
              <Link
                href={featured.href}
                className="group flex items-center justify-between bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-4 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease 0ms" }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="poppins-semibold text-[10px] text-emerald-600 uppercase tracking-[0.14em]">Featured · Care Homes</span>
                    <p className="poppins-bold text-[14px] text-emerald-900 mt-0.5">{featured.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="hidden sm:block text-[10px] poppins-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {featured.badge}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:text-emerald-700 transition-colors" />
                </div>
              </Link>
            </div>
          )}

          {/* Main grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article, i) => {
              const meta = catMeta[article.category]
              const Icon = article.icon
              const num  = String(i + 1 + (selected === "all" ? 1 : 0)).padStart(2, "0")
              return (
                <Link
                  key={`${selected}-${article.href}`}
                  href={article.href}
                  className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:border-emerald-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-8px_rgba(16,185,129,0.12)] transition-all duration-300"
                  style={{
                    opacity:    visible ? 1 : 0,
                    transform:  visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                  }}
                >
                  {/* Category colour bar */}
                  <div className={`h-[3px] w-full ${meta.cardBar}`} />

                  <div className="flex flex-col flex-1 p-6">
                    {/* Number + badge row */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="poppins-bold text-[32px] leading-none text-slate-100 select-none">{num}</span>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] poppins-bold ${badgeStyles[article.badge] ?? "bg-emerald-50 text-emerald-700 border border-emerald-200"}`}>
                          {article.badge}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] poppins-medium text-emerald-400">
                          <Clock className="w-2.5 h-2.5" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Category label */}
                    <p className={`poppins-semibold text-[10px] tracking-[0.15em] uppercase mb-2 ${meta.tagText}`}>
                      {meta.label}
                    </p>

                    {/* Title */}
                    <h2 className="poppins-bold text-[15px] sm:text-[15px] text-slate-900 mb-3 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <p className="poppins-regular text-[13px] text-slate-500 leading-relaxed flex-1 mb-5 line-clamp-3">
                      {article.description}
                    </p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {article.topics.slice(0, 3).map((t) => (
                        <span key={t} className={`px-2 py-0.5 rounded-md text-[10px] poppins-semibold ${meta.tagBg} ${meta.tagText}`}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center gap-1.5 poppins-bold text-[12px] mt-auto ${meta.ctaText}`}>
                      Read guide
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center poppins-regular text-[14px] text-emerald-500 py-12">
              No guides in this category yet.
            </p>
          )}
        </div>
      </section>

      {/* ── Free Tools ───────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20 bg-gradient-to-b from-emerald-50/50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Free Interactive Tools</span>
              </div>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                Know where you stand{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  in under 3 minutes.
                </span>
              </h2>
            </div>
            <p className="poppins-regular text-[13px] text-slate-400 max-w-xs sm:text-right leading-relaxed">
              No card required. Instant results. Built for UK businesses of every type.
            </p>
          </div>

          {/* Tool cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-[0_16px_48px_-8px_rgba(16,185,129,0.15)] p-8"
                >
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Glow blob */}
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100/0 group-hover:bg-emerald-100/60 rounded-full blur-[50px] transition-all duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-7">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center group-hover:bg-emerald-700 group-hover:border-transparent transition-all duration-300">
                        <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                      <span className="poppins-bold text-[40px] text-slate-100 leading-none select-none group-hover:text-emerald-100 transition-colors duration-300">{tool.num}</span>
                    </div>

                    <span className="block poppins-semibold text-[10px] text-emerald-600 uppercase tracking-[0.18em] mb-2">
                      {tool.tag}
                    </span>
                    <h3 className="poppins-bold text-[20px] sm:text-[22px] text-slate-900 mb-3 leading-snug group-hover:text-emerald-800 transition-colors duration-300">{tool.label}</h3>
                    <p className="poppins-regular text-[13px] text-slate-500 leading-relaxed mb-7">{tool.description}</p>

                    <div className="flex items-center gap-2 poppins-bold text-[13px] text-emerald-600 group-hover:text-emerald-700 transition-colors duration-200">
                      Start free check
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/30 rounded-full blur-[80px]" />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 mb-6">
            <Shield className="w-3.5 h-3.5 text-emerald-200" />
            <span className="poppins-semibold text-[11px] text-emerald-100 uppercase tracking-[0.15em]">Inspection-Ready in 48 Hours</span>
          </div>

          <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
            Not sure where you stand?
          </h2>

          <p className="poppins-regular text-emerald-100 text-lg mb-9 max-w-xl mx-auto leading-relaxed">
            3 minutes. Duty of Care, clinical waste and Simpler Recycling covered. Full compliance picture — free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push("/quiz")}
              className="group inline-flex items-center justify-center gap-2.5 bg-white hover:bg-emerald-50 text-emerald-700 poppins-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-lg"
            >
              Free Waste Compliance Check
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => router.push("/services")}
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white poppins-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 active:scale-95"
            >
              View Our Services
            </button>
          </div>

          <p className="mt-8 poppins-regular text-[11px] text-emerald-300/60">
            No card required · Instant results · Trusted by regulated businesses across the UK
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
