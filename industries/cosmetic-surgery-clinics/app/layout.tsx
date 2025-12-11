import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Surgical Outcome Predictor',
  description: 'Predicts potential surgical outcomes based on patient data and surgical plans, enhancing patient expectations and satisfaction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
