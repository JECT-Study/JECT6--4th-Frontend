'use client'

import { INTEREST_CATEGORY_LABEL } from '@/constant'

import { InterestCategory } from '@/entities/user'

import { Button } from '@/shared/ui'

interface Props {
  isSubmitting: boolean
  onBack: () => void
  onSubmit: () => void
  selected: InterestCategory[]
  setSelected: (categories: InterestCategory[]) => void
}

const CATEGORY_LABELS: Record<InterestCategory, string> = {
  FOOD: '음식',
  BEAUTY: '뷰티',
  CULTURE: '문화',
  TRAVEL: '여행',
  TECH_IT: '테크/it',
  PET: '펫',
  FASHION: '패션',
  LIVING: '생활용품',
  ETC: '기타(도서/취미/기타)',
}

export default function Step2({ isSubmitting, onBack, onSubmit, selected, setSelected }: Props) {
  const toggleCategory = (category: InterestCategory) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(item => item !== category))
      return
    }

    if (selected.length < 5) {
      setSelected([...selected, category])
    }
  }

  return (
    <div className="mt-17 w-full max-w-185">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-[42px] font-bold leading-13 text-black">
          관심 카테고리를 선택해주세요
        </h1>
        <p className="text-18 leading-7 text-[#9A8F8F]">
          선택한 카테고리를 바탕으로 맞춤 체험단을 추천해드려요
        </p>
      </div>
      <div className="mt-15 flex flex-col items-center">
        <div className="flex max-w-150 flex-wrap justify-center gap-5">
          {InterestCategory.options.map(category => (
            <CategoryChip
              key={category}
              isDisabled={!selected.includes(category) && selected.length >= 5}
              isSelected={selected.includes(category)}
              label={CATEGORY_LABELS[category] ?? INTEREST_CATEGORY_LABEL[category]}
              onClick={() => toggleCategory(category)}
            />
          ))}
        </div>
        <p className="mt-9 text-14 leading-5 text-[#AAA0A0]">
          최소 1개 ~ 최대 5개까지 선택할 수 있어요. ({selected.length}/5)
        </p>
        <div className="mt-21 flex w-full gap-3">
          <Button
            variant="tertiary"
            className="h-18 w-54 rounded-[14px] border-2 border-[#CFD5DF] text-20 font-semibold leading-7 text-[#1F2937]"
            disabled={isSubmitting}
            onClick={onBack}
          >
            이전
          </Button>
          <Button
            className="h-18 flex-1 rounded-[14px] bg-[#0B1220] text-20 font-semibold leading-7 text-white hover:bg-[#151D2D]"
            disabled={selected.length === 0 || isSubmitting}
            onClick={onSubmit}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}

interface CategoryChipProps {
  isDisabled: boolean
  isSelected: boolean
  label: string
  onClick: () => void
}

function CategoryChip({ isDisabled, isSelected, label, onClick }: CategoryChipProps) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`h-13 cursor-pointer rounded-full border px-5 text-18 font-medium leading-7 shadow-[0_2px_5px_rgba(0,0,0,0.18)] transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
        isSelected
          ? 'border-[#FF4040] bg-[#FFE9E9] text-[#FF4040]'
          : 'border-[#D9D9D9] bg-white text-[#6C6C6C] hover:border-[#FF9D9D] hover:text-[#FF6B6B]'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
