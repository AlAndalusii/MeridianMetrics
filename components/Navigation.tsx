"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Briefcase, FileText } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"

export function Navigation() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `poppins-medium text-sm tracking-wide transition-colors duration-200 ${
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "text-emerald-700"
        : "text-slate-600 hover:text-emerald-700"
    }`

  const isServicesActive =
    pathname.startsWith("/services") || pathname.startsWith("/templates")

  return (
    <nav
      className="fixed top-0 w-full bg-white/92 backdrop-blur-2xl z-50 border-b border-emerald-100/60 shadow-[0_1px_20px_rgba(6,95,70,0.06)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="transition-opacity duration-200 hover:opacity-75 flex-shrink-0">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/about" className={linkClass("/about")}>About Us</Link>

            {/* Services dropdown */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 poppins-medium text-sm tracking-wide transition-colors duration-200 ${
                  isServicesActive ? "text-emerald-700" : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                Services
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>

              {/* Dropdown panel */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden min-w-[220px] p-1.5">
                  <Link
                    href="/services"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      pathname.startsWith("/services") && !pathname.startsWith("/templates")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="poppins-semibold text-sm leading-none mb-0.5">Services</p>
                      <p className="poppins-regular text-[11px] text-slate-400">Audits &amp; compliance</p>
                    </div>
                  </Link>
                  <Link
                    href="/templates"
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      pathname.startsWith("/templates")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-emerald-700"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <div>
                      <p className="poppins-semibold text-sm leading-none mb-0.5">Templates</p>
                      <p className="poppins-regular text-[11px] text-slate-400">Instant downloads from £27</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/resources" className={linkClass("/resources")}>Resources</Link>
          </div>

          {/* Right: CTA + Mobile hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/quiz"
              className="hidden lg:inline-flex items-center poppins-semibold text-sm bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 whitespace-nowrap"
            >
              Start Free Assessment
            </Link>

            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}
