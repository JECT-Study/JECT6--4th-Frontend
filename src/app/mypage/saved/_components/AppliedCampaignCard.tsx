import Link from 'next/link'

import type { MyRecentAppliedCampaignSummary } from '@/entities/my'

// 달력 일자 기준으로 D-day 계산(시/분 단위 타임존 오차 방지).
function computeDDay(applyEndDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(applyEndDate)
  let endUtc: number
  if (match) {
    endUtc = Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  } else {
    const parsed = new Date(applyEndDate)
    if (Number.isNaN(parsed.getTime())) return ''
    endUtc = Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())
  }
  const now = new Date()
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const d = Math.round((endUtc - todayUtc) / (1000 * 60 * 60 * 24))
  if (d > 0) return `D-${d}`
  if (d === 0) return 'D-Day'
  return '마감'
}

export function AppliedCampaignCard({
  campaignId,
  title,
  brandName,
  applyEndDate,
}: Pick<MyRecentAppliedCampaignSummary, 'campaignId' | 'title' | 'brandName' | 'applyEndDate'>) {
  const dDay = computeDDay(applyEndDate)
  const isExpired = dDay === '마감'

  return (
    <Link
      href={`/campaigns/${campaignId}`}
      className="flex flex-col gap-4 transition-opacity hover:opacity-80"
    >
      {/* 썸네일 플레이스홀더 */}
      <div className="h-[172px] w-full rounded-lg bg-neutral_95" aria-hidden />

      {/* 캠페인 정보 */}
      <div className="flex flex-col gap-2">
        <p className="line-clamp-2 text-20 font-medium text-neutral_20">{title}</p>
        <p className="text-14 text-neutral_50">{brandName}</p>
      </div>

      {/* D-day */}
      <p
        className={
          isExpired ? 'text-16 font-semibold text-neutral_60' : 'text-16 font-semibold text-red_50'
        }
      >
        {dDay}
      </p>
    </Link>
  )
}
