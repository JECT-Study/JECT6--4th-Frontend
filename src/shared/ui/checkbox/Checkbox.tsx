import type { InputHTMLAttributes, ReactNode } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
}

export function Checkbox({
  className = '',
  disabled = false,
  label = '텍스트',
  ...props
}: CheckboxProps) {
  return (
    <label
      className={[
        'inline-flex cursor-pointer items-center gap-2.5 font-pretendard text-14 font-semibold leading-20 text-neutral_20',
        disabled ? 'cursor-not-allowed text-neutral_70' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        className="relative m-0 h-6 w-6 cursor-pointer appearance-none rounded-[10px] border border-red_95 bg-white checked:border-red_50 checked:bg-red_50 checked:after:absolute checked:after:left-2 checked:after:top-1 checked:after:h-2.5 checked:after:w-[5px] checked:after:rotate-45 checked:after:border-b-2 checked:after:border-r-2 checked:after:border-white checked:after:content-[''] disabled:cursor-not-allowed disabled:border-neutral_95 disabled:bg-neutral_99"
        disabled={disabled}
        type="checkbox"
        {...props}
      />
      <span>{label}</span>
    </label>
  )
}
