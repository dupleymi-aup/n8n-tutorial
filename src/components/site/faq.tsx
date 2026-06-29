'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

const faq = [
  {
    question: 'n8n бесплатный или платный?',
    answer:
      'Сама платформа n8n распространяется по лицензии fair-code: исходный код открыт и доступен на GitHub, вы можете бесплатно использовать self-hosted версию для любых проектов, включая коммерческие. Платными являются только n8n Cloud (managed-хостинг с поддержкой) и Enterprise-редакция с расширенными возможностями: SSO, RBAC, audit-логи, multi-instance deployment. Для личных автоматизаций и небольших команд self-hosted n8n — полностью бесплатный вариант.',
  },
  {
    question: 'Чем n8n отличается от Zapier и Make?',
    answer:
      'Главное отличие — open-source природа и возможность self-hosted: вы контролируете свои данные и не зависите от облака. n8n также более гибкий: поддерживает произвольный JavaScript в узлах Code, позволяет создавать собственные интеграции на TypeScript и не ограничивает количество шагов в workflow. У Zapier и Make проще порог входа и больше готовых шаблонов для нетехнических пользователей, но они быстро дорожают с ростом объёма задач. n8n — выбор для тех, кто готов разобраться и хочет полного контроля.',
  },
  {
    question: 'Нужно ли уметь программировать?',
    answer:
      'Для базовых автоматизаций — нет. Визуальный редактор и 400+ готовых узлов позволяют создавать полезные workflow без единой строчки кода: достаточно понимать, какие данные вы хотите получить и куда их отправить. Однако базовое понимание JSON, регулярных выражений и HTTP-запросов сильно ускоряет работу. Для продвинутых сценариев — обработки данных, AI-агентов, кастомных интеграций — пригодятся JavaScript и понимание асинхронного программирования. Узел Code даёт полный доступ к данным workflow.',
  },
  {
    question: 'Можно ли использовать n8n в продакшене?',
    answer:
      'Да, n8n используется в продакшене тысячами компаний — от стартапов до enterprise. Для надёжного развёртывания рекомендуется: Docker Compose с PostgreSQL (вместо SQLite по умолчанию), Redis для очередей при высокой нагрузке, регулярные бэкапы базы, отдельные инстансы для dev / staging / prod, мониторинг через Prometheus + Grafana, настройка режима queue для масштабирования воркеров. Enterprise-редакция добавляет SSO, RBAC и audit-логи для соответствия корпоративным требованиям безопасности.',
  },
  {
    question: 'Что делать, если готового узла для моего сервиса нет?',
    answer:
      'Есть три варианта. Первый — узел HTTP Request: подходит для любого REST API, поддерживает все методы, заголовки, аутентификацию. Второй — узел Webhook: если внешний сервис должен сам присылать данные в n8n по событию. Третий — создать собственный узел на TypeScript и опубликовать его как npm-пакет: n8n автоматически подхватит его при установке. Также можно запросить добавление интеграции в официальном репозитории n8n на GitHub — активное сообщество и команда разработки регулярно добавляют новые узлы по запросам пользователей.',
  },
  {
    question: 'Как обеспечивается безопасность учётных данных?',
    answer:
      'Все credentials в n8n шифруются симметричным алгоритмом AES-256. Ключ шифрования задаётся через переменную окружения N8N_ENCRYPTION_KEY — без него данные невозможно расшифровать. Credentials хранятся отдельно от workflows и не передаются при экспорте/импорте сценариев, что позволяет безопасно делиться workflow с коллегами или публиковать в открытом доступе. Каждый пользователь подключает свои собственные credentials. Для дополнительной безопасности в Enterprise-версии доступно хранение секретов в Vault и интеграция с системами управления ключами.',
  },
  {
    question: 'Какие лимиты по объёму данных?',
    answer:
      'В self-hosted версии лимиты определяются только мощностью вашего сервера — ограничений со стороны n8n нет. Один workflow может обработать десятки тысяч items за запуск: данные передаются массивом, и узлы автоматически итерируются по ним. Для очень больших объёмов используйте режим queue с несколькими воркерами и pagination в HTTP-узлах. В n8n Cloud есть тарифные ограничения: Starter — 2500 выполнений в месяц, Pro — 10000-50000, Enterprise — без лимитов. Точный объём данных на выполнение зависит от сложности workflow и объёма JSON в каждом item.',
  },
  {
    question: 'Можно ли интегрировать n8n с AI-моделями?',
    answer:
      'Да, и это одно из самых популярных применений n8n сегодня. Из коробки доступны узлы OpenAI (GPT-4, GPT-4o, DALL-E, Whisper), Anthropic Claude, Google Gemini, Mistral, Hugging Face и другие. Через набор узлов LangChain можно строить AI-агентов с памятью, инструментами и reasoning: чат-боты с доступом к базе знаний, ассистенты для классификации и суммаризации, RAG-системы с поиском по векторной базе. n8n сам использует AI в функции "AI workflow generator" — можно описать автоматизацию текстом и получить готовый workflow.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text--brand">
            Часто задаваемые вопросы
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Ответы на популярные вопросы
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Собрали восемь вопросов, которые чаще всего возникают у тех, кто
            начинает работать с n8n. Если не нашли ответ — загляните на
            форум сообщества, там помогают быстро и по делу.
          </p>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="overflow-hidden rounded-xl border bg-card px-5 shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <HelpCircle className="h-4 w-4 shrink-0 text--brand" />
                    <span className="text-sm font-medium text-foreground sm:text-base">
                      {item.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
