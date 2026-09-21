"use client"

import React, { useState } from "react"
import {
  CheckCircle,
  FileCheck,
  Scale,
  ShieldCheck,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"

const checks = [
  { icon: Scale,       title: "Fair Price Check",   desc: "We compare what you're paying against what similar properties actually pay." },
  { icon: ShieldCheck,  title: "Carrier Licence Check", desc: "We confirm your carrier is registered with the Environment Agency." },
  { icon: FileCheck,    title: "Paperwork Check",    desc: "We check your transfer notes and Duty of Care records are in order." },
]

export default function WasteContractAuditPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/book-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, notes, serviceType: "waste-audit" }),
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-x-hidden">
      <Navigation />

      <section className="pt-32 sm:pt-36 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,rgba(209,250,229,0.5)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-start">

            {/* Left — pitch */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/80 border border-emerald-100 rounded-full mb-6 shadow-sm">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="poppins-medium text-[10px] text-emerald-700 tracking-[0.18em] uppercase">Free · No Obligation</span>
              </div>

              <h1 className="poppins-bold text-4xl sm:text-5xl text-emerald-900 leading-[1.1] tracking-tight mb-5">
                Is Your Waste Contract{" "}
                <span className="text-emerald-600">Fair?</span>
              </h1>

              <p className="poppins-regular text-base sm:text-lg text-emerald-700/80 max-w-md mb-10 leading-relaxed">
                Send us your current waste contract. We&apos;ll check the price, the carrier, and the paperwork — free, and with no obligation.
              </p>

              <div className="space-y-5 mb-10">
                {checks.map((c) => (
                  <div key={c.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-white border border-emerald-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <c.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="poppins-semibold text-sm text-emerald-900">{c.title}</p>
                      <p className="poppins-regular text-sm text-emerald-600 mt-0.5 leading-snug">{c.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                {["Registered", "Licensed Partners", "Birmingham Based", "48hr Turnaround"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-xs text-emerald-600 poppins-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-emerald-100 shadow-2xl p-6 sm:p-8">
              {success ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className="poppins-bold text-emerald-900 text-lg">Request Sent</p>
                    <p className="poppins-regular text-emerald-600 text-sm mt-2 max-w-xs">
                      We&apos;ve received your audit request and will be in touch at{" "}
                      <span className="poppins-semibold break-all">{email}</span> within one business day.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="poppins-semibold text-[11px] text-emerald-400 uppercase tracking-widest mb-5">Free Waste Contract Audit</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid xs:grid-cols-2 gap-3">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-300 pointer-events-none" />
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name *"
                          required
                          autoComplete="name"
                          className="pl-8 h-11 text-sm border-emerald-200 focus-visible:ring-emerald-400 rounded-xl"
                        />
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-300 pointer-events-none" />
                        <Input
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Property / portfolio"
                          className="pl-8 h-11 text-sm border-emerald-200 focus-visible:ring-emerald-400 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-300 pointer-events-none" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address *"
                        required
                        autoComplete="email"
                        inputMode="email"
                        className="pl-8 h-11 text-sm border-emerald-200 focus-visible:ring-emerald-400 rounded-xl"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-300 pointer-events-none" />
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number (optional)"
                        autoComplete="tel"
                        inputMode="tel"
                        className="pl-8 h-11 text-sm border-emerald-200 focus-visible:ring-emerald-400 rounded-xl"
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-3.5 h-3.5 text-emerald-300 pointer-events-none" />
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="What would you like checked? e.g. current contract, carrier licence, HMO bins (optional)"
                        rows={3}
                        className="pl-8 pt-2.5 text-sm border-emerald-200 focus-visible:ring-emerald-400 rounded-xl resize-none"
                      />
                    </div>

                    {error && (
                      <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-xs poppins-medium">{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !name.trim() || !email.trim()}
                      className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed text-white poppins-bold text-sm rounded-xl transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        "Send My Audit Request"
                      )}
                    </button>
                    <p className="text-center text-[11px] text-emerald-400 poppins-regular">
                      We confirm by email within one business day. No obligation.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
