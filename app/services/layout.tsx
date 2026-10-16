import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Digital Waste Tracking Services for Waste Sites | Millstone Compliance",
  description: "DWT Reporting done for you, DWT Health Check, DWT Setup and Paperwork Support for permitted waste sites. Free two-week trial, then a fixed monthly fee.",
  keywords: ["digital waste tracking help", "DWT support", "digital waste tracking reporting", "DWT Health Check", "DWT Setup", "someone to do my waste tracking"],
  alternates: { canonical: "https://millstonecompliance.com/services" },
  openGraph: {
    title: "Digital Waste Tracking Services for Waste Sites | Millstone Compliance",
    description: "DWT Reporting done for you, DWT Health Check, DWT Setup and Paperwork Support for permitted waste sites. Free two-week trial, then a fixed monthly fee.",
    url: "https://millstonecompliance.com/services",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Waste Tracking Services for Waste Sites | Millstone Compliance",
    description: "DWT Reporting done for you, DWT Health Check, DWT Setup and Paperwork Support for permitted waste sites. Free two-week trial, then a fixed monthly fee.",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
