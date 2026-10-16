import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Digital Waste Tracking Guides for Waste Sites | Millstone Compliance",
  description: "Free plain English guides and checks for permitted waste sites: the two-working-day deadline, transfer notes, common EWC codes and a readiness check.",
  keywords: ["digital waste tracking guide", "EWC codes scrap yard", "two working days waste tracking"],
  alternates: { canonical: "https://millstonecompliance.com/resources" },
  openGraph: {
    title: "Digital Waste Tracking Guides for Waste Sites | Millstone Compliance",
    description: "Free plain English guides and checks for permitted waste sites: the two-working-day deadline, transfer notes, common EWC codes and a readiness check.",
    url: "https://millstonecompliance.com/resources",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Waste Tracking Guides for Waste Sites | Millstone Compliance",
    description: "Free plain English guides and checks for permitted waste sites: the two-working-day deadline, transfer notes, common EWC codes and a readiness check.",
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
