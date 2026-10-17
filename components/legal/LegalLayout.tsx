import React from "react"
import Link from "next/link"
import { Navigation } from "@/components/Navigation"
import Footer from "@/components/Footer"
import { COMPANY, CONTACT_INFO } from "@/lib/constants"

const LEGAL_PAGES = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
]

/* ─── Numbered section ────────────────────────────────────────────────────── */
export function Section({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <section id={`section-${num}`} className="scroll-mt-28">
      <h2 className="poppins-semibold text-xl sm:text-2xl text-emerald-900 mb-4 flex items-center">
        <span className="bg-emerald-100 text-emerald-700 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center text-sm mr-3">{num}</span>
        {title}
      </h2>
      <div className="poppins-regular text-emerald-800/90 leading-relaxed space-y-4 sm:ml-11">{children}</div>
    </section>
  )
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-emerald-900 font-semibold mt-2">{children}</h3>
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return <div className="bg-emerald-50/70 p-4 rounded-lg border border-emerald-100 text-sm">{children}</div>
}

/* ─── Company details block, shared by every legal page ───────────────────── */
export function CompanyDetails() {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-[11rem_1fr] gap-x-4 gap-y-2 text-sm">
      <dt className="font-semibold text-emerald-900">Company</dt>
      <dd>{COMPANY.legalName}</dd>
      <dt className="font-semibold text-emerald-900">Company number</dt>
      <dd>
        <a href={COMPANY.companiesHouseUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-emerald-300 hover:text-emerald-950">
          {COMPANY.number}
        </a>{" "}
        (registered in {COMPANY.registeredIn})
      </dd>
      <dt className="font-semibold text-emerald-900">Registered office</dt>
      <dd>{COMPANY.registeredOffice}</dd>
      <dt className="font-semibold text-emerald-900">Email</dt>
      <dd><a href={CONTACT_INFO.mailto} className="underline decoration-emerald-300 hover:text-emerald-950">{CONTACT_INFO.email}</a></dd>
      <dt className="font-semibold text-emerald-900">Phone</dt>
      <dd><a href={CONTACT_INFO.tel} className="underline decoration-emerald-300 hover:text-emerald-950">{CONTACT_INFO.phone}</a></dd>
    </dl>
  )
}

/* ─── Page shell: hero, content card, links to the other legal pages ──────── */
export function LegalLayout({
  title,
  intro,
  current,
  children,
}: {
  title: string
  intro: string
  current: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 overflow-x-hidden">
      <Navigation />

      <header className="pt-32 pb-10 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h1 className="poppins-bold text-4xl sm:text-5xl text-emerald-900 mb-5">{title}</h1>
        <p className="poppins-regular text-lg text-emerald-700 leading-relaxed max-w-2xl mx-auto">{intro}</p>
        <p className="poppins-regular text-sm text-emerald-600 mt-4">Last updated: {COMPANY.legalUpdated}</p>
        <nav aria-label="Legal pages" className="mt-6 flex flex-wrap justify-center gap-2">
          {LEGAL_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={p.href === current ? "page" : undefined}
              className={`px-4 py-1.5 rounded-full text-sm poppins-medium border transition-colors ${
                p.href === current
                  ? "bg-emerald-700 text-white border-emerald-700"
                  : "bg-white/70 text-emerald-800 border-emerald-200 hover:border-emerald-400"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="px-4 sm:px-6 pb-20 max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100 p-6 sm:p-12 space-y-10">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
