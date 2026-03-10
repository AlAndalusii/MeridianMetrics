import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Duty of Care Gap Analyser | WTN & Carrier Compliance Score',
  description: 'Find out if your Waste Duty of Care documentation is watertight. Free 10-question gap analyser covering waste transfer notes, carrier licence checks, EWC codes and staff awareness — instant 0–100 score.',
  keywords: [
    'duty of care gap analyser',
    'waste transfer note compliance',
    'duty of care compliance check',
    'WTN gap analyser',
    'waste carrier licence check',
    'EWC code compliance',
    'duty of care assessment care home',
    'estate agent waste compliance check',
    'free duty of care tool',
    'duty of care score UK',
    'waste carrier verification',
    'care home duty of care',
  ],
  openGraph: {
    title: 'Free Duty of Care Gap Analyser | WTN & Carrier Compliance Score',
    description: 'Free 10-question Duty of Care gap analyser — waste transfer notes, carrier verification, EWC codes and staff awareness. Instant 0–100 score.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Duty of Care Gap Analyser | WTN & Carrier Compliance Score',
    description: 'Free 10-question Duty of Care gap analyser — waste transfer notes, carrier verification, EWC codes and staff awareness. Instant 0–100 score.',
  },
}

export default function DutyOfCareAnalyserLayout({ children }: { children: React.ReactNode }) {
  return children
}
