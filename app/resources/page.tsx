"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowRight, ClipboardCheck, Recycle, Package, Calculator,
  ListChecks, FileSearch, FileCheck, Users, BarChart3, Zap,
  Leaf, Trash2, BookOpen, Sparkles, Truck, ChevronRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Footer from "@/components/Footer"
import { Navigation } from "@/components/Navigation"

/* ─── Types & data ────────────────────────────────────────────────────── */
type Category = "all" | "ppt" | "epr" | "simpler-recycling" | "waste"

const categories: {
  key: Category
  label: string
  shortLabel: string
  icon: React.ElementType
  description: string
  color: string
  bg: string
  border: string
  activeBg: string
  activeBorder: string
  activeText: string
  pill: string
}[] = [
  {
    key: "all",
    label: "All Guides",
    shortLabel: "All",
    icon: BookOpen,
    description: "Browse everything",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    activeBg: "bg-emerald-700",
    activeBorder: "border-emerald-700",
    activeText: "text-white",
    pill: "bg-emerald-700 text-white border-emerald-700",
  },
  {
    key: "ppt",
    label: "Plastic Packaging Tax",
    shortLabel: "PPT",
    icon: Package,
    description: "HMRC · PPT · Recycled content",
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    activeBg: "bg-blue-700",
    activeBorder: "border-blue-700",
    activeText: "text-white",
    pill: "bg-blue-700 text-white border-blue-700",
  },
  {
    key: "epr",
    label: "Extended Producer Responsibility",
    shortLabel: "EPR",
    icon: Recycle,
    description: "Packaging fees · PRN · 2026",
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    activeBg: "bg-purple-700",
    activeBorder: "border-purple-700",
    activeText: "text-white",
    pill: "bg-purple-700 text-white border-purple-700",
  },
  {
    key: "simpler-recycling",
    label: "Simpler Recycling",
    shortLabel: "Simpler Recycling",
    icon: Leaf,
    description: "Waste streams · Food waste · 2025",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    activeBg: "bg-green-700",
    activeBorder: "border-green-700",
    activeText: "text-white",
    pill: "bg-green-700 text-white border-green-700",
  },
  {
    key: "waste",
    label: "Waste & Duty of Care",
    shortLabel: "Waste",
    icon: Trash2,
    description: "WTN · Carriers · Hazardous",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    activeBg: "bg-amber-700",
    activeBorder: "border-amber-700",
    activeText: "text-white",
    pill: "bg-amber-700 text-white border-amber-700",
  },
]

const articles: {
  title: string
  description: string
  icon: React.ElementType
  href: string
  badge: string
  badgeColor: string
  topics: string[]
  category: Category
  readTime: string
}[] = [
  {
    title: "What Is Plastic Packaging Tax?",
    description: "Plain-English guide — rates, registration, and what HMRC expects.",
    icon: Package,
    href: "/resources/plastic-packaging-tax-explained",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["Beginner", "PPT Basics", "Registration"],
    category: "ppt",
    readTime: "6 min",
  },
  {
    title: "Plastic Packaging Tax: Records & Accounts Guide",
    description: "Exactly what records and accounts HMRC requires, explained simply.",
    icon: Calculator,
    href: "/resources/plastic-packaging-tax",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["Records", "Accounts", "Compliance"],
    category: "ppt",
    readTime: "10 min",
  },
  {
    title: "5 PPT Mistakes That Trigger an HMRC Audit",
    description: "The five most common PPT errors on HMRC's radar — with penalty figures.",
    icon: FileSearch,
    href: "/resources/ppt-hmrc-audit-mistakes",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["HMRC Audit", "Penalties", "Risk"],
    category: "ppt",
    readTime: "12 min",
  },
  {
    title: "April 2027 PPT Changes",
    description: "Factory scraps rule change and chemical recycling recognition — how to prepare now.",
    icon: Package,
    href: "/resources/plastic-packaging-tax-2027",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["2027 Changes", "Chemical Recycling", "Action Plan"],
    category: "ppt",
    readTime: "8 min",
  },
  {
    title: "HMO Compliance Checklist",
    description: "20-question pre-audit framework with traffic-light scoring across 5 risk sections.",
    icon: ListChecks,
    href: "/templates/hmo-compliance-checklist",
    badge: "Template",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["20 Questions", "Gap Identification", "Pre-Audit"],
    category: "waste",
    readTime: "Self-assess",
  },
  {
    title: "EPR Packaging: A Plain English Guide",
    description: "What EPR is, whether it applies, and the key dates you can't miss.",
    icon: Recycle,
    href: "/resources/epr-packaging",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["EPR Basics", "2026 Deadlines", "Fees"],
    category: "epr",
    readTime: "9 min",
  },
  {
    title: "Outsourced Compliance Team",
    description: "Compare outsourcing vs in-house — costs, what's included, expert support from £299/month.",
    icon: Users,
    href: "/resources/outsourced-compliance-team",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["Cost Savings", "Full Service", "Multi-Site"],
    category: "epr",
    readTime: "7 min",
  },
  {
    title: "Two-Thirds of UK Businesses Aren't Ready for Simpler Recycling",
    description: "64% missed the March 2025 deadline. What's required and how to get compliant in 60 days.",
    icon: Leaf,
    href: "/resources/simpler-recycling-2025",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["Readiness Check", "60-Day Plan", "Enforcement"],
    category: "simpler-recycling",
    readTime: "15 min",
  },
  {
    title: "Simpler Recycling for Businesses: Complete 2025 Guide",
    description: "Deadlines, 5 mandatory waste streams, penalties, and practical implementation steps.",
    icon: Recycle,
    href: "/resources/simpler-recycling-businesses",
    badge: "Popular",
    badgeColor: "bg-purple-100 text-purple-700",
    topics: ["Waste Compliance", "Food Waste", "Regulations"],
    category: "simpler-recycling",
    readTime: "10 min",
  },
  {
    title: "Waste & Packaging Documentation: Complete UK Guide",
    description: "Every document legally required — WTNs, PPT records, EPR files, and HMO plans.",
    icon: FileCheck,
    href: "/resources/waste-packaging-documentation",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["WTNs", "PPT Records", "EPR Files", "Penalties"],
    category: "waste",
    readTime: "15 min",
  },
  {
    title: "Waste Duty of Care: Complete UK Compliance Guide",
    description: "Legal requirements, Waste Transfer Notes, carrier verification, and avoiding £300 penalties.",
    icon: ClipboardCheck,
    href: "/resources/duty-of-care-waste",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["Legal Requirements", "Documentation", "WTN"],
    category: "waste",
    readTime: "10 min",
  },
  {
    title: "HMO Landlords Face £5,000 Fines Under New Recycling Rules",
    description: "Simpler Recycling extends to all HMOs from March 2026 — landlords are legally liable.",
    icon: Trash2,
    href: "/resources/hmo-recycling-fines",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["HMO Compliance", "£5K Fines", "Licence Risk"],
    category: "waste",
    readTime: "18 min",
  },
  {
    title: "Landlord Fly-Tipping Fines Hit Record Highs",
    description: "1.15M incidents in 2023/24. Landlords face £600 fines for using unlicensed carriers.",
    icon: Truck,
    href: "/resources/landlord-fly-tipping-fines",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["Fly-Tipping", "Carrier Licence", "£600 Fine"],
    category: "waste",
    readTime: "20 min",
  },
]

const tools: {
  label: string
  description: string
  href: string
  icon: React.ElementType
  gradient: string
  tag: string
  tagColor: string
}[] = [
  {
    label: "PPT Gap Analyser",
    description: "AI compliance score 0–100 with your top HMRC risk areas.",
    href: "/ppt-gap-analyser",
    icon: Package,
    gradient: "from-blue-600 to-blue-800",
    tag: "Plastic Packaging Tax",
    tagColor: "bg-blue-500/20 text-blue-200",
  },
  {
    label: "EPR Gap Analyser",
    description: "Check EPR status in under 3 minutes — tonnage, PRN, 2026 readiness.",
    href: "/epr-gap-analyser",
    icon: Recycle,
    gradient: "from-purple-600 to-purple-800",
    tag: "Extended Producer Responsibility",
    tagColor: "bg-purple-500/20 text-purple-200",
  },
  {
    label: "Simpler Recycling Analyser",
    description: "Instant score showing which streams you're missing and your enforcement risk.",
    href: "/simpler-recycling-gap-analyser",
    icon: Leaf,
    gradient: "from-green-600 to-green-800",
    tag: "Simpler Recycling",
    tagColor: "bg-green-500/20 text-green-200",
  },
  {
    label: "Full Compliance Assessment",
    description: "All regulations in one — PPT, EPR, Duty of Care, Simpler Recycling.",
    href: "/quiz",
    icon: ClipboardCheck,
    gradient: "from-emerald-600 to-emerald-800",
    tag: "All Regulations",
    tagColor: "bg-emerald-500/20 text-emerald-200",
  },
]

function countFor(key: Category) {
  if (key === "all") return articles.length
  return articles.filter(a => a.category === key).length
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function ResourcesPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Category>("all")

  const filtered = selected === "all" ? articles : articles.filter(a => a.category === selected)
  const activeCat = categories.find(c => c.key === selected)!

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-widest">Free UK Compliance Guides</span>
          </div>
          <h1 className="poppins-bold text-5xl sm:text-6xl md:text-7xl text-emerald-900 mb-5 leading-[1.02] tracking-tight">
            Resources
          </h1>
          <p className="poppins-regular text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Plain-English guides for every UK compliance regulation. Select a category to filter.
          </p>
        </div>
      </section>

      {/* ── Category selector ─────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2.5 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
            {categories.map(cat => {
              const Icon = cat.icon
              const isActive = selected === cat.key
              const count = countFor(cat.key)
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelected(cat.key)}
                  className={`
                    flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl border-2
                    transition-all duration-200 poppins-semibold text-sm
                    ${isActive
                      ? `${cat.activeBg} ${cat.activeBorder} ${cat.activeText} shadow-lg`
                      : `bg-white ${cat.border} ${cat.color} hover:shadow-md`
                    }
                  `}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? "bg-white/20" : cat.bg
                  }`}>
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : cat.color}`} />
                  </div>
                  <span>{cat.shortLabel}</span>
                  <span className={`text-[11px] poppins-medium ml-0.5 ${isActive ? "text-white/70" : "text-slate-400"}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Section label ─────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selected !== "all" && (
              <div className={`w-8 h-8 rounded-xl ${activeCat.activeBg} flex items-center justify-center shadow-sm`}>
                <activeCat.icon className="w-4 h-4 text-white" />
              </div>
            )}
            <div>
              <h2 className="poppins-bold text-xl text-slate-900">
                {selected === "all" ? "All Guides" : activeCat.label}
              </h2>
              <p className="poppins-regular text-xs text-slate-400 mt-0.5">
                {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                {selected !== "all" && ` · ${activeCat.description}`}
              </p>
            </div>
          </div>
          {selected !== "all" && (
            <button
              type="button"
              onClick={() => setSelected("all")}
              className="poppins-medium text-xs text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              View all →
            </button>
          )}
        </div>
      </section>

      {/* ── Article grid ──────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-20">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article, i) => {
            const catMeta = categories.find(c => c.key === article.category)!
            return (
              <Link
                key={i}
                href={article.href}
                className="group flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-slate-200/80 hover:border-slate-200"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${catMeta.activeBg}`} />

                <div className="flex flex-col flex-1 p-6">
                  {/* Icon + badges row */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl ${catMeta.bg} flex items-center justify-center shadow-sm`}>
                      <article.icon className={`w-6 h-6 ${catMeta.color}`} />
                    </div>
                    {/* Right badges */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] poppins-bold ${article.badgeColor}`}>
                        {article.badge}
                      </span>
                      <span className="text-[11px] poppins-medium text-slate-400">
                        {article.readTime} read
                      </span>
                    </div>
                  </div>

                  {/* Category label */}
                  <p className={`poppins-semibold text-[10px] tracking-[0.15em] uppercase mb-2 ${catMeta.color}`}>
                    {catMeta.shortLabel === "all" ? "" : catMeta.shortLabel}
                  </p>

                  {/* Title */}
                  <h2 className="poppins-bold text-[15px] text-slate-900 mb-2.5 leading-snug group-hover:text-emerald-800 transition-colors">
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed flex-1 mb-4">
                    {article.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {article.topics.slice(0, 3).map((t, j) => (
                      <span key={j} className={`px-2.5 py-0.5 rounded-full text-[10px] poppins-semibold border ${catMeta.bg} ${catMeta.color} ${catMeta.border}`}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-1.5 poppins-bold text-sm ${catMeta.color} mt-auto`}>
                    Read guide
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ── Free Tools ────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="poppins-bold text-xl text-slate-900">Free Tools & Analysers</h2>
              <p className="poppins-regular text-xs text-slate-400 mt-0.5">Instant compliance score — no card required</p>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className="group relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                >
                  {/* Dark gradient card */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient}`} />
                  {/* Subtle grid */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Glow orb */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />

                  <div className="relative p-6 flex flex-col flex-1">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Tag */}
                    <span className={`inline-flex self-start poppins-semibold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full mb-3 ${tool.tagColor}`}>
                      {tool.tag}
                    </span>

                    <h3 className="poppins-bold text-[15px] text-white leading-snug mb-2">{tool.label}</h3>
                    <p className="poppins-regular text-[12px] text-white/60 leading-relaxed flex-1 mb-5">
                      {tool.description}
                    </p>

                    <div className="flex items-center gap-1.5 poppins-bold text-sm text-white/90 group-hover:text-white transition-colors">
                      Use free tool
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-emerald-700 rounded-3xl px-10 py-16 text-center">
            {/* Background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.15)_0%,transparent_60%)]" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10">
              <p className="poppins-semibold text-emerald-300 text-xs tracking-[0.2em] uppercase mb-5">Get Started</p>
              <h2 className="poppins-bold text-4xl sm:text-5xl text-white mb-4 leading-tight">
                Not sure where you stand?
              </h2>
              <p className="poppins-regular text-lg text-emerald-100/80 mb-10 max-w-xl mx-auto">
                3-minute assessment. Every regulation covered. Full compliance picture in one go.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <button
                  onClick={() => router.push("/quiz")}
                  className="group inline-flex items-center justify-center gap-2.5 bg-white text-emerald-800 hover:bg-emerald-50 poppins-bold text-sm px-8 py-4 rounded-2xl transition-all duration-200 active:scale-95 shadow-xl shadow-black/20 w-full sm:w-auto"
                >
                  Full Compliance Check — Free
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => router.push("/ppt-gap-analyser")}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/15 text-white poppins-semibold text-sm px-8 py-4 rounded-2xl transition-all duration-200 active:scale-95 w-full sm:w-auto"
                >
                  <BarChart3 className="w-4 h-4" />
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
