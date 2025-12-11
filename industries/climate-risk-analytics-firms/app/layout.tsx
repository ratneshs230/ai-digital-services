import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Climate Scenario Generator',
  description: 'Generates tailored climate change scenarios based on user-defined parameters and risk profiles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
