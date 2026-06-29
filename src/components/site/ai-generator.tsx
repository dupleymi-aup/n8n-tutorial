'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Wand2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useBuilder } from '@/components/site/builder-context'

interface GeneratedNode {
  id: string
  type: string
  label: string
  sub: string
  color: string
  icon: string
}

interface GeneratedPlan {
  title: string
  description: string
  nodes: GeneratedNode[]
  explanation: string
}

const examples = [
  'Принимать заявки с сайта и отправлять уведомление в Slack',
  'Каждый день собирать новости по теме и присылать digest на email',
  'Парсить входящие email, классифицировать через AI и сохранять в базу',
  'При новой регистрации в Telegram-боте создавать задачу в Trello',
]

export function AIGenerator() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plan, setPlan] = useState<GeneratedPlan | null>(null)
  const { applyExternal } = useBuilder()

  const generate = async () => {
    if (!prompt.trim()) return
    setLoading(true)
    setError(null)
    setPlan(null)

    try {
      const res = await fetch('/api/generate-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Не удалось сгенерировать workflow')
        return
      }

      setPlan(data)
    } catch {
      setError('Сетевая ошибка. Проверьте подключение и попробуйте снова.')
    } finally {
      setLoading(false)
    }
  }

  const apply = () => {
    if (!plan) return
    if (applyExternal) {
      applyExternal(plan.nodes)
    }
    // Smooth scroll to builder
    const el = document.getElementById('builder')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="ai-generator"
      className="scroll-mt-16 border-y bg-gradient-to-b from-[#fff5f7] via-background to-background py-20 dark:from--brand/5 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-3 border--brand/30 bg--brand/5 text--brand-dark"
          >
            <Sparkles className="mr-1 h-3 w-3" />
            AI-помощник
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Опишите задачу — получите готовый workflow
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Наш AI-помощник разберёт вашу задачу на русском языке и предложит
            структуру workflow из подходящих узлов n8n. Затем вы сможете
            загрузить её в визуализатор ниже и запустить в демо-режиме.
          </p>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border bg-card p-6 shadow-lg sm:p-8">
            <label
              htmlFor="ai-prompt"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Что нужно автоматизировать?
            </label>
            <Textarea
              id="ai-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Например: принимать заявки с сайта, проверять их через AI и отправлять уведомление в Slack..."
              className="min-h-[100px] resize-y"
              maxLength={500}
              disabled={loading}
            />

            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">
                {prompt.length}/500 символов
              </span>
              <Button
                onClick={generate}
                disabled={loading || !prompt.trim()}
                className="bg--brand text-white hover:bg--brand-hover"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Сгенерировать workflow
                  </>
                )}
              </Button>
            </div>

            {/* Example prompts */}
            {!plan && !loading && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Примеры запросов:
                </p>
                <div className="flex flex-col gap-1.5">
                  {examples.map((ex) => (
                    <button
                      key={ex}
                      type="button"
                      onClick={() => setPrompt(ex)}
                      className="rounded-lg border border-dashed border-border px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border--brand hover:bg--brand/5 hover:text-foreground"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/20 dark:text-red-300"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result */}
            <AnimatePresence>
              {plan && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="mt-6 rounded-xl border bg-muted/30 p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">
                        {plan.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  </div>

                  {/* Nodes preview */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {plan.nodes.map((node, idx) => (
                      <div key={node.id} className="flex items-center gap-2">
                        <div
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white ${node.color}`}
                        >
                          <span className="opacity-80">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {node.label}
                        </div>
                        {idx < plan.nodes.length - 1 && (
                          <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    <strong className="font-medium text-foreground">
                      Почему так:
                    </strong>{' '}
                    {plan.explanation}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      onClick={apply}
                      size="sm"
                      className="bg--brand text-white hover:bg--brand-hover"
                    >
                      <ArrowRight className="mr-1.5 h-3.5 w-3.5" />
                      Загрузить в визуализатор
                    </Button>
                    <Button
                      onClick={() => setPlan(null)}
                      size="sm"
                      variant="outline"
                    >
                      Сбросить и попробовать снова
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted-foreground">
          AI-помощник работает на большой языковой модели и иногда может
          ошибаться. Проверяйте предложенную структуру перед использованием.
        </p>
      </div>
    </section>
  )
}
