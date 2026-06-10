import axios from 'axios'

import { keysToCamel, keysToSnake } from './case-converter'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 바디·쿼리를 snake_case로 변환해 서버로 보낸다.
http.interceptors.request.use(config => {
  if (config.data) {
    config.data = keysToSnake(config.data)
  }
  if (config.params) {
    config.params = keysToSnake(config.params)
  }
  return config
})

// 응답 데이터를 camelCase로 변환하고, { success, data } 래퍼를 벗겨서 프론트로 전달한다.
http.interceptors.response.use(
  response => {
    response.data = keysToCamel(response.data)
    if (
      response.data !== null &&
      typeof response.data === 'object' &&
      'success' in response.data &&
      'data' in response.data
    ) {
      response.data = response.data.data
    }
    return response
  },
  (error: unknown) => {
    if (axios.isAxiosError<unknown>(error) && error.response?.data) {
      error.response.data = keysToCamel(error.response.data)
    }
    throw error
  }
)
