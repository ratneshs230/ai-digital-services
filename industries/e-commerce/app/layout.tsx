import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Product Recommendation Engine',
  description: 'A personalized product recommendation system that leverages AI to suggest relevant items to customers based on their browsing history and purchase patterns',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
