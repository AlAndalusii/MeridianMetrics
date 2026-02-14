import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waste Duty of Care UK: Business Compliance Guide 2026',
  description: 'Complete UK Duty of Care guide for businesses. Legal requirements, Waste Transfer Notes, penalties & carrier verification. Free compliance assessment.',
  keywords: [
    'duty of care waste',
    'waste duty of care',
    'duty of care waste management',
    'waste transfer note',
    'environmental protection act 1990',
    'waste carrier registration',
    'business waste disposal',
    'commercial waste compliance',
    'waste transfer notes uk',
    'duty of care legislation',
    'waste documentation',
    'waste carrier verification',
    'hazardous waste consignment note',
    'ewc codes waste',
    'waste duty of care checklist',
  ],
  openGraph: {
    title: 'Waste Duty of Care UK: Business Compliance Guide 2026',
    description: 'Complete UK Duty of Care guide: Legal requirements, Waste Transfer Notes, £300 penalties & carrier verification. Avoid prosecution.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waste Duty of Care UK: Business Compliance Guide 2026',
    description: 'Complete UK Duty of Care guide: Legal requirements, Waste Transfer Notes, £300 penalties & carrier verification. Avoid prosecution.',
  },
}

export default function DutyOfCareWasteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
