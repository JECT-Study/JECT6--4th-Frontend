'use client'

import { BlogLinkSection } from '../_components/BlogLinkSection'
import { CategorySection } from '../_components/CategorySection'
import { ProfileHeader } from '../_components/ProfileHeader'
import { useMyProfile } from '../hooks/useMyProfile'
import { useLinkBlog, useUpdateProfile } from '../hooks/useProfileMutations'

export default function AccountPage() {
  const { data: profile, isLoading, isError, refetch } = useMyProfile()
  const updateProfile = useUpdateProfile()
  const linkBlog = useLinkBlog()

  if (isLoading) {
    return <p className="pt-12 text-16 text-neutral_60">불러오는 중...</p>
  }

  if (isError || !profile) {
    return (
      <div className="flex flex-col items-start gap-3 pt-12">
        <p className="text-16 text-neutral_60">정보를 불러오지 못했습니다.</p>
        <button
          type="button"
          onClick={() => {
            void refetch()
          }}
          className="text-16 font-medium text-violet_80"
        >
          다시 시도
        </button>
      </div>
    )
  }

  const blogUrl = profile.blogs[0]?.blogUrl ?? null

  return (
    <div className="pb-20">
      <ProfileHeader
        nickname={profile.nickname ?? '닉네임 미설정'}
        isSaving={updateProfile.isPending}
        onSave={nickname => updateProfile.mutateAsync({ nickname })}
      />
      <BlogLinkSection
        blogUrl={blogUrl}
        isSaving={linkBlog.isPending}
        onSave={url => linkBlog.mutateAsync({ blogUrl: url, platform: 'NAVER' })}
      />
      <CategorySection
        selected={profile.categoryTypes}
        isSaving={updateProfile.isPending}
        onSave={categoryTypes => updateProfile.mutateAsync({ categoryTypes })}
      />
    </div>
  )
}
