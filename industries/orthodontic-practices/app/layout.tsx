import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Treatment Planner',
  description: 'Automatically generates optimized treatment plans based on patient scans and AI-predicted outcomes.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
