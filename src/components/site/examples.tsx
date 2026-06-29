'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Mail,
  MessageSquare,
  Database,
  Brain,
  CalendarClock,
  FileSpreadsheet,
  Github,
  ShoppingCart,
  Bell,
  Search,
} from 'lucide-react'
import { Stagger, StaggerItem } from '@/components/site/reveal'

const examples = [
  {
    icon: MessageSquare,
    title: 'Telegram-бот для заявок в поддержку',
    description:
      'Принимает сообщения из Telegram, классифицирует категорию через AI, создаёт тикет в HelpDesk и отправляет подтверждение пользователю. Подходит для первой линии поддержки.',
    tags: ['Telegram', 'OpenAI', 'HelpDesk'],
    nodes: 8,
    accent: 'bg-cyan-500',
  },
  {
    icon: Database,
    title: 'ETL: выгрузка данных из CRM в хранилище',
    description:
      'По расписанию забирает новые сделки из HubSpot, трансформирует структуру и заливает в PostgreSQL. С уведомлением об ошибках в Slack и логированием в Google Sheets.',
    tags: ['HubSpot', 'PostgreSQL', 'Slack'],
    nodes: 12,
    accent: 'bg-emerald-500',
  },
  {
    icon: Brain,
    title: 'AI-ассистент для email-входящих',
    description:
      'Читает письма, определяет срочность через GPT-4, формирует черновик ответа и сохраняет в Drafts Gmail. Менеджер только проверяет и отправляет — экономия 70% времени.',
    tags: ['Gmail', 'OpenAI', 'AI'],
    nodes: 9,
    accent: 'bg-rose-500',
  },
  {
    icon: CalendarClock,
    title: 'Авто-расписание встреч из Calendly',
    description:
      'Срабатывает при новой записи в Calendly, создаёт встречу в Google Calendar, добавляет контакт в CRM, отправляет напоминания в Slack и за 15 минут до встречи — повторное письмо участникам.',
    tags: ['Calendly', 'Calendar', 'CRM'],
    nodes: 10,
    accent: 'bg-amber-500',
  },
  {
    icon: FileSpreadsheet,
    title: 'Сводный отчёт из Google Sheets',
    description:
      'Каждый понедельник собирает данные из нескольких таблиц, агрегирует показатели, генерирует PDF-отчёт через HTML-to-PDF и рассылает руководителям по email.',
    tags: ['Sheets', 'PDF', 'Email'],
    nodes: 14,
    accent: 'bg-purple-500',
  },
  {
    icon: Github,
    title: 'Автоматизация DevOps: PR → Deploy',
    description:
      'При новом pull request в GitHub запускает CI-проверки, при успехе — деплой в staging, уведомление в Slack с кнопкой "Promote to prod". При неудаче — алерт в канал разработки.',
    tags: ['GitHub', 'CI/CD', 'Slack'],
    nodes: 11,
    accent: 'bg-slate-700',
  },
  {
    icon: ShoppingCart,
    title: 'Синхронизация заказов e-commerce',
    description:
      'Новые заказы из Shopify автоматически появляются в учётной системе, склад получает заявку на сборку, клиенту приходит трек-номер. Без ручного ввода данных.',
    tags: ['Shopify', 'Inventory', 'Email'],
    nodes: 13,
    accent: 'bg-emerald-600',
  },
  {
    icon: Bell,
    title: 'Мониторинг цены конкурентов',
    description:
      'Раз в час парсит страницы конкурентов через HTTP, сравнивает с вашими ценами в каталоге, при изменении свыше 5% — уведомление в Telegram с кнопкой "Обновить цену".',
    tags: ['HTTP', 'Sheets', 'Telegram'],
    nodes: 7,
    accent: 'bg-orange-500',
  },
]

export function Examples() {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const allTags = useMemo(() => {
    const s = new Set<string>()
    examples.forEach((e) => e.tags.forEach((t) => s.add(t)))
    return Array.from(s).sort()
  }, [])

  const filtered = useMemo(() => {
    if (!activeTag) return examples
    return examples.filter((e) => e.tags.includes(activeTag))
  }, [activeTag])

  return (
    <section id="examples" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ea4b71]">
            Шаг 4
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Примеры использования
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Восемь готовых сценариев из реальной практики. Используйте их как
            стартовые шаблоны: копируйте структуру, меняйте сервисы и
            адаптируйте под свои задачи. Каждый пример — это рабочий workflow,
            который можно собрать за вечер.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant={activeTag === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTag(null)}
            className={
              activeTag === null
                ? 'bg-[#ea4b71] text-white hover:bg-[#d63d61]'
                : ''
            }
          >
            <Search className="mr-1.5 h-3.5 w-3.5" />
            Все ({examples.length})
          </Button>
          {allTags.map((tag) => {
            const count = examples.filter((e) => e.tags.includes(tag)).length
            const isActive = activeTag === tag
            return (
              <Button
                key={tag}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTag(isActive ? null : tag)}
                className={
                  isActive
                    ? 'bg-[#ea4b71] text-white hover:bg-[#d63d61]'
                    : ''
                }
              >
                {tag} ({count})
              </Button>
            )
          })}
        </div>

        <Stagger
          key={activeTag ?? 'all'}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filtered.map((example) => {
            const Icon = example.icon
            return (
              <StaggerItem key={example.title} className="h-full">
                <Card className="group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className={`h-1.5 w-full ${example.accent}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${example.accent} text-white`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {example.nodes} узлов
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-snug">
                      {example.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {example.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {example.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            )
          })}
        </Stagger>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Нет примеров с таким тегом. Выберите другую категорию.
          </p>
        )}
      </div>
    </section>
  )
}
