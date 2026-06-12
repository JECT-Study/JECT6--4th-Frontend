import Link from 'next/link'

import { CheckCircle2, Zap } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { AnalysisInsightCard } from '@/entities/blog-analysis'

export function InsightCard({ insight }: { insight?: AnalysisInsightCard }) {
  if (!insight) return null

  const isStrength = insight.type === 'strength'

  return (
    <article className="flex min-h-64 flex-col justify-between rounded-lg border border-neutral_95 bg-white p-7 shadow-sm">
      <div className="flex gap-4">
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-lg',
            isStrength ? 'bg-green_95 text-green_40' : 'bg-orange_95 text-red_orange_50'
          )}
          aria-hidden
        >
          {isStrength ? <CheckCircle2 className="size-5" /> : <Zap className="size-5" />}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              'text-14 font-semibold leading-20',
              isStrength ? 'text-green_40' : 'text-red_orange_50'
            )}
          >
            {insight.label}
          </p>
          <h3 className="mt-1 text-18 font-bold leading-28 text-neutral_20">{insight.title}</h3>
          <p className="mt-5 text-14 leading-24 text-neutral_30">{insight.description}</p>
        </div>
      </div>
      <Link
        className={cn(
          'mt-8 w-fit text-14 font-bold leading-20',
          isStrength ? 'text-green_40' : 'text-red_orange_50'
        )}
        href="#category-fit"
      >
        {insight.actionLabel} -&gt;
      </Link>
    </article>
  )
}
