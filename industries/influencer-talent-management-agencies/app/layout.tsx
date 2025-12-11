import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Influencer Discovery',
  description: 'Find emerging and niche influencers using AI-driven social listening and predictive analytics to identify high-potential candidates beyond follower counts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
