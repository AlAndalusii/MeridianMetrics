import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paperwork Support | Quarterly Waste Returns & Regulars Set Up | Millstone',
  description: 'An add-on for sites Millstone already reports for: quarterly waste returns prepared from data already held, and regular hauliers and customers set up before their first load.',
  keywords: [
    'quarterly waste returns help',
    'waste return preparation',
    'permitted site paperwork',
    'digital waste tracking paperwork',
    'haulier and customer setup',
    'EWC code template',
  ],
  openGraph: {
    title: 'Paperwork Support | Millstone Compliance',
    description: 'Quarterly waste returns and regulars set up, from the data I already hold. No forms filled twice.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
}

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return children
}
