"use client"

import { useEffect } from 'react'

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement
        prefill?: any
        utm?: any
      }) => void
    }
  }
}

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Load Calendly script dynamically
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => {
        const widget = document.getElementById('calendly-inline-widget')
        if (widget && window.Calendly) {
          window.Calendly.initInlineWidget({
            url: 'https://calendly.com/zak-millstonecompliance?background_color=217529&text_color=fcfafa&primary_color=fafbfd',
            parentElement: widget
          })
        }
      }
      document.head.appendChild(script)

      // Load Calendly CSS
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)

      return () => {
        // Cleanup
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
        if (document.head.contains(link)) {
          document.head.removeChild(link)
        }
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      
      {/* Modal container */}
      <div className="relative w-full max-w-4xl animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close calendar"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-emerald-100/50 flex items-center justify-center group/close hover:bg-white transition-all duration-300 hover:scale-110 hover:rotate-90 min-h-[44px] min-w-[44px]"
        >
          <svg
            className="w-5 h-5 text-emerald-600 group-hover/close:text-emerald-700 transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Calendly widget */}
        <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-emerald-100/50 shadow-[0_24px_64px_rgba(6,95,70,0.2)] overflow-hidden">
          <div 
            id="calendly-inline-widget" 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/zak-millstonecompliance?background_color=217529&text_color=fcfafa&primary_color=fafbfd" 
            style={{minWidth: '320px', height: '700px'}}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default function CalendlyWidget() {
  return null
}
