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
    <div className="flex flex-col gap-[104px] pb-20 pt-[62px]">
      <section className="flex flex-col gap-6">
        <h2 className="text-[22px] font-semibold leading-32 text-[#303030]">
          내 블로그 AI 상세 분석
        </h2>
        <div className="flex flex-col gap-[48px] rounded-[16px] border border-[#dcdcdc] px-6 py-8">
          <div className="flex flex-col gap-4">
            <p className="text-24 font-semibold leading-36 text-[#474747]">
              내 블로그 분석하고 합격률을 100%로 높이기
            </p>
            <p className="text-[22px] font-medium leading-20 text-[#737373]">
              내 블로그를 분석하고 합격률을 높여보세요 !
            </p>
          </div>
          <Button variant="secondary" size="lg" fullWidth asChild>
            <Link href="/analyze">AI 진단하기</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <h2 className="text-[22px] font-semibold leading-32 text-[#303030]">지난 분석 결과</h2>
        <div className="flex flex-col gap-6">
          {history.aiHistory.length === 0 ? (
            <p className="text-16 text-neutral_60">아직 분석 이력이 없어요.</p>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {history.aiHistory.map(h => (
                <AiDiagnosisCard
                  key={h.historyId}
                  diagnosisDate={h.diagnosisDate}
                  documentId={h.documentId}
                />
              ))}
            </div>
          )}
          {quota && <QuotaBanner limit={quota.limit} remaining={quota.remaining} />}
        </div>
      </section>
    </div>
  )
}
