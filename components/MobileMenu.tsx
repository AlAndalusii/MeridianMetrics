"use client"

import React, { useState, useEffect, useCallback, useRef, memo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, Home, ClipboardCheck,
  Info, Shield, Mail, FileCheck
} from "lucide-react"

const navItems = [
  { href: "/",          label: "Home",      icon: Home },
  { href: "/about",     label: "About Us",  icon: Info },
  { href: "/services",  label: "Services",  icon: Shield },
  { href: "/resources", label: "Resources", icon: FileCheck },
]

export const MobileMenu = memo(function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const savedScrollY = useRef(0)

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

  return (
    <>
      {/* Hamburger button */}
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

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[90] lg:hidden"
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
        className={`fixed inset-y-0 right-0 w-full max-w-xs z-[100] lg:hidden bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
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

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
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
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
              </Link>
            )
          })}

          {/* CTA */}
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

          {/* Contact */}
          <div className="pt-4 mt-2 border-t border-slate-100 space-y-1">
            <p className="poppins-medium text-[10px] text-slate-400 uppercase tracking-widest px-1 pb-1">
              Contact
            </p>
            <a
              href="mailto:hello@millstonecompliance.com"
              onClick={handleClose}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-700 poppins-regular text-sm active:bg-slate-100 transition-colors"
              style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
            >
              <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              hello@millstonecompliance.com
            </a>
          </div>
        </nav>
      </div>
    </>
  )
})
