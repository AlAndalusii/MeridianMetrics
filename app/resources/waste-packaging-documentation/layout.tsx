import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Documentation Guide UK 2026 | WTNs, Clinical Waste & Care Home Records',
  description: 'Complete UK guide to waste documentation for care homes, children\'s homes and landlords. Covers Waste Transfer Notes, clinical waste consignment notes, HTM 07-01 records, HMO waste plans and Simpler Recycling evidence — with penalties for missing documents.',
  keywords: [
    'waste documentation UK',
    'waste transfer note guide',
    'clinical waste documentation',
    'duty of care documentation',
    'care home waste records',
    'HTM 07-01 records',
    'hazardous waste consignment note',
    'HMO waste management plan',
    'simpler recycling records',
    'waste compliance evidence file',
    'CQC waste documentation',
    'EA waste records',
    'waste carrier verification record',
    'sharps management records',
  ],
  openGraph: {
    title: 'Waste Documentation Guide UK 2026 | WTNs, Clinical Waste & Care Home Records',
    description: 'Every document UK care homes, landlords and businesses must hold under waste law — WTNs, consignment notes, HTM 07-01 records and HMO waste plans — with penalties.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Documentation Guide UK 2026 | WTNs, Clinical Waste & Care Home Records',
    description: 'Every document UK care homes, landlords and businesses must hold under waste law — WTNs, consignment notes, HTM 07-01 records and HMO waste plans — with penalties.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/resources/waste-packaging-documentation',
  },
}

export default function WasteDocumentationLayout({ children }: { children: React.ReactNode }) {
  return children
}
