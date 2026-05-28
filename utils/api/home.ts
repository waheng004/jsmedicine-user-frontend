/**
 * 首页内容 API
 * Home Page Content APIs
 */
import { useApi } from '~/composables/useApi'

// 获取首页内容列表（轮播图、公告等）
export const getHomeContents = (params?: { page?: number; size?: number }) => {
  return useApi('/api/v1/app/home/contents', {
    method: 'get',
    params
  })
}

// 获取首页分类列表
export const getHomeCategories = () => {
  return useApi('/api/v1/app/home/categories')
}

// 获取分类下的内容
export const getCategoryContents = (params: { categoryId: number; page?: number; size?: number }) => {
  return useApi('/api/v1/app/home/categories/contents', {
    method: 'get',
    params
  })
}