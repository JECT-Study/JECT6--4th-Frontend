import { blogAnalysisService, feedService } from '@/service'

import { HomeCarouselSection } from './_components/home/HomeCarouselSection'
import {
  CreatorPostsSection,
  HeroSection,
  LockedAiSection,
  PopularCampaignsSection,
  RegionPopularCampaignsSection,
} from './_components/home/HomeSections'
import { RecentViewsSection } from './_components/home/RecentViewsSection'

export default async function Page() {
  const [hero, feedBody, bloggers] = await Promise.all([
    feedService
      .getHero()
      .catch(() => ({ type: 'ANONYMOUS' as const, message: '', actionLabel: '' })),
    feedService.getBody().catch(() => ({ popular: [], closingSoon: [], guaranteed: [] })),
    blogAnalysisService
      .getHistory()
      .then(history => {
        const latestId = history.content[0]?.id
        if (!latestId) return null
        return blogAnalysisService.getBloggers(latestId).catch(() => null)
      })
      .catch(() => null),
  ])

  return (
    <main className="bg-white pb-16">
      <HeroSection hero={hero} />
      <LockedAiSection />
      <HomeCarouselSection
        title="당첨확률이 높은 공고"
        campaigns={feedBody.guaranteed}
        columns={5}
        pageSize={5}
      />
      <RecentViewsSection />
      <CreatorPostsSection bloggers={bloggers} />
      <PopularCampaignsSection campaigns={feedBody.popular} />
      <RegionPopularCampaignsSection campaigns={feedBody.popular} />
    </main>
  )
}
