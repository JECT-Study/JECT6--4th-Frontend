import Link from 'next/link'

import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react'

import { CAMPAIGN_CATEGORY_LABEL } from '@/constant'
import { cn } from '@/lib/utils'

import type {
  AnalysisInsightCard,
  AnalysisMetric,
  AnalysisResult,
  BlogAnalysisResponse,
  CategoryFit,
  PopularBlogger,
  RecommendedCampaign,
} from '@/entities/blog-analysis'

import { Button } from '@/shared/ui'

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

function AnalysisHighlights({ result }: { result: AnalysisResult }) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <article className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm">
        <h3 className="text-18 font-bold leading-28">핵심 키워드 · 톤</h3>
        {result.keyTopics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {result.keyTopics.map(topic => (
              <span
                key={topic}
                className="rounded-full bg-neutral_95 px-3 py-1 text-14 leading-20 text-neutral_30"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
        <dl className="mt-6 grid gap-3 text-14 leading-22">
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold text-neutral_50">톤</dt>
            <dd className="text-neutral_20">{result.tone}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-16 shrink-0 font-semibold text-neutral_50">독자층</dt>
            <dd className="text-neutral_20">{result.targetAudience}</dd>
          </div>
        </dl>
      </article>
      <article className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm">
        <h3 className="text-18 font-bold leading-28">개선 제안</h3>
        <ul className="mt-5 grid gap-3">
          {result.suggestions.map(suggestion => (
            <li key={suggestion} className="flex gap-2 text-14 leading-22 text-neutral_30">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green_40" aria-hidden />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}

function OverallAnalysisCard({ metrics }: { metrics: AnalysisMetric[] }) {
  return (
    <article className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm">
      <h3 className="text-18 font-bold leading-28">종합 분석</h3>
      <div className="mt-10 flex justify-center">
        <MetricDonut metrics={metrics} />
      </div>
      <dl className="mt-10 grid gap-3">
        {metrics.map(metric => (
          <div key={metric.key} className="grid grid-cols-[1fr_auto] items-center gap-4">
            <dt className="flex min-w-0 items-center gap-2 text-14 leading-20 text-neutral_20">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: metric.color }}
                aria-hidden
              />
              <span className="truncate">{metric.label}</span>
            </dt>
            <dd className="text-14 font-semibold leading-20 text-neutral_20">{metric.score}%</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

function MetricDonut({ metrics }: { metrics: AnalysisMetric[] }) {
  const total = metrics.reduce((sum, metric) => sum + metric.score, 0)
  const segments = metrics.reduce<string[]>((nextSegments, metric, index) => {
    const start = metrics
      .slice(0, index)
      .reduce((sum, currentMetric) => sum + (currentMetric.score / total) * 100, 0)
    const end = start + (metric.score / total) * 100

    return [...nextSegments, `${metric.color} ${start}% ${end}%`]
  }, [])

  return (
    <div
      className="relative size-55 rounded-full"
      style={{ background: `conic-gradient(${segments.join(', ')})` }}
      aria-label="블로그 종합 분석 도넛 차트"
      role="img"
    >
      <span className="absolute inset-14 rounded-full bg-white" aria-hidden />
    </div>
  )
}

function InsightCard({ insight }: { insight?: AnalysisInsightCard }) {
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

function CategoryFitTable({ rows }: { rows?: CategoryFit[] }) {
  if (!rows || rows.length === 0) return null

  return (
    <section
      id="category-fit"
      className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm"
    >
      <h3 className="text-18 font-bold leading-28">카테고리 적합도</h3>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-160 table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral_95 text-14 font-bold leading-20 text-neutral_30">
              <th className="w-1/4 px-4 py-3">순위</th>
              <th className="w-1/4 px-4 py-3">활동도</th>
              <th className="w-1/2 px-4 py-3">적합도</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: CategoryFit) => (
              <tr key={row.category} className="border-b border-neutral_99 last:border-b-0">
                <td className="px-4 py-4 text-14 leading-20 text-neutral_30">{row.keyword}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex min-w-9 justify-center rounded-md bg-red_50 px-2 py-1 text-12 font-bold leading-14 text-white">
                    {row.activityScore}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 text-14 leading-20 text-neutral_20">
                      {row.fitnessScore}%
                    </span>
                    <span className="h-1.5 w-24 rounded-full bg-neutral_95">
                      <span
                        className="block h-full rounded-full bg-neutral_20"
                        style={{ width: `${row.fitnessScore}%` }}
                      />
                    </span>
                    <span className="truncate text-14 leading-20 text-neutral_50">
                      {CAMPAIGN_CATEGORY_LABEL[row.category]}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function RecommendationSection({ recommendations }: { recommendations: RecommendedCampaign[] }) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h2 className="text-24 font-bold leading-36">AI 추천 공고</h2>
          <p className="mt-4 text-16 font-semibold leading-24 text-neutral_20">
            *사용자가 선택한 선호 뿐만 아니라 블로그의 유형과 포스팅 방식 등을 종합하여 분석한 결과
            AI가 추천하는 공고입니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            aria-label="이전 추천 공고"
            className="size-10 rounded-full bg-white p-0 text-neutral_20"
            variant="tertiary"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            aria-label="다음 추천 공고"
            className="size-10 rounded-full bg-white p-0 text-neutral_20"
            variant="tertiary"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map(campaign => (
          <RecommendedCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  )
}

function RecommendedCampaignCard({ campaign }: { campaign: RecommendedCampaign }) {
  return (
    <Link href={`/campaigns/${campaign.id}`} className="block h-full">
      <article className="flex h-full flex-col gap-4 rounded-lg border border-neutral_95 bg-white p-5 font-pretendard text-neutral_20 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
            적합도 {campaign.fitnessScore}점
          </span>
          <Sparkles className="size-6 text-red_50" aria-hidden />
        </div>
        <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">
          {campaign.title}
        </h3>
        <p className="m-0 line-clamp-3 text-14 font-medium leading-20 text-neutral_50">
          {campaign.reasonMessage}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-neutral_95 pt-3 text-14 font-semibold leading-20">
          <span className="text-neutral_50">선정 가능성</span>
          <span className="text-red_50">{campaign.selectionScore}점</span>
        </div>
      </article>
    </Link>
  )
}

function PopularBloggersSection({ bloggers }: { bloggers: PopularBlogger[] }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-24 font-bold leading-36">내 카테고리의 인기 블로거</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        {bloggers.map(blogger => (
          <PopularBloggerCard key={blogger.nickname} blogger={blogger} />
        ))}
      </div>
    </section>
  )
}

function PopularBloggerCard({ blogger }: { blogger: PopularBlogger }) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <Link className="group block" href={blogger.profileUrl}>
        <h3 className="flex items-center gap-1 text-22 font-bold leading-32 text-neutral_20">
          {blogger.nickname}
          <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </h3>
        <div className="mt-4 h-42 rounded-sm bg-neutral_95" aria-hidden />
      </Link>
      <div className="mt-4 flex items-center gap-2 text-12 leading-16 text-neutral_70">
        <span className="ml-auto font-semibold text-green_40">
          상위 {100 - blogger.overallScore}%
        </span>
      </div>
    </article>
  )
}
