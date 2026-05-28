/**
 * 互动答疑/问答 API
 * Q&A APIs
 */
import { useApi } from '~/composables/useApi'

// 提问
export const createQuestion = (data: {
  title: string
  content: string
  categoryId?: number
}) => {
  return useApi('/api/v1/app/questions', {
    method: 'post',
    body: data
  })
}

// 获取问答列表
export const getQuestions = (params?: {
  categoryId?: number
  status?: string
  page?: number
  size?: number
}) => {
  return useApi('/api/v1/app/questions', {
    method: 'get',
    params
  })
}

// 获取问答详情
export const getQuestionDetail = (id: number) => {
  return useApi(`/api/v1/app/questions/${id}`)
}

// 回复问答
export const replyQuestion = (id: number, data: { content: string }) => {
  return useApi(`/api/v1/app/questions/${id}/reply`, {
    method: 'post',
    body: data
  })
}

// 获取我的提问列表
export const getMyQuestions = (params?: { page?: number; size?: number }) => {
  return useApi('/api/v1/app/questions/my', {
    method: 'get',
    params
  })
}