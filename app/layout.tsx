import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

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
  title: "Plastic Packaging Tax Compliance UK | PPT Audit & Consulting Services",
  description:
    "Expert Plastic Packaging Tax compliance services for UK businesses. Get audit-ready PPT documentation, HMRC compliance support, and avoid penalties. Free assessment available.",
  keywords: [
    "plastic packaging tax",
    "PPT compliance",
    "UK plastic tax",
    "plastic packaging tax consultant",
    "PPT audit",
    "HMRC compliance",
    "plastic tax penalties",
    "recycled content certificates",
    "PPT registration",
    "plastic packaging tax rates",
    "PPT compliance consultant",
    "plastic tax exemptions",
    "PPT documentation",
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
    title: "Plastic Packaging Tax Compliance UK | PPT Audit & Consulting Services",
    description: "Expert Plastic Packaging Tax compliance services for UK businesses. Get audit-ready PPT documentation, HMRC compliance support, and avoid penalties. Free assessment available.",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plastic Packaging Tax Compliance UK | PPT Audit & Consulting Services",
    description: "Expert Plastic Packaging Tax compliance services for UK businesses. Get audit-ready PPT documentation, HMRC compliance support, and avoid penalties.",
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
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
