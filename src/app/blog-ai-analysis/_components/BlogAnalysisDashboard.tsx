import Link from 'next/link'

import { CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Sparkles, Zap } from 'lucide-react'

import { INTEREST_CATEGORY_LABEL } from '@/constant'
import { cn } from '@/lib/utils'

import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

import type {
  AnalysisInsightCard,
  AnalysisMetric,
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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <OverallAnalysisCard metrics={result.metrics} />
            <div className="grid gap-8">
              <InsightCard insight={result.strengthCard} />
              <InsightCard insight={result.weaknessCard} />
            </div>
          </div>
          <CategoryFitTable rows={result.categoryFits} />
        </section>

        <RecommendationSection recommendations={recommendations} />
        <PopularBloggersSection bloggers={bloggers} />
      </div>
    </main>
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
      className="relative size-[220px] rounded-full"
      style={{ background: `conic-gradient(${segments.join(', ')})` }}
      aria-label="블로그 종합 분석 도넛 차트"
      role="img"
    >
      <span className="absolute inset-14 rounded-full bg-white" aria-hidden />
    </div>
  )
}

function InsightCard({ insight }: { insight: AnalysisInsightCard }) {
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

function CategoryFitTable({ rows }: { rows: CategoryFit[] }) {
  return (
    <section
      id="category-fit"
      className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm"
    >
      <h3 className="text-18 font-bold leading-28">카테고리 적합도</h3>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral_95 text-14 font-bold leading-20 text-neutral_30">
              <th className="w-1/4 px-4 py-3">순위</th>
              <th className="w-1/4 px-4 py-3">활동도</th>
              <th className="w-1/2 px-4 py-3">적합도</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
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
                      {INTEREST_CATEGORY_LABEL[row.category]}
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
          <HomeCampaignCard
            key={campaign.id}
            {...campaign}
            className="h-full max-w-none"
            fitLabel={`AI 확률 ${campaign.fitnessScore}%`}
            variant="ai"
          />
        ))}
      </div>
    </section>
  )
}

function PopularBloggersSection({ bloggers }: { bloggers: PopularBlogger[] }) {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-24 font-bold leading-36">내 카테고리의 인기 블로거</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        {bloggers.map(blogger => (
          <PopularBloggerCard key={blogger.id} blogger={blogger} />
        ))}
      </div>
    </section>
  )
}

function PopularBloggerCard({ blogger }: { blogger: PopularBlogger }) {
  return (
    <article className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-8 flex items-center gap-3 pl-14">
        <span className="text-14 font-medium leading-20 text-neutral_40">{blogger.handle}</span>
        <span className="rounded-sm bg-red_70 px-2 py-1 text-12 font-bold leading-14 text-white">
          {blogger.badge}
        </span>
      </div>
      <Link className="group block" href={blogger.blogUrl}>
        <h3 className="flex items-center gap-1 text-22 font-bold leading-32 text-neutral_20">
          {blogger.blogName}
          <ChevronRight className="size-5 transition-transform group-hover:translate-x-0.5" />
        </h3>
        <div className="mt-4 h-[168px] rounded-sm bg-neutral_95" aria-hidden />
      </Link>
      <Link className="mt-4 block text-14 leading-20 text-neutral_20" href={blogger.postUrl}>
        {blogger.postTitle}
      </Link>
      <div className="mt-4 flex items-center gap-2 text-12 leading-16 text-neutral_70">
        <span className="text-red_50">♡</span>
        <span>{blogger.likeCount}</span>
        <span className="ml-auto font-semibold text-green_40">
          상위 {100 - blogger.overallScore}%
        </span>
      </div>
    </article>
  )
}
