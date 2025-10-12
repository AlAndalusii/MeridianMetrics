"use client"

import React, { useState, useEffect } from "react"
import { AlertTriangle, Building, CheckCircle } from "lucide-react"

interface ProcessSectionProps {
  activeStep: number
}

export function ProcessSection({ activeStep }: ProcessSectionProps) {
  return (
    <section id="process" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white via-emerald-50/20 to-white relative overflow-hidden group/process">
      {/* Apple-inspired minimal background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.02)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.01)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      {/* Floating premium data visualization */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Glassmorphic floating progress indicator - Hidden on mobile to prevent collision */}
        <div className="hidden lg:block absolute top-32 right-[8%] w-36 h-32 bg-white/60 backdrop-blur-2xl rounded-2xl border border-emerald-100/50 shadow-[0_8px_32px_rgba(6,95,70,0.08)] animate-float-slow p-4">
          <div className="text-[10px] text-emerald-600 poppins-semibold uppercase tracking-wider mb-2">Progress</div>
          <div className="flex items-baseline gap-1 mb-3">
            <div className="text-3xl poppins-bold text-emerald-900">3</div>
            <div className="text-sm text-emerald-600 poppins-medium">Steps</div>
          </div>
          <div className="flex gap-1.5">
            {[1,2,3].map((i) => (
              <div key={i} className="flex-1 h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{width: i <= activeStep + 1 ? '100%' : '0%', transition: 'width 0.5s'}}></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Geometric accent shapes */}
        <div className="absolute bottom-40 left-[6%] w-28 h-28 opacity-20">
          <div className="absolute inset-0 border border-emerald-200 rounded-2xl animate-spin-slow"></div>
          <div className="absolute inset-4 border border-emerald-300/50 rounded-xl animate-spin-slow-reverse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Premium header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-50/80 backdrop-blur-xl border border-emerald-100/50 mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
            <span className="poppins-medium text-[10px] sm:text-xs text-emerald-800 tracking-wide uppercase">Our Process</span>
          </div>
          <h2 className="poppins-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 text-emerald-900 tracking-tight">Our Implementation Approach</h2>
          <p className="poppins-regular text-base sm:text-lg md:text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed px-4">
            We organise your PPT documentation efficiently. No lengthy consultations. No theory. Just practical systems that work for your business.
          </p>
        </div>

        {/* Premium steps with connecting line */}
        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-200">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-shimmer"></div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 relative">
            {[
              {
                step: "Express Assessment",
                title: "Express Assessment",
                description: "90-minute call where we identify your top 3 problems and give you a checklist to sort them yourself.",
                icon: AlertTriangle,
                accentColor: "emerald",
              },
              {
                step: "Comprehensive Review",
                title: "Comprehensive Review",
                description: "We review every certificate and record you have, find all the gaps, then give you a written report showing exactly what to do.",
                icon: Building,
                accentColor: "green",
              },
              {
                step: "Managed Compliance",
                title: "Managed Compliance",
                description: "We monitor your compliance quarterly - tracking certificate expiry, filing deadlines, and regulatory changes so nothing falls through the cracks.",
                icon: CheckCircle,
                accentColor: "blue",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`group/step relative transition-all duration-500 ${
                  activeStep === index ? "scale-105" : "scale-100"
                }`}
              >
                {/* Card glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 rounded-3xl blur-2xl opacity-0 group-hover/step:opacity-100 transition-opacity duration-700" aria-hidden="true"></div>
                
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl sm:rounded-[28px] border border-emerald-100/50 shadow-[0_4px_40px_rgba(6,95,70,0.06)] hover:shadow-[0_12px_60px_rgba(6,95,70,0.12)] transition-all duration-500 sm:hover:-translate-y-2 overflow-hidden p-5 sm:p-6 md:p-8">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-emerald-50/30 to-emerald-50/0 opacity-0 group-hover/step:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>
                  
                  <div className="relative text-center">
                    {/* Icon with premium styling */}
                    <div className="relative mb-6 inline-block">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-emerald-400/10 rounded-2xl blur-xl" aria-hidden="true"></div>
                      <div className={`relative w-20 h-20 rounded-2xl mx-auto flex items-center justify-center bg-gradient-to-br from-${item.accentColor}-50 to-${item.accentColor}-100/50 border border-${item.accentColor}-200/50 shadow-lg group-hover/step:shadow-xl group-hover/step:scale-110 transition-all duration-500 ${
                        activeStep === index ? "shadow-emerald-500/25 ring-2 ring-emerald-400/30 ring-offset-2" : ""
                      }`}>
                        <item.icon className={`w-9 h-9 text-${item.accentColor}-600 group-hover/step:scale-110 transition-transform duration-500`} />
                      </div>
                      {/* Step number badge */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-all duration-500 ${
                        activeStep === index 
                          ? "bg-emerald-500 scale-110" 
                          : "bg-gradient-to-br from-emerald-400 to-emerald-500"
                      }`}>
                        <span className="text-white text-xs poppins-bold">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Step label */}
                    <div className={`inline-block px-4 py-2 rounded-full text-sm mb-4 transition-all duration-500 ${
                      activeStep === index
                        ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white poppins-semibold shadow-lg shadow-emerald-500/30"
                        : "bg-emerald-50/80 text-emerald-700 poppins-medium border border-emerald-100/50"
                    }`}>
                      {item.step}
                    </div>
                    
                    {/* Title */}
                    <h3 className="poppins-semibold text-xl text-emerald-900 mb-3 group-hover/step:text-emerald-700 transition-colors duration-300">{item.title}</h3>
                    
                    {/* Description */}
                    <p className="poppins-regular text-emerald-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-300/0 to-transparent group-hover/step:via-emerald-400 transition-all duration-700" aria-hidden="true"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

