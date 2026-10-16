import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Paperwork Support for Waste Sites | Millstone Compliance",
  description: "An add-on for sites Millstone already reports for: quarterly waste returns prepared from data already held, and regular hauliers and customers set up early.",
  keywords: ["quarterly waste returns help", "waste site paperwork support"],
  alternates: { canonical: "https://millstonecompliance.com/services/documentation" },
  openGraph: {
    title: "Paperwork Support for Waste Sites | Millstone Compliance",
    description: "An add-on for sites Millstone already reports for: quarterly waste returns prepared from data already held, and regular hauliers and customers set up early.",
    url: "https://millstonecompliance.com/services/documentation",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paperwork Support for Waste Sites | Millstone Compliance",
    description: "An add-on for sites Millstone already reports for: quarterly waste returns prepared from data already held, and regular hauliers and customers set up early.",
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return children
}
