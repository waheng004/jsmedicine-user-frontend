/**
 * 个人中心 API
 * User Center APIs
 */
import { useApi } from '~/composables/useApi'

// 获取用户收藏列表
export const getFavorites = (params?: { type?: string; page?: number; size?: number }) => {
  return useApi('/api/v1/app/user/favorites', {
    method: 'get',
    params
  })
}

// 获取就诊记录
export const getMedicalRecords = (params?: { page?: number; size?: number }) => {
  return useApi('/api/v1/app/user/medical-records', {
    method: 'get',
    params
  })
}

// 获取消息列表
export const getMessages = (params?: { type?: string; page?: number; size?: number }) => {
  return useApi('/api/v1/app/user/messages', {
    method: 'get',
    params
  })
}

// 获取消息详情
export const getMessageDetail = (id: number) => {
  return useApi(`/api/v1/app/user/messages/${id}`)
}

// 标记消息已读
export const markMessageRead = (id: number) => {
  return useApi(`/api/v1/app/user/messages/${id}/read`, {
    method: 'put'
  })
}

// 获取用户设置
export const getUserSettings = () => {
  return useApi('/api/v1/app/user/settings')
}

// 更新用户设置
export const updateUserSettings = (data: any) => {
  return useApi('/api/v1/app/user/settings', {
    method: 'put',
    body: data
  })
}

// 上传头像
export const uploadAvatar = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return useApi('/api/v1/app/user/avatar', {
    method: 'post',
    body: formData
  })
}