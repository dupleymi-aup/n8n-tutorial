'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'

// Subscribe to a no-op external store that always returns true after mount.
// This avoids the "setState in effect" lint rule while still gating on mount.
const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const [isHover, setIsHover] = useState(false)

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9" disabled>
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 relative"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      suppressHydrationWarning
    >
      <Sun
        className={`h-4 w-4 transition-all ${
          isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute h-4 w-4 transition-all ${
          isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        }`}
      />
      {isHover && <span className="sr-only">Сменить тему</span>}
    </Button>
  )
}
