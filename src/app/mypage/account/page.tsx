'use client'

import { AccountNavCard } from '../_components/AccountNavCard'
import { BlogLinkSection } from '../_components/BlogLinkSection'
import { CategorySection } from '../_components/CategorySection'
import { ProfileHeader } from '../_components/ProfileHeader'

export default function AccountPage() {
  return (
    <div className="pb-20">
      <ProfileHeader nickname="사용자 닉네임" />
      <BlogLinkSection blogUrl="https://blog.naver.com/example" />
      <CategorySection categories={['문화', '여행', '테크/IT', '펫']} />

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
