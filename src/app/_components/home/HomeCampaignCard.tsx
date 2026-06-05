import type { ReactNode } from 'react'

import { Heart, User } from 'lucide-react'

import type { Campaign } from './home.types'

interface HomeCampaignCardProps extends Campaign {
  className?: string
  variant?: 'ai' | 'horizontal' | 'vertical'
}

export function HomeCampaignCard({
  brandName,
  category,
  className = '',
  competitionLabel,
  dday,
  fitLabel,
  offerTitle,
  region,
  variant = 'vertical',
}: HomeCampaignCardProps) {
  const isHorizontal = variant === 'horizontal'

  return (
    <article
      className={[
        'flex bg-transparent font-pretendard text-neutral_20',
        isHorizontal
          ? 'min-h-[172px] max-w-none flex-col gap-4 sm:flex-row sm:gap-6'
          : 'h-[322px] max-w-[282px] flex-col gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isHorizontal ? (
        <HomeCardImage className="min-h-[172px] w-full sm:w-[45%]" showChips={false} />
      ) : (
        <HomeCardImage category={category} className="h-[172px] w-full" region={region}>
          {variant === 'ai' && (
            <span className="absolute left-3 top-4 rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
              {fitLabel}
            </span>
          )}
        </HomeCardImage>
      )}

      <div
        className={['flex min-w-0 flex-1 flex-col gap-2', isHorizontal && 'py-1']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col gap-2 border-b border-neutral_95 pb-3">
          <div className="flex items-center gap-2 text-green_40">
            <span className="flex size-5 items-center justify-center rounded-full bg-green_40 text-[8px] font-bold leading-none text-white">
              blog
            </span>
            <span className="text-16 font-bold leading-24">blog</span>
          </div>

          <h3
            className={[
              'm-0 line-clamp-2 font-semibold text-neutral_20',
              isHorizontal ? 'text-20 leading-32' : 'text-18 leading-28',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {offerTitle}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-md border border-neutral_90 bg-white px-3 py-1 text-14 font-medium leading-20 text-neutral_50">
              {category}
            </span>
            <span className="py-1 text-14 font-medium leading-20 text-neutral_50">{brandName}</span>
          </div>
        </div>

        <div
          className={[
            'mt-auto flex items-center gap-2 font-semibold text-neutral_20',
            isHorizontal ? 'text-16 leading-24' : 'text-14 leading-20',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="text-red_50">{dday}</span>
          <User className="size-4" aria-hidden />
          <span>{competitionLabel}</span>
        </div>
      </div>
    </article>
  )
}

function HomeCardImage({
  category,
  children,
  className = '',
  region,
  showChips = true,
}: {
  category?: string
  children?: ReactNode
  className?: string
  region?: string
  showChips?: boolean
}) {
  return (
    <div
      className={['relative shrink-0 rounded-md bg-neutral_99', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {children}
      <span className="absolute right-4 top-4 flex size-8.5 items-center justify-center rounded-full bg-white text-neutral_20">
        <Heart className="size-5" />
      </span>
      {showChips && (
        <div className="absolute bottom-4 left-4 flex gap-3">
          <span className="rounded-md bg-neutral_60 px-3 py-1 text-14 font-medium leading-20 text-white shadow-sm">
            {region}
          </span>
          <span className="rounded-md bg-red_80 px-3 py-1 text-14 font-medium leading-20 text-white shadow-sm">
            {category}
          </span>
        </div>
      )}
    </div>
  )
}
