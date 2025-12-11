import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Process Mining & Optimization',
  description: 'Analyzes business processes using AI to identify bottlenecks, inefficiencies, and automation opportunities, recommending data-driven improvements.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
