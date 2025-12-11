import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Automated Property Data Aggregator',
  description: 'AI-powered tool to automatically collect and consolidate relevant property data from various online sources, saving appraisers time and improving accuracy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
