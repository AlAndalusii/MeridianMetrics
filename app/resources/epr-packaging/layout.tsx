import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EPR Packaging: UK Business Guide 2026 | Millstone Compliance',
  description: 'Everything UK businesses need to know about EPR packaging — whether it applies to you, what you must do, 2026 deadlines, fees, and practical tips. Plain English guide.',
  keywords: [
    'EPR packaging UK',
    'extended producer responsibility packaging',
    'EPR compliance 2026',
    'EPR packaging fees',
    'EPR registration UK',
    'producer responsibility packaging',
    'packaging EPR deadlines 2026',
    'EPR packaging guide UK businesses',
    'extended producer responsibility explained',
    'EPR packaging obligations',
  ],
  openGraph: {
    title: 'EPR Packaging: UK Business Guide 2026 | Millstone Compliance',
    description: 'Everything UK businesses need to know about EPR packaging — whether it applies to you, what you must do, 2026 deadlines, fees, and practical tips.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPR Packaging: UK Business Guide 2026 | Millstone Compliance',
    description: 'Everything UK businesses need to know about EPR packaging — whether it applies to you, what you must do, 2026 deadlines, fees, and practical tips.',
  },
}

export default function EPRPackagingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
