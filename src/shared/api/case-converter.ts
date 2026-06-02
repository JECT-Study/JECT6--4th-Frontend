// API는 snake_case, 프론트는 camelCase를 사용하므로 경계에서 키를 변환한다.

const toCamel = (key: string): string =>
  key.replace(/_([a-z0-9])/g, (_, char: string) => char.toUpperCase())

const toSnake = (key: string): string => key.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false

  const proto = Reflect.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

function convertKeys(input: unknown, mapper: (key: string) => string): unknown {
  if (Array.isArray(input)) {
    return input.map(item => convertKeys(item, mapper))
  }

  if (isPlainObject(input)) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [mapper(key), convertKeys(value, mapper)])
    )
  }

  return input
}

// 응답(snake_case) → 프론트(camelCase)
export const keysToCamel = (input: unknown): unknown => convertKeys(input, toCamel)

// 요청(camelCase) → 서버(snake_case)
export const keysToSnake = (input: unknown): unknown => convertKeys(input, toSnake)
