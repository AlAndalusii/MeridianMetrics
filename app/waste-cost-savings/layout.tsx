import React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Digital Waste Tracking Explained for Waste Sites | Millstone Compliance",
  description: "A plain English guide to digital waste tracking for permitted sites: who it affects, what to report, the two-working-day deadline, and October 2027 for carriers.",
  keywords: ["digital waste tracking explained", "report receipt of waste deadline", "digital waste tracking spreadsheet"],
  alternates: { canonical: "https://millstonecompliance.com/waste-cost-savings" },
  openGraph: {
    title: "Digital Waste Tracking Explained for Waste Sites | Millstone Compliance",
    description: "A plain English guide to digital waste tracking for permitted sites: who it affects, what to report, the two-working-day deadline, and October 2027 for carriers.",
    url: "https://millstonecompliance.com/waste-cost-savings",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Waste Tracking Explained for Waste Sites | Millstone Compliance",
    description: "A plain English guide to digital waste tracking for permitted sites: who it affects, what to report, the two-working-day deadline, and October 2027 for carriers.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
