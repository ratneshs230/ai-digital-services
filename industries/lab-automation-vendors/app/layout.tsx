import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Experiment Designer',
  description: 'An AI tool that designs optimal experiment workflows based on user objectives and constraints, minimizing resource usage and maximizing data quality.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
