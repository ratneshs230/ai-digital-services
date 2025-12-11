import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Process Discovery AI',
  description: 'Automatically discover and document RPA-suitable processes from user activity logs and system event data using AI-powered analysis.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
