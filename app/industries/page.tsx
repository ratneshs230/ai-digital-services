import { Suspense } from 'react'
import { Search, Filter } from 'lucide-react'
import { IndustryCard } from '@/components/IndustryCard'
import { loadIndustriesFromCSV } from '@/lib/industry-loader'
import { IndustrySearch } from '@/components/IndustrySearch'

export const metadata = {
  title: 'Industry Solutions | AI Digital Services',
  description: 'Explore 500+ AI-powered solutions across healthcare, finance, retail, and more industries.',
}

export default function IndustriesPage() {
  const industries = loadIndustriesFromCSV()

  // Group industries by first letter for easier navigation
  const groupedIndustries = industries.reduce((acc, industry) => {
    const firstLetter = industry.industry.charAt(0).toUpperCase()
    if (!acc[firstLetter]) {
      acc[firstLetter] = []
    }
    acc[firstLetter].push(industry)
    return acc
  }, {} as Record<string, typeof industries>)

  const sortedLetters = Object.keys(groupedIndustries).sort()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 border-b">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Industry Solutions
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore {industries.length}+ AI-powered solutions tailored for specific industry needs.
              Find the perfect tool to transform your business.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 mx-auto max-w-xl">
            <Suspense fallback={<div className="h-12 bg-muted animate-pulse rounded-lg" />}>
              <IndustrySearch industries={industries} />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="sticky top-16 z-40 bg-background border-b">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sortedLetters.map((letter) => (
              <a
                key={letter}
                href={`#section-${letter}`}
                className="px-3 py-1 text-sm font-medium rounded-md hover:bg-muted transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Industry List */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {sortedLetters.map((letter) => (
            <div key={letter} id={`section-${letter}`} className="mb-12">
              <h2 className="text-2xl font-bold mb-6 sticky top-32 bg-background py-2 border-b">
                {letter}
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({groupedIndustries[letter].length} solutions)
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {groupedIndustries[letter].map((industry) => (
                  <IndustryCard
                    key={industry.slug}
                    slug={industry.slug}
                    name={industry.industry}
                    idea={industry.idea}
                    summary={industry.oneLineSummary}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
