'use client'

import { useId, useState } from 'react'
import type { ButtonHTMLAttributes } from 'react'

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
  label,
  onChange,
  options,
  placeholder = '옵션 제목',
  value,
  ...props
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const generatedId = useId()
  const selectedOption = options.find(option => option.value === value)

  const handleSelect = (nextValue: string) => {
    onChange?.(nextValue)
    setIsOpen(false)
  }

  return (
    <div
      className={['relative inline-flex min-w-[220px] flex-col gap-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      {label && <span className="text-14 font-semibold leading-20 text-neutral_20">{label}</span>}
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? generatedId : undefined}
        className="inline-flex h-10 w-full cursor-pointer items-center justify-between rounded-[10px] border border-neutral_50 bg-white px-3 font-pretendard text-14 font-semibold leading-20 text-neutral_20 disabled:cursor-not-allowed disabled:bg-neutral_99 disabled:text-neutral_70"
        type="button"
        onClick={() => setIsOpen(current => !current)}
        {...props}
      >
        <span>{selectedOption?.label ?? placeholder}</span>
        <span className="ml-3 text-neutral_50" aria-hidden>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 m-0 flex flex-col rounded-[10px] border border-neutral_95 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
          id={generatedId}
          role="listbox"
        >
          {options.map(option => (
            <button
              className={[
                'cursor-pointer rounded-lg border-0 bg-transparent px-3 py-2.5 text-left font-pretendard text-14 font-medium leading-20 text-neutral_30 hover:bg-neutral_99',
                option.value === value ? 'bg-blue_95 font-bold text-blue_40' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={option.value}
              role="option"
              type="button"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
