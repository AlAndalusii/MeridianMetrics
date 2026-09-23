import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What We Check On Your Waste Bill | Millstone Compliance',
  description: 'A simple guide to the six things we check on your waste bill: every charge, bin size, lifts, extra charges, price rises and your renewal date.',
  openGraph: {
    title: 'What We Check On Your Waste Bill',
    description: 'Six simple checks that can stop you overpaying for your bins. For Birmingham businesses.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function WhatWeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
