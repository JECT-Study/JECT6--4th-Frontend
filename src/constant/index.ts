import { CampaignCategory, CampaignType } from '@/entities/campaign'
import { InterestCategory, UserChannel } from '@/entities/user'

import regionsJson from './regions.json'

export const REGION_DATA: Record<string, string[]> = Object.fromEntries(
  regionsJson.map(region => [region.name, region.children.map(child => child.name)])
)

export type RegionSelection = {
  label: string
  parentRegionId: number
  childRegionId?: number
}

export const REGION_OPTIONS = regionsJson.map(region => ({
  id: region.id,
  name: region.name,
  children: region.children.map(child => ({
    id: child.id,
    name: child.name,
  })),
}))

export function getRegionLabel(params: {
  parentRegionId?: number
  childRegionId?: number
}): string {
  if (!params.parentRegionId) {
    return ''
  }

  const parent = REGION_OPTIONS.find(region => region.id === params.parentRegionId)

  if (!parent) {
    return ''
  }

  if (!params.childRegionId) {
    return parent.name
  }

  const child = parent.children.find(region => region.id === params.childRegionId)

  return child ? `${parent.name} ${child.name}` : parent.name
}

export type SelectableCategory = InterestCategory

export const INTEREST_CATEGORY_LABEL: Record<SelectableCategory, string> = {
  FOOD: '음식',
  BEAUTY: '뷰티',
  FASHION: '패션',
  TRAVEL: '여행',
  CULTURE: '문화',
  TECH_IT: '테크/IT',
  PET: '반려동물',
  LIVING: '라이프스타일',
  ETC: '기타',
}

export type SelectableChannel = UserChannel

export const CHANNEL_LABEL: Record<SelectableChannel, string> = {
  BLOG: '블로그',
  YOUTUBE: '유튜브',
  INSTAGRAM: '인스타그램',
  TIKTOK: '틱톡',
  ETC: '기타',
}

export const CAMPAIGN_CATEGORY_LABEL: Record<CampaignCategory, string> = {
  FOOD: '음식',
  BEAUTY: '뷰티',
  FASHION: '패션',
  LIVING: '라이프스타일',
  PET: '반려동물',
  TECH_IT: '테크/IT',
  TRAVEL: '여행',
  CULTURE: '문화',
  ETC: '기타',
}

export const TYPE_LABEL: Record<CampaignType, string> = {
  VISIT: '방문형',
  DELIVERY: '배송형',
  REPORTER: '리포터',
  REVIEW: '리뷰',
  PAYBACK: '페이백',
}
