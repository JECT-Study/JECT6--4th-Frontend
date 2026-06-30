'use client'

import Link from 'next/link'

import { useState } from 'react'

import { useAtomValue } from 'jotai'
import { User } from 'lucide-react'

import { campaignService } from '@/service'

import { isLoggedInAtom } from '@/entities/auth'
import type { CampaignLikesAnalysis } from '@/entities/campaign'

import HeartIcon from '@/shared/assets/icons/heart.svg'
import { Button } from '@/shared/ui'

interface Props {
  campaignId: number
  initialIsLiked: boolean
  likesAnalysis: CampaignLikesAnalysis
  url: string
}

export function CampaignActionSection({ campaignId, initialIsLiked, likesAnalysis, url }: Props) {
  const isLoggedIn = useAtomValue(isLoggedInAtom)
  const [isLiked, setIsLiked] = useState(initialIsLiked)

  async function handleLike() {
    await campaignService.toggleLike(campaignId)
    setIsLiked(!isLiked)
  }

  const { analyzed, topKeywords } = likesAnalysis

  return (
    <div className="flex flex-col gap-3.5">
      <Link href={url} className="w-full">
        <Button className="w-full">지원하러 가기</Button>
      </Link>
      <div className="py-6 px-8.75 rounded-[8px] flex gap-4.25 items-center bg-neutral_99">
        <div className="flex">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="flex size-8 items-center justify-center rounded-full border border-[#A8A8A8] bg-white text-neutral_60 shadow-md"
              style={{ marginLeft: i === 0 ? 0 : '-8px', zIndex: 3 - i }}
            >
              <User className="size-4" aria-hidden />
            </div>
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
      {isLoggedIn && (
        <Button variant="tertiary" onClick={() => void handleLike()}>
          <div className="flex items-center gap-3.5">
            <HeartIcon
              className={`size-8 ${isLiked ? 'fill-red_50 stroke-red_50' : 'stroke-black'}`}
            />
            {isLiked ? '관심공고 취소' : '관심공고 담기'}
          </div>
        </Button>
      )}
    </div>
  )
}
