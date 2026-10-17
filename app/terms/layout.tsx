import type { Metadata } from "next"

const title = "Terms of Service | Millstone Compliance"
const description =
  "Terms for our digital waste tracking services: DWT Reporting, Health Check, Setup and Paperwork Support. Free trial, fees, and who does what."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://millstonecompliance.com/terms" },
  openGraph: {
    title,
    description,
    url: "https://millstonecompliance.com/terms",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: { card: "summary", title, description },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
