import type { ReactNode } from 'react'

import { ChevronDown, ChevronLeft, ChevronRight, Heart, LockKeyhole, User } from 'lucide-react'

import { Button } from '@/shared/ui'

interface Campaign {
  brandName: string
  category: string
  competitionLabel: string
  dday: string
  fitLabel?: string
  offerTitle: string
  region: string
}

interface CreatorPost {
  handle: string
  likeCount: number
  title: string
}

const aiCampaigns: Campaign[] = [
  {
    brandName: '프레시테이블',
    category: '배송형',
    competitionLabel: '12명 / 20명',
    dday: 'D-4',
    fitLabel: 'AI 확률 92%',
    offerTitle: '[서울] 샐러드 정기배송 체험단',
    region: '서울',
  },
  {
    brandName: '오브제스킨',
    category: '방문형',
    competitionLabel: '8명 / 15명',
    dday: 'D-2',
    fitLabel: 'AI 확률 88%',
    offerTitle: '[성수] 피부 관리 프로그램',
    region: '성수',
  },
  {
    brandName: '그린하우스',
    category: '배송형',
    competitionLabel: '19명 / 30명',
    dday: 'D-6',
    fitLabel: 'AI 확률 84%',
    offerTitle: '[전국] 홈카페 키트 리뷰어',
    region: '전국',
  },
  {
    brandName: '모먼트스튜디오',
    category: '방문형',
    competitionLabel: '5명 / 10명',
    dday: 'D-1',
    fitLabel: 'AI 확률 81%',
    offerTitle: '[홍대] 프로필 촬영 체험단',
    region: '홍대',
  },
]

const highChanceCampaigns: Campaign[] = [
  {
    brandName: '테이블온',
    category: '맛집',
    competitionLabel: '6명 / 20명',
    dday: 'D-5',
    offerTitle: '[마포] 브런치 카페 방문 체험단',
    region: '마포',
  },
  {
    brandName: '클린데이',
    category: '생활',
    competitionLabel: '9명 / 40명',
    dday: 'D-8',
    offerTitle: '[전국] 섬유 탈취제 리뷰어',
    region: '전국',
  },
  {
    brandName: '브라운독',
    category: '반려',
    competitionLabel: '4명 / 18명',
    dday: 'D-3',
    offerTitle: '[경기] 반려견 간식 체험단',
    region: '경기',
  },
  {
    brandName: '무드라이트',
    category: '인테리어',
    competitionLabel: '7명 / 25명',
    dday: 'D-7',
    offerTitle: '[전국] 침실 조명 리뷰어',
    region: '전국',
  },
  {
    brandName: '온더무브',
    category: '여행',
    competitionLabel: '3명 / 12명',
    dday: 'D-9',
    offerTitle: '[강릉] 오션뷰 숙소 체험단',
    region: '강릉',
  },
]

const recentCampaigns = aiCampaigns.map((campaign, index) => ({
  ...campaign,
  dday: ['D-1', 'D-6', 'D-10', 'D-2'][index],
  fitLabel: undefined,
}))

const regionPopularCampaigns: Campaign[] = [
  {
    brandName: '한남테이블',
    category: '맛집',
    competitionLabel: '10명 / 30명',
    dday: 'D-4',
    offerTitle: '[한남] 와인 다이닝 방문 체험단',
    region: '서울',
  },
  {
    brandName: '연남라운지',
    category: '카페',
    competitionLabel: '14명 / 40명',
    dday: 'D-6',
    offerTitle: '[연남] 디저트 카페 체험단',
    region: '서울',
  },
  {
    brandName: '광안스테이',
    category: '여행',
    competitionLabel: '5명 / 16명',
    dday: 'D-8',
    offerTitle: '[부산] 광안리 숙소 리뷰어',
    region: '부산',
  },
  {
    brandName: '제주오름',
    category: '액티비티',
    competitionLabel: '7명 / 20명',
    dday: 'D-5',
    offerTitle: '[제주] 오름 투어 체험단',
    region: '제주',
  },
  {
    brandName: '대구브루어리',
    category: '맛집',
    competitionLabel: '8명 / 24명',
    dday: 'D-7',
    offerTitle: '[대구] 수제맥주 펍 방문 체험단',
    region: '대구',
  },
  {
    brandName: '인천포레스트',
    category: '뷰티',
    competitionLabel: '11명 / 32명',
    dday: 'D-10',
    offerTitle: '[인천] 스파 케어 프로그램',
    region: '인천',
  },
]

const popularCampaigns: Campaign[] = [
  ...highChanceCampaigns,
  {
    brandName: '아워키친',
    category: '맛집',
    competitionLabel: '22명 / 50명',
    dday: 'D-11',
    offerTitle: '[부산] 파스타 다이닝 체험단',
    region: '부산',
  },
]

const creatorPosts: CreatorPost[] = [
  { handle: '@dailyplate', likeCount: 120, title: '성수에서 발견한 조용한 브런치 맛집' },
  { handle: '@moodlog', likeCount: 98, title: '작은 방 분위기를 바꾸는 조명 리뷰' },
]

function SectionHeader({
  badge,
  filterLabel,
  showArrows = true,
  title,
}: {
  badge?: string
  filterLabel?: string
  showArrows?: boolean
  title: string
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <h2 className="m-0 text-18 font-bold leading-28 text-neutral_20">{title}</h2>
        {badge && (
          <span className="rounded-sm bg-neutral_99 px-3 py-1 text-12 font-semibold leading-16 text-neutral_40">
            {badge}
          </span>
        )}
        {filterLabel && (
          <button
            disabled
            className="inline-flex h-8 cursor-not-allowed items-center gap-1 rounded-md border border-neutral_95 bg-neutral_99 px-3 text-12 font-medium leading-16 text-neutral_40"
          >
            {filterLabel}
            <ChevronDown className="size-3.5" aria-hidden />
          </button>
        )}
      </div>
      {showArrows && (
        <div className="flex shrink-0 gap-2">
          <Button
            variant="tertiary"
            size="icon"
            disabled
            className="size-8 rounded-full bg-neutral_99"
          >
            <ChevronLeft className="size-5" aria-hidden />
            <span className="sr-only">이전</span>
          </Button>
          <Button
            variant="tertiary"
            size="icon"
            disabled
            className="size-8 rounded-full bg-neutral_99"
          >
            <ChevronRight className="size-5" aria-hidden />
            <span className="sr-only">다음</span>
          </Button>
        </div>
      )}
    </div>
  )
}

function HeroSection() {
  return (
    <section
      id="home-hero"
      className="mx-auto w-full max-w-300 px-5 pt-10 md:px-8 lg:px-0 xl:pt-14"
    >
      <div className="relative flex min-h-[344px] overflow-hidden rounded-none bg-neutral_95 px-8 py-12 md:px-12 xl:items-center xl:py-0">
        <div className="relative z-10 flex max-w-150 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="m-0 text-20 font-semibold leading-32 text-neutral_30">
              내 블로그 진단하고 더 정확한 공고 추천받기
            </h1>
            <p className="m-0 text-16 font-medium leading-24 text-neutral_50">
              AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.
            </p>
          </div>
          <Button
            asChild
            variant="primary"
            className="h-10 w-fit rounded-md px-4 text-14 leading-20"
          >
            <a href="#ai-campaigns">AI 맞춤 체험단 보기 &gt;</a>
          </Button>
        </div>
        <div
          className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 items-center gap-3 xl:flex"
          aria-hidden
        >
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-red_50" />
          <span className="size-2 rounded-full bg-white" />
          <span className="size-2 rounded-full bg-white" />
        </div>
      </div>
    </section>
  )
}

function LockedAiSection() {
  return (
    <section
      id="ai-campaigns"
      className="mx-auto mt-12 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <div className="flex max-w-170 flex-col gap-2">
        <SectionHeader title="AI 맞춤 체험단" />
        <p className="m-0 text-14 font-medium leading-20 text-neutral_50">
          AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.
        </p>
      </div>
      <div className="relative min-h-[322px] overflow-hidden rounded-none bg-white">
        <div
          className="grid max-h-[322px] gap-6 overflow-hidden opacity-45 sm:grid-cols-2 lg:grid-cols-4"
          aria-hidden="true"
        >
          {aiCampaigns.map(campaign => (
            <HomeCampaignCard
              key={campaign.offerTitle}
              variant="ai"
              className="max-w-none"
              {...campaign}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 px-5 shadow-[0_0_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
          <div className="flex max-w-110 flex-col items-center gap-4 text-center">
            <span className="flex size-12 items-center justify-center rounded-full border border-neutral_20 bg-white text-neutral_20">
              <LockKeyhole className="size-7" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="m-0 text-18 font-bold leading-28 text-neutral_20">
                AI 맞춤 공고는 로그인 후 확인할 수 있어요
              </h2>
              <p className="m-0 text-14 font-medium leading-20 text-neutral_40">
                로그인하고 AI가 추천하는 맞춤 공고를 확인해보세요.
              </p>
            </div>
            <p className="m-0 rounded-md bg-neutral_95 px-5 py-2.5 text-14 font-semibold leading-20 text-neutral_50">
              로그인 기능 연동 후 제공됩니다
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CampaignGridSection({
  campaigns,
  id,
  marginTop = 'mt-12',
  title,
}: {
  campaigns: Campaign[]
  id: string
  marginTop?: string
  title: string
}) {
  return (
    <section
      id={id}
      className={`mx-auto flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0 ${marginTop}`}
    >
      <SectionHeader title={title} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {campaigns.map(campaign => (
          <HomeCampaignCard
            key={`${title}-${campaign.offerTitle}`}
            className="max-w-none"
            {...campaign}
          />
        ))}
      </div>
    </section>
  )
}

function CreatorPostsSection() {
  return (
    <section
      id="creator-posts"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <SectionHeader title="인기있는 블로거들의 포스팅 엿보기" filterLabel="랭킹" />
      <div className="grid gap-6 lg:grid-cols-2">
        {creatorPosts.map(post => (
          <HomeCreatorPostCard key={post.handle} {...post} />
        ))}
      </div>
    </section>
  )
}

function PopularCampaignsSection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section
      id="popular-campaigns"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      {showHeader && <SectionHeader title="인기 체험단" filterLabel="음식" />}
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
        {[0, 1].map(column => (
          <div key={column} className="flex flex-col gap-6">
            {popularCampaigns.slice(column * 3, column * 3 + 3).map(campaign => (
              <HomeCampaignCard
                key={`popular-${campaign.offerTitle}`}
                variant="horizontal"
                className="max-w-none"
                {...campaign}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="m-0 flex h-14 w-full items-center justify-center bg-neutral_95 text-14 font-semibold leading-20 text-neutral_50">
        전체 공고 목록 페이지 연동 예정
      </p>
    </section>
  )
}

function RegionPopularCampaignsSection() {
  return (
    <section
      id="region-popular-campaigns"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <SectionHeader title="지역별 인기 체험" filterLabel="서울" />
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
        {[0, 1].map(column => (
          <div key={column} className="flex flex-col gap-6">
            {regionPopularCampaigns.slice(column * 3, column * 3 + 3).map(campaign => (
              <HomeCampaignCard
                key={`region-${campaign.offerTitle}`}
                variant="horizontal"
                className="max-w-none"
                {...campaign}
              />
            ))}
          </div>
        ))}
      </div>
      <p className="m-0 flex h-14 w-full items-center justify-center bg-neutral_95 text-14 font-semibold leading-20 text-neutral_50">
        지역별 체험 전체보기 예정
      </p>
    </section>
  )
}

function HomeCreatorPostCard({ handle, likeCount, title }: CreatorPost) {
  return (
    <article className="flex h-[346px] max-w-none flex-col gap-4 bg-transparent p-5 font-pretendard text-neutral_20">
      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="size-[59px] shrink-0 rounded-full bg-neutral_95" aria-hidden />
          <div className="min-w-0">
            <h3 className="m-0 truncate text-16 font-bold leading-24">블로그명 &gt;</h3>
            <span className="text-14 font-medium leading-20 text-neutral_60">{handle}</span>
          </div>
        </div>
        <span className="shrink-0 rounded-sm bg-red_80 px-3 py-1 text-12 font-semibold leading-16 text-white">
          맛집 블로거
        </span>
      </header>
      <div className="h-[158px] rounded-md bg-neutral_95" aria-hidden />
      <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">{title}</h3>
      <div className="mt-auto flex items-center gap-2 text-14 font-semibold leading-20 text-neutral_20">
        <Heart className="size-4 text-red_50" aria-hidden />
        <span>{likeCount}</span>
      </div>
    </article>
  )
}

function HomeCampaignCard({
  brandName,
  category,
  className = '',
  competitionLabel,
  dday,
  fitLabel,
  offerTitle,
  region,
  variant = 'vertical',
}: Campaign & {
  className?: string
  variant?: 'ai' | 'horizontal' | 'vertical'
}) {
  const isHorizontal = variant === 'horizontal'

  return (
    <article
      className={[
        'flex bg-transparent font-pretendard text-neutral_20',
        isHorizontal
          ? 'min-h-[172px] max-w-none flex-row gap-6'
          : 'h-[322px] max-w-[282px] flex-col gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isHorizontal ? (
        <HomeCardImage className="min-h-[172px] w-[45%]" showChips={false} />
      ) : (
        <HomeCardImage category={category} className="h-[172px] w-full" region={region}>
          {variant === 'ai' && (
            <span className="absolute left-3 top-4 rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
              {fitLabel}
            </span>
          )}
        </HomeCardImage>
      )}

      <div
        className={['flex min-w-0 flex-1 flex-col gap-2', isHorizontal && 'py-1']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="flex flex-col gap-2 border-b border-neutral_95 pb-3">
          <div className="flex items-center gap-2 text-green_40">
            <span className="flex size-5 items-center justify-center rounded-full bg-green_40 text-[8px] font-bold leading-none text-white">
              blog
            </span>
            <span className="text-16 font-bold leading-24">blog</span>
          </div>

          <h3
            className={[
              'm-0 line-clamp-2 font-semibold text-neutral_20',
              isHorizontal ? 'text-20 leading-32' : 'text-18 leading-28',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {offerTitle}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-md border border-neutral_90 bg-white px-3 py-1 text-14 font-medium leading-20 text-neutral_50">
              {category}
            </span>
            <span className="py-1 text-14 font-medium leading-20 text-neutral_50">{brandName}</span>
          </div>
        </div>

        <div
          className={[
            'mt-auto flex items-center gap-2 font-semibold text-neutral_20',
            isHorizontal ? 'text-16 leading-24' : 'text-14 leading-20',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="text-red_50">{dday}</span>
          <User className="size-4" aria-hidden />
          <span>{competitionLabel}</span>
        </div>
      </div>
    </article>
  )
}

function HomeCardImage({
  category,
  children,
  className = '',
  region,
  showChips = true,
}: {
  category?: string
  children?: ReactNode
  className?: string
  region?: string
  showChips?: boolean
}) {
  return (
    <div
      className={['relative shrink-0 rounded-md bg-neutral_99', className]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {children}
      <span className="absolute right-4 top-4 flex size-8.5 items-center justify-center rounded-full bg-white text-neutral_20">
        <Heart className="size-5" />
      </span>
      {showChips && (
        <div className="absolute bottom-4 left-4 flex gap-3">
          <span className="rounded-md bg-neutral_60 px-3 py-1 text-14 font-medium leading-20 text-white shadow-sm">
            {region}
          </span>
          <span className="rounded-md bg-red_80 px-3 py-1 text-14 font-medium leading-20 text-white shadow-sm">
            {category}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <main className="bg-white pb-16">
      <HeroSection />
      <LockedAiSection />
      <CampaignGridSection
        id="high-chance-campaigns"
        title="당첨확률이 높은 공고"
        campaigns={highChanceCampaigns}
      />
      <CampaignGridSection
        id="recent-campaigns"
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
