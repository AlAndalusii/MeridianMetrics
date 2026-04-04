import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Site Check | Millstone Compliance',
  description: 'Quick 5-point on-site waste compliance check for Millstone Compliance partners. Identify issues in under 2 minutes.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PartnerCheckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
