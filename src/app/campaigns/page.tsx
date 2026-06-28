import { campaignService } from '@/service'

import { CampaignsPageClient } from './_components/CampaignsPageClient'

const PAGE_SIZE = 12

export const dynamic = 'force-dynamic'

function getKeyword(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return (value[0] ?? '').trim()
  }

  return (value ?? '').trim()
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string | string[] }>
}) {
  const keyword = getKeyword((await searchParams).keyword)
  const initialPage = keyword
    ? await campaignService.search(keyword, { page: 0, size: PAGE_SIZE })
    : await campaignService.getCampaigns({ page: 0, size: PAGE_SIZE })

  return <CampaignsPageClient initialKeyword={keyword} initialPage={initialPage} />
}
