"use client"

import React, { useState, useEffect, useCallback, useRef, memo } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, Home, ClipboardCheck,
  Info, Shield, Mail, FileCheck, FileText, Phone,
  Headphones, ArrowRight, Building2,
} from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

const navItems = [
  { href: "/",          label: "Home",      icon: Home },
  { href: "/about",     label: "About Us",  icon: Info },
  { href: "/services",  label: "Services",  icon: Shield },
  { href: "/templates", label: "Templates", icon: FileText, badge: "From £27" },
  { href: "/care-homes", label: "Care Homes", icon: Building2 },
  { href: "/resources", label: "Resources", icon: FileCheck },
  { href: "/support",   label: "Support",   icon: Headphones },
]

export const MobileMenu = memo(function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const savedScrollY = useRef(0)

  /* Mount guard — ensures createPortal only runs client-side */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* Close when route changes */
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  /* iOS-safe scroll lock: position:fixed prevents touch coordinate drift */
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, savedScrollY.current)
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), [])

  /*
   * The overlay (backdrop + panel) is portaled to document.body.
   *
   * WHY: The <Navigation> component applies `backdrop-filter: blur()` to the
   * <nav> element. In iOS Safari (and Chrome on mobile), backdrop-filter
   * creates a new containing block for position:fixed descendants — meaning
   * the panel was clipped to the nav bar height (~60px) instead of filling
   * the viewport. Portaling to <body> escapes that stacking context entirely.
   */
  const overlay = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden"
          style={{ zIndex: 9990 }}
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 w-full max-w-xs lg:hidden bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 9999 }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="poppins-semibold text-slate-800 text-base tracking-tight">
            Menu
          </span>
          <button
            type="button"
            onClick={handleClose}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 active:bg-slate-100 transition-colors"
            aria-label="Close menu"
            style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 pb-safe">

          {/* Nav items */}
          {navItems.map((item) => {
            const Icon = item.icon
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClose}
                className={`flex items-center gap-3 px-4 py-4 rounded-xl poppins-semibold text-sm transition-colors ${
                  active
                    ? "bg-emerald-700 text-white"
                    : "bg-slate-50 text-slate-700 active:bg-slate-100"
                }`}
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
                {"badge" in item && !active && (
                  <span className="ml-auto text-[10px] poppins-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
              </Link>
            )
          })}

          {/* Free Assessment CTA */}
          <div className="pt-3">
            <Link
              href="/quiz"
              onClick={handleClose}
              className="flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold text-sm active:opacity-90 transition-all shadow-sm"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <ClipboardCheck className="w-5 h-5" />
              Start Free Assessment
            </Link>
          </div>

          {/* Contact — phone first, most prominent */}
          <div className="pt-4 mt-2 border-t border-slate-100 space-y-2">
            <p className="poppins-medium text-[10px] text-slate-400 uppercase tracking-widest px-1 pb-1">
              Contact Us
            </p>

            {/* Call — primary action for mobile users */}
            <a
              href={CONTACT_INFO.tel}
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 active:bg-emerald-100 transition-colors"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="poppins-bold text-sm text-emerald-900">Call Now</p>
                <p className="poppins-regular text-xs text-emerald-700">{CONTACT_INFO.phone}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-600 ml-auto flex-shrink-0" />
            </a>

            {/* Email */}
            <a
              href={CONTACT_INFO.mailto}
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-700 active:bg-slate-100 transition-colors"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span className="poppins-regular text-sm truncate">{CONTACT_INFO.email}</span>
            </a>

            <p className="poppins-regular text-[10px] text-slate-400 text-center pt-1">
              Mon–Fri · 9am–5:30pm
            </p>
          </div>
        </nav>
      </div>
    </>
  )

  return (
    <>
      {/* Hamburger button — stays inside <nav> for correct header layout */}
      <button
        type="button"
        onClick={handleToggle}
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-emerald-200 shadow-sm text-emerald-700 active:bg-emerald-50 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/*
       * Overlay portaled to <body> — escapes the nav's backdrop-filter
       * stacking context so the panel covers the full viewport on iOS Safari.
       */}
      {mounted && createPortal(overlay, document.body)}
    </>
  )
})
