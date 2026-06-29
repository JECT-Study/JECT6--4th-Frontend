'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { AiDiagnosisCard } from './_components/AiDiagnosisCard'
import { QuotaBanner } from './_components/QuotaBanner'
import { useAiHistory, useQuota } from './hooks/useAiHistory'

export default function AiHistoryPage() {
  const { data: history, isLoading, isError, refetch } = useAiHistory()
  const { data: quota } = useQuota()

  if (isLoading) {
    return <p className="pt-12 text-16 text-neutral_60">불러오는 중...</p>
  }

  if (isError || !history) {
    return (
      <div className="flex flex-col items-start gap-3 pt-12">
        <p className="text-16 text-neutral_60">정보를 불러오지 못했습니다.</p>
        <button
          type="button"
          onClick={() => {
            void refetch()
          }}
          className="text-16 font-medium text-violet_80"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[104px] pb-20">
      <section className="flex flex-col gap-6">
        <h2 className="text-22 font-semibold leading-32 text-neutral_20">내 블로그 AI 상세 분석</h2>
        <div className="flex flex-col gap-12 rounded-2xl border border-neutral_95 px-6 py-8">
          <div className="flex flex-col gap-4">
            <p className="text-24 font-semibold leading-36 text-neutral_30">
              내 블로그 분석하고 합격율을 100%로 높히기
            </p>
            <p className="text-22 font-medium leading-20 text-neutral_50">
              내 블로그를 분석하고 합격율을 높혀보세요 !
            </p>
          </div>
          <Button variant="secondary" size="lg" fullWidth asChild>
            <Link href="/analyze">AI 진단하기</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="text-22 font-semibold leading-32 text-neutral_20">지난 분석 결과</h2>
        <div className="flex flex-col gap-6">
          {history.aiHistory.length === 0 ? (
            <p className="text-16 text-neutral_60">아직 분석 이력이 없어요.</p>
          ) : (
            <div className="flex gap-8">
              {history.aiHistory.map((h, i) => (
                <AiDiagnosisCard key={h.historyId} index={i + 1} diagnosisDate={h.diagnosisDate} />
              ))}
            </div>
          )}
          {quota && (
            <QuotaBanner used={quota.used} limit={quota.limit} remaining={quota.remaining} />
          )}
        </div>
      </section>
    </div>
  )
}
