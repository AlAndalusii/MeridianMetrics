"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Shield,
  Zap,
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
  FileCheck,
  Search,
  Lock,
  Home,
  Truck,
  BarChart3,
  Package,
  Sparkles,
  Sofa,
  Recycle,
  Scale,
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

/* ─── Animated radial gauge ───────────────────────────────────────────────── */
function RadialGauge({ target = 100, size = 92, stroke = 7 }: { target?: number; size?: number; stroke?: number }) {
  const { ref, visible } = useReveal(0.4)
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (visible ? target / 100 : 0) * circumference
  return (
    <div ref={ref} className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#d1fae5" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#059669"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="poppins-bold text-lg text-emerald-900"><Counter target={target} suffix="%" /></span>
      </div>
    </div>
  )
}

/* ─── Data ────────────────────────────────────────────────────────────────── */
const clearanceChecks = [
  "Furniture, bedding and rubbish removed",
  "Sofas and seating handled under POPs rules",
  "Good items sorted for charity, not landfill",
  "Transfer notes and photos for every job",
]

const contractChecks = [
  "Price checked against the market rate",
  "Carrier licence verified with the EA",
  "Contract terms and renewal dates reviewed",
  "Free, written findings — no obligation",
]

const consultingChecks = [
  "Duty of Care policies set up for you",
  "HMO recycling and bin setup reviewed",
  "Guidance before a council inspection",
  "Direct access — no call centre, ever",
]

const legislation = [
  { code: "EPA 1990",  name: "Duty of Care",          icon: Shield,        accent: "from-emerald-500 to-emerald-700", glow: "rgba(16,185,129,0.15)", desc: "Anyone who produces or clears waste must manage it responsibly. We verify transfer notes, carrier licences, and chain of custody." },
  { code: "EPA s33",   name: "Fly-Tipping",           icon: AlertTriangle, accent: "from-red-500 to-rose-700",       glow: "rgba(239,68,68,0.15)",  desc: "Illegally dumping waste is a criminal offence. Fines run to £1,000 on the spot, unlimited if it goes to court." },
  { code: "EA Guide",  name: "Sofas & POPs",          icon: Sofa,          accent: "from-amber-500 to-orange-600",   glow: "rgba(245,158,11,0.15)", desc: "Waste upholstered seating may contain harmful chemicals called POPs. It must be incinerated, not reused or resold." },
  { code: "SR 2026",   name: "HMO Recycling",         icon: Recycle,       accent: "from-teal-500 to-emerald-600",   glow: "rgba(20,184,166,0.15)", desc: "HMOs need separate bins for food, recycling and general waste — enforced through licensing conditions." },
  { code: "EA Reg",    name: "Carrier Registration",  icon: BadgeCheck,    accent: "from-teal-400 to-emerald-600",   glow: "rgba(20,184,166,0.15)", desc: "We cross-check every carrier and charity partner against the Environment Agency's public register before we use them." },
  { code: "HWTE Reg",  name: "Digital Waste Tracking", icon: Wifi,         accent: "from-blue-500 to-indigo-600",    glow: "rgba(59,130,246,0.15)", desc: "Mandatory from October 2026. Paper waste records are replaced by digital tracking across every waste stream." },
]

const auditSteps = [
  { num: "01", icon: Camera,      title: "Photos & Quote",     body: "Send us a few photos of what needs clearing. We come back with a fixed quote — usually within 48 hours." },
  { num: "02", icon: Search,      title: "Sort On Site",       body: "On arrival, we sort what's reusable from what's genuinely waste — sofas, furniture, bedding and everything else." },
  { num: "03", icon: Truck,       title: "Clear & Remove",     body: "The property is cleared, usually within days. Good items are set aside for charity collection." },
  { num: "04", icon: BadgeCheck,  title: "Licensed Disposal",  body: "Everything that isn't reused goes to a registered carrier — checked against the Environment Agency's public register." },
  { num: "05", icon: FileCheck,   title: "Proof — 48hr",       body: "Transfer notes, before-and-after photos and a reuse report — ready for your files, your licence, or a council inspection." },
]

const usedBy = [
  { icon: Home,       label: "Relet Readiness" },
  { icon: BadgeCheck, label: "Licence Renewal Evidence" },
  { icon: Shield,     label: "Duty of Care Proof" },
  { icon: Building2,  label: "Council Inspection Ready" },
  { icon: FileText,   label: "Insurance Records" },
  { icon: BarChart3,  label: "Portfolio Records" },
]

const sectors = [
  "Private Landlords", "HMOs", "Letting Agents", "Housing Associations",
  "Supported Housing", "Portfolio Landlords", "Managing Agents", "Student Housing",
]

/* ─── Sector accordion items ─────────────────────────────────────────────── */
const sectorAccordions = [
  {
    id: "landlords",
    icon: Home,
    eyebrow: "Private Landlords",
    headline: "Clear It. Sort It. Prove It.",
    sub: "Most private landlords clear a void property themselves or pay someone informal — and carry fly-tipping risk they don't know about.",
    bullets: [
      "Furniture, bedding and rubbish cleared from the property",
      "Sofas and upholstered seating handled under POPs rules",
      "Good items sorted for Birmingham charities, not landfill",
      "Transfer notes and photos for every job",
      "Free quote from a few photos — no obligation",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
    id: "hmos",
    icon: Users,
    eyebrow: "HMOs",
    headline: "Room-By-Room. Fully Documented.",
    sub: "HMOs face the strictest recycling and licensing conditions — multiple rooms, multiple tenants, and a council that can inspect at any time.",
    bullets: [
      "Every room cleared, sorted and documented separately",
      "Bins checked against HMO recycling requirements",
      "Carrier licences and charity partners verified",
      "Compliance records kept for your HMO licence file",
      "Free quote from a few photos — no obligation",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
    id: "agents",
    icon: Building2,
    eyebrow: "Letting Agents",
    headline: "One Call For Every Void You Manage.",
    sub: "Letting agents manage voids across a portfolio and need a partner who turns properties around fast, with paperwork for every landlord on the books.",
    bullets: [
      "One point of contact across every landlord you manage",
      "Fast turnaround between tenancies, so voids don't sit empty",
      "Before-and-after photos for every property",
      "Transfer notes and reuse reports landlords can keep on file",
      "Fixed quote agreed before we start",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
    id: "housing-associations",
    icon: Shield,
    eyebrow: "Housing Associations",
    headline: "Compliant Clearance At Scale.",
    sub: "Housing associations need consistent, auditable clearance across many properties — with records that hold up to scrutiny.",
    bullets: [
      "Consistent process across every property in your stock",
      "Full paperwork trail for internal audit and compliance",
      "Licensed carriers and registered charities used throughout",
      "Duty of Care records kept for the full two years",
      "Fixed quote agreed before we start",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
    id: "supported-housing",
    icon: Package,
    eyebrow: "Supported Housing",
    headline: "Sensitive Clearances, Handled Properly.",
    sub: "Supported and DSS housing often means faster turnarounds and more sensitive circumstances — cleared respectfully, and properly documented.",
    bullets: [
      "Cleared quickly and respectfully, on your timeline",
      "Sensitive items handled with discretion",
      "Good items still routed to local charities where possible",
      "Full paperwork for funders, councils or referral bodies",
      "Free quote from a few photos — no obligation",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
    id: "portfolio",
    icon: Truck,
    eyebrow: "Portfolio Landlords",
    headline: "Multiple Properties. One Standard.",
    sub: "Managing several properties means managing several risks — we bring one consistent process and one point of contact across your whole portfolio.",
    bullets: [
      "One consistent standard across every property you own",
      "Scheduled clearances to fit your relet calendar",
      "Licensed disposal and charity reuse for every job",
      "A paperwork trail you can produce for any property, any time",
      "Fixed quote agreed before we start",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
    eyebrow: "Every Property Type",
    headline: "Don't See Your Setup? We Still Cover It.",
    sub: "Clearance rules apply to every property that generates waste. If you manage a rented property, we can clear it and prove it was done properly.",
    bullets: [
      "Any rented property with furniture or rubbish to clear",
      "Sofas, seating and bulky items handled correctly",
      "Licensed carrier and charity partner network",
      "Transfer notes and reuse reports for every job",
      "Fixed-price quote agreed before we start",
    ],
    cta: null,
    ctaHref: null,
    secondaryCta: "Send Us a Few Photos",
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
  const twoSvcRef = useReveal(0.1)
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
            <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Clearance &amp; Waste Cost Reviews · Birmingham</span>
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
            Independent property clearance, waste contract reviews and compliance advice for landlords — cleared, checked, and kept compliant.
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
              Send Us a Few Photos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/waste-contract-audit"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              Free Waste Audit
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
            { val: 48,  suf: "hr", label: "Quote Turnaround" },
            { val: 5,   suf: "",   label: "Areas We Cover" },
            { val: 100, suf: "%",  label: "Licensed Disposal" },
            { val: 0,   suf: "",   label: "Items We Sell On" },
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

      {/* ── THREE SERVICES ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div ref={twoSvcRef.ref} className="max-w-6xl mx-auto relative z-10">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: twoSvcRef.visible ? 1 : 0, transform: twoSvcRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">What we do</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Three Services.{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                One Standard.
              </span>
            </h2>
            <p className="poppins-regular text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Whether it&apos;s a property to clear, a contract to check, or ongoing compliance advice — we bring the same independence and the same paperwork trail.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">

            {/* Service 01 — Property & House Clearance */}
            <div
              className="group relative bg-white rounded-2xl border border-slate-100 p-7 flex flex-col hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] hover:border-emerald-200 transition-all duration-500"
              style={{
                opacity: twoSvcRef.visible ? 1 : 0,
                transform: twoSvcRef.visible ? "none" : "translateY(24px)",
                transitionDelay: "0ms",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                  <Home className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="poppins-semibold text-[10px] text-emerald-500 uppercase tracking-widest">Service 01</span>
              </div>

              <h3 className="poppins-bold text-lg text-slate-900 mb-2">Property &amp; House Clearance</h3>
              <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                Furniture, bedding and rubbish cleared from void properties and HMOs — sorted for charity, disposed of through licensed carriers.
              </p>

              <div className="flex items-center gap-2.5 mb-5 px-3.5 py-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <p className="poppins-bold text-xl text-emerald-700 tabular-nums"><Counter target={48} suffix="hr" /></p>
                <p className="poppins-regular text-[11px] text-emerald-600 leading-snug">Fixed quote,<br />every job</p>
              </div>

              <div className="space-y-2 mb-7 flex-1">
                {clearanceChecks.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-600 poppins-regular leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openBooking("snapshot")}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Send Us a Few Photos
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Service 02 — Waste Cost & Contract Review */}
            <div
              className="group relative bg-white rounded-2xl border-2 border-emerald-200 p-7 flex flex-col shadow-[0_8px_40px_rgba(16,185,129,0.14)] hover:shadow-[0_12px_48px_rgba(16,185,129,0.2)] transition-all duration-500"
              style={{
                opacity: twoSvcRef.visible ? 1 : 0,
                transform: twoSvcRef.visible ? "none" : "translateY(24px)",
                transitionDelay: "120ms",
              }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-700 text-white poppins-bold text-[10px] uppercase tracking-wider shadow-md whitespace-nowrap">
                  Most Requested
                </span>
              </div>

              <div className="flex items-center gap-3 mb-5 mt-1">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                  <Scale className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="poppins-semibold text-[10px] text-emerald-500 uppercase tracking-widest">Service 02</span>
              </div>

              <h3 className="poppins-bold text-lg text-slate-900 mb-2">Waste Cost &amp; Contract Review</h3>
              <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                We check what you&apos;re paying for waste collection against the market, verify your carrier&apos;s licence, and flag terms working against you.
              </p>

              <div className="flex items-center gap-4 mb-5 px-3.5 py-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <RadialGauge target={100} size={60} stroke={6} />
                <div>
                  <p className="poppins-semibold text-xs text-emerald-900">Full Coverage Review</p>
                  <p className="poppins-regular text-[11px] text-emerald-600 mt-0.5">Every check, every time</p>
                </div>
              </div>

              <div className="space-y-2 mb-7 flex-1">
                {contractChecks.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-600 poppins-regular leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/waste-contract-audit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Free Waste Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Service 03 — Waste Compliance Consulting */}
            <div
              className="group relative bg-white rounded-2xl border border-slate-100 p-7 flex flex-col hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)] hover:border-emerald-200 transition-all duration-500"
              style={{
                opacity: twoSvcRef.visible ? 1 : 0,
                transform: twoSvcRef.visible ? "none" : "translateY(24px)",
                transitionDelay: "240ms",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-700 transition-colors duration-300">
                  <ClipboardCheck className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="poppins-semibold text-[10px] text-emerald-500 uppercase tracking-widest">Service 03</span>
              </div>

              <h3 className="poppins-bold text-lg text-slate-900 mb-2">Waste Compliance Consulting</h3>
              <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">
                Ongoing advice on Duty of Care, HMO recycling and council inspections — so you stay compliant without hiring anyone in-house.
              </p>

              <div className="flex items-center gap-2.5 mb-5 px-3.5 py-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <p className="poppins-bold text-xl text-emerald-700 tabular-nums">£0</p>
                <p className="poppins-regular text-[11px] text-emerald-600 leading-snug">15-min call,<br />no obligation</p>
              </div>

              <div className="space-y-2 mb-7 flex-1">
                {consultingChecks.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-slate-600 poppins-regular leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openBooking("discovery")}
                className="w-full inline-flex items-center justify-center gap-2 py-3 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300 poppins-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
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
              <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Your property type</span>
            </div>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              We Clear Properties And Prove It{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                For Every Type of Landlord.
              </span>
            </h2>
            <p className="poppins-regular text-slate-500 text-base mt-3 max-w-xl mx-auto leading-relaxed">
              Select your situation to see what we cover — and how we document every job.
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
              Six Areas of Law That Apply To Your Property.
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

      {/* ── CLEARANCE PROCESS ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div ref={processRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-14 transition-all duration-700"
            style={{ opacity: processRef.visible ? 1 : 0, transform: processRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">The clearance process</p>
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

      {/* ── VOID vs HMO/MULTI-ROOM ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={deliveryRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-10 transition-all duration-700"
            style={{ opacity: deliveryRef.visible ? 1 : 0, transform: deliveryRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Job types</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Two Kinds Of Job. Same Standard.
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
                  {mode === "remote" ? "Void Property" : "HMO / Multi-Room"}
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
                    <Camera className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="poppins-bold text-lg text-slate-900 mb-4">How it works</h3>
                  <div className="space-y-3">
                    {["Send photos of the property by WhatsApp or email","We quote back within 48 hours, fixed price","Clearance usually booked and done within days","Covering Birmingham and the West Midlands"].map((t) => (
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
                    {["Single lets between tenancies","Landlords needing a fast turnaround before relet","Agents managing multiple voids at once","Anyone unsure what counts as waste or what can be reused"].map((t) => (
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
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="poppins-bold text-lg text-slate-900 mb-4">How it works</h3>
                  <div className="space-y-3">
                    {["We attend and clear room by room, including shared areas","Furniture and bedding sorted per room, not just bagged up","Bins checked and set up against HMO recycling rules","Photographic evidence included for your licence file"].map((t) => (
                      <div key={t} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <p className="poppins-regular text-sm text-slate-600 leading-snug">{t}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-emerald-700 rounded-2xl p-7 shadow-[0_8px_32px_rgba(5,150,105,0.2)]">
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-5">
                    <ClipboardCheck className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="poppins-bold text-lg text-white mb-4">Best suited for</h3>
                  <div className="space-y-3">
                    {["HMO landlords managing licensing conditions","Housing associations and supported housing providers","Portfolio landlords clearing multiple units at once","Properties where compliance evidence is needed"].map((t) => (
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

      {/* ── THE PROOF ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div ref={reportRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: reportRef.visible ? 1 : 0, transform: reportRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">What you receive</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              A Signed Record. Within 48 Hours.
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
                  <p className="poppins-bold text-white text-sm">Property Clearance Confirmation</p>
                  <p className="poppins-regular text-emerald-200 text-xs mt-0.5">Issued on completion · Photo &amp; paperwork pack</p>
                </div>
                <span className="px-2.5 py-1 bg-white/15 rounded-lg text-white poppins-semibold text-[10px] uppercase tracking-wider">Confidential</span>
              </div>

              <div className="p-5">
                <p className="poppins-semibold text-slate-400 text-xs uppercase tracking-widest mb-3">Status Summary</p>
                <div className="space-y-3">
                  {[
                    { label: "Before Photos",         status: "green", pct: 100 },
                    { label: "After Photos",           status: "green", pct: 100 },
                    { label: "Transfer Note",          status: "green", pct: 100 },
                    { label: "Carrier Licence Check",  status: "green", pct: 95 },
                    { label: "Charity Reuse Report",   status: "amber", pct: 70 },
                    { label: "Council Compliance",     status: "green", pct: 90 },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-600 text-xs poppins-regular">{row.label}</span>
                        <span className={`text-[10px] poppins-bold uppercase tracking-wider ${row.status === "green" ? "text-emerald-600" : row.status === "amber" ? "text-amber-500" : "text-red-500"}`}>
                          {row.status === "green" ? "Complete" : row.status === "amber" ? "In Progress" : "Urgent"}
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
                { icon: Camera,     title: "Before & After Photos",         desc: "Every job is photographed on arrival and on completion — clear evidence of what was there and what was done." },
                { icon: FileCheck,  title: "Transfer Note & Carrier Licence", desc: "Proof your waste went to a registered carrier, checked against the Environment Agency's public register." },
                { icon: Recycle,    title: "Charity Reuse Report",          desc: "What went to charity instead of landfill, and which Birmingham charity received it." },
                { icon: Shield,     title: "Inspection-Ready Format",        desc: "Accepted by councils and housing licensing teams as evidence of proper Duty of Care." },
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

      {/* ── WHO USES OUR PAPERWORK ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div ref={whoRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: whoRef.visible ? 1 : 0, transform: whoRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">How landlords use it</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">One Pack. Six Things It Does.</h2>
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
              We do not keep, resell or profit from what we clear. Our only service is independent property clearance for landlords. You get your property back relet-ready, with paperwork that proves where everything went.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK — PRICING ─────────────────────────────────────────── */}
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
              Every job is quoted individually. No hidden fees. Start with a free quote — no obligation, 48 hours.
            </p>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-5 items-stretch">

            {/* FREE — Quote */}
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
                <p className="poppins-semibold text-slate-700 text-base mt-2">Free Quote</p>
                <p className="poppins-regular text-slate-400 text-xs mt-1">48hr turnaround · No obligation</p>
              </div>

              <div className="flex-1 space-y-3 mb-7">
                {[
                  "Send us a few photos of the property",
                  "We come back with a fixed price within 48 hours",
                  "No obligation — no charge for the quote",
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
                Send Us a Few Photos
              </button>
            </div>

            {/* Standard — Property Clearance (FEATURED) */}
            <div
              className="relative rounded-2xl bg-emerald-700 p-7 flex flex-col shadow-[0_16px_48px_rgba(6,95,70,0.28)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(6,95,70,0.35)]"
              style={{
                opacity: pricingRef.visible ? 1 : 0,
                transform: pricingRef.visible ? "translateY(-8px)" : "translateY(24px)",
                transitionDelay: "120ms",
              }}
            >
              {/* Recommended badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-400 text-amber-900 poppins-bold text-xs shadow-md whitespace-nowrap">
                  <Zap className="w-3 h-3" />
                  Recommended
                </span>
              </div>

              <div className="mb-5">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-emerald-100 poppins-semibold text-xs uppercase tracking-wider mb-4">Standard</span>
                <p className="poppins-bold text-4xl text-white leading-none mb-1">Quoted Per Job</p>
                <p className="poppins-semibold text-emerald-100 text-base mt-2">Property Clearance</p>
                <p className="poppins-regular text-emerald-300 text-xs mt-1">Furniture, bedding &amp; rubbish · Fully documented</p>
              </div>

              <div className="flex-1 space-y-3 mb-7">
                {[
                  "Full clearance of furniture, bedding and rubbish",
                  "Good items sorted for charity, the rest to a licensed carrier",
                  "Before-and-after photos and a transfer note included",
                  "Usually cleared within days of booking",
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
                Get a Clearance Quote
              </button>
            </div>

            {/* Full Service — HMO & Portfolio Clearance */}
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
                <p className="poppins-bold text-4xl text-slate-900 leading-none mb-1">Quoted Per Job</p>
                <p className="poppins-semibold text-slate-700 text-base mt-2">HMO &amp; Portfolio Clearance</p>
                <p className="poppins-regular text-slate-400 text-xs mt-1">Multi-room &amp; multi-property · One point of contact</p>
              </div>

              <div className="flex-1 space-y-3 mb-7">
                {[
                  "Room-by-room clearance for HMOs and shared housing",
                  "One point of contact across multiple properties",
                  "Full paperwork pack per property, ready for your files",
                  "Scheduled to fit your relet or licensing calendar",
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
                Talk To Us
              </button>
            </div>

          </div>

          {/* Reassurance line */}
          <div
            className="mt-10 text-center transition-all duration-700 delay-300"
            style={{ opacity: pricingRef.visible ? 1 : 0, transform: pricingRef.visible ? "none" : "translateY(12px)" }}
          >
            <p className="poppins-regular text-slate-400 text-sm">
              Every quote is fixed before we start. No hidden costs, no surprises on the day.
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
              <p className="poppins-regular text-sm text-slate-500">Download ready-made HMO compliance checklists, waste management plans and tenant instructions built for landlords.</p>
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
            Ready To Get Your Property Cleared?
          </h2>
          <p className="poppins-regular text-emerald-100 text-lg mb-9 max-w-xl mx-auto">
            Send us a few photos or ask us anything. We&apos;ll come back within 48 hours with a fixed price — no charge for the quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => openBooking("snapshot")}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 poppins-bold text-sm rounded-xl transition-all duration-300 shadow-lg active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Send Us a Few Photos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <Link
              href="/resources/hmo-waste-compliance-checklist"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 poppins-semibold text-sm rounded-xl transition-all duration-300"
            >
              Things Worth Checking
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
