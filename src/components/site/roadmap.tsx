'use client'

import { Badge } from '@/components/ui/badge'
import {
  Rocket,
  Wrench,
  Boxes,
  Brain,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal'

const stages = [
  {
    icon: Rocket,
    level: 'Уровень 1',
    title: 'Старт',
    duration: '1-2 дня',
    description:
      'Установите n8n локально, разберитесь с интерфейсом и создайте первый workflow с одним триггером и одним действием. Это даст понимание базового цикла: событие → обработка → результат.',
    skills: [
      'Установка через npx n8n или Docker',
      'Понимание узлов и связей на холсте',
      'Первый HTTP-запрос к публичному API',
      'Сохранение и активация workflow',
    ],
    color: 'bg-emerald-500',
    bgColor: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: Wrench,
    level: 'Уровень 2',
    title: 'Основы',
    duration: '1 неделя',
    description:
      'Освойте работу с данными: массивы items, expressions, узлы Filter и Set. Научитесь передавать данные между узлами и обрабатывать несколько записей за раз — это 80% всех реальных workflow.',
    skills: [
      'Expressions и доступ к данным {{ $json.field }}',
      'Узел Filter для условной обработки',
      'Узел Set для трансформации полей',
      'Итерация по массивам автоматически',
    ],
    color: 'bg-cyan-500',
    bgColor: 'bg-cyan-500/10 text-cyan-600',
  },
  {
    icon: Boxes,
    level: 'Уровень 3',
    title: 'Интеграции',
    duration: '2-3 недели',
    description:
      'Подключите популярные сервисы: Telegram, Slack, Google Sheets, Notion, Email. Настройте credentials, научитесь работать с OAuth и API-ключами. Создайте 3-5 рабочих автоматизаций для личных задач.',
    skills: [
      'Telegram-бот через BotFather и trigger',
      'Google Sheets: чтение, запись, обновление',
      'SMTP для email-рассылок',
      'OAuth-подключения к Google, GitHub, Slack',
    ],
    color: 'bg-amber-500',
    bgColor: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: Brain,
    level: 'Уровень 4',
    title: 'AI и автоматизация',
    duration: '1 месяц',
    description:
      'Подключите OpenAI, Anthropic или локальные модели. Научитесь строить AI-агентов с памятью через LangChain-узлы: чат-боты, классификаторы, ассистенты для контента. Это открывает доступ к современным сценариям.',
    skills: [
      'OpenAI узел: GPT-4, DALL-E, Whisper',
      'AI Agent + Window Buffer Memory',
      'RAG: векторные базы и поиск',
      'Промпт-инжиниринг для конкретных задач',
    ],
    color: 'bg-rose-500',
    bgColor: 'bg-rose-500/10 text-rose-600',
  },
  {
    icon: Building2,
    level: 'Уровень 5',
    title: 'Продакшен',
    duration: '2+ месяца',
    description:
      'Развёртывание на сервере с PostgreSQL, Redis и мониторингом. Обработка ошибок, retry-логика, аудит-логи. Версионирование workflow в Git, CI/CD для обновлений. Это уровень зрелой команды автоматизации.',
    skills: [
      'Docker Compose с PostgreSQL и Redis',
      'Retry On Fail и Error Trigger',
      'Git-версионирование и CI/CD через CLI',
      'Мониторинг через Prometheus и Grafana',
    ],
    color: 'bg-purple-500',
    bgColor: 'bg-purple-500/10 text-purple-600',
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Путь развития
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Roadmap обучения
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Пять уровней — от первой установки до продакшен-развёртывания в
            команде. Двигайтесь в своём темпе: каждый уровень самодостаточен и
            приносит практическую пользу. На каждом этапе вы получаете
            конкретные навыки, которые можно сразу применять в работе.
          </p>
        </div>

        <Stagger className="mt-16 space-y-4">
          {stages.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <StaggerItem key={stage.level}>
                <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
                  {/* Connecting line on the left */}
                  {idx < stages.length - 1 && (
                    <div
                      aria-hidden
                      className="absolute left-[42px] top-20 hidden w-0.5 bg-gradient-to-b from-border to-transparent sm:block"
                      style={{ height: 'calc(100% - 1rem)' }}
                    />
                  )}

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                    {/* Icon + level */}
                    <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:gap-2">
                      <span
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stage.bgColor} relative z-10`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${stage.bgColor} border-current/20`}
                      >
                        {stage.level}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-bold text-foreground">
                          {stage.title}
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground">
                          ⏱ {stage.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>

                      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {stage.skills.map((skill) => (
                          <div
                            key={skill}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <CheckCircle2
                              className={`mt-0.5 h-4 w-4 shrink-0 ${stage.color.replace('bg-', 'text-')}`}
                            />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal
          delay={0.1}
          className="mx-auto mt-12 max-w-3xl rounded-2xl border bg-gradient-to-br from-[#fff5f7] to-background p-6 text-center dark:from--brand/5 sm:p-8"
        >
          <p className="text-sm text-muted-foreground">
            Не пытайтесь пройти все уровни за неделю. Закрепляйте каждый этап
            на реальных задачах: автоматизируйте личную рутину, помогайте
            коллегам, ведите лог сделанных workflow. Через 2-3 месяца у вас
            будет портфолио из десятков автоматизаций.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
