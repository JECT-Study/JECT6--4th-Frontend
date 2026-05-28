import { BlogCard, Button, Dropdown, Input } from '@/shared/ui'

export default function ComponentsPage() {
  return (
    <main className="min-h-screen bg-neutral_99 px-16 py-16 text-neutral_20">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-12">
        <h1 className="m-0 text-28 font-bold leading-40">공통 컴포넌트</h1>

        <section className="flex flex-col gap-5">
          <h2 className="m-0 text-20 font-bold leading-28">Button</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button>버튼</Button>
            <Button variant="secondary">버튼</Button>
            <Button variant="tertiary">버튼</Button>
            <Button variant="navy">버튼</Button>
            <Button disabled>버튼</Button>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="m-0 text-20 font-bold leading-28">Input</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
            <Input
              placeholder="닉네임을 입력해주세요"
              rightAddon={
                <Button className="h-9 w-[67px] rounded-[10px] bg-neutral_99 p-0 text-14 leading-20 text-neutral_40 hover:bg-neutral_95">
                  랜덤 생성
                </Button>
              }
            />
            <Input variant="search" placeholder="원하는 공고를 입력해주세요" />
            <Input
              variant="url"
              label="URL을 입력해주세요"
              defaultValue="https://blog.naver.com/example"
            />
            <Input placeholder="URL을 입력해주세요" errorMessage="올바른 URL을 입력해주세요." />
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="m-0 text-20 font-bold leading-28">BlogCard</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] items-start gap-4">
            <BlogCard variant="creator" />
            <BlogCard variant="vertical" />
            <BlogCard variant="ai" />
            <BlogCard variant="horizontal" />
            <BlogCard variant="thumbnail" />
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="m-0 text-20 font-bold leading-28">Dropdown</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Dropdown
              options={[
                { label: 'list', value: 'list-1' },
                { label: 'list', value: 'list-2' },
                { label: 'list', value: 'list-3' },
              ]}
              placeholder="옵션 제목"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
