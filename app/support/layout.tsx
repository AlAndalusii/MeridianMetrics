import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Cost & Compliance Made Simple | Millstone Compliance UK',
  description: 'We help UK businesses cut waste costs, tighten records, and stay on top of waste rules. Audits, documentation, templates, and ongoing support — with plain English advice and no jargon.',
  keywords: [
    'waste cost reduction UK',
    'waste compliance UK',
    'waste audit UK',
    'waste records UK',
    'waste compliance specialists',
    'waste cost savings',
    'waste audit support',
    'waste contractor check',
    'UK waste compliance advice',
    'waste documentation UK',
    'waste compliance consultants',
    'business waste audit',
    'waste cost management',
  ],
  openGraph: {
    title: 'Waste Cost & Compliance Made Simple | Millstone Compliance UK',
    description: 'We help UK businesses cut waste costs, tighten records, and stay on top of waste rules. Plain English advice, 48-hour reports, fixed-fee pricing.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Cost & Compliance Made Simple | Millstone Compliance UK',
    description: 'We help UK businesses cut waste costs, tighten records, and stay on top of waste rules. Plain English advice, 48-hour reports, fixed-fee pricing.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/support',
  },
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children
}
