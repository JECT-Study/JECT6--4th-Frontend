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
  { value: 'VISIT', label: '방문형', description: '매장에 직접 방문하고 싶어요' },
  { value: 'DELIVERY', label: '배송형', description: '제품을 받아 체험하고 싶어요' },
  { value: 'PAID', label: '원고료형', description: '수익형 협찬을 선호해요' },
  { value: 'ANY', label: '상관없음', description: '좋은 공고라면 모두 괜찮아요' },
]

export default function Step3({ isSubmitting, onSubmit, selected, setSelected }: Props) {
  return (
    <div className="py-32.5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          어떤 협찬 방식을
          <br />
          선호하시나요?
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">가장 편한 체험 방식을 선택해주세요</p>
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
      className={`h-52 w-80 rounded-[16px] flex flex-col gap-3 text-18 leading-5.5 items-center justify-center cursor-pointer border-2 px-6 text-center transition-all duration-150 ${
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
