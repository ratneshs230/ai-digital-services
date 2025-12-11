import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Risk Scoring',
  description: 'Predictive risk assessment platform using AI to analyze a company\'s security posture and generate a risk score for cyber insurance underwriting.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
