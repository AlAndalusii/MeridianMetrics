import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Send Your Tickets | Free Two-Week Trial or DWT Health Check | Millstone',
  description: 'Send photos of your weighbridge tickets and transfer notes. Start a free two-week trial of digital waste tracking reporting, or book a DWT Health Check.',
  openGraph: {
    title: 'Send Me Your Tickets',
    description: 'Two weeks free. I enter and submit every load to Defra before the deadline.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function SendYourTicketsLayout({ children }: { children: React.ReactNode }) {
  return children
}
