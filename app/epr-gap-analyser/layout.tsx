import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Clinical Waste Gap Analyser | HTM 07-01 · CQC · Ofsted Compliance',
  description: 'Score your clinical waste compliance in 3 minutes — covers HTM 07-01 colour-code segregation, sharps management, hazardous waste consignment notes, staff training and CQC/Ofsted inspection readiness.',
  keywords: [
    'clinical waste gap analyser',
    'HTM 07-01 compliance check',
    'CQC clinical waste compliance',
    'Ofsted clinical waste check',
    'clinical waste compliance score',
    'sharps management compliance',
    'care home clinical waste audit',
    'hazardous waste consignment note check',
    'clinical waste segregation compliance',
    'free clinical waste assessment',
    'clinical waste inspection readiness',
    'children\'s home clinical waste',
  ],
  openGraph: {
    title: 'Free Clinical Waste Gap Analyser | HTM 07-01 · CQC · Ofsted Compliance',
    description: 'Free clinical waste compliance score covering HTM 07-01, CQC, Ofsted, sharps and consignment notes — 10 questions, instant results.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Clinical Waste Gap Analyser | HTM 07-01 · CQC · Ofsted Compliance',
    description: 'Free clinical waste compliance score covering HTM 07-01, CQC, Ofsted, sharps and consignment notes — 10 questions, instant results.',
  },
}

export default function EPRGapAnalyserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
