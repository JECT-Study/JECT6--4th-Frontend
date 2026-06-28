import { z } from 'zod'

export const CampaignCategory = z.enum([
  'FOOD',
  'BEAUTY',
  'FASHION',
  'LIVING',
  'PET',
  'TECH_IT',
  'TRAVEL',
  'CULTURE',
  'ETC',
])
export type CampaignCategory = z.infer<typeof CampaignCategory>

export const CampaignType = z.enum(['VISIT', 'DELIVERY', 'REPORTER', 'REVIEW', 'PAYBACK'])
export type CampaignType = z.infer<typeof CampaignType>

export const CampaignChannel = z.enum(['BLOG', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK', 'ETC'])
export type CampaignChannel = z.infer<typeof CampaignChannel>

export const CampaignStatus = z.enum(['ACTIVE', 'CLOSED', 'DRAFT'])
export type CampaignStatus = z.infer<typeof CampaignStatus>

export const CampaignSort = z.enum(['CLOSING', 'COMPETITION', 'POPULAR'])
export type CampaignSort = z.infer<typeof CampaignSort>

export const CampaignPlatform = z.enum(['STYLEC', 'INVIEW'])
export type CampaignPlatform = z.infer<typeof CampaignPlatform>
