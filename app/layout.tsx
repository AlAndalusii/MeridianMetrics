import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer"
import { BookingProvider } from "@/components/BookingProvider"

const inter = Inter({ subsets: ["latin"] })

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: "Waste Compliance Audits for UK Businesses | Millstone Compliance",
  description:
    "Independent waste compliance audits for UK SMEs. Duty of Care, Simpler Recycling, clinical waste & more. Fixed-fee, 48hr reports, no hidden costs.",
  keywords: [
    "waste compliance UK",
    "UK business waste compliance",
    "SME waste compliance",
    "waste compliance audit",
    "duty of care waste",
    "simpler recycling compliance",
    "clinical waste compliance",
    "waste transfer notes",
    "environmental compliance UK",
    "waste carrier registration",
    "hazardous waste compliance",
    "waste consignment notes",
    "EA enforcement waste",
    "simpler recycling 2026",
    "waste compliance certificate",
    "independent waste auditor",
    "48hr compliance report",
    "small business waste compliance UK",
    "waste audit UK",
    "waste regulations UK businesses",
    "care home waste compliance",
    "HMO waste compliance",
    "HTM 07-01 compliance",
    "CQC waste compliance"
  ],
  generator: 'v0.app',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Millstone Compliance',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Waste Compliance Audits for UK Businesses | Millstone Compliance",
    description: "Independent waste compliance audits for UK SMEs. Duty of Care, Simpler Recycling, clinical waste & more. Fixed-fee, 48hr reports, no hidden costs.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waste Compliance Audits for UK Businesses | Millstone Compliance",
    description: "Independent waste compliance audits for UK SMEs. Duty of Care, Simpler Recycling, clinical waste & more. Fixed-fee, 48hr reports, no hidden costs.",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#065f46',
  // Prevents the viewport shrinking when the mobile keyboard opens
  interactiveWidget: 'resizes-content',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Leadsy AI tracking pixel */}
        <script id="vtag-ai-js" async src="https://r2.leadsy.ai/tag.js" data-pid="VQZIvjTxZsSFes9D" data-version="062024" />
      </head>
      <body className={poppins.className}>
        <PerformanceOptimizer />
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  )
}
