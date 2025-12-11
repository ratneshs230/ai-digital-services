import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yield Optimization AI',
  description: 'AI-powered analysis of manufacturing data to predict and optimize semiconductor yield.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
