import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Digital Waste Tracking Checks for Waste Sites | Millstone Compliance',
  description: 'Free checks and plain English guides for permitted waste sites: the readiness check, a two-working-day deadline checker, common EWC codes and transfer notes.',
  alternates: { canonical: 'https://millstonecompliance.com/quiz' },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
