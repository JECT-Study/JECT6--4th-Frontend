import { campaignService } from '@/service'

import { AdditionalContent } from './_components/AdditionalContent'
import Details from './_components/Details'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const campaignId = Number(id)

  const [data, related, likesAnalysis, viewers] = await Promise.all([
    campaignService.getCampaign(campaignId),
    campaignService.getRelated(campaignId).catch(() => []),
    campaignService.getLikesAnalysis(campaignId).catch(() => ({ likeCount: 0, analyzed: false })),
    campaignService.getViewers(campaignId).catch(() => ({ count: 0 })),
  ])

  return (
    <div className="mx-auto flex w-full flex-col max-w-300 gap-11 px-5 md:px-8 lg:px-0">
      <div className="flex flex-col gap-8.25 pt-23 max-w-167.5">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div>{data.channel}</div>
            <div className="text-22 leading-6.5">{data.brandName}</div>
          </div>
          <h1 className="text-[32px] leading-40 font-medium">{data.title}</h1>
        </div>
      </div>
      <div className="flex gap-11.25">
        <Details data={data} viewerCount={viewers.count} />
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
