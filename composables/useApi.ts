import { navigateTo, useCookie, useFetch, useRuntimeConfig } from "nuxt/app"

export interface ApiOptions {
  baseURL?: string
  token?: string
  skipAuth?: boolean
  showError?: boolean
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch'
  body?: any
  params?: Record<string, any>
  headers?: Record<string, string>
}

export const useApi = async <T = any>(
  url: string,
  options: ApiOptions = {}
) => {
  const {
    baseURL = '/api',
    token,
    skipAuth = false,
    showError = true,
    method = 'get',
    body,
    params,
    headers: customHeaders
  } = options

  const config = useRuntimeConfig()
  const apiBaseURL: string = baseURL || config.public.apiBaseURL || '/api'
  
  const authToken: string = token || useCookie('token').value || ''

  const headers: Record<string, string> = customHeaders || {}

  if (!skipAuth && authToken) {
    headers['Authorization'] = `Bearer ${authToken}`
  }

  try {
    const { data, error, status } = await useFetch<T>(url, {
      baseURL: apiBaseURL,
      headers,
      method: method as any,
      body,
      params,
      onRequestError({ error }: { error: any }) {
        if (showError) {
          console.error('Request error:', error)
        }
      },
      onResponse({ response }: { response: any }) {
        if (response.status === 401) {
          navigateTo('/login')
        }
      },
      onResponseError({ response }: { response: any }) {
        if (showError) {
          const errorMessage = response._data?.message || response._data?.error || '请求失败'
          console.error('Response error:', errorMessage)
        }
        
        if (response.status === 401) {
          navigateTo('/login')
        }
      }
    })

    if (error.value) {
      if (showError) {
        const errorMessage = error.value.message || '请求失败'
        console.error('API error:', errorMessage)
      }
      throw error.value
    }

    return {
      data: data.value,
      error: error.value,
      status: status.value
    }
  } catch (err: any) {
    if (showError) {
      const errorMessage = err.message || '请求失败'
      console.error('API error:', errorMessage)
    }
    throw err
  }
}

export const useApiGet = <T = any>(
  url: string,
  options: ApiOptions = {}
) => {
  return useApi<T>(url, {
    ...options,
    method: 'get'
  })
}

export const useApiPost = <T = any>(
  url: string,
  body?: any,
  options: ApiOptions = {}
) => {
  return useApi<T>(url, {
    ...options,
    method: 'post',
    body
  })
}

export const useApiPut = <T = any>(
  url: string,
  body?: any,
  options: ApiOptions = {}
) => {
  return useApi<T>(url, {
    ...options,
    method: 'put',
    body
  })
}

export const useApiDelete = <T = any>(
  url: string,
  options: ApiOptions = {}
) => {
  return useApi<T>(url, {
    ...options,
    method: 'delete'
  })
}