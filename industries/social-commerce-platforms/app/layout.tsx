import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Influencer Matching AI',
  description: 'Automatically connects brands with relevant social media influencers based on audience demographics, engagement rates, and brand values.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
