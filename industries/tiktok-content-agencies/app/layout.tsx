import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trend Forecaster AI',
  description: 'Predicts emerging TikTok trends and viral content themes using machine learning analysis of video data and user behavior.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
