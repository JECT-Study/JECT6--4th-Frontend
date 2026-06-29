import { ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

export function AccountNavCard({
  title,
  description,
  onClick,
  disabled = false,
  badge,
}: {
  title: string
  description: string
  onClick?: () => void
  disabled?: boolean
  badge?: string
}) {
  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      className={cn(
        'flex w-full items-center gap-6 rounded-2xl border border-neutral_95 px-6 py-8 text-left transition-colors',
        disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-neutral_99'
      )}
    >
      <span className="size-[62px] shrink-0 rounded-full bg-neutral_95" aria-hidden />
      <span className="flex flex-1 flex-col gap-1">
        <span className="flex items-center gap-2">
          <span className="text-18 font-semibold text-neutral_20">{title}</span>
          {badge && (
            <span className="rounded-md bg-neutral_95 px-2 py-0.5 text-12 text-neutral_60">
              {badge}
            </span>
          )}
        </span>
        <span className="text-14 text-neutral_60">{description}</span>
      </span>
      <ChevronRight className="size-6 text-neutral_60" aria-hidden />
    </button>
  )
}
