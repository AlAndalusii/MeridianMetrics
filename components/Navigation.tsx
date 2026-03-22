"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"

export function Navigation() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `poppins-medium text-[13px] tracking-wide transition-colors duration-200 ${
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "text-slate-900"
        : "text-slate-500 hover:text-slate-900"
    }`

  return (
    <nav
      className="fixed top-0 w-full bg-white/80 backdrop-blur-2xl z-50 border-b border-black/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_2px_16px_rgba(0,0,0,0.04)]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="transition-opacity duration-200 hover:opacity-70 flex-shrink-0">
            <MillstoneLogo size="sm" variant="modern" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/about" className={linkClass("/about")}>About Us</Link>

            {/* ── Services direct link ─────────────────────────────── */}
            <Link href="/services" className={linkClass("/services")}>Services</Link>

            <Link href="/resources" className={linkClass("/resources")}>Resources</Link>
          </div>

          {/* Right: CTA + Mobile hamburger */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/quiz"
              className="
                hidden lg:inline-flex items-center
                poppins-semibold text-[13px] tracking-wide
                bg-slate-900 hover:bg-slate-800 text-white
                px-5 py-2.5 rounded-xl
                shadow-[0_2px_8px_rgba(0,0,0,0.18)]
                hover:shadow-[0_4px_16px_rgba(0,0,0,0.22)]
                transition-all duration-200 active:scale-[0.97]
                whitespace-nowrap
              "
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
