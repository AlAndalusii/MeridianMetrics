import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Clinical Waste Gap Analyser | HTM 07-01, CQC & Ofsted Ready',
  description: 'Is your clinical waste management CQC and Ofsted inspection-ready? Free 10-question gap analyser covering HTM 07-01 segregation, sharps, consignment notes, staff training and storage standards — 0–100 score.',
  keywords: [
    'clinical waste gap analyser',
    'HTM 07-01 compliance',
    'CQC clinical waste inspection',
    'Ofsted clinical waste compliance',
    'clinical waste compliance score',
    'sharps management check',
    'clinical waste segregation UK',
    'hazardous waste consignment note',
    'care home clinical waste audit',
    'children\'s home clinical waste',
    'free clinical waste tool',
    'clinical waste inspection ready',
  ],
  openGraph: {
    title: 'Free Clinical Waste Gap Analyser | HTM 07-01, CQC & Ofsted Ready',
    description: 'Free 10-question clinical waste gap analyser — HTM 07-01 segregation, sharps, consignment notes, staff training. CQC and Ofsted inspection-ready score.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Clinical Waste Gap Analyser | HTM 07-01, CQC & Ofsted Ready',
    description: 'Free 10-question clinical waste gap analyser — HTM 07-01 segregation, sharps, consignment notes, staff training. CQC and Ofsted inspection-ready score.',
  },
}

export default function ClinicalWasteAnalyserLayout({ children }: { children: React.ReactNode }) {
  return children
}
