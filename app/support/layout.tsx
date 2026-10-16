import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Digital Waste Tracking Questions Answered | Millstone Compliance",
  description: "Straight answers for permitted waste sites: the two-working-day deadline, paper transfer notes, software, who is responsible, and what it costs.",
  keywords: ["do I still need waste transfer notes", "digital waste tracking questions"],
  alternates: { canonical: "https://millstonecompliance.com/support" },
  openGraph: {
    title: "Digital Waste Tracking Questions Answered | Millstone Compliance",
    description: "Straight answers for permitted waste sites: the two-working-day deadline, paper transfer notes, software, who is responsible, and what it costs.",
    url: "https://millstonecompliance.com/support",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Waste Tracking Questions Answered | Millstone Compliance",
    description: "Straight answers for permitted waste sites: the two-working-day deadline, paper transfer notes, software, who is responsible, and what it costs.",
  },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
