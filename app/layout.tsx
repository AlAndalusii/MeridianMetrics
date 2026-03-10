import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import CalendlyWidget from "@/components/CalendlyWidget"
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer"

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
  title: "UK Waste Compliance for Care Homes & Agencies | Independent Audits",
  description:
    "Millstone Compliance provides independent waste compliance audits for UK care homes, children's homes and estate agents. Duty of Care, clinical waste, Simpler Recycling. 48hr reports from £295.",
  keywords: [
    "waste compliance UK",
    "care home waste compliance",
    "clinical waste compliance",
    "duty of care waste",
    "simpler recycling compliance",
    "waste transfer notes",
    "waste compliance audit",
    "HMO waste compliance",
    "children's home waste compliance",
    "estate agent waste compliance",
    "CQC waste compliance",
    "Ofsted waste compliance",
    "HTM 07-01 compliance",
    "clinical waste audit",
    "environmental compliance UK",
    "waste carrier registration",
    "hazardous waste compliance",
    "waste consignment notes",
    "EA enforcement waste",
    "simpler recycling 2026",
    "waste compliance certificate",
    "independent waste auditor",
    "48hr compliance report",
    "waste compliance care homes UK"
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
    title: "UK Waste Compliance for Care Homes & Agencies | Independent Audits",
    description: "Millstone Compliance provides independent waste compliance audits for UK care homes, children's homes and estate agents. Duty of Care, clinical waste, Simpler Recycling. 48hr reports from £295.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Waste Compliance for Care Homes & Agencies | Independent Audits",
    description: "Millstone Compliance provides independent waste compliance audits for UK care homes, children's homes and estate agents. Duty of Care, clinical waste, Simpler Recycling. 48hr reports from £295.",
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
        {children}
        <CalendlyWidget />
      </body>
    </html>
  )
}
