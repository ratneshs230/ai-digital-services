import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Failure Alerts',
  description: 'AI-driven system that predicts potential product failures before they occur, enabling proactive maintenance and reducing warranty claims.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
