'use client'

import { Button } from '@/components/ui/button'
import { Workflow, Github, BookOpen, MessageCircle, Youtube } from 'lucide-react'

const resources = [
  {
    title: 'Официальная документация',
    description:
      'Полный справочник по узлам, expressions и API n8n. Регулярно обновляется, содержит примеры кода и best practices.',
    link: 'https://docs.n8n.io',
    label: 'docs.n8n.io',
  },
  {
    title: 'Шаблоны workflow',
    description:
      'Более 2000 готовых сценариев от сообщества. Можно импортировать в один клик и адаптировать под свои задачи.',
    link: 'https://n8n.io/workflows',
    label: 'n8n.io/workflows',
  },
  {
    title: 'YouTube-канал n8n',
    description:
      'Видеоуроки, разборы кейсов и записи вебинаров. Отличный способ увидеть, как другие строят автоматизации.',
    link: 'https://www.youtube.com/c/n8n-io',
    label: 'YouTube · n8n',
  },
  {
    title: 'Community Forum',
    description:
      'Форум сообщества: задавайте вопросы, делитесь решениями и находите единомышленников. Активно отвечают и сами разработчики.',
    link: 'https://community.n8n.io',
    label: 'community.n8n.io',
  },
  {
    title: 'GitHub-репозиторий',
    description:
      'Исходный код n8n на GitHub. Здесь можно сообщить о багах, предложить фичи и внести свой вклад в развитие платформы.',
    link: 'https://github.com/n8n-io/n8n',
    label: 'github.com/n8n-io/n8n',
  },
  {
    title: 'Discord-сообщество',
    description:
      'Живое общение с разработчиками и пользователями n8n. Каналы для новичков, продвинутых тем и советов по автоматизациям.',
    link: 'https://discord.gg/EqRtVkUDWp',
    label: 'Discord · n8n',
  },
]

export function Resources() {
  return (
    <section id="resources" className="scroll-mt-16 border-t bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Полезное
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Ресурсы для дальнейшего обучения
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Этот сайт — только начало. n8n имеет богатую экосистему: официальную
            документацию, тысячи шаблонов, активное сообщество и постоянные
            обновления. Используйте эти ресурсы, чтобы расти дальше.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-base font-semibold text-foreground group-hover:text--brand">
                {resource.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {resource.description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text--brand">
                <span className="font-mono">{resource.label}</span>
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-3xl border bg-gradient-to-br from--brand to--brand-hover p-8 text-white sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold sm:text-3xl">
                Готовы автоматизировать свою рутину?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/90 sm:text-base">
                Начните с малого: установите n8n, пройдите первый урок и
                автоматизируйте одну repetead-задачу из вашего рабочего дня.
                Через месяц у вас будет личный набор workflow, который экономит
                часы каждую неделю.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button asChild size="lg" variant="secondary">
                <a href="#install">
                  <BookOpen className="mr-2 h-4 w-4" />
                  К установке
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <a
                  href="https://github.com/n8n-io/n8n"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Открыть на GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg--brand text-white">
                <Workflow className="h-4 w-4" />
              </span>
              <span>n8n Школа</span>
            </div>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Образовательный проект для тех, кто хочет освоить автоматизацию
              с помощью open-source платформы n8n.
            </p>
          </div>

          <FooterCol
            title="Разделы"
            links={[
              { label: 'Что такое n8n', href: '#what-is' },
              { label: 'Установка', href: '#install' },
              { label: 'Понятия', href: '#concepts' },
              { label: 'Уроки', href: '#lessons' },
              { label: 'Примеры', href: '#examples' },
            ]}
          />

          <FooterCol
            title="Документация"
            links={[
              { label: 'Официальные доки', href: 'https://docs.n8n.io' },
              { label: 'API Reference', href: 'https://docs.n8n.io/api' },
              { label: 'Шаблоны workflow', href: 'https://n8n.io/workflows' },
              { label: 'Блог n8n', href: 'https://blog.n8n.io' },
            ]}
            external
          />

          <FooterCol
            title="Сообщество"
            links={[
              { label: 'Community Forum', href: 'https://community.n8n.io' },
              { label: 'Discord', href: 'https://discord.gg/EqRtVkUDWp' },
              { label: 'GitHub', href: 'https://github.com/n8n-io/n8n' },
              { label: 'YouTube', href: 'https://www.youtube.com/c/n8n-io' },
            ]}
            external
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} n8n Школа. Образовательный проект.
            n8n — товарный знак n8n GmbH.
          </p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a
              href="https://github.com/n8n-io/n8n"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 transition-colors hover:bg-accent hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/c/n8n-io"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 transition-colors hover:bg-accent hover:text-foreground"
              aria-label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="https://community.n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-1.5 transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Форум"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
  external,
}: {
  title: string
  links: { label: string; href: string }[]
  external?: boolean
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
