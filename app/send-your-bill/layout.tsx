import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Send Your Tickets for DWT Reporting | Millstone Compliance",
  description: "Send photos of weighbridge tickets and transfer notes. Start a free two-week trial of digital waste tracking reporting, or book a DWT Health Check.",
  keywords: ["send waste tickets", "digital waste tracking reporting"],
  alternates: { canonical: "https://millstonecompliance.com/send-your-bill" },
  openGraph: {
    title: "Send Your Tickets for DWT Reporting | Millstone Compliance",
    description: "Send photos of weighbridge tickets and transfer notes. Start a free two-week trial of digital waste tracking reporting, or book a DWT Health Check.",
    url: "https://millstonecompliance.com/send-your-bill",
    type: "website",
    locale: "en_GB",
    siteName: "Millstone Compliance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Send Your Tickets for DWT Reporting | Millstone Compliance",
    description: "Send photos of weighbridge tickets and transfer notes. Start a free two-week trial of digital waste tracking reporting, or book a DWT Health Check.",
  },
}

export default function SendYourTicketsLayout({ children }: { children: React.ReactNode }) {
  return children
}
