import Link from 'next/link'

import type { ReactNode } from 'react'

import { Heart, User } from 'lucide-react'

import { INTEREST_CATEGORY_LABEL, TYPE_LABEL } from '@/constant'
import { cn } from '@/lib/utils'

import type { Campaign } from '@/entities/campaign'

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
  applyCount,
  applyEndDate,
  brandName,
  category,
  className = '',
  fitLabel,
  id,
  recruitCount,
  title,
  type,
  variant = 'vertical',
}: HomeCampaignCardProps) {
  const isHorizontal = variant === 'horizontal'
  const dday = formatDday(applyEndDate)
  const competitionLabel = `${applyCount}명 / ${recruitCount}명`

  return (
    <Link href={`/campaigns/${variant}/${id}`}>
      <article
        className={cn(
          'flex bg-transparent font-pretendard text-neutral_20',
          isHorizontal
            ? 'min-h-43 max-w-none flex-col gap-4 sm:flex-row sm:gap-6'
            : 'h-80.5 max-w-70.5 flex-col gap-3',
          className
        )}
      >
        {isHorizontal ? (
          <HomeCardImage className="min-h-43 w-full sm:w-[45%]" showChips={false} />
        ) : (
          <HomeCardImage
            categoryLabel={INTEREST_CATEGORY_LABEL[category]}
            className="h-43 w-full"
            typeLabel={TYPE_LABEL[type]}
          >
            {variant === 'ai' && fitLabel && (
              <span className="absolute left-3 top-4 rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
                {fitLabel}
              </span>
            )}
          </HomeCardImage>
        )}

        <div className={cn('flex min-w-0 flex-1 flex-col gap-2', isHorizontal && 'py-1')}>
          <div className="flex flex-col gap-2 border-b border-neutral_95 pb-3">
            <div className="flex items-center gap-2 text-green_40">
              <span className="flex size-5 items-center justify-center rounded-full bg-green_40 text-[8px] font-bold leading-none text-white">
                blog
              </span>
              <span className="text-16 font-bold leading-24">blog</span>
            </div>

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
      </article>
    </Link>
  )
}

function HomeCardImage({
  categoryLabel,
  children,
  className = '',
  showChips = true,
  typeLabel,
}: {
  categoryLabel?: string
  children?: ReactNode
  className?: string
  showChips?: boolean
  typeLabel?: string
}) {
  return (
    <div className={cn('relative shrink-0 rounded-md bg-neutral_99', className)} aria-hidden>
      {children}
      <span className="absolute right-4 top-4 flex size-8.5 items-center justify-center rounded-full bg-white text-neutral_20">
        <Heart className="size-5" />
      </span>
      {showChips && (
        <div className="absolute bottom-4 left-4 flex gap-3">
          <span className="rounded-md bg-neutral_60 px-3 py-1 text-14 font-medium leading-20 text-white shadow-sm">
            {categoryLabel}
          </span>
          <span className="rounded-md bg-red_80 px-3 py-1 text-14 font-medium leading-20 text-white shadow-sm">
            {typeLabel}
          </span>
        </div>
      )}
    </div>
  )
}
