import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import CalendlyWidget from "@/components/CalendlyWidget"

const inter = Inter({ subsets: ["latin"] })

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: "UK Packaging & Waste Compliance | EPR, PPT, Waste Regulations",
  description:
    "Millstone Compliance helps UK businesses with packaging (PPT, EPR, PRN) and waste regulations (Duty of Care, Digital Waste Tracking, Hazardous Waste, Simpler Recycling). Free compliance assessment.",
  keywords: [
    "packaging compliance UK",
    "waste regulations UK",
    "plastic packaging tax",
    "PPT compliance",
    "EPR compliance",
    "PRN compliance",
    "duty of care waste",
    "digital waste tracking",
    "hazardous waste compliance",
    "clinical waste HTM 07-01",
    "simpler recycling regulations",
    "waste transfer notes",
    "consignment notes",
    "environmental compliance UK",
    "packaging and waste regulations",
    "waste management compliance",
    "PPT audit",
    "HMRC compliance",
    "waste tracking October 2026",
    "EPA 1990 section 34",
    "3-bin waste separation",
    "waste carrier registration",
    "packaging tax penalties",
    "recycled content certificates",
    "plastic packaging tax 2025",
    "PPT quarterly returns"
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
    title: "UK Packaging & Waste Compliance | EPR, PPT, Waste Regulations",
    description: "Millstone Compliance helps UK businesses with packaging (PPT, EPR, PRN) and waste regulations (Duty of Care, Digital Waste Tracking, Hazardous Waste, Simpler Recycling). Free compliance assessment.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Packaging & Waste Compliance | EPR, PPT, Waste Regulations",
    description: "Millstone Compliance helps UK businesses with packaging (PPT, EPR, PRN) and waste regulations (Duty of Care, Digital Waste Tracking, Hazardous Waste, Simpler Recycling). Free compliance assessment.",
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#065f46',
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
      </head>
      <body className={poppins.className}>
        {children}
        <CalendlyWidget />
      </body>
    </html>
  )
}
