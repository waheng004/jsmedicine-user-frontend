/**
 * 医生/专家相关 API
 * Doctor/Expert APIs
 */
import { useApi } from '~/composables/useApi'

// 获取医生列表
export const getDoctors = (params?: { 
  categoryId?: number
  page?: number 
  size?: number 
}) => {
  return useApi('/api/v1/app/doctors', {
    method: 'get',
    params
  })
}

// 获取医生详情
export const getDoctorDetail = (id: number) => {
  return useApi(`/api/v1/app/doctors/${id}`)
}

// 获取医生排班
export const getDoctorSchedule = (id: number, params?: { date?: string }) => {
  return useApi(`/api/v1/app/doctors/${id}/schedule`, {
    method: 'get',
    params
  })
}

// 获取医生评价列表
export const getDoctorReviews = (id: number, params?: { page?: number; size?: number }) => {
  return useApi(`/api/v1/app/doctors/${id}/reviews`, {
    method: 'get',
    params
  })
}

// 获取专家分类
export const getExpertCategories = () => {
  return useApi('/api/v1/app/expert/categories')
}

// 收藏医生
export const favoriteDoctor = (doctorId: number) => {
  return useApi('/api/v1/app/doctors/favorite', {
    method: 'post',
    body: { doctorId }
  })
}

// 取消收藏医生
export const unfavoriteDoctor = (doctorId: number) => {
  return useApi('/api/v1/app/doctors/favorite', {
    method: 'delete',
    body: { doctorId }
  })
}