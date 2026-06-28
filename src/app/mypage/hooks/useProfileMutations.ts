'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

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
