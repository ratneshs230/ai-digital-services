import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scholarship Match AI',
  description: 'AI-powered scholarship recommendation engine that provides personalized matches based on student profiles and eligibility criteria.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
