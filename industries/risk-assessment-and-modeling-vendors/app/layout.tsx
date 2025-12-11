import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Risk Model Explainability AI',
  description: 'AI-powered tool to provide transparent explanations of complex risk model predictions, enhancing trust and auditability.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
