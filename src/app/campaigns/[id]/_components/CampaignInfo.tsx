'use client'

import { useState } from 'react'

import { TYPE_LABEL } from '@/constant'

import type { CampaignDetail } from '@/entities/campaign'

interface Props {
  data: CampaignDetail
}

function getDdayLabel(applyEndDate: string) {
  const diff = Math.ceil((new Date(applyEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (diff > 0) return { dday: `D-${diff}`, remaining: `${diff}일 남음` }
  if (diff === 0) return { dday: 'D-Day', remaining: '오늘 마감' }
  return { dday: '마감', remaining: '마감' }
}

function getCompetitionLabel(applyCount: number, recruitCount: number) {
  const ratio = recruitCount > 0 ? applyCount / recruitCount : 0
  const level = ratio < 1 ? '낮음' : ratio < 3 ? '보통' : '높음'
  return { ratio: `1:${ratio.toFixed(1)}`, level }
}

export function CampaignInfo({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { dday, remaining } = getDdayLabel(data.applyEndDate)
  const { ratio, level } = getCompetitionLabel(data.applyCount, data.recruitCount)

  return (
    <div className="p-5 flex flex-col border border-neutral_95 rounded-[8px]">
      <div>체험단 정보</div>
      <div className="flex px-12.5 py-5 gap-12.5 border border-neutral_95 rounded-[8px] mt-5 mb-7.5">
        <div className="flex flex-col gap-5">
          {dday}
          <div className="flex flex-col gap-2.5">
            <span>{remaining}</span>
            <span>마감일: {data.applyEndDate}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          경쟁률
          <div className="flex gap-2.5 items-center">
            {ratio}
            <span>{level}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          신청자수
          <div>
            {data.applyCount}/{data.recruitCount}명
          </div>
        </div>
        <div className="flex flex-col gap-5">
          조회수
          <div>{data.viewerCount}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>신청 기간</div>
            <div>
              {data.applyStartDate} ~ {data.applyEndDate}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>발표 일정</div>
            <div>{data.announceDate}</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <div>리뷰 등록 기간</div>
              <div className="flex gap-2">
                {data.reviewDeadline}
                <div onClick={() => setIsOpen(!isOpen)}>더보기</div>
              </div>
            </div>
            {isOpen && <div className="p-5 rounded-[8px] bg-neutral_95">텍스트</div>}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="size-8 bg-neutral_50" />
          <div className="flex flex-col">
            <div>리뷰 형태</div>
            {TYPE_LABEL[data.type]}
          </div>
        </div>
      </div>
    </div>
  )
}
