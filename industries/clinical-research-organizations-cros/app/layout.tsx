import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trial Eligibility Predictor',
  description: 'AI-powered tool to predict patient eligibility for clinical trials based on medical records and trial protocols.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
