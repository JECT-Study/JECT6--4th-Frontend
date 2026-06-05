import type { Campaign, CreatorPost, HeroSlide } from './home.types'

export const aiCampaigns: Campaign[] = [
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

export const highChanceCampaigns: Campaign[] = [
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

export const recentCampaigns: Campaign[] = aiCampaigns.map((campaign, index) => ({
  ...campaign,
  dday: ['D-1', 'D-6', 'D-10', 'D-2'][index],
  fitLabel: undefined,
}))

export const regionPopularCampaigns: Campaign[] = [
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

export const popularCampaigns: Campaign[] = [
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

export const heroSlides: HeroSlide[] = [
  {
    title: '내 블로그 진단하고 더 정확한 공고 추천받기',
    description: 'AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.',
    cta: 'AI 맞춤 체험단 보기 >',
    href: '#ai-campaigns',
  },
  {
    title: '지금 가장 인기 있는 체험단을 확인해보세요',
    description: '수백 개의 체험단 중 지금 가장 많이 신청받고 있는 공고를 모았어요.',
    cta: '인기 체험단 보기 >',
    href: '#popular-campaigns',
  },
  {
    title: '내 근처 체험단, 한눈에 찾아보기',
    description: '지역별로 분류된 체험단을 통해 가까운 공고를 빠르게 찾아보세요.',
    cta: '지역별 체험단 보기 >',
    href: '#region-popular-campaigns',
  },
  {
    title: '인기 블로거들의 생생한 체험 후기',
    description: '실제 체험단에 참여한 블로거들의 솔직한 후기를 확인해보세요.',
    cta: '후기 보러가기 >',
    href: '#creator-posts',
  },
  {
    title: '오늘 새로 올라온 체험단 놓치지 마세요',
    description: '매일 업데이트되는 신규 공고를 가장 먼저 확인하고 선정 확률을 높여보세요.',
    cta: '신규 공고 보기 >',
    href: '#popular-campaigns',
  },
]

export const creatorPosts: CreatorPost[] = [
  { handle: '@dailyplate', likeCount: 120, title: '성수에서 발견한 조용한 브런치 맛집' },
  { handle: '@moodlog', likeCount: 98, title: '작은 방 분위기를 바꾸는 조명 리뷰' },
]
