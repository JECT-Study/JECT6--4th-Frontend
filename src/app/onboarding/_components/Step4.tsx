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
  { value: 'BEGINNER', label: '입문', description: '체험단을 이제 시작해요' },
  { value: 'MIDDLE', label: '중간', description: '몇 번 참여해본 경험이 있어요' },
  { value: 'ACTIVE', label: '활발', description: '꾸준히 체험단에 참여하고 있어요' },
]

export default function Step4({ isSubmitting, onSubmit, selected, setSelected }: Props) {
  return (
    <div className="py-32.5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          체험단 활동은
          <br />
          어느 정도인가요?
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">현재 활동 수준을 알려주세요</p>
      </div>
      <div className="flex flex-col items-center gap-6 pt-12">
        <div className="grid grid-cols-3 gap-4">
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
          추천 보기
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
      className={`h-56 w-64 rounded-[16px] flex flex-col gap-3 text-18 leading-5.5 items-center justify-center cursor-pointer border-2 px-6 text-center transition-all duration-150 ${
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
