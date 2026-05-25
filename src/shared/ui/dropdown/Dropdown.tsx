'use client'

import type { ButtonHTMLAttributes } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DropdownOption {
  label: string
  value: string
}

interface DropdownProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  label?: string
  onChange?: (value: string) => void
  options: DropdownOption[]
  placeholder?: string
  value?: string
}

export function Dropdown({
  className = '',
  disabled,
  label,
  onChange,
  options,
  placeholder = '옵션 제목',
  value,
  ...props
}: DropdownProps) {
  const selectedOption = options.find(option => option.value === value)

  return (
    <div className={['inline-flex min-w-55 flex-col gap-2', className].filter(Boolean).join(' ')}>
      {label && <span className="text-14 font-semibold leading-20 text-neutral_20">{label}</span>}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="group inline-flex h-10 w-full cursor-pointer items-center justify-between rounded-[10px] border border-neutral_50 bg-white px-3 font-pretendard text-14 font-semibold leading-20 text-neutral_20 disabled:cursor-not-allowed disabled:bg-neutral_99 disabled:text-neutral_70"
            disabled={disabled}
            type="button"
            {...props}
          >
            <span>{selectedOption?.label ?? placeholder}</span>
            <ChevronDownIcon
              className="ml-3 size-4 text-neutral_50 transition-transform group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-[10px] border-neutral_95 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          {options.map(option => (
            <DropdownMenuItem
              key={option.value}
              className={[
                'cursor-pointer rounded-lg px-3 py-2.5 font-pretendard text-14 font-medium leading-20 text-neutral_30 focus:bg-neutral_99 focus:text-neutral_30',
                option.value === value
                  ? 'bg-blue_95 font-bold text-blue_40 focus:bg-blue_95 focus:text-blue_40'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onSelect={() => onChange?.(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
