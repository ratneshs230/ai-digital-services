'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Loader2, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function DemoPage() {
  const params = useParams()
  const slug = params.slug as string
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: slug, input }),
      })

      const data = await res.json()
      setResponse(data.response || data.error || 'No response received')
    } catch (error) {
      setResponse('Error: Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Format the slug for display
  const industryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        <Link
          href={`/industries/${slug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {industryName}
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Live Demo
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {industryName} AI Assistant
          </h1>
          <p className="mt-4 text-muted-foreground">
            Try our AI-powered solution. Enter your query below and see the AI in action.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
          {/* Chat Area */}
          <div className="min-h-[300px] p-6 bg-muted/30">
            {!response && !isLoading && (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                  <p>Enter a query to see the AI response</p>
                  <p className="text-sm mt-2">
                    Example: "Analyze symptoms: headache, fatigue, mild fever"
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}

            {response && !isLoading && (
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">You asked:</p>
                  <p>{input}</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="text-sm font-medium text-primary mb-1">AI Response:</p>
                  <p className="whitespace-pre-wrap">{response}</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your query..."
                className="flex-1 rounded-lg border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </button>
            </div>
          </form>
        </div>

        {/* Usage Info */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            This is a demo with rate-limited API access. For production use, please{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact our sales team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
