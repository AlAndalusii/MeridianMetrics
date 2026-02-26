"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Home,
  Package,
  Clock,
  AlertTriangle,
  ChevronDown,
  BadgeCheck,
  FileText,
  Shield,
  Mail,
  User,
  MessageSquare,
  Calendar,
  Star,
  Trash2,
  Recycle,
  XCircle,
  Zap,
  Building2,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

// ─── Deadline counter ────────────────────────────────────────────────────────
const DEADLINE = new Date("2026-03-31T23:59:59")

function useDeadlineCounter() {
  const [days, setDays] = useState(0)

  useEffect(() => {
    const update = () => {
      const diff = DEADLINE.getTime() - Date.now()
      setDays(Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))))
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [])

  return days
}

// ─── Service tiers ───────────────────────────────────────────────────────────
const tiers = [
  {
    id: "waste",
    icon: Home,
    label: "Tier 1",
    badge: "Waste & Property",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Waste Compliance Audit",
    subtitle: "HMO landlords, letting agents & business property managers",
    tagline: "Simpler Recycling · March 2026 · EA Enforcement",
    description:
      "Whether you manage HMO properties or run a business premises, new Simpler Recycling rules create direct legal liability. Landlords face £5,000 fines and HMO licence risk. Businesses face £118/hour EA investigation charges. We audit your setup, verify your contractors, and give you the written documentation councils and inspectors need to see — scoped to your property type.",
    pricing: [
      { label: "Single HMO property", price: "£295" },
      { label: "3–5 HMO properties", price: "£495" },
      { label: "Business site (single)", price: "£295" },
      { label: "Multi-site (3+ locations)", price: "£795" },
    ],
    timeline: "3–7 days",
    deliveryNote: "Remote assessment available",
    included: [
      "Property & occupancy type assessment",
      "4-stream separation verification",
      "Bins-per-occupant ratio check",
      "EA carrier registration verification",
      "Waste Transfer Note audit",
      "Cross-contamination risk analysis",
      "Tenant / staff instruction templates",
      "Written compliance report",
      "Priority-ranked action list",
      "Council inspection documentation",
    ],
    cta: "Book Waste Audit",
    ctaHref: "/quiz",
    highlight: true,
  },
  {
    id: "packaging",
    icon: Package,
    label: "Tier 2",
    badge: "Packaging Compliance",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Packaging Compliance Service",
    subtitle: "Manufacturers, importers, retailers & brand owners",
    tagline: "EPR · PPT · HMRC · Packaging Regulations",
    description:
      "If your business uses, imports or manufactures packaging, you have legal obligations under Extended Producer Responsibility (EPR) and Plastic Packaging Tax (PPT). We do the admin for you — determining your liability, filing your registrations, and making sure every piece of documentation is in order so you are never caught out.",
    pricing: [
      { label: "Compliance review", price: "£395" },
      { label: "Full admin & registration service", price: "£795" },
    ],
    timeline: "7–14 days",
    deliveryNote: "Remote — document review + consultation call",
    included: [
      "EPR producer registration & annual reporting",
      "Plastic Packaging Tax liability assessment",
      "PPT registration with HMRC",
      "30% recycled content verification",
      "Packaging tonnage calculations",
      "Labelling compliance check (OPRL)",
      "Supplier certification review",
      "Ongoing documentation & record-keeping",
      "Annual return preparation",
    ],
    cta: "Get Packaging Compliance Help",
    ctaHref: "/quiz",
    highlight: false,
  },
]

// ─── Service card ─────────────────────────────────────────────────────────────
function TierCard({ tier }: { tier: (typeof tiers)[0] }) {
  const [open, setOpen] = useState(false)
  const Icon = tier.icon

  return (
    <div
      id={tier.id}
      className={`scroll-mt-28 rounded-2xl overflow-hidden transition-all duration-300 ${
        tier.highlight
          ? "border border-emerald-400/40 shadow-[0_4px_32px_rgba(6,95,70,0.18)] bg-emerald-950"
          : "border border-slate-200/80 shadow-[0_2px_16px_rgba(6,95,70,0.06)] bg-white hover:shadow-[0_6px_32px_rgba(6,95,70,0.10)] hover:border-emerald-200"
      }`}
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full ${tier.highlight ? "bg-gradient-to-r from-emerald-400 to-emerald-300" : "bg-gradient-to-r from-emerald-600/40 to-emerald-500/20"}`} />

      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
              tier.highlight ? "bg-emerald-400/20 border border-emerald-400/30" : "bg-emerald-700"
            }`}
          >
            <Icon className={`w-6 h-6 ${tier.highlight ? "text-emerald-300" : "text-white"}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`poppins-semibold text-[10px] uppercase tracking-widest ${tier.highlight ? "text-emerald-400/60" : "text-slate-400"}`}>
                {tier.label}
              </span>
              <span
                className={`text-[10px] poppins-semibold px-2 py-0.5 rounded-full border ${
                  tier.highlight
                    ? "bg-emerald-400/15 text-emerald-300 border-emerald-400/30"
                    : tier.badgeColor
                }`}
              >
                {tier.badge}
              </span>
              {tier.highlight && (
                <span className="text-[10px] poppins-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Most Urgent
                </span>
              )}
            </div>
            <h2 className={`poppins-bold text-xl leading-tight ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.title}</h2>
            <p className={`poppins-regular text-xs mt-0.5 ${tier.highlight ? "text-emerald-300/60" : "text-slate-400"}`}>{tier.subtitle}</p>
          </div>
        </div>

        {/* Regulation tag */}
        <div className={`flex items-center gap-1.5 mb-4 px-3 py-2 rounded-lg w-fit ${tier.highlight ? "bg-amber-500/10 border border-amber-400/20" : "bg-amber-50 border border-amber-100"}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <span className={`text-xs poppins-medium ${tier.highlight ? "text-amber-300" : "text-amber-700"}`}>{tier.tagline}</span>
        </div>

        <p className={`poppins-regular text-sm leading-relaxed mb-6 ${tier.highlight ? "text-emerald-100/70" : "text-slate-600"}`}>
          {tier.description}
        </p>

        {/* Pricing grid */}
        <div className="mb-2">
          <p className={`poppins-semibold text-[10px] uppercase tracking-widest mb-2 ${tier.highlight ? "text-emerald-400/60" : "text-slate-400"}`}>
            Pricing
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tier.pricing.map((p) => (
              <div
                key={p.label}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                  tier.highlight
                    ? "bg-emerald-900/50 border-emerald-700/40"
                    : "bg-slate-50 border-slate-100"
                }`}
              >
                <span className={`poppins-regular text-xs ${tier.highlight ? "text-emerald-300/70" : "text-slate-500"}`}>{p.label}</span>
                <span className={`poppins-bold text-sm ${tier.highlight ? "text-emerald-300" : "text-emerald-700"}`}>{p.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center gap-4 mt-4 mb-5 px-1">
          <div className={`flex items-center gap-1.5 text-xs poppins-regular ${tier.highlight ? "text-emerald-300/70" : "text-slate-500"}`}>
            <Clock className={`w-3.5 h-3.5 ${tier.highlight ? "text-emerald-400" : "text-emerald-500"}`} />
            <span>
              <span className={`poppins-semibold ${tier.highlight ? "text-emerald-200" : "text-slate-700"}`}>Timeline:</span> {tier.timeline}
            </span>
          </div>
          <span className={tier.highlight ? "text-emerald-700" : "text-slate-200"}>|</span>
          <span className={`text-xs poppins-regular ${tier.highlight ? "text-emerald-400/50" : "text-slate-400"}`}>{tier.deliveryNote}</span>
        </div>

        {/* What's included toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-1.5 text-sm poppins-semibold transition-colors mb-1 ${
            tier.highlight ? "text-emerald-300 hover:text-emerald-200" : "text-emerald-700 hover:text-emerald-800"
          }`}
          style={{ touchAction: "manipulation" }}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          What&rsquo;s included
        </button>

        {open && (
          <ul className="mt-3 space-y-2">
            {tier.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-emerald-400" : "text-emerald-500"}`} />
                <span className={`poppins-regular text-sm ${tier.highlight ? "text-emerald-100/80" : "text-slate-600"}`}>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Card footer */}
      <div className={`px-6 sm:px-8 py-4 border-t flex items-center justify-between gap-4 ${
        tier.highlight
          ? "bg-emerald-900/40 border-emerald-700/40"
          : "bg-slate-50 border-slate-100"
      }`}>
        <p className={`text-xs poppins-regular ${tier.highlight ? "text-emerald-400/50" : "text-slate-400"}`}>
          Scoped to your exact situation before we start.
        </p>
        <Link
          href={tier.ctaHref}
          className={`inline-flex items-center gap-1.5 poppins-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 whitespace-nowrap ${
            tier.highlight
              ? "bg-emerald-400 hover:bg-emerald-300 text-emerald-950"
              : "bg-emerald-700 hover:bg-emerald-800 text-white"
          }`}
        >
          {tier.cta} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

// ─── Inline contact form ──────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "HMO Waste Compliance Audit",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Compliance Enquiry — ${form.service}`)
    const body = encodeURIComponent(
      `Hi Millstone Compliance,\n\n` +
      `I'd like to enquire about: ${form.service}\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Message:\n${form.message}\n\n` +
      `Thank you.`
    )
    window.location.href = `mailto:hello@millstonecompliance.com?subject=${subject}&body=${body}`
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-none transition-all poppins-regular text-sm text-slate-800 bg-white placeholder:text-slate-400"
  const labelClass = "block poppins-medium text-sm text-slate-700 mb-1.5"

  return (
    <section id="contact" className="scroll-mt-28 px-4 sm:px-6 py-16 sm:py-20 bg-white border-t border-emerald-100/60">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: text */}
        <div>
          <p className="poppins-semibold text-xs text-emerald-600 uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 mb-4 tracking-tight leading-tight">
            Not Sure Which Service You Need?
          </h2>
          <p className="poppins-regular text-slate-500 text-base leading-relaxed mb-8">
            Tell us about your situation and we&rsquo;ll point you in the right direction — no sales pitch.
          </p>

          {/* Credentials */}
          <div className="space-y-3">
            {[
              "Cambridge-trained compliance specialist",
              "Ex-government systems background",
              "48-hour report turnaround — or your next audit is free",
              "Based in Birmingham — weekend audits available",
              "Independent advisor — we never sell bins or waste services",
            ].map((c) => (
              <div key={c} className="flex items-start gap-2.5">
                <BadgeCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="poppins-regular text-sm text-slate-600">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="ct-name" className={labelClass}>
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-500" /> Your Name
                </span>
              </label>
              <input
                id="ct-name"
                type="text"
                required
                placeholder="John Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="ct-email" className={labelClass}>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" /> Email Address
                </span>
              </label>
              <input
                id="ct-email"
                type="email"
                required
                placeholder="john@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="ct-service" className={labelClass}>
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-500" /> Service Interested In
                </span>
              </label>
              <select
                id="ct-service"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className={inputClass}
              >
                <option>HMO Waste Compliance Audit</option>
                <option>Business Waste Compliance Audit</option>
                <option>Packaging Compliance Service</option>
                <option>Not sure — help me decide</option>
              </select>
            </div>

            <div>
              <label htmlFor="ct-message" className={labelClass}>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> Your Message
                </span>
              </label>
              <textarea
                id="ct-message"
                required
                rows={4}
                placeholder="Tell us about your properties or business and what you need help with..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              Send Enquiry
            </button>

            <p className="text-[11px] text-center text-slate-400 poppins-regular">
              Opens your email client with your message pre-filled. We reply within 24 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

// ─── Simpler Recycling section ────────────────────────────────────────────────
function SimplerRecyclingSection() {
  const [scanStep, setScanStep] = useState<number>(0)

  useEffect(() => {
    const id = setInterval(() => setScanStep((s) => (s + 1) % 5), 1800)
    return () => clearInterval(id)
  }, [])

  const binStatus = (threshold: number) => {
    if (scanStep === 0) return "idle"
    if (scanStep >= threshold + 1) return "ok"
    if (scanStep === threshold) return "gap"
    return "pending"
  }

  const bins = [
    { name: "Dry Recyclables", detail: "Paper, plastic, glass, metal", icon: Recycle, threshold: 1 },
    { name: "Food Waste", detail: "Separate caddy required", icon: Trash2, threshold: 2 },
    { name: "General Waste", detail: "Non-recyclable residual", icon: Trash2, threshold: 3 },
  ]

  const scoreMap = [0, 33, 67, 100, 100]
  const score = scoreMap[scanStep] ?? 100

  return (
    <section id="simpler-recycling" className="scroll-mt-28">
      {/* Alert banner */}
      <div className="bg-red-600 text-white px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center">
          <div className="flex items-center gap-2">
            <span className="poppins-bold text-sm">31 MAR</span>
            <span className="bg-white/20 text-white text-[10px] poppins-semibold px-2 py-0.5 rounded-full">DEADLINE PASSED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="poppins-bold text-2xl">3</span>
            <span className="poppins-regular text-xs text-red-100 leading-tight">WASTE STREAMS<br/>REQUIRED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="poppins-bold text-2xl">£118</span>
            <span className="poppins-regular text-xs text-red-100 leading-tight">PER HOUR<br/>EA FINE</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white px-4 sm:px-6 pt-12 sm:pt-16 pb-0">
        <div className="max-w-5xl mx-auto">
          {/* Top: headline + mockup */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full mb-5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span className="text-xs poppins-semibold text-red-700">Enforcement Active — EA Inspections Started</span>
              </div>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
                Simpler Recycling —{" "}
                <span className="text-red-600">Are You Breaking the Law?</span>
              </h2>
              <p className="poppins-regular text-slate-500 text-base leading-relaxed mb-6">
                The deadline was 31 March 2026. All UK businesses with 10+ employees and all HMO landlords must now separate waste into 3 streams. Environment Agency inspections have started — and your tenants&rsquo; bin habits are your legal responsibility.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Link href="/quiz" className="inline-flex items-center gap-2 poppins-semibold text-sm bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 shadow-sm">
                  Try the Gap Analyser <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#waste" className="inline-flex items-center gap-2 poppins-semibold text-sm bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-700 px-5 py-3 rounded-xl transition-all duration-200 active:scale-95">
                  Book a Site Check
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 poppins-regular">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 2 minutes</span>
                <span>·</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Free assessment</span>
                <span>·</span>
                <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Deadline passed</span>
              </div>
            </div>

            {/* Right: animated compliance mockup */}
            <div className="relative">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                {/* Top bar */}
                <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${scanStep === 0 ? "bg-slate-500" : "bg-red-500 animate-pulse"}`} />
                    <span className="text-xs poppins-semibold text-white">
                      {scanStep === 0 ? "Ready to Scan" : "Compliance Scan Running"}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 poppins-regular">23 Mill Road — HMO</span>
                </div>

                <div className="p-4 space-y-2">
                  {bins.map((bin) => {
                    const status = binStatus(bin.threshold)
                    return (
                      <div
                        key={bin.name}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 border transition-all duration-700 ${
                          status === "ok"
                            ? "bg-emerald-950/60 border-emerald-800/40"
                            : status === "gap"
                            ? "bg-amber-950/40 border-amber-700/40"
                            : "bg-slate-800 border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-700 ${
                            status === "ok" ? "bg-emerald-800/50" : status === "gap" ? "bg-amber-800/40" : "bg-slate-700"
                          }`}>
                            <bin.icon className={`w-4 h-4 transition-colors duration-700 ${
                              status === "ok" ? "text-emerald-400" : status === "gap" ? "text-amber-400" : "text-slate-500"
                            }`} />
                          </div>
                          <div>
                            <p className={`text-xs poppins-semibold transition-colors duration-700 ${
                              status === "ok" ? "text-emerald-100" : status === "gap" ? "text-amber-100" : "text-slate-400"
                            }`}>{bin.name}</p>
                            <p className={`text-[10px] poppins-regular transition-colors duration-700 ${
                              status === "ok" ? "text-emerald-400/70" : status === "gap" ? "text-amber-400/70" : "text-slate-600"
                            }`}>{bin.detail}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-700 ${
                          status === "ok" ? "bg-emerald-700/40" : status === "gap" ? "bg-amber-700/40 animate-pulse" : "bg-slate-700"
                        }`}>
                          {status === "ok" ? (
                            <><CheckCircle className="w-3 h-3 text-emerald-400" /><span className="text-[10px] text-emerald-300 poppins-semibold">OK</span></>
                          ) : status === "gap" ? (
                            <><AlertTriangle className="w-3 h-3 text-amber-400" /><span className="text-[10px] text-amber-300 poppins-semibold">GAP</span></>
                          ) : status === "idle" ? (
                            <span className="text-[10px] text-slate-500 poppins-regular">—</span>
                          ) : (
                            <span className="text-[10px] text-slate-500 poppins-regular animate-pulse">...</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Score bar */}
                <div className="px-4 pb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-slate-400 poppins-regular">Compliance Score</span>
                    <span className={`text-xs poppins-bold transition-colors duration-700 ${score === 100 ? "text-emerald-400" : score > 0 ? "text-amber-400" : "text-slate-500"}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${score === 100 ? "bg-gradient-to-r from-emerald-500 to-emerald-400" : "bg-gradient-to-r from-amber-500 to-amber-400"}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <p className={`text-[10px] poppins-regular mt-2 transition-colors duration-700 ${score === 100 ? "text-emerald-400/70" : score > 0 ? "text-amber-400/70" : "text-slate-500"}`}>
                    {score === 0 ? "Click to start assessment" : score === 100 ? "✓ All 3 streams compliant — inspection ready" : `⚠ ${3 - Math.round(score / 34)} issue${3 - Math.round(score / 34) !== 1 ? "s" : ""} found — action required`}
                  </p>
                </div>
              </div>

              {/* Floating label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm text-[11px] poppins-semibold text-slate-600">
                Live compliance scan simulation
              </div>
            </div>
          </div>

          {/* Bottom: 3 service feature cards */}
          <div className="grid sm:grid-cols-3 gap-4 pt-8 pb-14">
            {[
              {
                icon: CheckCircle,
                title: "Check Your Setup",
                tag: "Zero Fines",
                tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                desc: "We visit your property, count your bins, verify your waste contractor, and tell you exactly whether you are compliant — in writing.",
                timeline: "Ready in 3 days",
              },
              {
                icon: Zap,
                title: "14-Day Fix — 3-Bin System",
                tag: "Ready in 7 Days",
                tagColor: "bg-blue-50 text-blue-700 border-blue-200",
                desc: "Dry recyclables, food waste, and general waste. We scope the correct bins for your property, provide signage templates, and draft tenant instructions.",
                timeline: "Fast turnaround",
              },
              {
                icon: Shield,
                title: "Inspection Ready",
                tag: "Zero Fines",
                tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                desc: "EA officers can visit any time. We make sure you have labelled bins, contractor records, and written proof of compliance you can hand over on the day.",
                timeline: "Ongoing cover",
              },
            ].map((card) => (
              <div key={card.title} className="bg-[#f8faf9] border border-slate-200 rounded-xl p-5 hover:border-emerald-200 hover:shadow-[0_4px_20px_rgba(6,95,70,0.08)] transition-all duration-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <card.icon className="w-4.5 h-4.5 text-emerald-700" />
                  </div>
                  <span className={`text-[10px] poppins-semibold px-2 py-0.5 rounded-full border ${card.tagColor}`}>{card.tag}</span>
                </div>
                <h3 className="poppins-bold text-sm text-slate-900 mb-2 leading-tight">{card.title}</h3>
                <p className="poppins-regular text-xs text-slate-500 leading-relaxed mb-3">{card.desc}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 poppins-regular">
                  <Clock className="w-3 h-3" /> {card.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const daysLeft = useDeadlineCounter()

  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-900">
      <Navigation />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-14 border-b border-emerald-100/60">
        {/* Subtle background tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.06)_0%,transparent_65%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Top breadcrumb */}
          <div className="flex items-center gap-2 text-slate-400 text-xs poppins-regular mb-6">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-700">Services</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: main headline */}
            <div>
              {/* Deadline pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs poppins-semibold mb-6">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                {daysLeft} days to the March 31 enforcement deadline
              </div>

              <h1 className="poppins-bold text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-slate-900 mb-5">
                HMO Landlords:{" "}
                <span className="text-emerald-700">Avoid £5,000 Fines</span>{" "}
                & Licence Revocation
              </h1>

              <p className="poppins-regular text-lg text-slate-500 max-w-xl leading-relaxed mb-8">
                New Simpler Recycling rules make you liable for your tenants&rsquo; waste mistakes.
                Cross-contamination = management failure = fine and licence at risk.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shadow-sm hover:shadow-md"
                >
                  Free HMO Compliance Checklist <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#waste"
                  className="inline-flex items-center gap-2 poppins-semibold text-sm bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95"
                >
                  Book £295 Audit
                </a>
              </div>

              {/* Trust signals row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                {[
                  { icon: AlertTriangle, text: `${daysLeft} days to deadline`, color: "text-amber-500" },
                  { icon: Home, text: "Multi-tenant property experts", color: "text-emerald-600" },
                  { icon: Calendar, text: "Weekend audits available", color: "text-emerald-600" },
                  { icon: FileText, text: "Reports for council inspections", color: "text-emerald-600" },
                  { icon: Shield, text: "Independent advisors", color: "text-emerald-600" },
                  { icon: Star, text: "Cambridge sustainability trained", color: "text-emerald-600" },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-start gap-2 min-h-[28px]">
                    <Icon className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${color}`} />
                    <span className="text-xs poppins-regular text-slate-500 leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: what you receive card */}
            <div className="hidden lg:block">
              <div className="relative bg-white border border-emerald-200 rounded-2xl p-6 shadow-[0_4px_32px_rgba(6,95,70,0.10)]">
                <div className="absolute -top-3.5 left-6">
                  <span className="poppins-semibold text-[10px] uppercase tracking-widest bg-emerald-700 text-white px-3 py-1.5 rounded-full shadow-sm">
                    Every Audit Includes
                  </span>
                </div>
                <ul className="mt-4 space-y-0 divide-y divide-slate-100">
                  {[
                    "PDF compliance report (15–20 pages)",
                    "Gap analysis with priority ranking",
                    "Step-by-step action checklist",
                    "Tenant instruction templates",
                    "Bin capacity calculator",
                    "Contractor recommendations",
                    "30-min debrief call included",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 py-3">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="poppins-regular text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 poppins-regular">
                    Reports delivered within 48 hours — or your next audit is free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Secondary nav strip (IBM-style) ────────────────────────────────── */}
      <nav className="sticky top-[64px] sm:top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide py-0">
            {[
              { href: "#waste", label: "Waste Audit" },
              { href: "#simpler-recycling", label: "Simpler Recycling" },
              { href: "#packaging", label: "Packaging" },
              { href: "#our-promise", label: "Our Promise" },
              { href: "#contact", label: "Contact Us" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="flex-shrink-0 poppins-medium text-sm text-slate-500 hover:text-emerald-700 border-b-2 border-transparent hover:border-emerald-600 py-3.5 transition-all duration-150 whitespace-nowrap"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Service tiers ───────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-14 sm:py-20 bg-[#f8faf9]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="poppins-semibold text-xs text-emerald-600 uppercase tracking-widest mb-2">
                Services & Pricing
              </p>
              <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
                Two Services. Fixed Prices. Fast Turnaround.
              </h2>
            </div>
            <p className="poppins-regular text-sm text-slate-500 sm:text-right sm:max-w-xs">
              Each service is scoped to your exact situation — no hidden extras.
            </p>
          </div>
          <div className="space-y-6">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Simpler Recycling ───────────────────────────────────────────────── */}
      <SimplerRecyclingSection />

      {/* ── Our Promise ─────────────────────────────────────────────────────── */}
      <section
        id="our-promise"
        className="scroll-mt-28 px-4 sm:px-6 py-14 sm:py-20 bg-emerald-950 text-white"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col justify-center mb-4 sm:mb-0">
              <p className="poppins-semibold text-xs text-emerald-400 uppercase tracking-widest mb-3">
                Our Promise
              </p>
              <h2 className="poppins-bold text-3xl text-white mb-3 tracking-tight">
                What You Can Expect From Us.
              </h2>
              <p className="poppins-regular text-emerald-100/60 text-sm leading-relaxed">
                We&rsquo;re independent advisors. We don&rsquo;t sell waste collection services —
                we have no financial incentive to recommend anything other than what&rsquo;s right for you.

              </p>
            </div>

            {[
              {
                icon: Clock,
                title: "Reports Within 48 Hours",
                desc: "Or your next audit is free. We don't hold you up.",
              },
              {
                icon: FileText,
                title: "Written Documentation",
                desc: "Every engagement produces a PDF report you can show councils, HMRC, or the EA.",
              },
              {
                icon: Shield,
                title: "No Upselling",
                desc: "Independent advisors only. We never receive commission from contractors.",
              },
              {
                icon: BadgeCheck,
                title: "Clear Action Plans",
                desc: "No jargon. Every report includes a numbered checklist you can action immediately.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-emerald-900/50 border border-emerald-700/40 rounded-xl p-5"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-700/60 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="poppins-semibold text-sm text-white mb-1">{title}</h3>
                <p className="poppins-regular text-xs text-emerald-100/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────────────────── */}
      <ContactSection />

      <Footer />
    </div>
  )
}
