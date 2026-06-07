'use client'

import { useState } from 'react'

import { ChevronDown } from 'lucide-react'

import { TYPE_LABEL } from '@/constant'

import type { CampaignDetail } from '@/entities/campaign'

import CalendarIcon from '@/shared/assets/icons/calendar.svg'
import DoorIcon from '@/shared/assets/icons/door.svg'
import InfoIcon from '@/shared/assets/icons/info.svg'
import ReviewStarIcon from '@/shared/assets/icons/review-star.svg'

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
      <div className="text-24 leading-6.5 font-medium flex items-center gap-2.5">
        <InfoIcon />
        체험단 정보
      </div>
      <div className="flex px-12.5 py-5 gap-12.5 border border-neutral_95 rounded-[8px] mt-5 mb-7.5">
        <div className="flex flex-col gap-5 text-20 leading-6.5">
          {dday}
          <div className="flex flex-col gap-2.5">
            <span className="text-red_50 text-20 leading-6.5 font-semibold">{remaining}</span>
            <span className="text-12 leading-6.5 text-[#666666]">마감일: {data.applyEndDate}</span>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-20 leading-6.5">
          경쟁률
          <div className="flex gap-2.5 items-center">
            <div className="font-semibold text-red_50">{ratio}</div>
            <div className="px-2 py-1 rounded-[8px] bg-red_95 text-16 leading-6.5 text-red_60">
              {level}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 text-20 leading-6.5">
          신청자수
          <div className="font-semibold">
            {data.applyCount}/{data.recruitCount}명
          </div>
        </div>
        <div className="flex flex-col gap-5 text-20 leading-6.5">
          조회수
          <div className="font-semibold">{data.viewerCount}</div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <CalendarIcon />
          <div className="flex flex-col">
            <div className="font-medium text-16 leading-20">신청 기간</div>
            <div className="text-14 leading-20 text-[#666666]">
              {data.applyStartDate} ~ {data.applyEndDate}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <CalendarIcon />
          <div className="flex flex-col">
            <div className="font-medium text-16 leading-20">발표 일정</div>
            <div className="text-14 leading-20 text-[#666666]">{data.announceDate}</div>
          </div>
        </div>
        <div className="flex gap-4">
          <ReviewStarIcon />
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col">
              <div className="font-medium text-16 leading-20">리뷰 등록 기간</div>
              <div className="flex gap-2 text-14 leading-20 text-[#666666]">
                {data.reviewDeadline}
                <div
                  className="cursor-pointer flex items-center text-black gap-1"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Show more
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-5 rounded-[8px] bg-[#F5F5F5]">텍스트</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <DoorIcon />
          <div className="flex flex-col">
            <div className="font-medium text-16 leading-20">리뷰 형태</div>
            <div className="text-14 leading-20 text-[#666666]">{TYPE_LABEL[data.type]}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
