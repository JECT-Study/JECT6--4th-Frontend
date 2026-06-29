'use client'

// TODO: 개인 정보 관리 섹션 복구 시 주석 해제 (백엔드 비밀번호/OAuth/결제수단 API 준비 후)
// import { AccountNavCard } from '../_components/AccountNavCard'
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

  const blogUrl = profile.blogs.find(blog => blog.platform === 'NAVER')?.blogUrl ?? null

  return (
    <div className="pb-20">
      <ProfileHeader
        nickname={profile.nickname}
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

      {/*
        TODO: 개인 정보 관리 섹션 — 백엔드 API(비밀번호 변경 / OAuth 연동계정 관리 / 결제수단)
        준비되면 아래 블록과 상단 AccountNavCard import 주석을 해제해 복구할 것.
        컴포넌트(AccountNavCard)는 _components 에 보존되어 있음.
        <section className="mt-16">
          <h2 className="text-24 font-bold text-neutral_20">개인 정보 관리</h2>
          <div className="mt-6 flex flex-col gap-4">
            <AccountNavCard
              title="회원 정보 수정"
              description="닉네임 등 내 프로필 정보를 변경할 수 있어요. (이메일 변경은 준비 중이에요.)"
              badge="일부 준비 중"
              disabled
            />
            <AccountNavCard
              title="내 결제 수단"
              description="자주 쓰는 결제 수단을 관리하고, 더 빠르고 간편하게 결제해 보세요."
              badge="준비 중"
              disabled
            />
            <AccountNavCard
              title="비밀번호 및 계정"
              description="로그인 비밀번호와 연동 계정을 변경할 수 있어요."
              badge="준비 중"
              disabled
            />
          </div>
        </section>
      */}
    </div>
  )
}
