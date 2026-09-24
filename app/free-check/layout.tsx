import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Waste Check: Are You Overpaying for Your Bins? | Millstone Compliance',
  description: 'Answer 10 quick questions about your waste bill, bins, paperwork and contract. See your warning signs and how to check each one yourself.',
  openGraph: {
    title: 'Free Waste Check: Are You Overpaying for Your Bins?',
    description: '10 quick questions. See your warning signs and how to check each one. For Birmingham businesses.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function FreeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
