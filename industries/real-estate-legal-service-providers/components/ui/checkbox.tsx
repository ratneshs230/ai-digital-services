'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface CheckboxProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  id?: string
}

export function Checkbox({ checked, onCheckedChange, className, id }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      id={id}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-5 w-5 shrink-0 rounded border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        checked && 'bg-primary border-primary',
        className
      )}
    >
      {checked && <Check className="h-4 w-4 text-primary-foreground mx-auto" />}
    </button>
  )
}
