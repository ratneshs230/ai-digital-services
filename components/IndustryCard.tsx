import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn, truncate } from '@/lib/utils'

interface IndustryCardProps {
  slug: string
  name: string
  idea: string
  summary: string
  icon?: React.ReactNode
  className?: string
}

export function IndustryCard({
  slug,
  name,
  idea,
  summary,
  icon,
  className,
}: IndustryCardProps) {
  return (
    <Link
      href={`/industries/${slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/50",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon || (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-6 group-hover:text-primary transition-colors">
        {name}
      </h3>

      <p className="mt-1 text-sm font-medium text-primary/80">
        {idea}
      </p>

      <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
        {truncate(summary, 150)}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
        <span>Explore solution</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  )
}
