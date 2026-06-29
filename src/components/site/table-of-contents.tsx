'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TOCItem {
  id: string
  label: string
}

const tocItems: TOCItem[] = [
  { id: 'what-is', label: 'Что такое n8n' },
  { id: 'install', label: 'Установка' },
  { id: 'concepts', label: 'Понятия' },
  { id: 'ai-generator', label: 'AI-генератор' },
  { id: 'builder', label: 'Визуализатор' },
  { id: 'lessons', label: 'Уроки' },
  { id: 'examples', label: 'Примеры' },
  { id: 'comparison', label: 'Сравнение' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'faq', label: 'FAQ' },
]

export function TableOfContents() {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 z-50 h-11 w-11 rounded-full border bg-background/80 shadow-lg backdrop-blur-sm lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Содержание страницы"
      >
        <List className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-64 border-r bg-background p-4 shadow-xl lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Содержание</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      activeId === item.id
                        ? 'bg--brand/10 font-medium text--brand'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
