import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HMO Landlords Face £5,000 Fines Under New Recycling Rules',
  description: 'Simpler Recycling hits HMOs 31 March 2026. Landlords liable for tenant bin errors, food waste non-compliance. £5K fines + licence risk. Compliance guide.',
  keywords: [
    'HMO recycling rules',
    'HMO simpler recycling',
    'HMO waste fines',
    'HMO landlord recycling compliance',
    'simpler recycling HMO 2026',
    'HMO food waste',
    'HMO bin rules',
    'landlord waste fines',
    'HMO licence recycling',
    'simpler recycling households',
    'HMO management failure',
    'HMO licensing conditions waste',
    'landlord recycling obligations',
  ],
  openGraph: {
    title: 'HMO Landlords Face £5,000 Fines Under New Recycling Rules',
    description: 'Simpler Recycling hits HMOs 31 March 2026. Landlords liable for tenant bin errors, food waste non-compliance. £5K fines + licence risk.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMO Landlords Face £5,000 Fines Under New Recycling Rules',
    description: 'Simpler Recycling hits HMOs 31 March 2026. Landlords liable for tenant bin errors, food waste non-compliance. £5K fines + licence risk.',
  },
}

export default function HmoRecyclingFinesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
