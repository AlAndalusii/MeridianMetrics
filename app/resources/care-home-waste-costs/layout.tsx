import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Why Waste Is Costing Your Care Home More Than It Should | Millstone Compliance',
  description: 'Most care homes overpay for waste without realising it. Wrong bags, poor segregation and unfair contracts add up. Find out what an independent audit finds — and fixes.',
  keywords: [
    'care home waste costs',
    'care home waste audit',
    'care home waste compliance',
    'clinical waste costs UK',
    'reduce care home waste spend',
    'HTM 07-01 care home',
    'care home waste segregation',
    'independent waste consultant',
    'care home clinical waste',
    'offensive waste care home',
    'waste transfer notes care home',
    'Simpler Recycling care home',
    'care home waste savings',
  ],
  openGraph: {
    title: 'Why Waste Is Costing Your Care Home More Than It Should | Millstone Compliance',
    description: 'Wrong bags, poor segregation and unfair contracts cost care homes thousands each year. An independent audit shows exactly where the money is going.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Waste Is Costing Your Care Home More Than It Should | Millstone Compliance',
    description: 'Wrong bags, poor segregation and unfair contracts cost care homes thousands each year. An independent audit shows exactly where the money is going.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/resources/care-home-waste-costs',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
