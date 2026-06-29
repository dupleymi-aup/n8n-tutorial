'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Workflow, Github, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const openSearch = () => {
  window.dispatchEvent(new CustomEvent('n8n-school:open-search'))
}

const navLinks = [
  { href: '#what-is', label: 'Что это' },
  { href: '#install', label: 'Установка' },
  { href: '#ai-generator', label: 'AI' },
  { href: '#lessons', label: 'Уроки' },
  { href: '#comparison', label: 'Сравнение' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#faq', label: 'FAQ' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section based on scroll position
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-background'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 font-semibold" aria-label="n8n Школа — на главную">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg--brand text-white shadow-sm">
            <Workflow className="h-5 w-5" />
          </span>
          <span className="text-base tracking-tight">
            n8n <span className="text-muted-foreground">Школа</span>
          </span>
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors hover:bg-accent hover:text-foreground ${
                  isActive
                    ? 'text--brand'
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-2 -bottom-[1px] h-0.5 rounded-full bg--brand" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="outline"
            size="sm"
            onClick={openSearch}
            className="gap-1.5 px-2.5 text-muted-foreground"
            aria-label="Поиск (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5" />
            <kbd className="hidden font-mono text-[10px] xl:inline">⌘K</kbd>
          </Button>
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://github.com/n8n-io/n8n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-1.5 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button asChild size="sm" className="bg--brand text-white hover:bg--brand-hover">
            <a href="#lessons">Начать обучение</a>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={openSearch}
            aria-label="Поиск"
          >
            <Search className="h-4 w-4" />
          </Button>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Меню">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent ${
                      isActive
                        ? 'bg--brand/10 text--brand'
                        : 'text-foreground'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg--brand" />
                    )}
                  </a>
                )
              })}
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild variant="outline" size="sm">
                  <a
                    href="https://github.com/n8n-io/n8n"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1.5 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild size="sm" className="bg--brand text-white hover:bg--brand-hover">
                  <a href="#lessons">Начать обучение</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
