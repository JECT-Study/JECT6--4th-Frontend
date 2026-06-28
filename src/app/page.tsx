import { feedService } from '@/service'

export const dynamic = 'force-dynamic'

import {
  AnalysisSection,
  CreatorPostsSection,
  HeroSection,
  HomeCarouselSection,
  PopularCampaignsSection,
  RecentViewsSection,
  RegionPopularCampaignsSection,
} from './_components/home'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const [hero, feed] = await Promise.all([feedService.getHero(), feedService.getBody()])

  return (
    <main className="bg-white pb-16">
      <HeroSection hero={hero} />
      <AnalysisSection previewCampaigns={feed.popular.slice(0, 4)} />
      <HomeCarouselSection
        title="당첨확률이 높은 공고"
        campaigns={feed.guaranteed}
        columns={5}
        pageSize={5}
      />
      <RecentViewsSection />
      <CreatorPostsSection />
      <PopularCampaignsSection campaigns={feed.popular} />
      <RegionPopularCampaignsSection campaigns={feed.popular} />
    </main>
  )
}
