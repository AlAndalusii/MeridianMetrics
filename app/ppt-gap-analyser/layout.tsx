import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PPT Gap Analyser | Plastic Packaging Tax Compliance Score',
  description: 'Get an AI-powered Plastic Packaging Tax compliance score 0–100, your top 3 HMRC risk areas, and a personalised action plan emailed to you — free, in under 3 minutes.',
  keywords: [
    'PPT gap analyser',
    'plastic packaging tax compliance check',
    'PPT compliance score',
    'plastic packaging tax assessment',
    'free PPT compliance tool',
    'PPT HMRC risk assessment',
    'plastic packaging tax checker',
    'PPT audit tool',
    'plastic packaging tax calculator',
    'PPT compliance UK',
    'HMRC plastic packaging tax',
    'free PPT assessment',
  ],
  openGraph: {
    title: 'Free PPT Gap Analyser | Plastic Packaging Tax Compliance Score',
    description: 'Get an AI-powered Plastic Packaging Tax compliance score 0–100, your top 3 HMRC risk areas, and a personalised action plan — free, in under 3 minutes.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PPT Gap Analyser | Plastic Packaging Tax Compliance Score',
    description: 'Get an AI-powered Plastic Packaging Tax compliance score 0–100, your top 3 HMRC risk areas, and a personalised action plan — free, in under 3 minutes.',
  },
}

export default function PPTGapAnalyserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
