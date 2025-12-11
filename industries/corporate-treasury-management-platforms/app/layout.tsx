import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Cash Flow Forecasting',
  description: 'Predict cash flow with greater accuracy using machine learning algorithms that analyze historical data, market trends, and macroeconomic factors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
