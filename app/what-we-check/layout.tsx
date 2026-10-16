import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What I Check On Every Load | Digital Waste Tracking | Millstone Compliance',
  description: 'The six things I check on every load before it goes to Defra: date, weight, EWC code, R/D code, who brought it, and your permit and deadline.',
  openGraph: {
    title: 'What I Check On Every Load',
    description: 'Six checks on every load, before the two-working-day deadline. For permitted waste sites.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function WhatWeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
