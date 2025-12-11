import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Property Valuation & Risk Assessment',
  description: 'Predictive analytics platform that uses machine learning to forecast property values and assess risks based on market trends, economic indicators, and prop',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
