import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Predictive Maintenance AI for Off-Grid Systems',
  description: 'AI-powered predictive maintenance service to minimize downtime and maximize the lifespan of off-grid energy systems.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
