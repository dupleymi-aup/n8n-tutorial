'use client'

import { useState, useRef, useId } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { BookOpen } from 'lucide-react'

interface GlossaryTermProps {
  term: string
  definition: string
  example?: string
  children?: React.ReactNode
}

export function GlossaryTerm({
  term,
  definition,
  example,
  children,
}: GlossaryTermProps) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-0.5 border-b border-dashed border--brand/40 font-medium text--brand decoration-dotted underline-offset-2 hover:border--brand hover:bg--brand/5"
          aria-describedby={open ? id : undefined}
          onClick={() => setOpen((v) => !v)}
        >
          {children || term}
          <BookOpen className="h-3 w-3 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-72 p-4 text-sm"
        id={id}
      >
        <div className="mb-1.5 flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded bg--brand/10 text--brand">
            <BookOpen className="h-3 w-3" />
          </span>
          <span className="font-semibold text-foreground">{term}</span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {definition}
        </p>
        {example && (
          <div className="mt-2 rounded border bg-muted/50 p-2">
            <p className="font-mono text-[11px] leading-snug text-foreground">
              {example}
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
