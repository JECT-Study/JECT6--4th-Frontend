'use client'

import { useState } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface AccordionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  defaultOpen?: boolean
  label?: string
}

export function AccordionButton({
  children = '텍스트',
  className = '',
  defaultOpen = false,
  label = 'Show more',
  ...props
}: AccordionButtonProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={['inline-flex flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      <button
        aria-expanded={isOpen}
        className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 font-pretendard text-14 font-semibold leading-20 text-neutral_40 disabled:cursor-not-allowed disabled:text-neutral_70"
        type="button"
        onClick={() => setIsOpen(current => !current)}
        {...props}
      >
        <span>{label}</span>
        <span className="text-12 leading-16 text-neutral_50" aria-hidden>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>
      {isOpen && (
        <div className="rounded-lg bg-neutral_99 px-[22px] py-5 font-pretendard text-14 font-medium leading-20 text-neutral_40">
          {children}
        </div>
      )}
    </div>
  )
}
