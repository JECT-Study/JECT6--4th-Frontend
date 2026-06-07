import { AdditionalContent } from './_components/AdditionalContent'
import Details from './_components/Details'
import { mockCampaignDetail } from './_components/mock'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = mockCampaignDetail

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
        <p className="text-20 text-[#666666] font-normal">{data.description}</p>
      </div>
      <div className="flex gap-11.25">
        <Details id={id} />
        <AdditionalContent />
      </div>
    </div>
  )
}
