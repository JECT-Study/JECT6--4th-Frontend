import { feedService } from '@/service'

import { creatorPosts } from './_components/home/home.mock'
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
  const [hero, feedBody, bloggerStories] = await Promise.all([
    feedService.getHero().catch(() => ({ type: 'ANONYMOUS' as const, message: '', actionLabel: '' })),
    feedService.getBody().catch(() => ({ popular: [], closingSoon: [], guaranteed: [] })),
    feedService.getBloggerStories().catch(() => creatorPosts),
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
      <CreatorPostsSection stories={bloggerStories.stories} />
      <PopularCampaignsSection campaigns={feedBody.popular} />
      <RegionPopularCampaignsSection campaigns={feedBody.popular} />
    </main>
  )
}
