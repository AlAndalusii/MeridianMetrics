"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
            <Link href="/services" className={linkClass("/services")}>Services</Link>
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
