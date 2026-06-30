import type { AnalysisMetric } from '@/entities/blog-analysis'

// 백엔드 metrics에는 색이 없으므로 지표 순서대로 팔레트를 부여한다.
const METRIC_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#4D96FF', '#9B5DE5', '#FF9F45']

function metricLabel(metric: AnalysisMetric): string {
  return metric.label ?? metric.name ?? ''
}

function metricColor(metric: AnalysisMetric, index: number): string {
  return metric.color ?? METRIC_COLORS[index % METRIC_COLORS.length]
}

export function OverallAnalysisCard({ metrics }: { metrics: AnalysisMetric[] }) {
  // 표시할 이름(label/name)이 없는 metric은 빈 항목으로 보이므로 제외한다.
  const visibleMetrics = metrics.filter(metric => metricLabel(metric) !== '')

  if (visibleMetrics.length === 0) return null

  return (
    <article className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm">
      <h3 className="text-18 font-bold leading-28">종합 분석</h3>
      <div className="mt-10 flex justify-center">
        <MetricDonut metrics={visibleMetrics} />
      </div>
      <dl className="mt-10 grid gap-3">
        {visibleMetrics.map((metric, index) => (
          <div key={metric.key ?? index} className="grid grid-cols-[1fr_auto] items-center gap-4">
            <dt className="flex min-w-0 items-center gap-2 text-14 leading-20 text-neutral_20">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: metricColor(metric, index) }}
                aria-hidden
              />
              <span className="truncate">{metricLabel(metric)}</span>
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

    return [...nextSegments, `${metricColor(metric, index)} ${start}% ${end}%`]
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
