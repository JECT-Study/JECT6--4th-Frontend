import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 font-pretendard font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:cursor-not-allowed disabled:bg-neutral_95 disabled:text-neutral_60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-black text-white hover:bg-neutral_20 disabled:hover:bg-neutral_95',
        secondary: 'bg-red_50 text-white hover:bg-red_40 disabled:hover:bg-neutral_95',
        tertiary:
          'bg-transparent text-neutral_20 hover:bg-neutral_99 disabled:hover:bg-neutral_95 border border-[#E0E0E0]',
        navy: 'rounded-[10px] bg-neutral_20 text-white hover:bg-neutral_30 disabled:hover:bg-neutral_95',
      },
      size: {
        md: 'h-12 px-5 text-16 leading-24',
        sm: 'h-8 gap-1.5 px-3 text-sm',
        lg: 'h-14 gap-1.5 px-6 text-base',
        icon: 'size-12',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

function Button({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    fullWidth?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...(!asChild && { type: type ?? 'button' })}
      {...props}
    />
  )
}

export { Button, buttonVariants }
