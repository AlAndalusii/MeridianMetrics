import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Waste Reporting Services for Permit Holders | Millstone Compliance",
  description: "Every load reported to Defra on time, plus health checks, setup and paperwork for anyone with a waste permit but no waste team. Free two-week trial.",
  keywords: ["digital waste tracking help", "DWT support", "digital waste tracking reporting", "DWT Health Check", "DWT Setup", "someone to do my waste tracking", "waste permit reporting"],
  alternates: { canonical: "https://millstonecompliance.com/services" },
  openGraph: {
    title: "Waste Reporting Services for Permit Holders | Millstone Compliance",
    description: "Every load reported to Defra on time, plus health checks, setup and paperwork for anyone with a waste permit but no waste team. Free two-week trial.",
    url: "https://millstonecompliance.com/services",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waste Reporting Services for Permit Holders | Millstone Compliance",
    description: "Every load reported to Defra on time, plus health checks, setup and paperwork for anyone with a waste permit but no waste team. Free two-week trial.",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
