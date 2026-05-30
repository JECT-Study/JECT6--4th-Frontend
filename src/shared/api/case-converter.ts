// API는 snake_case, 프론트는 camelCase를 사용하므로 경계에서 키를 변환한다.

const toCamel = (key: string): string =>
  key.replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase())

const toSnake = (key: string): string => key.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)

function convertKeys(input: unknown, mapper: (key: string) => string): unknown {
  if (Array.isArray(input)) {
    return input.map(item => convertKeys(item, mapper))
  }

  if (input !== null && typeof input === 'object' && !(input instanceof Date)) {
    return Object.fromEntries(
      Object.entries(input as Record<string, unknown>).map(([key, value]) => [
        mapper(key),
        convertKeys(value, mapper),
      ])
    )
  }

  return input
}

// 응답(snake_case) → 프론트(camelCase)
export const keysToCamel = (input: unknown): unknown => convertKeys(input, toCamel)

// 요청(camelCase) → 서버(snake_case)
export const keysToSnake = (input: unknown): unknown => convertKeys(input, toSnake)
