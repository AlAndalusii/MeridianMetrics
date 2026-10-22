import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Free Two-Week Trial: Every Load Reported | Millstone Compliance",
  description: "Hold a waste permit but no waste team? Email your tickets for two weeks and every load goes to Defra on time, with proof every Friday. No card, no contract.",
  keywords: ["digital waste tracking free trial", "waste permit reporting help", "someone to do my waste reporting"],
  alternates: { canonical: "https://millstonecompliance.com/free-trial" },
  openGraph: {
    title: "Free Two-Week Trial: Every Load Reported | Millstone Compliance",
    description: "Hold a waste permit but no waste team? Email your tickets for two weeks and every load goes to Defra on time, with proof every Friday. No card, no contract.",
    url: "https://millstonecompliance.com/free-trial",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Two-Week Trial: Every Load Reported | Millstone Compliance",
    description: "Hold a waste permit but no waste team? Email your tickets for two weeks and every load goes to Defra on time, with proof every Friday. No card, no contract.",
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
