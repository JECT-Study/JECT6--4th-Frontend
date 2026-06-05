'use client'

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface SectionHeaderProps {
  badge?: string
  filterLabel?: string
  pagination?: {
    canGoNext: boolean
    canGoPrevious: boolean
    onNext: () => void
    onPrevious: () => void
  }
  title: string
}

export function SectionHeader({ badge, filterLabel, pagination, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <h2 className="m-0 text-18 font-bold leading-28 text-neutral_20">{title}</h2>
        {badge && (
          <span className="rounded-sm bg-neutral_99 px-3 py-1 text-12 font-semibold leading-16 text-neutral_40">
            {badge}
          </span>
        )}
        {filterLabel && (
          <button
            type="button"
            disabled
            className="inline-flex h-8 cursor-not-allowed items-center gap-1 rounded-md border border-neutral_95 bg-neutral_99 px-3 text-12 font-medium leading-16 text-neutral_40"
          >
            {filterLabel}
            <ChevronDown className="size-3.5" aria-hidden />
          </button>
        )}
      </div>
      {pagination && (
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            disabled={!pagination.canGoPrevious}
            className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral_99 text-neutral_20 transition-colors hover:bg-neutral_95 disabled:cursor-not-allowed disabled:bg-neutral_95 disabled:text-neutral_60"
            onClick={pagination.onPrevious}
          >
            <ChevronLeft className="size-5" aria-hidden />
            <span className="sr-only">이전</span>
          </button>
          <button
            type="button"
            disabled={!pagination.canGoNext}
            className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-neutral_99 text-neutral_20 transition-colors hover:bg-neutral_95 disabled:cursor-not-allowed disabled:bg-neutral_95 disabled:text-neutral_60"
            onClick={pagination.onNext}
          >
            <ChevronRight className="size-5" aria-hidden />
            <span className="sr-only">다음</span>
          </button>
        </div>
      )}
    </div>
  )
}
