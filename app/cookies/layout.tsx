import type { Metadata } from "next"

const title = "Cookie Policy | Millstone Compliance"
const description =
  "The cookies and tracking used on the Millstone Compliance website, why we use them, and how to control them. No Google Analytics, no advertising cookies."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://millstonecompliance.com/cookies" },
  openGraph: {
    title,
    description,
    url: "https://millstonecompliance.com/cookies",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: { card: "summary", title, description },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
