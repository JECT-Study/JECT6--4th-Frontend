import { z } from 'zod'

export const UserRole = z.enum(['USER', 'ADMIN'])
export type UserRole = z.infer<typeof UserRole>

export const Provider = z.enum(['KAKAO', 'GOOGLE', 'NAVER'])
export type Provider = z.infer<typeof Provider>

export const UserGrade = z.enum(['BEGINNER', 'INTERMEDIATE', 'EXPERT'])
export type UserGrade = z.infer<typeof UserGrade>

export const SubscriptionType = z.enum(['FREE', 'PREMIUM'])
export type SubscriptionType = z.infer<typeof SubscriptionType>

export const InterestCategory = z.enum([
  'FOOD',
  'BEAUTY',
  'CULTURE',
  'TRAVEL',
  'TECH_IT',
  'PET',
  'LIVING',
  'FASHION',
  'ETC',
])
export type InterestCategory = z.infer<typeof InterestCategory>

export const UserChannel = z.enum(['BLOG', 'INSTAGRAM', 'YOUTUBE', 'TIKTOK', 'ETC'])
export type UserChannel = z.infer<typeof UserChannel>

export const BlogPlatform = z.enum(['NAVER', 'TISTORY', 'VELOG', 'OTHER'])
export type BlogPlatform = z.infer<typeof BlogPlatform>

export const BlogStatus = z.enum(['ACTIVE', 'INACTIVE', 'PENDING'])
export type BlogStatus = z.infer<typeof BlogStatus>
