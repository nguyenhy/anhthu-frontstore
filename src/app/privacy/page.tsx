import type { Metadata } from 'next'
import DocLayout from '@/components/legal/DocLayout'
import content from '@/content/legal/privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'SimplaKit Privacy Policy — what data we collect and how we use it.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Simpla Kit',
    description: 'SimplaKit Privacy Policy — what data we collect and how we use it.',
    url: 'https://simplakit.com/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Simpla Kit',
    description: 'SimplaKit Privacy Policy — what data we collect and how we use it.',
  },
}

export default function PrivacyPage() {
  return <DocLayout title="Privacy Policy" lastUpdated="June 29, 2025" content={content} />
}
