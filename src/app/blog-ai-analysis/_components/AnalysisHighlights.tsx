import { CheckCircle2 } from 'lucide-react'

import type { AnalysisResult } from '@/entities/blog-analysis'

// [백엔드 명세 기준 컴포넌트] GET /blog/analysis/{id}가 실제 제공하는 필드
// (keyTopics/tone/targetAudience/suggestions)만 사용. Figma의 도넛·강약점·카테고리 적합도
// (OverallAnalysisCard/InsightCard/CategoryFitTable)를 대체하는 명세 기반 버전이다.
export function AnalysisHighlights({ result }: { result: AnalysisResult }) {
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
        <dl className="mt-6 grid gap-3 text-14 leading-20">
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
            <li key={suggestion} className="flex gap-2 text-14 leading-20 text-neutral_30">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green_40" aria-hidden />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
