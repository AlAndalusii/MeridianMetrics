import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PPT Records Guide | What HMRC Requires for Plastic Packaging Tax',
  description: 'Complete guide to PPT records and accounts. Learn exactly what documentation HMRC requires for Plastic Packaging Tax compliance. Free 3-minute assessment.',
  keywords: [
    'plastic packaging tax',
    'PPT records',
    'PPT compliance',
    'HMRC plastic packaging tax',
    'plastic packaging tax UK',
    'PPT documentation',
    'plastic packaging tax guide',
    'PPT accounts',
    'recycled content records',
    'plastic packaging tax 2025',
  ],
  openGraph: {
    title: 'PPT Records Guide | What HMRC Requires for Plastic Packaging Tax',
    description: 'Complete guide to PPT records and accounts. Learn exactly what documentation HMRC requires for Plastic Packaging Tax compliance.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPT Records Guide | What HMRC Requires for Plastic Packaging Tax',
    description: 'Complete guide to PPT records and accounts. Learn exactly what documentation HMRC requires for Plastic Packaging Tax compliance.',
  },
}

export default function PlasticPackagingTaxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
