import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet Zak | Vetted Waste & Compliance Help in Birmingham | Millstone',
  description: 'Meet Zak, founder of Millstone Compliance. One call for vetted waste and compliance help in Birmingham, with five checks on every partner and a direct line to Zak.',
  openGraph: {
    title: 'Meet Zak | Vetted Waste & Compliance Help in Birmingham | Millstone',
    description: 'Meet Zak, founder of Millstone Compliance. One call for vetted waste and compliance help in Birmingham, with five checks on every partner and a direct line to Zak.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
