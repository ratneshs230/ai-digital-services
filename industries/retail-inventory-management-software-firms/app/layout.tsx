import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Demand Forecasting',
  description: 'Predict future product demand with high accuracy using machine learning to optimize inventory levels and minimize stockouts or overstocking.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
