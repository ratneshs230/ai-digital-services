import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EpiForecaster',
  description: 'AI-powered platform predicting emerging infectious disease outbreaks to guide vaccine development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
