'use client'

import { useSearchParams } from 'next/navigation'

import { Suspense } from 'react'

import { useQuery } from '@tanstack/react-query'

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

// documentId 파라미터가 있으면 해당 분석을, 없으면 가장 최근 분석을 대상으로 한다.
async function resolveTargetId(documentIdParam: string | null): Promise<number | null> {
  if (documentIdParam) {
    const parsed = Number(documentIdParam)
    if (Number.isFinite(parsed)) return parsed
  }
  const history = await blogAnalysisService.getHistory()
  return history.content[0]?.id ?? null
}

// 주어진 분석 id(documentId)로 분석 결과·추천 공고·인기 블로거를 함께 조회한다.
async function loadAnalysis(documentIdParam: string | null): Promise<BlogAnalysisData | null> {
  const targetId = await resolveTargetId(documentIdParam)
  if (targetId === null) return null

  const [analysis, bloggers, recommendations] = await Promise.all([
    blogAnalysisService.getAnalysis(targetId),
    blogAnalysisService
      .getBloggers(targetId)
      .then(response => response.bloggers)
      .catch(() => []),
    blogAnalysisService
      .getRecommendations(targetId)
      .then(response => response.campaigns)
      .catch(() => []),
  ])

  return { analysis, bloggers, recommendations }
}

function StatusMessage({ title, description }: { title: string; description: string }) {
  return (
    <main className="bg-neutral_99 px-5 py-18">
      <section className="mx-auto max-w-300 rounded-lg border border-neutral_95 bg-white p-10 text-center">
        <h1 className="text-24 font-bold leading-36 text-neutral_20">{title}</h1>
        <p className="mt-3 text-16 leading-24 text-neutral_50">{description}</p>
      </section>
    </main>
  )
}

function BlogAiAnalysisContent() {
  const searchParams = useSearchParams()
  const documentIdParam = searchParams.get('documentId')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['blog-analysis-detail', documentIdParam ?? 'latest'],
    queryFn: () => loadAnalysis(documentIdParam),
  })

  if (isLoading) {
    return (
      <StatusMessage title="분석 결과를 불러오는 중이에요" description="잠시만 기다려 주세요." />
    )
  }

  if (isError || !data) {
    return (
      <StatusMessage
        title="아직 분석 결과가 없어요"
        description="블로그 주소로 무료 진단을 신청하면 AI 분석 결과를 확인할 수 있어요."
      />
    )
  }

  return (
    <BlogAnalysisDashboard
      analysis={data.analysis}
      bloggers={data.bloggers}
      recommendations={data.recommendations}
    />
  )
}

export default function BlogAiAnalysisPage() {
  return (
    <Suspense
      fallback={
        <StatusMessage title="분석 결과를 불러오는 중이에요" description="잠시만 기다려 주세요." />
      }
    >
      <BlogAiAnalysisContent />
    </Suspense>
  )
}
