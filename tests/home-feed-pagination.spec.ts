import { expect, test } from '@playwright/test'

test('home campaign carousel arrows page through cards', async ({ page }) => {
  await page.goto(process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000/')

  const section = page.locator('section').filter({ hasText: '당첨확률이 높은 공고' })
  await expect(section.getByText('[마포] 브런치 카페 방문 체험단')).toBeVisible()
  await expect(section.getByText('[강릉] 오션뷰 숙소 체험단')).toHaveCount(0)

  await section.getByRole('button', { name: '다음' }).click()

  await expect(section.getByText('[강릉] 오션뷰 숙소 체험단')).toBeVisible()
  await expect(section.getByText('[마포] 브런치 카페 방문 체험단')).toHaveCount(0)

  await section.getByRole('button', { name: '이전' }).click()

  await expect(section.getByText('[마포] 브런치 카페 방문 체험단')).toBeVisible()
})
