import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AquaHealth AI',
  description: 'Real-time AI-powered disease detection and diagnostics for aquaculture farms, minimizing losses and improving fish health.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
