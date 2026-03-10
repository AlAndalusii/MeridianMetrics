import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Compliance Documentation Service UK | WTNs, Clinical Waste & HMO Records',
  description: 'We produce, organise and maintain every waste compliance document your business must hold — Waste Transfer Notes, clinical waste consignment notes, HMO waste plans and Simpler Recycling evidence. 48-hour turnaround. EA, CQC and council inspection-ready.',
  keywords: [
    'waste compliance documentation service',
    'waste transfer note service UK',
    'clinical waste documentation',
    'HMO waste management plan',
    'duty of care documentation',
    'waste compliance records UK',
    'simpler recycling evidence records',
    'care home waste documentation',
    'CQC waste records',
    'EA compliance documentation',
    'waste document preparation UK',
    'waste compliance consultant',
  ],
  openGraph: {
    title: 'Waste Compliance Documentation Service UK | WTNs, Clinical Waste & HMO Records',
    description: 'We produce and maintain every waste compliance document your business must hold — WTNs, clinical waste consignment notes, HMO plans and Simpler Recycling evidence. EA, CQC and council inspection-ready.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Compliance Documentation Service UK | WTNs, Clinical Waste & HMO Records',
    description: 'We produce and maintain every waste compliance document your business must hold — WTNs, clinical waste consignment notes, HMO plans and Simpler Recycling evidence.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/services/documentation',
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return children
}
