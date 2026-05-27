import type { ReactNode } from 'react'

import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export type InputVariant = 'default' | 'search' | 'url'

interface InputProps extends React.ComponentProps<'input'> {
  errorMessage?: string
  helperText?: string
  label?: string
  rightAddon?: ReactNode
  variant?: InputVariant
}

const wrapVariants = cva(
  'flex items-center border transition-colors focus-within:border-violet_80',
  {
    variants: {
      variant: {
        default: 'h-12 rounded-[10px] border-neutral_95 bg-white px-3',
        search: 'h-12 rounded-xl border-transparent bg-neutral_99 px-4',
        url: 'h-14 rounded-[18px] border-violet_80 bg-white px-5',
      },
      error: {
        true: 'border-red_50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      error: false,
    },
  }
)

const messageVariants = cva('text-12 font-normal leading-16', {
  variants: {
    error: {
      true: 'text-red_50',
      false: 'text-neutral_60',
    },
  },
  defaultVariants: {
    error: false,
  },
})

export function Input({
  className = '',
  errorMessage,
  helperText,
  label,
  rightAddon,
  variant = 'default',
  ...props
}: InputProps) {
  const hasError = Boolean(errorMessage)
  const message = errorMessage ?? helperText

  return (
    <label className={cn('flex w-full flex-col gap-2', className)}>
      {label && <span className="text-14 font-semibold leading-20 text-neutral_20">{label}</span>}
      <span className={wrapVariants({ variant, error: hasError })}>
        <input
          className="min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 font-pretendard text-16 font-medium leading-24 text-neutral_20 shadow-none outline-0 ring-0 placeholder:text-neutral_70 focus-visible:border-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:text-neutral_70"
          aria-invalid={hasError || undefined}
          {...props}
        />
        {rightAddon && <span className="ml-2 inline-flex shrink-0 items-center">{rightAddon}</span>}
      </span>
      {message && <span className={messageVariants({ error: hasError })}>{message}</span>}
    </label>
  )
}
