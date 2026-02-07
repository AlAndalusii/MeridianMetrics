import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What Is Plastic Packaging Tax? | UK PPT Guide 2025',
  description: 'Simple guide to Plastic Packaging Tax for UK businesses. Learn the £217.85/tonne rate, 30% recycled content rule, and 10-tonne threshold. Updated for 2025.',
  keywords: [
    'what is plastic packaging tax',
    'plastic packaging tax UK',
    'PPT explained',
    'plastic packaging tax rate 2025',
    'plastic packaging tax threshold',
    'plastic packaging tax exemptions',
    'UK plastic tax',
    'PPT beginners guide',
    'HMRC plastic packaging tax',
    '30% recycled content',
  ],
  openGraph: {
    title: 'What Is Plastic Packaging Tax? | UK PPT Guide 2025',
    description: 'Simple guide to Plastic Packaging Tax for UK businesses. Learn the £217.85/tonne rate, 30% recycled content rule, and 10-tonne threshold.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Plastic Packaging Tax? | UK PPT Guide 2025',
    description: 'Simple guide to Plastic Packaging Tax for UK businesses. Learn the £217.85/tonne rate, 30% recycled content rule, and 10-tonne threshold.',
  },
}

export default function PlasticPackagingTaxExplainedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
