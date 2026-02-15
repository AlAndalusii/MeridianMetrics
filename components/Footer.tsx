import React from "react"
import Link from "next/link"
import { Award, CheckCircle, Phone, Mail, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-emerald-50/50" role="contentinfo" aria-label="Site footer">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,95,70,0.03)_0%,transparent_50%)]"></div>
        {/* Tech grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50"></div>
        {/* Glowing scan lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan"></div>
        </div>
      </div>

      {/* Elegant top border with glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content - Minimalist & Modern */}
        <div className="pt-12 pb-8">
          
          {/* Navigation Section */}
          <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
            
            {/* Services */}
            <div>
              <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                Services
                <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Assessment", href: "/quiz" },
                  { label: "Compliance Audit", href: "#" },
                  { label: "Documentation", href: "#" },
                  { label: "Support", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-emerald-700/80 hover:text-emerald-900 text-sm poppins-regular transition-all duration-200"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                Resources
                <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "PPT Guide", href: "/resources/plastic-packaging-tax" },
                  { label: "All Resources", href: "/resources" },
                  { label: "Checklist", href: "#" },
                  { label: "HMRC Info", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-emerald-700/80 hover:text-emerald-900 text-sm poppins-regular transition-all duration-200"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                Company
                <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: "About", href: "/about" },
                  { label: "Approach", href: "#" },
                  { label: "Team", href: "#" },
                  { label: "Careers", href: "#" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="group flex items-center text-emerald-700/80 hover:text-emerald-900 text-sm poppins-regular transition-all duration-200"
                    >
                      <span className="relative">
                        {item.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="poppins-semibold text-emerald-900 text-xs uppercase tracking-widest mb-4 relative">
                Contact
                <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-emerald-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href={CONTACT_INFO.tel}
                    className="group flex items-center gap-2 text-emerald-700/80 hover:text-emerald-900 transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm poppins-regular">{CONTACT_INFO.phone}</span>
                  </a>
                </li>
                <li>
                  <a 
                    href={CONTACT_INFO.mailto}
                    className="group flex items-center gap-2 text-emerald-700/80 hover:text-emerald-900 transition-colors duration-200"
                  >
                    <Mail className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm poppins-regular break-all">{CONTACT_INFO.email}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-emerald-700/80">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm poppins-regular">UK Nationwide</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Section - Minimalist Legal */}
          <div className="pt-8 border-t border-emerald-200/40 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              
              {/* Copyright & Legal */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                <p className="text-emerald-700/60 text-xs poppins-regular">
                  © {new Date().getFullYear()} Millstone Compliance
                </p>
                <div className="flex items-center gap-4">
                  {[
                    { label: "Privacy", href: "#" },
                    { label: "Terms", href: "#" },
                    { label: "Cookies", href: "#" }
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-emerald-700/60 hover:text-emerald-900 text-xs poppins-regular transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 backdrop-blur-sm">
                  <Award className="h-3 w-3 text-emerald-600" />
                  <span className="text-[10px] poppins-medium text-emerald-700 uppercase tracking-wide">UK Compliant</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/60 backdrop-blur-sm">
                  <CheckCircle className="h-3 w-3 text-emerald-600" />
                  <span className="text-[10px] poppins-medium text-emerald-700 uppercase tracking-wide">Data Protected</span>
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>

      {/* Glowing bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent"></div>
    </footer>
  )
}

