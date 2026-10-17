import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "6 Checks on Every Load Before It Goes to Defra | Millstone Compliance",
  description: "The six checks on every load before it goes to Defra: date, weight, EWC code, R/D code, who brought it, and your permit and deadline.",
  keywords: ["digital waste tracking checks", "EWC and R/D codes"],
  alternates: { canonical: "https://millstonecompliance.com/what-we-check" },
  openGraph: {
    title: "6 Checks on Every Load Before It Goes to Defra | Millstone Compliance",
    description: "The six checks on every load before it goes to Defra: date, weight, EWC code, R/D code, who brought it, and your permit and deadline.",
    url: "https://millstonecompliance.com/what-we-check",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "6 Checks on Every Load Before It Goes to Defra | Millstone Compliance",
    description: "The six checks on every load before it goes to Defra: date, weight, EWC code, R/D code, who brought it, and your permit and deadline.",
  },
}

export default function WhatWeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
