import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Zak | Millstone Compliance",
  description: "Meet Zak, the ex-HMRC founder of Millstone Compliance. He turns WhatsApp ticket photos into on-time Defra reports for permitted waste sites. Birmingham based.",
  keywords: ["Millstone Compliance Zak", "Millstone Compliance founder", "digital waste tracking help"],
  alternates: { canonical: "https://millstonecompliance.com/about" },
  openGraph: {
    title: "About Zak | Millstone Compliance",
    description: "Meet Zak, the ex-HMRC founder of Millstone Compliance. He turns WhatsApp ticket photos into on-time Defra reports for permitted waste sites. Birmingham based.",
    url: "https://millstonecompliance.com/about",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Zak | Millstone Compliance",
    description: "Meet Zak, the ex-HMRC founder of Millstone Compliance. He turns WhatsApp ticket photos into on-time Defra reports for permitted waste sites. Birmingham based.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
