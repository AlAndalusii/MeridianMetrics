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
  title: "Every Load Reported, On Time | Digital Waste Tracking | Millstone",
  description:
    "Permitted waste sites must report every load to Defra within two working days. Send me your tickets on WhatsApp and I'll make sure every load is in on time. Two weeks free.",
  keywords: [
    "digital waste tracking",
    "digital waste tracking service",
    "Defra waste tracking reporting",
    "waste tracking for permitted sites",
    "waste tracking two working days",
    "scrap metal yard waste tracking",
    "waste transfer station reporting",
    "skip hire waste tracking",
    "EWC codes",
    "quarterly waste returns",
    "waste transfer notes",
    "waste tracking Birmingham",
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
    title: "Every Load Reported, On Time | Digital Waste Tracking | Millstone",
    description: "Permitted waste sites must report every load to Defra within two working days. Send me your tickets on WhatsApp and I'll make sure every load is in on time. Two weeks free.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Every Load Reported, On Time | Digital Waste Tracking | Millstone",
    description: "Permitted waste sites must report every load to Defra within two working days. Send me your tickets on WhatsApp and I'll make sure every load is in on time. Two weeks free.",
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
