"use client"

import React, { useState, useEffect, useCallback, memo } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Home, FileCheck, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/resources", label: "Resources", icon: FileCheck },
  { href: "/quiz", label: "Free Assessment", icon: ClipboardCheck },
]

export const MobileMenu = memo(function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.touchAction = 'auto'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.touchAction = 'auto'
    }
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const handleQuizClick = useCallback(() => {
    setIsOpen(false)
    router.push("/quiz")
  }, [router])

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        onClick={handleToggle}
        className="lg:hidden poppins-semibold bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-md p-2 min-h-[44px] min-w-[44px] touch-manipulation"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        style={{ 
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-[73px] left-0 right-0 bottom-0 bg-white z-50 lg:hidden overflow-y-auto animate-slide-in-right">
            <nav className="px-4 py-6 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClose}
                    className={`
                      flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 touch-manipulation
                      ${isActive 
                        ? 'bg-emerald-700 text-white shadow-lg' 
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 active:bg-emerald-200'
                      }
                    `}
                    style={{ 
                      WebkitTapHighlightColor: 'transparent'
                    }}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="poppins-semibold text-lg">{item.label}</span>
                  </Link>
                )
              })}

              {/* CTA Button */}
              <div className="pt-4">
                <Button
                  onClick={handleQuizClick}
                  className="w-full poppins-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-6 text-lg shadow-xl touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  Start Free Assessment
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="pt-6 mt-6 border-t border-emerald-100">
                <p className="poppins-medium text-sm text-emerald-600 mb-3">Quick Contact</p>
                <a
                  href="mailto:info@millstonecompliance.com"
                  className="block px-4 py-3 bg-emerald-50 rounded-lg text-emerald-900 poppins-regular text-sm hover:bg-emerald-100 active:bg-emerald-200 transition-colors touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  info@millstonecompliance.com
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
})
