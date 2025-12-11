import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crop Yield Prediction & Credit Scoring',
  description: 'AI-powered platform that combines satellite imagery, weather data, and historical yields to predict crop yields and generate credit scores for farmers.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
