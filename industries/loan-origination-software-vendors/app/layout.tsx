import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Loan Recommendation Engine',
  description: 'Recommends the most suitable loan products to applicants based on their financial profile and goals, increasing conversion rates and customer satisfaction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
