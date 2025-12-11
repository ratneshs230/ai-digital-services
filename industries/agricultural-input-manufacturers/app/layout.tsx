import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Crop Recommendation Engine',
  description: 'Predicts optimal crop inputs (fertilizers, pesticides, seeds) based on soil analysis, weather patterns, and historical yield data to maximize crop yield an',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
