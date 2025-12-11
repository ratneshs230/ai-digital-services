import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Maintenance Advisor',
  description: 'AI-driven service that analyzes telematics data to predict vehicle maintenance needs, preventing breakdowns and reducing downtime.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
