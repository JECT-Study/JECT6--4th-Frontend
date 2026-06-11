'use client'

import { useState } from 'react'

import { ArrowRight } from 'lucide-react'

import AnalyzeIcon from '@/shared/assets/icons/analyze.svg'
import { Button, Input } from '@/shared/ui'

interface Props {
  isSubmitting: boolean
  onSubmit: (blogUrl: string) => void
}

export default function Step1({ isSubmitting, onSubmit }: Props) {
  const [inputValue, setInputValue] = useState('')
  const canSubmit = inputValue.trim().length > 0 && !isSubmitting

  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <AnalyzeIcon />
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          블로그 URL을 입력하고
          <br />
          합격률 2배 늘려보기를 시작하세요
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">URL만 입력하면 AI가 블로그를 분석합니다</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && canSubmit && onSubmit(inputValue.trim())}
          placeholder="URL을 입력해주세요"
          variant="analyze"
          inputClassName="text-[28px] font-normal"
          rightAddon={
            inputValue && (
              <Button
                className="rounded-full p-3.5 size-12.5"
                disabled={!canSubmit}
                onClick={() => onSubmit(inputValue.trim())}
              >
                <ArrowRight className="size-5.5" />
              </Button>
            )
          }
        />
        <p className="text-24 leading-20 text-[#99A1AF]">Enter를 눌러 분석을 시작하세요</p>
      </div>
    </>
  )
}
