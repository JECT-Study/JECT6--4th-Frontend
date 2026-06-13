'use client'

import { useParams } from 'next/navigation'

import { useEffect, useState } from 'react'

import { campaignService } from '@/service'

import type { Campaign, CampaignDetail, CampaignLikesAnalysis } from '@/entities/campaign'

import { BlogTag } from '@/shared/ui/blog-card/BlogTag'

import { AdditionalContent } from './_components/AdditionalContent'
import Details from './_components/Details'

export default function Page() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const campaignId = Number(id)
  const [data, setData] = useState<CampaignDetail | null>(null)
  const [related, setRelated] = useState<Campaign[]>([])
  const [likesAnalysis, setLikesAnalysis] = useState<CampaignLikesAnalysis>({
    likeCount: 0,
    analyzed: false,
  })
  const [viewerCount, setViewerCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let ignore = false

    async function fetchCampaignDetail() {
      if (!Number.isFinite(campaignId)) {
        setErrorMessage('공고 정보를 찾을 수 없어요.')
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const [campaign, relatedCampaigns, analysis, viewers] = await Promise.all([
          campaignService.getCampaign(campaignId),
          campaignService.getRelated(campaignId).catch(() => []),
          campaignService
            .getLikesAnalysis(campaignId)
            .catch(() => ({ likeCount: 0, analyzed: false })),
          campaignService.getViewers(campaignId).catch(() => ({ count: 0 })),
        ])

        if (ignore) return

        setData(campaign)
        setRelated(relatedCampaigns)
        setLikesAnalysis(analysis)
        setViewerCount(viewers.count)
      } catch {
        if (!ignore) {
          setData(null)
          setRelated([])
          setLikesAnalysis({ likeCount: 0, analyzed: false })
          setViewerCount(0)
          setErrorMessage('공고 정보를 불러오지 못했어요.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    void fetchCampaignDetail()

    return () => {
      ignore = true
    }
  }, [campaignId])

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-120 w-full max-w-300 items-center justify-center px-5 py-20 md:px-8 lg:px-0">
        <p className="m-0 text-16 font-medium leading-24 text-neutral_60">
          공고를 불러오는 중...
        </p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="mx-auto flex min-h-120 w-full max-w-300 items-center justify-center px-5 py-20 md:px-8 lg:px-0">
        <p className="m-0 text-16 font-medium leading-24 text-neutral_60">
          {errorMessage || '공고 정보를 찾을 수 없어요.'}
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full flex-col max-w-300 gap-11 px-5 md:px-8 lg:px-0">
      <div className="flex flex-col gap-8.25 pt-23 max-w-167.5">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <BlogTag />
            <div className="text-22 leading-6.5">{data.brandName}</div>
          </div>
          <h1 className="text-[32px] leading-40 font-medium">{data.title}</h1>
        </div>
      </div>
      <div className="flex gap-11.25">
        <Details data={data} viewerCount={viewerCount} />
        <AdditionalContent
          campaignId={campaignId}
          isLiked={false}
          related={related}
          likesAnalysis={likesAnalysis}
        />
      </div>
    </div>
  )
}
