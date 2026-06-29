'use client'

import { useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  BookOpen,
  Boxes,
  Brain,
  Building2,
  Code2,
  Download,
  HelpCircle,
  Lightbulb,
  Rocket,
  Server,
  Sparkles,
  Wrench,
  Github,
  ExternalLink,
  GraduationCap,
  BookMarked,
} from 'lucide-react'

interface SearchItem {
  label: string
  hint?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  group: string
  keywords?: string
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      // ESC handled by CommandDialog itself
    }
    window.addEventListener('keydown', onKey)
    // Allow other components (e.g. Header) to open the palette
    const onOpen = () => setOpen(true)
    window.addEventListener('n8n-school:open-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('n8n-school:open-search', onOpen)
    }
  }, [])

  const goTo = (href: string) => {
    setOpen(false)
    // small delay so dialog closes first
    setTimeout(() => {
      const el = document.getElementById(href.replace('#', ''))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.location.hash = href
      }
    }, 50)
  }

  const openExternal = (url: string) => {
    setOpen(false)
    setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 50)
  }

  const items: SearchItem[] = [
    // Разделы сайта
    {
      label: 'Что такое n8n',
      hint: 'Возможности платформы',
      icon: BookOpen,
      action: () => goTo('#what-is'),
      group: 'Разделы',
      keywords: 'что это основы возможности',
    },
    {
      label: 'Установка и запуск',
      hint: 'npm, Docker, Cloud, Desktop',
      icon: Server,
      action: () => goTo('#install'),
      group: 'Разделы',
      keywords: 'docker npm cloud desktop install',
    },
    {
      label: 'Ключевые понятия',
      hint: 'Workflow, Node, Trigger',
      icon: Code2,
      action: () => goTo('#concepts'),
      group: 'Разделы',
      keywords: 'понятия workflow node trigger credentials',
    },
    {
      label: 'AI-генератор workflow',
      hint: 'Опишите задачу — получите структуру',
      icon: Sparkles,
      action: () => goTo('#ai-generator'),
      group: 'Разделы',
      keywords: 'ai генератор gpt llm',
    },
    {
      label: 'Визуализатор workflow',
      hint: 'Попробуйте построить цепочку',
      icon: Boxes,
      action: () => goTo('#builder'),
      group: 'Разделы',
      keywords: 'демо builder визуализатор',
    },
    {
      label: 'Практические уроки',
      hint: '6 пошаговых руководств',
      icon: GraduationCap,
      action: () => goTo('#lessons'),
      group: 'Разделы',
      keywords: 'уроки обучение практика',
    },
    {
      label: 'Примеры использования',
      hint: '8 готовых сценариев',
      icon: Lightbulb,
      action: () => goTo('#examples'),
      group: 'Разделы',
      keywords: 'примеры сценарии use case',
    },
    {
      label: 'Сравнение с Zapier и Make',
      hint: 'Таблица возможностей',
      icon: Wrench,
      action: () => goTo('#comparison'),
      group: 'Разделы',
      keywords: 'сравнение zapier make',
    },
    {
      label: 'Roadmap обучения',
      hint: '5 уровней развития',
      icon: Rocket,
      action: () => goTo('#roadmap'),
      group: 'Разделы',
      keywords: 'roadmap путь уровни развитие',
    },
    {
      label: 'Глоссарий терминов',
      hint: 'Справочник ключевых понятий',
      icon: BookMarked,
      action: () => goTo('#glossary'),
      group: 'Разделы',
      keywords: 'глоссарий справочник термины определения',
    },
    {
      label: 'Частые вопросы',
      hint: 'FAQ по n8n',
      icon: HelpCircle,
      action: () => goTo('#faq'),
      group: 'Разделы',
      keywords: 'faq вопросы',
    },
    // Действия
    {
      label: 'Сменить тему',
      hint: 'Светлая / тёмная',
      icon: Brain,
      action: () => {
        setOpen(false)
        document.documentElement.classList.toggle('dark')
      },
      group: 'Действия',
      keywords: 'тема dark light',
    },
    {
      label: 'Наверх страницы',
      hint: 'Прокрутить к началу',
      icon: Rocket,
      action: () => {
        setOpen(false)
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
      },
      group: 'Действия',
      keywords: 'наверх top scroll',
    },
    // Внешние ресурсы
    {
      label: 'Документация n8n',
      hint: 'docs.n8n.io',
      icon: ExternalLink,
      action: () => openExternal('https://docs.n8n.io'),
      group: 'Ресурсы',
      keywords: 'docs документация',
    },
    {
      label: 'GitHub репозиторий n8n',
      hint: 'github.com/n8n-io/n8n',
      icon: Github,
      action: () => openExternal('https://github.com/n8n-io/n8n'),
      group: 'Ресурсы',
      keywords: 'github репозиторий исходники',
    },
    {
      label: 'Шаблоны workflow',
      hint: 'n8n.io/workflows',
      icon: Download,
      action: () => openExternal('https://n8n.io/workflows'),
      group: 'Ресурсы',
      keywords: 'шаблоны templates',
    },
    {
      label: 'Форум сообщества',
      hint: 'community.n8n.io',
      icon: Building2,
      action: () => openExternal('https://community.n8n.io'),
      group: 'Ресурсы',
      keywords: 'форум community сообщество',
    },
  ]

  // Group items by group name, preserving order
  const groups: Record<string, SearchItem[]> = {}
  for (const item of items) {
    if (!groups[item.group]) groups[item.group] = []
    groups[item.group].push(item)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Поиск по сайту: разделы, действия, ресурсы…" />
      <CommandList>
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        {Object.entries(groups).map(([groupName, groupItems]) => (
          <CommandGroup key={groupName} heading={groupName}>
            {groupItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem
                  key={item.label}
                  value={`${item.label} ${item.hint ?? ''} ${item.keywords ?? ''}`}
                  onSelect={() => item.action()}
                >
                  <Icon className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.hint && (
                      <span className="text-xs text-muted-foreground">
                        {item.hint}
                      </span>
                    )}
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Подсказка">
          <div className="px-3 py-2 text-xs text-muted-foreground">
            Нажмите{' '}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              {typeof navigator !== 'undefined' &&
              /Mac/i.test(navigator.userAgent)
                ? '⌘'
                : 'Ctrl'}
              +K
            </kbd>{' '}
            в любой момент, чтобы открыть поиск. ESC — закрыть.
          </div>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
