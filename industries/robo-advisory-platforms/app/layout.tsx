import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Driven Tax Loss Harvesting+',
  description: 'Dynamically identifies and executes tax-loss harvesting opportunities beyond standard strategies, incorporating real-time market data and individual tax si',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
