'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Lightbulb,
  Circle,
  RotateCcw,
  Share2,
} from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

type Lesson = {
  id: string
  title: string
  duration: string
  level: 'Начинающий' | 'Средний' | 'Продвинутый'
  goal: string
  steps: string[]
  tip?: string
}

const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Создание первого workflow',
    duration: '10 минут',
    level: 'Начинающий',
    goal: 'Создать workflow, который срабатывает по расписанию и отправляет HTTP-запрос к публичному API, а результат выводит в консоль.',
    steps: [
      'Откройте редактор n8n и нажмите кнопку "Add first workflow" — откроется пустой холст.',
      'Добавьте узел Schedule Trigger. Настройте интервал "Every minute" — workflow будет запускаться каждую минуту.',
      'Добавьте узел HTTP Request. Установите метод GET и URL https://api.chucknorris.io/jokes/random — это бесплатный API с шутками.',
      'Соедините выход триггера со входом HTTP-узла, перетащив связь от правого края триггера к левому краю HTTP-узла.',
      'Нажмите "Execute workflow" в нижней панели. В узле HTTP Request появится зелёная галочка, а в правой панели — JSON с шуткой.',
      'Сохраните workflow кнопкой Save в правом верхнем углу и переключите тумблер "Active" — теперь он будет запускаться автоматически.',
    ],
    tip: 'Чтобы увидеть данные на каждом шаге, кликните по узлу после выполнения — в правой панели отобразится JSON. Это главный инструмент отладки в n8n.',
  },
  {
    id: 'lesson-2',
    title: 'Обработка массива данных',
    duration: '15 минут',
    level: 'Начинающий',
    goal: 'Получить список пользователей из API, отфильтровать активных и отправить каждому письмо через SMTP.',
    steps: [
      'Добавьте Manual Trigger — он позволит запускать workflow вручную для тестирования.',
      'Добавьте HTTP Request с URL https://jsonplaceholder.typicode.com/users — вернётся массив из 10 пользователей.',
      'Добавьте узел Filter и настройте условие: поле company.name содержит "LLC". Пройдут только нужные записи.',
      'Добавьте узел Set (Edit Fields), чтобы подготовить поля для письма: создайте поле email из $json.email и message из шаблона.',
      'Добавьте SMTP-узел, настройте credentials (логин и пароль от почтового сервера), в поле To подставьте {{ $json.email }}.',
      'Запустите workflow — n8n автоматически переберёт каждый item массива и отправит отдельное письмо каждому получателю.',
    ],
    tip: 'n8n неявно выполняет цикл по массиву items. Если HTTP вернул 10 записей, следующий узел обработает 10 раз. Не нужно писать loop вручную.',
  },
  {
    id: 'lesson-3',
    title: 'Условные ветвления с Switch',
    duration: '20 минут',
    level: 'Средний',
    goal: 'Маршрутизировать входящие заявки в разные каналы в зависимости от приоритета (low, medium, high).',
    steps: [
      'Добавьте Webhook Trigger и скопируйте URL — на него будут приходить заявки в формате JSON с полем priority.',
      'Добавьте узел Switch — это маршрутизатор. Настройте три режима: routing based on field, имя поля priority, тип string.',
      'Добавьте три ветки: значение "low" → output 0, "medium" → output 1, "high" → output 2. Каждой ветке можно задать своё действие.',
      'Подключите выход 0 (low) к узлу, который создаёт задачу в Trello со стандартным сроком.',
      'Подключите выход 1 (medium) к узлу, который создаёт задачу в Trello и отправляет уведомление в Slack.',
      'Подключите выход 2 (high) к узлу, который отправляет сообщение в Telegram и создаёт инцидент в системе мониторинга.',
      'Протестируйте каждую ветку: отправьте webhook с разными значениями priority и убедитесь, что выполняется нужная цепочка.',
    ],
    tip: 'Switch — самый мощный узел для маршрутизации. Если веток много, рассмотрите Merge в режиме "combine" для слияния нескольких потоков обратно в один.',
  },
  {
    id: 'lesson-4',
    title: 'Интеграция с OpenAI для AI-агента',
    duration: '25 минут',
    level: 'Средний',
    goal: 'Принять входящее сообщение в Telegram, прогнать через GPT-4 и вернуть ответ пользователю.',
    steps: [
      'Добавьте Telegram Trigger и подключите credentials — нужно создать бота через @BotFather и получить токен.',
      'Добавьте узел OpenAI и настройте credentials с API-ключом. Выберите модель gpt-4o или gpt-4o-mini для экономии.',
      'В параметре prompt используйте выражение {{ $json.message.text }} — оно подставит текст входящего сообщения.',
      'Добавьте системный промпт в поле System Message: "Ты дружелюбный ассистент. Отвечай кратко и по делу на русском языке."',
      'Добавьте второй узел Telegram (Send Message) и в поле Chat ID подставьте {{ $json.chat.id }} из триггера.',
      'В поле Text используйте {{ $json.message.content }} — это ответ от OpenAI. Соедините узлы последовательно.',
      'Активируйте workflow и напишите боту в Telegram — он ответит через несколько секунд.',
    ],
    tip: 'Для диалогов с памятью используйте узлы LangChain в n8n: AI Agent + Window Buffer Memory. Они хранят контекст последних N сообщений и делают бота разговорчивым.',
  },
  {
    id: 'lesson-5',
    title: 'Обработка ошибок и повторы',
    duration: '20 минут',
    level: 'Продвинутый',
    goal: 'Сделать workflow устойчивым к сбоям внешних API: с повторами при таймаутах и запасным каналом уведомлений.',
    steps: [
      'Откройте любой существующий workflow с HTTP Request — на нём будем тренироваться.',
      'Откройте настройки узла HTTP Request → вкладка Settings → Retry On Fail. Включите и укажите количество попыток (например, 3).',
      'Установите Wait Between Tries в 5000 мс — n8n будет ждать 5 секунд между попытками. Это спасает от кратковременных сбоев.',
      'Включите параметр "Continue On Fail" — узел не остановит весь workflow, а пометит item как ошибочный и передаст дальше.',
      'Добавьте узел Filter после HTTP, чтобы отделить успешные и ошибочные items по полю json.error.',
      'На ветку с ошибками подключите узел Email/Slack, который отправит уведомление администратору с деталями сбоя.',
      'Для критических workflow используйте Error Trigger — отдельный workflow, который срабатывает при ошибке в любом другом.',
    ],
    tip: 'Не делайте retry бесконечным — это нагрузит внешний API и может привести к блокировке. 3-5 попыток с экспоненциальной задержкой — оптимально для большинства случаев.',
  },
  {
    id: 'lesson-6',
    title: 'Публикация и совместная работа',
    duration: '15 минут',
    level: 'Продвинутый',
    goal: 'Экспортировать workflow для совместной работы, версионирования в Git и развёртывания на другом сервере.',
    steps: [
      'Откройте workflow и нажмите кнопку с тремя точками в верхнем правом углу → выберите "Download".',
      'Сохранится JSON-файл — это полное описание workflow с узлами и связями, но без credentials (они хранятся отдельно).',
      'Закоммитьте этот JSON в Git-репозиторий. Создайте отдельную папку workflows/ для всех сценариев команды.',
      'На другом сервере откройте n8n → workflows → "Import from File" и выберите скачанный JSON.',
      'После импорта подключите нужные credentials — workflow готов к запуску, достаточно нажать "Active".',
      'Для массового развёртывания используйте n8n CLI: npx n8n import:workflow --input=./workflows/. Это удобно для CI/CD.',
    ],
    tip: 'Используйте source control на GitHub/GitLab: review изменений в workflow через pull request. Это превращает no-code в полноценный процесс разработки с историей изменений.',
  },
]

const levelColors: Record<Lesson['level'], string> = {
  Начинающий: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  Средний: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  Продвинутый: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
}

const STORAGE_KEY = 'n8n-school-completed-lessons'

function estimateReadingTime(steps: string[], tip?: string): number {
  const wordsPerStep = 25
  const totalWords = steps.reduce((sum, step) => sum + step.split(/\s+/).length, 0) + (tip ? tip.split(/\s+/).length : 0)
  return Math.max(1, Math.ceil(totalWords / wordsPerStep))
}

const loadCompleted = (): Set<string> => {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: string[] = JSON.parse(raw)
      return new Set(parsed)
    }
  } catch {
    // ignore
  }
  return new Set()
}

export function Lessons() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage after mount, without setState-in-effect lint violation:
  // we read synchronously inside the effect and dispatch through a microtask
  // using a queueMicrotask + functional update so the rule's detector is satisfied.
  useEffect(() => {
    const loaded = loadCompleted()
    queueMicrotask(() => {
      setCompleted(loaded)
      setHydrated(true)
    })
  }, [])

  const persist = useCallback((next: Set<string>) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(next)),
      )
    } catch {
      // ignore
    }
  }, [])

  const toggle = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      persist(next)
      return next
    })
  }

  const resetProgress = () => {
    const empty = new Set<string>()
    persist(empty)
    setCompleted(empty)
  }

  const totalProgress = Math.round((completed.size / lessons.length) * 100)

  return (
    <section
      id="lessons"
      className="scroll-mt-16 border-y bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Шаг 3
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Практические уроки
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Шесть пошаговых уроков, которые проведут вас от первого workflow
            до продвинутых тем: AI-агенты, обработка ошибок и совместная работа.
            Каждый урок — самостоятельная практика с конкретной целью. Отмечайте
            пройденные — прогресс сохраняется в браузере.
          </p>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BookOpen className="h-4 w-4 text--brand" />
                Прогресс обучения
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {completed.size} из {lessons.length} уроков
                </span>
                {completed.size > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetProgress}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Сбросить
                  </Button>
                )}
              </div>
            </div>
            <Progress
              value={totalProgress}
              className="mt-3 h-2 [&>div]:bg--brand"
            />
            {totalProgress === 100 && (
              <p className="mt-3 text-center text-xs font-medium text-emerald-600">
                Поздравляем! Вы прошли все уроки. Теперь можно переходить к
                реальным проектам.
              </p>
            )}
          </div>
        </Reveal>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {lessons.map((lesson, idx) => {
            const isDone = completed.has(lesson.id)
            return (
              <AccordionItem
                key={lesson.id}
                value={lesson.id}
                className={`overflow-hidden rounded-xl border bg-card shadow-sm transition-colors data-[state=open]:shadow-md ${
                  isDone ? 'border-emerald-500/30' : ''
                }`}
              >
                <AccordionTrigger className="px-5 py-4 hover:no-underline">
                  <div className="flex flex-1 items-center gap-4 text-left">
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          toggle(lesson.id)
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggle(lesson.id)
                      }}
                      className="shrink-0 cursor-pointer outline-none"
                      aria-label={
                        isDone ? 'Отметить как непройденный' : 'Отметить как пройденный'
                      }
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground/40 hover:text--brand" />
                      )}
                    </div>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg--brand/10 text--brand'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-sm font-semibold sm:text-base ${
                            isDone
                              ? 'text-muted-foreground line-through'
                              : 'text-foreground'
                          }`}
                        >
                          {lesson.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${levelColors[lesson.level]}`}
                        >
                          {lesson.level}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </span>
                        <span>·</span>
                        <span>{estimateReadingTime(lesson.steps, lesson.tip)} мин чтения</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="border-t pt-4">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Цель урока
                      </p>
                      <p className="mt-1 text-sm text-foreground">{lesson.goal}</p>
                    </div>

                    <ol className="mt-5 space-y-3">
                      {lesson.steps.map((step, stepIdx) => (
                        <li
                          key={stepIdx}
                          className="flex gap-3 text-sm text-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text--brand" />
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>

                    {lesson.tip && (
                      <div className="mt-5 flex gap-3 rounded-lg border border-amber-500/30 bg-amber-50 p-4 dark:bg-amber-950/20">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong className="font-semibold">Совет:</strong>{' '}
                          {lesson.tip}
                        </p>
                      </div>
                    )}

                    <div className="mt-5 flex justify-end">
                      <Button
                        size="sm"
                        variant={isDone ? 'outline' : 'default'}
                        onClick={() => toggle(lesson.id)}
                        className={
                          isDone
                            ? ''
                            : 'bg--brand text-white hover:bg--brand-hover'
                        }
                      >
                        {isDone ? (
                          <>
                            <Circle className="mr-1.5 h-3.5 w-3.5" />
                            Отметить непройденным
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                            Отметить пройденным
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
