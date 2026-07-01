import type { Metadata } from 'next'
import DocLayout from '@/components/legal/DocLayout'
import content from '@/content/legal/terms'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'SimplaKit Terms of Service — license, refund policy, and governing law.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | Simpla Kit',
    description: 'SimplaKit Terms of Service — license, refund policy, and governing law.',
    url: 'https://simplakit.com/terms',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Simpla Kit',
    description: 'SimplaKit Terms of Service — license, refund policy, and governing law.',
  },
}

export default function TermsPage() {
  return <DocLayout title="Terms of Service" lastUpdated="June 29, 2025" content={content} />
}
