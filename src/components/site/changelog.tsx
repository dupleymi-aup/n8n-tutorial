'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sparkles,
  Zap,
  Bug,
  BookOpen,
  Palette,
  Globe,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal'

type ChangeType = 'feature' | 'improvement' | 'fix' | 'content' | 'design' | 'i18n'

interface ChangelogEntry {
  version: string
  date: string
  type: ChangeType
  title: string
  description: string
}

const changeTypeConfig: Record<ChangeType, { icon: typeof Sparkles; label: string; color: string }> = {
  feature: { icon: Sparkles, label: 'Новая фича', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  improvement: { icon: Zap, label: 'Улучшение', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  fix: { icon: Bug, label: 'Исправление', color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
  content: { icon: BookOpen, label: 'Контент', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  design: { icon: Palette, label: 'Дизайн', color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
  i18n: { icon: Globe, label: 'Локализация', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' },
}

const changelog: ChangelogEntry[] = [
  {
    version: '0.3.0',
    date: '29 июня 2026',
    type: 'feature',
    title: 'Глоссарий терминов n8n',
    description: 'Отдельный раздел-справочник со всеми ключевыми терминами. Поиск и фильтрация по категориям.',
  },
  {
    version: '0.3.0',
    date: '29 июня 2026',
    type: 'feature',
    title: 'Поиск по FAQ',
    description: 'Добавлена возможность поиска и фильтрации вопросов по ключевым словам и категориям.',
  },
  {
    version: '0.3.0',
    date: '29 июня 2026',
    type: 'feature',
    title: 'Сочетания клавиш',
    description: 'Модальное окно справки с перечнем горячих клавиш. Открывается клавишей ?.',
  },
  {
    version: '0.3.0',
    date: '29 июня 2026',
    type: 'improvement',
    title: 'SEO: JSON-LD разметка',
    description: 'Добавлена структурированная разметка Schema.org для улучшения индексации.',
  },
  {
    version: '0.3.0',
    date: '29 июня 2026',
    type: 'improvement',
    title: 'Доступность: skip-to-content',
    description: 'Ссылка для перехода к основному содержимому для скринридеров.',
  },
  {
    version: '0.2.0',
    date: '28 июня 2026',
    type: 'design',
    title: 'Бренд-цвета n8n',
    description: 'Извлечены фирменные цвета n8n: primary #ea4b71, gradient #ea4b71 → #ea8a4b.',
  },
  {
    version: '0.2.0',
    date: '28 июня 2026',
    type: 'content',
    title: '6 практических уроков',
    description: 'Пошаговые руководства от создания первого workflow до публикации и совместной работы.',
  },
  {
    version: '0.1.0',
    date: '27 июня 2026',
    type: 'feature',
    title: 'AI-генератор workflow',
    description: 'Опишите задачу на русском — получите готовую структуру workflow от AI.',
  },
]

export function Changelog() {
  const versions = [...new Set(changelog.map((e) => e.version))]

  return (
    <section id="changelog" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Обновления
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Что нового
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            История обновлений проекта. Каждая версия — это улучшения,
            новые разделы и исправления.
          </p>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border sm:left-6" />

            <div className="space-y-8">
              {versions.map((version) => {
                const entries = changelog.filter((e) => e.version === version)
                const firstDate = entries[0]?.date
                return (
                  <div key={version} className="relative">
                    {/* Version dot */}
                    <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border--brand bg-background sm:left-4.5" />

                    <div className="ml-10 sm:ml-14">
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="outline" className="border--brand/30 bg--brand/10 text--brand-dark">
                          v{version}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{firstDate}</span>
                      </div>

                      <div className="space-y-3">
                        {entries.map((entry, idx) => {
                          const config = changeTypeConfig[entry.type]
                          const Icon = config.icon
                          return (
                            <Card key={idx} className="overflow-hidden">
                              <CardContent className="flex items-start gap-3 p-4">
                                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${config.color}`}>
                                  <Icon className="h-3.5 w-3.5" />
                                </span>
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-sm font-semibold text-foreground">
                                      {entry.title}
                                    </h4>
                                    <Badge variant="secondary" className="text-[9px]">
                                      {config.label}
                                    </Badge>
                                  </div>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {entry.description}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
