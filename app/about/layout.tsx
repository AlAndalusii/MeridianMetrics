import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Zak | Millstone Compliance",
  description: "Zak is the founder of Millstone Compliance: digital waste tracking reporting and compliance support for permitted waste sites, based in Birmingham. Ex-HMRC.",
  keywords: ["Millstone Compliance Zak", "Millstone Compliance founder", "digital waste tracking help"],
  alternates: { canonical: "https://millstonecompliance.com/about" },
  openGraph: {
    title: "About Zak | Millstone Compliance",
    description: "Zak is the founder of Millstone Compliance: digital waste tracking reporting and compliance support for permitted waste sites, based in Birmingham. Ex-HMRC.",
    url: "https://millstonecompliance.com/about",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Zak | Millstone Compliance",
    description: "Zak is the founder of Millstone Compliance: digital waste tracking reporting and compliance support for permitted waste sites, based in Birmingham. Ex-HMRC.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
