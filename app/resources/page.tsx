"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight, ClipboardCheck, Recycle, Package, Calculator,
  ListChecks, FileSearch, FileCheck, Users, BarChart3, Zap,
  Leaf, Trash2, BookOpen, Sparkles, Truck, Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import { Navigation } from "@/components/Navigation"

/* ─── Types ──────────────────────────────────────────────────────────── */
type Category = "all" | "ppt" | "epr" | "simpler-recycling" | "waste"

/* ─── Category meta — every Tailwind class written in full for JIT ───── */
const catMeta: Record<Category, {
  label: string
  shortLabel: string
  icon: React.ElementType
  description: string
  /* filter pill */
  pillActive: string
  pillInactive: string
  dotColor: string
  /* card accent */
  borderLeft: string          /* left accent bar */
  iconBg: string              /* icon circle bg */
  iconColor: string           /* icon colour */
  labelColor: string          /* category label above title */
  topicBg: string             /* topic pill bg */
  topicText: string           /* topic pill text */
  ctaColor: string            /* "Read guide" colour */
  /* hover shadow — full arbitrary value needed for JIT */
  hoverShadow: string
}> = {
  all: {
    label: "All Guides", shortLabel: "All", icon: BookOpen,
    description: "Browse everything",
    pillActive:   "bg-slate-900 text-white shadow-lg shadow-slate-900/20",
    pillInactive: "bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200",
    dotColor: "bg-slate-400",
    borderLeft:  "border-l-emerald-500",
    iconBg:      "bg-emerald-50",   iconColor:   "text-emerald-600",
    labelColor:  "text-emerald-600", topicBg: "bg-emerald-50", topicText: "text-emerald-700",
    ctaColor:    "text-emerald-600",
    hoverShadow: "hover:shadow-[0_24px_48px_-10px_rgba(5,150,105,0.18)]",
  },
  ppt: {
    label: "Plastic Packaging Tax", shortLabel: "PPT", icon: Package,
    description: "HMRC · PPT · Recycled content",
    pillActive:   "bg-blue-600 text-white shadow-lg shadow-blue-600/25",
    pillInactive: "bg-white/70 text-blue-600 hover:bg-blue-50 hover:text-blue-700 border border-blue-200",
    dotColor: "bg-blue-500",
    borderLeft:  "border-l-blue-500",
    iconBg:      "bg-blue-50",    iconColor:   "text-blue-600",
    labelColor:  "text-blue-600",  topicBg: "bg-blue-50", topicText: "text-blue-700",
    ctaColor:    "text-blue-600",
    hoverShadow: "hover:shadow-[0_24px_48px_-10px_rgba(37,99,235,0.18)]",
  },
  epr: {
    label: "Extended Producer Responsibility", shortLabel: "EPR", icon: Recycle,
    description: "Packaging fees · PRN · 2026",
    pillActive:   "bg-violet-600 text-white shadow-lg shadow-violet-600/25",
    pillInactive: "bg-white/70 text-violet-600 hover:bg-violet-50 hover:text-violet-700 border border-violet-200",
    dotColor: "bg-violet-500",
    borderLeft:  "border-l-violet-500",
    iconBg:      "bg-violet-50",  iconColor:   "text-violet-600",
    labelColor:  "text-violet-600", topicBg: "bg-violet-50", topicText: "text-violet-700",
    ctaColor:    "text-violet-600",
    hoverShadow: "hover:shadow-[0_24px_48px_-10px_rgba(124,58,237,0.18)]",
  },
  "simpler-recycling": {
    label: "Simpler Recycling", shortLabel: "Simpler Recycling", icon: Leaf,
    description: "Waste streams · Food waste · 2025",
    pillActive:   "bg-green-600 text-white shadow-lg shadow-green-600/25",
    pillInactive: "bg-white/70 text-green-700 hover:bg-green-50 border border-green-200",
    dotColor: "bg-green-500",
    borderLeft:  "border-l-green-500",
    iconBg:      "bg-green-50",   iconColor:   "text-green-600",
    labelColor:  "text-green-700", topicBg: "bg-green-50", topicText: "text-green-700",
    ctaColor:    "text-green-700",
    hoverShadow: "hover:shadow-[0_24px_48px_-10px_rgba(22,163,74,0.18)]",
  },
  waste: {
    label: "Waste & Duty of Care", shortLabel: "Waste", icon: Trash2,
    description: "WTN · Carriers · Hazardous",
    pillActive:   "bg-amber-500 text-white shadow-lg shadow-amber-500/25",
    pillInactive: "bg-white/70 text-amber-700 hover:bg-amber-50 border border-amber-200",
    dotColor: "bg-amber-500",
    borderLeft:  "border-l-amber-500",
    iconBg:      "bg-amber-50",   iconColor:   "text-amber-600",
    labelColor:  "text-amber-700", topicBg: "bg-amber-50", topicText: "text-amber-700",
    ctaColor:    "text-amber-700",
    hoverShadow: "hover:shadow-[0_24px_48px_-10px_rgba(217,119,6,0.18)]",
  },
}

/* ─── Badge styles ───────────────────────────────────────────────────── */
const badgeStyles: Record<string, string> = {
  Essential: "bg-blue-50 text-blue-700 border border-blue-200",
  New:       "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Popular:   "bg-amber-50 text-amber-700 border border-amber-200",
  Template:  "bg-violet-50 text-violet-700 border border-violet-200",
}

/* ─── Article data ───────────────────────────────────────────────────── */
const articles: {
  title: string; description: string; icon: React.ElementType
  href: string; badge: string; topics: string[]
  category: Category; readTime: string
}[] = [
  {
    title: "What Is Plastic Packaging Tax?",
    description: "Plain-English guide — rates, registration, and what HMRC expects.",
    icon: Package, href: "/resources/plastic-packaging-tax-explained",
    badge: "Essential", topics: ["Beginner", "PPT Basics", "Registration"],
    category: "ppt", readTime: "6 min",
  },
  {
    title: "Plastic Packaging Tax: Records & Accounts Guide",
    description: "Exactly what records and accounts HMRC requires, explained simply.",
    icon: Calculator, href: "/resources/plastic-packaging-tax",
    badge: "Essential", topics: ["Records", "Accounts", "Compliance"],
    category: "ppt", readTime: "10 min",
  },
  {
    title: "5 PPT Mistakes That Trigger an HMRC Audit",
    description: "The five most common PPT errors on HMRC's radar — with penalty figures.",
    icon: FileSearch, href: "/resources/ppt-hmrc-audit-mistakes",
    badge: "New", topics: ["HMRC Audit", "Penalties", "Risk"],
    category: "ppt", readTime: "12 min",
  },
  {
    title: "April 2027 PPT Changes",
    description: "Factory scraps rule change and chemical recycling recognition — how to prepare now.",
    icon: Package, href: "/resources/plastic-packaging-tax-2027",
    badge: "New", topics: ["2027 Changes", "Chemical Recycling", "Action Plan"],
    category: "ppt", readTime: "8 min",
  },
  {
    title: "HMO Compliance Checklist",
    description: "20-question pre-audit framework with traffic-light scoring across 5 risk sections.",
    icon: ListChecks, href: "/templates/hmo-compliance-checklist",
    badge: "Template", topics: ["20 Questions", "Gap Identification", "Pre-Audit"],
    category: "waste", readTime: "Self-assess",
  },
  {
    title: "EPR Packaging: A Plain English Guide",
    description: "What EPR is, whether it applies, and the key dates you can't miss.",
    icon: Recycle, href: "/resources/epr-packaging",
    badge: "New", topics: ["EPR Basics", "2026 Deadlines", "Fees"],
    category: "epr", readTime: "9 min",
  },
  {
    title: "Outsourced Compliance Team",
    description: "Compare outsourcing vs in-house — costs, what's included, expert support from £299/month.",
    icon: Users, href: "/resources/outsourced-compliance-team",
    badge: "New", topics: ["Cost Savings", "Full Service", "Multi-Site"],
    category: "epr", readTime: "7 min",
  },
  {
    title: "Two-Thirds of UK Businesses Aren't Ready for Simpler Recycling",
    description: "64% missed the March 2025 deadline. What's required and how to get compliant in 60 days.",
    icon: Leaf, href: "/resources/simpler-recycling-2025",
    badge: "New", topics: ["Readiness Check", "60-Day Plan", "Enforcement"],
    category: "simpler-recycling", readTime: "15 min",
  },
  {
    title: "Simpler Recycling for Businesses: Complete 2025 Guide",
    description: "Deadlines, 5 mandatory waste streams, penalties, and practical implementation steps.",
    icon: Recycle, href: "/resources/simpler-recycling-businesses",
    badge: "Popular", topics: ["Waste Compliance", "Food Waste", "Regulations"],
    category: "simpler-recycling", readTime: "10 min",
  },
  {
    title: "Waste & Packaging Documentation: Complete UK Guide",
    description: "Every document legally required — WTNs, PPT records, EPR files, and HMO plans.",
    icon: FileCheck, href: "/resources/waste-packaging-documentation",
    badge: "Essential", topics: ["WTNs", "PPT Records", "EPR Files", "Penalties"],
    category: "waste", readTime: "15 min",
  },
  {
    title: "Waste Duty of Care: Complete UK Compliance Guide",
    description: "Legal requirements, Waste Transfer Notes, carrier verification, and avoiding £300 penalties.",
    icon: ClipboardCheck, href: "/resources/duty-of-care-waste",
    badge: "Essential", topics: ["Legal Requirements", "Documentation", "WTN"],
    category: "waste", readTime: "10 min",
  },
  {
    title: "HMO Landlords Face £5,000 Fines Under New Recycling Rules",
    description: "Simpler Recycling extends to all HMOs from March 2026 — landlords are legally liable.",
    icon: Trash2, href: "/resources/hmo-recycling-fines",
    badge: "New", topics: ["HMO Compliance", "£5K Fines", "Licence Risk"],
    category: "waste", readTime: "18 min",
  },
  {
    title: "Landlord Fly-Tipping Fines Hit Record Highs",
    description: "1.15M incidents in 2023/24. Landlords face £600 fines for using unlicensed carriers.",
    icon: Truck, href: "/resources/landlord-fly-tipping-fines",
    badge: "New", topics: ["Fly-Tipping", "Carrier Licence", "£600 Fine"],
    category: "waste", readTime: "20 min",
  },
]

/* ─── Tool cards ─────────────────────────────────────────────────────── */
const tools: {
  label: string; description: string; href: string
  icon: React.ElementType; gradient: string; tag: string; tagColor: string
}[] = [
  {
    label: "PPT Gap Analyser",
    description: "AI compliance score 0–100 with your top HMRC risk areas.",
    href: "/ppt-gap-analyser", icon: Package,
    gradient: "from-blue-600 to-blue-800",
    tag: "Plastic Packaging Tax", tagColor: "bg-blue-500/20 text-blue-200",
  },
  {
    label: "EPR Gap Analyser",
    description: "Check EPR status in under 3 minutes — tonnage, PRN, 2026 readiness.",
    href: "/epr-gap-analyser", icon: Recycle,
    gradient: "from-violet-600 to-violet-800",
    tag: "Extended Producer Responsibility", tagColor: "bg-violet-500/20 text-violet-200",
  },
  {
    label: "Simpler Recycling Analyser",
    description: "Instant score showing which streams you're missing and your enforcement risk.",
    href: "/simpler-recycling-gap-analyser", icon: Leaf,
    gradient: "from-green-600 to-green-800",
    tag: "Simpler Recycling", tagColor: "bg-green-500/20 text-green-200",
  },
  {
    label: "Full Compliance Assessment",
    description: "All regulations in one — PPT, EPR, Duty of Care, Simpler Recycling.",
    href: "/quiz", icon: ClipboardCheck,
    gradient: "from-emerald-600 to-emerald-800",
    tag: "All Regulations", tagColor: "bg-emerald-500/20 text-emerald-200",
  },
]

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function ResourcesPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Category>("all")
  const [visible, setVisible] = useState(false)

  /* Initial mount animation */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* Re-animate cards when filter changes */
  const handleSelect = (key: Category) => {
    if (key === selected) return
    setVisible(false)
    setSelected(key)
    setTimeout(() => setVisible(true), 60)
  }

  const filtered = selected === "all" ? articles : articles.filter(a => a.category === selected)
  const activeMeta = catMeta[selected]
  const catKeys = Object.keys(catMeta) as Category[]

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-7"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transition: "opacity 0.5s ease, transform 0.5s ease" }}
          >
            <Sparkles className="w-3 h-3 text-emerald-500" />
            <span className="poppins-semibold text-[11px] text-slate-600 uppercase tracking-[0.12em]">Free UK Compliance Guides</span>
          </div>

          <h1
            className="poppins-bold text-[52px] sm:text-[68px] md:text-[80px] text-slate-900 leading-[1.0] tracking-[-0.03em] mb-5"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(14px)", transition: "opacity 0.55s ease 60ms, transform 0.55s ease 60ms" }}
          >
            Resources
          </h1>

          <p
            className="poppins-regular text-[17px] sm:text-lg text-slate-500 max-w-md mx-auto leading-relaxed"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.55s ease 120ms, transform 0.55s ease 120ms" }}
          >
            Plain-English guides for every UK compliance regulation.
          </p>
        </div>
      </section>

      {/* ── Category filter ───────────────────────────────────────────── */}
      <section
        className="px-4 sm:px-6 mb-10"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transition: "opacity 0.55s ease 180ms, transform 0.55s ease 180ms" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-1.5 shadow-sm inline-flex flex-wrap gap-1 w-full sm:w-auto">
            {catKeys.map(key => {
              const meta = catMeta[key]
              const Icon = meta.icon
              const count = key === "all" ? articles.length : articles.filter(a => a.category === key).length
              const isActive = selected === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl poppins-semibold text-[13px]
                    transition-all duration-200 flex-shrink-0
                    ${isActive ? meta.pillActive : meta.pillInactive}
                  `}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{meta.shortLabel}</span>
                  <span className={`text-[11px] poppins-medium ${isActive ? "opacity-70" : "opacity-40"}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section header ────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${activeMeta.dotColor}`} />
            <span className="poppins-bold text-[15px] text-slate-800">
              {selected === "all" ? "All Guides" : activeMeta.label}
            </span>
            <span className="poppins-regular text-[13px] text-slate-400">
              — {filtered.length} {filtered.length === 1 ? "article" : "articles"}
            </span>
          </div>
          {selected !== "all" && (
            <button
              type="button"
              onClick={() => handleSelect("all")}
              className="poppins-medium text-[13px] text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </section>

      {/* ── Article grid ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-24">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, i) => {
            const meta = catMeta[article.category]
            const Icon = article.icon
            return (
              <Link
                key={`${selected}-${article.href}`}
                href={article.href}
                className={`
                  group relative flex flex-col bg-white rounded-2xl overflow-hidden
                  border-l-[3px] ${meta.borderLeft}
                  shadow-sm hover:-translate-y-1.5 hover:shadow-xl
                  ${meta.hoverShadow}
                  transition-all duration-300
                `}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(18px)",
                  transition: `opacity 0.45s ease ${i * 55}ms, transform 0.45s ease ${i * 55}ms, box-shadow 0.3s ease, translate 0.3s ease`,
                }}
              >
                <div className="flex flex-col flex-1 p-5 pt-5">

                  {/* Top row: icon + badge + read time */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${meta.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                    </div>
                    <div className="flex flex-col items-end gap-1.5 ml-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] poppins-bold ${badgeStyles[article.badge] ?? "bg-slate-100 text-slate-600"}`}>
                        {article.badge}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] poppins-medium text-slate-400">
                        <Clock className="w-2.5 h-2.5" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Category label */}
                  <p className={`poppins-semibold text-[10px] tracking-[0.14em] uppercase mb-1.5 ${meta.labelColor}`}>
                    {meta.shortLabel}
                  </p>

                  {/* Title */}
                  <h2 className="poppins-bold text-[14px] sm:text-[15px] text-slate-900 mb-2 leading-snug group-hover:text-slate-700 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="poppins-regular text-[13px] text-slate-500 leading-relaxed flex-1 mb-4 line-clamp-2">
                    {article.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.topics.slice(0, 3).map((t, j) => (
                      <span
                        key={j}
                        className={`px-2 py-0.5 rounded-md text-[10px] poppins-semibold ${meta.topicBg} ${meta.topicText}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-1.5 poppins-bold text-[12px] ${meta.ctaColor} mt-auto`}>
                    Read guide
                    <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Free Tools ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-7">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <h2 className="poppins-bold text-[17px] text-slate-900 tracking-tight">Free Tools & Analysers</h2>
              <p className="poppins-regular text-[12px] text-slate-400 mt-0.5">Instant compliance score — no card required</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/20"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(14px)",
                    transition: `opacity 0.45s ease ${280 + i * 60}ms, transform 0.45s ease ${280 + i * 60}ms`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient}`} />
                  {/* Subtle dot grid */}
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  />
                  {/* Top-right glow */}
                  <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8 pointer-events-none" />

                  <div className="relative p-5 flex flex-col flex-1">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <span className={`self-start poppins-semibold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-2.5 ${tool.tagColor}`}>
                      {tool.tag}
                    </span>
                    <h3 className="poppins-bold text-[14px] text-white leading-snug mb-1.5">{tool.label}</h3>
                    <p className="poppins-regular text-[11px] text-white/60 leading-relaxed flex-1 mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center gap-1.5 poppins-bold text-[12px] text-white/80 group-hover:text-white transition-colors">
                      Use free tool
                      <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden bg-slate-900 rounded-3xl px-8 sm:px-14 py-16 text-center">
            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15)_0%,transparent_65%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.08)_0%,transparent_65%)] pointer-events-none" />
            {/* Dot grid */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/8 border border-white/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="poppins-semibold text-[10px] text-emerald-400 uppercase tracking-[0.15em]">Get Started</span>
              </div>
              <h2 className="poppins-bold text-[36px] sm:text-[48px] text-white mb-4 leading-[1.05] tracking-tight">
                Not sure where you stand?
              </h2>
              <p className="poppins-regular text-[16px] text-white/50 mb-10 max-w-sm mx-auto leading-relaxed">
                3 minutes. Every regulation covered. Full compliance picture in one go.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <button
                  onClick={() => router.push("/quiz")}
                  className="group inline-flex items-center justify-center gap-2.5 bg-white text-slate-900 hover:bg-slate-50 poppins-bold text-[13px] px-8 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-xl shadow-black/30 w-full sm:w-auto"
                >
                  Full Compliance Check — Free
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => router.push("/ppt-gap-analyser")}
                  className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 bg-white/6 hover:bg-white/10 text-white poppins-semibold text-[13px] px-8 py-3.5 rounded-xl transition-all duration-200 active:scale-95 w-full sm:w-auto"
                >
                  <BarChart3 className="w-4 h-4 opacity-70" />
                  PPT Gap Analyser
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
