"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Home, FileText, Building2, Briefcase } from "lucide-react"
import { MillstoneLogo } from "@/components/logo/MeridianLogo"
import { MobileMenu } from "@/components/MobileMenu"

/* ─── Services dropdown items ─────────────────────────────────────────── */
const serviceItems = [
  {
    href: "/services",
    label: "Property",
    description: "HMO & landlord audits",
    icon: Briefcase,
    /* iOS app-icon gradient + shadow */
    iconGradient: "from-emerald-400 to-emerald-600",
    iconShadow: "shadow-[0_4px_10px_rgba(5,150,105,0.45)]",
    activeBg: "bg-emerald-50/70",
    activeLabel: "text-emerald-700",
    isActive: (p: string) => p.startsWith("/services") && !p.startsWith("/templates") && !p.startsWith("/care-homes"),
  },
  {
    href: "/templates",
    label: "Templates",
    description: "Instant downloads from £27",
    icon: FileText,
    iconGradient: "from-amber-400 to-orange-500",
    iconShadow: "shadow-[0_4px_10px_rgba(245,158,11,0.45)]",
    activeBg: "bg-amber-50/70",
    activeLabel: "text-amber-700",
    isActive: (p: string) => p.startsWith("/templates"),
  },
  {
    href: "/care-homes",
    label: "Care Homes",
    description: "Waste & compliance",
    icon: Building2,
    iconGradient: "from-rose-400 to-rose-600",
    iconShadow: "shadow-[0_4px_10px_rgba(244,63,94,0.45)]",
    activeBg: "bg-rose-50/70",
    activeLabel: "text-rose-700",
    isActive: (p: string) => p.startsWith("/care-homes"),
  },
]

export function Navigation() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `poppins-medium text-[13px] tracking-wide transition-colors duration-200 ${
      pathname === href || (href !== "/" && pathname.startsWith(href))
        ? "text-slate-900"
        : "text-slate-500 hover:text-slate-900"
    }`

  const isServicesActive =
    pathname.startsWith("/services") ||
    pathname.startsWith("/templates") ||
    pathname.startsWith("/care-homes")

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

            {/* ── Services dropdown ────────────────────────────────── */}
            <div className="relative group">
              <button
                type="button"
                className={`flex items-center gap-1 poppins-medium text-[13px] tracking-wide transition-colors duration-200 ${
                  isServicesActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Services
                <ChevronDown
                  className="w-3 h-3 mt-px transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-180"
                />
              </button>

              {/*
               * Dropdown panel.
               * Animation: scale 96→100 + translateY 4px→0 + opacity 0→1
               * origin-top so the panel "grows" downward from the button.
               */}
              <div
                className="
                  absolute left-1/2 -translate-x-1/2 top-full pt-3
                  opacity-0 pointer-events-none
                  scale-[0.96] translate-y-1 origin-top
                  group-hover:opacity-100 group-hover:pointer-events-auto
                  group-hover:scale-100 group-hover:translate-y-0
                  transition-all duration-200 ease-out z-50
                "
              >
                {/* Panel shell — no border, just ring + shadow */}
                <div className="
                  bg-white rounded-[18px] p-2
                  ring-1 ring-black/[0.06]
                  shadow-[0_8px_30px_rgba(0,0,0,0.10),0_20px_60px_rgba(0,0,0,0.07),0_1px_3px_rgba(0,0,0,0.05)]
                  min-w-[260px] overflow-hidden
                ">

                  {serviceItems.map((item, idx) => {
                    const Icon = item.icon
                    const active = item.isActive(pathname)

                    return (
                      <React.Fragment key={item.href}>
                        {/* Subtle hairline separator between items */}
                        {idx > 0 && (
                          <div className="mx-3 h-px bg-slate-100/80 my-0.5" />
                        )}

                        <Link
                          href={item.href}
                          className={`
                            group/item flex items-center gap-3.5 px-3 py-2.5 rounded-xl
                            transition-all duration-150
                            ${active ? item.activeBg : "hover:bg-slate-50/80"}
                          `}
                        >
                          {/* iOS app-icon style: gradient bg + white icon + colored drop shadow */}
                          <div
                            className={`
                              w-[38px] h-[38px] rounded-[10px] flex-shrink-0
                              bg-gradient-to-br ${item.iconGradient} ${item.iconShadow}
                              flex items-center justify-center
                            `}
                          >
                            <Icon className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
                          </div>

                          {/* Label + description */}
                          <div className="flex-1 min-w-0">
                            <p className={`
                              poppins-semibold text-[13px] leading-none mb-[3px]
                              ${active ? item.activeLabel : "text-slate-800 group-hover/item:text-slate-900"}
                              transition-colors duration-150
                            `}>
                              {item.label}
                            </p>
                            <p className="poppins-regular text-[11px] text-slate-400 leading-none">
                              {item.description}
                            </p>
                          </div>

                          {/* Chevron — slides in on row hover */}
                          <ChevronRight
                            className="
                              w-3.5 h-3.5 flex-shrink-0 text-slate-300
                              opacity-0 -translate-x-1
                              group-hover/item:opacity-100 group-hover/item:translate-x-0
                              transition-all duration-150
                            "
                          />
                        </Link>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
            </div>

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
