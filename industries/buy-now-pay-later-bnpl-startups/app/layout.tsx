import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Creditworthiness Prediction',
  description: 'Predicts a user\'s likelihood of repaying BNPL loans using alternative data sources and machine learning, improving approval rates and reducing defaults.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
