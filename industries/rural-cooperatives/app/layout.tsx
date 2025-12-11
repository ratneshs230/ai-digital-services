import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agri-Predict',
  description: 'AI-powered crop yield prediction and risk assessment tool for optimizing planting decisions and resource allocation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
