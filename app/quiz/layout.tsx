import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Is Your Site Ready for Digital Waste Tracking? | Millstone Compliance',
  description: 'Free self-checks for permitted waste sites: see if you are registered, reporting every load within two working days, and using the right EWC codes.',
  alternates: { canonical: 'https://millstonecompliance.com/quiz' },
  openGraph: {
    title: 'Is Your Site Ready for Digital Waste Tracking? | Millstone Compliance',
    description: 'Free self-checks for permitted waste sites: see if you are registered, reporting every load within two working days, and using the right EWC codes.',
    url: 'https://millstonecompliance.com/quiz',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Your Site Ready for Digital Waste Tracking? | Millstone Compliance',
    description: 'Free self-checks for permitted waste sites: see if you are registered, reporting every load within two working days, and using the right EWC codes.',
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
