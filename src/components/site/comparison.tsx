'use client'

import { Badge } from '@/components/ui/badge'
import { Check, X, Minus } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

type CellValue = 'yes' | 'no' | 'partial'

interface Feature {
  feature: string
  n8n: CellValue
  zapier: CellValue
  make: CellValue
  hint?: string
}

const features: Feature[] = [
  {
    feature: 'Open-source / открытый код',
    n8n: 'yes',
    zapier: 'no',
    make: 'no',
    hint: 'n8n полностью открыт, можно аудировать и модифицировать',
  },
  {
    feature: 'Self-hosted (свой сервер)',
    n8n: 'yes',
    zapier: 'no',
    make: 'no',
    hint: 'Данные остаются под вашим контролем',
  },
  {
    feature: 'Безлимитные выполнения (self-hosted)',
    n8n: 'yes',
    zapier: 'no',
    make: 'no',
  },
  {
    feature: 'Код внутри workflow (JS/Python)',
    n8n: 'yes',
    zapier: 'partial',
    make: 'partial',
    hint: 'n8n даёт полный доступ к данным через узел Code',
  },
  {
    feature: 'Создание собственных узлов',
    n8n: 'yes',
    zapier: 'no',
    make: 'partial',
  },
  {
    feature: 'Лёгкий порог входа для нетехнических',
    n8n: 'partial',
    zapier: 'yes',
    make: 'yes',
    hint: 'Zapier и Make проще для первого знакомства',
  },
  {
    feature: 'Богатая библиотека шаблонов',
    n8n: 'partial',
    zapier: 'yes',
    make: 'yes',
  },
  {
    feature: 'AI-узлы (OpenAI, LangChain)',
    n8n: 'yes',
    zapier: 'partial',
    make: 'partial',
    hint: 'У n8n нативная интеграция с LangChain',
  },
  {
    feature: 'Цена для больших объёмов',
    n8n: 'yes',
    zapier: 'no',
    make: 'partial',
    hint: 'Self-hosted n8n — бесплатно при любом объёме',
  },
  {
    feature: 'Enterprise-фичи (SSO, RBAC, audit)',
    n8n: 'yes',
    zapier: 'yes',
    make: 'yes',
  },
]

const tools = [
  {
    name: 'n8n',
    sub: 'Open-source · Self-hosted',
    color: 'text-[#ea4b71]',
    badge: 'bg-[#ea4b71]/10 text-[#c43560] border-[#ea4b71]/20',
    highlighted: true,
  },
  {
    name: 'Zapier',
    sub: 'SaaS · Облако',
    color: 'text-orange-600',
    badge: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    highlighted: false,
  },
  {
    name: 'Make',
    sub: 'SaaS · Облако',
    color: 'text-purple-600',
    badge: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    highlighted: false,
  },
]

function Cell({ value }: { value: CellValue }) {
  if (value === 'yes') {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <Check className="h-4 w-4" />
        </span>
      </div>
    )
  }
  if (value === 'no') {
    return (
      <div className="flex justify-center">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500">
          <X className="h-4 w-4" />
        </span>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
        <Minus className="h-4 w-4" />
      </span>
    </div>
  )
}

export function Comparison() {
  return (
    <section id="comparison" className="scroll-mt-16 border-y bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#ea4b71]">
            Сравнение
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            n8n против Zapier и Make
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Каждая платформа хороша для своих задач. Сравнение поможет понять,
            когда n8n — правильный выбор, а когда проще обойтись SaaS-решением.
            Легенда: ✓ да, ✗ нет, — частично.
          </p>
        </div>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Возможность
                  </th>
                  {tools.map((tool) => (
                    <th
                      key={tool.name}
                      className={`px-4 py-4 text-center ${
                        tool.highlighted ? 'bg-[#ea4b71]/5' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className={`text-base font-bold ${tool.color}`}>
                          {tool.name}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] ${tool.badge}`}
                        >
                          {tool.sub}
                        </Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className={`border-b last:border-b-0 ${
                      idx % 2 === 1 ? 'bg-muted/20' : ''
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="font-medium text-foreground">
                        {row.feature}
                      </div>
                      {row.hint && (
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {row.hint}
                        </div>
                      )}
                    </td>
                    <td
                      className={`px-4 py-3.5 ${
                        tools[0].highlighted ? 'bg-[#ea4b71]/5' : ''
                      }`}
                    >
                      <Cell value={row.n8n} />
                    </td>
                    <td className="px-4 py-3.5">
                      <Cell value={row.zapier} />
                    </td>
                    <td className="px-4 py-3.5">
                      <Cell value={row.make} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="rounded-xl border bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-[#ea4b71]">
              Выбирайте n8n, если
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>— нужен контроль над данными</li>
              <li>— важна цена при больших объёмах</li>
              <li>— есть технические навыки в команде</li>
              <li>— нужны AI-агенты и кастомные узлы</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-orange-600">
              Выбирайте Zapier, если
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>— нет времени на установку</li>
              <li>— команда без технических навыков</li>
              <li>— нужно 5-10 простых автоматизаций</li>
              <li>— бюджет на подписку небольшой</li>
            </ul>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-purple-600">
              Выбирайте Make, если
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>— хотите визуальный редактор посложнее</li>
              <li>— важна цена, но не нужен self-hosted</li>
              <li>— нужны функции и маршрутизация данных</li>
              <li>— устраивает облачное хранение данных</li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
