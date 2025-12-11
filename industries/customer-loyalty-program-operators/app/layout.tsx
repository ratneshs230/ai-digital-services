import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Loyalty Program Optimizer',
  description: 'AI-powered A/B testing and optimization of loyalty program elements to maximize engagement and ROI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
