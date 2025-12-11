import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Personalized Meal Kit Recommendation Engine',
  description: 'AI-powered engine that recommends personalized meal kits based on dietary restrictions, preferences, and past order history.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
