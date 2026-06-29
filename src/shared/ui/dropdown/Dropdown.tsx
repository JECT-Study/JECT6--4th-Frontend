'use client'

import type { ButtonHTMLAttributes, MouseEvent, PointerEvent } from 'react'

import { ChevronDownIcon, XIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label?: string
  onChange?: (value: string | undefined) => void
  options: DropdownOption[]
  placeholder?: string
  value?: string
  triggerClassName?: string
  itemClassName?: string
  activeItemClassName?: string
}

export function Dropdown({
  className = '',
  disabled,
  label,
  onChange,
  options,
  placeholder = '옵션 제목',
  value,
  triggerClassName,
  itemClassName,
  activeItemClassName,
  ...props
}: DropdownProps) {
  const selectedOption = options.find(option => option.value === value)
  const clearValue = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault()
    event.stopPropagation()
    onChange?.(undefined)
  }

  const stopTrigger = (event: PointerEvent<SVGSVGElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <div className={['inline-flex min-w-55 flex-col gap-2', className].filter(Boolean).join(' ')}>
      {label && <span className="text-14 font-semibold leading-20 text-neutral_20">{label}</span>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'group inline-flex h-10 w-full gap-3 cursor-pointer items-center justify-between rounded-[10px] border border-neutral_50 bg-white px-3 font-pretendard text-14 font-semibold leading-20 text-neutral_20 disabled:cursor-not-allowed disabled:bg-neutral_99 disabled:text-neutral_70',
              triggerClassName
            )}
            disabled={disabled}
            type="button"
            {...props}
          >
            <span>{selectedOption?.label ?? placeholder}</span>
            <span className="flex items-center gap-1">
              {selectedOption && (
                <XIcon
                  className="size-4 text-neutral_50 hover:text-neutral_20"
                  aria-label={`${selectedOption.label} 필터 해제`}
                  onPointerDown={stopTrigger}
                  onClick={clearValue}
                />
              )}
              <ChevronDownIcon
                className="size-4 text-neutral_50 transition-transform group-data-[state=open]:rotate-180"
                aria-hidden
              />
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-[10px] border-neutral_95 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          {options.map(option => (
            <DropdownMenuItem
              key={option.value}
              className={cn(
                'cursor-pointer rounded-lg px-3 py-2.5 font-pretendard text-14 font-medium leading-20 text-neutral_30 focus:bg-neutral_99 focus:text-neutral_30',
                itemClassName,
                option.value === value
                  ? cn(
                      'bg-blue_95 font-bold text-blue_40 focus:bg-blue_95 focus:text-blue_40',
                      activeItemClassName
                    )
                  : ''
              )}
              onSelect={() => onChange?.(option.value === value ? undefined : option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
