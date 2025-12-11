'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SliderProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  className?: string
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, className }: SliderProps) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className={cn('relative flex items-center w-full h-5', className)}>
      <div className="absolute w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percent}%` }} />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute w-full h-2 opacity-0 cursor-pointer"
      />
      <div
        className="absolute h-5 w-5 rounded-full bg-primary border-2 border-white shadow-md transition-all"
        style={{ left: `calc(${percent}% - 10px)` }}
      />
    </div>
  )
}
