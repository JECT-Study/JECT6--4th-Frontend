'use client'

import { useState } from 'react'

import type { CampaignCategory } from '@/entities/campaign'

import CheckIcon from '@/shared/assets/icons/gradient-check.svg'
import { Button } from '@/shared/ui'

interface Props {
  handleStep: (v: number) => void
}

const CATEGORIES: { value: CampaignCategory; label: string }[] = [
  { value: 'FOOD', label: '음식/맛집' },
  { value: 'BEAUTY', label: '뷰티' },
  { value: 'FASHION', label: '패션' },
  { value: 'TRAVEL', label: '여행' },
  { value: 'LIFESTYLE', label: '라이프스타일' },
  { value: 'IT', label: 'IT/테크' },
  { value: 'SPORTS', label: '스포츠' },
  { value: 'CULTURE', label: '문화/예술' },
]

export default function Step4({ handleStep }: Props) {
  const [selected, setSelected] = useState<CampaignCategory[]>([])

  function toggle(value: CampaignCategory) {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : prev.length < 2
          ? [...prev, value]
          : prev
    )
  }

  return (
    <div className="py-32.5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          주로 어떤 주제로
          <br />
          블로그를 운영하고 있나요?
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">최대 2개까지 선택할 수 있어요</p>
      </div>
      <div className="flex flex-col items-center gap-6 pt-12">
        <div className="grid grid-cols-3 gap-4">
          {CATEGORIES.map(({ value, label }) => (
            <GridItem
              key={value}
              label={label}
              isSelected={selected.includes(value)}
              onClick={() => toggle(value)}
            />
          ))}
        </div>
        <Button className="w-100" disabled={selected.length === 0} onClick={() => handleStep(5)}>
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
    <div
      className={`size-60 rounded-[16px] flex flex-col gap-3 text-18 leading-5.5 items-center justify-center cursor-pointer border-2 transition-all duration-150 ${
        isSelected
          ? 'border-[#9810FA] bg-white font-bold shadow-xl'
          : 'border-[#E5E7EB] bg-white/60 text-[#4A5565] hover:border-[#D8B4FE] hover:bg-[#FAF5FF]'
      }`}
      onClick={onClick}
    >
      <span className="text-16 leading-5.5 font-medium">{label}</span>
      {isSelected && <CheckIcon />}
    </div>
  )
}
