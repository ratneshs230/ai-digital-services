import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Crop Health Diagnostic',
  description: 'Automated analysis of drone imagery to detect crop diseases, nutrient deficiencies, and pest infestations early.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
