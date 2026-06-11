'use client'

import CheckIcon from '@/shared/assets/icons/gradient-check.svg'
import { Button } from '@/shared/ui'

interface Props {
  isSubmitting: boolean
  onSubmit: (answer: string) => void
  selected: string
  setSelected: (answer: string) => void
}

const OPTIONS = [
  { value: 'YES', label: '네, 운영 중이에요', description: '블로그 리뷰와 협찬 경험이 있어요' },
  { value: 'NO', label: '아니요, 아직 없어요', description: '앞으로 시작해보고 싶어요' },
]

export default function Step2({ isSubmitting, onSubmit, selected, setSelected }: Props) {
  return (
    <div className="py-32.5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          지금 블로그를
          <br />
          운영하고 있나요?
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">현재 활동 상태에 맞게 골라주세요</p>
      </div>
      <div className="flex flex-col items-center gap-6 pt-12">
        <div className="grid grid-cols-2 gap-4">
          {OPTIONS.map(option => (
            <OptionCard
              key={option.value}
              description={option.description}
              isSelected={selected === option.value}
              label={option.label}
              onClick={() => setSelected(option.value)}
            />
          ))}
        </div>
        <Button
          className="w-100"
          disabled={!selected || isSubmitting}
          onClick={() => onSubmit(selected)}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

interface OptionCardProps {
  description: string
  isSelected: boolean
  label: string
  onClick: () => void
}

function OptionCard({ description, isSelected, label, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      className={`h-60 w-80 rounded-[16px] flex flex-col gap-3 text-18 leading-5.5 items-center justify-center cursor-pointer border-2 px-6 text-center transition-all duration-150 ${
        isSelected
          ? 'border-[#9810FA] bg-white font-bold shadow-xl'
          : 'border-[#E5E7EB] bg-white/60 text-[#4A5565] hover:border-[#D8B4FE] hover:bg-[#FAF5FF]'
      }`}
      onClick={onClick}
    >
      <span className="text-18 leading-7 font-semibold">{label}</span>
      <span className="text-14 leading-5 text-[#6A7282]">{description}</span>
      {isSelected && <CheckIcon />}
    </button>
  )
}
