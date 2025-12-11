import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yield Optimization AI',
  description: 'AI-powered system to predict and optimize crop yields in vertical farms by analyzing environmental data and plant health.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
