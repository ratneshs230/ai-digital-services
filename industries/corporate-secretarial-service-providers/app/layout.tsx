import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Compliance Foresight AI',
  description: 'Predicts upcoming regulatory changes and their impact on client companies using AI-driven legal analysis and forecasting.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
