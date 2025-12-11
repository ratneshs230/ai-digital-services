import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Claim Prioritization AI',
  description: 'AI-powered tool to automatically identify and prioritize the most viral and potentially harmful claims circulating online.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
