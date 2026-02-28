"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, ClipboardCheck, Recycle, Package, Calculator,
  ListChecks, FileSearch, FileCheck, Users, BarChart3, Zap, CheckCircle,
  Leaf, Trash2, BookOpen, ChevronRight, Sparkles, Truck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import Footer from "@/components/Footer"
import { MobileMenu } from "@/components/MobileMenu"
import { Navigation } from "@/components/Navigation"

/* ─── Data ────────────────────────────────────────────────────────────── */

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
  /* ── PPT ── */
  {
    title: "What Is Plastic Packaging Tax?",
    description: "A plain-English beginner's guide to PPT — what it is, whether it applies to you, rates, registration, and what HMRC expects.",
    icon: Package,
    href: "/resources/plastic-packaging-tax-explained",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["Beginner", "PPT Basics", "2025 Rates", "Registration"],
    category: "ppt",
    readTime: "6 min",
  },
  {
    title: "Plastic Packaging Tax: Records & Accounts Guide",
    description: "Complete guide to the records and accounts you must keep for PPT. Learn exactly what HMRC requires, in plain language.",
    icon: Calculator,
    href: "/resources/plastic-packaging-tax",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["Records", "Accounts", "Evidence", "Compliance"],
    category: "ppt",
    readTime: "10 min",
  },
  {
    title: "5 PPT Mistakes That Trigger an HMRC Audit",
    description: "The 5 most common Plastic Packaging Tax mistakes on HMRC's radar. Real examples, penalty figures, and how to protect your business.",
    icon: FileSearch,
    href: "/resources/ppt-hmrc-audit-mistakes",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["HMRC Audit", "Penalties", "Risk", "Compliance"],
    category: "ppt",
    readTime: "12 min",
  },
  {
    title: "April 2027 PPT Changes: What UK Businesses Need to Know",
    description: "Two major rule changes arrive in April 2027 — factory scraps no longer count, chemical recycling gains recognition. Find out how to prepare now.",
    icon: Package,
    href: "/resources/plastic-packaging-tax-2027",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["2027 Changes", "Chemical Recycling", "Factory Scraps", "Action Plan"],
    category: "ppt",
    readTime: "8 min",
  },
  {
    title: "HMO Compliance Checklist",
    description: "The 20-question pre-audit framework we use with clients — traffic-light scoring across 5 risk sections. Know your gaps before an inspector does.",
    icon: ListChecks,
    href: "/templates/hmo-compliance-checklist",
    badge: "Template",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["20 Questions", "Traffic-Light Scoring", "Gap Identification", "Pre-Audit"],
    category: "waste",
    readTime: "Self-assess",
  },
  /* ── EPR ── */
  {
    title: "EPR Packaging: A Plain English Guide for UK Businesses",
    description: "What EPR is, whether it applies to you, what you need to do, and the key dates you can't miss — explained simply. Includes 6 practical tips.",
    icon: Recycle,
    href: "/resources/epr-packaging",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["EPR Basics", "2026 Deadlines", "Fees", "Tips"],
    category: "epr",
    readTime: "9 min",
  },
  {
    title: "Outsourced Compliance Team",
    description: "Outsourcing compliance vs hiring in-house — compare costs, see what's included, and discover how to get expert support from £299/month.",
    icon: Users,
    href: "/resources/outsourced-compliance-team",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["Cost Savings", "Expert Support", "Full Service", "Multi-Site"],
    category: "epr",
    readTime: "7 min",
  },
  /* ── Simpler Recycling ── */
  {
    title: "Two-Thirds of UK Businesses Aren't Ready for Simpler Recycling",
    description: "64% of businesses missed the 31 March 2025 deadline. Find out exactly what's required, why waste collectors are auditing bins, and how to get compliant in 60 days.",
    icon: Leaf,
    href: "/resources/simpler-recycling-2025",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["Readiness Check", "60-Day Plan", "Food Waste", "Enforcement"],
    category: "simpler-recycling",
    readTime: "15 min",
  },
  {
    title: "Simpler Recycling for Businesses: Complete 2025 Guide",
    description: "Full compliance guide covering deadlines, the 5 mandatory waste streams, penalties, food waste setup, and practical implementation steps.",
    icon: Recycle,
    href: "/resources/simpler-recycling-businesses",
    badge: "Popular",
    badgeColor: "bg-purple-100 text-purple-700",
    topics: ["Waste Compliance", "Deadlines", "Food Waste", "Regulations"],
    category: "simpler-recycling",
    readTime: "10 min",
  },
  /* ── Waste & Duty of Care ── */
  {
    title: "Waste & Packaging Documentation: The Complete UK Guide",
    description: "Every document UK businesses and landlords are legally required to hold — Waste Transfer Notes, PPT records, EPR files, and HMO plans. What each is, why you need it, and the penalty for missing it.",
    icon: FileCheck,
    href: "/resources/waste-packaging-documentation",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["WTNs", "PPT Records", "EPR Files", "HMO Documentation", "Penalties"],
    category: "waste",
    readTime: "15 min",
  },
  {
    title: "Waste Duty of Care: Complete UK Business Compliance Guide",
    description: "Everything UK businesses need to know about Duty of Care — legal requirements, Waste Transfer Notes, carrier verification, and avoiding £300 penalties.",
    icon: ClipboardCheck,
    href: "/resources/duty-of-care-waste",
    badge: "Essential",
    badgeColor: "bg-blue-100 text-blue-700",
    topics: ["Legal Requirements", "Documentation", "Penalties", "WTN"],
    category: "waste",
    readTime: "10 min",
  },
  {
    title: "HMO Landlords Face £5,000 Fines Under New Recycling Rules",
    description: "Simpler Recycling extends to all HMOs from 31 March 2026. Landlords are legally liable for tenant bin contamination — here's how to avoid fines and protect your licence.",
    icon: Trash2,
    href: "/resources/hmo-recycling-fines",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["HMO Compliance", "Simpler Recycling", "£5K Fines", "Licence Risk"],
    category: "waste",
    readTime: "18 min",
  },
  {
    title: "Landlord Fly-Tipping Fines Hit Record Highs—How to Protect Yourself",
    description: "1.15M fly-tipping incidents in 2023/24. Landlords face £600 fines for using unlicensed carriers — even if they didn't dump the waste. Check carriers, keep WTNs.",
    icon: Truck,
    href: "/resources/landlord-fly-tipping-fines",
    badge: "New",
    badgeColor: "bg-emerald-100 text-emerald-700",
    topics: ["Fly-Tipping", "Carrier Licence", "WTN", "£600 Fine"],
    category: "waste",
    readTime: "20 min",
  },
]

const tools: {
  label: string
  description: string
  href: string
  icon: React.ElementType
  accentBg: string
  accentText: string
  accentBorder: string
  tag: string
}[] = [
  {
    label: "PPT Gap Analyser",
    description: "Answer 10 questions and get an AI compliance score 0–100 with your top HMRC risk areas and a personalised action plan.",
    href: "/ppt-gap-analyser",
    icon: Package,
    accentBg: "bg-blue-600",
    accentText: "text-blue-700",
    accentBorder: "border-blue-200",
    tag: "Plastic Packaging Tax",
  },
  {
    label: "EPR Gap Analyser",
    description: "Check your EPR compliance status in under 3 minutes — invoices, tonnage thresholds, PRN exposure, and 2026 readiness.",
    href: "/epr-gap-analyser",
    icon: Recycle,
    accentBg: "bg-purple-600",
    accentText: "text-purple-700",
    accentBorder: "border-purple-200",
    tag: "Extended Producer Responsibility",
  },
  {
    label: "Simpler Recycling Gap Analyser",
    description: "Instant compliance score showing which waste streams you're missing, your enforcement risk, and a prioritised action list.",
    href: "/simpler-recycling-gap-analyser",
    icon: Leaf,
    accentBg: "bg-green-600",
    accentText: "text-green-700",
    accentBorder: "border-green-200",
    tag: "Simpler Recycling",
  },
  {
    label: "Full Compliance Assessment",
    description: "15-question assessment covering all regulations — PPT, EPR, PRN, Duty of Care, Simpler Recycling. Know every gap in 3 minutes.",
    href: "/quiz",
    icon: ClipboardCheck,
    accentBg: "bg-emerald-700",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    tag: "All Regulations",
  },
]

/* ─── Article count per category ─────────────────────────────────────── */
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

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="poppins-semibold text-xs text-emerald-800 uppercase tracking-wide">Free UK Compliance Guides</span>
          </div>
          <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 mb-4 leading-tight">
            Resources
          </h1>
          <p className="poppins-regular text-lg sm:text-xl text-emerald-700 max-w-2xl mx-auto leading-relaxed">
            Select a regulation below to find the guides, checklists, and tools that apply to your business.
          </p>
        </div>

        {/* ── Category selector ──────────────────────────────────────── */}
        <div className="mb-10">
          <p className="poppins-medium text-xs text-emerald-500 uppercase tracking-widest text-center mb-5">
            Browse by regulation
          </p>

          {/* Scrollable on mobile, wrapped grid on sm+ */}
          <div className="flex gap-3 overflow-x-auto pb-3 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
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
                    flex-shrink-0 flex flex-col items-center gap-2
                    w-[130px] sm:w-[140px] px-4 py-4 rounded-2xl border-2 transition-all duration-200
                    ${isActive
                      ? `${cat.activeBg} ${cat.activeBorder} shadow-lg scale-[1.03]`
                      : `${cat.bg} ${cat.border} hover:shadow-md hover:scale-[1.01]`
                    }
                  `}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? "bg-white/20" : "bg-white"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : cat.color}`} />
                  </div>
                  <span className={`poppins-bold text-xs text-center leading-tight ${isActive ? "text-white" : cat.color}`}>
                    {cat.shortLabel}
                  </span>
                  <span className={`poppins-regular text-[11px] ${isActive ? "text-white/80" : "text-gray-500"}`}>
                    {cat.key === "all" ? `${count} guides` : `${count} article${count !== 1 ? "s" : ""}`}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Article section header ─────────────────────────────────── */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {selected !== "all" && (
              <div className={`w-8 h-8 rounded-lg ${activeCat.activeBg} flex items-center justify-center`}>
                <activeCat.icon className="w-4 h-4 text-white" />
              </div>
            )}
            <div>
              <h2 className="poppins-bold text-xl text-emerald-900">
                {selected === "all" ? "All Guides" : activeCat.label}
              </h2>
              <p className="poppins-regular text-xs text-emerald-600 mt-0.5">
                {filtered.length} {filtered.length === 1 ? "article" : "articles"}
                {selected !== "all" && ` · ${activeCat.description}`}
              </p>
            </div>
          </div>
          {selected !== "all" && (
            <button
              type="button"
              onClick={() => setSelected("all")}
              className="poppins-medium text-xs text-emerald-600 hover:text-emerald-800 underline underline-offset-2 transition-colors"
            >
              View all
            </button>
          )}
        </div>

        {/* ── Article grid ──────────────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((article, i) => {
            const catMeta = categories.find(c => c.key === article.category)!
            const isComing = article.badge === "Coming Soon"
            return (
              <Link
                key={i}
                href={article.href}
                className={`
                  group flex flex-col bg-white/70 backdrop-blur-sm rounded-2xl border
                  border-emerald-100 p-6 transition-all duration-300
                  ${isComing
                    ? "opacity-60 cursor-not-allowed pointer-events-none"
                    : "hover:border-emerald-200 hover:shadow-xl hover:-translate-y-1"
                  }
                `}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${catMeta.bg} flex items-center justify-center`}>
                    <article.icon className={`w-6 h-6 ${catMeta.color}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs poppins-semibold ${article.badgeColor}`}>
                      {article.badge}
                    </span>
                    {article.readTime !== "—" && (
                      <span className="text-[11px] poppins-regular text-emerald-500">{article.readTime} read</span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h2 className="poppins-semibold text-base text-emerald-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h2>
                <p className="poppins-regular text-sm text-emerald-700 mb-4 leading-relaxed flex-1">
                  {article.description}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {article.topics.map((t, j) => (
                    <span key={j} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 text-[11px] poppins-medium">
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA row */}
                {!isComing ? (
                  <div className="flex items-center text-emerald-600 poppins-semibold text-sm group-hover:text-emerald-800 transition-colors mt-auto">
                    Read article
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                ) : (
                  <div className="text-gray-400 poppins-medium text-sm mt-auto">Coming soon…</div>
                )}
              </Link>
            )
          })}
        </div>

        {/* ── Free Tools & Guides ───────────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h2 className="poppins-bold text-xl text-emerald-900">Free Tools & Analysers</h2>
          </div>
          <p className="poppins-regular text-sm text-emerald-600 mb-6 ml-11">
            Get your compliance score in minutes — free, instant, no card required.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Link
                  key={i}
                  href={tool.href}
                  className={`
                    group flex flex-col bg-white/70 backdrop-blur-sm rounded-2xl border-2
                    ${tool.accentBorder} p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                  `}
                >
                  <div className={`w-10 h-10 rounded-xl ${tool.accentBg} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className={`poppins-bold text-xs uppercase tracking-wide mb-1 ${tool.accentText}`}>{tool.tag}</p>
                  <h3 className="poppins-semibold text-base text-emerald-900 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    {tool.label}
                  </h3>
                  <p className="poppins-regular text-xs text-emerald-700 leading-relaxed mb-4 flex-1">
                    {tool.description}
                  </p>
                  <div className={`flex items-center poppins-semibold text-sm ${tool.accentText} group-hover:opacity-80 transition-opacity mt-auto`}>
                    Use free tool
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-emerald-700 rounded-3xl p-10 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
          <div className="relative z-10">
            <h2 className="poppins-bold text-3xl sm:text-4xl mb-4">Not sure where you stand?</h2>
            <p className="poppins-regular text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Our free 3-minute assessment covers all UK packaging and waste regulations at once — get your full compliance picture in one go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                onClick={() => router.push("/quiz")}
                size="lg"
                className="poppins-bold bg-white text-green-800 hover:bg-green-50 shadow-xl px-8 py-5 text-base group w-full sm:w-auto"
              >
                <CheckCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Full Compliance Check — Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => router.push("/ppt-gap-analyser")}
                size="lg"
                className="poppins-semibold bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 shadow-lg px-8 py-5 text-base w-full sm:w-auto"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                PPT Gap Analyser
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
