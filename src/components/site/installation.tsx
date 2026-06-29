'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Copy, Terminal, Container, Cloud, Apple } from 'lucide-react'

type Step = {
  title: string
  command?: string
  description: string
}

const installMethods: Record<
  string,
  { icon: typeof Terminal; label: string; subtitle: string; steps: Step[] }
> = {
  npm: {
    icon: Terminal,
    label: 'npm',
    subtitle: 'Быстрый старт через Node.js',
    steps: [
      {
        title: 'Установите Node.js 20+',
        description:
          'n8n требует Node.js версии 20 или выше. Скачайте установщик с nodejs.org или используйте nvm для управления версиями.',
      },
      {
        title: 'Запустите n8n одной командой',
        command: 'npx n8n',
        description:
          'npx скачает и запустит n8n автоматически. Это самый быстрый способ попробовать локально — ничего не нужно устанавливать глобально.',
      },
      {
        title: 'Откройте редактор в браузере',
        command: 'http://localhost:5678',
        description:
          'После запуска откройте адрес http://localhost:5678. Создайте учётную запись администратора — и можно начинать создавать первый workflow.',
      },
    ],
  },
  docker: {
    icon: Container,
    label: 'Docker',
    subtitle: 'Изолированный контейнер',
    steps: [
      {
        title: 'Установите Docker',
        description:
          'Подходит Docker Desktop для macOS/Windows или Docker Engine для Linux. Проверьте установку командой docker --version.',
      },
      {
        title: 'Запустите контейнер n8n',
        command: 'docker run -it --rm \\\n  --name n8n \\\n  -p 5678:5678 \\\n  -v n8n_data:/home/node/.n8n \\\n  docker.n8n.io/n8nio/n8n',
        description:
          'Контейнер поднимется на порту 5678, а данные сохранятся в volume n8n_data — они не пропадут при перезапуске. Это рекомендуемый способ для self-hosted.',
      },
      {
        title: 'Используйте docker-compose для продакшена',
        command: 'curl https://raw.githubusercontent.com/n8n-io/n8n/master/docker/compose/docker-compose.yml -o docker-compose.yml\ndocker compose up -d',
        description:
          'Готовый compose-файл включает настройки для продакшена: PostgreSQL, Redis, reverse-proxy. Идеален для постоянного использования.',
      },
    ],
  },
  cloud: {
    icon: Cloud,
    label: 'n8n Cloud',
    subtitle: 'Без установки и поддержки',
    steps: [
      {
        title: 'Зарегистрируйтесь на n8n.io',
        description:
          'Перейдите на n8n.io/cloud и создайте аккаунт. Доступны разные тарифы: Starter для личных проектов, Pro для команд и Enterprise для крупных организаций.',
      },
      {
        title: 'Подтвердите email',
        description:
          'После регистрации на почту придёт письмо подтверждения. Перейдите по ссылке — и workspace будет готов к работе в течение минуты.',
      },
      {
        title: 'Создайте первый workflow',
        description:
          'В облаке уже настроены обновления, бэкапы и SSL. Можно сразу переходить к созданию автоматизаций, не тратя время на инфраструктуру.',
      },
    ],
  },
  desktop: {
    icon: Apple,
    label: 'Desktop',
    subtitle: 'Десктоп-приложение',
    steps: [
      {
        title: 'Скачайте установщик',
        description:
          'Десктоп-версия доступна для macOS, Windows и Linux. Ссылки — на странице загрузок n8n.io/desktop. Приложение включает локальный сервер n8n и удобный UI.',
      },
      {
        title: 'Установите и запустите',
        description:
          'Запустите установщик и следуйте инструкциям. После установки откройте приложение — n8n поднимется автоматически и откроется в окне.',
      },
      {
        title: 'Настройте синхронизацию (опционально)',
        description:
          'Десктоп-приложение может синхронизировать workflows с n8n Cloud. Это удобно, если вы работаете локально, но хотите бэкап и доступ с других устройств.',
      },
    ],
  },
}

export function Installation() {
  const [method, setMethod] = useState('npm')
  const [copied, setCopied] = useState<string | null>(null)

  const copyCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopied(cmd)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <section
      id="install"
      className="scroll-mt-16 border-y bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Шаг 1
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Установка и запуск
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Выберите подходящий способ установки. Для первого знакомства
            достаточно команды <code className="rounded bg-muted px-1.5 py-0.5 text-sm">npx n8n</code>,
            а для продакшена используйте Docker или n8n Cloud.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl">
          <Tabs value={method} onValueChange={setMethod}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              {Object.entries(installMethods).map(([key, value]) => {
                const Icon = value.icon
                return (
                  <TabsTrigger key={key} value={key} className="gap-1.5">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{value.label}</span>
                    <span className="sm:hidden">{value.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {Object.entries(installMethods).map(([key, value]) => {
              const Icon = value.icon
              return (
                <TabsContent key={key} value={key} className="mt-6">
                  <Card>
                    <CardContent className="p-6 sm:p-8">
                      <div className="mb-6 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg--brand/10 text--brand">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold">
                            Установка через {value.label}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {value.subtitle}
                          </p>
                        </div>
                      </div>

                      <ol className="space-y-5">
                        {value.steps.map((step, idx) => (
                          <li key={idx} className="flex gap-4">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                              {idx + 1}
                            </span>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-foreground">
                                {step.title}
                              </h4>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {step.description}
                              </p>
                              {step.command && (
                                <div className="mt-3 overflow-hidden rounded-lg border bg-foreground text-background">
                                  <div className="flex items-center justify-between border-b border-background/10 px-4 py-1.5">
                                    <span className="font-mono text-[11px] uppercase tracking-wider text-background/60">
                                      Terminal
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => copyCommand(step.command!)}
                                      className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-background/70 transition-colors hover:bg-background/10 hover:text-background"
                                    >
                                      {copied === step.command ? (
                                        <>
                                          <CheckCircle2 className="h-3 w-3" />
                                          Скопировано
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="h-3 w-3" />
                                          Копировать
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed">
                                    <code>{step.command}</code>
                                  </pre>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>

        <div className="mx-auto mt-10 max-w-4xl rounded-xl border border-amber-500/30 bg-amber-50 p-5 dark:bg-amber-950/20">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong className="font-semibold">Совет:</strong> для разработки
            используйте локальный запуск через npx или Docker. Для продакшена —
            docker-compose с PostgreSQL и регулярными бэкапами. Не храните
            production-credentials в локальной версии без шифрования.
          </p>
        </div>
      </div>
    </section>
  )
}
