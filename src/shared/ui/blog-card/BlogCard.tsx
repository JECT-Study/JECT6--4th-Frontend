import Image from 'next/image'

import type { HTMLAttributes } from 'react'

import BlogThumbnailImage from '@/shared/assets/icons/thumbnail.jpeg'

export type BlogCardVariant = 'creator' | 'vertical' | 'ai' | 'horizontal' | 'thumbnail'

interface BlogCardProps extends HTMLAttributes<HTMLElement> {
  brandName?: string
  category?: string
  competitionLabel?: string
  dday?: string
  fitLabel?: string
  handle?: string
  likeCount?: number
  offerTitle?: string
  region?: string
  title?: string
  variant?: BlogCardVariant
}

const widthClassName: Record<BlogCardVariant, string> = {
  ai: 'max-w-[282px]',
  creator: 'max-w-[570px]',
  horizontal: 'max-w-[420px]',
  thumbnail: 'max-w-[282px]',
  vertical: 'max-w-[282px]',
}

export function BlogCard({
  brandName = '상호/브랜드명',
  category = '카테고리',
  className = '',
  competitionLabel = '경쟁률 1:1',
  dday = 'D-day',
  fitLabel = 'AI 적합도',
  handle = '@아이디',
  likeCount = 120,
  offerTitle = '[지역] 제공 내용',
  region = '지역',
  title = '포스팅 제목제목제목제목',
  variant = 'vertical',
  ...props
}: BlogCardProps) {
  const isCreator = variant === 'creator'
  const hasThumbnail = variant === 'thumbnail'
  const isAi = variant === 'ai'

  return (
    <article
      className={[
        'flex flex-col gap-4 rounded-xl border border-neutral_95 bg-white p-5 font-pretendard text-neutral_20',
        widthClassName[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {isCreator && (
        <header className="flex items-center gap-3">
          <span className="h-12 w-12 shrink-0 rounded-full bg-neutral_95" aria-hidden />
          <div className="flex flex-col gap-0.5">
            <h3 className="m-0 text-16 font-bold leading-24">블로그명</h3>
            <span className="text-14 font-medium leading-20 text-neutral_60">{handle}</span>
          </div>
        </header>
      )}

      {hasThumbnail && (
        <div className="relative h-[120px] w-full overflow-hidden rounded-[10px] bg-neutral_95">
          <Image src={BlogThumbnailImage} alt="" fill className="object-cover" sizes="282px" />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-neutral_99 px-2.5 py-1 text-12 font-semibold leading-16 text-neutral_40">
          {region}
        </span>
        <span className="rounded-full bg-neutral_99 px-2.5 py-1 text-12 font-semibold leading-16 text-neutral_40">
          {category}
        </span>
        {isCreator && (
          <span className="rounded-full bg-neutral_99 px-2.5 py-1 text-12 font-semibold leading-16 text-neutral_40">
            맛집 블로거
          </span>
        )}
      </div>

      {isAi && (
        <span className="w-fit rounded-full bg-blue_95 px-2.5 py-1 text-12 font-bold leading-16 text-blue_40">
          {fitLabel}
        </span>
      )}

      <h3 className="m-0 text-18 font-bold leading-28">{isCreator ? title : offerTitle}</h3>

      <div className="flex flex-wrap items-center gap-3 text-14 font-medium leading-20 text-neutral_50">
        <span>{brandName}</span>
        <span>{dday}</span>
        <span>{competitionLabel}</span>
        {isCreator && <span>좋아요 {likeCount}</span>}
      </div>
    </article>
  )
}
