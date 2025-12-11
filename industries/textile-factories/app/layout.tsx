import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fabric Defect AI Inspector',
  description: 'AI-powered visual inspection system that detects fabric defects in real-time during production.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
