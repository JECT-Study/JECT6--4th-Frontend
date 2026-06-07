import { expect, test } from '@playwright/test'

test('blog AI analysis dashboard shows summary, detail analysis, recommendations, and popular bloggers', async ({
  page,
}) => {
  await page.goto(process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000/blog-ai-analysis')

  await expect(page.getByRole('heading', { name: '블로그 분석 결과' })).toBeVisible()
  await expect(page.getByText('AI 분석 요약')).toBeVisible()
  await expect(page.getByRole('heading', { name: '내 블로그 상세 분석' })).toBeVisible()
  await expect(page.getByText('종합 분석')).toBeVisible()
  await expect(page.getByText('키워드 검색 유입이 강합니다')).toBeVisible()
  await expect(page.getByText('발행 빈도를 주 3회로 늘리세요')).toBeVisible()
  await expect(page.getByText('카테고리 적합도')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'AI 추천 공고' })).toBeVisible()
  await expect(page.getByText('[마포] 브런치 카페 방문 체험단')).toBeVisible()
  await expect(page.getByRole('heading', { name: '내 카테고리의 인기 블로거' })).toBeVisible()
  await expect(page.getByText('맛집탐험가')).toBeVisible()
})

test('blog AI analysis page does not horizontally overflow on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 1200 })
  await page.goto(process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000/blog-ai-analysis')

  const widths = await page.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(widths.scrollWidth).toBeLessThanOrEqual(widths.innerWidth)
})
