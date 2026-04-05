"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Calendar, Clock, CheckCircle2, Loader2, Phone, User, Building2, Mail } from "lucide-react"

interface EmailTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  defaultService?: "discovery" | "snapshot" | "setup"
}

const services = [
  { id: "discovery", label: "Discovery Call",        price: "FREE", desc: "15-min call to understand your setup" },
  { id: "snapshot",  label: "Compliance Snapshot",   price: "£195", desc: "Quick remote review, report in 48hrs" },
  { id: "setup",     label: "Compliance Setup Pack", price: "£495", desc: "Full documents, templates & follow-up" },
] as const

type ServiceId = typeof services[number]["id"]

export function EmailTemplateModal({ isOpen, onClose, defaultService }: EmailTemplateModalProps) {
  const [name,        setName]        = useState("")
  const [email,       setEmail]       = useState("")
  const [phone,       setPhone]       = useState("")
  const [company,     setCompany]     = useState("")
  const [date,        setDate]        = useState("")
  const [time,        setTime]        = useState("")
  const [notes,       setNotes]       = useState("")
  const [serviceType, setServiceType] = useState<ServiceId>(defaultService ?? "discovery")
  const [loading,     setLoading]     = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [error,       setError]       = useState<string | null>(null)

  /* Lock body scroll while open */
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = prev }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch("/api/book-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, date, time, notes, serviceType }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Submission failed")
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSuccess(false); setError(null)
      setName(""); setEmail(""); setPhone(""); setCompany("")
      setDate(""); setTime(""); setNotes("")
      setServiceType(defaultService ?? "discovery")
    }, 300)
  }

  if (!isOpen) return null

  return (
    <>
      {/* ── Overlay ─────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[200] bg-emerald-950/60 backdrop-blur-md"
        style={{ animation: "mcFadeIn 0.18s ease" }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/*
        ── Modal shell ───────────────────────────────────────────────────
        Positioned with fixed + inset-0 so it covers the whole viewport,
        then flex centres the card. The card itself is capped at 90dvh
        and scrolls internally. min-h-0 on the flex child stops flex
        from refusing to shrink the scrollable region.
      */}
      <div
        className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
        aria-modal="true"
        role="dialog"
      >
        <div
          className="pointer-events-auto w-full max-w-md flex flex-col"
          style={{
            maxHeight: "min(90dvh, 680px)",
            animation: "mcSlideIn 0.22s cubic-bezier(0.34,1.4,0.64,1)",
          }}
        >
          {/* Card */}
          <div className="relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(6,95,70,0.25)] border border-emerald-100 flex flex-col overflow-hidden w-full h-full">

            {/* ── Header (always visible) ──────────────────────────────── */}
            <div className="flex-shrink-0 bg-gradient-to-r from-emerald-700 to-emerald-600 px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="poppins-bold text-white text-base leading-tight">Book an Audit</p>
                  <p className="text-emerald-200 text-xs poppins-regular mt-0.5">We&apos;ll be in touch within one business day</p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors duration-150 flex-shrink-0"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* ── Success state ────────────────────────────────────────── */}
            {success ? (
              <div className="flex flex-col items-center justify-center flex-1 px-8 py-10 text-center gap-4">
                <div
                  className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center"
                  style={{ animation: "mcPopIn 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <p className="poppins-bold text-slate-900 text-lg">Request Sent</p>
                  <p className="poppins-regular text-slate-500 text-sm mt-2 max-w-xs">
                    We&apos;ve received your booking and will be in touch at{" "}
                    <span className="text-emerald-600 poppins-semibold break-all">{email}</span>{" "}
                    within one business day.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="mt-1 px-7 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white poppins-bold text-sm rounded-xl transition-all duration-150 active:scale-95"
                >
                  Close
                </button>
              </div>
            ) : (

              /* ── Form ─────────────────────────────────────────────────
                 flex-1 + min-h-0 lets this shrink, overflow-y-auto
                 handles the scroll. The submit button is inside the
                 scroll so it's always reachable.
              ─────────────────────────────────────────────────────────── */
              <form
                onSubmit={handleSubmit}
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
              >
                <div className="px-5 pt-5 pb-1 space-y-5">

                  {/* Service selector */}
                  <fieldset>
                    <legend className="poppins-semibold text-[11px] text-slate-400 uppercase tracking-widest mb-2.5">
                      Select a service
                    </legend>
                    <div className="space-y-2">
                      {services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setServiceType(s.id)}
                          className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-150 active:scale-[0.99] ${
                            serviceType === s.id
                              ? "border-emerald-400 bg-emerald-50 shadow-sm"
                              : "border-slate-200 bg-white hover:border-emerald-200"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="poppins-semibold text-sm text-slate-800 leading-tight">{s.label}</p>
                              <p className="poppins-regular text-xs text-slate-400 mt-0.5 leading-tight">{s.desc}</p>
                            </div>
                            <span className={`poppins-bold text-sm flex-shrink-0 ${serviceType === s.id ? "text-emerald-600" : "text-slate-300"}`}>
                              {s.price}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Your details */}
                  <fieldset>
                    <legend className="poppins-semibold text-[11px] text-slate-400 uppercase tracking-widest mb-2.5">
                      Your details
                    </legend>
                    <div className="space-y-2.5">

                      {/* Name + Company — stack on xs, side-by-side from sm */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none z-10" />
                          <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Full name *"
                            required
                            autoComplete="name"
                            className="pl-8 h-10 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl"
                          />
                        </div>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none z-10" />
                          <Input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company name"
                            autoComplete="organization"
                            className="pl-8 h-10 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none z-10" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address *"
                          required
                          autoComplete="email"
                          inputMode="email"
                          className="pl-8 h-10 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl"
                        />
                      </div>

                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none z-10" />
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone number (optional)"
                          autoComplete="tel"
                          inputMode="tel"
                          className="pl-8 h-10 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl"
                        />
                      </div>
                    </div>
                  </fieldset>

                  {/* Date & Time */}
                  <fieldset>
                    <legend className="poppins-semibold text-[11px] text-slate-400 uppercase tracking-widest mb-2.5">
                      Preferred date &amp; time
                    </legend>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] poppins-regular text-slate-400 mb-1 pl-1">Date</label>
                        <Input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="h-10 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] poppins-regular text-slate-400 mb-1 pl-1">Time</label>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="h-10 text-sm border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl w-full"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 poppins-regular mt-1.5 pl-1">Optional — we&apos;ll confirm availability</p>
                  </fieldset>

                  {/* Notes */}
                  <div>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anything we should know? Site type, waste streams, specific concerns… (optional)"
                      rows={3}
                      className="border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-sm resize-none rounded-xl"
                    />
                  </div>

                  {error && (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-red-600 text-xs poppins-medium">{error}</p>
                    </div>
                  )}
                </div>

                {/* Submit — inside scroll so always reachable */}
                <div className="px-5 py-5">
                  <button
                    type="submit"
                    disabled={loading || !name.trim() || !email.trim()}
                    className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white poppins-bold text-sm rounded-xl transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
                  >
                    {loading
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                      : "Send Booking Request"
                    }
                  </button>
                  <p className="text-center text-[11px] text-slate-400 poppins-regular mt-2">
                    We confirm by email within one business day
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mcFadeIn  { from { opacity:0 }                                           to { opacity:1 } }
        @keyframes mcSlideIn { from { opacity:0; transform:scale(0.94) translateY(10px) }   to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes mcPopIn   { from { transform:scale(0.5); opacity:0 }                     to { transform:scale(1); opacity:1 } }

        /* Safari needs explicit -webkit-overflow-scrolling for smooth scroll */
        .overscroll-contain { -webkit-overflow-scrolling: touch; }

        /* Ensure xs breakpoint for 2-col name/company split */
        @media (min-width: 400px) {
          .xs\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      ` }} />
    </>
  )
}
