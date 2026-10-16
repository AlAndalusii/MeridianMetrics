import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet Zak | Digital Waste Tracking, Done For You | Millstone',
  description: 'Meet Zak, founder of Millstone Compliance. Ex-HMRC, Birmingham based. I report every load for small permitted waste sites to Defra within two working days.',
  openGraph: {
    title: 'Meet Zak | Digital Waste Tracking, Done For You | Millstone',
    description: 'Meet Zak, founder of Millstone Compliance. Ex-HMRC, Birmingham based. I report every load for small permitted waste sites to Defra within two working days.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
