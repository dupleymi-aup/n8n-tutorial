'use client'

import {
  Workflow,
  Box,
  Radio,
  KeyRound,
  Webhook,
  FileJson,
  GitMerge,
  ArrowRight,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal'
import { GlossaryTerm } from '@/components/site/glossary-term'

const concepts = [
  {
    icon: Workflow,
    title: 'Workflow (Сценарий)',
    short: 'Связанный набор узлов, выполняющий автоматизацию',
    description:
      'Workflow — это основной объект в n8n. Он представляет собой направленный граф: узлы соединены связями, по которым данные передаются от одного шага к другому. Один workflow может содержать десятки и сотни узлов, переменные, условные ветвления и циклы. Сохраняется в формате JSON, поэтому его можно экспортировать, версионировать в Git и делиться с командой.',
    color: 'bg--brand/10 text--brand',
  },
  {
    icon: Box,
    title: 'Node (Узел)',
    short: 'Отдельный шаг в workflow',
    description:
      'Узел — это атомарная операция: отправить HTTP-запрос, добавить строку в Google Sheets, запустить AI-модель. У каждого узла есть входы и выходы, параметры настройки и логика обработки. Узлы делятся на типы: триггеры, действия, маршрутизаторы и специализированные интеграции. Можно создавать собственные узлы на TypeScript.',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: Radio,
    title: 'Trigger (Триггер)',
    short: 'Узел, запускающий workflow',
    description:
      'Триггер — это особый узел, с которого начинается любой workflow. Он реагирует на событие: приход webhook, новая запись в RSS, расписание cron, изменение в Google Drive. Без триггера workflow не запустится. В одном сценарии может быть несколько триггеров, и срабатывание любого из них приведёт к выполнению соответствующей ветки.',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: KeyRound,
    title: 'Credentials (Учётные данные)',
    short: 'Безопасное хранение ключей API и доступов',
    description:
      'Credentials — это зашифрованные данные для подключения к внешним сервисам: токены API, логины и пароли, OAuth-токены. Хранятся отдельно от workflow, что позволяет переиспользовать их в разных сценариях и легко отзывать доступ. При обмене workflow между пользователями credentials не передаются — каждый подключает свои.',
    color: 'bg-purple-500/10 text-purple-600',
    glossary: [
      { keyword: 'OAuth-токены', term: 'OAuth', definition: 'Открытый протокол авторизации, который позволяет приложениям получать доступ к данным пользователя без передачи пароля. В n8n используется для подключения Google, Slack, GitHub и других сервисов.', example: 'Подключение Google Sheets: n8n открывает окно Google, пользователь даёт разрешение, n8n получает токен.' },
    ],
  },
  {
    icon: FileJson,
    title: 'Items & JSON',
    short: 'Формат данных между узлами',
    description:
      'Данные в n8n передаются между узлами в виде массива items — объектов JSON. Каждый item имеет поля json и binary. Это даёт универсальность: можно обрабатывать как один объект, так и тысячи. Узлы автоматически перебирают массивы, поэтому циклы часто не нужны — n8n делает это сам.',
    color: 'bg-cyan-500/10 text-cyan-600',
  },
  {
    icon: GitMerge,
    title: 'Expressions (Выражения)',
    short: 'Динамические значения и логика',
    description:
      "Expressions позволяют обращаться к данным предыдущих узлов, вычислять значения и применять функции прямо в полях параметров. Синтаксис {{ $json.field }} даёт доступ к данным текущего item, а {{ $('NodeName').item.json.field }} — к данным другого узла. Поддерживаются методы Luxon для дат, функции массивов и строк.",
    color: 'bg-rose-500/10 text-rose-600',
  },
]

export function Concepts() {
  return (
    <section id="concepts" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Шаг 2
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Ключевые понятия
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Чтобы уверенно работать с n8n, нужно понимать шесть основных
            терминов: <GlossaryTerm term="Workflow" definition="Связанный набор узлов, выполняющий автоматизацию. Сохраняется в формате JSON, что позволяет экспортировать и делиться сценариями.">workflow</GlossaryTerm>,{' '}
            <GlossaryTerm term="Node" definition="Атомарная операция в сценарии: HTTP-запрос, отправка email, вызов AI. Узлы соединяются связями на холсте.">узлы</GlossaryTerm>,{' '}
            <GlossaryTerm term="Trigger" definition="Особый узел, с которого начинается workflow. Реагирует на событие: webhook, расписание cron, новая запись в RSS.">триггеры</GlossaryTerm>, credentials, items и expressions.
            Они встречаются в каждом сценарии и являются основой всей
            платформы. Освоив их, вы сможете читать и проектировать сценарии
            любой сложности.
          </p>
        </div>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {concepts.map((concept) => {
            const Icon = concept.icon
            return (
              <StaggerItem
                key={concept.title}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${concept.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {concept.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                      {concept.short}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {concept.description}
                </p>
              </StaggerItem>
            )
          })}
        </Stagger>

        {/* Visualization: example workflow */}
        <Reveal
          delay={0.1}
          className="mt-16 rounded-2xl border bg-gradient-to-br from-background to-muted/30 p-6 sm:p-10"
        >
          <h3 className="text-center text-xl font-bold text-foreground">
            Как выглядит типичный workflow
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            Пример автоматизации: при получении webhook от формы создаётся
            задача в Trello, отправляется уведомление в Slack и сохраняется
            запись в Google Sheets.
          </p>

          <div className="mt-10 overflow-x-auto">
            <div className="flex min-w-[760px] items-center justify-center gap-2 sm:min-w-0 sm:gap-4">
              <FlowNode
                icon={<Webhook className="h-5 w-5" />}
                label="Webhook"
                sub="триггер"
                color="bg-amber-500 text-white"
              />
              <FlowArrow />
              <FlowNode
                icon={<GitMerge className="h-5 w-5" />}
                label="Set"
                sub="обработка"
                color="bg-rose-500 text-white"
              />
              <FlowArrow />
              <FlowNode
                icon={<Box className="h-5 w-5" />}
                label="Trello"
                sub="создать задачу"
                color="bg-emerald-500 text-white"
              />
              <FlowArrow />
              <FlowNode
                icon={<Box className="h-5 w-5" />}
                label="Slack"
                sub="уведомление"
                color="bg-purple-500 text-white"
              />
              <FlowArrow />
              <FlowNode
                icon={<Box className="h-5 w-5" />}
                label="Sheets"
                sub="запись"
                color="bg-cyan-500 text-white"
              />
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Каждый блок — это узел (Node). Стрелки показывают направление
            передачи данных. Левый узел — триггер, остальные — действия.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function FlowNode({
  icon,
  label,
  sub,
  color,
}: {
  icon: React.ReactNode
  label: string
  sub: string
  color: string
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} shadow-md`}
      >
        {icon}
      </span>
      <div className="text-center">
        <div className="text-sm font-semibold text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </div>
  )
}

function FlowArrow() {
  return (
    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
  )
}
