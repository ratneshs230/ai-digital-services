import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Policy Trend Forecaster',
  description: 'Predicts emerging policy trends and their potential impact using machine learning on global news, academic research, and government publications.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
