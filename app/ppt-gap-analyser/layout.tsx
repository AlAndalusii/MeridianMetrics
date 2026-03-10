import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Duty of Care Gap Analyser | Waste Transfer Note Compliance Check',
  description: 'Get a free Duty of Care compliance score 0–100 covering waste transfer notes, carrier licence verification and EWC code accuracy — 10 questions, under 3 minutes. For care homes, landlords and businesses.',
  keywords: [
    'duty of care gap analyser',
    'waste transfer note compliance',
    'duty of care compliance check',
    'waste carrier verification tool',
    'EWC code compliance check',
    'duty of care score',
    'free waste compliance tool',
    'waste duty of care assessment',
    'care home duty of care check',
    'WTN compliance analyser',
    'duty of care UK businesses',
    'free duty of care assessment',
  ],
  openGraph: {
    title: 'Free Duty of Care Gap Analyser | Waste Transfer Note Compliance Check',
    description: 'Free Duty of Care compliance score covering waste transfer notes, carrier verification and EWC codes — 10 questions, under 3 minutes.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Duty of Care Gap Analyser | Waste Transfer Note Compliance Check',
    description: 'Free Duty of Care compliance score covering waste transfer notes, carrier verification and EWC codes — 10 questions, under 3 minutes.',
  },
}

export default function PPTGapAnalyserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
