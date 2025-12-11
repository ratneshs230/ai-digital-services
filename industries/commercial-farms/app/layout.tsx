import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crop Disease Predictor',
  description: 'AI-powered service that predicts crop diseases before they visibly manifest, allowing for proactive treatment.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
