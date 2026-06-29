'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Keyboard } from 'lucide-react'

interface Shortcut {
  keys: string[]
  description: string
}

const shortcuts: { group: string; items: Shortcut[] }[] = [
  {
    group: 'Навигация',
    items: [
      { keys: ['⌘', 'K'], description: 'Открыть поиск (Cmd+K)' },
      { keys: ['Ctrl', 'K'], description: 'Открыть поиск (Windows/Linux)' },
      { keys: ['Esc'], description: 'Закрыть диалог / вернуться' },
    ],
  },
  {
    group: 'Разделы',
    items: [
      { keys: ['1'], description: 'Перейти к «Что такое n8n»' },
      { keys: ['2'], description: 'Перейти к «Установка»' },
      { keys: ['3'], description: 'Перейти к «Понятия»' },
      { keys: ['4'], description: 'Перейти к «AI-генератор»' },
      { keys: ['5'], description: 'Перейти к «Уроки»' },
    ],
  },
  {
    group: 'Действия',
    items: [
      { keys: ['T'], description: 'Сменить тему (светлая/тёмная)' },
      { keys: ['↑'], description: 'Наверх страницы' },
    ],
  },
]

export function ShortcutsHelp() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground"
          aria-label="Сочетания клавиш"
          title="Нажмите ? для справки"
        >
          <Keyboard className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Сочетания клавиш
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {shortcuts.map((group) => (
            <div key={group.group}>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.group}
              </h4>
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <div
                    key={item.description}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm text-foreground">
                      {item.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.keys.map((key) => (
                        <kbd
                          key={key}
                          className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Нажмите <kbd className="rounded border bg-muted px-1 py-0.5 font-mono text-[10px]">?</kbd> в любой момент для открытия этой справки
        </p>
      </DialogContent>
    </Dialog>
  )
}
