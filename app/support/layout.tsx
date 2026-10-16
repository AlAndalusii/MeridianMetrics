import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Questions & Help | Digital Waste Tracking Made Simple | Millstone Compliance',
  description: 'Straight answers on digital waste tracking for permitted sites: the two-working-day deadline, paper transfer notes, software, who is responsible, and what it costs.',
  keywords: [
    'digital waste tracking questions',
    'digital waste tracking help',
    'waste tracking deadline',
    'do I still need waste transfer notes',
    'digital waste tracking software',
    'waste tracking for scrap yards',
    'waste tracking for transfer stations',
  ],
  openGraph: {
    title: 'Questions & Help | Digital Waste Tracking Made Simple',
    description: 'Straight answers on digital waste tracking for permitted sites, from Zak at Millstone Compliance.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Questions & Help | Digital Waste Tracking Made Simple',
    description: 'Straight answers on digital waste tracking for permitted sites, from Zak at Millstone Compliance.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/support',
  },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
