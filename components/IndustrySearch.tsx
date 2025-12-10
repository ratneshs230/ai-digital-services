'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import type { IndustryData } from '@/lib/industry-loader'

interface IndustrySearchProps {
  industries: IndustryData[]
}

export function IndustrySearch({ industries }: IndustrySearchProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredIndustries = useMemo(() => {
    if (!query.trim()) return []

    const lowerQuery = query.toLowerCase()
    return industries
      .filter(
        (ind) =>
          ind.industry.toLowerCase().includes(lowerQuery) ||
          ind.idea.toLowerCase().includes(lowerQuery) ||
          ind.oneLineSummary.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 10)
  }, [query, industries])

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search industries, solutions, or use cases..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full rounded-lg border bg-background px-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && filteredIndustries.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredIndustries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 hover:bg-muted transition-colors border-b last:border-b-0"
            >
              <div className="font-medium">{industry.industry}</div>
              <div className="text-sm text-primary">{industry.idea}</div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {industry.oneLineSummary}
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query && filteredIndustries.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg p-4 text-center text-muted-foreground z-50">
          No industries found matching "{query}"
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
