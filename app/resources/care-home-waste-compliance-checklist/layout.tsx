import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Care Home Waste Compliance Checklist — Free PDF Download | Millstone Compliance',
  description: 'Free 16-question care home waste compliance checklist. Covers clinical waste, Simpler Recycling, HTM 07-01, and CQC requirements. Download your printable A4 PDF today.',
  keywords: [
    'care home waste compliance',
    'care home waste checklist',
    'care home clinical waste',
    'HTM 07-01 care home',
    'simpler recycling care home',
    'care home waste management plan',
    'CQC waste compliance',
    'care home EA inspection',
    'clinical waste duty of care',
    'care home waste regulations 2026',
    'care home recycling checklist',
    'care home compliance checklist free',
    'care home waste audit',
    'care home waste transfer note',
  ],
  openGraph: {
    title: 'Care Home Waste Compliance Checklist — Free PDF | Millstone Compliance',
    description: 'Free 16-question checklist for care home managers. Covers clinical waste, Simpler Recycling streams, HTM 07-01, and CQC requirements. Printable A4 PDF.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Care Home Waste Compliance Checklist — Free PDF | Millstone Compliance',
    description: 'Free 16-question checklist for care home managers. Covers clinical waste, Simpler Recycling, HTM 07-01, and CQC requirements. Download now.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/resources/care-home-waste-compliance-checklist',
  },
}

export default function CareHomeChecklistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
