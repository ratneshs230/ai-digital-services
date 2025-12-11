import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Risk Portfolio Optimizer',
  description: 'AI-powered tool that analyzes reinsurance portfolios and suggests optimal risk diversification strategies to maximize returns and minimize potential losses',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
