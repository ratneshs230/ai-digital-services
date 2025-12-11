import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI-Powered Voter Outreach',
  description: 'Predictive AI identifies likely non-voters and personalizes outreach to increase voter turnout.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
