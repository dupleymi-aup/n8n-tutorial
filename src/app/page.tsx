'use client'

import { Header } from '@/components/site/header'
import { Hero } from '@/components/site/hero'
import { WhatIsN8n } from '@/components/site/what-is-n8n'
import { Installation } from '@/components/site/installation'
import { Concepts } from '@/components/site/concepts'
import { AIGenerator } from '@/components/site/ai-generator'
import { WorkflowBuilder } from '@/components/site/workflow-builder'
import { Lessons } from '@/components/site/lessons'
import { Examples } from '@/components/site/examples'
import { Testimonials } from '@/components/site/testimonials'
import { Comparison } from '@/components/site/comparison'
import { Roadmap } from '@/components/site/roadmap'
import { Newsletter } from '@/components/site/newsletter'
import { FAQ } from '@/components/site/faq'
import { Glossary } from '@/components/site/glossary'
import { Resources, Footer } from '@/components/site/footer'
import { BackToTop } from '@/components/site/back-to-top'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { CommandPalette } from '@/components/site/command-palette'
import { TableOfContents } from '@/components/site/table-of-contents'
import { BuilderProvider } from '@/components/site/builder-context'

export default function Home() {
  return (
    <BuilderProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <ScrollProgress />
        <CommandPalette />
        <TableOfContents />
        <Header />
        <main className="flex-1">
          <Hero />
          <WhatIsN8n />
          <Installation />
          <Concepts />
          <AIGenerator />
          <WorkflowBuilder />
          <Lessons />
          <Examples />
          <Testimonials />
          <Comparison />
          <Roadmap />
          <Glossary />
          <Newsletter />
          <FAQ />
          <Resources />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </BuilderProvider>
  )
}
