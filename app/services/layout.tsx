import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Bill Audits & Better Bin Deals | Birmingham Businesses',
  description: 'We check your waste bill, get you a better deal and watch your renewal date. For Birmingham cafés, shops, hotels, offices and property managers. Free first bill check.',
  keywords: [
    'waste audit UK',
    'waste compliance audit',
    'waste cost audit',
    'business waste audit',
    'waste compliance UK',
    'waste audit fixed fee',
    '48 hour waste report',
    'waste bill audit Birmingham',
    'business waste contract Birmingham',
    'cheaper bin collection Birmingham',
    'property waste compliance',
    'waste contractor check',
    'waste transfer note audit',
    'waste records review',
  ],
  openGraph: {
    title: 'Waste Bill Audits & Better Bin Deals | Birmingham Businesses',
    description: 'We check your waste bill, get you a better deal and watch your renewal date. Free first bill check for Birmingham businesses.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Bill Audits & Better Bin Deals | Birmingham Businesses',
    description: 'We check your waste bill, get you a better deal and watch your renewal date. Free first bill check for Birmingham businesses.',
  },
  alternates: {
    canonical: 'https://millstonecompliance.com/services',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children
}
