"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
  Eye,
  Zap,
  MapPin,
  Wifi,
  Camera,
  Users,
  ClipboardCheck,
  AlertTriangle,
  BadgeCheck,
  ChevronRight,
  ChevronDown,
  Mail,
  Building2,
  Trash2,
  FileCheck,
  Search,
  Lock,
  Home,
  Heart,
  Stethoscope,
  Leaf,
  LayoutDashboard,
  GraduationCap,
  Truck,
  BarChart3,
  UtensilsCrossed,
  Package,
  HardHat,
  Sparkles,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { useBooking } from "@/components/BookingProvider"

/* ─── Intersection observer hook ─────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Animated counter ────────────────────────────────────────────────────── */
function Counter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, visible } = useReveal(0.3)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const legislation = [
  { code: "EPA 1990",  name: "Duty of Care",          icon: Shield,        accent: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.15)", desc: "Every business must manage its waste responsibly. We verify transfer notes, carrier licences, and chain of custody." },
  { code: "SR 2026",   name: "Simpler Recycling",     icon: Leaf,          accent: "from-teal-500 to-emerald-600",   glow: "rgba(20,184,166,0.15)", desc: "Mandatory food, dry recyclable and residual separation for all UK businesses. We verify bin setup, labelling and collection contracts." },
  { code: "HTM 07-01", name: "Clinical Waste",        icon: Stethoscope,   accent: "from-emerald-600 to-teal-700",   glow: "rgba(16,185,129,0.15)", desc: "Healthcare-specific guidance covering segregation, colour-coding, storage and consignment notes for infectious and hazardous clinical waste." },
  { code: "HWR 2005",  name: "Hazardous Waste",       icon: AlertTriangle, accent: "from-amber-500 to-orange-600",   glow: "rgba(245,158,11,0.15)", desc: "Pre-acceptance procedures, consignment note trails and disposal site authorisation checks for any business producing hazardous waste." },
  { code: "CWR 2012",  name: "Controlled Waste",      icon: Trash2,        accent: "from-emerald-500 to-green-700",  glow: "rgba(16,185,129,0.15)", desc: "Classification and handling rules for household, industrial and commercial waste — ensuring the right treatment route for every stream." },
  { code: "EA Reg",    name: "Carrier Registration",  icon: BadgeCheck,    accent: "from-teal-400 to-emerald-600",   glow: "rgba(20,184,166,0.15)", desc: "We cross-check every contractor against the Environment Agency's public register to confirm they are legally authorised to carry your waste." },
]

const auditSteps = [
  { num: "01", icon: Search,       title: "Scope & Brief",          body: "We agree the site type, waste streams, and any known issues. Remote clients send records in advance; on-site clients book a visit. No drawn-out onboarding — we move within 48 hours." },
  { num: "02", icon: ClipboardCheck, title: "Records Review",       body: "Every Waste Transfer Note, consignment record, carrier licence, and waste policy is checked for accuracy, completeness, and day-to-day compliance." },
  { num: "03", icon: Eye,          title: "Site Review",            body: "On-site: we review waste areas, labels, bin placement, and staff practice. Remote: we assess photos, records, policies, and contractor evidence." },
  { num: "04", icon: AlertTriangle, title: "Gap Review",            body: "Every finding is RAG-rated — Red (urgent), Amber (needs action), Green (working). We identify what is wrong and why it needs fixing." },
  { num: "05", icon: FileCheck,    title: "Written Report — 48hr",  body: "A signed PDF with a RAG summary, clear recommendations, and practical actions — ready for internal review, regulator questions, or management sign-off." },
]

const usedBy = [
  { icon: BarChart3,       label: "Cost Reviews" },
  { icon: BadgeCheck,      label: "Contractor Checks" },
  { icon: LayoutDashboard, label: "Internal Reviews" },
  { icon: Shield,          label: "Site Readiness" },
  { icon: AlertTriangle,   label: "Risk Tracking" },
  { icon: GraduationCap,   label: "Board Updates" },
]

const sectors = [
  "Care Homes", "UK Property Sector", "HMO Properties",
  "Offices", "Warehouses", "Food & beverage manufacturing",
  "Hospitality", "Logistics", "Multi-Site Portfolios",
]

/* ─── Sector accordion items ─────────────────────────────────────────────── */
const sectorAccordions = [
  {
    id: "hmo",
    icon: Home,
    eyebrow: "UK Property Sector",
    headline: "Reduce Waste Risk Across Managed Properties",
    sub: "Poor bin setups, weak tenant guidance, and missing paperwork can lead to avoidable cost and compliance problems across managed property portfolios.",
    bullets: [
      "Bin setup reviewed against current waste rules",
      "Waste Transfer Notes and carrier licences checked",
      "Tenant guidance and site instructions reviewed",
      "Collection arrangements and contractor setup assessed",
      "48-hour written report with clear next steps",
    ],
    cta: "View HMO Compliance Checklist",
    ctaHref: "/resources/hmo-waste-compliance-checklist",
    secondaryCta: "Book a Property Audit",
    pal: {
      eyebrow: "#b45309",
      bg: "linear-gradient(135deg,rgba(255,251,235,0.65) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#fbbf24,#d97706)",
      iconBg: "#fef3c7", iconColor: "#b45309",
      pill: "#fef3c7", pillText: "#92400e",
      divider: "#fcd34d",
      checkBg: "#fef9c3", checkColor: "#ca8a04",
      ctaBg: "#d97706",
    },
  },
  {
    id: "carehomes",
    icon: Heart,
    eyebrow: "Care Homes",
    headline: "Control Waste Costs. Reduce Compliance Risk.",
    sub: "Care providers need waste systems that work day to day — with clear records, practical processes, and the right contractor setup in place.",
    bullets: [
      "Waste streams and segregation reviewed",
      "Waste records and supporting paperwork checked",
      "Contractor licences and collection arrangements reviewed",
      "Waste management process assessed for gaps",
      "48-hour written report with action plan",
    ],
    cta: "View Care Home Compliance Checklist",
    ctaHref: "/resources/care-home-waste-compliance-checklist",
    secondaryCta: "Book a Care Home Audit",
    pal: {
      eyebrow: "#be185d",
      bg: "linear-gradient(135deg,rgba(255,228,230,0.55) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#fb7185,#be185d)",
      iconBg: "#ffe4e6", iconColor: "#be185d",
      pill: "#ffe4e6", pillText: "#9f1239",
      divider: "#fda4af",
      checkBg: "#fff1f2", checkColor: "#e11d48",
      ctaBg: "#be185d",
    },
  },
  {
    id: "hospitality",
    icon: UtensilsCrossed,
    eyebrow: "Hospitality",
    headline: "Cut Waste Spend Across Busy Sites",
    sub: "Food businesses often lose money through poor segregation, weak storage, and contractor setups that no longer match the way the site actually runs.",
    bullets: [
      "Food and general waste streams reviewed",
      "Dry recycling and residual setup checked",
      "Duty of Care paperwork and carrier checks completed",
      "Specialist waste arrangements reviewed where needed",
      "48-hour written report with practical actions",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Book a Hospitality Audit",
    pal: {
      eyebrow: "#c2410c",
      bg: "linear-gradient(135deg,rgba(255,237,213,0.6) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#fb923c,#ea580c)",
      iconBg: "#ffedd5", iconColor: "#c2410c",
      pill: "#ffedd5", pillText: "#9a3412",
      divider: "#fdba74",
      checkBg: "#fff7ed", checkColor: "#ea580c",
      ctaBg: "#ea580c",
    },
  },
  {
    id: "logistics",
    icon: Package,
    eyebrow: "Logistics & Warehousing",
    headline: "Reduce Cost Across High-Volume Waste Streams",
    sub: "Busy operational sites can carry hidden waste costs through mixed streams, poor segregation, and weak contractor control across multiple collections.",
    bullets: [
      "Waste streams mapped to current handling routes",
      "Packaging and recovery obligations reviewed",
      "Contractors checked against public registers",
      "Waste records checked for gaps and errors",
      "48-hour report with prioritised actions for site teams",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Book a Logistics Audit",
    pal: {
      eyebrow: "#1d4ed8",
      bg: "linear-gradient(135deg,rgba(219,234,254,0.55) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#60a5fa,#2563eb)",
      iconBg: "#dbeafe", iconColor: "#1d4ed8",
      pill: "#dbeafe", pillText: "#1e40af",
      divider: "#93c5fd",
      checkBg: "#eff6ff", checkColor: "#2563eb",
      ctaBg: "#2563eb",
    },
  },
  {
    id: "construction",
    icon: HardHat,
    eyebrow: "Construction",
    headline: "Control Waste Risk On Active Sites",
    sub: "Construction sites generate multiple waste streams with different handling requirements. Weak controls can create avoidable cost, delay, and compliance issues.",
    bullets: [
      "Waste streams and treatment routes reviewed",
      "Hazardous records checked where applicable",
      "Skip hire and contractor registrations confirmed",
      "Site waste paperwork and controls assessed",
      "48-hour written report for contractor review",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Book a Construction Audit",
    pal: {
      eyebrow: "#854d0e",
      bg: "linear-gradient(135deg,rgba(254,249,195,0.6) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#facc15,#ca8a04)",
      iconBg: "#fef9c3", iconColor: "#854d0e",
      pill: "#fef9c3", pillText: "#713f12",
      divider: "#fde047",
      checkBg: "#fefce8", checkColor: "#a16207",
      ctaBg: "#ca8a04",
    },
  },
  {
    id: "manufacturers",
    icon: Package,
    eyebrow: "Food & Beverage Manufacturing",
    headline: "Find Waste Savings In Daily Operations",
    sub: "Manufacturers often carry avoidable waste costs through poor segregation, weak contractor terms, and packaging or food waste streams that are not being managed well.",
    bullets: [
      "Packaging and waste obligations reviewed",
      "General waste records and carrier checks completed",
      "Food waste separation and handling assessed",
      "Dry recyclable streams reviewed for improvement",
      "48-hour report with clear action plan for operations",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Book a Manufacturer Audit",
    pal: {
      eyebrow: "#0f766e",
      bg: "linear-gradient(135deg,rgba(204,251,241,0.55) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#2dd4bf,#0f766e)",
      iconBg: "#ccfbf1", iconColor: "#0f766e",
      pill: "#ccfbf1", pillText: "#134e4a",
      divider: "#5eead4",
      checkBg: "#f0fdfa", checkColor: "#0d9488",
      ctaBg: "#0f766e",
    },
  },
  {
    id: "other",
    icon: Sparkles,
    eyebrow: "Every Other Regulated Business",
    headline: "Don't See Your Sector? We Still Cover You.",
    sub: "Waste rules apply to every business that produces waste. If you have waste contractors, records, or site processes to manage, we can audit them.",
    bullets: [
      "Offices, retail, education, healthcare, manufacturing",
      "Any business with waste contractors or collections",
      "Multi-site portfolios across mixed sectors",
      "Any organisation managing cost and compliance risk",
      "Fixed-fee quote agreed before we start",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Discuss Your Requirements",
    pal: {
      eyebrow: "#047857",
      bg: "linear-gradient(135deg,rgba(209,250,229,0.55) 0%,rgba(255,255,255,0.98) 100%)",
      bar: "linear-gradient(to bottom,#34d399,#059669)",
      iconBg: "#d1fae5", iconColor: "#047857",
      pill: "#d1fae5", pillText: "#065f46",
      divider: "#6ee7b7",
      checkBg: "#ecfdf5", checkColor: "#059669",
      ctaBg: "#059669",
    },
  },
]

export default function ServicesPage() {
    const { openBooking } = useBooking()

  const [activeStep, setActiveStep] = useState(0)
  const [deliveryMode, setDeliveryMode] = useState<"remote" | "onsite">("remote")
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)

  const hero     = useReveal(0.05)
  const legRef   = useReveal(0.1)
  const sectorRef = useReveal(0.1)
  const processRef = useReveal(0.1)
  const deliveryRef = useReveal(0.1)
  const reportRef = useReveal(0.1)
  const whoRef    = useReveal(0.1)
  const pricingRef = useReveal(0.1)
  const tplRef    = useReveal(0.1)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />

        <div
          ref={hero.ref}
          className="max-w-5xl mx-auto relative z-10 text-center"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7 transition-all duration-700"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Waste Cost & Compliance Audits · UK</span>
          </div>

          {/* Headline */}
          <h1
            className="poppins-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-slate-900 mb-5 transition-all duration-700 delay-100"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(20px)" }}
          >
            What We{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradientX_3s_ease_infinite]">
              Deliver.
            </span>
          </h1>

          <p
            className="poppins-regular text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(16px)" }}
          >
            Independent waste cost and compliance audits for UK businesses — remote or on-site, with fixed-fee pricing and a 48-hour written report.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12 transition-all duration-700 delay-300"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(12px)" }}
          >
            <button
              onClick={() => openBooking("snapshot")}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-95"
            >
              Book an Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              Free Cost Check
            </Link>
          </div>

          {/* Sector pills */}
          <div
            className="flex flex-wrap justify-center gap-2 transition-all duration-700 delay-400"
            style={{ opacity: hero.visible ? 1 : 0 }}
          >
            {sectors.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-500 text-xs poppins-medium shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAT BAR ───────────────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-0">
          {[
            { val: 48,  suf: "hr", label: "Report Turnaround" },
            { val: 100, suf: "%",  label: "Clear Written Reports" },
            { val: 6,   suf: "",   label: "Key Risk Areas" },
            { val: 0,   suf: "",   label: "Contracts To Sell" },
          ].map((s, i) => (
            <div key={s.label} className={`text-center px-4 ${i > 0 ? "border-l border-slate-100" : ""}`}>
              <p className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-emerald-700 tabular-nums">
                <Counter target={s.val} suffix={s.suf} />
              </p>
              <p className="poppins-regular text-[10px] sm:text-xs text-slate-400 mt-1.5 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTOR DROPDOWNS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-emerald-50/60 via-white to-white relative overflow-hidden">
        {/* Emerald grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.045)_1px,transparent_1px)] bg-[size:56px_56px] pointer-events-none" />
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[260px] bg-emerald-100/70 rounded-full blur-[100px] pointer-events-none" />
        {/* Decorative orbs */}
        <div className="absolute top-32 left-[8%] w-40 h-40 bg-teal-100/50 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute top-48 right-[6%] w-32 h-32 bg-emerald-200/40 rounded-full blur-[50px] pointer-events-none" />

        <div ref={sectorRef.ref} className="max-w-4xl mx-auto relative z-10">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: sectorRef.visible ? 1 : 0, transform: sectorRef.visible ? "none" : "translateY(20px)" }}
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Your sector</span>
            </div>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              We Audit Waste Costs And Compliance{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Across UK Business Sectors.
              </span>
            </h2>
            <p className="poppins-regular text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Select your sector to see what we review — and where we help you reduce cost and risk.
            </p>
            {/* Accent divider */}
            <div className="mt-6 flex justify-center gap-1.5">
              <div className="w-8 h-[3px] rounded-full bg-emerald-400" />
              <div className="w-4 h-[3px] rounded-full bg-emerald-200" />
              <div className="w-2 h-[3px] rounded-full bg-emerald-100" />
            </div>
          </div>

          <div className="space-y-2.5">
            {sectorAccordions.map((item, i) => {
              const Icon = item.icon
              const isOpen = openAccordion === item.id
              const p = item.pal
              return (
                <div
                  key={item.id}
                  className="relative rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    opacity: sectorRef.visible ? 1 : 0,
                    transform: sectorRef.visible ? "none" : "translateY(20px)",
                    transitionDelay: `${i * 80}ms`,
                    transitionDuration: "600ms",
                    boxShadow: isOpen
                      ? "0 8px 32px rgba(0,0,0,0.09), 0 0 0 1.5px rgba(0,0,0,0.07)"
                      : "0 1px 3px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.06)",
                  }}
                >
                  {/* Animated open background */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ background: p.bg, opacity: isOpen ? 1 : 0 }}
                  />
                  {/* White closed background */}
                  <div
                    className="absolute inset-0 bg-white transition-opacity duration-500"
                    style={{ opacity: isOpen ? 0 : 1 }}
                  />

                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
                    style={{ background: p.bar, opacity: isOpen ? 1 : 0, transform: isOpen ? "scaleY(1)" : "scaleY(0)" }}
                  />

                  {/* Header button */}
                  <button
                    className="relative z-10 w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Step number */}
                      <span
                        className="poppins-bold text-[11px] tracking-[0.1em] tabular-nums flex-shrink-0 transition-colors duration-300 w-6 text-center"
                        style={{ color: isOpen ? p.eyebrow : "#94a3b8" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{
                          background: isOpen ? p.iconBg : "#f8fafc",
                          border: `1px solid ${isOpen ? "transparent" : "#e2e8f0"}`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5 transition-colors duration-300"
                          style={{ color: isOpen ? p.iconColor : "#64748b" }}
                          strokeWidth={1.75}
                        />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <p
                          className="poppins-semibold text-[11px] uppercase tracking-[0.12em] mb-0.5 transition-colors duration-300"
                          style={{ color: isOpen ? p.eyebrow : "#94a3b8" }}
                        >
                          {item.eyebrow}
                        </p>
                        <p className="poppins-bold text-base sm:text-lg text-slate-900 leading-snug">{item.headline}</p>
                      </div>
                    </div>

                    {/* Right: pill + chevron */}
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span
                        className="hidden sm:inline-flex poppins-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg transition-all duration-300"
                        style={{
                          background: isOpen ? p.pill : "#f1f5f9",
                          color: isOpen ? p.pillText : "#94a3b8",
                        }}
                      >
                        {item.bullets.length} checks
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                        style={{ background: isOpen ? p.iconBg : "#f1f5f9" }}
                      >
                        <ChevronDown
                          className="w-4 h-4 transition-all duration-400"
                          style={{
                            color: isOpen ? p.iconColor : "#94a3b8",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expandable body */}
                  <div
                    className="relative z-10 overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: isOpen ? "640px" : "0px" }}
                  >
                    <div className="px-6 pb-7">
                      {/* Divider */}
                      <div
                        className="h-px mb-5 transition-all duration-700"
                        style={{
                          background: `linear-gradient(to right, ${p.divider}, transparent)`,
                          opacity: isOpen ? 1 : 0,
                        }}
                      />

                      <div className="grid sm:grid-cols-[1fr_auto] gap-6">
                        {/* Left: description + bullets */}
                        <div>
                          <p
                            className="poppins-regular text-sm text-slate-600 leading-relaxed mb-5 transition-all duration-500"
                            style={{
                              opacity: isOpen ? 1 : 0,
                              transform: isOpen ? "none" : "translateY(8px)",
                              transitionDelay: isOpen ? "80ms" : "0ms",
                            }}
                          >
                            {item.sub}
                          </p>

                          <div className="space-y-2.5">
                            {item.bullets.map((b, j) => (
                              <div
                                key={b}
                                className="flex items-start gap-3"
                                style={{
                                  opacity: isOpen ? 1 : 0,
                                  transform: isOpen ? "none" : "translateX(-10px)",
                                  transition: "opacity 0.35s ease, transform 0.35s ease",
                                  transitionDelay: isOpen ? `${160 + j * 55}ms` : "0ms",
                                }}
                              >
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: p.checkBg }}
                                >
                                  <CheckCircle className="w-3.5 h-3.5" style={{ color: p.checkColor }} />
                                </div>
                                <span className="poppins-regular text-sm text-slate-700 leading-snug">{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: CTA block */}
                        <div
                          className="w-full sm:w-52 flex flex-col gap-2.5 sm:justify-end"
                          style={{
                            opacity: isOpen ? 1 : 0,
                            transform: isOpen ? "none" : "translateY(14px)",
                            transition: "all 0.45s ease",
                            transitionDelay: isOpen ? "320ms" : "0ms",
                          }}
                        >
                          {item.cta && item.ctaHref && (
                            <Link
                              href={item.ctaHref}
                              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:brightness-110"
                              style={{ background: p.ctaBg }}
                            >
                              {item.cta}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                          <button
                            onClick={() => openBooking("snapshot")}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-95 hover:brightness-110"
                            style={
                              item.cta
                                ? { background: "white", border: `1px solid ${p.divider}`, color: p.eyebrow }
                                : { background: p.ctaBg, color: "white" }
                            }
                          >
                            {item.secondaryCta}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── LEGISLATION GRID ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white overflow-hidden">
        <div ref={legRef.ref} className="max-w-6xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: legRef.visible ? 1 : 0, transform: legRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The legal framework</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              We Audit Against Six Areas Of UK Law.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {legislation.map((leg, i) => {
              const Icon = leg.icon
              return (
                <div
                  key={leg.code}
                  className="group relative bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-default"
                  style={{
                    opacity: legRef.visible ? 1 : 0,
                    transform: legRef.visible ? "none" : "translateY(28px) scale(0.97)",
                    transitionDelay: `${i * 80}ms`,
                    transitionDuration: "650ms",
                    transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                    height: "240px",
                  }}
                >
                  {/* Animated glow blob — grows on hover */}
                  <div
                    className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"
                    style={{ background: `radial-gradient(circle, ${leg.glow}, transparent 70%)` }}
                  />

                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${leg.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Shimmer sweep on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmerSweep 1.4s ease forwards" }}
                  />

                  {/* Card border glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ boxShadow: `0 0 0 1px rgba(16,185,129,0.25), 0 12px 40px ${leg.glow}` }}
                  />

                  <div className="relative z-10 p-6 flex flex-col h-full">
                    {/* Icon + code row */}
                    <div className="flex items-center justify-between mb-5">
                      {/* Gradient icon circle */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${leg.accent} flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-400`}>
                        <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                      </div>

                      {/* Code badge */}
                      <span className="poppins-bold text-[10px] text-slate-400 tracking-[0.18em] uppercase bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg group-hover:border-emerald-100 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-all duration-400">
                        {leg.code}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="poppins-bold text-base text-slate-900 mb-2.5 group-hover:text-emerald-800 transition-colors duration-300 leading-snug">
                      {leg.name}
                    </h3>

                    {/* Desc — fades up slightly on hover */}
                    <p className="poppins-regular text-sm text-slate-500 leading-relaxed flex-1 group-hover:text-slate-600 transition-colors duration-300">
                      {leg.desc}
                    </p>

                    {/* Bottom reveal line */}
                    <div className={`mt-4 h-px bg-gradient-to-r ${leg.accent} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AUDIT PROCESS ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div ref={processRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: processRef.visible ? 1 : 0, transform: processRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The audit process</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Five Steps. Clear From Start.
            </h2>
          </div>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-emerald-200 via-emerald-400 to-emerald-200 hidden sm:block" style={{ left: "calc(50% - 0.5px)" }} />

            <div className="space-y-5">
              {auditSteps.map((step, i) => {
                const Icon = step.icon
                const isLeft = i % 2 === 0
                const isActive = activeStep === i
                return (
                  <div
                    key={step.num}
                    className={`relative flex items-center gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                    style={{
                      opacity: processRef.visible ? 1 : 0,
                      transform: processRef.visible ? "none" : `translateX(${isLeft ? -20 : 20}px)`,
                      transitionDelay: `${i * 100}ms`,
                      transitionDuration: "600ms",
                    }}
                    onMouseEnter={() => setActiveStep(i)}
                  >
                    <div className={`flex-1 ${isLeft ? "sm:pr-10" : "sm:pl-10"}`}>
                      <div
                        className={`group w-full max-w-md ${isLeft ? "sm:ml-auto" : ""} bg-white rounded-2xl border p-5 transition-all duration-300 cursor-default ${
                          isActive ? "border-emerald-300 shadow-[0_4px_24px_rgba(16,185,129,0.12)]" : "border-slate-100 shadow-sm hover:border-emerald-200"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isActive ? "bg-emerald-700" : "bg-emerald-50"}`}>
                            <Icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-white" : "text-emerald-600"}`} />
                          </div>
                          <span className="poppins-bold text-slate-900 text-sm">{step.title}</span>
                        </div>
                        <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{step.body}</p>
                      </div>
                    </div>

                    {/* Centre node */}
                    <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm ${isActive ? "border-emerald-600 bg-emerald-700 scale-110" : "border-emerald-200 bg-white"}`}>
                        <span className={`poppins-bold text-[11px] transition-colors duration-300 ${isActive ? "text-white" : "text-emerald-500"}`}>{step.num}</span>
                      </div>
                    </div>

                    <div className="hidden sm:block flex-1" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── REMOTE vs ON-SITE ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={deliveryRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-10 transition-all duration-700"
            style={{ opacity: deliveryRef.visible ? 1 : 0, transform: deliveryRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Delivery methods</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Two Ways To Audit. Same Standard.
            </h2>
          </div>

          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-100 rounded-xl p-1">
              {(["remote", "onsite"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDeliveryMode(mode)}
                  className={`px-7 py-2.5 rounded-lg poppins-semibold text-sm transition-all duration-300 ${
                    deliveryMode === mode
                      ? "bg-white text-emerald-700 shadow-sm border border-emerald-100"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {mode === "remote" ? "Remote" : "On-Site"}
                </button>
              ))}
            </div>
          </div>

          <div
            className="grid sm:grid-cols-2 gap-5 transition-all duration-500"
            style={{ opacity: deliveryRef.visible ? 1 : 0, transform: deliveryRef.visible ? "none" : "translateY(20px)" }}
          >
            {deliveryMode === "remote" ? (
              <>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
                    <Wifi className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="poppins-bold text-lg text-slate-900 mb-4">How it works</h3>
                  <div className="space-y-3">
                    {["You send records, policies, and contractor documents","We review everything against the relevant waste rules","Written RAG report delivered within 48 hours","No travel needed — nationwide coverage from day one"].map((t) => (
                      <div key={t} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="poppins-regular text-sm text-slate-600 leading-snug">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-700 rounded-2xl p-7 shadow-[0_8px_32px_rgba(5,150,105,0.2)]">
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="poppins-bold text-lg text-white mb-4">Best suited for</h3>
                  <div className="space-y-3">
                    {["Multi-site portfolios needing fast coverage","Record and policy-led audit reviews","Pre-visit compliance or cost reviews","Businesses with good internal records already in place"].map((t) => (
                      <div key={t} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-200 flex-shrink-0 mt-0.5" />
                        <p className="poppins-regular text-sm text-white/80 leading-snug">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="poppins-bold text-lg text-slate-900 mb-4">How it works</h3>
                  <div className="space-y-3">
                    {["Auditor attends site and inspects all waste storage areas","Bin setup, labelling, and separation verified physically","Staff are interviewed on waste handling procedures","Photographic evidence captured and included in report"].map((t) => (
                      <div key={t} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="poppins-regular text-sm text-slate-600 leading-snug">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-700 rounded-2xl p-7 shadow-[0_8px_32px_rgba(5,150,105,0.2)]">
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="poppins-bold text-lg text-white mb-4">Best suited for</h3>
                  <div className="space-y-3">
                    {["Care homes, clinical environments and regulated premises","Sites with complex or high-risk waste streams","Pre-CQC, pre-EA or pre-Ofsted inspection preparation","Businesses where physical evidence is critical"].map((t) => (
                      <div key={t} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-200 flex-shrink-0 mt-0.5" />
                        <p className="poppins-regular text-sm text-white/80 leading-snug">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── THE REPORT ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div ref={reportRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: reportRef.visible ? 1 : 0, transform: reportRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">What you receive</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              A Signed Report. Within 48 Hours.
            </h2>
          </div>

          <div
            className="grid lg:grid-cols-2 gap-8 items-start transition-all duration-700 delay-100"
            style={{ opacity: reportRef.visible ? 1 : 0, transform: reportRef.visible ? "none" : "translateY(24px)" }}
          >
            {/* Report mockup */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="bg-emerald-700 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="poppins-bold text-white text-sm">Waste Compliance Audit Report</p>
                  <p className="poppins-regular text-emerald-200 text-xs mt-0.5">Issued within 48 hours · Signed PDF</p>
                </div>
                <span className="px-2.5 py-1 bg-white/15 rounded-lg text-white poppins-semibold text-[10px] uppercase tracking-wider">Confidential</span>
              </div>

              <div className="p-5">
                <p className="poppins-semibold text-slate-400 text-xs uppercase tracking-widest mb-3">RAG Status Summary</p>
                <div className="space-y-3">
                  {[
                    { label: "Waste Transfer Notes", status: "green", pct: 100 },
                    { label: "Carrier Registration",  status: "green", pct: 100 },
                    { label: "Clinical Waste Records", status: "amber", pct: 60 },
                    { label: "Bin Labelling",          status: "red",   pct: 25 },
                    { label: "Segregation Setup",      status: "amber", pct: 70 },
                    { label: "Consignment Notes",      status: "green", pct: 90 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-600 text-xs poppins-regular">{row.label}</span>
                        <span className={`text-[10px] poppins-bold uppercase tracking-wider ${row.status === "green" ? "text-emerald-600" : row.status === "amber" ? "text-amber-500" : "text-red-500"}`}>
                          {row.status === "green" ? "Compliant" : row.status === "amber" ? "Action Required" : "Urgent"}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-1000 ${row.status === "green" ? "bg-emerald-500" : row.status === "amber" ? "bg-amber-400" : "bg-red-500"}`}
                          style={{ width: reportRef.visible ? `${row.pct}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  <span className="poppins-regular text-slate-400 text-xs">Independent · Signed · Inspection-ready</span>
                </div>
              </div>
            </div>

            {/* What's inside */}
            <div className="space-y-3">
              {[
                { icon: FileCheck,    title: "RAG-Rated Findings",         desc: "Every item is Red (urgent), Amber (action required), or Green (compliant). No ambiguity about priority." },
                { icon: Search,      title: "Root Cause, Not Symptoms",    desc: "We identify why a gap exists — expired licence, missing form, wrong container — so the fix is obvious." },
                { icon: ClipboardCheck, title: "Specific Recommendations", desc: "Each finding includes a named action, a suggested timeline, and the legislation it relates to." },
                { icon: Shield,      title: "Regulator-Ready Format",      desc: "Accepted by CQC, Ofsted, the Environment Agency and councils as evidence of due diligence." },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="group flex gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-[0_4px_20px_rgba(16,185,129,0.08)] transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="poppins-semibold text-slate-900 text-sm mb-1">{item.title}</p>
                      <p className="poppins-regular text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO USES OUR REPORTS ───────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={whoRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: whoRef.visible ? 1 : 0, transform: whoRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">How clients use the report</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">One Report. Six Use Cases.</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
            {usedBy.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:shadow-[0_4px_24px_rgba(16,185,129,0.08)] transition-all duration-300 text-center"
                  style={{
                    opacity: whoRef.visible ? 1 : 0,
                    transform: whoRef.visible ? "none" : "translateY(16px)",
                    transitionDelay: `${i * 60}ms`,
                    transitionDuration: "500ms",
                  }}
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 group-hover:bg-emerald-700 flex items-center justify-center transition-all duration-300">
                    <Icon className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <p className="poppins-semibold text-sm text-slate-700">{item.label}</p>
                </div>
              )
            })}
          </div>

          <div
            className="p-7 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-all duration-700 delay-400"
            style={{ opacity: whoRef.visible ? 1 : 0, transform: whoRef.visible ? "none" : "translateY(12px)" }}
          >
            <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-3" />
            <p className="poppins-bold text-slate-900 text-base mb-2">Independent advice. Always.</p>
            <p className="poppins-regular text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
              We do not sell bins, collections, or waste contracts. Our only service is independent audit advice. You use our report to reduce costs, review contractors, tighten records, and run your business on your own terms.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW WE CAN HELP — PRICING ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div ref={pricingRef.ref} className="max-w-5xl mx-auto">

          {/* Section heading */}
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: pricingRef.visible ? 1 : 0, transform: pricingRef.visible ? "none" : "translateY(24px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Pricing</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 mb-3">How We Work</h2>
            <p className="poppins-regular text-slate-500 text-base max-w-xl mx-auto">
              Three fixed-price options. Zero long-term contracts. No hidden fees. Choose the level of support you need right now.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-5 items-stretch">

            {/* FREE — Discovery Call */}
            <div
              className="relative rounded-2xl border border-slate-200 bg-white p-7 flex flex-col transition-all duration-700 hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] hover:-translate-y-0.5"
              style={{
                opacity: pricingRef.visible ? 1 : 0,
                transform: pricingRef.visible ? "translateY(0)" : "translateY(32px)",
                transitionDelay: "0ms",
              }}
            >
              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 poppins-semibold text-xs uppercase tracking-wider mb-4">Free</span>
                <p className="poppins-bold text-4xl text-slate-900 leading-none mb-1">£0</p>
                <p className="poppins-semibold text-slate-700 text-base mt-2">Discovery Call</p>
                <p className="poppins-regular text-slate-400 text-xs mt-1">15 minutes · No obligation</p>
              </div>

              <div className="flex-1 space-y-3 mb-7">
                {[
                  "15-minute call to understand your setup",
                  "We explain your next steps",
                  "No obligation",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                    </div>
                    <span className="poppins-regular text-sm text-slate-600 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openBooking("snapshot")}
                className="w-full py-3 rounded-xl border border-emerald-300 text-emerald-700 poppins-semibold text-sm hover:bg-emerald-50 transition-all duration-200 active:scale-[0.98]"
              >
                Book Free Call
              </button>
            </div>

            {/* £195 — Compliance Snapshot (FEATURED) */}
            <div
              className="relative rounded-2xl bg-emerald-700 p-7 flex flex-col shadow-[0_16px_48px_rgba(6,95,70,0.28)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(6,95,70,0.35)]"
              style={{
                opacity: pricingRef.visible ? 1 : 0,
                transform: pricingRef.visible ? "translateY(-8px)" : "translateY(24px)",
                transitionDelay: "120ms",
              }}
            >
              {/* Popular badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-400 text-amber-900 poppins-bold text-xs shadow-md whitespace-nowrap">
                  <Zap className="w-3 h-3" />
                  Most popular
                </span>
              </div>

              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-100 poppins-semibold text-xs uppercase tracking-wider mb-4">Paid</span>
                <p className="poppins-bold text-4xl text-white leading-none mb-1">£195</p>
                <p className="poppins-semibold text-emerald-100 text-base mt-2">Compliance Snapshot</p>
                <p className="poppins-regular text-emerald-300 text-xs mt-1">Remote · Report in 48 hours</p>
              </div>

              <div className="flex-1 space-y-3 mb-7">
                {[
                  "Quick remote review of your setup",
                  "We find 3–5 key risks",
                  "Simple report in 48 hours",
                  "Clear actions to fix issues",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-white/10 border border-emerald-300/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-300" />
                    </div>
                    <span className="poppins-regular text-sm text-emerald-50 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openBooking("snapshot")}
                className="w-full py-3 rounded-xl bg-white text-emerald-700 poppins-bold text-sm hover:bg-emerald-50 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-900/20"
              >
                Book Snapshot
              </button>
            </div>

            {/* £495 — Compliance Setup Pack */}
            <div
              className="relative rounded-2xl border border-slate-200 bg-white p-7 flex flex-col transition-all duration-700 hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] hover:-translate-y-0.5"
              style={{
                opacity: pricingRef.visible ? 1 : 0,
                transform: pricingRef.visible ? "translateY(0)" : "translateY(32px)",
                transitionDelay: "240ms",
              }}
            >
              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-500 poppins-semibold text-xs uppercase tracking-wider mb-4">Full service</span>
                <p className="poppins-bold text-4xl text-slate-900 leading-none mb-1">£495</p>
                <p className="poppins-semibold text-slate-700 text-base mt-2">Compliance Setup Pack</p>
                <p className="poppins-regular text-slate-400 text-xs mt-1">Remote · Everything in Snapshot</p>
              </div>

              <div className="flex-1 space-y-3 mb-7">
                {[
                  "Everything in the Snapshot",
                  "We create your key documents",
                  "Simple templates for your team",
                  "One call to guide you",
                  "One follow-up check",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                    </div>
                    <span className="poppins-regular text-sm text-slate-600 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openBooking("snapshot")}
                className="w-full py-3 rounded-xl border border-emerald-300 text-emerald-700 poppins-semibold text-sm hover:bg-emerald-50 transition-all duration-200 active:scale-[0.98]"
              >
                See Full Setup
              </button>
            </div>

          </div>

          {/* Reassurance line */}
          <div
            className="mt-10 text-center transition-all duration-700 delay-300"
            style={{ opacity: pricingRef.visible ? 1 : 0, transform: pricingRef.visible ? "none" : "translateY(12px)" }}
          >
            <p className="poppins-regular text-slate-400 text-sm">
              All prices are fixed fee. No hidden costs. We confirm your quote before starting.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEMPLATES CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-gradient-to-b from-amber-50/60 to-white">
        <div ref={tplRef.ref} className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl border border-amber-200 bg-white p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm transition-all duration-700"
            style={{ opacity: tplRef.visible ? 1 : 0, transform: tplRef.visible ? "none" : "translateY(16px)" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-amber-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="poppins-semibold text-xs text-amber-600 uppercase tracking-wider mb-1">Templates</p>
              <h3 className="poppins-bold text-xl text-slate-900 mb-1">Need paperwork to get started?</h3>
              <p className="poppins-regular text-sm text-slate-500">Download ready-made waste logs, action plans, and compliance checklists — instantly usable on any device.</p>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white poppins-bold text-sm rounded-xl transition-all duration-200 active:scale-95 flex-shrink-0 shadow-sm"
            >
              Browse Templates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/30 rounded-full blur-[80px]" />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-tight">
            Ready To Know Where You Actually Stand?
          </h2>
          <p className="poppins-regular text-emerald-100 text-lg mb-9 max-w-xl mx-auto">
            Book an audit or run a free check. We&apos;ll show you what is working, what is not, and what to do next.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openBooking("snapshot")}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 poppins-bold text-sm rounded-xl transition-all duration-300 shadow-lg active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Book an Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              Free Cost Check
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmerSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      ` }} />
      </div>
  )
}
