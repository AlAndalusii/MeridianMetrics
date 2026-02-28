"use client"

import { useEffect } from 'react'

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preconnect to external domains for faster loading
    const preconnectDomains = [
      'https://assets.calendly.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // Prefetch critical resources
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      // Only prefetch on fast connections
      if (connection && connection.effectiveType === '4g') {
        const criticalPages = [
          '/resources',
          '/quiz',
          '/support',
          '/services',
          '/templates',
        ]
        criticalPages.forEach(page => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.href = page
          document.head.appendChild(link)
        })
      }
    }

    // Optimize scroll performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
