# n8n Школа — обучающий сайт по работе с n8n

Полноценный образовательный одностраничный сайт по автоматизации с open-source платформой [n8n](https://n8n.io). Сайт на русском языке, включает интерактивные демо, AI-генератор workflow, уроки и примеры из реальной практики.

## Возможности сайта

### Образовательный контент (12 секций)
- **Hero** с анимированной визуализацией workflow (Webhook → OpenAI → Email)
- **«Что такое n8n»** — 6 ключевых возможностей + use-case'ы
- **Установка** — интерактивные табы: npm / Docker / n8n Cloud / Desktop с кнопкой «Копировать»
- **Ключевые понятия** — Workflow, Node, Trigger, Credentials, Items & JSON, Expressions с визуализацией
- **AI-генератор workflow** — опишите задачу на русском, получите структуру
- **Визуализатор workflow** — соберите цепочку узлов, запустите демо
- **6 практических уроков** с прогресс-трекером (сохраняется в localStorage)
- **8 примеров использования** с фильтром по тегам
- **Тестимониалы** — 6 отзывов и 3 метрики (звёзды GitHub, активные пользователи, шаблоны)
- **Сравнительная таблица** n8n vs Zapier vs Make (10 параметров)
- **Roadmap обучения** — 5 уровней: от старта до продакшена
- **Newsletter** — форма подписки с валидацией email
- **FAQ** — 8 развёрнутых вопросов
- **Ресурсы** — ссылки на документацию, форум, GitHub, Discord

### Интерактивные функции
- **AI-генератор workflow** — опишите задачу на русском, LLM вернёт готовую структуру workflow (backend на z-ai-web-dev-sdk)
- **Визуализатор workflow** — соберите цепочку узлов, запустите демо-выполнение с анимацией и таймером выполнения
- **Экспорт в JSON** — скачивание skeleton-файла workflow для импорта в реальный n8n
- **Cmd+K поиск** — командная палитра для быстрой навигации по разделам, действиям и ресурсам
- **Активная навигация** — подсветка текущего раздела при скролле (IntersectionObserver)
- **Глоссарий** — всплывающие определения терминов (Workflow, Node, Trigger)
- **Тёмная тема** — переключатель light/dark с сохранением системных настроек
- **Прогресс-бар скролла** — индикатор вверху страницы
- **Кнопка «Наверх»** — появляется при скролле > 600px
- **Анимации появления** — framer-motion с Reveal/Stagger для всех секций
- **Newsletter с localStorage** — подписка сохраняется в браузере, при повторном визите показывает «Подписка оформлена»

## Технологии

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui (New York)
- **UI Components**: полный набор shadcn/ui + Lucide icons
- **Анимации**: framer-motion
- **Темы**: next-themes
- **AI**: z-ai-web-dev-sdk (только на backend)
- **Шрифты**: Geist Sans + Geist Mono (с поддержкой кириллицы)

## Структура проекта

```
src/
├── app/
│   ├── api/
│   │   └── generate-workflow/route.ts   # AI-генерация workflow (z-ai-web-dev-sdk)
│   ├── globals.css                     # Tailwind + кастомные стили
│   ├── layout.tsx                      # Root layout с ThemeProvider
│   └── page.tsx                        # Главная страница
├── components/
│   ├── theme-provider.tsx              # next-themes провайдер
│   ├── theme-toggle.tsx                # Кнопка переключения темы
│   └── site/
│       ├── header.tsx                  # Навигация с мобильным меню
│       ├── hero.tsx                    # Hero с анимированной визуализацией
│       ├── what-is-n8n.tsx             # Секция "Что такое n8n"
│       ├── installation.tsx            # Табы установки (npm/Docker/Cloud/Desktop)
│       ├── concepts.tsx                # Ключевые понятия + glossary
│       ├── ai-generator.tsx            # AI-генератор workflow (frontend)
│       ├── workflow-builder.tsx        # Интерактивный визуализатор
│       ├── builder-context.tsx         # React Context для связи AI ↔ Builder
│       ├── lessons.tsx                 # Уроки с прогресс-трекером
│       ├── examples.tsx                # Примеры с фильтром по тегам
│       ├── comparison.tsx              # Сравнительная таблица
│       ├── roadmap.tsx                 # Roadmap обучения (5 уровней)
│       ├── newsletter.tsx              # Форма подписки с localStorage
│       ├── faq.tsx                     # FAQ (8 вопросов)
│       ├── footer.tsx                  # Footer + Resources секция
│       ├── reveal.tsx                  # Reveal/Stagger анимации
│       ├── glossary-term.tsx           # Всплывающие определения терминов
│       ├── scroll-progress.tsx         # Прогресс-бар скролла
│       ├── command-palette.tsx         # Cmd+K командная палитра
│       ├── testimonials.tsx            # Отзывы и метрики сообщества
│       └── back-to-top.tsx             # Кнопка "Наверх"
```

## Запуск проекта

```bash
# Установка зависимостей
bun install

# Запуск dev-сервера (порт 3000)
bun run dev

# Проверка линтером
bun run lint

# Сборка для продакшена
bun run build

# Запуск production-сервера
bun run start
```

## AI-генератор workflow

Главная фишка сайта. Пользователь описывает задачу на русском языке, например:

> «Принимать заявки с сайта и отправлять уведомление в Slack»

Backend (`/api/generate-workflow`) отправляет запрос к LLM через z-ai-web-dev-sdk с тщательно проработанным system prompt. Модель возвращает JSON-план:

```json
{
  "title": "Заявки с сайта в Slack",
  "description": "Автоматическая отправка уведомлений о новых заявках в Slack",
  "nodes": [
    { "type": "trigger", "label": "Webhook", ... },
    { "type": "slack", "label": "Slack", ... }
  ],
  "explanation": "Webhook принимает заявку, Slack отправляет уведомление команде"
}
```

Пользователь может одним кликом загрузить результат в визуализатор и запустить демо-выполнение.

## Экспорт workflow в JSON

Кнопка «JSON» в визуализаторе скачивает skeleton-файл в формате n8n workflow JSON. Этот файл можно импортировать в реальный n8n через **Import from File**, после чего останется только настроить параметры узлов и подключить credentials.

```json
{
  "name": "My First Workflow",
  "nodes": [
    {
      "id": "node-1",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [0, 0],
      "parameters": {}
    }
  ],
  "connections": { ... },
  "active": false,
  "settings": { "executionOrder": "v1" }
}
```

## Командная палитра (Cmd+K)

Нажмите `⌘K` (macOS) или `Ctrl+K` (Windows/Linux) в любой момент, чтобы открыть поиск. Поддерживаются:
- Переход к любому разделу сайта (11 якорей)
- Быстрые действия (сменить тему, наверх)
- Открытие внешних ресурсов (документация, GitHub, шаблоны, форум)
- Поиск по ключевым словам на русском и английском

## Бренд-цвета

Сайт использует фирменные цвета n8n:
- **Primary**: `#ea4b71` (розово-красный)
- **Primary hover**: `#d63d61`
- **Accent gradient**: `#ea4b71` → `#ea8a4b`

## Лицензия

Образовательный проект. n8n — товарный знак n8n GmbH. Исходный код сайта можно использовать свободно для обучения и адаптации.
