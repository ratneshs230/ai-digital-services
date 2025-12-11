import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Drone-Based Seedling Health Monitor',
  description: 'AI-powered drone imagery analysis to detect and predict seedling health issues early, reducing losses and optimizing resource allocation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
