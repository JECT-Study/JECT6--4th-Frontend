'use client'

import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/shared/ui'

interface DropdownOption {
  label: string
  value: string
}

interface SectionHeaderProps {
  badge?: string
  filter?: {
    value: string
    options: DropdownOption[]
    onChange: (value: string) => void
  }
  pagination?: {
    canGoNext: boolean
    canGoPrevious: boolean
    onNext: () => void
    onPrevious: () => void
  }
  title: string
}

export function SectionHeader({ badge, filter, pagination, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        {filter && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="tertiary"
                className="flex items-center gap-1 py-2.25 pl-3 pr-2.5 text-20 leading-6 font-medium"
              >
                {filter.options.find(o => o.value === filter.value)?.label ?? filter.value}
                <ChevronDown
                  className="size-6 transition-transform group-data-[state=open]:rotate-180"
                  aria-hidden
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="rounded-[10px] border-neutral_95 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              {filter.options.map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => filter.onChange(option.value)}
                  className={`cursor-pointer rounded-lg px-3 py-2.5 font-pretendard text-14 font-medium leading-20 focus:bg-neutral_99 ${
                    option.value === filter.value
                      ? 'bg-blue_95 font-bold text-blue_40 focus:bg-blue_95 focus:text-blue_40'
                      : 'text-neutral_30 focus:text-neutral_30'
                  }`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <h2 className="m-0 text-[25px] font-semibold leading-12 text-neutral_20">{title}</h2>
        {badge && (
          <span className="rounded-sm bg-neutral_99 px-3 py-1 text-12 font-semibold leading-16 text-neutral_40">
            {badge}
          </span>
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
