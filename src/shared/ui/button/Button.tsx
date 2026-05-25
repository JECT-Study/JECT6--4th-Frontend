import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'navy'

export type ButtonSize = 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  fullWidth?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

const baseButtonClassName =
  'inline-flex cursor-pointer items-center justify-center border-0 font-pretendard font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-neutral_95 disabled:text-neutral_60'

const sizeClassName: Record<ButtonSize, string> = {
  md: 'h-12 rounded-lg px-5 text-16 leading-24',
}

const variantClassName: Record<ButtonVariant, string> = {
  navy: 'rounded-[10px] bg-neutral_20 text-white hover:bg-neutral_30 disabled:hover:bg-neutral_95',
  primary: 'bg-black text-white hover:bg-neutral_20 disabled:hover:bg-neutral_95',
  secondary: 'bg-red_50 text-white hover:bg-red_40 disabled:hover:bg-neutral_95',
  tertiary: 'bg-transparent text-neutral_20 hover:bg-neutral_99 disabled:hover:bg-neutral_95',
}

export function Button({
  children,
  className = '',
  fullWidth = false,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        baseButtonClassName,
        sizeClassName[size],
        variantClassName[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
