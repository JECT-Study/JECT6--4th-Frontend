import { CAMPAIGN_CATEGORY_LABEL } from '@/constant'

import type { CategoryFit } from '@/entities/blog-analysis'

// [Figma 기준 컴포넌트] 카테고리 적합도 표. 현재 백엔드 명세 GET /blog/analysis/{id}는
// categoryFits를 제공하지 않아 데이터가 있을 때만 렌더된다(없으면 null).
export function CategoryFitTable({ rows }: { rows?: CategoryFit[] }) {
  if (!rows || rows.length === 0) return null

  return (
    <section
      id="category-fit"
      className="rounded-lg border border-neutral_95 bg-white p-7 shadow-sm"
    >
      <h3 className="text-18 font-bold leading-28">카테고리 적합도</h3>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-160 table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-neutral_95 text-14 font-bold leading-20 text-neutral_30">
              <th className="w-1/4 px-4 py-3">순위</th>
              <th className="w-1/4 px-4 py-3">활동도</th>
              <th className="w-1/2 px-4 py-3">적합도</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: CategoryFit) => (
              <tr key={row.category} className="border-b border-neutral_99 last:border-b-0">
                <td className="px-4 py-4 text-14 leading-20 text-neutral_30">{row.keyword}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex min-w-9 justify-center rounded-md bg-red_50 px-2 py-1 text-12 font-bold leading-14 text-white">
                    {row.activityScore}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 text-14 leading-20 text-neutral_20">
                      {row.fitnessScore}%
                    </span>
                    <span className="h-1.5 w-24 rounded-full bg-neutral_95">
                      <span
                        className="block h-full rounded-full bg-neutral_20"
                        style={{ width: `${row.fitnessScore}%` }}
                      />
                    </span>
                    <span className="truncate text-14 leading-20 text-neutral_50">
                      {CAMPAIGN_CATEGORY_LABEL[row.category]}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
