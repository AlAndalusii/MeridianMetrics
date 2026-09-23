import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Waste Guides for Businesses & Landlords | Millstone',
  description: 'Simple, free guides on waste bills, contracts, recycling rules and clearances. Plain English for Birmingham businesses, landlords and property managers.',
  openGraph: {
    title: 'Free Waste Guides for Businesses & Landlords | Millstone',
    description: 'Simple, free guides on waste bills, contracts, recycling rules and clearances. Plain English for Birmingham businesses, landlords and property managers.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Waste Guides for Businesses & Landlords | Millstone',
    description: 'Simple, free guides on waste bills, contracts, recycling rules and clearances. Plain English for Birmingham businesses, landlords and property managers.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
