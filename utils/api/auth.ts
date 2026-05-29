/**
 * 用户端认证相关 API
 * User App Authentication APIs
 */
import { useApi } from '~/composables/useApi'

// 用户端账号密码登录
export const login = (data: { username: string; password: string }) => {
  return useApi('/api/v1/app/auth/login', {
    method: 'post',
    body: data
  })
}

// 发送用户端手机号验证码
export const sendSmsCode = (data: { mobile: string }) => {
  return useApi('/api/v1/app/auth/sms-code', {
    method: 'post',
    body: data
  })
}

// 用户端手机号验证码登录
export const loginBySms = (data: { mobile: string; code: string }) => {
  return useApi('/api/v1/app/auth/sms-login', {
    method: 'post',
    body: data
  })
}

// 用户端微信授权登录
export const wechatLogin = (data: { code: string; nickname?: string; avatarUrl?: string }) => {
  return useApi('/api/v1/app/auth/wechat-login', {
    method: 'post',
    body: data
  })
}

// 用户端微信授权绑定手机号
export const wechatBindMobile = (data: { bindToken: string; mobile: string; code: string }) => {
  return useApi('/api/v1/app/auth/wechat-bind-mobile', {
    method: 'post',
    body: data
  })
}

// 用户端退出登录
export const logout = () => {
  return useApi('/api/v1/app/auth/logout', {
    method: 'post'
  })
}

// 获取当前登录用户
export const getCurrentUser = () => {
  return useApi('/api/v1/app/auth/me')
}

// 校验用户端登录状态
export const checkAuthStatus = () => {
  return useApi('/api/v1/app/auth/status')
}
