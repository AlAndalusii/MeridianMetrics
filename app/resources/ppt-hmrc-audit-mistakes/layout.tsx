import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '5 PPT Mistakes That Trigger an HMRC Audit | Millstone Compliance',
  description: 'Discover the 5 most common Plastic Packaging Tax mistakes that trigger HMRC audits. Real examples, penalty figures, and step-by-step guidance to protect your business.',
  keywords: [
    'plastic packaging tax HMRC audit',
    'PPT audit mistakes',
    'HMRC plastic packaging tax penalties',
    'plastic packaging tax compliance',
    'PPT recycled content evidence',
    'plastic packaging tax import liability',
    'PPT record keeping',
    'plastic packaging tax export exemption',
    'HMRC PPT enforcement',
    'plastic packaging tax penalty mitigation',
  ],
  openGraph: {
    title: '5 PPT Mistakes That Trigger an HMRC Audit | Millstone Compliance',
    description: 'Discover the 5 most common Plastic Packaging Tax mistakes that trigger HMRC audits. Real examples, penalty figures, and step-by-step guidance to protect your business.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 PPT Mistakes That Trigger an HMRC Audit | Millstone Compliance',
    description: 'Discover the 5 most common Plastic Packaging Tax mistakes that trigger HMRC audits. Real examples, penalty figures, and step-by-step guidance to protect your business.',
  },
}

export default function PPTHMRCAuditMistakesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
