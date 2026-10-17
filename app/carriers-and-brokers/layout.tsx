import { Metadata } from 'next'

const title = "Digital Waste Tracking for Carriers in 2027 | Millstone Compliance"
const description =
  "Digital waste tracking is mandatory for waste carriers, brokers and dealers from October 2027. What's changing, what you need, and a free list to get ready."

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "digital waste tracking carriers",
    "waste carrier digital waste tracking 2027",
    "waste broker digital waste tracking",
    "waste dealer digital waste tracking",
    "skip hire digital waste tracking",
  ],
  alternates: { canonical: "https://millstonecompliance.com/carriers-and-brokers" },
  openGraph: {
    title,
    description,
    url: "https://millstonecompliance.com/carriers-and-brokers",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: { card: "summary_large_image", title, description },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "When does digital waste tracking start for waste carriers, brokers and dealers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Defra plans a private beta from autumn 2026, a public beta for all waste collectors from spring 2027, and mandatory use from October 2027.",
      },
    },
    {
      "@type": "Question",
      name: "Do carriers still need waste transfer notes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. For now, paper waste transfer notes and consignment notes are still needed alongside digital waste tracking.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to be registered as a waste carrier, broker or dealer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you transport, buy, sell or arrange waste you must register with your nation's regulator. In England you can get an unlimited fine if you do not register.",
      },
    },
  ],
}

export default function CarriersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  )
}
