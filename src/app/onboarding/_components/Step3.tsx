'use client'

import { Info } from 'lucide-react'

import { Button } from '@/shared/ui'

interface Props {
  activityLevel: string
  isSubmitting: boolean
  onBack: () => void
  onSubmit: () => void
  setActivityLevel: (activityLevel: 'ENTRY' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT') => void
}

const OPTIONS = [
  {
    value: 'ENTRY',
    badge: '입문',
    title: '아직 시작 전이에요',
    description: '체험단은 처음이에요',
  },
  {
    value: 'BEGINNER',
    badge: '초급',
    title: '신청만 해봤어요',
    description: '아직 선정 경험은 없어요',
  },
  {
    value: 'INTERMEDIATE',
    badge: '중급',
    title: '1-2회 체험해봤어요',
    description: '소규모 체험단을 경험해봤어요',
  },
  {
    value: 'EXPERT',
    badge: '고수',
    title: '꾸준히 활동하고 있어요',
    description: '체험단 선정 경험이 꽤 있어요',
  },
] as const

export default function Step3({
  activityLevel,
  isSubmitting,
  onBack,
  onSubmit,
  setActivityLevel,
}: Props) {
  return (
    <div className="mt-16 w-full max-w-232">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-[42px] font-bold leading-13 text-black">
          지금까지 체험단 활동을 얼마나 해보셨나요?
        </h1>
        <p className="text-18 leading-7 text-[#9A8F8F]">
          활동 경험에 맞춰 합격 가능성이 높은 공고부터 추천해드려요
        </p>
      </div>
      <div className="mt-15 flex flex-col items-center">
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6">
          {OPTIONS.map(option => (
            <OptionCard
              key={option.value}
              badge={option.badge}
              description={option.description}
              isSelected={activityLevel === option.value}
              title={option.title}
              onClick={() => setActivityLevel(option.value)}
            />
          ))}
        </div>
        <p className="mt-5 flex w-full items-center gap-2 text-14 leading-5 text-[#7F7F7F]">
          <Info className="size-5" aria-hidden />
          체험단 선정 경험이 2회 이상이라면, 이 단계에서 현재 수익 경험을 선택합니다.
        </p>
        <div className="mt-23 flex w-full gap-3">
          <Button
            variant="tertiary"
            className="h-18 w-54 rounded-[14px] border-2 border-[#CFD5DF] text-20 font-semibold leading-7 text-[#1F2937]"
            disabled={isSubmitting}
            onClick={onBack}
          >
            이전
          </Button>
          <Button
            variant="secondary"
            className="h-18 flex-1 rounded-[14px] bg-[#FF4040] text-20 font-semibold leading-7 text-white hover:bg-[#FF5A5A]"
            disabled={!activityLevel || isSubmitting}
            onClick={onSubmit}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  )
}

interface OptionCardProps {
  badge: string
  description: string
  isSelected: boolean
  onClick: () => void
  title: string
}

function OptionCard({ badge, description, isSelected, onClick, title }: OptionCardProps) {
  return (
    <button
      type="button"
      className={`flex h-39 rounded-[20px] flex-col items-center justify-center border px-8 text-center shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-all ${
        isSelected
          ? 'border-[#FF4040] bg-[#FFE2E2] text-[#111827]'
          : 'border-[#D7D7D7] bg-white text-[#111827] hover:border-[#FF9D9D]'
      }`}
      onClick={onClick}
    >
      <span
        className={`mb-3 rounded-full px-5 py-2 text-14 font-semibold leading-5 ${
          isSelected ? 'bg-white text-[#FF4040]' : 'bg-[#F4F4F4] text-[#8A8A8A]'
        }`}
      >
        {badge}
      </span>
      <span className="text-18 font-bold leading-7">{title}</span>
      <span className="mt-3 text-14 leading-5 text-[#7F7F7F]">{description}</span>
    </button>
  )
}
