import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services | Digital Waste Tracking Reporting, Health Checks & Setup | Millstone',
  description: 'Four services for small permitted waste sites: digital waste tracking reporting done for you, a health check, setup help and paperwork support. Free two-week trial.',
  keywords: [
    'digital waste tracking reporting',
    'digital waste tracking service',
    'DWT reporting done for you',
    'waste tracking health check',
    'digital waste tracking setup',
    'Defra waste tracking registration',
    'EWC and R/D codes',
    'quarterly waste returns',
    'scrap yard waste tracking',
    'waste transfer station reporting',
    'skip hire yard waste tracking',
    'waste tracking 2027 carriers brokers',
  ],
  openGraph: {
    title: 'Services | Digital Waste Tracking Reporting, Health Checks & Setup | Millstone',
    description: 'Four services for small permitted waste sites, plus free introductions. Start with a free two-week trial.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services | Digital Waste Tracking Reporting, Health Checks & Setup | Millstone',
    description: 'Four services for small permitted waste sites, plus free introductions. Start with a free two-week trial.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
