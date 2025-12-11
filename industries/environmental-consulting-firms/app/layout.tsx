import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EcoAI: Environmental Impact Assessment Automation',
  description: 'Automates and accelerates environmental impact assessments (EIAs) using AI to analyze diverse data sources.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
