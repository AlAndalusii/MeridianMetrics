import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Cost & Compliance Audits UK | Fixed-Fee, 48-Hour Reports',
  description: 'Independent waste cost and compliance audits for UK businesses. Remote or on-site. Fixed-fee pricing. Written report within 48 hours. Care homes, property, hospitality, logistics, manufacturing and more.',
  keywords: [
    'waste audit UK',
    'waste compliance audit',
    'waste cost audit',
    'business waste audit',
    'waste compliance UK',
    'waste audit fixed fee',
    '48 hour waste report',
    'independent waste audit',
    'UK waste compliance specialists',
    'care home waste audit',
    'property waste compliance',
    'waste contractor check',
    'waste transfer note audit',
    'waste records review',
  ],
  openGraph: {
    title: 'Waste Cost & Compliance Audits UK | Fixed-Fee, 48-Hour Reports',
    description: 'Independent waste cost and compliance audits for UK businesses. Remote or on-site. Fixed-fee. Written report in 48 hours.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Cost & Compliance Audits UK | Fixed-Fee, 48-Hour Reports',
    description: 'Independent waste cost and compliance audits for UK businesses. Remote or on-site. Fixed-fee. Written report in 48 hours.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
