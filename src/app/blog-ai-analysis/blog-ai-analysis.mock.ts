import type {
  AnalysisRecommendationsResponse,
  BlogAnalysisResponse,
  PopularBloggersResponse,
} from '@/entities/blog-analysis'

export const mockBlogAnalysis: BlogAnalysisResponse = {
  analysisId: 1001,
  documentId: 1001,
  userNickname: '이지혜',
  blogName: '오늘도 맛있게',
  blogType: '정보형',
  primaryCategory: 'FOOD',
  percentile: 17,
  status: 'completed',
  analyzedAt: '2026-06-07T09:00:00+09:00',
  analysis: {
    summary:
      '이지혜님의 오늘도 맛있게 블로그를 분석한 결과 음식 카테고리 중심으로 키워드 검색 유입과 꼼꼼한 정보 정리가 드러나는 정보형 블로그입니다.',
    keyTopics: ['브런치', '카페', '맛집', '서울 데이트', '디저트'],
    tone: '차분하고 실용적인 후기 톤',
    targetAudience: '서울 근교 맛집과 데이트 장소를 찾는 20-30대 독자',
    suggestions: [
      '주 3회 이상 발행 유지',
      '본문 첫 문단에 지역 키워드 배치',
      '메뉴 사진 2장 이상 추가',
    ],
    metrics: [
      { key: 'TOPIC_CONSISTENCY', label: '주제 일관성', score: 35, color: '#3B82F6' },
      { key: 'IMAGE_USAGE', label: '이미지 활용', score: 28, color: '#14C38E' },
      { key: 'POST_VIEW', label: '게시글당 조회수', score: 22, color: '#7D5EF7' },
      { key: 'KEYWORD_USAGE', label: '키워드 활용', score: 15, color: '#F59E0B' },
      { key: 'INTERACTION', label: '상호작용', score: 15, color: '#F97316' },
      { key: 'INFORMATIVENESS', label: '정보성', score: 15, color: '#EAB308' },
    ],
    categoryFits: [
      {
        category: 'FOOD',
        keyword: '키워드',
        activityScore: 21,
        fitnessScore: 94,
        message: '음식/카페 공고와 검색 유입 키워드가 가장 잘 맞습니다.',
      },
      {
        category: 'LIFESTYLE',
        keyword: '키워드',
        activityScore: 18,
        fitnessScore: 84,
        message: '생활 리뷰형 공고에서도 안정적인 전환 가능성이 있습니다.',
      },
      {
        category: 'TRAVEL',
        keyword: '키워드',
        activityScore: 12,
        fitnessScore: 69,
        message: '근교 나들이 콘텐츠를 보강하면 여행 공고 적합도가 오릅니다.',
      },
    ],
    strengthCard: {
      id: 'keyword-strength',
      type: 'strength',
      label: '강점 카드',
      title: '키워드 검색 유입이 강합니다',
      description: '6가지 항목 중 가장 높은 점수 항목 분석 메시지',
      actionLabel: '유지의 행동 트리거',
      metricKey: 'KEYWORD_USAGE',
    },
    weaknessCard: {
      id: 'publishing-weakness',
      type: 'weakness',
      label: '약점 카드',
      title: '발행 빈도를 주 3회로 늘리세요',
      description:
        '활동성이 지금 유입량과 결합됩니다. 주 1회만 추가해도 중형 브랜드 공고가 열립니다.',
      actionLabel: '유지의 행동 트리거',
      metricKey: 'INTERACTION',
    },
  },
}

export const mockRecommendations: AnalysisRecommendationsResponse = {
  analysisId: 1001,
  campaigns: [
    {
      id: 5,
      title: '[마포] 브런치 카페 방문 체험단',
      fitnessScore: 94,
      selectionScore: 87,
      reasonType: 'BLOG_FITNESS',
      reasonMessage: '카페 후기 키워드와 최근 포스팅 주제가 강하게 일치합니다.',
    },
    {
      id: 6,
      title: '[성수] 디저트 바 신메뉴 리뷰어',
      fitnessScore: 91,
      selectionScore: 82,
      reasonType: 'SELECTION_PROBABILITY',
      reasonMessage: '비슷한 모집 규모에서 선정 가능성이 높게 계산됐습니다.',
    },
    {
      id: 7,
      title: '[연남] 감성 카페 체험단',
      fitnessScore: 89,
      selectionScore: 79,
      reasonType: 'PERFORMANCE_BASED',
      reasonMessage: '최근 맛집 포스팅의 댓글 반응이 동일 카테고리 평균보다 좋습니다.',
    },
    {
      id: 8,
      title: '[전국] 홈카페 원두 리뷰어',
      fitnessScore: 86,
      selectionScore: 76,
      reasonType: 'BLOG_FITNESS',
      reasonMessage: '홈카페 키워드를 활용하면 배송형 공고에서도 좋은 성과가 예상됩니다.',
    },
  ],
}

export const mockPopularBloggers: PopularBloggersResponse = {
  category: 'FOOD',
  bloggers: [
    {
      nickname: '맛집탐험가',
      overallScore: 96,
      profileUrl: 'https://blog.naver.com/food_explorer',
    },
    {
      nickname: '카페기록장',
      overallScore: 93,
      profileUrl: 'https://blog.naver.com/cafe_note',
    },
    {
      nickname: '서울한입',
      overallScore: 90,
      profileUrl: 'https://blog.naver.com/seoul_bite',
    },
  ],
}
