import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Credit Risk Simulator',
  description: 'A simulation platform that allows credit risk analysts to model the impact of various economic scenarios and policy changes on credit portfolios.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
