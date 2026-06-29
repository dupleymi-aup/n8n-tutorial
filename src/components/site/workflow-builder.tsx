'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Webhook,
  Globe as HttpIcon,
  Filter,
  SlidersHorizontal as SetIcon,
  Mail,
  Database,
  Brain,
  Slack,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Download,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { useBuilder } from '@/components/site/builder-context'

type NodeKind =
  | 'trigger'
  | 'http'
  | 'filter'
  | 'set'
  | 'mail'
  | 'db'
  | 'ai'
  | 'slack'

interface FlowNodeData {
  id: string
  kind: NodeKind
  label: string
  sub: string
  color: string
  icon: typeof Webhook
  output?: string
}

const nodeCatalog: Omit<FlowNodeData, 'id'>[] = [
  {
    kind: 'trigger',
    label: 'Webhook',
    sub: 'триггер',
    color: 'bg-amber-500 text-white',
    icon: Webhook,
  },
  {
    kind: 'http',
    label: 'HTTP Request',
    sub: 'запрос к API',
    color: 'bg-cyan-600 text-white',
    icon: HttpIcon,
  },
  {
    kind: 'filter',
    label: 'Filter',
    sub: 'фильтр данных',
    color: 'bg-rose-500 text-white',
    icon: Filter,
  },
  {
    kind: 'set',
    label: 'Edit Fields',
    sub: 'подготовка данных',
    color: 'bg-purple-500 text-white',
    icon: SetIcon,
  },
  {
    kind: 'ai',
    label: 'OpenAI',
    sub: 'AI-обработка',
    color: 'bg-emerald-600 text-white',
    icon: Brain,
  },
  {
    kind: 'db',
    label: 'PostgreSQL',
    sub: 'запись в БД',
    color: 'bg-slate-700 text-white',
    icon: Database,
  },
  {
    kind: 'mail',
    label: 'Email',
    sub: 'отправка письма',
    color: 'bg-blue-500 text-white',
    icon: Mail,
  },
  {
    kind: 'slack',
    label: 'Slack',
    sub: 'уведомление',
    color: 'bg-fuchsia-600 text-white',
    icon: Slack,
  },
]

// Sample outputs each node would produce
const sampleOutputs: Record<NodeKind, string> = {
  trigger:
    '{"event":"new_lead","email":"anna@example.com","score":87,"source":"landing"}',
  http: '{"user":"anna","plan":"pro","signup_at":"2025-06-25T10:14:22Z"}',
  filter: '{"email":"anna@example.com","score":87} — прошёл фильтр score > 50',
  set: '{"to":"anna@example.com","subject":"Добро пожаловать","body":"Здравствуйте, ..."}',
  ai: '{"summary":"Новый лид Anna, план Pro, высокая вовлечённость. Рекомендован срочный follow-up."}',
  db: '{"inserted":true,"id":4821,"table":"leads"}',
  mail: '{"sent":true,"message_id":"<a1b2@example.com>"}',
  slack: '{"ok":true,"channel":"#sales","ts":"1719317662.000123"}',
}

const presets: { name: string; nodes: NodeKind[] }[] = [
  {
    name: 'Лид → Email',
    nodes: ['trigger', 'set', 'mail'],
  },
  {
    name: 'Webhook → AI → Slack',
    nodes: ['trigger', 'ai', 'slack'],
  },
  {
    name: 'API → Фильтр → БД',
    nodes: ['trigger', 'http', 'filter', 'db'],
  },
]

let idCounter = 0
const nextId = () => `node-${++idCounter}`

const iconMap: Record<string, typeof Webhook> = {
  Webhook,
  Globe: HttpIcon,
  Filter,
  SlidersHorizontal: SetIcon,
  Brain,
  Database,
  Mail,
  Slack,
}

const typeToCatalog: Record<string, Omit<FlowNodeData, 'id'>> = {
  trigger: nodeCatalog[0],
  http: nodeCatalog[1],
  filter: nodeCatalog[2],
  set: nodeCatalog[3],
  ai: nodeCatalog[4],
  db: nodeCatalog[5],
  mail: nodeCatalog[6],
  slack: nodeCatalog[7],
}

interface ExternalNode {
  id: string
  type: string
  label: string
  sub: string
  color: string
  icon: string
}

export function WorkflowBuilder() {
  const [nodes, setNodes] = useState<FlowNodeData[]>([
    {
      id: nextId(),
      ...nodeCatalog[0],
    },
  ])
  const [running, setRunning] = useState(false)
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [executedIdx, setExecutedIdx] = useState<Set<number>>(new Set())
  const [showCatalog, setShowCatalog] = useState(false)
  const [aiBadge, setAiBadge] = useState(false)
  const [elapsedMs, setElapsedMs] = useState<number | null>(null)
  const cancelRef = useRef(false)
  const { registerApply } = useBuilder()

  // Accept externally-generated nodes (from AI Generator)
  const applyExternalNodes = useCallback((external: ExternalNode[]) => {
    cancelRef.current = true
    setRunning(false)
    setActiveIdx(null)
    setExecutedIdx(new Set())
    setElapsedMs(null)
    const mapped: FlowNodeData[] = external.map((n) => {
      const fallback = typeToCatalog[n.type] ?? nodeCatalog[0]
      const Icon = iconMap[n.icon] ?? fallback.icon
      return {
        id: nextId(),
        kind: (n.type as NodeKind) ?? 'trigger',
        label: n.label || fallback.label,
        sub: n.sub || fallback.sub,
        color: n.color || fallback.color,
        icon: Icon,
      }
    })
    setNodes(mapped.length > 0 ? mapped : [{ id: nextId(), ...nodeCatalog[0] }])
    setAiBadge(true)
  }, [])

  // Register the external-apply function so AIGenerator can push nodes in
  useEffect(() => {
    registerApply(applyExternalNodes)
  }, [registerApply, applyExternalNodes])

  const addNode = (catalogIdx: number) => {
    setNodes((prev) => [...prev, { id: nextId(), ...nodeCatalog[catalogIdx] }])
    setShowCatalog(false)
    setAiBadge(false)
    setElapsedMs(null)
  }

  const removeNode = (id: string) => {
    setNodes((prev) => prev.filter((n) => n.id !== id))
    setAiBadge(false)
    setElapsedMs(null)
  }

  const loadPreset = (preset: { name: string; nodes: NodeKind[] }) => {
    cancelRef.current = true
    setRunning(false)
    setActiveIdx(null)
    setExecutedIdx(new Set())
    setElapsedMs(null)
    const newNodes = preset.nodes.map((kind) => {
      const found = nodeCatalog.find((c) => c.kind === kind)!
      return { id: nextId(), ...found }
    })
    setNodes(newNodes)
    setAiBadge(false)
  }

  const reset = () => {
    cancelRef.current = true
    setRunning(false)
    setActiveIdx(null)
    setExecutedIdx(new Set())
    setAiBadge(false)
    setElapsedMs(null)
  }

  // Export current workflow as a JSON file compatible with n8n's import format.
  // Note: this is a simplified skeleton for educational purposes — real n8n
  // workflows have additional fields (credentials, parameters, etc.) that
  // would need to be filled in inside the n8n editor.
  const exportJson = () => {
    const n8nWorkflow = {
      name: aiBadge ? 'AI-Generated Workflow' : 'My First Workflow',
      nodes: nodes.map((node, idx) => {
        const nodeTypeMap: Record<NodeKind, string> = {
          trigger: 'n8n-nodes-base.webhook',
          http: 'n8n-nodes-base.httpRequest',
          filter: 'n8n-nodes-base.filter',
          set: 'n8n-nodes-base.set',
          ai: 'n8n-nodes-base.openAi',
          db: 'n8n-nodes-base.postgres',
          mail: 'n8n-nodes-base.emailSend',
          slack: 'n8n-nodes-base.slack',
        }
        return {
          parameters: {},
          id: node.id,
          name: node.label,
          type: nodeTypeMap[node.kind] || 'n8n-nodes-base.noOp',
          typeVersion: 1,
          position: [idx * 220, 0],
        }
      }),
      connections: nodes.slice(1).reduce<Record<string, { main: Array<Array<{ node: string; type: string; index: number }>> }>>((acc, node, idx) => {
        const prev = nodes[idx]
        acc[prev.id] = {
          main: [[{ node: node.id, type: 'main', index: 0 }]],
        }
        return acc
      }, {}),
      active: false,
      settings: { executionOrder: 'v1' },
      versionId: 1,
      meta: {
        instanceId: 'n8n-school-demo',
        templateCredentialsType: 'none',
      },
      tags: ['n8n-school', aiBadge ? 'ai-generated' : 'manual'].filter(Boolean),
    }

    const json = JSON.stringify(n8nWorkflow, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const safeName = n8nWorkflow.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    a.download = `${safeName || 'workflow'}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const run = useCallback(async () => {
    if (nodes.length === 0) return
    cancelRef.current = false
    setRunning(true)
    setExecutedIdx(new Set())
    setActiveIdx(null)
    setElapsedMs(null)
    const start = Date.now()

    // small initial delay
    await new Promise((r) => setTimeout(r, 300))
    if (cancelRef.current) return

    for (let i = 0; i < nodes.length; i++) {
      if (cancelRef.current) return
      setActiveIdx(i)
      await new Promise((r) => setTimeout(r, 900))
      if (cancelRef.current) return
      setExecutedIdx((prev) => {
        const next = new Set(prev)
        next.add(i)
        return next
      })
      // update output for this node
      setNodes((prev) =>
        prev.map((n, idx) =>
          idx === i ? { ...n, output: sampleOutputs[n.kind] } : n,
        ),
      )
    }
    setActiveIdx(null)
    setRunning(false)
    setElapsedMs(Date.now() - start)
  }, [nodes])

  return (
    <section
      id="builder"
      className="scroll-mt-16 border-y bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ea4b71]">
            Интерактивно
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Попробуйте построить workflow
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Упрощённая демонстрация того, как работает n8n: соберите цепочку
            узлов, нажмите «Запустить» и увидите, как данные проходят через
            каждый узел с выводом результата. В реальном n8n всё работает
            точно так же, но с настоящими API и сервисами.
          </p>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-lg">
            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-muted/40 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  my-first-workflow.json
                </span>
                {aiBadge && (
                  <Badge
                    variant="outline"
                    className="ml-2 border-[#ea4b71]/30 bg-[#ea4b71]/10 text-[#c43560]"
                  >
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI-сгенерировано
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={exportJson}
                  disabled={running || nodes.length === 0}
                  title="Скачать workflow в формате .json для импорта в n8n"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">JSON</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={reset}
                  disabled={!running && executedIdx.size === 0}
                >
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Сброс</span>
                </Button>
                <Button
                  size="sm"
                  className="bg-[#ea4b71] text-white hover:bg-[#d63d61]"
                  onClick={run}
                  disabled={running || nodes.length === 0}
                >
                  {running ? (
                    <>
                      <Clock className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                      Выполнение...
                    </>
                  ) : (
                    <>
                      <Play className="mr-1.5 h-3.5 w-3.5" />
                      Запустить
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 border-b bg-background px-4 py-3 sm:px-6">
              <span className="text-xs font-medium text-muted-foreground">
                Шаблоны:
              </span>
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="rounded-full border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-[#ea4b71] hover:bg-[#ea4b71]/5 hover:text-[#ea4b71]"
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Canvas */}
            <div className="bg-grid-pattern min-h-[280px] overflow-x-auto p-6 sm:p-8">
              <div className="flex min-w-max items-start gap-2">
                <AnimatePresence mode="popLayout">
                  {nodes.map((node, idx) => {
                    const Icon = node.icon
                    const isActive = activeIdx === idx
                    const isExecuted = executedIdx.has(idx)
                    return (
                      <motion.div
                        key={node.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-2"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`relative flex h-20 w-24 flex-col items-center justify-center rounded-xl border-2 bg-card shadow-sm transition-all ${
                              isActive
                                ? 'border-[#ea4b71] shadow-md ring-4 ring-[#ea4b71]/20'
                                : isExecuted
                                  ? 'border-emerald-500/40'
                                  : 'border-border'
                            }`}
                          >
                            {isActive && (
                              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ea4b71] opacity-75" />
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#ea4b71]" />
                              </span>
                            )}
                            {isExecuted && !isActive && (
                              <CheckCircle2 className="absolute -right-1.5 -top-1.5 h-4 w-4 text-emerald-500 bg-card rounded-full" />
                            )}
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-lg ${node.color}`}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            <span className="mt-1 text-[11px] font-semibold text-foreground">
                              {node.label}
                            </span>
                            {!running && nodes.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeNode(node.id)}
                                className="absolute -bottom-2 flex h-5 w-5 items-center justify-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-red-400 hover:text-red-500"
                                aria-label="Удалить узел"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            )}
                          </div>

                          {/* Output preview */}
                          <AnimatePresence>
                            {node.output && (
                              <motion.div
                                initial={{ opacity: 0, y: -4, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 w-44 overflow-hidden rounded-md border bg-foreground text-background"
                              >
                                <div className="border-b border-background/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-background/60">
                                  output
                                </div>
                                <pre className="max-h-24 overflow-y-auto px-2 py-1.5 font-mono text-[10px] leading-snug scrollbar-thin">
                                  {node.output}
                                </pre>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {idx < nodes.length - 1 && (
                          <ArrowRight
                            className={`h-5 w-5 shrink-0 transition-colors ${
                              executedIdx.has(idx)
                                ? 'text-emerald-500'
                                : 'text-muted-foreground/40'
                            }`}
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                {/* Add node button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCatalog((v) => !v)}
                    disabled={running}
                    className="flex h-20 w-16 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-[#ea4b71] hover:text-[#ea4b71] disabled:opacity-50"
                  >
                    <Plus className="h-5 w-5" />
                    <span className="mt-1 text-[10px] font-medium">узел</span>
                  </button>

                  <AnimatePresence>
                    {showCatalog && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute left-0 top-24 z-20 w-56 rounded-xl border bg-popover p-2 shadow-xl"
                      >
                        <div className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Выберите узел
                        </div>
                        <div className="max-h-72 overflow-y-auto scrollbar-thin">
                          {nodeCatalog.map((c, i) => {
                            const Icon = c.icon
                            return (
                              <button
                                key={c.kind}
                                type="button"
                                onClick={() => addNode(i)}
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-accent"
                              >
                                <span
                                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${c.color}`}
                                >
                                  <Icon className="h-4 w-4" />
                                </span>
                                <div>
                                  <div className="text-xs font-medium text-foreground">
                                    {c.label}
                                  </div>
                                  <div className="text-[10px] text-muted-foreground">
                                    {c.sub}
                                  </div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t bg-muted/40 px-4 py-2.5 text-xs sm:px-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span>
                  Узлов: <strong className="text-foreground">{nodes.length}</strong>
                </span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline">
                  Выполнено:{' '}
                  <strong className="text-foreground">
                    {executedIdx.size}/{nodes.length}
                  </strong>
                </span>
                {elapsedMs !== null && !running && (
                  <>
                    <span className="hidden sm:inline">·</span>
                    <span className="hidden items-center gap-1 sm:inline-flex">
                      <Clock className="h-3 w-3" />
                      <strong className="text-foreground font-mono">
                        {(elapsedMs / 1000).toFixed(2)}s
                      </strong>
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                {running ? (
                  <Badge
                    variant="outline"
                    className="border-amber-500/30 bg-amber-500/10 text-amber-600"
                  >
                    <Clock className="mr-1 h-3 w-3 animate-spin" />
                    Выполняется
                  </Badge>
                ) : executedIdx.size === nodes.length && nodes.length > 0 ? (
                  <Badge
                    variant="outline"
                    className="border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                  >
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Готово
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    Ожидание
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-muted-foreground">
              Это упрощённая симуляция для демонстрации концепции. В реальном n8n
              вы получите такой же визуальный редактор, но с подключением к
              настоящим сервисам через API.
            </p>
            <p className="text-xs text-muted-foreground">
              💡 Кнопка <strong className="text-foreground">JSON</strong> скачивает
              skeleton-файл workflow, который можно импортировать в реальный n8n
              через <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px]">Import from File</code> и
              затем настроить параметры и credentials.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
