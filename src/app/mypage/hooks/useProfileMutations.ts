'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { userService } from '@/service'

import type { UpdateUserProfileRequest } from '@/entities/user'

import { MY_PROFILE_KEY } from './useMyProfile'

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateUserProfileRequest) => userService.updateMe(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MY_PROFILE_KEY }),
  })
}

export function useLinkBlog() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { blogUrl: string; platform: string }) => userService.linkBlog(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MY_PROFILE_KEY }),
  })
}

export function getApiErrorMessage(
  error: unknown,
  fallback = '잠시 후 다시 시도해 주세요.'
): string {
  if (isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message
    if (message) return message
  }
  return fallback
}
