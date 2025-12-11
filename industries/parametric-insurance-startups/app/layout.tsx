import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Event Definition AI',
  description: 'Automatically defines insurable events and their parameters based on historical data and risk modeling.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
