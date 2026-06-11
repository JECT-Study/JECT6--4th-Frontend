'use client'

import { useEffect, useState } from 'react'

import { blogAnalysisService } from '@/service'

import type { BlogAnalysisResponse } from '@/entities/blog-analysis'

import AnalyzeIcon from '@/shared/assets/icons/analyze.svg'
import { Input } from '@/shared/ui'

interface Props {
  blogUrl: string
  documentId: number
  onComplete: (analysis: BlogAnalysisResponse) => void
  onError: (message: string) => void
}

const STEPS = [
  { title: '블로그 콘텐츠 수집 중', description: 'AI가 블로그의 글을 읽고 있습니다...' },
  { title: '블로그 지표 분석 중', description: '방문자 수, 키워드 등을 분석하고 있습니다...' },
  { title: 'AI 진단 리포트 생성 중', description: '분석 결과를 바탕으로 리포트를 작성합니다...' },
]

export default function Step2({ blogUrl, documentId, onComplete, onError }: Props) {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let ignore = false
    const timers = [
      setTimeout(() => setCurrentStep(1), 3000),
      setTimeout(() => setCurrentStep(2), 6000),
    ]

    async function fetchAnalysis() {
      try {
        const analysis = await blogAnalysisService.getAnalysis(documentId)
        if (!ignore) {
          setCurrentStep(2)
          onComplete(analysis)
        }
      } catch {
        if (!ignore) {
          onError('분석 결과를 불러오지 못했어요. 다시 시도해주세요.')
        }
      }
    }

    const completeTimer = setTimeout(() => {
      void fetchAnalysis()
    }, 9000)

    return () => {
      ignore = true
      timers.forEach(clearTimeout)
      clearTimeout(completeTimer)
    }
  }, [documentId, onComplete, onError])

  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <AnalyzeIcon />
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          블로그 분석을 시작하세요
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">URL만 입력하면 AI가 블로그를 분석합니다</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <Input
          readOnly
          value={blogUrl}
          variant="analyze"
          inputClassName="text-[28px] font-normal"
        />
        <div className="flex flex-col items-center gap-4.5">
          {STEPS.map((step, i) => {
            const isActive = i === currentStep
            const isCompleted = i < currentStep
            const isPending = i > currentStep

            return (
              <div
                key={i}
                className={`p-7 border border-[#F3E8FF] flex gap-4.5 shadow-[0px_31.52px_63.04px_-15.13px_#00000040] rounded-[16px] w-186.5 transition-all duration-500 ${isActive ? 'bg-white/90' : 'bg-white/60'}`}
              >
                <div
                  className={`size-9 rounded-full flex justify-center items-center shrink-0 ${isActive || isCompleted ? 'bg-[#F3E8FF]' : 'bg-[#F3F4F6]'}`}
                >
                  {isActive && (
                    <div className="size-4.5 rounded-full border-2 border-[#9810FA] animate-pulse" />
                  )}
                  {isCompleted && <div className="size-4.5 rounded-full bg-[#9810FA]" />}
                  {isPending && <div className="size-2.25 rounded-full bg-[#99A1AF]" />}
                </div>
                <div className="flex flex-col gap-1.75">
                  <div className={`text-18 leading-6.5 ${isPending ? 'text-[#99A1AF]' : ''}`}>
                    {step.title}
                  </div>
                  <div
                    className={`text-16 leading-5.5 ${isPending ? 'text-[#99A1AF]' : 'text-[#6A7282]'}`}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
