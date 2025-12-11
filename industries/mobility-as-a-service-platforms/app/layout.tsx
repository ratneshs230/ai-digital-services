import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dynamic Route Optimization',
  description: 'Real-time route adjustments based on predictive traffic and demand modeling to optimize vehicle utilization and minimize passenger wait times.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
