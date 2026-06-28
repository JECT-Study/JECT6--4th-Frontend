'use client'

import { AccountNavCard } from '../_components/AccountNavCard'
import { BlogLinkSection } from '../_components/BlogLinkSection'
import { CategorySection } from '../_components/CategorySection'
import { ProfileHeader } from '../_components/ProfileHeader'
import { CATEGORY_LABELS, useMyProfile } from '../hooks/useMyProfile'

export default function AccountPage() {
  const { data: profile, isLoading, isError, refetch } = useMyProfile()

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
  const categoryLabels = profile.categoryTypes.map(c => CATEGORY_LABELS[c])

  return (
    <div className="pb-20">
      <ProfileHeader nickname={profile.nickname ?? '닉네임 미설정'} />
      <BlogLinkSection blogUrl={blogUrl} />
      <CategorySection categories={categoryLabels} />

      <section className="mt-16">
        <h2 className="text-24 font-bold text-neutral_20">개인 정보 관리</h2>
        <div className="mt-6 flex flex-col gap-4">
          <AccountNavCard
            title="회원 정보 수정"
            description="이메일, 닉네임 등 내 프로필 정보를 변경할 수 있어요."
          />
          <AccountNavCard
            title="내 결제 수단"
            description="자주 쓰는 결제 수단을 관리하고, 더 빠르고 간편하게 결제해 보세요."
          />
          <AccountNavCard
            title="비밀번호 및 계정"
            description="로그인 비밀번호와 연동 계정을 변경할 수 있어요."
          />
        </div>
      </section>
    </div>
  )
}
