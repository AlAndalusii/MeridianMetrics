import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Compliance Guides | UK Care Home & HMO Resources',
  description: 'Free expert guides on Duty of Care, Simpler Recycling and clinical waste compliance. For UK businesses of all types. Plain English, inspection-ready.',
  openGraph: {
    title: 'Waste Compliance Guides | UK Care Home & HMO Resources',
    description: 'Free expert guides on Duty of Care, Simpler Recycling and clinical waste compliance. For UK businesses of all types.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Compliance Guides | UK Care Home & HMO Resources',
    description: 'Free expert guides on Duty of Care, Simpler Recycling and clinical waste compliance.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
