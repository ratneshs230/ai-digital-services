import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Variant Prioritization',
  description: 'Prioritizes genetic variants for researchers and clinicians based on predicted pathogenicity and relevance to specific diseases.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
