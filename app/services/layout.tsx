import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vetted Waste & Compliance Help | Birmingham Businesses, Landlords & Waste Firms',
  description: 'One call for vetted waste and compliance help in Birmingham. Free waste bill checks, vetted contractors for landlords and agents, and new work for local waste firms.',
  keywords: [
    'waste audit UK',
    'waste compliance audit',
    'waste cost audit',
    'business waste audit',
    'waste compliance UK',
    'waste audit fixed fee',
    '48 hour waste report',
    'waste bill audit Birmingham',
    'business waste contract Birmingham',
    'cheaper bin collection Birmingham',
    'property waste compliance',
    'waste contractor check',
    'waste transfer note audit',
    'waste records review',
  ],
  openGraph: {
    title: 'Vetted Waste & Compliance Help | Birmingham Businesses, Landlords & Waste Firms',
    description: 'One call for vetted waste and compliance help in Birmingham. Free bill checks, vetted contractors and new work for waste firms.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vetted Waste & Compliance Help | Birmingham Businesses, Landlords & Waste Firms',
    description: 'One call for vetted waste and compliance help in Birmingham. Free bill checks, vetted contractors and new work for waste firms.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
