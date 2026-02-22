import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free EPR Gap Analyser | EPR Packaging Compliance Score',
  description: 'Get an AI-powered EPR packaging compliance score 0–100, your top 3 risk areas under Extended Producer Responsibility rules, and a personalised action plan emailed to you — free.',
  keywords: [
    'EPR gap analyser',
    'EPR packaging compliance check',
    'EPR compliance score',
    'extended producer responsibility assessment',
    'free EPR compliance tool',
    'EPR risk assessment UK',
    'EPR packaging checker',
    'EPR audit tool',
    'EPR compliance calculator',
    'extended producer responsibility UK',
    'EPR packaging obligations check',
    'free EPR assessment',
  ],
  openGraph: {
    title: 'Free EPR Gap Analyser | EPR Packaging Compliance Score',
    description: 'Get an AI-powered EPR packaging compliance score, your top 3 risk areas under Extended Producer Responsibility rules, and a personalised action plan — free.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free EPR Gap Analyser | EPR Packaging Compliance Score',
    description: 'Get an AI-powered EPR packaging compliance score, your top 3 risk areas under Extended Producer Responsibility rules, and a personalised action plan — free.',
  },
}

export default function EPRGapAnalyserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
