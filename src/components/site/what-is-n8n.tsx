'use client'

import {
  Workflow,
  Code2,
  Server,
  Plug,
  ShieldCheck,
  GitBranch,
} from 'lucide-react'
import { Reveal, Stagger, StaggerItem } from '@/components/site/reveal'

const features = [
  {
    icon: Workflow,
    title: 'Визуальный редактор workflow',
    description:
      'Создавайте автоматизации, перетаскивая узлы на холсте. Соединяйте их связями и настраивайте логику без написания кода. Каждый шаг виден сразу — вы понимаете, как данные проходят через весь процесс от триггера до результата.',
  },
  {
    icon: Code2,
    title: 'Код там, где он нужен',
    description:
      'Когда визуальных узлов недостаточно, добавляйте узлы Code на JavaScript или Python. Полный доступ к данным workflow, npm-модулям и любым библиотекам — гибкость настоящего программирования внутри no-code окружения.',
  },
  {
    icon: Server,
    title: 'Self-hosted или облако',
    description:
      'Запускайте n8n на собственном сервере через Docker или npm и полностью контролируйте данные. Либо используйте n8n Cloud —_managed-хостинг с автоматическими обновлениями, бэкапами и поддержкой. Выбор за вами.',
  },
  {
    icon: Plug,
    title: '400+ готовых интеграций',
    description:
      'Подключения к популярным сервисам из коробки: Slack, Telegram, Google Sheets, Notion, GitHub, OpenAI, PostgreSQL и сотни других. Если готового узла нет — используйте HTTP Request для любого REST API или Webhook для приёма внешних событий.',
  },
  {
    icon: ShieldCheck,
    title: 'Контроль безопасности',
    description:
      'Храните учётные данные в зашифрованном виде, разграничивайте доступ по ролям, ведите аудит-логи. При self-hosted все данные остаются внутри вашей инфраструктуры — это критично для чувствительных корпоративных сценариев.',
  },
  {
    icon: GitBranch,
    title: 'Расширяемость',
    description:
      'Создавайте собственные узлы на TypeScript и публикуйте их как npm-пакеты. Делитесь решениями с сообществом или используйте приватные узлы внутри компании. Архитектура n8n открыта и спроектирована для кастомизации.',
  },
]

export function WhatIsN8n() {
  return (
    <section id="what-is" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ea4b71]">
            Основы
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Что такое n8n
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            n8n (произносится «эн-эйт-эн») — это open-source платформа для
            автоматизации рабочих процессов. Она позволяет соединять веб-сервисы,
            базы данных и API в единые сценарии, которые работают без
            участия человека. Идеальный инструмент для тех, кто хочет
            автоматизировать рутину, не погружаясь в программирование.
          </p>
        </div>

        <Stagger className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <StaggerItem
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ea4b71]/10 text-[#ea4b71] transition-colors group-hover:bg-[#ea4b71] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </StaggerItem>
            )
          })}
        </Stagger>

        <Reveal
          delay={0.1}
          className="mt-16 rounded-2xl border bg-gradient-to-br from-[#fff5f7] to-background p-8 dark:from-[#ea4b71]/5 sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Когда выбирать n8n
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                n8n особенно полезен, когда вам нужно связать несколько
                независимых сервисов в один автоматический процесс. Это может
                быть синхронизация данных между CRM и таблицами, обработка
                входящих сообщений в мессенджерах, сбор аналитики из разных
                источников или регулярная генерация отчётов с помощью AI.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                В отличие от закрытых платформ, n8n даёт полный контроль над
                исполнением: вы видите каждый шаг, можете отладить любой узел
                и запустить workflow вручную в любой момент. Это делает его
                одинаково подходящим и для быстрого прототипирования, и для
                продакшен-автоматизаций в крупных компаниях.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                'Синхронизация данных между CRM, ERP и таблицами',
                'Обработка заявок из форм и мессенджеров',
                'Рассылки и автоматические ответы в Telegram, Slack, email',
                'AI-агенты: классификация, суммаризация, генерация ответов',
                'ETL-процессы: выгрузка, преобразование, загрузка данных',
                'Мониторинг внешних сервисов и оповещения',
              ].map((useCase) => (
                <li
                  key={useCase}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ea4b71] text-white">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
