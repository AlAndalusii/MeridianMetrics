"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Camera,
  FileText,
  Send,
  FileCheck,
  Phone,
  Mail,
  Upload,
  X,
  Loader2,
  CalendarRange,
  Zap,
  Search,
  User,
  Building2,
} from "lucide-react"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CONTACT_INFO } from "@/lib/constants"

const WHATSAPP_URL = "https://wa.me/447762270113"
const MAX_TOTAL_BYTES = 4 * 1024 * 1024

type CheckKind = "quarterly" | "thorough"

/* ─── Reveal on scroll ────────────────────────────────────────────────────── */
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

/* ─── Hero animation: bill travels from you, to us, back as a report ─────── */
const journey = [
  { icon: Camera, label: "You", sub: "Snap your bill" },
  { icon: Search, label: "Us",  sub: "Check every line" },
  { icon: FileCheck, label: "You", sub: "Get your report" },
]

const reportLines = ["Bin size checked", "Every lift checked", "Renewal date found"]

// Stages: 0 snap · 1 travelling · 2 checking · 3 travelling back · 4–6 report ticks · 7 hold
const JOURNEY_STAGES = 8

function BillJourney() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStage(JOURNEY_STAGES - 1)
      return
    }
    const id = setInterval(() => setStage((s) => (s + 1) % JOURNEY_STAGES), 900)
    return () => clearInterval(id)
  }, [])

  // Where the little bill sits on the track: 0%, 50% or 100%
  const packetPos = stage === 0 ? 0 : stage <= 2 ? 50 : 100
  const activeNode = stage === 0 ? 0 : stage <= 2 ? 1 : 2
  const ticks = Math.max(0, Math.min(reportLines.length, stage - 3))

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(209,250,229,0.5)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative bg-white/85 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="poppins-semibold text-[11px] text-emerald-900 uppercase tracking-[0.15em]">How it goes</p>
            <p className="poppins-regular text-[11px] text-emerald-500 mt-0.5">Example</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-100">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="poppins-semibold text-[10px] text-emerald-600">48hr report</span>
          </div>
        </div>

        {/* Track */}
        <div className="relative mb-8">
          <div className="absolute left-[16.66%] right-[16.66%] top-6 h-0.5 bg-emerald-100 rounded-full" />
          <div
            className="absolute left-[16.66%] top-6 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${(packetPos / 100) * 66.66}%` }}
          />

          {/* Travelling bill */}
          <div
            className="absolute top-6 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-700"
            style={{ left: `${16.66 + (packetPos / 100) * 66.66}%`, transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
          >
            <div className={`w-7 h-8 rounded-md bg-white border-2 shadow-lg flex flex-col gap-0.5 p-1 transition-colors duration-500 ${stage >= 3 ? "border-emerald-500" : "border-emerald-300"}`}>
              <div className="h-0.5 w-full bg-emerald-200 rounded" />
              <div className="h-0.5 w-3/4 bg-emerald-200 rounded" />
              <div className="h-0.5 w-full bg-emerald-200 rounded" />
              {stage >= 3 && <CheckCircle className="w-2.5 h-2.5 text-emerald-600 mx-auto mt-0.5" />}
            </div>
          </div>

          <div className="relative grid grid-cols-3">
            {journey.map((node, i) => {
              const Icon = node.icon
              const isActive = activeNode === i
              const isChecking = i === 1 && stage === 2
              return (
                <div key={i} className="flex flex-col items-center text-center">
                  <div
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                      isActive ? "bg-emerald-700 border-emerald-700 scale-110 shadow-lg shadow-emerald-700/25" : "bg-white border-emerald-100"
                    }`}
                  >
                    {isChecking && <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400 animate-ping" />}
                    <Icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? "text-white" : "text-emerald-400"}`} />
                  </div>
                  <p className={`poppins-semibold text-xs mt-3 transition-colors duration-500 ${isActive ? "text-emerald-900" : "text-emerald-500"}`}>{node.label}</p>
                  <p className="poppins-regular text-[10px] text-slate-400 mt-0.5">{node.sub}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Report */}
        <div className="rounded-2xl bg-emerald-50/60 border border-emerald-100 p-4">
          <p className="poppins-semibold text-[10px] text-emerald-700 uppercase tracking-[0.14em] mb-3">Your report</p>
          <div className="space-y-2">
            {reportLines.map((line, i) => {
              const done = i < ticks
              return (
                <div
                  key={line}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-all duration-500 ${done ? "bg-white border-emerald-200 shadow-sm" : "bg-white/50 border-transparent"}`}
                  style={{ transform: done ? "none" : "translateX(-6px)", opacity: done ? 1 : 0.5 }}
                >
                  <CheckCircle className={`w-3.5 h-3.5 transition-colors duration-500 ${done ? "text-emerald-600" : "text-slate-200"}`} />
                  <span className={`poppins-medium text-[11px] ${done ? "text-emerald-900" : "text-slate-400"}`}>{line}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-emerald-100 px-4 py-2.5 shadow-xl animate-float-slow">
        <p className="poppins-bold text-sm text-emerald-900 leading-none">First check free</p>
        <p className="poppins-regular text-[10px] text-emerald-500 mt-1">No card. No catch.</p>
      </div>
    </div>
  )
}

/* ─── Steps ───────────────────────────────────────────────────────────────── */
const steps = [
  { icon: FileText, title: "Find your latest bill", desc: "Paper or PDF. The page that shows your bins, how often they're emptied, and the price." },
  { icon: Camera,   title: "Take a photo or save the PDF", desc: "A clear phone photo is fine. Just make sure we can read the words." },
  { icon: Send,     title: "Send it to us", desc: "Pick the way that's easiest for you.", methods: true },
  { icon: FileCheck, title: "We check it and report back", desc: "You get a written report within 48 hours. Plain English. Clear next steps." },
]

/* ─── Page ────────────────────────────────────────────────────────────────── */
export default function SendYourBillPage() {
  const hero = useReveal(0.05)
  const chooseRef = useReveal(0.15)
  const formRef = useReveal(0.1)
  const callRef = useReveal(0.15)

  // Timeline fills as you scroll through the steps
  const stepsRef = useRef<HTMLDivElement>(null)
  const [stepsProgress, setStepsProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = stepsRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const mid = window.innerHeight * 0.55
      const p = (mid - rect.top) / rect.height
      setStepsProgress(Math.max(0, Math.min(1, p)))
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* Bill form */
  const [kind, setKind] = useState<CheckKind>("quarterly")
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [business, setBusiness] = useState("")
  const [notes, setNotes] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0)

  const addFiles = (list: FileList | null) => {
    if (!list) return
    setError(null)
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 8))
  }

  const chooseKind = (k: CheckKind) => {
    setKind(k)
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const submitBill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    if (totalBytes > MAX_TOTAL_BYTES) {
      setError("Those files are too big together. Keep them under 4MB, or email them to us instead.")
      return
    }
    setSending(true)
    setError(null)
    try {
      const data = new FormData()
      data.append("kind", kind)
      data.append("name", name)
      data.append("email", email)
      data.append("phone", phone)
      data.append("business", business)
      data.append("notes", notes)
      files.forEach((f) => data.append("files", f))
      const res = await fetch("/api/send-bill", { method: "POST", body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Something went wrong.")
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setSending(false)
    }
  }

  /* Call-back form */
  const [cbName, setCbName] = useState("")
  const [cbPhone, setCbPhone] = useState("")
  const [cbTime, setCbTime] = useState("any")
  const [cbSending, setCbSending] = useState(false)
  const [cbSent, setCbSent] = useState(false)
  const [cbError, setCbError] = useState<string | null>(null)

  const submitCallback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cbName.trim() || !cbPhone.trim()) return
    setCbSending(true)
    setCbError(null)
    try {
      const data = new FormData()
      data.append("kind", "callback")
      data.append("name", cbName)
      data.append("phone", cbPhone)
      data.append("callTime", cbTime)
      const res = await fetch("/api/send-bill", { method: "POST", body: data })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Something went wrong.")
      setCbSent(true)
    } catch (err) {
      setCbError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setCbSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 px-6 bg-gradient-to-b from-emerald-50 via-white to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-emerald-100/60 rounded-full blur-[80px] pointer-events-none" />

        <div ref={hero.ref} className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-16 items-center">
          <div
            className="transition-all duration-700"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(20px)" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-7">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="poppins-semibold text-xs text-emerald-700 uppercase tracking-[0.15em]">Your first check is free</span>
            </div>

            <h1 className="poppins-bold text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight text-slate-900 mb-6">
              Send us your bill.<br />
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                We&apos;ll do the rest.
              </span>
            </h1>

            <p className="poppins-regular text-lg text-slate-500 max-w-md mb-9 leading-relaxed">
              It takes two minutes. We check every line, and send you a plain English report within 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#how"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-95"
              >
                Show Me How
                <ArrowRight className="w-4 h-4 rotate-90 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#call"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 hover:border-emerald-300 poppins-semibold text-sm rounded-xl transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Call Me Instead
              </a>
            </div>
          </div>

          <div
            className="transition-all duration-700 delay-150"
            style={{ opacity: hero.visible ? 1 : 0, transform: hero.visible ? "none" : "translateY(24px)" }}
          >
            <BillJourney />
          </div>
        </div>
      </section>

      {/* ── HOW TO SEND IT ─────────────────────────────────────────────────── */}
      <section id="how" className="py-20 sm:py-28 px-6 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">How to send it</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">
              Four small steps.{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">That&apos;s all.</span>
            </h2>
          </div>

          <div ref={stepsRef} className="relative">
            {/* Timeline */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-emerald-100 rounded-full" />
            <div
              className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full transition-[height] duration-150"
              style={{ height: `calc(${stepsProgress} * (100% - 3rem))` }}
            />

            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = step.icon
                const reached = stepsProgress >= (i + 0.35) / steps.length
                return (
                  <div key={step.title} className="relative flex gap-6">
                    <div
                      className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500 ${
                        reached ? "bg-emerald-700 border-emerald-700 shadow-lg shadow-emerald-700/20" : "bg-white border-emerald-100"
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-colors duration-500 ${reached ? "text-white" : "text-emerald-400"}`} />
                    </div>

                    <div
                      className={`flex-1 rounded-2xl border p-6 transition-all duration-500 ${
                        reached ? "bg-white border-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.10)]" : "bg-white/60 border-slate-100"
                      }`}
                      style={{ transform: reached ? "none" : "translateX(8px)", opacity: reached ? 1 : 0.55 }}
                    >
                      <p className="poppins-bold text-[11px] text-emerald-400 tracking-widest mb-1">STEP {i + 1}</p>
                      <h3 className="poppins-bold text-lg text-slate-900 mb-1.5">{step.title}</h3>
                      <p className="poppins-regular text-sm text-slate-500 leading-relaxed">{step.desc}</p>

                      {step.methods && (
                        <div className="grid sm:grid-cols-3 gap-2.5 mt-5">
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-1 p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300"
                          >
                            <Phone className="w-4 h-4 text-emerald-600 mb-1" />
                            <span className="poppins-semibold text-xs text-slate-900">WhatsApp a photo</span>
                            <span className="poppins-regular text-[11px] text-slate-500">{CONTACT_INFO.phone}</span>
                          </a>
                          <a
                            href={`${CONTACT_INFO.mailto}?subject=My waste bill`}
                            className="group flex flex-col gap-1 p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300"
                          >
                            <Mail className="w-4 h-4 text-emerald-600 mb-1" />
                            <span className="poppins-semibold text-xs text-slate-900">Email it</span>
                            <span className="poppins-regular text-[11px] text-slate-500 break-all">{CONTACT_INFO.email}</span>
                          </a>
                          <a
                            href="#upload"
                            className="group flex flex-col gap-1 p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50 transition-all duration-300"
                          >
                            <Upload className="w-4 h-4 text-emerald-600 mb-1" />
                            <span className="poppins-semibold text-xs text-slate-900">Upload it here</span>
                            <span className="poppins-regular text-[11px] text-slate-500">Takes a minute</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-center poppins-regular text-sm text-slate-400 mt-10">
            Tip: if you have your contract too, send it. It helps us check more.
          </p>
        </div>
      </section>

      {/* ── CHOOSE YOUR CHECK ──────────────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-6 bg-gradient-to-b from-white via-emerald-50/40 to-white">
        <div ref={chooseRef.ref} className="max-w-5xl mx-auto">
          <div
            className="text-center mb-12 transition-all duration-700"
            style={{ opacity: chooseRef.visible ? 1 : 0, transform: chooseRef.visible ? "none" : "translateY(20px)" }}
          >
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Choose your check</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Quick look, or the full picture?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                id: "quarterly" as CheckKind,
                icon: Zap,
                tag: "Free",
                title: "Quick Bill Check",
                sub: "Send one quarter's bill",
                desc: "Great for a first look. We check your latest bill and tell you what looks wrong.",
                ticks: ["One bill, checked line by line", "Bin sizes and lifts looked at", "Report within 48 hours"],
              },
              {
                id: "thorough" as CheckKind,
                icon: CalendarRange,
                tag: "Price agreed first",
                title: "Thorough Audit",
                sub: "Send 12 months of bills and your contract",
                desc: "The full picture. Every bill, every lift and every price rise, checked against your contract.",
                ticks: ["A whole year, side by side", "Every price rise checked", "Renewal date and notice period found"],
              },
            ].map((opt, i) => {
              const Icon = opt.icon
              const selected = kind === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => chooseKind(opt.id)}
                  className={`group relative text-left rounded-2xl p-7 flex flex-col transition-all duration-500 ${
                    selected
                      ? "bg-white border-2 border-emerald-400 shadow-[0_12px_48px_rgba(16,185,129,0.18)]"
                      : "bg-white border-2 border-slate-100 hover:border-emerald-200 hover:shadow-[0_8px_32px_rgba(16,185,129,0.10)]"
                  }`}
                  style={{
                    opacity: chooseRef.visible ? 1 : 0,
                    transform: chooseRef.visible ? "none" : "translateY(24px)",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${selected ? "bg-emerald-700" : "bg-emerald-50"}`}>
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${selected ? "text-white" : "text-emerald-600"}`} />
                    </div>
                    <span className="poppins-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{opt.tag}</span>
                  </div>
                  <h3 className="poppins-bold text-xl text-slate-900">{opt.title}</h3>
                  <p className="poppins-medium text-sm text-emerald-600 mt-1 mb-3">{opt.sub}</p>
                  <p className="poppins-regular text-sm text-slate-500 leading-relaxed mb-5">{opt.desc}</p>
                  <div className="space-y-2 mb-6 flex-1">
                    {opt.ticks.map((t) => (
                      <div key={t} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-slate-600 poppins-regular leading-snug">{t}</span>
                      </div>
                    ))}
                  </div>
                  <span className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl poppins-semibold text-sm transition-all duration-300 ${
                    selected ? "bg-emerald-700 text-white" : "bg-white text-emerald-700 border border-emerald-300 group-hover:bg-emerald-50"
                  }`}>
                    {selected ? "Selected" : "Choose This"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── UPLOAD ─────────────────────────────────────────────────────────── */}
      <section id="upload" className="py-20 sm:py-24 px-6 scroll-mt-20">
        <div
          ref={formRef.ref}
          className="max-w-2xl mx-auto transition-all duration-700"
          style={{ opacity: formRef.visible ? 1 : 0, transform: formRef.visible ? "none" : "translateY(24px)" }}
        >
          <div className="text-center mb-10">
            <p className="text-emerald-600 poppins-semibold text-xs uppercase tracking-[0.18em] mb-2">Send it here</p>
            <h2 className="poppins-bold text-3xl sm:text-4xl text-slate-900">Upload your bill.</h2>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8">
            {sent ? (
              <div className="text-center py-10">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-40" />
                  <div className="relative w-16 h-16 rounded-full bg-emerald-700 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="poppins-bold text-2xl text-slate-900 mb-2">Got it. Thank you.</h3>
                <p className="poppins-regular text-slate-500 max-w-sm mx-auto">
                  We&apos;ll check your bill and send your report within 48 hours. Keep an eye on your email.
                </p>
              </div>
            ) : (
              <form onSubmit={submitBill} className="space-y-5">
                {/* Kind toggle */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
                  {([["quarterly", "Quick Bill Check"], ["thorough", "Thorough Audit"]] as const).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setKind(id)}
                      className={`py-2.5 rounded-lg poppins-semibold text-sm transition-all duration-300 ${
                        kind === id ? "bg-white text-emerald-700 shadow-sm border border-emerald-100" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <p className="poppins-regular text-xs text-slate-400 text-center -mt-2">
                  {kind === "quarterly" ? "Send one quarter's bill." : "Send 12 months of bills, and your contract if you have it."}
                </p>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
                  onClick={() => fileInput.current?.click()}
                  className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                    dragging ? "border-emerald-500 bg-emerald-50 scale-[1.01]" : "border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50"
                  }`}
                >
                  <input
                    ref={fileInput}
                    type="file"
                    multiple
                    accept="application/pdf,image/*"
                    className="hidden"
                    onChange={(e) => { addFiles(e.target.files); e.target.value = "" }}
                  />
                  <div className={`w-12 h-12 rounded-2xl bg-white border border-emerald-100 shadow-sm flex items-center justify-center mx-auto mb-3 transition-transform duration-300 ${dragging ? "-translate-y-1" : ""}`}>
                    <Upload className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="poppins-semibold text-sm text-slate-900">Drop your bill here, or tap to choose</p>
                  <p className="poppins-regular text-xs text-slate-400 mt-1">PDF or photo · Up to 4MB in total</p>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((f, i) => (
                      <div key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 animate-[fadeInUp_0.3s_ease_both]">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span className="poppins-medium text-xs text-slate-700 truncate">{f.name}</span>
                          <span className="poppins-regular text-[10px] text-slate-400 flex-shrink-0">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                          aria-label={`Remove ${f.name}`}
                          className="w-6 h-6 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="pl-10 h-12 rounded-xl" />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="pl-10 h-12 rounded-xl" />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className="pl-10 h-12 rounded-xl" />
                  </div>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <Input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Business name" className="pl-10 h-12 rounded-xl" />
                  </div>
                </div>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything we should know? (optional)" className="rounded-xl min-h-[90px]" />

                {error && (
                  <p className="poppins-medium text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full inline-flex items-center justify-center gap-2 py-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-70 text-white poppins-bold text-sm rounded-xl shadow-lg hover:shadow-emerald-700/20 transition-all duration-300 active:scale-[0.99]"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {sending ? "Sending..." : files.length ? "Send My Bill" : "Send My Details"}
                </button>
                <p className="poppins-regular text-[11px] text-slate-400 text-center">
                  No bill to hand? Send your details and we&apos;ll tell you what we need.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CALL ME INSTEAD ────────────────────────────────────────────────── */}
      <section id="call" className="py-20 sm:py-24 px-6 bg-emerald-700 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/30 rounded-full blur-[80px]" />

        <div
          ref={callRef.ref}
          className="max-w-5xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center transition-all duration-700"
          style={{ opacity: callRef.visible ? 1 : 0, transform: callRef.visible ? "none" : "translateY(20px)" }}
        >
          <div>
            <div className="relative w-14 h-14 mb-7">
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-ping" style={{ animationDuration: "2.4s" }} />
              <div className="relative w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg">
                <Phone className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
            <h2 className="poppins-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-5">
              Rather talk<br />it through?
            </h2>
            <p className="poppins-regular text-emerald-100 text-lg leading-relaxed max-w-md mb-6">
              Leave your number. We&apos;ll call you and go through your bill together. About 15 minutes. No pressure.
            </p>
            <a href={CONTACT_INFO.tel} className="inline-flex items-center gap-2 poppins-semibold text-white hover:text-emerald-100 transition-colors">
              Or call us now: {CONTACT_INFO.phone}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
            {cbSent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-700 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="poppins-bold text-xl text-slate-900 mb-2">We&apos;ll call you soon.</h3>
                <p className="poppins-regular text-sm text-slate-500">Have your latest bill close by if you can.</p>
              </div>
            ) : (
              <form onSubmit={submitCallback} className="space-y-4">
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input required value={cbName} onChange={(e) => setCbName(e.target.value)} placeholder="Your name" className="pl-10 h-12 rounded-xl" />
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <Input required type="tel" value={cbPhone} onChange={(e) => setCbPhone(e.target.value)} placeholder="Your phone number" className="pl-10 h-12 rounded-xl" />
                </div>
                <div>
                  <p className="poppins-medium text-xs text-slate-500 mb-2">Best time to call</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[["morning", "Morning"], ["afternoon", "Afternoon"], ["evening", "Evening"], ["any", "Any time"]].map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setCbTime(id)}
                        className={`py-2.5 rounded-xl poppins-semibold text-xs border transition-all duration-300 ${
                          cbTime === id ? "bg-emerald-700 text-white border-emerald-700" : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {cbError && (
                  <p className="poppins-medium text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{cbError}</p>
                )}

                <button
                  type="submit"
                  disabled={cbSending}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-70 text-white poppins-bold text-sm rounded-xl transition-all duration-300 active:scale-[0.99]"
                >
                  {cbSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Phone className="w-4 h-4" />}
                  {cbSending ? "Sending..." : "Call Me Back"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── WHAT WE CHECK LINK ─────────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="poppins-regular text-slate-500 mb-3">Want to know what we look for first?</p>
          <Link href="/what-we-check" className="inline-flex items-center gap-2 poppins-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
            See What We Check For
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          0%   { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: none; }
        }
      ` }} />
    </div>
  )
}
