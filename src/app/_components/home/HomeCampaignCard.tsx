'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { Heart, User } from 'lucide-react'

import { TYPE_LABEL } from '@/constant'
import { cn } from '@/lib/utils'
import { campaignService } from '@/service'

import type { Campaign } from '@/entities/campaign'

import { saveRecentView } from '@/shared/hooks/useRecentViews'
import { BlogTag } from '@/shared/ui/blog-card/BlogTag'

function formatDday(applyEndDate: string) {
  const diff = Math.ceil((new Date(applyEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  if (diff > 0) return `D-${diff}`
  if (diff === 0) return 'D-Day'
  return '마감'
}

interface HomeCampaignCardProps extends Campaign {
  className?: string
  fitLabel?: string
  variant?: 'ai' | 'horizontal' | 'vertical'
}

export function HomeCampaignCard({
  applyEndDate,
  brandName,
  className = '',
  fitLabel,
  id,
  liked = false,
  recruitCount,
  title,
  type,
  variant = 'vertical',
}: HomeCampaignCardProps) {
  const [isLiked, setIsLiked] = useState(liked)
  const [isLikeSubmitting, setIsLikeSubmitting] = useState(false)
  const isHorizontal = variant === 'horizontal'
  const dday = formatDday(applyEndDate)
  const competitionLabel = `모집 ${recruitCount ?? '-'}명`

  const campaign: Campaign = {
    applyEndDate,
    brandName,
    id,
    liked: isLiked,
    recruitCount,
    title,
    type,
  }

  useEffect(() => {
    setIsLiked(liked)
  }, [liked])

  async function handleLike() {
    if (isLikeSubmitting) return

    setIsLikeSubmitting(true)

    try {
      await campaignService.toggleLike(id)
      setIsLiked(prev => !prev)
    } finally {
      setIsLikeSubmitting(false)
    }
  }

  return (
    <article
      className={cn(
        'flex bg-transparent font-pretendard text-neutral_20',
        isHorizontal
          ? 'min-h-43 max-w-none flex-col gap-4 sm:flex-row sm:gap-6'
          : 'h-80.5 max-w-70.5 flex-col gap-3',
        className
      )}
    >
      <div
        className={cn(
          'relative shrink-0',
          isHorizontal ? 'min-h-43 w-full sm:w-[45%]' : 'h-43 w-full'
        )}
      >
        <Link href={`/campaigns/${id}`} onClick={() => saveRecentView(campaign)}>
          <HomeCardImage className="h-full w-full">
            {variant === 'ai' && fitLabel && (
              <span className="absolute left-3 top-4 rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
                {fitLabel}
              </span>
            )}
          </HomeCardImage>
        </Link>
        <button
          type="button"
          disabled={isLikeSubmitting}
          className="absolute right-4 top-4 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-white text-neutral_20 disabled:cursor-not-allowed disabled:opacity-70"
          onClick={() => void handleLike()}
        >
          <Heart
            className={`size-5 ${isLiked ? 'fill-red_50 stroke-red_50' : 'stroke-neutral_20'}`}
            aria-hidden
          />
          <span className="sr-only">{isLiked ? '관심공고 취소' : '관심공고 담기'}</span>
        </button>
      </div>

      <Link href={`/campaigns/${id}`} onClick={() => saveRecentView(campaign)}>
        <div className={cn('flex min-w-0 flex-1 flex-col gap-2', isHorizontal && 'py-1')}>
          <div className="flex flex-col gap-2 border-b border-neutral_95 pb-3">
            <BlogTag />

            <h3
              className={cn(
                'm-0 line-clamp-2 font-semibold text-neutral_20',
                isHorizontal ? 'text-20 leading-32' : 'text-18 leading-28'
              )}
            >
              {title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-md border border-neutral_90 bg-white px-3 py-1 text-14 font-medium leading-20 text-neutral_50">
                {TYPE_LABEL[type]}
              </span>
              <span className="py-1 text-14 font-medium leading-20 text-neutral_50">
                {brandName}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'mt-auto flex items-center gap-2 font-semibold text-neutral_20',
              isHorizontal ? 'text-16 leading-24' : 'text-14 leading-20'
            )}
          >
            <span className="text-red_50">{dday}</span>
            <User className="size-4" aria-hidden />
            <span>{competitionLabel}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

function HomeCardImage({ children, className = '' }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('relative shrink-0 rounded-md bg-neutral_99', className)} aria-hidden>
      {children}
    </div>
  )
}
