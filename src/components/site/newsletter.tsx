'use client'

import { useState, useSyncExternalStore } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, CheckCircle2, Loader2 } from 'lucide-react'

const emptySubscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

const STORAGE_KEY = 'n8n-school-newsletter-email'

type Status = 'idle' | 'loading' | 'success'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  )

  // Restore previously entered email on mount (for UX continuity)
  const [restored, setRestored] = useState(false)
  if (mounted && !restored) {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setEmail(saved)
        setStatus('success')
      }
    } catch {
      // ignore
    }
    setRestored(true)
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validEmail || status === 'loading') return

    setStatus('loading')
    // Simulated async subscription — in production this would POST to an API
    await new Promise((r) => setTimeout(r, 700))

    try {
      window.localStorage.setItem(STORAGE_KEY, email)
    } catch {
      // ignore
    }
    setStatus('success')
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-16 border-y bg-gradient-to-br from-[#ea4b71] to-[#d63d61] py-16 text-white"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Новости и новые уроки по n8n
            </h2>
            <p className="mt-2 text-sm text-white/90 sm:text-base">
              Раз в месяц присылаем подборку свежих шаблонов, разборы кейсов и
              обновления платформы. Без спама, отписка в один клик.
            </p>
          </div>

          {status === 'success' ? (
            <div className="flex items-center gap-2 rounded-lg bg-white/15 px-4 py-3 backdrop-blur">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <div>
                <div className="text-sm font-semibold">Подписка оформлена!</div>
                <div className="text-xs text-white/80">
                  Проверьте почту для подтверждения
                </div>
              </div>
            </div>
          ) : (
            <form
              onSubmit={subscribe}
              className="flex w-full flex-col gap-2 sm:flex-row md:w-auto"
            >
              <Input
                type="email"
                placeholder="your@email.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="bg-white/95 text-foreground placeholder:text-muted-foreground"
                aria-label="Email для подписки"
              />
              <Button
                type="submit"
                disabled={status === 'loading' || !validEmail}
                variant="secondary"
                className="shrink-0 bg-white text-[#ea4b71] hover:bg-white/90"
              >
                {status === 'loading' ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-1.5 h-4 w-4" />
                )}
                Подписаться
              </Button>
            </form>
          )}
        </div>

        <p className="mt-4 text-xs text-white/70">
          🔒 Мы не передаём ваш email третьим лицам. Данные сохраняются только в
          вашем браузере (демо-режим).
        </p>
      </div>
    </section>
  )
}
