import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Waste Paperwork Support for Permit Holders | Millstone Compliance",
  description: "For businesses Millstone already reports for: quarterly waste returns and records kept tidy from data already held, so you're ready if the regulator asks.",
  keywords: ["quarterly waste returns help", "waste site paperwork support"],
  alternates: { canonical: "https://millstonecompliance.com/services/documentation" },
  openGraph: {
    title: "Waste Paperwork Support for Permit Holders | Millstone Compliance",
    description: "For businesses Millstone already reports for: quarterly waste returns and records kept tidy from data already held, so you're ready if the regulator asks.",
    url: "https://millstonecompliance.com/services/documentation",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waste Paperwork Support for Permit Holders | Millstone Compliance",
    description: "For businesses Millstone already reports for: quarterly waste returns and records kept tidy from data already held, so you're ready if the regulator asks.",
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return children
}
