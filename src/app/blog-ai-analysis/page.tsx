import { blogAnalysisService } from '@/service'

import type {
  BlogAnalysisResponse,
  PopularBlogger,
  RecommendedCampaign,
} from '@/entities/blog-analysis'

import { BlogAnalysisDashboard } from './_components/BlogAnalysisDashboard'

interface BlogAnalysisData {
  analysis: BlogAnalysisResponse
  bloggers: PopularBlogger[]
  recommendations: RecommendedCampaign[]
}

// 가장 최근 분석 이력을 기준으로 분석 결과·추천 공고·인기 블로거를 함께 조회한다.
async function loadLatestAnalysis(): Promise<BlogAnalysisData | null> {
  try {
    const history = await blogAnalysisService.getHistory()
    const latestId = history.content[0]?.id
    if (!latestId) return null

    const [analysis, bloggers, recommendations] = await Promise.all([
      blogAnalysisService.getAnalysis(latestId),
      blogAnalysisService
        .getBloggers(latestId)
        .then(response => response.bloggers)
        .catch(() => []),
      blogAnalysisService
        .getRecommendations(latestId)
        .then(response => response.campaigns)
        .catch(() => []),
    ])

    return { analysis, bloggers, recommendations }
  } catch {
    return null
  }
}

function EmptyState() {
  return (
    <main className="bg-neutral_99 px-5 py-18">
      <section className="mx-auto max-w-300 rounded-lg border border-neutral_95 bg-white p-10 text-center">
        <h1 className="text-24 font-bold leading-36 text-neutral_20">아직 분석 결과가 없어요</h1>
        <p className="mt-3 text-16 leading-24 text-neutral_50">
          블로그 주소로 무료 진단을 신청하면 AI 분석 결과를 확인할 수 있어요.
        </p>
      </section>
    </main>
  )
}

export default async function BlogAiAnalysisPage() {
  const data = await loadLatestAnalysis()

  if (!data) return <EmptyState />

  return (
    <BlogAnalysisDashboard
      analysis={data.analysis}
      bloggers={data.bloggers}
      recommendations={data.recommendations}
    />
  )
}
