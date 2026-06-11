'use client'

import { useState } from 'react'

import type { BlogAnalysisResponse } from '@/entities/blog-analysis'

import AnalyzeIcon from '@/shared/assets/icons/analyze.svg'
import CheckboxIcon from '@/shared/assets/icons/checked.svg'
import CircleCheckIcon from '@/shared/assets/icons/circle-check.svg'
import InternetIcon from '@/shared/assets/icons/internet.svg'
import { Button } from '@/shared/ui'

import AnalyzeDialog from './AnalyzeDialog'

interface Props {
  analysis: BlogAnalysisResponse
  blogUrl: string
  onCancel: () => void
  onViewResult: () => void
}

export default function Step3({ analysis, blogUrl, onCancel, onViewResult }: Props) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <AnalyzeIcon />
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          블로그 분석이 완료되었습니다!
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">분석 결과를 저장하시겠어요?</p>
      </div>
      <div className="flex flex-col items-center gap-6.5 w-186.5">
        <div className="bg-white border-2 border-[#E5E7EB] p-7.25 flex gap-4.5 rounded-[18px] w-full shadow-[0px_31.52px_63.04px_-15.13px_#00000040]">
          <div className="size-15.5 flex items-center justify-center rounded-[15px] bg-[linear-gradient(135deg,#A1FFC4_0%,#C4FDDE_44.24%,#F0FBFF_100%)]">
            <InternetIcon />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2.25 pb-2">
              <CircleCheckIcon />
              <p className="text-[#00A63E] text-16 leading-5.5">URL 확인 완료</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-20 leading-7.75 font-medium">네이버 블로그</p>
              <p className="text-16 leading-5.5 text-[#6A7282]">{blogUrl}</p>
              {analysis.analysis?.summary && (
                <p className="text-14 leading-5 text-[#6A7282]">{analysis.analysis.summary}</p>
              )}
            </div>
          </div>
        </div>
        <div
          className={`bg-white border-2 p-7.25 flex gap-4.5 rounded-[18px] w-full cursor-pointer transition-colors ${isChecked ? 'border-[#9810FA]' : 'border-[#E5E7EB]'}`}
          onClick={() => setIsChecked(prev => !prev)}
        >
          <CheckboxIcon
            className={`size-5.5 stroke-1 ${isChecked ? 'fill-[#9810FA] stroke-[#9810FA]' : 'stroke-[#99A1AF]'}`}
          />
          <div className="flex flex-col gap-1.5">
            <p className="text-18 leading-6.75 font-medium">이 블로그를 기본 채널로 설정할까요?</p>
            <p className="text-16 leading-5.5 text-[#4A5565] font-medium">
              설정 시 이 블로그의 분석 결과가 메인 화면에 표시됩니다.
            </p>
          </div>
        </div>
        <div className="flex gap-4.25 w-full">
          <Button variant="tertiary" className="w-1/2" onClick={onCancel}>
            취소
          </Button>
          <div className="w-1/2">
            <AnalyzeDialog handleClick={onViewResult} />
          </div>
        </div>
      </div>
    </>
  )
}
