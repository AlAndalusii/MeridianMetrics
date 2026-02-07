import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PPT, EPR & PRN Resources | UK Packaging Compliance Guides',
  description: 'Free expert guides on Plastic Packaging Tax, EPR and PRN compliance. Learn what records HMRC requires and how to avoid penalties. UK business compliance resources.',
  openGraph: {
    title: 'PPT, EPR & PRN Resources | UK Packaging Compliance Guides',
    description: 'Free expert guides on Plastic Packaging Tax, EPR and PRN compliance. Learn what records HMRC requires and how to avoid penalties.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPT, EPR & PRN Resources | UK Packaging Compliance Guides',
    description: 'Free expert guides on Plastic Packaging Tax, EPR and PRN compliance. Learn what records HMRC requires and how to avoid penalties.',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
