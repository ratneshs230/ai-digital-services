'use client'
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) setValue(JSON.parse(stored))
    } catch {}
  }, [key])

  const set = (newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const val = newValue instanceof Function ? newValue(prev) : newValue
      try { localStorage.setItem(key, JSON.stringify(val)) } catch {}
      return val
    })
  }

  return [value, set] as const
}
