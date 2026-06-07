export function MyBlogSummury() {
  return (
    <div className="border border-neutral_95 rounded-[8px] py-7.5 px-8.5 flex flex-col gap-10">
      <div className="text-24 leading-32 font-semibold">나의 블로그 분석 요약</div>
      <Score title="선정 가능성" percent={100} />
      <Score title="적합도" percent={60} />
      <Score title="경쟁력" percent={20} />
      <div className="flex justify-between items-center py-2.5 px-2 font-medium text-red_50">
        이 공고화의 적합도
        <span>100%</span>
      </div>
    </div>
  )
}

function Score({ title, percent }: { title: string; percent: number }) {
  const filled = Math.round(percent / 20)

  return (
    <div className="flex gap-5 items-center text-20 leading-24 font-medium">
      <p className="text-nowrap block w-23">{title}</p>
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className={`rounded-full size-5.5 ${i < filled ? 'bg-green_90' : 'bg-[#E5E7EB]'}`}
          />
        ))}
      </div>
      <p>{percent}%</p>
    </div>
  )
}
