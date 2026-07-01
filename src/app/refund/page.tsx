import type { Metadata } from 'next'
import DocLayout from '@/components/legal/DocLayout'
import content from '@/content/legal/refund'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'SimplaKit Refund Policy — digital goods policy and what we offer instead of refunds.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/refund' },
  openGraph: {
    title: 'Refund Policy | Simpla Kit',
    description: 'SimplaKit Refund Policy — digital goods policy and what we offer instead of refunds.',
    url: 'https://simplakit.com/refund',
  },
  twitter: {
    card: 'summary',
    title: 'Refund Policy | Simpla Kit',
    description: 'SimplaKit Refund Policy — digital goods policy and what we offer instead of refunds.',
  },
}

export default function RefundPage() {
  return <DocLayout title="Refund Policy" lastUpdated="June 29, 2025" content={content} />
}
