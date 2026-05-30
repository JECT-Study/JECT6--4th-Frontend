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

// 응답 데이터를 camelCase로 변환해 프론트로 전달한다.
http.interceptors.response.use(response => {
  response.data = keysToCamel(response.data)
  return response
})
