'use client'

import CheckIcon from '@/shared/assets/icons/gradient-check.svg'
import { Button } from '@/shared/ui'

interface Props {
  isSubmitting: boolean
  onSubmit: (answer: string) => void
  selected: string
  setSelected: (answer: string) => void
}

const CATEGORIES = [
  { value: 'FOOD', label: '음식/맛집' },
  { value: 'BEAUTY', label: '뷰티' },
  { value: 'FASHION', label: '패션' },
  { value: 'LIFE', label: '라이프' },
  { value: 'PET', label: '반려동물' },
  { value: 'TECH', label: '테크' },
  { value: 'TRAVEL', label: '여행' },
  { value: 'CULTURE', label: '문화/예술' },
  { value: 'ETC', label: '기타' },
]

export default function Step1({ isSubmitting, onSubmit, selected, setSelected }: Props) {
  return (
    <div className="py-32.5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          관심 있는 체험단
          <br />
          카테고리를 골라주세요
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">가장 끌리는 주제 하나를 선택해주세요</p>
      </div>
      <div className="flex flex-col items-center gap-6 pt-12">
        <div className="grid grid-cols-3 gap-4">
          {CATEGORIES.map(({ value, label }) => (
            <GridItem
              key={value}
              label={label}
              isSelected={selected === value}
              onClick={() => setSelected(value)}
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

interface GridItemProps {
  label: string
  isSelected: boolean
  onClick: () => void
}

function GridItem({ label, isSelected, onClick }: GridItemProps) {
  return (
    <button
      type="button"
      className={`size-60 rounded-[16px] flex flex-col gap-3 text-18 leading-5.5 items-center justify-center cursor-pointer border-2 transition-all duration-150 ${
        isSelected
          ? 'border-[#9810FA] bg-white font-bold shadow-xl'
          : 'border-[#E5E7EB] bg-white/60 text-[#4A5565] hover:border-[#D8B4FE] hover:bg-[#FAF5FF]'
      }`}
      onClick={onClick}
    >
      <span className="text-16 leading-5.5 font-medium">{label}</span>
      {isSelected && <CheckIcon />}
    </button>
  )
}
