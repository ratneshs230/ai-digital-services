import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Content Recommendation Engine',
  description: 'Suggests the most relevant content to sales reps based on deal stage, customer profile, and past interactions, improving engagement and closing rates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
