'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: Direction
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
}

export function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className,
  as = 'div',
}: RevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const MotionTag = motion[as]

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
}

export function Stagger({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.08,
}: StaggerProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  direction = 'up',
}: {
  children: ReactNode
  className?: string
  direction?: Direction
}) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}
