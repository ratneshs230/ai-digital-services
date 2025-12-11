import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Simulation-as-a-Service',
  description: 'On-demand, scalable cloud simulation platform for AV testing, powered by generative AI to create diverse, realistic scenarios.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
