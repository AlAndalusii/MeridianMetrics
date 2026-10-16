import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Free Two-Week Trial of DWT Reporting | Millstone Compliance",
  description: "Try digital waste tracking reporting free for two weeks. Send your tickets on WhatsApp and every load goes to Defra on time. No card, no contract.",
  keywords: ["digital waste tracking free trial"],
  alternates: { canonical: "https://millstonecompliance.com/waste-contract-audit" },
  openGraph: {
    title: "Free Two-Week Trial of DWT Reporting | Millstone Compliance",
    description: "Try digital waste tracking reporting free for two weeks. Send your tickets on WhatsApp and every load goes to Defra on time. No card, no contract.",
    url: "https://millstonecompliance.com/waste-contract-audit",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Two-Week Trial of DWT Reporting | Millstone Compliance",
    description: "Try digital waste tracking reporting free for two weeks. Send your tickets on WhatsApp and every load goes to Defra on time. No card, no contract.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
