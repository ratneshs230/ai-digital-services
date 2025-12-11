import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Case Victory Predictor',
  description: 'AI-powered tool that predicts the likelihood of winning a case based on case details, judge history, and legal precedents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
