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
  title: "UK Packaging Compliance | PPT, EPR & PRN Support",
  description:
    "Millstone Compliance helps UK brands stay compliant with Plastic Packaging Tax, EPR and PRN rules. Free 3-minute assessment to find gaps before HMRC does.",
  keywords: [
    "plastic packaging tax",
    "PPT compliance",
    "UK plastic tax",
    "EPR compliance",
    "PRN compliance",
    "packaging compliance UK",
    "PPT audit",
    "HMRC compliance",
    "plastic tax penalties",
    "recycled content certificates",
    "PPT registration",
    "plastic packaging tax rates",
    "EPR regulations",
    "PRN obligations",
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
    title: "UK Packaging Compliance | PPT, EPR & PRN Support",
    description: "Millstone Compliance helps UK brands stay compliant with Plastic Packaging Tax, EPR and PRN rules. Free 3-minute assessment to find gaps before HMRC does.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "UK Packaging Compliance | PPT, EPR & PRN Support",
    description: "Millstone Compliance helps UK brands stay compliant with Plastic Packaging Tax, EPR and PRN rules. Free 3-minute assessment to find gaps before HMRC does.",
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
