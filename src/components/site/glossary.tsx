'use client'

import { useState, useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, X, BookOpen } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal'

interface GlossaryEntry {
  term: string
  definition: string
  example?: string
  category: string
}

const glossary: GlossaryEntry[] = [
  {
    term: 'Workflow',
    definition:
      'Связанный набор узлов, выполняющий автоматизацию. Представляет собой направленный граф: узлы соединены связями, по которым данные передаются от одного шага к другому. Сохраняется в формате JSON.',
    example: '{"nodes": [...], "connections": {...}, "active": true}',
    category: 'Основы',
  },
  {
    term: 'Node (Узел)',
    definition:
      'Атомарная операция в workflow: HTTP-запрос, отправка email, вызов AI. У каждого узла есть входы и выходы, параметры настройки и логика обработки.',
    example: 'HTTP Request → GET https://api.example.com/users',
    category: 'Основы',
  },
  {
    term: 'Trigger (Триггер)',
    definition:
      'Особый узел, с которого начинается workflow. Реагирует на событие: webhook, расписание cron, новая запись в RSS.',
    example: 'Schedule Trigger: каждые 5 минут',
    category: 'Основы',
  },
  {
    term: 'Credentials',
    definition:
      'Зашифрованные данные для подключения к внешним сервисам: токены API, логины и пароли, OAuth-токены. Хранятся отдельно от workflow.',
    example: 'N8N_ENCRYPTION_KEY=your-secret-key',
    category: 'Безопасность',
  },
  {
    term: 'Items & JSON',
    definition:
      'Данные в n8n передаются между узлами в виде массива items — объектов JSON. Каждый item имеет поля json и binary.',
    example: '[{"json": {"name": "Anna", "email": "a@b.com"}}]',
    category: 'Данные',
  },
  {
    term: 'Expression',
    definition:
      'Динамические значения и логика в полях параметров. Синтаксис {{ $json.field }} даёт доступ к данным текущего item.',
    example: '{{ $json.email }} → anna@example.com',
    category: 'Данные',
  },
  {
    term: 'Code Node',
    definition:
      'Узел для произвольного JavaScript или Python кода. Полный доступ к данным workflow и npm-модулям.',
    example: 'return items.map(item => ({json: {upper: item.json.name.toUpperCase()}}))',
    category: 'Продвинутое',
  },
  {
    term: 'Webhook',
    definition:
      'HTTP-эндпоинт, который n8n создаёт для приёма входящих данных. Внешние сервисы могут отправлять POST/GET запросы на этот URL.',
    example: 'POST https://your-n8n.com/webhook/my-trigger',
    category: 'Интеграции',
  },
  {
    term: 'Execution',
    definition:
      'Один запуск workflow: от срабатывания триггера до завершения последнего узла. Логируются все шаги, входные/выходные данные и ошибки.',
    category: 'Производительность',
  },
  {
    term: 'Queue Mode',
    definition:
      'Режим для масштабирования: main-сервер распределяет задачи по воркерам. Позволяет обрабатывать тысячи workflow параллельно.',
    example: 'N8N_QUEUE_MODE=redis',
    category: 'Продвинутое',
  },
  {
    term: 'Expression Editor',
    definition:
      'Встроенный редактор для написания выражений с подсветкой синтаксиса, автодополнением и предпросмотром результата.',
    category: 'Интерфейс',
  },
  {
    term: 'Sticky Notes',
    definition:
      'Заметки на холсте workflow для документации: описание логики, ссылки на доки, напоминания для команды.',
    category: 'Интерфейс',
  },
]

const allCategories = [...new Set(glossary.map((item) => item.category))]

export function Glossary() {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search.trim()) return glossary
    const query = search.toLowerCase()
    return glossary.filter(
      (item) =>
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    )
  }, [search])

  return (
    <section id="glossary" className="scroll-mt-16 border-y bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Справочник
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Глоссарий терминов n8n
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Все ключевые термины платформы в одном месте. Используйте поиск
            для быстрого нахождения нужного определения.
          </p>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Найти термин..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-10"
              aria-label="Поиск по глоссарию"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground hover:text-foreground"
                aria-label="Очистить поиск"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mb-6 flex flex-wrap gap-1.5">
            <Badge
              variant={search === '' ? 'default' : 'outline'}
              className={`cursor-pointer text-[10px] ${
                search === '' ? 'bg--brand text-white' : 'hover:bg--brand/10'
              }`}
              onClick={() => setSearch('')}
            >
              Все ({glossary.length})
            </Badge>
            {allCategories.map((cat) => (
              <Badge
                key={cat}
                variant={search === cat ? 'default' : 'outline'}
                className={`cursor-pointer text-[10px] ${
                  search === cat
                    ? 'bg--brand text-white'
                    : 'hover:bg--brand/10'
                }`}
                onClick={() => setSearch(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>

          <Stagger
            key={search ?? 'all'}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item) => (
              <StaggerItem key={item.term}>
                <div className="h-full rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text--brand" />
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.term}
                    </h3>
                  </div>
                  <Badge variant="secondary" className="mb-3 text-[9px]">
                    {item.category}
                  </Badge>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.definition}
                  </p>
                  {item.example && (
                    <pre className="mt-3 overflow-x-auto rounded-md bg-muted/50 p-2 font-mono text-[10px] leading-snug text-foreground">
                      {item.example}
                    </pre>
                  )}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {filtered.length === 0 && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Термин «{search}» не найден. Попробуйте другой запрос.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
