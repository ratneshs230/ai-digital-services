import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adverse Event Prediction Engine',
  description: 'Predicts potential adverse events for drugs based on patient profiles and real-world data, enabling proactive risk mitigation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
