import { CalendarDays, Sparkles } from 'lucide-react'

import type {
  BlogAnalysisResponse,
  PopularBlogger,
  RecommendedCampaign,
} from '@/entities/blog-analysis'

import { Button } from '@/shared/ui'

import { AnalysisHighlights } from './AnalysisHighlights'
import { CategoryFitTable } from './CategoryFitTable'
import { InsightCard } from './InsightCard'
import { OverallAnalysisCard } from './OverallAnalysisCard'
import { PopularBloggersSection } from './PopularBloggersSection'
import { RecommendationSection } from './RecommendationSection'

interface BlogAnalysisDashboardProps {
  analysis: BlogAnalysisResponse
  bloggers: PopularBlogger[]
  recommendations: RecommendedCampaign[]
}

export function BlogAnalysisDashboard({
  analysis,
  bloggers,
  recommendations,
}: BlogAnalysisDashboardProps) {
  const result = analysis.analysis

  if (!result) {
    return (
      <main className="bg-neutral_99 px-5 py-18">
        <section className="mx-auto max-w-300 rounded-lg border border-neutral_95 bg-white p-10 text-center">
          <h1 className="text-24 font-bold leading-36 text-neutral_20">
            분석 결과를 준비 중입니다
          </h1>
          <p className="mt-3 text-16 leading-24 text-neutral_50">
            블로그 데이터를 수집하고 있어요. 잠시 후 다시 확인해주세요.
          </p>
        </section>
      </main>
    )
  }

  const hasMetrics = (result.metrics?.length ?? 0) > 0

  return (
    <main className="bg-neutral_99 px-5 pb-24 pt-16 font-pretendard text-neutral_20 md:px-8">
      <div className="mx-auto flex max-w-300 flex-col gap-18">
        <section className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-28 font-bold leading-40">블로그 분석 결과</h1>
            <div className="flex flex-wrap gap-3">
              <Button
                className="gap-2 border border-neutral_95 bg-white px-4 text-14 leading-20 text-neutral_20 hover:bg-neutral_99"
                size="sm"
                variant="tertiary"
              >
                <CalendarDays className="size-4" />
                지난 분석 결과
              </Button>
              <Button className="px-4 text-14 leading-20" size="sm" variant="primary">
                무료진단 1/3회
              </Button>
            </div>
          </div>

          <section className="rounded-lg border border-neutral_95 bg-white px-8 py-9 shadow-sm md:px-10">
            <div className="flex items-center gap-3">
              <Sparkles className="size-6 text-neutral_20" aria-hidden />
              <h2 className="text-22 font-bold leading-32">AI 분석 요약</h2>
            </div>
            <p className="mt-5 text-18 leading-32 text-neutral_30">{result.summary}</p>
          </section>
        </section>

        <section className="flex flex-col gap-8">
          <h2 className="text-28 font-bold leading-40">내 블로그 상세 분석</h2>
          {/*
            [Figma 디자인 vs 백엔드 명세]
            - 종합분석 도넛(OverallAnalysisCard)·강약점 카드(InsightCard)·카테고리 적합도(CategoryFitTable)는
              Figma 디자인 기준으로 먼저 구현된 컴포넌트다.
            - 그러나 현재 백엔드 명세 GET /blog/analysis/{id}는 metrics/categoryFits/strengthCard/weaknessCard를
              제공하지 않는다. 그래서 "명세에 맞춰" 데이터가 있을 때만 렌더한다(없으면 숨김).
            - AnalysisHighlights(요약/키워드/톤/독자층/제안)는 명세가 실제 제공하는 필드 기준 버전이다.
            => 백엔드가 위 필드를 주기 시작하면 프론트 수정 없이 Figma 디자인이 자동 복원된다(forward-compatible).
          */}
          <AnalysisHighlights result={result} />
          {(hasMetrics || result.strengthCard || result.weaknessCard) && (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              {hasMetrics && <OverallAnalysisCard metrics={result.metrics ?? []} />}
              {(result.strengthCard || result.weaknessCard) && (
                <div className="grid gap-8">
                  <InsightCard insight={result.strengthCard} />
                  <InsightCard insight={result.weaknessCard} />
                </div>
              )}
            </div>
          )}
          <CategoryFitTable rows={result.categoryFits} />
        </section>

        <RecommendationSection recommendations={recommendations} />
        <PopularBloggersSection bloggers={bloggers} />
      </div>
    </main>
  )
}
