import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Viral Video Predictor',
  description: 'Predicts the likelihood of a video going viral based on historical data and AI analysis of content elements.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
