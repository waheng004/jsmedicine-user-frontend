/**
 * 用户端认证相关 API
 * Authentication APIs for User App
 */
import { useApi } from '~/composables/useApi'

// 用户登录
export const login = (data: { phone: string; password: string }) => {
  return useApi('/api/v1/app/auth/login', {
    method: 'post',
    body: data
  })
}

// 发送验证码
export const sendSmsCode = (data: { phone: string }) => {
  return useApi('/api/v1/app/auth/sms/send', {
    method: 'post',
    body: data
  })
}

// 验证码登录
export const loginBySms = (data: { phone: string; code: string }) => {
  return useApi('/api/v1/app/auth/login/sms', {
    method: 'post',
    body: data
  })
}

// 用户登出
export const logout = () => {
  return useApi('/api/v1/app/auth/logout', {
    method: 'post'
  })
}

// 获取用户信息
export const getProfile = () => {
  return useApi('/api/v1/app/profile')
}

// 更新用户信息
export const updateProfile = (data: any) => {
  return useApi('/api/v1/app/profile', {
    method: 'put',
    body: data
  })
}