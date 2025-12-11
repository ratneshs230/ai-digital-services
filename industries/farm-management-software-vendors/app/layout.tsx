import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Crop Scouting Assistant',
  description: 'An AI-powered mobile app that automates crop scouting by identifying pests, diseases, and nutrient deficiencies from drone imagery or smartphone photos.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
