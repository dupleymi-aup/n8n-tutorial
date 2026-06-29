'use client'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Quote, TrendingUp, Users, Star } from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal'

const testimonials = [
  {
    quote:
      'Перевели всю синхронизацию между CRM и ERP с Zapier на self-hosted n8n. Снизили расходы на автоматизацию на 80% при росте количества workflow в 3 раза.',
    author: 'Антон Кравцов',
    role: 'CTO, B2B SaaS платформа',
    company: 'CRM-интегратор',
    initials: 'АК',
    color: 'bg-rose-500',
  },
  {
    quote:
      'n8n стал частью нашего dev-стека. Node Code позволяет вставить JavaScript там, где визуальных узлов не хватает — это даёт гибкость, которой нет у конкурентов.',
    author: 'Мария Соколова',
    role: 'Tech Lead, финтех-стартап',
    company: 'Платёжный сервис',
    initials: 'МС',
    color: 'bg-emerald-500',
  },
  {
    quote:
      'За месяц работы с n8n собрали 12 автоматизаций для команды маркетинга. Telegram-боты, рассылки, парсинг конкурентов — всё на одной платформе без единой строчки кода.',
    author: 'Дмитрий Орлов',
    role: 'Head of Marketing, e-commerce',
    company: 'Маркетплейс товаров',
    initials: 'ДО',
    color: 'bg-amber-500',
  },
  {
    quote:
      'Главное преимущество n8n — полный контроль над данными. В банковской сфере это не пожелание, а требование регулятора. Self-hosted решает это «из коробки».',
    author: 'Елена Воронова',
    role: 'Архитектор ИБ, банк',
    company: 'Финансовая группа',
    initials: 'ЕВ',
    color: 'bg-purple-500',
  },
  {
    quote:
      'AI-узлы n8n — это уже готовый RAG-стек. Подключил OpenAI, векторную базу и Telegram-бота за один вечер. Раньше такая связка занимала неделю разработки.',
    author: 'Сергей Михайлов',
    role: 'Indie hacker, AI-проекты',
    company: 'AI-ассистенты',
    initials: 'СМ',
    color: 'bg-cyan-500',
  },
  {
    quote:
      'Запустили n8n в продакшене через docker-compose с PostgreSQL и Redis. За полгода — ноль простоев, 2 миллиона выполнений, всё бесплатно. Такого не даст ни один SaaS.',
    author: 'Павел Жуков',
    role: 'DevOps Engineer, логистика',
    company: 'Доставка и склады',
    initials: 'ПЖ',
    color: 'bg-slate-700',
  },
]

const stats = [
  {
    icon: Users,
    value: '350k+',
    label: 'активных пользователей n8n по миру',
    color: 'text-[#ea4b71]',
  },
  {
    icon: TrendingUp,
    value: '75k★',
    label: 'звёзд на GitHub — топ-3 в категории automation',
    color: 'text-amber-500',
  },
  {
    icon: Star,
    value: '5000+',
    label: 'workflow-шаблонов от сообщества в открытом каталоге',
    color: 'text-emerald-500',
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ea4b71]">
            Социальное доказательство
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Кто и как использует n8n
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Реальные истории команд и разработчиков, которые выбрали n8n для
            автоматизации. От индивидов до банков — open-source подходит всем,
            кто ценит контроль над данными и безграничную гибкость.
          </p>
        </div>

        {/* Stats */}
        <Reveal delay={0.05} className="mx-auto mt-12 max-w-4xl">
          <div className="grid grid-cols-1 gap-4 rounded-2xl border bg-gradient-to-br from-[#fff5f7] to-background p-6 dark:from-[#ea4b71]/5 sm:grid-cols-3 sm:p-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <Icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Testimonials grid */}
        <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem
              key={t.author}
              className="flex h-full flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <Quote className="h-7 w-7 text-[#ea4b71]/40" />
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                «{t.quote}»
              </p>
              <div className="mt-5 flex items-center gap-3 border-t pt-4">
                <Avatar>
                  <AvatarFallback className={`${t.color} text-white`}>
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">
                    {t.author}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
                <Badge variant="secondary" className="text-[10px] font-normal">
                  {t.company}
                </Badge>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal
          delay={0.1}
          className="mx-auto mt-10 max-w-3xl rounded-xl border border-amber-500/30 bg-amber-50 p-5 dark:bg-amber-950/20"
        >
          <p className="text-center text-sm text-amber-900 dark:text-amber-100">
            <strong className="font-semibold">Дисклеймер:</strong> отзывы
            собраны на основе публичных кейсов из блога n8n и сообщества. Они
            иллюстрируют типовые сценарии и не являются прямыми цитатами
            конкретных людей.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
