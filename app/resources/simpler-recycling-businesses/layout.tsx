import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simpler Recycling UK: Business Compliance Guide 2025',
  description: 'UK Simpler Recycling legislation guide: March 2025 deadlines, 4 mandatory waste streams, penalties & compliance. Free audit. Avoid £200-£5,000 fines.',
  keywords: [
    'simpler recycling',
    'simpler recycling legislation',
    'simpler recycling for businesses',
    'simpler recycling 2025',
    'simpler recycling regulations',
    'simpler recycling legislation uk',
    'defra simpler recycling',
    'simpler recycling start date',
    'simpler recycling waste streams',
    'simpler recycling penalties',
    'simpler recycling compliance',
    'waste compliance UK',
    'business waste regulations',
    'food waste bins business',
    'duty of care waste',
    'march 2025 waste regulations',
    'environment agency waste compliance',
  ],
  openGraph: {
    title: 'Simpler Recycling UK: Business Compliance Guide 2025',
    description: 'UK Simpler Recycling legislation: March 2025 deadlines, 4 mandatory waste streams, penalties & compliance solutions. Free audit available.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simpler Recycling UK: Business Compliance Guide 2025',
    description: 'UK Simpler Recycling legislation: March 2025 deadlines, 4 mandatory waste streams, penalties & compliance solutions. Free audit available.',
  },
}

export default function SimplerRecyclingBusinessesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
