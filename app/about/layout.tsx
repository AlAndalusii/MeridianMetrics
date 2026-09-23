import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Zak | Birmingham Waste Bill Checks | Millstone',
  description: 'A new Birmingham business helping local firms stop overpaying for waste. Plain English, a direct line to Zak, and always upfront about how we get paid.',
  openGraph: {
    title: 'About Zak | Birmingham Waste Bill Checks | Millstone',
    description: 'A new Birmingham business helping local firms stop overpaying for waste. Plain English, a direct line to Zak, and always upfront about how we get paid.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
