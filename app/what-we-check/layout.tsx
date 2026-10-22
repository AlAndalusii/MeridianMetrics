import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "How I Work: 6 Checks on Every Load | Millstone Compliance",
  description: "You send a photo, I check it six ways and Defra gets it within two working days: date, weight, waste type, next step, carrier, permit and deadline.",
  keywords: ["digital waste tracking checks", "how waste reporting works", "two working days waste"],
  alternates: { canonical: "https://millstonecompliance.com/what-we-check" },
  openGraph: {
    title: "How I Work: 6 Checks on Every Load | Millstone Compliance",
    description: "You send a photo, I check it six ways and Defra gets it within two working days: date, weight, waste type, next step, carrier, permit and deadline.",
    url: "https://millstonecompliance.com/what-we-check",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "How I Work: 6 Checks on Every Load | Millstone Compliance",
    description: "You send a photo, I check it six ways and Defra gets it within two working days: date, weight, waste type, next step, carrier, permit and deadline.",
  },
}

export default function WhatWeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
