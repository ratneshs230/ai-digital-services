import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'RiskAI Underwriter',
  description: 'AI-powered underwriting platform that analyzes diverse data sources to assess risk and automate policy pricing.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
