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
  title: "Waste Bill Checks for Birmingham Businesses | Millstone",
  description:
    "We check your business waste bill, find what you're overpaying for and move you to a better deal. Then we watch your renewal date. Free first check.",
  keywords: [
    "waste bill audit Birmingham",
    "business waste bill check",
    "cheaper bin collection Birmingham",
    "commercial waste contract review",
    "waste contract auto renewal",
    "business waste collection Birmingham",
    "trade waste prices Birmingham",
    "waste broker Birmingham",
    "restaurant waste collection Birmingham",
    "office waste collection Birmingham",
    "simpler recycling England",
    "waste transfer notes",
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
    title: "Waste Bill Checks for Birmingham Businesses | Millstone",
    description: "We check your business waste bill, find what you're overpaying for and move you to a better deal. Then we watch your renewal date. Free first check.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waste Bill Checks for Birmingham Businesses | Millstone",
    description: "We check your business waste bill, find what you're overpaying for and move you to a better deal. Then we watch your renewal date. Free first check.",
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
