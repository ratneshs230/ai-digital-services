import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Credit Risk AI',
  description: 'AI-powered credit scoring and risk assessment platform for microfinance loan applicants.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
