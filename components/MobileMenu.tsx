"use client"

import React, { useState, useEffect, useCallback, useRef, memo } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Menu, X, Home, FileCheck, ClipboardCheck,
  Mail, Info, BarChart3
} from "lucide-react"

const menuItems = [
  { href: "/",         label: "Home",            icon: Home },
  { href: "/resources",label: "Resources",        icon: FileCheck },
  { href: "/quiz",     label: "Free Assessment",  icon: ClipboardCheck },
  { href: "/about",    label: "About Us",         icon: Info },
  { href: "/ppt-gap-analyser", label: "PPT Gap Analyser", icon: BarChart3 },
]

export const MobileMenu = memo(function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router   = useRouter()
  const pathname = usePathname()
  const savedScrollY = useRef(0)

  /* Close when route changes */
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  /* Scroll lock — overflow:hidden only (no position:fixed on body which breaks Link navigation) */
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  /* Navigate: restore scroll, close menu, then push route */
  const navigateTo = useCallback(
    (href: string) => {
      // Synchronously restore body styles so nothing blocks navigation
      document.body.style.overflow = ""
      setIsOpen(false)
      router.push(href)
    },
    [router]
  )

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), [])
  const handleClose  = useCallback(() => {
    document.body.style.overflow = ""
    setIsOpen(false)
  }, [])

  return (
    <>
      {/* ── Hamburger button ───────────────────────────── */}
      <button
        type="button"
        onClick={handleToggle}
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-emerald-200 shadow-md text-emerald-700 active:bg-emerald-50 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ── Full-screen drawer ─────────────────────────── */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[90] lg:hidden"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 right-0 w-full max-w-xs z-[100] lg:hidden bg-white flex flex-col shadow-2xl"
            style={{
              animation: "mobileMenuSlideIn 240ms cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-emerald-100 bg-emerald-50/60">
              <span className="poppins-bold text-emerald-900 text-lg tracking-tight">
                Navigate
              </span>
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-emerald-200 text-emerald-700 active:bg-emerald-100 transition-colors shadow-sm"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
              {menuItems.map((item) => {
                const Icon    = item.icon
                const isActive = pathname === item.href

                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => navigateTo(item.href)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-4 rounded-xl
                      text-left text-base poppins-semibold
                      transition-colors active:scale-[0.98]
                      ${isActive
                        ? "bg-emerald-700 text-white shadow-md"
                        : "bg-emerald-50 text-emerald-900 active:bg-emerald-100 hover:bg-emerald-100"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {item.label}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
                    )}
                  </button>
                )
              })}

              {/* CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo("/quiz")}
                  className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white poppins-semibold text-base active:opacity-90 transition-opacity shadow-lg"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  Start Free Assessment
                </button>
              </div>

              {/* Contact */}
              <div className="pt-4 mt-2 border-t border-emerald-100 space-y-2">
                <p className="poppins-medium text-xs text-emerald-500 uppercase tracking-wide px-1">
                  Contact
                </p>
                <a
                  href="mailto:hello@millstonecompliance.com"
                  onClick={handleClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-800 poppins-regular text-sm active:bg-emerald-100 transition-colors"
                >
                  <Mail className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  hello@millstonecompliance.com
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
})
