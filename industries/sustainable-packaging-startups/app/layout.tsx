import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eco-Design Optimizer',
  description: 'AI-powered platform to optimize packaging designs for minimal environmental impact and cost.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
