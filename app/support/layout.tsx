import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Compliance Support UK | Duty of Care, Clinical Waste & HMO Specialists',
  description: 'Expert waste compliance support for UK care homes, children\'s homes, HMO landlords and businesses. We audit, document and maintain your Duty of Care records, clinical waste files and Simpler Recycling evidence — same-day response.',
  keywords: [
    'waste compliance support UK',
    'duty of care audit',
    'clinical waste compliance support',
    'HMO waste compliance',
    'waste compliance specialists',
    'waste transfer note support',
    'HTM 07-01 compliance',
    'care home waste compliance',
    'simpler recycling support',
    'waste compliance consultants UK',
    'environment agency compliance',
    'CQC waste documentation support',
    'waste compliance advice UK',
  ],
  openGraph: {
    title: 'Waste Compliance Support UK | Duty of Care, Clinical Waste & HMO Specialists',
    description: 'Audit, documentation, and ongoing compliance support for UK care homes, HMO landlords and businesses — covering Duty of Care, clinical waste and Simpler Recycling.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Compliance Support UK | Duty of Care, Clinical Waste & HMO Specialists',
    description: 'Audit, documentation, and ongoing compliance support for UK care homes, HMO landlords and businesses — covering Duty of Care, clinical waste and Simpler Recycling.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/support',
  },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
