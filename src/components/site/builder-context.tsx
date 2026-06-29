'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

export interface ExternalNode {
  id: string
  type: string
  label: string
  sub: string
  color: string
  icon: string
}

type ApplyFn = (nodes: ExternalNode[]) => void

interface BuilderContextValue {
  applyExternal: ApplyFn | null
  registerApply: (fn: ApplyFn) => void
}

const BuilderContext = createContext<BuilderContextValue | null>(null)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [applyFn, setApplyFn] = useState<ApplyFn | null>(null)

  const registerApply = useCallback((fn: ApplyFn) => {
    setApplyFn(() => fn)
  }, [])

  const value: BuilderContextValue = {
    applyExternal: applyFn,
    registerApply,
  }

  return (
    <BuilderContext.Provider value={value}>
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const ctx = useContext(BuilderContext)
  if (!ctx) {
    throw new Error('useBuilder must be used within BuilderProvider')
  }
  return ctx
}
