'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DemoPage() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))

    setResponse(`Based on your input about "${input}", our AI system would provide:

1. **Analysis**: Comprehensive evaluation of your query
2. **Recommendations**: Actionable insights specific to Hospitals and health systems
3. **Next Steps**: Clear guidance for implementation

This is a demonstration. Contact us for full functionality.`)

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">AI-Powered Patient Triage & Routing</h1>
          <p className="text-gray-600 mt-2">Interactive Demo</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="min-h-[300px] p-6 bg-gray-50">
            {!response && !loading && (
              <div className="text-center text-gray-500">
                Enter your query below to see the AI in action
              </div>
            )}
            {loading && (
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-600">Processing...</p>
              </div>
            )}
            {response && !loading && (
              <div className="prose max-w-none">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <strong>Your Query:</strong> {input}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg whitespace-pre-wrap">
                  {response}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4 flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your query..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
