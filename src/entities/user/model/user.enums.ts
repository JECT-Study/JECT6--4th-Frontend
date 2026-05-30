import { z } from 'zod'

// 회원 등급
export const UserRole = z.enum(['USER', 'ADMIN'])
export type UserRole = z.infer<typeof UserRole>

// 블로그 플랫폼
export const BlogPlatform = z.enum(['NAVER', 'TISTORY', 'VELOG', 'OTHER'])
export type BlogPlatform = z.infer<typeof BlogPlatform>

// 블로그 연동 상태
export const BlogStatus = z.enum(['ACTIVE', 'INACTIVE', 'PENDING'])
export type BlogStatus = z.infer<typeof BlogStatus>
