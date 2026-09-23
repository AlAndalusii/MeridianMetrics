import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Send Us Your Waste Bill | Free First Check | Millstone',
  description: 'Send us your waste bill and we will check every line. A quick check of one quarter, or a thorough 12-month audit. Or ask us to call you.',
  openGraph: {
    title: 'Send Us Your Waste Bill',
    description: 'Your first check is free. We check every line and send a plain English report within 48 hours.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function SendYourBillLayout({ children }: { children: React.ReactNode }) {
  return children
}
