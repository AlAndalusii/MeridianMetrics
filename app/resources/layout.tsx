import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Guides: Digital Waste Tracking | Millstone',
  description: 'Free plain English guides and tools for small permitted waste sites: digital waste tracking, the two-working-day deadline, and EWC and R/D codes.',
  openGraph: {
    title: 'Free Guides: Digital Waste Tracking | Millstone',
    description: 'Free plain English guides and tools for small permitted waste sites: digital waste tracking, the two-working-day deadline, and EWC and R/D codes.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Guides: Digital Waste Tracking | Millstone',
    description: 'Free plain English guides and tools for small permitted waste sites: digital waste tracking, the two-working-day deadline, and EWC and R/D codes.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
