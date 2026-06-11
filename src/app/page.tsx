import { blogAnalysisService, feedService } from '@/service'

import type { PopularBloggersResponse } from '@/entities/blog-analysis'
import type { FeedBody, FeedHero } from '@/entities/feed'

import { HomeCarouselSection } from './_components/home/HomeCarouselSection'
import { CreatorPostsSection, HeroSection, LockedAiSection } from './_components/home/HomeSections'
import PopularCampaignsSection from './_components/home/PopularCampaignsSection'
import RecentViewsSection from './_components/home/RecentViewsSection'
import RegionPopularCampaignsSection from './_components/home/RegionPopularCampaignsSection'

async function getPopularBloggers(): Promise<PopularBloggersResponse | null> {
  try {
    const history = await blogAnalysisService.getHistory()
    const latestId = history.content[0]?.id
    if (!latestId) return null

    return await blogAnalysisService.getBloggers(latestId)
  } catch {
    return null
  }
}

export default async function Page() {
  const heroFallback: FeedHero = { type: 'ANONYMOUS', message: '', actionLabel: '' }
  const feedBodyFallback: FeedBody = { popular: [], closingSoon: [], guaranteed: [] }

  const heroPromise: Promise<FeedHero> = feedService.getHero().catch(() => heroFallback)
  const feedBodyPromise: Promise<FeedBody> = feedService.getBody().catch(() => feedBodyFallback)
  const bloggersPromise = getPopularBloggers()

  const [hero, feedBody, bloggers] = await Promise.all([
    heroPromise,
    feedBodyPromise,
    bloggersPromise,
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
