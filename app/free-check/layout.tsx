import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Readiness Check: Is Your Site Ready for Digital Waste Tracking? | Millstone Compliance',
  description: 'Answer 10 quick questions about registration, reporting, codes and deadlines. Find out if your site is reporting properly, or if loads are slipping through.',
  openGraph: {
    title: 'Free Readiness Check: Is Your Site Ready for Digital Waste Tracking?',
    description: '10 quick questions, 3 minutes. For permitted waste sites.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function FreeCheckLayout({ children }: { children: React.ReactNode }) {
  return children
}
