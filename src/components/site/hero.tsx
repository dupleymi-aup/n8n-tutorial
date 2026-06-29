'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, PlayCircle, Sparkles, GitBranch, Zap, Webhook, Brain, Mail, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const heroFlow = [
  { icon: Webhook, label: 'Webhook', color: 'bg-amber-500', delay: 0 },
  { icon: Brain, label: 'OpenAI', color: 'bg-rose-500', delay: 0.6 },
  { icon: Mail, label: 'Email', color: 'bg-blue-500', delay: 1.2 },
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b bg-gradient-to-b from-[#fff5f7] via-background to-background dark:from--brand/5"
    >
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(234, 75, 113, 0.18), transparent 45%), radial-gradient(circle at 85% 10%, rgba(234, 138, 75, 0.14), transparent 40%)',
        }}
      />
      <div
        aria-hidden
        className="bg-grid-pattern pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border--brand/30 bg--brand/5 px-4 py-1.5 text-xs font-medium text--brand-dark">
              <Sparkles className="h-3.5 w-3.5" />
              Открытый код · Fair-code лицензия · Self-hosted
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Освойте <span className="text-gradient-n8n">n8n</span> — мощную
              платформу автоматизации
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg lg:mx-0">
              Полное руководство по созданию автоматизированных workflow без
              кода: от первой установки до сложных интеграций с AI, базами данных
              и внешними API. Учитесь на практических примерах и развивайте
              собственные сценарии автоматизации.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg--brand text-white hover:bg--brand-hover"
              >
                <a href="#install">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Начать с установки
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#ai-generator">
                  Попробовать AI-генератор
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3">
              <StatCard
                icon={<GitBranch className="h-5 w-5" />}
                value="400+"
                label="интеграций"
              />
              <StatCard
                icon={<Zap className="h-5 w-5" />}
                value="∞"
                label="автоматизаций"
              />
              <StatCard
                icon={<Sparkles className="h-5 w-5" />}
                value="11"
                label="разделов"
              />
            </div>
          </div>

          {/* Right: animated workflow visualization */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative rounded-2xl border bg-card/80 p-8 shadow-xl backdrop-blur"
            >
              {/* Window chrome */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  hero-workflow.json
                </span>
              </div>

              {/* Animated flow */}
              <div className="flex flex-col items-center gap-4">
                {heroFlow.map((node, idx) => {
                  const Icon = node.icon
                  return (
                    <div key={node.label} className="flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + idx * 0.3,
                        }}
                        className="relative flex flex-col items-center"
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 0 0px rgba(234, 75, 113, 0)',
                              '0 0 0 6px rgba(234, 75, 113, 0.15)',
                              '0 0 0 0px rgba(234, 75, 113, 0)',
                            ],
                          }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            delay: node.delay,
                          }}
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-md ${node.color}`}
                        >
                          <Icon className="h-7 w-7" />
                        </motion.div>
                        <span className="mt-2 text-xs font-medium text-foreground">
                          {node.label}
                        </span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 1, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: node.delay + 0.3,
                          }}
                          className="absolute -right-2 -top-2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </motion.span>
                      </motion.div>

                      {idx < heroFlow.length - 1 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 24 }}
                          transition={{ duration: 0.3, delay: 0.7 + idx * 0.3 }}
                          className="w-0.5 bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/10"
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Status footer */}
              <div className="mt-6 flex items-center justify-between border-t pt-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  Активен
                </span>
                <span className="font-mono">3 узла · ∞ выполнений</span>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -left-4 top-1/3 hidden rounded-lg border bg-card px-3 py-1.5 text-xs font-medium shadow-md xl:block"
            >
              <span className="text--brand">●</span> Real-time
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute -right-4 bottom-1/4 hidden rounded-lg border bg-card px-3 py-1.5 text-xs font-medium shadow-md xl:block"
            >
              <span className="text-emerald-500">●</span> No-code
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: string
  label: string
}) {
  return (
    <div className="rounded-xl border bg-card/80 p-3 text-left shadow-sm backdrop-blur">
      <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg--brand/10 text--brand">
        {icon}
      </span>
      <div className="text-lg font-bold text-foreground">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  )
}
