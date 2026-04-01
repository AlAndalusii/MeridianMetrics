import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How Businesses Can Save Money On Waste | Millstone Compliance',
  description: 'Waste costs more than most businesses realise. Learn practical ways to reduce waste spend, improve records, and stay compliant — without the jargon.',
  keywords: [
    'save money on waste',
    'reduce waste costs UK',
    'business waste savings',
    'waste cost reduction',
    'waste management savings',
    'cut waste costs',
    'waste audit savings',
    'business waste compliance',
    'waste records UK',
    'waste transfer notes',
    'carrier licence check',
    'waste segregation savings',
  ],
  openGraph: {
    title: 'How Businesses Can Save Money On Waste | Millstone Compliance',
    description: 'Practical steps UK businesses can take to reduce waste costs, improve records, and stay on top of waste rules.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Businesses Can Save Money On Waste | Millstone Compliance',
    description: 'Practical steps UK businesses can take to reduce waste costs, improve records, and stay on top of waste rules.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/resources/how-businesses-save-money-on-waste',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
