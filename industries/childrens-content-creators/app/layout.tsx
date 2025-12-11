import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Story Spark AI',
  description: 'AI-powered idea generator for children\'s stories, providing unique prompts and plot twists based on user-defined themes and age groups.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
