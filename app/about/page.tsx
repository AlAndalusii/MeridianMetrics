"use client"

import React, { useState, useEffect } from "react"
import {
  CheckCircle,
  Phone,
  Mail,
  Receipt,
  Trash2,
  CalendarClock,
  AlertTriangle,
  FileText,
  Camera,
  Search,
  Truck,
  FileCheck,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const areas = [
  {
    icon: Receipt,
    title: "Your Bills",
    sub: "Every charge checked against your contract and what really gets collected.",
    dot: "bg-slate-400",
    iconBg: "bg-slate-50 text-slate-600",
    bg: "bg-slate-50/60",
    border: "border-slate-100",
  },
  {
    icon: Trash2,
    title: "Bin Sizes",
    sub: "Paying to empty big bins that go out half full? We spot it fast.",
    dot: "bg-amber-400",
    iconBg: "bg-amber-50 text-amber-600",
    bg: "bg-amber-50/60",
    border: "border-amber-100",
  },
  {
    icon: AlertTriangle,
    title: "Surprise Charges",
    sub: "Extra fees with no photo or proof. We ask for it before you pay.",
    dot: "bg-red-400",
    iconBg: "bg-red-50 text-red-600",
    bg: "bg-red-50/40",
    border: "border-red-100",
  },
  {
    icon: CalendarClock,
    title: "Auto-Renewals",
    sub: "We log your notice period so the deal never rolls over quietly.",
    dot: "bg-emerald-500",
    iconBg: "bg-emerald-50 text-emerald-600",
    bg: "bg-emerald-50/40",
    border: "border-emerald-100",
  },
  {
    icon: FileText,
    title: "The Paperwork",
    sub: "Waste transfer notes must be kept for two years. We check yours.",
    dot: "bg-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
    bg: "bg-blue-50/40",
    border: "border-blue-100",
  },
]

const heroSteps = [
  { icon: Camera,    title: "Sent",         sub: "You send us your bin bill" },
  { icon: Search,    title: "Checked",      sub: "Line by line, with your contract" },
  { icon: Truck,     title: "Switched",     sub: "To a better deal, if there is one" },
  { icon: FileCheck, title: "Watched",      sub: "Renewal date logged for you" },
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [heroStep, setHeroStep] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveItem((prev) => (prev + 1) % areas.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroStep((prev) => (prev + 1) % heroSteps.length)
    }, 1900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-x-hidden">
      <Navigation />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-32 sm:pt-36 pb-20 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_78%_18%,rgba(209,250,229,0.45)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

            {/* Left — refined editorial text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 border border-emerald-100 rounded-full mb-7 shadow-sm">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="poppins-medium text-[10px] text-emerald-700 tracking-[0.18em] uppercase">Birmingham &amp; West Midlands · Local</span>
              </div>

              <div className="flex items-start gap-4 sm:gap-5 mb-6">
                <div className="w-7 h-px bg-emerald-300 mt-3.5 sm:mt-4 flex-shrink-0 hidden sm:block" />
                <h1 className="poppins-semibold text-3xl sm:text-4xl md:text-[2.75rem] text-emerald-900 leading-[1.15] tracking-tight">
                  No call centre.
                  <span className="block text-emerald-600">No small print.</span>
                </h1>
              </div>

              <p className="poppins-regular text-base sm:text-lg text-emerald-700/75 max-w-md mb-9 leading-relaxed sm:pl-12">
                The person a Birmingham business calls when the waste bill looks wrong. Checked, fixed, and kept fixed.
              </p>

              <div className="flex flex-wrap items-center gap-5 sm:pl-12">
                <a
                  href="https://wa.me/447762270113"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-[13px] rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                >
                  <WhatsAppIcon />
                  WhatsApp Us
                </a>
                <a
                  href="tel:+447762270113"
                  className="group inline-flex items-center gap-2 poppins-semibold text-[13px] text-emerald-700 hover:text-emerald-800 transition-colors duration-200"
                >
                  <Phone className="w-3.5 h-3.5" />
                  07762 270 113
                  <span className="w-0 group-hover:w-4 h-px bg-emerald-600 transition-all duration-300" />
                </a>
              </div>
            </div>

            {/* Right — animated process card */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(209,250,229,0.4)_0%,transparent_70%)] pointer-events-none rounded-3xl" />

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-2xl p-7 sm:p-8 relative">
                <div className="flex items-center justify-between mb-7">
                  <div>
                    <p className="poppins-semibold text-[11px] text-emerald-900 uppercase tracking-[0.15em]">How We Work</p>
                    <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Every bill, same standard</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="poppins-semibold text-[10px] text-emerald-600">Live</span>
                  </div>
                </div>

                <div className="relative pl-1">
                  <div className="absolute left-[19px] top-1 bottom-1 w-px bg-emerald-100" />
                  <div className="space-y-5">
                    {heroSteps.map((step, i) => {
                      const Icon = step.icon
                      const isActive = heroStep === i
                      return (
                        <div key={step.title} className="relative flex items-start gap-4">
                          <div
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500 ${
                              isActive
                                ? "bg-emerald-700 border-emerald-700 scale-110 shadow-lg shadow-emerald-700/20"
                                : "bg-white border-emerald-200"
                            }`}
                          >
                            <Icon className={`w-4 h-4 transition-colors duration-500 ${isActive ? "text-white" : "text-emerald-400"}`} />
                          </div>
                          <div className={`pt-2 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-50"}`}>
                            <p className={`poppins-semibold text-sm transition-colors duration-500 ${isActive ? "text-emerald-900" : "text-emerald-700"}`}>
                              {step.title}
                            </p>
                            <p className="poppins-regular text-xs text-emerald-500 mt-0.5">{step.sub}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-emerald-50 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  <p className="poppins-regular text-[10px] text-emerald-400">Free bill check · 48hr written report</p>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -top-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-2.5 shadow-xl animate-float-slow">
                <p className="poppins-bold text-lg text-emerald-900 leading-none">£0</p>
                <p className="poppins-regular text-[9px] text-emerald-500 mt-0.5">First bill check</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHAT WE ARE ──────────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_25%_50%,rgba(209,250,229,0.25)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
                <span className="poppins-medium text-[10px] text-emerald-600 uppercase tracking-wider">What we do</span>
              </div>

              <h2 className="poppins-bold text-4xl sm:text-5xl text-emerald-900 mb-6 leading-tight">
                One bill.<br />
                <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                  Every line checked.
                </span>
              </h2>

              <p className="poppins-regular text-base sm:text-lg text-emerald-700 leading-relaxed mb-5">
                Millstone Compliance is a new Birmingham business. I started it to help local firms stop overpaying for waste and finally understand their contracts.
              </p>

              <p className="poppins-regular text-sm sm:text-base text-emerald-600 leading-relaxed mb-6">
                I&apos;m Zak. I hold a Certificate in Circular Economy from the Cambridge Institute for Sustainability Leadership, and I worked at HMRC and the Office of the Public Guardian. There I learned to read rules, check records and spot numbers that don&apos;t add up.
              </p>

              <p className="poppins-semibold text-sm text-emerald-900 leading-relaxed">
                Local. Plain English. A direct line to me. Always upfront about how I get paid.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Registered", "Licensed Collectors", "Birmingham Based", "48hr Report"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-xs text-emerald-700 poppins-medium">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Animated Clearance Risk Panel */}
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(209,250,229,0.4)_0%,transparent_70%)] pointer-events-none rounded-3xl" />

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-7 relative">
                {/* Panel header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="poppins-bold text-sm text-emerald-900">What we manage</h3>
                    <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Waste bill and contract checks</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="poppins-semibold text-[10px] text-emerald-600">5 areas</span>
                  </div>
                </div>

                {/* Five animated area cards */}
                <div className="space-y-2">
                  {areas.map((item, i) => {
                    const Icon = item.icon
                    const isActive = activeItem === i
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 cursor-default ${
                          isActive
                            ? `${item.bg} ${item.border} shadow-sm scale-[1.01]`
                            : "bg-white/50 border-transparent"
                        }`}
                        onMouseEnter={() => setActiveItem(i)}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${item.iconBg}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="poppins-semibold text-[11px] text-emerald-900 leading-none mb-0.5">{item.title}</p>
                          <p className={`poppins-regular text-[10px] leading-snug transition-all duration-300 ${isActive ? "text-slate-600 max-h-10 opacity-100" : "text-transparent max-h-0 opacity-0"}`}>
                            {item.sub}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 ${item.dot} ${isActive ? "opacity-100 scale-100" : "opacity-30 scale-75"}`} />
                      </div>
                    )
                  })}
                </div>

                {/* Bottom note */}
                <div className="mt-5 pt-4 border-t border-emerald-50 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-2.5 h-2.5 text-emerald-500" />
                  </div>
                  <p className="poppins-regular text-[10px] text-emerald-400">Free bill check · 48hr written report</p>
                </div>
              </div>

              {/* Floating stat */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-3 shadow-xl animate-float-slow">
                <p className="poppins-bold text-xl text-emerald-900 leading-none">£0</p>
                <p className="poppins-regular text-[10px] text-emerald-500 mt-0.5">To start</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── THE FIVE THINGS ──────────────────────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(209,250,229,0.3)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-5">
              <span className="poppins-medium text-[10px] text-emerald-700 uppercase tracking-wider">The five checks</span>
            </div>
            <h2 className="poppins-bold text-4xl sm:text-5xl text-emerald-900 mb-3 leading-tight">
              Everything on your bill.<br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Nothing you don&apos;t owe.
              </span>
            </h2>
            <p className="poppins-regular text-base text-emerald-600 max-w-lg mx-auto">
              Here&apos;s what we look at on every bill, and why it matters.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                num: "01",
                icon: Receipt,
                title: "Your Bills",
                body: "We check every charge against your contract and what really gets collected. If you're paying for it, you should be getting it.",
                accent: "slate",
              },
              {
                num: "02",
                icon: Trash2,
                title: "Bin Sizes",
                body: "Big bins cost more to empty. If yours go out half full, you may be paying for space you don't use. We check what fits.",
                accent: "amber",
              },
              {
                num: "03",
                icon: AlertTriangle,
                title: "Surprise Charges",
                body: "Extra fees for wrong items in a bin, or lifts that never happened. You should always get proof, like a photo.",
                accent: "red",
              },
              {
                num: "04",
                icon: CalendarClock,
                title: "Auto-Renewals",
                body: "Many waste deals roll over on their own, often with a price rise. We log your notice date so you get to choose.",
                accent: "emerald",
              },
              {
                num: "05",
                icon: FileText,
                title: "The Paperwork",
                body: "Waste transfer notes must be kept for two years. We check you have them, and that your collector is licensed.",
                accent: "blue",
              },
              {
                num: null,
                icon: null,
                title: null,
                body: null,
                accent: null,
                cta: true,
              },
            ].map((item, i) =>
              item.cta ? (
                <div key={i} className="bg-emerald-700 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <p className="poppins-bold text-2xl text-white mb-3 leading-tight">Ready to check your waste bill?</p>
                    <p className="poppins-regular text-sm text-emerald-200 leading-relaxed mb-6">Send us your latest bill. We&apos;ll come back within 48 hours.</p>
                  </div>
                  <div className="space-y-2">
                    <a
                      href="https://wa.me/447762270113"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white text-emerald-700 poppins-semibold text-sm rounded-xl transition-all duration-200 hover:bg-emerald-50 active:scale-95"
                    >
                      <WhatsAppIcon />
                      WhatsApp Us
                    </a>
                    <a
                      href="tel:+447762270113"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 text-white poppins-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                    >
                      <Phone className="w-4 h-4" />
                      07762 270 113
                    </a>
                  </div>
                </div>
              ) : (
                <div key={i} className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <span className="poppins-bold text-3xl text-emerald-100 group-hover:text-emerald-200 transition-colors duration-300">{item.num}</span>
                    {item.icon && (
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-${item.accent}-50 border border-${item.accent}-100`}>
                        <item.icon className={`w-4 h-4 text-${item.accent}-600`} />
                      </div>
                    )}
                  </div>
                  <h3 className="poppins-bold text-base text-emerald-900 mb-2">{item.title}</h3>
                  <p className="poppins-regular text-sm text-emerald-600 leading-relaxed">{item.body}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-4">
              <span className="poppins-medium text-[10px] text-emerald-700 uppercase tracking-wider">How it works</span>
            </div>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-emerald-900 leading-tight">
              Three steps. No jargon.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Send us your bill", desc: "A photo or PDF of your latest waste bill. That's all we need to start." },
              { num: "02", title: "We check and report", desc: "Every line checked against your contract. A written report within 48 hours." },
              { num: "03", title: "We fix and watch it", desc: "A better deal if there is one, and your renewal date logged for you." },
            ].map((item) => (
              <div key={item.num} className="group bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 hover:border-emerald-200 transition-all duration-300">
                <span className="poppins-bold text-4xl text-emerald-200 block mb-4 group-hover:text-emerald-300 transition-colors duration-300">{item.num}</span>
                <h3 className="poppins-bold text-sm text-emerald-900 mb-2">{item.title}</h3>
                <p className="poppins-regular text-sm text-emerald-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HONEST NUMBERS ───────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-emerald-100 rounded-2xl border border-emerald-100 overflow-hidden bg-white">
            {[
              { value: "£0", label: "Your first check" },
              { value: "48hr", label: "Report turnaround" },
              { value: "5", label: "Things we check" },
              { value: "1-1", label: "Direct access" },
            ].map((stat, i) => (
              <div key={i} className="hover:bg-emerald-50/50 px-6 py-8 text-center transition-colors duration-300">
                <p className="poppins-bold text-3xl sm:text-4xl text-emerald-900 mb-1.5">{stat.value}</p>
                <p className="poppins-regular text-[11px] text-emerald-400 uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="py-28 sm:py-36 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(209,250,229,0.45)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-emerald-100 rounded-full mb-8 shadow-sm">
            <span className="poppins-medium text-[11px] text-emerald-700 uppercase tracking-widest">Get in touch</span>
          </div>

          <h2 className="poppins-bold text-5xl sm:text-6xl md:text-7xl text-emerald-900 mb-4 leading-tight">
            Ready to talk?
          </h2>
          <p className="poppins-regular text-lg text-emerald-600 mb-10">
            WhatsApp or call. You&apos;ll talk to me.
          </p>

          <a
            href="tel:+447762270113"
            className="block poppins-bold text-4xl sm:text-5xl md:text-6xl text-emerald-900 hover:text-emerald-700 transition-colors duration-200 mb-10 tabular-nums"
          >
            07762 270 113
          </a>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <a
              href="https://wa.me/447762270113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white poppins-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <WhatsAppIcon />
              Message on WhatsApp
            </a>
            <a
              href="mailto:hello@millstonecompliance.com"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <Mail className="w-4 h-4" />
              hello@millstonecompliance.com
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["Registered", "Licensed Collectors", "Birmingham Based", "48hr Report"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs text-emerald-500 poppins-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
