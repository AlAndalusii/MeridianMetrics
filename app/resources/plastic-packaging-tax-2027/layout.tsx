import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'April 2027 PPT Rule Changes | What UK Businesses Must Do Now',
  description: "From April 2027, factory scraps won't count as PPT recycled content and chemical recycling becomes eligible. Learn how the UK rule changes affect your business and how to prepare.",
  keywords: [
    'plastic packaging tax 2027',
    'PPT April 2027 changes',
    'PPT factory scraps rule change',
    'chemical recycling PPT eligible 2027',
    'PPT mass balance approach',
    'PPT-MBA certification',
    'pre-consumer waste PPT',
    'post-consumer recycled plastic PPT',
    'plastic packaging tax rule change UK',
    'PPT recycled content 2027',
    '30% recycled content plastic packaging',
    'plastic packaging tax chemical recycling',
  ],
  openGraph: {
    title: 'April 2027 PPT Rule Changes | What UK Businesses Must Do Now',
    description: "From April 2027, factory scraps won't count as PPT recycled content and chemical recycling becomes eligible. Learn how to prepare your UK business.",
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'April 2027 PPT Rule Changes | What UK Businesses Must Do Now',
    description: "From April 2027, factory scraps won't count as PPT recycled content and chemical recycling becomes eligible. Learn how to prepare your UK business.",
  },
}

export default function PlasticPackagingTax2027Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
