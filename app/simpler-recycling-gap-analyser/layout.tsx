import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Simpler Recycling Gap Analyser | UK Compliance Score',
  description: "Get an AI-powered Simpler Recycling compliance score 0–10, your top 3 penalty risks under the UK's waste separation regulations, and a personalised action plan — free, in under 3 minutes.",
  keywords: [
    'simpler recycling gap analyser',
    'simpler recycling compliance check',
    'simpler recycling score',
    'UK simpler recycling assessment',
    'free simpler recycling tool',
    'simpler recycling penalty risk',
    'workplace recycling compliance UK',
    'simpler recycling regulations checker',
    'waste separation compliance UK',
    'simpler recycling businesses',
    '3-bin recycling compliance',
    'free simpler recycling assessment',
  ],
  openGraph: {
    title: 'Free Simpler Recycling Gap Analyser | UK Compliance Score',
    description: "Get an AI-powered Simpler Recycling compliance score 0–10, your top 3 penalty risks under UK waste separation regulations, and a personalised action plan — free.",
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Simpler Recycling Gap Analyser | UK Compliance Score',
    description: "Get an AI-powered Simpler Recycling compliance score 0–10, your top 3 penalty risks under UK waste separation regulations, and a personalised action plan — free.",
  },
}

export default function SimplerRecyclingGapAnalyserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
