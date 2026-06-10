import { feedService, myService } from '@/service'

import { creatorPosts } from './_components/home/home.mock'
import { HomeCarouselSection } from './_components/home/HomeCarouselSection'
import {
  CreatorPostsSection,
  HeroSection,
  LockedAiSection,
  PopularCampaignsSection,
  RegionPopularCampaignsSection,
} from './_components/home/HomeSections'

export default async function Page() {
  const [hero, feedBody, recentViews, bloggerStories] = await Promise.all([
    feedService.getHero().catch(() => ({ type: 'ANONYMOUS' as const, message: '', actionLabel: '' })),
    feedService.getBody().catch(() => ({ popular: [], closingSoon: [], guaranteed: [] })),
    myService.getRecentViews().catch(() => []),
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
      <HomeCarouselSection title="최근에 내가 본 공고" campaigns={recentViews} marginTop="mt-18" />
      <CreatorPostsSection stories={bloggerStories.stories} />
      <PopularCampaignsSection campaigns={feedBody.popular} />
      <RegionPopularCampaignsSection campaigns={feedBody.popular} />
    </main>
  )
}
