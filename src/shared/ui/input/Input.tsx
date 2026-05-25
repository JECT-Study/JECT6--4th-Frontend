import type { InputHTMLAttributes, ReactNode } from 'react'

export type InputVariant = 'default' | 'search' | 'url'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  helperText?: string
  label?: string
  rightAddon?: ReactNode
  variant?: InputVariant
}

const wrapClassName: Record<InputVariant, string> = {
  default: 'h-12 rounded-[10px] border-neutral_95 bg-white px-3',
  search: 'h-12 rounded-xl border-transparent bg-neutral_99 px-4',
  url: 'h-14 rounded-[18px] border-violet_80 bg-white px-5',
}

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
    <label className={['flex w-full flex-col gap-2', className].filter(Boolean).join(' ')}>
      {label && <span className="text-14 font-semibold leading-20 text-neutral_20">{label}</span>}
      <span
        className={[
          'flex items-center border transition-colors focus-within:border-violet_80',
          wrapClassName[variant],
          hasError ? 'border-red_50' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          className="min-w-0 flex-1 border-0 bg-transparent font-pretendard text-16 font-medium leading-24 text-neutral_20 outline-0 placeholder:text-neutral_70 disabled:cursor-not-allowed disabled:text-neutral_70"
          aria-invalid={hasError || undefined}
          {...props}
        />
        {rightAddon && <span className="ml-2 inline-flex shrink-0 items-center">{rightAddon}</span>}
      </span>
      {message && (
        <span
          className={[
            'text-12 font-normal leading-16 text-neutral_60',
            hasError ? 'text-red_50' : '',
          ].join(' ')}
        >
          {message}
        </span>
      )}
    </label>
  )
}
