import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

interface WorkflowNode {
  id: string
  type: string
  label: string
  sub: string
  color: string
  icon: string
}

interface WorkflowPlan {
  title: string
  description: string
  nodes: WorkflowNode[]
  explanation: string
}

const SYSTEM_PROMPT = `Ты — эксперт по n8n, который помогает начинающим автоматизаторам проектировать простые workflow. Пользователь описывает задачу на русском языке, а ты возвращаешь JSON-план workflow для обучающей песочницы.

ВАЖНО:
- Отвечай ТОЛЬКО валидным JSON, без markdown-обёртки, без пояснений вне JSON.
- Используй ТОЛЬКО узлы из этого каталога (по полю type):
  - "trigger" — Webhook, точка входа (всегда первый узел)
  - "http" — HTTP Request, запрос к внешнему API
  - "filter" — Filter, фильтрация данных
  - "set" — Edit Fields, подготовка/трансформация полей
  - "ai" — OpenAI, AI-обработка (классификация, генерация текста, суммаризация)
  - "db" — PostgreSQL, запись в базу данных
  - "mail" — Email, отправка письма
  - "slack" — Slack, отправка уведомления
- Цепочка всегда начинается с "trigger".
- Не более 6 узлов в цепочке.
- Поля label и sub — на русском, краткие (до 30 символов).
- color — один из: "bg-amber-500 text-white", "bg-cyan-600 text-white", "bg-rose-500 text-white", "bg-purple-500 text-white", "bg-emerald-600 text-white", "bg-slate-700 text-white", "bg-blue-500 text-white", "bg-fuchsia-600 text-white".
- icon — имя из: "Webhook", "Globe", "Filter", "SlidersHorizontal", "Brain", "Database", "Mail", "Slack".
- explanation — короткое объяснение (1-2 предложения) на русском, почему выбрана такая цепочка.

Формат ответа:
{
  "title": "Короткое название workflow",
  "description": "Описание в 1-2 предложениях",
  "nodes": [
    { "id": "node-1", "type": "trigger", "label": "Webhook", "sub": "приём заявки", "color": "bg-amber-500 text-white", "icon": "Webhook" },
    ...
  ],
  "explanation": "Почему такая цепочка"
}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body as { prompt?: string }

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return NextResponse.json(
        { error: 'Опишите задачу подробнее (минимум 3 символа)' },
        { status: 400 },
      )
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { error: 'Слишком длинное описание (максимум 500 символов)' },
        { status: 400 },
      )
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt.trim() },
      ],
      thinking: { type: 'disabled' },
    })

    const raw = completion.choices[0]?.message?.content ?? ''

    // Try to extract JSON even if model wrapped it in code fences
    let jsonStr = raw.trim()
    const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
    if (fenceMatch) {
      jsonStr = fenceMatch[1].trim()
    }

    // Find first { and last }
    const firstBrace = jsonStr.indexOf('{')
    const lastBrace = jsonStr.lastIndexOf('}')
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonStr = jsonStr.slice(firstBrace, lastBrace + 1)
    }

    let plan: WorkflowPlan
    try {
      plan = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json(
        {
          error: 'Не удалось распарсить ответ модели. Попробуйте переформулировать запрос.',
          raw: raw.slice(0, 500),
        },
        { status: 502 },
      )
    }

    // Basic validation
    if (!plan.nodes || !Array.isArray(plan.nodes) || plan.nodes.length === 0) {
      return NextResponse.json(
        { error: 'Модель вернула пустой план workflow' },
        { status: 502 },
      )
    }

    // Ensure ids are unique
    plan.nodes = plan.nodes.map((n, i) => ({
      ...n,
      id: n.id || `node-${i + 1}`,
    }))

    // Ensure first node is a trigger
    if (plan.nodes[0].type !== 'trigger') {
      plan.nodes.unshift({
        id: 'node-1',
        type: 'trigger',
        label: 'Webhook',
        sub: 'точка входа',
        color: 'bg-amber-500 text-white',
        icon: 'Webhook',
      })
    }

    return NextResponse.json(plan)
  } catch (err) {
    console.error('Workflow generation error:', err)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера при генерации workflow' },
      { status: 500 },
    )
  }
}
