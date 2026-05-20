import { Button } from '@/shared/ui'

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
      </div>
    </main>
  )
}
