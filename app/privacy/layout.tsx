import type { Metadata } from "next"

const title = "Privacy Policy | Millstone Compliance"
const description =
  "How Millstone Compliance Ltd handles your data when we report your waste loads to Defra, answer enquiries and run this website. Your rights under UK GDPR."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://millstonecompliance.com/privacy" },
  openGraph: {
    title,
    description,
    url: "https://millstonecompliance.com/privacy",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: { card: "summary", title, description },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
