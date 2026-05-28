/**
 * 搜索 API
 * Search APIs
 */
import { useApi } from '~/composables/useApi'

// 全局搜索
export const search = (params: {
  keyword: string
  type?: string  // doctor, article, question, all
  page?: number
  size?: number
}) => {
  return useApi('/api/v1/app/search', {
    method: 'get',
    params
  })
}

// 搜索医生
export const searchDoctors = (params: { keyword: string; page?: number; size?: number }) => {
  return useApi('/api/v1/app/search/doctors', {
    method: 'get',
    params
  })
}

// 搜索文章
export const searchArticles = (params: { keyword: string; page?: number; size?: number }) => {
  return useApi('/api/v1/app/search/articles', {
    method: 'get',
    params
  })
}

// 搜索问答
export const searchQuestions = (params: { keyword: string; page?: number; size?: number }) => {
  return useApi('/api/v1/app/search/questions', {
    method: 'get',
    params
  })
}

// 获取搜索热词
export const getHotKeywords = () => {
  return useApi('/api/v1/app/search/hot-keywords')
}