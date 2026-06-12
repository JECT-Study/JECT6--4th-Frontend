import type { AnalysisMetric } from '@/entities/blog-analysis'

// [Figma 기준 컴포넌트] 현재 백엔드 명세 GET /blog/analysis/{id}는 metrics를 제공하지 않아
// BlogAnalysisDashboard에서 데이터가 있을 때만 렌더된다. 백엔드 응답에 metrics가 추가되면 자동 노출.
export function OverallAnalysisCard({ metrics }: { metrics: AnalysisMetric[] }) {
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
