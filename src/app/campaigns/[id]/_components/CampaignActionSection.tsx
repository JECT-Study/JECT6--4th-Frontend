'use client'

import { useState } from 'react'

import { campaignService } from '@/service'

import type { CampaignLikesAnalysis } from '@/entities/campaign'

import HeartIcon from '@/shared/assets/icons/heart.svg'
import { Button } from '@/shared/ui'

interface Props {
  campaignId: number
  initialIsLiked: boolean
  likesAnalysis: CampaignLikesAnalysis
}

export function CampaignActionSection({ campaignId, initialIsLiked, likesAnalysis }: Props) {
  const [isLiked, setIsLiked] = useState(initialIsLiked)

  async function handleLike() {
    const result = await campaignService.toggleLike(campaignId)
    setIsLiked(result.liked)
  }

  const { analyzed, topKeywords } = likesAnalysis

  return (
    <div className="flex flex-col gap-3.5">
      <Button>지원하러 가기</Button>
      <div className="py-6 px-8.75 rounded-[8px] flex gap-4.25 items-center bg-neutral_99">
        <div className="flex">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="size-8 rounded-full border border-[#A8A8A8] bg-white shadow-md"
              style={{ marginLeft: i === 0 ? 0 : '-8px', zIndex: 3 - i }}
            />
          ))}
        </div>
        {analyzed && topKeywords && topKeywords.length > 0 ? (
          <p className="text-16 leading-5.5">
            이 공고에 좋아요를 누른 사용자는
            <br />
            <span className="font-bold">{topKeywords.join(', ')}</span> 특징을 가지고 있어요
          </p>
        ) : (
          <p className="text-16 leading-5.5 text-neutral_50">
            좋아요가 5개 이상 쌓이면
            <br />
            사용자 특징 분석 결과를 볼 수 있어요
          </p>
        )}
      </div>
      <Button variant="tertiary" onClick={handleLike}>
        <div className="flex items-center gap-3.5">
          <HeartIcon className={`size-8 ${isLiked ? 'text-red_50' : ''}`} />
          {isLiked ? '관심공고 취소' : '관심공고 담기'}
        </div>
      </Button>
    </div>
  )
}
