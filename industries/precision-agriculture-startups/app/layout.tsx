import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YieldBoost AI',
  description: 'AI-powered yield prediction and optimization platform for precision agriculture, providing farmers with actionable insights to maximize crop production.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
