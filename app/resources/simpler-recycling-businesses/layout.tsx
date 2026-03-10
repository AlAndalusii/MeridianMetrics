import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simpler Recycling for UK Businesses: Full Compliance Guide 2026',
  description: 'The complete UK Simpler Recycling guide for businesses — 4 mandatory waste streams, who is affected, collection deadlines, penalty levels and step-by-step compliance checklist. Avoid fines of up to £5,000.',
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
    title: 'Simpler Recycling for UK Businesses: Full Compliance Guide 2026',
    description: 'The complete guide to Simpler Recycling for businesses — 4 mandatory waste streams, who is affected, penalties and step-by-step compliance checklist.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simpler Recycling for UK Businesses: Full Compliance Guide 2026',
    description: 'The complete guide to Simpler Recycling for businesses — 4 mandatory waste streams, who is affected, penalties and step-by-step compliance checklist.',
  },
}

export default function SimplerRecyclingBusinessesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
