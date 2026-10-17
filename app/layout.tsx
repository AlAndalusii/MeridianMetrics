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
  metadataBase: new URL("https://millstonecompliance.com"),
  title: "Digital Waste Tracking Done for You | Millstone Compliance",
  description:
    "Send your weighbridge tickets on WhatsApp and we report every load to Defra's digital waste tracking on time. Free two-week trial for permitted waste sites.",
  keywords: [
    "digital waste tracking",
    "digital waste tracking help",
    "digital waste tracking reporting",
    "DWT support Birmingham",
    "report receipt of waste",
    "waste tracking for permitted sites",
    "waste tracking for scrap yards",
    "waste transfer station reporting",
    "skip yard waste tracking",
    "EWC codes",
    "Millstone Compliance",
  ],
  alternates: { canonical: "https://millstonecompliance.com" },
  // Set GOOGLE_SITE_VERIFICATION in the hosting environment to verify Google Search Console
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
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
    title: "Digital Waste Tracking Done for You | Millstone Compliance",
    description: "Send your weighbridge tickets on WhatsApp and we report every load to Defra's digital waste tracking on time. Free two-week trial for permitted waste sites.",
    url: "https://millstonecompliance.com",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Waste Tracking Done for You | Millstone Compliance",
    description: "Send your weighbridge tickets on WhatsApp and we report every load to Defra's digital waste tracking on time. Free two-week trial for permitted waste sites.",
  },
}

// One consistent identity for Google: who we are, what we do, who for, where.
const IDENTITY =
  "Millstone Compliance: digital waste tracking reporting and compliance support for permitted waste sites, based in Birmingham."

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://millstonecompliance.com/#organization",
      name: "Millstone Compliance",
      legalName: "Millstone Compliance Ltd",
      identifier: { "@type": "PropertyValue", propertyID: "Companies House number", value: "17417582" },
      address: {
        "@type": "PostalAddress",
        streetAddress: "82, Suite A James Carter Road",
        addressLocality: "Mildenhall",
        postalCode: "IP28 7DE",
        addressCountry: "GB",
      },
      url: "https://millstonecompliance.com",
      email: "hello@millstonecompliance.com",
      telephone: "+447762270113",
      description: IDENTITY,
      founder: { "@id": "https://millstonecompliance.com/#zak" },
      sameAs: [
        "https://www.linkedin.com/in/zak-millstone",
        "https://find-and-update.company-information.service.gov.uk/company/17417582",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://millstonecompliance.com/#zak",
      name: "Zak",
      jobTitle: "Founder",
      worksFor: { "@id": "https://millstonecompliance.com/#organization" },
      url: "https://millstonecompliance.com/about",
      sameAs: ["https://www.linkedin.com/in/zak-millstone"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://millstonecompliance.com/#service",
      name: "Millstone Compliance",
      url: "https://millstonecompliance.com",
      description: IDENTITY,
      telephone: "+447762270113",
      email: "hello@millstonecompliance.com",
      parentOrganization: { "@id": "https://millstonecompliance.com/#organization" },
      founder: { "@id": "https://millstonecompliance.com/#zak" },
      address: { "@type": "PostalAddress", addressLocality: "Birmingham", addressCountry: "GB" },
      areaServed: [
        { "@type": "City", name: "Birmingham" },
        { "@type": "Country", name: "United Kingdom" },
      ],
      knowsAbout: ["Digital waste tracking", "EWC codes", "Waste transfer notes", "Quarterly waste returns"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital waste tracking services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DWT Reporting", description: "Every load entered and submitted to Defra for you, with a Friday confirmation." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DWT Health Check", description: "A sample week of loads checked against your tickets and permit, with a short written report." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "DWT Setup", description: "Help with Defra registration, a pre-filled code template and a weighbridge handover." } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paperwork Support", description: "Quarterly waste returns and regular hauliers and customers set up before their first load." } },
        ],
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
