import { highChanceCampaigns, recentCampaigns } from './_components/home/home.mock'
import { HomeCarouselSection } from './_components/home/HomeCarouselSection'
import {
  CreatorPostsSection,
  HeroSection,
  LockedAiSection,
  PopularCampaignsSection,
  RegionPopularCampaignsSection,
} from './_components/home/HomeSections'

export default function Page() {
  return (
    <main className="bg-white pb-16">
      <HeroSection />
      <LockedAiSection />
      <HomeCarouselSection title="당첨확률이 높은 공고" campaigns={highChanceCampaigns} />
      <HomeCarouselSection
        title="최근에 내가 본 공고"
        campaigns={recentCampaigns}
        marginTop="mt-18"
      />
      <CreatorPostsSection />
      <PopularCampaignsSection />
      <RegionPopularCampaignsSection />
    </main>
  )
}
