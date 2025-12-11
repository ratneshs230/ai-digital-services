import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Personalized Product Curation AI',
  description: 'AI-powered engine that analyzes customer data to curate highly personalized subscription boxes, increasing satisfaction and reducing churn.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
