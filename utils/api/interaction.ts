/**
 * 用户端互动相关 API
 * User App Interaction APIs
 */
import { useApi } from '~/composables/useApi'

// 发起咨询
export const createConsultation = (data: {
  expertCategoryId: number
  expertId: number
  title: string
  content: string
}) => {
  return useApi('/api/v1/app/interaction/qa/questions', {
    method: 'post',
    body: data
  })
}

// 获取我的咨询列表
export const getConsultations = (params: { page: number; size: number }) => {
  return useApi('/api/v1/app/interaction/qa/questions', {
    method: 'get',
    params
  })
}

// 获取我的咨询详情
export const getConsultationDetail = (id: number) => {
  return useApi(`/api/v1/app/interaction/qa/questions/${id}`)
}

// 提交反馈
export const submitFeedback = (data: {
  feedbackType: string
  content: string
  contact?: string
}) => {
  return useApi('/api/v1/app/interaction/feedbacks', {
    method: 'post',
    body: data
  })
}
