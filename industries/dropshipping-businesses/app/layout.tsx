import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Product Trend Forecaster',
  description: 'Predicts trending products for dropshippers using real-time social media, search, and e-commerce data analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
